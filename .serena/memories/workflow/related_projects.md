# Working across the two Divergency repositories

## Project map
- Serena project `LF2Revie`: `C:/Users/Quang Huy Nugyen/LF2Revie`. Unity implementation of the game **Divergency**. LF2Revie is the repository/directory name, not the public game name.
- Serena project `divergency-reviewer-site`: `C:/Users/Quang Huy Nugyen/divergency-reviewer-site`. Reviewer website, authoring content, character/gameplay documentation and exports.
- Relative sibling paths are `../divergency-reviewer-site` from the game and `../LF2Revie` from the site. Use these if the checkout base directory changes.

## Startup and switching
1. Read Serena's initial instructions once per conversation. Activate the intended project by its exact registered name or absolute directory, using the current Serena session ID.
2. Confirm the active project before symbol lookup or edits. Read the destination's `AGENTS.md` and `mem:core`; consult this memory for tasks involving both repositories.
3. Keep semantic queries and edits scoped to the intended repository. Set the shell working directory explicitly. Activating Serena does not change the chat's filesystem permissions, shell directory, or Unity Editor.
4. Use each repository's own tools and validation. The game follows `AGENTS.md`, `Docs/UnityAutomation.md` and the applicable project skill. The site follows its own `AGENTS.md` and current `package.json`.
5. When finished, report the active project, files changed in each repository, checks actually completed and remaining work.

## Sources and differences
- Actual game behavior comes from current C# code and Unity assets; inspect scenes, prefabs and ScriptableObjects through Unity APIs. A design document alone does not establish that a feature is implemented.
- The site's `AGENTS.md` records author-approved Divergency identity and character canon. Read it before writing character descriptions in either repository. Source content belongs in `content/` and the active authoring scripts; rebuild exports using the site's instructions.
- Do not derive Divergency character abilities from another game's conventions or the legacy repository name. Mark new design ideas as proposals.
- If implementation, canon and documentation disagree, compare and report the specific difference. Preserve author-approved facts unless the user explicitly changes them; do not silently synchronize conflicting data.
- For a cross-project update, name the source and destination first, compare relevant current files, then apply the requested update and run the destination's applicable checks.

## Handoffs and concurrent work
- Check current changes in both repositories before editing. Preserve other clients' work; do not reset, clean or overwrite unrelated changes.
- Full chat history is not shared by Serena. Save a focused, dated handoff for an unfinished task: objective, repository/branch when useful, files and symbols touched, completed checks/results, pending work and concrete next steps.
- Coordinate ownership when clients work concurrently; only one agent may operate the same Unity Editor.
- Keep this durable workflow separate from task status and credentials. This same memory lives in each project's `.serena/memories/workflow/related_projects.md`; update both copies when the shared workflow changes.

## Short user requests
- “Làm bên game Divergency: …” selects `LF2Revie`.
- “Làm bên reviewer site: …” selects `divergency-reviewer-site`.
- “Làm giữa hai project: …” requires checking both sets of instructions and identifying source/destination.
- “Lưu bàn giao việc này” asks for a task-specific handoff, not a copy of the entire conversation.
