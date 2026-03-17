# Music Player — Claude Code Context

## Project Overview
A Spotify-inspired music player built with React, TypeScript, and Vite.
Features Malaysian artists. Glassmorphism UI design.

## Tech Stack
- React 19
- TypeScript
- Vite 7
- No external UI libraries — all custom CSS

## Project Structure
```
src/
  App.tsx          — root state, TRACKS data, shuffle/repeat logic
  musicplayer.tsx  — audio engine, smart-previous (3s rule)
  control.tsx      — play/pause/next/prev/shuffle/repeat buttons
  progress_Bar.tsx — seek bar + time display
  track_list.tsx   — playlist UI
public/
  assets/
    audio/         — .mp3 files
    artwork/       — album art .jpg files
```

## Track Type
```ts
type Track = {
  id: number;
  title: string;
  artist: string;
  src: string;
  artwork: string;  // path to album art image
}
```

## Tracks Data (5 Malaysian artists)
- Yuna — Lautan
- Payung Teduh — Akad
- dia & Tenod — Sency
- Noh Salleh — Bunga Di Telinga
- Insomniaes — Sempurna

## Branch Strategy
- `main` — stable, merged code only
- `feature/core-playback` — Phase 0 complete (all logic)
- `feature/ui-polish` — Phase 1 onwards (active development)

## Current Phase
Phase 1 complete — artwork field added to Track type and TRACKS data.
Next: Phase 2 — render artist name, track title, and album art in musicplayer.tsx

## Development Phases
- Phase 0 ✅ — audio engine, playback controls, progress bar, playlist, state
- Phase 1 ✅ — artwork field on Track type + TRACKS data
- Phase 2 🔄 — now-playing display (artist, title, album art img)
- Phase 3 ⏳ — card layout + blurred artwork background
- Phase 4 ⏳ — restyle controls to circular buttons
- Phase 5 ⏳ — Spotify-style progress bar
- Phase 6 ⏳ — tracklist toggle panel

## Design Reference
- Card: 580x280px, border-radius 20px
- Blurred artwork as full card background (::before pseudo-element)
- Album art: 195x195px centered, border-radius 12px
- Controls: circular buttons with glassmorphism border
- Repeat icon: top-left corner of card
- Shuffle icon: top-right corner of card
- Font: Playfair Display (artist name) + DM Sans (track title, time)
- Progress bar: thin white line + circular thumb dot

## Rules for Claude Code
- Never commit node_modules/ or dist/
- One logical change per commit
- Commit message format: short imperative sentence (e.g. "Add artwork field to Track type")
- All work happens on feature/ui-polish branch
- Do not touch main directly
