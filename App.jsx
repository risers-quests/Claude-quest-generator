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
</style>
</head>
<body>
<div class="app">

  <div class="masthead">
    <h1>Risers' Quests</h1>
    <div class="tag">Generator · Guide Use Only</div>
  </div>

  <div class="layout">

    <div class="intake">
      <p class="eyebrow">Request Form</p>
      <h2>New Quest</h2>

      <label>World</label>
      <div class="world-grid" id="worldGrid"></div>

      <label>Level</label>
      <div class="level-row" id="levelRow"></div>

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

    <div class="case-area" id="caseArea">
      <div class="placeholder">No active case. Fill out the request form and generate a Quest to begin.</div>
    </div>

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
  {key:'Wanderer', desc:'most guided'},
  {key:'Seeker', desc:'some open decisions'},
  {key:'Explorer', desc:'self-directed'},
  {key:'Pathfinder', desc:'fully open'},
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

const MASTER_SPEC = `You are the generation engine for "Risers' Quests" — a real program where children aged 8-14 ("Risers") complete short, hands-on 3-day projects ("Quests") at school, guided by an adult ("the Guide"). You generate one Quest at a time from a World, a Level, and a Core Skill, plus an optional Language Skill. Follow every rule below exactly.

LEVELS (least to most self-directed): Wanderer, Seeker, Explorer, Pathfinder. The story is always equally high-stakes at every Level — only self-direction changes.
- Wanderer: explicit, step-by-step, written entirely at the Riser's own reading level. No Guide facilitation assumed.
- Seeker: clear steps with some open decisions.
- Explorer: loose guidance/prompts; the Riser has to find their own path.
- Pathfinder: the most fluid and open; minimal scaffolding.

WORLDS: Fantasy (a world that doesn't exist; real science separates fact from fiction), Adventure (a real-world crisis at a scale the Riser can design a response for), Mystery (the scientific explanation behind a real event), Drama (scientific/philosophical thinking applied to debate, art, or performance).

FIVE COMPONENTS (Links is conditional):
1. Hook Card — punchy, escalating, high-stakes scene-setting, never a flat paragraph, ending on a short imperative. Footer shows Core Skill and Level ONLY — never Subject.
2. Pre-Quest Check — 5 self-administered questions: one concept multiple-choice, then four applied short-answer problems with working space, increasing in difficulty. The final question is quietly isomorphic to the Quest's real mechanic without revealing the mission. No answer key. Close with tiered self-scoring guidance naming the SPECIFIC questions that are the real gating signal.
3. Archives — Riser-facing reading for Stage 1. Blends a real historical/factual narrative anchor, genuinely interesting tangential facts, and the core content knowledge needed, narratively. If a procedural gap is intentional (Links will be provided), stop short of the technique and tease that more is needed. If no Links will be provided, the Archives MUST be fully self-contained. Ends by handing over the mission-specific data/problem.
4. Links — ONLY if Level is exactly "Explorer" AND a genuine procedural gap exists. Real, well-known, stable educational websites only (e.g. mathsisfun.com, BBC Bitesize, NASA, Khan Academy) — never invent obscure or fictional URLs. State explicitly this is sent only after the Archives are read, never before.
5. Quest Pack — the full Quest, exactly this six-stage skeleton, always 3 Days:
   Day 1: Stage 1 "Deep Dive" (read the Archives) → Stage 2 "Brain Dump" (free processing; Riser picks a format: Mind Map / List / Sketch / Connect / Write).
   Day 2: Stage 3 "Blueprint" — Part A: commit to a prediction BEFORE investigating; Part B: design a recording tool BEFORE Stage 4 (Table / Tracker / Grid / Tree / Flowchart). Then Stage 4, named "Experiment Zero" if the Core Skill is Science or "Data Analysis" if the Core Skill is Math — do the real work step by step, reach a conclusion, then explicitly compare it back to the Stage 3 prediction.
   Day 3: Stage 5 "What If" (a new, un-researchable twist testing transfer, not lookup — no single right answer, but reasoning must be built on the evidence) → Stage 6 "Leave a Door Open" (the Riser writes ONE genuinely new question, not a summary).
   Close with "Present Your Case" — Day 3 presentation to the group and Guide. Give explicit guidance for the reflection question; leave the presentation itself open for the Guide to facilitate live.
   Include a materials list ONLY if the Quest is physically hands-on. Omit entirely if calculation/investigation-only.
   Prescriptiveness must scale exactly to Level as defined above.

BRANDING: brand name is "Risers' Quests". Quest ID is World-letter + number, e.g. "M-07". Use the field label "Level", never "Difficulty". Never print "Subjects," "Format," "Track," or "Academic" anywhere.

LANGUAGE: never a standalone Quest target. By default it's woven organically into existing writing tasks. If a specific Language Skill is given, deliberately integrate that exact sub-skill into the relevant stage(s) instead.

TONE: high-stakes and immersive at every Level. Write for a real child aged 8-14 — never patronizing, never cartoonish. Ground every Quest in something that could really be true, unless the World is Fantasy.`;

let state = { world:null, level:null, coreSkill:null, subject:null, langSkill:'', brief:null, sections:{} };

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
    btn.onclick = ()=>{ state.level=l.key; renderLevelRow(); updateHint(); };
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

async function callClaude(system, user, jsonMode=false){
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      model:'claude-sonnet-4-6',
      max_tokens:1000,
      system: jsonMode ? system + '\n\nRespond with ONLY valid JSON. No preamble, no markdown fences, no commentary.' : system,
      messages:[{role:'user', content:user}]
    })
  });
  if(!res.ok) throw new Error('API error ('+res.status+')');
  const data = await res.json();
  const text = data.content.map(b=>b.text||'').join('\n');
  return text;
}

function stripJsonFence(text){
  return text.replace(/```json|```/g,'').trim();
}

function buildContextLine(){
  return `World: ${state.world}\nLevel: ${state.level}\nCore Skill: ${state.coreSkill}\nSubject: ${state.subject}\nLanguage Skill: ${state.langSkill || 'none — integrate organically'}`;
}

const SECTION_ORDER = ['hook','preQuestCheck','archives','links','questPack'];
const SECTION_LABELS = { hook:'Hook Card', preQuestCheck:'Pre-Quest Check', archives:'Archives', links:'Links', questPack:'Quest Pack' };

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
      `Generate the foundational Mission Brief for a new Quest.\n${buildContextLine()}\n\nRespond with this exact JSON shape: {"questId": string (World-letter + 2-digit number, e.g. "M-07"), "missionTitle": string, "stage4Name": string ("Experiment Zero" or "Data Analysis" per the rules), "requiresLinks": boolean (true only if Level is exactly "Explorer" AND a genuine procedural gap is needed), "linkGapDescription": string or null}`,
      true
    );
    brief = JSON.parse(stripJsonFence(briefRaw));
    if(state.level !== 'Explorer') brief.requiresLinks = false; // hard rule, enforced regardless of model output
    state.brief = brief;
  } catch(e){
    sealRow.innerHTML = `<p class="error-note">Could not draft the mission brief — ${e.message}. <button onclick="generateAll()">Retry</button></p>`;
    document.getElementById('generateBtn').disabled = false;
    return;
  }

  sealRow.innerHTML = `<div class="seal"><span class="qid">${brief.questId}</span><span class="title">${brief.missionTitle}</span></div>`;

  const sectionsToBuild = SECTION_ORDER.filter(s => s!=='links' || brief.requiresLinks);
  sectionsToBuild.forEach(key=>{
    caseArea.appendChild(buildFolderSkeleton(key));
  });

  await Promise.all(sectionsToBuild.map(key => generateSection(key)));
  saveCurrentQuest();
  renderSavedList();
  document.getElementById('generateBtn').disabled = false;
}

function buildFolderSkeleton(key){
  const folder = el('div',{class:'folder', id:'folder-'+key});
  const tab = el('div',{class:'folder-tab'});
  tab.innerHTML = `<h3>${SECTION_LABELS[key]}</h3><span class="status mono"><span class="loading-pulse"></span> generating…</span>`;
  tab.onclick = ()=>{
    const body = document.getElementById('body-'+key);
    if(body) body.classList.toggle('collapsed');
  };
  const body = el('div',{class:'folder-body', id:'body-'+key});
  body.textContent = '';
  folder.appendChild(tab);
  folder.appendChild(body);
  return folder;
}

function sectionPrompt(key, brief){
  const ctx = `${buildContextLine()}\nQuest ID: ${brief.questId}\nMission Title: ${brief.missionTitle}\nStage 4 Name: ${brief.stage4Name}`;
  if(key==='hook') return `${ctx}\n\nWrite the Hook Card now, following the Hook Card rules exactly.`;
  if(key==='preQuestCheck') return `${ctx}\n\nWrite the Pre-Quest Check now, following the rules exactly. Do not reveal the mission's specific scenario, only test the prerequisite skill.`;
  if(key==='archives') return `${ctx}\nIntentional procedural gap (Links will follow): ${brief.requiresLinks}\nGap description if any: ${brief.linkGapDescription||'none'}\n\nWrite the Archives now, following the rules exactly.`;
  if(key==='links') return `${ctx}\nGap to fill: ${brief.linkGapDescription}\n\nWrite the Links document now, following the rules exactly.`;
  if(key==='questPack') return `${ctx}\n\nWrite the full Quest Pack now, following the six-stage skeleton exactly, calibrated to Level "${state.level}".`;
}

async function generateSection(key){
  try {
    const text = await callClaude(MASTER_SPEC, sectionPrompt(key, state.brief));
    state.sections[key] = text;
    const body = document.getElementById('body-'+key);
    body.textContent = text;
    const tab = document.querySelector('#folder-'+key+' .status');
    tab.innerHTML = 'done';
    addFolderActions(key);
  } catch(e){
    const body = document.getElementById('body-'+key);
    body.innerHTML = `<span class="error-note">Failed to generate — ${e.message}</span>`;
    const tab = document.querySelector('#folder-'+key+' .status');
    tab.innerHTML = `<button onclick="retrySection('${key}')" style="background:none;border:none;color:#fff;text-decoration:underline;font-size:11px;">retry</button>`;
  }
}

async function retrySection(key){
  const tab = document.querySelector('#folder-'+key+' .status');
  tab.innerHTML = '<span class="loading-pulse"></span> generating…';
  await generateSection(key);
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
  actions.appendChild(copyBtn);
  folder.appendChild(actions);
}

async function saveCurrentQuest(){
  if(!state.brief) return;
  try {
    await window.storage.set('quest:'+state.brief.questId, JSON.stringify({
      brief: state.brief, world: state.world, level: state.level,
      coreSkill: state.coreSkill, langSkill: state.langSkill, sections: state.sections
    }));
  } catch(e){ /* storage best-effort, don't block UI */ }
}

async function renderSavedList(){
  const listEl = document.getElementById('savedList');
  try {
    const res = await window.storage.list('quest:');
    const keys = (res && res.keys) || [];
    if(keys.length===0){ listEl.innerHTML = '<p class="empty-note">None generated yet.</p>'; return; }
    listEl.innerHTML = '';
    for(const k of keys){
      try {
        const rec = await window.storage.get(k);
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
  state = { world:data.world, level:data.level, coreSkill:data.coreSkill, subject:null,
            langSkill:data.langSkill, brief:data.brief, sections:data.sections };
  const caseArea = document.getElementById('caseArea');
  caseArea.innerHTML = '';
  const sealRow = el('div');
  sealRow.innerHTML = `<div class="seal"><span class="qid">${data.brief.questId}</span><span class="title">${data.brief.missionTitle}</span></div>`;
  caseArea.appendChild(sealRow);
  Object.keys(data.sections).forEach(key=>{
    const folder = buildFolderSkeleton(key);
    caseArea.appendChild(folder);
    document.getElementById('body-'+key).textContent = data.sections[key];
    document.querySelector('#folder-'+key+' .status').textContent = 'done';
    addFolderActions(key);
  });
}

document.getElementById('generateBtn').onclick = generateAll;
renderWorldGrid();
renderLevelRow();
renderCoreSkillSelect();
renderLangSelect();
renderSavedList();
</script>
</body>
</html>
