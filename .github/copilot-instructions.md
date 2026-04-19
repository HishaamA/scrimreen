# Copilot Instructions

## Build & Dev Commands

```sh
npm install       # Install dependencies
npm run dev       # Start Vite dev server
npm run build     # Production build (output: dist/)
```

No test framework or linter is configured.

## Architecture

This is a **detective puzzle game** with a retro **Windows 95 desktop** metaphor, originally generated from Figma Make. Players solve environmental crime cases in the UAE by using in-browser simulated tools (SQL terminal, Python editor, evidence viewer, map, etc.) presented as draggable OS windows.

### Game Flow

`HomeScreen` → `BootSequence` → Desktop with `Taskbar`, `StartMenu`, and `Desktop` icons → Player selects a case → `CaseBriefing` → investigative windows open → Player uses `SQLQueryTerminal` / `PythonEditor` / `EvidenceViewer` to gather clues → `ArrestWarrant` → `SolutionScreen`

### State Management

All game state lives in **`App.tsx`** via `useState` hooks — there is no external state library or context. `App.tsx` is the central orchestrator: it manages the window list, case selection, accusation flow, and passes callbacks down as props.

### Window System

Each open tool is a `WindowState` object (defined in `src/app/types/game.ts`). The `Window95` component wraps every tool window with drag, minimize, maximize, and close behavior. Windows are z-indexed and managed as an array in `App.tsx`.

### Key Directories

- **`src/app/components/`** — All game tool components (one per file). Each renders inside a `Window95` wrapper.
- **`src/app/components/ui/`** — shadcn/ui primitives (Radix-based). Do not edit these directly; regenerate via shadcn CLI if needed.
- **`src/app/components/figma/`** — Figma Make utility components (`ImageWithFallback`).
- **`src/app/data/cases.ts`** — All case content (suspects, evidence, locations, solutions) as hardcoded data.
- **`src/app/types/game.ts`** — Core TypeScript interfaces: `Case`, `Suspect`, `Evidence`, `WindowState`, etc.
- **`src/styles/`** — CSS layers: `fonts.css` → `tailwind.css` → `theme.css` (shadcn design tokens) → `retro.css` (Windows 95 styles).

## Conventions

### Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin — no `tailwind.config` file; configuration is in `src/styles/theme.css` using `@theme inline`.
- Use the **`cn()` helper** (`src/app/components/ui/utils.ts`) for conditional/merged class names.
- Windows 95 look is achieved via **CSS classes** in `retro.css`: `window-95`, `window-95-titlebar`, `window-95-button`, `window-95-input`, `window-95-panel`, `desktop-icon`, `terminal-text`.
- shadcn/ui theming uses CSS custom properties (e.g., `--primary`, `--background`) defined in `theme.css`.

### Path Aliases & Asset Imports

- `@` is aliased to `./src` in Vite config.
- `figma:asset/<filename>` resolves to `src/assets/<filename>` via a custom Vite plugin. Do not remove this plugin.

### Simulated Tools

The `SQLQueryTerminal` and `PythonEditor` components are **client-side simulations** — they parse user input and query hardcoded in-memory data arrays, not real databases. When adding a new case, you must add matching data rows to the relevant component's internal arrays.

### Deployment

Deployed on **Netlify** (`netlify.toml`). Node 20. Build command: `npm run build`, publish dir: `dist/`.
