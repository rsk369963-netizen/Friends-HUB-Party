/* ================= GAMES + SCOREBOARD + THEMES ================= */
(function(){
'use strict';
const PCOL=['#ef4444','#22c55e','#eab308','#3b82f6','#a855f7','#f97316','#14b8a6','#ec4899','#84cc16','#06b6d4'];
const PTS=[10,6,3,1,1,1,1,1];
const BOTN=['Bolt','Maya','Rocky','Zara','Neo','Pixel','Vega','Dash','Blaze','Echo'];
const DICE='⚀⚁⚂⚃⚄⚅';
const rnd=n=>Math.floor(Math.random()*n);
const pick=a=>a[rnd(a.length)];
const shuffle=a=>{ for(let i=a.length-1;i>0;i--){ const j=rnd(i+1); const x=a[i]; a[i]=a[j]; a[j]=x; } return a; };
function h(tag,cls,txt){ const e=document.createElement(tag); if(cls) e.className=cls; if(txt!=null) e.textContent=txt; return e; }
function btn(cls,txt,fn){ const b=h('button',cls,txt); if(fn) b.onclick=fn; return b; }
Object.assign(D,{
  gOver:['Game mudinjuchu','Game over','கேம் முடிந்தது'],
  gChooseHub:['Oru game select pannu','Pick a game','ஒரு கேம் தேர்வு செய்யுங்கள்'],
  gInv:['{n} unnai {g} vilaiyaada kooptrar','{n} invited you to play {g}','{n} உங்களை {g} விளையாட அழைக்கிறார்'],gAcc:['✅ Accept','✅ Accept','✅ ஏற்கிறேன்'],gDec:['❌ Decline','❌ Decline','❌ வேண்டாம்'],
  gWaitAdmin:['Admin game select pannuvaar — unakku request varum','Admin picks the game — you will get a request','அட்மின் கேம் தேர்வு செய்வார் — உங்களுக்கு request வரும்'],gMode:['Mode','Mode','Mode'],gFFA:['Everyone','Everyone','அனைவரும்'],gResume:['▶ Resume game','▶ Resume game','▶ தொடர்'],gEnd:['End game','End game','கேம் முடி'],gGo:['GO!','GO!','GO!'],
  gSoloNote:['Tip: yaarum illana 🤖 Bot add pannitu try pannalaam','Tip: nobody around? Add a 🤖 bot and try it','டிப்: யாரும் இல்லையெனில் 🤖 Bot சேர்த்து விளையாடலாம்']
});
const GAMES={};
const ORDER=['pong2p','ttt','c4','chess','ludo','carrom','biz','quiz','snl','rps','mem','type'];

/* ---------------- Tic Tac Toe ---------------- */
const TL=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
GAMES.ttt={name:'Tic Tac Toe',emoji:'❌',c1:'#38bdf8',c2:'#6366f1',min:2,max:2,
  init(){ return {b:Array(9).fill(-1),turn:0,w:-1,win:null,draw:false}; },
  actors(s){ return (s.w>=0||s.draw)?[]:[s.turn]; },
  act(s,i,a){ if(i!==s.turn||s.w>=0||s.draw||!(a.c>=0&&a.c<9)||s.b[a.c]!==-1) return false;
    s.b[a.c]=i; const L=TL.find(l=>l.every(x=>s.b[x]===i));
    if(L){ s.w=i; s.win=L; } else if(s.b.every(x=>x>=0)) s.draw=true; else s.turn=1-i; return true; },
  bot(s,i){ const e=[]; s.b.forEach((v,k)=>{ if(v===-1) e.push(k); });
    const find=p=>{ for(const l of TL){ const v=l.map(x=>s.b[x]); if(v.filter(x=>x===p).length===2&&v.includes(-1)) return l[v.indexOf(-1)]; } return -1; };
    let c=find(i); if(c<0) c=find(1-i); if(c<0&&s.b[4]===-1&&Math.random()<.85) c=4; if(c<0) c=pick(e); return {c}; },
  over(s){ if(s.w>=0) return {rank:[s.w,1-s.w]}; if(s.draw) return {rank:[0,1],draw:true}; return null; },
  render(el,s,ctx){ el.innerHTML=''; const bd=h('div','ttb');
    for(let k=0;k<9;k++){ const v=s.b[k]; const b=h('button',(v===0?'X':v===1?'O':'')+(s.win&&s.win.includes(k)?' win':''),v===0?'✕':v===1?'◯':'');
      b.disabled=!(ctx.can&&v===-1); b.onclick=()=>ctx.act({c:k}); bd.appendChild(b); }
    el.appendChild(bd); }
};

/* ---------------- Connect 4 ---------------- */
function c4win(b,r,c,p){
  for(const[dr,dc] of [[0,1],[1,0],[1,1],[1,-1]]){
    const cells=[r*7+c];
    for(const sg of [1,-1]){ let rr=r+dr*sg,cc=c+dc*sg; while(rr>=0&&rr<6&&cc>=0&&cc<7&&b[rr*7+cc]===p){ cells.push(rr*7+cc); rr+=dr*sg; cc+=dc*sg; } }
    if(cells.length>=4) return cells;
  }
  return null;
}
function c4row(b,c){ let r=5; while(r>=0&&b[r*7+c]!==-1) r--; return r; }
GAMES.c4={name:'Connect 4',emoji:'🔴',c1:'#ef4444',c2:'#eab308',min:2,max:2,
  init(){ return {b:Array(42).fill(-1),turn:0,w:-1,win:null,draw:false}; },
  actors(s){ return (s.w>=0||s.draw)?[]:[s.turn]; },
  act(s,i,a){ const c=a.c; if(i!==s.turn||s.w>=0||s.draw||!(c>=0&&c<7)) return false; const r=c4row(s.b,c); if(r<0) return false;
    s.b[r*7+c]=i; const W=c4win(s.b,r,c,i); if(W){ s.w=i; s.win=W; } else if(s.b.every(x=>x>=0)) s.draw=true; else s.turn=1-i; return true; },
  bot(s,i){ const cols=[0,1,2,3,4,5,6].filter(c=>c4row(s.b,c)>=0);
    const wins=(c,p)=>{ const r=c4row(s.b,c); if(r<0) return false; const b=s.b.slice(); b[r*7+c]=p; return !!c4win(b,r,c,p); };
    for(const c of cols) if(wins(c,i)) return {c};
    for(const c of cols) if(wins(c,1-i)) return {c};
    const safe=cols.filter(c=>{ const r=c4row(s.b,c); if(r<=0) return true; const b=s.b.slice(); b[r*7+c]=i; return !c4win(b,r-1,c,1-i)&&!(function(){ b[(r-1)*7+c]=1-i; return !!c4win(b,r-1,c,1-i); })(); });
    const pool=safe.length?safe:cols; const W=[1,2,3,5,3,2,1]; let tot=0; pool.forEach(c=>tot+=W[c]); let x=Math.random()*tot;
    for(const c of pool){ x-=W[c]; if(x<=0) return {c}; } return {c:pool[0]}; },
  over(s){ if(s.w>=0) return {rank:[s.w,1-s.w]}; if(s.draw) return {rank:[0,1],draw:true}; return null; },
  render(el,s,ctx){ el.innerHTML=''; const bd=h('div','c4b');
    for(let r=0;r<6;r++) for(let c=0;c<7;c++){ const v=s.b[r*7+c]; const b=h('button',(v>=0?'p'+v:'')+(s.win&&s.win.includes(r*7+c)?' win':''));
      b.disabled=!(ctx.can&&c4row(s.b,c)>=0); b.onclick=()=>ctx.act({c}); bd.appendChild(b); }
    el.appendChild(bd); }
};

/* ---------------- Snakes & Ladders ---------------- */
const SN={16:6,47:26,49:11,56:53,62:19,64:60,87:24,93:73,95:75,98:78};
const LD={1:38,4:14,9:31,21:42,28:84,36:44,51:67,71:91,80:100};
GAMES.snl={name:'Snakes & Ladders',emoji:'🐍',c1:'#22c55e',c2:'#0ea5e9',min:2,max:4,live:false,
  init(n){ return {n,pos:Array(n).fill(0),turn:0,last:null,w:-1}; },
  actors(s){ return s.w>=0?[]:[s.turn]; },
  act(s,i,a){ if(a.a!=='roll'||i!==s.turn||s.w>=0) return false;
    const d=1+rnd(6), from=s.pos[i]; let np=from+d, k='', fin; if(np>100) np=from;
    fin=np; if(np!==from){ if(SN[np]){ k='s'; fin=SN[np]; } else if(LD[np]){ k='l'; fin=LD[np]; } }
    s.pos[i]=fin; s.last={i,d,from,hit:np,to:fin,k};
    if(fin===100) s.w=i; else if(d!==6) s.turn=(s.turn+1)%s.n; return true; },
  bot(){ return {a:'roll'}; },
  over(s){ if(s.w<0) return null; const o=[...s.pos.keys()].filter(i=>i!==s.w).sort((a,b)=>s.pos[b]-s.pos[a]); return {rank:[s.w,...o]}; },
  scores(s){ return s.pos; },
  log(s,ctx){ const l=s.last; if(!l) return ''; return ctx.players[l.i].name+' 🎲'+l.d+(l.k==='s'?' 🐍 ↓'+l.to:l.k==='l'?' 🪜 ↑'+l.to:' → '+l.to); },
  render(el,s,ctx){ el.innerHTML='';
    const bd=h('div','snl'); const at={}; s.pos.forEach((p,i)=>{ (at[p]=at[p]||[]).push(i); });
    for(let v=0;v<10;v++){ const r=9-v; for(let c=0;c<10;c++){ const n=r*10+(r%2===0?c+1:10-c);
      const cell=h('div','c'+((r+c)%2?' alt':'')+(SN[n]?' sn':LD[n]?' lad':'')); cell.appendChild(h('span',null,String(n)));
      const em=h('em',null,SN[n]?'🐍'+SN[n]:LD[n]?'🪜'+LD[n]:''); cell.appendChild(em);
      const tk=h('div','tk'); (at[n]||[]).forEach(i=>{ const d=h('i',null,String(i+1)); d.style.background=PCOL[i]; tk.appendChild(d); }); cell.appendChild(tk); bd.appendChild(cell); } }
    el.appendChild(bd);
    if(at[0]) el.appendChild(h('div','glog','🏁 '+at[0].map(i=>ctx.players[i].name).join(', ')));
    const db=h('div','dicebox'+(s.last?' roll':''),s.last?DICE[s.last.d-1]:'🎲'); el.appendChild(db);
    if(ctx.can) el.appendChild(btn('primary rbtn',t('gRoll'),()=>ctx.act({a:'roll'}))); }
};

/* ---------------- Rock Paper Scissors ---------------- */
const RPSE=['✊','✋','✌️'];
function rpsRes(s){
  const ty=new Set(s.pk); let w=[];
  if(ty.size===2){ const[x,y]=[...ty]; const wt=((x-y+3)%3===1)?x:y; s.pk.forEach((v,i)=>{ if(v===wt) w.push(i); }); w.forEach(i=>s.sc[i]++); }
  s.rev={pk:s.pk.slice(),w}; s.pk=s.pk.map(()=>-1); s.round++;
  if(s.round>s.max){ const top=Math.max(...s.sc); if(s.sc.filter(x=>x===top).length===1||s.round>10) s.done=true; }
}
GAMES.rps={name:'Rock Paper Scissors',emoji:'✊',c1:'#f59e0b',c2:'#ef4444',min:2,max:6,
  init(n){ return {n,round:1,max:5,pk:Array(n).fill(-1),sc:Array(n).fill(0),rev:null,done:false}; },
  actors(s){ return s.done?[]:[...s.pk.keys()].filter(i=>s.pk[i]<0); },
  act(s,i,a){ if(s.done||s.pk[i]!==-1||![0,1,2].includes(a.k)) return false; s.pk[i]=a.k; if(s.pk.every(v=>v>=0)) rpsRes(s); return true; },
  bot(){ return {k:rnd(3)}; },
  over(s){ if(!s.done) return null; const idx=shuffle([...s.sc.keys()]).sort((a,b)=>s.sc[b]-s.sc[a]); const draw=s.sc.every(x=>x===s.sc[0]); return {rank:idx,draw}; },
  scores(s){ return s.sc; },
  render(el,s,ctx){ el.innerHTML='';
    el.appendChild(h('div','glog',t('gRound',{i:Math.min(s.round,s.max),n:s.max})+(s.round>s.max?' ⚡':'')));
    const row=h('div','rps'); const mine=ctx.me>=0?s.pk[ctx.me]:-1;
    RPSE.forEach((e,k)=>{ const b=h('button',mine===k?'sel':'',e); b.disabled=!(ctx.can&&s.pk[ctx.me]===-1); b.onclick=()=>ctx.act({k}); row.appendChild(b); }); el.appendChild(row);
    if(mine>=0) el.appendChild(h('div','glog','✓ '+RPSE[mine]));
    if(s.rev){ const box=h('div','rpsh'); const r=h('div','r'); s.rev.pk.forEach((v,i)=>{ r.appendChild(h('span',null,ctx.players[i].av+' '+RPSE[v]+(s.rev.w.includes(i)?' 🏆':''))); }); box.appendChild(r); el.appendChild(box); } }
};

/* ---------------- Memory Match ---------------- */
const MEMJ=['🍎','🍌','🍇','🍓','🍒','🥝','🍉','🍍','🥥','🍑','🍋','🥭'];
GAMES.mem={name:'Memory Match',emoji:'🃏',c1:'#a855f7',c2:'#ec4899',min:2,max:4,
  init(n){ const e=shuffle(MEMJ.slice()).slice(0,8); return {n,cards:shuffle([...e,...e]),st:Array(16).fill(0),ow:Array(16).fill(-1),turn:0,first:-1,pend:null,sc:Array(n).fill(0),known:Array(16).fill(0),done:false}; },
  actors(s){ return (s.done||s.pend)?[]:[s.turn]; },
  act(s,i,a,now){ if(s.done||i!==s.turn||s.pend) return false; const c=a.c; if(!(c>=0&&c<16)||s.st[c]!==0) return false;
    s.st[c]=1; s.known[c]=1; if(s.first<0){ s.first=c; return true; }
    const f=s.first; s.first=-1;
    if(s.cards[f]===s.cards[c]){ s.st[f]=2; s.st[c]=2; s.ow[f]=i; s.ow[c]=i; s.sc[i]++; if(s.st.every(x=>x===2)) s.done=true; }
    else s.pend={a:f,b:c,at:now+1300};
    return true; },
  tick(s,now){ if(s.pend&&now>=s.pend.at){ s.st[s.pend.a]=0; s.st[s.pend.b]=0; s.pend=null; s.turn=(s.turn+1)%s.n; return true; } return false; },
  bot(s){ const hid=[]; for(let k=0;k<16;k++) if(s.st[k]===0) hid.push(k); if(!hid.length) return null;
    const known=hid.filter(k=>s.known[k]); const unk=hid.filter(k=>!s.known[k]);
    if(s.first>=0){ const m=known.find(k=>s.cards[k]===s.cards[s.first]); if(m!=null&&Math.random()<.8) return {c:m}; return {c:pick(unk.length?unk:hid)}; }
    for(const a of known){ const b=known.find(k=>k!==a&&s.cards[k]===s.cards[a]); if(b!=null&&Math.random()<.8) return {c:a}; }
    return {c:pick(unk.length?unk:hid)}; },
  over(s){ if(!s.done) return null; const idx=[...s.sc.keys()].sort((a,b)=>s.sc[b]-s.sc[a]); return {rank:idx,draw:s.sc.every(x=>x===s.sc[0])}; },
  scores(s){ return s.sc; },
  render(el,s,ctx){ el.innerHTML=''; const g=h('div','mem');
    for(let k=0;k<16;k++){ const st=s.st[k]; const b=h('button',st===1?'up':st===2?'m':'',st?s.cards[k]:'');
      if(st===2&&s.ow[k]>=0) b.style.boxShadow='0 0 0 3px '+PCOL[s.ow[k]]+' inset';
      b.disabled=!(ctx.can&&st===0); b.onclick=()=>ctx.act({c:k}); g.appendChild(b); }
    el.appendChild(g); }
};

/* ---------------- Typing Race ---------------- */
const TXT=['Friends oda movie paakurathu dhaan best time pass and popcorn irundha semma mass.',
  'The quick brown fox jumps over the lazy dog while the rain falls softly tonight.',
  'Every great story starts with one small step and a lot of courage to begin.',
  'Chennai marina beach sunset with hot sundal and friends is a perfect evening.',
  'Practice makes you faster, so keep your eyes on the text and your fingers moving.'];
GAMES.type={name:'Typing Race',emoji:'⌨️',c1:'#06b6d4',c2:'#3b82f6',min:2,max:6,live:true,botDelay:0,
  init(n){ return {n,text:pick(TXT),start:Date.now()+4500,pr:Array(n).fill(0),fin:Array(n).fill(0),cps:Array(n).fill(0).map(()=>(22+rnd(30))*5/60),done:false,limit:100000}; },
  actors(s){ return s.done?[]:[...s.fin.keys()].filter(i=>!s.fin[i]); },
  act(s,i,a,now){ if(now<s.start||s.done||s.fin[i]) return false; const p=Math.max(0,Math.min(s.text.length,a.p|0)); if(p<=s.pr[i]) return false;
    s.pr[i]=p; if(p===s.text.length) s.fin[i]=Math.max(1,now-s.start); if(s.fin.every(x=>x)) s.done=true; return true; },
  tick(s,now){ if(!s.done&&now>s.start+s.limit){ s.done=true; return true; } return false; },
  bot(s,i,now){ if(now<s.start||s.fin[i]) return null; const tg=Math.min(s.text.length,Math.floor((now-s.start)/1000*s.cps[i])); return tg>s.pr[i]?{p:tg}:null; },
  over(s){ if(!s.done) return null; const idx=[...s.pr.keys()].sort((a,b)=>{ if(s.fin[a]&&s.fin[b]) return s.fin[a]-s.fin[b]; if(s.fin[a]) return -1; if(s.fin[b]) return 1; return s.pr[b]-s.pr[a]; }); return {rank:idx}; },
  scores(s){ return s.pr.map(p=>Math.round(p/s.text.length*100)+'%'); },
  status(s,ctx){ return null; },
  render(el,s,ctx){
    const key=ctx.sid+':'+s.start; const now=ctx.now();
    if(el.__tk!==key){
      el.__tk=key; el.innerHTML=''; el.__sent=0; el.__focus=false;
      el.appendChild(h('div','gcd')); el.appendChild(h('div','glog',t('gTypeThis')));
      el.appendChild(h('div','tyq')); const bars=h('div','tbars'); bars.style.cssText='width:100%;max-width:640px;display:flex;flex-direction:column;gap:6px'; el.appendChild(bars);
      if(ctx.me>=0){ const inp=h('input','tyin'); inp.type='text'; inp.autocomplete='off'; inp.autocapitalize='off'; inp.spellcheck=false; inp.disabled=true;
        inp.onpaste=e=>e.preventDefault();
        inp.oninput=()=>{ const v=inp.value; let k=0; while(k<v.length&&k<s.text.length&&v[k]===s.text[k]) k++; el.__paint(v,k); if(k>el.__sent){ el.__sent=k; ctx.act({p:k}); } };
        el.insertBefore(inp,bars); }
      el.__paint=(v,k)=>{ const q=el.querySelector('.tyq'); q.innerHTML=''; const T=s.text;
        const a=h('span','ok',T.slice(0,k)); q.appendChild(a);
        const wl=Math.max(0,Math.min(v.length,T.length)-k); if(wl) q.appendChild(h('span','bad',T.slice(k,k+wl)));
        if(k+wl<T.length){ q.appendChild(h('span','cur',T[k+wl])); q.appendChild(document.createTextNode(T.slice(k+wl+1))); } };
      el.__paint('',0);
    }
    const cd=el.querySelector('.gcd'); const left=s.start-now;
    cd.textContent=left>0?String(Math.ceil(left/1000)):(left>-1200?t('gGo'):''); cd.style.display=(left>-1200)?'':'none';
    const inp=el.querySelector('.tyin');
    if(inp){ const mineDone=ctx.me>=0&&s.fin[ctx.me]; inp.disabled=!(left<=0&&!s.done&&!mineDone); if(!inp.disabled&&!el.__focus){ el.__focus=true; try{ inp.focus(); }catch(e){} } }
    const bars=el.querySelector('.tbars'); bars.innerHTML='';
    ctx.players.forEach((p,i)=>{ const r=h('div','qmeta'); r.style.cssText='display:flex;align-items:center;gap:8px;color:inherit';
      r.appendChild(h('span',null,p.av+' '+p.name)); const bar=h('div','qbar'); bar.style.flex='1'; const f=h('i'); f.style.width=Math.round(s.pr[i]/s.text.length*100)+'%'; f.style.background=PCOL[i]; bar.appendChild(f); r.appendChild(bar);
      r.appendChild(h('span',null,s.fin[i]?('✅ '+(s.fin[i]/1000).toFixed(1)+'s · '+Math.round(s.text.length/5/(s.fin[i]/60000))+' WPM'):Math.round(s.pr[i]/s.text.length*100)+'%')); bars.appendChild(r); });
  }
};

/* ---------------- Quiz ---------------- */
const QZ=[
['Capital of India?','New Delhi',['Mumbai','Kolkata','Chennai']],
['Which is the largest planet in our solar system?','Jupiter',['Saturn','Earth','Mars']],
['National animal of India?','Tiger',['Lion','Elephant','Leopard']],
['How many continents are there?','7',['5','6','8']],
['Chemical formula of water?','H2O',['CO2','O2','NaCl']],
['Who wrote Ponniyin Selvan?','Kalki Krishnamurthy',['Sujatha','Jayakanthan','Bharathiyar']],
['How many squares are on a chess board?','64',['32','48','72']],
['Which planet is the Red Planet?','Mars',['Venus','Mercury','Neptune']],
['Capital city of Tamil Nadu?','Chennai',['Madurai','Coimbatore','Salem']],
['Taj Mahal is in which city?','Agra',['Delhi','Jaipur','Lucknow']],
['Fastest land animal?','Cheetah',['Lion','Horse','Leopard']],
['How many players per side play on the field in football (soccer)?','11',['9','10','12']],
['Who is known as the Missile Man of India?','A. P. J. Abdul Kalam',['C. V. Raman','Vikram Sarabhai','Homi Bhabha']],
['Largest ocean on Earth?','Pacific',['Atlantic','Indian','Arctic']],
['Currency of Japan?','Yen',['Won','Yuan','Ringgit']],
['Hardest natural substance?','Diamond',['Gold','Iron','Quartz']],
['Which gas do plants absorb for photosynthesis?','Carbon dioxide',['Oxygen','Nitrogen','Hydrogen']],
['How many balls are in a cricket over?','6',['4','5','8']],
['National flower of India?','Lotus',['Rose','Jasmine','Marigold']],
['Who painted the Mona Lisa?','Leonardo da Vinci',['Picasso','Van Gogh','Michelangelo']],
['Who is called the Father of the Nation in India?','Mahatma Gandhi',['Nehru','Subhas Chandra Bose','Sardar Patel']],
['Smallest prime number?','2',['0','1','3']],
['Who wrote the Thirukkural?','Thiruvalluvar',['Ilango Adigal','Kambar','Avvaiyar']],
['Which festival is called the Festival of Lights?','Diwali',['Holi','Pongal','Onam']],
['How many days are in a leap year?','366',['365','364','367']],
['Which actor starred in the movie Enthiran (Robot)?','Rajinikanth',['Vijay','Ajith','Suriya']],
['Who composed the music for the film Roja (1992)?','A. R. Rahman',['Ilaiyaraaja','Harris Jayaraj','Yuvan Shankar Raja']],
['Who directed the film Vikram (2022)?','Lokesh Kanagaraj',['Atlee','Nelson','Vetrimaaran']],
['Who directed Baahubali?','S. S. Rajamouli',['Shankar','Mani Ratnam','Prabhas']],
['Who is known as Isaignani?','Ilaiyaraaja',['A. R. Rahman','Vidyasagar','Deva']],
['Which film won the Oscar for Best Original Song with Naatu Naatu?','RRR',['Pushpa','KGF','Kantara']],
['Who directed Mouna Ragam?','Mani Ratnam',['Bharathiraja','K. Balachander','Bala']],
['How many colours are in a rainbow?','7',['5','6','8']],
['Largest mammal in the world?','Blue whale',['African elephant','Giraffe','Hippopotamus']],
['Chennai Super Kings plays which sport?','Cricket',['Football','Kabaddi','Hockey']],
['How many strings does a standard guitar have?','6',['4','5','7']]
];
function qzRes(s,now){ const q=s.qs[s.i];
  s.ans.forEach((a,i)=>{ if(a&&a.k===q.a){ const bonus=Math.floor(Math.max(0,s.TL-(a.t-s.start))/s.TL*100); s.pts[i]=100+bonus; s.sc[i]+=s.pts[i]; } else s.pts[i]=0; });
  s.ph='r'; s.rt=now+3200; }
GAMES.quiz={name:'Quiz',emoji:'🧠',c1:'#f43f5e',c2:'#f59e0b',min:2,max:8,live:true,botDelay:0,
  init(n){ const qs=shuffle(QZ.slice()).slice(0,8).map(x=>{ const o=shuffle([x[1],...x[2]]); return {q:x[0],o,a:o.indexOf(x[1])}; });
    return {n,qs,i:0,ph:'q',start:Date.now()+1500,ans:Array(n).fill(null),sc:Array(n).fill(0),pts:Array(n).fill(0),rt:0,bd:Array(n).fill(0).map(()=>3000+rnd(9000)),done:false,TL:15000}; },
  actors(s){ return (s.done||s.ph!=='q')?[]:[...s.ans.keys()].filter(i=>!s.ans[i]); },
  act(s,i,a,now){ if(s.done||s.ph!=='q'||now<s.start||s.ans[i]||!(a.k>=0&&a.k<4)) return false; s.ans[i]={k:a.k,t:now}; return true; },
  tick(s,now){ if(s.done) return false;
    if(s.ph==='q'){ if(now>=s.start&&(s.ans.every(a=>a)||now>=s.start+s.TL)){ qzRes(s,now); return true; } return false; }
    if(now>=s.rt){ if(s.i+1>=s.qs.length) s.done=true; else { s.i++; s.ph='q'; s.start=now; s.ans=s.ans.map(()=>null); s.bd=s.bd.map(()=>2500+rnd(9000)); } return true; }
    return false; },
  bot(s,i,now){ if(s.ph!=='q'||s.ans[i]||now<s.start+s.bd[i]) return null; const q=s.qs[s.i]; return {k:Math.random()<.65?q.a:rnd(4)}; },
  over(s){ if(!s.done) return null; return {rank:[...s.sc.keys()].sort((a,b)=>s.sc[b]-s.sc[a])}; },
  scores(s){ return s.sc; },
  status(s,ctx){ return (s.done?'':(ctx.me>=0&&s.ph==='q'&&!s.ans[ctx.me])?t('gSimul'):(ctx.me<0?t('gWatch'):'')); },
  render(el,s,ctx){ el.innerHTML=''; const q=s.qs[s.i]; const box=h('div','qz'); const now=ctx.now();
    const left=Math.max(0,s.start+s.TL-now);
    const meta=h('div','qmeta'); meta.appendChild(h('span',null,t('gQ',{i:s.i+1,n:s.qs.length}))); meta.appendChild(h('span',null,s.ph==='q'?(now<s.start?'…':'⏱ '+Math.ceil(left/1000)+'s'):'✔')); box.appendChild(meta);
    const bar=h('div','qbar'); const f=h('i'); f.style.width=(s.ph==='q'?Math.min(100,left/s.TL*100):0)+'%'; bar.appendChild(f); box.appendChild(bar);
    box.appendChild(h('div','qq',q.q));
    const mine=ctx.me>=0?s.ans[ctx.me]:null; const ob=h('div','qo');
    q.o.forEach((o,k)=>{ let cls=''; if(s.ph==='r'){ if(k===q.a) cls='ok'; else if(mine&&mine.k===k) cls='no'; } else if(mine&&mine.k===k) cls='sel';
      const b=h('button',cls,String.fromCharCode(65+k)+'. '+o); b.disabled=!(ctx.can&&s.ph==='q'&&now>=s.start&&!mine); b.onclick=()=>ctx.act({k}); ob.appendChild(b); });
    box.appendChild(ob);
    if(s.ph==='q'&&mine) box.appendChild(h('div','glog',t('gAnswered')));
    if(s.ph==='r'){ const r=h('div','rpsh'); const row=h('div','r'); ctx.players.forEach((p,i)=>{ row.appendChild(h('span',null,p.av+' '+(s.pts[i]?'+'+s.pts[i]:'✗'))); }); r.appendChild(row); box.appendChild(r); }
    el.appendChild(box); }
};

/* ---------------- Chess ---------------- */
const CHV={P:1,N:3,B:3,R:5,Q:9,K:0};
const CHG={K:'♚',Q:'♛',R:'♜',B:'♝',N:'♞',P:'♟'};
const KN=[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
const KG=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
const inb=(r,c)=>r>=0&&r<8&&c>=0&&c<8;
function chAtt(b,sq,by){
  const r=sq>>3,c=sq&7, pr=by==='w'?r+1:r-1;
  if(pr>=0&&pr<8) for(const dc of [-1,1]){ const cc=c+dc; if(cc>=0&&cc<8&&b[pr*8+cc]===by+'P') return true; }
  for(const[a,d] of KN){ const rr=r+a,cc=c+d; if(inb(rr,cc)&&b[rr*8+cc]===by+'N') return true; }
  for(const[a,d] of KG){ const rr=r+a,cc=c+d; if(inb(rr,cc)&&b[rr*8+cc]===by+'K') return true; }
  for(const[a,d] of KG){ let rr=r+a,cc=c+d; const dg=a!==0&&d!==0;
    while(inb(rr,cc)){ const p=b[rr*8+cc]; if(p){ if(p[0]===by&&(p[1]==='Q'||(dg?p[1]==='B':p[1]==='R'))) return true; break; } rr+=a; cc+=d; } }
  return false;
}
function chPseudo(s,col){
  const b=s.b,mv=[],o=col==='w'?'b':'w';
  for(let f=0;f<64;f++){ const p=b[f]; if(!p||p[0]!==col) continue; const ty=p[1],r=f>>3,c=f&7;
    if(ty==='P'){ const d=col==='w'?-1:1, sr=col==='w'?6:1, pr=col==='w'?0:7, one=f+d*8;
      if(!b[one]){ mv.push({f,t:one,q:(one>>3)===pr}); if(r===sr&&!b[f+d*16]) mv.push({f,t:f+d*16}); }
      for(const dc of [-1,1]){ const cc=c+dc; if(cc<0||cc>7) continue; const t=one+dc;
        if(b[t]&&b[t][0]===o) mv.push({f,t,q:(t>>3)===pr}); else if(t===s.ep) mv.push({f,t,ep:1}); } }
    else if(ty==='N'||ty==='K'){
      for(const[a,d] of (ty==='N'?KN:KG)){ const rr=r+a,cc=c+d; if(!inb(rr,cc)) continue; const t=rr*8+cc; if(!b[t]||b[t][0]===o) mv.push({f,t}); }
      if(ty==='K'){ const row=col==='w'?56:0;
        if(f===row+4&&!chAtt(b,f,o)){
          if(s.cs[col+'K']&&b[row+7]===col+'R'&&!b[row+5]&&!b[row+6]&&!chAtt(b,row+5,o)&&!chAtt(b,row+6,o)) mv.push({f,t:row+6,ca:'K'});
          if(s.cs[col+'Q']&&b[row]===col+'R'&&!b[row+1]&&!b[row+2]&&!b[row+3]&&!chAtt(b,row+3,o)&&!chAtt(b,row+2,o)) mv.push({f,t:row+2,ca:'Q'}); } } }
    else{ const dirs=ty==='B'?KG.filter(x=>x[0]&&x[1]):ty==='R'?KG.filter(x=>!x[0]||!x[1]):KG;
      for(const[a,d] of dirs){ let rr=r+a,cc=c+d; while(inb(rr,cc)){ const t=rr*8+cc; if(!b[t]) mv.push({f,t}); else{ if(b[t][0]===o) mv.push({f,t}); break; } rr+=a; cc+=d; } } }
  }
  return mv;
}
function chExec(s,m){
  const b=s.b,p=b[m.f],col=p[0]; const cap=b[m.t]||(m.ep?'x':'');
  if(m.ep) b[m.t+(col==='w'?8:-8)]='';
  b[m.t]=p; b[m.f]='';
  if(m.q) b[m.t]=col+'Q';
  if(m.ca){ const row=col==='w'?56:0; if(m.ca==='K'){ b[row+5]=b[row+7]; b[row+7]=''; } else { b[row+3]=b[row]; b[row]=''; } }
  return cap;
}
function chLegal(s,col){ const o=col==='w'?'b':'w';
  return chPseudo(s,col).filter(m=>{ const t={b:s.b.slice()}; chExec(t,m); const k=t.b.indexOf(col+'K'); return k>=0&&!chAtt(t.b,k,o); }); }
function chInsuff(s){ const ps=s.b.filter(x=>x&&x[1]!=='K'); return ps.length===0||(ps.length===1&&(ps[0][1]==='B'||ps[0][1]==='N')); }
function chPlay(s,m){
  const p=s.b[m.f],col=p[0],o=col==='w'?'b':'w';
  const cap=chExec(s,m);
  if(p[1]==='K'){ s.cs[col+'K']=0; s.cs[col+'Q']=0; }
  [[56,'wQ'],[63,'wK'],[0,'bQ'],[7,'bK']].forEach(x=>{ if(m.f===x[0]||m.t===x[0]) s.cs[x[1]]=0; });
  s.ep=(p[1]==='P'&&Math.abs(m.t-m.f)===16)?(m.f+m.t)/2:-1;
  s.half=(p[1]==='P'||cap)?0:s.half+1; s.mv++; s.last=[m.f,m.t]; s.turn=1-s.turn;
  const L=chLegal(s,o), k=s.b.indexOf(o+'K'); s.chk=chAtt(s.b,k,col);
  if(!L.length){ if(s.chk) s.w=col==='w'?0:1; else s.draw=true; }
  else if(s.half>=100||s.mv>=300||chInsuff(s)) s.draw=true;
}
let chSel=-1;
GAMES.chess={name:'Chess',emoji:'♟️',c1:'#64748b',c2:'#0f172a',min:2,max:2,
  init(){ const b=Array(64).fill(''); const back='RNBQKBNR'; for(let c=0;c<8;c++){ b[c]='b'+back[c]; b[8+c]='bP'; b[48+c]='wP'; b[56+c]='w'+back[c]; }
    return {b,turn:0,cs:{wK:1,wQ:1,bK:1,bQ:1},ep:-1,last:null,half:0,mv:0,w:-1,draw:false,chk:false}; },
  actors(s){ return (s.w>=0||s.draw)?[]:[s.turn]; },
  act(s,i,a){ if(s.w>=0||s.draw||i!==s.turn) return false; const m=chLegal(s,i?'b':'w').find(x=>x.f===a.f&&x.t===a.t); if(!m) return false; chPlay(s,m); return true; },
  bot(s,i){ const col=i?'b':'w',o=i?'w':'b'; const L=chLegal(s,col); if(!L.length) return null; let best=L[0],bs=-1e9;
    for(const m of L){ const t=JSON.parse(JSON.stringify(s)); const tg=t.b[m.t]; const gain=(m.ep?1:(tg?CHV[tg[1]]:0))+(m.q?8:0); chPlay(t,m);
      let sc=gain+Math.random()*.4;
      if(t.w===i) sc+=1000; else if(t.draw) sc-=.5; else { let worst=0; for(const r of chLegal(t,o)){ const x=t.b[r.t]; const g=r.ep?1:(x?CHV[x[1]]:0); if(g>worst) worst=g; } sc-=worst*.9; if(t.chk) sc+=.3; }
      if(sc>bs){ bs=sc; best=m; } }
    return {f:best.f,t:best.t}; },
  over(s){ if(s.w>=0) return {rank:[s.w,1-s.w]}; if(s.draw) return {rank:[0,1],draw:true}; return null; },
  status(s,ctx){ if(s.w>=0||s.draw) return ''; if(s.chk) return t('gCheck')+' · '+(ctx.can?t('gYourTurn'):t('gTurnOf',{n:ctx.players[s.turn].name})); return null; },
  render(el,s,ctx){ el.innerHTML=''; const flip=ctx.me===1; const bd=h('div','chb');
    const legal=ctx.can?chLegal(s,ctx.me?'b':'w'):[]; if(chSel>=0&&!legal.some(m=>m.f===chSel)) chSel=-1;
    const tg=chSel>=0?legal.filter(m=>m.f===chSel):[];
    const kingSq=s.chk?s.b.indexOf((s.turn?'b':'w')+'K'):-1;
    for(let vr=0;vr<8;vr++) for(let vc=0;vc<8;vc++){ const r=flip?7-vr:vr, c=flip?7-vc:vc, sq=r*8+c, p=s.b[sq];
      const q=h('div','q '+(((r+c)&1)?'d':'l')+(p?(p[0]==='w'?' w':' k'):'')+(s.last&&(s.last[0]===sq||s.last[1]===sq)?' last':'')+(chSel===sq?' sel':'')+(kingSq===sq?' chk':'')+(tg.some(m=>m.t===sq)?(p?' tg cap':' tg'):''),p?CHG[p[1]]:'');
      q.onclick=()=>{ if(!ctx.can) return; const mv=tg.find(m=>m.t===sq); if(mv){ chSel=-1; ctx.act({f:mv.f,t:mv.t}); return; }
        if(p&&p[0]===(ctx.me?'b':'w')){ chSel=(chSel===sq)?-1:sq; ctx.rerender(); } else { chSel=-1; ctx.rerender(); } };
      bd.appendChild(q); }
    el.appendChild(bd); }
};

/* ---------------- Ludo ---------------- */
const LP=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]];
const LSTART=[0,13,26,39], LSAFE=new Set([0,8,13,21,26,34,39,47]);
const HC=[[[7,1],[7,2],[7,3],[7,4],[7,5]],[[1,7],[2,7],[3,7],[4,7],[5,7]],[[7,13],[7,12],[7,11],[7,10],[7,9]],[[13,7],[12,7],[11,7],[10,7],[9,7]]];
const YO=[[0,0],[0,9],[9,9],[9,0]], SL=[[1,1],[1,4],[4,1],[4,4]];
const LTC=['#ef4444','#22c55e','#eab308','#3b82f6'], LYB=['#fca5a5','#86efac','#fde68a','#93c5fd'];
function lAbs(s,i,pr){ return (LSTART[s.col[i]]+pr)%52; }
function lMovable(s,i,d){ const r=[]; s.tk[i].forEach((pr,k)=>{ if(pr===56) return; if(pr===-1){ if(d===6) r.push(k); } else if(pr+d<=56) r.push(k); }); return r; }
function lNext(s){ let t=s.turn; do{ t=(t+1)%s.n; }while(s.order.includes(t)); s.turn=t; }
function lGo(s,i,k){
  const d=s.d, pr=s.tk[i][k], np=pr===-1?0:pr+d; s.tk[i][k]=np; let cap=false;
  if(np>=0&&np<=50){ const a=lAbs(s,i,np); if(!LSAFE.has(a)) for(let j=0;j<s.n;j++){ if(j===i) continue; s.tk[j].forEach((q,kk)=>{ if(q>=0&&q<=50&&lAbs(s,j,q)===a){ s.tk[j][kk]=-1; cap=true; } }); } }
  s.mvd={i,k,from:pr,to:np,cap};
  if(s.tk[i].every(x=>x===56)&&!s.order.includes(i)) s.order.push(i);
  s.d=0; s.mv=[];
  if(s.order.length>=s.n-1){ s.done=true; return; }
  if((d===6||cap||np===56)&&!s.order.includes(i)) return;   // extra turn
  lNext(s);
}
GAMES.ludo={name:'Ludo',emoji:'🎲',c1:'#ef4444',c2:'#f59e0b',min:2,max:4,
  init(n){ const col=n===2?[0,2]:n===3?[0,1,2]:[0,1,2,3]; return {n,col,tk:Array(n).fill(0).map(()=>[-1,-1,-1,-1]),turn:0,d:0,mv:[],last:null,sixes:0,order:[],mvd:null,done:false}; },
  actors(s){ return s.done?[]:[s.turn]; },
  act(s,i,a){ if(s.done||i!==s.turn) return false;
    if(a.a==='roll'){ if(s.d) return false; const d=1+rnd(6); s.d=d; s.last={i,d}; s.sixes=d===6?s.sixes+1:0;
      if(s.sixes>=3){ s.sixes=0; s.d=0; s.mv=[]; lNext(s); return true; }
      const mv=lMovable(s,i,d); s.mv=mv;
      if(!mv.length){ s.d=0; lNext(s); return true; }
      if(mv.length===1) lGo(s,i,mv[0]);
      return true; }
    if(a.a==='move'){ if(!s.d||!s.mv.includes(a.k)) return false; lGo(s,i,a.k); return true; }
    return false; },
  bot(s,i){ if(!s.d) return {a:'roll'}; let best=s.mv[0],bs=-1e9;
    for(const k of s.mv){ const pr=s.tk[i][k], np=pr===-1?0:pr+s.d; let sc=Math.random();
      if(np===56) sc+=50; if(pr===-1) sc+=30;
      if(np<=50){ const a=lAbs(s,i,np); if(LSAFE.has(a)) sc+=8; else for(let j=0;j<s.n;j++) if(j!==i) s.tk[j].forEach(q=>{ if(q>=0&&q<=50&&lAbs(s,j,q)===a) sc+=100; }); }
      if(np>50) sc+=20; sc+=np*.1; if(sc>bs){ bs=sc; best=k; } }
    return {a:'move',k:best}; },
  over(s){ if(!s.done) return null; const rest=[...s.tk.keys()].filter(i=>!s.order.includes(i)).sort((a,b)=>s.tk[b].reduce((x,y)=>x+y,0)-s.tk[a].reduce((x,y)=>x+y,0)); return {rank:[...s.order,...rest]}; },
  scores(s){ return s.tk.map(a=>a.filter(x=>x===56).length+'/4'); },
  log(s,ctx){ const m=s.mvd; if(!m) return ''; return ctx.players[m.i].name+(m.cap?' ⚔️':'')+(m.to===56?' 🏠':''); },
  render(el,s,ctx){ el.innerHTML='';
    const bd=h('div','ld'); const cells=[];
    for(let r=0;r<15;r++) for(let c=0;c<15;c++){ const o=LUDOI[r*15+c]||{}; let cls='c';
      if(o.lb!==undefined) cls+=' lb b'+o.lb; if(o.lp!==undefined){ cls+=' lp'; const a=o.lp; const si=LSTART.indexOf(a); if(si>=0) cls+=' s'+si; else if(LSAFE.has(a)) cls+=' star'; }
      if(o.lh!==undefined) cls+=' lh h'+o.lh; if(o.ctr) cls+=' lc'; const cell=h('div',cls); if(o.ctr&&!(r===6&&c===6)){ cells.push(cell); continue; }
      if(o.slot!==undefined) cell.style.background='radial-gradient(circle,#fff 56%,transparent 58%),'+LYB[o.slot];
      cells.push(cell); bd.appendChild(cell); }
    cells[7*15+7]=cells[6*15+6]; const place=new Map();
    s.tk.forEach((arr,i)=>arr.forEach((pr,k)=>{ const col=s.col[i]; let rc;
      if(pr===-1) rc=[YO[col][0]+SL[k][0],YO[col][1]+SL[k][1]]; else if(pr<=50) rc=LP[lAbs(s,i,pr)]; else if(pr<=55) rc=HC[col][pr-51]; else rc=[7,7];
      const key=rc[0]*15+rc[1]; (place.get(key)||place.set(key,[]).get(key)).push({i,k,col}); }));
    place.forEach((list,key)=>{ list.forEach(x=>{ const tk=h('div','tkn'+((ctx.can&&s.d&&s.mv.includes(x.k)&&x.i===ctx.me)?' mv':''),String(x.k+1)); tk.style.background=LTC[x.col]; if(list.length>1) tk.style.width='46%';
      if(tk.classList.contains('mv')) tk.onclick=()=>ctx.act({a:'move',k:x.k}); cells[key].appendChild(tk); }); });
    el.appendChild(bd);
    el.appendChild(h('div','dicebox'+(s.last?' roll':''),s.last?DICE[s.last.d-1]:'🎲'));
    if(ctx.can&&!s.d) el.appendChild(btn('primary rbtn',t('gRoll'),()=>ctx.act({a:'roll'})));
    else if(ctx.can&&s.d&&s.mv.length>1) el.appendChild(h('div','glog','👆 '+t('gMove')));
  }
};
const LUDOI=(function(){ const m={}; const set=(r,c,o)=>{ m[r*15+c]=Object.assign(m[r*15+c]||{},o); };
  for(let r=0;r<15;r++) for(let c=0;c<15;c++){ if(r<6&&c<6) set(r,c,{lb:0}); else if(r<6&&c>8) set(r,c,{lb:1}); else if(r>8&&c>8) set(r,c,{lb:2}); else if(r>8&&c<6) set(r,c,{lb:3}); else if(r>=6&&r<=8&&c>=6&&c<=8) set(r,c,{ctr:1}); }
  LP.forEach((x,i)=>set(x[0],x[1],{lp:i})); HC.forEach((a,p)=>a.forEach(x=>set(x[0],x[1],{lh:p})));
  YO.forEach((o,p)=>SL.forEach(d=>set(o[0]+d[0],o[1]+d[1],{slot:p}))); return m; })();

/* ---------------- Business Man ---------------- */
const BT=[
 {t:'go',n:'START'},{t:'p',n:'Madurai',p:60,g:'#a16207'},{t:'ch',n:'Chance'},{t:'p',n:'Salem',p:60,g:'#a16207'},{t:'tax',n:'Income Tax',x:100},
 {t:'p',n:'Trichy',p:100,g:'#38bdf8'},{t:'jail',n:'Jail'},{t:'p',n:'Coimbatore',p:120,g:'#38bdf8'},{t:'ch',n:'Chance'},
 {t:'p',n:'Vellore',p:140,g:'#ec4899'},{t:'p',n:'Erode',p:140,g:'#ec4899'},{t:'p',n:'Tirunelveli',p:160,g:'#ec4899'},{t:'park',n:'Free Parking'},
 {t:'p',n:'Pondicherry',p:180,g:'#f97316'},{t:'ch',n:'Chance'},{t:'p',n:'Kodaikanal',p:200,g:'#f97316'},{t:'p',n:'Ooty',p:220,g:'#ef4444'},
 {t:'tax',n:'Luxury Tax',x:80},{t:'gj',n:'Go to Jail'},{t:'p',n:'Bangalore',p:260,g:'#eab308'},{t:'p',n:'Hyderabad',p:280,g:'#eab308'},
 {t:'ch',n:'Chance'},{t:'p',n:'Mumbai',p:320,g:'#22c55e'},{t:'p',n:'Delhi',p:380,g:'#3b82f6'}];
function bzRC(i){ if(i<=6) return [6,6-i]; if(i<=12) return [6-(i-6),0]; if(i<=18) return [0,i-12]; return [i-18,6]; }
function bzRent(s,i){ const T=BT[i], o=s.own[i]; let r=Math.round(T.p/10); const grp=BT.map((x,k)=>k).filter(k=>BT[k].g===T.g); if(grp.every(k=>s.own[k]===o)) r*=2; return r; }
function bzWorth(s,i){ let w=s.cash[i]; s.own.forEach((o,k)=>{ if(o===i) w+=BT[k].p; }); return w; }
function bzBust(s,i){ s.out[i]=true; s.outOrder.push(i); s.cash[i]=0; s.own.forEach((o,k)=>{ if(o===i) s.own[k]=-1; }); s.ev.push({k:'bust',i}); }
function bzEnd(s){ s.ph='roll'; const alive=[...s.out.keys()].filter(i=>!s.out[i]);
  s.tc++; if(alive.length<=1||s.tc>=s.max*s.n){ s.done=true; return; }
  let t=s.turn; do{ t=(t+1)%s.n; }while(s.out[t]); s.turn=t; }
function bzLand(s,i){ const T=BT[s.pos[i]];
  if(T.t==='p'){ const o=s.own[s.pos[i]];
    if(o===-1){ if(s.cash[i]>=T.p){ s.ph='buy'; return; } }
    else if(o!==i){ const r=bzRent(s,s.pos[i]); if(s.cash[i]>=r){ s.cash[i]-=r; s.cash[o]+=r; s.ev.push({k:'rent',i,o,v:r}); } else { s.cash[o]+=s.cash[i]; s.ev.push({k:'rent',i,o,v:s.cash[i]}); bzBust(s,i); } } }
  else if(T.t==='tax'){ if(s.cash[i]>=T.x){ s.cash[i]-=T.x; s.ev.push({k:'tax',i,v:T.x}); } else bzBust(s,i); }
  else if(T.t==='ch'){ const c=pick([{v:100},{v:-50},{v:150},{v:-30},{go:1},{jail:1}]);
    if(c.go){ s.pos[i]=0; s.cash[i]+=200; s.ev.push({k:'go',i}); }
    else if(c.jail){ s.pos[i]=6; s.jail[i]=2; s.ev.push({k:'jail',i}); }
    else if(c.v>0){ s.cash[i]+=c.v; s.ev.push({k:'card',i,v:c.v}); }
    else if(s.cash[i]>=-c.v){ s.cash[i]+=c.v; s.ev.push({k:'card',i,v:c.v}); } else bzBust(s,i); }
  else if(T.t==='gj'){ s.pos[i]=6; s.jail[i]=2; s.ev.push({k:'jail',i}); }
  if(s.ph!=='buy') bzEnd(s);
}
GAMES.biz={name:'Business Man',emoji:'🏙️',c1:'#10b981',c2:'#0ea5e9',min:2,max:6,
  init(n){ return {n,pos:Array(n).fill(0),cash:Array(n).fill(1500),own:Array(24).fill(-1),jail:Array(n).fill(0),turn:0,ph:'roll',d:[0,0],tc:0,max:12,out:Array(n).fill(false),outOrder:[],ev:[],done:false}; },
  actors(s){ return s.done?[]:[s.turn]; },
  act(s,i,a){ if(s.done||i!==s.turn) return false;
    if(a.a==='roll'){ if(s.ph!=='roll') return false; const d1=1+rnd(6),d2=1+rnd(6); s.d=[d1,d2]; s.ev=[{k:'roll',i,d:d1+'+'+d2}];
      if(s.jail[i]>0){ if(d1===d2){ s.jail[i]=0; } else { s.jail[i]--; bzEnd(s); return true; } }
      const old=s.pos[i]; const np=(old+d1+d2)%24; if(np<old){ s.cash[i]+=200; s.ev.push({k:'go',i}); } s.pos[i]=np; bzLand(s,i); return true; }
    if(a.a==='buy'&&s.ph==='buy'){ const T=BT[s.pos[i]]; if(s.cash[i]<T.p) return false; s.cash[i]-=T.p; s.own[s.pos[i]]=i; s.ev=[{k:'buy',i,n:T.n}]; bzEnd(s); return true; }
    if(a.a==='skip'&&s.ph==='buy'){ s.ev=[]; bzEnd(s); return true; }
    return false; },
  bot(s,i){ if(s.ph==='roll') return {a:'roll'}; const T=BT[s.pos[i]]; return (s.cash[i]-T.p>=150||Math.random()<.3)?{a:'buy'}:{a:'skip'}; },
  over(s){ if(!s.done) return null; const alive=[...s.out.keys()].filter(i=>!s.out[i]).sort((a,b)=>bzWorth(s,b)-bzWorth(s,a)); return {rank:[...alive,...s.outOrder.slice().reverse()]}; },
  scores(s){ return s.pos.map((_,i)=>s.out[i]?'💀':'₹'+bzWorth(s,i)); },
  render(el,s,ctx){ el.innerHTML=''; const bd=h('div','bz');
    BT.forEach((T,i)=>{ const rc=bzRC(i); const tl=h('div','tl'+(T.t==='p'?'':' cor')+(s.pos[s.turn]===i&&!s.done?' cur':'')); tl.style.gridRow=(rc[0]+1)+'';tl.style.gridColumn=(rc[1]+1)+'';
      if(T.g){ tl.style.setProperty('--tc',T.g); tl.appendChild(h('div','bar')); }
      const nm=h('div','nm',T.t==='go'?'🏁':T.t==='jail'?'🔒':T.t==='park'?'🅿️':T.t==='gj'?'🚔':T.t==='ch'?'🎴':T.t==='tax'?'🧾':T.n); if(T.t!=='p') nm.style.fontSize='clamp(14px,3.2vw,26px)'; tl.appendChild(nm);
      if(T.p) tl.appendChild(h('div','pr','₹'+T.p)); if(T.x) tl.appendChild(h('div','pr','₹'+T.x));
      if(s.own[i]>=0){ const o=h('i','own'); o.style.background=PCOL[s.own[i]]; tl.appendChild(o); }
      const here=s.pos.map((p,k)=>p===i&&!s.out[k]?ctx.players[k].av:'').join(''); if(here) tl.appendChild(h('div','tks',here));
      bd.appendChild(tl); });
    const mid=h('div','mid'); mid.style.gridArea='2/2/7/7';
    mid.appendChild(h('div','glog','🗓 '+t('gRound',{i:Math.min(s.max,Math.floor(s.tc/s.n)+1),n:s.max})));
    mid.appendChild(h('div','dicebox'+(s.ph==='roll'?'':''),s.d[0]?DICE[s.d[0]-1]+DICE[s.d[1]-1]:'🎲'));
    if(ctx.can){ if(s.ph==='roll') mid.appendChild(btn('primary rbtn',t('gRoll'),()=>ctx.act({a:'roll'})));
      else if(s.ph==='buy'){ const T=BT[s.pos[s.turn]]; mid.appendChild(h('div','glog',t('gBuyQ',{n:T.n,p:T.p}))); const r=h('div','mbtns'); r.appendChild(btn('primary',t('gBuy'),()=>ctx.act({a:'buy'}))); r.appendChild(btn('gbtn',t('gSkip'),()=>ctx.act({a:'skip'}))); mid.appendChild(r); } }
    const cash=h('div','cash'); ctx.players.forEach((p,i)=>{ const sp=h('span',s.out[i]?'out':'',p.av+' ₹'+s.cash[i]); sp.style.borderBottom='2px solid '+PCOL[i]; cash.appendChild(sp); }); mid.appendChild(cash);
    const ev=(s.ev||[]).map(e=>{ const n=ctx.players[e.i]?ctx.players[e.i].name:'';
      switch(e.k){ case 'roll': return '🎲 '+n+' '+e.d; case 'go': return '🏁 '+n+' +₹200'; case 'buy': return '🏠 '+n+' → '+e.n; case 'rent': return '💸 '+n+' → '+ctx.players[e.o].name+' ₹'+e.v;
        case 'tax': return '🧾 '+n+' −₹'+e.v; case 'card': return '🎴 '+n+' '+(e.v>0?'+':'−')+'₹'+Math.abs(e.v); case 'jail': return '🚔 '+n; case 'bust': return '💀 '+n; default: return ''; } });
    const lg=h('div','glog',ev.join('  ·  ')); mid.appendChild(lg);
    bd.appendChild(mid); el.appendChild(bd); }
};

/* =============== ARCADE (12 new score-attack games) =============== */
const R=Math.random;
function C(g,x,y,r,c){ g.fillStyle=c; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); }
let AR=null;
const Snd={ctx:null,m:null,timer:0,next:0,step:0,want:false,ver:-1,sfxOn:store.get('fwp-sfx')!=='0',musOn:store.get('fwp-mus')!=='0',
  init(){ if(!this.ctx){ try{ const A=window.AudioContext||window.webkitAudioContext; this.ctx=new A(); this.m=this.ctx.createGain(); this.m.gain.value=.6; this.m.connect(this.ctx.destination); }catch(e){ return false; } }
    if(this.ctx.state==='suspended') this.ctx.resume().catch(()=>{}); return true; },
  note(f,t,d,ty,v){ const c=this.ctx,o=c.createOscillator(),g=c.createGain(); o.type=ty; o.frequency.value=f; g.gain.setValueAtTime(v,t); g.gain.exponentialRampToValueAtTime(.0001,t+d); o.connect(g); g.connect(this.m); o.start(t); o.stop(t+d+.05); },
  sfx(k){ if(!this.sfxOn||!this.init()) return; const t=this.ctx.currentTime,n=(f,dt,d,ty,v)=>this.note(f,t+dt,d,ty||'square',v||.12);
    if(k==='score'){ n(880,0,.07); n(1320,.06,.09); } else if(k==='move'){ n(420,0,.06,'triangle',.15); } else if(k==='end'){ n(392,0,.12); n(262,.12,.25,'sawtooth',.1); } },
  tick(){ const c=this.ctx,PR=[0,-4,3,-2],fr=x=>220*Math.pow(2,x/12); while(this.next<c.currentTime+.35){ const st=this.step++,bar=(st>>3)&3,i=st&7,r=PR[bar],th=bar?4:3,A=[0,th,7,12,7,th,7,th];
      this.note(fr(r+12+A[i]),this.next,.16,'square',.035); if(i%4===0) this.note(fr(r-12),this.next,.34,'triangle',.09); this.next+=.17; } },
  music(on){ this.want=on; if(on&&this.musOn&&!document.hidden){ if(!this.init()) return; if(!this.timer){ this.next=this.ctx.currentTime+.05; this.timer=setInterval(()=>this.tick(),100); } } else if(this.timer){ clearInterval(this.timer); this.timer=0; } },
  sync(on){ this.music(on); },
  tog(w){ if(w==='sfx'){ this.sfxOn=!this.sfxOn; store.set('fwp-sfx',this.sfxOn?'1':'0'); window.SND_OFF=!this.sfxOn; } else { this.musOn=!this.musOn; store.set('fwp-mus',this.musOn?'1':'0'); this.music(this.want); } }};
window.SND_OFF=!Snd.sfxOn;
document.addEventListener('visibilitychange',()=>Snd.music(Snd.want));
document.addEventListener('pointerdown',()=>{ if(Snd.want) Snd.music(true); },{passive:true});
window.gamesHidden=function(){ Snd.sync(false); document.body.classList.remove('ingame'); };
function sndBtns(){ const w=h('div','sndb'); [['sfx','🔊','🔇'],['mus','🎵','🎵']].forEach(([k,on,off])=>{ const st=()=>k==='sfx'?Snd.sfxOn:Snd.musOn;
    const b=btn('gbtn'+(st()?'':' off'),st()?on:off,()=>{ Snd.tog(k); b.className='gbtn'+(st()?'':' off'); b.textContent=st()?on:off; if(k==='sfx'&&st()) Snd.sfx('score'); }); b.title=k==='sfx'?'Sound effects':'Music'; w.appendChild(b); }); return w; }
function runArcade(el,fn,ctx,dom,k){
  el.innerHTML=''; const dpr=Math.min(2,window.devicePixelRatio||1);
  const cv=h('canvas'); cv.width=360*dpr; cv.height=480*dpr;
  cv.style.cssText='width:min(100%,360px,calc((100dvh - 215px)*.75));touch-action:none;user-select:none;-webkit-user-select:none;border-radius:16px;display:block;margin:auto;background:#0f172a';
  cv.oncontextmenu=e=>e.preventDefault();
  const box=h('div'); box.style.cssText='width:min(100%,420px);margin:auto';
  const hud=h('div','glog'); hud.style.cssText='font-weight:700;font-size:15px;margin-bottom:6px';
  const root=dom?box:cv; el.append(hud,root);
  const g=cv.getContext('2d'); g.scale(dpr,dpr);
  const E={s:0,T:30,box,done:0,el:0,lx:180,ly:240,cd:ctx.startAt?Math.max(.2,(ctx.startAt-ctx.now())/1000):3}; AR={sid:ctx.sid,live:true,cv:root};
  const kd=e=>{ if(dom||E.cd>0||E.done) return; if(e.code==='Space'){ e.preventDefault(); if(E.key) E.key('ArrowUp'); else E.down&&E.down(E.lx,E.ly); } else if(e.code.startsWith('Arrow')&&E.key){ e.preventDefault(); E.key(e.code); } };
  const stop=()=>removeEventListener('keydown',kd); addEventListener('keydown',kd);
  E.end=()=>{ if(E.done) return; E.done=1; AR.live=false; stop(); Snd.sfx('end'); const bk='fwp-best-'+k;
    if(E.s>0&&E.s>(+store.get(bk)||0)){ store.set(bk,String(E.s)); toast('🏅 New best: '+E.s); } hud.textContent='✅ '+E.s; ctx.act({v:E.s}); };
  const P=ev=>{ const r=cv.getBoundingClientRect(); E.lx=(ev.clientX-r.left)*360/r.width; E.ly=(ev.clientY-r.top)*480/r.height; return [E.lx,E.ly]; };
  cv.onpointerdown=ev=>{ ev.preventDefault(); try{ cv.setPointerCapture(ev.pointerId); }catch(e){} const p=P(ev); if(E.cd<=0&&E.down) E.down(...p); };
  cv.onpointermove=ev=>{ const p=P(ev); if(E.cd<=0&&E.mv) E.mv(...p); };
  cv.onpointerup=ev=>{ const p=P(ev); if(E.cd<=0&&E.up) E.up(...p); };
  let last=performance.now(),acc=0,ls=0; const STEP=1000/44;
  (function f(now){
    if(E.done||!root.isConnected){ stop(); AR.live=false; return; }
    now=now||performance.now(); const dt=Math.min(100,now-last); last=now;
    if(document.hidden){ requestAnimationFrame(f); return; }
    if(E.cd>0){ E.cd-=dt/1000; const n=Math.max(1,Math.ceil(E.cd));
      if(!dom){ g.fillStyle='#0f172a'; g.fillRect(0,0,360,480); g.fillStyle='#fff'; g.font='800 110px sans-serif'; g.textAlign='center'; g.fillText(String(n),180,270); g.textAlign='left'; }
      hud.textContent='Get ready… '+n; if(E.cd<=0) fn(E); requestAnimationFrame(f); return; }
    E.el+=dt/1000; acc+=dt; let n=0;
    if(dom) acc=0; else { while(acc>=STEP&&n<3&&!E.done){ g.fillStyle='#0f172a'; g.fillRect(0,0,360,480); E.loop&&E.loop(g); acc-=STEP; n++; } if(acc>STEP) acc=0; }
    if(E.s>ls){ Snd.sfx('score'); if(navigator.vibrate) navigator.vibrate(8); } ls=E.s;
    if(!E.done){ const left=E.T-E.el; hud.textContent='⭐ '+E.s+(E.T?'   ⏱ '+Math.max(0,Math.ceil(left)):''); if(E.T&&left<=0){ E.end(); return; } requestAnimationFrame(f); }
  })(performance.now());
}
function arcade(k,name,emoji,c1,c2,d,fn,dom){
  GAMES[k]={name,emoji,c1,c2,min:1,max:10,arc:true,
    init(n){ return {n,sc:Array(n).fill(-1),tm:GS&&GS.mode?1:0}; },
    actors(s){ return [...s.sc.keys()].filter(i=>s.sc[i]<0); },
    act(s,i,a){ if(s.sc[i]>=0||!(a.v>=0)) return false; s.sc[i]=Math.min(9999,Math.floor(a.v)); return true; },
    bot(){ return {v:3+rnd(18)}; },
    over(s){ if(s.sc.some(x=>x<0)) return null;
      if(s.tm){ const T=[0,0]; s.sc.forEach((v,i)=>T[i%2]+=v); const w=T[0]>=T[1]?0:1; const ix=[...s.sc.keys()].sort((a,b)=>((a%2===w?0:1)-(b%2===w?0:1))||s.sc[b]-s.sc[a]); return {rank:ix,draw:T[0]===T[1],tm:T}; }
      const idx=shuffle([...s.sc.keys()]).sort((a,b)=>s.sc[b]-s.sc[a]); return {rank:idx,draw:s.n>1&&s.sc.every(x=>x===s.sc[0])}; },
    scores(s){ return s.sc.map(x=>x<0?'…':x); },
    status(s,ctx){ return ctx.me<0?t('gWatch'):s.sc[ctx.me]<0?'🎮 Go!':t('gWaitOthers'); },
    render(el,s,ctx){
      if(AR&&AR.sid===ctx.sid&&AR.live&&AR.cv.isConnected) return;
      el.innerHTML=''; el.appendChild(h('div','glog',emoji+' '+name+' · '+d));
      if(ctx.can){ if(!(AR&&AR.sid===ctx.sid)) runArcade(el,fn,ctx,dom,k); }
      else el.appendChild(h('div','glog',ctx.me>=0&&s.sc[ctx.me]>=0?'✅ '+s.sc[ctx.me]+(s.sc.some(x=>x<0)?' · '+t('gWaitOthers'):''):t('gWatch')));
    }};
  if(!ORDER.includes(k)) ORDER.push(k); D['d_'+k]=[d,d,d];
}
arcade('ballrun','Ball Run','🏃','#22c55e','#0ea5e9','Tap to jump over obstacles',a=>{ let y=380,vy=0,ob=[],sp=4,d=0,n=0; a.T=40;
  a.down=()=>{ if(y>=380) vy=-12; };
  a.loop=g=>{ vy+=.6; y=Math.min(380,y+vy); if(y>=380) vy=0; d+=sp; sp+=.003; if(--n<=0){ ob.push({x:380,w:20+R()*20,h:25+R()*30}); n=60+R()*60|0; }
    ob.forEach(o=>o.x-=sp); ob=ob.filter(o=>o.x>-50); for(const o of ob) if(o.x<80&&o.x+o.w>40&&y+20>400-o.h) a.end();
    a.s=d/20|0; g.fillStyle='#16a34a'; g.fillRect(0,400,360,80); g.fillStyle='#ef4444'; ob.forEach(o=>g.fillRect(o.x,400-o.h,o.w,o.h)); C(g,60,y,20,'#facc15'); }; });
arcade('gun','Target Gun','🔫','#ef4444','#7f1d1d','Tap to shoot targets (small = 3 pts)',a=>{ let t=[]; a.T=30;
  a.down=(x,y)=>{ for(let i=t.length;i--;){ const o=t[i]; if(Math.hypot(x-o.x,y-o.y)<o.r){ a.s+=o.r<18?3:1; t.splice(i,1); return; } } a.s=Math.max(0,a.s-1); };
  a.loop=g=>{ if(R()<.04) t.push({x:R()<.5?0:360,y:60+R()*340,r:12+R()*22}); t.forEach(o=>{ o.vx=o.vx||(o.x?-1:1)*(1.5+R()*2.5); o.x+=o.vx; C(g,o.x,o.y,o.r,'#ef4444'); C(g,o.x,o.y,o.r*.6,'#fff'); C(g,o.x,o.y,o.r*.25,'#ef4444'); }); t=t.filter(o=>o.x>-40&&o.x<400); }; });
arcade('archery','Archery','🏹','#f59e0b','#78350f','Tap to release when the aim is on the bullseye — 5 arrows',a=>{ let n=5,t=0,cx=180,cy=200,m=[],lock=0; a.T=0;
  a.down=()=>{ if(lock||n<=0) return; n--; lock=25; a.s+=Math.max(0,10-(Math.hypot(cx-180,cy-200)/12|0)); m.push([cx,cy]); if(!n) setTimeout(()=>a.end(),900); };
  a.loop=g=>{ t+=.04+(5-n)*.008; lock&&lock--; cx=180+Math.sin(t*1.7)*100+Math.sin(t*.9)*30; cy=200+Math.cos(t*1.3)*90;
    ['#fff','#111','#3b82f6','#ef4444','#facc15'].forEach((c,i)=>C(g,180,200,120-i*24,c)); m.forEach(q=>C(g,q[0],q[1],5,'#7c2d12'));
    g.strokeStyle='#22c55e'; g.lineWidth=2; g.beginPath(); g.moveTo(cx-18,cy); g.lineTo(cx+18,cy); g.moveTo(cx,cy-18); g.lineTo(cx,cy+18); g.stroke(); g.fillStyle='#fff'; g.font='20px sans-serif'; g.fillText('🏹 x'+n,10,465); }; });
arcade('carrom','Carrom','⚫','#b45309','#fbbf24','Drag back & release to flick the striker — pocket coins (queen = 3)',a=>{
  const co=[{x:180,y:240,c:'#dc2626',v:3}]; for(let i=0;i<8;i++){ const q=i*.785; co.push({x:180+Math.cos(q)*27,y:240+Math.sin(q)*27,c:i%2?'#1f2937':'#fde68a',v:1}); }
  co.forEach(o=>{ o.vx=o.vy=0; o.r=11; }); const st={x:180,y:372,vx:0,vy:0,r:15,c:'#60a5fa'},pk=[[20,80],[340,80],[20,400],[340,400]]; let sh=9,d=null,mg=0; a.T=90;
  const mvg=()=>co.concat(st).some(o=>Math.hypot(o.vx,o.vy)>.12), cl=v=>Math.max(-16,Math.min(16,v));
  a.down=(x,y)=>{ if(!mvg()&&sh>0) d=[x,y]; }; a.mv=(x,y)=>{ if(d){ d[2]=x; d[3]=y; } };
  a.up=(x,y)=>{ if(d&&!mvg()){ st.vx=cl((d[0]-x)*.14); st.vy=cl((d[1]-y)*.14); sh--; mg=1; } d=null; };
  a.loop=g=>{ g.fillStyle='#b45309'; g.fillRect(14,74,332,332); g.fillStyle='#fcd9a0'; g.fillRect(20,80,320,320); pk.forEach(p=>C(g,p[0],p[1],24,'#111'));
    const A=co.concat(st);
    for(let s=0;s<2;s++){ A.forEach(o=>{ o.x+=o.vx/2; o.y+=o.vy/2; if(o.x<20+o.r||o.x>340-o.r){ o.vx*=-.9; o.x=Math.max(20+o.r,Math.min(340-o.r,o.x)); } if(o.y<80+o.r||o.y>400-o.r){ o.vy*=-.9; o.y=Math.max(80+o.r,Math.min(400-o.r,o.y)); } });
      for(let i=0;i<A.length;i++) for(let j=i+1;j<A.length;j++){ const p=A[i],q=A[j],dx=q.x-p.x,dy=q.y-p.y,D=Math.hypot(dx,dy),mn=p.r+q.r;
        if(D<mn&&D>0){ const nx=dx/D,ny=dy/D,vn=(p.vx-q.vx)*nx+(p.vy-q.vy)*ny; if(vn>0){ p.vx-=vn*nx; p.vy-=vn*ny; q.vx+=vn*nx; q.vy+=vn*ny; } const ov=(mn-D)/2; p.x-=nx*ov; p.y-=ny*ov; q.x+=nx*ov; q.y+=ny*ov; } } }
    A.forEach(o=>{ o.vx*=.985; o.vy*=.985; if(pk.some(p=>Math.hypot(o.x-p[0],o.y-p[1])<22)){ if(o===st){ a.s=Math.max(0,a.s-1); st.x=180; st.y=372; st.vx=st.vy=0; } else { a.s+=o.v; const k=co.indexOf(o); if(k>=0) co.splice(k,1); } } });
    if(mg&&!mvg()){ mg=0; st.x=180; st.y=372; st.vx=st.vy=0; if(sh<=0||!co.length) setTimeout(()=>a.end(),500); }
    co.concat(st).forEach(o=>C(g,o.x,o.y,o.r,o.c));
    if(d&&d[2]!=null){ g.strokeStyle='#fff'; g.lineWidth=2; g.beginPath(); g.moveTo(st.x,st.y); g.lineTo(st.x+d[0]-d[2],st.y+d[1]-d[3]); g.stroke(); }
    g.fillStyle='#fff'; g.font='18px sans-serif'; g.fillText('🎯 x'+sh,10,440); }; });
arcade('knife','Knife Thrower','🔪','#94a3b8','#334155','Tap to throw — do not hit the knives already stuck',a=>{ let r=0,k=[],f=0; a.T=45;
  const cd=(p,q)=>Math.abs(Math.atan2(Math.sin(p-q),Math.cos(p-q))); a.down=()=>{ if(!f) f=420; };
  a.loop=g=>{ r+=.035+a.s*.0015; if(f){ f-=20; if(f<=250){ const q=Math.PI/2-r; if(k.some(z=>cd(z,q)<.25)){ a.end(); return; } k.push(q); a.s++; f=0; } }
    C(g,180,170,72,'#92400e'); C(g,180,170,50,'#b45309'); g.strokeStyle='#e5e7eb'; g.lineWidth=4;
    k.forEach(z=>{ const w=z+r,c=Math.cos(w),s=Math.sin(w); g.beginPath(); g.moveTo(180+c*70,170+s*70); g.lineTo(180+c*110,170+s*110); g.stroke(); });
    g.beginPath(); g.moveTo(180,f||420); g.lineTo(180,(f||420)+40); g.stroke(); }; });
const SQ=[['Water formula?','H2O','CO2','O2','NaCl'],['Nearest planet to the Sun?','Mercury','Venus','Mars','Earth'],['Gas plants absorb?','Carbon dioxide','Oxygen','Nitrogen','Helium'],['Hardest natural substance?','Diamond','Gold','Iron','Quartz'],['Bones in adult human body?','206','156','306','106'],['Speed of light ≈','3×10⁸ m/s','3×10⁶ m/s','3×10⁴ m/s','300 m/s'],['Powerhouse of the cell?','Mitochondria','Nucleus','Ribosome','Vacuole'],['Chemical symbol of Gold?','Au','Ag','Gd','Go'],['Largest planet?','Jupiter','Saturn','Earth','Neptune'],["Sound can't travel through…",'Vacuum','Water','Steel','Air'],['Universal blood donor?','O−','AB+','A+','B+'],['Force pulling things to Earth?','Gravity','Friction','Magnetism','Inertia'],['Plant food-making process?','Photosynthesis','Digestion','Respiration','Evaporation'],['Unit of force?','Newton','Joule','Watt','Pascal']];
arcade('sciquiz','Science Quiz','🔬','#06b6d4','#6366f1','8 science questions — 10 pts each',a=>{ const Q=shuffle(SQ.slice()).slice(0,8),b=a.box; let i=0; a.T=90;
  const nx=()=>{ if(i>=Q.length){ a.end(); return; } const q=Q[i++]; b.innerHTML=''; b.className='qz'; b.appendChild(h('div','qq',i+'/8 · '+q[0])); const w=h('div','qo');
    shuffle(q.slice(1)).forEach(x=>w.appendChild(btn('',x,ev=>{ w.querySelectorAll('button').forEach(z=>{ z.disabled=true; if(z.textContent===q[1]) z.classList.add('ok'); }); if(x===q[1]) a.s+=10; else ev.currentTarget.classList.add('no'); setTimeout(nx,650); }))); b.appendChild(w); }; nx(); },true);
arcade('mole','Whack-a-Mole','🐹','#a16207','#365314','Tap the moles as they pop up',a=>{ let m=-1,u=0; a.T=30;
  a.down=(x,y)=>{ const c=x/120|0,r=(y-115)/110|0; if(y>115&&r<3&&r*3+c===m){ a.s++; m=-1; } };
  a.loop=g=>{ if(--u<=0){ m=R()<.85?R()*9|0:-1; u=28+R()*25|0; } g.font='50px serif'; for(let i=0;i<9;i++){ const x=60+i%3*120,y=170+(i/3|0)*110; g.fillStyle='#3f2a14'; g.beginPath(); g.ellipse(x,y+20,45,16,0,0,7); g.fill(); if(i===m) g.fillText('🐹',x-27,y+14); } }; });
arcade('balloon','Balloon Pop','🎈','#ec4899','#8b5cf6','Pop as many balloons as you can',a=>{ let b=[]; a.T=30;
  a.down=(x,y)=>{ for(let i=b.length;i--;) if(Math.hypot(x-b[i].x,y-b[i].y)<28){ a.s++; b.splice(i,1); break; } };
  a.loop=g=>{ if(R()<.06) b.push({x:30+R()*300,y:510,v:1.5+R()*2.5,c:'hsl('+(R()*360|0)+',80%,60%)'}); b.forEach(o=>{ o.y-=o.v; C(g,o.x,o.y,24,o.c); g.fillStyle='#fff'; g.fillRect(o.x-1,o.y+24,2,22); }); b=b.filter(o=>o.y>-50); }; });
arcade('flappy','Flappy Bird','🐤','#38bdf8','#22c55e','Tap to flap through the pipes',a=>{ let y=240,v=0,p=[],n=0; a.T=0;
  a.down=()=>{ v=-7; };
  a.loop=g=>{ v+=.45; y+=v; if(--n<=0){ p.push({x:370,h:80+R()*220,c:0}); n=90; } g.fillStyle='#22c55e';
    p.forEach(o=>{ o.x-=2.5; if(!o.c&&o.x<46){ o.c=1; a.s++; } if(o.x<74&&o.x+50>46&&(y<o.h||y>o.h+140)) a.end(); g.fillRect(o.x,0,50,o.h); g.fillRect(o.x,o.h+140,50,480); });
    p=p.filter(o=>o.x>-60); if(y<0||y>480) a.end(); C(g,60,y,14,'#facc15'); }; });
arcade('fruit','Fruit Catch','🍎','#f97316','#dc2626','Move the basket — catch 🍎, dodge 💣',a=>{ let f=[],x=180; a.T=30;
  a.mv=a.down=px=>{ x=px; }; a.key=c=>{ x=Math.max(20,Math.min(340,x+(c==='ArrowLeft'?-36:c==='ArrowRight'?36:0))); };
  a.loop=g=>{ if(R()<.05) f.push({x:20+R()*320,y:0,b:R()<.2}); g.font='28px serif';
    f=f.filter(o=>{ o.y+=3+a.s*.05; if(o.y>440&&o.y<470&&Math.abs(o.x-x)<44){ a.s=Math.max(0,a.s+(o.b?-3:1)); return 0; } g.fillText(o.b?'💣':'🍎',o.x-14,o.y); return o.y<490; });
    g.fillStyle='#f59e0b'; g.fillRect(x-40,450,80,14); }; });
arcade('math','Math Rush','➕','#8b5cf6','#4f46e5','Solve as many sums as you can — press Enter',a=>{ const b=a.box; a.T=30;
  const q=()=>{ const x=2+R()*12|0,y=2+R()*12|0,r=R()<.5; b.innerHTML=''; const i=h('input'); i.type='number'; i.style.cssText='font-size:24px;text-align:center;margin:10px 0';
    const go=()=>{ if(+i.value===(r?x+y:x*y)) a.s++; q(); }; i.onkeydown=e=>{ if(e.key==='Enter') go(); };
    b.append(h('div','qq',x+(r?' + ':' × ')+y+' = ?'),i,btn('primary rbtn','OK',go)); i.focus(); }; q(); },true);
arcade('reaction','Reaction Time','⚡','#16a34a','#0f766e','Tap the moment the screen turns green — 5 rounds',a=>{ let st=0,t0=0,n=0,w=60+R()*120|0,m='Wait for GREEN…'; a.T=0;
  const nxt=()=>{ n++; st=2; w=60+R()*120|0; setTimeout(()=>{ st=0; m='Wait for GREEN…'; },900); if(n>=5) setTimeout(()=>a.end(),900); };
  a.down=()=>{ if(st===0){ m='Too early! 😅'; nxt(); } else if(st===1){ const ms=performance.now()-t0; a.s+=Math.max(0,(1000-ms)/10|0); m=Math.round(ms)+' ms'; nxt(); } };
  a.loop=g=>{ if(st===0&&--w<=0){ st=1; t0=performance.now(); } g.fillStyle=st===1?'#16a34a':st===0?'#b91c1c':'#334155'; g.fillRect(0,0,360,480); g.fillStyle='#fff'; g.font='bold 26px sans-serif'; g.textAlign='center'; g.fillText(st===1?'TAP NOW!':m,180,240); g.textAlign='left'; }; });

const WB=['PLANET','BANANA','GUITAR','CRICKET','MONSOON','JASMINE','ELEPHANT','TEMPLE','ROCKET','CHENNAI','COCONUT','FRIENDS','MOVIE','PARTY','GALAXY','TIGER','MANGO','SCHOOL','CAMERA','WINTER','FLOWER','SUNRISE'];
arcade('letter','Letter Puzzle','🔤','#a855f7','#6366f1','Unscramble the word — tap letters in order (60s)',a=>{ const b=a.box; a.T=60; const W=shuffle(WB.slice()); let wi=0;
  const nx=()=>{ const w=W[wi++%W.length]; let L=shuffle(w.split('')); if(L.join('')===w) L.reverse(); let ans=[];
    const draw=()=>{ b.innerHTML=''; b.className='qz'; const sl=h('div','qq',ans.length?ans.map(i=>L[i]).join(' '):'_ '.repeat(w.length)); sl.style.letterSpacing='4px';
      const row=h('div','rps'); L.forEach((c,i)=>{ const x=btn('',c,()=>{ ans.push(i); if(ans.length===w.length){ if(ans.map(j=>L[j]).join('')===w){ a.s++; nx(); return; } ans=[]; } draw(); });
        x.style.cssText='width:46px;height:54px;font-size:24px;font-weight:800;padding:0'; x.disabled=ans.includes(i); row.appendChild(x); });
      const ctl=h('div','mbtns'); ctl.append(btn('gbtn','⌫ Undo',()=>{ ans.pop(); draw(); }),btn('gbtn','⏭ Skip',nx)); b.append(sl,row,ctl); };
    draw(); }; nx(); },true);
arcade('pic','Pic Puzzle','🧩','#ec4899','#f59e0b','Slide the tiles to rebuild the picture — faster = more points',a=>{
  const pic=document.createElement('canvas'); pic.width=pic.height=330; const p=pic.getContext('2d'); const gr=p.createLinearGradient(0,0,0,330);
  gr.addColorStop(0,'hsl('+(R()*360|0)+',85%,62%)'); gr.addColorStop(1,'hsl('+(R()*360|0)+',80%,35%)'); p.fillStyle=gr; p.fillRect(0,0,330,330);
  for(let i=0;i<40;i++){ p.fillStyle='rgba(255,255,255,'+(.15+R()*.4)+')'; p.beginPath(); p.arc(R()*330,R()*330,2+R()*7,0,7); p.fill(); }
  p.fillStyle='#fde047'; p.beginPath(); p.arc(260,60,34,0,7); p.fill(); p.fillStyle='#14532d'; p.beginPath(); p.moveTo(0,330); p.lineTo(90,190); p.lineTo(190,330); p.fill();
  p.fillStyle='#166534'; p.beginPath(); p.moveTo(110,330); p.lineTo(230,150); p.lineTo(330,330); p.fill(); p.font='110px serif'; p.fillText(pick(['🦁','🐘','🚀','🏰','🦜','🐯','🛕','🏏']),95,190);
  const T=[0,1,2,3,4,5,6,7,8]; let bl=8,fin=0,prev=-1; a.T=90;
  const nb=i=>{ const r=i/3|0,c=i%3,o=[]; if(r>0) o.push(i-3); if(r<2) o.push(i+3); if(c>0) o.push(i-1); if(c<2) o.push(i+1); return o; };
  const sw=i=>{ T[bl]=T[i]; T[i]=8; bl=i; };
  for(let k=0;k<90;k++){ const m=pick(nb(bl).filter(x=>x!==prev)); prev=bl; sw(m); }
  a.down=(x,y)=>{ if(fin||x<15||y<70) return; const c=(x-15)/110|0,r=(y-70)/110|0; if(c>2||r>2) return; const i=r*3+c;
    if(nb(bl).includes(i)){ sw(i); Snd.sfx('move'); if(T.every((v,j)=>v===j)){ fin=1; a.s=10+Math.max(0,Math.ceil(a.T-a.el)); setTimeout(()=>a.end(),900); } } };
  a.loop=g=>{ g.fillStyle='#fff'; g.font='bold 18px sans-serif'; g.fillText(fin?'🎉 Solved!':'Goal ↓',15,50);
    for(let i=0;i<9;i++){ const v=T[i]; if(v===8&&!fin) continue; const x=15+(i%3)*110,y=70+(i/3|0)*110; g.drawImage(pic,(v%3)*110,(v/3|0)*110,110,110,x,y,fin?110:106,fin?110:106); }
    g.strokeStyle='#fff'; g.lineWidth=2; g.strokeRect(150,414,60,60); g.drawImage(pic,0,0,330,330,151,415,58,58); }; });
arcade('subway','Subway Runner','🚇','#0ea5e9','#7c3aed','Swipe ← → change lane · ↑ jump · ↓ roll · collect coins',a=>{
  let ln=1,tl=1,jy=0,jv=0,rl=0,ob=[],sp=.011,n=20,dist=0,coins=0,off=0,d0=null; a.T=0;
  const mv=k=>{ if(k==='L'&&tl>0) tl--; else if(k==='R'&&tl<2) tl++; else if(k==='U'&&jy===0){ jv=.1; rl=0; Snd.sfx('move'); } else if(k==='D'){ rl=26; if(jy>0) jv=-.14; } };
  a.down=(x,y)=>{ d0=[x,y]; }; a.up=()=>{ if(d0) mv('U'); d0=null; };
  a.mv=(x,y)=>{ if(!d0) return; const dx=x-d0[0],dy=y-d0[1]; if(Math.hypot(dx,dy)>26){ mv(Math.abs(dx)>Math.abs(dy)?(dx>0?'R':'L'):(dy<0?'U':'D')); d0=null; } };
  a.key=c=>mv({ArrowLeft:'L',ArrowRight:'R',ArrowUp:'U',ArrowDown:'D'}[c]);
  const S=d=>1-d*.72, Y=d=>410-d*300;
  a.loop=g=>{
    ln+=(tl-ln)*.28; if(jy>0||jv>0){ jy=Math.max(0,jy+jv); jv-=.0065; if(jy===0) jv=0; } if(rl) rl--;
    sp=Math.min(.026,.011+dist/60000); dist+=sp*1000; off=(off+sp)%.1; a.s=(dist/10|0)+coins*5;
    if(--n<=0){ const l=R()*3|0,t=R(); ob.push({d:1,l,k:t<.35?'T':t<.65?'B':'H'}); const fr=[0,1,2].filter(x=>x!==l);
      if(R()<.35) ob.push({d:1,l:fr[0],k:R()<.5?'B':'H'}); else if(R()<.7) ob.push({d:1,l:fr[R()*2|0],k:'C'}); n=Math.max(12,34-(sp*900|0)); }
    ob.forEach(o=>{ o.d-=sp; if(!o.x&&o.d<.07&&o.d>-.04&&Math.abs(o.l-ln)<.55){ if(o.k==='C'){ coins++; o.x=1; } else if(o.k==='T'||(o.k==='B'&&jy<.34)||(o.k==='H'&&!rl)) a.end(); } });
    ob=ob.filter(o=>o.d>-.2&&!o.x);
    const sk=g.createLinearGradient(0,0,0,112); sk.addColorStop(0,'#0f172a'); sk.addColorStop(1,'#7c3aed'); g.fillStyle=sk; g.fillRect(0,0,360,112);
    g.fillStyle='#1e293b'; g.beginPath(); g.moveTo(135,110); g.lineTo(225,110); g.lineTo(367,480); g.lineTo(-7,480); g.fill();
    g.strokeStyle='#64748b'; g.lineWidth=2; g.beginPath(); [-1,1].forEach(q=>{ g.moveTo(180+q*52.5*.28,110); g.lineTo(180+q*52.5*1.168,480); }); g.stroke();
    g.strokeStyle='rgba(148,163,184,.35)'; g.beginPath(); for(let i=0;i<11;i++){ const d=i*.1-off,sc=S(d),y=Y(d); if(d<-.2) continue; g.moveTo(180-160*sc,y); g.lineTo(180+160*sc,y); } g.stroke();
    ob.slice().sort((p,q)=>q.d-p.d).forEach(o=>{ const sc=S(o.d),y=Y(o.d),x=180+(o.l-1)*105*sc;
      if(o.k==='T'){ g.fillStyle='#ef4444'; g.fillRect(x-40*sc,y-110*sc,80*sc,110*sc); g.fillStyle='#fecaca'; g.fillRect(x-30*sc,y-95*sc,60*sc,30*sc); g.fillStyle='#7f1d1d'; g.fillRect(x-40*sc,y-14*sc,80*sc,14*sc); }
      else if(o.k==='B'){ g.fillStyle='#facc15'; g.fillRect(x-42*sc,y-30*sc,84*sc,28*sc); g.fillStyle='#111'; for(let i=0;i<4;i++) g.fillRect(x-42*sc+i*22*sc,y-30*sc,10*sc,28*sc); }
      else if(o.k==='H'){ g.fillStyle='#94a3b8'; g.fillRect(x-44*sc,y-70*sc,8*sc,70*sc); g.fillRect(x+36*sc,y-70*sc,8*sc,70*sc); g.fillStyle='#f97316'; g.fillRect(x-44*sc,y-70*sc,88*sc,22*sc); }
      else C(g,x,y-30*sc,12*sc,'#facc15'); });
    const px=180+(ln-1)*105,py=410-jy*90,hh=rl?20:62; g.fillStyle='rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(px,413,Math.max(6,18-jy*14),6,0,0,7); g.fill();
    g.fillStyle='#38bdf8'; g.fillRect(px-15,py-hh,30,hh); g.fillStyle='#f97316'; g.fillRect(px-15,py-hh,30,12); C(g,px,py-hh-(rl?6:10),rl?10:12,'#fde68a');
    g.fillStyle='#facc15'; g.font='bold 18px sans-serif'; g.fillText('🪙 '+coins,10,26); g.textAlign='right'; g.fillText((dist/10|0)+' m',350,26); g.textAlign='left'; }; });


/* =============== +25 NEW GAMES (total 50) =============== */
const TX=(g,m,x,y,c,f)=>{ g.fillStyle=c||'#fff'; g.font=f||'bold 22px sans-serif'; g.textAlign='center'; g.fillText(m,x,y); g.textAlign='left'; };
function dodge(k,name,c1,c2,d,me,ob,bg){ arcade(k,name,me,c1,c2,d,a=>{ let ln=1,tl=1,o=[],n=25,t=0,sp=2.6; a.T=0;
  const mv=q=>{ if(q==='L'&&tl>0) tl--; else if(q==='R'&&tl<2) tl++; }; a.down=x=>mv(x<180?'L':'R'); a.key=c=>mv(c==='ArrowLeft'?'L':c==='ArrowRight'?'R':'');
  a.loop=g=>{ t++; sp=2.6+t/700; ln+=(tl-ln)*.25; if(--n<=0){ o.push({l:R()*3|0,y:-40}); if(R()<.3) o.push({l:R()*3|0,y:-40}); n=Math.max(20,58-t/35|0); }
    g.fillStyle=bg; g.fillRect(0,0,360,480); g.strokeStyle='rgba(255,255,255,.35)'; g.lineWidth=3; g.setLineDash([22,18]); g.lineDashOffset=-t*sp; g.beginPath(); [120,240].forEach(x=>{ g.moveTo(x,0); g.lineTo(x,480); }); g.stroke(); g.setLineDash([]);
    g.font='34px serif'; o.forEach(q=>{ q.y+=sp; if(!q.c&&q.y>405&&q.y<455&&Math.abs(q.l-ln)<.6) a.end(); if(!q.c&&q.y>480){ q.c=1; a.s++; } g.fillText(ob,43+q.l*120,q.y); }); o=o.filter(q=>q.y<520);
    g.fillText(me,43+ln*120,445); }; }); }
dodge('race','Car Racing','#ef4444','#7f1d1d','Tap left/right to switch lanes — dodge traffic','🏎️','🚗','#334155');
dodge('bike','Bike Race','#f97316','#78350f','Tap left/right — weave through the traffic','🏍️','🚙','#3f3f46');
dodge('boat','Speed Boat','#06b6d4','#1e3a8a','Tap left/right — avoid the rocks','🚤','🪨','#0c4a6e');
dodge('jet','Jet Dodge','#6366f1','#1e1b4b','Tap left/right — dodge the missiles','✈️','🚀','#1e1b4b');
dodge('rocket','Rocket Escape','#a855f7','#4c1d95','Tap left/right — dodge asteroids','🚀','☄️','#0f0a24');
dodge('cycle','Cycle Rush','#22c55e','#14532d','Tap left/right — dodge the cows','🚴','🐄','#365314');
function timing(k,name,em,c1,c2,d,rs,ball){ arcade(k,name,em,c1,c2,d,a=>{ let x=20,v=5,n=6,lock=0,msg='Tap when the ball hits the green zone!'; a.T=0;
  a.down=()=>{ if(lock||n<=0) return; const q=Math.abs(x-180),p=q<14?6:q<40?4:q<80?2:0; a.s+=p; msg=rs[p/2]+(p?' +'+p:''); n--; lock=45; v+=.8; if(!n) setTimeout(()=>a.end(),900); };
  a.loop=g=>{ if(lock){ if(--lock===0&&n>0){ x=20; msg='Next…'; } } else { x+=v; if(x>340){ x=340; v=-Math.abs(v); } if(x<20){ x=20; v=Math.abs(v); } }
    g.fillStyle='#1e293b'; g.fillRect(20,300,320,40); g.fillStyle='#ef4444'; g.fillRect(100,300,160,40); g.fillStyle='#eab308'; g.fillRect(140,300,80,40); g.fillStyle='#22c55e'; g.fillRect(166,300,28,40);
    g.font='40px serif'; g.fillText(ball,x-20,290); g.font='64px serif'; g.fillText(em,150,150); TX(g,msg,180,420); TX(g,em+' × '+n,180,50,'#fff'); }; }); }
timing('cricket','Cricket','🏏','#16a34a','#065f46','Time your shot — SIX for a perfect hit!',['Dot ball','2 runs','FOUR!','SIX!!'],'🔴');
timing('penalty','Penalty Kick','⚽','#22c55e','#166534','Shoot when the ball is in the green',['Saved!','Post','Goal!','Top corner!'],'⚽');
timing('basket','Basketball','🏀','#f97316','#9a3412','Release at the right moment',['Air ball','Rim','Basket!','Swish!'],'🏀');
timing('golf','Golf','⛳','#84cc16','#365314','Hit it in the green zone',['Rough','Fairway','Green','Hole in one!'],'⛳');
timing('bowling','Bowling','🎳','#6366f1','#312e81','Roll when the ball is centred',['Gutter','7 pins','9 pins','STRIKE!'],'🎳');
timing('tennis','Tennis Serve','🎾','#eab308','#713f12','Serve in the green zone',['Net','In','Fast serve','ACE!'],'🎾');
function catcher(k,name,em,c1,c2,d,good,bad,bg){ arcade(k,name,em,c1,c2,d,a=>{ let f=[],x=180; a.T=30; a.mv=a.down=px=>{ x=px; }; a.key=c=>{ x=Math.max(20,Math.min(340,x+(c==='ArrowLeft'?-36:c==='ArrowRight'?36:0))); };
  a.loop=g=>{ g.fillStyle=bg; g.fillRect(0,0,360,480); if(R()<.05) f.push({x:20+R()*320,y:0,b:R()<.22}); g.font='28px serif';
    f=f.filter(o=>{ o.y+=2.6+a.s*.04; if(o.y>430&&o.y<470&&Math.abs(o.x-x)<44){ a.s=Math.max(0,a.s+(o.b?-3:1)); return 0; } g.fillText(o.b?bad:good,o.x-14,o.y); return o.y<490; }); g.fillStyle='#f59e0b'; g.fillRect(x-40,450,80,14); }; }); }
catcher('candy','Candy Catch','🍬','#ec4899','#9d174d','Catch 🍬, dodge 💣','🍬','💣','#2e1065');
catcher('coin','Coin Rain','🪙','#eab308','#713f12','Catch 🪙, dodge 🪨','🪙','🪨','#1c1917');
catcher('pizza','Pizza Catch','🍕','#ef4444','#7f1d1d','Catch 🍕, dodge 🌶️','🍕','🌶️','#431407');
catcher('star','Star Catch','⭐','#6366f1','#1e1b4b','Catch ⭐, dodge ☄️','⭐','☄️','#0b1026');
catcher('gift','Gift Catch','🎁','#f43f5e','#881337','Catch 🎁, dodge 💥','🎁','💥','#3b0764');
function tapper(k,name,em,c1,c2,d,good,bad,bg){ arcade(k,name,em,c1,c2,d,a=>{ let t=[]; a.T=30;
  a.down=(x,y)=>{ for(let i=t.length;i--;) if(Math.hypot(x-t[i].x,y-t[i].y)<34){ a.s=Math.max(0,a.s+(t[i].b?-2:1)); t.splice(i,1); return; } };
  a.loop=g=>{ g.fillStyle=bg; g.fillRect(0,0,360,480); if(R()<.05) t.push({x:30+R()*300,y:70+R()*370,l:70,b:R()<.25}); g.font='40px serif'; t.forEach(o=>{ o.l--; g.fillText(o.b?bad:good,o.x-20,o.y+14); }); t=t.filter(o=>o.l>0); }; }); }
tapper('ghost','Ghost Hunt','👻','#8b5cf6','#312e81','Tap 👻, avoid 🎃 (−2)','👻','🎃','#111827');
tapper('bug','Bug Smash','🐞','#16a34a','#14532d','Tap 🐞, avoid 🐝 (−2)','🐞','🐝','#14532d');
tapper('fish','Fish Catch','🐟','#0ea5e9','#0c4a6e','Tap 🐟, avoid 🐡 (−2)','🐟','🐡','#0c4a6e');
tapper('gem','Gem Tap','💎','#ec4899','#581c87','Tap 💎, avoid 💣 (−2)','💎','💣','#1e1b4b');
arcade('snake','Snake','🐍','#22c55e','#14532d','Swipe / arrow keys — eat 🍎, avoid walls & yourself',a=>{ let s=[[9,12],[8,12],[7,12]],d=[1,0],nd=d,f=[14,12],c=0,d0=null; a.T=60;
  a.key=q=>{ const m={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[q]; if(m&&(m[0]+d[0]||m[1]+d[1])) nd=m; };
  a.down=(x,y)=>{ d0=[x,y]; }; a.up=()=>{ d0=null; }; a.mv=(x,y)=>{ if(!d0) return; const dx=x-d0[0],dy=y-d0[1]; if(Math.hypot(dx,dy)>22){ a.key(Math.abs(dx)>Math.abs(dy)?(dx>0?'ArrowRight':'ArrowLeft'):(dy>0?'ArrowDown':'ArrowUp')); d0=null; } };
  a.loop=g=>{ if(++c>=7){ c=0; d=nd; const hd=[s[0][0]+d[0],s[0][1]+d[1]]; if(hd[0]<0||hd[0]>17||hd[1]<0||hd[1]>23||s.some(q=>q[0]===hd[0]&&q[1]===hd[1])){ a.end(); return; } s.unshift(hd); if(hd[0]===f[0]&&hd[1]===f[1]){ a.s++; f=[R()*18|0,R()*24|0]; } else s.pop(); }
    g.font='18px serif'; g.fillText('🍎',f[0]*20,f[1]*20+17); s.forEach((q,i)=>{ g.fillStyle=i?'#22c55e':'#86efac'; g.fillRect(q[0]*20+1,q[1]*20+1,18,18); }); }; });
function ball(k,name,em,c1,c2,d,bricks){ arcade(k,name,em,c1,c2,d,a=>{ let px=180,b={x:180,y:380,vx:2.6,vy:-3.4},br=[]; a.T=bricks?60:45;
  if(bricks) for(let r=0;r<5;r++) for(let c=0;c<8;c++) br.push({x:8+c*43,y:50+r*22,c:'hsl('+(r*60)+',75%,55%)'});
  a.mv=a.down=x=>{ px=x; }; a.key=q=>{ px=Math.max(30,Math.min(330,px+(q==='ArrowLeft'?-40:q==='ArrowRight'?40:0))); };
  a.loop=g=>{ b.x+=b.vx; b.y+=b.vy; if(b.x<6||b.x>354) b.vx*=-1; if(b.y<6) b.vy=Math.abs(b.vy); if(b.y>440&&b.y<456&&Math.abs(b.x-px)<46&&b.vy>0){ b.vy=-Math.abs(b.vy)*(bricks?1:1.04); b.vx=(b.x-px)*.12; if(!bricks) a.s++; }
    if(b.y>490){ a.end(); return; } br=br.filter(q=>{ if(b.x>q.x&&b.x<q.x+41&&b.y>q.y&&b.y<q.y+20){ b.vy*=-1; a.s++; return 0; } return 1; }); if(bricks&&!br.length){ a.end(); return; }
    br.forEach(q=>{ g.fillStyle=q.c; g.fillRect(q.x,q.y,41,20); }); g.fillStyle='#38bdf8'; g.fillRect(px-46,450,92,12); C(g,b.x,b.y,7,'#fff'); }; }); }
ball('bricks','Brick Breaker','🧱','#f43f5e','#4c0519','Move the paddle — break all bricks',1);
ball('pong','Ping Pong','🏓','#06b6d4','#164e63','Keep the ball alive — it speeds up!',0);
arcade('pong2p','2-Player Pong','🏓','#06b6d4','#ec4899','P1: W/S or Left touch · P2: ↑/↓ or Right touch (1v1)', a=>{
  let y1=240, y2=240, bx=180, by=240, vx=3.8, vy=2.2, s1=0, s2=0;
  const ph=70, pw=12; a.T=0;
  const keys={}; const kd=e=>{ keys[e.code]=true; }; const ku=e=>{ keys[e.code]=false; };
  addEventListener('keydown',kd); addEventListener('keyup',ku);
  a.mv=a.down=(x,y)=>{ if(x<180) y1=Math.max(35,Math.min(445,y)); else y2=Math.max(35,Math.min(445,y)); };
  a.loop=g=>{
    if(keys['KeyW']) y1=Math.max(35,y1-6);
    if(keys['KeyS']) y1=Math.min(445,y1+6);
    if(keys['ArrowUp']) y2=Math.max(35,y2-6);
    if(keys['ArrowDown']) y2=Math.min(445,y2+6);
    if(!keys['ArrowUp'] && !keys['ArrowDown'] && (!GS || !GS.local2P)){
      y2 += Math.max(-4.5, Math.min(4.5, (by - y2)*0.16));
    }
    bx+=vx; by+=vy;
    if(by<12){ by=12; vy=Math.abs(vy); Snd.sfx('move'); }
    if(by>468){ by=468; vy=-Math.abs(vy); Snd.sfx('move'); }
    if(bx-9<=28 && bx>=14 && Math.abs(by-y1)<=ph/2+6 && vx<0){
      vx=Math.abs(vx)*1.05; vy=(by-y1)*0.18; bx=29; Snd.sfx('score');
    }
    if(bx+9>=332 && bx<=346 && Math.abs(by-y2)<=ph/2+6 && vx>0){
      vx=-Math.abs(vx)*1.05; vy=(by-y2)*0.18; bx=331; Snd.sfx('score');
    }
    if(bx<0){ s2++; bx=180; by=240; vx=3.8; vy=(R()-.5)*3.5; Snd.sfx('end'); }
    else if(bx>360){ s1++; bx=180; by=240; vx=-3.8; vy=(R()-.5)*3.5; Snd.sfx('score'); }
    a.s = s1*10 + s2;
    g.fillStyle='#0f172a'; g.fillRect(0,0,360,480);
    g.strokeStyle='rgba(255,255,255,.2)'; g.lineWidth=2; g.setLineDash([12,12]);
    g.beginPath(); g.moveTo(180,0); g.lineTo(180,480); g.stroke(); g.setLineDash([]);
    g.font='bold 40px sans-serif'; g.textAlign='center';
    g.fillStyle='#38bdf8'; g.fillText(String(s1),110,65);
    g.fillStyle='#ec4899'; g.fillText(String(s2),250,65);
    g.font='11.5px sans-serif'; g.fillStyle='#94a3b8'; g.fillText('P1: W/S (Left)',90,24); g.fillText('P2: ↑/↓ (Right)',270,24);
    g.fillStyle='#38bdf8'; g.fillRect(16,y1-ph/2,pw,ph);
    g.fillStyle='#ec4899'; g.fillRect(332,y2-ph/2,pw,ph);
    C(g,bx,by,9,'#facc15');
    if(s1>=5||s2>=5){ removeEventListener('keydown',kd); removeEventListener('keyup',ku); setTimeout(()=>a.end(),600); }
  };
});
arcade('simon','Memory Colors','🎨','#a855f7','#4c1d95','Repeat the colour pattern — score = longest chain',a=>{ const b=a.box; a.T=0; let seq=[],i=0,busy=1; b.innerHTML=''; b.className='qz'; const info=h('div','qq','Watch…'),w=h('div','qo');
  const bs=['#ef4444','#22c55e','#3b82f6','#eab308'].map((c,k)=>{ const x=btn('','●',()=>press(k)); x.style.cssText='background:'+c+';height:90px;font-size:30px;opacity:.5'; w.appendChild(x); return x; }); b.append(info,w);
  const fl=k=>{ bs[k].style.opacity=1; Snd.sfx('move'); setTimeout(()=>{ bs[k].style.opacity=.5; },350); };
  const play=()=>{ busy=1; i=0; seq.push(R()*4|0); info.textContent='Watch…'; seq.forEach((k,j)=>setTimeout(()=>fl(k),500+j*600)); setTimeout(()=>{ busy=0; info.textContent='Your turn!'; },500+seq.length*600); };
  const press=k=>{ if(busy) return; fl(k); if(k!==seq[i]){ busy=1; a.end(); return; } if(++i>=seq.length){ a.s=seq.length; busy=1; setTimeout(play,700); } }; play(); },true);


/* =============== +50 MORE GAMES (total 100) =============== */
const mk=(q,c,alts)=>{ const o=[c]; alts.forEach(v=>{ if(!o.includes(v)) o.push(v); }); o.sort(()=>R()-.5); return [q,o,o.indexOf(c)]; };
const ri=(a,b)=>a+(R()*(b-a+1)|0), pk=a=>a[R()*a.length|0];
function mcq(k,name,em,c1,c2,d,gen,T){ arcade(k,name,em,c1,c2,d,a=>{ const b=a.box; a.T=T||40; b.innerHTML=''; b.className='qz'; const q=h('div','qq'),w=h('div','qo'); b.append(q,w);
  const nx=()=>{ const o=gen(); q.textContent=o[0]; w.innerHTML=''; o[1].forEach((x,i)=>w.appendChild(btn('',String(x),()=>{ if(i===o[2]){ a.s++; Snd.sfx('move'); } else a.s=Math.max(0,a.s-1); nx(); }))); }; nx(); },true); }
const nr=c=>[c+ri(1,9),c-ri(1,9),c+10,c-10,c+ri(11,20)];
mcq('qadd','Quick Add','➕','#22c55e','#14532d','Solve as many sums as you can',()=>{ const x=ri(10,60),y=ri(10,60); return mk(x+' + '+y+' = ?',x+y,nr(x+y)); });
mcq('qmul','Times Table','✖️','#f97316','#7c2d12','Pick the right product',()=>{ const x=ri(2,12),y=ri(2,12); return mk(x+' × '+y+' = ?',x*y,nr(x*y)); });
mcq('seq','Number Sequence','🔢','#6366f1','#312e81','Find the next number',()=>{ const a=ri(1,20),d=ri(2,9); return mk(a+', '+(a+d)+', '+(a+2*d)+', '+(a+3*d)+', ?',a+4*d,nr(a+4*d)); });
mcq('prime','Prime or Not','🧮','#a855f7','#4c1d95','Is it a prime number?',()=>{ const n=ri(2,70); let p=n>1; for(let i=2;i*i<=n;i++) if(n%i===0) p=false; return [n+' is a prime number?',['Yes','No'],p?0:1]; });
mcq('sq','Square Master','🟦','#0ea5e9','#0c4a6e','Find the square',()=>{ const n=ri(3,18); return mk(n+'² = ?',n*n,nr(n*n)); });
mcq('big','Bigger Number','⚖️','#ec4899','#831843','Tap the bigger number',()=>{ const x=ri(100,999); let y=ri(100,999); if(y===x) y++; return [x+'  vs  '+y,[x,y],x>y?0:1]; });
mcq('oper','Missing Operator','➗','#14b8a6','#134e4a','Which operator fits?',()=>{ const x=ri(2,12),y=ri(2,12),o=ri(0,2),c=[x+y,x-y,x*y][o]; return [x+' ? '+y+' = '+c,['+','−','×'],o]; });
mcq('oddnum','Odd Number Out','🎲','#eab308','#713f12','Tap the odd number (others are even)',()=>{ const e=[0,0,0].map(()=>ri(1,40)*2),o=ri(1,40)*2+1; return mk('Which one is ODD?',o,e); });
mcq('percent','Percent Pro','💯','#ef4444','#7f1d1d','Work out the percentage',()=>{ const p=pk([10,20,25,50]),b=ri(2,20)*20,c=p*b/100; return mk(p+'% of '+b+' = ?',c,nr(c)); });
mcq('clock','Time Calc','🕒','#64748b','#1e293b','Find the end time',()=>{ const h0=ri(1,11),m0=ri(0,11)*5,d=ri(1,8)*10,t0=h0*60+m0+d,f=x=>(((x/60|0)%12)||12)+':'+String(x%60).padStart(2,'0'); return mk('Starts '+f(h0*60+m0)+', lasts '+d+' min. Ends at?',f(t0),[f(t0+10),f(t0-10),f(t0+20)]); });
const CASES=['Cake missing at 8pm. Raja was at the gym, Meena at the market, Kumar has cream on his shirt. Who ate it?|Kumar|Raja|Meena','Muddy footprints lead from the broken window. Who has muddy boots?|Gardener|Cook|Driver','Jewel stolen 2–3pm. Anu was on a video call 1–4pm, Ravi was in the lift at 2:30, Dev was seen at the locker at 2:40. Who?|Dev|Anu|Ravi','Lock opened with no damage. The thief most likely used…|A copied key|A hammer|A crowbar','A call came from the office landline at 9pm. Office closed at 8, only the guard stayed. Who called?|Guard|Manager|Peon','Footprints are size 6. Suspects: tall man (size 11), child (size 5), woman (size 6). Who?|The woman|The tall man|The child','Diary page torn on the right edge by a LEFT-handed person. Hari: right, Gita: left, Sam: right. Who?|Gita|Hari|Sam','Cook says the stove was off since 4pm, but the pan is hot at 5pm. Who lied?|The cook|The guard|The milkman'];
mcq('whodunit','Whodunit Cases','🕵️','#475569','#0f172a','Read the clues and name the culprit',()=>{ const c=pk(CASES).split('|'); return mk(c[0],c[1],c.slice(2)); },90);
const SY=['●','▲','■','◆','★','✚'];
mcq('print','Fingerprint Match','🖐️','#0ea5e9','#1e3a8a','Find the identical fingerprint code',()=>{ const t=Array.from({length:6},()=>pk(SY)),f=()=>{ const c=[...t]; c[ri(0,5)]=pk(SY); return c.join(' '); }; return mk('Match: '+t.join(' '),t.join(' '),[f(),f(),f()]); });
const WD=['CRIME','THIEF','CLUE','ALIBI','GUILTY','DETECTIVE','POLICE','SUSPECT','EVIDENCE','MURDER','WITNESS','MOTIVE'];
mcq('cipher','Cipher Decoder','🔐','#22c55e','#052e16','Each letter was shifted forward — decode the word',()=>{ const w=pk(WD),n=ri(1,3),e=[...w].map(c=>String.fromCharCode((c.charCodeAt(0)-65+n)%26+65)).join(''); return mk('Shift +'+n+':  '+e,w,[pk(WD),pk(WD),pk(WD)]); },60);
mcq('alibi','Alibi Check','⏱️','#f59e0b','#78350f','Is the suspect’s timeline TRUE or a lie?',()=>{ const m0=ri(0,11)*5,d=ri(2,8)*5,ok=R()<.5,c=540+m0+d+(ok?0:pk([-10,-5,5,10])),f=x=>(x/60|0)+':'+String(x%60).padStart(2,'0'); return ['Left 9:'+String(m0).padStart(2,'0')+', walked '+d+' min, “reached at '+f(c)+'”',['TRUE','LIE'],ok?0:1]; });
mcq('cctv','CCTV Memory','📹','#ef4444','#450a0a','Watch the suspects, then spot who was missing',()=>{ const P=['👮','🕵️','🥷','🤡','👸','🧙','🦸','🧛','👷','🧑‍🍳','🧑‍🚀','🎅'],o=P.sort(()=>R()-.5),sh=o.slice(0,5),miss=o[5]; const x=mk('Which was NOT in the CCTV?',miss,sh.slice(0,3)); return [ 'CCTV: '+sh.join(' ')+'  (remember!)  →  '+x[0],x[1],x[2]]; },60);
function codebr(k,name,em,c1,c2,d,L){ arcade(k,name,em,c1,c2,d,a=>{ const b=a.box; a.T=90; b.innerHTML=''; b.className='qz'; const sec=Array.from({length:L},()=>R()*10|0); let cur='',att=0;
  const log=h('div','glog','Enter a '+L+'-digit code. 🟢 right digit & place · 🟡 right digit, wrong place'),dsp=h('div','qq'),w=h('div','qo'); const up=()=>{ dsp.textContent=(cur+'_'.repeat(L-cur.length)).split('').join(' '); };
  '1234567890'.split('').forEach(c=>w.appendChild(btn('',c,()=>{ if(cur.length<L){ cur+=c; up(); } }))); w.appendChild(btn('','⌫',()=>{ cur=cur.slice(0,-1); up(); }));
  w.appendChild(btn('primary','OK',()=>{ if(cur.length<L) return; att++; let g=0,y=0; const s2=[...sec],c2=[...cur]; c2.forEach((c,i)=>{ if(+c===sec[i]){ g++; s2[i]=-1; c2[i]=null; } }); c2.forEach(c=>{ if(c===null) return; const j=s2.indexOf(+c); if(j>=0){ y++; s2[j]=-1; } });
    log.innerHTML+='<br>'+cur+' → 🟢'+g+' 🟡'+y; cur=''; up(); if(g===L){ a.s=Math.max(1,10-att)*10; a.end(); } else if(att>=9){ a.s=0; a.end(); } })); b.append(log,dsp,w); up(); },true); }
codebr('codebr','Code Breaker','🔓','#8b5cf6','#2e1065','Crack the 4-digit code in the fewest tries',4);
codebr('safe','Safe Cracker','🏦','#eab308','#422006','Crack the 3-digit safe code',3);
function oddout(k,name,em,c1,c2,d,A,B){ arcade(k,name,em,c1,c2,d,a=>{ const b=a.box; a.T=40; b.innerHTML=''; b.className='qz'; const q=h('div','qq','Find the odd one!'),w=h('div'); w.style.cssText='display:grid;gap:4px'; b.append(q,w); let lv=0;
  const nx=()=>{ const n=Math.min(7,3+(lv/2|0)),o=R()*n*n|0; w.style.gridTemplateColumns='repeat('+n+',1fr)'; w.innerHTML=''; for(let i=0;i<n*n;i++){ const x=btn('',i===o?B:A,()=>{ if(i===o){ a.s++; lv++; nx(); } else a.s=Math.max(0,a.s-1); }); x.style.cssText='font-size:'+(38-n*2)+'px;padding:2px;background:rgba(255,255,255,.06)'; w.appendChild(x); } }; nx(); },true); }
oddout('findthief','Find the Thief','🥷','#334155','#020617','Spot the different face in the crowd','🧑','🥷');
oddout('fakecoin','Fake Coin','🪙','#eab308','#713f12','Find the fake coin','🟡','🟠');
oddout('findcat','Find the Cat','🐱','#f97316','#7c2d12','Find the cat among dogs','🐶','🐱');
oddout('findghost','Find the Ghost','👻','#8b5cf6','#2e1065','Find the ghost','🎃','👻');
oddout('findalien','Find the Alien','👽','#22c55e','#052e16','Find the alien','🧑‍🚀','👽');
oddout('findhero','Find the Hero','🦸','#ef4444','#450a0a','Find the hero among villains','🦹','🦸');
arcade('order','Number Order','🔟','#06b6d4','#164e63','Tap 1 → 12 in order, fast!',a=>{ const b=a.box; a.T=45; b.innerHTML=''; b.className='qz'; const w=h('div'); w.style.cssText='display:grid;grid-template-columns:repeat(4,1fr);gap:6px'; b.appendChild(w); let n=1;
  const nb=()=>{ n=1; w.innerHTML=''; [...Array(12).keys()].map(x=>x+1).sort(()=>R()-.5).forEach(v=>{ const x=btn('',v,()=>{ if(v===n){ x.style.opacity=.25; a.s++; if(++n>12) nb(); } }); x.style.cssText='font-size:26px;padding:14px 0'; w.appendChild(x); }); }; nb(); },true);
arcade('stack','Tower Stack','🏗️','#38bdf8','#0c4a6e','Tap to drop the block — stack it high!',a=>{ let w=140,x=0,v=3,bs=[]; a.T=0;
  a.down=()=>{ const p=bs.length?bs[bs.length-1]:{x:110,w:140},l=Math.max(x,p.x),r=Math.min(x+w,p.x+p.w); if(r-l<6){ a.end(); return; } bs.push({x:l,w:r-l}); w=r-l; a.s++; v=(v>0?1:-1)*(3+a.s*.15); };
  a.loop=g=>{ x+=v; if(x<0||x+w>360) v*=-1; const off=Math.max(0,bs.length-12); bs.forEach((q,i)=>{ g.fillStyle='hsl('+i*25+',70%,55%)'; g.fillRect(q.x,440-(i-off)*24,q.w,22); }); g.fillStyle='#fff'; g.fillRect(x,440-(bs.length-off)*24,w,22); }; });
timing('lockpick','Lock Pick','🔒','#475569','#0f172a','Click the pin when it hits the green',['Jammed','Loose','Almost','CLICK!'],'📍');
timing('dart','Darts','🎯','#ef4444','#450a0a','Throw when the dart is centred',['Miss','Outer','Inner','BULLSEYE!'],'🎯');
timing('boxing','Boxing Punch','🥊','#dc2626','#450a0a','Punch at the perfect moment',['Dodged','Jab','Hook','KO!'],'🥊');
timing('rugby','Rugby Kick','🏉','#16a34a','#14532d','Kick at the sweet spot',['Wide','Short','Good','Perfect!'],'🏉');
timing('volley','Volleyball Spike','🏐','#f59e0b','#78350f','Spike in the green zone',['Net','Blocked','Spike','KILL!'],'🏐');
timing('shuttle','Badminton Smash','🏸','#06b6d4','#164e63','Smash when the shuttle is centred',['Out','Weak','Smash','Winner!'],'🏸');
timing('pool','Pool Shot','🎱','#0f766e','#042f2e','Strike the cue ball at the right time',['Miss','Touch','Pot','Perfect pot!'],'⚪');
dodge('chase','Police Chase','#3b82f6','#1e3a8a','Tap left/right — escape the police cars','🚓','🚔','#1f2937');
dodge('heist','Bank Heist Escape','#eab308','#422006','Tap left/right — dodge the guards','🥷','👮','#292524');
dodge('laser','Laser Maze','#ef4444','#450a0a','Tap left/right — avoid the lasers','🕵️','🔴','#111827');
dodge('taxi','Taxi Rush','#facc15','#713f12','Tap left/right — dodge the traffic','🚕','🚧','#374151');
dodge('ski','Ski Rush','#38bdf8','#0c4a6e','Tap left/right — dodge the snowmen','⛷️','⛄','#e0f2fe');
dodge('horse','Horse Derby','#a16207','#422006','Tap left/right — jump the fences','🏇','🚧','#3f6212');
catcher('spy','Spy Documents','📁','#64748b','#0f172a','Catch 📁 files, dodge 💣','📁','💣','#0f172a');
catcher('rain','Rain Drops','☔','#0ea5e9','#0c4a6e','Catch 💧, dodge ⚡','💧','⚡','#1e3a8a');
catcher('burger','Burger Catch','🍔','#f97316','#7c2d12','Catch 🍔, dodge 🪳','🍔','🪳','#431407');
catcher('egg','Egg Catch','🥚','#fde047','#713f12','Catch 🥚, dodge 💩','🥚','💩','#365314');
catcher('cake','Cake Catch','🍰','#f472b6','#831843','Catch 🍰, dodge 🧅','🍰','🧅','#4a044e');
tapper('clue','Evidence Hunt','🔍','#0ea5e9','#082f49','Tap 🧤 clues, avoid 🍩 (−2)','🧤','🍩','#0f172a');
tapper('catchthief','Catch the Thief','🥷','#475569','#020617','Tap 🥷 thieves, avoid 👮 police (−2)','🥷','👮','#0f172a');
tapper('ufo','Alien Invasion','👽','#22c55e','#052e16','Tap 👽, avoid 🧑‍🚀 (−2)','👽','🧑‍🚀','#020617');
tapper('zombie','Zombie Shoot','🧟','#65a30d','#1a2e05','Tap 🧟, avoid 🧑 (−2)','🧟','🧑','#1c1917');
tapper('dino','Dino Hunt','🦖','#16a34a','#14532d','Tap 🦖, avoid 🦕 (−2)','🦖','🦕','#365314');
tapper('pop','Bubble Pop','🫧','#38bdf8','#0c4a6e','Tap 🫧, avoid 💣 (−2)','🫧','💣','#082f49');
mcq('unscramble','Word Unscramble','🔤','#f43f5e','#4c0519','Unscramble the detective word',()=>{ const w=pk(WD),sc=[...w].sort(()=>R()-.5).join(''); return mk('Unscramble: '+sc,w,[pk(WD),pk(WD),pk(WD)]); },45);
/* =============== CRICKET 3D (three.js batting) =============== */
function load3d(){ return new Promise((ok,no)=>{ if(window.THREE) return ok(); const s=document.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'; const to=setTimeout(()=>no(new Error('3D load timed out')),15000); s.onload=()=>{ clearTimeout(to); window.THREE?ok():no(new Error('3D failed')); }; s.onerror=()=>{ clearTimeout(to); no(new Error('3D engine blocked')); }; document.head.appendChild(s); }); }
arcade('c3d','Cricket 3D','🏟️','#16a34a','#065f46','Real 3D batting — time your swing, hit SIXes (12 balls)',function(a){
  a.T=0;
  const FH=a.box.previousSibling; if(FH&&FH.classList&&FH.classList.contains('glog')) FH.style.display='none';
  const wrap=a.box; wrap.innerHTML=''; wrap.style.cssText='position:relative;width:min(100%,460px);margin:auto';
  const bar=h('div','glog'); bar.style.cssText='font-weight:800;font-size:15px;text-align:center;background:rgba(2,8,23,.6);border:1px solid rgba(148,163,184,.3);border-radius:999px;padding:7px 16px;backdrop-filter:blur(8px);color:#f8fafc';
  const stg=h('div'); stg.style.cssText='position:relative;border-radius:14px;overflow:hidden;background:#071a2f';
  const hint=h('div','sub'); hint.style.cssText='font-size:12px;opacity:.75;text-align:center;margin-top:6px'; hint.textContent='⭕ Tap / press Space when the ball reaches the yellow circle — Perfect = SIX!';
  wrap.append(bar,stg,hint); const BW=Math.min(wrap.clientWidth||400,460), BH=Math.max(240,Math.min(330,BW*.72));
  let runs=0,balls=0,outs=0,over=0,raf=0,T3=null,SC2,CAM2,R2,batG,batArm,bowlG,ballM,stumpsG=[],popT=null;
  const mk2=(geo,c,x,y,z,p)=>{ const m=new T3.Mesh(geo,new T3.MeshLambertMaterial({color:c})); m.position.set(x,y,z); m.castShadow=m.receiveShadow=true; (p||SC2).add(m); return m; };
  const human=(kit,skin,cap)=>{ const g2=new T3.Group(); const M=(geo,c,x,y,z,p)=>{ const m=new T3.Mesh(geo,new T3.MeshLambertMaterial({color:c})); m.position.set(x,y,z); m.castShadow=true; (p||g2).add(m); return m; };
    const legL=new T3.Group(), legR=new T3.Group(); legL.position.set(-.11,.62,0); legR.position.set(.11,.62,0);
    M(new T3.CylinderGeometry(.075,.06,.6,8),kit,0,-.3,0,legL); M(new T3.CylinderGeometry(.075,.06,.6,8),kit,0,-.3,0,legR);
    M(new T3.BoxGeometry(.15,.09,.32),'#20242c',0,-.6,.05,legL); M(new T3.BoxGeometry(.15,.09,.32),'#20242c',0,-.6,.05,legR);
    g2.add(legL,legR);
    const tor=new T3.Group(); tor.position.y=.62; g2.add(tor);
    M(new T3.CylinderGeometry(.18,.15,.62,10),kit,0,.31,0,tor);
    const armL=new T3.Group(), armR=new T3.Group(); armL.position.set(-.21,.56,0); armR.position.set(.21,.56,0);
    M(new T3.CylinderGeometry(.05,.045,.5,8),kit,0,-.22,0,armL); M(new T3.CylinderGeometry(.05,.045,.5,8),kit,0,-.22,0,armR);
    M(new T3.SphereGeometry(.058,8,8),skin||'#c68642',0,-.48,0,armL); M(new T3.SphereGeometry(.058,8,8),skin||'#c68642',0,-.48,0,armR);
    tor.add(armL,armR);
    M(new T3.SphereGeometry(.165,12,10),skin||'#c68642',0,.85,0,tor);
    if(cap){ M(new T3.CylinderGeometry(.17,.17,.1,12),cap,0,.93,0,tor); M(new T3.BoxGeometry(.22,.025,.16),cap,0,.9,.16,tor); }
    g2.userData={legL,legR,armL,armR,tor};
    return {g:g2,legs:[legL,legR],armL,armR,ud:g2.userData}; };
  function popup(txt,col){ const p=h('div',null,txt); p.style.cssText='position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);font:800 30px Plus Jakarta Sans,sans-serif;color:'+(col||'#fff')+';text-shadow:0 4px 18px rgba(0,0,0,.85);pointer-events:none;white-space:nowrap'; stg.appendChild(p);
    try{ p.animate([{transform:'translate(-50%,-50%) scale(.4)',opacity:0},{transform:'translate(-50%,-50%) scale(1.15)',opacity:1,offset:.25},{transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.7},{opacity:0}],{duration:1300}).onfinish=()=>p.remove(); }catch(e){ setTimeout(()=>p.remove(),1300); } }
  function hud(){ bar.textContent='🏏 '+runs+' run'+(runs===1?'':'s')+'  ·  Ball '+Math.min(balls+1,12)+'/12  ·  Out '+outs+'/3'; }
  function finish(){ if(over) return; over=1; hud(); popup('🏁 Innings over — '+runs+' runs','#fde047'); a.s=runs; if(FH) FH.style.display=''; setTimeout(()=>{ try{ a.end(); }catch(e){} },1400); }
  load3d().then(()=>{
    if(!wrap.isConnected) return;
    T3=window.THREE; SC2=new T3.Scene(); SC2.background=new T3.Color(0x0a2340); SC2.fog=new T3.Fog(0x0a2340,60,140);
    CAM2=new T3.PerspectiveCamera(48,BW/BH,.1,300); CAM2.position.set(0,6.6,18.6); CAM2.lookAt(0,.5,1);
    R2=new T3.WebGLRenderer({antialias:true,powerPreference:'high-performance'}); R2.setSize(BW,BH,false); R2.setPixelRatio(Math.min(2,window.devicePixelRatio||1)); R2.shadowMap.enabled=true; stg.appendChild(R2.domElement);
    R2.domElement.style.cssText='width:100%;display:block;touch-action:none';
    SC2.add(new T3.HemisphereLight(0xbfd8ff,0x0c2e18,.85));
    const dl=new T3.DirectionalLight(0xffffff,.9); dl.position.set(14,26,10); dl.castShadow=true; dl.shadow.mapSize.set(1024,1024); dl.shadow.camera.left=-32; dl.shadow.camera.right=32; dl.shadow.camera.top=32; dl.shadow.camera.bottom=-32; SC2.add(dl);
    const gc=document.createElement('canvas'); gc.width=gc.height=64; const gx=gc.getContext('2d'); const gr=gx.createRadialGradient(32,32,2,32,32,30); gr.addColorStop(0,'rgba(255,255,245,1)'); gr.addColorStop(.45,'rgba(255,255,225,.45)'); gr.addColorStop(1,'rgba(255,255,225,0)'); gx.fillStyle=gr; gx.fillRect(0,0,64,64);
    const gtex=new T3.CanvasTexture(gc);
    const glow=(x,y,z,s)=>{ const sp=new T3.Sprite(new T3.SpriteMaterial({map:gtex,transparent:true,depthWrite:false})); sp.position.set(x,y,z); sp.scale.set(s,s,1); SC2.add(sp); };
    [[-45,25],[45,25],[-45,-40],[45,-40]].forEach(p=>{ mk2(new T3.CylinderGeometry(.35,.5,22,8),'#7c8794',p[0],11,p[1]); const hd=mk2(new T3.BoxGeometry(4.6,1.8,.5),'#e8edf5',p[0],22.6,p[1]); hd.material=new T3.MeshLambertMaterial({color:0xf4f8ff,emissive:0xcadfff}); glow(p[0],22.6,p[1],13); });
    mk2(new T3.CircleGeometry(70,56),'#2e7d3f',0,.005,0).rotation.x=-Math.PI/2;
    for(let i=0;i<7;i++){ const r0=58-i*8; const m=new T3.Mesh(new T3.RingGeometry(Math.max(6,r0-8),r0,56),new T3.MeshBasicMaterial({color:i%2?'#37964d':'#2e7d3f'})); m.rotation.x=-Math.PI/2; m.position.y=.012*(i+1); SC2.add(m); }
    const rope=new T3.Mesh(new T3.TorusGeometry(55,.28,6,72),new T3.MeshLambertMaterial({color:0xffffff})); rope.rotation.x=Math.PI/2; rope.position.y=.14; SC2.add(rope);
    const adC=['#0ea5e9','#e11d48','#facc15','#22c55e','#a855f7','#f97316']; 
    for(let i=0;i<12;i++){ const a=i*Math.PI/6, ad=new T3.Mesh(new T3.BoxGeometry(11,1.15,.3),new T3.MeshLambertMaterial({color:adC[i%6],emissive:adC[i%6],emissiveIntensity:.45})); ad.position.set(Math.sin(a)*57.5,.6,Math.cos(a)*57.5); ad.rotation.y=a; SC2.add(ad); }
    const stands=new T3.Mesh(new T3.CylinderGeometry(62,52,11,48,1,true),new T3.MeshLambertMaterial({color:0x0e1830,side:2})); stands.position.y=5.5; SC2.add(stands);
    const crowd=new T3.InstancedMesh(new T3.BoxGeometry(.55,.75,.4),new T3.MeshLambertMaterial({color:0xffffff}),300); const cm=new T3.Object3D(); const cc=['#f43f5e','#facc15','#38bdf8','#a3e635','#f97316','#e2e8f0','#c084fc'];
    for(let i=0;i<300;i++){ const row=Math.floor(i/30), a=i*.209+row*.21+(R()*.14-.07), rr=53.5+row*1.05; cm.position.set(Math.sin(a)*rr,.9+row*1.08,Math.cos(a)*rr); cm.rotation.y=a; cm.updateMatrix(); crowd.setMatrixAt(i,cm.matrix); crowd.setColorAt(i,new T3.Color(cc[(R()*7)|0])); }
    crowd.instanceMatrix.needsUpdate=true; if(crowd.instanceColor) crowd.instanceColor.needsUpdate=true; SC2.add(crowd);
    mk2(new T3.BoxGeometry(2.7,.1,22.6),'#d8c496',0,.05,0);
    [-10.2,-8.2,8.2,10.2].forEach(z=>mk2(new T3.BoxGeometry(2.75,.02,.13),'#fdfdf8',0,.11,z));
    const zone=new T3.Mesh(new T3.RingGeometry(.55,.8,28),new T3.MeshBasicMaterial({color:0xfde047,transparent:true,opacity:.9,side:2})); zone.rotation.x=-Math.PI/2; zone.position.set(0,.13,9.5); SC2.add(zone);
    const zone2=new T3.Mesh(new T3.RingGeometry(1.2,1.36,28),new T3.MeshBasicMaterial({color:0xfde047,transparent:true,opacity:.3,side:2})); zone2.rotation.x=-Math.PI/2; zone2.position.set(0,.13,9.5); SC2.add(zone2);
    const mkStumps=z=>{ const g2=new T3.Group(); for(let i=-1;i<=1;i++){ const s=mk2(new T3.CylinderGeometry(.042,.042,.74,8),'#f4f2fb',i*.115,.37,0,g2); s.castShadow=true; }
      const bail=new T3.Mesh(new T3.CylinderGeometry(.022,.022,.27,6),new T3.MeshLambertMaterial({color:0xe0b24a})); bail.rotation.z=Math.PI/2; bail.position.y=.77; bail.castShadow=true; g2.add(bail); g2.userData.bail=bail;
      g2.position.set(0,0,z); SC2.add(g2); return g2; };
    stumpsG=[mkStumps(9.2),mkStumps(-9.2)];
    const bailFx=[];
    const breakStumps=()=>{ const sg=stumpsG[0]; sg.rotation.x=-1.3; sg.position.z=.4; if(sg.userData.bail) sg.userData.bail.visible=false;
      for(let i=0;i<2;i++){ const b=new T3.Mesh(new T3.CylinderGeometry(.02,.02,.2,6),new T3.MeshLambertMaterial({color:0xe0b24a})); b.position.set((i?-1:1)*.07,.82,.25); b.userData={vx:(i?-1:1)*(1.2+R()),vy:2.6+R()*1.4,vz:.8+R()*.7,rs:7+R()*8}; SC2.add(b); bailFx.push(b); } };
    const batter=human('#1d4ed8','#c68642'); batter.g.position.set(.5,0,9.9); batter.g.rotation.y=Math.PI+.3; SC2.add(batter.g); batG=batter;
    batter.legs.forEach(lg2=>{ const pd=new T3.Mesh(new T3.BoxGeometry(.13,.5,.1),new T3.MeshLambertMaterial({color:0xf3f4f6})); pd.position.set(0,-.26,.05); pd.castShadow=true; lg2.add(pd); });
    const hel=new T3.Mesh(new T3.SphereGeometry(.18,12,10,0,Math.PI*2,0,Math.PI*.62),new T3.MeshLambertMaterial({color:0x0b1020})); hel.position.set(0,.88,.03); batter.ud.tor.add(hel);
    const grill=new T3.Mesh(new T3.BoxGeometry(.16,.12,.02),new T3.MeshLambertMaterial({color:0x94a3b8})); grill.position.set(0,.76,.16); batter.ud.tor.add(grill);
    const bat=new T3.Group(); bat.position.set(.32,1.32,.18);
    const bl1=new T3.Mesh(new T3.BoxGeometry(.15,.68,.3),new T3.MeshLambertMaterial({color:0xd9a15a})); bl1.position.y=-.5; bl1.castShadow=true; bat.add(bl1);
    mk2(new T3.CylinderGeometry(.032,.032,.36,8),'#2b2b2b',0,-.06,0,bat);
    bat.rotation.x=-.35; batter.g.add(bat); batArm=bat;
    const bowler=human('#eceff4','#c68642','#0f172a'); bowler.g.position.set(0,0,-13.5); SC2.add(bowler.g); bowlG=bowler;
    const keeper=human('#0ea5e9','#c68642','#0ea5e9'); keeper.g.position.set(-.5,0,12.3); keeper.g.rotation.y=Math.PI; keeper.g.scale.y=.72; keeper.armL.rotation.x=keeper.armR.rotation.x=-1.1; SC2.add(keeper.g);
    [[-24,-16],[-30,8],[24,-18],[30,10],[-16,26],[14,30]].forEach(p=>{ const f=human('#eceff4','#c68642','#0f172a'); f.g.position.set(p[0],0,p[1]); f.g.rotation.y=Math.atan2(-p[0],-p[1]); SC2.add(f.g); });
    ballM=new T3.Mesh(new T3.SphereGeometry(.17,12,10),new T3.MeshLambertMaterial({color:0xe11d1d,emissive:0x8f1111})); ballM.visible=false; SC2.add(ballM);
    /* --- per-ball state --- */
    let ph='wait',phT=1.2,bz=0,ly=0,flight=0,dur=.85,bx=0,swung=0,bv=null,bounced=0,swingT=-1;
    const swing=()=>{ if(over) return;
      if(ph!=='fly'){ if(swingT<0) swingT=0; return; }
      if(swung) return; swung=1; swingT=0;
      const q=bz>=8.7&&bz<=10.4?6:bz>=7.8&&bz<=11.3?4:bz>=6.8&&bz<=12.3?2:1;
      let runs2=q,txt,col='#fff';
      if(q===6){ txt='SIX! 🎉'; col='#fde047'; } else if(q===4){ txt='FOUR!'; col='#fde047'; } else if(q===2){ txt='2 runs'; } else { txt='1 run'; }
      runs+=runs2; a.s=runs; Snd.sfx(runs2>=4?'score':'move'); popup(txt,col);
      const th2=(R()*140-70)*Math.PI/180, el2=q===6?(.6+R()*.14):q===4?(.28+R()*.1):q===2?(.12+R()*.08):(.05+R()*.06);
      const sp2=q===6?30:q===4?23:q===2?15:8;
      bv=[Math.sin(th2)*Math.cos(el2)*sp2,Math.sin(el2)*sp2,-Math.cos(th2)*Math.cos(el2)*sp2]; bounced=0; flight=1;
      balls++; ph='dead'; phT=1.1; if(balls>=12) setTimeout(finish,900); hud(); };
    R2.domElement.addEventListener('pointerdown',e=>{ e.preventDefault(); swing(); });
    const kd=e=>{ if(!wrap.isConnected){ removeEventListener('keydown',kd); return; } if(e.code==='Space'){ e.preventDefault(); swing(); } };
    addEventListener('keydown',kd);
    hud();
    let lt=0;
    (function loop3(){
      raf=requestAnimationFrame(loop3);
      if(!wrap.isConnected){ cancelAnimationFrame(raf); removeEventListener('keydown',kd); try{ R2.dispose(); }catch(e){} return; }
      if(over){ R2.render(SC2,CAM2); return; }
      const now=performance.now(); const dt=lt?Math.min(.05,(now-lt)/1000):.016; lt=now;
      /* bowler run-up + delivery */
      if(ph==='wait'){ phT-=dt; if(phT<=0){ ph='run'; phT=1.05; bowlG.g.position.set(0,0,-13.5); stumpsG[0].rotation.x=0; stumpsG[0].position.z=0; if(stumpsG[0].userData.bail) stumpsG[0].userData.bail.visible=true; while(bailFx.length) SC2.remove(bailFx.pop()); swung=0; bx=(R()*2-1)*.55; if(R()<.18) bx=(R()<.5?-1:1)*(.9+R()*.35); dur=.8+R()*.25; ly=0; } }
      else if(ph==='run'){ phT-=dt; const f=1-Math.max(0,phT)/1.05; bowlG.g.position.z=-13.5+f*3.4; const st=Math.sin(f*Math.PI*4); bowlG.legs[0].rotation.x=st*.85; bowlG.legs[1].rotation.x=-st*.85; bowlG.armR.rotation.x=-.2-f*2.3;
        if(phT<=0){ ph='fly'; bowlG.armR.rotation.x=-2.5; bowlG.legs[0].rotation.x=0; bowlG.legs[1].rotation.x=0; ballM.visible=true; ballM.position.set(bx*.35,2.05,-9.2); bz=-9.2; flight=0; swung=0; setTimeout(()=>{ if(bowlG) bowlG.armR.rotation.x=.3; },260); } }
      else if(ph==='fly'){ const f0=(bz+9.2)/18.8, f=f0+dt/dur; bz=-9.2+Math.min(1.35,f)*18.8;
        let y; if(bz<4.5){ const t1=(bz+9.2)/13.7; y=2.1-1.98*t1*t1; } else { const t2=(bz-4.5)/4.9; y=.12+ .62*Math.sin(Math.min(1,t2)*Math.PI*.62); }
        ballM.position.set(bx*(Math.max(0,bz)+9.2)/18.8*1.1,Math.max(.11,y),bz);
        if(f>=1.35&&!swung){ if(Math.abs(bx)<.32&&R()<.45){ outs++; balls++; breakStumps(); popup('BOWLED! 💥','#f87171'); Snd.sfx('end'); ballM.visible=false; ph='dead'; phT=1.4; if(outs>=3||balls>=12) setTimeout(finish,800); } else { balls++; popup('Dot ball','#fda4af'); ballM.visible=false; ph='dead'; phT=1.2; if(balls>=12) setTimeout(finish,700); } hud(); } else if(f>=1.5&&swung){ balls++; ballM.visible=false; ph='dead'; phT=1.1; hud(); } }
      else if(ph==='dead'){ let bi=bailFx.length; while(bi--){ const b=bailFx[bi]; b.position.x+=b.userData.vx*dt; b.position.y+=b.userData.vy*dt; b.position.z+=b.userData.vz*dt; b.userData.vy-=14*dt; b.rotation.x+=b.userData.rs*dt; b.rotation.z+=b.userData.rs*.7*dt; if(b.position.y<.02){ b.position.y=.02; b.userData.vy*=-.3; b.userData.vx*=.6; b.userData.vz*=.6; } }
        phT-=dt; if(bv){ ballM.position.x+=bv[0]*dt; ballM.position.y+=bv[1]*dt; ballM.position.z+=bv[2]*dt; bv[1]-=17*dt;
          if(ballM.position.y<.11&&bv[1]<0){ ballM.position.y=.11; bv[1]*=-.42; bv[0]*=.72; bv[2]*=.72; bounced++; if(bounced>2) bv=null; }
          const d2=Math.hypot(ballM.position.x,ballM.position.z); if(d2>55){ bv=null; } }
        if(phT<=0&&!over){ ballM.visible=false; bv=null; flight=0; ph='wait'; phT=.9+R()*.8; } }
      /* bat swing anim */
      if(swingT>=0){ swingT+=dt; batArm.rotation.x=swingT<.12?-.35+swingT/.12*1.95:Math.max(-.35,1.6-(swingT-.12)*6); if(swingT>.45){ swingT=-1; batArm.rotation.x=-.35; } }
      const pu=.5+.5*Math.sin(now/220); zone.material.opacity=.55+.35*pu; zone2.material.opacity=.2+.2*pu;
      if(flight&&swung&&bv) CAM2.lookAt(ballM.position.x*.4,1,4);
      else CAM2.lookAt(0,.9,2.5);
      R2.render(SC2,CAM2);
    })();
  }).catch(()=>{ popup('3D not available here','#fda4af'); if(FH) FH.style.display=''; });
},true);
GAMES.c3d.bot=()=>({v:12+(R()*54|0)});
GAMES.c3d.rules='Bat and score as many runs as you can in 12 balls (3 wickets).|Watch for the glowing yellow circle on the pitch — tap/click it (or press Space) when the ball reaches the circle.|Perfect timing = SIX · Great = FOUR · Good = 2 · Every swing connects for at least 1 run. Leave a straight ball unplayed and you can be bowled (3 wickets = innings ends). Points = total runs.';
/* ---- rules ---- */
const RL={dodge:'Survive as long as possible without crashing.|Tap LEFT or RIGHT half of the screen (or ← → keys) to change lane.|+1 for every obstacle you pass. Crash = your run ends.',
 timing:'Stop the moving ball inside the green zone.|Tap anywhere (or click) when the ball is over the green zone. 6 shots, ball gets faster each shot.|Green = 6, yellow = 4, red = 2, outside = 0. Max 36.',
 catcher:'Catch the good items, avoid the bad ones.|Move your finger / mouse (or ← → keys) to move the basket.|+1 good item, −3 bad item. 30 seconds.',
 tapper:'Tap the good targets fast, avoid the bad ones.|Tap the target on screen before it disappears.|+1 good target, −2 bad target. 30 seconds.',
 mcq:'Answer as many questions as you can before time ends.|Tap the correct option.|+1 correct, −1 wrong. Timer shown at the top.',
 odd:'Find the one different icon in the grid.|Tap the odd one. Grid grows as you progress.|+1 correct, −1 wrong. 40 seconds.',
 code:'Crack the secret number code.|Enter digits and press OK. 🟢 = right digit & place, 🟡 = right digit wrong place.|Fewer attempts = higher score (max 90). 9 attempts max.'};
const setR=(a,r)=>a.forEach(k=>{ if(GAMES[k]) GAMES[k].rules=r; });
setR(['race','bike','boat','jet','rocket','cycle','chase','heist','laser','taxi','ski','horse'],RL.dodge);
setR(['cricket','penalty','basket','golf','bowling','tennis','lockpick','dart','boxing','rugby','volley','shuttle','pool'],RL.timing);
setR(['candy','coin','pizza','star','gift','spy','rain','burger','egg','cake'],RL.catcher);
setR(['ghost','bug','fish','gem','clue','catchthief','ufo','zombie','dino','pop'],RL.tapper);
setR(['unscramble','qadd','qmul','seq','prime','sq','big','oper','oddnum','percent','clock','whodunit','print','cipher','alibi','cctv'],RL.mcq);
setR(['findthief','fakecoin','findcat','findghost','findalien','findhero'],RL.odd); setR(['codebr','safe'],RL.code);
Object.entries({ludo:'Bring all 4 tokens home first.|Roll the dice, tap a token to move. A 6 lets you start a token and roll again.|Capture opponents by landing on them. First home wins.',chess:'Checkmate the opponent king.|Tap a piece, then a highlighted square.|Win = 1st place.',biz:'Become the richest player.|Roll, buy properties, collect rent.|Most money at end wins.',quiz:'Answer questions faster than others.|Tap an option.|Correct = points.',ttt:'Get 3 in a row.|Tap an empty square.|First to 3 in a row wins.',c4:'Connect 4 discs in a line.|Tap a column to drop a disc.|First to connect 4 wins.',snl:'Reach square 100 first.|Roll the dice. Ladders go up, snakes go down.|First to 100 wins.',rps:'Beat the opponent’s choice.|Pick Rock, Paper or Scissors.|Rock>Scissors>Paper>Rock.',mem:'Match all card pairs.|Flip two cards, matching pairs stay open.|Most pairs wins.',type:'Type the shown text fastest.|Type in the box without mistakes.|Speed + accuracy decide rank.',
 ballrun:'Run as far as possible.|Tap to jump over obstacles.|+1 per obstacle.',gun:'Shoot the targets.|Tap/click targets.|+1 per hit.',archery:'Hit the bullseye.|Tap to release the arrow at the right time.|Closer to centre = more points.',carrom:'Pocket the coins.|Drag to aim and release to strike.|+ per coin pocketed.',knife:'Throw knives into the log without hitting other knives.|Tap to throw.|+1 per stuck knife.',sciquiz:'Answer science questions.|Tap the right option.|+1 correct, 90 seconds.',mole:'Whack the moles.|Tap moles as they pop up.|+1 per mole.',balloon:'Pop the balloons.|Tap balloons.|+1 per balloon.',flappy:'Fly through the gaps.|Tap to flap.|+1 per gap.',fruit:'Slice/catch the fruits.|Move or tap.|+1 per fruit, bombs cost points.',math:'Solve maths fast.|Tap the correct answer.|+1 correct.',reaction:'Test your reflexes.|Tap as soon as the colour changes.|Faster = higher.',letter:'Make words from letters.|Tap letters / type.|+ per word.',pic:'Guess the picture.|Tap the right option.|+1 correct.',subway:'Run, dodge trains, collect coins.|Swipe ← → change lane, ↑ jump, ↓ roll.|Distance + coins.'}).forEach(([k,v])=>{ if(GAMES[k]&&!GAMES[k].rules) GAMES[k].rules=v; });

/* =============== framework =============== */
let hideSid=0, invSid=0; let GS=null, BOARD={players:{},hist:[]}, SID=0, skew=0, viewKey='', celeKey='', lastLobbySid=0;
const botAt={};
const HOSTT=new Set(['g_resp','g_mode','g_open','g_join','g_leave','g_start','g_bot','g_act','g_close','g_again','g_resetboard']);
const nowH=()=>isHost?Date.now():Date.now()-skew;
const meIdx=()=>GS?GS.players.findIndex(p=>p.id===myId()):-1;
const G=()=>GS?GAMES[GS.g]:null;
const clone=o=>JSON.parse(JSON.stringify(o));

/* ---------- host side ---------- */
function pushState(){ send({t:'g_state',gs:GS?clone(GS):null,now:Date.now()}); onNewState(); gRender(); }
function pushBoard(){ send({t:'g_board',board:clone(BOARD)}); scoreRender(); }
const capOf=()=>GS.mode&&GS.mode<6?GS.mode*2:GAMES[GS.g].max;
function addPlayer(id,name,av,bot){ const g=GAMES[GS.g]; if(GS.status!=='lobby'||GS.players.length>=capOf()) return false; if(!bot&&GS.players.some(p=>p.id===id)) return false;
  GS.players.push({id:bot?('bot'+(++SID2)):id,name:String(name||'Friend').slice(0,20),av:av||'🙂',bot:!!bot}); return true; }
let SID2=0;
function finish(o){
  const g=G(), n=GS.players.length; const r=o.rank.slice(); for(let i=0;i<n;i++) if(!r.includes(i)) r.push(i);
  const res={draw:!!o.draw,tm:o.tm,rank:r.map((i,pos)=>{ const p=GS.players[i]; return {i,name:p.name,av:p.av,bot:p.bot,pts:p.bot?0:(o.draw?3:(PTS[pos]||1))}; })};
  GS.status='over'; GS.res=res;
  res.rank.forEach((x,pos)=>{ const p=GS.players[x.i]; if(p.bot) return; const b=BOARD.players[p.id]||(BOARD.players[p.id]={name:p.name,av:p.av,pts:0,wins:0,games:0});
    b.name=p.name; b.av=p.av; b.pts+=x.pts; b.games++; if(pos===0&&!o.draw) b.wins++; });
  const w=res.rank[0]; BOARD.hist.unshift({g:GS.g,ts:Date.now(),draw:res.draw,w:res.draw?null:{name:w.name,av:w.av},n:n}); BOARD.hist.length=Math.min(BOARD.hist.length,12);
  pushState(); pushBoard();
}
function afterChange(){ const o=G().over(GS.s); if(o) finish(o); else pushState(); }
function doAct(i,a,now){ const g=G(); if(!g.act(GS.s,i,a,now)) return false; GS.ver++; afterChange(); return true; }
function hostGame(m){
  const id=m.fid, g=GS?GAMES[GS.g]:null;
  switch(m.t){
    case 'g_open': {
      if(!GAMES[m.g]) return;
      if(!roster.some(r=>r.id===id) && id!==myId()) return;
      GS={g:m.g,status:'lobby',sid:++SID,local2P:false,players:[],s:null,res:null,ver:0,mode:GAMES[m.g].arc?6:0,inv:{}};
      addPlayer(id,m.fn,m.fa);
      GS.inv[id]='y';
      roster.forEach(r=>{ if(r.id!==id) GS.inv[r.id]='p'; });
      pushState();
      break;
    }
    case 'g_resp': {
      if(!GS||GS.status!=='lobby') return;
      if(m.ok){
        if(!GS.players.some(p=>p.id===id)) addPlayer(id,m.fn,m.fa);
        GS.inv[id]='y';
      } else {
        GS.inv[id]='n';
      }
      pushState();
      break;
    }
    case 'g_mode': {
      if(!GS||GS.status!=='lobby'||!G().arc) return;
      const v=+m.v|0; if(v<0||v>6||(v&&v<6&&GS.players.length>v*2)) return;
      GS.mode=v; pushState(); break;
    }
    case 'g_join': {
      if(!GS||GS.status!=='lobby') return;
      if(!GS.players.some(p=>p.id===id)){
        addPlayer(id,m.fn,m.fa);
      }
      if(GS.inv) GS.inv[id]='y';
      pushState();
      break;
    }
    case 'g_leave': {
      if(!GS) return;
      const i=GS.players.findIndex(p=>p.id===id); if(i<0) return;
      if(GS.status==='lobby') GS.players.splice(i,1); else if(GS.status==='play') GS.players[i].bot=true;
      if(!GS.players.some(p=>!p.bot)){ GS=null; }
      pushState();
      break;
    }
    case 'g_bot': {
      if(!GS||GS.status!=='lobby') return;
      if(m.rm!=null){ const k=GS.players.findIndex(p=>p.bot&&p.id===m.rm); if(k>=0){ GS.players.splice(k,1); pushState(); } return; }
      const nm=BOTN[GS.players.filter(p=>p.bot).length%BOTN.length];
      if(addPlayer(null,nm,'🤖',true)) pushState();
      break;
    }
    case 'g_start': {
      if(!GS||GS.status!=='lobby') return;
      const curG=GAMES[GS.g]; if(!curG) return;
      if(m.fillBots || GS.players.length<curG.min){
        while(GS.players.length<curG.min) addPlayer(null,BOTN[GS.players.filter(p=>p.bot).length%BOTN.length],'🤖',true);
      }
      if(GS.players.length<curG.min) return;
      if(GS.mode&&GS.mode<6) while(GS.players.length<GS.mode*2) addPlayer(null,BOTN[GS.players.filter(p=>p.bot).length%BOTN.length],'🤖',true);
      for(const k in botAt) delete botAt[k];
      GS.s=curG.init(GS.players.length,GS.players);
      GS.status='play'; GS.ver=1; GS.res=null; GS.local2P=false;
      GS.startAt=Date.now()+(m.fast?600:3500);
      pushState();
      break;
    }
    case 'g_act': {
      if(!GS||GS.status!=='play'||(GS.startAt&&Date.now()<GS.startAt-1200)) return;
      let i=GS.players.findIndex(p=>p.id===id);
      if(GS.local2P && (id==='me'||id===myId())){
        const act=G().actors(GS.s);
        if(m.a&&m.a.pIdx!=null&&act.includes(m.a.pIdx)) i=m.a.pIdx;
        else if(act.length===1&&(act[0]===0||act[0]===1)) i=act[0];
      }
      if(i<0||!m.a||typeof m.a!=='object') return;
      doAct(i,m.a,Date.now());
      break;
    }
    case 'g_close': {
      if(!GS) return;
      if(!roster.some(r=>r.id===id)&&id!==myId()) return;
      GS=null; viewKey=''; hideSid=0; pushState();
      break;
    }
    case 'g_again': {
      if(!GS||GS.status!=='over') return;
      const keep=GS.players.filter(p=>p.bot||roster.some(r=>r.id===p.id));
      if(!keep.some(p=>!p.bot)) { GS=null; pushState(); return; }
      const inv={}; keep.forEach(p=>{ if(!p.bot) inv[p.id]='y'; });
      roster.forEach(r=>{ if(!inv[r.id]) inv[r.id]='p'; });
      GS={g:GS.g,status:'lobby',sid:++SID,local2P:false,players:keep,s:null,res:null,ver:0,mode:GS.mode||0,inv};
      for(const k in botAt) delete botAt[k];
      pushState();
      break;
    }
    case 'g_resetboard': if(id!==myId()) return; BOARD={players:{},hist:[]}; pushBoard(); break;
  }
}
function gameTick(){
  if(!isHost||!GS||GS.status!=='play') return;
  const g=G(), s=GS.s, now=Date.now(); let ch=false; if(GS.startAt&&now<GS.startAt) return;
  if(g.tick&&g.tick(s,now)) ch=true;
  if(!ch||!g.over(s)){
    for(const i of g.actors(s)){ const p=GS.players[i]; if(!p||!p.bot) continue;
      if(g.botDelay!==0){ if(!botAt[i]){ botAt[i]=now+600+rnd(900); continue; } if(now<botAt[i]) continue; }
      const a=g.bot(s,i,now); if(a==null) continue;
      if(g.act(s,i,a,now)){ delete botAt[i]; ch=true; if(g.over(s)) break; } }
  }
  if(ch){ GS.ver++; afterChange(); }
}
setInterval(gameTick,350);

/* ---------- messages / hooks ---------- */
function gameSend(m){ if(isHost){ m.fid=myId(); m.fn=myName; m.fa=myAv; hostGame(m); } else send(m); }
window.gameMsg=function(m){
  if(isHost){ if(HOSTT.has(m.t)) hostGame(m); return; }
  if(m.t==='g_state'){ GS=m.gs||null; skew=Date.now()-(+m.now||Date.now()); onNewState(); gRender(); }
  else if(m.t==='g_board'&&m.board&&m.board.players){ BOARD=m.board; scoreRender(); }
};
window.gamesWelcome=function(id){ sendTo(id,{t:'g_state',gs:GS?clone(GS):null,now:Date.now()}); sendTo(id,{t:'g_board',board:clone(BOARD)}); };
window.gamesPeerLeft=function(id){ if(!GS) return; const i=GS.players.findIndex(p=>p.id===id); if(i<0) return;
  if(GS.status==='lobby') GS.players.splice(i,1); else if(GS.status==='play') GS.players[i].bot=true;
  if(!GS.players.some(p=>!p.bot)) GS=null; pushState(); };
window.gamesRosterChanged=function(){ if(!isHost&&!roster.length){ GS=null; } gRender(); };
window.gamesLang=function(){ viewKey=''; gRender(); scoreRender(); window.buildThemes&&window.buildThemes(); };
window.gamesShown=function(){ gRender(); };
window.scoreShown=function(){ scoreRender(); };

function showInvite(){ const op=GS.players[0]; let m=$('#invm'); if(!m){ m=h('div','modal inv'); m.id='invm'; document.body.appendChild(m); } m.innerHTML=''; const c=h('div','mcard glass'); m.appendChild(c); const g=G();
  c.appendChild(h('div','trophy',g.emoji)); c.appendChild(h('h2',null,t('gInv',{n:op.av+' '+op.name,g:g.name}))); const bt=h('div','mbtns');
  bt.appendChild(btn('primary',t('gAcc'),()=>{ m.hidden=true; hideSid=0; gameSend({t:'g_resp',ok:1}); showTab('G'); })); bt.appendChild(btn('gbtn',t('gDec'),()=>{ m.hidden=true; gameSend({t:'g_resp',ok:0}); })); c.appendChild(bt); m.hidden=false; try{ tone(660,.15); }catch(e){} }
function onNewState(){
  const im=$('#invm'); if(im&&!(GS&&GS.status==='lobby'&&GS.inv&&GS.inv[myId()]==='p')) im.hidden=true;
  if(GS&&GS.status==='lobby'&&GS.inv&&GS.inv[myId()]==='p'&&invSid!==GS.sid){ invSid=GS.sid; showInvite(); }
  if(GS&&GS.status==='lobby'&&lastLobbySid!==GS.sid){ lastLobbySid=GS.sid; const op=GS.players[0];
    if(op&&op.id!==myId()){ sysMsg(t('gOpened',{n:op.name,g:GAMES[GS.g].name})); if(curTab!=='G'){ const b=$('#gBadge'); if(b) b.hidden=false; } } }
  if(GS&&GS.status==='play'&&meIdx()>=0&&curTab!=='G'){ showTab('G'); }
  if(GS&&GS.status==='over'&&celeKey!==GS.sid+':'+GS.ver){ celeKey=GS.sid+':'+GS.ver; setTimeout(showCele,900); }
}

/* ---------- rendering ---------- */
function statusText(){
  const g=G(), s=GS.s, me=meIdx(); const ctx={me,can:false,players:GS.players,now:nowH};
  if(GS.status==='over') return t('gOver');
  if(GS.local2P){
    const act = g.actors(s);
    if(act.length === 1){
      const pIdx = act[0];
      const p = GS.players[pIdx] || {name:'Player '+(pIdx+1)};
      return (pIdx === 0 ? '🔵 ' : '🔴 ') + p.name + ' Turn! (Tap on this screen)';
    } else if(act.length > 1){
      return '👥 2-Player: Both Players Play on this Screen!';
    }
  }
  if(g.status){ const x=g.status(s,{...ctx,can:g.actors(s).includes(me)}); if(x!==null&&x!==undefined) return x; }
  const act=g.actors(s); if(!act.length) return '';
  if(act.length>1){ return act.includes(me)?t('gSimul'):(me<0?t('gWatch'):t('gWaitOthers')); }
  if(act[0]===me) return t('gYourTurn'); return t('gTurnOf',{n:GS.players[act[0]].name});
}
const TWOPG=['pong2p','ttt','c4','chess','carrom','snl','ludo','biz','rps','mem','type','quiz','cricket','penalty','race'];
const BOARDG=['ludo','chess','biz','snl','ttt','c4'],BRAING=['quiz','mem','type','sciquiz','letter','pic','math','reaction','rps','simon'],RACEG=['race','bike','boat','jet','rocket','cycle','ballrun','subway'],SPORTG=['c3d','cricket','penalty','basket','golf','bowling','tennis','archery','carrom','knife','gun'];
const CRIMEG=['codebr','safe','whodunit','print','cipher','alibi','cctv','findthief','fakecoin','lockpick','clue','catchthief','chase','heist','spy','laser'],MATHG=['unscramble','qadd','qmul','seq','prime','sq','big','oper','oddnum','percent','clock','order','findcat','findghost','findalien','findhero'];
const catOf=k=>hubCat==='2p'&&TWOPG.includes(k)?'2p':(CRIMEG.includes(k)?'crime':(BOARDG.includes(k)||0)?'board':(BRAING.includes(k)||MATHG.includes(k))?'brain':RACEG.includes(k)?'race':SPORTG.includes(k)?'sport':'arcade'); let hubCat='all', hubQ='';
function hubMatch(k,q){ const g=GAMES[k]; if(g&&g.name.toLowerCase().indexOf(q)>=0) return true; const d=D['d_'+k]; return !!d&&d.some(s=>String(s).toLowerCase().indexOf(q)>=0); }

let activeSelectedGame = null;

function openGameDialog(k){
  activeSelectedGame = (activeSelectedGame === k ? null : k);
  const p = $('#inlineGamePanel');
  if(p){
    renderInlineGamePanel(p);
    if(activeSelectedGame){
      p.scrollIntoView({behavior:'smooth', block:'nearest'});
    }
  } else {
    renderHub($('#gbox'));
  }
}

function renderInlineGamePanel(box){
  if(!box) return;
  if(!activeSelectedGame){
    box.innerHTML = '';
    box.hidden = true;
    return;
  }
  const k = activeSelectedGame;
  const g = GAMES[k];
  if(!g){
    box.innerHTML = '';
    box.hidden = true;
    return;
  }
  box.hidden = false;
  box.innerHTML = '';
  
  const card = h('div', 'inline-game-deck glass');
  card.style.cssText = 'position:relative;margin:14px 0 18px;padding:22px;border-radius:24px;border:1.5px solid rgba(var(--ar),.45);background:linear-gradient(135deg,rgba(var(--ar),.18),rgba(var(--br),.12));box-shadow:0 18px 45px rgba(0,0,0,.45);animation:fadeIn .3s ease';

  const closeBtn = h('button', 'x', '✕');
  closeBtn.title = 'Close selection';
  closeBtn.style.cssText = 'position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.1);border:1px solid var(--line);cursor:pointer';
  closeBtn.onclick = ()=>{ activeSelectedGame = null; renderInlineGamePanel(box); };
  card.appendChild(closeBtn);

  const topRow = h('div');
  topRow.style.cssText = 'display:flex;align-items:center;gap:16px;flex-wrap:wrap';

  const gi = h('div', 'gi', g.emoji);
  gi.style.cssText = 'width:64px;height:64px;border-radius:18px;display:grid;place-items:center;font-size:34px;background:linear-gradient(135deg,'+g.c1+','+g.c2+');box-shadow:0 8px 24px rgba(0,0,0,.35);flex-shrink:0';
  topRow.appendChild(gi);

  const meta = h('div');
  meta.style.cssText = 'flex:1;min-width:200px';
  const title = h('h3', null, g.name);
  title.style.margin = '0 0 4px';
  meta.appendChild(title);

  const is2p = TWOPG.includes(k) || g.min <= 2;
  const pCount = h('div');
  pCount.style.cssText = 'font-size:12.5px;color:var(--gold);font-weight:700;margin-bottom:6px';
  pCount.textContent = (is2p ? '👥 2-Player (1v1)' : (g.min === g.max ? t('gPlayersEq',{a:g.min}) : t('gPlayers',{a:g.min,b:g.max}))) + ' · ' + (catOf(k).toUpperCase());
  meta.appendChild(pCount);

  const desc = h('p', 'sub', t('d_'+k));
  desc.style.margin = '0';
  meta.appendChild(desc);
  topRow.appendChild(meta);
  card.appendChild(topRow);

  const btnRow = h('div', 'action-row');
  btnRow.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;margin-top:18px';

  const inOnlineRoom = code && code !== 'LOCAL';
  const bRoom = btn('primary', inOnlineRoom ? '🌐 Play Online with Friends ('+Math.max(1,roster.length)+' Online)' : '🌐 Play Online (Create / Join Room)', async()=>{
    if(inOnlineRoom){
      gameSend({t:'g_open', g:k});
    } else {
      if(!needName()) return;
      if(!(await loadPeerLib())){ NOLIB_BAD(); return; }
      startHost();
      showTab('G');
      setTimeout(()=>{
        gameSend({t:'g_open', g:k});
        $('#pmodal').hidden=false;
        renderPlayersModal();
      }, 500);
    }
  });
  bRoom.style.cssText = 'flex:1 1 200px;padding:13px 18px;font-size:14.5px;font-weight:700;border-radius:14px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);box-shadow:0 8px 24px rgba(59,130,246,.4)';
  btnRow.appendChild(bRoom);

  if(is2p){
    const b2p = btn('gbtn', '👥 2-Player Local (1v1 Same Screen)', ()=>{
      startLocal2P(k);
    });
    b2p.style.cssText = 'flex:1 1 180px;padding:13px 16px;font-size:13.5px;font-weight:600;border-radius:14px;background:rgba(255,255,255,.09)';
    btnRow.appendChild(b2p);
  }

  const bSolo = btn('gbtn', g.arc ? '⚡ Play Solo (High Score)' : '🤖 Play vs Bot (Instant)', ()=>{
    startSolo(k);
  });
  bSolo.style.cssText = 'flex:1 1 160px;padding:13px 16px;font-size:13.5px;font-weight:600;border-radius:14px;background:rgba(255,255,255,.09)';
  btnRow.appendChild(bSolo);

  const rulesContainer = h('div');
  rulesContainer.style.cssText = 'width:100%;margin-top:14px;padding:12px 14px;border-radius:14px;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.08);font-size:13px;line-height:1.55';
  const rulesHead = h('div');
  rulesHead.style.cssText = 'cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-weight:700;color:var(--gold)';
  rulesHead.innerHTML = '<span>📖 ' + t('gRulesB') + ' &amp; Instructions</span><span id="rulesToggleIcon">▾</span>';
  
  const rulesBody = h('div');
  rulesBody.style.cssText = 'margin-top:8px;display:none;color:var(--text)';
  
  const T_tpl = (window.GL && window.GL.tpl) ? window.GL.tpl(k, g) : 'generic';
  const R_set = (window.GL && window.GL.R && (window.GL.R[T_tpl] || window.GL.R.generic)) || null;
  const currentLangIdx = (typeof LI !== 'undefined' && LI[lang] !== undefined) ? LI[lang] : 0;
  const r_data = R_set ? (R_set[currentLangIdx] || R_set[0]) : ['Have fun and score points!','Follow controls on screen.','Highest score wins.'];
  
  rulesBody.innerHTML = '<div><b>' + t('gH1') + ':</b> ' + r_data[0] + '</div>' +
                        '<div style="margin-top:4px"><b>' + t('gH2') + ':</b> ' + r_data[1] + '</div>' +
                        '<div style="margin-top:4px"><b>' + t('gH3') + ':</b> ' + r_data[2] + '</div>';

  rulesHead.onclick = ()=>{
    const isHidden = rulesBody.style.display === 'none';
    rulesBody.style.display = isHidden ? 'block' : 'none';
    const icon = rulesHead.querySelector('#rulesToggleIcon');
    if(icon) icon.textContent = isHidden ? '▴' : '▾';
  };
  rulesContainer.appendChild(rulesHead);
  rulesContainer.appendChild(rulesBody);
  card.appendChild(btnRow);
  card.appendChild(rulesContainer);

  box.appendChild(card);
}

function startLocal2P(k){
  const g=GAMES[k]; if(!g) return;
  hideSid=0; viewKey=''; isHost=true; code=code||'LOCAL';
  myName=myName||'Player 1'; myAv=myAv||'🔵';
  GS={g:k, status:'play', sid:++SID, local2P:true,
    players:[{id:myId(), name:myName, av:myAv, local:true}, {id:'p2_local', name:'Player 2', av:'🔴', local:true}],
    s:null, res:null, ver:1, mode:0, inv:{}, startAt:Date.now()+600};
  for(const b in botAt) delete botAt[b];
  GS.s = g.init(2, GS.players);
  pushState();
  toast('👥 2-Player Local (Same Device) Started!');
}
window.startLocal2P = startLocal2P;

function startSolo(k){
  const g=GAMES[k]; if(!g) return;
  hideSid=0; viewKey=''; isHost=true; code=code||'LOCAL';
  myName=myName||'Player 1'; myAv=myAv||'😎';
  const players=[{id:myId(), name:myName, av:myAv}];
  const needed=Math.max(1, g.min);
  while(players.length<needed){
    players.push({id:'bot'+(++SID2), name:BOTN[players.filter(p=>p.bot).length%BOTN.length]+' 🤖', av:'🤖', bot:true});
  }
  GS={g:k, status:'play', sid:++SID, local2P:false, players:players, s:null, res:null, ver:1, mode:0, inv:{}, startAt:Date.now()+600};
  for(const b in botAt) delete botAt[b];
  GS.s = g.init(players.length, players);
  pushState();
}
window.startSolo = startSolo;

function renderHub(box){
  box.innerHTML='';
  const head=h('div','ghhead'); head.appendChild(h('h2',null,'🎮 '+t('gHubT'))); head.appendChild(h('span','ghcount',String(ORDER.length))); box.appendChild(head);
  box.appendChild(h('p','sub',t('gHubD',{n:ORDER.length})));
  
  /* Integrated Party Friends & Room Status Panel (Unified Navigation) */
  const friendsPanel = h('div','party-friends-card glass');
  friendsPanel.style.cssText='display:flex;flex-direction:column;gap:10px;padding:16px 20px;border-radius:20px;background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.35);margin:0 0 16px;box-shadow:0 8px 30px rgba(0,0,0,.25)';
  
  const fTop = h('div');
  fTop.style.cssText='display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px';
  
  const fTitle = h('div');
  const inOnline = code && code !== 'LOCAL';
  fTitle.innerHTML = '<span style="font-size:15px;font-weight:700">👥 <b>Party Friends &amp; Room Roster</b></span>' +
    ' <span class="pill" style="margin-left:8px;font-size:12px;background:rgba(255,255,255,.08);padding:3px 10px;border-radius:99px">' +
    (inOnline ? 'Room Code: <b class="gold">'+code+'</b> · <span style="color:#34d399">● Live</span>' : 'Local Mode') + '</span>';
  fTop.appendChild(fTitle);

  const fActions = h('div');
  fActions.style.cssText='display:flex;align-items:center;gap:8px';
  if(inOnline){
    const copyLinkBtn = btn('primary','🔗 Copy Invite Link', ()=>{
      const link = roomLink();
      (navigator.clipboard?navigator.clipboard.writeText(link):Promise.reject()).then(()=>toast(t('tCopied')),()=>prompt(t('tCopyPrompt'),link));
    });
    copyLinkBtn.style.cssText='padding:6px 14px;font-size:12.5px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#8b5cf6)';
    fActions.appendChild(copyLinkBtn);

    const waBtn = h('a', 'gbtn', 'WhatsApp');
    waBtn.style.cssText='padding:6px 14px;font-size:12.5px;border-radius:10px;display:inline-flex;align-items:center;gap:4px;color:#fff;background:rgba(37,211,102,.2);border:1px solid rgba(37,211,102,.4);text-decoration:none';
    waBtn.target = '_blank';
    waBtn.rel = 'noopener';
    waBtn.href = 'https://wa.me/?text='+encodeURIComponent('Join my Friends HUB Party! 🎬 '+roomLink());
    fActions.appendChild(waBtn);
  } else {
    const hostBtn = btn('primary','🌐 Host Online Party Room', async()=>{
      if(!needName()) return;
      if(!(await loadPeerLib())){ NOLIB_BAD(); return; }
      startHost();
      showTab('G');
    });
    hostBtn.style.cssText='padding:7px 16px;font-size:13px;border-radius:12px;background:linear-gradient(135deg,#ec4899,#8b5cf6)';
    fActions.appendChild(hostBtn);
  }
  fTop.appendChild(fActions);
  friendsPanel.appendChild(fTop);

  /* Player avatars list */
  const fList = h('div');
  fList.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:4px';
  if(roster && roster.length){
    roster.forEach(r=>{
      const chip = h('div', 'p-chip');
      chip.style.cssText = 'display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:99px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);font-size:13px';
      chip.innerHTML = '<span style="font-size:16px">'+r.av+'</span> <b>'+r.name+'</b>' +
        (r.host ? ' <span style="font-size:11px;background:#f59e0b;color:#000;padding:1px 6px;border-radius:6px;font-weight:700">HOST</span>' : '') +
        (r.id === myId() ? ' <span style="opacity:.7;font-size:11px">(You)</span>' : '') +
        ' <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#34d399"></span>';
      fList.appendChild(chip);
    });
  } else {
    const meChip = h('div', 'p-chip');
    meChip.style.cssText = 'display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:99px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);font-size:13px';
    meChip.innerHTML = '<span style="font-size:16px">'+(myAv||'😎')+'</span> <b>'+(myName||'You')+'</b> <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#34d399"></span>';
    fList.appendChild(meChip);
  }
  friendsPanel.appendChild(fList);
  box.appendChild(friendsPanel);

  if(GS&&hideSid===GS.sid&&GS.status!=='over'){ const rb=btn('primary rbtn',t('gResume')+' · '+G().emoji+' '+G().name,()=>{ hideSid=0; viewKey=''; gRender(); }); rb.style.marginBottom='12px'; box.appendChild(rb); }
  
  /* Inline Game Selection Deck Container */
  const inlineDeck = h('div');
  inlineDeck.id = 'inlineGamePanel';
  inlineDeck.hidden = !activeSelectedGame;
  box.appendChild(inlineDeck);
  if(activeSelectedGame) renderInlineGamePanel(inlineDeck);

  const search=h('input','ghsearch'); search.type='text'; search.placeholder=t('gSearch'); search.value=hubQ; search.autocomplete='off'; search.spellcheck=false;
  const tabs=h('div','hubtabs');
  ['all','2p','crime','race','sport','board','brain','arcade'].map(c=>[c,c==='2p'?'👥 2-Player (1v1)':t('cat_'+c)]).forEach(([c,l])=>{
    const n=ORDER.filter(k=>(c==='all'||(c==='2p'?TWOPG.includes(k):catOf(k)===c))).length;
    const b=btn(hubCat===c?'on':'',l+' · '+n,()=>{ hubCat=c; Array.prototype.forEach.call(tabs.children,x=>x.classList.remove('on')); b.classList.add('on'); paintGrid(); });
    tabs.appendChild(b);
  });
  const grid=h('div','ggrid');
  const empty=h('div','gempty'); empty.hidden=true; empty.appendChild(h('div',null,t('gNoMatch'))); empty.appendChild(btn('gbtn',t('gClear'),()=>{ hubQ=''; search.value=''; paintGrid(); search.focus(); }));
  function paintGrid(){
    const q=hubQ.trim().toLowerCase();
    const list=ORDER.filter(k=>(hubCat==='all'||(hubCat==='2p'?TWOPG.includes(k):catOf(k)===hubCat))&&(!q||hubMatch(k,q)));
    grid.innerHTML=''; empty.hidden=list.length>0;
    list.forEach(k=>{ const g=GAMES[k]; const c=h('div','gcard'+(activeSelectedGame===k?' selected':'')); c.style.setProperty('--c1',g.c1); c.style.setProperty('--c2',g.c2);
      if(activeSelectedGame===k){ c.style.borderColor='var(--gold)'; c.style.boxShadow='0 0 20px rgba(245,199,107,.4)'; }
      const is2p = TWOPG.includes(k);
      c.appendChild(h('div','gp',is2p?'👥 2-Player':(g.min===g.max?t('gPlayersEq',{a:g.min}):t('gPlayers',{a:g.min,b:g.max}))));
      c.appendChild(h('div','gi',g.emoji)); c.appendChild(h('b',null,g.name)); c.appendChild(h('small',null,t('d_'+k)));
      c.onclick=()=>openGameDialog(k);
      grid.appendChild(c); });
  }
  search.oninput=()=>{ hubQ=search.value; paintGrid(); };
  box.appendChild(search); box.appendChild(tabs); box.appendChild(grid); box.appendChild(empty);
  paintGrid();
  box.appendChild(h('p','sub',t('gSoloNote')));
}
const ghHeroEl=document.getElementById('ghHero'); if(ghHeroEl) ghHeroEl.textContent='· '+ORDER.length+' GAMES';
function renderLobby(box){
  const g=G(); box.innerHTML=''; const me=meIdx();
  const top=h('div','gtop glass'); top.appendChild(btn('gbtn',t('gBack'),leaveLocal)); top.appendChild(btn('gbtn','📖 '+t('gRulesB'),()=>showRules(GS.g))); top.appendChild(btn('gbtn','⏹ '+t('gEnd'),endGame)); box.appendChild(top);
  const L=h('div','lobby2 glass'); L.style.cssText+=';margin-top:14px'; L.style.setProperty('--c1',g.c1); L.style.setProperty('--c2',g.c2);
  L.appendChild(h('div','gi',g.emoji)); L.appendChild(h('h3',null,g.name)); L.appendChild(h('div','need',t('d_'+GS.g)));
  const pl=h('div','plist');
  for(let k=0;k<capOf();k++){ const p=GS.players[k]; const d=h('div','pl'+(p?'':' empty')); const av=h('div','av',p?p.av:'+');
    if(p){ av.style.background=(k%2?'#ef4444':'#3b82f6'); if(p.bot){ av.title='✕'; av.style.cursor='pointer'; av.onclick=()=>gameSend({t:'g_bot',rm:p.id}); } }
    d.appendChild(av); d.appendChild(h('span',null,p?p.name+(p.id===myId()?' ✦':''):'')); pl.appendChild(d); }
  L.appendChild(pl);
  if(g.arc){
    const tm=h('div','tm'); [[6,'🔵 vs 🔴'],[0,t('gFFA')],[1,'1v1'],[2,'2v2'],[3,'3v3'],[4,'4v4'],[5,'5v5']].forEach(([v,l])=>tm.appendChild(btn((GS.mode||0)===v?'on':'',l,()=>gameSend({t:'g_mode',v})))); L.appendChild(tm);
  } else {
    L.appendChild(h('div','need','🔵 Blue team (1st, 3rd…) · 🔴 Red team (2nd, 4th…)'));
  }
  if(GS.inv){
    const iv=h('div','invs'); roster.forEach(r=>{ const x=GS.inv[r.id]; if(r.id!==myId()) iv.appendChild(h('span',null,r.av+' '+r.name+' '+(x==='y'?'✅':x==='n'?'❌':'⏳'))); }); L.appendChild(iv);
  }
  const bt=h('div','bt');
  if(me<0&&GS.inv&&GS.inv[myId()]==='p') bt.appendChild(btn('primary',t('gAcc'),()=>gameSend({t:'g_resp',ok:1})));
  if(me<0&&GS.players.length<capOf()) bt.appendChild(btn('primary',t('gJoin'),()=>gameSend({t:'g_join'})));
  if(me>=0) bt.appendChild(btn('gbtn',t('gLeave'),()=>gameSend({t:'g_leave'})));
  if(GS.players.length<capOf()) bt.appendChild(btn('gbtn',t('gAddBot'),()=>gameSend({t:'g_bot'})));
  
  const canStart = GS.players.length >= g.min;
  if(canStart){
    const st=btn('primary',t('gStart'),()=>gameSend({t:'g_start'}));
    st.style.background='linear-gradient(135deg,#22c55e,#059669)';
    bt.appendChild(st);
  } else {
    const qb = btn('primary', '🤖 Auto-Fill Bot & Start', ()=>gameSend({t:'g_start', fast:true, fillBots:true}));
    qb.style.background='linear-gradient(135deg,#34d399,#059669)';
    bt.appendChild(qb);
  }
  
  if(code && code !== 'LOCAL'){
    const invB = btn('gbtn', '🔗 '+t('plCopy'), ()=>{ $('#pmodal').hidden=false; renderPlayersModal(); });
    bt.appendChild(invB);
  }
  
  L.appendChild(bt);
  if(GS.players.length<g.min) L.appendChild(h('div','need',t('gNeed',{n:g.min-GS.players.length})));
  box.appendChild(L);
}
function showRules(k){ if(window.GL_rules) return window.GL_rules(k,GAMES[k]); const g=GAMES[k]; let m=$('#rulm'); if(!m){ m=h('div','modal inv'); m.id='rulm'; document.body.appendChild(m); } m.innerHTML=''; const c=h('div','mcard glass'); m.appendChild(c);
  const r=(g.rules||'Play and score as high as you can.|Follow the on-screen buttons.|Highest score wins.').split('|'); c.appendChild(h('div','trophy',g.emoji)); c.appendChild(h('h2',null,g.name+' — Rules'));
  [['🎯 Goal',r[0]],['🎮 How to play',r[1]],['🏆 Scoring',r[2]],['🔵🔴 Teams',g.arc?'Blue vs Red. Each player plays own run; team total score adds up. Higher total wins. Admin sends request → accept → 4s countdown → everyone starts together.':'Players alternate Blue / Red colour. Admin sends request → accept → everyone starts together.']].forEach(x=>{ const d=h('div','glog'); d.style.cssText='text-align:left;margin:8px 0'; d.innerHTML='<b>'+x[0]+':</b> '+x[1]; c.appendChild(d); });
  c.appendChild(btn('primary','OK',()=>{ m.hidden=true; })); m.hidden=false; }
function endGame(){ if(GS&&GS.status==='play'&&!confirm(t('gEnd')+'?')) return; gameSend({t:'g_close'}); }
function leaveLocal(){ if(GS){ if(meIdx()>=0&&GS.status!=='over') gameSend({t:'g_leave'}); hideSid=GS.sid; viewKey=''; } gRender(); }
function gRender(){
  const box=$('#gbox'); if(!box) return;
  const key=!GS?'hub':GS.status==='lobby'?'lobby:'+GS.sid+':'+GS.players.length+':'+GS.players.map(p=>p.id).join(','):'play:'+GS.sid;
  if(!GS||hideSid===GS.sid){ viewKey='hub'; Snd.sync(false); document.body.classList.remove('ingame'); renderHub(box); return; }
  if(GS.status==='lobby'){ viewKey=key; Snd.sync(false); document.body.classList.toggle('ingame',curTab==='G'); renderLobby(box); return; }
  if(viewKey!==key){ viewKey=key; box.innerHTML=''; box.appendChild(h('div','gtop glass')); box.lastChild.id='gTop'; ['gStat:gstat','gBody:gbody','gLog:glog'].forEach(x=>{ const [id,c]=x.split(':'); const e=h('div',c); e.id=id; box.appendChild(e); }); }
  const g=G(), s=GS.s, me=meIdx(); const act=g.actors(s);
  document.body.classList.toggle('ingame',curTab==='G'); Snd.sync(curTab==='G'&&GS.status==='play');
  if(GS.status==='play'&&GS.ver!==Snd.ver){ Snd.ver=GS.ver; if(!g.arc) Snd.sfx('move'); }
  const top=$('#gTop'); top.innerHTML='';
  top.appendChild(btn('gbtn',t('gBack'),leaveLocal)); top.appendChild(h('span','gt',g.emoji+' '+g.name));
  const chips=h('div','gchips'); const sc=g.scores?g.scores(s):null;
  GS.players.forEach((p,i)=>{ const c=h('div','gchip'+(act.includes(i)&&GS.status==='play'?' act':'')+(i===me?' me':'')); c.style.setProperty('--gc',(i%2?'#ef4444':'#3b82f6'));
    const av=h('span','av',p.av); c.appendChild(av); c.appendChild(h('b',null,p.name)); if(sc) c.appendChild(h('span','sc',String(sc[i]))); chips.appendChild(c); });
  top.appendChild(chips); top.appendChild(sndBtns());
  const gr=h('div','g-react-bar');
  ['🔥','👏','⚡','❤️','🎉','😂'].forEach(e=>{
    const rb=h('button','g-react-pill',e); rb.title='React '+e;
    rb.onclick=()=>{ if(typeof sendReact==='function') sendReact(e); else if(typeof showFloat==='function') showFloat(e); };
    gr.appendChild(rb);
  });
  top.appendChild(gr);
  top.appendChild(btn('gbtn','📖',()=>showRules(GS.g))); top.appendChild(btn('gbtn','⏹ '+t('gEnd'),endGame));
  if(GS.status!=='play') top.appendChild(btn('primary',t('gAgain'),()=>gameSend({t:'g_again'})));
  const wait=GS.status==='play'&&GS.startAt&&nowH()<GS.startAt; if(wait) setTimeout(gRender,Math.max(50,GS.startAt-nowH()+30));
  const stt=$('#gStat'); stt.textContent=wait?'⏳ '+Math.ceil((GS.startAt-nowH())/1000)+'…':statusText(); stt.className='gstat'+(act.includes(me)&&GS.status==='play'?' me':'');
  const is2p = GS && GS.local2P;
  const canAct = GS.status==='play' && (is2p ? act.some(a=>a===0||a===1) : (me>=0&&act.includes(me))) && (g.arc||!wait);
  const ctx={
    me: (is2p && act.length===1) ? act[0] : me,
    can: canAct,
    startAt:GS.startAt,
    players:GS.players,
    now:nowH,
    sid:GS.sid,
    rerender:gRender,
    act: a => {
      if(is2p && a && a.pIdx == null){
        if(act.length === 1) a.pIdx = act[0];
        else if(act.includes(0)) a.pIdx = 0;
        else if(act.includes(1)) a.pIdx = 1;
      }
      gameSend({t:'g_act', a});
    }
  };
  g.render($('#gBody'),s,ctx);
  $('#gLog').textContent=g.log?g.log(s,ctx):'';
}
setInterval(()=>{ if(GS&&GS.status==='play'&&G().live&&curTab==='G'&&!document.hidden) gRender(); },300);

/* ---------- scoreboard ---------- */
function scoreRender(){
  const box=$('#sbox'); if(!box) return; box.innerHTML='';
  box.appendChild(h('h2',null,'🏆 '+t('gScoreT'))); box.appendChild(h('p','sub',t('gScoreD')));
  const arr=Object.keys(BOARD.players).map(id=>Object.assign({id},BOARD.players[id])).sort((a,b)=>b.pts-a.pts||b.wins-a.wins||a.games-b.games);
  const card=h('div','card2 glass');
  if(!arr.length){ card.appendChild(h('div','glog',t('gNoScore'))); box.appendChild(card); return; }
  const pod=h('div','pod'); const order=[1,0,2];
  order.forEach(k=>{ const p=arr[k]; if(!p) return; const d=h('div','p r'+(k+1)); if(k===0) d.appendChild(h('div','crown','👑'));
    d.appendChild(h('div','av',p.av)); d.appendChild(h('b',null,p.name)); d.appendChild(h('div','bar',String(p.pts))); pod.appendChild(d); });
  card.appendChild(pod);
  const tb=h('table','stbl'); const hd=h('tr'); ['#',t('gPlayer'),t('gPts'),t('gWins'),t('gGames')].forEach(x=>hd.appendChild(h('th',null,x))); tb.appendChild(hd);
  arr.forEach((p,i)=>{ const tr=h('tr',p.id===myId()?'me':''); tr.appendChild(h('td',null,i===0?'🥇':i===1?'🥈':i===2?'🥉':String(i+1)));
    const td=h('td'); const pc=h('div','pc'); pc.appendChild(h('span','av',p.av)); pc.appendChild(h('span',null,p.name)); td.appendChild(pc); tr.appendChild(td);
    tr.appendChild(h('td','pt',String(p.pts))); tr.appendChild(h('td',null,String(p.wins))); tr.appendChild(h('td',null,String(p.games))); tb.appendChild(tr); });
  card.appendChild(tb); box.appendChild(card);
  if(BOARD.hist.length){ box.appendChild(h('h3',null,t('gRecent'))); const hs=h('div','hist');
    BOARD.hist.forEach(x=>{ const g=GAMES[x.g]; hs.appendChild(h('div',null,(g?g.emoji+' '+g.name:x.g)+' · '+(x.draw?t('gDrawT'):'🏆 '+x.w.av+' '+x.w.name)+' · '+new Date(x.ts).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}))); });
    box.appendChild(hs); }
  if(isHost){ const rb=btn('gbtn',t('gReset'),()=>{ if(confirm(t('gReset')+'?')) gameSend({t:'g_resetboard'}); }); rb.style.marginTop='14px'; box.appendChild(rb); }
}

/* ---------- celebration ---------- */
function confetti(ms){
  const cv=$('#confetti'); if(!cv) return; cv.hidden=false; const dpr=Math.min(2,window.devicePixelRatio||1); cv.width=innerWidth*dpr; cv.height=innerHeight*dpr;
  const x=cv.getContext('2d'); const cols=['#f5c76b','#ec4899','#8b5cf6','#34d399','#38bdf8','#fb923c','#ffffff']; const P=[];
  const spawn=n=>{ for(let i=0;i<n;i++) P.push({x:Math.random()*cv.width,y:-20*dpr-Math.random()*cv.height*.4,vx:(Math.random()-.5)*4*dpr,vy:(2+Math.random()*4)*dpr,s:(5+Math.random()*7)*dpr,r:Math.random()*6.28,vr:(Math.random()-.5)*.35,c:pick(cols),o:Math.random()<.5}); };
  spawn(150); const t0=performance.now();
  (function f(now){ const el=now-t0; x.clearRect(0,0,cv.width,cv.height); if(el<ms*.6&&P.length<420&&Math.random()<.6) spawn(6);
    for(const p of P){ p.x+=p.vx; p.y+=p.vy; p.vy+=.06*dpr; p.r+=p.vr; x.save(); x.translate(p.x,p.y); x.rotate(p.r); x.fillStyle=p.c; if(p.o){ x.beginPath(); x.arc(0,0,p.s/2,0,6.28); x.fill(); } else x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2); x.restore(); }
    if(el<ms) requestAnimationFrame(f); else { x.clearRect(0,0,cv.width,cv.height); cv.hidden=true; } })(t0);
}
function fanfare(){ [523,659,784,1047,1319].forEach((f,i)=>setTimeout(()=>{ try{ tone(f,.22); }catch(e){} },i*130)); }
function showCele(){
  if(!GS||GS.status!=='over'||!GS.res) return; const m=$('#cele'), res=GS.res, g=GAMES[GS.g]; const w=res.rank[0];
  const iWon=!res.draw&&w.i===meIdx()&&meIdx()>=0;
  m.innerHTML=''; const card=h('div','mcard glass'); m.appendChild(card);
  card.appendChild(h('div','trophy',res.draw?'🤝':iWon?'🏆':'🎖️'));
  card.appendChild(h('h2',null,res.draw?t('gDrawT'):(iWon?t('gYouWin'):t('gWinT',{n:w.av+' '+w.name}))));
  card.appendChild(h('div','gn',g.emoji+' '+g.name+(res.tm?'  ·  🔵 '+res.tm[0]+' – '+res.tm[1]+' 🔴':'')));
  const badgeRow=h('div','badge-row');
  const badgeList = res.draw 
    ? ['🤝 Perfect Draw', '⚖️ Stalemate Master', '🎉 Party Spirit'] 
    : (iWon 
        ? ['🏆 Match Winner', '⚡ MVP Champion', '🔥 Party Legend'] 
        : ['🛡️ Valiant Effort', '🎯 Tactical Fighter', '🎮 Rematch Ready']);
  badgeList.forEach(b=>{ badgeRow.appendChild(h('span','achieve-badge',b)); });
  card.appendChild(badgeRow);
  res.rank.forEach((x,pos)=>{ const r=h('div','rk'+(pos===0&&!res.draw?' first':'')); r.style.animationDelay=(pos*.12)+'s';
    r.appendChild(h('span','n',res.draw?'🤝':pos===0?'🥇':pos===1?'🥈':pos===2?'🥉':String(pos+1))); r.appendChild(h('span','av',x.av)); r.appendChild(h('b',null,x.name));
    r.appendChild(h('span','pp',x.bot?'🤖':'+'+x.pts)); card.appendChild(r); });
  const bt=h('div','mbtns'); bt.appendChild(btn('primary',t('gAgain'),()=>{ m.hidden=true; gameSend({t:'g_again'}); }));
  bt.appendChild(btn('gbtn',t('gScoreT'),()=>{ m.hidden=true; showTab('S'); })); bt.appendChild(btn('gbtn',t('gClose'),()=>{ m.hidden=true; })); card.appendChild(bt);
  m.hidden=false; confetti(iWon?5200:3200); fanfare();
  sysMsg('🏆 '+(res.draw?t('gDrawT'):t('gWinT',{n:w.name}))+' · '+g.name);
}

/* =============== themes (per user, saved on this device) =============== */
const THEMES=[['violet','Violet','#8b5cf6','#ec4899'],['ocean','Ocean','#06b6d4','#3b82f6'],['sunset','Sunset','#f97316','#ef4444'],['emerald','Emerald','#10b981','#84cc16'],['rose','Rose','#fb7185','#f59e0b'],['black','Black','#000000','#52525b'],['white','White','#ffffff','#d4d4d8']];
let curTheme='violet';
function buildThemes(){
  document.querySelectorAll('.themesw').forEach(box=>{ box.innerHTML='';
    THEMES.forEach(T=>{ const b=document.createElement('button'); b.style.setProperty('--sw','linear-gradient(135deg,'+T[2]+','+T[3]+')'); b.title=T[1]; b.setAttribute('aria-label',T[1]); b.className=T[0]===curTheme?'on':''; b.onclick=()=>applyTheme(T[0]); box.appendChild(b); }); });
}
function applyTheme(k){
  const T=THEMES.find(x=>x[0]===k)||THEMES[0]; curTheme=T[0];
  if(T[0]==='violet') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme',T[0]);
  store.set('fwp-theme',T[0]); buildThemes();
}

applyLang();
gRender(); scoreRender();
window.__ch={chLegal,chPlay}; window.__GAMES=GAMES; window.__gm={hostGame,gameTick,getGS:()=>GS,setGS:v=>{ GS=v; },getBoard:()=>BOARD};
})();