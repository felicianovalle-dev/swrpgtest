"""Create the standalone PWA download without local dependencies or saves."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import sys

root = Path(__file__).resolve().parents[1]
target = Path(sys.argv[1]).resolve()
target.parent.mkdir(parents=True, exist_ok=True)
files = [root / name for name in ['index.html', 'manifest.webmanifest', 'sw.js', 'README.md', 'package.json', 'package-lock.json']]
for folder in ['assets', 'icons', 'src', 'scripts', 'qa']:
    files.extend(path for path in (root / folder).rglob('*') if path.is_file() and '__pycache__' not in path.parts)
with ZipFile(target, 'w', ZIP_DEFLATED) as bundle:
    for path in sorted(files):
        bundle.write(path, 'sable_reach_expanded_world/' + str(path.relative_to(root)))
print(f'{target}: {len(files)} files, {target.stat().st_size:,} bytes')
