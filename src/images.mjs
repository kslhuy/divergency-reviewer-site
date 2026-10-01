import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = fileURLToPath(new URL('../', import.meta.url));
export const imageSlots = {
  kickstarter: [
    {
      src: "imgs/campaign-panels/divergency-ai-intro-splash.png",
      alt: "Divergency cinematic introduction splash showing the squad charging into a dark fantasy battle",
      caption: "Campaign intro splash",
    },
    {
      src: "imgs/campaign-panels/divergency-ai-funding-distribution.png",
      alt: "Divergency Kickstarter funding distribution panel with blank production budget areas",
      caption: "Campaign panel: Funding distribution",
    },
    {
      src: "imgs/campaign-panels/divergency-ai-stretch-goals-roadmap.png",
      alt: "Divergency Kickstarter stretch goals roadmap panel with blank milestone areas",
      caption: "Campaign panel: Stretch goals roadmap",
    },
    {
      src: "imgs/story-panels/divergency-ai-story-01-city-bastonne.png",
      alt: "Divergency story panel showing Marseille above Bastonne",
      caption: "Story panel: Marseille above, Bastonne below",
    },
    {
      src: "imgs/story-panels/divergency-ai-story-02-sakuri-ear.png",
      alt: "Divergency story panel showing Sakuri and the Ear",
      caption: "Story panel: Sakuri and the Ear",
    },
    {
      src: "imgs/story-panels/divergency-ai-story-03-cradle-bargain.png",
      alt: "Divergency story panel showing Heni, Heniana, Jamerson, and the Cradle bargain",
      caption: "Story panel: The Cradle bargain",
    },
    {
      src: "imgs/Stage1/chap1/In_thecity_Fix.png",
      alt: "Marseille city environment",
      caption: "Marseille city mood capture",
    },
    {
      src: "imgs/Stage1/chap1/Sewer1.png",
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
    {
      src: "imgs/rewards/beacon-bracelet-marseille-mockup.png",
      alt: "Marseille-inspired Beacon bracelet product mockup",
      caption: "Concept mockup: Marseille Beacon Bracelet -- final materials may differ; staging props not included",
    },
    {
      src: "imgs/rewards/pixel-character-patch-keychain-set-mockup.png",
      alt: "Pixel character patch and keychain set product mockup",
      caption: "Concept mockup: Pixel Character Patch & Keychain Set -- final materials may differ; staging props not included",
    },
    {
      src: "imgs/rewards/a3-poster-product-mockup.png",
      alt: "A3 Divergency poster product mockup",
      caption: "Concept mockup: A3 poster -- final materials may differ; staging props not included",
    },
    {
      src: "imgs/items/massk.png",
      alt: "Mask relic Field Relics digital art visual",
      caption: "Field Relics digital art: Mask of the Listening Route",
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
      src: "imgs/Stage1/stage0_to_bastonne_cutscene.gif",
      alt: "Stage 0 cutscene animatic from Team Deep base to Bastonne prison",
      caption: "Stage 0 cutscene: base to Bastonne",
    },
    {
      src: "imgs/Stage1/Bastonne.png",
      alt: "Bastonne prison stage",
      caption: "Bastonne rescue setup",
    },
    {
      src: "imgs/Stage1/chap1/In_thecity_Fix.png",
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
      alt: "Bản đồ chơi Chương 4-1 tại lối vào hang rồng",
      caption: "Bản đồ Chương 4-1: Lối vào hang rồng",
    },
    {
      src: "imgs/Stage4/stage4_act_4_2_dragon_bone_catacombs_map.png",
      alt: "Bản đồ chơi Chương 4-2 trong hầm xương rồng",
      caption: "Bản đồ Chương 4-2: Hầm xương rồng",
    },
    {
      src: "imgs/Stage4/stage4_act_4_3_glass_city_ritual_cave_map.png",
      alt: "Bản đồ chơi Chương 4-3 tại thành phố kính và ca động tế lễ",
      caption: "Bản đồ Chương 4-3: Thành phố kính và ca động tế lễ",
    },
    {
      src: "imgs/Stage4/stage4_act_4_4_heart_titan_battlefield_map.png",
      alt: "Bản đồ chơi Chương 4-4 tại chiến trường Titan Trái Tim",
      caption: "Bản đồ Chương 4-4: Chiến trường Titan Trái Tim",
    },
    {
      src: "imgs/Stage1/Bastonne.png",
      alt: "Không gian nhà tù Bastonne",
      caption: "Định hướng không gian Chương 0: Bastonne",
    },
    {
      src: "imgs/Stage1/bar.png",
      alt: "Tình huống chiến đấu trong quán Armorlite",
      caption: "Không gian giao chiến tại Armorlite",
    },
    {
      src: "imgs/Stage1/GROGER_boss.png",
      alt: "Hình ảnh trùm GROGER",
      caption: "Định hướng hình ảnh cho trùm ẩn GROGER",
    },
    {
      src: "imgs/Stage2/bridge_2_r_4.png",
      alt: "Tình huống chiến đấu trên cầu tại Sakuri",
      caption: "Định hướng tình huống trên cầu ở Chương 2",
    },
  ],
  rewards: [
    {
      src: "imgs/campaign-panels/kick/reward/reward 1.png",
      alt: "Suspicious side-eye mutation portrait for the $5 Side-Eye Supporter tier",
      caption: "Tier face: $5 Side-Eye Supporter",
    },
    {
      src: "imgs/campaign-panels/kick/reward/reward 2.png",
      alt: "Furious red-eyed mutation portrait for the $10 Red-Eye Signal Pack tier",
      caption: "Tier face: $10 Red-Eye Signal Pack",
    },
    {
      src: "imgs/campaign-panels/kick/reward/reward 3.png",
      alt: "Crooked-grin mutation portrait for the $20 Crooked-Grin Early Bird tier",
      caption: "Tier face: $20 Crooked-Grin Early Bird",
    },
    {
      src: "imgs/campaign-panels/kick/reward/reward 4.png",
      alt: "Grim-faced mutation portrait for the $25 Grim-Faced Recruit tier",
      caption: "Tier face: $25 Grim-Faced Recruit",
    },
    {
      src: "imgs/campaign-panels/kick/reward/reward 5.png",
      alt: "Skull-grin mutation portrait for the $40 Skullgrin Deluxe tier",
      caption: "Tier face: $40 Skullgrin Deluxe",
    },
    {
      src: "imgs/campaign-panels/kick/reward/reward 6.gif",
      alt: "Animated exposed-mind portrait for the $60 Open-Mind Insider tier",
      caption: "Tier face: $60 Open-Mind Insider",
    },
    {
      src: "imgs/campaign-panels/kick/reward/reward 7.gif",
      alt: "Animated brainrot host portrait for the $70 Brainrot Test Subject tier",
      caption: "Tier face: $70 Brainrot Test Subject",
    },
    {
      src: "imgs/campaign-panels/kick/reward/reward 8.gif",
      alt: "Animated reality-glitch portrait for the $95 Glitched-Out Scout tier",
      caption: "Tier face: $95 Glitched-Out Scout, EU only",
    },
    {
      src: "imgs/campaign-panels/kick/reward/reward 9.gif",
      alt: "Animated screaming mutation portrait for the $120 Full-Meltdown Collector tier",
      caption: "Tier face: $120 Full-Meltdown Collector, EU only",
    },
    {
      src: "imgs/campaign-panels/kick/reward/reward 10.gif",
      alt: "Animated mind-blown mutation portrait for the $250 Mind-Blown Scribbler tier",
      caption: "Tier face: $250 Mind-Blown Scribbler",
    },
    {
      src: "imgs/campaign-panels/kick/reward/reward 11.gif",
      alt: "Animated final mutation portrait for the $500 Final-Form Architect tier",
      caption: "Tier face: $500 Final-Form Architect",
    },
    {
      src: "imgs/rewards/a3-poster-product-mockup.png",
      alt: "A3 Divergency poster product mockup",
      caption: "Physical reward mockup: A3 poster",
    },
    {
      src: "imgs/rewards/beacon-bracelet-marseille-mockup.png",
      alt: "Marseille-inspired Beacon bracelet product mockup",
      caption: "Concept mockup: Marseille Beacon Bracelet -- final materials may differ; staging props not included",
    },
    {
      src: "imgs/rewards/pixel-character-patch-keychain-set-mockup.png",
      alt: "Pixel character patch and keychain set product mockup",
      caption: "Physical reward mockup: Pixel Character Patch & Keychain Set",
    },
    {
      src: "imgs/rewards/bastonne-cell-key-cap-mockup.png",
      alt: "Bastonne cell key cap mockup",
      caption: "Potential add-on concept -- not included: Bastonne cell key cap",
    },
    {
      src: "imgs/rewards/bastonne-cell-key-keychain-mockup.png",
      alt: "Bastonne cell key keychain mockup",
      caption: "Potential add-on concept -- not included: Bastonne cell key keychain",
    },
    {
      src: "imgs/rewards/divergency-daily-access-badge-mockup.png",
      alt: "Divergency Daily access badge mockup",
      caption: "Potential add-on concept -- not included: Divergency Daily access badge",
    },
    {
      src: "imgs/rewards/divergency-daily-cargo-tag-mockup.png",
      alt: "Divergency Daily cargo tag mockup",
      caption: "Potential add-on concept -- not included: Divergency Daily cargo tag",
    },
    {
      src: "imgs/rewards/stage1-evidence-pack-mockup.png",
      alt: "Stage 1 evidence pack mockup",
      caption: "Digital reward preview: Stage 1 Evidence Pack",
    },
    {
      src: "imgs/rewards/laundel-route-cloth-pass-mockup.png",
      alt: "Laundel route cloth pass mockup",
      caption: "Reward concept mockup: Laundel route cloth pass",
    },
    {
      src: "imgs/rewards/armorlite-coaster-set-mockup.png",
      alt: "Armorlite coaster set mockup",
      caption: "Optional add-on concept: Armorlite coaster set",
    },
    {
      src: "imgs/items/Barcalet.png",
      alt: "Beacon bracelet icon",
      caption: "Field Relics visual: Beacon bracelet icon",
    },
    {
      src: "imgs/items/massk.png",
      alt: "Mask of the Listening Route",
      caption: "Field Relics visual: Mask of the Listening Route",
    },
    {
      src: "imgs/items/skull emer.png",
      alt: "Emerald Skull token",
      caption: "Field Relics visual: Emerald Skull token",
    },
    {
      src: "imgs/items/knife.png",
      alt: "Relic-Iron knife",
      caption: "Field Relics visual: Relic-Iron knife",
    },
    {
      src: "imgs/items/poition.png",
      alt: "Red treatment vial",
      caption: "Field Relics visual: Red treatment vial",
    },
    {
      src: "imgs/items/cloth dirty.png",
      alt: "Bastonne cloth patch",
      caption: "Field Relics visual: Bastonne cloth patch",
    },
    {
      src: "imgs/items/flower.png",
      alt: "Heniana flower seal",
      caption: "Field Relics visual: Heniana flower seal",
    },
    {
      src: "imgs/items/figsure.png",
      alt: "Worn field figure",
      caption: "Field Relics visual: Worn field figure",
    },
  ],
};

export const supportedImageExtensions = new Set([".gif", ".jpg", ".jpeg", ".png", ".webp"]);
export const excludedAutoImageSlots = new Set([
  "imgs/UI/base-goal-stretch-goals.png",
  "imgs/rewards/beacon-bracelet-product-mockup.png",
  "imgs/story-panels/divergency-story-01-city-bastonne.jpg",
  "imgs/story-panels/divergency-story-02-sakuri-ear.jpg",
  "imgs/story-panels/divergency-story-03-cradle-bargain.jpg",
]);

export const excludedGalleryImageSlots = new Set([
  "imgs/rewards/beacon-bracelet-product-mockup.png",
  "imgs/story-panels/divergency-story-01-city-bastonne.jpg",
  "imgs/story-panels/divergency-story-02-sakuri-ear.jpg",
  "imgs/story-panels/divergency-story-03-cradle-bargain.jpg",
]);

export const excludedGalleryImageFolders = [
  "imgs/rewards/pledge-tiers/",
];

export const excludedAutoImageFolders = [
  "imgs/rewards/pledge-tiers/",
];

export const galleryFolderOrder = [
  "Stage1",
  "Stage2",
  "Stage3",
  "Stage4",
  "Stage5",
  "UI",
  "chars",
  "items",
  "rewards",
  "others",
];

export const galleryFolderLabels = new Map([
  ["Stage1", "Stage 1"],
  ["Stage2", "Stage 2"],
  ["Stage3", "Stage 3"],
  ["Stage4", "Stage 4"],
  ["Stage5", "Stage 5"],
  ["UI", "UI"],
  ["chars", "Characters"],
  ["items", "Items"],
  ["rewards", "Rewards"],
  ["others", "Others"],
]);

export function toBrowserPath(value) {
  return value.split(path.sep).join("/");
}

export function titleCase(value) {
  return value.replace(/\b[a-z]/g, (match) => match.toUpperCase());
}

export function readableName(value) {
  return titleCase(value.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim());
}

export function captionFromImagePath(src) {
  const parsed = path.posix.parse(src);
  const folder = path.posix.basename(parsed.dir);
  const name = readableName(parsed.name);
  return folder && folder !== "imgs" ? `${folder} - ${name}` : name;
}

export function galleryCaptionFromImagePath(src) {
  const parts = src.split("/");
  const folders = parts.slice(1, -1).map(readableName).filter(Boolean);
  const name = readableName(path.posix.parse(src).name);

  return folders.length ? `${folders.join(" / ")} - ${name}` : name;
}

export function isNestedUiImage(src) {
  const parts = src.split("/");
  return parts[0] === "imgs" && parts[1] === "UI" && parts.length > 3;
}

export function isExcludedAutoImageSlot(src) {
  return (
    excludedAutoImageSlots.has(src) ||
    excludedAutoImageFolders.some((folder) => src.startsWith(folder))
  );
}

export function collectImageSlots(options = {}) {
  const {
    includeExcluded = false,
    includeNestedUi = false,
    galleryCaptions = false,
  } = options;
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
        if (
          (!includeExcluded && isExcludedAutoImageSlot(src)) ||
          (!includeNestedUi && isNestedUiImage(src))
        ) {
          return;
        }
        const caption = galleryCaptions
          ? galleryCaptionFromImagePath(src)
          : captionFromImagePath(src);
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

