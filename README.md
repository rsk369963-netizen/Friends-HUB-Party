# Friends HUB Party 🎬🎉

A next-generation virtual party platform featuring synchronized video streaming, 50+ real-time multiplayer games, a 3D living social city with realistic human avatars, and an intelligent AI-powered assistant.

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)
[![WebRTC](https://img.shields.io/badge/Peer--to--Peer-WebRTC-blue.svg)](https://peerjs.com/)
[![Three.js](https://img.shields.io/badge/3D-Three.js-black.svg)](https://threejs.org/)
[![Languages](https://img.shields.io/badge/Languages-English%20%7C%20தமிழ்%20%7C%20Tanglish-emerald.svg)](#global-languages)

---

## 🌟 Overview

**Friends HUB Party** transforms online hangouts into a realistic, interactive, and seamless virtual gathering. Built entirely with pure modern web technologies (HTML5, CSS3, JavaScript, WebRTC, Three.js, and Web Audio API), it runs smoothly in any browser on desktop, laptop, tablet, and mobile devices with zero install requirements.

---

## 🚀 Key Features

### 1. 🎬 Universal Streaming Player & Virtual Cinema
- **Universal Stream Detection**: Paste any stream link to auto-detect and play:
  - **Apple HLS (`.m3u8`)**: Live & VOD streaming powered by `Hls.js` and native Apple Safari pipelines.
  - **MPEG-DASH (`.mpd`)**: Adaptive bitrate streaming powered by `Dash.js`.
  - **Direct HTML5 Media**: Direct HTTP/HTTPS streams for MP4, WebM, OGV, MP3, M4A, WAV, and local files.
  - **YouTube Player**: Full synchronization for standard videos, Shorts, live streams, and embed links.
- **OTT Watch Party Companion Hub**:
  - Authorized co-watching companion for DRM-protected services (**Netflix, JioHotstar, Amazon Prime Video, SonyLIV, aha, ZEE5, Sun NXT**, etc.).
  - Synchronized room timestamp counter, sync beacons, and master 3-2-1 countdown trigger so friends hit play together.
  - Zero DRM circumvention; respects official provider security boundaries while delivering true synchronized co-watching.
- **P2P Live Screen & Audio Streaming**:
  - Host can broadcast any screen, application window, or browser tab with system audio directly to room members via WebRTC MediaStreams.
- **Cinema Controls**:
  - Aspect Ratio Selector (`Fit`, `Cover`, `16:9 Cinema`, `21:9 Ultrawide`, `Stretch`).
  - Adaptive Quality / Level Picker (Auto, 1080p, 720p, 480p, 360p).
  - Audio Volume Booster up to 300% with Web Audio API dynamics compression.
  - Subtitle track loader (`.vtt` / `.srt`), playback rate (`0.25x` to `2x`), Picture-in-Picture (`PiP`), and Fullscreen.

### 2. 🎮 50+ Real-Time Multiplayer Games
- Instant P2P multiplayer powered by PeerJS DataChannels.
- Smooth inline game selection inside the Game Hub (no disruptive pop-ups).
- Multiple game modes:
  - **🌐 Play Online with Friends**: Multi-peer synchronized party sessions.
  - **👥 2-Player Local**: Split/shared screen 1v1 action on the same device.
  - **🤖 Solo / vs Bot**: Practice offline against automated bots.
- Diverse categories:
  - **Board & Classics**: Ludo, Chess, Business Tycoon, Tic-Tac-Toe, Connect 4, Snakes & Ladders.
  - **Sports & Action**: 2-Player Pong, Air Hockey, Carrom, Cricket, Penalty Shootout, Basketball.
  - **Brain & Knowledge**: Trivia Quiz, Memory Pairs, Typing Race, Math Blitz.
  - **Arcade & Mystery**: Laser Maze, Safe Cracker, Police Chase, Bank Heist.
- **In-Game Reactions & Celebrations**:
  - Live emoji reactions (`🔥`, `👏`, `⚡`, `❤️`, `🎉`, `😂`) floating across screens.
  - Dynamic rewards and achievement badges (*🏆 Match Winner*, *⚡ MVP Champion*, *🔥 Party Legend*).
  - Confetti and audio fanfare on game completion.

### 3. 🏙️ 3D Virtual World — Realistic Human Avatars & Living City
- Built with **Three.js** with optimized procedural rendering and device-scaled LOD.
- **Realistic Human Avatars**:
  - Anatomically correct 7.5-head proportions with male and female body silhouettes.
  - Realistic facial features, PBR skin shaders, modern hairstyles (fade, quiff, ponytail, curls, bun).
  - Contemporary wardrobe selections and sneaker models.
  - Smooth animations for walking, running, sitting, and idle gestures.
- **Living Virtual City (`city`)**:
  - Detailed architectural skyscrapers with procedural illuminated window textures.
  - Dual-lane asphalt avenues with road markings, curbs, and real `PointLight` streetlamps.
  - Animated cruising traffic with glowing headlights and taillights.
  - Central landscaped park with rippling fountain.
  - Dual control schemes: Pointer Lock / Mouse-look on desktop, responsive dual on-screen joysticks on touch devices.

### 4. 🤖 Platform-Wide AI Chatbot Assistant (Aria)
- Floating AI assistant accessible across every screen and module.
- Explains game rules, room setup, WebRTC troubleshooting, audio controls, and 3D navigation.
- Built-in support for **Google Gemini API** (`gemini-1.5-flash`) with client-side API key configuration drawer.
- Comprehensive offline natural language engine fallback supporting English, Tamil, and Tanglish.

### 5. 🌐 One Unified Global Language System
- Single global language switcher in the main navigation.
- Native support for three languages:
  1. **English** (`en`)
  2. **தமிழ் (Tamil)** (`ta`)
  3. **Tanglish** (`th`)
- Applies across all menus, buttons, game rules, dialogue cards, scoreboard, Party Pack games, and system messages.

### 6. 🎉 Advanced Party Pack & 🔞 18+ After Dark
- **Real-Time Online Multiplayer**:
  - All room members play together simultaneously using their own smartphones or laptops over WebRTC data channels.
  - Synchronized timers, round prompts, live voter participation status, and synchronized reveal screens.
  - Real-time podiums (1st 🥇, 2nd 🥈, 3rd 🥉) with confetti animations and celebratory sound effects.
  - Automatic late-joiner synchronization and reconnection recovery.
- **Family / Standard Games (All Ages)**:
  - **Truth or Dare**: Classic party game with 3-language prompt engine and skip moderation.
  - **Would You Rather**: Secret voting on fun dilemmas with majority-rules scoring.
  - **Emoji Challenge**: 20-second speed decoding of famous movies and phrases.
  - **Fake or Real?**: Fast-paced science and nature fact trivia with speed bonuses.
- **🔞 18+ After Dark – Adult Party Games (Exclusive Private Lounge)**:
  - Completely separate module with dedicated dark luxury neon crimson visual theme.
  - **Private Host-Controlled Access System**:
    - Host-generated private access passcode (never exposed in public broadcasts).
    - Host enable/disable toggle.
    - Player 18+ age verification check and private access request.
    - Host moderation popup with **Accept** / **Reject** controls.
    - Approved member roster with instant **Revoke Access** capability.
  - **🔞 18+ Truth or Dare**: Spicy, personal, relationship, and romantic truths/dares for consenting adults with skip protection.
  - **🔥 18+ Questions & Answers**: Provocative debates, multiple-choice polls, and open-ended confessions with group voting.

### 7. 📱 Mobile Responsive & Touch Optimization
- Smooth vertical momentum scrolling on iOS and Android devices (`-webkit-overflow-scrolling: touch`).
- Safe-area inset protection preventing bottom navigation and AI assistant floating button overlap.
- Touch-friendly tap targets ($44\text{ px}+$ minimum), no accidental scroll locking, and zero horizontal overflow.

---

## 🛠️ Tech Stack

- **Frontend Core**: Vanilla HTML5, CSS3 (Modern Glassmorphism, CSS Variables, Flexbox/Grid)
- **Networking**: [PeerJS](https://peerjs.com/) (WebRTC DataChannels & MediaStreams)
- **3D Graphics**: [Three.js](https://threejs.org/) (r128)
- **Audio Processing**: Web Audio API (Equalization, Gain Booster, procedural tones)
- **AI Intelligence**: Google Gemini API (`v1beta`) with offline fallback NLP engine

---

## 📥 Getting Started

### Option 1: Direct Browser Run
1. Clone or download this repository.
2. Double-click `index.html` to open it in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
3. Enter your nickname and select your avatar.
4. Click **Create Room** or **Join Room** to start partying!

### Option 2: Local Web Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```
Navigate to `http://localhost:8000` in your browser.

---

## 🌐 Deploy to GitHub Pages

This project is completely static and serverless:
1. Go to repository **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select `Deploy from a branch`.
3. Choose `main` branch and `/ (root)` folder.
4. Click **Save**. Your site will be live at `https://<username>.github.io/Friends-HUB-Party/`!

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
