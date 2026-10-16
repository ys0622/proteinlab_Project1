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
    # 포장 안의 흰 글자를 배경으로 오인해 구멍이 나는 경우가 있다. 바깥과 이어지지 않은 투명 영역은 채운다.
    arr = np.array(cut)
    solid = (arr[:, :, 3] > 40).astype(np.uint8)
    flood = np.pad(solid, 1)  # 테두리를 비워 두면 (0,0)에서 바깥 영역 전체를 채울 수 있다.
    h, w = flood.shape
    cv2.floodFill(flood, np.zeros((h + 2, w + 2), np.uint8), (0, 0), 2)
    holes = flood[1:-1, 1:-1] == 0
    arr[holes, 3] = 255
    # 경계에 원본 배경색(어두운 띠)이 남지 않도록 투명도 경계를 2px 안쪽으로 깎는다.
    arr[:, :, 3] = cv2.erode(arr[:, :, 3], np.ones((3, 3), np.uint8), iterations=2)
    cut = Image.fromarray(arr)
    bbox = cut.getbbox()
    if bbox:
        cut = cut.crop(bbox)
    white = Image.new("RGBA", cut.size, (255, 255, 255, 255))
    white.alpha_composite(cut)
    white.convert("RGB").save(dst)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
