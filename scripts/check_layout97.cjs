/* Browser regression: actual geometry, hit targets, reload and saved continuation.
   Run with the installed Playwright Chromium, or set CHROMIUM_PATH explicitly. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),output=path.resolve(root,'../qa97');
fs.mkdirSync(output,{recursive:true});
const viewports=[[320,568],[375,667],[390,844],[428,926],[844,390],[852,393],[1280,800]];
const checks=[],errors=[];
let browser,server;
(async()=>{
 const html=fs.readFileSync(path.join(root,'index.html'));
 server=http.createServer((request,response)=>{response.setHeader('Content-Type','text/html; charset=utf-8');response.end(html)});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--disable-dev-shm-usage']});
 const context=await browser.newContext({hasTouch:true,serviceWorkers:'block'});
 const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
 await page.goto(`http://127.0.0.1:${server.address().port}/`);
 await page.waitForFunction(()=>window.Game97?.ready);
 await page.evaluate(()=>{S.finalized=true;S.visual75.tutorialSeen=true;S.settings.reducedMotion=true;renderAll();});
 for(const [width,height]of viewports){
  const label=`${width}x${height}`;await page.setViewportSize({width,height});
  await page.evaluate(()=>{renderNavTab('pixelworld67');WORLD94.menu=false;WORLD94.drawer=false;syncWorldUI94();fitWorld94();});
  await page.locator('#worldMenu94').click();
  const geometry=await page.evaluate(()=>{
   const nav=document.getElementById('sidebar78').getBoundingClientRect(),bar=document.getElementById('worldBar94').getBoundingClientRect(),footer=document.getElementById('worldFooter94').getBoundingClientRect();
   const buttons=[...document.querySelectorAll('#worldFooter94 button')].filter(button=>{const r=button.getBoundingClientRect();return r.width>0&&r.height>0});
   return {navTop:nav.top,navBottom:nav.bottom,barBottom:bar.bottom,footerTop:footer.top,
    targets:buttons.every(button=>{const r=button.getBoundingClientRect();return button.contains(document.elementFromPoint(r.left+r.width/2,r.top+r.height/2))}),
    overflow:document.documentElement.scrollWidth>innerWidth+1};
  });
  assert.equal(geometry.targets,true,`${label}: menu covers a World footer target`);
  assert.equal(geometry.overflow,false,`${label}: horizontal overflow`);
  if(width<=950){assert.ok(geometry.navTop>=geometry.barBottom,`${label}: menu overlaps header`);assert.ok(geometry.navBottom<=geometry.footerTop,`${label}: menu overlaps footer`);}
  checks.push(`${label}: World menu and footer stay separate with working hit targets`);
  await page.locator('[data-world-shortcut95="training"]').click();
  assert.equal(await page.evaluate(()=>S.downtime96.panel),'training');
  await page.locator('#jobsTab96').click();assert.equal(await page.evaluate(()=>S.downtime96.panel),'jobs');
  checks.push(`${label}: visible Jobs and Training route correctly`);
  await page.evaluate(()=>renderNavTab('pixelworld67'));await page.locator('#worldSave94').click();
  await page.locator('#manualSave97').click();
  assert.equal(await page.locator('#save97').isVisible(),true);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${label}: save screen overflows`);
  assert.ok(await page.locator('#save97').textContent().then(text=>text.includes('Manual save written')));
  checks.push(`${label}: save choices fit and manual save succeeds`);
  if(width===390)await page.screenshot({path:path.join(output,'saves-phone.png'),fullPage:true});
 }
 await page.setViewportSize({width:390,height:844});
 await page.evaluate(()=>{S.credits=789;openWorkHub96('training');S.downtime96.studySkill='Medicine';renderWorkHub96();save();});
 await page.reload();await page.waitForFunction(()=>window.Game97?.ready);
 assert.equal(await page.locator('#hubResumeLatest97').isVisible(),true,'Reload does not offer the saved campaign');
 await page.locator('#hubResumeLatest97').click();
 assert.deepEqual(await page.evaluate(()=>({screen:activeTabId78(),panel:S.downtime96.panel,skill:S.downtime96.studySkill,credits:S.credits})),{screen:'worktraining96',panel:'training',skill:'Medicine',credits:789});
 checks.push('Real page reload restores the saved Training screen, selection and credits');
 const baseline=await page.evaluate(()=>JSON.stringify({skills:S.skills,credits:S.credits,xp:S.earnedXp}));
 await page.evaluate(()=>{renderNavTab('pixelworld67');pxSwitchMap67('cantinaInterior');pxPos67().x=16;pxPos67().y=18;save();});
 await page.screenshot({path:path.join(output,'cantina-phone.png')});
 await page.reload();await page.waitForFunction(()=>window.Game97?.ready);await page.locator('#hubResumeLatest97').click();
 assert.deepEqual(await page.evaluate(()=>({screen:activeTabId78(),map:pixelCurrentMap67().id,x:pxPos67().x,y:pxPos67().y})),{screen:'pixelworld67',map:'cantinaInterior',x:16,y:18});
 assert.equal(await page.evaluate(()=>JSON.stringify({skills:S.skills,credits:S.credits,xp:S.earnedXp})),baseline);
 checks.push('Real World reload restores map and position without changing progression');
 await page.setViewportSize({width:844,height:390});await page.locator('#worldMenu94').click();await page.setViewportSize({width:390,height:844});
 await page.waitForFunction(()=>{const n=document.getElementById('sidebar78').getBoundingClientRect(),f=document.getElementById('worldFooter94').getBoundingClientRect();return n.bottom<=f.top;},{},{timeout:2000});
 checks.push('Rotation keeps the menu above the footer');
 assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(output,'browser-results.json'),JSON.stringify({checks,errors,engine:'Chromium; not native Safari validation'},null,2));
 console.log(JSON.stringify({passed:checks.length,checks,errors},null,2));
})().catch(error=>{console.error(error);process.exitCode=1}).finally(async()=>{await browser?.close();server?.close()});
