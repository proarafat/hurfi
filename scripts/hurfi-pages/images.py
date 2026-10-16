"""Generate the guide infographics (own work) as compressed WebP. Deterministic."""
import os
from PIL import Image, ImageDraw, ImageFont
FONT = '/usr/share/fonts/truetype/sand-box/google/Inter/Inter-VariableFont_opsz,wght.ttf'
W, H = 1200, 675
BG, CARD, LINE, BLUE, WHITE, MUTED, SOFT = (7, 9, 13), (14, 20, 31), (32, 44, 62), (77, 163, 255), (255, 255, 255), (139, 152, 170), (201, 211, 224)

def font(size, weight='Regular'):
    f = ImageFont.truetype(FONT, size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f

def wrap(d, text, f, width):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=f) <= width:
            cur = t
        else:
            lines.append(cur); cur = w
    if cur:
        lines.append(cur)
    return lines

def base(kicker, title):
    im = Image.new('RGB', (W, H), BG)
    d = ImageDraw.Draw(im)
    for y in range(H):  # soft blue glow at the top
        a = max(0, 1 - y / 360)
        d.line([(0, y), (W, y)], fill=(int(7 + 6 * a), int(9 + 22 * a), int(13 + 46 * a)))
    d.rectangle([60, 56, 66, 92], fill=BLUE)
    d.text((80, 56), kicker.upper(), font=font(20, 'SemiBold'), fill=BLUE)
    d.text((80, 84), title, font=font(46, 'Bold'), fill=WHITE)
    return im, d

def footer(d, src):
    d.line([(60, H - 64), (W - 60, H - 64)], fill=LINE, width=1)
    f = font(17)
    lines = wrap(d, src, f, W - 300)
    d.text((60, H - 50), lines[0], font=f, fill=MUTED)
    d.text((W - 60, H - 50), 'hurfi.com', font=font(17, 'SemiBold'), fill=SOFT, anchor='ra')

def city(path, cityname, province, tiles, src, kicker='City guide · 2025 official figures'):
    im, d = base(kicker, '%s, %s' % (cityname, province) if province != cityname else cityname)
    x0, y0, gw, gh, gap = 60, 170, (W - 120 - 24) // 2, 196, 24
    for i, (big, label) in enumerate(tiles[:4]):
        x = x0 + (i % 2) * (gw + gap); y = y0 + (i // 2) * (gh + gap)
        d.rounded_rectangle([x, y, x + gw, y + gh], radius=18, fill=CARD, outline=LINE)
        d.text((x + 28, y + 24), big, font=font(52, 'Bold'), fill=BLUE)
        for k, ln in enumerate(wrap(d, label, font(22), gw - 56)[:3]):
            d.text((x + 28, y + 100 + k * 30), ln, font=font(22), fill=SOFT)
    footer(d, 'Source: ' + src)
    save(im, path)

def steps(path, title, items):
    im, d = base('Hurfi insights', '')
    f = font(40, 'Bold')
    tl = wrap(d, title, f, W - 160)[:2]
    for k, ln in enumerate(tl):
        d.text((80, 84 + k * 48), ln, font=f, fill=WHITE)
    top = 84 + len(tl) * 48 + 40
    cols, gap = 3, 24
    gw = (W - 120 - gap * (cols - 1)) // cols
    gh = (H - 90 - top - gap) // 2
    for i, label in enumerate(items[:6]):
        x = 60 + (i % cols) * (gw + gap); y = top + (i // cols) * (gh + gap)
        d.rounded_rectangle([x, y, x + gw, y + gh], radius=18, fill=CARD, outline=LINE)
        d.ellipse([x + 24, y + 24, x + 72, y + 72], fill=BLUE)
        d.text((x + 48, y + 48), str(i + 1), font=font(24, 'Bold'), fill=WHITE, anchor='mm')
        for k, ln in enumerate(wrap(d, label, font(26, 'SemiBold'), gw - 48)[:2]):
            d.text((x + 24, y + 92 + k * 34), ln, font=font(26, 'SemiBold'), fill=WHITE)
        if i < len(items) - 1 and (i % cols) < cols - 1:
            d.text((x + gw + gap / 2, y + gh / 2), '→', font=font(22, 'Bold'), fill=BLUE, anchor='mm')
    footer(d, 'Diagram: Hurfi')
    save(im, path)

def save(im, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + '.tmp'
    im.save(tmp, 'WEBP', quality=78, method=6)
    if os.path.exists(path) and open(path, 'rb').read() == open(tmp, 'rb').read():
        os.remove(tmp); return
    os.replace(tmp, path)
    print('image', path)
