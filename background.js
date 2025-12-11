importScripts("utils.js");

// Create context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translate-selection",
    title: "Translate selection",
    contexts: ["selection"]
  });
});

// Handle translation requests
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "translate-selection") return;

  const selectedText = info.selectionText || "";
  const prefs = await chrome.storage.sync.get(["targetLang"]);
  const lang = prefs.targetLang || "en";

  const key = await hashKey(tab.url + "::" + selectedText + "::" + lang);
  const cached = await chrome.storage.local.get(key);

  let translated = cached[key];

  if (!translated) {
    translated = await mockTranslate(selectedText, lang);
    await chrome.storage.local.set({ [key]: translated });
  }

  chrome.tabs.sendMessage(tab.id, {
    type: "SHOW_TRANSLATION",
    text: translated
  });
});
