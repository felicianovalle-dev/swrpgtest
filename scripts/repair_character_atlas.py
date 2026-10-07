"""Normalize inspected sprite bounds into isolated, padded 48x56 frames.

The old compact atlas assumed every archetype shared the same vertical centers.
Its alien and droid columns have different baselines. Retain complete poses and
discard partial neighboring poses and guide colors instead of slicing a grid.
"""
from pathlib import Path
from PIL import Image
import re, base64, io
import sys
from collections import deque

ROOT = Path(__file__).resolve().parents[1]
if len(sys.argv)>1:
    atlas=Image.open(sys.argv[1]).convert('RGBA')
else:
    source = (ROOT / 'index.html').read_text()
    if 'id="world94Script"' in source:
        raise SystemExit('Already repaired. Pass the original atlas path to repeat extraction.')
    uri = re.search(r'characters:\s*[\'\"](data:image/[^\'\"]+)', source).group(1)
    atlas = Image.open(io.BytesIO(base64.b64decode(uri.split(',')[1]))).convert('RGBA')
# Explicit bounds from the source artwork, not inferred evenly spaced centers.
bounds = [
    [(0,56),(56,112),(112,168),(168,224)],
    [(0,56),(56,112),(112,168),(168,224)],
    [(0,56),(56,112),(112,168),(168,224)],
    [(0,56),(56,112),(112,168),(168,224)],
    [(101,155),(43,98),(101,155),(158,215)],
    [(159,215),(44,100),(101,157),(159,215)],
    [(159,215),(44,100),(101,157),(159,215)],
    [(159,215),(43,100),(101,157),(159,215)],
    [(153,207),(32,90),(94,150),(153,207)],
    [(36,83),(36,83),(94,148),(151,206)],
    [(151,207),(32,89),(94,148),(151,207)],
    [(151,208),(34,89),(94,151),(151,208)],
]
out = Image.new('RGBA', (576,224))
for col, poses in enumerate(bounds):
    for row, (top, bottom) in enumerate(poses):
        sprite = atlas.crop((col*48,max(0,top-5) if col>=4 else top,(col+1)*48,bottom))
        px = sprite.load()
        # These saturated guide colors belong to the old reference background.
        for y in range(sprite.height):
            for x in range(sprite.width):
                r,g,b,a = px[x,y]
                guide = (g>140 and g>r*1.6 and g>b*1.35) or (r>175 and b>170 and g<110) or (g>150 and b>150 and r<70)
                if guide: px[x,y]=(0,0,0,0)
        # Keep the principal connected figure. Tiny distant guide fragments are
        # deliberately excluded; detached nearby highlights remain attached.
        seen=set(); parts=[]
        for y in range(sprite.height):
            for x in range(sprite.width):
                if (x,y) in seen or px[x,y][3]<32: continue
                part=[]; q=deque([(x,y)]); seen.add((x,y))
                while q:
                    xx,yy=q.popleft();part.append((xx,yy))
                    for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)]:
                        nx,ny=xx+dx,yy+dy
                        if 0<=nx<sprite.width and 0<=ny<sprite.height and (nx,ny) not in seen and px[nx,ny][3]>=32:
                            seen.add((nx,ny));q.append((nx,ny))
                parts.append(part)
        main=max(parts,key=len); keep=set(main)
        for part in parts:
            if part is main:continue
            if len(part)<30 and any((x+dx,y+dy) in keep for x,y in part for dx in range(-2,3) for dy in range(-2,3)):
                keep.update(part)
        for y in range(sprite.height):
            for x in range(sprite.width):
                if (x,y) not in keep:px[x,y]=(0,0,0,0)
        sprite=sprite.crop(sprite.getbbox())
        scale=min(42/sprite.width,50/sprite.height,1)
        if scale<1:sprite=sprite.resize((round(sprite.width*scale),round(sprite.height*scale)),Image.Resampling.NEAREST)
        out.alpha_composite(sprite,(col*48+(48-sprite.width)//2,row*56+53-sprite.height))
(ROOT/'assets').mkdir(exist_ok=True)
out.save(ROOT/'assets/characters94.webp',lossless=True,method=6)
print('Repaired 48 frames; each has padding and one complete figure.')
