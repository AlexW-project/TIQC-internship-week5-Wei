function createOverlay(text) {
  let panel = document.getElementById("wk5-panel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "wk5-panel";
    panel.style = `
      position: fixed;
      top: 10px;
      right: 10px;
      max-width: 400px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      padding: 12px;
      z-index: 999999;
      font-family: system-ui, sans-serif;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    `;

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✖";
    closeBtn.style = "float:right; cursor:pointer; background:none; border:none; font-size:16px;";
    closeBtn.onclick = () => panel.remove();
    panel.appendChild(closeBtn);

    const content = document.createElement("div");
    content.id = "wk5-panel-content";
    panel.appendChild(content);

    document.body.appendChild(panel);
  }

  document.getElementById("wk5-panel-content").textContent = text;
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "SHOW_TRANSLATION") {
    createOverlay(msg.text);
  }
});
