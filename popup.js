document.getElementById("translatePage").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, {
    type: "SHOW_TRANSLATION",
    text: "[whole page translation placeholder]"
  });
});
