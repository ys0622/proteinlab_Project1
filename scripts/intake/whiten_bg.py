"""제품 사진 가장자리의 연회색·미색 배경을 순백으로 바꾸고 흰 여백을 붙인다.

사용법: python scripts/intake/whiten_bg.py <입력> <출력.webp>
가장자리와 이어진 '밝고 무채색에 가까운' 픽셀만 흰색으로 바꾼다(포장 색은 그대로).
"""
import sys

import cv2
import numpy as np
from PIL import Image


def main(src: str, dst: str) -> None:
    im = Image.open(src).convert("RGBA")
    white = Image.new("RGBA", im.size, (255, 255, 255, 255))
    white.alpha_composite(im)
    rgb = np.array(white.convert("RGB")).astype(np.int16)
    light = (rgb.min(axis=2) >= 222) & ((rgb.max(axis=2) - rgb.min(axis=2)) <= 14)
    mask = np.pad(light.astype(np.uint8), 1, constant_values=1)  # 테두리를 "밝은 배경"으로 두어 (0,0)에서 배경을 채운다
    h, w = mask.shape
    ff = mask.copy()
    cv2.floodFill(ff, np.zeros((h + 2, w + 2), np.uint8), (0, 0), 2)
    bg = ff[1:-1, 1:-1] == 2
    out = rgb.copy()
    out[bg] = 255
    img = Image.fromarray(out.astype(np.uint8))
    pad = max(12, round(max(img.size) * 0.04))
    canvas = Image.new("RGB", (img.width + pad * 2, img.height + pad * 2), "white")
    canvas.paste(img, (pad, pad))
    canvas.save(dst, "WEBP", quality=88)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
