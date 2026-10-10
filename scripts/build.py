"""Generate the standalone game from authoritative source, never from index.html."""
from pathlib import Path
import argparse
import base64
import json

ROOT = Path(__file__).resolve().parents[1]

def data_uri(name):
    return 'data:image/webp;base64,' + base64.b64encode((ROOT / name).read_bytes()).decode()

def build_html():
    source = (ROOT / 'src/template.html').read_text()
    for entry in json.loads((ROOT / 'src/source-map.json').read_text()):
        assert source.count(entry['marker']) == 1, entry['marker']
        content = (ROOT / entry['path']).read_text().replace('@@CHARACTER_ATLAS@@', data_uri('assets/characters94.webp'))
        source = source.replace(entry['marker'], entry['open'] + content + entry['close'])
    css = '\n'.join((ROOT / name).read_text() for name in [
        'src/mobile95.css', 'src/work96.css',
        'src/navigation95.css', 'src/save97.css', 'src/home.css'])
    world = ('const BUILDING94_URI=' + json.dumps(data_uri('assets/buildings94.webp')) + ';\n'
             + 'const BUILDING94_FRAMES=' + (ROOT / 'assets/buildings94-frames.json').read_text() + ';\n'
             + (ROOT / 'src/world94.js').read_text())
    js = '\n'.join([world] + [(ROOT / name).read_text() for name in [
        'src/work96.js', 'src/navigation95.js', 'src/runtime97.js',
        'src/save97.js', 'src/visual97.js', 'src/objectives.js', 'src/home.js', 'src/play-copy.js']])
    boot = "try{Game97.boot();markBoot90('Ready to play.',true)}catch(e){showRuntimeError(`Opening failed: ${e.message}`)}"
    layer = '<style id="world94Styles">\n' + (ROOT / 'src/world94.css').read_text() + '</style><style id="downtime96Styles">\n' + css + '</style><script id="downtime96Script">\n' + js + '\n' + boot + '</script>\n'
    assert source.count('</body>') == 1
    return source.replace('</body>', layer + '</body>')

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true', help='Check generated output without writing it')
    args = parser.parse_args()
    html = build_html()
    if args.check:
        assert (ROOT / 'index.html').read_text() == html, 'index.html differs from authoritative source; run npm run build'
        print('Generated HTML matches authoritative source.')
        return
    (ROOT / 'index.html').write_text(html)
    print(f'Built standalone game: {len(html.encode()):,} bytes. Save schema remains 92.')

if __name__ == '__main__':
    main()
