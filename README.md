# Week 5 Chrome Extension — Text Translator (Manifest V3)

A Chrome Extension that translates selected text using a mock translator, shows the result in an overlay, and caches previous translations.

---

## 🚀 Features
- Right-click → Translate selected text
- Popup for page-level actions
- Floating overlay translation panel
- Options page for default language
- Caching using chrome.storage.local
- Preferences saved in chrome.storage.sync

---

## 📦 Installation (Load Unpacked)
1. Download/clone this repo
2. Open Chrome → `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the folder

---

## 🧱 Architecture
- `manifest.json` – MV3 entrypoint  
- `background.js` – context menu, caching, translation  
- `content.js` – overlay injection  
- `popup.html/js` – popup UI  
- `options.html/js` – user preferences  
- `utils.js` – hashing + mock translator  

---

## 🧠 Storage Decisions
### **chrome.storage.sync**
- Saves user preferences (target language)
- Small (< 100KB allowed)
- Syncs automatically across Chrome devices

### **chrome.storage.local**
- Stores translation cache
- Several MB available (fast)
- Keyed by SHA-256 hash of:  
