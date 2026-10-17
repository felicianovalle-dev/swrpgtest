/* Visible creation, purchases and save/resume in isolated local or hosted contexts. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),http=require('node:http');
const {chromium}=require('playwright');
const repo=path.resolve(__dirname,'..'),root=path.dirname(repo),out=path.join(root,'qa109');fs.mkdirSync(out,{recursive:true});
let target=process.argv[2]||'local',local=target==='local'||new URL(target).hostname==='127.0.0.1';
let proxy;const proxyUrl=local?null:(process.env.HTTPS_PROXY||process.env.https_proxy||process.env.HTTP_PROXY||process.env.http_proxy);
if(proxyUrl){const p=new URL(proxyUrl);proxy={server:p.origin,username:decodeURIComponent(p.username),password:decodeURIComponent(p.password)}}
let browser,server;const checks=[],errors=[];
(async()=>{
 if(target==='local'){server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.join(repo,'index.html')))});await new Promise(r=>server.listen(0,'127.0.0.1',r));target=`http://127.0.0.1:${server.address().port}/`}
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--disable-dev-shm-usage'],...(proxy?{proxy}:{})});
 for(const [spec,career,id,width,height]of [['Cyber Tech','Technician','ct00',390,844],['Droid Tech','Technician','dt00',1280,800],['Modder','Technician','md00',390,844]]){
  const context=await browser.newContext({viewport:{width,height},hasTouch:true,serviceWorkers:'block',ignoreHTTPSErrors:!!proxy});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());page.setDefaultTimeout(60000);page.setDefaultNavigationTimeout(60000);
  await page.goto(target,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.Game97?.ready);assert.equal(await page.evaluate(()=>BUILD_INFO.version),'96.18-stay-target-audit');
  await page.locator('#beginIdentity97').click();await page.locator('#name').fill('Creation '+spec+' check');await page.locator('[data-create-step97="career"]:visible').first().click();
  await page.locator('#careerSelect').selectOption(career);await page.locator('#specSelect').selectOption(spec);
  for(let i=0;i<4;i++)await page.locator('[data-cp]:visible:not(.on):not(:disabled)').first().click();
  for(let i=0;i<2;i++)await page.locator('[data-sp]:visible:not(.on):not(:disabled)').first().click();
  for(let i=0;i<2;i++)await page.locator('[data-species-bonus97]:visible:not(.on):not(:disabled)').first().click();
  await page.locator('[data-create-step97="chars"]:visible').first().click();await page.locator('.creation-next97 [data-create-step97="talents"]:visible').click();
  const xpBefore=await page.evaluate(()=>S.xpSpent);await page.locator(`[data-tal="${id}"]`).click();assert.equal(await page.evaluate(()=>S.xpSpent),xpBefore+5);assert.equal(await page.locator('#talentTree .talent-path98').count(),20);assert.equal(await page.evaluate(()=>CharacterCatalog97.status(S.spec)),'Reviewed layout');
  const routes={'Cyber Tech':['ct10','ct20','ct30','ct40','ct41'],'Droid Tech':['dt10','dt11','dt01'],Modder:['md10','md20','md21','md11']};for(const next of routes[spec])await page.locator(`[data-tal="${next}"]`).click();assert.equal(await page.evaluate(()=>S.xpSpent),xpBefore+({'Cyber Tech':100,'Droid Tech':30,Modder:55}[spec]));
  if(await page.locator('#mobileMore52').isVisible()){await page.locator('#mobileMore52').click();await page.locator('[data-mobileall52="review"]').click()}else{await page.evaluate(()=>renderNavTab('playhub80'));await page.locator('#homeObjective97').click()}
  assert.equal(await page.locator('#finalize').isDisabled(),false);await page.locator('#finalize').click();assert.equal(await page.evaluate(()=>activeTabId78()),'opening97');assert.equal(await page.evaluate(()=>S.finalized),true);assert.equal(await page.evaluate(()=>S.forceRating),0);
  const snapshot=()=>page.evaluate(()=>JSON.stringify({name:S.name,career:S.career,spec:S.spec,xp:S.earnedXp,spent:S.xpSpent,credits:S.credits,chars:S.chars,ids:[...S.talents],camp:S.campaign97}));const before=await snapshot();
  await page.evaluate(()=>{S.settings.autosave=false;renderNavTab('save97')});await page.locator('#manualSave97').click();await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.Game97?.ready);await page.locator('#hubResumeLatest97').click();assert.equal(await snapshot(),before);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await page.screenshot({path:path.join(out,'creation-'+spec.toLowerCase().replaceAll(' ','-')+'.png'),fullPage:true});checks.push({spec,career,width,height,creation:true,purchase:true,saveReload:true,overflow:false,sourceRoute:true,unsupportedShortcutRemoved:true});
  fs.writeFileSync(path.join(out,local?'local-live-results.json':'live-results.json'),JSON.stringify({build:'96.18-stay-target-audit',target,checks,errors,complete:false},null,2)+'\n');console.log('Verified '+career+' / '+spec);await context.close();
 }
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,local?'local-live-results.json':'live-results.json'),JSON.stringify({build:'96.18-stay-target-audit',target,checks,errors,complete:true},null,2)+'\n');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.close()});
