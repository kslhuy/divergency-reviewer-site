# Divergency reviewer site entry point

- Read the repository's `AGENTS.md` at the start of each task; it is authoritative for Divergency identity, author-approved character canon and content/export checks.
- Serena project name: `divergency-reviewer-site`. JavaScript and ES modules (`.js`, `.mjs`) use the `typescript` language server; verify current symbols through Serena before editing.
- This repository contains reviewer web content and authoring/export tools. Relevant sources include `content/`, `src/`, `scripts/`, `online/`, and `build-reviewer-html.mjs`. Inspect the current `package.json` before choosing commands.
- `npm run check:canon` checks known character-canon errors; `npm run build:all` rebuilds reviewer exports. Follow AGENTS.md for affected PDF review. Tests are available via `npm test`; choose checks appropriate to the change.
- Configuration or instruction-only updates do not require rebuilding content exports. Do not claim gameplay, content or build validation from a successful Serena setup.
- The related Unity repository is `../LF2Revie`. Read `mem:workflow/related_projects` for switching, source authority, comparisons and cross-project handoffs.
- Inspect existing changes before edits. Other clients may have ongoing work; do not reset, clean or overwrite unrelated changes. Keep credentials and private client configuration out of memories.
- Memories contain durable guidance, not live task status. Current user instructions and checked-in sources take precedence.
