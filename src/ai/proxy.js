(function(){
const AI_URL=''; /* URL of your deployed experience-ai-proxy (no secrets here). Empty = built-in templates only. */
const $x=s=>document.querySelector(s),R=n=>Math.floor(Math.random()*n);
const H=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const B=(c,x,f)=>{const b=H('button',c,x);if(f)b.onclick=f;return b};
const SH=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=R(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
/* ---- registry: add a new experience = add an entry here + a template/engine ---- */
const K={
 mystery:{n:'Mystery Room',i:'🕵️',d:'Secret roles and private clues. Share evidence, accuse the culprit.',min:3,max:8,df:'Hard'},
 story:{n:'Choose Your Story',i:'📖',d:'Vote on every twist. Many branches, three endings.',min:1,max:8,df:'Easy'},
 debate:{n:'Debate Arena',i:'🎙️',d:'Team A vs Team B on any topic. Timed speeches, live audience vote.',min:2,max:8,df:'Medium'},
 mission:{n:'Virtual Mission',i:'🚀',d:'Team objectives, hidden clues and a rising alarm. Succeed or fail together.',min:2,max:8,df:'Medium'},
 whatif:{n:'What If Simulator',i:'💡',d:'Build a company with ₹10 crore. Every decision has consequences.',min:1,max:8,df:'Easy'},
 host:{n:'AI Party Host',i:'🤖',d:'Aria introduces, explains rules, narrates and announces results in every experience.',min:0,max:0,df:'Auto'}};
const SUS=[['Meera','chef','flour-dusted gloves'],['Arjun','musician','a snapped guitar string'],['Zoya','curator','fresh paint flecks'],['Kabir','butler','brass polish'],['Isha','doctor','antiseptic smell'],['Rohan','pilot','jet-fuel oil'],['Tara','gardener','garden soil'],['Dev','tailor','blue thread']];
const TOP=['Online classes are better than classroom learning','Cricket is better than football','AI will create more jobs than it removes','Remote work beats office work','Money matters more than passion in a career'];
const GR={
story:{node:'s0',nodes:{
 s0:{t:'A storm drives your group into an abandoned lighthouse. A light flickers upstairs and something creaks below.',o:[['Climb the spiral stairs','s1'],['Search the dark cellar','s2']]},
 s1:{t:'At the top lies the keeper\'s logbook beside a locked chest. Footsteps echo on the stairs behind you.',o:[['Read the logbook','s3'],['Force open the chest','s4']]},
 s2:{t:'The cellar hides a tunnel to the sea and a lantern that still burns, warm to the touch.',o:[['Follow the tunnel','s4'],['Take the lantern upstairs','s3']]},
 s3:{t:'The logbook says the keeper\'s ghost is freed only when the storm bell is rung at midnight.',o:[['Ring the bell together','e1'],['Run out into the storm','e2']]},
 s4:{t:'You find a map to a hidden cove, and the stairs start to shake. Something is coming.',o:[['Hide the map and flee','e2'],['Stay and face it','e3']]},
 e1:{end:'The Keeper\'s Secret',tone:'win',t:'The bell rings, the storm clears, and the keeper\'s ghost thanks you. The light shines again. BEST ENDING.'},
 e2:{end:'Lost at Sea',tone:'mid',t:'You escape, but the storm swallows the boat. You survive, with no answers. NEUTRAL ENDING.'},
 e3:{end:'Locked In',tone:'lose',t:'The lighthouse door slams shut and the light goes out. You are its new keepers. DARK ENDING.'}}},
mission:{node:'m0',stats:{progress:['Progress',0,100],alarm:['Alarm',0,100]},obj:['Breach the tower','Reach vault B2','Crack the vault'],nodes:{
 m0:{t:'MISSION: infiltrate Orion Tower and copy the stolen blueprint from the vault before security reboots in 10 minutes.',o:[['Hack the security panel','m1',{progress:30,alarm:20},'You are in, but a log entry is written.','Panel code ends in 7'],['Sneak through the maintenance duct','m1',{progress:20,alarm:5},'Slow but silent.','Duct map: vault is on level B2']]},
 m1:{t:'A guard patrol blocks the corridor to the lift.',o:[['Create a distraction','m2',{progress:20,alarm:25},'Guards run off, noise draws attention.','Guards change shift at :40'],['Hide and wait','m2',{progress:10,alarm:0},'You lose minutes but stay unseen.','Vault keypad has 4 digits']]},
 m2:{t:'The vault keypad blinks. Your team compares notes.',o:[['Use the clues to enter the code','m3',{progress:40,alarm:0},'Click. The door opens.'],['Brute-force it','m3',{progress:30,alarm:40},'It opens, and the sirens start.']]},
 m3:{t:'The blueprint is in your hands. Time to leave.',chk:1,ends:[[s=>s.progress>=70&&s.alarm<60,'MISSION SUCCESS','You slip out with the blueprint and nobody notices.','win'],[s=>s.progress>=70,'Narrow Escape','You got the blueprint, but alarms chase you out. Partial success.','mid'],[s=>1,'MISSION FAILED','The doors lock down. The mission is over.','lose']]}}},
whatif:{node:'w0',stats:{cash:['Cash ₹Cr',10,10],users:['Users (k)',0,100],rep:['Reputation',5,10]},nodes:{
 w0:{t:'You have ₹10 crore and an idea: a food-delivery app for small towns. What is your first big move?',o:[['Hire a strong team','w1',{cash:-3,users:10,rep:2},'Great talent, but a big monthly burn.'],['Spend heavily on marketing','w1',{cash:-4,users:40,rep:-1},'Fast signups, but many leave quickly.'],['Build slowly and test locally','w1',{cash:-1,users:15,rep:3},'Low risk, and loyal early users.']]},
 w1:{t:'Year 1: a rich competitor launches in your towns with big discounts.',o:[['Match their discounts','w2',{cash:-3,users:30,rep:0},'You keep users but bleed cash.'],['Focus on service quality','w2',{cash:-1,users:10,rep:3},'Customers praise you, growth is slow.'],['Partner with local shops','w2',{cash:-1,users:25,rep:2},'A smart alliance expands your reach.']]},
 w2:{t:'Year 2: an investor offers ₹5 crore for 40% of the company.',o:[['Accept the offer','w3',{cash:5,users:15,rep:0},'Cash secured, but you gave up control.'],['Decline and stay independent','w3',{cash:0,users:5,rep:2},'You keep control and carry the risk.']]},
 w3:{t:'Year 3: time to see how it all adds up.',chk:1,ends:[[s=>s.cash>0&&s.users>=70,'Unicorn Path 🦄','Your startup is the talk of the country. Investors are lining up.','win'],[s=>s.cash>0&&s.users>=30,'Steady Business','Profitable and respected, a company you can be proud of.','mid'],[s=>s.cash>0,'Slow Burn','Still alive, but growth stalled. Rethink your strategy.','mid'],[s=>1,'Bankrupt','The cash ran out before the users arrived.','lose']]}}}};
/* ---- state ---- */
let S=null,P={},skew=0,draft='',busy=0,savedSid=0;
const meId=()=>myId(),canCtl=()=>S&&(S.hid===meId()||isHost);
const pl=id=>S&&S.players.find(p=>p.id===id),plN=n=>S&&S.players.find(p=>p.name===n);
const nowH=()=>Date.now()-skew;
const pubS=()=>JSON.parse(JSON.stringify(S,(k,v)=>k==='priv'?undefined:v));
function push(){S.v=(S.v||0)+1;send({t:'x_state',s:pubS(),now:Date.now()});render();}
function sendPriv(p){if(!S||!S.priv)return;const v=S.priv[p.name]||null;sendTo(p.id,{t:'x_priv',sid:S.sid,p:v?{role:v.role,clues:v.clues}:null});}
const act=(a,o)=>{const m=Object.assign({t:'x_act',a},o||{});if(isHost){m.fid=meId();m.fn=myName;m.fa=myAv;hostAct(m);}else send(m);};
/* ---- AI Party Host (server-side proxy only; templates are the fallback) ---- */
async function ai(kind,ctx,fb){if(!S||!S.ai||!AI_URL)return fb;try{const c=new AbortController();setTimeout(()=>c.abort(),8000);const r=await fetch(AI_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind,ctx}),signal:c.signal});const j=await r.json();return typeof j.text==='string'&&j.text.trim()?j.text.trim().slice(0,500):fb;}catch(e){return fb;}}
async function say(kind,fb,ctx,sys){const sid=S&&S.sid;busy++;S.busy=1;push();const x=await ai(kind,Object.assign({game:S&&K[S.kind].n},ctx||{}),fb);busy--;if(!S||S.sid!==sid)return;S.busy=busy>0?1:0;S.log.push({ai:1,x});if(S.log.length>40)S.log.shift();push();}
function sys(x){S.log.push({x});if(S.log.length>40)S.log.shift();}
/* ---- host-authoritative engine ---- */
function addP(id,nm,av){if(pl(id))return;let n=nm,k=2;while(plN(n))n=nm+k++;S.players.push({id,name:n,av,off:0,team:S.kind==='debate'?(S.players.filter(p=>p.team==='A').length<=S.players.filter(p=>p.team==='B').length?'A':'B'):null});}
function hostAct(m){const id=m.fid,a=m.a;
 if(a==='create'){if(S&&S.st!=='over')return;const k=m.kind;if(!K[k]||k==='host')return;
  S={v:0,sid:Date.now(),kind:k,st:'lobby',pub:!!m.pub,ai:true,hot:false,hid:id,players:[],log:[],votes:{},ev:[],hist:[],stats:{},node:null,ph:null,topic:TOP[0],secs:45,priv:{}};
  addP(id,m.fn,m.fa);if(S.pub)roster.forEach(r=>addP(r.id,r.name,r.av));
  sys((S.pub?'Public':'Private')+' '+K[k].n+' room created by '+m.fn+'. '+(S.pub?'Everyone in the party is in.':'Tap Join to enter.'));push();return;}
 if(!S)return;const me=pl(id),ctl=id===S.hid||id===meId();
 if(a==='join'){if(pl(id))return;if(S.players.length>=K[S.kind].max||(S.st!=='lobby'&&S.kind==='mystery'))return;addP(id,m.fn,m.fa);sys(m.fn+' joined.');push();return;}
 if(a==='close'&&ctl&&S.st==='over'){S=null;send({t:'x_state',s:null,now:Date.now()});render();return;}
 if(!me)return;
 if(a==='leave'){if(S.st==='lobby'){S.players=S.players.filter(p=>p.id!==id);if(!S.players.length){S=null;send({t:'x_state',s:null,now:Date.now()});render();return;}if(S.hid===id)S.hid=S.players[0].id;}else me.off=1;push();return;}
 if(S.st==='lobby'){
  if(a==='team'&&S.kind==='debate'){me.team=me.team==='A'?'B':'A';push();return;}
  if(!ctl)return;
  if(a==='cfg'){if(typeof m.ai==='boolean')S.ai=m.ai;if(typeof m.hot==='boolean')S.hot=m.hot;if(m.topic){S.topic=String(m.topic).trim().slice(0,140);}if(+m.secs)S.secs=Math.max(15,Math.min(180,+m.secs));push();return;}
  if(a==='start'){const k=S.kind;if(S.players.length<K[k].min||(k==='debate'&&(!S.players.some(p=>p.team==='A')||!S.players.some(p=>p.team==='B'))))return;start();return;}
  return;}
 if(S.st==='over')return;
 if(a==='pause'&&ctl&&S.st==='play'){S.st='pause';if(S.tm&&S.tm.end){S.tm.left=Math.max(0,S.tm.end-Date.now());S.tm.end=0;}sys('⏸ Paused by host.');push();return;}
 if(a==='resume'&&ctl&&S.st==='pause'){S.st='play';if(S.tm&&S.tm.left){S.tm.end=Date.now()+S.tm.left;S.tm.left=0;}sys('▶ Resumed.');push();return;}
 if(a==='end'&&ctl){fin('Ended by host','The host ended the experience early.','mid');return;}
 if(S.st!=='play')return;
 if(a==='vote'){vote(me,m.v);return;}
 if(a==='close'&&ctl){closeVote();return;}
 if(a==='next'&&ctl&&S.kind==='debate'&&S.ph==='speak'){nextSpeech();return;}
 if(a==='callvote'&&ctl&&S.kind==='mystery'&&S.ph==='invest'){S.ph='vote';S.votes={};sys('🗳️ Voting opened. Who did it?');push();say('vote','Time to decide. Weigh the evidence, then name the culprit.');return;}
 if(a==='share'&&S.kind==='mystery'&&S.ph==='invest'){const c=(S.priv[me.name]||{}).clues||[];const x=c[+m.i];if(x&&!S.ev.some(e=>e.by===me.name&&e.x===x)){S.ev.push({by:me.name,x});push();}return;}}
function start(){const k=S.kind;S.st='play';S.log=[];S.votes={};S.hist=[];S.turn=0;
 if(GR[k]){const g=GR[k];S.node=g.node;S.stats={};for(const s in(g.stats||{}))S.stats[s]=g.stats[s][1];}
 if(k==='mystery'){const ps=SH(S.players);const sus=SH(SUS).slice(0,ps.length);S.sus=ps.map((p,i)=>({n:sus[i][0],r:sus[i][1],tr:sus[i][2],by:p.name}));const c=R(ps.length);S.priv={_c:S.sus[c].n};
  const inn=S.sus.filter((_,i)=>i!==c);let t=R(inn.length);
  S.sus.forEach((s,i)=>{const cl=[];if(i===c){cl.push('🔪 You did it. Stay calm, blend in and mislead them.');cl.push('You were seen near the study at 11:50. Deflect.');}
   else{const o=inn.filter(x=>x.n!==s.n);const a=o[R(o.length)];if(a)cl.push('You saw '+a.n+' the '+a.r+' in the ballroom at 11:50. Not '+a.n+'.');
    if(inn[t]&&inn[t].n===s.n)cl.push('🔎 The stolen case\'s latch carries traces of '+S.sus[c].tr+'.');else cl.push('Someone left the study in a hurry at midnight.');}
   S.priv[S.sus[i].by]={role:s.n+' the '+s.r,clues:cl};});
  S.ph='invest';sys('Case: the Chairman\'s diamond vanished from the locked study during the midnight gala. One of you took it.');S.players.forEach(sendPriv);}
 if(k==='debate'){S.ord=['A','B','A','B'];S.si=0;S.ph='speak';S.tm={end:Date.now()+S.secs*1000,left:0};}
 push();
 const fb={mystery:'Welcome, detectives! I am Aria. Each of you holds secret clues. Share what helps, then vote on the culprit.',story:'I am Aria, your narrator. Vote on each scene; the majority decides the path.',debate:'I am Aria, your moderator. Each side speaks in turn, then the audience votes.',mission:'Agents, I am Aria, your handler. Reach every objective while keeping the alarm low.',whatif:'I am Aria, your advisor. Each decision changes your cash, users and reputation.'}[k];
 say('intro',fb,{topic:S.topic,players:S.players.length});}
function eligible(){return S.players.filter(p=>!p.off&&(S.kind!=='mystery'||true));}
function vote(me,v){v=String(v);
 if(S.kind==='debate'){if(S.ph!=='vote'||!['A','B'].includes(v))return;}
 else if(S.kind==='mystery'){if(S.ph!=='vote'||!S.sus.some(s=>s.n===v))return;}
 else{const n=GR[S.kind].nodes[S.node];if(!n||!n.o||!n.o[+v])return;if(S.hot&&S.players.filter(p=>!p.off)[S.turn%S.players.filter(p=>!p.off).length].id!==me.id)return;}
 S.votes[me.id]=v;push();
 const need=S.hot&&GR[S.kind]?1:eligible().length;if(Object.keys(S.votes).filter(i=>pl(i)&&!pl(i).off).length>=need)closeVote();}
function tally(){const t={};Object.keys(S.votes).forEach(i=>{if(pl(i)){const v=S.votes[i];t[v]=(t[v]||0)+1;}});return t;}
function closeVote(){const t=tally(),keys=Object.keys(t);
 if(S.kind==='debate'){const a=t.A||0,b=t.B||0;const w=a>b?'A':b>a?'B':null;fin(w?'Team '+w+' wins!':'A perfect tie!',w?'Audience vote: Team A '+a+' – Team B '+b+'.':'The audience split '+a+'–'+b+'. Both teams argued brilliantly.',w?'win':'mid',w);return;}
 if(S.kind==='mystery'){if(!keys.length){sys('No votes yet.');push();return;}const mx=Math.max(...keys.map(k=>t[k])),top=keys.filter(k=>t[k]===mx),cul=S.priv._c,cs=S.sus.find(s=>s.n===cul);const nv=Object.keys(S.votes).length;
  const caught=top.length===1&&top[0]===cul,un=caught&&mx===nv-0;
  const o=caught?(mx>=nv-1?['Case Closed!','Almost unanimous: '+cul+' ('+cs.by+') was the culprit. Detectives win!','win']:['Narrow Victory','Just enough votes caught '+cul+' ('+cs.by+'). Detectives win!','win']):top.length>1?['The Culprit Escapes','The votes split. '+cul+' ('+cs.by+') slips away. The culprit wins!','lose']:['Wrong Suspect!','You accused '+top[0]+'. The real thief was '+cul+' ('+cs.by+'). The culprit wins!','lose'];
  fin(o[0],o[1],o[2],caught?'Detectives':cs.by);return;}
 const n=GR[S.kind].nodes[S.node];let best=keys.length?keys.filter(k=>t[k]===Math.max(...keys.map(x=>t[x]))):[];if(!best.length){sys('No votes yet.');push();return;}
 const pick=+best[R(best.length)],o=n.o[pick];if(o[2])for(const s in o[2]){const d=GR[S.kind].stats[s];S.stats[s]=Math.max(d[1]<0?-9e9:0,S.stats[s]+o[2][s]);if(S.stats[s]>d[2]&&s!=='cash')S.stats[s]=d[2];}
 if(o[4]&&!S.ev.some(e=>e.x===o[4]))S.ev.push({by:'Team',x:o[4]});
 S.hist.push({n:n.t.slice(0,60),c:o[0],fx:o[2]||null,by:S.hot?(S.players.filter(p=>!p.off)[S.turn%S.players.filter(p=>!p.off).length]||{}).name:(t[pick]||0)+' vote(s)'});
 if(o[3])sys('➡️ '+o[3]);S.node=o[1];S.votes={};S.turn++;
 const nn=GR[S.kind].nodes[S.node];
 if(nn.end)fin(nn.end,nn.t,nn.tone);else if(nn.chk){const e=nn.ends.find(x=>x[0](S.stats));fin(e[1],e[2],e[3]);}else{push();say('scene','',{scene:nn.t,choice:o[0],stats:S.stats});}}
function nextSpeech(){S.si++;if(S.si>=S.ord.length){S.ph='vote';S.tm=null;S.votes={};sys('🗳️ Speeches over. Audience, cast your vote!');push();say('vote','All arguments are in. Vote for the team that convinced you most.',{topic:S.topic});}else{S.tm={end:Date.now()+S.secs*1000,left:0};push();}}
function fin(title,text,tone,winner){const sid=S.sid;S.st='over';S.tm=null;S.res={title,text,tone:tone||'mid',winner:winner||null};
 if(S.kind==='mystery')S.res.culprit=S.priv._c;sys('🏁 '+title);push();
 say('result',text,{result:title,text});}
setInterval(()=>{if(isHost&&S&&S.st==='play'&&S.kind==='debate'&&S.ph==='speak'&&S.tm&&S.tm.end&&Date.now()>=S.tm.end)nextSpeech();},500);
/* ---- network hooks ---- */
window.expMsg=function(m){
 if(m.t==='x_act'){if(isHost)hostAct(m);return;}
 if(m.t==='x_state'){if(isHost)return;skew=Date.now()-(+m.now||Date.now());S=m.s;if(!S)P={};render();return;}
 if(m.t==='x_priv'){if(S&&m.sid===S.sid||!S)P=m.p||{};render();}};
window.expWelcome=function(id){if(!S)return;const nm=peerName(id);sendTo(id,{t:'x_state',s:pubS(),now:Date.now()});
 const old=S.players.find(p=>p.name===nm&&p.off);
 if(old){old.id=id;old.off=0;sys('🔌 '+nm+' reconnected.');push();sendPriv(old);}
 else if(S.pub&&S.st==='lobby'&&S.players.length<K[S.kind].max){const r=roster.find(x=>x.id===id);if(r){addP(id,r.name,r.av);push();}}};
window.expLeft=function(id){if(!S)return;const p=pl(id);if(!p)return;
 if(S.st==='lobby'){S.players=S.players.filter(x=>x.id!==id);if(S.hid===id)S.hid=meId();if(!S.players.length)S=null;}
 else{p.off=1;if(S.hid===id){S.hid=meId();sys('Host left. Control passed to the room owner.');}sys('⚠️ '+p.name+' disconnected. They can rejoin with the same name.');
  if(S.st==='play'&&S.votes[id]===undefined&&eligible().length&&(S.ph==='vote'||GR[S.kind]))setTimeout(()=>{if(S&&S.st==='play'&&Object.keys(S.votes).filter(i=>pl(i)&&!pl(i).off).length>=eligible().length&&eligible().length)closeVote();},0);}
 if(S)push();else{send({t:'x_state',s:null,now:Date.now()});render();}};
window.expRoster=function(){render();};
window.expShown=function(){render();};
/* ---- UI ---- */
const tmLeft=()=>S&&S.tm?(S.tm.end?Math.max(0,S.tm.end-nowH()):S.tm.left||0):0;
setInterval(()=>{const e=$x('#xtm');if(e&&S&&S.tm)e.textContent=Math.ceil(tmLeft()/1000)+'s';},400);
function res(){if(!S||S.st!=='over'||savedSid===S.sid||!S.res)return;savedSid=S.sid;try{const a=JSON.parse(localStorage.getItem('fwp-exp-res')||'[]');a.unshift({k:S.kind,t:S.res.title,x:S.res.text,at:Date.now(),p:S.players.map(p=>p.name)});localStorage.setItem('fwp-exp-res',JSON.stringify(a.slice(0,20)));}catch(e){}}
function render(){const box=$x('#xbox');if(!box)return;box.innerHTML='';res();
 const inRoom=!$x('#app').hidden&&typeof roster!=='undefined'&&roster.length;
 box.appendChild(H('h2','','✨ Experience Hub'));const s=H('p','sub','');s.innerHTML='<b class="grad">Don\'t just watch. Don\'t just play. Experience together.</b>';box.appendChild(s);
 if(!S)return hub(box);
 const mp=pl(meId());session(box,mp);}
function hub(box){const g=H('div','xgrid');
 Object.keys(K).forEach(k=>{const c=K[k],cd=H('div','xcard glass');cd.appendChild(H('div','ico',c.i));cd.appendChild(H('h3','',c.n));cd.appendChild(H('p','',c.d));
  const mt=H('div','xmeta');mt.appendChild(H('span','xchip',k==='host'?'Powers every room':'👥 '+(c.min===c.max?c.max:c.min+'–'+c.max)+' players'));mt.appendChild(H('span','xchip','⚡ '+c.df));cd.appendChild(mt);
  const r=H('div','xrow');
  if(k==='host'){const on=!!AI_URL;cd.appendChild(H('div','xlive',on?'● AI connected (server proxy)':'● Template mode: set AI_URL to enable the LLM'));r.appendChild(B('primary','Test host',async function(){this.disabled=true;this.textContent='Thinking…';const old=S;S={ai:1,kind:'story'};const x=await ai('hello',{game:'Friends HUB Party'},'Hi, I am Aria! Pick an experience, create a room and I will run the show. 🎉');S=old;this.disabled=false;this.textContent='Test host';toast('🤖 '+x);}));}
  else{if(S&&S.kind===k)cd.appendChild(H('div','xlive','● Room open: '+S.players.length+' player(s)'));
   r.appendChild(B('primary','Create Room',()=>{if($x('#app').hidden)return toast('Join or create a party room first');const pubR=confirm('Make this a PUBLIC room (everyone in the party joins automatically)?\nCancel = Private (invite only).');act('create',{kind:k,pub:pubR});}));
   r.appendChild(B('','Join Room',()=>toast('No '+c.n+' room is open yet. Ask the host to create one.')));}
  cd.appendChild(r);g.appendChild(cd);});
 box.appendChild(g);
 let a=[];try{a=JSON.parse(localStorage.getItem('fwp-exp-res')||'[]');}catch(e){}
 const rb=H('div','xbox glass');rb.appendChild(H('h3','','🏆 Recent results'));
 if(!a.length)rb.appendChild(H('p','sub','Nothing yet. Finish an experience and the results appear here.'));
 a.slice(0,5).forEach(x=>rb.appendChild(H('div','xclue',K[x.k].i+' '+x.t+' · '+x.p.join(', '))));box.appendChild(rb);}
function session(box,mp){const k=S.kind,c=K[k],w=H('div','xbox glass');
 const hd=H('div','xrow');hd.appendChild(H('h3','',c.i+' '+c.n));hd.appendChild(H('span','xchip',S.pub?'Public':'Private'));hd.appendChild(H('span','xchip',S.st==='play'?'LIVE':S.st==='pause'?'PAUSED':S.st==='over'?'FINISHED':'LOBBY'));w.appendChild(hd);
 const ps=H('div','xrow');S.players.forEach(p=>ps.appendChild(H('span','xp'+(p.off?' off':''),p.av+' '+p.name+(p.id===S.hid?' 👑':'')+(p.team?' ['+p.team+']':'')+(p.off?' ⚠️':''))));w.appendChild(ps);
 if(S.st==='lobby')lobby(w,mp);else if(S.st==='over')over(w);else play(w,mp);
 if(canCtl()&&(S.st==='play'||S.st==='pause')){const r=H('div','xrow');r.appendChild(B('',S.st==='pause'?'▶ Resume':'⏸ Pause',()=>act(S.st==='pause'?'resume':'pause')));r.appendChild(B('','⏹ End',()=>confirm('End this experience?')&&act('end')));if(S.kind==='mystery'&&S.ph==='invest')r.appendChild(B('primary','🗳️ Call the vote',()=>act('callvote')));if(S.ph==='vote'||(GR[k]&&S.st==='play'))r.appendChild(B('','✅ Close vote now',()=>act('close')));if(S.kind==='debate'&&S.ph==='speak')r.appendChild(B('','⏭ Next speaker',()=>act('next')));w.appendChild(r);}
 const lg=H('div','xlog');if(S.busy){lg.appendChild(H('div','ai','🤖 Aria is thinking…'));}S.log.slice().reverse().slice(0,8).forEach(l=>lg.appendChild(H('div',l.ai?'ai':'',(l.ai?'🤖 Aria: ':'')+l.x)));w.appendChild(lg);box.appendChild(w);}
function lobby(w,mp){const k=S.kind,c=K[k];
 w.appendChild(H('p','sub',c.d+' Players '+c.min+'–'+c.max+'. Room code: '+code+'. Friends join via the party invite link.'));
 if(!mp)w.appendChild(B('primary','Join this room',()=>act('join')));
 else{if(S.kind==='debate'){w.appendChild(B('','Switch team (you are '+mp.team+')',()=>act('team')));}
  w.appendChild(B('','Leave',()=>act('leave')));}
 if(canCtl()){const r=H('div','xrow'),l=H('label','');const cb=H('input','xtog');cb.type='checkbox';cb.checked=S.ai;cb.onchange=()=>act('cfg',{ai:cb.checked});l.appendChild(cb);l.appendChild(document.createTextNode(' AI Party Host '+(AI_URL?'(LLM)':'(templates)')));r.appendChild(l);
  if(GR[k]){const l2=H('label','');const c2=H('input','xtog');c2.type='checkbox';c2.checked=S.hot;c2.onchange=()=>act('cfg',{hot:c2.checked});l2.appendChild(c2);l2.appendChild(document.createTextNode(' Hot-seat: one player decides per round (off = team vote)'));r.appendChild(l2);}w.appendChild(r);
  if(k==='debate'){const t=H('input');t.value=draft||S.topic;t.maxLength=140;t.oninput=()=>draft=t.value;w.appendChild(H('p','sub','Topic: '+S.topic));w.appendChild(t);const r2=H('div','xrow');r2.appendChild(B('','Set topic',()=>{act('cfg',{topic:t.value});draft='';}));r2.appendChild(B('','🎲 Random',()=>act('cfg',{topic:TOP[R(TOP.length)]})));
   if(AI_URL)r2.appendChild(B('','🤖 AI topic',async function(){this.disabled=true;const x=await ai('topic',{},'');this.disabled=false;if(x)act('cfg',{topic:x});else toast('AI unavailable. Using templates.');}));
   const sc=H('input');sc.type='number';sc.min=15;sc.max=180;sc.value=S.secs;sc.style.width='90px';sc.onchange=()=>act('cfg',{secs:sc.value});r2.appendChild(H('span','sub','Seconds per speech:'));r2.appendChild(sc);w.appendChild(r2);}
  const ok=S.players.length>=c.min&&(k!=='debate'||(S.players.some(p=>p.team==='A')&&S.players.some(p=>p.team==='B')));
  w.appendChild(B('primary',ok?'▶ Start experience':'Need '+c.min+'+ players'+(k==='debate'?' with both teams':''),()=>ok&&act('start')));}
 else w.appendChild(H('p','sub','Waiting for the host to start…'));}
function opts(w,items,sel,fn,tl){const t=tl||tally(),tot=Object.values(t).reduce((a,b)=>a+b,0)||1;items.forEach(([key,label])=>{const b=B('xopt'+(sel===String(key)?' on':''),'',()=>fn(key));const vb=H('i','vb');vb.style.width=((t[key]||0)/tot*100)+'%';b.appendChild(vb);b.appendChild(H('span','',label+'  ·  '+(t[key]||0)));w.appendChild(b);});}
function play(w,mp){const k=S.kind,my=S.votes[meId()];
 if(S.st==='pause')w.appendChild(H('p','sub','⏸ Paused by the host.'));
 if(k==='mystery'){const rl=P&&P.role;w.appendChild(H('h3','','Your role: '+(rl||'Spectator')));
  (P.clues||[]).forEach((x,i)=>{const d=H('div','xclue');d.appendChild(H('span','',x));if(S.ph==='invest')d.appendChild(B('','Share',()=>act('share',{i})));w.appendChild(d);});
  w.appendChild(H('h3','','🗂️ Evidence board'));if(!S.ev.length)w.appendChild(H('p','sub','No evidence shared yet. Share a clue to help the team.'));S.ev.forEach(e=>w.appendChild(H('div','xclue',e.by+': '+e.x)));
  w.appendChild(H('h3','','Suspects'));S.sus.forEach(s=>w.appendChild(H('div','xclue',s.n+' the '+s.r+' (played by '+s.by+') · known for '+s.tr)));
  if(S.ph==='invest')w.appendChild(H('p','sub','💬 Discuss in Party Chat, then the host calls the vote.'));
  else if(mp)opts(w,S.sus.map(s=>[s.n,'Accuse '+s.n]),my,v=>act('vote',{v}));}
 else if(k==='debate'){w.appendChild(H('h3','','“'+S.topic+'”'));
  if(S.ph==='speak'){const t=S.ord[S.si],tp=S.players.filter(p=>p.team===t&&!p.off),sp=tp[Math.floor(S.si/2)%(tp.length||1)];const d=H('div','xtm');const a=H('div');a.appendChild(H('div','sub','Speaking now · Team '+t));a.appendChild(H('b','',sp?sp.av+' '+sp.name:'Team '+t));const b=H('div');b.appendChild(H('div','sub','Time left'));const tm=H('div','xt',Math.ceil(tmLeft()/1000)+'s');tm.id='xtm';b.appendChild(tm);d.appendChild(a);d.appendChild(b);w.appendChild(d);w.appendChild(H('p','sub','Speech '+(S.si+1)+' of '+S.ord.length+'. The audience votes next.'));}
  else if(mp)opts(w,[['A','Team A: '+S.players.filter(p=>p.team==='A').map(p=>p.name).join(', ')],['B','Team B: '+S.players.filter(p=>p.team==='B').map(p=>p.name).join(', ')]],my,v=>act('vote',{v}));}
 else{const g=GR[k],n=g.nodes[S.node];
  if(g.stats)Object.keys(g.stats).forEach(s=>{const d=g.stats[s],v=S.stats[s];const r=H('div');r.appendChild(H('div','sub',d[0]+': '+(Math.round(v*10)/10)));const bb=H('div','xbar');const i=H('i');i.style.width=Math.max(0,Math.min(100,v/(d[2]||1)*100))+'%';bb.appendChild(i);r.appendChild(bb);w.appendChild(r);});
  if(g.obj){w.appendChild(H('div','sub','Objectives: '+g.obj.map((o,i)=>(S.stats.progress>=(i+1)*33?'✅ ':'⬜ ')+o).join('  ')));}
  w.appendChild(H('p','',n.t));
  const on=S.players.filter(p=>!p.off);if(S.hot&&on.length)w.appendChild(H('p','sub','🎯 Hot seat: '+on[S.turn%on.length].name));
  if(mp)opts(w,n.o.map((o,i)=>[i,o[0]]),my===undefined?'':String(my),v=>act('vote',{v}));
  if(S.ev.length&&k==='mission'){w.appendChild(H('h3','','🔎 Clues found'));S.ev.forEach(e=>w.appendChild(H('div','xclue',e.x)));}
  if(S.hist.length){w.appendChild(H('h3','','📜 Decision history'));S.hist.forEach(h=>w.appendChild(H('div','xclue',h.c+' ← '+h.by+(h.fx?'  '+Object.keys(h.fx).map(x=>x+' '+(h.fx[x]>0?'+':'')+h.fx[x]).join(', '):'')))); }}}
function over(w){const r=S.res||{};const d=H('div','xwin');d.appendChild(H('div','big',r.tone==='win'?'🏆':r.tone==='lose'?'💥':'🎭'));d.appendChild(H('h2','grad',r.title));d.appendChild(H('p','',r.text));w.appendChild(d);
 if(S.hist&&S.hist.length){w.appendChild(H('h3','','📜 Your decisions'));S.hist.forEach(h=>w.appendChild(H('div','xclue',h.c+' ← '+h.by)));}
 if(S.kind==='mystery'){w.appendChild(H('div','xclue','The culprit was '+r.culprit));}
 if(canCtl())w.appendChild(B('primary','Back to Experience Hub',()=>act('close')));else w.appendChild(H('p','sub','The host will close this room.'));}
render();
})();