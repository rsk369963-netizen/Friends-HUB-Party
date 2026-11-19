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

### 1. 🎬 Watch Party & Video Sync
- Synchronized playback for local MP4/WebM video and MP3 audio files across peers.
- Built-in YouTube player with synchronized play, pause, seek, and playback rate.
- Peer-to-peer screen streaming via WebRTC MediaStreams.
- Audio volume booster up to 300% using Web Audio API gain nodes.
- OTT Hub with shortcuts to major platforms (Netflix, Prime Video, Hotstar, SonyLIV, aha, ZEE5, Sun NXT, Apple TV+, and more).

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
- Applies across all menus, buttons, game rules, dialogue cards, scoreboard, and system messages.

### 6. 📱 Full Responsive Design
- Optimized for desktops, laptops, tablets, iPhones, and Android smartphones.
- Zero horizontal overflow, adaptive touch targets (minimum $44 \times 44\text{ px}$), and optimized single-column layout on mobile screens.

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
