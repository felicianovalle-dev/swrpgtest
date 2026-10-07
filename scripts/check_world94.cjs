/* Targeted state/canvas regression checks. CSS layout is checked in a browser. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {JSDOM,VirtualConsole}=require('jsdom');
const {createCanvas,Image}=require('@napi-rs/canvas');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,'../qa94');fs.mkdirSync(out,{recursive:true});
let surface={width:1339,height:810},errors=[],canvases=new WeakMap(),vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'),{url:'https://felicianovalle-dev.github.io/swrpgtest/',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){
 w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});w.HTMLElement.prototype.scrollIntoView=function(){};w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};w.confirm=()=>true;w.alert=()=>{};
 w.HTMLElement.prototype.getBoundingClientRect=function(){if(this.classList.contains('pixel-stage67'))return {x:0,y:0,left:0,top:0,width:surface.width,height:surface.height,right:surface.width,bottom:surface.height};if(this.id==='pixelCanvas67')return {x:0,y:0,left:0,top:0,width:parseFloat(this.style.width)||surface.width,height:parseFloat(this.style.height)||surface.height};return {x:0,y:0,left:0,top:0,width:0,height:0}};
 w.HTMLCanvasElement.prototype.getContext=function(){let found=canvases.get(this);if(!found){let cv=createCanvas(this.width||300,this.height||150),ctx=cv.getContext('2d'),draw=ctx.drawImage.bind(ctx);ctx.drawImage=function(im,...args){if(im instanceof w.HTMLCanvasElement){im.getContext('2d');im=canvases.get(im).cv}return draw(im,...args)};found={cv,ctx};canvases.set(this,found)}if(found.cv.width!==this.width)found.cv.width=this.width;if(found.cv.height!==this.height)found.cv.height=this.height;return found.ctx};
 w.HTMLCanvasElement.prototype.toDataURL=function(){this.getContext('2d');return canvases.get(this).cv.toDataURL()};
 w.Image=function(){const im=new Image(),listeners={};im.addEventListener=(k,fn)=>{listeners[k]=fn;if(k==='load'&&im.complete)queueMicrotask(fn)};im.onload=()=>listeners.load?.();im.onerror=e=>listeners.error?.(e);Object.defineProperty(im,'naturalWidth',{get(){return im.width}});Object.defineProperty(im,'naturalHeight',{get(){return im.height}});return im};
}});
const w=dom.window,run=code=>w.eval(code);let checks=[];
const check=(name,fn)=>{assert.ok(fn(),name);checks.push(name)};
const exportCanvas=(id,file)=>{const cv=w.document.getElementById(id);cv.getContext('2d');fs.writeFileSync(path.join(out,file),canvases.get(cv).cv.toBuffer('image/png'))};
(async()=>{
 await new Promise(r=>setTimeout(r,1200));run("renderNavTab('pixelworld67');pxSwitchMap67('sableTown');");
 await new Promise(r=>setTimeout(r,200));run('fitWorld94()');
 console.log('art readiness',run('({building:BUILDING_ART94.image?.complete,width:BUILDING_ART94.image?.naturalWidth,characters:ART82.images.characters?.naturalWidth})'));
 check('Dedicated building atlas decodes',()=>run('BUILDING_ART94.image?.complete&&BUILDING_ART94.image?.naturalWidth===960'));
 check('No startup/runtime errors',()=>errors.length===0&&w.document.querySelector('#runtimeError').classList.contains('hidden'));
 check('World owns the active layout',()=>w.document.body.classList.contains('world-play94'));
 check('One header and one footer',()=>w.document.querySelectorAll('#worldBar94').length===1&&w.document.querySelectorAll('#worldFooter94').length===1);
 check('Details are initially closed',()=>w.document.getElementById('worldDrawer94').hidden);
 for(const viewport of [{name:'desktop',width:1339,height:810},{name:'laptop',width:1256,height:590},{name:'iphone',width:390,height:710},{name:'landscape',width:844,height:280}]){
  surface=viewport;run('fitWorld94()');const dims=run('({cols:PX67.viewW,rows:PX67.viewH,w:PX67.canvasW,h:PX67.canvasH})'),cv=w.document.getElementById('pixelCanvas67');
  check(viewport.name+' canvas fits and keeps tile proportions',()=>parseFloat(cv.style.width)<=surface.width&&parseFloat(cv.style.height)<=surface.height&&Math.abs(parseFloat(cv.style.width)/parseFloat(cv.style.height)-dims.w/dims.h)<.01);
  const p=run('({...pxPos67()})'),map=run('pixelCurrentMap67()');const next=run('(()=>{let m=pixelCurrentMap67(),p=pxPos67();return [[1,0],[-1,0],[0,1],[0,-1]].map(([dx,dy])=>({x:p.x+dx,y:p.y+dy})).find(n=>pxWalkable67(m,n.x,n.y))})()');
  if(next){const cam=run('pxCamera67(pixelCurrentMap67(),pxPos67())');run(`pxTap67({clientX:${(next.x-cam.x+.5)*parseFloat(cv.style.width)/dims.cols},clientY:${(next.y-cam.y+.5)*parseFloat(cv.style.height)/dims.rows}})`);check(viewport.name+' pointer uses logical camera coordinates',()=>run('PX67.path.length')===1);run('pxStopPath67()')}
 }
 surface={width:1339,height:810};run("fitWorld94();pxPos67().x=23;pxPos67().y=12;pxDraw67()");exportCanvas('pixelCanvas67','town.png');
 for(const id of ['sableTown','cantinaInterior','brokerInterior','clinicInterior','ship']){
  run(`pxSwitchMap67('${id}')`);
  const bad=run("(()=>{let m=pixelCurrentMap67(),p=pxPos67();return [...m.objects,...m.npcs].filter(o=>o.kind!=='ship').filter(o=>Math.abs(p.x-o.x)+Math.abs(p.y-o.y)>1&&!pxFindPath67(m,p,o,true).length).map(o=>o.id)})()");
  check(id+' all interactions reachable',()=>bad.length===0);if(id==='cantinaInterior')exportCanvas('pixelCanvas67','cantina.png');
 }
 run("pxSwitchMap67('sableTown');openVisualDialogue69(pixelCurrentMap67().npcs.find(n=>n.id==='n4-vi'))");exportCanvas('portrait69','n4-vi.png');
 check('N4-VI has four working social approaches',()=>w.document.querySelectorAll('#pixelDialog67 [data-visual-social69]').length===4);
 check('Social details start collapsed',()=>!w.document.querySelector('#pixelDialog67 details').open);
 check('Dialogue blocks accidental walking',()=>{const p=run('JSON.stringify(pxPos67())');w.document.getElementById('pixelCanvas67').dispatchEvent(new w.KeyboardEvent('keydown',{key:'a',bubbles:true}));return p===run('JSON.stringify(pxPos67())')});
 run('closePixelDialog67()');w.document.getElementById('worldMap94').click();check('Travel drawer toggles',()=>!w.document.getElementById('worldDrawer94').hidden);w.document.getElementById('worldDrawerClose94').click();
 w.document.getElementById('worldMenu94').click();check('System menu opens',()=>w.document.body.classList.contains('menu-open94'));
 run("renderNavTab('equipment')");check('Other menus restore their layout',()=>!w.document.body.classList.contains('world-play94'));
 run("renderNavTab('pixelworld67');pxPos67().x=23;pxPos67().y=12");w.document.getElementById('pixelCanvas67').focus();w.document.getElementById('pixelCanvas67').dispatchEvent(new w.KeyboardEvent('keydown',{key:'a',bubbles:true}));check('A walks left without opening Adventure',()=>run('pxPos67().x')===22&&w.document.body.classList.contains('world-play94'));
 const before=run('JSON.stringify({skills:S.skills,credits:S.credits,xpSpent:S.xpSpent,visual:S.visual67.positions})');run('save()');check('Save preserves skills, credits, XP and positions',()=>before===run('JSON.stringify({skills:S.skills,credits:S.credits,xpSpent:S.xpSpent,visual:S.visual67.positions})'));check('Save schema remains 92',()=>run('serializableState().schemaVersion')===92);
 const smoke=await run('runSableReachSmoke().then(r=>({passed:r.passed.length,failed:r.failed}))');assert.equal(smoke.failed.length,0,JSON.stringify(smoke.failed));const diagnostics=run('phase45Diagnostics()');assert.equal(diagnostics.filter(r=>!r.ok).length,0);
 const result={targeted:checks.length,checks,smoke,diagnostics:{passed:diagnostics.length,failed:0},errors};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));w.close();
})().catch(e=>{console.error(e);w.close();process.exit(1)});
