
(() => {
'use strict';

const VERSION = '2.14';
const STORAGE_KEY = 'whiskylog_v200_clean_state';
const RESTORE_KEY = 'whiskylog_v200_restore_points';

const T = {
  no: {
    brand:'PREMIUM BRENNEVINSJOURNAL', title:"Kenneth's WhiskyLog", version:'WhiskyLog v2.14',
    home:'Din personlige brennevinslogg', back:'Tilbake', save:'Lagre', cancel:'Avbryt', edit:'Rediger', delete:'Slett', confirm:'OK',
    homeSub:'Personlig loggføring av flasker, smakinger, beholdning og fremtidige kjøp.',
    myStock:'Min beholdning', myStockSub:'Uåpnede, åpnede og tomme flasker samlet på ett sted.',
    logging:'Loggføring', loggingSub:'Registrer smaking, korriger beholdning og legg til flasker.',
    overview:'Oversikt / statistikk', overviewSub:'Rangering, score, verdi og historikk.',
    wishlist:'Ønskeliste', wishlistSub:'Fremtidige flasker og kjøpsideer.', addWishlist:'Legg til ønskeliste', wishedPrice:'Ønsket pris', priority:'Prioritet', link:'Lenke', high:'Høy', medium:'Middels', low:'Lav', saveWishlist:'Lagre ønskeliste',
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
    backupIncludes:'Backup inkluderer bibliotek, flasker, bilder lagret i appen, smakinger, kommentarer, ønskeliste og innstillinger. Du kan også hente inn eldre backup fra v1-versjoner.',
    deletePermanent:'Slette permanent?', deleteLibraryWarn:'Dette sletter også tilknyttede beholdningsflasker, smakinger og kommentarer. Dette kan ikke angres.',
    saved:'Lagret.', restored:'Gjenopprettet.', chooseBottle:'Velg flaske', averageScore:'Gjennomsnitt', bottleRanking:'Flaskerangering',
    noBottleSelected:'Velg en flaske først.', missingLibrary:'Legg først inn en flaske i biblioteket.',
    purchased:'Kjøpt', left:'igjen', lastTasted:'Sist smakt', openedDate:'Åpnet'
  },
  en: {
    brand:'PREMIUM SPIRITS JOURNAL', title:"Kenneth's WhiskyLog", version:'WhiskyLog v2.14',
    home:'Your spirits journal', back:'Back', save:'Save', cancel:'Cancel', edit:'Edit', delete:'Delete', confirm:'OK',
    homeSub:'Personal logging for bottles, tastings, stock and future purchases.',
    myStock:'My stock', myStockSub:'Unopened, opened and empty bottles in one place.',
    logging:'Logging', loggingSub:'Register tastings, correct stock and add bottles.',
    overview:'Overview / statistics', overviewSub:'Ranking, scores, value and history.',
    wishlist:'Wishlist', wishlistSub:'Future bottles and purchase ideas.', addWishlist:'Add wishlist item', wishedPrice:'Wanted price', priority:'Priority', link:'Link', high:'High', medium:'Medium', low:'Low', saveWishlist:'Save wishlist item',
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
    backupIncludes:'Backup includes library, bottles, images saved in the app, tastings, comments, wishlist and settings. Older v1 backup files can also be imported.',
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
function img(item){ return item?.image ? `<img class="thumb" src="${item.image}" alt="">` : `<div class="thumbFallback">${iconSvg('bottle','miniSvg')}</div>`; }
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
let stockPageStatus = '';
let editWishlistId = '';

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
  else if(page === 'stockCategory') renderStockCategory();
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
    <section class="hero dashboardHero">
      <div class="small">${tr('version')}</div>
      <h2>${tr('home')}</h2>
      <p class="sub">${tr('homeSub')}</p>
    </section>

    <section class="homeMenu oldHomeGrid">
      ${tile('stock','🥃',tr('myStock'),tr('myStockSub'))}
      ${tile('logging','📝',tr('logging'),tr('loggingSub'))}
      ${tile('overview','📊',tr('overview'),tr('overviewSub'))}
      ${tile('wishlist','⭐',tr('wishlist'),tr('wishlistSub'))}
    </section>

    <section class="quickSettings">
      <button class="ghost smallButton" onclick="go('settings')">${iconSvg('settings','buttonSvg')} ${tr('settings')}</button>
    </section>
  `);
}




function iconSvg(kind, cls='menuIcon'){
  const common = `class="${cls}" viewBox="0 0 64 64" aria-hidden="true"`;
  const stroke = `fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"`;
  const gold = `fill="rgba(244,191,79,.24)" stroke="currentColor" stroke-width="3"`;
  const icons = {
    stock:`<svg ${common}><rect x="12" y="17" width="40" height="34" rx="8" ${stroke}/><path d="M20 17v-5h24v5" ${stroke}/><path d="M18 32h28" ${stroke}/><path d="M24 40h16" ${stroke}/></svg>`,
    logging:`<svg ${common}><path d="M18 12h24l8 8v32H18z" ${stroke}/><path d="M42 12v10h10" ${stroke}/><path d="M24 32h16M24 42h12" ${stroke}/><path d="M43 46l8-8 4 4-8 8-6 2z" ${gold}/></svg>`,
    overview:`<svg ${common}><rect x="12" y="36" width="8" height="16" rx="2" ${gold}/><rect x="28" y="24" width="8" height="28" rx="2" ${gold}/><rect x="44" y="14" width="8" height="38" rx="2" ${gold}/><path d="M10 54h46" ${stroke}/></svg>`,
    wishlist:`<svg ${common}><path d="M32 9l7 14 15 2-11 11 3 15-14-7-14 7 3-15L10 25l15-2z" ${gold}/></svg>`,
    settings:`<svg ${common}><circle cx="32" cy="32" r="8" ${stroke}/><path d="M32 10v8M32 46v8M10 32h8M46 32h8M16 16l6 6M42 42l6 6M48 16l-6 6M22 42l-6 6" ${stroke}/></svg>`,
    library:`<svg ${common}><path d="M14 15h15v38H14zM35 15h15v38H35z" ${stroke}/><path d="M20 23h3M41 23h3M20 43h3M41 43h3" ${stroke}/></svg>`,
    bottle:`<svg ${common}><path d="M26 8h12v12l5 8v25a5 5 0 0 1-5 5H26a5 5 0 0 1-5-5V28l5-8z" ${stroke}/><path d="M24 38h16" ${stroke}/><path d="M27 8h10" ${stroke}/></svg>`,
    tasting:`<svg ${common}><path d="M20 10h24l-4 23a8 8 0 0 1-16 0z" ${stroke}/><path d="M24 28h16" ${gold}/><path d="M32 41v12M24 54h16" ${stroke}/></svg>`,
    correct:`<svg ${common}><path d="M32 12v40M18 20h28" ${stroke}/><path d="M18 20l-8 16h16zM46 20l-8 16h16z" ${gold}/></svg>`,
    add:`<svg ${common}><circle cx="32" cy="32" r="22" ${stroke}/><path d="M32 20v24M20 32h24" ${stroke}/></svg>`
  };
  return icons[kind] || icons.bottle;
}

function menuArt(to){
  const sets = {
    stock:['bottle','stock','tasting','library'],
    logging:['tasting','correct','add','library'],
    overview:['overview','tasting','stock','settings'],
    wishlist:['wishlist','add','library','stock'],
    settings:['settings','stock','library','tasting']
  };
  const arr = sets[to] || ['bottle','stock','tasting','library'];
  return `<div class="menuArt cleanMenuArt" aria-hidden="true">${arr.map(x=>`<span>${iconSvg(x,'miniSvg')}</span>`).join('')}</div>`;
}

function tile(to, icon, title, sub){
  const mainKind = to === 'stock' ? 'stock' : to === 'logging' ? 'logging' : to === 'overview' ? 'overview' : to === 'wishlist' ? 'wishlist' : 'settings';
  return `<div class="tile oldTile" onclick="go('${to}')">
    <div class="tileText"><div class="icon">${iconSvg(mainKind)}</div><h3>${title}</h3><div class="sub">${sub}</div></div>
    ${menuArt(to)}
  </div>`;
}

function stockStats(status){
  const bs = state.bottles.filter(b => bottleStatus(b) === status);
  return {count:bs.length, value:bs.reduce((a,b)=>a+bottleValue(b),0), volume:bs.reduce((a,b)=>a+bottleVolume(b),0)};
}
function renderStock(){
  const statuses = [['unopened',tr('unopened'),'stock'],['opened',tr('opened'),'tasting'],['empty',tr('empty'),'library']];
  shell(`
    <section class="hero dashboardHero">
      <h2>${tr('myStock')}</h2>
      <p class="sub">${tr('myStockSub')}</p>
    </section>

    <section class="stockDashboard">
      ${statuses.map(([s,label,icon])=>{
        const st=stockStats(s);
        return `<div class="stockBox stockBoxWithImages" onclick="openStockCategory('${s}')">
          <div class="stockBoxTop">
            <div class="icon">${iconSvg(icon)}</div>
            ${stockPreviewImages(s)}
          </div>
          <h3>${label}</h3>
          <p class="sub">${st.count} ${tr('bottles')} · ${money(st.value)}</p>
          <p class="small">${Math.round(st.volume)} ml</p>
        </div>`;
      }).join('')}
    </section>

    <section class="actionStrip">
      <button class="ghost" onclick="go('addStock')">${tr('addStock')}</button>
      <button class="ghost" onclick="go('tasting')">${tr('registerTasting')}</button>
      <button class="ghost" onclick="go('correctStock')">${tr('correctStock')}</button>
    </section>
  `);
}


function openStockCategory(status){
  stockPageStatus = status;
  page = 'stockCategory';
  render();
}
window.openStockCategory = openStockCategory;

function statusLabel(status){
  if(status === 'unopened') return tr('unopened');
  if(status === 'opened') return tr('opened');
  if(status === 'empty') return tr('empty');
  return tr('bottle');
}

function stockPreviewImages(status){
  const bottles = state.bottles.filter(b => bottleStatus(b) === status).slice(0,4);
  if(!bottles.length) return `<div class="stockPreview emptyPreview">${iconSvg('bottle','miniSvg')}</div>`;
  return `<div class="stockPreview">${bottles.map(b=>{
    const base = bottleBase(b);
    return base.image ? `<img src="${base.image}" alt="">` : `<span>${iconSvg('bottle','miniSvg')}</span>`;
  }).join('')}</div>`;
}

function renderStockCategory(){
  const status = stockPageStatus || 'opened';
  shell(`
    <section class="hero dashboardHero">
      <h2>${statusLabel(status)}</h2>
      <p class="sub">${tr('myStockSub')}</p>
    </section>
    <section class="card compactListCard">
      <div class="list">${stockListByStatus(status)}</div>
    </section>
    <section class="actionStrip">
      <button class="ghost" onclick="go('addStock')">${tr('addStock')}</button>
      <button class="ghost" onclick="go('tasting')">${tr('registerTasting')}</button>
      <button class="ghost" onclick="go('correctStock')">${tr('correctStock')}</button>
    </section>
  `,'stock');
}

function stockListByStatus(status){
  const bottles = state.bottles.filter(b => bottleStatus(b) === status);
  if(!bottles.length) return `<div class="sub">${tr('noItems')}</div>`;
  return bottles.map(b=>{
    const base=bottleBase(b), vol=bottleVolume(b);
    return `<div class="item" onclick="editBottle('${b.id}')">
      ${img(base)}
      <div><div class="title">${esc(base.name||'')}</div>
      <div class="meta">${esc(base.type||'')} · ${Math.round(vol)} ml ${tr('left')} · ${money(bottleValue(b))}</div>
      <div class="small">${tr('purchased')}: ${esc(b.purchaseDate||'')}</div></div>
      <div class="actions"><button class="ghost">${tr('edit')}</button><button class="danger" onclick="event.stopPropagation();deleteBottle('${b.id}')">${tr('delete')}</button></div>
    </div>`;
  }).join('');
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
        <div><label>${tr('tastingDate')}</label><input class="dateInput" type="date" name="date" value="${esc(t.date||today())}"></div>
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
  const w = editWishlistId ? (state.wishlist || []).find(x => x.id === editWishlistId) || {} : {};
  shell(`
    <section class="hero dashboardHero">
      <h2>${tr('wishlist')}</h2>
      <p class="sub">${tr('wishlistSub')}</p>
    </section>

    <section class="card">
      <form id="wishlistForm">
        <input type="hidden" name="id" value="${esc(w.id||'')}">
        <label>${tr('name')}</label>
        <input name="name" value="${esc(w.name||'')}" required autocomplete="off">

        <div class="formgrid">
          <div>
            <label>${tr('type')}</label>
            <select name="type">
              <option value="">${tr('chooseType')}</option>
              ${TYPES.map(x=>`<option ${w.type===x?'selected':''}>${x}</option>`).join('')}
            </select>
          </div>
          <div>
            <label>${tr('wishedPrice')}</label>
            <input name="price" inputmode="decimal" value="${esc(w.price||'')}">
          </div>
          <div>
            <label>${tr('priority')}</label>
            <select name="priority">
              <option value="high" ${w.priority==='high'?'selected':''}>${tr('high')}</option>
              <option value="medium" ${!w.priority||w.priority==='medium'?'selected':''}>${tr('medium')}</option>
              <option value="low" ${w.priority==='low'?'selected':''}>${tr('low')}</option>
            </select>
          </div>
        </div>

        <label>${tr('link')}</label>
        <input name="link" value="${esc(w.link||'')}" autocomplete="off">

        <label>${tr('comment')}</label>
        <textarea name="comment">${esc(w.comment||'')}</textarea>

        <div class="actions">
          <button class="primary" type="submit">${tr('saveWishlist')}</button>
          ${w.id ? `<button class="danger" type="button" onclick="deleteWishlist('${w.id}')">${tr('delete')}</button>` : ''}
          <button class="ghost" type="button" onclick="editWishlistId='';render()">${tr('clearForm')}</button>
        </div>
      </form>
    </section>

    <section class="card">
      <h2>${tr('wishlist')}</h2>
      <div class="list">${wishlistList()}</div>
    </section>
  `);

  document.getElementById('wishlistForm').onsubmit = e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const id = fd.get('id') || uid();
    const item = {
      id,
      name: fd.get('name'),
      type: fd.get('type'),
      price: fd.get('price'),
      priority: fd.get('priority'),
      link: fd.get('link'),
      comment: fd.get('comment'),
      createdAt: w.createdAt || new Date().toISOString()
    };
    const ix = state.wishlist.findIndex(x => x.id === id);
    if(ix >= 0) state.wishlist[ix] = item; else state.wishlist.push(item);
    save();
    editWishlistId = '';
    render();
  };
}

function wishlistList(){
  if(!state.wishlist || !state.wishlist.length) return `<div class="sub">${tr('noItems')}</div>`;
  const rank = {high:0, medium:1, low:2};
  return state.wishlist.slice().sort((a,b)=>(rank[a.priority]??1)-(rank[b.priority]??1) || String(a.name).localeCompare(String(b.name))).map(w => `
    <div class="item wishlistItem">
      <div class="thumbFallback">${iconSvg('wishlist','miniSvg')}</div>
      <div>
        <div class="title">${esc(w.name||'')}</div>
        <div class="meta">${esc(w.type||'')} ${w.price ? '· ' + money(w.price) : ''} · ${tr(w.priority||'medium')}</div>
        ${w.comment ? `<div class="small">${esc(w.comment)}</div>` : ''}
        ${w.link ? `<div class="small"><a href="${esc(w.link)}" target="_blank" rel="noopener">${esc(w.link)}</a></div>` : ''}
      </div>
      <div class="actions">
        <button class="ghost" onclick="editWishlist('${w.id}')">${tr('edit')}</button>
        <button class="danger" onclick="deleteWishlist('${w.id}')">${tr('delete')}</button>
      </div>
    </div>
  `).join('');
}

window.editWishlist = function(id){
  editWishlistId = id;
  render();
};

window.deleteWishlist = function(id){
  const item = (state.wishlist || []).find(x => x.id === id);
  if(!confirm(`${tr('deletePermanent')}
${item ? item.name : ''}`)) return;
  state.wishlist = (state.wishlist || []).filter(x => x.id !== id);
  save();
  editWishlistId = '';
  render();
};
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

function migrateImportedState(raw){
  const data = raw && raw.state ? raw.state : raw;
  const next = defaultState();

  if(raw && raw.settings){
    next.settings = merge(next.settings, raw.settings);
  }else if(data && data.settings){
    next.settings = merge(next.settings, data.settings);
  }

  // v2 format already
  if(data && Array.isArray(data.library)){
    next.library = data.library || [];
    next.bottles = data.bottles || [];
    next.tastings = data.tastings || [];
    next.comments = data.comments || [];
    next.wishlist = data.wishlist || [];
    return next;
  }

  // v1 format: bases -> library, baseId -> libraryId
  if(data && Array.isArray(data.bases)){
    const idMap = {};
    next.library = data.bases.map(b => {
      const id = b.id || uid();
      idMap[b.id] = id;
      return {
        id,
        name: b.name || b.title || '',
        distillery: b.distillery || b.producer || '',
        type: b.type || '',
        abv: b.abv || b.alcohol || '',
        volume: b.volume || b.bottleVolume || '',
        fullWeight: b.fullWeight || b.fullBottleWeight || '',
        region: b.region || b.country || '',
        image: b.image || '',
        comment: b.comment || b.notes || ''
      };
    });

    next.bottles = (data.bottles || []).map(b => {
      const id = b.id || uid();
      return {
        id,
        libraryId: idMap[b.baseId] || idMap[b.libraryId] || b.libraryId || b.baseId || '',
        price: b.price || '',
        purchaseDate: b.purchaseDate || b.date || '',
        currentWeight: b.currentWeight || '',
        currentVolume: b.currentVolume || b.remainingVolume || '',
        openedDate: b.openedDate || '',
        comment: b.comment || b.notes || ''
      };
    });

    next.tastings = (data.tastings || []).map(t => ({
      id: t.id || uid(),
      bottleId: t.bottleId || '',
      date: t.date || t.tastingDate || '',
      mode: t.mode || t.tastingType || 'neat',
      drops: t.drops || '',
      ml: t.ml || t.amountMl || '',
      appearance: t.appearance || t.appearanceScore || '',
      nose: t.nose || t.smell || t.noseScore || '',
      neatTaste: t.neatTaste || t.tasteNeat || t.neatScore || '',
      waterTaste: t.waterTaste || t.tasteWater || t.waterScore || '',
      finish: t.finish || t.aftertaste || t.finishScore || '',
      notes: t.notes || t.comment || ''
    }));

    next.comments = data.comments || [];
    next.wishlist = data.wishlist || [];
    return next;
  }

  throw new Error(state.settings.language === 'no' ? 'Ukjent backupformat' : 'Unknown backup format');
}

function restoreFromFile(file){
  const r=new FileReader();
  r.onload=()=>{
    try{
      const raw=JSON.parse(r.result);
      const migrated=migrateImportedState(raw);
      const libCount = migrated.library.length;
      const bottleCount = migrated.bottles.length;
      const tastingCount = migrated.tastings.length;
      const msg = `${tr('restoreFile')}?

${libCount} ${tr('library')} · ${bottleCount} ${tr('bottles')} · ${tastingCount} ${tr('registerTasting')}`;
      if(!confirm(msg)) return;
      state=migrated;
      save();
      render();
      alert(tr('restored'));
    }catch(e){
      alert((state.settings.language === 'no' ? 'Kunne ikke hente backup: ' : 'Could not restore backup: ') + (e.message || ''));
    }
  };
  r.readAsText(file);
}

render();
})();


/* ===== v2.14 wishlist enhancements ===== */
(function(){
  const oldRenderWishlist = window.renderWishlist;
  if(!oldRenderWishlist) return;

  function calcWishlistStats(items){
    let total=0;
    for(const i of items){
      total += Number(i.price||0);
    }
    return {count: items.length, total};
  }

  window.renderWishlist = function(){
    oldRenderWishlist();

    const root = document.querySelector('#wishlistPage, .wishlistPage, [data-page="wishlist"]');
    const list = window.state?.wishlist || JSON.parse(localStorage.getItem('wishlist') || '[]');

    if(root && !root.querySelector('.wishlistStats')){
      const stats = calcWishlistStats(list);

      const statsCard = document.createElement('div');
      statsCard.className = 'wishlistStats card';
      statsCard.innerHTML = `
        <div class="wishlistStatBox">
          <div class="wishlistStatValue">${stats.count}</div>
          <div class="wishlistStatLabel">Flasker i ønskeliste</div>
        </div>
        <div class="wishlistStatBox">
          <div class="wishlistStatValue">${stats.total.toFixed(2)} NOK</div>
          <div class="wishlistStatLabel">Total ønskelisteverdi</div>
        </div>
      `;

      const target = root.querySelector('.wishlistList') || root.firstElementChild?.nextElementSibling || root;
      root.insertBefore(statsCard, target);
    }

    const forms = document.querySelectorAll('form');
    forms.forEach(form=>{
      if(form.dataset.wishlistImageApplied) return;

      const heading = form.querySelector('h2,h3');
      if(heading && heading.textContent.toLowerCase().includes('ønsk')){
        const imageWrap = document.createElement('div');
        imageWrap.className = 'field';

        imageWrap.innerHTML = `
          <label>Ønskebilde</label>
          <input type="file" accept="image/*">
        `;

        const submitBtn = form.querySelector('button[type="submit"]');
        if(submitBtn){
          submitBtn.parentElement.insertBefore(imageWrap, submitBtn);
        }else{
          form.appendChild(imageWrap);
        }

        const input = imageWrap.querySelector('input');
        input.addEventListener('change', e=>{
          const file = e.target.files[0];
          if(!file) return;

          const reader = new FileReader();
          reader.onload = ()=>{
            form.dataset.wishlistImage = reader.result;
          };
          reader.readAsDataURL(file);
        });

        form.addEventListener('submit', ()=>{
          if(form.dataset.wishlistImage){
            const wishlist = window.state?.wishlist || JSON.parse(localStorage.getItem('wishlist') || '[]');
            if(wishlist.length){
              wishlist[wishlist.length-1].image = form.dataset.wishlistImage;
              localStorage.setItem('wishlist', JSON.stringify(wishlist));
            }
          }
        });

        form.dataset.wishlistImageApplied = "1";
      }
    });

    document.querySelectorAll('.wishlistItem').forEach(item=>{
      if(item.querySelector('.wishlistThumb')) return;
      const idx = Number(item.dataset.index||0);
      const entry = list[idx];
      if(entry && entry.image){
        const img = document.createElement('img');
        img.src = entry.image;
        img.className = 'wishlistThumb';
        item.prepend(img);
      }
    });
  };
})();
