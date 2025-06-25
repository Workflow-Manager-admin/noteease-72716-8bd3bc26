# Notes Frontend (Svelte)

A minimalist, responsive, single-page notes app built with SvelteKit.

## Features

- Create, view, edit, and delete notes  
- Sidebar navigation with all notes  
- Local browser persistence (no backend)  
- Clean, light theme with accent colors  
- Responsive and accessible UI  
- Fast UX: instant save, edit, and navigation

## Tech

- SvelteKit
- LocalStorage for state
- Vanilla CSS, using CSS custom properties

## To run

1. Install dependencies: `npm ci` or `npm install`
2. Start dev: `npm run dev`
3. Open: [http://localhost:3000/notes](http://localhost:3000/notes)

## Folder Structure

- src/lib/components: Sidebar, NoteView
- src/lib/stores: notesStore.ts
- src/routes/notes/[id]: Note detail & edit
- src/routes/notes/list: List all notes

## Customization

- Modify colors in `src/app.css: :root` or sidebar/note components as needed.
