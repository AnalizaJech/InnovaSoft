from pathlib import Path
from PIL import Image
media = Path(__file__).resolve().parents[1] / 'docs' / 'media'
frames = []
for name in ['library', 'filter', 'saved', 'module', 'audio', 'content', 'quiz', 'accessibility', 'dark']:
    image = Image.open(media / f'{name}.jpg').convert('RGB')
    image.thumbnail((1012, 576), Image.Resampling.LANCZOS)
    frames.append(image.quantize(colors=192, method=Image.Quantize.MEDIANCUT))
frames[0].save(media / 'demo.gif', save_all=True, append_images=frames[1:], duration=[2200,1600,1800,2200,2200,2600,2400,2400,1800], loop=0, optimize=True, disposal=2)
print(f'GIF creado: {(media / "demo.gif").stat().st_size:,} bytes; {len(frames)} vistas reales')
