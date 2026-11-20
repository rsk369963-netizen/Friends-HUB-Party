/* ===== FRIENDS HUB PARTY: RESTORED CLEAN PARTY PACK (ALL AGES, 3 LANGUAGES, ONLINE MULTIPLAYER) ===== */
(function(){
const $q=s=>document.querySelector(s), rnd=n=>Math.floor(Math.random()*n);
const H=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=tx(x);return e};
const B=(c,x,f)=>{const b=H('button',c,x);if(f)b.onclick=f;return b};
const sh=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const LS={g(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},s(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const snd=(f,d)=>{try{if(!window.SND_OFF && typeof tone==='function')tone(f,d||.12)}catch(e){}};
const norm=x=>String(x).toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim();

/* ===== GLOBAL LANGUAGE ENGINE (English, Tamil, Tanglish) ===== */
function curL(){
  return (typeof lang==='string' && ['en','ta','th'].includes(lang)) ? lang : 'en';
}

const T_DICT = {
  // Navigation & Heads
  '🎉 Party Pack': { en:'🎉 Party Pack', ta:'🎉 பார்ட்டி பேக்', th:'🎉 Party Pack' },
  'Search games…': { en:'Search games…', ta:'விளையாட்டுகளைத் தேடு…', th:'Games thedunga…' },
  'No games match': { en:'No games match', ta:'விளையாட்டுகள் எதுவும் பொருந்தவில்லை', th:'Matches edhum illa' },
  'Party Pack · 4 Multiplayer Party Games (All Ages)': { en:'Party Pack · 4 Multiplayer Party Games (All Ages)', ta:'பார்ட்டி பேக் · 4 மல்டிபிளேயர் விளையாட்டுகள்', th:'Party Pack · 4 Multiplayer Games' },
  'Local pass-and-play on this device or live online multiplayer with room friends.': { en:'Local pass-and-play on this device or live online multiplayer with room friends.', ta:'இந்த சாதனத்தில் விளையாடலாம் அல்லது ரூம் நண்பர்களுடன் ஆன்லைனில் விளையாடலாம்.', th:'Own device-la pass-and-play aadu illa room friends-oda live online multiplayer aadu.' },
  'Online Multiplayer Room': { en:'Online Multiplayer Room', ta:'ஆன்லைன் மல்டிபிளேயர் ரூம்', th:'Online Multiplayer Room' },
  'Connected Players:': { en:'Connected Players:', ta:'இணைக்கப்பட்டுள்ள வீரர்கள்:', th:'Connected Players:' },
  'Host Mode': { en:'Host Mode', ta:'ஹோஸ்ட் பயன்முறை', th:'Host Mode' },
  'You are hosting. Starting a game launches it on every player’s screen.': { en:'You are hosting. Starting a game launches it on every player’s screen.', ta:'நீங்கள் ஹோஸ்ட். நீங்கள் தொடங்கும் விளையாட்டு அனைவரின் திரையிலும் தொடங்கும்.', th:'Nee host panra. Game start panna ellar screen-layum sync aagum.' },
  'Player Mode': { en:'Player Mode', ta:'வீரர் பயன்முறை', th:'Player Mode' },
  'Waiting for the host to pick and start a party game…': { en:'Waiting for the host to pick and start a party game…', ta:'ஹோஸ்ட் விளையாட்டைத் தேர்ந்தெடுக்கும் வரை காத்திருக்கிறது…', th:'Host party game start panna wait panren…' },
  'Back to Games': { en:'Back to Games', ta:'விளையாட்டுகளுக்குத் திரும்பு', th:'Back to Games' },
  'Minimize': { en:'Minimize', ta:'மறை', th:'Minimize' },
  'Close': { en:'Close', ta:'மூடு', th:'Moodu' },
  'Restore': { en:'Restore', ta:'திற', th:'Thira' },
  'Game Over': { en:'Game Over', ta:'ஆட்டம் முடிந்தது', th:'Game Over' },
  'Play Again': { en:'Play Again', ta:'மீண்டும் விளையாடு', th:'Marubadi Aadu' },
  'Lobby': { en:'Lobby', ta:'லாபி', th:'Lobby' },
  'Leaderboard': { en:'Leaderboard', ta:'முன்னிலை பலகை', th:'Leaderboard' },
  'Scores': { en:'Scores', ta:'மதிப்பெண்கள்', th:'Scores' },
  'Vote Submitted!': { en:'Vote Submitted!', ta:'வாக்கு அளிக்கப்பட்டது!', th:'Vote panniye!' },
  'Waiting for votes…': { en:'Waiting for votes…', ta:'வாக்குகளுக்காகக் காத்திருக்கிறது…', th:'Vote varuthu wait pannu…' },
  'Truth': { en:'Truth', ta:'உண்மை (Truth)', th:'Truth' },
  'Dare': { en:'Dare', ta:'சவால் (Dare)', th:'Dare' },
  'Next Turn': { en:'Next Turn', ta:'அடுத்த முறை', th:'Adutha Turn' },
  'Completed (+10 pts)': { en:'Completed (+10 pts)', ta:'முடித்தேன் (+10 புள்ளிகள்)', th:'Mudichen (+10 pts)' },
  'Forfeit (0 pts)': { en:'Forfeit (0 pts)', ta:'விட்டுக்கொடுத்தேன் (0 புள்ளி)', th:'Vittaachu (0 pts)' },
  'Pick One Option': { en:'Pick One Option', ta:'ஒரு விருப்பத்தைத் தேர்ந்தெடுங்கள்', th:'Oru Option Select Pannu' },
  'Submit': { en:'Submit', ta:'சமர்ப்பி', th:'Submit' },
  'Correct! (+10 pts)': { en:'Correct! (+10 pts)', ta:'சரியானது! (+10 புள்ளிகள்)', th:'Correct! (+10 pts)' },
  'Wrong! (0 pts)': { en:'Wrong! (0 pts)', ta:'தவறானது! (0 புள்ளி)', th:'Thappu! (0 pts)' },
  'Real': { en:'Real', ta:'உண்மை (Real)', th:'Real' },
  'Fake': { en:'Fake', ta:'பொய் (Fake)', th:'Fake' },
  'Round': { en:'Round', ta:'சுற்று', th:'Round' },
  'Score': { en:'Score', ta:'மதிப்பெண்', th:'Score' },
  'Time left:': { en:'Time left:', ta:'மீதமுள்ள நேரம்:', th:'Neram:' }
};

function tx(k){
  if(typeof k!=='string') return k;
  const l = curL();
  if(T_DICT[k] && T_DICT[k][l]) return T_DICT[k][l];
  if(typeof t==='function'){
    const tr = t(k);
    if(tr && tr!==k) return tr;
  }
  return k;
}

window.ppApplyLang = function(){
  if(VIEW) VIEW();
  const b = $q('#ppOpen');
  if(b) b.textContent = '🎉 ' + tx('Party Pack · 4 Multiplayer Party Games (All Ages)');
};

/* ===== PARTY PACK GAMES (ALL AGES) ===== */
const GAMES = [
  {
    id:'tod', emoji:'🎭', allAges:true,
    n:{ en:'Truth or Dare', ta:'உண்மை அல்லது சவால்', th:'Truth or Dare' },
    d:{ en:'Spin, pick Truth or Dare, and reveal fun secrets or do hilarious family-friendly tasks!',
        ta:'சுழற்றி, உண்மை அல்லது சவாலைத் தேர்ந்தெடுத்து, ரகசியங்களைப் பகிருங்கள் அல்லது நகைச்சுவை சவால்களைச் செய்யுங்கள்!',
        th:'Spin panni, Truth illa Dare choose panni jolly tasks seiyunga!' }
  },
  {
    id:'wyr', emoji:'🤔', allAges:true,
    n:{ en:'Would You Rather?', ta:'எதை விரும்புவீர்கள்?', th:'Would You Rather?' },
    d:{ en:'Vote on crazy dilemmas with your friends and see live voting splits in real-time!',
        ta:'நண்பர்களுடன் வேடிக்கையான இக்கட்டான கேள்விகளுக்கு வாக்களித்து நேரடி முடிவுகளைப் பாருங்கள்!',
        th:'Rendu crazy options-la onnu choose panni friends vote split paaru!' }
  },
  {
    id:'emoji', emoji:'🎬', allAges:true,
    n:{ en:'Emoji Challenge', ta:'எமோஜி சவால்', th:'Emoji Challenge' },
    d:{ en:'Decipher blockbuster movies, songs, and famous places from emoji sequences against the clock!',
        ta:'எமோஜி குறியீடுகளைப் பார்த்து திரைப்படங்கள், பாடல்கள் மற்றும் பிரபல இடங்களை வேகமாகக் கண்டுபிடியுங்கள்!',
        th:'Emojis paathu movies, songs kandupidinga!' }
  },
  {
    id:'fake', emoji:'🤯', allAges:true,
    n:{ en:'Fake or Real?', ta:'பொய்யா அல்லது உண்மையா?', th:'Fake or Real?' },
    d:{ en:'Wild, bizarre facts — vote whether they are 100% Real or completely Fake!',
        ta:'ஆச்சரியமான விசித்திரமான உண்மைகள் — உண்மையானவையா அல்லது பொய்யானவையா என்று வாக்களியுங்கள்!',
        th:'Shocking facts unmaiya illa fake-ah nu vote pannunga!' }
  }
];

/* ===== QUESTIONS & PROMPTS POOLS (TRILINGUAL) ===== */
const TR = [
  { en:'What is the most embarrassing thing your parents caught you doing?', ta:'உங்கள் பெற்றோர் உங்களைப் பார்த்து சங்கடப்பட்ட ஒரு தருணம் எது?', th:'Unga parents kitta maatina most embarrassing incident enna?' },
  { en:'If you had to delete every app on your phone except three, which three would you keep?', ta:'உங்கள் போனில் மூன்றைத் தவிர மற்ற எல்லா செயலிகளையும் நீக்க நேர்ந்தால், எவற்றை வைத்திருப்பீர்கள்?', th:'Phone-la 3 apps thavira ellathaiyum delete panna sonna, edha vachipinga?' },
  { en:'What is one silly lie you told recently that everyone believed?', ta:'சமீபத்தில் நீங்கள் சொன்ன, எல்லோரும் நம்பிய ஒரு வேடிக்கையான பொய் எது?', th:'Recent-ah sonna oru jolly poi ellarum nambitaangala?' },
  { en:'Who in this party room would survive the longest in a zombie apocalypse?', ta:'இந்த ரூமில் உள்ளவர்களில் யார் ஜாம்பி தாக்குதலில் நீண்ட காலம் தப்பிப்பார்?', th:'Indha room-la zombie attack vandha yaaru kadaisi varaikum survive aavaanga?' },
  { en:'What is the weirdest food combination that you actually enjoy eating?', ta:'நீங்கள் விரும்பி சாப்பிடும் விசித்திரமான உணவு சேர்க்கை எது?', th:'Neenga saapdra weird food combination enna?' },
  { en:'What was your very first screen name or childhood email address?', ta:'உங்கள் முதல் இணையப் பெயர் அல்லது குழந்தை பருவ மின்னஞ்சல் முகவரி என்ன?', th:'Unga first email id illa funny screen name enna?' },
  { en:'Have you ever pretended to be sick to avoid meeting someone here?', ta:'இங்குள்ள யாரையாவது சந்திக்காமல் இருக்க உடம்பு சரியில்லை என்று நாடகமாடியிருக்கிறீர்களா?', th:'Yaarayavadhu meet panna koodadhu nu odambu mudiyala nu poiyurukkeengala?' },
  { en:'What is the funniest rumor you have ever heard about yourself?', ta:'உங்களைப் பற்றி நீங்கள் கேள்விப்பட்ட மிகவும் வேடிக்கையான வதந்தி எது?', th:'Ungala pathi neengale keta funniest rumor enna?' }
];

const DR = [
  { en:'Speak in a dramatic Shakespearean accent for the next 2 rounds.', ta:'அடுத்த 2 சுற்றுகளுக்கு நாடக பாணியில் கம்பீரமாகப் பேசுங்கள்.', th:'Next 2 rounds-ku cinema villain madhiri pesunga.' },
  { en:'Send a funny GIF to the party chat without explaining anything.', ta:'எந்த விளக்கமும் இல்லாமல் பார்ட்டி சாட்டில் ஒரு வேடிக்கையான GIF அனுப்புங்கள்.', th:'Chat-la oru funny GIF mattum anuppi silent-ah irunga.' },
  { en:'Do your absolute best impression of another person in this room.', ta:'இந்த ரூமில் உள்ள ஒருவரைப் போல மிகச் சிறப்பாக நடித்துக் காட்டுங்கள்.', th:'Indha room-la irukkura oruthara maadhiri act panni kaatunga.' },
  { en:'Balance a spoon or book on your head for the next 30 seconds.', ta:'அடுத்த 30 வினாடிகளுக்கு உங்கள் தலையில் ஒரு கரண்டி அல்லது புத்தகத்தை சமநிலைப்படுத்துங்கள்.', th:'30 seconds-ku thala mela book illa spoon balance pannunga.' },
  { en:'Sing the chorus of your favorite song loudly right now!', ta:'உங்களுக்குப் பிடித்த பாடலின் பல்லவியை சத்தமாகப் பாடுங்கள்!', th:'Unga favourite song chorus-a loud-ah paadunga!' },
  { en:'Keep a completely straight serious face while everyone tries to make you laugh for 20 seconds.', ta:'அனைவரும் 20 விநாடிகள் உங்களை சிரிக்க வைக்க முயற்சிக்கும்போது முற்றிலும் சீரியஸாக இருங்கள்.', th:'Ellarum 20s unna sirikka vaikka try pannuvaanga, neenga sirikka koodadhu!' },
  { en:'Talk like a news reporter reporting a breaking news story about this party!', ta:'இந்த பார்ட்டியைப் பற்றிய பிரேக்கிங் செய்தியை வாசிக்கும் செய்தி வாசிப்பாளர் போல் பேசுங்கள்!', th:'Indha party pathi breaking news anchor madhiri report pannunga!' },
  { en:'Do 10 rapid jumping jacks or high-fives on camera/mic.', ta:'10 வேகமான ஜம்பிங் ஜாக்ஸ் அல்லது உற்சாக சைகை செய்யுங்கள்.', th:'10 quick jumping jacks seiyunga!' }
];

const WYR = [
  {
    a:{ en:'Have the ability to fly at walking speed', ta:'நடக்கும் வேகத்தில் பறக்கும் ஆற்றல் பெறுவது', th:'Nadakkura speed-la parakkura power' },
    b:{ en:'Teleport instantly, but only to places you have never visited', ta:'நீங்கள் இதுவரை செல்லாத இடங்களுக்கு மட்டுமே உடனடியாக டெலிபோர்ட் ஆவது', th:'Pogaadha edathukku mattum instant teleport aagradhu' }
  },
  {
    a:{ en:'Live without internet for an entire month', ta:'ஒரு மாதம் முழுவதும் இணையம் இல்லாமல் வாழ்வது', th:'Oru maasam internet illama irukkuradhu' },
    b:{ en:'Live without your favorite food for a whole year', ta:'ஒரு வருடம் முழுவதும் உங்களுக்குப் பிடித்த உணவு இல்லாமல் வாழ்வது', th:'Oru varusham favourite food illama irukkuradhu' }
  },
  {
    a:{ en:'Explore 1,000 years into the future', ta:'1,000 ஆண்டுகள் எதிர்காலத்திற்குச் சென்று பார்ப்பது', th:'1,000 varusham future-ku poi paakkuradhu' },
    b:{ en:'Travel 1,000 years back into the ancient past', ta:'1,000 ஆண்டுகள் கடந்த காலத்திற்குப் பயணிப்பது', th:'1,000 varusham past-ku travel panradhu' }
  },
  {
    a:{ en:'Always speak your thoughts out loud with no filter', ta:'உங்கள் எண்ணங்களை எப்போதும் உரக்கப் பேசுவது', th:'Manasula thonradhai ellam open-ah pesidadhu' },
    b:{ en:'Never be able to speak again, only whisper', ta:'இனி எப்போதும் சத்தமாகப் பேச முடியாமல் கிசுகிசுப்பாக மட்டுமே பேசுவது', th:'Eppovume whisper mattum panna mudiyuradhu' }
  },
  {
    a:{ en:'Win an Olympic Gold Medal', ta:'ஒலிம்பிக் தங்கப் பதக்கம் வெல்வது', th:'Olympic Gold Medal vaanguradhu' },
    b:{ en:'Win a Nobel Prize in Science', ta:'அறிவியலுக்கான நோபல் பரிசு வெல்வது', th:'Nobel Prize jeyikkiradhu' }
  }
];

const EMOJI = [
  { q:'🦁👑🌅', a:'The Lion King', opts:['The Lion King','Madagascar','Jungle Book','Tarzan'] },
  { q:'🚢❄️💔', a:'Titanic', opts:['Titanic','Poseidon','Cast Away','Life of Pi'] },
  { q:'🧙‍♂️💍🌋', a:'Lord of the Rings', opts:['Lord of the Rings','Harry Potter','The Hobbit','Narnia'] },
  { q:'🕷️🕸️🧑', a:'Spider-Man', opts:['Spider-Man','Batman','Ant-Man','Iron Man'] },
  { q:'🦇🦸‍♂️🌃', a:'Batman The Dark Knight', opts:['Batman The Dark Knight','Superman','Daredevil','Watchmen'] },
  { q:'🏎️⚡🏆', a:'Cars', opts:['Cars','Fast and Furious','Turbo','Speed Racer'] }
];

const FAKE = [
  {
    f:{ en:'Bananas share approximately 50% of their DNA with human beings.',
        ta:'வாழைப்பழங்கள் மனிதர்களின் டிஎன்ஏவுடன் சுமார் 50% ஒத்துப் போகின்றன.',
        th:'Bananas humans-oda 50% DNA share pannudhu.' },
    real:true,
    exp:{ en:'True! About 50% of human genes have counterparts in bananas.',
          ta:'உண்மை! மனித மரபணுக்களில் சுமார் 50% வாழைப்பழ மரபணுக்களுடன் ஒத்துப்போகின்றன.',
          th:'Unmai! 50% genes banana kooda match aagum.' }
  },
  {
    f:{ en:'Lightning never strikes the same exact spot twice.',
        ta:'மின்னல் ஒரே இடத்தில் இரண்டு முறை தாக்கியதே இல்லை.',
        th:'Lightning ore edathula rendu vaati strike aagadhu.' },
    real:false,
    exp:{ en:'Fake myth! High towers and peaks get struck hundreds of times every year.',
          ta:'பொய்! உயரமான கோபுரங்கள் மற்றும் மலை உச்சிகள் ஆண்டுதோறும் நூற்றுக்கணக்கான முறை தாக்கப்படுகின்றன.',
          th:'Fake! Empire State building-la varushathuku 25+ vaati strike aagum.' }
  },
  {
    f:{ en:'Honey never spoils; edible honey has been found in 3,000-year-old Egyptian tombs.',
        ta:'தேன் ஒருபோதும் கெட்டுப்போகாது; 3,000 ஆண்டுகள் பழமையான எகிப்திய கல்லறைகளில் நல்ல தேன் கண்டெடுக்கப்பட்டுள்ளது.',
        th:'Honey eppovume spoil aagadhu, 3000 years aanaalum nallaave irukkum.' },
    real:true,
    exp:{ en:'Real! Honey has very low moisture and high acidity, so bacteria cannot survive in it.',
          ta:'உண்மை! தேனில் ஈரப்பதம் மிகக் குறைவு மற்றும் அமிலத்தன்மை அதிகம் என்பதால் பாக்டீரியா வாழ முடியாது.',
          th:'Real! Honey-la bacteria valara mudiyadhu.' }
  },
  {
    f:{ en:'You swallow an average of 8 spiders in your sleep every year.',
        ta:'ஒவ்வொரு ஆண்டும் தூக்கத்தில் சராசரியாக 8 சிலந்திகளை விழுங்குகிறீர்கள்.',
        th:'Thoongum bodhu varushathuku 8 spiders-a saapudrom.' },
    real:false,
    exp:{ en:'Completely Fake! Spiders avoid large warm breathing predators like humans.',
          ta:'முற்றிலும் பொய்! மனிதர்கள் போன்ற பெரிய சுவாசிக்கும் உயிரினங்களை சிலந்திகள் தவிர்க்கின்றன.',
          th:'Totally Fake! Spiders namma kitta kooda varaadhu.' }
  }
];

/* ===== STATE & NETWORKING ===== */
let root=null, mini=null, VIEW=null, G=null;
let SCORES = {}; // { peerId: score }

function myId(){ return (typeof window.myId==='function'?window.myId():'me'); }
function isHostUser(){ return !!window.isHost; }
function getRoster(){ return Array.isArray(window.roster) && window.roster.length>0 ? window.roster : [{id:myId(), name:(window.myName||'Player'), av:(window.myAv||'😎'), host:isHostUser()}]; }
function getName(id){ const r=getRoster().find(x=>x.id===id); return r?r.name:(id===myId()?(window.myName||'You'):'Player'); }
function getAv(id){ const r=getRoster().find(x=>x.id===id); return r?r.av:'😎'; }

function broadcast(m){
  if(typeof window.send==='function') window.send(m);
}
function broadcastTo(id, m){
  if(typeof window.sendTo==='function') window.sendTo(id, m);
}

// Global hook for incoming WebRTC Party Pack messages
window.ppMsg = function(m){
  if(!m || !m.act) return;
  const fromHost = m.fid === (getRoster().find(r=>r.host)?.id || 'host');

  if(m.act==='start'){
    const game = GAMES.find(x=>x.id===m.gid);
    if(game){
      open();
      startGame(game, true, m.state);
    }
  } else if(m.act==='step'){
    if(G && G.step) G.step(m);
  } else if(m.act==='vote'){
    if(isHostUser() && G && G.onRemoteVote){
      G.onRemoteVote(m.fid, m.vote);
    }
  } else if(m.act==='score_sync'){
    if(m.scores) SCORES = Object.assign({}, m.scores);
    if(G && G.renderScores) G.renderScores();
  }
};

window.ppWelcome = function(peerId){
  if(isHostUser() && G){
    broadcastTo(peerId, { t:'pp_act', act:'start', gid:G.g.id, state:G.serialize() });
    broadcastTo(peerId, { t:'pp_act', act:'score_sync', scores:SCORES });
  }
};

window.ppPeerLeft = function(peerId){
  if(G && G.onPeerLeft) G.onPeerLeft(peerId);
};

/* ===== UI SHELL ===== */
function open(){
  if(!root){
    root=H('div'); root.id='pp'; root.setAttribute('role','dialog'); root.setAttribute('aria-label','Party Pack');
    // Ensure smooth touch scrolling on mobile
    root.style.webkitOverflowScrolling = 'touch';
    root.style.overflowY = 'auto';
    root.style.paddingBottom = 'max(32px, env(safe-area-inset-bottom, 24px))';
    document.body.appendChild(root);
  }
  root.hidden=false;
  if(mini) mini.hidden=true;
  if(!VIEW) lobby(); else VIEW();
}

function close(){
  if(root) root.hidden=true;
  if(mini) mini.hidden=true;
}

function minimize(){
  if(root) root.hidden=true;
  if(!mini){
    mini=H('button','primary'); mini.id='ppMini'; mini.onclick=restore; document.body.appendChild(mini);
  }
  mini.textContent='🎉 '+(G ? (G.g.n[curL()]||G.g.n.en) : tx('Party Pack')) + ' · ' + tx('Restore');
  mini.hidden=false;
}

function restore(){
  if(mini) mini.hidden=true;
  if(root) root.hidden=false;
  if(VIEW) VIEW();
}

function wrap(){
  root.innerHTML='';
  const w=H('div','wrap glass');
  root.appendChild(w);
  return w;
}

function head(w, title, backFn){
  const bar=H('div','head');
  const left=H('div','row');
  if(backFn){
    const b=B('icon','←',backFn); b.setAttribute('aria-label',tx('Back to Games')); left.appendChild(b);
  }
  const t=H('h2',null,title); t.style.margin='0'; left.appendChild(t);
  bar.appendChild(left);

  const right=H('div','row');
  const bMin=B('icon','🗕',minimize); bMin.title=tx('Minimize'); bMin.setAttribute('aria-label',tx('Minimize')); right.appendChild(bMin);
  const bClose=B('icon','✕',close); bClose.title=tx('Close'); bClose.setAttribute('aria-label',tx('Close')); right.appendChild(bClose);
  bar.appendChild(right);
  w.appendChild(bar);
}

/* ===== PARTY PACK LOBBY ===== */
function lobby(){
  VIEW=lobby; G=null;
  const w=wrap();
  head(w, '🎉 ' + tx('Party Pack'));

  const rost = getRoster();
  const host = isHostUser();

  // Room status indicator
  const roomCard = H('div','card');
  roomCard.style.padding='14px 18px';
  roomCard.style.marginBottom='14px';
  roomCard.style.background='rgba(56,189,248,.08)';
  roomCard.style.border='1px solid rgba(56,189,248,.25)';
  roomCard.style.borderRadius='14px';

  const rHead = H('div','row');
  rHead.style.justifyContent='space-between';
  const rT = H('b',null, '🌐 ' + tx('Online Multiplayer Room') + ' (' + rost.length + ' online)');
  rHead.appendChild(rT);
  const badge = H('span','badgeOnline', host ? ('👑 ' + tx('Host Mode')) : ('🎮 ' + tx('Player Mode')));
  rHead.appendChild(badge);
  roomCard.appendChild(rHead);

  const rDesc = H('div','sub', host ? tx('You are hosting. Starting a game launches it on every player’s screen.') : tx('Waiting for the host to pick and start a party game…'));
  rDesc.style.marginTop='6px';
  roomCard.appendChild(rDesc);

  // Player Avatars List
  const avRow = H('div','row');
  avRow.style.marginTop='10px';
  rost.forEach(p => {
    const pTag = H('span','vPill');
    pTag.textContent = (p.av||'😎') + ' ' + (p.name||'Player') + (p.id===myId() ? ' (You)' : '') + (p.host ? ' 👑' : '');
    avRow.appendChild(pTag);
  });
  roomCard.appendChild(avRow);
  w.appendChild(roomCard);

  // Search input
  const searchRow = H('div','row');
  searchRow.style.marginBottom='14px';
  const inp = H('input'); inp.type='search'; inp.placeholder=tx('Search games…');
  inp.style.flex='1';
  searchRow.appendChild(inp);
  w.appendChild(searchRow);

  const grid=H('div','grid');
  grid.style.display='grid';
  grid.style.gridTemplateColumns='repeat(auto-fill, minmax(280px, 1fr))';
  grid.style.gap='14px';
  w.appendChild(grid);

  function renderGrid(filter=''){
    grid.innerHTML='';
    const q=norm(filter);
    const list = GAMES.filter(g=>{
      const gn = g.n[curL()] || g.n.en;
      const gd = g.d[curL()] || g.d.en;
      return !q || norm(gn).includes(q) || norm(gd).includes(q);
    });

    if(!list.length){
      grid.appendChild(H('div','sub',tx('No games match')));
      return;
    }

    list.forEach(g=>{
      const c=H('div','gc card');
      c.style.padding='16px';
      c.style.borderRadius='16px';
      c.style.display='flex';
      c.style.flexDirection='column';
      c.style.gap='10px';
      c.style.cursor='pointer';
      c.style.transition='transform .15s, border-color .15s';
      c.style.background='var(--glass2)';
      c.style.border='1px solid var(--line)';

      const art=H('div','art',g.emoji);
      art.style.fontSize='36px';
      art.style.textAlign='center';
      art.style.padding='10px';
      art.style.borderRadius='12px';
      art.style.background='rgba(255,255,255,.05)';
      c.appendChild(art);

      const titleRow = H('div','row');
      titleRow.style.justifyContent='space-between';
      const gn = H('b',null, g.n[curL()] || g.n.en);
      gn.style.fontSize='17px';
      titleRow.appendChild(gn);
      c.appendChild(titleRow);

      const desc = H('div','sub', g.d[curL()] || g.d.en);
      desc.style.fontSize='13px';
      desc.style.lineHeight='1.4';
      c.appendChild(desc);

      const btnRow = H('div','row');
      btnRow.style.marginTop='auto';
      btnRow.style.justifyContent='flex-end';
      const playBtn = B('primary', host ? '▶ Start for All' : '▶ Play', ()=>{
        startGame(g, false);
      });
      playBtn.style.minHeight='44px';
      playBtn.style.padding='8px 18px';
      btnRow.appendChild(playBtn);
      c.appendChild(btnRow);

      grid.appendChild(c);
    });
  }

  inp.oninput = () => renderGrid(inp.value);
  renderGrid();
}

/* ===== GAME LAUNCHER & MULTIPLAYER CONTROLLER ===== */
function startGame(g, isRemoteSync=false, syncState=null){
  snd(580);
  if(isHostUser() && !isRemoteSync){
    // Broadcast start to all peers
    broadcast({ t:'pp_act', act:'start', gid:g.id });
  }

  if(g.id === 'tod') runTruthOrDare(g, syncState);
  else if(g.id === 'wyr') runWouldYouRather(g, syncState);
  else if(g.id === 'emoji') runEmojiChallenge(g, syncState);
  else if(g.id === 'fake') runFakeOrReal(g, syncState);
}

/* ===== 1. TRUTH OR DARE ===== */
function runTruthOrDare(g, syncState){
  VIEW = () => runTruthOrDare(g);
  const w = wrap();
  head(w, g.emoji + ' ' + (g.n[curL()] || g.n.en), lobby);

  let currentPrompt = syncState?.prompt || null;
  let currentChoice = syncState?.choice || null; // 'truth' or 'dare'
  let activePlayer = syncState?.player || getRoster()[0]?.id || myId();

  G = {
    g,
    step(m){
      if(m.sub==='prompt'){
        currentChoice = m.choice;
        currentPrompt = m.prompt;
        activePlayer = m.player;
        render();
      }
    },
    serialize(){
      return { choice:currentChoice, prompt:currentPrompt, player:activePlayer };
    }
  };

  const card = H('div','card');
  card.style.padding='24px';
  card.style.textAlign='center';
  card.style.display='flex';
  card.style.flexDirection='column';
  card.style.gap='16px';
  card.style.minHeight='260px';
  card.style.justifyContent='center';
  w.appendChild(card);

  function render(){
    card.innerHTML = '';

    const pName = getName(activePlayer);
    const pAv = getAv(activePlayer);

    const who = H('div','row');
    who.style.justifyContent='center';
    who.appendChild(H('span','vPill', pAv + ' Turn: ' + pName + (activePlayer===myId() ? ' (You)' : '')));
    card.appendChild(who);

    if(!currentPrompt){
      const title = H('h3',null, tx('Pick One Option'));
      card.appendChild(title);

      const btnRow = H('div','row');
      btnRow.style.justifyContent='center';
      btnRow.style.gap='16px';

      const bTruth = B('primary','✨ ' + tx('Truth'), ()=>{
        const item = TR[rnd(TR.length)];
        const text = item[curL()] || item.en;
        currentChoice = 'truth'; currentPrompt = text;
        if(isHostUser()){
          broadcast({ t:'pp_act', act:'step', sub:'prompt', choice:'truth', prompt:text, player:activePlayer });
        }
        render();
      });
      bTruth.style.minWidth='140px'; bTruth.style.minHeight='48px';

      const bDare = B('primary','🔥 ' + tx('Dare'), ()=>{
        const item = DR[rnd(DR.length)];
        const text = item[curL()] || item.en;
        currentChoice = 'dare'; currentPrompt = text;
        if(isHostUser()){
          broadcast({ t:'pp_act', act:'step', sub:'prompt', choice:'dare', prompt:text, player:activePlayer });
        }
        render();
      });
      bDare.style.minWidth='140px'; bDare.style.minHeight='48px';

      btnRow.appendChild(bTruth);
      btnRow.appendChild(bDare);
      card.appendChild(btnRow);
    } else {
      const typeBadge = H('div','vPill', currentChoice==='truth' ? ('✨ ' + tx('Truth')) : ('🔥 ' + tx('Dare')));
      typeBadge.style.alignSelf='center';
      card.appendChild(typeBadge);

      const promptText = H('div','big', currentPrompt);
      promptText.style.fontSize='22px';
      promptText.style.padding='14px';
      promptText.style.lineHeight='1.4';
      card.appendChild(promptText);

      const actionRow = H('div','row');
      actionRow.style.justifyContent='center';
      actionRow.style.gap='14px';

      const bDone = B('primary','✅ ' + tx('Completed (+10 pts)'), ()=>{
        snd(750);
        SCORES[activePlayer] = (SCORES[activePlayer] || 0) + 10;
        nextTurn();
      });
      bDone.style.minHeight='44px';
      actionRow.appendChild(bDone);

      const bForfeit = B('','⏭ ' + tx('Forfeit (0 pts)'), ()=>{
        snd(350);
        nextTurn();
      });
      bForfeit.style.minHeight='44px';
      actionRow.appendChild(bForfeit);

      card.appendChild(actionRow);
    }
  }

  function nextTurn(){
    const rost = getRoster();
    const idx = rost.findIndex(r=>r.id===activePlayer);
    const nextIdx = (idx + 1) % (rost.length || 1);
    activePlayer = rost[nextIdx]?.id || myId();
    currentPrompt = null; currentChoice = null;

    if(isHostUser()){
      broadcast({ t:'pp_act', act:'score_sync', scores:SCORES });
      broadcast({ t:'pp_act', act:'step', sub:'prompt', choice:null, prompt:null, player:activePlayer });
    }
    render();
  }

  render();
}

/* ===== 2. WOULD YOU RATHER? ===== */
function runWouldYouRather(g, syncState){
  VIEW = () => runWouldYouRather(g);
  const w = wrap();
  head(w, g.emoji + ' ' + (g.n[curL()] || g.n.en), lobby);

  let qIdx = syncState?.qIdx || 0;
  let votes = syncState?.votes || {}; // { peerId: 'a' | 'b' }
  const myVote = () => votes[myId()];

  G = {
    g,
    onRemoteVote(fid, v){
      votes[fid] = v;
      if(isHostUser()){
        broadcast({ t:'pp_act', act:'step', sub:'votes', votes, qIdx });
      }
      render();
    },
    step(m){
      if(m.sub==='votes'){
        votes = m.votes;
        qIdx = m.qIdx;
        render();
      } else if(m.sub==='next'){
        qIdx = m.qIdx;
        votes = {};
        render();
      }
    },
    serialize(){
      return { qIdx, votes };
    }
  };

  const card = H('div','card');
  card.style.padding='22px';
  card.style.display='flex';
  card.style.flexDirection='column';
  card.style.gap='16px';
  w.appendChild(card);

  function render(){
    card.innerHTML = '';
    const item = WYR[qIdx % WYR.length];
    const textA = item.a[curL()] || item.a.en;
    const textB = item.b[curL()] || item.b.en;

    const rHead = H('div','row');
    rHead.style.justifyContent='space-between';
    rHead.appendChild(H('b',null, tx('Round') + ' ' + (qIdx+1) + '/' + WYR.length));
    card.appendChild(rHead);

    const title = H('h3',null, '🤔 ' + tx('Would You Rather?'));
    title.style.textAlign='center';
    card.appendChild(title);

    const voteRow = H('div','row');
    voteRow.style.display='grid';
    voteRow.style.gridTemplateColumns='repeat(auto-fit, minmax(240px, 1fr))';
    voteRow.style.gap='14px';

    const countA = Object.values(votes).filter(v=>v==='a').length;
    const countB = Object.values(votes).filter(v=>v==='b').length;
    const total = countA + countB;
    const pctA = total ? Math.round((countA/total)*100) : 50;
    const pctB = total ? (100 - pctA) : 50;
    const hasVoted = !!myVote();

    // Option A Box
    const boxA = H('button', myVote()==='a'?'primary':'');
    boxA.style.minHeight='100px';
    boxA.style.padding='16px';
    boxA.style.borderRadius='14px';
    boxA.style.textAlign='left';
    boxA.style.display='flex';
    boxA.style.flexDirection='column';
    boxA.style.justifyContent='space-between';
    boxA.onclick = () => castVote('a');

    const txtA = H('div','big', '🅰️ ' + textA);
    txtA.style.fontSize='16px';
    boxA.appendChild(txtA);

    if(hasVoted){
      const barA = H('div');
      barA.style.marginTop='8px';
      barA.style.fontWeight='800';
      barA.textContent = pctA + '% (' + countA + ' votes)';
      boxA.appendChild(barA);
    }
    voteRow.appendChild(boxA);

    // Option B Box
    const boxB = H('button', myVote()==='b'?'primary':'');
    boxB.style.minHeight='100px';
    boxB.style.padding='16px';
    boxB.style.borderRadius='14px';
    boxB.style.textAlign='left';
    boxB.style.display='flex';
    boxB.style.flexDirection='column';
    boxB.style.justifyContent='space-between';
    boxB.onclick = () => castVote('b');

    const txtB = H('div','big', '🅱️ ' + textB);
    txtB.style.fontSize='16px';
    boxB.appendChild(txtB);

    if(hasVoted){
      const barB = H('div');
      barB.style.marginTop='8px';
      barB.style.fontWeight='800';
      barB.textContent = pctB + '% (' + countB + ' votes)';
      boxB.appendChild(barB);
    }
    voteRow.appendChild(boxB);

    card.appendChild(voteRow);

    // Connected Voters Pills
    const votersBox = H('div','row');
    votersBox.style.marginTop='10px';
    getRoster().forEach(p => {
      const v = votes[p.id];
      const pill = H('span', v ? 'vPill done' : 'vPill wait');
      pill.textContent = (p.av||'😎') + ' ' + (p.name||'Player') + (v ? (' (' + v.toUpperCase() + ')') : ' ⏳');
      votersBox.appendChild(pill);
    });
    card.appendChild(votersBox);

    if(isHostUser()){
      const ctrlRow = H('div','row');
      ctrlRow.style.justifyContent='flex-end';
      ctrlRow.style.marginTop='12px';
      const bNext = B('primary','▶ ' + tx('Next Turn'), ()=>{
        qIdx = (qIdx + 1) % WYR.length;
        votes = {};
        broadcast({ t:'pp_act', act:'step', sub:'next', qIdx });
        render();
      });
      bNext.style.minHeight='44px';
      ctrlRow.appendChild(bNext);
      card.appendChild(ctrlRow);
    }
  }

  function castVote(choice){
    snd(620);
    votes[myId()] = choice;
    SCORES[myId()] = (SCORES[myId()] || 0) + 10;
    if(isHostUser()){
      broadcast({ t:'pp_act', act:'step', sub:'votes', votes, qIdx });
    } else {
      broadcast({ t:'pp_act', act:'vote', vote:choice });
    }
    render();
  }

  render();
}

/* ===== 3. EMOJI CHALLENGE ===== */
function runEmojiChallenge(g, syncState){
  VIEW = () => runEmojiChallenge(g);
  const w = wrap();
  head(w, g.emoji + ' ' + (g.n[curL()] || g.n.en), lobby);

  let qIdx = syncState?.qIdx || 0;
  let answered = false;

  G = {
    g,
    step(m){
      if(m.sub==='next'){
        qIdx = m.qIdx;
        answered = false;
        render();
      }
    },
    serialize(){
      return { qIdx };
    }
  };

  const card = H('div','card');
  card.style.padding='22px';
  card.style.textAlign='center';
  card.style.display='flex';
  card.style.flexDirection='column';
  card.style.gap='16px';
  w.appendChild(card);

  function render(){
    card.innerHTML = '';
    const item = EMOJI[qIdx % EMOJI.length];

    const rHead = H('div','row');
    rHead.style.justifyContent='space-between';
    rHead.appendChild(H('b',null, tx('Round') + ' ' + (qIdx+1) + '/' + EMOJI.length));
    card.appendChild(rHead);

    const emojiBig = H('div',null, item.q);
    emojiBig.style.fontSize='54px';
    emojiBig.style.letterSpacing='8px';
    emojiBig.style.padding='16px 0';
    card.appendChild(emojiBig);

    const grid = H('div','grid');
    grid.style.display='grid';
    grid.style.gridTemplateColumns='repeat(auto-fit, minmax(200px, 1fr))';
    grid.style.gap='12px';

    item.opts.forEach(opt => {
      const b = B('', opt, ()=>{
        if(answered) return;
        answered = true;
        if(opt === item.a){
          snd(880,.2);
          b.className = 'primary';
          SCORES[myId()] = (SCORES[myId()] || 0) + 10;
        } else {
          snd(220,.25);
          b.style.background='rgba(239,68,68,.3)';
        }
      });
      b.style.minHeight='48px';
      b.style.fontSize='15px';
      grid.appendChild(b);
    });
    card.appendChild(grid);

    if(isHostUser()){
      const ctrlRow = H('div','row');
      ctrlRow.style.justifyContent='flex-end';
      ctrlRow.style.marginTop='10px';
      const bNext = B('primary','▶ ' + tx('Next Turn'), ()=>{
        qIdx = (qIdx + 1) % EMOJI.length;
        answered = false;
        broadcast({ t:'pp_act', act:'step', sub:'next', qIdx });
        render();
      });
      bNext.style.minHeight='44px';
      ctrlRow.appendChild(bNext);
      card.appendChild(ctrlRow);
    }
  }

  render();
}

/* ===== 4. FAKE OR REAL? ===== */
function runFakeOrReal(g, syncState){
  VIEW = () => runFakeOrReal(g);
  const w = wrap();
  head(w, g.emoji + ' ' + (g.n[curL()] || g.n.en), lobby);

  let qIdx = syncState?.qIdx || 0;
  let revealed = syncState?.revealed || false;

  G = {
    g,
    step(m){
      if(m.sub==='reveal'){
        revealed = true;
        render();
      } else if(m.sub==='next'){
        qIdx = m.qIdx;
        revealed = false;
        render();
      }
    },
    serialize(){
      return { qIdx, revealed };
    }
  };

  const card = H('div','card');
  card.style.padding='22px';
  card.style.textAlign='center';
  card.style.display='flex';
  card.style.flexDirection='column';
  card.style.gap='16px';
  w.appendChild(card);

  function render(){
    card.innerHTML = '';
    const item = FAKE[qIdx % FAKE.length];
    const factText = item.f[curL()] || item.f.en;
    const expText = item.exp[curL()] || item.exp.en;

    const rHead = H('div','row');
    rHead.style.justifyContent='space-between';
    rHead.appendChild(H('b',null, tx('Round') + ' ' + (qIdx+1) + '/' + FAKE.length));
    card.appendChild(rHead);

    const factBox = H('div','big', factText);
    factBox.style.fontSize='22px';
    factBox.style.padding='16px';
    factBox.style.lineHeight='1.4';
    card.appendChild(factBox);

    if(!revealed){
      const btnRow = H('div','row');
      btnRow.style.justifyContent='center';
      btnRow.style.gap='16px';

      const bReal = B('primary','🟢 ' + tx('Real'), ()=>checkAnswer(true));
      bReal.style.minWidth='130px'; bReal.style.minHeight='48px';

      const bFake = B('','🔴 ' + tx('Fake'), ()=>checkAnswer(false));
      bFake.style.minWidth='130px'; bFake.style.minHeight='48px';

      btnRow.appendChild(bReal);
      btnRow.appendChild(bFake);
      card.appendChild(btnRow);
    } else {
      const resBadge = H('div','vPill', item.real ? ('🟢 ' + tx('Real')) : ('🔴 ' + tx('Fake')));
      resBadge.style.alignSelf='center';
      resBadge.style.fontSize='16px';
      card.appendChild(resBadge);

      const expBox = H('div','sub', expText);
      expBox.style.fontSize='15px';
      expBox.style.padding='10px';
      card.appendChild(expBox);

      if(isHostUser()){
        const ctrlRow = H('div','row');
        ctrlRow.style.justifyContent='flex-end';
        ctrlRow.style.marginTop='12px';
        const bNext = B('primary','▶ ' + tx('Next Turn'), ()=>{
          qIdx = (qIdx + 1) % FAKE.length;
          revealed = false;
          broadcast({ t:'pp_act', act:'step', sub:'next', qIdx });
          render();
        });
        bNext.style.minHeight='44px';
        ctrlRow.appendChild(bNext);
        card.appendChild(ctrlRow);
      }
    }
  }

  function checkAnswer(userChoice){
    const item = FAKE[qIdx % FAKE.length];
    if(userChoice === item.real){
      snd(880,.2);
      SCORES[myId()] = (SCORES[myId()] || 0) + 10;
    } else {
      snd(220,.2);
    }
    revealed = true;
    if(isHostUser()){
      broadcast({ t:'pp_act', act:'step', sub:'reveal' });
    }
    render();
  }

  render();
}

/* ===== INTEGRATE PARTY PACK LAUNCH BUTTON INTO GAME HUB ===== */
function initButton(){
  const container = $q('#gameHub') || $q('#gSec') || $q('.mainNav') || document.body;
  const existingBtn = $q('#ppOpen');
  if(existingBtn) existingBtn.remove();

  const b = B('primary', '🎉 ' + tx('Party Pack · 4 Multiplayer Party Games (All Ages)'), open);
  b.id = 'ppOpen';
  b.style.alignSelf = 'flex-start';
  b.style.margin = '8px 0';
  b.style.minHeight = '44px';
  b.style.fontWeight = '700';

  const gList = $q('#gList') || $q('#gameList') || $q('.games-grid');
  if(gList && gList.parentNode){
    gList.parentNode.insertBefore(b, gList);
  } else {
    container.appendChild(b);
  }
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', initButton);
} else {
  initButton();
}

window.openPartyPack = open;

})();