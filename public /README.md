# 📖 GraceVoice

**GraceVoice** is your intelligent, voice-powered scripture assistant—bringing hands-free Bible reading to anyone, anywhere. Built for clarity, accessibility, and simplicity, it enables natural language interaction, large-font display, and offline usage on all major platforms.

---

## 🌟 Features

- 🎙️ **Natural Voice Commands**  
  Say things like:
  - “Read Genesis 1 verse 1”
  - “Read John 3 verse 16 to 18”
  - “Repeat”, “Stop”, or “Pause”

- 🔊 **Text-to-Speech (TTS)**  
  - Reads scripture aloud using your device's available voices

- 👁️ **Large Font Verse Display**  
  - Ideal for elderly or visually impaired users

- 🔖 **Verse Bookmarks and Personal Notes**  
  - Save favorite verses and add notes with timestamps

- 🌗 **Night Mode**  
  - Toggle between light and dark themes for better visibility

- 🌐 **Offline Support**  
  - Works without internet after first load (via service worker)

- 📲 **Installable PWA**  
  - Add to your home screen like an app (Android, iPhone, desktop)

- 🔒 **Secure API Proxy**  
  - Fetches scripture via `/api/fetch-script.js` with translation support

- 🧠 **GraceVault Fallback Engine**  
  - Uses local Google Drive HTML backups when Bible-API.com is down *(optional)*

---

## 📁 Project Structure

```bash
.
├── api/
│   └── fetch-script.js        # Proxy to Bible API or GraceVault fallback
├── public/
│   ├── index.html             # Main voice-enabled interface
│   ├── reader.html            # Auto-reader with voice playback
│   ├── bookmarks.html         # Saved verse bookmarks
│   ├── history.html           # Reading history (auto-logged)
│   ├── notes.html             # Personal note journal
│   ├── settings.html          # Theme, voice, translation options
│   ├── nav-bar.html           # Universal bottom navigation bar
│   ├── manifest.json          # PWA manifest
│   ├── icon-192.png
│   ├── icon-512.png
│   └── sw.js                  # Service worker for offline support
├── vercel.json                # Redirects and rewrites for API routing
├── package.json               # Metadata and optional dependencies
├── .gitignore
└── README.md                  # You're reading it
