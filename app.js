
const KEY='whiskylog_stable_v133';
const SETTINGS_KEY='whiskylog_settings_v133';
const TYPES=["Whisky","Single Malt Scotch","Blended Scotch","Bourbon","Rye Whiskey","Tennessee Whiskey","Irish Whiskey","Japanese Whisky","Canadian Whisky","Rum","Dark Rum","Aged Rum","Agricole Rum","Cognac","Armagnac","Brandy","Calvados","Aquavit","Gin","Vodka","Tequila","Mezcal","Liqueur","Amaro","Other"];
const DENSITY_TABLE=[
  {abv:0,dens:0.9982},{abv:5,dens:0.9892},{abv:10,dens:0.9807},{abv:15,dens:0.9723},{abv:20,dens:0.9640},{abv:25,dens:0.9559},
  {abv:30,dens:0.9479},{abv:35,dens:0.9399},{abv:40,dens:0.9319},{abv:45,dens:0.9239},{abv:50,dens:0.9157},{abv:55,dens:0.9073},{abv:60,dens:0.8987}
];

const state=loadState();
const settings=Object.assign({ownerName:'Kenneth',currency:'NOK',language:'en',defaultTastingMl:20}, readJson(SETTINGS_KEY, {}));

/* v1.39 real language toggle */
const I18N = {
  en: {
    "Premium Spirits Journal":"Premium Spirits Journal",
    "Dashboard":"Dashboard",
    "Your cellar overview":"Your cellar overview",
    "Track unopened, opened and empty bottles with tastings, notes and weight-based volume.":"Track unopened, opened and empty bottles with tastings, notes and weight-based volume.",
    "Unopened bottles":"Unopened bottles",
    "Stored bottles not yet tasted":"Stored bottles not yet tasted",
    "Opened bottles":"Opened bottles",
    "Bottles open for tasting":"Bottles open for tasting",
    "Empty bottles":"Empty bottles",
    "Archive and final notes":"Archive and final notes",
    "Add bottle tasting":"Add bottle tasting",
    "Register a tasting for unopened or opened bottles":"Register a tasting for unopened or opened bottles",
    "Add new bottle to collection":"Add new bottle to collection",
    "Add a bottle from your library":"Add a bottle from your library",
    "Add bottle to library":"Add bottle to library",
    "Create reusable bottle types":"Create reusable bottle types",
    "Wishlist":"Wishlist",
    "Track up to 50 future bottles":"Track up to 50 future bottles",
    "Settings":"Settings",
    "Name, currency and preferences":"Name, currency and preferences",
    "Analytics":"Analytics",
    "Simple stock and tasting summary":"Simple stock and tasting summary",
    "Value in stock":"Value in stock",
    "Stock volume":"Stock volume",
    "Opened":"Opened",
    "Tastings":"Tastings",
    "Best value":"Best value",
    "Low stock":"Low stock",
    "No bottles yet.":"No bottles yet.",
    "No low-stock bottles.":"No low-stock bottles.",
    "Create reusable bottle types here. Once a type is in the library, you can add several bottles with different batch and bottle numbers.":"Create reusable bottle types here. Once a type is in the library, you can add several bottles with different batch and bottle numbers.",
    "Name":"Name",
    "Distillery / producer":"Distillery / producer",
    "Type":"Type",
    "Choose type":"Choose type",
    "ABV %":"ABV %",
    "Bottle volume ml":"Bottle volume ml",
    "Full bottle weight g":"Full bottle weight g",
    "Calculated empty weight":"Calculated empty weight",
    "Region / country":"Region / country",
    "Image":"Image",
    "Notes":"Notes",
    "Save library item":"Save library item",
    "Cancel":"Cancel",
    "Library items":"Library items",
    "Search library":"Search library",
    "Add bottle":"Add bottle",
    "New bottles are stored as unopened until the first tasting is registered.":"New bottles are stored as unopened until the first tasting is registered.",
    "Library item":"Library item",
    "Choose library item":"Choose library item",
    "Batch no.":"Batch no.",
    "Bottle no.":"Bottle no.",
    "Price":"Price",
    "Purchase place":"Purchase place",
    "Purchase date":"Purchase date",
    "Current weight g":"Current weight g",
    "Comments":"Comments",
    "Save bottle":"Save bottle",
    "Select an unopened or opened bottle. Tasting an unopened bottle automatically moves it to Opened bottles.":"Select an unopened or opened bottle. Tasting an unopened bottle automatically moves it to Opened bottles.",
    "Purchase date, ABV and volume.":"Purchase date, ABV and volume.",
    "Purchase date, opened date, last tasted and remaining volume.":"Purchase date, opened date, last tasted and remaining volume.",
    "Archive and final notes.":"Archive and final notes.",
    "Back":"Back",
    "Personalize the app.":"Personalize the app.",
    "Currency":"Currency",
    "Language":"Language",
    "English":"English",
    "Norwegian":"Norwegian",
    "Default tasting amount ml":"Default tasting amount ml",
    "Save settings":"Save settings",
    "Simple summary for value, tastings and stock volume.":"Simple summary for value, tastings and stock volume.",
    "Backup":"Backup",
    "Export or import local data.":"Export or import local data.",
    "Export backup":"Export backup",
    "Import JSON":"Import JSON",
    "Import backup":"Import backup",
    "Stock volume":"Stock volume",
    "Tasted volume":"Tasted volume",
    "Library items":"Library items",
    "Bottles":"Bottles",
    "Add tasting":"Add tasting",
    "Last sip enjoyed":"Last sip enjoyed",
    "New bottle purchased":"New bottle purchased",
    "Edit bottle":"Edit bottle",
    "Delete bottle":"Delete bottle",
    "Remaining value":"Remaining value",
    "left":"left",
    "Purchased":"Purchased",
    "Opened":"Opened",
    "Last tasted":"Last tasted",
    "remaining":"remaining",
    "Average":"Average",
    "Appearance":"Appearance",
    "Nose":"Nose",
    "Neat":"Neat",
    "Water":"Water",
    "Finish":"Finish"
  },
  no: {
    "Premium Spirits Journal":"Premium brennevinsjournal",
    "Dashboard":"Oversikt",
    "Your cellar overview":"Din flaskesamling",
    "Track unopened, opened and empty bottles with tastings, notes and weight-based volume.":"Følg uåpnede, åpnede og tomme flasker med smakinger, notater og vektbasert volum.",
    "Unopened bottles":"Uåpnede flasker",
    "Stored bottles not yet tasted":"Flasker som ikke er smakt ennå",
    "Opened bottles":"Åpnede flasker",
    "Bottles open for tasting":"Flasker åpnet for smaking",
    "Empty bottles":"Tomme flasker",
    "Archive and final notes":"Arkiv og sluttnotater",
    "Add bottle tasting":"Registrer smaking",
    "Register a tasting for unopened or opened bottles":"Registrer smaking av uåpnet eller åpnet flaske",
    "Add new bottle to collection":"Legg til ny flaske i samlingen",
    "Add a bottle from your library":"Legg til flaske fra biblioteket",
    "Add bottle to library":"Legg flaske til bibliotek",
    "Create reusable bottle types":"Opprett gjenbrukbare flasketyper",
    "Wishlist":"Ønskeliste",
    "Track up to 50 future bottles":"Følg opptil 50 ønskede flasker",
    "Settings":"Innstillinger",
    "Name, currency and preferences":"Navn, valuta og innstillinger",
    "Analytics":"Statistikk",
    "Simple stock and tasting summary":"Enkel oversikt over beholdning og smaking",
    "Value in stock":"Verdi i beholdning",
    "Stock volume":"Volum i beholdning",
    "Opened":"Åpnet",
    "Tastings":"Smakinger",
    "Best value":"Beste verdi",
    "Low stock":"Lav beholdning",
    "No bottles yet.":"Ingen flasker ennå.",
    "No low-stock bottles.":"Ingen flasker med lav beholdning.",
    "Create reusable bottle types here. Once a type is in the library, you can add several bottles with different batch and bottle numbers.":"Opprett gjenbrukbare flasketyper her. Når typen ligger i biblioteket, kan du legge til flere flasker med ulike batch- og flaskenummer.",
    "Name":"Navn",
    "Distillery / producer":"Destilleri / produsent",
    "Type":"Type",
    "Choose type":"Velg type",
    "ABV %":"Alkohol %",
    "Bottle volume ml":"Flaskevolum ml",
    "Full bottle weight g":"Vekt full flaske g",
    "Calculated empty weight":"Beregnet tomvekt",
    "Region / country":"Region / land",
    "Image":"Bilde",
    "Notes":"Notater",
    "Save library item":"Lagre i bibliotek",
    "Cancel":"Avbryt",
    "Library items":"Bibliotek",
    "Search library":"Søk i bibliotek",
    "Add bottle":"Legg til flaske",
    "New bottles are stored as unopened until the first tasting is registered.":"Nye flasker lagres som uåpnede til første smaking registreres.",
    "Library item":"Bibliotekelement",
    "Choose library item":"Velg fra bibliotek",
    "Batch no.":"Batch nr.",
    "Bottle no.":"Flaske nr.",
    "Price":"Pris",
    "Purchase place":"Kjøpssted",
    "Purchase date":"Kjøpsdato",
    "Current weight g":"Nåværende vekt g",
    "Comments":"Kommentarer",
    "Save bottle":"Lagre flaske",
    "Select an unopened or opened bottle. Tasting an unopened bottle automatically moves it to Opened bottles.":"Velg en uåpnet eller åpnet flaske. Smaking av uåpnet flaske flytter den automatisk til åpnede flasker.",
    "Purchase date, ABV and volume.":"Kjøpsdato, alkoholprosent og volum.",
    "Purchase date, opened date, last tasted and remaining volume.":"Kjøpsdato, åpningsdato, sist smakt og restvolum.",
    "Archive and final notes.":"Arkiv og sluttnotater.",
    "Back":"Tilbake",
    "Personalize the app.":"Tilpass appen.",
    "Currency":"Valuta",
    "Language":"Språk",
    "English":"Engelsk",
    "Norwegian":"Norsk",
    "Default tasting amount ml":"Standard smaksvolum ml",
    "Save settings":"Lagre innstillinger",
    "Simple summary for value, tastings and stock volume.":"Enkel oversikt over verdi, smakinger og beholdningsvolum.",
    "Export or import local data.":"Eksporter eller importer lokale data.",
    "Export backup":"Eksporter backup",
    "Import JSON":"Importer JSON",
    "Import backup":"Importer backup",
    "Tasted volume":"Smakt volum",
    "Bottles":"Flasker",
    "Add tasting":"Legg til smaking",
    "Last sip enjoyed":"Siste slurk drukket",
    "New bottle purchased":"Ny flaske kjøpt",
    "Edit bottle":"Rediger flaske",
    "Delete bottle":"Slett flaske",
    "Remaining value":"Restverdi",
    "left":"igjen",
    "Purchased":"Kjøpt",
    "Last tasted":"Sist smakt",
    "remaining":"restverdi",
    "Average":"Snitt",
    "Appearance":"Utseende",
    "Nose":"Lukt",
    "Neat":"Utvannet",
    "Water":"Med vann",
    "Finish":"Ettersmak"
  }
};

function tr(key){ const lang=(settings.language||'en'); return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key; }

function applyLanguage(){
  document.documentElement.lang=(settings.language==='no'?'no':'en');
  const walker=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node){
      const s=node.nodeValue.trim();
      if(!s || s.length>140) return NodeFilter.FILTER_REJECT;
      if(node.parentElement && ['SCRIPT','STYLE','OPTION'].includes(node.parentElement.tagName)) return NodeFilter.FILTER_REJECT;
      return I18N.en[s] || I18N.no[s] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes=[];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node=>{
    const current=node.nodeValue.trim();
    let key=current;
    if(settings.language==='en'){
      key=Object.keys(I18N.no).find(k=>I18N.no[k]===current) || current;
    } else {
      key=Object.keys(I18N.en).find(k=>I18N.en[k]===current) || current;
    }
    if(I18N.en[key] || I18N.no[key]) node.nodeValue=node.nodeValue.replace(current,tr(key));
  });
  document.querySelectorAll('[placeholder]').forEach(el=>{
    const ph=el.getAttribute('placeholder');
    const key=Object.keys(I18N.no).find(k=>I18N.no[k]===ph) || ph;
    if(I18N.en[key] || I18N.no[key]) el.setAttribute('placeholder',tr(key));
  });
  document.querySelectorAll('select[name="language"] option').forEach(opt=>{
    if(opt.value==='en') opt.textContent=tr('English');
    if(opt.value==='no') opt.textContent=tr('Norwegian');
  });
  document.querySelectorAll('select[name="type"] option').forEach(opt=>{
    if(opt.value==='') opt.textContent=tr('Choose type');
  });
  document.querySelectorAll('select[name="baseId"] option').forEach(opt=>{
    if(opt.value==='') opt.textContent=tr('Choose library item');
  });
}

let pendingBaseImage='';
let currentBottleId=null;
let detailReturnView='home';

function readJson(key, fallback){try{return Object.assign(fallback, JSON.parse(localStorage.getItem(key)||'{}'));}catch(e){return fallback;}}
function loadState(){try{return Object.assign({bases:[],bottles:[],tastings:[],comments:[],wishlist:[]}, JSON.parse(localStorage.getItem(KEY)||'{}'));}catch(e){return {bases:[],bottles:[],tastings:[],comments:[],wishlist:[]};}}
function save(){localStorage.setItem(KEY, JSON.stringify(state));}
function saveSettings(){localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));}
function uid(){return 'id_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,9);}
function dec(v){const n=Number(String(v??'').replace(',','.').replace(/[^\d.-]/g,''));return Number.isFinite(n)?n:0;}
function fmt(n,d=0){return Number(n||0).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});}
function money(v){return `${fmt(v,2)} ${settings.currency||'NOK'}`;}
function ml(v){return `${fmt(v,0)} ml`;}
function esc(s){return String(s??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));}
function getBase(id){return state.bases.find(b=>b.id===id);}
function getBottle(id){return state.bottles.find(b=>b.id===id);}
function bottleName(b){const base=getBase(b.baseId);return base?`${base.name}${b.batchNo?' · '+b.batchNo:''}${b.bottleNo?' #'+b.bottleNo:''}`:'Unknown bottle';}
function imageForBase(base){return base?.image || '';}
function thumb(base){const img=imageForBase(base);return img?`<img class="thumb" src="${img}" alt="">`:`<div class="thumb">🥃</div>`;}

function densityFromAbv(abv){
  abv=dec(abv);
  if(abv<=0)return DENSITY_TABLE[0].dens;
  if(abv>=60)return DENSITY_TABLE[DENSITY_TABLE.length-1].dens;
  for(let i=0;i<DENSITY_TABLE.length-1;i++){
    const a=DENSITY_TABLE[i], b=DENSITY_TABLE[i+1];
    if(abv>=a.abv && abv<=b.abv){
      const t=(abv-a.abv)/(b.abv-a.abv);
      return a.dens+(b.dens-a.dens)*t;
    }
  }
  return 0.9319;
}
function calculatedEmptyWeight(base){
  const full=dec(base.fullWeight), vol=dec(base.volume);
  if(!full||!vol)return 0;
  return Math.max(0,Math.round(full-(vol*densityFromAbv(base.abv))));
}
function volumeFromWeight(bottle){
  const base=getBase(bottle.baseId); if(!base)return 0;
  const empty=dec(base.emptyWeight)||calculatedEmptyWeight(base);
  const full=dec(base.fullWeight);
  const current=dec(bottle.currentWeight)||full;
  if(!empty||!full||current<=empty)return 0;
  const liquidFull=full-empty;
  const ratio=Math.max(0,Math.min(1,(current-empty)/liquidFull));
  return Math.round(dec(base.volume)*ratio);
}
function tastedVolume(id){return state.tastings.filter(t=>t.bottleId===id).reduce((a,t)=>a+dec(t.ml),0);}
function bottleRemainingValue(id){
  const b=getBottle(id); if(!b)return 0;
  const base=getBase(b.baseId); if(!base || !dec(base.volume))return 0;
  return dec(b.price) * (bottleVolume(id) / dec(base.volume));
}
function bottleVolume(id){
  const b=getBottle(id); if(!b)return 0;
  const base=getBase(b.baseId); if(!base)return 0;
  const baseVolume=dec(base.volume);

  // Important:
  // If currentWeight exists, it is already the source of truth and already includes reductions
  // from tastings. Do NOT subtract tastedVolume again, or bottles become empty too early.
  if(dec(b.currentWeight)>0){
    return Math.max(0, Math.round(volumeFromWeight(b)));
  }

  // Fallback for bottles without weight data.
  return Math.max(0, Math.round(baseVolume - tastedVolume(id)));
}
function lastTasted(id){
  const t=state.tastings.filter(x=>x.bottleId===id).sort((a,b)=>String(b.date).localeCompare(String(a.date)))[0];
  return t?t.date:'';
}
function bottleStatus(id){
  const b=getBottle(id); if(!b)return 'empty';
  if(bottleVolume(id)<=0)return 'empty';
  if(b.openedDate || state.tastings.some(t=>t.bottleId===id))return 'opened';
  return 'unopened';
}

function show(name='home'){
  document.querySelectorAll('main > section.view').forEach(v=>{
    const active=v.dataset.view===name;
    v.classList.toggle('active',active);
    v.hidden=!active;
    v.style.display=active?'block':'none';
  });
  window.scrollTo({top:0,behavior:'smooth'});
}
document.addEventListener('click',e=>{
  const btn=e.target.closest('[data-go]');
  if(!btn)return;
  e.preventDefault(); show(btn.dataset.go);
},true);

async function resizeImage(file){
  return new Promise((resolve,reject)=>{
    const fr=new FileReader();
    fr.onload=()=>{
      const img=new Image();
      img.onload=()=>{
        const ratio=Math.min(1,1200/Math.max(img.width,img.height));
        const c=document.createElement('canvas');c.width=Math.round(img.width*ratio);c.height=Math.round(img.height*ratio);
        c.getContext('2d').drawImage(img,0,0,c.width,c.height);
        resolve(c.toDataURL('image/jpeg',0.82));
      };
      img.onerror=reject; img.src=fr.result;
    };
    fr.onerror=reject; fr.readAsDataURL(file);
  });
}

function init(){
  document.getElementById('backupButton').onclick=()=>show('backup');
  document.getElementById('detailBack').onclick=()=>show(detailReturnView);
  initBaseForm();
  initBottleForm();
  initWishlistForm();
  initSettingsForm();
  initBackup();
  render();
  show('home');
  applyLanguage();
}

function initBaseForm(){
  const f=document.getElementById('baseForm');
  ['abv','volume','fullWeight'].forEach(n=>f[n].addEventListener('input',updateEmptyHint));
  f.image.addEventListener('change',async e=>{
    const file=e.target.files[0]; if(!file)return;
    pendingBaseImage=await resizeImage(file);
    const p=document.getElementById('baseImagePreview'); p.src=pendingBaseImage; p.classList.remove('hidden');
  });
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const name=f.name.value.trim();
    if(!name){alert('Name is required.');return;}
    const id=f.editId.value||uid();
    const existing=state.bases.find(x=>x.id===id);
    const item={
      id,name,
      distillery:f.distillery.value.trim(),
      type:f.type.value,
      abv:dec(f.abv.value),
      volume:dec(f.volume.value),
      fullWeight:dec(f.fullWeight.value),
      emptyWeight:0,
      region:f.region.value.trim(),
      image:pendingBaseImage || existing?.image || '',
      notes:f.notes.value.trim()
    };
    item.emptyWeight=calculatedEmptyWeight(item);
    const idx=state.bases.findIndex(x=>x.id===id);
    if(idx>=0)state.bases[idx]=item; else state.bases.unshift(item);
    save(); clearBaseForm(); render(); show('home');
  });
  document.getElementById('baseCancelButton').onclick=clearBaseForm;
}
function updateEmptyHint(){
  const f=document.getElementById('baseForm');
  const base={abv:dec(f.abv.value),volume:dec(f.volume.value),fullWeight:dec(f.fullWeight.value)};
  const v=calculatedEmptyWeight(base);
  document.getElementById('emptyWeightHint').value=v?String(v):'—';
}
function clearBaseForm(){
  const f=document.getElementById('baseForm'); f.reset(); f.editId.value=''; pendingBaseImage='';
  const p=document.getElementById('baseImagePreview');p.classList.add('hidden');p.removeAttribute('src');
  updateEmptyHint();
}
function editBase(id){
  const b=state.bases.find(x=>x.id===id); if(!b)return;
  show('library');
  const f=document.getElementById('baseForm');
  f.editId.value=b.id; f.name.value=b.name||''; f.distillery.value=b.distillery||''; f.type.value=b.type||'';
  f.abv.value=b.abv||''; f.volume.value=b.volume||''; f.fullWeight.value=b.fullWeight||''; f.region.value=b.region||''; f.notes.value=b.notes||'';
  pendingBaseImage=b.image||'';
  if(b.image){const p=document.getElementById('baseImagePreview');p.src=b.image;p.classList.remove('hidden');}
  updateEmptyHint();
}
function deleteBase(id){
  if(state.bottles.some(b=>b.baseId===id)){alert('This library item is used by bottles.');return;}
  if(confirm('Delete library item?')){state.bases=state.bases.filter(b=>b.id!==id);save();render();}
}

function initBottleForm(){
  const f=document.getElementById('bottleForm');
  if(f && f.price) f.price.placeholder='0.00 '+(settings.currency||'NOK');
  f.purchaseDate.value=new Date().toISOString().slice(0,10);
  f.baseId.addEventListener('change',()=>{
    const base=getBase(f.baseId.value);
    if(base && !f.currentWeight.value)f.currentWeight.value=base.fullWeight||'';
  });
  f.addEventListener('submit',e=>{
    e.preventDefault();
    if(!f.baseId.value){alert('Choose a library item first.');return;}
    const base=getBase(f.baseId.value); if(!base){alert('Library item not found.');return;}
    const editId=f.dataset.editId||'';
    if(editId){
      const existing=getBottle(editId);
      if(!existing){alert('Bottle to edit was not found.');return;}
      existing.baseId=f.baseId.value;
      existing.batchNo=f.batchNo.value.trim();
      existing.bottleNo=f.bottleNo.value.trim();
      existing.price=dec(f.price.value);
      existing.purchasePlace=f.purchasePlace.value.trim();
      existing.purchaseDate=f.purchaseDate.value||new Date().toISOString().slice(0,10);
      existing.currentWeight=dec(f.currentWeight.value)||dec(base.fullWeight);
      existing.comments=f.comments.value.trim();
      delete f.dataset.editId;
    }else{
      state.bottles.unshift({
        id:uid(),baseId:f.baseId.value,batchNo:f.batchNo.value.trim(),bottleNo:f.bottleNo.value.trim(),
        price:dec(f.price.value),purchasePlace:f.purchasePlace.value.trim(),purchaseDate:f.purchaseDate.value||new Date().toISOString().slice(0,10),
        openedDate:'',currentWeight:dec(f.currentWeight.value)||dec(base.fullWeight),comments:f.comments.value.trim()
      });
    }
    save(); f.reset(); f.purchaseDate.value=new Date().toISOString().slice(0,10); render(); show('home');
  });
}

function initWishlistForm(){
  const f=document.getElementById('wishlistForm');
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const name=f.name.value.trim(); if(!name){alert('Name is required.');return;}
    const id=f.editId.value||uid();
    if(!f.editId.value && state.wishlist.length>=50){alert('Wishlist limit is 50.');return;}
    const item={id,name,type:f.type.value.trim(),targetPrice:dec(f.targetPrice.value),priority:dec(f.priority.value)||state.wishlist.length+1,image:f.image.value.trim(),notes:f.notes.value.trim()};
    const idx=state.wishlist.findIndex(x=>x.id===id);
    if(idx>=0)state.wishlist[idx]=item; else state.wishlist.push(item);
    state.wishlist.sort((a,b)=>(a.priority||99)-(b.priority||99));
    save(); f.reset(); render(); show('wishlist');
  });
  document.getElementById('wishlistCancelButton').onclick=()=>f.reset();
}
function initSettingsForm(){
  const f=document.getElementById('settingsForm');
  f.ownerName.value=settings.ownerName||'Kenneth'; f.currency.value=settings.currency||'NOK'; f.language.value=settings.language||'en'; f.defaultTastingMl.value=settings.defaultTastingMl||20;
  f.ownerName.addEventListener('input',()=>{settings.ownerName=f.ownerName.value.trim()||'Kenneth';updateTitle();});
  f.addEventListener('submit',e=>{
    e.preventDefault();
    settings.ownerName=f.ownerName.value.trim()||'Kenneth'; settings.currency=f.currency.value; settings.language=f.language.value; settings.defaultTastingMl=dec(f.defaultTastingMl.value)||20;
    saveSettings(); render(); show('home');
  });
}
function initBackup(){
  document.getElementById('exportData').onclick=()=>{
    const blob=new Blob([JSON.stringify({state,settings,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='whiskylog-backup.json'; a.click(); URL.revokeObjectURL(a.href);
  };
  document.getElementById('importData').onclick=()=>{
    try{
      const data=JSON.parse(document.getElementById('importText').value);
      if(data.state){Object.assign(state,data.state);save();}
      if(data.settings){Object.assign(settings,data.settings);saveSettings();}
      render(); show('home');
    }catch(e){alert('Invalid JSON');}
  };
}

function updateTitle(){document.getElementById('appTitle').textContent=`${settings.ownerName||'Kenneth'}'s WhiskyLog`;}

function render(){
  updateTitle();
  renderHome();
  renderPickers();
  renderBaseList();
  renderBottleLists();
  renderTastingPicker();
  renderWishlist();
  renderAnalytics();
  applyLanguage();
}
function renderHome(){
  const totalCost=state.bottles.reduce((a,b)=>a+bottleRemainingValue(b.id),0);
  const totalVol=state.bottles.reduce((a,b)=>a+bottleVolume(b.id),0);
  document.getElementById('mCost').textContent=money(totalCost);
  document.getElementById('mVolume').textContent=ml(totalVol);
  document.getElementById('mOpened').textContent=state.bottles.filter(b=>bottleStatus(b.id)==='opened').length;
  document.getElementById('mTastings').textContent=state.tastings.length;
  renderStatusStats('unopened','homeUnopenedCount','homeUnopenedValue'); renderStatusStats('opened','homeOpenedCount','homeOpenedValue'); renderStatusStats('empty','homeEmptyCount','homeEmptyValue'); renderStrip('unopened','homeUnopenedImages'); renderStrip('opened','homeOpenedImages'); renderStrip('empty','homeEmptyImages');
  const best=state.bottles.slice().sort((a,b)=>(a.price/Math.max(1,bottleVolume(a.id)))-(b.price/Math.max(1,bottleVolume(b.id))))[0];
  document.getElementById('bestValue').textContent=best?bottleName(best):tr('No bottles yet.');
  const lows=state.bottles.filter(b=>bottleStatus(b.id)==='opened'&&bottleVolume(b.id)<100);
  document.getElementById('lowStock').textContent=lows.length?lows.map(bottleName).join(', '):tr('No low-stock bottles.');
}
function renderStatusStats(status,countId,valueId){
  const bottles=state.bottles.filter(b=>bottleStatus(b.id)===status);
  const value=bottles.reduce((a,b)=>a+bottleRemainingValue(b.id),0);
  const countEl=document.getElementById(countId);
  const valueEl=document.getElementById(valueId);
  if(countEl) countEl.textContent=String(bottles.length);
  if(valueEl) valueEl.textContent=money(value);
}
function renderStrip(status,id){
  const el=document.getElementById(id);
  const items=state.bottles.filter(b=>bottleStatus(b.id)===status).slice(0,4);
  el.innerHTML=Array.from({length:4}).map((_,i)=>{
    const base=items[i]?getBase(items[i].baseId):null;
    return base?.image?`<img src="${base.image}" alt="">`:'<div>🥃</div>';
  }).join('');
}
function renderPickers(){
  const sel=document.querySelector('#bottleForm [name="baseId"]');
  const current=sel.value;
  sel.innerHTML=('<option value="">'+tr('Choose library item')+'</option>')+state.bases.map(b=>`<option value="${b.id}">${esc(b.name)}${b.abv?' · '+b.abv+'%':''}${b.volume?' · '+b.volume+' ml':''}</option>`).join('');
  if(current)sel.value=current;
}
function renderBaseList(){
  const q=(document.getElementById('baseSearch').value||'').toLowerCase();
  const items=state.bases.filter(b=>!q||[b.name,b.type,b.distillery,b.region].join(' ').toLowerCase().includes(q));
  document.getElementById('baseList').innerHTML=items.length?items.map(b=>`
    <div class="item">${thumb(b)}<div><div class="title">${esc(b.name)}</div><div class="meta">${esc(b.type)} · ${b.abv||'—'}% · ${b.volume||'—'} ml</div><div class="sub">${esc(b.distillery||'')} ${b.region?'· '+esc(b.region):''}</div></div><div class="side"><button class="ghost small" onclick="editBase('${b.id}')">Edit</button> <button class="ghost small" onclick="deleteBase('${b.id}')">Delete</button></div></div>
  `).join(''):('<div class="card sub">'+tr('No bottles yet.')+'</div>');
}
document.addEventListener('input',e=>{if(e.target.id==='baseSearch')renderBaseList();});

function renderBottleLists(){
  ['unopened','opened','empty'].forEach(status=>{
    const el=document.getElementById(status+'List');
    const items=state.bottles.filter(b=>bottleStatus(b.id)===status);
    el.innerHTML=items.length?items.map(b=>bottleRow(b,status)).join(''):('<div class="card sub">'+tr('No bottles yet.')+'</div>');
  });
}
function bottleRow(b,status){
  const base=getBase(b.baseId);
  const extra=status==='unopened'
    ? `${tr('Purchased')} ${b.purchaseDate||'—'} · ${base?.volume||'—'} ml · ${base?.abv||'—'}%`
    : status==='opened'
      ? `${tr('Purchased')} ${b.purchaseDate||'—'} · ${tr('Opened')} ${b.openedDate||'—'} · ${tr('Last tasted')} ${lastTasted(b.id)||'—'} · ${ml(bottleVolume(b.id))} ${tr('left')} · ${money(bottleRemainingValue(b.id))} ${tr('remaining')}`
      : `${tr('Purchased')} ${b.purchaseDate||'—'} · ${tr('Opened')} ${b.openedDate||'—'} · ${tr('Last tasted')} ${lastTasted(b.id)||'—'}`;
  return `<div class="item" onclick="openBottleDetail('${b.id}','${status}')">${thumb(base)}<div><div class="title">${esc(bottleName(b))}</div><div class="meta">${extra}</div><div class="sub">${esc(base?.type||'')}</div></div><div class="side"><span class="pill">${status}</span></div></div>`;
}
function openBottleDetail(id,returnView='home'){
  currentBottleId=id; detailReturnView=returnView;
  const b=getBottle(id), base=getBase(b.baseId); if(!b||!base)return;
  document.getElementById('bottleDetail').innerHTML=`
    <div class="card themed">${thumb(base)}<h2>${esc(bottleName(b))}</h2><p>${esc(base.type)} · ${base.abv||'—'}% · ${ml(bottleVolume(id))} ${tr('left')} · ${tr('Remaining value')} ${money(bottleRemainingValue(id))}</p></div>
    <div class="grid two">
      ${bottleStatus(id)==='empty'
        ? `<button class="primary" type="button" onclick="newBottlePurchased('${id}')">${tr('New bottle purchased')}</button>`
        : `<button class="primary" type="button" onclick="addTastingForBottle('${id}')">${tr('Add tasting')}</button>`}
      ${bottleStatus(id)==='opened'?`<button class="ghost" type="button" onclick="markEmpty('${id}')">${tr('Last sip enjoyed')}</button>`:''}
      <button class="ghost" type="button" onclick="editBottle('${id}')">${tr('Edit bottle')}</button>
      <button class="ghost" type="button" onclick="deleteBottle('${id}')">${tr('Delete bottle')}</button>
    </div>
    <div class="card"><h3>Notes</h3><p>${esc(b.comments||base.notes||'No notes.')}</p></div>
    <div class="card"><h3>Tastings</h3><div class="list">${state.tastings.filter(t=>t.bottleId===id).map(t=>`<div class="item"><div>📝</div><div><div class="title">${t.date} · ${tr('Average')} ${t.score||'—'}</div><div class="meta">${tr('Appearance')} ${t.appearance||'—'} · ${tr('Nose')} ${t.nose||'—'} · ${tr('Neat')} ${t.tasteNeat||'—'} · ${tr('Water')} ${t.tasteWater||'—'} · ${tr('Finish')} ${t.finish||'—'}</div><div class="sub">${esc(t.notes||'')}</div></div></div>`).join('')||('<div class="sub">'+tr('No bottles yet.')+'</div>')}</div></div>
  `;
  show('bottle-detail');
}
function markEmpty(id){
  if(!confirm('Confirm that this bottle is empty. This cannot be undone automatically.'))return;
  const b=getBottle(id), base=getBase(b.baseId); if(!b||!base)return;
  b.currentWeight=dec(base.emptyWeight)||calculatedEmptyWeight(base)||1;
  save(); render(); show('empty');
}
function renderTastingPicker(){
  const items=state.bottles.filter(b=>['unopened','opened'].includes(bottleStatus(b.id)));
  document.getElementById('tastingBottleList').innerHTML=items.length?items.map(b=>{
    const base=getBase(b.baseId), status=bottleStatus(b.id);
    return `<div class="item" onclick="addTastingForBottle('${b.id}')">${thumb(base)}<div><div class="title">${esc(bottleName(b))}</div><div class="meta">${status} · ${ml(bottleVolume(b.id))} left</div></div><div class="side"><button class="primary small" onclick="event.stopPropagation();addTastingForBottle('${b.id}')">Taste</button></div></div>`;
  }).join(''):('<div class="card sub">'+tr('No bottles yet.')+'</div>');
}
function modalInput(label, opts={}){
  return new Promise(resolve=>{
    const backdrop=document.createElement('div');
    backdrop.className='input-modal-backdrop';
    const isTextarea=opts.multiline===true;
    const inputHtml=isTextarea
      ? `<textarea id="modalInputField" autocomplete="off" autocorrect="on" spellcheck="true">${esc(opts.value||'')}</textarea>`
      : `<input id="modalInputField" type="${opts.type||'text'}" inputmode="${opts.inputmode||'text'}" autocomplete="off" value="${esc(opts.value||'')}">`;
    backdrop.innerHTML=`
      <div class="input-modal">
        <h3>${esc(label)}</h3>
        ${inputHtml}
        <div class="input-modal-actions">
          <button type="button" id="modalCancel">${tr('Cancel')}</button>
          <button type="button" id="modalOk">OK</button>
        </div>
      </div>`;
    document.body.appendChild(backdrop);
    const input=backdrop.querySelector('#modalInputField');
    const done=(value)=>{
      backdrop.remove();
      resolve(value);
    };
    backdrop.querySelector('#modalCancel').onclick=()=>done(null);
    backdrop.querySelector('#modalOk').onclick=()=>done(input.value);
    input.addEventListener('keydown',e=>{
      if(e.key==='Enter' && !isTextarea){e.preventDefault();done(input.value);}
      if(e.key==='Escape'){e.preventDefault();done(null);}
    });
    setTimeout(()=>input.focus(),60);
  });
}
async function scorePrompt(label){
  const value=await modalInput(label+' score 1-10',{type:'number',inputmode:'decimal'});
  if(value===null)return null;
  const n=dec(value);
  if(!n)return 0;
  return Math.max(1,Math.min(10,n));
}
async function addTastingForBottle(id){
  const b=getBottle(id); if(!b)return;
  if(bottleStatus(id)==='empty'){alert('This bottle is empty. Use New bottle purchased instead.');return;}
  const base=getBase(b.baseId); if(!base)return;
  const date=await modalInput('Tasting date',{type:'date',inputmode:'numeric',value:new Date().toISOString().slice(0,10)}); if(!date)return;
  const mlAmount=dec(await modalInput('Amount ml',{type:'number',inputmode:'decimal',value:String(settings.defaultTastingMl||20)})); if(!mlAmount)return;
  const remainingBefore=bottleVolume(id);
  if(mlAmount>remainingBefore){
    const ok=confirm('Tasting amount is higher than calculated remaining volume. Remaining: '+ml(remainingBefore)+'. Continue and mark bottle as empty?');
    if(!ok)return;
  }

  const appearance=await scorePrompt('Appearance');
  if(appearance===null)return;
  const nose=await scorePrompt('Nose / smell');
  if(nose===null)return;
  const tasteNeat=await scorePrompt('Taste neat / undiluted');
  if(tasteNeat===null)return;
  const tasteWater=await scorePrompt('Taste with water');
  if(tasteWater===null)return;
  const finish=await scorePrompt('Finish / aftertaste');
  if(finish===null)return;

  const scoreValues=[appearance,nose,tasteNeat,tasteWater,finish].filter(n=>n>0);
  const score=scoreValues.length ? Math.round((scoreValues.reduce((a,b)=>a+b,0)/scoreValues.length)*10)/10 : 0;
  const notes=(await modalInput('Notes',{multiline:true,value:''}))||'';

  if(!b.openedDate)b.openedDate=date;
  state.tastings.unshift({
    id:uid(),bottleId:id,date,ml:mlAmount,
    appearance,nose,tasteNeat,tasteWater,finish,score,notes
  });

  // Reduce weight as well, so remaining volume updates immediately and consistently.
  const d=densityFromAbv(base.abv);
  if(dec(b.currentWeight)>0){
    const newWeight=Math.max(dec(base.emptyWeight)||calculatedEmptyWeight(base)||0, dec(b.currentWeight) - (mlAmount*d));
    b.currentWeight=Math.round(newWeight);
  }
  save(); render(); show('home');
}



function editBottle(id){
  const b=getBottle(id);
  if(!b){alert('Bottle not found.');return;}
  const f=document.getElementById('bottleForm');
  if(!f){alert('Add bottle form not found.');return;}
  renderPickers();
  f.dataset.editId=id;
  f.baseId.value=b.baseId||'';
  f.batchNo.value=b.batchNo||'';
  f.bottleNo.value=b.bottleNo||'';
  f.price.value=dec(b.price)?fmt(dec(b.price),2)+' '+(settings.currency||'NOK'):'';
  f.purchasePlace.value=b.purchasePlace||'';
  f.purchaseDate.value=b.purchaseDate||new Date().toISOString().slice(0,10);
  f.currentWeight.value=b.currentWeight||'';
  f.comments.value=b.comments||'';
  show('new-bottle');
}

function deleteBottle(id){
  const b=getBottle(id);
  if(!b){alert('Bottle not found.');return;}
  const name=bottleName(b);
  const ok=confirm('Delete bottle permanently?\\n\\nThis will permanently delete "'+name+'" and all tasting notes registered on this bottle. This cannot be undone.');
  if(!ok)return;
  state.bottles=state.bottles.filter(x=>x.id!==id);
  state.tastings=state.tastings.filter(t=>t.bottleId!==id);
  state.comments=state.comments.filter(c=>c.bottleId!==id);
  save();
  render();
  show('home');
}

function newBottlePurchased(oldBottleId){
  const old=getBottle(oldBottleId);
  if(!old){alert('Bottle not found.');return;}
  const base=getBase(old.baseId);
  if(!base){alert('Library item not found.');return;}

  const f=document.getElementById('bottleForm');
  if(!f){alert('Add bottle form not found.');return;}

  renderPickers();

  f.reset();
  delete f.dataset.editId;
  f.baseId.value=old.baseId;
  f.batchNo.value='';
  f.bottleNo.value='';
  f.price.value='';
  f.purchasePlace.value=old.purchasePlace||'';
  f.purchaseDate.value=new Date().toISOString().slice(0,10);
  f.currentWeight.value=base.fullWeight||'';
  f.comments.value='New purchase based on empty bottle: '+bottleName(old);

  show('new-bottle');
}

function renderWishlist(){
  document.getElementById('wishlistList').innerHTML=state.wishlist.length?state.wishlist.map((w,i)=>`
    <div class="item"><div>${i<5?'⭐':'•'}</div><div><div class="title">${esc(w.name)}</div><div class="meta">${esc(w.type||'')} ${w.targetPrice?('· '+money(w.targetPrice)):''}</div><div class="sub">${esc(w.notes||'')}</div></div><div class="side"><button class="ghost small" onclick="deleteWish('${w.id}')">Delete</button></div></div>
  `).join(''):('<div class="sub">'+tr('No bottles yet.')+'</div>');
}
function deleteWish(id){if(confirm('Delete wishlist item?')){state.wishlist=state.wishlist.filter(w=>w.id!==id);save();render();}}
function renderAnalytics(){
  const totalVol=state.bottles.reduce((a,b)=>a+bottleVolume(b.id),0);
  const tasted=state.tastings.reduce((a,t)=>a+dec(t.ml),0);
  document.getElementById('analyticsContent').innerHTML=`
    <div class="card metric"><small>${tr('Stock volume')}</small><strong>${ml(totalVol)}</strong></div>
    <div class="card metric"><small>${tr('Tasted volume')}</small><strong>${ml(tasted)}</strong></div>
    <div class="card metric"><small>${tr('Library items')}</small><strong>${state.bases.length}</strong></div>
    <div class="card metric"><small>${tr('Bottles')}</small><strong>${state.bottles.length}</strong></div>
  `;
}

window.addEventListener('DOMContentLoaded',init);
