<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Risers' Quests — Generator</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..900&family=Source+Serif+4:opsz,wght@8..60,400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --paper:#EDE6D6; --card:#F8F4EA; --ink:#20242B; --stamp:#A23B33;
    --brass:#A9824A; --sage:#56705A; --line:#C9BFA8; --line-soft:#DAD2BC;
    --fantasy:#6B5B95; --adventure:#C2792B; --mystery:#2F5F5A; --drama:#A23B33;
  }
  *{box-sizing:border-box;}
  body{
    margin:0; background:var(--paper); color:var(--ink);
    font-family:'Source Serif 4', serif; line-height:1.5;
  }
  h1,h2,h3,.display{ font-family:'Fraunces', serif; font-weight:700; }
  .mono{ font-family:'IBM Plex Mono', monospace; }
  a{color:var(--mystery);}
  button{ font-family:'IBM Plex Mono', monospace; cursor:pointer; }
  *:focus-visible{ outline:3px solid var(--mystery); outline-offset:2px; }
  @media (prefers-reduced-motion: reduce){ *{ animation-duration:0.01ms !important; transition-duration:0.01ms !important; } }

  .app{ max-width:1280px; margin:0 auto; padding:28px 20px 80px; }
  .masthead{ display:flex; align-items:baseline; justify-content:space-between; gap:16px; border-bottom:2px solid var(--ink); padding-bottom:14px; margin-bottom:26px; flex-wrap:wrap; }
  .masthead h1{ font-size:clamp(28px,4vw,40px); margin:0; letter-spacing:-0.01em; }
  .masthead .tag{ font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:var(--ink); opacity:0.65; }

  .layout{ display:grid; grid-template-columns:340px 1fr; gap:26px; align-items:start; }
  @media (max-width:880px){ .layout{ grid-template-columns:1fr; } }

  .intake{ background:var(--card); border:1px solid var(--line); padding:22px; position:sticky; top:20px; }
  .intake .eyebrow{ font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--stamp); margin:0 0 4px; }
  .intake h2{ font-size:20px; margin:0 0 16px; }
  label{ display:block; font-family:'IBM Plex Mono', monospace; font-size:12px; letter-spacing:0.04em; text-transform:uppercase; color:var(--ink); opacity:0.75; margin:14px 0 6px; }
  select{
    width:100%; padding:10px 12px; font-family:'Source Serif 4', serif; font-size:15px;
    background:#fff; border:1px solid var(--line); color:var(--ink);
  }
  .world-grid{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  .world-btn{
    border:1px solid var(--line); background:#fff; padding:10px 8px; text-align:left;
    font-family:'IBM Plex Mono', monospace; font-size:12px; border-radius:2px;
  }
  .world-btn b{ display:block; font-family:'Fraunces',serif; font-size:15px; font-weight:700; margin-bottom:2px;}
  .world-btn[aria-pressed="true"]{ border-color:var(--ink); background:var(--paper); box-shadow:inset 0 0 0 1px var(--ink); }
  .level-row{ display:flex; flex-direction:column; gap:6px; }
  .level-btn{ display:flex; justify-content:space-between; align-items:center; border:1px solid var(--line); background:#fff; padding:9px 12px; font-family:'IBM Plex Mono', monospace; font-size:13px; }
  .level-btn span.desc{ font-size:11px; opacity:0.6; }
  .level-btn[aria-pressed="true"]{ border-color:var(--brass); background:#FBF3E3; }
  .generate-btn{
    width:100%; margin-top:20px; padding:14px; background:var(--stamp); color:#fff; border:none;
    font-size:14px; letter-spacing:0.08em; text-transform:uppercase; font-weight:600;
  }
  .generate-btn:disabled{ background:#B79; opacity:0.5; cursor:not-allowed; }
  .hint{ font-size:12px; opacity:0.6; margin-top:8px; font-family:'IBM Plex Mono', monospace; }

  .saved{ margin-top:22px; border-top:1px dashed var(--line); padding-top:14px; }
  .saved h3{ font-size:12px; letter-spacing:0.1em; text-transform:uppercase; margin:0 0 10px; opacity:0.7; }
  .saved-item{ display:flex; justify-content:space-between; gap:8px; padding:7px 0; border-bottom:1px solid var(--line-soft); font-size:13px; }
  .saved-item button{ background:none; border:none; color:var(--mystery); font-size:12px; text-decoration:underline; padding:0; }
  .empty-note{ font-size:12px; opacity:0.55; font-family:'IBM Plex Mono', monospace; }

  .case-area{ min-height:400px; }
  .placeholder{ border:1px dashed var(--line); padding:60px 30px; text-align:center; color:var(--ink); opacity:0.55; font-family:'IBM Plex Mono', monospace; font-size:13px; }

  .seal{ display:inline-flex; align-items:center; gap:10px; background:var(--ink); color:var(--paper); padding:10px 16px; margin-bottom:18px; transform:rotate(-1deg); }
  .seal .qid{ font-family:'IBM Plex Mono', monospace; font-weight:600; font-size:14px; letter-spacing:0.05em; }
  .seal .title{ font-family:'Fraunces', serif; font-weight:700; font-size:16px; }

  .folder{ background:var(--card); border:1px solid var(--line); margin-bottom:18px; position:relative; }
  .cut-line{ border-top:1px dashed var(--line); text-align:center; font-family:'IBM Plex Mono', monospace; font-size:10.5px; letter-spacing:0.03em; opacity:0.6; padding-top:6px; margin:0 12px; }
  .folder-tab{
    display:flex; justify-content:space-between; align-items:center; gap:10px;
    padding:10px 16px; background:var(--ink); color:var(--paper); cursor:pointer;
  }
  .folder-tab h3{ margin:0; font-size:14px; letter-spacing:0.04em; }
  .folder-tab .status{ font-family:'IBM Plex Mono', monospace; font-size:11px; opacity:0.85; }
  .folder-body{ padding:18px 20px; white-space:pre-wrap; font-size:15.5px; }
  .folder-body.collapsed{ display:none; }
  .folder-actions{ display:flex; gap:10px; padding:10px 20px 16px; border-top:1px solid var(--line-soft); }
  .folder-actions button{ background:#fff; border:1px solid var(--line); padding:6px 12px; font-size:11px; letter-spacing:0.04em; }
  .folder-actions button:hover{ border-color:var(--ink); }

  .loading-pulse{ display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--stamp); animation:pulse 1.1s infinite ease-in-out; }
  @keyframes pulse{ 0%,100%{opacity:0.25;} 50%{opacity:1;} }
  .error-note{ color:var(--stamp); font-family:'IBM Plex Mono', monospace; font-size:12.5px; }

  .copy-flash{ color:var(--sage); font-size:11px; margin-left:6px; }

  /* Streaming cursor */
  .stream-cursor{ animation:blink 0.75s step-end infinite; color:var(--stamp); }
  @keyframes blink{ 50%{ opacity:0; } }

  /* Refinement panel */
  .refine-panel{ padding:12px 20px 16px; border-top:1px solid var(--line-soft); background:#FAFAF6; }
  .refine-input{
    width:100%; padding:8px 10px; font-family:'Source Serif 4',serif; font-size:14px;
    border:1px solid var(--line); background:#fff; resize:vertical; color:var(--ink);
  }
  .refine-input::placeholder{ opacity:0.5; }
  .refine-apply-btn{
    margin-top:8px; padding:7px 16px; background:var(--mystery); color:#fff; border:none;
    font-size:11px; letter-spacing:0.06em; text-transform:uppercase;
  }
  .refine-apply-btn:hover{ background:var(--ink); }

  /* Seeker Week 2 gate */
  .week2-gate{ padding:10px 20px 16px; border-top:1px solid var(--line-soft); }

  /* Mode tabs */
  .mode-tabs{ display:flex; gap:8px; margin-bottom:20px; }
  .mode-tab{ border:1px solid var(--line); background:#fff; padding:9px 18px; font-family:'IBM Plex Mono', monospace; font-size:12px; letter-spacing:0.05em; text-transform:uppercase; }
  .mode-tab[aria-pressed="true"]{ border-color:var(--ink); background:var(--ink); color:var(--paper); }

  /* Weekly menu */
  .menu-view{ background:var(--card); border:1px solid var(--line); padding:22px; }
  .menu-band{ border-top:1px dashed var(--line); padding-top:18px; margin-top:18px; }
  .menu-band:first-child{ border-top:none; padding-top:0; margin-top:0; }
  .menu-band-header{ display:flex; align-items:baseline; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:12px; }
  .menu-band-header h3{ font-size:17px; margin:0; }
  .menu-count-label{ display:flex; align-items:center; gap:8px; font-family:'IBM Plex Mono', monospace; font-size:11px; letter-spacing:0.05em; text-transform:uppercase; opacity:0.75; margin:0; }
  .menu-count-input{ width:54px; padding:6px 8px; font-family:'IBM Plex Mono', monospace; font-size:13px; border:1px solid var(--line); background:#fff; color:var(--ink); }
  .menu-slots{ display:grid; grid-template-columns:repeat(auto-fit, minmax(220px,1fr)); gap:14px; }
  .menu-slot-card{ border:1px solid var(--line); background:#fff; padding:14px; }
  .menu-slot-label{ margin:0 0 10px; font-family:'IBM Plex Mono', monospace; font-size:11px; letter-spacing:0.06em; text-transform:uppercase; opacity:0.7; }
  .menu-mini-grid{ margin-bottom:10px; }
  .menu-slot-card select{ margin-bottom:8px; font-size:13px; padding:8px 10px; }
  .menu-generate-btn{ width:100%; margin-top:22px; padding:14px; background:var(--stamp); color:#fff; border:none; font-size:14px; letter-spacing:0.08em; text-transform:uppercase; font-weight:600; }
  .menu-generate-btn:disabled{ background:#B79; opacity:0.5; cursor:not-allowed; }
  .menu-status{ font-size:12px; opacity:0.7; margin-top:10px; font-family:'IBM Plex Mono', monospace; }

  /* Print / Save as PDF */
  .case-col{ min-width:0; }
  .print-bar{ display:flex; align-items:baseline; gap:14px; flex-wrap:wrap; margin-bottom:14px; }
  .print-bar .hint{ margin:0; }

  @media print{
    body{ background:#fff; }
    .mode-tabs, .intake, .menu-view, .print-bar, .placeholder,
    .folder-actions, .refine-panel, .week2-gate, .saved{ display:none !important; }
    .app{ max-width:none; padding:0; }
    .layout{ display:block; }
    .seal{ transform:none; }
    .folder{ border:1px solid #999; margin-bottom:0; }
    .folder + .folder{ page-break-before:always; break-before:page; }
    .folder-tab{ background:none; color:#000; border-bottom:1px solid #999; }
    .folder-tab .status, .stream-cursor{ display:none; }
    .folder-body.collapsed{ display:block !important; }
  }
  .menu-roster{ margin-top:18px; border-top:1px dashed var(--line); padding-top:14px; }
</style>
</head>
<body>
<div class="app">

  <div class="masthead">
    <h1>Risers' Quests</h1>
    <div class="tag">Generator · Guide Use Only</div>
  </div>

  <div class="mode-tabs">
    <button class="mode-tab" id="modeSingleBtn" type="button" aria-pressed="true">Single Quest</button>
    <button class="mode-tab" id="modeMenuBtn" type="button" aria-pressed="false">This Week's Menu</button>
  </div>

  <div class="layout" id="singleView">

    <div class="intake">
      <p class="eyebrow">Request Form</p>
      <h2>New Quest</h2>

      <label>World</label>
      <div class="world-grid" id="worldGrid"></div>

      <label>Level</label>
      <div class="level-row" id="levelRow"></div>

      <div id="difficultyGroup">
        <label>Difficulty</label>
        <div class="level-row" id="difficultyRow"></div>
      </div>

      <label for="coreSkillSelect">Core Skill</label>
      <select id="coreSkillSelect"></select>

      <label for="langSkillSelect">Language Skill (optional)</label>
      <select id="langSkillSelect"></select>

      <button class="generate-btn" id="generateBtn">Generate Quest</button>
      <p class="hint" id="statusHint">Pick a World, a Level, and a Core Skill.</p>

      <div class="saved">
        <h3>Archived Quests</h3>
        <div id="savedList"><p class="empty-note">None generated yet.</p></div>
      </div>
    </div>

    <div class="case-col">
      <div class="print-bar" id="printBar" style="display:none;">
        <button class="refine-apply-btn" id="printBtn" type="button">Print / Save as PDF</button>
        <p class="hint">Opens your browser's print dialog — choose "Save as PDF" as the destination. Every document prints on its own page, so nothing overlaps when you cut them apart.</p>
      </div>
      <div class="case-area" id="caseArea">
        <div class="placeholder">No active case. Fill out the request form and generate a Quest to begin.</div>
      </div>
    </div>

  </div>

  <div class="menu-view" id="menuView" style="display:none;">
    <p class="eyebrow">Weekly Batch</p>
    <h2>This Week's Menu</h2>
    <p class="hint">Set how many Quests each age band needs this week, configure each one, then generate the whole menu in one pass.</p>

    <div id="menuBands"></div>

    <button class="menu-generate-btn" id="generateMenuBtn" type="button">Generate This Week's Menu</button>
    <p class="menu-status" id="menuStatus"></p>
    <div class="menu-roster" id="menuRoster"></div>
  </div>
</div>

<script>
const WORLDS = [
  {key:'Fantasy', letter:'F', color:'var(--fantasy)', desc:'A world that doesn\'t exist'},
  {key:'Adventure', letter:'A', color:'var(--adventure)', desc:'A real-world crisis to solve'},
  {key:'Mystery', letter:'M', color:'var(--mystery)', desc:'The science behind real events'},
  {key:'Drama', letter:'D', color:'var(--drama)', desc:'Debate, art, or performance'},
];

const LEVELS = [
  {key:'Seeker', desc:'most guided'},
  {key:'Wanderer', desc:'some open decisions'},
  {key:'Explorer', desc:'self-directed'},
  {key:'Pathfinder', desc:'fully open'},
];

const DIFFICULTIES = [
  {key:'Easy', desc:'comfortable application'},
  {key:'Hard', desc:'genuine stretch'},
];

const SCIENCE_SKILLS = [
  'Characteristics of living things','Plant structure and function','Basic food chains','Pollination and seed dispersal','Adaptations in animals and plants',
  'States of matter','Properties of materials','Physical changes','Mixtures',
  'Push and pull forces','Gravity','Heat and temperature','Simple machines','Sound: pitch and volume','Light reflection',
  'Weather patterns','Water cycle','Solar system basics','Rocks and minerals','Moon phases','Natural disasters awareness',
  'Cell structure and function','Digestive system','Respiratory system','Photosynthesis','Ecosystems','Skeletal and muscular systems',
  'Chemical and physical changes','Elements, compounds, mixtures','Solutions','Structure of the atom (intro)','Periodic table basics','Acids and bases',
  'Speed and motion','Friction','Kinetic and potential energy','Electric circuits','Reflection and refraction','Properties of waves','Magnets and electromagnets',
  'Rock cycle','Atmosphere','Climate zones','Soil formation','Eclipses','Earthquakes and volcanoes',
  'Circulatory system','Nervous system','Immune system','DNA and genes','Inheritance and traits','Variation in species','Pollution and climate change',
  'Protons, neutrons, electrons','Chemical reactions','pH scale','Balancing equations','Neutralization','Exothermic and endothermic reactions',
  'Velocity and acceleration',"Newton's laws of motion",'Conservation of energy','Current, voltage, resistance','Electromagnetic spectrum basics',
];

const MATH_SKILLS = [
  'Number Sense & Operations','Number Fluency & Fact Mastery','Decimals','Fractions',
  'Fractions, Decimals, Percentages','Integers (Positive & Negative Numbers)',
  'Ratios & Proportions','Powers, Squares, Cubes','Algebra Foundations',
];

const LANGUAGE_SKILLS = [
  'Reading Skills & Strategies','Text Analysis & Evidence','Research & Informational Reading',
  'Digital Literacy & Communication','Writing Process (Editing & Refinement)','Grammar, Style & Vocabulary',
  'Referencing & Citations','Performance & Oral Expression','Spelling & Word Study',
  'Sentence Structure & Clauses','Reading Fluency','Story Structure (Story Arc)',
  'Narrative Elements','Discussion & Debate',
];

const MASTER_SPEC = `You are the generation engine for "Risers' Quests" — a real program where children aged 8-14 ("Risers") complete short, hands-on projects ("Quests") at school, guided by an adult ("the Guide") — 3 Days for Wanderer, Explorer, and Pathfinder; 2 Weeks (6 Days) for Seeker. You generate one Quest at a time from a World, a Level, and a Core Skill, plus an optional Language Skill and — for Seeker only — a Difficulty. Follow every rule below exactly.

LEVELS (least to most self-directed): Seeker, Wanderer, Explorer, Pathfinder. The story is always equally high-stakes at every Level — only self-direction changes.
- Seeker: explicit, step-by-step, written entirely at the Riser's own reading level. No Guide facilitation assumed.
- Wanderer: clear steps with some open decisions.
- Explorer: loose guidance/prompts; the Riser has to find their own path. The Core Skill content must genuinely stretch the Riser — include a sub-skill or harder application they have not yet mastered, never just an easier re-application of something already comfortable.
- Pathfinder: the most fluid and open; minimal scaffolding.

DIFFICULTY (Seeker ONLY, chosen per Riser): Easy or Hard — this controls how hard the Core Skill content itself is, on top of Seeker's own step-by-step structure. For every other Level (Wanderer, Explorer, Pathfinder), ignore Difficulty entirely — the Level above already calibrates how hard the Quest is, and a Difficulty value may still be present in the request but must not change anything about the output.
- Easy: a comfortable, already-practiced application of the Core Skill — appropriately challenging for the Riser, not a stretch.
- Hard: a genuinely harder sub-skill or application of the Core Skill that this specific Riser has not yet mastered — never just a longer or faster version of the Easy content.
A Hard Seeker Quest keeps Seeker's step-by-step, simplest-English, hands-on-first structure exactly as defined below — only the underlying Core Skill content gets harder.

WORLDS: Fantasy (a world that doesn't exist; real science separates fact from fiction), Adventure (a real-world crisis at a scale the Riser can design a response for), Mystery (the scientific explanation behind a real event), Drama (scientific/philosophical thinking applied to debate, art, or performance).

COMPONENTS (Pre-Quest Check is skipped for Seeker; Links and Materials to Bring are both conditional):
1. Hook Card — punchy, escalating, high-stakes scene-setting, never a flat paragraph, ending on a short imperative. Footer shows Core Skill and Level ONLY — never Subject.
2. Pre-Quest Check — ONLY for Wanderer, Explorer, and Pathfinder; Seeker skips this component entirely. 5 self-administered questions: one concept multiple-choice, then four applied short-answer problems with working space, increasing in difficulty. Every question must have a single, objective, definitively correct answer (a calculation, a fact, a clear right answer) — never a prediction, opinion, or open-interpretation question, since the Riser self-scores by checking their own answer against the underlying math/fact. The final question is quietly isomorphic to the Quest's real mechanic without revealing the mission. No answer key. Close with tiered self-scoring guidance naming the SPECIFIC questions that are the real gating signal.
3. Archives — Riser-facing reading for Stage 1, in two parts. Open with one line telling the Riser what the two parts are and why, before they start reading (e.g. naming that Part 1 is the story/history and Part 2 is the science they'll need) — never leave the Riser to guess why the reading is split. Blends a real historical/factual narrative anchor, genuinely interesting tangential facts, and the core content knowledge needed, narratively. Vocabulary scales with Level: simplest words for Wanderer, moderately bigger words intentionally for Explorer and Pathfinder — but sentence structure stays clear and simple at every Level, including inside the Quest Pack. If a procedural gap is intentional (Links will be provided), stop short of the technique and tease that more is needed. If no Links will be provided, the Archives MUST be fully self-contained. Ends by handing over the mission-specific data/problem.
4. Links — ONLY if Level is exactly "Explorer" AND a genuine procedural gap exists. Real, well-known, stable educational websites only (e.g. mathsisfun.com, BBC Bitesize, NASA, Khan Academy) — never invent obscure or fictional URLs. Written as a short, ready-to-forward message (a one-line intro plus the links) that the Guide manually forwards to the Riser's email — never a long document. State explicitly this is sent only after the Archives are read, never before.
5. Quest Pack — the full Quest, exactly this six-stage skeleton. Wanderer, Explorer, and Pathfinder use the STANDARD form (always 3 Days). Seeker uses the SEEKER form (always 2 Weeks, 6 Days). Prescriptiveness must scale exactly to Level as defined above.
6. Materials to Bring — ONLY if Level is "Wanderer" or "Explorer" AND the Quest is physically hands-on. A short, standalone list — never folded into the Quest Pack's own text — naming exactly what the Riser needs to bring from home for Day 2's hands-on work. The Guide hands this to the Riser at the end of Day 1, on its own, so the Riser can cut it out and take it home that same day; it must stand alone with nothing else printed on it. List only concrete items, no instructions, explanation, or narrative. If the Quest is calculation/investigation-only with nothing to bring, this component does not exist.

   STANDARD (Wanderer / Explorer / Pathfinder):
   Day 1: Stage 1 "Deep Dive" (read the Archives) → Stage 2 "Brain Dump" — Riser picks exactly one format: Mind Map (a free-form radial diagram branching out from one central topic) or KWL Chart (K: What I Know, W: What I Want to Find Out — both filled in now; L: What I Learned stays blank until after Stage 4, then gets filled in as part of the Day 3 wrap-up).
   Day 2: Stage 3 "Blueprint" — Part A: commit to ONE prediction BEFORE investigating (no data or results yet). Part B: design a recording tool BEFORE Stage 4, choosing exactly one of two types: Table (rows + columns) or Tracker (checklist style) — design only, leave it empty. Stage 3 must contain zero actual data or results. Then Stage 4, named "Experiment Zero" if the Core Skill is Science or "Data Analysis" if the Core Skill is Math — do the real work step by step, filling the Stage 3 recording tool with actual results (zero new predictions here), reach a conclusion, then explicitly compare it back to the Stage 3 prediction. Stage 3 and Stage 4 must read as clearly distinct phases — planning only, then execution only.
   Day 3: Stage 5 "What If" (a new, un-researchable twist testing transfer, not lookup — no single right answer, but reasoning must be built on the evidence) → Stage 6 "Leave a Door Open" (the Riser writes ONE genuinely new question, not a summary).
   Close with "Present Your Case" — Day 3 presentation to the group and Guide, using this fixed four-part worksheet every time, never inventing different prompts: 01 Narration (presenter answers "What was this quest about?", "What did you find or conclude?", and "What question are you walking away with?" — the last one restates the Stage 6 question, not a new one); 02 Display (show the Brain Dump, Blueprint, recording tool, and output — no explanation needed, let the work speak); 03 Self Review (presenter answers "One thing that worked" and "One thing I would do differently"); 04 Peer Review (a Fellow Riser, Guide-facilitated, live, answers "I appreciate…", "I observed…", "My question is…").
   Pathfinder only: include a materials list inline here, ONLY if the Quest is physically hands-on; omit entirely if calculation/investigation-only. Wanderer and Explorer never include a materials list here — they use the separate Materials to Bring component instead.

   SEEKER (hands-on first, simplest possible English, no Guide facilitation assumed):
   LANGUAGE: every instruction is one short sentence, one action per step, common everyday words only, written at a 1st-grade reading level. Never require the Riser to infer an unstated step — the Riser must be able to complete every Day without asking a question.
   This Quest Pack is generated and delivered in two parts — write ONLY Week 1 (Days 1-3) when asked for the Quest Pack, and ONLY Week 2 (Days 4-6) when asked for Week 2. Never reveal Week 2 content while writing Week 1.

   WEEK 1:
   Day 1, Stage 1 "First Look" — a concrete hands-on mini-investigation BEFORE any reading, using ONLY the Riser's own body plus plain paper/pencil/scissors (nothing else — no other materials can be assumed ready on Day 1). Give exact steps with exact counts/actions (e.g. "fold it in half," "count to 20"), ending in a forced binary observation (circle one of two words) — never an open-ended description. The activity must have a direct, obvious link to the Core Skill's concept; if no clean fit exists, default to a simple self-observation (e.g. a pulse-check) rather than a stretch. Follow immediately with a SHORT reading passage (a few sentences, not Archives-length) that makes sense of what the Riser just did, ending on one simple question.
   Day 2, Stage 2 "Brain Dump" — fixed format, not a Riser choice: a short circle-or-match task testing recall of Day 1. No blank-page drawing or writing.
   Day 3, Stage 3 "Draw the Model" — Part A: one simple either/or prediction question. Part B: a guided, step-by-step drawing/painting/coloring/collage activity that produces a visual model of the concept — this becomes the Riser's reference for Week 2's build. Materials note: list what Day 3 needs (e.g. markers, paint, colored paper) AND flag that Week 2 Day 1 will need clay or another kid-friendly modeling material, so the Guide can prepare both in advance — without revealing any Week 2 instructions.

   WEEK 2:
   Day 1, Stage 4 "Build the Model" — a guided, step-by-step build of a physical model using clay or another kid-friendly modeling material, using the Riser's own Week 1 drawing as the reference. End by explicitly comparing the build back to the Day 3 prediction.
   Day 2, Stage 5 "What If" — the same un-researchable twist as the Standard form, framed as one small hands-on or talk-it-through prompt, same simplest-English style.
   Day 3, Stage 6 "Leave a Door Open" — one simple, short reflection question (the Riser writes ONE new question, not a summary), then "Present Your Case" to the group and Guide.
   Ignore the stage4Name field for Seeker — Stage 3 is always "Draw the Model" and Stage 4 is always "Build the Model."

PROMPTS & TRANSITIONS (every Level): any sentence that tells the Riser what to do, answer, or write — Pre-Quest Check questions, every Stage prompt, every worksheet prompt, every transition cue — must be a plain, literal sentence in the simplest words that fit the Level. No metaphor, no figurative language, no abstract phrasing (e.g. never "threads that pull you in" — say plainly what to notice or do). Reserve vivid, immersive language for the Hook Card and the Archives' narrative passages only; the moment a sentence is an instruction rather than a story, it must say so directly.
Every Stage must end with its own clearly set-off transition line — visually its own short break, never buried in the last paragraph — naming the exact next worksheet by name and the next physical action, in calm, simple, plain language. No commands or shouting (never "STOP"); just a quiet, direct statement of what comes next — e.g. "Next: open your Blueprint sheet. Write your prediction in Part A." Never a vague "move on" that assumes the Riser will infer the next step. This applies at every Stage-to-Stage handoff, in both the STANDARD and SEEKER forms.

BRANDING: brand name is "Risers' Quests". Quest ID is World-letter + number, e.g. "M-07". Level and Difficulty are separate fields — never use one label for the other. Never print "Subjects," "Format," "Track," or "Academic" anywhere.

LANGUAGE: never a standalone Quest target. By default it's woven organically into existing writing tasks. If a specific Language Skill is given, deliberately integrate that exact sub-skill into the relevant stage(s) instead.

TONE: high-stakes and immersive at every Level. Write for a real child aged 8-14 — never patronizing, never cartoonish. Ground every Quest in something that could really be true, unless the World is Fantasy.`;

let state = { world:null, level:null, difficulty:'Easy', coreSkill:null, subject:null, langSkill:'', brief:null, sections:{} };

/* Weekly Menu: batch-generate several Quests in one pass, grouped by age band.
   No fixed age-to-Level mapping yet — the Guide picks World/Level/Core Skill per slot. */
let menuConfig = [
  { label: 'Ages 8–9', count: 2 },
  { label: 'Ages 10–11', count: 3 },
  { label: 'Ages 12–13', count: 2 },
];
let menuSlots = [];
let menuResults = [];
let menuGenerating = false;

/* Persists Archived Quests in this browser only (no backend) */
const storage = {
  async set(key, value){ localStorage.setItem(key, value); },
  async list(prefix){ return { keys: Object.keys(localStorage).filter(k => k.startsWith(prefix)) }; },
  async get(key){ return { value: localStorage.getItem(key) }; },
};

function el(tag, attrs={}, children=[]){
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=>{
    if(k==='html') e.innerHTML=v; else e.setAttribute(k,v);
  });
  children.forEach(c=>e.appendChild(c));
  return e;
}

function renderWorldGrid(){
  const grid = document.getElementById('worldGrid');
  grid.innerHTML='';
  WORLDS.forEach(w=>{
    const btn = el('button',{class:'world-btn','aria-pressed': state.world===w.key,'type':'button'});
    btn.innerHTML = `<b>${w.key}</b>${w.desc}`;
    btn.onclick = ()=>{ state.world=w.key; renderWorldGrid(); updateHint(); };
    grid.appendChild(btn);
  });
}

function renderLevelRow(){
  const row = document.getElementById('levelRow');
  row.innerHTML='';
  LEVELS.forEach(l=>{
    const btn = el('button',{class:'level-btn','aria-pressed': state.level===l.key,'type':'button'});
    btn.innerHTML = `<span>${l.key}</span><span class="desc">${l.desc}</span>`;
    btn.onclick = ()=>{ state.level=l.key; if(state.level!=='Seeker') state.difficulty='Easy'; renderLevelRow(); updateDifficultyVisibility(); updateHint(); };
    row.appendChild(btn);
  });
}

function updateDifficultyVisibility(){
  document.getElementById('difficultyGroup').style.display = state.level==='Seeker' ? '' : 'none';
}

function renderDifficultyRow(){
  const row = document.getElementById('difficultyRow');
  row.innerHTML='';
  DIFFICULTIES.forEach(d=>{
    const btn = el('button',{class:'level-btn','aria-pressed': state.difficulty===d.key,'type':'button'});
    btn.innerHTML = `<span>${d.key}</span><span class="desc">${d.desc}</span>`;
    btn.onclick = ()=>{ state.difficulty=d.key; renderDifficultyRow(); };
    row.appendChild(btn);
  });
}

function renderCoreSkillSelect(){
  const sel = document.getElementById('coreSkillSelect');
  sel.innerHTML = '<option value="">— choose a Core Skill —</option>';
  const mathGroup = el('optgroup',{label:'Math'});
  MATH_SKILLS.forEach(s=> mathGroup.appendChild(el('option',{value:'math:::'+s, html:s})));
  const sciGroup = el('optgroup',{label:'Science'});
  SCIENCE_SKILLS.forEach(s=> sciGroup.appendChild(el('option',{value:'science:::'+s, html:s})));
  sel.appendChild(mathGroup); sel.appendChild(sciGroup);
  sel.onchange = ()=>{
    if(!sel.value){ state.coreSkill=null; state.subject=null; }
    else { const [subj, name] = sel.value.split(':::'); state.subject=subj; state.coreSkill=name; }
    updateHint();
  };
}

function renderLangSelect(){
  const sel = document.getElementById('langSkillSelect');
  sel.innerHTML = '<option value="">— integrate organically (default) —</option>';
  LANGUAGE_SKILLS.forEach(s=> sel.appendChild(el('option',{value:s, html:s})));
  sel.onchange = ()=>{ state.langSkill = sel.value; };
}

function updateHint(){
  const ready = state.world && state.level && state.coreSkill;
  document.getElementById('generateBtn').disabled = !ready;
  document.getElementById('statusHint').textContent = ready
    ? `Ready: ${state.world} · ${state.level} · ${state.coreSkill}`
    : 'Pick a World, a Level, and a Core Skill.';
}

/* Non-streaming call for JSON brief — proxied through /api/claude so the Anthropic
   API key stays server-side and is never exposed to the browser. */
async function callClaude(system, user){
  const res = await fetch('/api/claude', {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ system, user })
  });
  if(!res.ok){
    const errText = await res.text().catch(()=>'');
    throw new Error('API error ('+res.status+')' + (errText ? ': '+errText.slice(0,200) : ''));
  }
  const data = await res.json();
  return data.text;
}

/* Streaming call, proxied through /api/claude-stream — text delivered chunk-by-chunk via onChunk(text) */
async function callClaudeStream(system, messages, onChunk){
  const res = await fetch('/api/claude-stream', {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ system, messages })
  });
  if(!res.ok){
    const errText = await res.text().catch(()=>'');
    throw new Error('API error ('+res.status+')' + (errText ? ': '+errText.slice(0,200) : ''));
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';
  while(true){
    const { done, value } = await reader.read();
    if(done) break;
    buffer += decoder.decode(value, { stream:true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for(const line of lines){
      if(!line.startsWith('data: ')) continue;
      const raw = line.slice(6).trim();
      if(!raw || raw==='[DONE]') continue;
      try{
        const evt = JSON.parse(raw);
        if(evt.type==='content_block_delta' && evt.delta?.type==='text_delta'){
          fullText += evt.delta.text;
          onChunk(evt.delta.text);
        }
      } catch(_){}
    }
  }
  return fullText;
}

function stripJsonFence(text){
  return text.replace(/```json|```/g,'').trim();
}

function buildContextLine(){
  return `World: ${state.world}\nLevel: ${state.level}\nDifficulty: ${state.difficulty}\nCore Skill: ${state.coreSkill}\nSubject: ${state.subject}\nLanguage Skill: ${state.langSkill || 'none — integrate organically'}`;
}

/* Build the cross-section context to pass into a given section's prompt */
function buildContextForSection(key){
  const ctx = {};
  if(key !== 'hook' && state.sections.hook) ctx.hook = state.sections.hook;
  if((key === 'questPack' || key === 'questPackWeek2') && state.sections.archives) ctx.archives = state.sections.archives;
  if(key === 'questPackWeek2' && state.sections.questPack) ctx.questPackWeek1 = state.sections.questPack;
  if(key === 'materials' && state.sections.questPack) ctx.questPack = state.sections.questPack;
  return ctx;
}

const SECTION_ORDER = ['hook','preQuestCheck','archives','links','questPack','materials'];
const SECTION_LABELS = { hook:'Hook Card', preQuestCheck:'Pre-Quest Check', archives:'Archives', links:'Links', questPack:'Quest Pack', questPackWeek2:'Quest Pack — Week 2', materials:'Materials to Bring — Day 2 Prep' };

function getSectionLabel(key){
  if(key === 'questPack' && state.level === 'Seeker') return 'Quest Pack — Week 1';
  return SECTION_LABELS[key];
}

function sectionPrompt(key, brief, context={}){
  const ctx = `${buildContextLine()}\nQuest ID: ${brief.questId}\nMission Title: ${brief.missionTitle}\nStage 4 Name: ${brief.stage4Name}`;

  /* Inject previously-generated sections as consistency anchors */
  const hookBlock = context.hook
    ? `\n\n--- HOOK CARD (already written — maintain all narrative details: setting, characters, stakes) ---\n${context.hook}\n---`
    : '';
  const archivesBlock = context.archives
    ? `\n\n--- ARCHIVES (already written — Quest Pack stages must align with this content and data) ---\n${context.archives}\n---`
    : '';
  const week1Block = context.questPackWeek1
    ? `\n\n--- QUEST PACK WEEK 1 (already written — Week 2 must reference this Riser's actual Week 1 drawing/prediction and stay consistent) ---\n${context.questPackWeek1}\n---`
    : '';
  const questPackBlock = context.questPack
    ? `\n\n--- QUEST PACK (already written — the materials list must match exactly what Day 2's actual activity needs) ---\n${context.questPack}\n---`
    : '';

  if(key==='hook') return `${ctx}\n\nWrite the Hook Card now, following the Hook Card rules exactly.`;
  if(key==='preQuestCheck') return `${ctx}\n\nWrite the Pre-Quest Check now, following the rules exactly. Do not reveal the mission's specific scenario, only test the prerequisite skill.`;
  if(key==='archives') return `${ctx}${hookBlock}\nIntentional procedural gap (Links will follow): ${brief.requiresLinks}\nGap description if any: ${brief.linkGapDescription||'none'}\n\nWrite the Archives now, following the rules exactly.`;
  if(key==='links') return `${ctx}${hookBlock}\nGap to fill: ${brief.linkGapDescription}\n\nWrite the Links document now, following the rules exactly.`;
  if(key==='questPack'){
    const seekerNote = state.level === 'Seeker' ? ' For Seeker, write ONLY Week 1 (Days 1-3) of the SEEKER form — do not write Week 2.' : '';
    return `${ctx}${hookBlock}${archivesBlock}\n\nWrite the full Quest Pack now, following the six-stage skeleton exactly, calibrated to Level "${state.level}".${seekerNote}`;
  }
  if(key==='questPackWeek2') return `${ctx}${hookBlock}${archivesBlock}${week1Block}\n\nWrite Week 2 (Days 4-6) of the SEEKER Quest Pack now, following the rules exactly.`;
  if(key==='materials') return `${ctx}${questPackBlock}\n\nWrite the Materials to Bring component now, following the rules exactly. This will be printed and handed to the Riser on its own at the end of Day 1, for them to cut out and take home — list ONLY the concrete items needed for Day 2, nothing else: no instructions, no explanation, no narrative.`;
}

async function generateAll(){
  document.getElementById('generateBtn').disabled = true;
  state.sections = {};
  state.brief = null;

  const caseArea = document.getElementById('caseArea');
  caseArea.innerHTML = '';
  const sealRow = el('div',{id:'sealRow'});
  caseArea.appendChild(sealRow);
  sealRow.innerHTML = `<div class="seal mono"><span class="loading-pulse"></span> Drafting mission brief…</div>`;

  let brief;
  try {
    const briefRaw = await callClaude(
      MASTER_SPEC,
      `Generate the foundational Mission Brief for a new Quest.\n${buildContextLine()}\n\nRespond with this exact JSON shape: {"questId": string (World-letter + 2-digit number, e.g. "M-07"), "missionTitle": string, "stage4Name": string ("Experiment Zero" or "Data Analysis" per the rules), "requiresLinks": boolean (true only if Level is exactly "Explorer" AND a genuine procedural gap is needed), "linkGapDescription": string or null, "requiresMaterials": boolean (true only if Level is "Wanderer" or "Explorer" AND the Quest is physically hands-on, meaning the Riser needs to bring materials from home for Day 2)}`
    );
    brief = JSON.parse(stripJsonFence(briefRaw));
    if(state.level !== 'Explorer') brief.requiresLinks = false;
    if(state.level !== 'Wanderer' && state.level !== 'Explorer') brief.requiresMaterials = false;
    state.brief = brief;
  } catch(e){
    sealRow.innerHTML = `<p class="error-note">Could not draft the mission brief — ${e.message}. <button onclick="generateAll()">Retry</button></p>`;
    document.getElementById('generateBtn').disabled = false;
    return;
  }

  sealRow.innerHTML = `<div class="seal"><span class="qid">${brief.questId}</span><span class="title">${brief.missionTitle}</span></div>`;
  document.getElementById('printBar').style.display = '';

  const sectionsToBuild = SECTION_ORDER.filter(s =>
    (s!=='links' || brief.requiresLinks) &&
    (s!=='materials' || brief.requiresMaterials) &&
    (s!=='preQuestCheck' || state.level!=='Seeker')
  );
  sectionsToBuild.forEach(key=>{
    caseArea.appendChild(buildFolderSkeleton(key));
  });

  /*
   * Staged generation for narrative coherence:
   *   Phase 1 (parallel): Hook + Pre-Quest Check — no cross-dependencies (Pre-Quest Check skipped for Seeker)
   *   Phase 2 (sequential): Archives — reads Hook so setting/characters stay consistent
   *   Phase 3 (parallel): Quest Pack + Links — Quest Pack reads both Hook and Archives
   *   Phase 4 (sequential): Materials to Bring — reads the finished Quest Pack so the list matches Day 2 exactly
   */
  const phase1 = [ generateSection('hook', {}) ];
  if(state.level !== 'Seeker') phase1.push(generateSection('preQuestCheck', {}));
  await Promise.allSettled(phase1);

  await generateSection('archives', { hook: state.sections.hook });

  const phase3 = [ generateSection('questPack', {
    hook: state.sections.hook,
    archives: state.sections.archives,
  }) ];
  if(brief.requiresLinks) phase3.push(generateSection('links', { hook: state.sections.hook }));
  await Promise.allSettled(phase3);

  if(brief.requiresMaterials && state.sections.questPack){
    await generateSection('materials', { questPack: state.sections.questPack });
  }

  if(state.level === 'Seeker' && state.sections.questPack) renderWeek2Gate();

  saveCurrentQuest();
  renderSavedList();
  document.getElementById('generateBtn').disabled = false;
}

/* Seeker only: Week 2 (Days 4-6) is withheld until the Guide confirms Week 1 is done */
function renderWeek2Gate(){
  const folder = document.getElementById('folder-questPack');
  if(!folder || folder.querySelector('.week2-gate') || state.sections.questPackWeek2) return;
  const gate = el('div',{class:'week2-gate'});
  const btn = el('button',{class:'refine-apply-btn', type:'button'});
  btn.textContent = 'Week 1 complete — Generate Week 2';
  btn.onclick = async ()=>{
    gate.remove();
    document.getElementById('caseArea').appendChild(buildFolderSkeleton('questPackWeek2'));
    await generateSection('questPackWeek2', {
      hook: state.sections.hook,
      archives: state.sections.archives,
      questPackWeek1: state.sections.questPack,
    });
    saveCurrentQuest();
  };
  gate.appendChild(btn);
  folder.appendChild(gate);
}

function buildFolderSkeleton(key){
  const folder = el('div',{class: key==='materials' ? 'folder cut-card' : 'folder', id:'folder-'+key});
  if(key==='materials'){
    const cutLine = el('div',{class:'cut-line'});
    cutLine.textContent = '✂ Cut along this line — hand to the Riser at the end of Day 1';
    folder.appendChild(cutLine);
  }
  const tab = el('div',{class:'folder-tab'});
  tab.innerHTML = `<h3>${getSectionLabel(key)}</h3><span class="status mono"><span class="loading-pulse"></span> generating…</span>`;
  tab.onclick = ()=>{
    const body = document.getElementById('body-'+key);
    if(body) body.classList.toggle('collapsed');
  };
  const body = el('div',{class:'folder-body', id:'body-'+key});
  folder.appendChild(tab);
  folder.appendChild(body);
  return folder;
}

/* Stream a section into its folder body, showing text word-by-word as it arrives */
async function generateSection(key, context={}){
  const body = document.getElementById('body-'+key);
  if(!body) return;

  body.innerHTML = '';
  const textNode = document.createTextNode('');
  const cursor = el('span',{class:'stream-cursor'});
  cursor.textContent = '▋';
  body.appendChild(textNode);
  body.appendChild(cursor);

  try {
    const fullText = await callClaudeStream(
      MASTER_SPEC,
      [{role:'user', content: sectionPrompt(key, state.brief, context)}],
      (chunk) => { textNode.textContent += chunk; }
    );
    cursor.remove();
    state.sections[key] = fullText;
    const tab = document.querySelector('#folder-'+key+' .status');
    if(tab) tab.innerHTML = 'done';
    addFolderActions(key);
  } catch(e){
    cursor.remove();
    body.innerHTML = `<span class="error-note">Failed to generate — ${e.message}</span>`;
    const tab = document.querySelector('#folder-'+key+' .status');
    if(tab){
      const retryBtn = el('button',{type:'button',style:'background:none;border:none;color:#fff;text-decoration:underline;font-size:11px;'});
      retryBtn.textContent = 'retry';
      retryBtn.onclick = ()=> retrySection(key);
      tab.innerHTML = '';
      tab.appendChild(retryBtn);
    }
  }
}

async function retrySection(key){
  const folder = document.getElementById('folder-'+key);
  const existingActions = folder?.querySelector('.folder-actions');
  if(existingActions) existingActions.remove();
  const tab = document.querySelector('#folder-'+key+' .status');
  if(tab) tab.innerHTML = '<span class="loading-pulse"></span> generating…';
  await generateSection(key, buildContextForSection(key));
  saveCurrentQuest();
}

function addFolderActions(key){
  const folder = document.getElementById('folder-'+key);
  if(folder.querySelector('.folder-actions')) return;
  const actions = el('div',{class:'folder-actions'});

  const copyBtn = el('button',{type:'button'});
  copyBtn.textContent = 'Copy text';
  copyBtn.onclick = async ()=>{
    await navigator.clipboard.writeText(state.sections[key]||'');
    copyBtn.textContent = 'Copied ✓';
    setTimeout(()=>copyBtn.textContent='Copy text', 1500);
  };

  const refineBtn = el('button',{type:'button'});
  refineBtn.textContent = 'Refine…';
  refineBtn.onclick = ()=> toggleRefinePanel(key, folder, refineBtn);

  actions.appendChild(copyBtn);
  actions.appendChild(refineBtn);
  folder.appendChild(actions);
}

function toggleRefinePanel(key, folder, triggerBtn){
  const existing = folder.querySelector('.refine-panel');
  if(existing){ existing.remove(); triggerBtn.textContent = 'Refine…'; return; }

  triggerBtn.textContent = 'Cancel';

  const panel = el('div',{class:'refine-panel'});
  const input = el('textarea',{class:'refine-input', rows:'3',
    placeholder:"Describe the change — e.g. 'Shorten the Hook and raise the stakes' or 'Simplify the Archives for a 9-year-old' or 'Add a materials list to the Quest Pack'…"});
  const applyBtn = el('button',{class:'refine-apply-btn', type:'button'});
  applyBtn.textContent = 'Apply Refinement';
  applyBtn.onclick = ()=>{
    const instructions = input.value.trim();
    if(!instructions) return;
    refineSection(key, instructions, folder, triggerBtn, panel);
  };
  panel.appendChild(input);
  panel.appendChild(applyBtn);
  folder.appendChild(panel);
  input.focus();
}

/* Multi-turn refinement: passes the original prompt + response as conversation history,
   then asks Claude to apply the Guide's specific instruction — streams the new version */
async function refineSection(key, instructions, folder, triggerBtn, panel){
  panel.remove();
  triggerBtn.textContent = 'Refine…';

  const body = document.getElementById('body-'+key);
  const tab = document.querySelector('#folder-'+key+' .status');
  if(tab) tab.innerHTML = '<span class="loading-pulse"></span> refining…';

  const originalContent = state.sections[key] || '';
  const originalPrompt = sectionPrompt(key, state.brief, buildContextForSection(key));

  body.innerHTML = '';
  const textNode = document.createTextNode('');
  const cursor = el('span',{class:'stream-cursor'});
  cursor.textContent = '▋';
  body.appendChild(textNode);
  body.appendChild(cursor);

  /* Remove existing actions — they'll be re-added after the refined version lands */
  const oldActions = folder.querySelector('.folder-actions');
  if(oldActions) oldActions.remove();

  try {
    const fullText = await callClaudeStream(
      MASTER_SPEC,
      [
        { role:'user', content: originalPrompt },
        { role:'assistant', content: originalContent },
        { role:'user', content: `Refine the section above with these changes: ${instructions}` },
      ],
      (chunk) => { textNode.textContent += chunk; }
    );
    cursor.remove();
    state.sections[key] = fullText;
    if(tab) tab.innerHTML = 'done';
    addFolderActions(key);
    saveCurrentQuest();
  } catch(e){
    cursor.remove();
    /* Restore original on failure */
    body.textContent = originalContent;
    if(tab) tab.innerHTML = 'done';
    const errSpan = el('span',{class:'error-note'});
    errSpan.textContent = ` — Refinement failed: ${e.message}`;
    body.appendChild(errSpan);
    addFolderActions(key);
  }
}

async function saveCurrentQuest(){
  if(!state.brief) return;
  try {
    await storage.set('quest:'+state.brief.questId, JSON.stringify({
      brief: state.brief, world: state.world, level: state.level, difficulty: state.difficulty,
      coreSkill: state.coreSkill, langSkill: state.langSkill, sections: state.sections
    }));
  } catch(e){ /* storage best-effort */ }
}

async function renderSavedList(){
  const listEl = document.getElementById('savedList');
  try {
    const res = await storage.list('quest:');
    const keys = (res && res.keys) || [];
    if(keys.length===0){ listEl.innerHTML = '<p class="empty-note">None generated yet.</p>'; return; }
    listEl.innerHTML = '';
    for(const k of keys){
      try {
        const rec = await storage.get(k);
        const data = JSON.parse(rec.value);
        const row = el('div',{class:'saved-item'});
        const left = el('span');
        left.innerHTML = `<b>${data.brief.questId}</b> · ${data.brief.missionTitle}`;
        const btn = el('button',{type:'button'});
        btn.textContent = 'Reopen';
        btn.onclick = ()=> reopenQuest(data);
        row.appendChild(left); row.appendChild(btn);
        listEl.appendChild(row);
      } catch(e){ /* skip unreadable entries */ }
    }
  } catch(e){
    listEl.innerHTML = '<p class="empty-note">Could not load archive.</p>';
  }
}

function reopenQuest(data){
  state = { world:data.world, level:data.level, difficulty:data.difficulty || 'Easy', coreSkill:data.coreSkill, subject:null,
            langSkill:data.langSkill, brief:data.brief, sections:data.sections };
  renderLevelRow();
  updateDifficultyVisibility();
  const caseArea = document.getElementById('caseArea');
  caseArea.innerHTML = '';
  const sealRow = el('div');
  sealRow.innerHTML = `<div class="seal"><span class="qid">${data.brief.questId}</span><span class="title">${data.brief.missionTitle}</span></div>`;
  caseArea.appendChild(sealRow);
  document.getElementById('printBar').style.display = '';
  Object.keys(data.sections).forEach(key=>{
    const folder = buildFolderSkeleton(key);
    caseArea.appendChild(folder);
    document.getElementById('body-'+key).textContent = data.sections[key];
    document.querySelector('#folder-'+key+' .status').textContent = 'done';
    addFolderActions(key);
  });
  if(state.level === 'Seeker' && state.sections.questPack) renderWeek2Gate();
}

function switchToSingleView(){
  document.getElementById('singleView').style.display = '';
  document.getElementById('menuView').style.display = 'none';
  document.getElementById('modeSingleBtn').setAttribute('aria-pressed','true');
  document.getElementById('modeMenuBtn').setAttribute('aria-pressed','false');
}

function switchToMenuView(){
  document.getElementById('singleView').style.display = 'none';
  document.getElementById('menuView').style.display = '';
  document.getElementById('modeSingleBtn').setAttribute('aria-pressed','false');
  document.getElementById('modeMenuBtn').setAttribute('aria-pressed','true');
}

/* Keep menuSlots in sync with each band's configured count, preserving any
   choices already made for slots that still exist. */
function rebuildMenuSlots(){
  const next = [];
  menuConfig.forEach((band, bandIdx)=>{
    for(let i=0;i<band.count;i++){
      const existing = menuSlots.find(s=> s.bandIdx===bandIdx && s.slotIdx===i);
      next.push(existing || { bandIdx, slotIdx:i, bandLabel: band.label, world:null, level:null, difficulty:'Easy', coreSkill:null, subject:null, langSkill:'' });
    }
  });
  menuSlots = next;
}

function renderMenuView(){
  const container = document.getElementById('menuBands');
  container.innerHTML = '';
  menuConfig.forEach((band, bandIdx)=>{
    const bandEl = el('div',{class:'menu-band'});

    const header = el('div',{class:'menu-band-header'});
    const heading = el('h3');
    heading.textContent = band.label;
    header.appendChild(heading);
    const countLabel = el('label',{class:'menu-count-label'});
    countLabel.textContent = 'Quests this week:';
    const countInput = el('input',{type:'number', min:'0', max:'10', value:String(band.count), class:'menu-count-input'});
    countInput.onchange = ()=>{
      band.count = Math.max(0, parseInt(countInput.value,10) || 0);
      rebuildMenuSlots();
      renderMenuView();
    };
    countLabel.appendChild(countInput);
    header.appendChild(countLabel);
    bandEl.appendChild(header);

    const slotsRow = el('div',{class:'menu-slots'});
    menuSlots.filter(s=> s.bandIdx===bandIdx).forEach(slot=>{
      slotsRow.appendChild(buildMenuSlotCard(slot));
    });
    bandEl.appendChild(slotsRow);
    container.appendChild(bandEl);
  });
}

function buildMenuSlotCard(slot){
  const card = el('div',{class:'menu-slot-card'});
  const label = el('p',{class:'menu-slot-label'});
  label.textContent = `Quest ${slot.slotIdx+1}`;
  card.appendChild(label);

  const worldGrid = el('div',{class:'world-grid menu-mini-grid'});
  WORLDS.forEach(w=>{
    const btn = el('button',{class:'world-btn','aria-pressed': slot.world===w.key, type:'button'});
    btn.innerHTML = `<b>${w.key}</b>${w.desc}`;
    btn.onclick = ()=>{ slot.world = w.key; renderMenuView(); };
    worldGrid.appendChild(btn);
  });
  card.appendChild(worldGrid);

  const levelRow = el('div',{class:'level-row'});
  LEVELS.forEach(l=>{
    const btn = el('button',{class:'level-btn','aria-pressed': slot.level===l.key, type:'button'});
    btn.innerHTML = `<span>${l.key}</span><span class="desc">${l.desc}</span>`;
    btn.onclick = ()=>{ slot.level = l.key; if(slot.level!=='Seeker') slot.difficulty='Easy'; renderMenuView(); };
    levelRow.appendChild(btn);
  });
  card.appendChild(levelRow);

  if(slot.level === 'Seeker'){
    const difficultyRow = el('div',{class:'level-row'});
    DIFFICULTIES.forEach(d=>{
      const btn = el('button',{class:'level-btn','aria-pressed': slot.difficulty===d.key, type:'button'});
      btn.innerHTML = `<span>${d.key}</span><span class="desc">${d.desc}</span>`;
      btn.onclick = ()=>{ slot.difficulty = d.key; renderMenuView(); };
      difficultyRow.appendChild(btn);
    });
    card.appendChild(difficultyRow);
  }

  const coreSel = el('select');
  coreSel.innerHTML = '<option value="">— choose a Core Skill —</option>';
  const mathGroup = el('optgroup',{label:'Math'});
  MATH_SKILLS.forEach(s=> mathGroup.appendChild(el('option',{value:'math:::'+s, html:s})));
  const sciGroup = el('optgroup',{label:'Science'});
  SCIENCE_SKILLS.forEach(s=> sciGroup.appendChild(el('option',{value:'science:::'+s, html:s})));
  coreSel.appendChild(mathGroup); coreSel.appendChild(sciGroup);
  if(slot.subject && slot.coreSkill) coreSel.value = slot.subject+':::'+slot.coreSkill;
  coreSel.onchange = ()=>{
    if(!coreSel.value){ slot.coreSkill=null; slot.subject=null; }
    else { const [subj, name] = coreSel.value.split(':::'); slot.subject=subj; slot.coreSkill=name; }
  };
  card.appendChild(coreSel);

  const langSel = el('select');
  langSel.innerHTML = '<option value="">— integrate organically (default) —</option>';
  LANGUAGE_SKILLS.forEach(s=> langSel.appendChild(el('option',{value:s, html:s})));
  langSel.value = slot.langSkill || '';
  langSel.onchange = ()=>{ slot.langSkill = langSel.value; };
  card.appendChild(langSel);

  return card;
}

function renderMenuRoster(){
  const roster = document.getElementById('menuRoster');
  roster.innerHTML = '';
  menuResults.forEach(r=>{
    const row = el('div',{class:'saved-item'});
    const left = el('span');
    left.innerHTML = `<b>${r.brief.questId}</b> · ${r.bandLabel} · ${r.world}/${r.level}/${r.difficulty} · ${r.coreSkill} — ${r.brief.missionTitle}`;
    const btn = el('button',{type:'button'});
    btn.textContent = 'View';
    btn.disabled = menuGenerating;
    btn.onclick = ()=>{ switchToSingleView(); reopenQuest(r); };
    row.appendChild(left); row.appendChild(btn);
    roster.appendChild(row);
  });
}

/* Generates each configured slot one at a time, reusing generateAll() and the global
   `state` unchanged — sequential so only one Quest's folders ever exist in the DOM at once. */
async function generateMenu(){
  const slots = menuSlots;
  const statusEl = document.getElementById('menuStatus');
  if(slots.length===0){ statusEl.textContent = 'Add at least one Quest to the menu.'; return; }
  const incompleteIdx = slots.findIndex(s=> !s.world || !s.level || !s.coreSkill);
  if(incompleteIdx !== -1){
    statusEl.textContent = `Quest ${incompleteIdx+1} (${slots[incompleteIdx].bandLabel}) is missing a World, Level, or Core Skill.`;
    return;
  }

  document.getElementById('generateMenuBtn').disabled = true;
  menuGenerating = true;
  menuResults = [];
  renderMenuRoster();

  for(let i=0;i<slots.length;i++){
    const slot = slots[i];
    statusEl.textContent = `Generating Quest ${i+1} of ${slots.length} — ${slot.bandLabel}…`;
    state.world = slot.world;
    state.level = slot.level;
    state.difficulty = slot.difficulty || 'Easy';
    state.coreSkill = slot.coreSkill;
    state.subject = slot.subject;
    state.langSkill = slot.langSkill || '';
    await generateAll();
    menuResults.push({
      bandLabel: slot.bandLabel, world: state.world, level: state.level, difficulty: state.difficulty,
      coreSkill: state.coreSkill, langSkill: state.langSkill,
      brief: state.brief, sections: {...state.sections},
    });
    renderMenuRoster();
  }

  menuGenerating = false;
  renderMenuRoster();
  statusEl.textContent = `Done — ${slots.length} Quests generated.`;
  document.getElementById('generateMenuBtn').disabled = false;
}

document.getElementById('generateBtn').onclick = generateAll;
document.getElementById('generateMenuBtn').onclick = generateMenu;
document.getElementById('modeSingleBtn').onclick = switchToSingleView;
document.getElementById('modeMenuBtn').onclick = switchToMenuView;
document.getElementById('printBtn').onclick = ()=> window.print();
renderWorldGrid();
renderLevelRow();
renderDifficultyRow();
updateDifficultyVisibility();
renderCoreSkillSelect();
renderLangSelect();
renderSavedList();
rebuildMenuSlots();
renderMenuView();
</script>
</body>
</html>
