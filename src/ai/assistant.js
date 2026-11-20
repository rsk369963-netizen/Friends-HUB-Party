(function(){
  const btn = document.getElementById('aiAssistantBtn');
  const panel = document.getElementById('aiAssistantPanel');
  const closeBtn = document.getElementById('aiCloseBtn');
  const minBtn = document.getElementById('aiMinBtn');
  const settingsBtn = document.getElementById('aiSettingsToggle');
  const settingsBox = document.getElementById('aiAssistantSettings');
  const keyIn = document.getElementById('geminiApiKeyIn');
  const keySave = document.getElementById('geminiApiKeySave');
  const apiStatus = document.getElementById('aiApiStatus');
  const msgsBox = document.getElementById('aiAssistantMsgs');
  const input = document.getElementById('aiAssistantInput');
  const sendBtn = document.getElementById('aiAssistantSendBtn');
  const quickPrompts = document.querySelectorAll('.ai-quick-prompts button');

  let geminiKey = (function(){
    try { return localStorage.getItem('fwp_gemini_key') || ''; } catch(e){ return ''; }
  })();
  if(geminiKey && keyIn) keyIn.value = geminiKey;
  if(apiStatus) apiStatus.textContent = geminiKey ? '● Gemini Connected' : '● Built-in Engine';

  // Toggle panel
  btn.onclick = () => {
    panel.hidden = !panel.hidden;
    if(!panel.hidden){
      panel.classList.remove('minimized');
      if(!msgsBox.children.length){
        showWelcomeMessage();
      }
      setTimeout(()=>input.focus(), 200);
    }
  };
  closeBtn.onclick = () => { panel.hidden = true; };
  minBtn.onclick = () => { panel.classList.toggle('minimized'); };
  settingsBtn.onclick = () => { settingsBox.classList.toggle('open'); };

  keySave.onclick = () => {
    const k = keyIn.value.trim();
    geminiKey = k;
    try { localStorage.setItem('fwp_gemini_key', k); } catch(e){}
    apiStatus.textContent = k ? '● Gemini Connected' : '● Built-in Engine';
    settingsBox.classList.remove('open');
    addAiMsg('bot', k ? '✅ Gemini API key saved! Live AI intelligence is now active.' : 'Built-in platform knowledge engine is active.');
  };

  quickPrompts.forEach(p => {
    p.onclick = () => {
      input.value = p.dataset.prompt;
      submitUserPrompt();
    };
  });

  function showWelcomeMessage(){
    const curL = (typeof lang !== 'undefined' ? lang : 'en');
    let welcome = '';
    if(curL === 'ta'){
      welcome = 'வணக்கம்! நான் Aria, உங்கள் Friends HUB Party AI உதவியாளர். 🎬 அறை அமைப்பது, 50+ விளையாட்டுகள், 3D மெய்நிகர் உலகம், வீடியோ சிங்க் அல்லது ஏதேனும் கேள்விகளை என்னிடம் கேளுங்கள்!';
    } else if(curL === 'th'){
      welcome = 'Vanakkam! Naan Aria, ungaloda Friends HUB Party AI Assistant. 🎬 Room create panna, 50+ games vilaiyaada, 3D virtual world, audio boost pathi enna doubt irundhalum enkitta kelunga!';
    } else {
      welcome = 'Hello! I am Aria, your Friends HUB Party AI Assistant. 🎬 Ask me anything about hosting rooms, game rules for all 50+ games, 3D Virtual City & realistic avatars, video sync, or audio boost!';
    }
    addAiMsg('bot', welcome);
  }

  function addAiMsg(role, text){
    const d = document.createElement('div');
    d.className = 'ai-msg ' + role;
    const b = document.createElement('div');
    b.className = 'ai-bubble';
    b.innerHTML = renderMarkdown(text);
    d.appendChild(b);
    const time = document.createElement('div');
    time.className = 'ai-time';
    time.textContent = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    d.appendChild(time);
    msgsBox.appendChild(d);
    msgsBox.scrollTop = msgsBox.scrollHeight;
  }

  function renderMarkdown(str){
    if(!str) return '';
    return str
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\*(.*?)\*/g, '<i>$1</i>')
      .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,.1);padding:2px 5px;border-radius:4px">$1</code>')
      .replace(/\n/g, '<br>');
  }

  // Conversation history for context
  const history = [];

  async function submitUserPrompt(){
    const text = input.value.trim();
    if(!text) return;
    input.value = '';
    addAiMsg('user', text);
    history.push({role:'user', text});

    // Show typing placeholder
    const typingMsg = document.createElement('div');
    typingMsg.className = 'ai-msg bot typing-ind';
    typingMsg.innerHTML = '<div class="ai-bubble" style="opacity:.7">Aria is thinking... 💭</div>';
    msgsBox.appendChild(typingMsg);
    msgsBox.scrollTop = msgsBox.scrollHeight;

    try {
      let reply = '';
      if(geminiKey){
        reply = await callGeminiApi(text, history);
      } else {
        reply = localSmartAssistant(text);
      }
      typingMsg.remove();
      addAiMsg('bot', reply);
      history.push({role:'model', text:reply});
    } catch(err){
      typingMsg.remove();
      const fallback = localSmartAssistant(text);
      addAiMsg('bot', fallback);
    }
  }

  input.addEventListener('keydown', e => {
    if(e.key === 'Enter'){
      e.preventDefault();
      submitUserPrompt();
    }
  });
  sendBtn.onclick = submitUserPrompt;

  async function callGeminiApi(prompt, hist){
    const sysPrompt = "You are Aria, the smart, friendly, and expert AI Assistant for Friends HUB Party — a virtual party website featuring synchronized video cinema, live screen streaming, 50+ real-time multiplayer games, a 3D virtual world with realistic human avatars & city, and audio booster up to 300%. Support English, Tamil (தமிழ்), and Tanglish. Respond concisely, helpfully, and in the language requested by the user. If they ask about game rules, explain goal, controls, and winning condition. If they ask about room connection, explain code sharing and WebRTC PeerJS setup.";
    
    const contents = [];
    hist.slice(-6).forEach(m => {
      contents.push({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{text: m.text}]
      });
    });

    const body = {
      system_instruction: { parts: [{ text: sysPrompt }] },
      contents: contents,
      generationConfig: { maxOutputTokens: 600, temperature: 0.7 }
    };

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if(!res.ok){
      const errJson = await res.json().catch(()=>({}));
      throw new Error(errJson.error?.message || 'Gemini API Error');
    }

    const data = await res.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return candidate || "I processed your request, but received an empty response.";
  }

  function localSmartAssistant(q){
    const s = q.toLowerCase();
    const curL = (typeof lang !== 'undefined' ? lang : 'en');
    const isTa = /[\u0B80-\u0BFF]/.test(q) || curL === 'ta';
    const isTh = curL === 'th' || /paath|enna|enga|vilaiy|eppadi|sol|aadu|pannu|podu/.test(s);

    if(s.includes('room') || s.includes('join') || s.includes('create') || s.includes('அறை') || s.includes('சேர')){
      if(isTa){
        return "🎬 **அறை உருவாக்குவது & இணைவது:**\n1. முகப்புப் பக்கத்தில் உங்கள் பெயர் மற்றும் அவதாரத்தைத் தேர்ந்தெடுக்கவும்.\n2. **Create Room** கிளிக் செய்தால் 6-எழுத்து குறியீடு (Room Code) கிடைக்கும்.\n3. நண்பர்களுக்கு 'Copy Link' அல்லது 'WhatsApp' மூலம் குறியீட்டைப் பகிருங்கள்.\n4. நண்பர்கள் 'Join Room' பெட்டியில் குறியீட்டை உள்ளிட்டு இணையலாம்!";
      }
      if(isTh){
        return "🎬 **Room Create & Join Panradhu Eppadi:**\n1. First, unga Name and Avatar select pannunga.\n2. **Create Room** click panna 6-letter Room Code kidaikkum.\n3. Link-ai WhatsApp or Copy Link moolam unga friends-ku anupunga.\n4. Friends 'Join Room' box-la andha code-a pottu join aagalam!";
      }
      return "🎬 **How to Create & Join a Room:**\n1. Enter your Name and select your Avatar in Step 1.\n2. Click **Create Room** to generate a unique 6-character Room Code.\n3. Share the invite link with friends via WhatsApp or the 'Copy Link' button.\n4. Friends can paste the code into 'Join Room' and enter instantly!";
    }

    if(s.includes('3d') || s.includes('avatar') || s.includes('city') || s.includes('world') || s.includes('நகரம்')){
      if(isTa){
        return "🌐 **3D மெய்நிகர் உலகம் & நகர வழிகாட்டி:**\n• **கட்டுப்பாடுகள்:** நகர WASD / அம்பு விசைகள், பார்வையைத் திருப்ப மவுஸ் அல்லது மொபைல் டச் ஸ்டிக் பயன்படுத்தவும்.\n• **யதார்த்த அவதாரங்கள்:** ஆண்/பெண் உடல் வகைகள், தனிப்பயன் உடைகள் மற்றும் முக பாவனைகளை மாற்றலாம்.\n• **மெய்நிகர் நகரம்:** வானளாவிய கட்டிடங்கள், நகரும் கார்கள், சாலை விளக்குகள் மற்றும் பூங்கா நீரூற்றை அனுபவியுங்கள்!";
      }
      if(isTh){
        return "🌐 **3D Virtual World & City Guide:**\n• **Controls:** Move panna WASD / Arrow keys, camera thiruppa mouse drag illa mobile touch stick.\n• **Realistic Avatars:** Male/Female body types, detailed face, hair and modern outfits customize pannalaam.\n• **Virtual City:** Skyscrapers, running cars, streetlights and park fountain irukku!";
      }
      return "🌐 **3D Virtual World & Living City Guide:**\n• **Movement:** WASD or Arrow keys to walk/run, mouse drag or click for Pointer Lock, and left virtual stick on mobile.\n• **Realistic Avatars:** Choose male/female silhouettes, realistic PBR skin, detailed facial proportions, and stylish hair & outfits.\n• **Virtual City:** Explore skyscrapers with lit windows, moving street traffic, warm streetlights, and a central park fountain!";
    }

    if(s.includes('game') || s.includes('rules') || s.includes('cricket') || s.includes('racing') || s.includes('விதி') || s.includes('விளையாட்டு')){
      if(isTa){
        return "🎮 **விளையாட்டு வழிகாட்டி & விதிகள்:**\nFriends HUB Party-யில் 50+ விளையாட்டுகள் உள்ளன:\n• **Multiplayer:** அறையிலுள்ள நண்பர்களுடன் நிகழ்நேரத்தில் விளையாடலாம்.\n• **2-Player Local:** ஒரே திரையில் 1v1 விளையாடலாம்.\n• **Solo / Bot:** கணினியுடன் பயிற்சி பெறலாம்.\nஎந்த விளையாட்டையும் கிளிக் செய்தால் அதன் விதிமுறைகள் மற்றும் கட்டுப்பாடுகள் திரையிலேயே விரிவடையும்!";
      }
      if(isTh){
        return "🎮 **Game Rules & Play Modes:**\nFriends HUB Party-la 50+ Games irukku:\n• **Online Multiplayer:** Room-la irukkuravanga kooda live-ah aada mudiyum.\n• **2-Player Local:** Ore screen-la 1v1 aada mudiyum.\n• **Solo / Bot:** Bot kooda instant play pannalaam.\nGame card-a click panna pop-up illama inline-ley details & controls open aagum!";
      }
      return "🎮 **Party Games & Rules Guide:**\nFriends HUB Party features 50+ exciting games:\n• **Online Multiplayer:** Play in real-time with everyone in your party room.\n• **2-Player Local:** Play 1v1 on the exact same screen / device.\n• **Solo / Bot:** Practice instantly against smart AI bots.\nClicking any game expands its modes and detailed rules smoothly inline!";
    }

    if(s.includes('audio') || s.includes('boost') || s.includes('sync') || s.includes('ஒலி') || s.includes('சத்தம்')){
      if(isTa){
        return "🔊 **ஒலி பெருக்கி (Audio Booster 300%):**\n• வால்யூம் ஸ்லைடரை 100%-க்கு மேல் நகர்த்தி 300% வரை ஒலியை அதிகரிக்கலாம்.\n• வீடியோவின் நேரத்தை நண்பர்களுடன் நிகழ்நேரத்தில் ஒத்திசைக்க 'Sync' பொத்தானைப் பயன்படுத்துங்கள்!";
      }
      if(isTh){
        return "🔊 **Audio Boost & Sync:**\n• Volume slider-a 100%-ku mela drag panna 300% boost aagum.\n• Friends kooda video time sync panna 'Sync' button use pannunga!";
      }
      return "🔊 **Audio Boost & Video Sync:**\n• Drag the volume slider beyond 100% to boost playback volume up to 300% via built-in dynamic compressor.\n• Click the **Sync** button in the header if anyone falls out of sync during video watching!";
    }

    if(isTa){
      return "🤖 அருமையான கேள்வி! Friends HUB Party-யில் வீடியோக்கள், 50+ விளையாட்டுகள், மற்றும் 3D நகரம் அனைத்தும் ஒரே தளத்தில் இணைக்கப்பட்டுள்ளன. மேலும் விரிவான உரையாடலுக்கு '⚙️ API' கிளிக் செய்து இலவச Gemini API கீயை இணைக்கலாம்!";
    }
    if(isTh){
      return "🤖 Super kelvi! Friends HUB Party-la synchronized cinema, 50+ multiplayer games, and 3D virtual world ore idathula enjoy pannalaam. Unmaiyaana AI chat-ku '⚙️ API' click panni unga free Gemini key poda mudiyum!";
    }
    return "🤖 Great question! Friends HUB Party combines synchronized cinema, 50+ online multiplayer games, and a realistic 3D virtual world. For unlimited conversational AI, click **⚙️ API** in the header and paste your Google Gemini API key!";
  }

  window.__aiUpdateLang = function(){
    const curL = (typeof lang !== 'undefined' ? lang : 'en');
    if(input){
      input.placeholder = curL === 'ta' ? 'எதையும் கேளுங்கள் (English, தமிழ், Tanglish)...' :
                          curL === 'th' ? 'Aria-kitta edhaavathu kelunga...' :
                          'Ask Aria anything in English, தமிழ் or Tanglish...';
    }
  };
})();