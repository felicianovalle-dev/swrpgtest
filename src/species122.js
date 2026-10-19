/* Encounter-local recovery context. Never persists into a character save. */
(()=>{
 'use strict';
 let scope=null;
 const active=()=>S.species==='phydolon'&&$('patientSelect')?.value==='pc'&&['cool','discipline'].includes($('recoveryAction')?.value);
 const key=()=>`${S.species}:${S.medical.encounter}:${S.medical.day}:${S.world?.day}:${S.world?.currentHub}:${$('patientSelect')?.value}:${$('recoveryAction')?.value}`;
 function hasPhydolonCompanion(){return active()&&scope===key()&&$('phydolonCompanion122')?.checked===true;}
 function clearContext(){scope=null;if($('phydolonCompanion122'))$('phydolonCompanion122').checked=false;}
 function renderRecovery(){
  if(!$('recoveryPreview'))return;
  let box=$('phydolonContext122');
  if(!box){box=document.createElement('div');box.id='phydolonContext122';box.className='creation-note97';box.innerHTML='<label style="display:flex;align-items:center;gap:8px"><input style="width:auto;flex:0 0 auto" type="checkbox" id="phydolonCompanion122"> Another Phydolon is present</label><p>When alone, Symbiont Isolation reduces positive end-of-encounter strain recovery by one, to a minimum of one. Confirm who is present for this recovery. This context is cleared on load, a new encounter/day, leaving Recovery, or a change of recovery action or patient.</p>';$('recoveryPreview').before(box);$('phydolonCompanion122').onchange=updateRecoveryPreview;}
  const current=key();if(!active()||scope!==current)$('phydolonCompanion122').checked=false;scope=active()?current:null;box.classList.toggle('hidden',!active());
 }
 window.Species122={renderRecovery,hasPhydolonCompanion,clearContext};
 Game97.on('hydrate',()=>{clearContext();renderRecovery();});
 Game97.on('navigate',({id})=>{if(id==='recovery')renderRecovery();else clearContext();});
})();
