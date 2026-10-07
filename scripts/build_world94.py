"""Embed the World layer in the downloadable, offline single-file game."""
from pathlib import Path
import base64,json,re

root=Path(__file__).resolve().parents[1]
path=root/'index.html';source=path.read_text()
css=(root/'src/world94.css').read_text();js=(root/'src/world94.js').read_text()
building=(root/'assets/buildings94.webp').read_bytes()
building_uri='data:image/webp;base64,'+base64.b64encode(building).decode()
frames=(root/'assets/buildings94-frames.json').read_text()
js='const BUILDING94_URI='+json.dumps(building_uri)+';\nconst BUILDING94_FRAMES='+frames+';\n'+js
png=(root/'assets/characters94.webp').read_bytes()
uri='data:image/webp;base64,'+base64.b64encode(png).decode()
source=re.sub(r'(characters:\s*[\'\"])(data:image/[^\'\"]+)',lambda m:m[1]+uri,source,count=1)
boot="try{renderAll();markBoot90('Visual layer loaded successfully · Expanded World · corrected sprite frames.',true)}catch(e){showRuntimeError(`Recovered on opening: ${e.message}`);markBoot90('Core RPG opened; visual recovery active.',false)}"
layer='<style id="world94Styles">\n'+css+'</style><script id="world94Script">\n'+js+'\n'+boot+'</script>'
if '<style id="world94Styles">' in source:
 source=re.sub(r'<style id="world94Styles">[\s\S]*?</script>',lambda m:layer,source,count=1)
else:
 old="try{renderAll();markBoot90('Visual layer loaded successfully · Reference Art Pass · iPhone-safe startup.',true)}catch(e){showRuntimeError(`Recovered on opening: ${e.message}`);markBoot90('Core RPG opened; visual recovery active.',false)}"
 assert old in source
 source=source.replace(old+'</script>','</script>'+layer)
# Navigation shortcuts must not steal A/W/S/D movement in the World.
source=source.replace("let map={g:'guide',a:'adventure'", "if(document.body.classList.contains('world-play94'))return;\n  let map={g:'guide',a:'adventure'") if "if(document.body.classList.contains('world-play94'))return;\n  let map={g:" not in source else source
source=source.replace("function pxTap67(ev){\n", "function pxTap67(ev){\n  if(PX67.dialog)return;\n") if 'function pxTap67(ev){\n  if(PX67.dialog)' not in source else source
source=source.replace("let k=e.key.toLowerCase(),mv=", "if(PX67.dialog)return;\n  let k=e.key.toLowerCase(),mv=") if 'if(PX67.dialog)return;\n  let k=' not in source else source
source=source.replace("PX67.tile===16&&PX67.viewW===24", "PX67.tile===16&&PX67.viewW>=12")
source=source.replace("$('pixelCanvas67').width===768&&$('pixelCanvas67').height===512", "$('pixelCanvas67').width===PX67.canvasW*2&&$('pixelCanvas67').height===PX67.canvasH*2")
source=source.replace('scaleX=rect.width/cv.width,scaleY=rect.height/cv.height','scaleX=rect.width/PX67.canvasW,scaleY=rect.height/PX67.canvasH')
path.write_text(source)
manifest=json.loads((root/'manifest.webmanifest').read_text());manifest.update(name='Sable Reach — Expanded World',start_url='./index.html?v=94',description='Full-screen exploration, corrected sprites, and handcrafted frontier architecture.')
(root/'manifest.webmanifest').write_text(json.dumps(manifest,indent=2)+'\n')
sw=(root/'sw.js').read_text();sw=re.sub(r"const CACHE='[^']+';","const CACHE='sable-reach-v1-9-world94-viewport';",sw);(root/'sw.js').write_text(sw)
print(f'Embedded World UI and repaired atlas; {len(source):,} characters. Save schema remains 92.')
