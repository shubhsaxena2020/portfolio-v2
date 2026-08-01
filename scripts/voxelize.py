"""Sample public/assets/headshot-nobg.png into a voxel grid JSON for the React Three Fiber hero.

Usage: python scripts/voxelize.py
Reads:  public/assets/headshot-nobg.png (RGBA, background already removed)
Writes: src/data/voxel-grid.json
"""

import json
from pathlib import Path
from PIL import Image

SRC = Path(__file__).resolve().parent.parent / "public" / "assets" / "headshot-nobg.png"
OUT = Path(__file__).resolve().parent.parent / "src" / "data" / "voxel-grid.json"

GRID_HEIGHT = 64
ALPHA_THRESHOLD = 40  # skip cells that are mostly transparent background


def main():
    img = Image.open(SRC).convert("RGBA")
    aspect = img.width / img.height
    grid_w = round(GRID_HEIGHT * aspect)
    small = img.resize((grid_w, GRID_HEIGHT), Image.LANCZOS)

    cells = []
    for y in range(GRID_HEIGHT):
        for x in range(grid_w):
            r, g, b, a = small.getpixel((x, y))
            if a < ALPHA_THRESHOLD:
                continue
            cells.append(
                {
                    "x": x,
                    "y": GRID_HEIGHT - 1 - y,  # flip so image isn't upside down in 3D space (y-up)
                    "r": r,
                    "g": g,
                    "b": b,
                }
            )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        json.dumps({"cols": grid_w, "rows": GRID_HEIGHT, "cells": cells}),
        encoding="utf-8",
    )
    print(f"wrote {len(cells)} cells ({grid_w}x{GRID_HEIGHT} grid) to {OUT}")


if __name__ == "__main__":
    main()
