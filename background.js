importScripts("utils.js");

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translate-selection",
    title: "Translate selection",
    contexts: ["selection"]
  });
});

// Handle context menu
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "translate-selection") return;

  const text = info.selectionText || "";
  const prefs = await chrome.storage.sync.get(["targetLang"]);
  const lang = prefs.targetLang || "en";

  const key = await hashKey(tab.url + "::" + text + "::" + lang);
  const cached = await chrome.storage.local.get(key);
  let translated = cached[key];

  if (!translated) {
    translated = await mockTranslate(text, lang);
    await chrome.storage.local.set({ [key]: translated });
  }

  chrome.tabs.sendMessage(tab.id, {
    type: "SHOW_TRANSLATION",
});
