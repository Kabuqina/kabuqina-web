# Design QA — About hero illustration

## Evidence

- Selected visual target: `C:\Users\X13\.codex\generated_images\019f6a30-4655-79b3-9e38-2e7b0f4c6f8d\call_mZ5xEyjOw1N5bSmfdhSBib1a.png`
- Project asset: `D:\kabuqina_web\public\about-care-logic-convergence.png`
- Intended implementation route: `http://127.0.0.1:5174/about.html`
- Target image dimensions: 1136 × 1392 px
- Intended state: About page hero, Chinese and English locales

## Implementation

- Replaced the word-based poster composition with the selected wordless illustration.
- Removed the poster signature, year, location label, CARE / LOGIC labels, Chinese display characters, ampersand, lower slogans, and rotated explanatory copy.
- Preserved the existing poster border, offset shadow, warm paper surface, and responsive hero layout.
- The image uses its native 1136:1392 aspect ratio with `object-fit: cover`.

## Runtime checks

- The image asset is served by the local development server with HTTP 200.
- TypeScript and the production Vite build pass.
- The generated source image was opened and visually inspected.

## Blocking visual-verification gap

The in-app browser rejected reloading the existing About tab under its URL security policy. Because the browser-rendered implementation could not be captured, there is no valid same-state implementation screenshot for comparison. The source image is available, but the required browser-rendered evidence, responsive inspection, and console-error inspection for the integrated page are missing.

## Findings

- No code or build blocker was found.
- Visual fidelity of the image crop inside the live poster remains unverified.
- Desktop and narrow-screen rendering remain unverified in the browser.

## Required next check

Refresh `http://127.0.0.1:5174/about.html` manually and confirm that the full central negative-space circle remains visible without unwanted cropping.

final result: blocked
