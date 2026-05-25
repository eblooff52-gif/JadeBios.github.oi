"""Remove black bg, split wings into left/right transparent PNGs."""
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow", "-q"])
    from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "img"
SOURCES = [
    Path(r"C:\Users\Пользователь\.cursor\projects\c-Users-Desktop\assets\c__Users______________AppData_Roaming_Cursor_User_workspaceStorage_6597f358435d2dddc7778041d8d7d634_images_image-fef626a1-00f8-4183-b7ea-79d13dc1223e.png"),
    IMG / "wings.png",
    IMG / "wings-source.png",
]

def find_source():
    for p in SOURCES:
        if p.exists():
            return p
    raise FileNotFoundError("No wings source image found")

def remove_black(im: Image.Image, thresh: int = 42) -> Image.Image:
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r <= thresh and g <= thresh and b <= thresh:
                px[x, y] = (r, g, b, 0)
            elif max(r, g, b) - min(r, g, b) < 18 and (r + g + b) / 3 < thresh + 25:
                px[x, y] = (r, g, b, 0)
    return im

def crop_alpha(box_im: Image.Image) -> Image.Image:
    bbox = box_im.getbbox()
    if not bbox:
        return box_im
    return box_im.crop(bbox)

def split_wings(im: Image.Image):
    w, h = im.size
    mid = w // 2
    left = im.crop((0, 0, mid, h))
    right = im.crop((mid, 0, w, h))
    return crop_alpha(left), crop_alpha(right)

def main():
    IMG.mkdir(parents=True, exist_ok=True)
    src = find_source()
    im = Image.open(src)
    im = remove_black(im)
    left, right = split_wings(im)
    left.save(IMG / "wing-left.png", optimize=True)
    right.save(IMG / "wing-right.png", optimize=True)
    # combined preview (optional)
    im.save(IMG / "wings.png", optimize=True)
    print("OK:", IMG / "wing-left.png", IMG / "wing-right.png")

if __name__ == "__main__":
    main()
