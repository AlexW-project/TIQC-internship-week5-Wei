document.getElementById("save").addEventListener("click", async () => {
  const lang = document.getElementById("targetLang").value.trim();
  await chrome.storage.sync.set({ targetLang: lang });
  document.getElementById("status").textContent = "Saved!";
});

// Load saved preferences
(async () => {
  const prefs = await chrome.storage.sync.get(["targetLang"]);
  document.getElementById("targetLang").value = prefs.targetLang || "en";
})();
