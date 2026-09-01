# ElectronTest - Dummy Desktop App

Quick proof-of-concept that a web app can be packaged as a native desktop app.

## Run locally
```bash
npm install
npm start
```

## Build installers
```bash
# On Mac - builds .dmg (will be in dist/)
npm run build:mac

# On Mac - builds .exe still works via wine/mono if installed, but best built on Windows / CI
npm run build:win

# Or build both via GitHub Actions
npm run build:all
```

Unsigned .dmg will show Gatekeeper warning on first launch (right-click -> Open).

## GitHub Releases (auto build .dmg + .exe)
This repo includes `.github/workflows/build.yml` - push a tag `v0.1.0` and it will build both installers and attach to Releases.

## What it proves
- UI is just `index.html` + `renderer.js` + `style.css`
- No hosting needed - files bundled inside app
- Still can call internet APIs when online
- Native access via `preload.js` / IPC
