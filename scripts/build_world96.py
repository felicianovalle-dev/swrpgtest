"""Embed the mobile and downtime phases after the standalone World layer."""
from pathlib import Path
import json, re, runpy

root = Path(__file__).resolve().parents[1]
runpy.run_path(str(root / 'scripts/build_world94.py'), run_name='__main__')
path = root / 'index.html'
source = path.read_text()
css = '\n'.join((root / name).read_text() for name in ['src/mobile95.css', 'src/work96.css'])
js = (root / 'src/work96.js').read_text()
boot = "try{renderAll();markBoot90('Ready · Jobs & Training · mobile layout repaired.',true)}catch(e){showRuntimeError(`Recovered on opening: ${e.message}`);markBoot90('Core RPG opened; downtime recovery active.',false)}"
layer = '<style id="downtime96Styles">\n' + css + '</style><script id="downtime96Script">\n' + js + '\n' + boot + '</script>'
if '<style id="downtime96Styles">' in source:
    source = re.sub(r'<style id="downtime96Styles">[\s\S]*?</script>', lambda match: layer, source, count=1)
else:
    assert '</body>' in source
    source = source.replace('</body>', layer + '\n</body>', 1)
path.write_text(source)
manifest_path = root / 'manifest.webmanifest'
manifest = json.loads(manifest_path.read_text())
manifest.update(name='Sable Reach — Jobs & Training', start_url='./index.html?v=96', description='Full-screen pixel exploration, accessible paid work and training, and an iPhone-safe mobile interface.')
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
sw_path = root / 'sw.js'
sw_path.write_text(re.sub(r"const CACHE='[^']+';", "const CACHE='sable-reach-v1-9-phase96-jobs-mobile';", sw_path.read_text()))
print('Embedded phases 95–96. Save schema and existing save keys remain 92.')
