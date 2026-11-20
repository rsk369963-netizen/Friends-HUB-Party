(function(){
const $v=i=>document.getElementById(i),LS={g(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},s(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,TOUCH=matchMedia('(pointer:coarse)').matches||'ontouchstart' in window;
const AV=Object.assign({name:(typeof myName!=='undefined'&&myName)||'Guest',style:0,hair:1,hc:'#3b2a1a',skin:'#f1c27d',oc:'#8b5cf6',acc:0,fit:0,pc:'#1f2937',eye:'#2b1b12'},LS.g('fwp-vw-avatar',{}));
const OC=['#8b5cf6','#ec4899','#06b6d4','#22c55e','#f97316','#ef4444','#e5e7eb','#111827'],PC=['#1f2937','#111827','#334155','#7c2d12','#1e3a8a','#f3f4f6','#065f46','#581c87'],HC2=['#3b2a1a','#111827','#facc15','#ef4444','#a855f7','#e5e7eb'],SK=['#f8d9b8','#f1c27d','#c68642','#8d5524','#5c3a1e'];
let GFX=LS.g('fwp-vw-gfx','med'),T,R,SC,CAM,cv,stage,mode='',RAF=0,clock,ready=0,built=0,active=0;
let P,solids=[],seats=[],inter=[],dyn=[],mats={},keys={},joy={x:0,y:0},yaw=0,pitch=.35,dist=9,cur=null,bound=24,room=null,drag=null,tmr,msgT;
let sens=+LS.g('fwp-vw-sens',1)||1,view=LS.g('fwp-vw-view','third')==='first'?'first':'third',locked=0,cyaw=0,cpitch=.35,cdist=9,snap=1,lastDt=.016,pvAn='idle',lastType='mouse',lastMoved=0;
const h=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;};
const msg=x=>{const m=$v('vwMsg');if(!m)return;m.textContent=x;m.classList.add('on');clearTimeout(msgT);msgT=setTimeout(()=>m.classList.remove('on'),2600);};
const Q=()=>GFX==='low'?.4:GFX==='med'?.7:1;
let sd=7;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;
/* ---------- three.js loading, renderer, cleanup ---------- */
function webgl(){try{const c=document.createElement('canvas');return !!(c.getContext('webgl')||c.getContext('experimental-webgl'));}catch(e){return false;}}
function load3(){return new Promise((ok,no)=>{if(window.THREE)return ok();if(!webgl())return no(new Error('WebGL is not available on this device.'));
 const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';const to=setTimeout(()=>no(new Error('Loading 3D engine timed out.')),15000);
 s.onload=()=>{clearTimeout(to);window.THREE?ok():no(new Error('3D engine failed to initialise.'));};s.onerror=()=>{clearTimeout(to);no(new Error('Could not download the 3D engine (check your connection).'));};document.head.appendChild(s);});}
function initR(){if(R)return;T=window.THREE;R=new T.WebGLRenderer({canvas:cv,antialias:GFX!=='low',powerPreference:'high-performance'});SC=new T.Scene();CAM=new T.PerspectiveCamera(55,1,.1,300);clock=new T.Clock();applyGfx();fit();
 cv.addEventListener('webglcontextlost',e=>{e.preventDefault();if(document.pointerLockElement&&document.exitPointerLock)document.exitPointerLock();stop();fb('The 3D view was interrupted by the device. Tap Retry.');});}
function applyGfx(){if(!R)return;R.setPixelRatio(GFX==='low'?1:Math.min(devicePixelRatio||1,GFX==='med'?1.5:2));R.shadowMap.enabled=GFX!=='low';SC&&SC.traverse(o=>{if(o.material)[].concat(o.material).forEach(m=>m.needsUpdate=true);if(o.isDirectionalLight){o.castShadow=GFX!=='low';}});}
function fit(){if(!R||!stage)return;const w=stage.clientWidth,hh=stage.clientHeight;if(!w||!hh)return;R.setSize(w,hh,false);CAM.aspect=w/hh;CAM.updateProjectionMatrix();}
function clearScene(){if(!SC)return;SC.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)[].concat(o.material).forEach(m=>{if(m.map)m.map.dispose();m.dispose();});});
 while(SC.children.length)SC.remove(SC.children[0]);Object.values(mats).forEach(m=>m.dispose());mats={};solids=[];seats=[];inter=[];dyn=[];SC.fog=null;SC.background=null;cur=null;P=null;room=null;music(0);for(const id in REM) REM[id].g=null;}
function destroy(){stop();unbind();clearScene();if(R){R.dispose();try{R.forceContextLoss();}catch(e){}R=null;}SC=null;mode='';}
function fb(x){const f=$v('vwFb');f.hidden=false;f.innerHTML='';f.append(h('b','','🌐 3D could not start'),h('p','',x),(b=>{b.textContent='Retry';b.className='primary';b.onclick=()=>{f.hidden=true;boot();};return b;})(h('button')));}
/* ---------- primitives ---------- */
const mat=(c,e)=>{const k=c+'|'+(e||'');return mats[k]||(mats[k]=new T.MeshLambertMaterial(e?{color:c,emissive:e}:{color:c}));};
function mesh(g,c,x,y,z,e,par){const m=new T.Mesh(g,typeof c==='string'?mat(c,e):c);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;(par||SC).add(m);return m;}
const box=(x,y,z,w,hh,d,c,e,p)=>mesh(new T.BoxGeometry(w,hh,d),c,x,y,z,e,p),cyl=(x,y,z,a,b,hh,c,e,p)=>mesh(new T.CylinderGeometry(a,b,hh,14),c,x,y,z,e,p),sph=(x,y,z,r,c,e,p)=>mesh(new T.SphereGeometry(r,14,10),c,x,y,z,e,p),cone=(x,y,z,r,hh,c,e,p)=>mesh(new T.ConeGeometry(r,hh,12),c,x,y,z,e,p);
const solid=(x,z,r)=>solids.push({x,z,r});
function seat(x,z,ry,vis){if(vis!==0){const g=new T.Group();g.position.set(x,0,z);g.rotation.y=ry;SC.add(g);box(0,.25,0,1.6,.5,.7,'#334155',null,g);box(0,.75,-.3,1.6,.6,.12,'#475569',null,g);}seats.push({x,z,ry,y:.5});}
function lights(sky,gr,i,sun){SC.add(new T.HemisphereLight(sky,gr,i));const d=new T.DirectionalLight(0xffffff,sun);d.position.set(12,24,10);d.castShadow=GFX!=='low';d.shadow.mapSize.set(GFX==='high'?1024:512,GFX==='high'?1024:512);const s=d.shadow.camera;s.left=s.bottom=-30;s.right=s.top=30;SC.add(d);}
function ground(c,s){box(0,-.1,0,s*2+8,.2,s*2+8,c);bound=s;}
function stars(n){const g=new T.BufferGeometry(),a=[];for(let i=0;i<n*Q();i++)a.push((rnd()-.5)*220,rnd()*90+5,(rnd()-.5)*220);g.setAttribute('position',new T.Float32BufferAttribute(a,3));SC.add(new T.Points(g,new T.PointsMaterial({color:0xffffff,size:.7})));}
function palm(x,z){cyl(x,2,z,.2,.3,4,'#8b5a2b');for(let i=0;i<5;i++){const a=i*1.256;mesh(new T.SphereGeometry(1.3,8,6),'#16a34a',x+Math.cos(a)*1.1,4.2,z+Math.sin(a)*1.1).scale.set(1,.25,.5);}solid(x,z,.5);}
function tree(x,z,s){cyl(x,1.2*s,z,.25*s,.35*s,2.4*s,'#7c4a21');cone(x,3.6*s,z,1.5*s,3.4*s,'#15803d');solid(x,z,.5*s);}
/* ---------- party: dance floor, visualizer, music, confetti ---------- */
let AC,AN,ad,mus=0,step=0,nxt=0;
function music(on){if(!on){mus=0;clearInterval(tmr);if(AC){try{AC.close();}catch(e){}AC=AN=null;}return;}try{AC=new(window.AudioContext||window.webkitAudioContext)();AN=AC.createAnalyser();AN.fftSize=64;AN.connect(AC.destination);ad=new Uint8Array(AN.frequencyBinCount);nxt=AC.currentTime+.1;step=0;mus=1;tmr=setInterval(sched,100);}catch(e){mus=0;msg('Audio is not available here.');}}
function sched(){if(!AC)return;while(nxt<AC.currentTime+.3){const t=nxt,i=step++;if(i%2===0){const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(160,t);o.frequency.exponentialRampToValueAtTime(45,t+.2);g.gain.setValueAtTime(.9,t);g.gain.exponentialRampToValueAtTime(.001,t+.25);o.connect(g);g.connect(AN);o.start(t);o.stop(t+.26);
 const b=AC.createOscillator(),bg=AC.createGain(),f=AC.createBiquadFilter();b.type='sawtooth';b.frequency.value=[55,55,65.4,49][(i>>1)%4];f.type='lowpass';f.frequency.value=300;bg.gain.setValueAtTime(.25,t);bg.gain.exponentialRampToValueAtTime(.001,t+.22);b.connect(f);f.connect(bg);bg.connect(AN);b.start(t);b.stop(t+.23);}
 else{const n=AC.createBufferSource(),len=AC.sampleRate*.05,bf=AC.createBuffer(1,len,AC.sampleRate),d=bf.getChannelData(0);for(let k=0;k<len;k++)d[k]=(Math.random()*2-1)*(1-k/len);n.buffer=bf;const hp=AC.createBiquadFilter();hp.type='highpass';hp.frequency.value=7000;const g=AC.createGain();g.gain.value=.25;n.connect(hp);hp.connect(g);g.connect(AN);n.start(t);}
 nxt+=60/124/2;}}
function partyRig(sx,sz,tiles){const bars=[],tl=[];
 box(sx,.6,sz,14,1.2,6,'#1f1b3a');box(sx,1.6,sz,3,.8,1,'#111827','#312e81');[-6,6].forEach(x=>box(sx+x,2.4,sz,1.6,3.6,1.4,'#0f172a','#1e1b4b'));
 for(let i=0;i<12;i++)bars.push(box(sx-5.5+i,1.4,sz+3.3,.7,1,.4,'#22d3ee','#0e7490'));
 if(tiles){for(let i=0;i<tiles*tiles;i++){const m=new T.MeshLambertMaterial({color:0x111111,emissive:0x220044}),x=(i%tiles-(tiles-1)/2)*1.6,z=(Math.floor(i/tiles)-(tiles-1)/2)*1.6+4;tl.push(mesh(new T.BoxGeometry(1.5,.1,1.5),m,x,.05,z));}}
 const beams=[];for(let i=0;i<4;i++){const m=new T.Mesh(new T.ConeGeometry(2,14,16,1,true),new T.MeshBasicMaterial({color:[0xff2bd6,0x22d3ee,0xfacc15,0x8b5cf6][i],transparent:true,opacity:.16,side:2}));m.position.set(sx-9+i*6,9,sz+2);SC.add(m);beams.push(m);}
 inter.push({x:sx,z:sz+4,r:3,label:'DJ booth – music on/off',fn:()=>{music(!mus);msg(mus?'🎵 Music on':'Music off');}});
 dyn.push((dt,t)=>{let lv=0;if(mus&&AN){AN.getByteFrequencyData(ad);for(let i=0;i<ad.length;i++)lv+=ad[i];lv/=ad.length*255;}
  bars.forEach((b,i)=>{const v=mus&&ad?ad[i%ad.length]/255:(RM?.2:.2+.15*Math.sin(t*2+i));b.scale.y=.3+v*4;b.position.y=.2+b.scale.y*.5+1.2;});
  tl.forEach((m,i)=>{m.material.emissive.setHSL((t*(RM?.02:.1)+i*.03)%1,1,.15+(mus?lv*.5:.05));});
  beams.forEach((b,i)=>{if(!RM){b.rotation.z=Math.sin(t*1.2+i)*.5;b.rotation.x=Math.cos(t*.9+i)*.4;}});});}
function confetti(){if(RM){msg('🎉 Celebration! (animation reduced)');return;}const n=Math.floor(160*Q()),g=new T.BufferGeometry(),a=[],v=[];const c=P.x,z=P.z;for(let i=0;i<n;i++){a.push(c,3,z);v.push((rnd()-.5)*6,rnd()*7+2,(rnd()-.5)*6);}
 g.setAttribute('position',new T.Float32BufferAttribute(a,3));const p=new T.Points(g,new T.PointsMaterial({size:.3,vertexColors:false,color:0xfacc15}));SC.add(p);let age=0;
 const fn=dt=>{age+=dt;const pos=g.attributes.position;for(let i=0;i<n;i++){v[i*3+1]-=9*dt;pos.array[i*3]+=v[i*3]*dt;pos.array[i*3+1]=Math.max(0,pos.array[i*3+1]+v[i*3+1]*dt);pos.array[i*3+2]+=v[i*3+2]*dt;}pos.needsUpdate=true;p.material.color.setHSL((age*.8)%1,1,.6);
  if(age>3.5){SC.remove(p);g.dispose();p.material.dispose();dyn.splice(dyn.indexOf(fn),1);}};dyn.push(fn);msg('🎉 Celebration!');}
/* ---------- worlds ---------- */
function winTex(){
  if(TXC['win']) return TXC['win'];
  const c2=document.createElement('canvas');c2.width=128;c2.height=128;const x=c2.getContext('2d');
  x.fillStyle='#0b1329';x.fillRect(0,0,128,128);
  for(let r=6;r<122;r+=16){
    for(let col=6;col<122;col+=14){
      const lit=Math.random()>.42;
      x.fillStyle=lit?(Math.random()>.35?'#fef08a':'#67e8f9'):'#1e293b';
      x.fillRect(col,r,8,10);
      x.fillStyle='rgba(255,255,255,.15)';
      x.fillRect(col,r,8,2);
    }
  }
  const t=new T.CanvasTexture(c2);t.wrapS=t.wrapT=1000;t.repeat.set(2,4);TXC['win']=t;return t;
}

const W=[
{k:'city',n:'Virtual City',e:'🏙️',d:'Living metropolis: skyscrapers, moving traffic, glowing streetlights & central plaza.',sky:'#080c1a',b(){
  ground('#111827',30);
  lights('#93c5fd','#1e1b4b',.75,.85);
  const winMat=new T.MeshStandardMaterial({color:'#1e293b',map:winTex(),roughness:.3,metalness:.2,emissive:'#0f172a',emissiveIntensity:.7});
  
  /* Detailed Skyscrapers with illuminated window grids & roof antennas */
  for(let x=-26;x<=26;x+=13){
    for(let z=-26;z<=26;z+=13){
      if(Math.abs(x)<8||Math.abs(z)<8) continue;
      const hh=12+Math.floor(rnd()*18);
      const bldg=new T.Mesh(new T.BoxGeometry(8,hh,8),winMat);
      bldg.position.set(x,hh/2,z);bldg.castShadow=true;bldg.receiveShadow=true;SC.add(bldg);
      solid(x,z,4.6);
      /* Roof spire & aerial hazard light */
      cyl(x,hh+1.5,z,.08,.15,3,'#94a3b8');
      sph(x,hh+3,z,.25,'#ef4444','#f87171');
      /* Base entrance lobby */
      box(x,1.6,z+4.1,4,3.2,.3,'#38bdf8','#0369a1');
    }
  }
  
  /* Realistic asphalt avenues & pedestrian footpaths */
  box(0,.02,0,7,.04,64,'#1e293b'); // Main North-South Avenue
  box(0,.02,0,64,.04,7,'#1e293b'); // Main East-West Boulevard
  // Sidewalk curbs
  box(4.2,.12,0,1.4,.2,64,'#475569');
  box(-4.2,.12,0,1.4,.2,64,'#475569');
  box(0,.12,4.2,64,.2,1.4,'#475569');
  box(0,.12,-4.2,64,.2,1.4,'#475569');
  
  // Double yellow divider lines
  for(let z=-28;z<=28;z+=4){
    box(-.12,.03,z,.08,.02,2.4,'#facc15');
    box(.12,.03,z,.08,.02,2.4,'#facc15');
    box(z,.03,-.12,2.4,.02,.08,'#facc15');
    box(z,.03,.12,2.4,.02,.08,'#facc15');
  }
  
  /* Streetlights with realistic PointLights illuminating pavement */
  for(let i=-4;i<=4;i+=2){
    if(i===0) continue;
    [-4.5,4.5].forEach(sx=>{
      const sz=i*6.5;
      cyl(sx,2.8,sz,.07,.07,5.6,'#94a3b8');
      box(sx+(sx>0?-.4:.4),5.4,sz,.9,.12,.12,'#94a3b8');
      sph(sx+(sx>0?-.7:.7),5.3,sz,.28,'#fef08a','#facc15');
      const sl=new T.PointLight(0xffedd5,1.1,12);
      sl.position.set(sx+(sx>0?-.7:.7),5.2,sz);
      SC.add(sl);
    });
  }
  
  /* Central Public Plaza with Fountain & Park */
  cyl(0,.3,0,5,5,.6,'#334155');
  const pool=cyl(0,.55,0,4.2,4.2,.3,'#0284c7','#0369a1');
  const jet=sph(0,2,0,.45,'#bae6fd','#38bdf8');
  dyn.push((dt,t)=>{
    if(!RM){
      pool.rotation.y+=dt*.2;
      jet.position.y=1.9+Math.sin(t*4)*.25;
      jet.scale.set(1+Math.sin(t*6)*.12, 1+Math.cos(t*6)*.15, 1+Math.sin(t*6)*.12);
    }
  });
  solid(0,0,5.2);
  
  /* Plaza decorative trees & comfortable benches */
  [[-6,6],[6,6],[-6,-6],[6,-6]].forEach(p=>{
    tree(p[0],p[1],.9);
    seat(p[0]>0?p[0]-1.6:p[0]+1.6, p[1], p[0]>0?-1.57:1.57);
  });
  
  /* Moving Vehicles / Cars with Headlights & Taillights */
  const cars=[
    {m:new T.Group(),dir:1,axis:'z',pos:-25,lane:1.8,col:'#ef4444'},
    {m:new T.Group(),dir:-1,axis:'z',pos:25,lane:-1.8,col:'#3b82f6'},
    {m:new T.Group(),dir:1,axis:'x',pos:-25,lane:-1.8,col:'#eab308'},
    {m:new T.Group(),dir:-1,axis:'x',pos:25,lane:1.8,col:'#10b981'}
  ];
  cars.forEach(car=>{
    const cg=car.m;
    box(0,.4,0,1.8,.6,3.6,car.col,null,cg);
    box(0,.8,-.2,1.5,.55,2,'#0f172a',null,cg); // Cabin/Glass
    // Headlights (warm white)
    box(-.6,.35,-1.82,.3,.2,.1,'#fef08a','#fef08a',cg);
    box(.6,.35,-1.82,.3,.2,.1,'#fef08a','#fef08a',cg);
    // Taillights (red)
    box(-.6,.35,1.82,.3,.2,.1,'#dc2626','#ef4444',cg);
    box(.6,.35,1.82,.3,.2,.1,'#dc2626','#ef4444',cg);
    // Wheels
    [-.95,.95].forEach(wx=>{
      [-1.1,1.1].forEach(wz=>{
        const wh=cyl(wx,.25,wz,.26,.26,.22,'#0f172a',null,cg);
        wh.rotation.z=1.57;
      });
    });
    SC.add(cg);
  });
  
  dyn.push((dt)=>{
    if(RM) return;
    cars.forEach(car=>{
      car.pos+=car.dir*11*dt;
      if(car.pos>32){ car.pos=-32; }
      else if(car.pos<-32){ car.pos=32; }
      if(car.axis==='z'){
        car.m.position.set(car.lane,0,car.pos);
        car.m.rotation.y=car.dir>0?0:Math.PI;
      } else {
        car.m.position.set(car.pos,0,car.lane);
        car.m.rotation.y=car.dir>0?1.57:-1.57;
      }
    });
  });

  inter.push({x:0,z:-6,r:3,label:'Touch the City Fountain',fn:()=>msg('✨ Sparkling water in Friends City Plaza')});
}},
{k:'beach',n:'Tropical Beach',e:'🏖️',d:'Sand, palms, loungers and a warm sunset sea.',sky:'#7dd3fc',b(){ground('#f2d49b',24);lights('#bae6fd','#d6b77a',.9,1);
 const sea=box(0,-.05,-34,90,.2,32,'#0ea5e9','#075985');dyn.push((dt,t)=>{if(!RM)sea.position.y=-.05+Math.sin(t)*.08;});sph(25,30,-50,5,'#fde047','#facc15');
 [[-14,-8],[-8,-14],[10,-10],[16,-4],[-18,4],[14,10]].forEach(p=>palm(p[0],p[1]));[[-4,4],[6,2],[0,10]].forEach(p=>{cyl(p[0],1.2,p[1],.05,.05,2.4,'#fff');cone(p[0],2.7,p[1],1.6,.9,'#ef4444');seat(p[0]+1.8,p[1],-1.57);});
 inter.push({x:0,z:-10,r:3,label:'Kick the beach ball',fn:()=>msg('⚽ Boing! The ball bounces into the sea.')});}},
{k:'gaming',n:'Gaming Lounge',e:'🎮',d:'Arcade cabinets, a giant screen and beanbags.',sky:'#0c0a1a',b(){ground('#14112a',20);lights('#6d28d9','#111',.5,.4);
 box(0,5,-19,16,7,.4,'#000','#4c1d95');for(let i=0;i<6;i++){const x=-15+i*6;box(x,1.4,-15,2,2.8,1.4,'#1e1b4b');const s=box(x,2,-14.2,1.5,1,.1,'#000',['#22d3ee','#f43f5e','#facc15','#22c55e','#a855f7','#fb923c'][i]);solid(x,-15,1.3);inter.push({x,z:-13,r:2,label:'Play arcade',fn:()=>{s.material=new T.MeshLambertMaterial({color:0,emissive:Math.floor(rnd()*0xffffff)});msg('🕹️ Score: '+Math.floor(rnd()*9000+1000));}});}
 for(let i=0;i<4;i++){cyl(-9+i*6,.5,4,1,1.1,1,['#ef4444','#3b82f6','#22c55e','#eab308'][i]);seat(-9+i*6,4,0,0);}
 [-19,19].forEach(x=>box(x,3,0,.3,.3,40,'#06b6d4','#06b6d4'));}},
{k:'club',n:'Neon Night Club',e:'🪩',d:'DJ stage, dance floor, light beams and a visualizer.',party:1,sky:'#05030f',b(){ground('#0a0714',20);lights('#7c3aed','#000',.35,.15);partyRig(0,-15,6);
 sph(0,10,4,1.2,'#e5e7eb','#6b7280');seat(-14,4,1.57);seat(14,4,-1.57);seat(-14,-4,1.57);seat(14,-4,-1.57);}},
{k:'park',n:'Virtual Park',e:'🌳',d:'Trees, a pond, benches and a walking path.',sky:'#93c5fd',b(){ground('#3f8f4a',26);lights('#e0f2fe','#2f6b3a',.9,1);
 box(0,.02,0,3,.05,52,'#d6c9a3');box(0,.02,0,52,.05,3,'#d6c9a3');cyl(-10,.05,-10,5,5,.12,'#38bdf8','#0369a1');solid(-10,-10,5);for(let i=0;i<12;i++)tree((rnd()-.5)*44,(rnd()-.5)*44,.8+rnd()*.6);
 seat(4,4,0);seat(-4,4,0);seat(4,-4,Math.PI);seat(-4,-4,Math.PI);for(let i=0;i<14;i++)sph((rnd()-.5)*40,.15,(rnd()-.5)*40,.18,['#f472b6','#facc15','#fff'][i%3]);
 inter.push({x:-6,z:-8,r:4,label:'Feed the ducks',fn:()=>msg('🦆 Quack! The ducks are happy.')});}},
{k:'space',n:'Space Station',e:'🚀',d:'A orbital platform overlooking a blue planet.',sky:'#02030a',b(){ground('#1f2937',18);stars(500);lights('#93c5fd','#111',.6,.8);
 sph(0,12,-70,26,'#1d4ed8','#1e3a8a');const r=mesh(new T.TorusGeometry(24,.6,8,48),'#94a3b8',0,3,0);r.rotation.x=1.57;[-12,12].forEach(x=>{box(x,5,10,8,.2,4,'#0ea5e9','#0c4a6e');});
 for(let i=0;i<3;i++){cyl(-8+i*8,1.5,-8,1.4,1.4,3,'#cbd5e1','#334155');solid(-8+i*8,-8,1.5);}seat(-4,6,0);seat(4,6,0);seat(0,-4,Math.PI);
 inter.push({x:0,z:-12,r:3,label:'Open airlock',fn:()=>msg('🛰️ Airlock cycling… all clear!')});}},
{k:'mansion',n:'Luxury Mansion',e:'🏰',d:'Marble hall, columns, a chandelier and a pool.',sky:'#1a1410',b(){ground('#e8dcc6',16);lights('#fde68a','#3b2f1f',.5,.5);
 for(let i=0;i<8;i++){const x=i%2?13:-13,z=-12+Math.floor(i/2)*8;cyl(x,4,z,.7,.7,8,'#fafaf9');solid(x,z,.8);}box(0,.03,-2,4,.05,24,'#991b1b');
 const L=new T.PointLight(0xffd27a,1.2,40);L.position.set(0,8,0);SC.add(L);const ch=mesh(new T.TorusGeometry(2,.15,8,24),'#fbbf24',0,8,0,'#f59e0b');ch.rotation.x=1.57;
 box(8,-.02,8,7,.1,6,'#0ea5e9','#0369a1');seat(-6,6,0);seat(-3,6,0);[-6,0,6].forEach(x=>box(x,5,-15.7,3,3.6,.2,'#7c2d12','#431407'));
 inter.push({x:0,z:0,r:3,label:'Toggle chandelier',fn:()=>{L.intensity=L.intensity>0?0:1.2;msg(L.intensity?'💡 Lights on':'Lights dimmed');}});}},
{k:'festival',n:'Festival Ground',e:'🎪',d:'Main stage, a ferris wheel, tents and string lights.',party:1,sky:'#3b1d5a',b(){ground('#2d3a2a',26);lights('#c4b5fd','#1f2a1c',.6,.4);partyRig(0,-18,0);
 const wh=mesh(new T.TorusGeometry(6,.25,8,32),'#f472b6',16,8,-6,'#be185d');for(let i=0;i<8;i++){const a=i*.785;sph(16+Math.cos(a)*6,8+Math.sin(a)*6,-6,.6,'#fde047','#ca8a04');}
 dyn.push((dt)=>{if(!RM)wh.rotation.z+=dt*.15;});cyl(16,4,-6,.3,.3,8,'#94a3b8');
 [[-14,-4],[-14,6],[14,8]].forEach((p,i)=>{cone(p[0],2.5,p[1],3,3,['#ef4444','#22d3ee','#facc15'][i]);solid(p[0],p[1],2.5);});
 for(let i=-12;i<=12;i+=2)sph(i,5.5+Math.sin(i)*.4,0,.18,'#fde68a','#fbbf24');seat(-6,8,Math.PI);seat(6,8,Math.PI);}},
{k:'lounge',n:'Movie Lounge',e:'🎬',d:'Sofa rows facing a huge screen with a popcorn bar.',sky:'#0b0f1a',b(){ground('#181327',18);lights('#818cf8','#111',.45,.3);
 const sc=box(0,6,-17.5,18,8,.4,'#000','#1e3a8a');dyn.push((dt,t)=>{if(!RM)sc.material.emissive.setHSL((t*.03)%1,.7,.25);});
 for(let r=0;r<3;r++)for(let c=0;c<5;c++)seat(-8+c*4,-6+r*5,0);box(-14,1,-12,2.4,2,1.4,'#b91c1c','#450a0a');solid(-14,-12,1.5);
 inter.push({x:-14,z:-10,r:2.5,label:'Grab popcorn',fn:()=>msg('🍿 Fresh popcorn!')});}},
{k:'plaza',n:'Social Plaza',e:'⛲',d:'A lively plaza: fountain, kiosks, seats and emotes.',sky:'#bae6fd',b(){ground('#cbd5e1',24);lights('#f0f9ff','#94a3b8',.9,.9);
 cyl(0,.4,0,4,4,.8,'#94a3b8');cyl(0,.7,0,3.4,3.4,.3,'#38bdf8','#0369a1');cyl(0,2,0,.4,.4,3,'#e2e8f0');sph(0,3.7,0,.6,'#7dd3fc','#0ea5e9');solid(0,0,4.2);
 for(let i=0;i<6;i++){const a=i*1.047,x=Math.cos(a)*9,z=Math.sin(a)*9;seat(x,z,-a-1.57);}
 [-16,0,16].forEach((x,i)=>{box(x,1.5,-18,4,3,3,['#f97316','#8b5cf6','#10b981'][i]);box(x,3.2,-18,4.6,.4,3.6,'#fff');solid(x,-18,2.5);inter.push({x,z:-15,r:2.5,label:'Talk to kiosk',fn:()=>msg(['☕ Today’s special: filter coffee!','🎟️ Tip: press 1-4 for emotes.','📍 Sit on any bench with E.'][i])});});
 for(let i=0;i<4;i++){const x=i<2?-14:14,z=i%2?10:-8;cyl(x,2.5,z,.1,.1,5,'#64748b');sph(x,5.2,z,.4,'#fef9c3','#fde047');}}}
];
/* ---------- avatar (Phase 3 fix: premium low-poly rig, shared material/texture caches) ---------- */
const AMAT={},TXC={};
function am(c,o){const k=c+(o?JSON.stringify(o):'');return AMAT[k]||(AMAT[k]=new T.MeshStandardMaterial(Object.assign({color:c,roughness:.7,metalness:0},o||{})));}
function ctex(kind){if(TXC[kind])return TXC[kind];const c2=document.createElement('canvas');c2.width=c2.height=64;const x=c2.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,64,64);
 if(kind==='cloth'){x.fillStyle='rgba(0,0,0,.07)';for(let i=0;i<64;i+=4){x.fillRect(0,i,64,1);x.fillRect(i,0,1,64);}}
 else if(kind==='skin'){const g=x.createRadialGradient(32,26,3,32,32,46);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(150,70,50,.16)');x.fillStyle=g;x.fillRect(0,0,64,64);}
 else{for(let i=0;i<64;i+=3){x.fillStyle=i%6?'rgba(0,0,0,.10)':'rgba(0,0,0,.22)';x.fillRect(i,0,1.5,64);}}
 const t=new T.CanvasTexture(c2);TXC[kind]=t;return t;}
const shade=(c,f)=>'#'+new T.Color(c).multiplyScalar(f).getHexString();
function makeAvatar(a){
  const g=new T.Group(),u=g.userData,sg=GFX==='low'?10:16;
  const isFem = (a.gender==='f' || a.style===1 || a.fit===3);
  const S=[{h:1,w:1,hs:1},{h:.97,w:.92,hs:.98},{h:1.06,w:1.05,hs:.94},{h:.85,w:1,hs:1.2},{h:1.03,w:1.08,hs:.96}][a.style]||{h:1,w:1,hs:1};
  const hh=S.h*.96, w=S.w, fit=a.fit|0, pc=a.pc||'#1f2937';
  
  // High-fidelity PBR skin & garment materials
  const sk=am(a.skin||'#f1c27d',{roughness:.52,metalness:.05,map:ctex('skin')});
  const ot=am(a.oc||'#8b5cf6',{map:ctex('cloth'),roughness:.78});
  const ot2=am(shade(a.oc||'#8b5cf6',.72),{map:ctex('cloth'),roughness:.82});
  const pt=am(pc,{map:ctex('cloth'),roughness:.82});
  const sh=am(shade(pc,.45),{roughness:.4,metalness:.15});
  const sole=am('#f8fafc',{roughness:.6});
  const hm=am(a.hc||'#3b2a1a',{roughness:.4,metalness:.1});
  const legM = (fit===3 && isFem) ? sk : pt;

  const M=(geo,mat,x,y,z,p,sx,sy,sz)=>{const m=new T.Mesh(geo,mat);m.position.set(x,y,z);if(sx)m.scale.set(sx,sy,sz);m.castShadow=true;m.receiveShadow=true;(p||g).add(m);return m;};
  const G=(x,y,z,p)=>{const o=new T.Group();o.position.set(x,y,z);(p||g).add(o);return o;};

  // Anatomical proportions (7.5-head human proportions)
  const th=.45*hh, sn=.44*hh, hip=th+sn+.085, tl=.54*hh, ua=.30*hh, fa=.29*hh;
  const hipWidth = isFem ? .115*w : .10*w;
  const shoulderWidth = isFem ? .18*w : .235*w;

  /* Legs & realistic sneakers */
  const leg=sx=>{
    const Lg=G(sx*hipWidth,hip,0);
    M(new T.CylinderGeometry(.074*w,.058*w,th,sg),legM,0,-th/2,0,Lg);
    const k=G(0,-th,0,Lg);
    M(new T.SphereGeometry(.058*w,sg,8),legM,0,0,0,k);
    M(new T.CylinderGeometry(.056*w,.042*w,sn,sg),legM,0,-sn/2,0,k);
    const f=G(0,-sn,0,k);
    // Designer sneaker: shoe body + cushioned sole + toe cap
    M(new T.BoxGeometry(.102*w,.055,.26),sh,0,-.052,.05,f);
    M(new T.BoxGeometry(.11*w,.024,.28),sole,0,-.074,.05,f);
    M(new T.SphereGeometry(.05*w,sg,6),sole,0,-.045,.14,f,1,.7,1);
    return {L:Lg,k};
  };
  const lL=leg(-1),lR=leg(1);
  u.legL=lL.L;u.kneeL=lL.k;u.legR=lR.L;u.kneeR=lR.k;

  /* Pelvis & Torso */
  const tor=G(0,hip,0);
  const ch=G(0,.1*hh,0,tor);
  const pel = (fit===3 && isFem) ? ot : pt;
  M(new T.CylinderGeometry(isFem?.15*w:.16*w, isFem?.17*w:.155*w, .16*hh, sg),pel,0,.02,0,tor,1,1,.72);

  // Upper Torso / Chest with male/female contours
  const tm = fit===2 ? am(shade(a.oc,.85),{map:ctex('cloth'),roughness:.78}) : ot;
  if(isFem){
    M(new T.CylinderGeometry(.165*w,.14*w,tl,sg),tm,0,tl/2,0,ch,1,1,.65);
    // Graceful feminine contouring
    M(new T.SphereGeometry(.065*w,sg,8),tm,-.065*w,tl*.62,.06,ch,1,1,.8);
    M(new T.SphereGeometry(.065*w,sg,8),tm,.065*w,tl*.62,.06,ch,1,1,.8);
  } else {
    M(new T.CylinderGeometry(.21*w,.155*w,tl,sg),tm,0,tl/2,0,ch,1,1,.64);
  }

  // Realistic outfit styling accents
  if(fit===1){ // Hoodie
    M(new T.TorusGeometry(.11*w,.045,8,sg),ot2,0,tl-.01,-.04,ch).rotation.x=1.25;
    M(new T.BoxGeometry(.19*w,.12,.03),ot2,0,.22*hh,.09,ch);
  } else if(fit===2){ // Jacket with zipper
    M(new T.BoxGeometry(.012,tl*.94,.015),am('#e2e8f0',{metalness:.8}),0,tl/2,.096,ch);
    M(new T.BoxGeometry(.21*w,.05,.1),ot2,0,tl-.02,0,ch);
  } else if(fit===4){ // Formal suit & tie
    M(new T.BoxGeometry(.09*w,.32*hh,.012),am('#fff'),0,tl*.64,.1,ch);
    M(new T.BoxGeometry(.028,.26*hh,.015),am('#dc2626'),0,tl*.6,.108,ch);
  } else if(fit===3){ // Chic Dress
    M(new T.CylinderGeometry(.16*w,.32*w,.38*hh,sg+4),ot,0,-.18*hh,0,tor,1,1,.82);
  }

  // Realistic neck
  M(new T.CylinderGeometry(.046*w,.052*w,.09*hh,sg),sk,0,tl+.03,0,ch);

  /* Realistic Arms & Hands */
  const arm=sx=>{
    const A=G(sx*shoulderWidth,tl-.04,0,ch);
    M(new T.SphereGeometry(.062*w,sg,8),fit===0||fit===3?sk:ot,0,0,0,A);
    M(new T.CylinderGeometry(.048*w,.04*w,ua,sg),sk,0,-ua/2,0,A);
    const long=(fit===1||fit===2||fit===4);
    const sl=long?ua:ua*.48;
    M(new T.CylinderGeometry(.054*w,.046*w*(long?.9:1),sl,sg),ot,0,-sl/2,0,A);
    const E=G(0,-ua,0,A);
    M(new T.SphereGeometry(.04*w,sg,6),long?ot2:sk,0,0,0,E);
    M(new T.CylinderGeometry(.039*w,.031*w,fa,sg),long?ot2:sk,0,-fa/2,0,E);
    // Realistic hand with thumb
    const hand=G(0,-fa-.02,0,E);
    M(new T.BoxGeometry(.052*w,.065,.028),sk,0,-.02,0,hand);
    M(new T.BoxGeometry(.022*w,.035,.02),sk,sx*.032*w,-.01,.015,hand).rotation.z=sx*.35;
    return {A,E};
  };
  const aL=arm(-1),aR=arm(1);
  u.armL=aL.A;u.elbowL=aL.E;u.armR=aR.A;u.elbowR=aR.E;

  /* Realistic Head & Facial Anatomy */
  const hd=G(0,tl+.08,0,ch);
  const r=.148*S.hs;
  
  // Head skull & contoured jaw
  M(new T.SphereGeometry(r,sg+4,sg),sk,0,r*.95,0,hd,.94,1.08,.98);
  M(new T.SphereGeometry(r*.7,sg,6),sk,0,r*.52,r*.25,hd,.85,.85,.85); // Jawline

  const wh=am('#ffffff',{roughness:.2});
  const ir=am(a.eye||'#2b1b12',{roughness:.25});
  const lipMat=am(isFem?'#c026d3':'#9f2d3b',{roughness:.4});
  
  // Proportional eyes with sclera, iris, specular glint
  [-1,1].forEach(s=>{
    // Eye whites
    M(new T.SphereGeometry(r*.16,8,6),wh,s*r*.34,r*1.04,r*.85,hd,1,1.08,.55);
    // Iris
    M(new T.SphereGeometry(r*.085,8,6),ir,s*r*.34,r*1.04,r*.92,hd,1,1.08,.4);
    // Highlight glint
    M(new T.SphereGeometry(r*.024,6,4),am('#fff'),s*r*.31,r*1.08,r*.95,hd);
    // Eyebrows
    const b=M(new T.BoxGeometry(r*.3,r*.048,r*.05),hm,s*r*.35,r*1.28,r*.89,hd);
    b.rotation.z=-s*.12;
    // Cheeks
    M(new T.SphereGeometry(r*.11,8,6),am('#f9a8a8',{transparent:true,opacity:.3}),s*r*.54,r*.78,r*.81,hd,1,.6,.3);
    // Ears
    M(new T.SphereGeometry(r*.12,8,6),sk,s*r*.96,r*.95,-r*.05,hd,.45,1,.65);
  });

  // Sculpted 3D nose
  M(new T.ConeGeometry(r*.075,r*.32,6),sk,0,r*.92,r*1.01,hd,1,1,.6).rotation.x=-.2;
  // Natural lips
  const mo=M(new T.TorusGeometry(r*.15,r*.022,6,12,Math.PI),lipMat,0,r*.68,r*.91,hd);
  mo.rotation.z=Math.PI;

  /* Realistic Hairstyles (0 to 6) */
  const hr=a.hair|0;
  const shell=k=>{const m=M(new T.SphereGeometry(r*k,sg+4,sg,0,Math.PI*2,0,Math.PI*.58),hm,0,r*.97,0,hd);m.rotation.x=-.38;return m;};
  if(hr===0){ // Modern Fade / Textured Crop
    shell(1.04);
  } else if(hr===1){ // Side Part / Classic Executive
    shell(1.07);
    const sweep=M(new T.BoxGeometry(r*.9,r*.24,r*1.1),hm,r*.15,r*1.85,0,hd);
    sweep.rotation.z=-.18;
  } else if(hr===2){ // Modern Spiky / Textured Quiff
    shell(1.05);
    for(let i=0;i<8;i++){
      const c=M(new T.ConeGeometry(r*.16,r*.52,6),hm,(i-3.5)*r*.26,r*2.05-Math.abs(i-3.5)*r*.1,r*.06,hd);
      c.rotation.z=-(i-3.5)*.16;
    }
  } else if(hr===3){ // Flowing Long Locks
    shell(1.08);
    M(new T.CylinderGeometry(r*.96,r*.74,r*2.4,sg),hm,0,r*.08,-r*.44,hd,1,1,.52);
    [-1,1].forEach(s=>M(new T.CylinderGeometry(r*.15,r*.11,r*1.6,6),hm,s*r*.96,r*.52,r*.08,hd));
  } else if(hr===4){ // Sleek High Ponytail
    shell(1.06);
    M(new T.SphereGeometry(r*.3,8,6),hm,0,r*1.42,-r*1.04,hd);
    const c=M(new T.ConeGeometry(r*.24,r*1.65,8),hm,0,r*.52,-r*1.22,hd);
    c.rotation.x=Math.PI+.15;
  } else if(hr===5){ // Voluminous Curls / Waves
    for(let i=0;i<16;i++){
      const an=i/16*Math.PI*2;
      M(new T.SphereGeometry(r*.32,7,6),hm,Math.cos(an)*r*.84,r*1.48+(i%2)*r*.09,Math.sin(an)*r*.84-r*.1,hd);
    }
    M(new T.SphereGeometry(r*.52,8,6),hm,0,r*1.82,-r*.1,hd);
  } else if(hr===6){ // Elegant Top Bun
    shell(1.06);
    M(new T.SphereGeometry(r*.4,8,6),hm,0,r*2.1,-r*.1,hd);
  }

  /* Accessories (Glasses, Cap, Crown, Headphones, Sunglasses) */
  const ac=a.acc|0;
  if(ac===1){ // Glasses
    [-1,1].forEach(s=>M(new T.TorusGeometry(r*.22,.012,6,14),am('#111827',{metalness:.6}),s*r*.34,r*1.04,r*.97,hd));
    M(new T.BoxGeometry(r*.2,.012,.012),am('#111827'),0,r*1.06,r*.98,hd);
  } else if(ac===5){ // Sunglasses
    [-1,1].forEach(s=>M(new T.BoxGeometry(r*.42,r*.26,r*.05),am('#09090b',{roughness:.2,metalness:.5}),s*r*.34,r*1.04,r*.98,hd));
    M(new T.BoxGeometry(r*.3,.014,.014),am('#09090b'),0,r*1.1,r*.99,hd);
  } else if(ac===2){ // Cap
    const cp=M(new T.SphereGeometry(r*1.12,sg+4,sg,0,Math.PI*2,0,Math.PI*.5),ot,0,r*1.05,0,hd);
    cp.rotation.x=-.12;
    const vs=M(new T.BoxGeometry(r*1.5,r*.05,r*.8),ot2,0,r*1.12,r*1.05,hd);
    vs.rotation.x=.18;
  } else if(ac===3){ // Crown
    const gm=am('#fbbf24',{metalness:.75,roughness:.25,emissive:'#7c4a03',emissiveIntensity:.4});
    M(new T.CylinderGeometry(r*.85,r*.95,r*.3,sg),gm,0,r*2.05,0,hd);
    for(let i=0;i<5;i++){
      const an=i/5*Math.PI*2;
      M(new T.ConeGeometry(r*.14,r*.34,5),gm,Math.cos(an)*r*.82,r*2.35,Math.sin(an)*r*.82,hd);
    }
  } else if(ac===4){ // Headphones
    M(new T.TorusGeometry(r*1.12,.028,6,sg+4,Math.PI),am('#111827'),0,r*.98,0,hd);
    [-1,1].forEach(s=>{
      const c=M(new T.CylinderGeometry(r*.3,r*.3,r*.2,sg),am('#111827'),s*r*1.1,r*.95,0,hd);
      c.rotation.z=Math.PI/2;
      const rg=M(new T.TorusGeometry(r*.22,.012,6,sg),am(a.oc,{emissive:a.oc,emissiveIntensity:.6}),s*r*1.21,r*.95,0,hd);
      rg.rotation.y=Math.PI/2;
    });
  }

  // Soft contact shadow
  const bl=new T.Mesh(new T.CircleGeometry(.42*w,16),new T.MeshBasicMaterial({color:0,transparent:true,opacity:.28,depthWrite:false}));
  bl.rotation.x=-Math.PI/2;bl.position.y=.015;g.add(bl);

  u.torso=tor;u.chest=ch;u.head=hd;u.blob=bl;u.hip=hip;u.leg=th+sn;
  u.top=hip+.1*hh+tl+.05+r*2.1;u.eye=hip+.1*hh+tl+.05+r*1.0;
  return g;
}
function label(name){const c=document.createElement('canvas');c.width=256;c.height=64;const x=c.getContext('2d');x.fillStyle='rgba(0,0,0,.55)';x.fillRect(0,8,256,48);x.fillStyle='#fff';x.font='bold 28px sans-serif';x.textAlign='center';x.fillText(String(name).slice(0,14),128,42);
 const s=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(c),transparent:true,depthTest:false}));s.scale.set(2.2,.55,1);return s;}
/* animation: every channel is eased toward its target, so idle/walk/run/turn/sit/emotes blend smoothly */
function pose(av,an,t,sp,dt){const u=av.userData;if(!u.leg)return;dt=dt||.016;const c=u.c||(u.c={}),L=u.leg,run=an==='run',tv=(P&&P.tv)||0;
 const z={lt:0,lk:0,rt:0,rk:0,la:0,le:-.12,ra:0,re:-.12,lz:.06,rz:.06,by:0,lean:0,tw:0,roll:0,hx:0,hy:0,br:0,base:0};
 if(an==='walk'||run){const f=run?12.5:9,a=(run?.9:.55)*Math.min(1,Math.max(.55,sp||1)),p=t*f,s=Math.sin(p);
  z.lt=s*a;z.rt=-s*a;z.lk=Math.max(0,-Math.cos(p))*a*1.25;z.rk=Math.max(0,Math.cos(p))*a*1.25;z.la=-s*a*.85;z.ra=s*a*.85;z.le=-(run?.9:.3)-Math.max(0,s)*.2;z.re=-(run?.9:.3)-Math.max(0,-s)*.2;
  z.tw=-s*(run?.22:.12);z.lean=run?.28:.07;z.by=-L*(1-Math.cos(Math.abs(s)*a))+(run?Math.abs(Math.cos(p))*.05:0);z.lz=z.rz=.1;}
 else if(an==='sit'){z.lt=z.rt=-1.5;z.lk=z.rk=1.5;z.la=z.ra=-.45;z.le=z.re=-.9;z.lean=-.05;z.base=(P&&P.sit?P.sit.y+.1:.6)-u.hip;}
 else if(an==='wave'){z.rz=2.5+Math.sin(t*9)*.25;z.re=-.9+Math.sin(t*9)*.5;z.hy=.2;}
 else if(an==='dance'){const b=Math.abs(Math.sin(t*7)),s=Math.sin(t*7);z.by=b*.14;z.lz=1.5+s*.7;z.rz=1.5-s*.7;z.lt=s*.5;z.rt=-s*.5;z.lk=z.rk=b*.6;z.tw=Math.sin(t*3.5)*.35;z.roll=Math.sin(t*3.5)*.12;z.hy=Math.sin(t*3.5)*.3;z.le=z.re=-.5;}
 else if(an==='cheer'){z.by=Math.abs(Math.sin(t*6))*.12;z.lz=z.rz=2.7;z.lk=z.rk=.3;z.hx=-.2;}
 else if(an==='jump'){z.by=Math.abs(Math.sin(t*5))*.7;z.lt=z.rt=-.3;z.lk=z.rk=.9;z.lz=z.rz=1.2;}
 else{z.br=Math.sin(t*1.8)*.015;z.la=Math.sin(t*1.5)*.04;z.ra=-z.la;z.hy=Math.sin(t*.55)*.22;z.hx=Math.sin(t*.8)*.03;}
 if(an==='walk'||run){z.roll=Math.max(-.25,Math.min(.25,-tv*.035));z.hy=Math.max(-.4,Math.min(.4,tv*.06));}
 const k=1-Math.exp(-dt*(an==='walk'||run?18:12));for(const n in z)c[n]=(c[n]||0)+(z[n]-(c[n]||0))*k;
 u.legL.rotation.x=c.lt;u.legR.rotation.x=c.rt;u.kneeL.rotation.x=c.lk;u.kneeR.rotation.x=c.rk;u.armL.rotation.set(c.la,0,-c.lz);u.armR.rotation.set(c.ra,0,c.rz);u.elbowL.rotation.x=c.le;u.elbowR.rotation.x=c.re;
 u.torso.rotation.set(c.lean,c.tw,c.roll);u.head.rotation.set(c.hx-c.lean*.6,c.hy,0);u.chest.scale.set(1+c.br*.5,1+c.br,1+c.br*.5);av.position.y=c.base+c.by;if(u.blob)u.blob.position.y=.015-av.position.y;}
/* ---------- scenes ---------- */
function bgFor(c){SC.background=new T.Color(c);SC.fog=new T.Fog(c,40,110);}
function spawn(){P={g:makeAvatar(AV),x:0,z:8,ry:Math.PI,emo:null,sit:null};P.g.add((l=>{l.position.y=(P.g.userData.top||2.2)+.45;return l;})(label(AV.name)));SC.add(P.g);}
function studio(){clearScene();mode='studio';bgFor('#0d0b1c');SC.add(new T.HemisphereLight(0xc4b5fd,0x1e1b4b,1));const d=new T.DirectionalLight(0xffffff,.8);d.position.set(3,6,5);SC.add(d);
 cyl(0,-.05,0,1.6,1.6,.1,'#312e81','#1e1b4b');spawn();P.x=0;P.z=0;yaw=0;pitch=.12;dist=3.8;ui();}
function world(k){const w=W.find(x=>x.k===k);if(!w)return;clearScene();mode='world';cur=w;sd=11;bgFor(w.sky);w.b();spawn();P.x=0;P.z=w===W[3]?10:8;yaw=0;pitch=.35;dist=9;
 $v('vwTitle').textContent=w.e+' '+w.n;msg(w.d);ui();bind();start();netSend({t:'vw',k:'cfg',av:AV});}
const FURN={bed:['🛏️ Bed',1.3,1.8,(g,M)=>{M(2,.5,3.4,'#e2e8f0',0,.25,0);M(2,.9,.3,'#7c3aed',0,.55,-1.6);}],sofa:['🛋️ Sofa',1.5,.8,(g,M)=>{M(3,.6,1.3,'#4f46e5',0,.3,0);M(3,.7,.3,'#4338ca',0,.75,-.5);}],table:['🪑 Table',1,1,(g,M)=>{M(1.8,.1,1.8,'#a16207',0,.8,0);[[-.7,-.7],[.7,-.7],[-.7,.7],[.7,.7]].forEach(p=>M(.12,.8,.12,'#78350f',p[0],.4,p[1]));}],lamp:['💡 Lamp',.4,.4,(g,M)=>{M(.1,1.8,.1,'#64748b',0,.9,0);M(.6,.5,.6,'#fde68a',0,2,0,'#facc15');}],plant:['🪴 Plant',.5,.5,(g,M)=>{M(.6,.5,.6,'#b45309',0,.25,0);M(1,1,1,'#16a34a',0,1.1,0);}],tv:['📺 TV',1.2,.4,(g,M)=>{M(2.4,.8,.4,'#78350f',0,.4,0);M(2.2,1.3,.1,'#000',0,1.5,0,'#1d4ed8');}],rug:['🟣 Rug',1.6,1.6,(g,M)=>{M(3,.04,3,'#c026d3',0,.03,0);}],shelf:['📚 Shelf',1,.4,(g,M)=>{M(2,2.2,.5,'#92400e',0,1.1,0);for(let i=0;i<3;i++)M(1.7,.1,.4,'#d6a96a',0,.5+i*.6,.05);}]};
const RT=[['Cozy','#c9a27e','#8b5a2b',1],['Neon','#1e1b4b','#0f172a',1.3],['Minimal','#f1f5f9','#cbd5e1',1],['Ocean','#7dd3fc','#0369a1',1.1],['Sunset','#fdba74','#7c2d12',1.2]];
const RDEF={wall:'#c9a27e',floor:'#8b5a2b',lamp:1,items:[]};
function mkFurn(it){const g=new T.Group(),F=FURN[it.k];F[3](g,(w,hh,d,c,x,y,z,e)=>{const m=new T.Mesh(new T.BoxGeometry(w,hh,d),new T.MeshLambertMaterial(e?{color:c,emissive:e}:{color:c}));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;g.add(m);});g.position.set(it.x,0,it.z);g.rotation.y=it.r||0;g.userData.it=it;SC.add(g);return g;}
function roomScene(){clearScene();mode='room';bgFor('#0d0b1c');const st=LS.g('fwp-vw-room',null);room=Object.assign({},RDEF,st||{});room.items=(room.items||[]).filter(i=>i&&FURN[i.k]&&isFinite(i.x)&&isFinite(i.z)).slice(0,40);room.groups=[];room.sel=null;
 SC.add(new T.AmbientLight(0xffffff,.5));room.pl=new T.PointLight(0xffffff,room.lamp,40);room.pl.position.set(0,7,0);SC.add(room.pl);
 room.fm=mesh(new T.BoxGeometry(12,.2,12),new T.MeshLambertMaterial({color:room.floor}),0,-.1,0);room.w1=mesh(new T.BoxGeometry(12,6,.2),new T.MeshLambertMaterial({color:room.wall}),0,3,-6);room.w2=mesh(new T.BoxGeometry(.2,6,12),new T.MeshLambertMaterial({color:room.wall}),-6,3,0);
 room.ring=new T.Mesh(new T.RingGeometry(1,1.2,24),new T.MeshBasicMaterial({color:0xfacc15,side:2}));room.ring.rotation.x=-1.57;room.ring.position.y=.05;room.ring.visible=false;SC.add(room.ring);
 room.items.forEach(i=>room.groups.push(mkFurn(i)));yaw=.7;pitch=.65;dist=15;ui();bind();start();netSend({t:'vw',k:'cfg',av:AV});}
function roomSave(){LS.s('fwp-vw-room',{wall:room.wall,floor:room.floor,lamp:room.lamp,items:room.items});msg('💾 Room saved on this device');}
/* ---------- loop, input ---------- */
function stepP(dt,t){if(!P)return;let ix=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0)+joy.x,iy=(keys.w||keys.arrowup?1:0)-(keys.s||keys.arrowdown?1:0)+joy.y;const m=Math.hypot(ix,iy);
 if(m>.1){if(P.sit)P.sit=null;P.emo=null;const n=Math.min(m,1),rn=!!(keys.shift||(TOUCH&&n>.92)),sp=(rn?7:4.2)*n,fx=-Math.sin(yaw),fz=-Math.cos(yaw),rx=Math.cos(yaw),rz=-Math.sin(yaw),mx=(fx*iy+rx*ix)/m,mz=(fz*iy+rz*ix)/m;
  P.x+=mx*sp*dt;P.z+=mz*sp*dt;const ta=Math.atan2(mx,mz);let d=ta-P.ry;d=Math.atan2(Math.sin(d),Math.cos(d));P.ry+=d*Math.min(1,dt*12);P.tv=Math.max(-10,Math.min(10,(P.tv||0)*.8+(d/Math.max(dt,.001))*.2));
  const r=Math.hypot(P.x,P.z);if(r>bound){P.x*=bound/r;P.z*=bound/r;}solids.forEach(s=>{const dx=P.x-s.x,dz=P.z-s.z,dd=Math.hypot(dx,dz),mn=s.r+.45;if(dd<mn&&dd>0){P.x=s.x+dx/dd*mn;P.z=s.z+dz/dd*mn;}});P.an=rn?'run':'walk';P.sp=n;}
 else{P.tv=(P.tv||0)*.85;P.an=P.sit?'sit':P.emo&&P.emo.until>performance.now()?P.emo.k:'idle';}
 if(P.sit){P.x=P.sit.x;P.z=P.sit.z;P.ry=P.sit.ry;}P.g.position.x=P.x;P.g.position.z=P.z;P.g.rotation.y=P.ry;pose(P.g,P.an,t,P.sp||1,dt);
 const nr=near();const b=$v('vwAct');if(b){b.textContent=P.sit?'Stand':nr?nr.label:'—';b.disabled=!P.sit&&!nr;}}
function near(){let b=null,bd=2.4;seats.forEach(s=>{const d=Math.hypot(s.x-P.x,s.z-P.z);if(d<bd){bd=d;b={label:'Sit',s};}});inter.forEach(i=>{const d=Math.hypot(i.x-P.x,i.z-P.z);if(d<Math.max(bd,i.r||2)&&d<(i.r||2)){bd=d;b={label:i.label,i};}});return b;}
function act(){if(!P)return;if(P.sit){P.sit=null;return;}const n=near();if(!n)return;if(n.s)P.sit={x:n.s.x,z:n.s.z,ry:n.s.ry,y:n.s.y};else n.i.fn();}
function emote(k){if(!P)return;P.sit=null;P.emo={k,until:performance.now()+(k==='dance'?7000:3000)};$v('vwEmo').hidden=true;}
function cam(){const k=snap?1:1-Math.exp(-lastDt*(locked?32:18));snap=0;cyaw+=(yaw-cyaw)*k;cpitch+=(pitch-cpitch)*k;cdist+=(dist-cdist)*k;
 const fp=mode==='world'&&view==='first'&&!!P;if(P)P.g.visible=!fp;
 if(fp){const ex=P.x,ey=(P.g.position.y||0)+(P.g.userData.eye||1.6),ez=P.z,cp=Math.cos(cpitch),dx=-Math.sin(cyaw)*cp,dy=-Math.sin(cpitch),dz=-Math.cos(cyaw)*cp;CAM.position.set(ex+dx*.12,ey,ez+dz*.12);CAM.lookAt(ex+dx*5,ey+dy*5,ez+dz*5);return;}
 const tx=mode==='room'?0:P?P.x:0,ty=mode==='studio'?1.05:1.5,tz=mode==='room'?0:P?P.z:0;let cy=ty+Math.sin(cpitch)*cdist;if(mode==='world')cy=Math.max(.4,cy);
 CAM.position.set(tx+Math.sin(cyaw)*Math.cos(cpitch)*cdist,cy,tz+Math.cos(cyaw)*Math.cos(cpitch)*cdist);CAM.lookAt(tx,ty,tz);}
function loop(){RAF=requestAnimationFrame(loop);const dt=Math.min(clock.getDelta(),.05),t=clock.elapsedTime;lastDt=dt;
 if(mode==='studio'&&P){P.g.rotation.y+=dt*(RM?0:.8);pose(P.g,pvAn,t,1,dt);}else if(mode==='world')stepP(dt,t);
 netTick(dt,t);
 dyn.slice().forEach(f=>f(dt,t));cam(t);R.render(SC,CAM);}
function start(){if(RAF||!R||document.hidden||!active)return;clock.getDelta();RAF=requestAnimationFrame(loop);}
function stop(){cancelAnimationFrame(RAF);RAF=0;if(AC&&AC.state==='running')AC.suspend();}
const kd=e=>{if(/INPUT|SELECT|TEXTAREA/.test((e.target||{}).tagName))return;const k=e.key.toLowerCase();keys[k]=1;if(k==='e')act();if(k==='v'&&mode==='world')setView(view==='first'?'third':'first');if((k==='['||k===']')&&mode!=='studio')bumpSens(k===']'?.1:-.1);if(k==='escape'&&locked&&document.exitPointerLock)document.exitPointerLock();if(k===' '){e.preventDefault();emote('jump');}if('1234'.includes(k)&&k)emote(['wave','dance','cheer','jump'][+k-1]);if(mode==='room'&&k==='r')roomRot();if(mode==='room'&&(k==='delete'||k==='backspace'))roomDel();if(/^arrow/.test(k))e.preventDefault();},ku=e=>{keys[e.key.toLowerCase()]=0;};
let ptr=null;
const lim=()=>mode==='world'&&view==='first'?[-1.25,1.25]:mode==='world'?[.05,1.3]:[.08,1.3];
function look(dx,dy,f){yaw-=dx*f*sens;const l=lim();pitch=Math.max(l[0],Math.min(l[1],pitch+dy*f*sens*.85));}
const pd=e=>{lastType=e.pointerType||'mouse';lastMoved=0;if(mode==='room'&&roomPick(e))return;ptr={id:e.pointerId,x:e.clientX,y:e.clientY};cv.setPointerCapture&&cv.setPointerCapture(e.pointerId);hint();},
pm=e=>{if(drag&&e.pointerId===drag.id){roomDrag(e);return;}
 if(locked&&mode==='world'){const dx=e.movementX||0,dy=e.movementY||0;if(Math.abs(dx)>150||Math.abs(dy)>150)return;look(dx,dy,.0022);return;}
 if(!ptr||e.pointerId!==ptr.id||mode==='studio')return;const dx=e.clientX-ptr.x,dy=e.clientY-ptr.y;lastMoved+=Math.abs(dx)+Math.abs(dy);look(dx,dy,e.pointerType==='mouse'?.005:.0065);ptr.x=e.clientX;ptr.y=e.clientY;},
pu=e=>{if(ptr&&e.pointerId===ptr.id)ptr=null;if(drag&&e.pointerId===drag.id)drag=null;},
ck=()=>{if(mode==='world'&&lastType==='mouse'&&!locked&&lastMoved<6)lockReq();},
wh=e=>{e.preventDefault();if(mode==='world'&&view==='first')return;dist=Math.max(4,Math.min(22,dist+e.deltaY*.01));},
plc=()=>{locked=document.pointerLockElement===cv?1:0;ptr=null;hint();},
ple=()=>{locked=0;msg('Mouse capture is not available here — drag with the mouse to look around.');hint();},
blr=()=>{keys={};},tmv=e=>{if(mode)e.preventDefault();};
function lockReq(){if(!cv.requestPointerLock||document.pointerLockElement===cv)return;try{const r=cv.requestPointerLock();if(r&&r.catch)r.catch(()=>{});}catch(e){ple();}}
function bumpSens(d){sens=Math.max(.3,Math.min(2.5,Math.round((sens+d)*10)/10));LS.s('fwp-vw-sens',sens);const x=$v('vwSens');if(x)x.value=sens;const v=$v('vwSensV');if(v)v.textContent=sens.toFixed(1)+'×';msg('Sensitivity '+sens.toFixed(1)+'×');}
function hint(){const e=$v('vwHint');if(!e)return;e.hidden=!(mode==='world'||mode==='room');e.textContent=mode==='room'?'Drag empty space to look around · wheel to zoom':(TOUCH&&lastType!=='mouse')?'Drag to look · left stick to move':locked?'Mouse captured · ESC to release':'Click to look around | ESC to release';}
function vbtn(){const b=$v('vwView');if(b)b.textContent=view==='first'?'🧍 Third person':'👁 First person';}
function setView(v){view=v==='first'?'first':'third';LS.s('fwp-vw-view',view);const l=lim();pitch=Math.max(l[0],Math.min(l[1],view==='first'?0:.35));if(view==='third')dist=Math.max(dist,6);vbtn();msg(view==='first'?'First-person view':'Third-person view');}
function resetCam(){if(mode==='world'&&P){yaw=P.ry+Math.PI;pitch=view==='first'?0:.35;dist=9;}else if(mode==='room'){yaw=.7;pitch=.65;dist=15;}msg('Camera reset');}
function bind(){unbind();addEventListener('keydown',kd);addEventListener('keyup',ku);addEventListener('blur',blr);cv.addEventListener('pointerdown',pd);cv.addEventListener('pointermove',pm);cv.addEventListener('pointerup',pu);cv.addEventListener('pointercancel',pu);cv.addEventListener('click',ck);cv.addEventListener('wheel',wh,{passive:false});stage.addEventListener('touchmove',tmv,{passive:false});document.addEventListener('pointerlockchange',plc);document.addEventListener('pointerlockerror',ple);hint();}
function unbind(){removeEventListener('keydown',kd);removeEventListener('keyup',ku);removeEventListener('blur',blr);cv&&['pointerdown','pointermove','pointerup','pointercancel','click'].forEach((n,i)=>cv.removeEventListener(n,[pd,pm,pu,pu,ck][i]));cv&&cv.removeEventListener('wheel',wh);stage&&stage.removeEventListener('touchmove',tmv);document.removeEventListener('pointerlockchange',plc);document.removeEventListener('pointerlockerror',ple);
 if(document.pointerLockElement&&document.exitPointerLock)document.exitPointerLock();locked=0;keys={};joy={x:0,y:0};ptr=drag=null;}
/* room editing */
function ndc(e){const r=cv.getBoundingClientRect();return new T.Vector2((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);}
function roomPick(e){const rc=new T.Raycaster();rc.setFromCamera(ndc(e),CAM);const hit=rc.intersectObjects(room.groups,true)[0];if(!hit)return false;let o=hit.object;while(o&&!o.userData.it)o=o.parent;if(!o)return false;room.sel=o;room.ring.visible=true;drag={id:e.pointerId};cv.setPointerCapture&&cv.setPointerCapture(e.pointerId);ringUp();return true;}
function roomDrag(e){const rc=new T.Raycaster();rc.setFromCamera(ndc(e),CAM);const p=new T.Vector3();if(rc.ray.intersectPlane(new T.Plane(new T.Vector3(0,1,0),0),p)){const o=room.sel,it=o.userData.it;it.x=Math.max(-5.2,Math.min(5.2,p.x));it.z=Math.max(-5.2,Math.min(5.2,p.z));o.position.set(it.x,0,it.z);ringUp();}}
function ringUp(){const o=room.sel;if(o){room.ring.position.x=o.position.x;room.ring.position.z=o.position.z;}}
function roomAdd(k){if(room.items.length>=40){msg('Room is full (40 items).');return;}const it={k,x:0,z:0,r:0};room.items.push(it);const g=mkFurn(it);room.groups.push(g);room.sel=g;room.ring.visible=true;ringUp();}
function roomRot(){if(!room||!room.sel)return;const it=room.sel.userData.it;it.r=((it.r||0)+Math.PI/4)%(Math.PI*2);room.sel.rotation.y=it.r;}
function roomDel(){if(!room||!room.sel)return;const o=room.sel;room.items.splice(room.items.indexOf(o.userData.it),1);room.groups.splice(room.groups.indexOf(o),1);SC.remove(o);o.traverse(m=>{if(m.geometry)m.geometry.dispose();if(m.material)m.material.dispose();});room.sel=null;room.ring.visible=false;}
/* ---------- UI ---------- */
function field(lbl,node){const d=h('label','vw-f');d.append(h('span','',lbl),node);return d;}
function sel(opts,val,fn){const s=h('select');opts.forEach((o,i)=>{const op=h('option','',o);op.value=i;s.appendChild(op);});s.value=val;s.onchange=()=>fn(+s.value);return s;}
function sw(cols,val,fn){const d=h('div','vw-sw');cols.forEach(c=>{const b=h('button',c===val?'on':'');b.style.background=c;b.setAttribute('aria-label',c);b.onclick=()=>{d.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');fn(c);};d.appendChild(b);});return d;}
function ui(){snap=1;const p=$v('vwPanel');p.innerHTML='';$v('vwBack').hidden=mode==='studio';$v('vwCtl').hidden=mode!=='world';$v('vwFx').hidden=!(cur&&cur.party);$v('vwMus').hidden=!(cur&&cur.party);$v('vwJoy').hidden=!TOUCH;{const cm=$v('vwCam');if(cm)cm.hidden=mode==='studio';const vb=$v('vwView');if(vb)vb.hidden=mode!=='world';vbtn();hint();if(mode==='world'){const l=lim();pitch=view==='first'?0:Math.max(l[0],Math.min(l[1],pitch));}}
 if(mode==='studio'){const a=h('section','vw-card glass');a.appendChild(h('h3','','🧑‍🎤 Avatar Studio'));const ni=h('input');ni.type='text';ni.maxLength=14;ni.value=AV.name;ni.oninput=()=>{AV.name=ni.value.trim()||'Guest';sv();};
  const rb=()=>{const o=P&&P.g;if(!o)return;SC.remove(o);o.traverse(m=>{if(m.geometry)m.geometry.dispose();if(m.material)m.material.dispose();});spawn();P.x=0;P.z=0;P.g.position.set(0,0,0);};
  const sv=()=>LS.s('fwp-vw-avatar',AV);const ch=(k)=>v=>{AV[k]=v;sv();rb();};
  const AN8=['idle','walk','run','wave','dance','cheer','jump','sit'];
  const pv=sel(['Idle','Walk','Run','Wave','Dance','Cheer','Jump','Sit'],Math.max(0,AN8.indexOf(pvAn)),i=>{pvAn=AN8[i];});
  const rd=h('button','','🎲 Randomize');rd.onclick=()=>{const pk=a=>a[Math.floor(Math.random()*a.length)],ri=n=>Math.floor(Math.random()*n);Object.assign(AV,{style:ri(5),hair:ri(7),acc:ri(6),fit:ri(5),oc:pk(OC),pc:pk(PC),hc:pk(HC2),skin:pk(SK)});sv();rb();ui();};
  const g=h('div','vw-grid');g.append(field('Name',ni),field('Gender & Silhouette',sel(['Male (Athletic)','Female (Chic)','Tall Model','Compact','Casual Sport'],AV.style,ch('style'))),field('Hairstyle',sel(['Fade / Crop','Executive Parted','Textured Quiff','Long Flowing','High Ponytail','Layered Waves','Top Bun'],AV.hair,ch('hair'))),field('Outfit Style',sel(['Streetwear Tee','Hoodie & Cargo','Biker Jacket','Evening Dress','Formal Suit & Tie'],AV.fit,ch('fit'))),field('Accessory',sel(['None','Glasses','Cap','Crown','Headphones','Sunglasses'],AV.acc,ch('acc'))),field('Preview animation',pv),
   field('Outfit colour',sw(OC,AV.oc,ch('oc'))),field('Trouser / shoe colour',sw(PC,AV.pc,ch('pc'))),field('Hair colour',sw(HC2,AV.hc,ch('hc'))),field('Realistic Skin Tone',sw(['#fdf2e9','#f1c27d','#d49b6a','#935d37','#5c3a21'],AV.skin,ch('skin'))),field('Eyes',sw(['#2b1b12','#1d4ed8','#15803d','#6b7280'],AV.eye,ch('eye'))));g.appendChild(rd);
  a.appendChild(g);a.appendChild(h('p','sub','Saved automatically on this device. Pick a world below to walk in as this avatar.'));p.appendChild(a);
  const w=h('section','vw-card glass');w.appendChild(h('h3','','🌍 Choose a world'));const wg=h('div','vw-worlds');
  W.forEach(x=>{const c=h('button','vw-world');c.append(h('b','',x.e+' '+x.n),h('small','',x.d));if(x.party)c.appendChild(h('i','','PARTY ZONE'));c.onclick=()=>enter(()=>world(x.k));wg.appendChild(c);});
  const rm=h('button','vw-world');rm.append(h('b','','🛋️ My Virtual Room'),h('small','','Decorate your own room: furniture, colours, lighting.'));rm.onclick=()=>enter(roomScene);wg.appendChild(rm);w.appendChild(wg);
  w.appendChild(h('p','sub','Multiplayer: open this tab in the same room and your friends appear as walking 3D avatars with their name tags. Emotes and movement are shared live.'));p.appendChild(w);}
 else if(mode==='room'){const a=h('section','vw-card glass');a.appendChild(h('h3','','🛋️ My Virtual Room'));$v('vwTitle').textContent='🛋️ My Virtual Room';
  const col=(k,l)=>{const i=h('input');i.type='color';i.value=room[k];i.oninput=()=>{room[k]=i.value;(k==='floor'?[room.fm]:[room.w1,room.w2]).forEach(m=>m.material.color.set(i.value));};return field(l,i);};
  const th=sel(RT.map(r=>r[0]),0,i=>{const r=RT[i];room.wall=r[1];room.floor=r[2];room.lamp=r[3];[room.w1,room.w2].forEach(m=>m.material.color.set(r[1]));room.fm.material.color.set(r[2]);room.pl.intensity=r[3];ui();});
  const li=h('input');li.type='range';li.min=0;li.max=2;li.step=.1;li.value=room.lamp;li.oninput=()=>{room.lamp=+li.value;room.pl.intensity=room.lamp;};
  const g=h('div','vw-grid');g.append(field('Theme',th),col('wall','Walls'),col('floor','Floor'),field('Lighting',li));a.appendChild(g);
  const pal=h('div','vw-pal');Object.keys(FURN).forEach(k=>{const b=h('button','',FURN[k][0]);b.onclick=()=>roomAdd(k);pal.appendChild(b);});a.appendChild(pal);
  const ac=h('div','vw-pal');[['↻ Rotate (R)',roomRot],['🗑 Delete',roomDel],['💾 Save',roomSave],['↺ Reset',()=>{fwpAsk({icon:'↺',title:'Reset room?',msg:'This removes all furniture and restores default colours.',ok:'Reset',no:'Cancel',danger:true}).then(y=>{if(y){LS.s('fwp-vw-room',null);roomScene();}});}]].forEach(x=>{const b=h('button','',x[0]);b.onclick=x[1];ac.appendChild(b);});a.appendChild(ac);
  a.appendChild(h('p','sub','Tap “Add” buttons, then drag furniture on the floor. Drag empty space to turn the camera, scroll or pinch-free: use the mouse wheel to zoom.'));p.appendChild(a);}
 else{const a=h('section','vw-card glass');a.appendChild(h('p','sub',(TOUCH?'Left stick to move, drag to look, ':'WASD / arrows to move, drag to look, wheel to zoom, E interact, 1-4 emotes, ')+'use the buttons on the screen.'));p.appendChild(a);}}
function enter(fn){boot().then(()=>{ready&&fn();});}
function exitMode(){if(mode==='studio')return false;netSend({t:'vw',k:'bye'});Object.keys(REM).forEach(dropRem);unbind();stop();studio();bind();start();$v('vwTitle').textContent='3D World Hub';return true;}
/* ---------- multiplayer: shared avatars ---------- */
let netT=0; const REM={};
const netOK=()=>{ try{ return typeof send==='function'&&typeof connected==='function'&&connected(); }catch(e){ return false; } };
const netSend=o=>{ if(!netOK()) return; try{ send(o); }catch(e){} };
function remDispose(g){ if(!g) return; if(SC) SC.remove(g); g.traverse(m=>{ if(m.geometry) m.geometry.dispose(); if(m.material)[].concat(m.material).forEach(x=>x.dispose&&x.dispose()); }); }
function buildRem(r){ remDispose(r.g); r.g=null; if(!SC||!T) return; r.g=makeAvatar(r.cfg||{}); r.g.add((l=>{ l.position.y=(r.g.userData.top||2.2)+.45; return l; })(label(r.nm||'Friend'))); if(r.pos){ r.g.position.set(r.pos[0],0,r.pos[1]); r.g.rotation.y=r.pos[2]||0; } SC.add(r.g); }
function dropRem(id){ const r=REM[id]; if(r) remDispose(r.g); delete REM[id]; }
window.vwMsg=function(m){ if(!m||m.fid==null||(typeof myId==='function'&&m.fid===myId())) return;
  if(m.k==='bye'){ dropRem(m.fid); return; }
  if(mode!=='world'&&mode!=='room') return;
  if(m.k==='cfg'){ let r=REM[m.fid]; if(!r) r=REM[m.fid]={pos:null,an:'idle',sp:1,last:performance.now()}; r.cfg=m.av||{}; r.nm=(m.av&&m.av.name)||m.fn||'Friend'; buildRem(r); return; }
  if(m.k==='pos'){ let r=REM[m.fid]; if(!r) r=REM[m.fid]={cfg:null,g:null,nm:m.fn||'Friend',an:'idle',sp:1,last:performance.now()}; r.pos=m.p; r.an=m.an||'idle'; r.sp=m.sp||1; r.last=performance.now(); if(!r.g) buildRem(r); return; } };
function netTick(dt,t){ if((mode!=='world'&&mode!=='room')||!P) return;
  if(t-netT>.1){ netT=t; netSend({t:'vw',k:'pos',p:[+P.x.toFixed(2),+P.z.toFixed(2),+P.ry.toFixed(2)],an:P.an||'idle',sp:P.sp||1}); }
  const now=performance.now();
  for(const id in REM){ const r=REM[id];
    if(now-r.last>6000){ dropRem(id); continue; }
    if(!r.g){ if(r.pos) buildRem(r); continue; }
    if(!r.pos) continue;
    const g2=r.g; g2.position.x+=(r.pos[0]-g2.position.x)*Math.min(1,dt*10); g2.position.z+=(r.pos[1]-g2.position.z)*Math.min(1,dt*10);
    let dy=(r.pos[2]||0)-g2.rotation.y; dy=Math.atan2(Math.sin(dy),Math.cos(dy)); g2.rotation.y+=dy*Math.min(1,dt*12);
    pose(g2,r.an,t,r.sp||1,dt); } }
/* ---------- boot / lifecycle ---------- */
function build(){if(built)return;built=1;const b=$v('wbox');b.innerHTML='';
 const hd=h('div','vw-head');const t=h('div');t.append((x=>{x.innerHTML='<span class="grad">3D World</span> Hub';return x;})(h('h2')),h('p','sub','Walk, dance and decorate in a browser-based 3D world. Friends in your room join as their own 3D avatars.'));hd.appendChild(t);
 const gs=h('select','vw-gfx');gs.setAttribute('aria-label','Graphics quality');[['low','Graphics: Low'],['med','Graphics: Medium'],['high','Graphics: High']].forEach(o=>{const p=h('option','',o[1]);p.value=o[0];gs.appendChild(p);});gs.value=GFX;gs.onchange=()=>{GFX=gs.value;LS.s('fwp-vw-gfx',GFX);applyGfx();msg('Graphics: '+gs.options[gs.selectedIndex].text.replace('Graphics: ',''));};hd.appendChild(gs);b.appendChild(hd);
 stage=h('div','vw-stage');stage.id='vwStage';cv=h('canvas');cv.id='vwCv';cv.setAttribute('aria-label','3D world view');stage.appendChild(cv);
 const hud=h('div','vw-hud');const bk=h('button','',"← Exit");bk.id='vwBack';bk.hidden=true;bk.onclick=()=>exitMode();const ti=h('span','vw-t','3D World Hub');ti.id='vwTitle';const sp=h('span','sp');const fs=h('button','','⛶');fs.id='vwFs';fs.setAttribute('aria-label','Fullscreen');
 fs.onclick=()=>{const f=document.fullscreenElement||stage.classList.contains('vwx');if(f){if(document.fullscreenElement)document.exitFullscreen();stage.classList.remove('vwx');}else if(stage.requestFullscreen)stage.requestFullscreen().catch(()=>stage.classList.add('vwx'));else stage.classList.add('vwx');setTimeout(fit,200);};
 hud.append(bk,ti,sp,fs);stage.appendChild(hud);
 {const cm=h('div','vw-cam');cm.id='vwCam';cm.hidden=true;const vb=h('button','','');vb.id='vwView';vb.type='button';vb.onclick=()=>setView(view==='first'?'third':'first');const rs=h('button','','🎯 Reset camera');rs.id='vwRst';rs.type='button';rs.onclick=resetCam;
  const sl=h('input');sl.type='range';sl.min=.3;sl.max=2.5;sl.step=.1;sl.value=sens;sl.id='vwSens';sl.setAttribute('aria-label','Look sensitivity');const sv2=h('span','',sens.toFixed(1)+'×');sv2.id='vwSensV';sl.oninput=()=>{sens=+sl.value;LS.s('fwp-vw-sens',sens);sv2.textContent=sens.toFixed(1)+'×';};
  const lb=h('label','vw-sens');lb.append(h('span','','Sensitivity'),sl,sv2);cm.append(vb,rs,lb);stage.appendChild(cm);const hi=h('div','vw-hint');hi.id='vwHint';hi.hidden=true;stage.appendChild(hi);vbtn();}const m=h('div','vw-msg');m.id='vwMsg';stage.appendChild(m);
 const ctl=h('div','vw-ctl');ctl.id='vwCtl';ctl.hidden=true;const jy=h('div','vw-joy');jy.id='vwJoy';const kn=h('i');jy.appendChild(kn);
 const jm=e=>{const r=jy.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;let dx=e.clientX-cx,dy=e.clientY-cy;const mx=r.width/2-14,d=Math.hypot(dx,dy);if(d>mx){dx*=mx/d;dy*=mx/d;}kn.style.transform='translate('+dx+'px,'+dy+'px)';joy={x:dx/mx,y:-dy/mx};};
 jy.onpointerdown=e=>{jy.setPointerCapture(e.pointerId);jm(e);jy.onpointermove=jm;};jy.onpointerup=jy.onpointercancel=()=>{jy.onpointermove=null;joy={x:0,y:0};kn.style.transform='';};ctl.appendChild(jy);
 const bt=h('div','vw-btns');const ab=h('button','primary','—');ab.id='vwAct';ab.onclick=act;const eb=h('button','','😀');eb.id='vwEm';eb.setAttribute('aria-label','Emotes');eb.onclick=()=>{const e=$v('vwEmo');e.hidden=!e.hidden;};
 const fx=h('button','','🎉');fx.id='vwFx';fx.setAttribute('aria-label','Celebrate');fx.onclick=()=>P&&confetti();const mb=h('button','','🎵');mb.id='vwMus';mb.setAttribute('aria-label','Music');mb.onclick=()=>{music(!mus);msg(mus?'🎵 Music on':'Music off');};bt.append(ab,eb,fx,mb);ctl.appendChild(bt);stage.appendChild(ctl);
 const em=h('div','vw-emo');em.id='vwEmo';em.hidden=true;[['wave','👋 Wave'],['dance','💃 Dance'],['cheer','🙌 Cheer'],['jump','⬆️ Jump']].forEach(x=>{const b2=h('button','',x[1]);b2.onclick=()=>emote(x[0]);em.appendChild(b2);});stage.appendChild(em);
 const f=h('div','vw-fb');f.id='vwFb';f.hidden=true;stage.appendChild(f);b.appendChild(stage);const pn=h('div');pn.id='vwPanel';b.appendChild(pn);
 if('ResizeObserver' in window)new ResizeObserver(fit).observe(stage);addEventListener('resize',fit);
 document.addEventListener('fullscreenchange',()=>setTimeout(fit,150));addEventListener('pagehide',destroy);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else if(active&&mode)start();});
 const ob=window.PP_BACK;window.PP_BACK=function(){if(active&&mode&&mode!=='studio'){exitMode();return true;}return ob?ob():false;};}
function boot(){build();$v('vwFb').hidden=true;if(ready&&R)return Promise.resolve();
 return load3().then(()=>{initR();ready=1;if(!mode)studio();bind();start();}).catch(e=>{ready=0;fb(e.message||'Unknown error');return Promise.resolve();});}
window.vwShown=function(){active=1;build();if(ready&&R){if(!mode)studio();bind();start();fit();}else boot();};
window.vwHidden=function(){netSend({t:'vw',k:'bye'});Object.keys(REM).forEach(dropRem);active=0;stop();unbind();music(0);};
})();