"""제품 사진 배경 제거: rembg로 전경을 분리하고 가장 큰 덩어리(낱개 제품)만 남겨 흰 배경에 얹는다.

사용법: python scripts/intake/cutout.py <입력 이미지> <출력 PNG>
뒤쪽 박스 모서리처럼 작은 조각은 가장 큰 덩어리만 남기면서 함께 제거된다.
"""
import sys

import cv2
import numpy as np
from PIL import Image
from rembg import new_session, remove

# bria-rmbg(기본값)는 비상업 라이선스라 쓰지 않는다. isnet-general-use는 Apache-2.0.
SESSION = new_session("isnet-general-use")


def main(src: str, dst: str) -> None:
    img = Image.open(src).convert("RGBA")
    cut = remove(img, session=SESSION)
    alpha = np.array(cut)[:, :, 3]
    mask = (alpha > 40).astype(np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(mask, connectivity=8)
    if count > 1:
        largest = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
        keep = labels == largest
        arr = np.array(cut)
        arr[~keep, 3] = 0
        cut = Image.fromarray(arr)
    bbox = cut.getbbox()
    if bbox:
        cut = cut.crop(bbox)
    white = Image.new("RGBA", cut.size, (255, 255, 255, 255))
    white.alpha_composite(cut)
    white.convert("RGB").save(dst)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
