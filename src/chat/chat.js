(function(){
const chat=document.querySelector('.chat'),bd=document.getElementById('chBd'),msgs=document.getElementById('msgs');let n=0;
const upd=()=>{ bd.textContent=n; bd.hidden=!(n&&chat.classList.contains('min')); };
document.getElementById('chMin').onclick=()=>{ chat.classList.remove('max'); chat.classList.toggle('min'); n=0; upd(); };
document.getElementById('chMax').onclick=()=>{ chat.classList.remove('min'); chat.classList.toggle('max'); n=0; upd(); setTimeout(()=>{ msgs.scrollTop=msgs.scrollHeight; },50); };
document.getElementById('chClr').onclick=()=>{ msgs.innerHTML=''; };
document.querySelector('.chead').addEventListener('dblclick',()=>{ if(chat.classList.contains('min')) chat.classList.remove('min'); });
addEventListener('keydown',e=>{ if(e.key==='Escape') chat.classList.remove('max'); });
new MutationObserver(l=>{ l.forEach(r=>r.addedNodes.forEach(x=>{ if(x.classList&&x.classList.contains('mrow')&&!x.classList.contains('mine')&&chat.classList.contains('min')){ n++; upd(); } })); }).observe(msgs,{childList:true});
/* ---- per-user quality ---- */
const Q=[['low','Low · 360p',360,'medium',500000],['hd','HD · 720p',720,'hd720',2500000],['fhd','Full HD · 1080p',1080,'hd1080',5000000],['uhd','Ultra HD · 4K',2160,'highres',12000000]];
let cq=store.get('fwp-q')||'hd'; const bQ=document.getElementById('bQ'),qm=document.getElementById('qMenu');
const cur=()=>Q.find(x=>x[0]===cq)||Q[1];
function applyYT(){ try{ if(yt&&yt.setPlaybackQuality){ yt.setPlaybackQuality(cur()[3]); } }catch(e){} }
function paint(){ bQ.textContent=cur()[1].split(' ')[0]==='Full'?'FHD':cur()[1].split(' ')[0]==='Ultra'?'4K':cur()[1].split(' ')[0]; qm.innerHTML=''; Q.forEach(x=>{ const b=document.createElement('button'); b.textContent=x[1]; b.className=x[0]===cq?'on':''; b.onclick=e=>{ e.stopPropagation(); cq=x[0]; store.set('fwp-q',cq); qm.classList.remove('on'); paint(); applyYT(); if(!isHost) send({t:'q',v:cq}); toast('🎞️ '+x[1]+(state.mode==='local'?' (local file → original quality)':'')); }; qm.appendChild(b); }); }
bQ.onclick=e=>{ e.stopPropagation(); qm.classList.toggle('on'); }; document.addEventListener('click',()=>qm.classList.remove('on')); paint();
setInterval(applyYT,5000);
window.onQ=function(m){ if(!isHost) return; const c=state.calls&&state.calls.get(m.fid); const q=Q.find(x=>x[0]===m.v); if(!c||!q) return;
  try{ c.peerConnection.getSenders().forEach(se=>{ if(se.track&&se.track.kind==='video'){ const p=se.getParameters(); if(!p.encodings||!p.encodings.length) p.encodings=[{}]; p.encodings[0].maxBitrate=q[4]; p.encodings[0].scaleResolutionDownBy=Math.max(1,(video.videoHeight||1080)/q[2]); se.setParameters(p); } }); }catch(e){} };
window.sendQ=()=>{ if(!isHost) send({t:'q',v:cq}); };
})();