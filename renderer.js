async function loadInfo() {
  if (window.api) {
    const info = await window.api.getAppInfo();
    document.getElementById('info').innerHTML = `
      <code>Platform: ${info.platform} | App v${info.version} | Electron ${info.electron} | Node ${info.node}</code>
    `;
  }
}
loadInfo();

document.getElementById('ping').addEventListener('click', async () => {
  const info = await window.api.getAppInfo();
  document.getElementById('output').textContent = `Pong! Native says: ${info.platform} @ ${new Date().toLocaleTimeString()}`;
});

document.getElementById('online').addEventListener('click', () => {
  document.getElementById('output').textContent = navigator.onLine ? '✅ Online — can hit APIs' : '❌ Offline — but app still works (bundled files)';
});

// Demo: fetch still works if internet exists
fetch('https://api.github.com/zen').then(r => r.text()).then(t => console.log('GitHub Zen:', t)).catch(()=>{});
