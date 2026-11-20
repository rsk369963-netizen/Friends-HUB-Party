(function(){
const $q=s=>document.querySelector(s);
/* ===== Exit / Back / Remove user (Phase 2) ===== */
let leaving=0,dlgOpen=null;const appOn=()=>!$q('#app').hidden,home=()=>location.href.split('?')[0].split('#')[0];
function closeDlg(v){const d=$q('#fwpDlg');if(d)d.hidden=true;const r=dlgOpen;dlgOpen=null;if(r)r(v);}
window.fwpAsk=function(o){ // styled confirm -> Promise<boolean>; only one dialog at a time
 if(dlgOpen)return Promise.resolve(false);
 let d=$q('#fwpDlg');if(!d){d=document.createElement('div');d.id='fwpDlg';d.className='modal';d.setAttribute('role','alertdialog');d.setAttribute('aria-modal','true');document.body.appendChild(d);
  d.addEventListener('click',e=>{if(e.target===d)closeDlg(false);});}
 d.innerHTML='';const c=document.createElement('div');c.className='mcard glass';
 const mk=(tg,cl,tx)=>{const e=document.createElement(tg);if(cl)e.className=cl;e.textContent=tx;return e;};
 c.append(mk('div','dI',o.icon||'❓'),mk('h3','',o.title),mk('p','',o.msg));
 const row=mk('div','dB','');const no=mk('button','',o.no||'Stay'),ok=mk('button',o.danger?'danger':'primary',o.ok||'OK');
 no.onclick=()=>closeDlg(false);ok.onclick=()=>closeDlg(true);row.append(no,ok);c.appendChild(row);d.appendChild(c);d.hidden=false;
 setTimeout(()=>no.focus(),30);
 return new Promise(res=>{dlgOpen=res;});};
addEventListener('keydown',e=>{if(e.key==='Escape'&&dlgOpen)closeDlg(false);});
function goHome(){if(leaving&&goHome.d)return;leaving=1;goHome.d=1;
 try{if(!isHost&&conn&&conn.open)conn.send({t:'bye'});}catch(e){}
 setTimeout(()=>{try{if(conn)conn.close();}catch(e){}try{if(peer)peer.destroy();}catch(e){}setTimeout(()=>location.replace(home()),120);},isHost?0:150);}
function leaveFlow(){if(leaving||dlgOpen||!appOn())return;
 fwpAsk(isHost?{icon:'🚪',title:'Exit as Admin?',msg:'This room runs from your device, so leaving will end it for everyone in the room.',ok:'End room & exit',no:'Stay in room',danger:true}
  :{icon:'🚪',title:'Leave the room?',msg:'You will exit the room and return to the home screen. Others will see that you left.',ok:'Leave',no:'Stay',danger:true}).then(y=>{if(y&&!leaving)goHome();});}
const hb=$q('#homeBtn');if(hb){hb.onclick=leaveFlow;hb.textContent='← Exit Room';hb.title='Exit room';}
let pushed=0;new MutationObserver(()=>{if(appOn()&&!pushed){pushed=1;history.pushState({fwp:1},'');}}).observe($q('#app'),{attributes:true,attributeFilter:['hidden']});
addEventListener('popstate',()=>{if(!appOn()||leaving)return;history.pushState({fwp:1},'');
 if(dlgOpen){closeDlg(false);return;}
 if(window.PP_BACK&&PP_BACK())return;const pm=$q('#pmodal');if(pm&&!pm.hidden){pm.hidden=true;return;}
 if(curTab!=='P'){showTab('P');return;}leaveFlow();});
window.fwpKick=function(id){if(!isHost||id===myId())return;const c=conns.get(id);
 if(!c||!c.__p||c.__kicked||c.__kicking){toast('That user is already disconnected.');return;}
 const nm=c.__p.name;c.__kicking=1;
 fwpAsk({icon:'⛔',title:'Remove '+nm+'?',msg:nm+' will be disconnected from this room. They can only come back by joining again with the room code.',ok:'Remove user',no:'Cancel',danger:true}).then(y=>{
  if(!y){c.__kicking=0;return;}
  if(conns.get(id)!==c||!c.open){c.__kicking=0;toast(nm+' is already disconnected.');return;}
  c.__kicked=1;rawSend(c,stamp({t:'kick'}));
  const note=stamp({t:'note',k:'kicked',n:nm});conns.forEach((oc,oid)=>{if(oid!==id)rawSend(oc,note);});
  sysMsg(t('sysKick',{n:nm}),'kick');toast('✅ '+nm+' removed');
  setTimeout(()=>{try{c.close();}catch(e){}setTimeout(()=>{if(conns.get(id)===c)peerGone(c);},500);},300);});};
window.fwpKicked=function(m){const h=roster.find(r=>r.host);if(!h||h.id!==m.fid||leaving)return;leaving=1;sysMsg('You were removed from the room by the Admin.','kick');toast('⛔ You were removed by the Admin');setTimeout(()=>{goHome.d=0;goHome();},1800);};
/* ===== 20-theme expandable selector ===== */
/* ===== 20-theme INLINE expandable selector: expands in normal page flow, never a popup/overlay/modal ===== */
const TH=[['violet','Midnight Galaxy','#07060d','#8b5cf6','#ec4899'],['neon','Neon Cyber','#04060f','#00f0ff','#ff00e5','#a5f3fc'],['ocean','Ocean Blue','#07060d','#06b6d4','#3b82f6'],['royal','Royal Purple','#0b0618','#7c3aed','#c026d3','#ddd6fe'],['sunset','Sunset Glow','#07060d','#f97316','#ef4444'],['aurora','Aurora Dreams','#04100f','#34d399','#818cf8','#a7f3d0'],['emerald','Emerald Forest','#07060d','#10b981','#84cc16'],['rose','Rose Gold','#07060d','#fb7185','#f59e0b'],['crimson','Crimson Night','#0d0306','#dc2626','#7f1d1d','#fecaca'],['frost','Arctic Frost','#050b14','#7dd3fc','#38bdf8','#e0f2fe'],['gold','Golden Luxury','#0b0903','#f5c76b','#b45309','#fde68a'],['tropic','Tropical Paradise','#03110e','#14b8a6','#f59e0b','#99f6e4'],['candy','Candy Pop','#14061a','#f472b6','#60a5fa','#fbcfe8'],['volt','Electric Violet','#08031a','#8b5cf6','#3b82f6','#c4b5fd'],['cyberpunk','Cyberpunk City','#0a0314','#fde047','#ec4899','#fef08a'],['space','Deep Space','#02030a','#6366f1','#0ea5e9','#c7d2fe'],['white','Silver Chrome','#f4f4f5','#ffffff','#d4d4d8'],['cherry','Cherry Blossom','#160810','#f9a8d4','#fb7185','#fce7f3'],['black','Dark Carbon','#000000','#3f3f46','#71717a'],['rainbow','Rainbow Fusion','#07060d','#ef4444','#3b82f6','#fde68a','linear-gradient(135deg,#ef4444,#f59e0b,#22c55e,#3b82f6,#a855f7)']];
const OLD=['violet','ocean','sunset','emerald','rose','black','white'],rgb=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16)).join(',');
let css='';TH.forEach(T=>{if(!OLD.includes(T[0]))css+='html[data-theme='+T[0]+']{--bg:'+T[2]+';--a:'+T[3]+';--b:'+T[4]+';--ar:'+rgb(T[3])+';--br:'+rgb(T[4])+';--soft:'+(T[5]||'#fff')+(T[6]?';--grad:'+T[6]:'')+'}';});
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const swc=T=>T[6]?T[6]:'linear-gradient(135deg,'+T[3]+','+T[4]+')';
let themeK='violet';
const themeObj=()=>TH.find(x=>x[0]===themeK)||TH[0];
function themeMark(){const cur=themeObj();document.querySelectorAll('.themesw').forEach(box=>{
 box.querySelectorAll('.thi').forEach(i=>{const on=i.dataset.k===themeK;i.classList.toggle('on',on);i.setAttribute('aria-pressed',on);});
 const sw=box.querySelector('.thb .sw'),nm=box.querySelector('.thb .tn');if(sw)sw.style.background=swc(cur);if(nm)nm.textContent=cur[1];});}
window.buildThemes=function(){document.querySelectorAll('.themesw').forEach((box,n)=>{const open=box.dataset.o==='1',cur=themeObj();box.innerHTML='';box.classList.add('thx');box.classList.toggle('open',open);
 const gid='thg'+n,b=document.createElement('button');b.type='button';b.className='thb';b.setAttribute('aria-expanded',open);b.setAttribute('aria-controls',gid);
 const s=document.createElement('i');s.className='sw';s.style.background=swc(cur);
 const tt=document.createElement('span');tt.className='tt';tt.textContent=(typeof t==='function'?t('themeT'):'Theme');
 const nm=document.createElement('span');nm.className='tn';nm.textContent=cur[1];const ch=document.createElement('span');ch.className='chev';ch.textContent='⌄';ch.setAttribute('aria-hidden','true');
 b.append(s,tt,nm,ch);
 const g=document.createElement('div');g.className='thg';g.id=gid;g.setAttribute('role','group');g.setAttribute('aria-label','Themes');
 TH.forEach(T=>{const i=document.createElement('button');i.type='button';i.className='thi'+(T[0]===themeK?' on':'');i.dataset.k=T[0];i.setAttribute('aria-pressed',T[0]===themeK);i.title=T[1];
  const c=document.createElement('i');c.className='sw';c.style.background=swc(T);const m=document.createElement('small');m.textContent=T[1];i.append(c,m);i.onclick=()=>applyTheme(T[0]);g.appendChild(i);});
 b.onclick=()=>{const o=box.dataset.o==='1';box.dataset.o=o?'0':'1';box.classList.toggle('open',!o);b.setAttribute('aria-expanded',String(!o));};
 box.append(b,g);});};
window.applyTheme=function(k){const T=TH.find(x=>x[0]===k)||TH[0];themeK=T[0];if(T[0]==='violet')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',T[0]);store.set('fwp-theme',T[0]);themeMark();};
themeK=(TH.find(x=>x[0]===store.get('fwp-theme'))||TH[0])[0];buildThemes();applyTheme(themeK);

})();