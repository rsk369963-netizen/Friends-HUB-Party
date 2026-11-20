(function(){
$('#bExit').onclick=()=>{
  if(state.mode==='stream'){ try{ state.inCall&&state.inCall.close(); }catch(e){} state.inCall=null; video.srcObject=null;
    if(state.localMeta&&state.blob){ setMode('local'); setNow(state.localMeta.name.replace(/\.[^.]+$/,'')); } else setMode(null); toast('✖ Stream exited'); sysMsg('✖ '+myName+' left the stream'); }
  else if(state.streaming){ stopStream(); toast('⏹ Stream ended'); }
  updateStreamBtn();
};
const SZ=[['fit','Fit (full video)','contain'],['fill','Fill (crop to screen)','cover'],['str','Stretch','fill'],['half','Half size','contain'],['full','Full view ⛶','contain']];
let sz=store.get('fwp-sz')||'fit'; const bS=$('#bSz'),sm=$('#szMenu');
function applySz(k,fs){ const x=SZ.find(a=>a[0]===k)||SZ[0]; sz=x[0]; store.set('fwp-sz',sz); video.style.objectFit=x[2]; stage.classList.toggle('half',sz==='half');
  bS.textContent='⛶ '+x[1].split(' ')[0]; sm.innerHTML=''; SZ.forEach(a=>{ const b=document.createElement('button'); b.textContent=a[1]; b.className=a[0]===sz?'on':'';
    b.onclick=e=>{ e.stopPropagation(); sm.classList.remove('on'); if(a[0]==='full'){ applySz(sz==='full'?'fit':sz); toggleFs(); } else applySz(a[0]); }; sm.appendChild(b); }); }
bS.onclick=e=>{ e.stopPropagation(); $('#qMenu').classList.remove('on'); sm.classList.toggle('on'); };
document.addEventListener('click',()=>sm.classList.remove('on'));
if(sz==='full') sz='fit'; applySz(sz);
})();