/* ============ CONFIG ============ */
const DEFAULT_GIPHY_KEY = '';           // optional: your Giphy API key
const APP_NAME = 'Friends HUB Party';
const MAX_VOL = 3;                      // 300%

/* ============ i18n : [Thanglish, English, Tamil] ============ */
const D = {
heroBadge:['PREMIUM WATCH PARTY','PREMIUM WATCH PARTY','பிரீமியம் வாட்ச் பார்ட்டி'],
heroSub:['Friends oda same time-la, same screen-la — movie paaru, chat pannu, kondaadu. Local video, YouTube, OTT ellam oru edathula.','Watch movies in perfect sync with your friends — chat, react and celebrate. Local video, YouTube and OTT, all in one place.','நண்பர்களோடு ஒரே நேரத்தில் ஒரே திரையில் படம் பாருங்கள் — சாட், கொண்டாட்டம். லோக்கல் வீடியோ, யூடியூப், OTT எல்லாம் ஒரே இடத்தில்.'],
chipLocal:['Virtual Cinema Hub + YouTube','Virtual Cinema Hub + YouTube','விர்ச்சுவல் சினிமா ஹப் + YouTube'],chipOtt:['OTT Hub','OTT Hub','OTT ஹப்'],chipChat:['Live Chat','Live Chat','லைவ் சாட்'],chipStream:['Live Stream','Live Stream','லைவ் ஸ்ட்ரீம்'],chipBoost:['300% Volume','300% Volume','300% ஒலி'],
getStarted:['Aarambikalam','Get started','தொடங்குங்கள்'],
step1T:['Step 1 · Un peyar','Step 1 · Your name','படி 1 · உங்கள் பெயர்'],
step1D:['Friends-ku theriyura oru name & avatar select pannu.','Pick a name and avatar your friends will see.','நண்பர்களுக்குத் தெரியும் பெயர் மற்றும் அவதார் தேர்வு செய்யுங்கள்.'],
yourName:['Un name','Your name','உங்கள் பெயர்'],namePh:['Eg: Ravi','e.g. Ravi','உதா: ரவி'],pickAvatar:['Avatar','Avatar','அவதார்'],
step2T:['Step 2 · Enna pannanum?','Step 2 · What next?','படி 2 · அடுத்து என்ன?'],
createT:['Create Room','Create Room','ரூம் உருவாக்கு'],
createD:['Puthu room aarambichu, code / link friends-ku anuppu.','Start a new room and send the code or link to your friends.','புதிய ரூம் தொடங்கி, கோட் / லிங்க் நண்பர்களுக்கு அனுப்புங்கள்.'],
createBtn:['Room create pannu','Create room','ரூம் உருவாக்கு'],
joinT:['Join Club','Join Club','கிளப்பில் சேர்'],
joinD:['Friend kudutha room code type panni join aagu.','Enter the room code your friend shared.','நண்பர் பகிர்ந்த ரூம் கோட் உள்ளிட்டு இணையுங்கள்.'],
joinBtn:['Join aagu','Join','இணை'],codePh:['CODE','CODE','கோட்'],
needName:['Mudhalla un name type pannu','Please enter your name first','முதலில் உங்கள் பெயரை உள்ளிடுங்கள்'],
roomCreating:['Room create panren…','Creating room…','ரூம் உருவாக்குகிறது…'],joining:['Join panren…','Joining…','இணைகிறது…'],
codeShort:['Room code type pannu','Enter the room code','ரூம் கோட் உள்ளிடுங்கள்'],
notFound:['Room kedaikala. Code check pannu.','Room not found. Check the code.','ரூம் கிடைக்கவில்லை. கோட் சரிபார்க்கவும்.'],
connErr:['Connection error ({e}). Internet check pannu.','Connection error ({e}). Check your internet.','இணைப்புப் பிழை ({e}). இணையத்தை சரிபார்க்கவும்.'],
connFail:['Connect aagala. Code / internet check pannu.','Could not connect. Check the code / internet.','இணைக்க முடியவில்லை. கோட் / இணையத்தை சரிபார்க்கவும்.'],
noLib:['Connection library load aagala. Intha preview-la external scripts block aagum — normal browser-la (Chrome) illa Netlify-la host panni open pannu.','Connection library failed to load. This preview blocks external scripts — open it in a normal browser or host it on Netlify.','இணைப்பு லைப்ரரி லோட் ஆகவில்லை. சாதாரண உலாவியில் (Chrome) அல்லது ஹோஸ்டிங்கில் திறக்கவும்.'],
inviteReady:['Invite code ready ✅ Name type panni Join click pannu.','Invite code ready ✅ Enter your name and tap Join.','அழைப்புக் கோட் தயார் ✅ பெயர் உள்ளிட்டு சேருங்கள்.'],
fileNote:['Note: file-a direct open pannaa YouTube work aagathu. Netlify/GitHub Pages-la host pannu.','Note: YouTube will not work when opened as a local file. Host it on Netlify / GitHub Pages.','குறிப்பு: லோக்கல் ஃபைலாகத் திறந்தால் யூடியூப் இயங்காது. GitHub Pages/ஹோஸ்டிங்கில் திறக்கவும்.'],
tabPlayer:['Virtual Cinema Hub','Virtual Cinema Hub','விர்ச்சுவல் சினிமா ஹப்'],tabOtt:['OTT Hub','OTT Hub','OTT ஹப்'],
invite:['Invite','Invite','அழை'],
waiting:['Friend-ku wait panren…','Waiting for your friend…','நண்பருக்காகக் காத்திருக்கிறது…'],
connected:['{n} connected','{n} connected','{n} இணைந்தார்'],
roomWait:['Room {c} · friend-ku wait panren…','Room {c} · waiting for a friend…','ரூம் {c} · நண்பருக்காகக் காத்திருக்கிறது…'],
chooseVideo:['Video select pannu','Choose a video','வீடியோ தேர்வு செய்'],
localFile:['Local file','Local file','லோக்கல் ஃபைல்'],ytPh:['YouTube link paste pannu','Paste a YouTube link','யூடியூப் லிங்க் ஒட்டுங்கள்'],load:['Load','Load','லோட்'],subs:['Subtitles','Subtitles','சப்டைட்டில்'],
hint:['Local file upload aagathu — rendu perum same file-a own device-la select pannanum (full quality, no lag). Un kitta file illana friend-a Stream panna sollu. Volume 300% varaikum boost pannalam (local video-ku).','Local files are not uploaded — both of you pick the same file on your own device (full quality, no lag). No file? Ask your friend to Stream it. Volume can be boosted up to 300% (local video).','லோக்கல் ஃபைல் பதிவேற்றப்படாது — இருவரும் ஒரே ஃபைலை அவரவர் சாதனத்தில் தேர்வு செய்ய வேண்டும் (முழு தரம், தாமதமில்லை). ஃபைல் இல்லையெனில் நண்பரிடம் ஸ்ட்ரீம் செய்யச் சொல்லுங்கள். ஒலியை 300% வரை அதிகரிக்கலாம்.'],
partyReady:['Party ready','Party ready','பார்ட்டி தயார்'],
partyReadyD:['Local file select pannu illana YouTube link paste pannu','Pick a local file or paste a YouTube link','லோக்கல் ஃபைல் தேர்வு செய்யுங்கள் அல்லது யூடியூப் லிங்க் ஒட்டுங்கள்'],
selectFile:['📁 Select file','📁 Select file','📁 ஃபைல் தேர்வு'],streamFrom:['📡 Stream from friend','📡 Stream from friend','📡 நண்பரிடமிருந்து ஸ்ட்ரீம்'],
bannerTxt:['{f} select pannadhu: "{n}". Unkitta same file irundha select pannu, illana friend-a stream panna sollu 👇','{f} picked "{n}". Select the same file if you have it, or ask them to stream 👇','{f} தேர்வு செய்தது: "{n}". உங்களிடம் அதே ஃபைல் இருந்தால் தேர்வு செய்யுங்கள், அல்லது நண்பரை ஸ்ட்ரீம் செய்யச் சொல்லுங்கள் 👇'],
streamTo:['Stream to friend','Stream to friend','நண்பருக்கு ஸ்ட்ரீம்'],stopStream:['Stop stream','Stop stream','ஸ்ட்ரீமை நிறுத்து'],
msgPh:['Message type pannu…','Type a message…','செய்தி தட்டச்சு செய்க…'],online:['online','online','ஆன்லைன்'],offline:['offline','offline','ஆஃப்லைன்'],typing:['typing…','typing…','தட்டச்சு செய்கிறார்…'],
gifPh:['GIF search…','Search GIFs…','GIF தேடு…'],search:['Search','Search','தேடு'],save:['Save','Save','சேமி'],
gifKeyNote:['GIF search-ku free Giphy API key venum. Key illana kuda, GIF link-a chat-la paste pannina GIF-a varum.','GIF search needs a free Giphy API key. Without it, pasting a GIF link into chat still works.','GIF தேடலுக்கு இலவச Giphy API key தேவை. அது இல்லையென்றாலும் GIF லிங்க்கை சாட்டில் ஒட்டலாம்.'],
gifNone:['GIF kedaikala 😅','No GIFs found 😅','GIF கிடைக்கவில்லை 😅'],gifFail:['GIF load aagala (key / internet check pannu)','GIF failed to load (check key / internet)','GIF லோட் ஆகவில்லை (இணையத்தை சரிபார்க்கவும்)'],
ttPlay:['Play / Pause (Space)','Play / Pause (Space)','Play / Pause (Space)'],ttBack:['-10s (←)','-10s (←)','-10s (←)'],ttFwd:['+10s (→)','+10s (→)','+10s (→)'],ttMute:['Mute (M)','Mute (M)','Mute (M)'],ttSpeed:['Speed','Speed','வேகம்'],ttLoop:['Loop','Loop','Loop'],ttCC:['Subtitles (C)','Subtitles (C)','சப்டைட்டில் (C)'],ttPip:['Picture in Picture','Picture in Picture','Picture in Picture'],ttFs:['Fullscreen (F)','Fullscreen (F)','முழுத்திரை (F)'],ttHideBar:['Media Bar Maraika (H)','Hide Player Bar (H)','மீடியா பார் மறைக்க (H)'],ttShowBar:['Media Bar Kaatu','Show Player Controls','மீடியா பார் காட்டு'],
/* OTT */
ottSub:['Un favourite OTT-a select pannu — friend-kum same OTT open aagum.','Pick your OTT — your friend gets the same one.','உங்களுக்குப் பிடித்த OTT-ஐத் தேர்வு செய்யுங்கள் — நண்பருக்கும் அதுவே திறக்கும்.'],
ottOpen:['Open','Open','திற'],
nowOn:['Ippo paakura OTT','Now on','தற்போது பார்ப்பது'],
nowSub:['Rendu perum same title, same minute-la open pannu 🎬','Open the same title at the same time 🎬','இருவரும் ஒரே படத்தை ஒரே நேரத்தில் திறங்கள் 🎬'],
clear:['Clear','Clear','நீக்கு'],
ottFriend:['{n} {o}-la irukkaru — neeyum open pannu 👉','{n} is on {o} — open it too 👉','{n} {o}-ல் இருக்கிறார் — நீங்களும் திறங்கள் 👉'],
ottYt:['YouTube-ku Virtual Cinema Hub tab-la link paste pannu 👆','For YouTube, paste the link in the Virtual Cinema Hub tab 👆','யூடியூப்புக்கு விர்ச்சுவல் சினிமா ஹப் தாவலில் லிங்க்கை ஒட்டுங்கள் 👆'],
popBlock:['Pop-up block aachu — browser-la allow pannu','Pop-up blocked — please allow it in your browser','பாப்-அப் தடுக்கப்பட்டது — உலாவியில் அனுமதி கொடுங்கள்'],
kitT:['Sync Kit — OTT-ku onna paakka','Sync Kit — watch OTT together','Sync Kit — OTT-ஐ இணைந்து பார்க்க'],
kitD:['Rendu perum own OTT account-la same title open pannitu, inga ready + countdown use pannu.','Both open the same title on your own OTT accounts, then use ready + countdown here.','இருவரும் உங்கள் OTT கணக்கில் ஒரே தலைப்பைத் திறந்து, இங்கு ready + countdown பயன்படுத்துங்கள்.'],
kReady:['Naan ready','I am ready','நான் தயார்'],kCount:['3-2-1 Play','3-2-1 Play','3-2-1 Play'],kPause:['Pause pannu','Pause now','இடைநிறுத்து'],kPlay:['Resume pannu','Resume','தொடர்'],
uniStreamBadge:['🌐 Universal Stream','🌐 Universal Stream','🌐 யுனிவர்சல் ஸ்ட்ரீம்'],
uniStreamPh:['YouTube, HLS (.m3u8), DASH (.mpd), Direct MP4/Audio, alladhu OTT link paste pannunga...','Paste YouTube, HLS (.m3u8), DASH (.mpd), Direct Video/Audio, or OTT Link...','YouTube, HLS (.m3u8), DASH (.mpd), Direct Video/Audio அல்லது OTT லிங்க் ஒட்டவும்...'],
uniLoadBtn:['▶ Load Stream','▶ Load Stream','▶ ஸ்ட்ரீம் தொடங்கு'],
uniStreamShare:['📡 Screen Stream','📡 Stream Screen','📡 திரையைப் பகிர்'],
sysStreamStarted:['Stream aarambichurukku','Stream started','ஸ்ட்ரீம் தொடங்கியது'],
ottNote:['<b>Gnabagam vachuko:</b> Netflix, Prime, JioHotstar madhiri OTT-ku DRM protection irukku — adhai intha site kulla play panna / share panna mudiyaadhu. Adhunaala adhai <b>own tab / app-la own account</b>-la play pannu; inga <b>chat, emoji, countdown</b> use pannu. YouTube link-a <b>Virtual Cinema Hub</b> tab-la paste pannunga — adhu inga direct-a sync aagum.','<b>Heads up:</b> OTTs like Netflix, Prime and JioHotstar use DRM, so they cannot be played or screen-shared inside this site. Play them in <b>your own tab/app with your own account</b> and use the <b>chat, reactions and countdown</b> here. For YouTube, paste the link in the <b>Virtual Cinema Hub</b> tab — it syncs directly.','<b>நினைவில் வையுங்கள்:</b> Netflix, Prime, JioHotstar போன்ற OTT தளங்களுக்கு DRM பாதுகாப்பு உள்ளது — அவற்றை நேரடியாக பிளேயரில் உட்பொதிக்க முடியாது. அவற்றை உங்கள் தனித் தாவலில் சொந்த கணக்கில் இயக்கி, இங்கு சாட் மற்றும் கவுன்ட்டவுன் மூலம் ஒத்திசைக்கவும். யூடியூப் லிங்க்கை நேரடியாக விர்ச்சுவல் சினிமா ஹப்பில் ஒட்டலாம்.'],
sysReady:['{n} ready ✅','{n} is ready ✅','{n} தயார் ✅'],
cdGo:['GO!','GO!','GO!'],cdSub:['Ippo Play press pannu ▶','Press Play now ▶','இப்போது Play அழுத்தவும் ▶'],
callPause:['{n}: Pause pannunga ⏸','{n}: Pause please ⏸','{n}: Pause செய்யுங்கள் ⏸'],callPlay:['{n}: Resume pannunga ▶','{n}: Resume please ▶','{n}: Resume செய்யுங்கள் ▶'],
/* toasts & system */
tCopied:['Invite link copy aachu ✅','Invite link copied ✅','அழைப்பு லிங்க் நகலெடுக்கப்பட்டது ✅'],tCopyPrompt:['Intha link copy pannu:','Copy this link:','இந்த லிங்க்கை நகலெடுக்கவும்:'],
tSyncReq:['Sync request anuppiten ⟳','Sync request sent ⟳','Sync கோரிக்கை அனுப்பப்பட்டது ⟳'],tStreamReq:['Friend-ku stream request anuppiten 📡','Stream request sent 📡','ஸ்ட்ரீம் கோரிக்கை அனுப்பப்பட்டது 📡'],
tPickYT:['Valid YouTube link paste pannu','Paste a valid YouTube link','சரியான யூடியூப் லிங்க் ஒட்டுங்கள்'],
sysYt:['YouTube video load aachu ▶','YouTube video loaded ▶','யூடியூப் வீடியோ லோட் ஆனது ▶'],
sysFriendYt:['{n} YouTube video load pannaru','{n} loaded a YouTube video','{n} யூடியூப் வீடியோ லோட் செய்தார்'],
tYtLoaded:['YouTube video load aachu','YouTube video loaded','யூடியூப் வீடியோ லோட் ஆனது'],
sysPick:['File select pannen: {f}','Selected file: {f}','தேர்ந்தெடுத்த ஃபைல்: {f}'],sysFriendFile:['{n} file select pannaru: {f}','{n} selected: {f}','{n} தேர்வு செய்தது: {f}'],
sysMismatch:['⚠️ Rendu perum different file select pannirukkinga — sync mismatch aagalam','⚠️ You picked different files — sync may drift','⚠️ இருவரும் வெவ்வேறு ஃபைல்களைத் தேர்வு செய்துள்ளீர்கள் — sync மாறலாம்'],
sysJoined:['{n} join aanaru 🎉','{n} joined 🎉','{n} இணைந்தார் 🎉'],sysLeft:['{n} poitaaru (disconnected)','{n} disconnected','{n} வெளியேறினார்'],
sysRoomCode:['Room code: {c}. Invite link friend-ku anuppu 👉','Room code: {c}. Send the invite link to your friend 👉','ரூம் கோட்: {c}. அழைப்பு லிங்க்கை நண்பருக்கு அனுப்புங்கள் 👉'],sysRoomJoined:['Room {c}-la join aachu','Joined room {c}','ரூம் {c}-ல் இணைந்தது'],
tPlay:['{n} play pannaru ▶','{n} played ▶','{n} இயக்கினார் ▶'],tPause:['{n} pause pannaru ⏸','{n} paused ⏸','{n} நிறுத்தினார் ⏸'],tSeek:['{n} → {t}','{n} → {t}','{n} → {t}'],
tStreamAsk:['{n} stream kekkuraru — start panren 📡','{n} asked for a stream — starting 📡','{n} ஸ்ட்ரீம் கேட்கிறார் — தொடங்குகிறது 📡'],tStreamNeedFile:['{n} stream kekkuraru — mudhalla local file select pannu','{n} wants a stream — pick a local file first','{n} ஸ்ட்ரீம் கேட்கிறார் — முதலில் லோக்கல் ஃபைல் தேர்வு செய்யுங்கள்'],
tAutoplay:['Browser autoplay block panniduchu - Play button thattu','Autoplay blocked — tap Play','தானியங்கி இயக்கம் தடுக்கப்பட்டது — Play பொத்தானை அழுத்தவும்'],
tFormat:['Intha format browser-la play aagala. MP4 (H.264) / WebM try pannu. MKV/AVI sila time work aagathu.','This format will not play in the browser. Try MP4 (H.264) / WebM.','இந்த வடிவம் உலாவியில் இயங்கவில்லை. MP4 (H.264) / WebM முயற்சிக்கவும்.'],
tSubLocal:['Subtitle local video-ku mattum work aagum','Subtitles work for local video only','சப்டைட்டில் லோக்கல் வீடியோவுக்கு மட்டுமே இயங்கும்'],tSubAdded:['Subtitle add aachu ✅','Subtitles added ✅','சப்டைட்டில் சேர்க்கப்பட்டது ✅'],
tPipNo:['PiP intha browser-la support illa','PiP is not supported in this browser','இந்த உலாவியில் PiP வசதி இல்லை'],tPipYt:['PiP YouTube-ku support illa','PiP is not available for YouTube','யூடியூப்புக்கு PiP வசதி இல்லை'],
t153:['Error 153: page-a Netlify/https-la host pannu (file/preview-la YouTube work aagathu)','Error 153: host this page on https (YouTube does not work from a file/preview)','Error 153: பக்கத்தை HTTPS-ல் இயக்கவும்'],tEmbed:['Intha video embed panna mudiyala (owner block pannirukkar). Vera video try pannu','This video cannot be embedded (owner blocked it). Try another','இந்த வீடியோவை உட்பொதிக்க முடியாது. வேறு வீடியோ முயற்சிக்கவும்'],tYtErr:['YouTube error: {e}','YouTube error: {e}','யூடியூப் பிழை: {e}'],
tYtMax:['YouTube-la max 100% dhaan (boost local video-ku mattum)','YouTube is capped at 100% (boost is for local video)','யூடியூப்பில் அதிகபட்சம் 100% தான் (boost லோக்கல் வீடியோவுக்கு)'],
tNotConn:['Friend innum connect aagala','Friend is not connected yet','நண்பர் இன்னும் இணையவில்லை'],tNeedLocal:['Mudhalla local file select pannu','Select a local file first','முதலில் லோக்கல் ஃபைல் தேர்வு செய்யுங்கள்'],
tNoCap:['Intha browser-la stream support illa. Laptop/Android Chrome use pannu (iPhone Safari work aagathu)','Streaming is not supported here. Use Chrome on laptop/Android (not iPhone Safari)','இங்கு ஸ்ட்ரீம் ஆதரவு இல்லை. மடிக்கணினி/Android Chrome உலாவியைப் பயன்படுத்தவும்'],
tStreamFail:['Stream start aagala','Could not start the stream','ஸ்ட்ரீம் தொடங்க முடியவில்லை'],tNeedPlay:['Video-va oru second play panni, marubadi Stream click pannu','Play the video for a second, then click Stream again','வீடியோவை ஒரு நொடி இயக்கிவிட்டு மீண்டும் Stream அழுத்தவும்'],
sysStreamOut:['Video stream pannuren 📡 — {n}-ku live-a play aagum','Streaming to {n} 📡','{n}-க்கு ஸ்ட்ரீம் செய்கிறேன் 📡'],tStreamOn:['Stream start aachu 📡','Stream started 📡','ஸ்ட்ரீம் தொடங்கியது 📡'],
sysStreamIn:['{n} video stream pannuraru 📡','{n} is streaming a video 📡','{n} வீடியோ ஸ்ட்ரீம் செய்கிறார் 📡'],tTap:['Screen-la oru tap pannu — video start aagum','Tap the screen to start the video','திரையைத் தொட்டால் வீடியோ தொடங்கும்'],
tStreamEnd:['Stream nindruduchu','Stream ended','ஸ்ட்ரீம் முடிந்தது'],sysStreamEnd:['Stream mudinjuchu','Stream ended','ஸ்ட்ரீம் முடிந்தது'],
liveStream:['📡 {n} live stream','📡 {n} live stream','📡 {n} நேரலை ஸ்ட்ரீம்'],
linkT:['Movie link add pannu','Add a movie link','திரைப்பட லிங்க் சேர்'],
linkD:['Netflix / Prime / aha etc. movie link paste pannu — friend-kum list-la varum, ore click-la open pannalam.','Paste a movie link from any OTT — it shows up for your friend too, one click to open.','எந்த OTT திரைப்பட லிங்க்கையும் ஒட்டலாம் — நண்பருக்கும் தோன்றும், ஒரே கிளிக்கில் திறக்கலாம்.'],
linkTitlePh:['Movie peyar (optional)','Movie title (optional)','படத்தின் பெயர் (விருப்பத்திற்குரியது)'],
linkUrlPh:['Movie link paste pannu (https://…)','Paste movie link (https://…)','மூவி லிங்க் ஒட்டுங்கள் (https://…)'],
linkAdd:['Add & share','Add & share','சேர் & பகிர்'],
linkNone:['Innum link edhuvum illa','No links yet','இன்னும் லிங்க் எதுவும் இல்லை'],
linkBad:['Valid link paste pannu (https://…)','Paste a valid link (https://…)','சரியான லிங்க் ஒட்டுங்கள் (https://…)'],
linkBy:['{n} add pannadhu','added by {n}','{n} சேர்த்தது'],
linkPlayHere:['Inga play pannu','Play here','இங்கு இயக்கு'],
linkFriend:['{n} movie link add pannaru: {t}','{n} added a movie link: {t}','{n} மூவி லிங்க் சேர்த்தார்: {t}'],
linkOpened:['{n} "{t}" open pannaru — neeyum open pannu 👉','{n} opened "{t}" — open it too 👉','{n} "{t}" திறந்தார் — நீங்களும் திறங்கள் 👉'],
linkAdded:['Link add aachu ✅','Link added ✅','லிங்க் சேர்க்கப்பட்டது ✅'],
remove:['Remove','Remove','நீக்கு'],
tConnErr:['Connection error: {e}','Connection error: {e}','இணைப்புப் பிழை: {e}'],
tabGames:['Game Hub','Game Hub','கேம் ஹப்'],tabScore:['Scoreboard Hub','Scoreboard Hub','ஸ்கோர்போர்டு ஹப்'],
nOnline:['{n} online','{n} online','{n} ஆன்லைன்'],partyChat:['Party chat','Party chat','பார்ட்டி சாட்'],
plTitle:['Players & devices','Players & devices','வீரர்கள் மற்றும் சாதனங்கள்'],
plHint:['Innoru phone / laptop-la intha code use panni join aagalaam. Oru room-la 8 per varaikum.','Join from any other phone or laptop with this code. Up to 8 devices per room.','வேறு போன் / லேப்டாப்பில் இந்தக் கோடைப் பயன்படுத்தி இணையலாம். ஒரு ரூமில் 8 பேர் வரை.'],
plCopy:['Copy invite link','Copy invite link','அழைப்பு லிங்க் நகலெடு'],hostTag:['HOST','HOST','ஹோஸ்ட்'],youTag:['YOU','YOU','நீங்கள்'],
sysExit:['{n} room-ai vittu poitaaru','{n} left the room.','{n} அறையை விட்டு வெளியேறினார்.'],sysKick:['Admin {n}-ai remove pannaaru','Admin removed {n} from the room.','{n}-ஐ Admin அறையிலிருந்து நீக்கினார்.'],sysHostGone:['Host poitaaru — room mudinjuchu','Host left — the room has ended','ஹோஸ்ட் வெளியேறிவிட்டார் — அறை முடிந்தது'],
tFull:['Room full (max 8)','Room is full (max 8)','ரூம் நிறைந்துவிட்டது (அதிகபட்சம் 8)'],
tSyncSent:['Sync anuppiten — ellarum un time-ku varuvaanga ⟳','Sync sent — everyone follows your position ⟳','Sync அனுப்பப்பட்டது — அனைவரும் உங்கள் நேரத்திற்கு வருவர் ⟳'],
gHubT:['Game Hub','Game Hub','கேம் ஹப்'],
gHubD:['{n} multiplayer games — friends oda vilaiyaadu. Yaarum illana Bot add pannalaam 🤖','{n} multiplayer games — play with your friends. Add a bot if nobody is around 🤖','{n} மல்டிபிளேயர் கேம்கள் — நண்பர்களோடு விளையாடுங்கள். யாருமில்லையென்றால் Bot சேர்க்கலாம் 🤖'],
gSearch:['🔍 Search games…','🔍 Search games…','🔍 விளையாட்டுகளைத் தேடு…'],
gNoMatch:['No games match your search.','No games match your search.','பொருந்தும் விளையாட்டு இல்லை.'],
gClear:['✕ Clear search','✕ Clear search','✕ தேடலை நீக்கு'],
gPlayers:['{a}–{b} players','{a}–{b} players','{a}–{b} வீரர்கள்'],gPlayersEq:['{a} players','{a} players','{a} வீரர்கள்'],
gPlay:['Play','Play','விளையாடு'],gJoin:['Join','Join','சேர்'],gLeave:['Leave','Leave','விலகு'],
gAddBot:['🤖 Add bot','🤖 Add bot','🤖 Bot சேர்'],gStart:['▶ Start game','▶ Start game','▶ கேம் தொடங்கு'],
gBack:['← Game Hub','← Game Hub','← கேம் ஹப்'],gQuit:['End game','End game','கேம் முடி'],
gNeed:['Innum {n} player venum — friend-a join panna sollu illana Bot add pannu','{n} more player(s) needed — invite a friend or add a bot','இன்னும் {n} வீரர்கள் தேவை — நண்பரை அழைக்கவும் அல்லது Bot சேர்க்கவும்'],
gYourTurn:['👉 Un turn!','👉 Your turn!','👉 உங்கள் முறை!'],gTurnOf:['{n} turn…','{n}\'s turn…','{n} முறை…'],
gSimul:['Ellarum ippo play pannunga!','Everyone play now!','அனைவரும் இப்போது விளையாடுங்கள்!'],gWatch:['Nee spectator 👀','You are watching 👀','நீங்கள் பார்வையாளர் 👀'],
gRoll:['🎲 Roll','🎲 Roll','🎲 உருட்டு'],gBuy:['Buy','Buy','வாங்கு'],gSkip:['Skip','Skip','விடு'],
gAgain:['Play again','Play again','மீண்டும் விளையாடு'],gClose:['Close','Close','மூடு'],
gWinT:['{n} jeettaar!','{n} wins!','{n} வெற்றி!'],gYouWin:['Nee dhaan winner! 🎉','You are the winner! 🎉','நீங்கள்தான் வெற்றியாளர்! 🎉'],gDrawT:['Draw 🤝','Draw 🤝','சமம் 🤝'],
gOpened:['{n} {g} lobby open pannaru — Game Hub-la join aagu 🎮','{n} opened a {g} lobby — join in Game Hub 🎮','{n} {g} லobby திறந்தார் — Game Hub-ல் சேருங்கள் 🎮'],
gScoreT:['Scoreboard Hub','Scoreboard Hub','ஸ்கோர்போர்டு ஹப்'],
gScoreD:['Games-la jeichu points sera — 1st +10, 2nd +6, 3rd +3','Win games to earn points — 1st +10, 2nd +6, 3rd +3','கேம்களில் வென்று புள்ளிகள் பெறுங்கள் — 1வது +10, 2வது +6, 3வது +3'],
gPlayer:['Player','Player','வீரர்'],gPts:['Points','Points','புள்ளிகள்'],gWins:['Wins','Wins','வெற்றிகள்'],gGames:['Games','Games','கேம்கள்'],
gNoScore:['Innum game aadala — oru game aadi points edu!','No games played yet — play one and score points!','இன்னும் கேம் விளையாடவில்லை — ஒன்று விளையாடி புள்ளிகள் பெறுங்கள்!'],
gRecent:['Recent games','Recent games','சமீபத்திய விளையாட்டுகள்'],gReset:['Reset scores','Reset scores','மதிப்பெண் மீட்டமை'],
gTypeThis:['Intha text-a type pannu:','Type this text:','இந்த உரையைத் தட்டச்சு செய்க:'],gGo:['GO!','GO!','GO!'],
gDone:['Mudinjuchu ✅ {s}s · {w} WPM','Done ✅ {s}s · {w} WPM','முடிந்தது ✅ {s}வி · {w} WPM'],
gWaitOthers:['Matravanga mudikka wait pannu…','Waiting for the others…','மற்றவர்கள் முடிக்க காத்திருங்கள்…'],
gQ:['Question {i}/{n}','Question {i}/{n}','கேள்வி {i}/{n}'],gAnswered:['Answered ✓','Answered ✓','பதிலளிக்கப்பட்டது ✓'],gRound:['Round {i}/{n}','Round {i}/{n}','சுற்று {i}/{n}'],
gCash:['Cash','Cash','பணம்'],gBuyQ:['{n} vaanguvaya? ₹{p}','Buy {n} for ₹{p}?','{n} வாங்க விரும்புகிறீர்களா? ₹{p}'],
gWorth:['Net worth','Net worth','மொத்த மதிப்பு'],gMove:['Move','Move','நகர்த்து'],gCheck:['Check!','Check!','செக்!'],
d_ludo:['Dice potti — 4 tokens-a home-ku kondu po','Race all 4 tokens home','4 காய்களையும் வீட்டிற்கு கொண்டு செல்லுங்கள்'],
d_chess:['Classic strategy — checkmate pannu','Classic strategy — go for checkmate','பாரம்பரிய வியூகம் — எதிரி ராஜாவை செக்மேட் செய்யுங்கள்'],
d_biz:['Property vaangi, rent vaangi, business king aagu','Buy property, collect rent, become the tycoon','சொத்து வாங்கி, வாடகை வசூலித்து தொழில் மன்னராகுங்கள்'],
d_quiz:['Cinema & GK quiz — fast-a correct-a sollu','Cinema & GK quiz — answer fast and right','சினிமா & பொது அறிவு வினாடி வினா — வேகமாக சரியான பதில் கூறுங்கள்'],
d_ttt:['3 X / O oru line-la vara vei','Get 3 in a row','3 X / O ஒரே வரிசையில் அமையுங்கள்'],
d_c4:['4 discs oru line-la connect pannu','Connect 4 discs in a line','4 வட்டுகளை ஒரே வரிசையில் இணையுங்கள்'],
d_snl:['Paambu 🐍 thavirthu, ladder 🪜 yeri 100-ku mudhalla po','Dodge snakes, climb ladders, reach 100 first','பாம்பைத் தவிர்த்து, ஏணி ஏறி 100-ஐ முதலில் எட்டுங்கள்'],
d_rps:['Kal-Kaagidham-Kathri — 5 rounds','Rock-Paper-Scissors — 5 rounds','கல்-காகிதம்-கத்தரி — 5 சுற்றுகள்'],
d_mem:['Emoji pairs-a match pannu — nyabagam sodhanai','Match the emoji pairs — memory test','எமோஜி ஜோடிகளைப் பொருத்துங்கள் — நினைவாற்றல் சோதனை'],
d_type:['Fast-a type pannu — yaaru mudhalla?','Type fast — who finishes first?','வேகமாகத் தட்டச்சு செய்க — யார் முதலில்?'],
tYtFb:['YouTube player error — backup mode-la load aachu (play/pause YouTube player-la thattu)','YouTube player error — loaded in backup mode (use the YouTube player controls)','யூடியூப் பிழை — மாற்று முறையில் ஏற்றப்பட்டது'],typingN:['{n} type panraanga…','{n} is typing…','{n} தட்டச்சு செய்கிறார்…'],
};

let lang = (function(){ try{ return localStorage.getItem('fwp-lang')||'th'; }catch(e){ return 'th'; } })();
const LI={th:0,en:1,ta:2};
function t(k,v){ const e=D[k]; let s=e?(e[LI[lang]]||e[0]):k; if(v) for(const x in v) s=s.split('{'+x+'}').join(v[x]); return s; }

/* ============ HELPERS ============ */
const $ = s => document.querySelector(s);
const store = {
  get(k){ try{ return localStorage.getItem(k) || ''; }catch(e){ return ''; } },
  set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
};
const state = { mode:null, loop:false, ytId:null, localMeta:null, remoteLocal:null, blob:null, muted:false, vol:1, sh:null, streaming:false, calls:new Map(), ott:null, links:[] };
let peer=null, conn=null, isHost=false, myName='', myAv='😎', friendOnline=false, code='';
let lastAct=0, seeking=false, unread=0, lastPl=null, lobbyKey='', lobbyCls='';
const video = $('#video'), stage = $('#stage');
let yt=null, ytReady=false, ytPending=null, ytQueue=[];

const svg = p => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';
const ICON = {
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z"/></svg>',
  pause:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4.2" height="14" rx="1.4"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.4"/></svg>',
  back:svg('<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><text x="12" y="15.4" font-size="7.5" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">10</text>'),
  fwd:svg('<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/><text x="12" y="15.4" font-size="7.5" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">10</text>'),
  vol:svg('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>'),
  volLow:svg('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>'),
  mute:svg('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m16 9 5 6M21 9l-5 6"/>'),
  loop:svg('<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>'),
  cc:svg('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 10.5a2 2 0 1 0 0 3M16 10.5a2 2 0 1 0 0 3"/>'),
  pip:svg('<rect x="3" y="4" width="18" height="16" rx="2.5"/><rect x="12" y="12" width="6.5" height="4.5" rx="1" fill="currentColor"/>'),
  fs:svg('<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/>'),
  cast:svg('<path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/><path d="M2 12a9 9 0 0 1 8 8M2 16a5 5 0 0 1 4 4M2 20h.01"/>'),
  smile:svg('<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9.5h.01M15 9.5h.01"/>'),
  send:svg('<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>')
};
function fmt(s){
  s=Math.max(0,Math.floor(s||0));
  const h=Math.floor(s/3600), m=Math.floor(s%3600/60), sec=s%60;
  return (h? h+':'+String(m).padStart(2,'0') : m)+':'+String(sec).padStart(2,'0');
}
let toastT;
function toast(msg){ const el=$('#toast'); el.textContent=msg; el.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove('on'),3000); }
function flash(k){
  const b=$('#bigIcon'); const m={'▶':ICON.play,'⏸':ICON.pause,'⏩':ICON.fwd,'⏪':ICON.back};
  b.innerHTML=m[k]||k; b.classList.remove('go'); void b.offsetWidth; b.classList.add('go');
}
function setNow(x){ $('#nowp').textContent=x||''; }

/* ============ ONE GLOBAL LANGUAGE SYSTEM (English / தமிழ் / Tanglish) ============ */
const GLOBAL_LANGS = [
  ['en', 'English', 'Switch to English'],
  ['ta', 'தமிழ்', 'தமிழுக்கு மாறவும்'],
  ['th', 'Tanglish', 'Tanglish-ku maathunga']
];
function buildLangSw(){
  document.querySelectorAll('.langsw').forEach(box=>{
    box.innerHTML='';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Global Language');
    GLOBAL_LANGS.forEach(([k, label, title])=>{
      const b=document.createElement('button');
      b.type='button';
      b.textContent=label;
      b.title=title;
      b.setAttribute('aria-label', title);
      b.className=k===lang?'on':'';
      b.onclick=()=>setLang(k);
      box.appendChild(b);
    });
  });
}
function setLang(k){
  lang=k;
  store.set('fwp-lang',k);
  applyLang();
  toast('🌐 ' + (k==='ta'?'மொழி: தமிழ்':k==='th'?'Language: Tanglish':'Language: English'));
}
function applyLang(){
  document.documentElement.lang = lang==='ta'?'ta':'en';
  document.querySelectorAll('[data-i]').forEach(e=>e.textContent=t(e.dataset.i));
  document.querySelectorAll('[data-ih]').forEach(e=>e.innerHTML=t(e.dataset.ih));
  document.querySelectorAll('[data-ph]').forEach(e=>e.placeholder=t(e.dataset.ph));
  document.querySelectorAll('[data-tt]').forEach(e=>e.title=t(e.dataset.tt));
  buildLangSw();
  onRosterChanged();
  updateStreamBtn();
  if(window.gamesLang) gamesLang();
  if(window.ppApplyLang) window.ppApplyLang();
  renderOtt();
  renderNowbar();
  renderLinks();
  const uniBadge = $('#uniStreamBadge'), uniIn = $('#uniUrlIn'), uniBtn = $('#uniLoadBtn'), uniShare = $('#uniStreamShareBtn');
  if(uniBadge) uniBadge.textContent = t('uniStreamBadge');
  if(uniIn) uniIn.placeholder = t('uniStreamPh');
  if(uniBtn) uniBtn.textContent = t('uniLoadBtn');
  if(uniShare) uniShare.textContent = t('uniStreamShare');
  showLobby(lobbyKey,lobbyCls,lobbyVars);
  const gb=$('#gbox');
  if(gb && curTab==='G'){
    if(typeof gRender==='function') gRender();
  }
  if(curTab==='S' && typeof scoreRender==='function') scoreRender();
  if(window.__aiUpdateLang) window.__aiUpdateLang();
}
let lobbyVars=null;
function showLobby(k,cls,v){ lobbyKey=k||''; lobbyCls=cls||''; lobbyVars=v||null; const m=$('#lobbyMsg'); m.textContent=k?t(k,v):''; m.className='msg'+(cls?' '+cls:''); }

/* ============ AUDIO (volume up to 300%) ============ */
const aud={ctx:null,src:null,gain:null,dest:null};
function routeStream(){
  try{ if(aud.ss){ try{ aud.ss.disconnect(); }catch(e){} aud.ss=null; }
    const rs=video.srcObject;
    if(state.mode==='stream'&&rs&&rs.getAudioTracks&&rs.getAudioTracks().length){ aud.ss=aud.ctx.createMediaStreamSource(new MediaStream(rs.getAudioTracks())); aud.ss.connect(aud.gain); if(aud.src){ try{ aud.src.disconnect(aud.gain); }catch(e){} } }
    else if(aud.src){ try{ aud.src.connect(aud.gain); }catch(e){} }
  }catch(e){}
}
function ensureAudio(){
  if(aud.gain){ if(aud.ctx.state==='suspended') aud.ctx.resume().catch(()=>{}); return true; }
  try{
    const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return false;
    aud.ctx=new AC(); aud.gain=aud.ctx.createGain(); aud.comp=aud.ctx.createDynamicsCompressor();
    aud.comp.threshold.value=-12; aud.comp.knee.value=10; aud.comp.ratio.value=1; aud.comp.attack.value=.003; aud.comp.release.value=.25;
    aud.gain.connect(aud.comp); aud.comp.connect(aud.ctx.destination); aud.dest=aud.ctx.createMediaStreamDestination();
    try{ aud.src=aud.ctx.createMediaElementSource(video); aud.src.connect(aud.gain); aud.src.connect(aud.dest); }catch(e){ aud.src=null; console.warn('MES',e); }
    if(aud.ctx.state==='suspended') aud.ctx.resume().catch(()=>{});
    routeStream(); return true;
  }catch(e){ console.warn(e); aud.ctx=aud.src=aud.gain=aud.dest=aud.comp=null; toast('Volume boost not supported in this browser'); return false; }
}
function applyVol(){
  const v=state.vol, m=state.muted;
  if(state.mode==='yt'){ if(ytReady){ yt.setVolume(Math.round(Math.min(1,v)*100)); m?yt.mute():yt.unMute(); } }
  else if(aud.gain){ aud.gain.gain.value=m?0:v; if(aud.comp) aud.comp.ratio.value=v>1?12:1; video.volume=1; video.muted=false; if(aud.ctx.state==='suspended') aud.ctx.resume().catch(()=>{}); }
  else { video.volume=Math.min(1,v); video.muted=m; }
  const pct=Math.round(v*100), eff=m?0:pct;
  const sl=$('#vol'); sl.value=Math.round(v*100);
  const frac=Math.min(v,MAX_VOL)/MAX_VOL*100, white=Math.min(frac,100/MAX_VOL*1);
  const w=Math.min(frac,33.33);
  sl.style.setProperty('--trk','linear-gradient(to right,#fff 0,#fff '+w+'%,'+(frac>33.33?'#fb923c '+w+'%,#ef4444 '+frac+'%':'rgba(255,255,255,.25) '+w+'%')+(frac>33.33?',':',')+'rgba(255,255,255,.25) '+frac+'%)');
  const pe=$('#volPct'); pe.textContent=eff+'%'; pe.classList.toggle('boost',!m&&pct>100);
  $('#bMute').innerHTML = (m||v===0) ? ICON.mute : (v<0.5 ? ICON.volLow : ICON.vol);
}
$('#vol').oninput=e=>{
  const v=parseInt(e.target.value,10)/100; state.vol=v;
  if(v>1){ if(state.mode==='yt') toast(t('tYtMax')); else ensureAudio(); }
  if(state.muted&&v>0) state.muted=false;
  applyVol();
};
$('#bMute').onclick=()=>{ state.muted=!state.muted; applyVol(); };
function stepVol(d){ state.vol=Math.min(MAX_VOL,Math.max(0,Math.round((state.vol+d)*100)/100)); if(state.vol>1&&state.mode!=='yt') ensureAudio(); if(state.muted&&state.vol>0) state.muted=false; applyVol(); }

/* ============ UNIVERSAL STREAMING ENGINE (HLS, DASH, MP4, YouTube, OTT) ============ */
let hls = null, dash = null;
function destroyHls(){ if(hls){ try{ hls.destroy(); }catch(e){} hls = null; } }
function destroyDash(){ if(dash){ try{ dash.reset(); }catch(e){} dash = null; } }

/* OTT Companion Watch Party Co-Watching Timer */
let ottTimer = {
  startAt: 0,
  accum: 0,
  playing: false,
  rate: 1,
  dur: 7200
};
function getOttTime(){
  return ottTimer.accum + (ottTimer.playing ? (Date.now() - ottTimer.startAt)/1000 * ottTimer.rate : 0);
}
function getOttDur(){ return ottTimer.dur; }
function isOttPlaying(){ return ottTimer.playing; }
function startOttTimer(){
  if(ottTimer.playing) return;
  ottTimer.playing = true;
  ottTimer.startAt = Date.now();
  renderOttCompanionTimer();
}
function pauseOttTimer(){
  if(!ottTimer.playing) return;
  ottTimer.accum = getOttTime();
  ottTimer.playing = false;
  renderOttCompanionTimer();
}
function seekOttTimer(x){
  ottTimer.accum = Math.max(0, x);
  ottTimer.startAt = Date.now();
  renderOttCompanionTimer();
}
function setOttRate(r){
  ottTimer.accum = getOttTime();
  ottTimer.startAt = Date.now();
  ottTimer.rate = r;
}
function renderOttCompanionTimer(){
  const el = $('#ottCompTimer');
  if(el) el.textContent = fmt(getOttTime());
}
setInterval(()=>{
  if(state.mode === 'ott' && ottTimer.playing){
    renderOttCompanionTimer();
    const d = getOttDur(), x = getOttTime();
    if(!seeking){
      seek.value = d ? x/d*1000 : 0;
      setProg(d ? x/d : 0, 1);
      $('#tm').textContent = fmt(x) + ' / ' + fmt(d);
    }
  }
}, 350);

/* ============ PLAYER ABSTRACTION ============ */
const P = {
  play(){
    if(state.mode==='yt'){ ytReady && yt.playVideo(); }
    else if(state.mode==='ott'){ startOttTimer(); }
    else if(state.mode){
      if(aud.ctx&&aud.ctx.state==='suspended') aud.ctx.resume().catch(()=>{});
      const p = video.play();
      if(p && p.catch) p.catch(()=>toast(t('tAutoplay')));
    }
  },
  pause(){
    if(state.mode==='yt'){ ytReady && yt.pauseVideo(); }
    else if(state.mode==='ott'){ pauseOttTimer(); }
    else if(state.mode) video.pause();
  },
  seek(x){
    if(state.mode==='yt'){ ytReady && yt.seekTo(x,true); }
    else if(state.mode==='ott'){ seekOttTimer(x); }
    else { try{ video.currentTime=x; }catch(e){} }
  },
  time(){
    if(state.mode==='yt') return (ytReady&&yt.getCurrentTime ? yt.getCurrentTime() : 0);
    if(state.mode==='ott') return getOttTime();
    return video.currentTime || 0;
  },
  dur(){
    if(state.mode==='yt') return (ytReady&&yt.getDuration ? yt.getDuration() : 0);
    if(state.mode==='ott') return getOttDur();
    return video.duration || 0;
  },
  playing(){
    if(state.mode==='yt'){
      if(!ytReady||!yt.getPlayerState) return false;
      const s=yt.getPlayerState();
      return s===1||s===3;
    }
    if(state.mode==='ott') return isOttPlaying();
    return !!state.mode && !video.paused && !video.ended;
  },
  rate(r){
    if(state.mode==='yt'){ ytReady && yt.setPlaybackRate(r); }
    else if(state.mode==='ott'){ setOttRate(r); }
    else video.playbackRate = r;
  },
  ready(){
    if(state.mode==='yt') return ytReady;
    if(state.mode==='ott') return true;
    return !!state.mode && video.readyState >= 1;
  }
};

function setMode(m){
  if(state.mode==='yt' && m!=='yt' && ytReady){ try{ yt.pauseVideo(); }catch(e){} }
  if((state.mode==='local'||state.mode==='hls'||state.mode==='dash'||state.mode==='url') && m!=='local'&&m!=='hls'&&m!=='dash'&&m!=='url'){ video.pause(); }
  if(state.mode==='stream' && m!=='stream'){ video.srcObject=null; state.sh=null; }
  if(state.mode==='ott' && m!=='ott'){ pauseOttTimer(); }
  state.mode = m;
  if(m!=='local'&&m!=='url') stage.classList.remove('audio');
  if(m!=='yt') $('#shield').style.display='';
  
  video.style.display = (m==='local'||m==='stream'||m==='hls'||m==='dash'||m==='url') ? 'block':'none';
  $('#ytWrap').style.display = m==='yt' ? 'block':'none';
  const ottC = $('#ottCompanion'); if(ottC) ottC.style.display = m==='ott' ? 'flex':'none';
  $('#empty').hidden = !!m;
  stage.classList.toggle('nomedia',!m);
  if(!m) setNow('');
  $('#spin').classList.remove('on');
  updateStreamBtn(); updateBanner(); if(aud.gain) routeStream(); applyVol();
}

function userPlay(){ lastAct=Date.now(); P.play(); send({t:'play',time:P.time()}); flash('▶'); }
function userPause(){ lastAct=Date.now(); P.pause(); send({t:'pause',time:P.time()}); flash('⏸'); }
function userSeek(x){ lastAct=Date.now(); P.seek(x); send({t:'seek',time:x}); }
function togglePlay(){ if(!state.mode) return; P.playing() ? userPause() : userPlay(); }
function skip(d){ if(!state.mode) return; const dur=P.dur()||1e9; userSeek(Math.min(Math.max(0,P.time()+d),dur)); flash(d>0?'⏩':'⏪'); }
function setLoop(v,fromRemote){ state.loop=v; $('#bLoop').classList.toggle('on',v); if(!fromRemote) send({t:'loop',v}); }
function onEnded(){ if(state.mode==='stream') return; if(state.loop){ P.seek(0); P.play(); } }

/* ============ UNIVERSAL STREAM DETECTION & LOADERS ============ */
function detectStreamType(url){
  if(!url) return null;
  url = url.trim();
  if(/(?:youtube\.com\/(?:watch|shorts|embed|live)|youtu\.be\/)/i.test(url) || ytId(url)) return 'yt';
  if(/\.m3u8(?:[?#]|$)/i.test(url) || /m3u8/i.test(url)) return 'hls';
  if(/\.mpd(?:[?#]|$)/i.test(url) || /dash/i.test(url)) return 'dash';
  if(/\.(mp4|webm|m4v|mov|ogv|mp3|m4a|wav|aac|flac|opus)(?:[?#]|$)/i.test(url)) return 'url';
  for(const [k, id] of HOSTS){
    if(url.toLowerCase().includes(k)) return 'ott';
  }
  if(/^https?:\/\//i.test(url)) return 'url';
  return null;
}

async function loadHlsStream(url, title, fromRemote){
  destroyHls(); destroyDash();
  video.querySelectorAll('track').forEach(x=>x.remove());
  setMode('hls');
  setNow(title || 'HLS Live Stream');
  state.streamUrl = url;
  state.streamTitle = title || 'HLS Stream';
  
  if(video.canPlayType('application/vnd.apple.mpegurl')){
    video.src = url;
    video.load();
    const p = video.play(); if(p && p.catch) p.catch(()=>{});
  } else {
    const ok = await window.loadHlsLib();
    if(!ok || !window.Hls || !Hls.isSupported()){
      toast('HLS is not supported in this browser');
      return;
    }
    hls = new Hls({ enableWorker: true, lowLatencyMode: true });
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, (ev, data)=>{
      updateQualityMenuHls(data.levels);
      applyVol();
      const p = video.play(); if(p && p.catch) p.catch(()=>{});
    });
    hls.on(Hls.Events.ERROR, (ev, data)=>{
      if(data.fatal){
        switch(data.type){
          case Hls.ErrorTypes.NETWORK_ERROR: hls.startLoad(); break;
          case Hls.ErrorTypes.MEDIA_ERROR: hls.recoverMediaError(); break;
          default: destroyHls(); toast('HLS playback error'); break;
        }
      }
    });
  }
  if(!fromRemote){
    send({ t:'src', kind:'hls', url, title: state.streamTitle });
    sysMsg('📺 ' + t('sysStreamStarted') + ': ' + (title || 'HLS Stream'));
    toast('📺 HLS Stream Loaded');
  }
}

async function loadDashStream(url, title, fromRemote){
  destroyHls(); destroyDash();
  video.querySelectorAll('track').forEach(x=>x.remove());
  setMode('dash');
  setNow(title || 'DASH Live Stream');
  state.streamUrl = url;
  state.streamTitle = title || 'DASH Stream';
  
  const ok = await window.loadDashLib();
  if(!ok || !window.dashjs){
    toast('DASH library could not be loaded');
    return;
  }
  dash = dashjs.MediaPlayer().create();
  dash.initialize(video, url, true);
  dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, ()=>{
    updateQualityMenuDash();
    applyVol();
  });
  dash.on(dashjs.MediaPlayer.events.ERROR, (e)=>{
    toast('DASH playback error');
  });
  if(!fromRemote){
    send({ t:'src', kind:'dash', url, title: state.streamTitle });
    sysMsg('📺 ' + t('sysStreamStarted') + ': ' + (title || 'DASH Stream'));
    toast('📺 DASH Stream Loaded');
  }
}

function loadDirectUrl(url, title, fromRemote){
  destroyHls(); destroyDash();
  video.querySelectorAll('track').forEach(x=>x.remove());
  setMode('url');
  const isAudio = /\.(mp3|m4a|wav|ogg|aac|flac|opus)(?:[?#]|$)/i.test(url);
  stage.classList.toggle('audio', isAudio);
  stage.dataset.t = '🎵 ' + (title || 'Audio Stream');
  setNow(title || (isAudio ? 'Audio Stream' : 'Video Stream'));
  state.streamUrl = url;
  state.streamTitle = title || 'Media Stream';
  video.src = url;
  video.load();
  const p = video.play(); if(p && p.catch) p.catch(()=>{});
  if(!fromRemote){
    send({ t:'src', kind:'url', url, title: state.streamTitle });
    sysMsg('🎬 ' + t('sysStreamStarted') + ': ' + (title || 'Media Stream'));
    toast('🎬 Media Stream Loaded');
  }
}

function activateOttCompanion(ottId, title, url, fromRemote){
  destroyHls(); destroyDash();
  setMode('ott');
  const o = OTT.find(x => x.id === ottId) || { id: 'ott', n: title || 'OTT Platform', u: url || 'https://www.netflix.com/' };
  state.ottComp = { id: o.id, name: o.n, url: url || o.u, title: title || (o.n + ' Watch Party') };
  setNow(o.n + ': ' + (title || 'Watch Party Companion'));
  
  const badge = $('#ottCompBadge'); if(badge) badge.textContent = '🎬 ' + o.n + ' Watch Party';
  const titleEl = $('#ottCompTitle'); if(titleEl) titleEl.textContent = title || (o.n + ' Sync Companion');
  const openBtn = $('#ottCompOpenBtn');
  if(openBtn){
    openBtn.textContent = '🚀 Open on ' + o.n + ' ↗';
    openBtn.onclick = () => { launchOtt(o); };
  }
  
  if(!fromRemote){
    send({ t:'src', kind:'ott', id: o.id, title, url: o.u });
    sysMsg('🍿 ' + t('ottFriend', { n: myName, o: o.n }));
    toast('🍿 Watch Party Started on ' + o.n);
  }
}

function loadUniversalStream(inputUrl, explicitTitle){
  const raw = (inputUrl || '').trim();
  if(!raw){ toast('Please paste a stream URL or YouTube link'); return; }
  const type = detectStreamType(raw);
  if(type === 'yt'){
    const yid = ytId(raw);
    if(yid){
      loadYT(yid);
      send({ t:'src', kind:'yt', id: yid });
      sysMsg(t('sysYt'));
      toast('▶️ YouTube Loaded');
    } else {
      toast('Invalid YouTube URL');
    }
  } else if(type === 'hls'){
    loadHlsStream(raw, explicitTitle || 'HLS Live Stream');
  } else if(type === 'dash'){
    loadDashStream(raw, explicitTitle || 'DASH Live Stream');
  } else if(type === 'ott'){
    const host = hostName(raw);
    const o = ottByHost(host);
    activateOttCompanion(o ? o.id : 'ott', explicitTitle || (o ? o.n : host), raw);
  } else {
    loadDirectUrl(raw, explicitTitle || 'Media Stream');
  }
}

async function startScreenShareToCinema(){
  if(!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia){
    toast('Screen share not supported in this browser');
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { cursor: 'always', frameRate: { ideal: 30 } },
      audio: true
    });
    destroyHls(); destroyDash();
    video.querySelectorAll('track').forEach(x=>x.remove());
    setMode('stream');
    video.srcObject = stream;
    setNow('📡 Live Screen Stream (' + myName + ')');
    video.play().catch(()=>{});
    
    const targets = others().map(r=>r.id);
    if(targets.length > 0){
      startStream(targets);
      toast('📡 Streaming screen to ' + targets.length + ' friends in room!');
    } else {
      toast('📡 Screen displayed in cinema');
    }
    
    const track = stream.getVideoTracks()[0];
    if(track){
      track.onended = () => {
        stopStream();
        setMode(null);
        toast('Screen sharing ended');
      };
    }
  } catch(err){
    if(err.name !== 'NotAllowedError'){
      console.warn(err);
      toast('Could not start screen sharing');
    }
  }
}

/* ============ QUALITY & SCREEN DISPLAY CONTROLS ============ */
const SIZES = [
  ['fit', '⛶ Fit', 'contain', 'none'],
  ['cover', '🔲 Cover', 'cover', 'none'],
  ['16x9', '🎬 16:9 Cinema', 'contain', '16/9'],
  ['21x9', '🍿 21:9 Ultrawide', 'contain', '21/9'],
  ['stretch', '↔️ Stretch', 'fill', 'none']
];
function applyScreenSize(key){
  const found = SIZES.find(x => x[0] === key) || SIZES[0];
  video.style.objectFit = found[2];
  if(found[3] !== 'none') stage.style.aspectRatio = found[3];
  else stage.style.removeProperty('aspect-ratio');
  $('#bSz').textContent = found[1];
  document.querySelectorAll('#szMenu button').forEach(b => b.classList.toggle('on', b.dataset.sz === key));
  toast('Display: ' + found[1]);
}
function buildSizeMenu(){
  const m = $('#szMenu'); if(!m) return;
  m.innerHTML = '';
  SIZES.forEach(([key, lbl]) => {
    const b = document.createElement('button');
    b.textContent = lbl;
    b.dataset.sz = key;
    if(key === 'fit') b.classList.add('on');
    b.onclick = () => { applyScreenSize(key); m.classList.remove('on'); };
    m.appendChild(b);
  });
}
function updateQualityMenuHls(levels){
  const menu = $('#qMenu'); if(!menu) return;
  menu.innerHTML = '';
  const autoBtn = document.createElement('button');
  autoBtn.textContent = 'Auto (Adaptive)';
  autoBtn.onclick = () => { if(hls) hls.currentLevel = -1; $('#bQ').textContent = 'Auto'; menu.classList.remove('on'); toast('Quality: Auto'); };
  menu.appendChild(autoBtn);
  if(levels && levels.length){
    levels.forEach((lvl, idx) => {
      const b = document.createElement('button');
      b.textContent = (lvl.height ? lvl.height + 'p' : 'Level ' + idx) + (lvl.bitrate ? ' (' + Math.round(lvl.bitrate/1000) + 'k)' : '');
      b.onclick = () => {
        if(hls) hls.currentLevel = idx;
        $('#bQ').textContent = (lvl.height ? lvl.height + 'p' : 'Q' + idx);
        menu.classList.remove('on');
        toast('Quality: ' + (lvl.height ? lvl.height + 'p' : 'Level ' + idx));
      };
      menu.appendChild(b);
    });
  }
}

function updateQualityMenuDash(){
  const menu = $('#qMenu'); if(!menu || !dash) return;
  menu.innerHTML = '';
  const autoBtn = document.createElement('button');
  autoBtn.textContent = 'Auto (Adaptive)';
  autoBtn.onclick = () => {
    dash.updateSettings({ streaming: { abr: { autoSwitchBitrate: { video: true } } } });
    $('#bQ').textContent = 'Auto';
    menu.classList.remove('on');
    toast('Quality: Auto');
  };
  menu.appendChild(autoBtn);
  const bitrates = dash.getBitrateInfoListFor('video');
  if(bitrates && bitrates.length){
    bitrates.forEach((info, idx) => {
      const b = document.createElement('button');
      b.textContent = (info.height ? info.height + 'p' : 'Level ' + idx) + (info.bitrate ? ' (' + Math.round(info.bitrate/1000) + 'k)' : '');
      b.onclick = () => {
        dash.updateSettings({ streaming: { abr: { autoSwitchBitrate: { video: false } } } });
        dash.setQualityFor('video', idx);
        $('#bQ').textContent = (info.height ? info.height + 'p' : 'Q' + idx);
        menu.classList.remove('on');
        toast('Quality: ' + (info.height ? info.height + 'p' : 'Level ' + idx));
      };
      menu.appendChild(b);
    });
  }
}

const bSz = $('#bSz');
if(bSz) bSz.onclick = e => {
  e.stopPropagation();
  const m = $('#szMenu'); if(m) m.classList.toggle('on');
  const q = $('#qMenu'); if(q) q.classList.remove('on');
};
const bQ = $('#bQ');
if(bQ) bQ.onclick = e => {
  e.stopPropagation();
  const q = $('#qMenu'); if(q) q.classList.toggle('on');
  const m = $('#szMenu'); if(m) m.classList.remove('on');
};
document.addEventListener('click', () => {
  const s = $('#szMenu'), q = $('#qMenu');
  if(s) s.classList.remove('on');
  if(q) q.classList.remove('on');
});

/* ============ SOURCES ============ */
function ytId(s){
  s=(s||'').trim();
  const m=s.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/|live\/)([\w-]{11})/);
  if(m) return m[1];
  return /^[\w-]{11}$/.test(s) ? s : null;
}
function ensureYT(cb){
  if(window.YT && YT.Player) return cb();
  ytQueue.push(cb);
  if(!document.getElementById('ytapi')){
    window.onYouTubeIframeAPIReady=()=>{ ytQueue.splice(0).forEach(f=>f()); };
    const s=document.createElement('script'); s.id='ytapi'; s.src='https://www.youtube.com/iframe_api';
    s.onerror=()=>toast('YouTube ✗');
    document.head.appendChild(s);
  }
}
function ytFallback(id){
  try{ if(yt&&yt.destroy) yt.destroy(); }catch(e){} yt=null; ytReady=false; state.ytFb=1;
  $('#ytWrap').innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?playsinline=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>';
  $('#shield').style.display='none'; $('#spin').classList.remove('on');
}
function loadYT(id){
  destroyHls(); destroyDash();
  state.ytId=id; state.remoteLocal=null; setMode('yt'); setNow('YouTube');
  if(state.ytFb){ $('#ytWrap').innerHTML='<div id="ytPlayer"></div>'; $('#shield').style.display='none'; $('#shield').style.display=''; state.ytFb=0; yt=null; ytReady=false; }
  ensureYT(()=>{
    if(yt){ if(ytReady) yt.cueVideoById(id); else ytPending=id; return; }
    yt=new YT.Player('ytPlayer',{
      videoId:id,
      playerVars:Object.assign({controls:0,disablekb:1,modestbranding:1,rel:0,playsinline:1,fs:0,iv_load_policy:3},
        /^https?:$/.test(location.protocol)?{origin:location.origin,widget_referrer:location.href}:{}),
      events:{
        onReady:()=>{ ytReady=true; applyVol(); if(ytPending){ yt.cueVideoById(ytPending); ytPending=null; } },
        onStateChange:e=>{ if(e.data===0) onEnded(); $('#spin').classList.toggle('on',e.data===3); },
        onError:e=>{
          if([153,152,150,101].includes(e.data)){
            if(/^https?:$/.test(location.protocol)){ ytFallback(state.ytId); toast(t('tYtFb')); } else toast(t('t153'));
          } else toast(t('tYtErr',{e:e.data}));
        }
      }
    });
  });
}
$('#ytBtn').onclick=()=>{
  const id=ytId($('#ytIn').value);
  if(!id){ toast(t('tPickYT')); return; }
  loadYT(id); send({t:'src',kind:'yt',id}); $('#srcBox').open=false; sysMsg(t('sysYt'));
};
$('#ytIn').addEventListener('keydown',e=>{ if(e.key==='Enter') $('#ytBtn').click(); });

$('#fileIn').onchange=()=>{
  const f=$('#fileIn').files[0]; if(!f) return;
  destroyHls(); destroyDash();
  stopStream(); if(state.blob) URL.revokeObjectURL(state.blob);
  state.blob=URL.createObjectURL(f);
  video.querySelectorAll('track').forEach(x=>x.remove());
  $('#bCC').classList.remove('on');
  setMode('local');
  stage.classList.toggle('audio',/^audio\//.test(f.type)||/\.(mp3|m4a|wav|ogg|aac|flac|opus)$/i.test(f.name)); stage.dataset.t='🎵 '+f.name.replace(/\.[^.]+$/,'');
  video.src=state.blob; video.load();
  state.localMeta={name:f.name,size:f.size};
  setNow(f.name.replace(/\.[^.]+$/,''));
  send({t:'src',kind:'local',name:f.name,size:f.size});
  checkMatch(); updateBanner(); $('#srcBox').open=false;
  sysMsg(t('sysPick',{f:f.name}));
  $('#fileIn').value='';
};
video.onerror=()=>{ if(state.mode==='local'||state.mode==='url') toast(t('tFormat')); };
video.onended=onEnded;
video.addEventListener('waiting',()=>{ if(state.mode==='local'||state.mode==='hls'||state.mode==='dash'||state.mode==='url') $('#spin').classList.add('on'); });
['playing','canplay','seeked','pause'].forEach(ev=>video.addEventListener(ev,()=>$('#spin').classList.remove('on')));

function checkMatch(){
  const a=state.localMeta,b=state.remoteLocal;
  if(a&&b&&(a.name!==b.name||a.size!==b.size)) sysMsg(t('sysMismatch'));
}
function updateBanner(){
  const r=state.remoteLocal;
  const show = !!(r && (!state.localMeta || state.mode!=='local') && state.mode!=='stream');
  $('#banner').hidden=!show;
  if(show) $('#bannerTxt').textContent=t('bannerTxt',{f:r.fn||'Friend',n:r.name});
}
$('#bannerBtn').onclick=()=>$('#fileIn').click();
$('#bannerStream').onclick=()=>{ const r=state.remoteLocal; if(r&&r.fid) sendTo(r.fid,{t:'reqstream'}); toast(t('tStreamReq')); };

/* subtitles */
function srt2vtt(s){ return 'WEBVTT\n\n'+s.replace(/^ï»¿/,'').replace(/\r+/g,'').replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g,'$1.$2'); }
$('#subBtn').onclick=()=>$('#subIn').click();
$('#subIn').onchange=async()=>{
  const f=$('#subIn').files[0]; if(!f) return;
  if(state.mode!=='local'){ toast(t('tSubLocal')); return; }
  let txt=await f.text();
  if(!/^\s*WEBVTT/.test(txt.replace(/^ï»¿/,''))) txt=srt2vtt(txt);
  video.querySelectorAll('track').forEach(x=>x.remove());
  const tr=document.createElement('track');
  tr.kind='subtitles'; tr.label=f.name; tr.default=true;
  tr.src=URL.createObjectURL(new Blob([txt],{type:'text/vtt'}));
  video.appendChild(tr);
  setTimeout(()=>{ if(tr.track) tr.track.mode='showing'; },150);
  $('#bCC').classList.add('on'); toast(t('tSubAdded'));
  $('#subIn').value='';
};
$('#bCC').onclick=()=>{
  if(state.mode!=='local'){ toast(t('tSubLocal')); return; }
  const tr=video.textTracks[0];
  if(!tr){ $('#subIn').click(); return; }
  const on=tr.mode==='showing'; tr.mode=on?'hidden':'showing'; $('#bCC').classList.toggle('on',!on);
};

/* ============ CONTROLS ============ */
$('#bPlay').onclick=togglePlay;
$('#shield').onclick=()=>{
  if(state.mode==='stream' && video.paused){ const p=video.play(); if(p&&p.catch) p.catch(()=>{}); return; }
  togglePlay();
};
$('#shield').ondblclick=toggleFs;
$('#bBack').onclick=()=>skip(-10);
$('#bFwd').onclick=()=>skip(10);
$('#bLoop').onclick=()=>setLoop(!state.loop);

const RATES=[0.25,0.5,0.75,1,1.25,1.5,1.75,2];
function setRateUI(r){ $('#bRate').textContent=r+'x'; document.querySelectorAll('#rateMenu button').forEach(b=>b.classList.toggle('on',+b.dataset.r===+r)); }
function applyRate(r){ P.rate(r); send({t:'rate',v:r}); setRateUI(r); }
RATES.forEach(r=>{
  const b=document.createElement('button'); b.textContent=r+'x'; b.dataset.r=r;
  b.onclick=()=>{ applyRate(r); $('#rateMenu').classList.remove('open'); };
  $('#rateMenu').appendChild(b);
});
setRateUI(1);
$('#bRate').onclick=e=>{ e.stopPropagation(); $('#rateMenu').classList.toggle('open'); };
document.addEventListener('click',()=>$('#rateMenu').classList.remove('open'));

$('#bPip').onclick=async()=>{
  if(state.mode==='yt'||!state.mode){ toast(t('tPipYt')); return; }
  try{ document.pictureInPictureElement ? await document.exitPictureInPicture() : await video.requestPictureInPicture(); }
  catch(e){ toast(t('tPipNo')); }
};
function toggleFs(){
  if(document.fullscreenElement||document.webkitFullscreenElement){ (document.exitFullscreen||document.webkitExitFullscreen).call(document); }
  else { (stage.requestFullscreen||stage.webkitRequestFullscreen).call(stage); }
}
$('#bFs').onclick=toggleFs;
$('#ctrl').addEventListener('click',e=>{ const b=e.target.closest('button'); if(b) b.blur(); });

const seek=$('#seek'), sw=$('#seekwrap');
function setProg(frac,buf){
  sw.style.setProperty('--p',(Math.min(1,Math.max(0,frac))*100)+'%');
  if(buf!=null) sw.style.setProperty('--b',(Math.min(1,Math.max(0,buf))*100)+'%');
}
function bufFrac(){
  const d=P.dur(); if(!d) return 0;
  if(state.mode==='yt') return ytReady&&yt.getVideoLoadedFraction ? yt.getVideoLoadedFraction() : 0;
  if(state.mode==='stream') return 0;
  const b=video.buffered, x=video.currentTime;
  for(let i=0;i<b.length;i++){ if(b.start(i)<=x+0.5 && b.end(i)>=x) return b.end(i)/d; }
  return x/d;
}
seek.addEventListener('input',()=>{ seeking=true; const d=P.dur(); setProg(seek.value/1000); $('#tm').textContent=fmt(seek.value/1000*d)+' / '+fmt(d); });
seek.addEventListener('change',()=>{ seeking=false; const d=P.dur(); if(d) userSeek(seek.value/1000*d); seek.blur(); });
sw.addEventListener('mousemove',e=>{
  const r=sw.getBoundingClientRect(); const f=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width));
  const tip=$('#stip'); tip.style.left=(f*100)+'%'; tip.textContent=fmt(f*(P.dur()||0));
});
let hideT;
let ctrlForcedHidden = false;

function hideCtrl(userForced = false){
  if(userForced) ctrlForcedHidden = true;
  stage.classList.add('ctrl-hidden');
  stage.classList.remove('show');
  clearTimeout(hideT);
  const sc = $('#bShowCtrl');
  if(sc && state.mode) sc.hidden = false;
  if(document.fullscreenElement) stage.classList.add('nocursor');
}

function showCtrl(userAction = false){
  if(userAction) ctrlForcedHidden = false;
  if(ctrlForcedHidden && !userAction) return;
  stage.classList.remove('ctrl-hidden');
  stage.classList.add('show');
  stage.classList.remove('nocursor');
  const sc = $('#bShowCtrl');
  if(sc) sc.hidden = true;
  clearTimeout(hideT);
  hideT = setTimeout(()=>{
    if(P.playing()){
      stage.classList.remove('show');
      if(document.fullscreenElement) stage.classList.add('nocursor');
      if(state.mode && $('#bShowCtrl')) $('#bShowCtrl').hidden = false;
    }
  }, 3500);
}

const bHide = $('#bHideCtrl');
if(bHide) bHide.onclick = e => {
  e.stopPropagation();
  hideCtrl(true);
  toast('👁️ ' + (typeof t==='function'? t('ttHideBar'):'Player bar hidden'));
};

const bShow = $('#bShowCtrl');
if(bShow) bShow.onclick = e => {
  e.stopPropagation();
  showCtrl(true);
};

const bTogUni = $('#bToggleUniStream');
if(bTogUni) bTogUni.onclick = () => {
  const bar = $('#uniStreamBar');
  bar.classList.toggle('collapsed');
  const isC = bar.classList.contains('collapsed');
  bTogUni.textContent = isC ? '▼ Stream Options' : '▲ Hide Options';
};

['mousemove','touchstart'].forEach(ev => stage.addEventListener(ev, () => {
  if (!ctrlForcedHidden) showCtrl(false);
}, {passive:true}));

let lastStageTap = 0;
stage.addEventListener('click', e => {
  if (e.target.closest('#ctrl') || e.target.closest('#bBack') || e.target.closest('#banner') || e.target.closest('#ottCompanion') || e.target.closest('#bStageBack') || e.target.closest('#bShowCtrl')) return;
  const now = Date.now();
  const rect = stage.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  if (now - lastStageTap < 320) {
    if (clickX < rect.width * 0.38) {
      skip(-10);
      toast('⏪ -10s');
    } else if (clickX > rect.width * 0.62) {
      skip(10);
      toast('⏩ +10s');
    } else {
      togglePlay();
    }
    showCtrl(true);
    lastStageTap = 0;
  } else {
    lastStageTap = now;
    const isVisible = stage.classList.contains('show') && !stage.classList.contains('ctrl-hidden');
    if (isVisible) {
      hideCtrl(true);
    } else {
      showCtrl(true);
    }
  }
});
setInterval(()=>{
  if(!state.mode) return;
  const d=P.dur()||0, x=P.time()||0, pl=P.playing();
  if(!seeking){ seek.value=d? x/d*1000 : 0; setProg(d? x/d : 0, bufFrac()); $('#tm').textContent=fmt(x)+' / '+fmt(d); }
  if(pl!==lastPl){ $('#bPlay').innerHTML = pl ? ICON.pause : ICON.play; lastPl=pl; }
  stage.classList.toggle('paused',!pl);
},250);
document.addEventListener('keydown',e=>{
  if($('#app').hidden || !state.mode || curTab!=='P') return;
  const tg=e.target.tagName;
  if((tg==='INPUT'&&e.target.type!=='range')||tg==='TEXTAREA'||tg==='SELECT') return;
  if(tg==='BUTTON' && (e.key===' '||e.key==='Enter')) return;
  const k=e.key.toLowerCase();
  const map={' ':togglePlay,'k':togglePlay,'arrowleft':()=>skip(-10),'j':()=>skip(-10),'arrowright':()=>skip(10),'l':()=>skip(10),
    'f':toggleFs,'h':()=>{ if(stage.classList.contains('ctrl-hidden')) showCtrl(true); else hideCtrl(true); },'m':()=>$('#bMute').click(),'c':()=>$('#bCC').click(),'arrowup':()=>stepVol(.1),'arrowdown':()=>stepVol(-.1)};
  if(map[k]){ e.preventDefault(); map[k](); showCtrl(); }
});

document.querySelectorAll('[data-creator]').forEach(b=>b.onclick=e=>{ e.preventDefault(); $('#creator').hidden=false; });
$('#crBack').onclick=()=>{ $('#creator').hidden=true; };
document.addEventListener('keydown',e=>{ if(e.key==='Escape') $('#creator').hidden=true; });
$('#homeBtn').onclick=()=>{ if(confirm('Room-a vittu Home-ku poga?')) location.href=location.href.split('?')[0].split('#')[0]; };
$('#mp3In').onchange=()=>{ const f=$('#mp3In').files[0]; if(!f) return; try{ const dt=new DataTransfer(); dt.items.add(f); $('#fileIn').files=dt.files; $('#mp3In').value=''; $('#fileIn').onchange(); }catch(e){ toast('Browser support illa'); } };
/* tabs */
let curTab='P';
function showTab(k){
  if(!['P','O','G','S','X','W'].includes(k)) k='P';
  curTab=k;
  ['P','O','G','S','X','W'].forEach(x=>{ $('#pane'+x).hidden=(x!==k); $('#tab'+x).classList.toggle('on',x===k); });
  if(k==='G'){ const b=$('#gBadge'); b.hidden=true; if(window.gamesShown) gamesShown(); }
  if(k!=='G'&&window.gamesHidden) gamesHidden();
  if(k==='S'&&window.scoreShown) scoreShown();
  if(k==='X'&&window.expShown) expShown();
  if(k==='W'&&window.vwShown) vwShown();
  if(k!=='W'&&window.vwHidden) vwHidden();
  store.set('fwp-tab',k);
}
['P','O','G','S','X','W'].forEach(x=>{ $('#tab'+x).onclick=()=>showTab(x); });

/* reactions (float over whole page) */
['❤️','😂','😮','👏','🔥','🥹','😭','🍿'].forEach(e=>{
  const b=document.createElement('button'); b.textContent=e; b.onclick=()=>sendReact(e); $('#reacts').appendChild(b);
});
function showFloat(e){
  const f=document.createElement('div'); f.className='float'; f.textContent=e;
  f.style.left=(8+Math.random()*80)+'%'; f.style.setProperty('--dx',(Math.random()*80-40)+'px');
  const host=(document.fullscreenElement||document.webkitFullscreenElement)? $('#floatsS') : $('#floatsG');
  host.appendChild(f); setTimeout(()=>f.remove(),2600);
}
function sendReact(e){ showFloat(e); send({t:'react',e}); }

/* ============ OTT HUB ============ */
const OTT=[
  {id:'netflix',n:'Netflix',u:'https://www.netflix.com/',m:'N',c1:'#e50914',c2:'#7a0409'},
  {id:'prime',n:'Prime Video',u:'https://www.primevideo.com/',m:'prime',c1:'#00a8e1',c2:'#0b3c7a'},
  {id:'hotstar',n:'JioHotstar',u:'https://www.hotstar.com/',m:'H',c1:'#1f80e0',c2:'#0b1e5c'},
  {id:'sonyliv',n:'SonyLIV',u:'https://www.sonyliv.com/',m:'S',c1:'#6d28d9',c2:'#1e1b4b'},
  {id:'aha',n:'aha',u:'https://www.aha.video/',m:'aha',c1:'#ff7a1a',c2:'#c2410c'},
  {id:'zee5',n:'ZEE5',u:'https://www.zee5.com/',m:'Z5',c1:'#8b3dff',c2:'#4c1d95'},
  {id:'sunnxt',n:'Sun NXT',u:'https://www.sunnxt.com/',m:'SN',c1:'#f59e0b',c2:'#b45309'},
  {id:'apple',n:'Apple TV+',u:'https://tv.apple.com/',m:'tv',c1:'#64748b',c2:'#0f172a'},
  {id:'mx',n:'MX Player',u:'https://www.mxplayer.in/',m:'MX',c1:'#22c55e',c2:'#0f5132'},
  {id:'hoichoi',n:'hoichoi',u:'https://www.hoichoi.tv/',m:'hc',c1:'#ef4444',c2:'#7f1d1d'},
  {id:'manorama',n:'ManoramaMAX',u:'https://www.manoramamax.com/',m:'MM',c1:'#06b6d4',c2:'#155e75'}
];
function tileHtml(o){
  const inner = o.m==='yt' ? '<svg viewBox="0 0 24 24"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z" fill="#fff"/></svg>' : (o.m.length>2 ? '<span style="font-size:20px">'+o.m+'</span>' : o.m);
  return '<div class="tile" style="--c1:'+o.c1+';--c2:'+o.c2+'">'+inner+'</div>';
}
function renderOtt(){
  const g=$('#ottgrid'); g.innerHTML='';
  OTT.forEach(o=>{
    const c=document.createElement('div'); c.className='ottcard'+(state.ott===o.id?' on':''); c.style.setProperty('--c1',o.c1);
    c.innerHTML=tileHtml(o)+'<b>'+o.n+'</b><span class="go">'+t('ottOpen')+' ↗</span>';
    c.onclick=()=>openOtt(o.id,true);
    g.appendChild(c);
  });
}
function renderNowbar(){
  const nb=$('#nowbar'), o=OTT.find(x=>x.id===state.ott);
  nb.hidden=!o; if(!o) return;
  nb.innerHTML=tileHtml(o)+'<div class="tx"><b>'+t('nowOn')+': '+o.n+'</b><small>'+t('nowSub')+'</small></div>';
  const b1=document.createElement('button'); b1.className='primary'; b1.textContent=t('ottOpen')+' ↗'; b1.onclick=()=>launchOtt(o);
  const b2=document.createElement('button'); b2.textContent=t('clear'); b2.onclick=()=>{ state.ott=null; renderOtt(); renderNowbar(); };
  nb.appendChild(b1); nb.appendChild(b2);
}
function launchOtt(o){
  const w=null; try{ const a=document.createElement('a'); a.href=o.u; a.target='_blank'; a.rel='noopener noreferrer'; document.body.appendChild(a); a.click(); a.remove(); }catch(e){ location.href=o.u; }
}
function openOtt(id,mine){
  const o=OTT.find(x=>x.id===id); if(!o) return;
  state.ott=id; renderOtt(); renderNowbar();
  if(mine){ launchOtt(o); send({t:'ott',id}); }
}
/* ----- movie links (shared with friend) ----- */
const HOSTS=[['netflix','netflix'],['primevideo','prime'],['amazon.','prime'],['hotstar','hotstar'],['youtube','youtube'],['youtu.be','youtube'],['sonyliv','sonyliv'],['aha.video','aha'],['zee5','zee5'],['sunnxt','sunnxt'],['apple.com','apple'],['mxplayer','mx'],['hoichoi','hoichoi'],['manoramamax','manorama']];
function ottByHost(h){ h=String(h).toLowerCase(); for(const [k,id] of HOSTS){ if(h.includes(k)) return OTT.find(o=>o.id===id); } return null; }
function cleanUrl(u){
  u=String(u||'').trim(); if(!u||u.length>600) return null;
  if(!/^https?:\/\//i.test(u)) u='https://'+u;
  try{ const x=new URL(u); if(!/^https?:$/.test(x.protocol)||!x.hostname.includes('.')) return null; return x.href; }catch(e){ return null; }
}
function hostName(u){ try{ return new URL(u).hostname.replace(/^www\./,''); }catch(e){ return u; } }
function renderLinks(){
  const box=$('#lkList'); if(!box) return; box.innerHTML='';
  if(!state.links.length){ const e=document.createElement('div'); e.className='lkempty'; e.textContent=t('linkNone'); box.appendChild(e); return; }
  state.links.forEach(l=>{
    const o=ottByHost(hostName(l.url)) || {m:'🔗',c1:'#8b5cf6',c2:'#ec4899'};
    const it=document.createElement('div'); it.className='lkitem';
    it.innerHTML=tileHtml(o);
    const tx=document.createElement('div'); tx.className='tx';
    const b=document.createElement('b'); b.textContent=l.title;
    const s=document.createElement('small'); s.textContent=hostName(l.url)+' · '+t('linkBy',{n:l.by});
    tx.appendChild(b); tx.appendChild(s); it.appendChild(tx);
    const bt=document.createElement('div'); bt.className='bt';
    const yid=ytId(l.url);
    if(yid){ const pb=document.createElement('button'); pb.textContent='▶ '+t('linkPlayHere'); pb.onclick=()=>{ loadYT(yid); send({t:'src',kind:'yt',id:yid}); showTab('P'); $('#srcBox').open=false; sysMsg(t('sysYt')); }; bt.appendChild(pb); }
    const ob=document.createElement('button'); ob.className='primary'; ob.textContent=t('ottOpen')+' ↗';
    ob.onclick=()=>{ const a=document.createElement('a'); a.href=l.url; a.target='_blank'; a.rel='noopener noreferrer'; document.body.appendChild(a); a.click(); a.remove(); send({t:'linkopen',title:l.title}); };
    bt.appendChild(ob);
    const rb=document.createElement('button'); rb.textContent='✕'; rb.title=t('remove'); rb.onclick=()=>{ state.links=state.links.filter(x=>x.id!==l.id); send({t:'unlink',id:l.id}); renderLinks(); };
    bt.appendChild(rb);
    it.appendChild(bt); box.appendChild(it);
  });
}
function addLink(){
  const url=cleanUrl($('#lkUrl').value);
  if(!url){ toast(t('linkBad')); return; }
  const o=ottByHost(hostName(url));
  const title=($('#lkTitle').value.trim().slice(0,60)) || (o?o.n:hostName(url));
  const l={id:Date.now().toString(36)+Math.random().toString(36).slice(2,5),url,title,by:myName||'Me'};
  state.links.push(l); send({t:'link',id:l.id,url,title,by:l.by});
  $('#lkUrl').value=''; $('#lkTitle').value=''; renderLinks(); toast(t('linkAdded'));
}
$('#lkAdd').onclick=addLink;
$('#lkUrl').addEventListener('keydown',e=>{ if(e.key==='Enter') addLink(); });

function showCall(big,sub,small,ms){
  const c=$('#cd'); c.hidden=false;
  c.innerHTML='<div><div class="big'+(small?' small':'')+'"></div><small></small></div>';
  c.querySelector('.big').textContent=big; c.querySelector('small').textContent=sub||'';
  clearTimeout(showCall.t); if(ms) showCall.t=setTimeout(()=>{ c.hidden=true; },ms);
}
function tone(f,d){ if(window.SND_OFF) return; try{ actx=actx||new (window.AudioContext||window.webkitAudioContext)(); const o=actx.createOscillator(),g=actx.createGain(); o.connect(g); g.connect(actx.destination); o.frequency.value=f; g.gain.value=.08; o.start(); o.stop(actx.currentTime+d); }catch(e){} }
function runCountdown(){
  let n=3; const step=()=>{
    if(n>0){ showCall(String(n),'',false,0); tone(660,.15); n--; setTimeout(step,900); }
    else { showCall(t('cdGo'),t('cdSub'),false,1600); tone(990,.45); }
  }; step();
}
$('#cd').onclick=()=>{ $('#cd').hidden=true; };
$('#kReady').onclick=()=>{ send({t:'ready'}); sysMsg(t('sysReady',{n:myName})); toast('✅'); };
$('#kCount').onclick=()=>{ if(!connected()){ toast(t('tNotConn')); } send({t:'cd'}); runCountdown(); };
$('#kPause').onclick=()=>{ send({t:'call',k:'pause'}); toast('⏸'); };
$('#kPlay').onclick=()=>{ send({t:'call',k:'play'}); toast('▶'); };

/* ============ SYNC / NETWORK ============ */
function applyState(time,playing){
  if(!P.ready()) return;
  if(Math.abs(P.time()-time)>1.5) P.seek(time);
  if(playing && !P.playing()) P.play();
  if(!playing && P.playing()) P.pause();
}
/* ===== multi-device network: the host is the hub, everything relays through it ===== */
const MAX_PEERS=7;                         // + host = 8 devices per room
const conns=new Map();                     // host only: peerId -> DataConnection
let roster=[];                             // [{id,name,av,host}]
const HOST_ONLY=new Set(['x_act','g_resp','g_mode','reqsync','g_open','g_join','g_leave','g_start','g_bot','g_act','g_close','g_again','g_resetboard','pp_act','pp_vote']);
function myId(){ return (peer&&peer.id)||'me'; }
function stamp(o){ o.fn=myName; o.fa=myAv; o.fid=myId(); return o; }
function rawSend(c,o){ if(c&&c.open){ try{ c.send(o); }catch(e){} } }
function send(o){ stamp(o); if(isHost) conns.forEach(c=>rawSend(c,o)); else rawSend(conn,o); }
function sendTo(id,o){ stamp(o); o.to=id; if(id===myId()){ onData(o); return; } if(isHost) rawSend(conns.get(id),o); else rawSend(conn,o); }
function peerName(id){ const r=roster.find(x=>x.id===id); return r?r.name:'Friend'; }
function others(){ return roster.filter(r=>r.id!==myId()); }
function connected(){ return others().length>0; }
function roomLink(){ return location.href.split('?')[0].split('#')[0]+'?room='+code; }

function rebuildRoster(){
  roster=[{id:myId(),name:myName,av:myAv,host:true}];
  conns.forEach((c,id)=>{ if(c.__p) roster.push({id,name:c.__p.name,av:c.__p.av}); });
}
function broadcastRoster(){ const m=stamp({t:'roster',list:roster}); conns.forEach(c=>rawSend(c,m)); onRosterChanged(); }
function hostRecv(c,m){
  if(!m||typeof m!=='object'||typeof m.t!=='string') return;
  if(m.t==='hello'){ registerPeer(c,m); return; }
  if(m.t==='bye'){ if(c.__p&&conns.get(c.peer)===c) c.__bye=1; return; }
  const pl=c.__p; if(!pl||conns.get(c.peer)!==c) return;
  m.fid=c.peer; m.fn=pl.name; m.fa=pl.av;                       // never trust sender-supplied identity
  if(HOST_ONLY.has(m.t)){ onData(m); return; }
  if(m.to){ if(m.to===myId()) onData(m); else rawSend(conns.get(m.to),m); return; }
  conns.forEach(oc=>{ if(oc!==c) rawSend(oc,m); });             // relay to everyone else
  onData(m);
}
function registerPeer(c,m){
  if(!conns.has(c.peer) && conns.size>=MAX_PEERS){ rawSend(c,{t:'full'}); setTimeout(()=>{ try{ c.close(); }catch(e){} },300); return; }
  const pl={name:String(m.name||'Friend').slice(0,20), av:String(m.av||'🙂').slice(0,4)};
  const note=stamp({t:'note',k:'joined',n:pl.name}); conns.forEach(oc=>rawSend(oc,note));
  c.__p=pl; conns.set(c.peer,c);
  rebuildRoster(); broadcastRoster();
  sysMsg(t('sysJoined',{n:pl.name}));
  sendSource(c.peer);
  if(window.gamesWelcome) gamesWelcome(c.peer);
  if(window.expWelcome) expWelcome(c.peer);
  if(window.ppWelcome) ppWelcome(c.peer);
}
function peerGone(c){
  if(conns.get(c.peer)!==c) return;
  if(c.__kicked){ conns.delete(c.peer); stopStreamTo(c.peer); rebuildRoster(); broadcastRoster(); if(window.gamesPeerLeft) gamesPeerLeft(c.peer); if(window.expLeft) expLeft(c.peer); if(window.ppPeerLeft) ppPeerLeft(c.peer); return; }
  const pl=c.__p; conns.delete(c.peer); stopStreamTo(c.peer);
  rebuildRoster(); broadcastRoster();
  if(pl){ const kk=c.__bye?'exited':'left'; const note=stamp({t:'note',k:kk,n:pl.name}); conns.forEach(oc=>rawSend(oc,note)); sysMsg(t(kk==='exited'?'sysExit':'sysLeft',{n:pl.name}),'left'); }
  if(window.gamesPeerLeft) gamesPeerLeft(c.peer);
  if(window.expLeft) expLeft(c.peer);
  if(window.ppPeerLeft) ppPeerLeft(c.peer);
}

function sendSource(id){
  const S=o=>sendTo(id,o);
  if(state.mode==='yt') S({t:'src',kind:'yt',id:state.ytId});
  else if(state.mode==='local' && state.localMeta) S({t:'src',kind:'local',name:state.localMeta.name,size:state.localMeta.size});
  else if(state.mode==='hls' && state.streamUrl) S({t:'src',kind:'hls',url:state.streamUrl,title:state.streamTitle});
  else if(state.mode==='dash' && state.streamUrl) S({t:'src',kind:'dash',url:state.streamUrl,title:state.streamTitle});
  else if(state.mode==='url' && state.streamUrl) S({t:'src',kind:'url',url:state.streamUrl,title:state.streamTitle});
  else if(state.mode==='ott' && state.ottComp) S({t:'src',kind:'ott',id:state.ottComp.id,title:state.ottComp.title,url:state.ottComp.url});
  if(state.ott) S({t:'ott',id:state.ott,quiet:1});
  state.links.forEach(l=>S({t:'link',id:l.id,url:l.url,title:l.title,by:l.by,quiet:1}));
  setTimeout(()=>{ if(state.mode&&state.mode!=='stream'&&P.ready()) sendTo(id,hbMsg()); },2000);
}
function hbMsg(){ return {t:'hb',time:P.time(),playing:P.playing(),dur:P.dur(),rate:(video.playbackRate||1)}; }
function sendHb(){ if(!state.mode||state.mode==='stream'||!P.ready()) return; send(hbMsg()); }
let hbN=0;
setInterval(()=>{ hbN++; if(state.streaming || (isHost && hbN%4===0)) sendHb(); },1000);
$('#syncBtn').onclick=()=>{ if(isHost){ sendHb(); toast(t('tSyncSent')); } else { send({t:'reqsync'}); toast(t('tSyncReq')); } };

function onData(m){
  if(!m || typeof m!=='object') return;
  const F=String(m.fn||'Friend').slice(0,20);
  if(m.t==='roster'){
    if(Array.isArray(m.list)){ roster=m.list.slice(0,12).map(r=>({id:String(r.id).slice(0,60),name:String(r.name||'?').slice(0,20),av:String(r.av||'🙂').slice(0,4),host:!!r.host})); onRosterChanged(); }
    return;
  }
  if(m.t==='q'&&window.onQ){ onQ(m); return; }
  if(typeof m.t==='string' && m.t.indexOf('x_')===0){ if(window.expMsg) expMsg(m); return; }
  if(typeof m.t==='string' && m.t.indexOf('g_')===0){ if(window.gameMsg) gameMsg(m); return; }
  if(typeof m.t==='string' && m.t.indexOf('pp_')===0){ if(window.ppMsg) ppMsg(m); return; }
  if(m.t==='vw'){ if(window.vwMsg) window.vwMsg(m); if(isHost) conns.forEach(c=>{ if(c.peer!==m.fid) rawSend(c,m); }); return; }
  if(state.mode==='stream' && (m.t==='play'||m.t==='pause'||m.t==='seek'||m.t==='hb')){
    const sh=state.sh||(state.sh={time:0,dur:0,playing:false,rate:1,at:Date.now()});
    sh.time=+m.time||0; sh.at=Date.now();
    if(m.t==='play') sh.playing=true;
    else if(m.t==='pause') sh.playing=false;
    else if(m.t==='hb'){ sh.playing=!!m.playing; if(+m.dur) sh.dur=+m.dur; sh.rate=+m.rate||1; }
    return;
  }
  switch(m.t){
    case 'note': { const nn=String(m.n||'').slice(0,20); if(m.k==='kicked') sysMsg(t('sysKick',{n:nn}),'kick'); else sysMsg(t(m.k==='joined'?'sysJoined':m.k==='exited'?'sysExit':'sysLeft',{n:nn}),m.k==='joined'?'':'left'); } break;
    case 'kick': if(window.fwpKicked) fwpKicked(m); break;
    case 'full': toast(t('tFull')); break;
    case 'src':
      if(m.kind==='yt' && ytId(String(m.id))){ loadYT(String(m.id)); showTab('P'); sysMsg(t('sysFriendYt',{n:F})); toast(t('tYtLoaded')); }
      else if(m.kind==='hls' && m.url){ loadHlsStream(m.url, m.title, true); showTab('P'); sysMsg('📺 ' + F + ' loaded HLS: ' + (m.title||'')); toast('📺 HLS Stream Loaded'); }
      else if(m.kind==='dash' && m.url){ loadDashStream(m.url, m.title, true); showTab('P'); sysMsg('📺 ' + F + ' loaded DASH: ' + (m.title||'')); toast('📺 DASH Stream Loaded'); }
      else if(m.kind==='url' && m.url){ loadDirectUrl(m.url, m.title, true); showTab('P'); sysMsg('🎬 ' + F + ' loaded Media: ' + (m.title||'')); toast('🎬 Media Stream Loaded'); }
      else if(m.kind==='ott'){ activateOttCompanion(m.id, m.title, m.url, true); showTab('P'); sysMsg('🍿 ' + F + ' started Watch Party'); toast('🍿 Watch Party Started'); }
      else if(m.kind==='local'){
        state.remoteLocal={name:String(m.name||'').slice(0,200),size:+m.size||0,fid:m.fid,fn:F};
        checkMatch(); updateBanner(); sysMsg(t('sysFriendFile',{n:F,f:state.remoteLocal.name}));
      }
      break;
    case 'play': if(!P.ready()) break; if(Math.abs(P.time()-m.time)>0.7) P.seek(m.time); P.play(); flash('▶'); toast(t('tPlay',{n:F})); break;
    case 'pause': if(!P.ready()) break; P.pause(); if(Math.abs(P.time()-m.time)>0.3) P.seek(m.time); flash('⏸'); toast(t('tPause',{n:F})); break;
    case 'seek': if(!P.ready()) break; P.seek(m.time); toast(t('tSeek',{n:F,t:fmt(m.time)})); break;
    case 'rate': setRateUI(+m.v); P.rate(+m.v); break;
    case 'loop': setLoop(!!m.v,true); break;
    case 'hb': if(Date.now()-lastAct>2000) applyState(+m.time||0,!!m.playing); break;
    case 'reqsync': if(state.mode&&state.mode!=='stream'&&P.ready()) sendTo(m.fid,hbMsg()); break;
    case 'reqstream':
      if(state.mode==='local' && P.ready()){ toast(t('tStreamAsk',{n:F})); startStream([m.fid]); }
      else toast(t('tStreamNeedFile',{n:F}));
      break;
    case 'react': if(typeof m.e==='string' && m.e.length<=8) showFloat(m.e); break;
    case 'ott': { const o=OTT.find(x=>x.id===m.id); if(o){ state.ott=o.id; renderOtt(); renderNowbar(); if(!m.quiet){ sysMsg(t('ottFriend',{n:F,o:o.n})); toast(t('ottFriend',{n:F,o:o.n})); } } break; }
    case 'ready': sysMsg(t('sysReady',{n:F})); toast(t('sysReady',{n:F})); tone(740,.12); break;
    case 'cd': runCountdown(); break;
    case 'call': showCall(t(m.k==='pause'?'callPause':'callPlay',{n:F}),'',true,2200); tone(520,.25); break;
    case 'link': {
      const url=cleanUrl(m.url), id=String(m.id||'').slice(0,40);
      if(!url||!id||state.links.some(l=>l.id===id)) break;
      const title=String(m.title||'').slice(0,80)||hostName(url);
      state.links.push({id,url,title,by:String(m.by||F).slice(0,20)}); renderLinks();
      if(!m.quiet){ sysMsg(t('linkFriend',{n:F,t:title})); toast(t('linkFriend',{n:F,t:title})); }
      break;
    }
    case 'unlink': state.links=state.links.filter(l=>l.id!==String(m.id)); renderLinks(); break;
    case 'linkopen': { const ti=String(m.title||'').slice(0,80); sysMsg(t('linkOpened',{n:F,t:ti})); toast(t('linkOpened',{n:F,t:ti})); break; }
    case 'chat': receiveChat(m); break;
    case 'ack': markRead(m.id); break;
    case 'typing': showTyping(F); break;
  }
}
function onRosterChanged(){
  const o=others(); friendOnline=o.length>0;
  const n=Math.max(1,roster.length);
  $('#dot').classList.toggle('on',friendOnline);
  $('#statusTxt').textContent = friendOnline ? t('nOnline',{n:n}) : ((isHost&&code)? t('roomWait',{c:code}) : t('waiting'));
  $('#plCount').textContent=n;
  const ts=$('#chatSub'); if(!ts.classList.contains('typing')) ts.textContent=t('nOnline',{n:n});
  const ms=$('#mstack'); ms.innerHTML='';
  roster.slice(0,5).forEach(r=>{ const d=document.createElement('div'); d.className='mb'; d.textContent=r.av; d.title=r.name; ms.appendChild(d); });
  if(roster.length>5){ const d=document.createElement('div'); d.className='mb more'; d.textContent='+'+(roster.length-5); ms.appendChild(d); }
  renderPlayersModal();
  if(window.gamesRosterChanged) gamesRosterChanged();
  if(window.expRoster) expRoster();
}
function renderPlayersModal(){
  const m=$('#pmodal'); if(m.hidden) return;
  const link=roomLink();
  m.innerHTML='';
  const card=document.createElement('div'); card.className='mcard glass'; m.appendChild(card);
  const x=document.createElement('button'); x.className='x'; x.textContent='✕'; x.onclick=()=>{ m.hidden=true; }; card.appendChild(x);
  const h3=document.createElement('h3'); h3.textContent='👥 '+t('plTitle'); card.appendChild(h3);
  const sub=document.createElement('p'); sub.className='sub'; sub.textContent=t('plHint'); card.appendChild(sub);
  const cb=document.createElement('div'); cb.className='codebig'; cb.textContent=code||'------'; card.appendChild(cb);
  const bt=document.createElement('div'); bt.className='mbtns'; card.appendChild(bt);
  const cp=document.createElement('button'); cp.className='primary'; cp.textContent='🔗 '+t('plCopy');
  cp.onclick=()=>{ (navigator.clipboard?navigator.clipboard.writeText(link):Promise.reject()).then(()=>toast(t('tCopied')),()=>prompt(t('tCopyPrompt'),link)); };
  bt.appendChild(cp);
  const wa=document.createElement('a'); wa.className='gbtn'; wa.target='_blank'; wa.rel='noopener'; wa.textContent='WhatsApp';
  wa.href='https://wa.me/?text='+encodeURIComponent('Vaa, '+APP_NAME+'-la onna paakalam 🎬 '+link); bt.appendChild(wa);
  const list=document.createElement('div'); list.style.marginTop='12px'; card.appendChild(list);
  roster.forEach(r=>{
    const row=document.createElement('div'); row.className='plrow';
    const av=document.createElement('div'); av.className='av'; av.textContent=r.av;
    const nm=document.createElement('b'); nm.textContent=r.name;
    row.appendChild(av); row.appendChild(nm);
    if(r.host){ const tg=document.createElement('span'); tg.className='tg'; tg.textContent=t('hostTag'); row.appendChild(tg); }
    if(r.id===myId()){ const tg=document.createElement('span'); tg.className='tg'; tg.textContent=t('youTag'); row.appendChild(tg); }
    const on=document.createElement('i'); on.className='on'; row.appendChild(on);
    if(isHost&&!r.host&&r.id!==myId()){ const rm=document.createElement('button'); rm.className='rmbtn'; rm.textContent='Remove'; rm.setAttribute('aria-label','Remove '+r.name); rm.onclick=()=>{ if(window.fwpKick) fwpKick(r.id); }; row.appendChild(rm); }
    list.appendChild(row);
  });
}
$('#plBtn').onclick=()=>{ $('#pmodal').hidden=false; renderPlayersModal(); };
$('#pmodal').addEventListener('click',e=>{ if(e.target===$('#pmodal')) $('#pmodal').hidden=true; });

function setupGuestConn(c){
  conn=c; let opened=false;
  const onOpen=()=>{ if(opened) return; opened=true; enterApp(); send({t:'hello',name:myName,av:myAv}); };
  c.on('open',onOpen); if(c.open) onOpen();
  c.on('data',onData);
  c.on('close',()=>{ if(conn===c){ stopStream(); onStreamEnd(); roster=[]; onRosterChanged(); sysMsg(t('sysHostGone')); toast(t('sysHostGone')); } });
  c.on('error',()=>{});
}
function lobbyErr(k,v){ showLobby(k,'',v); $('#createBtn').disabled=false; $('#joinBtn').disabled=false; }
function genCode(){ const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let s=''; for(let i=0;i<6;i++) s+=c[Math.floor(Math.random()*c.length)]; return s; }
function startHost(tries=0){
  if(peer){ try{ peer.destroy(); }catch(e){} peer=null; }
  isHost=true; code=genCode();
  peer=new Peer('fwp-'+code); attachCall(peer);
  peer.on('open',()=>{ rebuildRoster(); enterApp(); onRosterChanged(); toast('🌐 Online Room Created: '+code); });
  peer.on('connection',c=>{
    c.on('data',m=>hostRecv(c,m));
    c.on('close',()=>peerGone(c));
    c.on('error',()=>{});
  });
  peer.on('error',e=>{
    if(e.type==='unavailable-id' && tries<5){ try{ peer.destroy(); }catch(e){} peer=null; startHost(tries+1); }
    else if(!$('#app').hidden){ toast(t('tConnErr',{e:e.type})); }
    else lobbyErr('connErr',{e:e.type});
  });
  peer.on('disconnected',()=>{ try{ peer.reconnect(); }catch(e){} });
}
function startGuest(c){
  if(peer){ try{ peer.destroy(); }catch(e){} peer=null; }
  isHost=false; code=c.toUpperCase();
  peer=new Peer(); attachCall(peer);
  peer.on('open',()=>{ setupGuestConn(peer.connect('fwp-'+code,{reliable:true})); });
  peer.on('error',e=>{
    if(!$('#app').hidden){ toast(t('tConnErr',{e:e.type})); return; }
    if(e.type==='peer-unavailable') lobbyErr('notFound'); else lobbyErr('connErr',{e:e.type});
    try{ peer.destroy(); }catch(_){}
  });
  setTimeout(()=>{ if($('#app').hidden) lobbyErr('connFail'); },15000);
}
function enterApp(){
  if(!$('#app').hidden) return;
  $('#home').hidden=true; $('#app').hidden=false;
  const link=roomLink();
  $('#waBtn').href='https://wa.me/?text='+encodeURIComponent('Vaa, '+APP_NAME+'-la onna paakalam 🎬 '+link);
  $('#copyBtn').onclick=()=>{ (navigator.clipboard?navigator.clipboard.writeText(link):Promise.reject()).then(()=>toast(t('tCopied')),()=>prompt(t('tCopyPrompt'),link)); };
  onRosterChanged();
  if(isHost) sysMsg(t('sysRoomCode',{c:code})); else sysMsg(t('sysRoomJoined',{c:code}));
  showTab(store.get('fwp-tab')||'P');
}

function needName(){
  const n=$('#nameIn').value.trim();
  if(!n){
    const c=$('#nameCard'); c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake');
    showLobby('needName'); $('#nameIn').focus(); c.scrollIntoView({behavior:'smooth',block:'center'}); return false;
  }
  myName=n.slice(0,20); store.set('fwp-name',myName); store.set('fwp-av',myAv); return true;
}
const NOLIB_BAD=()=>lobbyErr('noLib');
$('#createBtn').onclick=async()=>{
  if(!needName()) return;
  $('#createBtn').disabled=true; showLobby('roomCreating');
  if(!(await loadPeerLib())){ NOLIB_BAD(); return; }
  startHost();
};
$('#joinBtn').onclick=async()=>{
  if(!needName()) return;
  const c=$('#codeIn').value.trim();
  if(c.length<4){ lobbyErr('codeShort'); $('#codeIn').focus(); return; }
  $('#joinBtn').disabled=true; showLobby('joining');
  if(!(await loadPeerLib())){ NOLIB_BAD(); return; }
  startGuest(c);
};
$('#codeIn').addEventListener('keydown',e=>{ if(e.key==='Enter') $('#joinBtn').click(); });
$('#nameIn').addEventListener('keydown',e=>{ if(e.key==='Enter') ($('#codeIn').value.trim()? $('#joinBtn') : $('#createBtn')).click(); });
$('#ctaBtn').onclick=()=>{ $('#steps').scrollIntoView({behavior:'smooth'}); setTimeout(()=>$('#nameIn').focus({preventScroll:true}),500); };
const hgh=$('#heroGameHub'); if(hgh) hgh.onclick=()=>{ $('#steps').scrollIntoView({behavior:'smooth'}); setTimeout(()=>$('#nameIn').focus({preventScroll:true}),500); };
window.enterFrontendGames = function(targetGame, local2P){
  if($('#app').hidden){
    toast('🎬 Please create or join a room first!');
    $('#steps').scrollIntoView({behavior:'smooth'});
    setTimeout(()=>$('#nameIn').focus({preventScroll:true}),400);
    return;
  }
  showTab('G');
  if(targetGame){
    setTimeout(()=>{
      if(window.startLocal2P && local2P) window.startLocal2P(targetGame);
      else if(window.startSolo) window.startSolo(targetGame);
    }, 250);
  }
};

/* avatars */
const AVS=['😎','🥳','😍','🤩','🦁','🐯','🦄','🐼','🔥','👑'];
function buildAvatars(){
  const box=$('#avs'); box.innerHTML='';
  AVS.forEach(a=>{ const b=document.createElement('button'); b.textContent=a; b.className=a===myAv?'on':''; b.onclick=()=>{ myAv=a; buildAvatars(); }; box.appendChild(b); });
}

/* ============ STREAM ============ */
const streamP={
  play(){ const s=state.sh; if(s){ s.time=streamP.time(); s.at=Date.now(); s.playing=true; } },
  pause(){ const s=state.sh; if(s){ s.time=streamP.time(); s.at=Date.now(); s.playing=false; } },
  seek(x){ const s=state.sh; if(s){ s.time=x; s.at=Date.now(); } },
  time(){ const s=state.sh; return s ? s.time+(s.playing?(Date.now()-s.at)/1000*s.rate:0) : 0; },
  dur(){ return state.sh ? state.sh.dur : 0; },
  playing(){ return !!(state.sh && state.sh.playing); },
  rate(r){ const s=state.sh; if(s){ s.time=streamP.time(); s.at=Date.now(); s.rate=r; } },
  ready(){ return true; }
};
['play','pause','seek','time','dur','playing','rate','ready'].forEach(k=>{
  const f=P[k];
  P[k]=function(){ return state.mode==='stream' ? streamP[k].apply(null,arguments) : f.apply(P,arguments); };
});
function updateStreamBtn(){
  const b=$('#streamBtn'); b.hidden = state.mode!=='local';
  b.innerHTML = ICON.cast+'<span class="lbl keep">'+(state.streaming?t('stopStream'):t('streamTo'))+'</span>';
  const bsb=$('#bStageBack'); if(bsb) bsb.hidden=!state.mode; const x=$('#bExit'); if(x){ x.hidden=!(state.mode==='stream'||state.streaming); x.textContent=state.mode==='stream'?'✖ Exit stream':'⏹ End stream'; }
}
$('#streamBtn').onclick=()=>{ state.streaming ? stopStream() : startStream(); };
function startStream(ids){
  const targets=(ids&&ids.length)?ids:others().map(r=>r.id);
  if(!targets.length){ toast(t('tNotConn')); return; }
  if(state.mode!=='local' || !P.ready()){ toast(t('tNeedLocal')); return; }
  const cap=video.captureStream||video.mozCaptureStream;
  if(!cap){ toast(t('tNoCap')); return; }
  let s; try{ s=cap.call(video); }catch(e){ toast(t('tStreamFail')); return; }
  if(!s.getTracks().length){ toast(t('tNeedPlay')); return; }
  /* use the Web Audio tap for sound (un-boosted) so sound works even after a volume boost */
  if(ensureAudio() && aud.dest){ try{ s=new MediaStream([...s.getVideoTracks(),...aud.dest.stream.getAudioTracks()]); }catch(e){} }
  const started=[];
  targets.forEach(id=>{
    if(state.calls.has(id)) return;
    const call=peer.call(id,s); state.calls.set(id,call); started.push(id);
    const done=()=>{ if(state.calls.get(id)===call){ state.calls.delete(id); if(!state.calls.size){ state.streaming=false; updateStreamBtn(); } } };
    call.on('close',done); call.on('error',done);
    setTimeout(()=>{ try{
      call.peerConnection.getSenders().forEach(se=>{
        if(se.track && se.track.kind==='video'){
          const p=se.getParameters(); if(!p.encodings||!p.encodings.length) p.encodings=[{}];
          p.encodings[0].maxBitrate=4000000; se.setParameters(p);
        }
      });
    }catch(e){} },1500);
  });
  state.streaming=state.calls.size>0; updateStreamBtn();
  if(started.length){ sysMsg(t('sysStreamOut',{n:started.map(peerName).join(', ')})); toast(t('tStreamOn')); }
}
function stopStream(){
  state.calls.forEach(c=>{ try{ c.close(); }catch(e){} }); state.calls.clear();
  state.streaming=false; updateStreamBtn();
}
function stopStreamTo(id){
  const c=state.calls.get(id); if(!c) return;
  try{ c.close(); }catch(e){} state.calls.delete(id);
  if(!state.calls.size){ state.streaming=false; updateStreamBtn(); }
}
function attachCall(p){
  p.on('call',call=>{
    call.answer(); state.inCall=call;
    call.on('stream',rs=>onRemoteStream(rs,call.peer));
    call.on('close',()=>onStreamEnd());
    call.on('error',()=>{});
  });
}
function onRemoteStream(rs,pid){
  if(video.srcObject===rs) return;
  const nm=peerName(pid);
  video.querySelectorAll('track').forEach(x=>x.remove());
  showTab('P'); setMode('stream');
  state.remoteLocal=null; state.sh={time:0,dur:0,playing:false,rate:1,at:Date.now()};
  video.srcObject=rs; if(aud.gain) routeStream(); applyVol();
  const p=video.play(); if(p&&p.catch) p.catch(()=>toast(t('tTap')));
  setNow(t('liveStream',{n:nm}));
  $('#srcBox').open=false; updateBanner();
  sysMsg(t('sysStreamIn',{n:nm})); setTimeout(()=>{ if(window.sendQ) sendQ(); },1800);
}
function onStreamEnd(){
  if(state.mode!=='stream') return;
  if(state.localMeta && state.blob){ video.srcObject=null; setMode('local'); setNow(state.localMeta.name.replace(/\.[^.]+$/,'')); } else setMode(null);
  toast(t('tStreamEnd')); sysMsg(t('sysStreamEnd'));
}

/* ============ CHAT ============ */
const msgs=$('#msgs'), ticks={};
function scrollDown(){ msgs.scrollTop=msgs.scrollHeight; }
function sysMsg(x,k){ if(k){ const key=k+'|'+x, n=Date.now(); if(window.__lastSys&&__lastSys.k===key&&n-__lastSys.t<4000) return; window.__lastSys={k:key,t:n}; } const d=document.createElement('div'); d.className='sys'+(k?' sys-'+k:''); d.textContent=(k==='left'?'🚪 ':k==='kick'?'⛔ ':'')+x+(k?'  ·  '+new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}):''); msgs.appendChild(d); scrollDown(); }
function isImgUrl(x){ return /^https?:\/\/\S+$/.test(x) && (/\.(gif|png|jpe?g|webp)(\?\S*)?$/i.test(x) || /(media\d*\.giphy\.com|i\.giphy\.com|media\.tenor\.com)/i.test(x)); }
function renderText(el,x){
  x.split(/(https?:\/\/[^\s]+)/g).forEach((p,i)=>{
    if(i%2){ const a=document.createElement('a'); a.href=p; a.target='_blank'; a.rel='noopener noreferrer'; a.textContent=p; el.appendChild(a); }
    else if(p) el.appendChild(document.createTextNode(p));
  });
}
function addMsg(m){
  const row=document.createElement('div'); row.className='mrow '+(m.mine?'mine':'theirs');
  const b=document.createElement('div'); b.className='bubble';
  if(!m.mine){ const n=document.createElement('div'); n.className='mname'; n.textContent=(m.av?m.av+' ':'')+(m.name||'Friend'); b.appendChild(n); }
  const kw=m.text?kwMatch(m.text):null;
  if(kw){ b.classList.add('hype'); b.style.setProperty('--hc',kw.col); const hk=document.createElement('div'); hk.className='hk'; hk.textContent=kw.e[0]+' '+kw.w.replace('!',''); b.appendChild(hk); }
  const addImg=u=>{ const img=new Image(); img.src=u; img.className='gif'; img.alt='GIF'; img.onload=scrollDown; b.appendChild(img); };
  if(m.gif && /^https?:\/\//.test(m.gif)) addImg(m.gif);
  if(m.text){
    if(isImgUrl(m.text)) addImg(m.text);
    else{
      const d=document.createElement('div');
      d.className='txt'+(/^(\p{Extended_Pictographic}|️|‍|\s){1,12}$/u.test(m.text)&&[...m.text.replace(/\s/g,'')].length<=6?' big':'');
      renderText(d,m.text); b.appendChild(d);
    }
  }
  const meta=document.createElement('div'); meta.className='meta';
  const tm=document.createElement('span'); tm.textContent=new Date(m.ts||Date.now()).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}); meta.appendChild(tm);
  if(m.mine){ const tk=document.createElement('span'); tk.className='tick'; tk.textContent=connected()?'✓✓':'✓'; meta.appendChild(tk); ticks[m.id]=tk; }
  b.appendChild(meta); row.appendChild(b); msgs.appendChild(row); scrollDown();
}
function markRead(id){ const x=ticks[id]; if(x){ x.textContent='✓✓'; x.classList.add('read'); } }
function sendChat(text,gif){
  text=(text||'').trim(); if(!text && !gif) return;
  const id=Date.now().toString(36)+Math.random().toString(36).slice(2,6);
  const m={t:'chat',id,text,gif:gif||'',ts:Date.now(),name:myName};
  if(!connected()) toast(t('tNotConn'));
  send(m); addMsg({...m,mine:true}); chatFx(text);
}
function receiveChat(m){
  const msg={id:String(m.id||''),text:String(m.text||'').slice(0,2000),gif:String(m.gif||'').slice(0,1000),ts:+m.ts||Date.now(),name:String(m.fn||'Friend').slice(0,20),av:String(m.fa||'').slice(0,4)};
  addMsg(msg); chatFx(msg.text); sendTo(m.fid,{t:'ack',id:msg.id});
  if(document.hidden){ unread++; document.title='('+unread+') '+APP_NAME; tone(880,.12); }
}
document.addEventListener('visibilitychange',()=>{ if(!document.hidden){ unread=0; document.title=APP_NAME; } });
let actx;
let typT,lastTyp=0;
function showTyping(nm){
  const s=$('#chatSub'); s.textContent=t('typingN',{n:nm||''}); s.classList.add('typing'); clearTimeout(typT);
  typT=setTimeout(()=>{ s.classList.remove('typing'); s.textContent=t('nOnline',{n:Math.max(1,roster.length)}); },2000);
}
$('#chatIn').addEventListener('input',()=>{ if(Date.now()-lastTyp>1500){ lastTyp=Date.now(); send({t:'typing'}); } });
$('#chatIn').addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); $('#sendBtn').click(); } });
$('#sendBtn').onclick=()=>{ const i=$('#chatIn'); sendChat(i.value); i.value=''; i.focus(); };

/* emoji + gif panel */
/* ----- hype keywords: special effect when these words are typed ----- */
const KW=[
  {k:['wow','woah','whoa','வாவ்'],e:['😮','😍','✨','🤯'],w:'WOW!',col:'#38bdf8',q:'WOW'},
  {k:['semma','sema','செம'],e:['🔥','💥','💯','😍'],w:'SEMMA!',col:'#fb923c',q:'SEMMA'},
  {k:['fire','blast','🔥'],e:['🔥','🔥','💥','⚡'],w:'FIRE!',col:'#f97316',q:'FIRE'},
  {k:['mass','massu','மாஸ்','thalaivaa','thalaiva'],e:['💪','🔥','⚡','👑'],w:'MASS!',col:'#f43f5e',q:'MASS'},
  {k:['super','superb','awesome','சூப்பர்'],e:['👏','🌟','👌','✨'],w:'SUPER!',col:'#fbbf24',q:'SUPER'},
  {k:['vera level','veralevel','next level','goosebumps','goosebump'],e:['🚀','🤯','🔥','⚡'],w:'VERA LEVEL!',col:'#a78bfa',q:'VERA LEVEL'},
  {k:['kalakkal','kalakkitta','sambavam','thara','tharamana'],e:['✨','🎉','💯','🔥'],w:'KALAKKAL!',col:'#34d399',q:'KALAKKAL'},
  {k:['lol','haha','hehe','rofl','sirippu','comedy','😂','🤣'],e:['😂','🤣','😆','💀'],w:'LOL!',col:'#facc15',q:'LOL'},
  {k:['love','luv','kadhal','romance','❤️','😍'],e:['❤️','😍','💕','💖'],w:'LOVE!',col:'#ec4899',q:'LOVE'},
  {k:['ayyo','sad','crying','azhuga','feel','😭'],e:['😭','🥺','💔','😢'],w:'AYYO!',col:'#60a5fa',q:'AYYO'},
  {k:['bgm','music','song','paatu','paattu'],e:['🎵','🎶','🎧','🎸'],w:'BGM!',col:'#c084fc',q:'BGM'},
  {k:['interval','break','popcorn'],e:['🍿','🥤','🍕','🍟'],w:'INTERVAL!',col:'#f59e0b',q:'INTERVAL'},
  {k:['scary','bayam','horror','ghost','pei'],e:['😱','👻','💀','🙀'],w:'BAYAM!',col:'#94a3b8',q:'BAYAM'},
  {k:['congrats','party','celebrate','vesil','whistle'],e:['🎉','🎊','🥳','🍾'],w:'PARTY!',col:'#2dd4bf',q:'PARTY'}
];
function kwMatch(txt){
  const s=' '+String(txt||'').toLowerCase()+' ';
  for(const e of KW){
    for(const w of e.k){
      if(/[^\x00-\x7f]/.test(w)){ if(s.includes(w)) return e; continue; }
      const last=w[w.length-1], esc=w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/ /g,'\\s*');
      if(new RegExp('(^|[^a-z])'+esc+'(?:'+last+')*([^a-z]|$)').test(s)) return e;
    }
  }
  return null;
}
let lastFx=0;
function chatFx(txt){
  const e=kwMatch(txt); if(!e) return;
  const now=Date.now(); if(now-lastFx<1500) return; lastFx=now;
  for(let i=0;i<9;i++) setTimeout(()=>showFloat(e.e[Math.floor(Math.random()*e.e.length)]),i*110);
  const host=(document.fullscreenElement||document.webkitFullscreenElement)? $('#floatsS') : $('#floatsG');
  const bw=document.createElement('div'); bw.className='bw'; bw.textContent=e.w; bw.style.setProperty('--hc',e.col);
  host.appendChild(bw); setTimeout(()=>bw.remove(),1600);
}
function buildQuick(){
  const box=$('#qk'); box.innerHTML='';
  KW.forEach(e=>{
    const b=document.createElement('button'); b.textContent=e.e[0]+' '+e.q; b.style.setProperty('--qc',e.col);
    b.onclick=()=>sendChat(e.q.charAt(0)+e.q.slice(1).toLowerCase()+' '+e.e[0]);
    box.appendChild(b);
  });
}

/* ----- emoji picker: all categories + recent ----- */
const EMO={
 '😀':'😀😃😄😁😆😅🤣😂🙂🙃😉😊😇🥰😍🤩😘😗☺️😚😙🥲😋😛😜🤪😝🤑🤗🤭🤫🤔🤐🤨😐😑😶😏😒🙄😬🤥😌😔😪🤤😴😷🤒🤕🤢🤮🤧🥵🥶🥴😵🤯🤠🥳🥸😎🤓🧐😕😟🙁☹️😮😯😲😳🥺😦😧😨😰😥😢😭😱😖😣😞😓😩😫🥱😤😡😠🤬😈👿💀☠️💩🤡👹👺👻👽👾🤖😺😸😹😻😼😽🙀😿😾🙈🙉🙊🫠🫡🫶',
 '👋':'👋🤚🖐️✋🖖👌🤌🤏✌️🤞🤟🤘🤙👈👉👆🖕👇☝️👍👎✊👊🤛🤜👏🙌👐🤲🤝🙏✍️💅🤳💪🦾🦵🦶👂👃🧠🫀🫁🦷👀👁️👅👄👶🧒👦👧🧑👨👩🧔👴👵🙍🙎🙅🙆💁🙋🙇🤦🤷👮💂👷🤴👸👳🤵👰🤰🤱👼🎅🤶🦸🦹🧙🧚🧛🧜🧝🧞🧟💆💇🚶🏃💃🕺👯🧖🧗🏄🏊🚴',
 '❤️':'❤️🧡💛💚💙💜🖤🤍🤎💔❣️💕💞💓💗💖💘💝💟🔥💯✨⭐🌟💫💥💢💦💨💬💭💤✅☑️✔️❌❎❗❓‼️⁉️➕➖➗✖️♾️💲©️®️™️🔴🟠🟡🟢🔵🟣⚫⚪🟤🔺🔻🔶🔷🔔🔕▶️⏸️⏹️⏺️⏩⏪🔀🔁🔂🔼🔽📶🎦',
 '🐶':'🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐵🐒🐔🐧🐦🐤🦆🦅🦉🦇🐺🐗🐴🦄🐝🐛🦋🐌🐞🐜🦟🦗🕷️🦂🐢🐍🦎🦖🦕🐙🦑🦐🦞🦀🐡🐠🐟🐬🐳🐋🦈🐊🐅🐆🦓🦍🐘🦏🦛🐪🐫🦒🦘🐃🐂🐄🐎🐖🐏🐑🦙🐐🦌🐕🐩🐈🐓🦃🦚🦜🦢🕊️🐇🦝🦨🦡🦦🦥🐁🐀🐿️🦔🌵🎄🌲🌳🌴🌱🌿☘️🍀🍃🍂🍁🍄🌾💐🌷🌹🥀🌺🌸🌼🌻🌞🌝🌛🌚🌕🌙🌎🌍🪐⚡☄️🌪️🌈☀️⛅☁️🌧️⛈️❄️☃️⛄💧🌊',
 '🍔':'🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🥬🥒🌶️🌽🥕🧄🧅🥔🍠🥐🥯🍞🥖🥨🧀🥚🍳🧈🥞🧇🥓🥩🍗🍖🌭🍔🍟🍕🥪🥙🧆🌮🌯🥗🥘🍝🍜🍲🍛🍣🍱🥟🍤🍙🍚🍘🍥🥠🍢🍡🍧🍨🍦🥧🧁🍰🎂🍮🍭🍬🍫🍿🍩🍪🌰🥜🍯🥛🍼☕🍵🧃🥤🍶🍺🍻🥂🍷🥃🍸🍹🧉🍾🧊🥄🍴🍽️',
 '⚽':'⚽🏀🏈⚾🥎🎾🏐🏉🥏🎱🏓🏸🏒🏑🥍🏏🥅⛳🏹🎣🥊🥋🛹⛸️🎿🏂🏋️🤸🤺🤾🏌️🏇🧘🏆🥇🥈🥉🏅🎖️🎫🎟️🎪🤹🎭🎨🎬🎤🎧🎼🎹🥁🎷🎺🎸🪕🎻🎲♟️🎯🎳🎮🎰🧩',
 '✈️':'🚗🚕🚙🚌🚎🏎️🚓🚑🚒🚐🚚🚛🚜🛵🏍️🚲🛴🚨🚔🚍🚘🚖🚃🚄🚅🚈🚂🚆🚇🚊🚉✈️🛫🛬🛩️💺🛰️🚀🛸🚁🛶⛵🚤🛥️🛳️⛴️🚢⚓⛽🚧🚦🚥🗺️🗿🗽🗼🏰🏯🏟️🎡🎢🎠⛲🏖️🏝️🏜️🌋⛰️🏔️🗻🏕️⛺🏠🏡🏘️🏢🏬🏥🏦🏨🏪🏫💒🏛️⛪🕌🛕🕍',
 '💡':'⌚📱💻⌨️🖥️🖨️🖱️💽💾💿📀📼📷📸📹🎥📽️🎞️📞☎️📺📻🎙️⏱️⏲️⏰🕰️⌛⏳📡🔋🔌💡🔦🕯️💸💵💴💶💷💰💳💎⚖️🔧🔨🛠️⛏️🔩⚙️🧱🧲💣🧨🔪🛡️🔮🧿💈🔭🔬💊💉🧬🦠🧪🌡️🧹🧺🚽🚿🛁🧼🧴🔑🗝️🚪🛋️🛏️🧸🖼️🛍️🎁🎈🎏🎀🎊🎉🎎🏮✉️📩📨📧💌📦📜📃📄📑🧾📊📈📉🗒️📆📅🗑️📇📋📁📂🗞️📰📓📔📒📕📗📘📙📚📖🔖🔗📎📐📏📌📍✂️🖊️🖋️✒️🖌️🖍️📝✏️🔍🔎🔏🔐🔒🔓',
 '🇮🇳':'🇮🇳🇺🇸🇬🇧🇨🇦🇦🇺🇯🇵🇰🇷🇨🇳🇫🇷🇩🇪🇮🇹🇪🇸🇧🇷🇷🇺🇦🇪🇸🇦🇱🇰🇸🇬🇲🇾🏳️🏴🚩🏁'
};
const seg=s=>window.Intl&&Intl.Segmenter?[...new Intl.Segmenter().segment(s)].map(x=>x.segment):Array.from(s);
function getRecent(){ try{ return JSON.parse(store.get('fwp-recent')||'[]').slice(0,24); }catch(e){ return []; } }
function pushRecent(e){ const r=[e,...getRecent().filter(x=>x!==e)].slice(0,24); store.set('fwp-recent',JSON.stringify(r)); }
function buildEmoji(){
  const tabs=$('#emoTabs'); tabs.innerHTML='';
  const r=document.createElement('button'); r.textContent='🕘'; r.onclick=()=>showCat('recent'); r.dataset.k='recent'; tabs.appendChild(r);
  Object.keys(EMO).forEach(k=>{
    const b=document.createElement('button'); b.textContent=k; b.onclick=()=>showCat(k); b.dataset.k=k; tabs.appendChild(b);
  });
  showCat(getRecent().length?'recent':Object.keys(EMO)[0]);
}
function showCat(k){
  document.querySelectorAll('#emoTabs button').forEach(b=>b.classList.toggle('on',b.dataset.k===k));
  const g=$('#emoGrid'); g.innerHTML='';
  const list = k==='recent' ? getRecent() : seg(EMO[k]);
  list.forEach(e=>{
    const b=document.createElement('button'); b.textContent=e;
    b.onclick=()=>{ const i=$('#chatIn'); i.value+=e; i.focus(); pushRecent(e); };
    g.appendChild(b);
  });
}

function openPanel(which){
  const p=$('#panel'), same=!p.hidden && ((which==='emo'&&!$('#emoView').hidden)||(which==='gif'&&!$('#gifView').hidden));
  if(same){ p.hidden=true; return; }
  p.hidden=false; $('#emoView').hidden=which!=='emo'; $('#gifView').hidden=which!=='gif';
  if(which==='gif') gifLoad('');
}
$('#emoBtn').onclick=()=>openPanel('emo');
$('#gifBtn').onclick=()=>openPanel('gif');
let gkey=store.get('giphyKey')||DEFAULT_GIPHY_KEY;
async function gifLoad(q){
  const grid=$('#gifGrid'); grid.innerHTML='';
  $('#gifKeyBox').hidden=!!gkey;
  if(!gkey) return;
  const base='https://api.giphy.com/v1/gifs/'+(q?'search':'trending')+'?api_key='+encodeURIComponent(gkey)+'&limit=30&rating=pg-13'+(q?'&q='+encodeURIComponent(q):'');
  try{
    const r=await fetch(base); const j=await r.json();
    if(!j.data||!j.data.length){ grid.textContent=t('gifNone'); return; }
    j.data.forEach(g=>{
      const img=new Image(); img.src=g.images.fixed_height_small.url; img.alt=g.title||'gif'; img.loading='lazy';
      img.onclick=()=>{ sendChat('',g.images.fixed_height.url); $('#panel').hidden=true; };
      grid.appendChild(img);
    });
  }catch(e){ grid.textContent=t('gifFail'); }
}
$('#gifGo').onclick=()=>gifLoad($('#gifQ').value.trim());
$('#gifQ').addEventListener('keydown',e=>{ if(e.key==='Enter') $('#gifGo').click(); });
$('#gifKeySave').onclick=()=>{ const k=$('#gifKeyIn').value.trim(); if(k){ gkey=k; store.set('giphyKey',k); gifLoad(''); } };

/* ============ INIT ============ */
(function init(){
  $('#bBack').innerHTML=ICON.back; $('#bFwd').innerHTML=ICON.fwd; $('#bLoop').innerHTML=ICON.loop;
  $('#bCC').innerHTML=ICON.cc; $('#bPip').innerHTML=ICON.pip; $('#bFs').innerHTML=ICON.fs;
  $('#bPlay').innerHTML=ICON.play; $('#emoBtn').innerHTML=ICON.smile; $('#sendBtn').innerHTML=ICON.send;
  buildEmoji(); buildQuick();
  $('#nameIn').value=store.get('fwp-name');
  const sa=store.get('fwp-av'); if(AVS.includes(sa)) myAv=sa;
  buildAvatars();
  const room=new URLSearchParams(location.search).get('room');
  applyLang(); applyVol();
  buildSizeMenu();

  const uniBtn = $('#uniLoadBtn'), uniIn = $('#uniUrlIn');
  if(uniBtn && uniIn){
    uniBtn.onclick = () => loadUniversalStream(uniIn.value);
    uniIn.addEventListener('keydown', e => { if(e.key === 'Enter') loadUniversalStream(uniIn.value); });
  }
  const streamShareBtn = $('#uniStreamShareBtn');
  if(streamShareBtn) streamShareBtn.onclick = startScreenShareToCinema;

  document.querySelectorAll('.uni-demo-pill').forEach(b => {
    b.onclick = () => {
      const u = b.dataset.url;
      if(uniIn) uniIn.value = u;
      loadUniversalStream(u, b.dataset.title);
    };
  });

  const ottCountBtn = $('#ottCompCountBtn');
  if(ottCountBtn) ottCountBtn.onclick = () => { if(connected()) send({t:'cd'}); runCountdown(); };
  const ottStreamBtn = $('#ottCompStreamBtn');
  if(ottStreamBtn) ottStreamBtn.onclick = startScreenShareToCinema;

  if(room){ $('#codeIn').value=room.toUpperCase().slice(0,6); showLobby('inviteReady','ok'); setTimeout(()=>{ const s=$('#steps'); if(s) s.scrollIntoView({behavior:'smooth'}); },400); }
  else if(location.protocol==='file:') showLobby('fileNote');
})();