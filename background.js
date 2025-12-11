importScripts("utils.js");

// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translate-selection",
    title: "Translate selection",
    contexts: ["selection"]
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "translate-selection") return;

  const text = info.selectionText || "";
  const prefs = await chrome.storage.sync.get("targetLang");
  const lang = prefs.targetLang || "en";

  const key = await hashKey(tab.url + "::" + text + "::" + lang);
  const cached = await chrome.storage.local.get(key);

  let translation = cached[key];
  if (!translation) {
    translation = await mockTranslate(text, lang);
    await chrome.storage.local.set({ [key]: translation });
  }

  chrome.tabs.sendMessage(tab.id, {
    type: "SHOW_TRANSLATION",
    text: translation
  });
});
