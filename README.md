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

## macOS distribution

For a normal, warning-free install, the app must be signed with an Apple
**Developer ID Application** certificate and notarized by Apple. GitHub Releases
does not make an unsigned app trusted by macOS.

Before publishing a release, add these GitHub Actions repository secrets:

- `MACOS_CERTIFICATE`: base64-encoded `.p12` export of the Developer ID Application certificate
- `MACOS_CERTIFICATE_PASSWORD`: password used to export that `.p12`
- `APPLE_ID`: Apple Account email used for notarization
- `APPLE_APP_SPECIFIC_PASSWORD`: app-specific password for that Apple Account
- `APPLE_TEAM_ID`: Apple Developer Team ID

For temporary testing, the release workflow can build without these secrets.
That macOS installer will be unsigned and show the normal unidentified-developer
warning; do not use it for production distribution.

## GitHub Releases (auto build .dmg + .exe)
This repo includes `.github/workflows/build.yml`. Push a tag such as `v0.1.0`;
it builds a macOS `.dmg` and `.zip` plus a Windows installer, then attaches them
to a GitHub Release. If the macOS secrets are configured, the macOS artifacts are
signed and notarized; otherwise, they are unsigned test artifacts.

## What it proves
- UI is just `index.html` + `renderer.js` + `style.css`
- No hosting needed - files bundled inside app
- Still can call internet APIs when online
- Native access via `preload.js` / IPC
