from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
root = Path(__file__).resolve().parents[1]
font = instantiateVariableFont(TTFont(root / "public/fonts/space-grotesk.woff2"), {"wght": 600})
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
scale = 37 / font["head"].unitsPerEm
name_paths = []
x = 70
for char in "InnovaSoft":
    name = cmap[ord(char)]
    pen = SVGPathPen(glyphs)
    glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, x, 46)))
    name_paths.append(pen.getCommands())
    x += glyphs[name].width * scale - .3
width = round(x + 2)
symbol = '<path d="M44 17H27c-7 0-11 4-11 11v5h11v-5h17V17Z" fill="MINT"/><path d="M20 47h17c7 0 11-4 11-11v-5H37v5H20v11Z" fill="PINK"/><path d="m28 32 4-4 4 4-4 4-4-4Z" fill="INK"/>'
for variant, ink, mint, pink in [("dark", "#f6f4ef", "#98ebca", "#f7b1e4"), ("light", "#171a21", "#286d52", "#994875")]:
    mark = symbol.replace("MINT", mint).replace("PINK", pink).replace("INK", ink)
    paths = ''.join('<path fill="' + ink + '" d="' + d + '"/>' for d in name_paths)
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} 64"><title>InnovaSoft</title>{mark}{paths}</svg>'
    (root / f"public/src/innovasoft-isologo-{variant}.svg").write_text(svg, encoding="utf8")
mark = symbol.replace("MINT", "#98ebca").replace("PINK", "#f7b1e4").replace("INK", "#f6f4ef")
(root / "public/src/innovasoft-symbol.svg").write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>InnovaSoft</title><circle cx="32" cy="32" r="32" fill="#11151c"/>' + mark + '</svg>',encoding="utf8")
print("Brand assets generated; outlines contain no external font dependencies.")
