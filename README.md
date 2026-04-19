
# SIMER DETECTIVE AGENCY

A retro-styled detective puzzle game where you solve environmental crimes in the UAE using SQL queries, Python decryption, and database investigation tools.

## About the Game

Players investigate cases by:
- Examining evidence and crime scene photos
- Writing SQL queries to search databases (chemical companies, vehicle registry, suspects, etc.)
- Using Python to decrypt encrypted messages
- Cross-referencing data to identify suspects
- Issuing arrest warrants for the culprit

The game features a **Windows 95 desktop metaphor** with draggable tool windows, a taskbar, and start menu — all rendered in React with Tailwind CSS.

## Project Structure

```
src/app/
  ├── components/         # All game tool windows (SQLQueryTerminal, PythonEditor, etc.)
  ├── data/cases.ts       # All case content & hardcoded game databases
  ├── types/game.ts       # TypeScript interfaces
  ├── utils/clickSound.ts # Audio & click effects
  └── App.tsx             # Central game state & orchestrator

electron/                 # Electron main process & protocol handler
dist/                     # Built web assets
public/                   # Audio & image files
```

## Installation & Running

### Development (Hot Reload)
```bash
npm install
npm run electron:dev
```
Starts Vite dev server + Electron window pointing to localhost:5173.

### Production Preview
```bash
npm run electron:preview
```
Builds once and opens Electron with production assets.

### Building Installers
```bash
npm run electron:build
```
Outputs:
- **macOS**: `release/SIMER DETECTIVE AGENCY-0.0.1-arm64.dmg`
- **Windows**: `release/SIMER DETECTIVE AGENCY Setup 0.0.1.exe` (installer) or `.zip` (portable)
- **Linux**: `.AppImage` (if built on Linux)

## Installing from Installers

### macOS
1. Download `SIMER DETECTIVE AGENCY-0.0.1-arm64.dmg`
2. Double-click to mount the disk image
3. Drag the app icon to the Applications folder
4. Eject the disk image
5. Open Applications folder and launch **SIMER DETECTIVE AGENCY**

### Windows
**Option 1: Installer (Recommended)**
1. Download `SIMER DETECTIVE AGENCY Setup 0.0.1.exe`
2. Double-click and follow the installer prompts
3. Launch from Start Menu or Desktop shortcut

**Option 2: Portable (No Installation)**
1. Download `SIMER DETECTIVE AGENCY-0.0.1-win.zip`
2. Extract to any folder
3. Run `SIMER DETECTIVE AGENCY.exe`

## How to Play

### The Goal
Solve environmental crime cases in the UAE by gathering evidence, querying databases, and issuing arrest warrants for the culprit.

### Gameplay Loop
1. **Select a Case** — Pick from available investigations (new cases unlock as you solve previous ones)
2. **Examine Evidence** — Open the Evidence Files window to review crime scene photos and clues
3. **Query Databases** — Use the SQL Query Terminal to search through:
   - `vehicle_registry` — License plates and vehicle owners
   - `suspects` — Suspect profiles and details
   - `chemical_imports` — Chemical batch imports
   - `corporate_registry` — Company CEOs
   - `fleet_logs` — Vehicle movements and timestamps
4. **Decrypt Messages** — Use the Python Editor with `caesar_cipher()` or `extract_numbers()` to decrypt clues
5. **Cross-Reference Data** — Match evidence with database queries to identify the guilty party
6. **Accuse** — Click "ACCUSE SUSPECT" in the taskbar, enter the suspect's name, and issue an arrest warrant
7. **Get Feedback** — Receive audio briefing from your chief with results and hints for incorrect accusations

### Pro Tips
- Read the **Case Briefing** carefully — it outlines the investigation strategy
- Use the **Manual Viewer** for SQL and Python reference guides
- Pay attention to **timestamps** and **locations** in the evidence
- Wrong accusations don't end the game — the chief will provide guidance to get back on track
- Listen for **audio clues** from the case briefing and transcript playback

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (bundler)
- **Tailwind CSS v4** + custom Windows 95 styling
- **Electron** (cross-platform desktop)
- **Radix UI** (headless components)
- **React DnD** (drag-and-drop windows)

## Notes

- The SQL/Python tools simulate queries against **in-memory data** (no real backend)
- All case workflows, evidence, and solutions are hardcoded in `src/app/data/cases.ts`
- Audio and large files are unpacked from the Electron asar archive for proper streaming
- Custom `app://` protocol in Electron ensures absolute paths work offline
  