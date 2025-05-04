# 📖 GraceVoice

**GraceVoice** is your intelligent, voice-powered scripture assistant—bringing hands-free Bible reading to anyone, anywhere. Built for accessibility, clarity, and simplicity, it enables natural language interaction and large-font verse display with offline support.

---

## 🌟 Features

- 🎙️ **Natural Voice Commands**
  - “Read Genesis 1 verse 1”
  - “Read John 3 verse 16 to 18”
  - “Repeat”, “Stop”, or “Pause”
- 🔊 **Text-to-Speech (TTS)** playback using your browser
- 👁️ **Large Font Verse Display** – ideal for elderly or visually impaired users
- 📝 **Verse Bookmarks and Personal Notes**
- 🌐 **Offline Support** – powered by a Service Worker
- 📲 **Installable PWA** – add to home screen on Android, iPhone, or desktop
- 🔒 **Secure API Proxy** – pulls scripture data from [Bible-API.com](https://bible-api.com) with KJV and WEB translation support
- 🧠 **Fallback Engine** – uses Google Sheets or Drive HTML files when Bible API is unreachable (GraceVault edition)

---

## 🛠️ Project Structure

```bash
.
├── api/
│   └── fetch-script.js        # Proxy to Bible-API.com or GraceVault fallback
├── public/
│   ├── index.html             # Main interface: voice + manual reading
│   ├── reader.html            # Auto-reader (URL: ?book=John&chapter=3)
│   ├── bookmarks.html         # Saved verse bookmarks
│   ├── notes.html             # Personal note-taking interface
│   ├── settings.html          # Voice + theme settings
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Offline service worker
├── vercel.json                # Route rewrites and API settings
├── package.json               # Project metadata and dependencies
├── .gitignore
└── README.md                  # This file
