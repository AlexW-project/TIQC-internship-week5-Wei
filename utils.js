// Simple text hashing
async function hashKey(text) {
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Mock translation to simulate behavior
async function mockTranslate(text, lang) {
  return `[${lang}]: ` + text.split("").reverse().join("");
}
