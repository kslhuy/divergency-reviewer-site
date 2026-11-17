---
name: divergency-25d-stage-background
description: Generate pixel-art 2.5D beat 'em up stage backgrounds for Divergency, matching the approved blood-lair palette and catacomb gameplay composition. Use for new background images, adapting an inspiration image into a playable-looking arena, or requests for the same pixel stage style. Engine setup and existing Unity scene editing are outside this skill.
---

# Divergency 2.5D Stage Background

Create a finished background image in the user's approved visual style: dark handcrafted pixel art, muted colors, a side-on environment, and a broad visible floor for beat 'em up movement in depth. The defaults below encode the approved result; follow any explicit changes requested by the user.

## Visual anchors

Inspect these bundled images with `view_image` before composing the generation prompt. Resolve paths relative to this skill folder.

- [style-anchor.png](references/style-anchor.png): the user's `ch4_03b_blood_lair_arena_draft.png`. This is the primary reference for pixel clusters, contours, shading, and color range.
- [approved-gameplay-layout.png](references/approved-gameplay-layout.png): the approved dragon-bone catacomb result. Use its visible floor depth, open combat space, and separation between floor and scenery as the layout reference.

When the user supplies another image, inspect it too. Assign each input a clear role. An inspiration image contributes its setting, architecture, materials, and distinctive forms; the style anchor determines pixel rendering and palette. A multilevel platformer illustration must be recomposed into one continuous beat 'em up room. Do not reproduce its stacked platforms, characters, UI, or brighter rendering. A new explicit style reference from the user takes priority over these defaults.

## The approved defaults

- Wide 2:1 horizontal composition unless the user requests another aspect ratio.
- Fixed side-on view with a shallow visible ground plane. Here, 2.5D means 2D pixel artwork supporting left/right movement and movement toward/away from the rear wall.
- An uninterrupted battle floor across the width, occupying roughly the lower 40-50% of the image. Keep the central movement space open. Flat debris, small bones, cracks, and sparse low roots are suitable texture; large props belong behind its rear edge.
- Place the principal architecture and silhouettes in the midground, with a recessed background visible through gaps. Optional foreground framing belongs near the top border or extreme corners.
- Match the style anchor's visible square pixel clusters, stair-step contours, discrete short shade ramps, restrained dithering, and sparse highlights. Aim for the visual density of a roughly 900 x 450 hand-drawn pixel background, even when the delivered image is larger. This is a style target, not a guarantee of native pixel dimensions.
- Default palette: near-black charcoal, desaturated blue-violet slate, earthy bone gray, muted ochre/brown, dried-blood burgundy, and subdued ghostly teal. Weathered bones stay gray-ochre. Water and distant accents stay muted. Preserve enough value separation to read scenery and future characters against the floor.
- One opaque environment image, without characters, enemies, ghosts, UI, labels, or watermarks. The theme can change; dragon bones, crimson sinew, and teal water are motifs of the approved cavern, not mandatory props for every stage.

Avoid 3D rendering, isometric/top-down views, a perspective road converging into the distance, map overviews, stacked playable ledges, floor pits, oversized foreground obstructions, smooth airbrushing, soft gradients, anti-aliased outlines, painterly microtexture, neon lighting, and heavy bloom unless the user requests a departure.

## Generate and check

Use the built-in `image_gen` tool. Follow the imagegen skill's execution requirements when available. Do not substitute an SVG, procedural drawing, or a prompt-only answer for a requested background image. No paid API/CLI fallback without the user's request or confirmation.

Read [generation-prompt.md](references/generation-prompt.md) and adapt it to the requested setting. Use actual local reference paths with `referenced_image_paths`; label their roles and ordering explicitly in the prompt. Normally include the user's inspiration image, the bundled style anchor, and the approved layout reference. If there is no new inspiration, use the two bundled references and the user's scene description. Generate directly when these inputs are enough.

Inspect the resulting image. Check that the setting comes from the requested inspiration, the style comes from the style anchor, the floor is continuous and usable-looking, and large scenery sits behind it. Check for unwanted characters, neon colors, 3D/painterly rendering, and obstructed movement space. If a material requirement fails, make one focused correction and recheck. Do not spend repeated generations chasing negligible differences or claim exact pixel/palette equivalence.

Save the selected PNG into the user's requested destination, or an appropriate project image directory. Use a descriptive new filename; preserve source assets unless replacement was requested. Also save the final prompt and the reference roles beside it. Show the image inline through the generation tool and provide a concise saved-file link. Distinguish generated artwork from an engine-tested stage; do not modify Unity scenes or other consuming code unless requested.
