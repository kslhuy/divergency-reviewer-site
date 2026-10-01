// Optional legacy importer, excluded from the normal site build.
import { escapeHtml, escapeAttribute } from '../src/html.mjs';
const pledgeTierSymbols = [
  {
    src: "imgs/campaign-panels/kick/reward/reward 1.png",
    name: "$5 Side-Eye Supporter",
    tag: "Recognition",
    note: "Campaign updates, one backer wallpaper, and one approved display name or alias on the digital supporter wall.",
  },
  {
    src: "imgs/campaign-panels/kick/reward/reward 2.png",
    name: "$10 Red-Eye Signal Pack",
    tag: "Digital supporter pack",
    note: "Side-Eye Supporter rewards plus a three-wallpaper set and avatar/icon pack.",
  },
  {
    src: "imgs/campaign-panels/kick/reward/reward 3.png",
    name: "$20 Crooked-Grin Early Bird",
    tag: "Limited digital key",
    note: "Red-Eye Signal Pack rewards plus a full PC game key at the early-backer price and a mini lore dossier.",
  },
  {
    src: "imgs/campaign-panels/kick/reward/reward 4.png",
    name: "$25 Grim-Faced Recruit",
    tag: "Standard digital key",
    note: "Red-Eye Signal Pack rewards plus a full PC game key and a mini lore dossier.",
  },
  {
    src: "imgs/campaign-panels/kick/reward/reward 5.png",
    name: "$40 Skullgrin Deluxe",
    tag: "Recommended digital tier",
    note: "Grim-Faced Recruit rewards plus the soundtrack, Digital Field Artbook PDF, Digital Evidence Pack, and Field Relics Digital Art Sheet.",
    featured: true,
  },
  {
    src: "imgs/campaign-panels/kick/reward/reward 6.gif",
    name: "$60 Open-Mind Insider",
    tag: "Recognition upgrade",
    note: "Skullgrin Deluxe rewards plus one approved final-credits display name or alias and a credits-badge wallpaper variant.",
  },
  {
    src: "imgs/campaign-panels/kick/reward/reward 7.gif",
    name: "$70 Brainrot Test Subject",
    tag: "Feedback access",
    note: "Open-Mind Insider rewards plus beta access, a private feedback path, and beta tester credit.",
  },
  {
    src: "imgs/campaign-panels/kick/reward/reward 8.gif",
    name: "$95 Glitched-Out Scout, EU only",
    tag: "Light physical",
    note: "Brainrot Test Subject rewards plus one A3 Divergency poster. Shipping is charged separately.",
  },
  {
    src: "imgs/campaign-panels/kick/reward/reward 9.gif",
    name: "$120 Full-Meltdown Collector, EU only",
    tag: "Physical collector",
    note: "Brainrot Test Subject rewards plus one A3 poster, one printed Divergency Field Artbook/art zine, one Marseille-inspired Beacon bracelet, and one Pixel Character Patch & Keychain Set. Shipping is charged separately.",
  },
  {
    src: "imgs/campaign-panels/kick/reward/reward 10.gif",
    name: "$250 Mind-Blown Scribbler",
    tag: "Limited wall mark",
    note: "Brainrot Test Subject rewards plus one approved message of up to 40 characters placed on a Bastonne prison wall.",
  },
  {
    src: "imgs/campaign-panels/kick/reward/reward 11.gif",
    name: "$500 Final-Form Architect",
    tag: "Scoped collaboration",
    note: "Brainrot Test Subject rewards plus one reviewed cosmetic or background-lore contribution. Limited to 3-5 backers.",
  },
];

const rewardItemShowcase = [
  {
    src: "imgs/rewards/a3-poster-product-mockup.png",
    name: "A3 Divergency Poster",
    tag: "Guaranteed reward concept",
    note: "Included in the $95 Glitched-Out Scout and $120 Full-Meltdown Collector. Concept mockup; final paper stock and print finish may differ. Staging props are not included.",
  },
  {
    src: "imgs/rewards/pledge-tiers/pledge-040-digital-deluxe-pack.png",
    name: "Divergency Field Artbook",
    tag: "Digital + printed reward preview",
    note: "Digital PDF included from the $40 Skullgrin Deluxe tier upward. One printed artbook/art zine is included only in the $120 Full-Meltdown Collector, EU only. Staging props are not included.",
  },
  {
    src: "imgs/rewards/beacon-bracelet-marseille-mockup.png",
    name: "Marseille Beacon Bracelet",
    tag: "Guaranteed reward concept",
    note: "Included only in the $120 Full-Meltdown Collector. Concept mockup; final materials, sizing, and finish may differ after vendor sampling. Staging props are not included.",
  },
  {
    src: "imgs/rewards/pixel-character-patch-keychain-set-mockup.png",
    name: "Pixel Character Patch & Keychain Set",
    tag: "Guaranteed reward concept",
    note: "Included only in the $120 Full-Meltdown Collector, EU only. Concept mockup; final patch, sticker, acrylic charm, and bag-accessory counts may differ after vendor sampling. Staging props are not included.",
  },
  {
    src: "imgs/rewards/stage1-evidence-pack-mockup.png",
    name: "Digital Evidence Pack",
    tag: "Guaranteed digital preview",
    note: "A downloadable PDF dossier included from the $40 Skullgrin Deluxe tier upward. This is a digital reward, not a physical packet.",
  },
];

const candidateRewardShowcase = [
  {
    src: "imgs/rewards/bastonne-cell-key-cap-mockup.png",
    name: "Bastonne Cell Key Cap",
    tag: "Potential add-on -- not included",
    note: "A wearable concept that needs a vendor sample, adjustable-fit confirmation, package weight, and replacement policy before it can be offered.",
  },
  {
    src: "imgs/rewards/bastonne-cell-key-keychain-mockup.png",
    name: "Bastonne Cell Key Keychain",
    tag: "Potential add-on -- not included",
    note: "A compact concept that may work as an EU add-on after metal weight, packaging, minimum quantity, and shipping are confirmed.",
  },
  {
    src: "imgs/rewards/divergency-daily-access-badge-mockup.png",
    name: "Divergency Daily Access Badge",
    tag: "Potential add-on -- not included",
    note: "A lanyard-style concept that requires a print sample, supplier quote, package weight, and durability check before it can be offered.",
  },
  {
    src: "imgs/rewards/divergency-daily-cargo-tag-mockup.png",
    name: "Divergency Daily Cargo Tag",
    tag: "Potential add-on -- not included",
    note: "A Marseille-route concept that requires material, print-durability, packaging, and shipping confirmation before it can be offered.",
  },
];

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

function toWebPath(value) {
  return String(value).trim().replaceAll("\\", "/");
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
      const src = toWebPath(bracketedSrc || plainSrc || "");
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
  const cleanSrc = toWebPath(src);
  const cleanAlt = stripMarkdown(alt || "Divergency image");
  const normalizedSrc = cleanSrc.toLowerCase();
  const isTitleOrnament = normalizedSrc.endsWith("/kick_title.png");
  const isPageDivider = normalizedSrc.endsWith("/kick_jumppage.png");
  const isCampaignSplash = normalizedSrc.includes("/campaign-panels/divergency-ai-intro-splash");
  const isCampaignPanel = normalizedSrc.includes("/campaign-panels/");
  const isStoryPanel = normalizedSrc.includes("/story-panels/") || (isCampaignPanel && !isCampaignSplash);
  const isDecorative = isTitleOrnament || isPageDivider;
  const classes = [
    "markdown-image",
    isTitleOrnament ? "is-title-ornament" : "",
    isPageDivider ? "is-page-divider" : "",
    isCampaignSplash ? "is-campaign-splash" : "",
    isStoryPanel ? "is-story-panel" : "",
  ].filter(Boolean).join(" ");
  const imageAlt = isDecorative ? "" : cleanAlt;
  const figcaption = isDecorative || isCampaignSplash || isStoryPanel ? "" : `  <figcaption>${inlineMarkdown(cleanAlt)}</figcaption>
`;
  return `
<figure class="${escapeAttribute(classes)}"${isDecorative ? ' aria-hidden="true"' : ""}>
  <img src="${escapeAttribute(cleanSrc)}" alt="${escapeAttribute(imageAlt)}" loading="lazy">
${figcaption}
</figure>`;
}

function renderRewardItemShowcase() {
  const renderCard = (item, options = {}) => {
    const classes = ["reward-item-card"];
    if (item.featured) classes.push("is-featured");
    if (options.product) classes.push("reward-item-card--product");
    if (options.candidate) classes.push("reward-item-card--candidate");
    const imageClasses = ["reward-item-image"];
    if (item.isPhoto || options.product) imageClasses.push("reward-item-image--photo");

    return `<article class="${classes.join(" ")}">
          <div class="${imageClasses.join(" ")}">
            <img src="${escapeAttribute(item.src)}" alt="${escapeAttribute(item.name)}" loading="lazy">
          </div>
          <div class="reward-item-card-copy">
            <p class="reward-item-tag">${escapeHtml(item.tag)}</p>
            <h4>${escapeHtml(item.name)}</h4>
            <p>${escapeHtml(item.note)}</p>
          </div>
        </article>`;
  };

  const tierCards = pledgeTierSymbols
    .map((item) => renderCard(item))
    .join("");
  const guaranteedCards = rewardItemShowcase
    .map((item) => renderCard(item, { product: true }))
    .join("");
  const candidateCards = candidateRewardShowcase
    .map((item) => renderCard(item, { product: true, candidate: true }))
    .join("");

  return `
<section class="reward-item-showcase" aria-label="Divergency Kickstarter reward item preview">
  <div class="reward-item-lead">
    <div class="reward-item-lead-copy">
      <p class="eyebrow">Choose your signal</p>
      <h3>Rewards At A Glance</h3>
      <p>Follow the signal from supporter recognition to digital rewards, beta access, collector goods, and tightly scoped creative participation. Every paid tier includes campaign updates and one approved name or alias on the digital supporter wall--never paid gameplay power.</p>
    </div>
    <dl class="reward-item-metrics" aria-label="Item-based reward visual positioning">
      <div><dt>Best digital value</dt><dd>$40 Skullgrin</dd></div>
      <div><dt>Recognition tier</dt><dd>$60 Open-Mind</dd></div>
      <div><dt>Collector goods</dt><dd>EU only</dd></div>
      <div><dt>Gameplay promise</dt><dd>No paid power</dd></div>
    </dl>
  </div>
  <div class="reward-item-content">
    <div class="reward-showcase-block">
      <h4>Pledge Tiers</h4>
      <div class="reward-item-grid">
        ${tierCards}
      </div>
    </div>
    <div class="reward-showcase-block">
      <h4>Included Reward Previews</h4>
      <p class="reward-showcase-note">Product images are concept mockups. Final materials and finishes may differ after vendor sampling.</p>
      <div class="reward-item-grid reward-product-grid">
        ${guaranteedCards}
      </div>
    </div>
    <div class="reward-showcase-block reward-showcase-block--candidate">
      <h4>Potential Add-Ons -- Not Included Yet</h4>
      <p class="reward-showcase-note">These concepts are not part of any pledge. Digital add-ons can be offered broadly; physical add-ons should stay limited to eligible EU physical tiers after production and shipping are confirmed.</p>
      <div class="reward-item-grid reward-product-grid">
        ${candidateCards}
      </div>
    </div>
  </div>
</section>`;
}

export function renderMarkdown(markdown, docId) {
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

    if (trimmed === "{{REWARD_ITEM_SHOWCASE}}") {
      flushParagraph();
      closeList();
      parts.push(renderRewardItemShowcase());
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

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      const text = stripMarkdown(heading[2]);
      const id = `${docId}-${slugify(text, usedSlugs)}`;
      toc.push({ id, level, text });
      parts.push(
        `<h${level} id="${id}" tabindex="-1"><a class="heading-link" href="#${id}" aria-label="Link to section">#</a>${inlineMarkdown(heading[2])}</h${level}>`,
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

