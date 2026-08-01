from rembg import remove
from PIL import Image, ImageFilter

img = remove(Image.open("assets/source/3d-model-reference-photos/formal-front-01.jpeg"))
img = img.convert("RGBA")
w, h = img.size

# crop off the bottom watermark strip
img = img.crop((0, 0, w, h - 70))

# clean fringe: erode the alpha mask more aggressively to trim color-bleed edge pixels
r, g, b, a = img.split()
a_eroded = a.filter(ImageFilter.MinFilter(9))
a_smooth = a_eroded.filter(ImageFilter.GaussianBlur(1.5))
img = Image.merge("RGBA", (r, g, b, a_smooth))

img.save("public/assets/hero-real-face-nobg.png")
print("saved", img.size)
