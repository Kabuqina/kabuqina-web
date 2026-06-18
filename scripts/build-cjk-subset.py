#!/usr/bin/env python3
"""
Regenerate the self-hosted Noto Sans SC (思源黑体) subset.

Scans the site source for every character actually rendered, then fetches a
woff2 per weight from Google Fonts' text-subsetting API (build-time only — the
generated files are self-hosted, so end users never hit Google). Run this
whenever you ADD new Chinese text to the site:

    python scripts/build-cjk-subset.py

Output: src/assets/fonts/noto-sans-sc-{400,500,600,700}.woff2
Requires: a network connection to fonts.googleapis.com + curl on PATH.
"""
import glob, os, re, subprocess, sys, time, urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "src", "assets", "fonts")
WEIGHTS = (400, 500, 600, 700)
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")


def collect_chars() -> str:
    chars = set()
    patterns = [os.path.join(ROOT, "src", "**", f"*.{ext}") for ext in ("tsx", "ts", "css")]
    patterns.append(os.path.join(ROOT, "*.html"))
    for pat in patterns:
        for path in glob.glob(pat, recursive=True):
            with open(path, encoding="utf-8") as fh:
                chars |= set(fh.read())
    # keep printable ASCII + everything from U+00A0 up (CJK, punctuation, symbols)
    return "".join(sorted(c for c in chars if (32 <= ord(c) < 127) or ord(c) >= 0xA0))


def curl(url: str, out: str | None = None, tries: int = 6):
    cmd = ["curl", "-sL", "-m", "45", "--retry", "5", "--retry-all-errors",
           "--retry-delay", "2", "-A", UA, url] + (["-o", out] if out else [])
    for i in range(tries):
        r = subprocess.run(cmd, capture_output=not out, text=True)
        if r.returncode == 0:
            return True if out else r.stdout
        time.sleep(2 + 2 * i)
    raise RuntimeError(f"curl failed ({r.returncode}) for {url[:80]}")


def main():
    text = collect_chars()
    print(f"subset glyph set: {len(text)} characters")
    os.makedirs(OUT_DIR, exist_ok=True)
    total = 0
    for w in WEIGHTS:
        q = urllib.parse.urlencode({"family": f"Noto Sans SC:wght@{w}",
                                    "text": text, "display": "swap"})
        css = curl(f"https://fonts.googleapis.com/css2?{q}")
        m = re.search(r"src:\s*url\((https://fonts\.gstatic\.com/[^)]+)\)\s*format\('woff2'\)", css)
        if not m:
            sys.exit(f"w{w}: no woff2 URL in Google response")
        out = os.path.join(OUT_DIR, f"noto-sans-sc-{w}.woff2")
        curl(m.group(1), out)
        with open(out, "rb") as fh:
            if fh.read(4) != b"wOF2":
                sys.exit(f"w{w}: downloaded file is not woff2")
        size = os.path.getsize(out)
        total += size
        print(f"  w{w}: {size:>6} bytes -> {os.path.relpath(out, ROOT)}")
    print(f"TOTAL: {total/1024:.1f} KB")


if __name__ == "__main__":
    main()
