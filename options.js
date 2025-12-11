document.getElementById("save").addEventListener("click", async () => {
  const lang = document.getElementById("targetLang").value;
  await chrome.storage.sync.set({ targetLang: lang });
  document.getElementById("status").textContent = "Saved!";
});

// Load initial value
(async () => {
  const prefs = await chrome.storage.sync.get(["targetLang"]);
  document.getElementById("targetLang").value = prefs.targetLang || "en";
})();
