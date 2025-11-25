from pathlib import Path
from PIL import Image

# === 설정 ===
INPUT_DIR = Path("input")
OUTPUT_DIR = Path("output")

TARGET_W = 1000
TARGET_H = 1500
DPI = 96

DARK_THRESHOLD = 80          # 테두리로 인식할 밝기 기준
MIN_CROP_RATIO = 0.7         # 크롭된 폭/높이가 원본의 70%보다 작으면 "이상함" → 크롭 안 함


def luminance(rgb):
    r, g, b = rgb[:3]
    return 0.299 * r + 0.587 * g + 0.114 * b


def find_border_box(img, dark_thr=DARK_THRESHOLD):
    img = img.convert("RGB")
    w, h = img.size
    px = img.load()

    mid_y = h // 2
    mid_x = w // 2

    left = None
    for x in range(w):
        if luminance(px[x, mid_y]) < dark_thr:
            left = x
            break

    right = None
    for x in range(w - 1, -1, -1):
        if luminance(px[x, mid_y]) < dark_thr:
            right = x
            break

    top = None
    for y in range(h):
        if luminance(px[mid_x, y]) < dark_thr:
            top = y
            break

    bottom = None
    for y in range(h - 1, -1, -1):
        if luminance(px[mid_x, y]) < dark_thr:
            bottom = y
            break

    if None in (left, right, top, bottom):
        return None

    return (left, top, right + 1, bottom + 1)


def fit_image_to_box(img, box_w, box_h):
    w, h = img.size
    scale = min(box_w / w, box_h / h)
    new_w = int(w * scale)
    new_h = int(h * scale)
    return img.resize((new_w, new_h), Image.LANCZOS)


def process_one_image(path: Path):
    print(f"Processing {path.name}...")
    img = Image.open(path)
    w, h = img.size

    box = find_border_box(img)

    if box:
        bx1, by1, bx2, by2 = box
        bw, bh = bx2 - bx1, by2 - by1

        # 👉 안전장치: 너무 많이 잘라내려고 하면 크롭 안 함
        if bw >= w * MIN_CROP_RATIO and bh >= h * MIN_CROP_RATIO:
            cropped = img.crop(box)
            print(f"  Cropped to {bw}x{bh}")
        else:
            cropped = img
            print("  Crop looked suspicious → using original image")
    else:
        cropped = img
        print("  No border detected → using original image")

    # 최종 카드 크기 맞추기
    card = Image.new("RGB", (TARGET_W, TARGET_H), "white")
    fitted = fit_image_to_box(cropped, TARGET_W, TARGET_H)
    fw, fh = fitted.size
    paste_x = (TARGET_W - fw) // 2
    paste_y = (TARGET_H - fh) // 2
    card.paste(fitted, (paste_x, paste_y))

    OUTPUT_DIR.mkdir(exist_ok=True)
    out_path = OUTPUT_DIR / path.name
    card.save(out_path, format="PNG", dpi=(DPI, DPI))
    print(f"  Saved to {out_path}")


def main():
    files = sorted(INPUT_DIR.glob("*.png"))
    if not files:
        print("input 폴더에 png 파일이 없습니다.")
        return

    for p in files:
        process_one_image(p)


if __name__ == "__main__":
    main()
