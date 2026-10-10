#!/usr/bin/env python3
from pathlib import Path
import subprocess,tempfile,zipfile,sys,json,os,base64
root=Path(__file__).resolve().parent
with tempfile.TemporaryDirectory(prefix='hamlet-quiet-build-') as tmp:
    out=Path(tmp)/'bundle.js'
    cached=[p.parent/'bin/esbuild' for p in (Path.home()/'.npm/_npx').glob('*/node_modules/esbuild/package.json') if json.loads(p.read_text()).get('version')=='0.25.12']
    command=[os.environ['ESBUILD_PATH']] if os.environ.get('ESBUILD_PATH') else ([str(cached[0])] if cached else ['npm','exec','--yes','--package=esbuild@0.25.12','--','esbuild'])
    subprocess.run(command+[str(root/'app.js'),'--bundle','--format=iife','--minify','--legal-comments=inline',f'--outfile={out}'],check=True,cwd=root)
    text=(root/'source.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+(root/'style.css').read_text()+'</style>')
    text=text.replace('<script type="module" src="app.js"></script>','<script>'+out.read_text().replace('</script','<\\/script')+'</script>')
    poster=root/'previews/town.png'
    if poster.exists():text=text.replace('__POSTER__','data:image/png;base64,'+base64.b64encode(poster.read_bytes()).decode())
    else:text=text.replace('__POSTER__','previews/town.png')
    (root/'index.html').write_text(text)
print('Built offline quiet-town/index.html')
if '--package' in sys.argv:
    target=root/'Hamlet-Quiet-Town.zip'
    with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:
        for f in root.rglob('*'):
            if f.is_file() and f.suffix not in ('.zip','.pyc') and '__pycache__' not in f.parts:
                z.write(f,Path('Hamlet Quiet Town')/f.relative_to(root))
    print(target)
