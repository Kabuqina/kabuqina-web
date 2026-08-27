"""Flood-fill 去掉参考 Logo 的米白背景，输出透明背景 PNG。
只把"连通到图片边缘 + 颜色接近背景米色"的像素设为透明，
这样杯内的白色（被紫色描边包围、不连到背景）会被完整保留。
"""
from collections import deque
from PIL import Image

SRC = r"C:\Users\ASUS\.workbuddy\clipboard-images\clipboard-2026-08-27T09-18-25-549Z-b93bf704.jpg"
DST = r"E:\kabuqina_work\kabuqina-web\public\company-logo.png"

img = Image.open(SRC).convert("RGBA")
w, h = img.size
print(f"size: {w}x{h}")

# 先裁掉图片底部（去除"豆包AI生成"水印所在的区域），再处理背景
CROP_BOTTOM = 130
img = img.crop((0, 0, w, h - CROP_BOTTOM))
w, h = img.size
print(f"after crop: {w}x{h}")

px = img.load()

# 在 (5, 5) 采样背景色 — 角落一点，避免边缘裁切
seed = px[5, 5]
sr, sg, sb = seed[0], seed[1], seed[2]
print(f"seed color (top-left bg): ({sr}, {sg}, {sb})")

TH = 45  # 通道最大差阈值

visited = bytearray(w * h)

def at(x, y):
    return px[x, y]


def try_push(nx, ny, q):
    i = ny * w + nx
    if visited[i]:
        return
    nr, ng, nb, _ = at(nx, ny)
    if max(abs(nr - sr), abs(ng - sg), abs(nb - sb)) <= TH:
        visited[i] = 1
        q.append(i)


# 从四个角都做 flood fill，确保边缘背景被覆盖
q = deque()
for sx, sy in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (w // 2, h - 1)]:
    i = sy * w + sx
    if not visited[i]:
        nr, ng, nb, _ = at(sx, sy)
        if max(abs(nr - sr), abs(ng - sg), abs(nb - sb)) <= TH:
            visited[i] = 1
            q.append(i)

count = 0
while q:
    i = q.popleft()
    x = i % w
    y = i // w
    r, g, b, a = px[x, y]
    px[x, y] = (r, g, b, 0)
    count += 1
    if x > 0:
        try_push(x - 1, y, q)
    if x < w - 1:
        try_push(x + 1, y, q)
    if y > 0:
        try_push(x, y - 1, q)
    if y < h - 1:
        try_push(x, y + 1, q)

print(f"flood-filled (transparent) pixels: {count}")
img.save(DST, "PNG")
print(f"saved: {DST}")
