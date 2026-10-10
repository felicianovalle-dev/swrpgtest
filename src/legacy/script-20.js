
/* iOS / PWA startup hotfix:
   - historical phase boot renders are removed above
   - only the newest render pipeline runs
   - visual failures fall back without taking down the core RPG
   - startup diagnostic is retained for screenshots/debugging
*/
(function(){
  const standalone = window.matchMedia?.('(display-mode: standalone)')?.matches || navigator.standalone===true;
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform==='MacIntel' && navigator.maxTouchPoints>1);
  window.__SABLE_PWA_SAFE__={standalone,isiOS,version:'92.1'};
  window.addEventListener('pageshow',()=>{
    try{
      if(standalone && isiOS){
        document.documentElement.dataset.iosPwaSafe='1';
        // Reduce one class of Safari paint pressure without changing gameplay.
        document.body?.classList.add('ios-pwa-safe921');
      }
    }catch(_e){}
  },{once:true});
})();
