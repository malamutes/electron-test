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

The release workflow fails safely if any are missing, so it cannot publish an
unsigned macOS installer by accident. For a temporary local unsigned build only,
Control-click the app and select **Open**; do not rely on that for distribution.

## GitHub Releases (auto build .dmg + .exe)
This repo includes `.github/workflows/build.yml`. Once the secrets above are
configured, push a tag such as `v0.1.0`; it builds signed/notarized macOS `.dmg`
and `.zip` files plus a Windows installer, then attaches them to a GitHub Release.

## What it proves
- UI is just `index.html` + `renderer.js` + `style.css`
- No hosting needed - files bundled inside app
- Still can call internet APIs when online
- Native access via `preload.js` / IPC
