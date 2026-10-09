/* Navigation-only follow-up. Existing Jobs & Training workflows remain authoritative. */
(function(){
  'use strict';
  function installWorldShortcuts95(){
    const footer=document.getElementById('worldFooter94');if(!footer||footer.querySelector('.world-worklinks95'))return;
    const work=document.createElement('div');work.className='world-worklinks95';work.setAttribute('aria-label','Jobs and training shortcuts');
    work.innerHTML='<button type="button" class="world-button94" data-world-shortcut95="jobs">◆ Jobs</button><button type="button" class="world-button94" data-world-shortcut95="training">✦ Training</button>';
    footer.insertBefore(work,footer.firstChild);
    work.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>openWorkHub96(b.dataset.worldShortcut95)));
  }
  // Measure the actual world controls: landscape, safe areas and larger text
  // can change their height. Keep the menu inside the gap between them.
  function fitWorldMenu95(){
    if(!window.matchMedia('(max-width:850px), (orientation:landscape) and (max-height:520px) and (max-width:950px)').matches||!document.body.classList.contains('world-play94'))return;
    const bar=document.getElementById('worldBar94'),footer=document.getElementById('worldFooter94');
    if(!bar||!footer)return;
    const top=Math.ceil(bar.getBoundingClientRect().bottom+8);
    const bottom=Math.ceil(window.innerHeight-footer.getBoundingClientRect().top+8);
    document.documentElement.style.setProperty('--world-menu-top95',top+'px');
    document.documentElement.style.setProperty('--world-menu-bottom95',bottom+'px');
  }
  if(typeof syncWorldUI94==='function'){
    const originalSync=syncWorldUI94;
    syncWorldUI94=function(){const result=originalSync.apply(this,arguments);fitWorldMenu95();return result};
  }
  let menuResize95;
  function observeWorldControls95(){
    if(menuResize95||typeof ResizeObserver==='undefined')return;
    const bar=document.getElementById('worldBar94'),footer=document.getElementById('worldFooter94');
    if(!bar||!footer)return;
    menuResize95=new ResizeObserver(fitWorldMenu95);
    menuResize95.observe(bar);menuResize95.observe(footer);
  }
  window.addEventListener('resize',fitWorldMenu95);
  if(typeof ensureWorldUI94==='function'){
    const original=ensureWorldUI94;
    ensureWorldUI94=function(){const result=original.apply(this,arguments);installWorldShortcuts95();observeWorldControls95();return result};
    installWorldShortcuts95();observeWorldControls95();fitWorldMenu95();
  }
})();
