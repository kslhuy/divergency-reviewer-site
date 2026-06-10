import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const outputFile = path.join(here, "Divergency_Reviewer_Tabs.html");
const heroBackground = "imgs/UI/K_banner/K_baner_animated.gif";

const documents = [
  {
    id: "kickstarter",
    label: "Kickstarter Page",
    eyebrow: "Campaign pitch",
    file: "Divergency_Kickstarter_Page_Rewrite.md",
    summary:
      "Reviewer-ready campaign copy: hook, gameplay, story, funding, timeline, rewards, shipping, and risks.",
  },
  {
    id: "story-summary",
    label: "Story Short Summary",
    eyebrow: "Quick narrative read",
    file: "Divergency_Story_Short_Summary.md",
    summary:
      "Condensed causal story pass covering Jamerson, Bastonne, Marseille, each later stage, the final ritual, and epilogue themes.",
  },
  {
    id: "story",
    label: "Complete Story",
    eyebrow: "Narrative bible",
    file: "Divergency_Complete_Story_VI.md",
    summary:
      "Full Divergency story structure with premise, themes, central cast, five major stages, ending, and gameplay notes.",
  },
  {
    id: "gameplay",
    label: "Gameplay & Level Design",
    eyebrow: "Design translation",
    file: "Divergency_Gameplay_Level_Design.md",
    summary:
      "Stage-by-stage gameplay plan covering mechanics, puzzles, encounters, bosses, enemy families, and skill pacing.",
  },
  {
    id: "rewards",
    label: "Rewards Checklist",
    eyebrow: "Launch readiness",
    file: "Rewards_Fulfillment_Checklist.md",
    summary:
      "Reward tiers, EU shipping rules, custom NPC scope, pledge manager setup, reviewer questions, and launch blockers.",
  },
];

const imageSlots = {
  kickstarter: [
    {
      src: "imgs/Stage1/In_thecity_Fix.png",
      alt: "Marseille city environment",
      caption: "Marseille city mood capture",
    },
    {
      src: "imgs/Stage1/Sewer1.png",
      alt: "Marseille sewer environment",
      caption: "Stage 1 sewer exploration",
    },
    {
      src: "imgs/UI/Character_selcted_story.png",
      alt: "Character and mission selection UI",
      caption: "Mission and loadout selection",
    },
    {
      src: "imgs/Stage4/view_final.gif",
      alt: "Animated Stage 4 view",
      caption: "Animated world / set-piece preview",
    },
  ],
  story: [
    {
      src: "imgs/chars/Poster.png",
      alt: "Divergency character poster",
      caption: "Character poster / cast signal",
    },
    {
      src: "imgs/Stage2/J start sakuri.png",
      alt: "Sakuri stage opening environment",
      caption: "Sakuri stage story environment",
    },
    {
      src: "imgs/Stage5/meet_the_god_trailer.gif",
      alt: "The Cradle divine encounter animation",
      caption: "The Cradle / divine encounter preview",
    },
    {
      src: "imgs/Stage3/Pain_fotress.png",
      alt: "Calvaria fortress environment",
      caption: "Calvaria fortress atmosphere",
    },
  ],
  "story-summary": [
    {
      src: "imgs/chars/Poster.png",
      alt: "Divergency character poster",
      caption: "Main cast / story anchor",
    },
    {
      src: "imgs/Stage1/Bastonne.png",
      alt: "Bastonne prison stage",
      caption: "Bastonne rescue setup",
    },
    {
      src: "imgs/Stage1/In_thecity_Fix.png",
      alt: "Marseille city environment",
      caption: "Marseille escape pressure",
    },
    {
      src: "imgs/Stage5/meet_the_god_trailer.gif",
      alt: "The Cradle divine encounter animation",
      caption: "The Cradle finale signal",
    },
  ],
  gameplay: [
    {
      src: "imgs/Stage4/stage4_act_4_1_dragon_cave_approach_map.png",
      alt: "Stage 4-1 dragon cave approach playable map",
      caption: "Stage 4-1 playable map: Dragon Cave Approach",
    },
    {
      src: "imgs/Stage4/stage4_act_4_2_dragon_bone_catacombs_map.png",
      alt: "Stage 4-2 dragon bone catacombs playable map",
      caption: "Stage 4-2 playable map: Dragon Bone Catacombs",
    },
    {
      src: "imgs/Stage4/stage4_act_4_3_glass_city_ritual_cave_map.png",
      alt: "Stage 4-3 glass city and ritual cave playable map",
      caption: "Stage 4-3 playable map: Glass City and Ritual Cave",
    },
    {
      src: "imgs/Stage4/stage4_act_4_4_heart_titan_battlefield_map.png",
      alt: "Stage 4-4 Heart Titan battlefield playable map",
      caption: "Stage 4-4 playable map: Heart Titan Battlefield",
    },
    {
      src: "imgs/Stage1/Bastonne.png",
      alt: "Bastonne prison stage",
      caption: "Stage 0 Bastonne layout mood",
    },
    {
      src: "imgs/Stage1/bar.png",
      alt: "Armorlite bar encounter",
      caption: "Stage 1 bar encounter space",
    },
    {
      src: "imgs/Stage1/GROGER_boss.png",
      alt: "GROGER boss image",
      caption: "Optional hidden boss visual",
    },
    {
      src: "imgs/Stage2/bridge_2_r_4.png",
      alt: "Sakuri bridge encounter",
      caption: "Stage 2 bridge encounter direction",
    },
  ],
  rewards: [
    {
      src: "imgs/chars/Poster.png",
      alt: "Poster reward preview",
      caption: "Poster reward preview",
    },
    {
      src: "",
      alt: "Budget graphic",
      caption: "Add budget pie/bar chart",
    },
    {
      src: "",
      alt: "Timeline graphic",
      caption: "Add 24-month timeline visual",
    },
  ],
};

const supportedImageExtensions = new Set([".gif", ".jpg", ".jpeg", ".png", ".webp"]);
const excludedAutoImageSlots = new Set([
  "imgs/UI/base-goal-stretch-goals.png",
]);

function toBrowserPath(value) {
  return value.split(path.sep).join("/");
}

function titleCase(value) {
  return value.replace(/\b[a-z]/g, (match) => match.toUpperCase());
}

function captionFromImagePath(src) {
  const parsed = path.posix.parse(src);
  const folder = path.posix.basename(parsed.dir);
  const name = titleCase(
    parsed.name.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim(),
  );
  return folder && folder !== "imgs" ? `${folder} - ${name}` : name;
}

function collectImageSlots() {
  const root = path.join(here, "imgs");
  const slots = [];

  function walk(dir) {
    let entries = [];
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    entries
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
      .forEach((entry) => {
        const absolute = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(absolute);
          return;
        }
        if (
          !entry.isFile() ||
          !supportedImageExtensions.has(path.extname(entry.name).toLowerCase())
        ) {
          return;
        }

        const src = toBrowserPath(path.relative(here, absolute));
        if (excludedAutoImageSlots.has(src)) {
          return;
        }
        const caption = captionFromImagePath(src);
        slots.push({
          src,
          alt: caption,
          caption,
        });
      });
  }

  walk(root);
  return slots;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

function stripMarkdown(value) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/!\[([^\]]*)\]\((?:<[^>]+>|[^)]+)\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function inlineMarkdown(value) {
  const code = [];
  let html = escapeHtml(value);

  html = html.replace(/`([^`]+)`/g, (_, inner) => {
    const token = `@@CODE_${code.length}@@`;
    code.push(`<code>${inner}</code>`);
    return token;
  });

  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(
    /!\[([^\]]*)\]\((?:&lt;([^&]+)&gt;|([^)]+))\)/g,
    (_, alt, bracketedSrc, plainSrc) => {
      const src = (bracketedSrc || plainSrc || "").trim();
      const cleanAlt = stripMarkdown(alt || "Divergency image");
      return `<img class="inline-markdown-image" src="${escapeAttribute(src)}" alt="${escapeAttribute(cleanAlt)}" loading="lazy">`;
    },
  );
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>',
  );

  code.forEach((replacement, index) => {
    html = html.replace(`@@CODE_${index}@@`, replacement);
  });

  return html;
}

function slugify(value, used) {
  const base =
    stripMarkdown(value)
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section";

  const current = used.get(base) || 0;
  used.set(base, current + 1);
  return current === 0 ? base : `${base}-${current + 1}`;
}

function isTableStart(lines, index) {
  const line = lines[index]?.trim() || "";
  const next = lines[index + 1]?.trim() || "";
  return (
    line.includes("|") &&
    /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(next)
  );
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderTable(rows) {
  const [header, , ...body] = rows;
  const head = splitTableRow(header)
    .map((cell) => `<th>${inlineMarkdown(cell)}</th>`)
    .join("");
  const bodyRows = body
    .filter((row) => row.trim())
    .map((row) => {
      const cells = splitTableRow(row)
        .map((cell) => `<td>${inlineMarkdown(cell)}</td>`)
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("\n");

  return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
}

function renderMarkdownImage(src, alt) {
  const cleanSrc = src.trim();
  const cleanAlt = stripMarkdown(alt || "Divergency image");
  return `
<figure class="markdown-image">
  <img src="${escapeAttribute(cleanSrc)}" alt="${escapeAttribute(cleanAlt)}" loading="lazy">
  <figcaption>${inlineMarkdown(cleanAlt)}</figcaption>
</figure>`;
}

function renderMarkdown(markdown, docId) {
  const lines = markdown
    .normalize("NFC")
    .replace(/\r\n/g, "\n")
    .replace(/<!--[\s\S]*?-->/g, "")
    .split("\n");

  const usedSlugs = new Map();
  const toc = [];
  const parts = [];
  const paragraph = [];
  let listType = null;
  let inCode = false;
  let codeLines = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    parts.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph.length = 0;
  }

  function closeList() {
    if (!listType) return;
    parts.push(`</${listType}>`);
    listType = null;
  }

  function openList(type) {
    if (listType === type) return;
    closeList();
    parts.push(`<${type}>`);
    listType = type;
  }

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (/^```/.test(trimmed)) {
      flushParagraph();
      closeList();
      if (inCode) {
        parts.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(raw);
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      closeList();
      continue;
    }

    if (isTableStart(lines, i)) {
      flushParagraph();
      closeList();
      const tableRows = [];
      while (i < lines.length && lines[i].trim().includes("|")) {
        tableRows.push(lines[i]);
        i += 1;
      }
      i -= 1;
      parts.push(renderTable(tableRows));
      continue;
    }

    const image = trimmed.match(/^!\[([^\]]*)\]\((?:<([^>]+)>|([^)]+))\)$/);
    if (image) {
      flushParagraph();
      closeList();
      parts.push(renderMarkdownImage(image[2] || image[3], image[1]));
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      const text = stripMarkdown(heading[2]);
      const id = `${docId}-${slugify(text, usedSlugs)}`;
      toc.push({ id, level, text });
      parts.push(
        `<h${level} id="${id}"><a class="heading-link" href="#${id}" aria-label="Link to section">#</a>${inlineMarkdown(heading[2])}</h${level}>`,
      );
      continue;
    }

    if (trimmed.startsWith(">")) {
      flushParagraph();
      closeList();
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      i -= 1;
      parts.push(`<blockquote><p>${inlineMarkdown(quoteLines.join(" "))}</p></blockquote>`);
      continue;
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      flushParagraph();
      openList("ul");
      parts.push(`<li>${inlineMarkdown(unordered[1])}</li>`);
      continue;
    }

    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      openList("ol");
      parts.push(`<li>${inlineMarkdown(ordered[1])}</li>`);
      continue;
    }

    closeList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  closeList();

  if (inCode && codeLines.length) {
    parts.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
  }

  return { html: parts.join("\n"), toc };
}

function estimateReadMinutes(markdown) {
  const words = markdown
    .replace(/<!--[\s\S]*?-->/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function countTables(markdown) {
  return (markdown.match(/\n\|[^\n]+\|\n\|?\s*:?-{3,}/g) || []).length;
}

function buildDocs() {
  return documents.map((doc) => {
    const markdown = readFileSync(path.join(here, doc.file), "utf8");
    const rendered = renderMarkdown(markdown, doc.id);
    return {
      ...doc,
      markdown,
      html: rendered.html,
      toc: rendered.toc,
      readMinutes: estimateReadMinutes(markdown),
      tables: countTables(markdown),
      sections: rendered.toc.filter((item) => item.level <= 2).length,
    };
  });
}

function renderTabs(docs) {
  return docs
    .map(
      (doc, index) => `
        <button class="tab-button${index === 0 ? " is-active" : ""}" type="button" data-tab="${doc.id}">
          <span>${escapeHtml(doc.label)}</span>
          <small>${escapeHtml(doc.eyebrow)}</small>
        </button>`,
    )
    .join("");
}

function renderHeroStats(docs) {
  const totalMinutes = docs.reduce((sum, doc) => sum + doc.readMinutes, 0);
  const totalSections = docs.reduce((sum, doc) => sum + doc.sections, 0);
  const totalTables = docs.reduce((sum, doc) => sum + doc.tables, 0);
  return `
    <dl class="hero-stats" aria-label="Packet statistics">
      <div><dt>Docs</dt><dd>${docs.length}</dd></div>
      <div><dt>Read</dt><dd>${totalMinutes} min</dd></div>
      <div><dt>Sections</dt><dd>${totalSections}</dd></div>
      <div><dt>Tables</dt><dd>${totalTables}</dd></div>
    </dl>`;
}

function renderToc(doc) {
  const links = doc.toc
    .filter((item) => item.level <= 3)
    .map(
      (item) => `
        <a class="toc-link toc-level-${item.level}" href="#${item.id}">
          ${escapeHtml(item.text)}
        </a>`,
    )
    .join("");

  return links || '<p class="empty-note">No sections found.</p>';
}

function renderPane(doc, index) {
  return `
    <section class="doc-pane${index === 0 ? " is-active" : ""}" id="pane-${doc.id}" data-doc="${doc.id}" aria-labelledby="tab-title-${doc.id}">
      <div class="doc-intro">
        <div>
          <p class="eyebrow">${escapeHtml(doc.eyebrow)}</p>
          <h2 id="tab-title-${doc.id}">${escapeHtml(doc.label)}</h2>
          <p>${escapeHtml(doc.summary)}</p>
        </div>
        <dl class="doc-stats" aria-label="${escapeAttribute(doc.label)} statistics">
          <div><dt>Read</dt><dd>${doc.readMinutes} min</dd></div>
          <div><dt>Sections</dt><dd>${doc.sections}</dd></div>
          <div><dt>Tables</dt><dd>${doc.tables}</dd></div>
        </dl>
      </div>

      <section class="media-band" aria-label="${escapeAttribute(doc.label)} image slots">
        <div class="media-head">
          <div class="media-head-text">
            <h3>Visual Slots</h3>
            <p>Browse all images found in <code>imgs/</code>. Edit <code>IMAGE_SLOTS</code> to pin priority images first.</p>
          </div>
          <div class="media-controls" aria-label="${escapeAttribute(doc.label)} image carousel controls">
            <button class="media-nav" type="button" data-media-prev="${doc.id}" aria-label="Previous images" title="Previous images">&larr;</button>
            <span class="media-count" data-media-count="${doc.id}">0 / 0</span>
            <button class="media-nav" type="button" data-media-next="${doc.id}" aria-label="Next images" title="Next images">&rarr;</button>
          </div>
        </div>
        <div class="media-strip">
          <div class="media-grid" data-media-grid="${doc.id}"></div>
        </div>
      </section>

      <div class="doc-layout">
        <aside class="toc-panel" aria-label="${escapeAttribute(doc.label)} section navigation">
          <div class="toc-sticky">
            <p class="toc-title">Sections</p>
            <nav>${renderToc(doc)}</nav>
          </div>
        </aside>
        <article class="markdown-body" data-search-root="${doc.id}">
          ${doc.html}
        </article>
      </div>
    </section>`;
}

function buildPage(docs) {
  const tabs = renderTabs(docs);
  const panes = docs.map(renderPane).join("\n");
  const docIds = docs.map((doc) => doc.id);
  const allImageSlots = collectImageSlots();

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Divergency Reviewer Packet</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #11100f;
      --bg-soft: #191714;
      --panel: #211f1b;
      --panel-strong: #2b2722;
      --ink: #f5eee3;
      --muted: #bdb2a2;
      --soft: #8f8578;
      --line: #4a3f34;
      --line-soft: #312b25;
      --red: #d05a46;
      --amber: #d8a64d;
      --teal: #6fb8ae;
      --green: #88a86b;
      --shadow: rgba(0, 0, 0, 0.28);
      --radius: 8px;
      --max: 1280px;
      --mono: "Cascadia Mono", "SFMono-Regular", Consolas, monospace;
      --sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      --serif: Georgia, "Times New Roman", serif;
      --dialogue: "Segoe UI", Arial, Tahoma, "Noto Sans", sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      background:
        linear-gradient(180deg, rgba(208, 90, 70, 0.12), transparent 340px),
        linear-gradient(90deg, rgba(111, 184, 174, 0.08), transparent 48%),
        var(--bg);
      color: var(--ink);
      font-family: var(--sans);
      line-height: 1.62;
      letter-spacing: 0;
    }

    a {
      color: var(--teal);
      text-decoration-thickness: 1px;
      text-underline-offset: 3px;
    }

    code {
      background: rgba(216, 166, 77, 0.12);
      border: 1px solid rgba(216, 166, 77, 0.22);
      border-radius: 5px;
      color: #f4d49a;
      font-family: var(--mono);
      font-size: 0.9em;
      padding: 0.08rem 0.32rem;
    }

    .progress {
      position: fixed;
      z-index: 20;
      inset: 0 auto auto 0;
      width: 100%;
      height: 4px;
      background: transparent;
    }

    .progress span {
      display: block;
      width: 0;
      height: 100%;
      background: linear-gradient(90deg, var(--red), var(--amber), var(--teal));
    }

    .shell {
      max-width: var(--max);
      margin: 0 auto;
      padding: 28px 20px 80px;
    }

    .hero {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      display: block;
      min-height: 360px;
      padding: 42px 28px 34px;
      background:
        linear-gradient(90deg, rgba(17, 16, 15, 0.96) 0%, rgba(17, 16, 15, 0.8) 54%, rgba(17, 16, 15, 0.5) 100%),
        linear-gradient(180deg, rgba(17, 16, 15, 0.2) 0%, rgba(17, 16, 15, 0.86) 100%),
        url("${heroBackground}") center / cover no-repeat;
      border: 1px solid rgba(245, 238, 227, 0.12);
      border-radius: var(--radius);
      box-shadow: 0 22px 54px var(--shadow);
    }

    .hero-copy {
      position: relative;
      z-index: 1;
      max-width: 1060px;
    }

    .eyebrow {
      margin: 0 0 10px;
      color: var(--amber);
      font-family: var(--mono);
      font-size: 0.82rem;
      text-transform: uppercase;
    }

    .hero h1 {
      margin: 0;
      max-width: 1080px;
      font-size: clamp(2.4rem, 7vw, 5.4rem);
      line-height: 0.98;
      letter-spacing: 0;
      text-shadow: 0 4px 28px rgba(0, 0, 0, 0.72);
    }

    .hero p {
      margin: 20px 0 0;
      max-width: 840px;
      color: var(--muted);
      font-size: clamp(1rem, 2vw, 1.2rem);
    }

    .toolbar {
      position: sticky;
      top: 4px;
      z-index: 10;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 14px;
      align-items: center;
      margin: 8px 0 26px;
      padding: 12px;
      background: rgba(25, 23, 20, 0.92);
      border: 1px solid var(--line-soft);
      border-radius: var(--radius);
      backdrop-filter: blur(16px);
      box-shadow: 0 16px 36px var(--shadow);
    }

    .tabs {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 8px;
    }

    .tab-button,
    .action-button {
      min-height: 54px;
      border: 1px solid var(--line);
      border-radius: 7px;
      background: #181614;
      color: var(--ink);
      font: inherit;
      text-align: left;
      cursor: pointer;
    }

    .tab-button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2px;
      padding: 9px 11px;
    }

    .tab-button small {
      color: var(--soft);
      font-size: 0.76rem;
      line-height: 1.25;
    }

    .tab-button:hover,
    .tab-button:focus-visible,
    .action-button:hover,
    .action-button:focus-visible {
      border-color: var(--amber);
      outline: none;
    }

    .tab-button.is-active {
      background: #2b211c;
      border-color: var(--red);
      box-shadow: inset 0 3px 0 var(--red);
    }

    .actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .search-wrap {
      min-width: 220px;
    }

    .search-wrap input {
      width: 100%;
      min-height: 54px;
      padding: 0 12px;
      border: 1px solid var(--line);
      border-radius: 7px;
      background: #141312;
      color: var(--ink);
      font: inherit;
    }

    .search-wrap input:focus {
      border-color: var(--teal);
      outline: none;
    }

    .action-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 92px;
      padding: 0 14px;
      text-align: center;
    }

    .search-count {
      min-width: 68px;
      color: var(--soft);
      font-size: 0.82rem;
    }

    .hero-stats,
    .doc-stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
      margin: 28px 0 0;
    }

    .doc-stats {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      min-width: 360px;
      margin: 0;
    }

    .hero-stats div,
    .doc-stats div {
      padding: 12px;
      background: rgba(33, 31, 27, 0.84);
      border: 1px solid var(--line-soft);
      border-radius: var(--radius);
    }

    dt {
      color: var(--soft);
      font-size: 0.78rem;
      text-transform: uppercase;
    }

    dd {
      margin: 3px 0 0;
      color: var(--ink);
      font-size: 1.3rem;
      font-weight: 700;
      line-height: 1.1;
    }

    .doc-pane {
      display: none;
    }

    .doc-pane.is-active {
      display: block;
    }

    .doc-intro {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      align-items: end;
      padding: 30px 0 18px;
      border-bottom: 1px solid var(--line-soft);
    }

    .doc-intro h2 {
      margin: 0;
      font-size: clamp(1.9rem, 4vw, 3.1rem);
      line-height: 1.05;
    }

    .doc-intro p:last-child {
      max-width: 760px;
      margin: 12px 0 0;
      color: var(--muted);
    }

    .media-band {
      margin: 22px 0 30px;
      padding: 18px 0 24px;
      border-bottom: 1px solid var(--line-soft);
    }

    .media-head {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      margin-bottom: 14px;
    }

    .media-head-text {
      min-width: 0;
    }

    .media-head h3 {
      margin: 0;
      font-size: 1rem;
      text-transform: uppercase;
    }

    .media-head p {
      max-width: 720px;
      margin: 0;
      color: var(--soft);
      font-size: 0.92rem;
    }

    .media-controls {
      display: flex;
      flex: 0 0 auto;
      gap: 8px;
      align-items: center;
    }

    .media-nav {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border: 1px solid var(--line);
      border-radius: 7px;
      background: #181614;
      color: var(--ink);
      font: inherit;
      font-size: 1.1rem;
      line-height: 1;
      cursor: pointer;
    }

    .media-nav:hover,
    .media-nav:focus-visible {
      border-color: var(--amber);
      outline: none;
    }

    .media-nav:disabled {
      opacity: 0.38;
      cursor: not-allowed;
    }

    .media-count {
      min-width: 90px;
      color: var(--soft);
      font-family: var(--mono);
      font-size: 0.78rem;
      text-align: center;
    }

    .media-strip {
      overflow: hidden;
    }

    .media-grid {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      padding-bottom: 8px;
      scroll-behavior: smooth;
      scroll-snap-type: x mandatory;
      scrollbar-color: var(--line) transparent;
      scrollbar-width: thin;
    }

    .media-grid::-webkit-scrollbar {
      height: 8px;
    }

    .media-grid::-webkit-scrollbar-thumb {
      background: var(--line);
      border-radius: 999px;
    }

    .media-grid::-webkit-scrollbar-track {
      background: transparent;
    }

    .media-slot {
      flex: 0 0 calc((100% - 36px) / 4);
      margin: 0;
      min-width: 220px;
      min-height: 190px;
      overflow: hidden;
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: 0 14px 28px var(--shadow);
      scroll-snap-align: start;
    }

    .media-image-button {
      display: block;
      width: 100%;
      padding: 0;
      border: 0;
      background: transparent;
      cursor: zoom-in;
    }

    .media-image-button:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: -2px;
    }

    .media-slot img {
      display: block;
      width: 100%;
      height: 160px;
      object-fit: cover;
      background: #0f0f0f;
      transition: transform 180ms ease, filter 180ms ease;
    }

    .media-image-button:hover img {
      filter: brightness(1.08);
      transform: scale(1.025);
    }

    .media-placeholder {
      display: grid;
      min-height: 160px;
      place-items: center;
      padding: 18px;
      background:
        linear-gradient(135deg, rgba(208, 90, 70, 0.12), transparent 55%),
        repeating-linear-gradient(45deg, rgba(255,255,255,0.035) 0 8px, transparent 8px 16px),
        #171513;
      color: var(--soft);
      text-align: center;
      font-family: var(--mono);
      font-size: 0.84rem;
    }

    .media-slot figcaption {
      min-height: 52px;
      padding: 10px 12px;
      color: var(--muted);
      font-size: 0.9rem;
      line-height: 1.35;
    }

    .doc-layout {
      display: grid;
      grid-template-columns: 280px minmax(0, 1fr);
      gap: 28px;
      align-items: start;
    }

    .toc-panel {
      min-width: 0;
    }

    .toc-sticky {
      position: sticky;
      top: 98px;
      max-height: calc(100vh - 120px);
      overflow: auto;
      padding: 16px;
      background: rgba(33, 31, 27, 0.7);
      border: 1px solid var(--line-soft);
      border-radius: var(--radius);
    }

    .toc-title {
      margin: 0 0 10px;
      color: var(--amber);
      font-family: var(--mono);
      font-size: 0.78rem;
      text-transform: uppercase;
    }

    .toc-link {
      display: block;
      padding: 6px 0;
      border-top: 1px solid rgba(255,255,255,0.04);
      color: var(--muted);
      font-size: 0.88rem;
      line-height: 1.3;
      text-decoration: none;
    }

    .toc-link:hover,
    .toc-link:focus-visible {
      color: var(--ink);
      outline: none;
    }

    .toc-level-3 {
      padding-left: 14px;
      color: var(--soft);
      font-size: 0.82rem;
    }

    .markdown-body {
      min-width: 0;
      max-width: 920px;
      padding-bottom: 60px;
    }

    .markdown-body h1,
    .markdown-body h2,
    .markdown-body h3,
    .markdown-body h4 {
      position: relative;
      margin: 2.1em 0 0.6em;
      line-height: 1.15;
      letter-spacing: 0;
      scroll-margin-top: 110px;
    }

    .markdown-body h1 {
      margin-top: 0.25em;
      font-size: clamp(2.1rem, 4vw, 3.8rem);
    }

    .markdown-body h2 {
      padding-top: 18px;
      border-top: 1px solid var(--line-soft);
      color: #fff5e6;
      font-size: clamp(1.55rem, 3vw, 2.35rem);
    }

    .markdown-body h3 {
      color: #f0ce8a;
      font-size: 1.28rem;
    }

    .markdown-body h4 {
      color: var(--teal);
      font-size: 1.05rem;
    }

    .heading-link {
      position: absolute;
      left: -1.1em;
      opacity: 0;
      color: var(--soft);
      text-decoration: none;
    }

    .markdown-body h1:hover .heading-link,
    .markdown-body h2:hover .heading-link,
    .markdown-body h3:hover .heading-link,
    .markdown-body h4:hover .heading-link {
      opacity: 1;
    }

    .markdown-body p,
    .markdown-body li {
      color: var(--muted);
      font-size: 1.02rem;
    }

    .markdown-body strong {
      color: var(--ink);
    }

    .markdown-body ul,
    .markdown-body ol {
      padding-left: 1.25rem;
    }

    .markdown-body li + li {
      margin-top: 0.28rem;
    }

    .markdown-body blockquote {
      margin: 22px 0;
      padding: 8px 18px;
      background: rgba(208, 90, 70, 0.1);
      border-left: 4px solid var(--red);
      border-radius: 0 var(--radius) var(--radius) 0;
      color: var(--ink);
    }

    .markdown-body blockquote p {
      color: var(--ink);
      font-family: var(--dialogue);
      font-size: 1.08rem;
      font-weight: 650;
    }

    .markdown-image {
      margin: 24px 0;
      overflow: hidden;
      background: rgba(25, 23, 20, 0.78);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: 0 16px 34px var(--shadow);
    }

    .markdown-image img {
      display: block;
      width: 100%;
      max-height: 540px;
      object-fit: contain;
      background: #0f0f0f;
    }

    .markdown-image figcaption {
      padding: 10px 12px;
      color: var(--soft);
      font-size: 0.88rem;
      line-height: 1.35;
    }

    .inline-markdown-image {
      display: block;
      width: 100%;
      min-width: 160px;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      background: #0f0f0f;
      border: 1px solid var(--line-soft);
      border-radius: 8px;
    }

    body.lightbox-open {
      overflow: hidden;
    }

    .lightbox {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      padding: 24px;
      background: rgba(5, 5, 5, 0.86);
      backdrop-filter: blur(8px);
    }

    .lightbox[hidden] {
      display: none;
    }

    .lightbox-panel {
      position: relative;
      display: grid;
      gap: 12px;
      width: min(1120px, 100%);
      max-height: calc(100vh - 48px);
    }

    .lightbox-close {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 1;
      display: grid;
      width: 42px;
      height: 42px;
      place-items: center;
      border: 1px solid rgba(255, 255, 255, 0.28);
      border-radius: 50%;
      background: rgba(16, 15, 13, 0.86);
      color: #fff;
      cursor: pointer;
      font-size: 1.4rem;
      line-height: 1;
    }

    .lightbox-close:hover,
    .lightbox-close:focus-visible {
      background: rgba(208, 90, 70, 0.95);
      outline: none;
    }

    .lightbox-image {
      display: block;
      width: 100%;
      max-height: calc(100vh - 116px);
      object-fit: contain;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: var(--radius);
      background: #080808;
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.58);
    }

    .lightbox-caption {
      margin: 0;
      color: rgba(255, 255, 255, 0.82);
      font-size: 0.94rem;
      line-height: 1.4;
      text-align: center;
    }

    .table-wrap {
      max-width: 100%;
      margin: 22px 0;
      overflow-x: auto;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: rgba(25, 23, 20, 0.72);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 640px;
    }

    th,
    td {
      padding: 12px 14px;
      border-bottom: 1px solid var(--line-soft);
      text-align: left;
      vertical-align: top;
    }

    th {
      background: #2a221d;
      color: var(--ink);
      font-size: 0.82rem;
      text-transform: uppercase;
    }

    td {
      color: var(--muted);
    }

    tr:last-child td {
      border-bottom: 0;
    }

    pre {
      overflow-x: auto;
      padding: 16px;
      background: #151515;
      border: 1px solid var(--line);
      border-radius: var(--radius);
    }

    pre code {
      padding: 0;
      background: none;
      border: 0;
      color: var(--muted);
    }

    .search-hit {
      outline: 1px solid rgba(111, 184, 174, 0.7);
      background: rgba(111, 184, 174, 0.08);
    }

    .empty-note {
      color: var(--soft);
    }

    @media (max-width: 1040px) {
      .hero {
        grid-template-columns: 1fr;
      }

      .toolbar {
        grid-template-columns: 1fr;
      }

      .actions {
        align-items: stretch;
      }

      .doc-layout {
        grid-template-columns: 1fr;
      }

      .toc-sticky {
        position: relative;
        top: auto;
        max-height: 250px;
      }

      .media-slot {
        flex-basis: calc((100% - 12px) / 2);
      }
    }

    @media (max-width: 760px) {
      .shell {
        padding: 18px 14px 56px;
      }

      .hero {
        min-height: auto;
        padding-top: 22px;
      }

      .tabs,
      .hero-stats,
      .doc-stats {
        grid-template-columns: 1fr;
      }

      .doc-intro,
      .media-head,
      .actions {
        display: grid;
        grid-template-columns: 1fr;
      }

      .media-head {
        align-items: stretch;
      }

      .media-controls {
        justify-content: space-between;
      }

      .media-slot {
        flex-basis: 86%;
        min-width: 240px;
      }

      .doc-stats {
        min-width: 0;
      }

      .toolbar {
        position: static;
      }

      .heading-link {
        display: none;
      }
    }

    @media print {
      body {
        background: white;
        color: #151515;
      }

      .progress,
      .toolbar,
      .toc-panel,
      .media-band,
      .action-button,
      .search-wrap,
      .search-count {
        display: none !important;
      }

      .shell {
        max-width: none;
        padding: 0;
      }

      .hero,
      .doc-layout,
      .doc-intro {
        display: block;
      }

      .doc-pane {
        display: block !important;
        break-before: page;
      }

      .markdown-body {
        max-width: none;
      }

      .markdown-body p,
      .markdown-body li,
      td {
        color: #222;
      }
    }
  </style>
</head>
<body>
  <div class="progress" aria-hidden="true"><span id="read-progress"></span></div>
  <main class="shell">
    <header class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Divergency reviewer packet</p>
        <h1>Dark fantasy beat 'em up campaign docs</h1>
        <p>
          A tabbed, visual reading version of the Kickstarter pitch, short story summary,
          complete story, gameplay and level design, and fulfillment checklist.
        </p>
        ${renderHeroStats(docs)}
      </div>
    </header>

    <section class="toolbar" aria-label="Document controls">
      <nav class="tabs" aria-label="Document tabs">
        ${tabs}
      </nav>
      <div class="actions">
        <label class="search-wrap">
          <input id="doc-search" type="search" placeholder="Search active tab">
        </label>
        <span class="search-count" id="search-count">0 hits</span>
        <button class="action-button" type="button" id="print-button">Print / PDF</button>
      </div>
    </section>

    ${panes}
  </main>

  <div class="lightbox" id="image-lightbox" role="dialog" aria-modal="true" aria-label="Expanded image viewer" hidden>
    <div class="lightbox-panel">
      <button class="lightbox-close" type="button" id="lightbox-close" aria-label="Close image viewer" title="Close image viewer">&times;</button>
      <img class="lightbox-image" id="lightbox-image" src="" alt="">
      <p class="lightbox-caption" id="lightbox-caption"></p>
    </div>
  </div>

  <!--
    EASY IMAGE EDIT:
    1. This page automatically includes supported image files under Campaign/Kickstarter/imgs.
    2. Add image paths to IMAGE_SLOTS to pin priority images before the auto-discovered list.
    3. Leave src empty only when you want to keep a placeholder box.
  -->
  <script>
    const DOC_IDS = ${JSON.stringify(docIds)};
    const IMAGE_SLOTS = ${JSON.stringify(imageSlots, null, 6)};
    const ALL_IMAGE_SLOTS = ${JSON.stringify(allImageSlots, null, 6)};

    const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
    const panes = Array.from(document.querySelectorAll(".doc-pane"));
    const searchInput = document.getElementById("doc-search");
    const searchCount = document.getElementById("search-count");
    const progress = document.getElementById("read-progress");
    const lightbox = document.getElementById("image-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    let lastFocusedElement = null;

    function mergedImageSlots(docSlots) {
      const seen = new Set();
      return [...(docSlots || []), ...ALL_IMAGE_SLOTS].filter((slot) => {
        if (!slot.src) return true;
        if (seen.has(slot.src)) return false;
        seen.add(slot.src);
        return true;
      });
    }

    function mediaElements(docId) {
      return {
        grid: document.querySelector('[data-media-grid="' + docId + '"]'),
        count: document.querySelector('[data-media-count="' + docId + '"]'),
        prev: document.querySelector('[data-media-prev="' + docId + '"]'),
        next: document.querySelector('[data-media-next="' + docId + '"]'),
      };
    }

    function renderMediaSlot(slot) {
      const caption = escapeHtml(slot.caption || "Add image");
      const alt = escapeHtml(slot.alt || slot.caption || "Divergency image");
      if (slot.src) {
        const src = escapeHtml(slot.src);
        return '<figure class="media-slot"><button class="media-image-button" type="button" data-lightbox-src="' + src + '" data-lightbox-alt="' + alt + '" data-lightbox-caption="' + caption + '" aria-label="View larger image: ' + caption + '"><img src="' + src + '" alt="' + alt + '" loading="lazy"></button><figcaption>' + caption + '</figcaption></figure>';
      }
      return '<figure class="media-slot"><div class="media-placeholder"><span>Image slot<br>Add path in IMAGE_SLOTS</span></div><figcaption>' + caption + '</figcaption></figure>';
    }

    function renderImageSlots() {
      DOC_IDS.forEach((docId) => {
        const slots = mergedImageSlots(IMAGE_SLOTS[docId]);
        const { grid } = mediaElements(docId);
        if (!grid) return;
        grid.innerHTML = slots.map(renderMediaSlot).join("");
        updateMediaControls(docId);
      });
    }

    function updateMediaControls(docId) {
      const { grid, count, prev, next } = mediaElements(docId);
      if (!grid || !count || !prev || !next) return;

      const total = grid.children.length;
      if (!total) {
        count.textContent = "0 / 0";
        prev.disabled = true;
        next.disabled = true;
        return;
      }

      const item = grid.querySelector(".media-slot");
      const styles = window.getComputedStyle(grid);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      const itemWidth = item?.getBoundingClientRect().width || grid.clientWidth || 1;
      const step = itemWidth + gap;
      const visible = Math.max(1, Math.floor((grid.clientWidth + gap) / step));
      const start = Math.min(total, Math.max(1, Math.round(grid.scrollLeft / step) + 1));
      const end = Math.min(total, start + visible - 1);
      const maxScroll = Math.max(0, grid.scrollWidth - grid.clientWidth - 2);

      count.textContent = start === end ? start + " / " + total : start + "-" + end + " / " + total;
      prev.disabled = grid.scrollLeft <= 2;
      next.disabled = grid.scrollLeft >= maxScroll;
    }

    function scrollMedia(docId, direction) {
      const { grid } = mediaElements(docId);
      if (!grid) return;
      const amount = Math.max(240, grid.clientWidth * 0.86);
      grid.scrollBy({ left: amount * direction, behavior: "smooth" });
      window.setTimeout(() => updateMediaControls(docId), 360);
    }

    function openLightbox(button) {
      if (!button || !button.dataset.lightboxSrc) return;
      lastFocusedElement = document.activeElement;
      lightboxImage.src = button.dataset.lightboxSrc;
      lightboxImage.alt = button.dataset.lightboxAlt || "";
      lightboxCaption.textContent = button.dataset.lightboxCaption || "";
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
      lightboxClose.focus();
    }

    function closeLightbox() {
      if (lightbox.hidden) return;
      lightbox.hidden = true;
      document.body.classList.remove("lightbox-open");
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "";
      lightboxCaption.textContent = "";
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
      lastFocusedElement = null;
    }

    function escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
    }

    function activeDocId() {
      return document.querySelector(".doc-pane.is-active")?.dataset.doc || DOC_IDS[0];
    }

    function clearSearch() {
      document.querySelectorAll(".search-hit").forEach((node) => {
        node.classList.remove("search-hit");
      });
      searchCount.textContent = "0 hits";
    }

    function runSearch() {
      clearSearch();
      const query = searchInput.value.trim().toLowerCase();
      if (query.length < 2) return;
      const active = document.querySelector(".doc-pane.is-active .markdown-body");
      if (!active) return;
      let hits = 0;
      active.querySelectorAll("p, li, td, th, blockquote").forEach((node) => {
        if (node.textContent.toLowerCase().includes(query)) {
          node.classList.add("search-hit");
          hits += 1;
        }
      });
      searchCount.textContent = hits + (hits === 1 ? " hit" : " hits");
    }

    function activateTab(docId, updateHash = true, scrollTop = true) {
      if (!DOC_IDS.includes(docId)) docId = DOC_IDS[0];
      tabButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.tab === docId);
      });
      panes.forEach((pane) => {
        pane.classList.toggle("is-active", pane.dataset.doc === docId);
      });
      runSearch();
      if (updateHash) {
        history.replaceState(null, "", "#" + docId);
      }
      if (scrollTop) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      requestAnimationFrame(() => updateMediaControls(docId));
    }

    function openHash() {
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!hash) return activateTab(DOC_IDS[0], false, false);
      if (DOC_IDS.includes(hash)) return activateTab(hash, false, false);
      const target = document.getElementById(hash);
      if (!target) return activateTab(DOC_IDS[0], false, false);
      const pane = target.closest(".doc-pane");
      if (pane) {
        activateTab(pane.dataset.doc, false, false);
        requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      }
    }

    function updateProgress() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      progress.style.width = (current * 100).toFixed(2) + "%";
    }

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => activateTab(button.dataset.tab));
    });

    document.querySelectorAll("[data-media-prev]").forEach((button) => {
      button.addEventListener("click", () => scrollMedia(button.dataset.mediaPrev, -1));
    });

    document.querySelectorAll("[data-media-next]").forEach((button) => {
      button.addEventListener("click", () => scrollMedia(button.dataset.mediaNext, 1));
    });

    document.querySelectorAll(".media-grid").forEach((grid) => {
      grid.addEventListener("scroll", () => updateMediaControls(grid.dataset.mediaGrid), { passive: true });
      grid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-lightbox-src]");
        if (button) openLightbox(button);
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLightbox();
    });

    searchInput.addEventListener("input", runSearch);
    window.addEventListener("hashchange", openHash);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", () => {
      updateProgress();
      DOC_IDS.forEach(updateMediaControls);
    });
    document.getElementById("print-button").addEventListener("click", () => window.print());

    renderImageSlots();
    openHash();
    updateProgress();
  </script>
</body>
</html>`;
}

const docs = buildDocs();
writeFileSync(outputFile, buildPage(docs), "utf8");
console.log(`Wrote ${path.relative(process.cwd(), outputFile)}`);
