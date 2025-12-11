# Week 5 Chrome Extension — Text Translator

Translate selected text or whole pages with a floating overlay and caching.

## Features
- Right-click → Translate selection
- Floating overlay with close button
- Popup for whole-page translation (mock)
- Options page to set default language
- Caching in chrome.storage.local
- Preferences saved in chrome.storage.sync

## Installation
1. Download this folder
2. Open Chrome → `chrome://extensions/`
3. Enable Developer Mode
4. Click **Load unpacked** → select this folder

## Architecture
- `manifest.json` — entry point
- `background.js` — context menu + caching + translation
- `content.js` — overlay panel
- `popup.html/js` — popup UI
- `options.html/js` — preferences
- `utils.js` — hashing & mock translator

## Storage Strategy
- `chrome.storage.sync` — user preferences (<100KB, synced)
- `chrome.storage.local` — translation cache (few MB)

## Demo GIF
Add `assets/demo.gif`:

```markdown
![Demo](assets/demo.gif)
