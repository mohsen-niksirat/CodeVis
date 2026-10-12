"""Generate CodeVis PWA icons (icon-192.png, icon-512.png) + og-image.png with PIL only.
Recreates the look of icon.svg: purple gradient rounded tile, dark editor panel
with traffic lights + code lines, and two nodes linked by an arrow."""
from PIL import Image, ImageDraw, ImageFont
import os

HERE = os.path.dirname(os.path.abspath(__file__)) if '__file__' in globals() else os.getcwd()

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

PURPLE_TOP = (139, 92, 246)
PURPLE_BOT = (109, 40, 217)
DARK = (13, 17, 23)

def rounded(size, radius, fill):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=fill)
    return img

def gradient(size):
    base = Image.new('RGB', (size, size))
    px = base.load()
    for y in range(size):
        for x in range(size):
            t = (x + y) / (2 * size)
            px[x, y] = lerp(PURPLE_TOP, PURPLE_BOT, t)
    return base

def make_icon(size, radius, path):
    g = gradient(size)
    mask = rounded(size, radius, (255, 255, 255, 255))
    icon = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    icon.paste(g, (0, 0), mask)
    d = ImageDraw.Draw(icon)
    s = size / 512.0
    # editor panel
    d.rounded_rectangle([40*s, 60*s, 472*s, 360*s], radius=int(24*s), fill=(13, 17, 23, 230))
    # traffic lights
    for i, c in enumerate([(248, 81, 73), (227, 179, 65), (63, 185, 80)]):
        d.ellipse([72*s - 8*s + i*24*s, 84*s - 8*s, 72*s + 8*s + i*24*s, 84*s + 8*s], fill=c)
    # code lines (stylised bars like the svg code)
    rows = [(100, 0.42), (140, 0.55), (180, 0.36), (220, 0.5)]
    cols = [(167, 139, 250), (230, 237, 243), (121, 192, 255), (63, 185, 80)]
    for i, (y, w) in enumerate(rows):
        d.rounded_rectangle([80*s, y*s, (80 + 330*w)*s, (y+18)*s], radius=int(6*s), fill=cols[i % 4] + (220,))
    # nodes + link
    d.ellipse([160*s - 36*s, 420*s - 36*s, 160*s + 36*s, 420*s + 36*s], fill=(167, 139, 250, 230))
    d.ellipse([328*s - 36*s, 420*s - 36*s, 328*s + 36*s, 420*s + 36*s], fill=(167, 139, 250, 150))
    d.line([196*s, 420*s, 280*s, 420*s], fill=(167, 139, 250), width=max(2, int(4*s)))
    d.polygon([276*s, 412*s, 292*s, 420*s, 276*s, 428*s], fill=(167, 139, 250))
    icon.save(path)
    print('wrote', path, icon.size)

def make_og(path):
    W, H = 1200, 630
    base = Image.new('RGB', (W, H))
    px = base.load()
    for y in range(H):
        for x in range(W):
            t = (x + y) / (W + H)
            px[x, y] = lerp(PURPLE_TOP, (13, 17, 23), t * 0.85)
    d = ImageDraw.Draw(base)
    d.rounded_rectangle([60, 90, 480, 540], radius=28, fill=(13, 17, 23, 235))
    try:
        f_big = ImageFont.truetype('arial.ttf', 92)
        f_mid = ImageFont.truetype('arial.ttf', 44)
        f_sm = ImageFont.truetype('arial.ttf', 30)
    except Exception:
        f_big = f_mid = f_sm = ImageFont.load_default()
    d.text((540, 150), 'CodeVis', font=f_big, fill=(255, 255, 255))
    d.text((540, 260), 'Visual programming concepts', font=f_mid, fill=(196, 181, 253))
    d.text((540, 320), '62 interactive canvas animations', font=f_mid, fill=(196, 181, 253))
    d.text((540, 420), 'Data structures - Algorithms - CS', font=f_sm, fill=(139, 148, 158))
    d.text((540, 460), 'Gamification - Quizzes - EN/FA', font=f_sm, fill=(139, 148, 158))
    # mini code bars
    cols = [(167, 139, 250), (230, 237, 243), (121, 192, 255), (63, 185, 80)]
    for i in range(6):
        w = 260 if i % 2 == 0 else 180
        d.rounded_rectangle([100, 150 + i*52, 100 + w, 150 + i*52 + 22], radius=8, fill=cols[i % 4])
    base.save(path)
    print('wrote', path, base.size)

if __name__ == '__main__':
    make_icon(192, 40, os.path.join(HERE, 'icon-192.png'))
    make_icon(512, 80, os.path.join(HERE, 'icon-512.png'))
    make_og(os.path.join(HERE, 'og-image.png'))
