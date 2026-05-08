
(() => {
'use strict';

const VERSION = '2.00';
const STORAGE_KEY = 'whiskylog_v200_clean_state';
const RESTORE_KEY = 'whiskylog_v200_restore_points';

const T = {
  no: {
    brand:'PREMIUM BRENNEVINSJOURNAL', title:"Kenneth's WhiskyLog", version:'WhiskyLog v2.00',
    home:'Hjem', back:'Tilbake', save:'Lagre', cancel:'Avbryt', edit:'Rediger', delete:'Slett', confirm:'OK',
    homeSub:'Din personlige logg for flasker, smakinger, beholdning og fremtidige kjøp.',
    myStock:'Min beholdning', myStockSub:'Uåpnede, åpnede og tomme flasker samlet på ett sted.',
    logging:'Loggføring', loggingSub:'Registrer smaking, korriger beholdning og legg til flasker.',
    overview:'Oversikt / statistikk', overviewSub:'Rangering, score, verdi og historikk.',
    wishlist:'Ønskeliste', wishlistSub:'Fremtidige flasker og kjøpsideer.',
    settings:'Innstillinger', settingsSub:'Navn, valuta, språk og backup.',
    unopened:'Uåpnede flasker', opened:'Åpnede flasker', empty:'Tomme flasker',
    bottles:'flasker', value:'verdi', stockVolume:'volum i beholdning',
    library:'Flaskebibliotek', librarySub:'Grunndata kan kun redigeres her.',
    libraryHelp:'Bruk «Lagre og legg til neste» når du legger inn flere flasker. Lagrede flasker vises straks når du legger dem inn i beholdning.',
    name:'Navn', distillery:'Destilleri / produsent', type:'Type', chooseType:'Velg type',
    abv:'Alkohol %', volume:'Flaskevolum ml', fullWeight:'Vekt full flaske g', region:'Region / land',
    image:'Bilde', libraryComment:'Bibliotekkommentar', saveLibrary:'Lagre i bibliotek', saveNext:'Lagre og legg til neste', clearForm:'Tøm skjema',
    purchasedBottle:'Kjøpt flaske', addStock:'Kjøpt flaske', addStockSub:'Velg flaske, pris, kjøpsdato og kommentar.',
    bottle:'Flaske', price:'Pris', purchaseDate:'Kjøpsdato', comment:'Kommentar', currentWeight:'Nåværende vekt g', currentVolume:'Restvolum ml',
    registerTasting:'Registrer smaking', tastingSub:'Score, volum og smaksnotater.',
    tastingDate:'Smaksdato', tastingType:'Smakstype', neat:'Ren', water:'Med vann', drops:'Antall dråper vann',
    tastingMl:'Mengde ml', appearance:'Utseende 1–10', nose:'Lukt 1–10', neatTaste:'Smak ren 1–10', waterTaste:'Smak med vann 1–10', finish:'Ettersmak 1–10', notes:'Notater',
    correctStock:'Korriger beholdning', correctStockSub:'Juster vekt eller volum uten smaking.',
    newWeight:'Ny nåværende vekt g', newVolume:'Eller restvolum ml', saveCorrection:'Lagre korrigering',
    noItems:'Ingen registreringer ennå.', search:'Søk', status:'Status', actions:'Handlinger',
    ownerName:'Navn', currency:'Valuta', language:'Språk', defaultTasting:'Standard smaksvolum ml', norwegian:'Norsk', english:'Engelsk',
    saveSettings:'Lagre innstillinger', backup:'Backup', restorePoints:'Gjenopprettingspunkter',
    restorePointsSub:'Opprett et internt gjenopprettingspunkt før rydding eller større endringer. Lagres kun i denne nettleseren/appen på denne enheten.',
    createRestore:'Opprett gjenopprettingspunkt', restore:'Gjenopprett', backupFile:'Lagre backup til fil', restoreFile:'Hent backup fra fil',
    backupIncludes:'Backup inkluderer bibliotek, flasker, bilder lagret i appen, smakinger, kommentarer, ønskeliste og innstillinger.',
    deletePermanent:'Slette permanent?', deleteLibraryWarn:'Dette sletter også tilknyttede beholdningsflasker, smakinger og kommentarer. Dette kan ikke angres.',
    saved:'Lagret.', restored:'Gjenopprettet.', chooseBottle:'Velg flaske', averageScore:'Gjennomsnitt', bottleRanking:'Flaskerangering',
    noBottleSelected:'Velg en flaske først.', missingLibrary:'Legg først inn en flaske i biblioteket.',
    purchased:'Kjøpt', left:'igjen', lastTasted:'Sist smakt', openedDate:'Åpnet'
  },
  en: {
    brand:'PREMIUM SPIRITS JOURNAL', title:"Kenneth's WhiskyLog", version:'WhiskyLog v2.00',
    home:'Home', back:'Back', save:'Save', cancel:'Cancel', edit:'Edit', delete:'Delete', confirm:'OK',
    homeSub:'Personal logging for bottles, tastings, stock and future purchases.',
    myStock:'My stock', myStockSub:'Unopened, opened and empty bottles in one place.',
    logging:'Logging', loggingSub:'Register tastings, correct stock and add bottles.',
    overview:'Overview / statistics', overviewSub:'Ranking, scores, value and history.',
    wishlist:'Wishlist', wishlistSub:'Future bottles and purchase ideas.',
    settings:'Settings', settingsSub:'Name, currency, language and backup.',
    unopened:'Unopened bottles', opened:'Opened bottles', empty:'Empty bottles',
    bottles:'bottles', value:'value', stockVolume:'stock volume',
    library:'Bottle library', librarySub:'Core bottle data can only be edited here.',
    libraryHelp:'Use “Save & add next” when entering several bottles. Saved bottles appear immediately when adding to stock.',
    name:'Name', distillery:'Distillery / producer', type:'Type', chooseType:'Choose type',
    abv:'ABV %', volume:'Bottle volume ml', fullWeight:'Full bottle weight g', region:'Region / country',
    image:'Image', libraryComment:'Library comment', saveLibrary:'Save to library', saveNext:'Save & add next', clearForm:'Clear form',
    purchasedBottle:'Purchased bottle', addStock:'Purchased bottle', addStockSub:'Choose bottle, price, purchase date and comment.',
    bottle:'Bottle', price:'Price', purchaseDate:'Purchase date', comment:'Comment', currentWeight:'Current weight g', currentVolume:'Remaining volume ml',
    registerTasting:'Register tasting', tastingSub:'Score, volume and tasting notes.',
    tastingDate:'Tasting date', tastingType:'Tasting type', neat:'Neat', water:'With water', drops:'Water drops',
    tastingMl:'Amount ml', appearance:'Appearance 1–10', nose:'Nose 1–10', neatTaste:'Taste neat 1–10', waterTaste:'Taste with water 1–10', finish:'Finish 1–10', notes:'Notes',
    correctStock:'Correct stock', correctStockSub:'Adjust weight or volume without tasting.',
    newWeight:'New current weight g', newVolume:'Or remaining volume ml', saveCorrection:'Save correction',
    noItems:'No items yet.', search:'Search', status:'Status', actions:'Actions',
    ownerName:'Name', currency:'Currency', language:'Language', defaultTasting:'Default tasting volume ml', norwegian:'Norwegian', english:'English',
    saveSettings:'Save settings', backup:'Backup', restorePoints:'Restore points',
    restorePointsSub:'Create an internal restore point before cleanup or larger edits. Stored only in this browser/app on this device.',
    createRestore:'Create restore point', restore:'Restore', backupFile:'Backup to file', restoreFile:'Restore from file',
    backupIncludes:'Backup includes library, bottles, images saved in the app, tastings, comments, wishlist and settings.',
    deletePermanent:'Delete permanently?', deleteLibraryWarn:'This also deletes related stock bottles, tastings and comments. This cannot be undone.',
    saved:'Saved.', restored:'Restored.', chooseBottle:'Choose bottle', averageScore:'Average score', bottleRanking:'Bottle ranking',
    noBottleSelected:'Choose a bottle first.', missingLibrary:'Add a bottle to the library first.',
    purchased:'Purchased', left:'left', lastTasted:'Last tasted', openedDate:'Opened'
  }
};

const TYPES = ['Whisky','Bourbon','Rye','Rum','Cognac','Brandy','Armagnac','Tequila','Mezcal','Gin','Vodka','Likør','Soju','Annet'];

function defaultState(){
  return {
    settings:{ownerName:'Kenneth',currency:'NOK',language:'no',defaultTastingMl:20},
    library:[],
    bottles:[],
    tastings:[],
    comments:[],
    wishlist:[]
  };
}
let state = load();

function load(){
  try{
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return data ? merge(defaultState(), data) : defaultState();
  }catch(e){ return defaultState(); }
}
function merge(a,b){
  if(Array.isArray(a)) return Array.isArray(b) ? b : a;
  const out = {...a};
  for(const k of Object.keys(b||{})){
    out[k] = (a[k] && typeof a[k] === 'object' && !Array.isArray(a[k])) ? merge(a[k], b[k]) : b[k];
  }
  return out;
}
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function uid(){ return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8); }
function tr(k){ return (T[state.settings.language] || T.no)[k] || T.no[k] || k; }
function esc(s){ return String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function num(v){ const n = Number(String(v ?? '').replace(',','.')); return Number.isFinite(n) ? n : 0; }
function money(v){ return `${num(v).toFixed(2)} ${state.settings.currency || 'NOK'}`; }
function today(){ return new Date().toISOString().slice(0,10); }
function getLibrary(id){ return state.library.find(x => x.id === id); }
function getBottle(id){ return state.bottles.find(x => x.id === id); }
function img(item){ return item?.image ? `<img class="thumb" src="${item.image}" alt="">` : `<div class="thumbFallback">🥃</div>`; }
function bottleBase(b){ return getLibrary(b.libraryId) || {}; }
function density(abv){ return 0.9982 + (0.897 - 0.9982) * (num(abv)/100); }
function estimatedEmptyWeight(base){
  const full = num(base.fullWeight), vol = num(base.volume), abv = num(base.abv);
  if(!full || !vol) return 0;
  return Math.max(0, Math.round(full - vol * density(abv)));
}
function volumeFromWeight(bottle){
  const base = bottleBase(bottle);
  const full = num(base.fullWeight), empty = estimatedEmptyWeight(base), current = num(bottle.currentWeight);
  if(!full || !empty || !current) return num(bottle.currentVolume) || num(base.volume);
  const ratio = (current - empty) / Math.max(1, full - empty);
  return Math.max(0, Math.min(num(base.volume), Math.round(num(base.volume) * ratio)));
}
function tastedVolume(bottleId){ return state.tastings.filter(t => t.bottleId === bottleId).reduce((a,t)=>a+num(t.ml),0); }
function bottleVolume(b){
  if(num(b.currentVolume)) return num(b.currentVolume);
  if(num(b.currentWeight)) return volumeFromWeight(b);
  const base = bottleBase(b);
  return Math.max(0, num(base.volume) - tastedVolume(b.id));
}
function bottleValue(b){
  const base = bottleBase(b);
  const vol = bottleVolume(b), total = num(base.volume);
  return total ? num(b.price) * vol / total : 0;
}
function bottleStatus(b){
  const vol = bottleVolume(b);
  if(vol <= 0) return 'empty';
  if(state.tastings.some(t => t.bottleId === b.id) || b.openedDate) return 'opened';
  return 'unopened';
}
function averageScoreForLibrary(libraryId){
  const bottleIds = state.bottles.filter(b => b.libraryId === libraryId).map(b => b.id);
  const scores = state.tastings.filter(t => bottleIds.includes(t.bottleId)).map(t => {
    const vals = [t.appearance,t.nose,t.neatTaste,t.waterTaste,t.finish].map(num).filter(Boolean);
    return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 0;
  }).filter(Boolean);
  return scores.length ? scores.reduce((a,b)=>a+b,0)/scores.length : 0;
}

const app = document.getElementById('app');
let page = 'home';
let editLibraryId = '';
let editBottleId = '';
let editTastingId = '';

function shell(inner, backTo='home'){
  app.innerHTML = `
    <main class="app">
      <div class="kicker">${tr('brand')}</div>
      <h1>${esc(state.settings.ownerName || 'Kenneth')}'s WhiskyLog</h1>
      ${page === 'home' ? `<div class="version">${tr('version')}</div>` : ''}
      ${page !== 'home' ? `<button class="ghost" onclick="go('${backTo}')">← ${tr('back')}</button>` : ''}
      ${inner}
    </main>`;
}
window.go = function(p){
  page = p;
  editLibraryId = editBottleId = editTastingId = '';
  render();
};

function render(){
  if(page === 'home') renderHome();
  else if(page === 'stock') renderStock();
  else if(page === 'logging') renderLogging();
  else if(page === 'library') renderLibrary();
  else if(page === 'addStock') renderAddStock();
  else if(page === 'tasting') renderTasting();
  else if(page === 'correctStock') renderCorrectStock();
  else if(page === 'overview') renderOverview();
  else if(page === 'wishlist') renderWishlist();
  else if(page === 'settings') renderSettings();
}
function renderHome(){
  shell(`
    <section class="hero"><h2>${tr('home')}</h2><p class="sub">${tr('homeSub')}</p></section>
    <section class="grid">
      ${tile('stock','🥃',tr('myStock'),tr('myStockSub'))}
      ${tile('logging','📝',tr('logging'),tr('loggingSub'))}
      ${tile('overview','📊',tr('overview'),tr('overviewSub'))}
      ${tile('wishlist','⭐',tr('wishlist'),tr('wishlistSub'))}
      ${tile('settings','⚙️',tr('settings'),tr('settingsSub'))}
    </section>
  `);
}
function tile(to, icon, title, sub){
  return `<div class="tile" onclick="go('${to}')"><div class="icon">${icon}</div><h3>${title}</h3><div class="sub">${sub}</div></div>`;
}

function stockStats(status){
  const bs = state.bottles.filter(b => bottleStatus(b) === status);
  return {count:bs.length, value:bs.reduce((a,b)=>a+bottleValue(b),0), volume:bs.reduce((a,b)=>a+bottleVolume(b),0)};
}
function renderStock(){
  const statuses = [['unopened',tr('unopened')],['opened',tr('opened')],['empty',tr('empty')]];
  shell(`
    <section class="hero"><h2>${tr('myStock')}</h2><p class="sub">${tr('myStockSub')}</p></section>
    <section class="stockCards">${statuses.map(([s,label])=>{
      const st=stockStats(s);
      return `<div class="card"><h2>${label}</h2><p class="sub">${st.count} ${tr('bottles')} · ${money(st.value)} · ${Math.round(st.volume)} ml</p></div>`;
    }).join('')}</section>
    <section class="card"><h2>${tr('bottle')}</h2><div class="list">${stockList()}</div></section>
    <section class="actions">
      <button class="primary" onclick="go('addStock')">${tr('addStock')}</button>
      <button class="ghost" onclick="go('tasting')">${tr('registerTasting')}</button>
      <button class="ghost" onclick="go('correctStock')">${tr('correctStock')}</button>
    </section>
  `);
}
function stockList(){
  if(!state.bottles.length) return `<div class="sub">${tr('noItems')}</div>`;
  return state.bottles.map(b=>{
    const base=bottleBase(b), status=bottleStatus(b), vol=bottleVolume(b);
    return `<div class="item" onclick="editBottle('${b.id}')">
      ${img(base)}
      <div><div class="title">${esc(base.name||'')}</div>
      <div class="meta">${esc(base.type||'')} · ${Math.round(vol)} ml ${tr('left')} · ${money(bottleValue(b))}</div>
      <div class="small">${tr('status')}: ${tr(status)}</div></div>
      <div class="actions"><button class="ghost">${tr('edit')}</button><button class="danger" onclick="event.stopPropagation();deleteBottle('${b.id}')">${tr('delete')}</button></div>
    </div>`;
  }).join('');
}
window.editBottle = id => { editBottleId=id; page='addStock'; render(); };
window.deleteBottle = id => {
  const b=getBottle(id), base=bottleBase(b||{});
  if(!confirm(`${tr('deletePermanent')} ${base.name||''}`)) return;
  state.bottles = state.bottles.filter(x=>x.id!==id);
  state.tastings = state.tastings.filter(x=>x.bottleId!==id);
  state.comments = state.comments.filter(x=>x.bottleId!==id);
  save(); render();
};

function renderLogging(){
  shell(`
    <section class="hero"><h2>${tr('logging')}</h2><p class="sub">${tr('loggingSub')}</p></section>
    <section class="grid">
      ${tile('tasting','🥃',tr('registerTasting'),tr('tastingSub'))}
      ${tile('correctStock','⚖️',tr('correctStock'),tr('correctStockSub'))}
      ${tile('addStock','➕',tr('addStock'),tr('addStockSub'))}
      ${tile('library','📚',tr('library'),tr('librarySub'))}
    </section>
  `);
}

function renderLibrary(){
  const item = editLibraryId ? getLibrary(editLibraryId) || {} : {};
  shell(`
    <section class="hero"><h2>${tr('library')}</h2><p class="sub">${tr('librarySub')}</p><p class="sub">${tr('libraryHelp')}</p></section>
    <section class="card">
      <form id="libraryForm">
        <input type="hidden" name="id" value="${esc(item.id||'')}">
        <label>${tr('name')}</label><input name="name" value="${esc(item.name||'')}" autocomplete="off" required>
        <label>${tr('distillery')}</label><input name="distillery" value="${esc(item.distillery||'')}" autocomplete="off">
        <div class="formgrid">
          <div><label>${tr('type')}</label><select name="type"><option value="">${tr('chooseType')}</option>${TYPES.map(x=>`<option ${item.type===x?'selected':''}>${x}</option>`).join('')}</select></div>
          <div><label>${tr('abv')}</label><input name="abv" inputmode="decimal" value="${esc(item.abv||'')}"></div>
          <div><label>${tr('volume')}</label><input name="volume" inputmode="numeric" value="${esc(item.volume||'')}"></div>
        </div>
        <label>${tr('fullWeight')}</label><input name="fullWeight" inputmode="numeric" value="${esc(item.fullWeight||'')}">
        <label>${tr('region')}</label><input name="region" value="${esc(item.region||'')}">
        <label>${tr('image')}</label><input name="image" type="file" accept="image/*">
        <label>${tr('libraryComment')}</label><textarea name="comment">${esc(item.comment||'')}</textarea>
        <div class="actions">
          <button class="primary" type="submit">${tr('saveLibrary')}</button>
          <button class="ghost" type="button" onclick="saveLibraryForm(true)">${tr('saveNext')}</button>
          <button class="ghost" type="button" onclick="editLibraryId='';render()">${tr('clearForm')}</button>
        </div>
      </form>
    </section>
    <section class="card"><h2>${tr('library')}</h2><div class="list">${libraryList()}</div></section>
  `,'logging');
  document.getElementById('libraryForm').onsubmit = e => { e.preventDefault(); saveLibraryForm(false); };
}
function libraryList(){
  if(!state.library.length) return `<div class="sub">${tr('noItems')}</div>`;
  return state.library.map(b=>`<div class="item">
    ${img(b)}
    <div><div class="title">${esc(b.name)}</div><div class="meta">${esc(b.type)} · ${esc(b.abv)}% · ${esc(b.volume)} ml</div></div>
    <div class="actions"><button class="ghost" onclick="editLibrary('${b.id}')">${tr('edit')}</button><button class="danger" onclick="deleteLibrary('${b.id}')">${tr('delete')}</button></div>
  </div>`).join('');
}
window.editLibrary = id => { editLibraryId=id; render(); };
window.deleteLibrary = id => {
  const item=getLibrary(id);
  if(!confirm(`${tr('deletePermanent')}\n${item?.name||''}\n\n${tr('deleteLibraryWarn')}`)) return;
  const bottleIds = state.bottles.filter(b=>b.libraryId===id).map(b=>b.id);
  state.library=state.library.filter(x=>x.id!==id);
  state.bottles=state.bottles.filter(x=>x.libraryId!==id);
  state.tastings=state.tastings.filter(x=>!bottleIds.includes(x.bottleId));
  state.comments=state.comments.filter(x=>!bottleIds.includes(x.bottleId));
  save(); render();
};
async function fileToDataUrl(file){
  if(!file) return '';
  return new Promise((resolve,reject)=>{ const r=new FileReader(); r.onload=()=>resolve(r.result); r.onerror=reject; r.readAsDataURL(file); });
}
window.saveLibraryForm = async function(addNext){
  const f=document.getElementById('libraryForm'), fd=new FormData(f);
  const id=fd.get('id') || uid();
  const existing=getLibrary(id) || {};
  const file=f.image.files[0];
  const image=file ? await fileToDataUrl(file) : existing.image || '';
  const item={
    id, name:fd.get('name'), distillery:fd.get('distillery'), type:fd.get('type'),
    abv:fd.get('abv'), volume:fd.get('volume'), fullWeight:fd.get('fullWeight'),
    region:fd.get('region'), image, comment:fd.get('comment')
  };
  if(!item.name){ alert(tr('name')); return; }
  const ix=state.library.findIndex(x=>x.id===id);
  if(ix>=0) state.library[ix]=item; else state.library.push(item);
  save();
  editLibraryId = addNext ? '' : id;
  if(addNext) f.reset();
  render();
};

function libraryOptions(selected=''){
  return `<option value="">${tr('chooseBottle')}</option>` + state.library.map(b=>`<option value="${b.id}" ${selected===b.id?'selected':''}>${esc(b.name)} · ${esc(b.type||'')}</option>`).join('');
}
function renderAddStock(){
  if(!state.library.length){ shell(`<section class="hero"><h2>${tr('addStock')}</h2><p class="sub">${tr('missingLibrary')}</p><button class="primary" onclick="go('library')">${tr('library')}</button></section>`,'logging'); return; }
  const b=editBottleId ? getBottle(editBottleId)||{} : {};
  shell(`
    <section class="hero"><h2>${tr('addStock')}</h2><p class="sub">${tr('addStockSub')}</p></section>
    <section class="card"><form id="stockForm">
      <input type="hidden" name="id" value="${esc(b.id||'')}">
      <label>${tr('bottle')}</label><select name="libraryId" required>${libraryOptions(b.libraryId)}</select>
      <div class="formgrid">
        <div><label>${tr('price')}</label><input name="price" inputmode="decimal" value="${esc(b.price||'')}"></div>
        <div><label>${tr('purchaseDate')}</label><input name="purchaseDate" type="date" value="${esc(b.purchaseDate||today())}"></div>
      </div>
      <label>${tr('currentWeight')}</label><input name="currentWeight" inputmode="numeric" value="${esc(b.currentWeight||'')}">
      <label>${tr('currentVolume')}</label><input name="currentVolume" inputmode="numeric" value="${esc(b.currentVolume||'')}">
      <label>${tr('comment')}</label><textarea name="comment">${esc(b.comment||'')}</textarea>
      <div class="actions"><button class="primary">${tr('save')}</button>${b.id?`<button type="button" class="danger" onclick="deleteBottle('${b.id}')">${tr('delete')}</button>`:''}</div>
    </form></section>
  `,'logging');
  document.getElementById('stockForm').onsubmit=e=>{
    e.preventDefault();
    const fd=new FormData(e.target), id=fd.get('id')||uid();
    const old=getBottle(id)||{};
    const item={...old,id,libraryId:fd.get('libraryId'),price:fd.get('price'),purchaseDate:fd.get('purchaseDate'),currentWeight:fd.get('currentWeight'),currentVolume:fd.get('currentVolume'),comment:fd.get('comment')};
    const ix=state.bottles.findIndex(x=>x.id===id);
    if(ix>=0) state.bottles[ix]=item; else state.bottles.push(item);
    save(); go('stock');
  };
}

function bottleOptions(selected=''){
  const usable=state.bottles.filter(b=>bottleStatus(b)!=='empty');
  return `<option value="">${tr('chooseBottle')}</option>` + usable.map(b=>`<option value="${b.id}" ${selected===b.id?'selected':''}>${esc(bottleBase(b).name)} · ${Math.round(bottleVolume(b))} ml</option>`).join('');
}
function renderTasting(){
  if(!state.bottles.length){ shell(`<section class="hero"><h2>${tr('registerTasting')}</h2><p class="sub">${tr('noItems')}</p></section>`,'logging'); return; }
  const t=editTastingId ? state.tastings.find(x=>x.id===editTastingId)||{} : {};
  shell(`
    <section class="hero"><h2>${tr('registerTasting')}</h2><p class="sub">${tr('tastingSub')}</p></section>
    <section class="card"><form id="tastingForm">
      <input type="hidden" name="id" value="${esc(t.id||'')}">
      <label>${tr('bottle')}</label><select name="bottleId" required>${bottleOptions(t.bottleId)}</select>
      <div class="formgrid">
        <div><label>${tr('tastingDate')}</label><input type="date" name="date" value="${esc(t.date||today())}"></div>
        <div><label>${tr('tastingType')}</label><select name="mode"><option value="neat" ${t.mode!=='water'?'selected':''}>${tr('neat')}</option><option value="water" ${t.mode==='water'?'selected':''}>${tr('water')}</option></select></div>
        <div><label>${tr('drops')}</label><input name="drops" inputmode="numeric" value="${esc(t.drops||'')}"></div>
        <div><label>${tr('tastingMl')}</label><input name="ml" inputmode="numeric" value="${esc(t.ml||state.settings.defaultTastingMl)}"></div>
      </div>
      <div class="formgrid">
        <div><label>${tr('appearance')}</label><input name="appearance" inputmode="numeric" value="${esc(t.appearance||'')}"></div>
        <div><label>${tr('nose')}</label><input name="nose" inputmode="numeric" value="${esc(t.nose||'')}"></div>
        <div><label>${tr('neatTaste')}</label><input name="neatTaste" inputmode="numeric" value="${esc(t.neatTaste||'')}"></div>
        <div><label>${tr('waterTaste')}</label><input name="waterTaste" inputmode="numeric" value="${esc(t.waterTaste||'')}"></div>
        <div><label>${tr('finish')}</label><input name="finish" inputmode="numeric" value="${esc(t.finish||'')}"></div>
      </div>
      <label>${tr('notes')}</label><textarea name="notes">${esc(t.notes||'')}</textarea>
      <div class="actions"><button class="primary">${tr('save')}</button>${t.id?`<button type="button" class="danger" onclick="deleteTasting('${t.id}')">${tr('delete')}</button>`:''}</div>
    </form></section>
    <section class="card"><h2>${tr('registerTasting')}</h2><div class="list">${tastingList()}</div></section>
  `,'logging');
  document.getElementById('tastingForm').onsubmit=e=>{
    e.preventDefault();
    const fd=new FormData(e.target), id=fd.get('id')||uid(), bottleId=fd.get('bottleId');
    const item={id,bottleId,date:fd.get('date'),mode:fd.get('mode'),drops:fd.get('drops'),ml:fd.get('ml'),appearance:fd.get('appearance'),nose:fd.get('nose'),neatTaste:fd.get('neatTaste'),waterTaste:fd.get('waterTaste'),finish:fd.get('finish'),notes:fd.get('notes')};
    const ix=state.tastings.findIndex(x=>x.id===id);
    if(ix>=0) state.tastings[ix]=item; else state.tastings.push(item);
    const b=getBottle(bottleId); if(b && !b.openedDate) b.openedDate=fd.get('date')||today();
    save(); render();
  };
}
function tastingList(){
  if(!state.tastings.length) return `<div class="sub">${tr('noItems')}</div>`;
  return state.tastings.slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))).map(t=>{
    const b=getBottle(t.bottleId), base=bottleBase(b||{});
    const vals=[t.appearance,t.nose,t.neatTaste,t.waterTaste,t.finish].map(num).filter(Boolean);
    const avg=vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 0;
    return `<div class="item" onclick="editTasting('${t.id}')">${img(base)}
      <div><div class="title">${esc(base.name||'')}</div><div class="meta">${esc(t.date)} · ${t.mode==='water'?tr('water'):tr('neat')} · ${esc(t.ml)} ml</div><div class="score">${tr('averageScore')}: ${avg?avg.toFixed(1):'—'}</div></div>
      <div class="actions"><button class="ghost">${tr('edit')}</button><button class="danger" onclick="event.stopPropagation();deleteTasting('${t.id}')">${tr('delete')}</button></div>
    </div>`;
  }).join('');
}
window.editTasting=id=>{ editTastingId=id; render(); };
window.deleteTasting=id=>{ if(!confirm(tr('deletePermanent'))) return; state.tastings=state.tastings.filter(x=>x.id!==id); save(); render(); };

function renderCorrectStock(){
  shell(`
    <section class="hero"><h2>${tr('correctStock')}</h2><p class="sub">${tr('correctStockSub')}</p></section>
    <section class="card"><form id="correctForm">
      <label>${tr('bottle')}</label><select name="bottleId" required>${bottleOptions()}</select>
      <label>${tr('newWeight')}</label><input name="currentWeight" inputmode="numeric">
      <label>${tr('newVolume')}</label><input name="currentVolume" inputmode="numeric">
      <label>${tr('comment')}</label><textarea name="comment"></textarea>
      <button class="primary">${tr('saveCorrection')}</button>
    </form></section>
  `,'logging');
  document.getElementById('correctForm').onsubmit=e=>{
    e.preventDefault();
    const fd=new FormData(e.target), b=getBottle(fd.get('bottleId'));
    if(!b){ alert(tr('noBottleSelected')); return; }
    if(fd.get('currentWeight')) b.currentWeight=fd.get('currentWeight');
    if(fd.get('currentVolume')) b.currentVolume=fd.get('currentVolume');
    state.comments.push({id:uid(),bottleId:b.id,date:new Date().toISOString(),text:fd.get('comment'),type:'correction'});
    save(); go('stock');
  };
}

function renderOverview(){
  const ranked=state.library.map(l=>({l,score:averageScoreForLibrary(l.id)})).filter(x=>x.score).sort((a,b)=>b.score-a.score);
  shell(`
    <section class="hero"><h2>${tr('overview')}</h2><p class="sub">${tr('overviewSub')}</p></section>
    <section class="grid">
      <div class="card"><h2>${money(state.bottles.reduce((a,b)=>a+bottleValue(b),0))}</h2><p class="sub">${tr('value')}</p></div>
      <div class="card"><h2>${Math.round(state.bottles.reduce((a,b)=>a+bottleVolume(b),0))} ml</h2><p class="sub">${tr('stockVolume')}</p></div>
      <div class="card"><h2>${state.tastings.length}</h2><p class="sub">${tr('registerTasting')}</p></div>
    </section>
    <section class="card"><h2>${tr('bottleRanking')}</h2><div class="list">${ranked.length?ranked.map(x=>`<div class="item">${img(x.l)}<div><div class="title">${esc(x.l.name)}</div><div class="score">${x.score.toFixed(1)}/10</div></div></div>`).join(''):`<div class="sub">${tr('noItems')}</div>`}</div></section>
  `);
}
function renderWishlist(){
  shell(`<section class="hero"><h2>${tr('wishlist')}</h2><p class="sub">${tr('wishlistSub')}</p></section><section class="card"><p class="sub">${tr('noItems')}</p></section>`);
}
function renderSettings(){
  shell(`
    <section class="hero"><h2>${tr('settings')}</h2><p class="sub">${tr('settingsSub')}</p></section>
    <section class="card"><form id="settingsForm">
      <label>${tr('ownerName')}</label><input name="ownerName" value="${esc(state.settings.ownerName)}">
      <label>${tr('currency')}</label><input name="currency" value="${esc(state.settings.currency)}">
      <label>${tr('language')}</label><select name="language"><option value="no" ${state.settings.language==='no'?'selected':''}>${tr('norwegian')}</option><option value="en" ${state.settings.language==='en'?'selected':''}>${tr('english')}</option></select>
      <label>${tr('defaultTasting')}</label><input name="defaultTastingMl" inputmode="numeric" value="${esc(state.settings.defaultTastingMl)}">
      <button class="primary">${tr('saveSettings')}</button>
    </form></section>
    <section class="card">
      <h2>${tr('restorePoints')}</h2><p class="sub">${tr('restorePointsSub')}</p>
      <button class="primary" onclick="createRestorePoint()">${tr('createRestore')}</button>
      <div class="list">${restorePointList()}</div>
    </section>
    <section class="card">
      <h2>${tr('backup')}</h2><p class="sub">${tr('backupIncludes')}</p>
      <div class="actions"><button class="primary" onclick="backupToFile()">${tr('backupFile')}</button><button class="ghost" onclick="document.getElementById('restoreFile').click()">${tr('restoreFile')}</button></div>
      <input id="restoreFile" class="hidden" type="file" accept="application/json,.json">
    </section>
  `);
  document.getElementById('settingsForm').onsubmit=e=>{
    e.preventDefault();
    const fd=new FormData(e.target);
    state.settings={ownerName:fd.get('ownerName'),currency:fd.get('currency'),language:fd.get('language'),defaultTastingMl:num(fd.get('defaultTastingMl'))||20};
    save(); render();
  };
  document.getElementById('restoreFile').onchange=e=>{ const f=e.target.files[0]; if(f) restoreFromFile(f); };
}
function restorePointList(){
  let points=[]; try{ points=JSON.parse(localStorage.getItem(RESTORE_KEY)||'[]')||[]; }catch(e){}
  if(!points.length) return `<div class="sub">${tr('noItems')}</div>`;
  return points.map(p=>`<div class="item"><div>↩️</div><div><div class="title">${esc(p.name)}</div><div class="meta">${esc(p.createdAt)} · ${esc(p.version)}</div></div><div class="actions"><button class="ghost" onclick="restorePoint('${p.id}')">${tr('restore')}</button><button class="danger" onclick="deleteRestorePoint('${p.id}')">${tr('delete')}</button></div></div>`).join('');
}
window.createRestorePoint=()=>{
  const name=prompt(tr('restorePoints'), today());
  if(name===null) return;
  let points=[]; try{ points=JSON.parse(localStorage.getItem(RESTORE_KEY)||'[]')||[]; }catch(e){}
  points.unshift({id:uid(),name,createdAt:new Date().toLocaleString('sv-SE'),version:'v'+VERSION,state});
  localStorage.setItem(RESTORE_KEY, JSON.stringify(points.slice(0,10)));
  render();
};
window.restorePoint=id=>{
  let points=[]; try{ points=JSON.parse(localStorage.getItem(RESTORE_KEY)||'[]')||[]; }catch(e){}
  const p=points.find(x=>x.id===id); if(!p) return;
  if(!confirm(tr('restore'))) return;
  state=merge(defaultState(), p.state); save(); render();
};
window.deleteRestorePoint=id=>{
  if(!confirm(tr('deletePermanent'))) return;
  let points=[]; try{ points=JSON.parse(localStorage.getItem(RESTORE_KEY)||'[]')||[]; }catch(e){}
  localStorage.setItem(RESTORE_KEY, JSON.stringify(points.filter(x=>x.id!==id)));
  render();
};
window.backupToFile=()=>{
  const payload={app:'WhiskyLog',version:'v'+VERSION,exportedAt:new Date().toISOString(),state};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`WhiskyLog_backup_${today()}.json`; a.click(); URL.revokeObjectURL(a.href);
};
function restoreFromFile(file){
  const r=new FileReader();
  r.onload=()=>{
    try{
      const data=JSON.parse(r.result); const next=data.state||data;
      if(!next.library || !next.bottles) throw new Error('Invalid');
      if(!confirm(tr('restoreFile'))) return;
      state=merge(defaultState(), next); save(); render();
    }catch(e){ alert('Backup error'); }
  };
  r.readAsText(file);
}

render();
})();
