
window.WHISKYLOG_VERSION='1.57';
const KEY='whiskylog_stable_v133';
const SETTINGS_KEY='whiskylog_settings_v133';
const DENSITY=[{a:0,d:.9982},{a:40,d:.9319},{a:43,d:.9271},{a:46,d:.9223},{a:50,d:.9157},{a:60,d:.8987}];
let state=read(KEY,{bases:[],bottles:[],tastings:[],comments:[],wishlist:[]});
let settings=Object.assign({ownerName:'Kenneth',currency:'NOK',language:'en',defaultTastingMl:20},read(SETTINGS_KEY,{}));
let currentImage='', detailReturn='stock';
const T={
en:{
journal:'Premium spirits journal',homeTitle:'Your spirits journal',homeSub:'Personal logging for bottles, tastings, stock and future purchases.',myStock:'My stock',myStockSub:'Unopened, opened and empty bottles',logging:'Logging',loggingSub:'Bottle, tasting and stock registration',overview:'Overview / statistics',overviewSub:'Ranking, scores and settings',wishlist:'Wishlist',wishlistSub:'Future bottles',home:'Home',stockSub:'All bottles grouped by status.',unopened:'Unopened bottles',opened:'Opened bottles',empty:'Empty bottles',chooseRegister:'Choose what you want to register.',registerTasting:'Register tasting',tastingSub:'Scores and tasting notes',correctStock:'Correct stock',correctionSub:'Adjust weight or volume without tasting',addBottleStock:'Purchased bottle',addBottleStockSub:'Register a purchased bottle',library:'Bottle library',librarySub:'Core bottle data',libraryRule:'Core data can only be edited here.',name:'Name',distillery:'Distillery / producer',type:'Type',abv:'ABV %',volume:'Bottle volume ml',fullWeight:'Full bottle weight g',region:'Region / country',image:'Image',libraryComment:'Library comment',saveLibrary:'Save library item',libraryItems:'Library items',stockBottleRule:'Choose from library, then enter price, date and comment.',libraryItem:'Library item',price:'Price',purchaseDate:'Purchase date',comment:'Comment',saveBottle:'Save bottle',bottle:'Bottle',newWeight:'New current weight g',orVolume:'Or remaining volume ml',saveCorrection:'Save correction',settings:'Settings',settingsSub:'Name, currency, language and backup',ranking:'Bottle ranking',currency:'Currency',language:'Language',defaultMl:'Default tasting ml',saveSettings:'Save settings',export:'Export backup',import:'Import backup',back:'Back',saveWishlist:'Save wishlist item'},
no:{journal:'Premium brennevinsjournal',homeTitle:'Din personlige brennevinslogg',homeSub:'Personlig loggføring av flasker, smakinger, beholdning og fremtidige kjøp.',myStock:'Min beholdning',myStockSub:'Uåpnede, åpnede og tomme flasker',logging:'Loggføring',loggingSub:'Flaske, smaking og beholdning',overview:'Oversikt / statistikk',overviewSub:'Rangering, score og innstillinger',wishlist:'Ønskeliste',wishlistSub:'Fremtidige flasker',home:'Hjem',stockSub:'Alle flasker gruppert etter status.',unopened:'Uåpnede flasker',opened:'Åpnede flasker',empty:'Tomme flasker',chooseRegister:'Velg hva du vil registrere.',registerTasting:'Registrer smaking',tastingSub:'Score og smaksnotater',correctStock:'Korriger beholdning',correctionSub:'Juster vekt eller volum uten smaking',addBottleStock:'Kjøpt flaske',addBottleStockSub:'Registrer kjøpt flaske',library:'Flaskebibliotek',librarySub:'Grunndata',libraryRule:'Grunndata kan kun redigeres her.',name:'Navn',distillery:'Destilleri / produsent',type:'Type',abv:'Alkohol %',volume:'Flaskevolum ml',fullWeight:'Vekt full flaske g',region:'Region / land',image:'Bilde',libraryComment:'Bibliotekkommentar',saveLibrary:'Lagre i bibliotek',libraryItems:'Bibliotek',stockBottleRule:'Velg fra biblioteket, legg inn pris, dato og kommentar.',libraryItem:'Bibliotekelement',price:'Pris',purchaseDate:'Kjøpsdato',comment:'Kommentar',saveBottle:'Lagre flaske',bottle:'Flaske',newWeight:'Ny nåværende vekt g',orVolume:'Eller restvolum ml',saveCorrection:'Lagre korrigering',settings:'Innstillinger',settingsSub:'Navn, valuta, språk og backup',ranking:'Flaskerangering',currency:'Valuta',language:'Språk',defaultMl:'Standard smaksvolum ml',saveSettings:'Lagre innstillinger',export:'Eksporter backup',import:'Importer backup',back:'Tilbake',saveWishlist:'Lagre ønskeliste'}
};
function tr(k){const lang=settings.language==='no'?'no':'en';return (T[lang]&&T[lang][k])||T.en[k]||k}
function applyLang(){
  document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=tr(e.dataset.i18n));
  document.documentElement.lang=settings.language==='no'?'no':'en';
}
function read(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch{return f}}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function saveSettings(){localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings))}
function uid(){return'id_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2)}
function dec(v){let n=Number(String(v??'').replace(',','.').replace(/[^\d.-]/g,''));return Number.isFinite(n)?n:0}
function fmt(n,d=0){return Number(n||0).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d})}
function money(v){return `${fmt(v,2)} ${settings.currency}`}
function ml(v){return `${fmt(v,0)} ml`}
function esc(s){return String(s??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]))}
function getBase(id){return state.bases.find(x=>x.id===id)}
function getBottle(id){return state.bottles.find(x=>x.id===id)}
function density(abv){abv=dec(abv);let best=DENSITY[0];for(const x of DENSITY){if(Math.abs(x.a-abv)<Math.abs(best.a-abv))best=x}return best.d}
function emptyWeight(base){const full=dec(base.fullWeight), vol=dec(base.volume);return full&&vol?Math.max(0,Math.round(full-vol*density(base.abv))):0}
function bottleName(b){return getBase(b.baseId)?.name||'Unknown bottle'}
function tastedVolume(id){return state.tastings.filter(t=>t.bottleId===id).reduce((a,t)=>a+dec(t.ml),0)}
function volumeFromWeight(b){const base=getBase(b.baseId); if(!base)return 0; const full=dec(base.fullWeight), empty=emptyWeight(base), vol=dec(base.volume); let cur=dec(b.currentWeight)||full; if(!full||!empty||full<=empty)return Math.max(0,vol-tastedVolume(b.id)); if(cur<=empty)return 0; if(cur>=full)return vol; return Math.round(vol*((cur-empty)/(full-empty)))}
function bottleVolume(id){const b=getBottle(id); if(!b)return 0; return dec(b.currentWeight)>0?volumeFromWeight(b):Math.max(0,dec(getBase(b.baseId)?.volume)-tastedVolume(id))}
function bottleValue(id){const b=getBottle(id), base=b&&getBase(b.baseId); return b&&base&&dec(base.volume)?dec(b.price)*(bottleVolume(id)/dec(base.volume)):0}
function status(id){const b=getBottle(id); if(!b)return'empty'; if(bottleVolume(id)<=0)return'empty'; if(b.openedDate||state.tastings.some(t=>t.bottleId===id))return'opened'; return'unopened'}
function lastTasted(id){return state.tastings.filter(t=>t.bottleId===id).sort((a,b)=>String(b.date).localeCompare(String(a.date)))[0]?.date||''}
function thumb(base){return base?.image?`<img class="thumb" src="${base.image}" alt="">`:`<div class="thumb">🥃</div>`}
function mini(base){return base?.image?`<img src="${base.image}" alt="">`:`<div class="mini-fallback">🥃</div>`}
function addLog(bottleId,type,text){if(!Array.isArray(state.comments))state.comments=[]; if(text)state.comments.unshift({id:uid(),bottleId,type,date:new Date().toLocaleString('sv-SE'),text})}
function show(id){document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));window.scrollTo(0,0);applyLang();render()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-view]'); if(!b)return; e.preventDefault(); show(b.dataset.view)},true);

function init(){document.getElementById('appTitle').textContent=`${settings.ownerName}'s WhiskyLog`;bindForms();render();show('home')}
function bindForms(){
  document.getElementById('libraryForm').addEventListener('submit',saveLibraryItem);
  document.getElementById('libraryForm').image.addEventListener('change',async e=>{const f=e.target.files[0];if(f){currentImage=await resize(f);imagePreview.src=currentImage;imagePreview.classList.remove('hidden')}});
  document.getElementById('bottleForm').addEventListener('submit',saveBottleItem);
  document.getElementById('correctionForm').addEventListener('submit',saveCorrection);
  document.getElementById('wishForm').addEventListener('submit',saveWish);
  const sf=document.getElementById('settingsForm');sf.ownerName.value=settings.ownerName;sf.currency.value=settings.currency;sf.language.value=settings.language;sf.defaultMl.value=settings.defaultTastingMl;sf.addEventListener('submit',e=>{e.preventDefault();settings.ownerName=sf.ownerName.value||'Kenneth';settings.currency=sf.currency.value;settings.language=sf.language.value;settings.defaultTastingMl=dec(sf.defaultMl.value)||20;saveSettings();document.getElementById('appTitle').textContent=`${settings.ownerName}'s WhiskyLog`;render();show('overview')});
  exportBtn.onclick=()=>{const blob=new Blob([JSON.stringify({state,settings},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='whiskylog-backup.json';a.click()};
  importBtn.onclick=()=>{try{const d=JSON.parse(importText.value);if(d.state){state=Object.assign({bases:[],bottles:[],tastings:[],comments:[],wishlist:[]},d.state);save()}if(d.settings){settings=Object.assign(settings,d.settings);saveSettings()}render();show('home')}catch{alert('Invalid JSON')}};
}
async function resize(file){return new Promise((resolve,reject)=>{const fr=new FileReader();fr.onload=()=>{const img=new Image();img.onload=()=>{const r=Math.min(1,1000/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*r);c.height=Math.round(img.height*r);c.getContext('2d').drawImage(img,0,0,c.width,c.height);resolve(c.toDataURL('image/jpeg',.82))};img.onerror=reject;img.src=fr.result};fr.readAsDataURL(file)})}

function saveLibraryItem(e){e.preventDefault();const f=e.target;const id=f.id.value||uid();const old=getBase(id);const item={id,name:f.name.value.trim(),distillery:f.distillery.value.trim(),type:f.type.value,abv:dec(f.abv.value),volume:dec(f.volume.value),fullWeight:dec(f.fullWeight.value),region:f.region.value.trim(),image:currentImage||old?.image||'',notes:f.notes.value.trim()};if(!item.name)return alert('Name required');const i=state.bases.findIndex(x=>x.id===id);if(i>=0)state.bases[i]=item;else state.bases.unshift(item);currentImage='';f.reset();imagePreview.classList.add('hidden');save();render();show('logging')}
function editBase(id){const b=getBase(id);if(!b)return;const f=libraryForm;f.id.value=b.id;f.name.value=b.name||'';f.distillery.value=b.distillery||'';f.type.value=b.type||'';f.abv.value=b.abv||'';f.volume.value=b.volume||'';f.fullWeight.value=b.fullWeight||'';f.region.value=b.region||'';f.notes.value=b.notes||'';currentImage=b.image||'';if(b.image){imagePreview.src=b.image;imagePreview.classList.remove('hidden')}show('library')}
function saveBottleItem(e){e.preventDefault();const f=e.target;let base=getBase(f.baseId.value);if(!base){const input=document.getElementById('baseSearchInput');if(input){const val=input.value.toLowerCase();const match=state.bases.find(b=>optionLabelForBase(b).toLowerCase()===val)||state.bases.find(b=>String(b.name||'').toLowerCase().includes(val));if(match){f.baseId.value=match.id;base=match;}}}if(!base)return alert('Choose library item');const id=f.id.value||uid();let b=getBottle(id);if(!b){b={id,baseId:base.id,price:0,purchaseDate:'',comments:'',openedDate:'',currentWeight:dec(base.fullWeight)};state.bottles.unshift(b)}b.baseId=base.id;b.price=dec(f.price.value);b.purchaseDate=f.purchaseDate.value||new Date().toISOString().slice(0,10);b.comments=f.comments.value.trim();addLog(b.id,'purchase',b.comments);f.reset();const baseSearch=document.getElementById('baseSearchInput');if(baseSearch)baseSearch.value='';f.purchaseDate.value=new Date().toISOString().slice(0,10);save();render();show('logging')}
function editBottle(id){const b=getBottle(id);if(!b)return;const f=bottleForm;f.id.value=id;renderPickers();f.baseId.value=b.baseId;f.price.value=b.price?money(b.price):'';f.purchaseDate.value=b.purchaseDate||'';f.comments.value=b.comments||'';show('addBottle')}
function deleteBottle(id){const b=getBottle(id);if(!b)return;if(confirm('Delete bottle permanently?\n\nThis cannot be undone.')){state.bottles=state.bottles.filter(x=>x.id!==id);state.tastings=state.tastings.filter(t=>t.bottleId!==id);state.comments=state.comments.filter(c=>c.bottleId!==id);save();render();show('stock')}}
function saveCorrection(e){e.preventDefault();const f=e.target;let b=getBottle(f.bottleId.value);if(!b){const input=document.getElementById('correctionBottleSearchInput');if(input){const val=input.value.toLowerCase();const bottles=state.bottles.filter(x=>status(x.id)!=='empty');const match=bottles.find(x=>optionLabelForBottle(x).toLowerCase()===val)||bottles.find(x=>bottleName(x).toLowerCase().includes(val));if(match){f.bottleId.value=match.id;b=match;}}}const base=b&&getBase(b.baseId);if(!b||!base)return alert('Choose bottle');let w=dec(f.weight.value);const rem=dec(f.remaining.value);if(!w&&rem){const empty=emptyWeight(base), full=dec(base.fullWeight), vol=dec(base.volume);w=Math.round(empty+(rem/vol)*(full-empty))}if(!w)return alert('Enter weight or remaining volume');b.currentWeight=w;addLog(b.id,'correction',f.comment.value.trim()||'Stock corrected');f.reset();const corrSearch=document.getElementById('correctionBottleSearchInput');if(corrSearch)corrSearch.value='';save();render();show('logging')}
async function addTasting(id){const b=getBottle(id), base=b&&getBase(b.baseId);if(!b||!base)return;if(status(id)==='empty')return alert('Empty bottle');const date=await modal('Tasting date',{type:'date',inputmode:'none',value:new Date().toISOString().slice(0,10)});if(!date)return;const amount=dec(await modal('Amount ml',{type:'number',inputmode:'decimal',value:String(settings.defaultTastingMl)}));if(!amount)return;const scores=[];for(const label of ['Appearance','Nose / smell','Taste neat','Taste with water','Finish']){const s=await modal(label+' score 1-10',{type:'number',inputmode:'decimal'});if(s===null)return;scores.push(Math.max(1,Math.min(10,dec(s)||0)))}const notes=await modal('Notes',{multiline:true})||'';const avg=Math.round(scores.reduce((a,b)=>a+b,0)/scores.length*10)/10;if(!b.openedDate)b.openedDate=date;state.tastings.unshift({id:uid(),bottleId:id,date,ml:amount,appearance:scores[0],nose:scores[1],tasteNeat:scores[2],tasteWater:scores[3],finish:scores[4],score:avg,notes});if(dec(b.currentWeight)>0)b.currentWeight=Math.max(emptyWeight(base),Math.round(dec(b.currentWeight)-amount*density(base.abv)));addLog(id,'tasting',notes||'Tasting registered');save();render();show('logging')}
function markEmpty(id){const b=getBottle(id),base=b&&getBase(b.baseId);if(!b||!base)return;if(confirm('Confirm empty bottle?')){b.currentWeight=emptyWeight(base);addLog(id,'correction','Marked empty');save();render();show('stock')}}
function repurchase(id){const old=getBottle(id);if(!old)return;renderPickers();bottleForm.reset();bottleForm.id.value='';bottleForm.baseId.value=old.baseId;bottleForm.purchaseDate.value=new Date().toISOString().slice(0,10);show('addBottle')}
function saveWish(e){e.preventDefault();const f=e.target;state.wishlist.push({id:uid(),name:f.name.value,notes:f.notes.value});f.reset();save();render()}

function modal(label,opts={}){return new Promise(resolve=>{const bg=document.createElement('div');bg.className='input-modal-backdrop';bg.innerHTML=`<div class="input-modal"><h3>${esc(label)}</h3>${opts.multiline?`<textarea id="mi">${esc(opts.value||'')}</textarea>`:`<input id="mi" type="${opts.type||'text'}" inputmode="${opts.inputmode||'text'}" autocomplete="off" value="${esc(opts.value||'')}">`}<div class="input-modal-actions"><button id="mc">Cancel</button><button id="mo">OK</button></div></div>`;document.body.appendChild(bg);const i=bg.querySelector('#mi');bg.querySelector('#mc').onclick=()=>{bg.remove();resolve(null)};bg.querySelector('#mo').onclick=()=>{const v=i.value;bg.remove();resolve(v)};setTimeout(()=>i.focus(),50)})}

function render(){applyLang();renderPickers();renderStock();renderLists();renderLibrary();renderTastingPicker();renderCorrectionPicker();renderOverview();renderWish()}
function renderPickers(){const opts='<option value="">Choose bottle</option>'+state.bases.map(b=>`<option value="${b.id}">${esc(b.name)} · ${b.abv||'—'}% · ${b.volume||'—'} ml</option>`).join('');bottleForm.baseId.innerHTML=opts}
function renderStock(){[['unopened',sumUnopened,imgUnopened],['opened',sumOpened,imgOpened],['empty',sumEmpty,imgEmpty]].forEach(([s,el,img])=>{const bs=state.bottles.filter(b=>status(b.id)===s);el.textContent=`${bs.length} bottles · ${money(bs.reduce((a,b)=>a+bottleValue(b.id),0))}`;img.innerHTML=[0,1,2,3].map(i=>mini(getBase(bs[i]?.baseId))).join('')})}
function renderLists(){['unopened','opened','empty'].forEach(s=>{const el=document.getElementById(s+'List');if(!el)return;const bs=state.bottles.filter(b=>status(b.id)===s);el.innerHTML=bs.map(bottleRow).join('')||'<div class="sub">No bottles yet.</div>'})}
function bottleRow(b){const base=getBase(b.baseId),s=status(b.id);return`<div class="item" onclick="openDetail('${b.id}','${s}')">${thumb(base)}<div><div class="title">${esc(bottleName(b))}</div><div class="meta">${s==='opened'?`${ml(bottleVolume(b.id))} left · ${money(bottleValue(b.id))}`:`${base?.volume||'—'} ml · ${base?.abv||'—'}%`}</div><div class="sub">${esc(base?.type||'')}</div></div><div class="side"><span class="pill">${s}</span></div></div>`}
function renderLibrary(){libraryList.innerHTML=state.bases.map(b=>`<div class="item">${thumb(b)}<div><div class="title">${esc(b.name)}</div><div class="meta">${esc(b.type)} · ${b.abv||'—'}% · ${b.volume||'—'} ml</div></div><div class="side"><button class="ghost" onclick="editBase('${b.id}')">Edit</button></div></div>`).join('')||'<div class="sub">No library items.</div>'}
function renderTastingPicker(){const bs=state.bottles.filter(b=>status(b.id)!=='empty');tastingList.innerHTML=bs.map(b=>`<div class="item" onclick="addTasting('${b.id}')">${thumb(getBase(b.baseId))}<div><div class="title">${esc(bottleName(b))}</div><div class="meta">${ml(bottleVolume(b.id))} left</div></div></div>`).join('')||'<div class="sub">No bottles.</div>'}
function renderCorrectionPicker(){correctionForm.bottleId.innerHTML='<option value="">Choose bottle</option>'+state.bottles.filter(b=>status(b.id)!=='empty').map(b=>`<option value="${b.id}">${esc(bottleName(b))} · ${ml(bottleVolume(b.id))}</option>`).join('')}
function openDetail(id,rv='stock'){detailReturn=rv;const b=getBottle(id),base=b&&getBase(b.baseId);if(!b||!base)return;const logs=state.comments.filter(c=>c.bottleId===id).map(c=>`<div class="item"><div>💬</div><div><div class="title">${esc(c.date)} · ${esc(c.type)}</div><div class="sub">${esc(c.text)}</div></div></div>`).join('')||'<div class="sub">No notes.</div>';const ts=state.tastings.filter(t=>t.bottleId===id).map(t=>`<div class="item"><div>📝</div><div><div class="title">${esc(t.date)} · Average ${t.score||'—'}</div><div class="meta">Appearance ${t.appearance||'—'} · Nose ${t.nose||'—'} · Neat ${t.tasteNeat||'—'} · Water ${t.tasteWater||'—'} · Finish ${t.finish||'—'}</div><div class="sub">${esc(t.notes||'')}</div></div></div>`).join('')||'<div class="sub">No tastings.</div>';detailContent.innerHTML=`<div class="card hero">${thumb(base)}<h2>${esc(base.name)}</h2><p>${esc(base.type)} · ${base.abv||'—'}% · ${ml(bottleVolume(id))} left · ${money(bottleValue(id))}</p></div><div class="grid two">${status(id)==='empty'?`<button class="primary" onclick="repurchase('${id}')">New bottle purchased</button>`:`<button class="primary" onclick="addTasting('${id}')">Add tasting</button>`}${status(id)==='opened'?`<button class="ghost" onclick="markEmpty('${id}')">Last sip enjoyed</button>`:''}<button class="ghost" onclick="editBottle('${id}')">Edit bottle</button><button class="ghost" onclick="deleteBottle('${id}')">Delete bottle</button></div><div class="card"><h3>Notes</h3><div class="list">${logs}</div></div><div class="card"><h3>Tastings</h3><div class="list">${ts}</div></div>`;document.querySelector('#detail .back').dataset.view=detailReturn;show('detail')}
function renderOverview(){const ranked=state.bases.map(base=>{const ids=state.bottles.filter(b=>b.baseId===base.id).map(b=>b.id);const ts=state.tastings.filter(t=>ids.includes(t.bottleId));const avg=ts.length?Math.round(ts.reduce((a,t)=>a+dec(t.score),0)/ts.length*10)/10:0;return{base,avg,count:ts.length}}).sort((a,b)=>b.avg-a.avg);rankingList.innerHTML=ranked.map(r=>`<div class="item">${thumb(r.base)}<div><div class="title">${esc(r.base.name)}</div><div class="meta">Average ${r.avg||'—'} · ${r.count} tastings</div><div class="sub">${esc(r.base.notes||'')}</div></div></div>`).join('')||'<div class="sub">No data.</div>'}
function renderWish(){wishList.innerHTML=state.wishlist.map(w=>`<div class="item"><div>⭐</div><div><div class="title">${esc(w.name)}</div><div class="sub">${esc(w.notes||'')}</div></div></div>`).join('')||'<div class="sub">No wishlist items.</div>'}
window.addEventListener('DOMContentLoaded',init);


/* v1.51 searchable library/bottle pickers + shortcut refresh */
function optionLabelForBase(base){
  return `${base.name||'Unnamed'}${base.abv?' · '+base.abv+'%':''}${base.volume?' · '+base.volume+' ml':''}`;
}
function optionLabelForBottle(bottle){
  return `${bottleName(bottle)} · ${ml(bottleVolume(bottle.id))}`;
}
function syncBaseSearchFromSelect(){
  const f=document.getElementById('bottleForm');
  const input=document.getElementById('baseSearchInput');
  if(!f||!input)return;
  const base=getBase(f.baseId.value);
  input.value=base?optionLabelForBase(base):'';
}
function setupSearchablePickers(){
  const baseInput=document.getElementById('baseSearchInput');
  const baseList=document.getElementById('baseOptionsList');
  const bottleForm=document.getElementById('bottleForm');
  if(baseInput&&baseList&&bottleForm){
    baseList.innerHTML=state.bases.map(b=>`<option value="${esc(optionLabelForBase(b))}"></option>`).join('');
    baseInput.oninput=baseInput.onchange=()=>{
      const val=baseInput.value.toLowerCase();
      const match=state.bases.find(b=>optionLabelForBase(b).toLowerCase()===val)||
                  state.bases.find(b=>String(b.name||'').toLowerCase().includes(val));
      bottleForm.baseId.value=match?match.id:'';
    };
  }
  const corrInput=document.getElementById('correctionBottleSearchInput');
  const corrList=document.getElementById('correctionBottleOptionsList');
  const corrForm=document.getElementById('correctionForm');
  if(corrInput&&corrList&&corrForm){
    const bottles=state.bottles.filter(b=>status(b.id)!=='empty');
    corrList.innerHTML=bottles.map(b=>`<option value="${esc(optionLabelForBottle(b))}"></option>`).join('');
    corrInput.oninput=corrInput.onchange=()=>{
      const val=corrInput.value.toLowerCase();
      const match=bottles.find(b=>optionLabelForBottle(b).toLowerCase()===val)||
                  bottles.find(b=>bottleName(b).toLowerCase().includes(val));
      corrForm.bottleId.value=match?match.id:'';
    };
  }
}
const oldRender_v151=render;
render=function(){
  oldRender_v151();
  setupSearchablePickers();
};
const oldEditBottle_v151=editBottle;
editBottle=function(id){
  oldEditBottle_v151(id);
  setTimeout(()=>{syncBaseSearchFromSelect();hideChoiceList_v153(document.getElementById('baseSuggestionList'));},0);
};


/* v1.52 robust library save/edit flow */
let libraryReturnMode_v152='logging';

function clearLibraryForm_v152(){
  const f=document.getElementById('libraryForm');
  if(!f)return;
  f.reset();
  f.id.value='';
  currentImage='';
  f.classList.remove('editing');
  const p=document.getElementById('imagePreview');
  if(p){p.classList.add('hidden');p.removeAttribute('src');}
}

function libraryItemFromForm_v152(){
  const f=document.getElementById('libraryForm');
  const id=f.id.value||uid();
  const old=getBase(id);
  return {
    id,
    name:String(f.name.value||'').trim(),
    distillery:String(f.distillery.value||'').trim(),
    type:String(f.type.value||'').trim(),
    abv:dec(f.abv.value),
    volume:dec(f.volume.value),
    fullWeight:dec(f.fullWeight.value),
    region:String(f.region.value||'').trim(),
    image:currentImage || (old&&old.image||''),
    notes:String(f.notes.value||'').trim()
  };
}

function saveLibraryItem_v152(mode='logging'){
  const f=document.getElementById('libraryForm');
  if(!f)return false;
  const item=libraryItemFromForm_v152();
  if(!item.name){alert('Name is required.');return false;}
  if(!item.type){alert('Type is required.');return false;}
  const idx=state.bases.findIndex(x=>x.id===item.id);
  if(idx>=0)state.bases[idx]=item; else state.bases.unshift(item);
  save();
  render();
  if(typeof setupSearchablePickers==='function')setupSearchablePickers();
  const baseInput=document.getElementById('baseSearchInput');
  const bottleForm=document.getElementById('bottleForm');
  if(baseInput&&bottleForm&&typeof optionLabelForBase==='function'){
    bottleForm.baseId.value=item.id;
    baseInput.value=optionLabelForBase(item);
  }
  clearLibraryForm_v152();
  show(mode==='new'?'library':mode==='stock'?'addBottle':'logging');
  return true;
}

function initLibraryForm_v152(){
  const f=document.getElementById('libraryForm');
  if(!f||f.dataset.v152Bound==='1')return;
  f.dataset.v152Bound='1';
  f.addEventListener('submit',e=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    saveLibraryItem_v152(libraryReturnMode_v152||'logging');
    libraryReturnMode_v152='logging';
  },true);
  const saveNew=document.getElementById('librarySaveNewButton');
  if(saveNew)saveNew.onclick=e=>{e.preventDefault();libraryReturnMode_v152='new';saveLibraryItem_v152('new');};
  const clear=document.getElementById('libraryClearButton');
  if(clear)clear.onclick=e=>{e.preventDefault();clearLibraryForm_v152();};
}

editBase=function(id){
  const b=getBase(id);
  if(!b)return;
  const f=document.getElementById('libraryForm');
  show('library');
  f.id.value=b.id;
  f.name.value=b.name||'';
  f.distillery.value=b.distillery||'';
  f.type.value=b.type||'';
  f.abv.value=b.abv||'';
  f.volume.value=b.volume||'';
  f.fullWeight.value=b.fullWeight||'';
  f.region.value=b.region||'';
  f.notes.value=b.notes||'';
  currentImage=b.image||'';
  f.classList.add('editing');
  const p=document.getElementById('imagePreview');
  if(p&&b.image){p.src=b.image;p.classList.remove('hidden');}
};

const oldRender_v152=render;
render=function(){
  oldRender_v152();
  initLibraryForm_v152();
  if(typeof setupSearchablePickers==='function')setupSearchablePickers();
};


/* v1.53 readable custom choice lists */
function showChoiceList_v153(listEl){if(listEl)listEl.classList.remove('hidden')}
function hideChoiceList_v153(listEl){if(listEl)listEl.classList.add('hidden')}
function normalizeText_v153(value){return String(value||'').toLowerCase().trim()}
function renderBaseChoices_v153(filter=''){
  const list=document.getElementById('baseSuggestionList'), input=document.getElementById('baseSearchInput'), form=document.getElementById('bottleForm');
  if(!list||!input||!form)return;
  const q=normalizeText_v153(filter||input.value);
  const items=state.bases.filter(b=>!q||normalizeText_v153(`${b.name} ${b.type} ${b.distillery} ${b.region}`).includes(q)).slice(0,12);
  if(!items.length){list.innerHTML='<div class="choice-empty">No matching bottles in library. Add the bottle to the library first.</div>';showChoiceList_v153(list);return}
  list.innerHTML=items.map(b=>`<button type="button" class="choice-option" data-base-id="${b.id}"><strong>${esc(b.name||'Unnamed')}</strong><small>${esc(b.type||'Unknown type')} · ${b.abv||'—'}% · ${b.volume||'—'} ml ${b.distillery?'· '+esc(b.distillery):''}</small></button>`).join('');
  list.querySelectorAll('[data-base-id]').forEach(btn=>{btn.onclick=()=>{const base=getBase(btn.dataset.baseId);form.baseId.value=btn.dataset.baseId;input.value=base?optionLabelForBase(base):'';hideChoiceList_v153(list)}});
  showChoiceList_v153(list);
}
function renderCorrectionChoices_v153(filter=''){
  const list=document.getElementById('correctionSuggestionList'), input=document.getElementById('correctionBottleSearchInput'), form=document.getElementById('correctionForm');
  if(!list||!input||!form)return;
  const q=normalizeText_v153(filter||input.value);
  const bottles=state.bottles.filter(b=>status(b.id)!=='empty');
  const items=bottles.filter(b=>{const base=getBase(b.baseId);return !q||normalizeText_v153(`${bottleName(b)} ${base&&base.type||''}`).includes(q)}).slice(0,12);
  if(!items.length){list.innerHTML='<div class="choice-empty">No matching bottles in current stock.</div>';showChoiceList_v153(list);return}
  list.innerHTML=items.map(b=>{const base=getBase(b.baseId);return `<button type="button" class="choice-option" data-bottle-id="${b.id}"><strong>${esc(bottleName(b))}</strong><small>${esc(base&&base.type||'')} · ${ml(bottleVolume(b.id))} left · ${money(bottleValue(b.id))}</small></button>`}).join('');
  list.querySelectorAll('[data-bottle-id]').forEach(btn=>{btn.onclick=()=>{const b=getBottle(btn.dataset.bottleId);form.bottleId.value=btn.dataset.bottleId;input.value=b?optionLabelForBottle(b):'';hideChoiceList_v153(list)}});
  showChoiceList_v153(list);
}
function initReadableChoiceMenus_v153(){
  const baseInput=document.getElementById('baseSearchInput');
  if(baseInput&&baseInput.dataset.v153Bound!=='1'){baseInput.dataset.v153Bound='1';baseInput.addEventListener('focus',()=>renderBaseChoices_v153(baseInput.value));baseInput.addEventListener('input',()=>renderBaseChoices_v153(baseInput.value))}
  const corrInput=document.getElementById('correctionBottleSearchInput');
  if(corrInput&&corrInput.dataset.v153Bound!=='1'){corrInput.dataset.v153Bound='1';corrInput.addEventListener('focus',()=>renderCorrectionChoices_v153(corrInput.value));corrInput.addEventListener('input',()=>renderCorrectionChoices_v153(corrInput.value))}
}
document.addEventListener('click',e=>{const inside=e.target.closest('#baseSearchInput,#baseSuggestionList,#correctionBottleSearchInput,#correctionSuggestionList');if(!inside){hideChoiceList_v153(document.getElementById('baseSuggestionList'));hideChoiceList_v153(document.getElementById('correctionSuggestionList'))}},true);
const oldRender_v153=render;
render=function(){oldRender_v153();initReadableChoiceMenus_v153()};


/* v1.54 robust Add bottle to stock fix */
function selectedBaseFromAddBottle_v154(){
  const f=document.getElementById('bottleForm');
  if(!f)return null;

  // 1. Prefer hidden select when set by tapping a custom choice.
  let base=getBase(f.baseId.value);
  if(base)return base;

  // 2. Fall back to visible search input.
  const input=document.getElementById('baseSearchInput');
  const raw=String(input&&input.value||'').trim();
  if(!raw)return null;
  const q=raw.toLowerCase();

  base=state.bases.find(b=>typeof optionLabelForBase==='function' && optionLabelForBase(b).toLowerCase()===q);
  if(base){f.baseId.value=base.id;return base;}

  base=state.bases.find(b=>String(b.name||'').toLowerCase()===q);
  if(base){f.baseId.value=base.id;return base;}

  base=state.bases.find(b=>String(b.name||'').toLowerCase().includes(q) || q.includes(String(b.name||'').toLowerCase()));
  if(base){f.baseId.value=base.id;return base;}

  return null;
}

function saveBottleItem_v154(e){
  if(e){
    e.preventDefault();
    e.stopImmediatePropagation();
  }
  const f=document.getElementById('bottleForm');
  if(!f)return false;

  const base=selectedBaseFromAddBottle_v154();
  if(!base){
    alert('Choose a library item first. Type and tap one of the results.');
    return false;
  }

  const id=(f.id&&f.id.value)||uid();
  let b=getBottle(id);
  const isNew=!b;
  if(!b){
    b={
      id,
      baseId:base.id,
      price:0,
      purchaseDate:'',
      comments:'',
      openedDate:'',
      currentWeight:dec(base.fullWeight)
    };
    state.bottles.unshift(b);
  }

  b.baseId=base.id;
  b.price=dec(f.price.value);
  b.purchaseDate=f.purchaseDate.value||new Date().toISOString().slice(0,10);
  b.comments=String(f.comments.value||'').trim();
  if(!b.currentWeight)b.currentWeight=dec(base.fullWeight);

  if(b.comments){
    addLog(b.id,isNew?'purchase':'manual',b.comments);
  }

  save();
  f.reset();
  f.id.value='';
  f.purchaseDate.value=new Date().toISOString().slice(0,10);
  const input=document.getElementById('baseSearchInput');
  if(input)input.value='';
  if(typeof hideChoiceList_v153==='function')hideChoiceList_v153(document.getElementById('baseSuggestionList'));

  render();
  show('stock');
  return true;
}

function initAddBottleForm_v154(){
  const f=document.getElementById('bottleForm');
  if(!f||f.dataset.v154Bound==='1')return;
  f.dataset.v154Bound='1';
  f.addEventListener('submit',saveBottleItem_v154,true);
}

// Override editBottle so the visible searchable field is always populated.
const oldEditBottle_v154=editBottle;
editBottle=function(id){
  const b=getBottle(id);
  if(!b)return;
  oldEditBottle_v154(id);
  setTimeout(()=>{
    const f=document.getElementById('bottleForm');
    const input=document.getElementById('baseSearchInput');
    const base=getBase(b.baseId);
    if(f)f.baseId.value=b.baseId;
    if(input&&base&&typeof optionLabelForBase==='function')input.value=optionLabelForBase(base);
  },0);
};

const oldRender_v154=render;
render=function(){
  oldRender_v154();
  // disabled by v1.55
  // initAddBottleForm_v154();
};


/* v1.55 purchased bottle final fix */
let selectedBaseId_v155='';

function setSelectedBase_v155(base){
  const f=document.getElementById('bottleForm');
  const input=document.getElementById('baseSearchInput');
  const status=document.getElementById('selectedBaseStatus');
  if(!base||!f)return;
  selectedBaseId_v155=base.id;
  f.baseId.value=base.id;
  if(input)input.value=optionLabelForBase(base);
  if(status){
    status.textContent='Selected: '+optionLabelForBase(base);
    status.classList.add('ok');
  }
  if(typeof hideChoiceList_v153==='function')hideChoiceList_v153(document.getElementById('baseSuggestionList'));
}

function clearSelectedBase_v155(){
  const f=document.getElementById('bottleForm');
  const input=document.getElementById('baseSearchInput');
  const status=document.getElementById('selectedBaseStatus');
  selectedBaseId_v155='';
  if(f)f.baseId.value='';
  if(input)input.value='';
  if(status){
    status.textContent='No bottle selected';
    status.classList.remove('ok');
  }
}

function renderBaseChoices_v155(filter=''){
  const list=document.getElementById('baseSuggestionList');
  const input=document.getElementById('baseSearchInput');
  if(!list||!input)return;
  const q=String(filter||input.value||'').toLowerCase().trim();
  const items=state.bases
    .filter(b=>!q || String(`${b.name} ${b.type} ${b.distillery} ${b.region}`).toLowerCase().includes(q))
    .slice(0,20);

  if(!items.length){
    list.innerHTML='<div class="choice-empty">No matching bottles in library. Add the bottle to the library first.</div>';
    list.classList.remove('hidden');
    return;
  }

  list.innerHTML=items.map(b=>`
    <button type="button" class="choice-option" data-base-id="${b.id}">
      <strong>${esc(b.name||'Unnamed')}</strong>
      <small>${esc(b.type||'Unknown type')} · ${b.abv||'—'}% · ${b.volume||'—'} ml ${b.distillery?'· '+esc(b.distillery):''}</small>
    </button>
  `).join('');

  list.querySelectorAll('[data-base-id]').forEach(btn=>{
    btn.onclick=()=>{
      const base=getBase(btn.dataset.baseId);
      if(base)setSelectedBase_v155(base);
    };
  });
  list.classList.remove('hidden');
}

function getSelectedBaseForPurchase_v155(){
  const f=document.getElementById('bottleForm');
  const input=document.getElementById('baseSearchInput');
  let base=getBase(selectedBaseId_v155) || getBase(f&&f.baseId&&f.baseId.value);
  if(base)return base;

  const raw=String(input&&input.value||'').trim();
  if(!raw)return null;
  const q=raw.toLowerCase();

  base=state.bases.find(b=>optionLabelForBase(b).toLowerCase()===q) ||
       state.bases.find(b=>String(b.name||'').toLowerCase()===q) ||
       state.bases.find(b=>String(b.name||'').toLowerCase().includes(q) || q.includes(String(b.name||'').toLowerCase()));
  if(base)setSelectedBase_v155(base);
  return base||null;
}

function savePurchasedBottle_v155(e){
  if(e){
    e.preventDefault();
    e.stopImmediatePropagation();
  }
  const f=document.getElementById('bottleForm');
  if(!f)return false;
  const base=getSelectedBaseForPurchase_v155();
  if(!base){
    alert('Choose a bottle from the list first. If it is not listed, add it to the library first.');
    return false;
  }

  const id=(f.id&&f.id.value)||uid();
  let b=getBottle(id);
  const isNew=!b;
  if(!b){
    b={
      id,
      baseId:base.id,
      price:0,
      purchaseDate:'',
      comments:'',
      openedDate:'',
      currentWeight:dec(base.fullWeight)
    };
    state.bottles.unshift(b);
  }

  b.baseId=base.id;
  b.price=dec(f.price.value);
  b.purchaseDate=f.purchaseDate.value||new Date().toISOString().slice(0,10);
  b.comments=String(f.comments.value||'').trim();
  if(!b.currentWeight)b.currentWeight=dec(base.fullWeight);

  if(b.comments)addLog(b.id,isNew?'purchase':'manual',b.comments);

  save();
  f.reset();
  f.id.value='';
  f.purchaseDate.value=new Date().toISOString().slice(0,10);
  clearSelectedBase_v155();
  render();
  show('stock');
  return true;
}

function initPurchasedBottle_v155(){
  const f=document.getElementById('bottleForm');
  const input=document.getElementById('baseSearchInput');
  if(f&&f.dataset.v155Bound!=='1'){
    f.dataset.v155Bound='1';
    f.addEventListener('submit',savePurchasedBottle_v155,true);
  }
  if(input&&input.dataset.v155Bound!=='1'){
    input.dataset.v155Bound='1';
    input.addEventListener('focus',()=>renderBaseChoices_v155(input.value));
    input.addEventListener('input',()=>{
      selectedBaseId_v155='';
      const status=document.getElementById('selectedBaseStatus');
      if(status){status.textContent='No bottle selected';status.classList.remove('ok');}
      renderBaseChoices_v155(input.value);
    });
  }
}

const oldEditBottle_v155=editBottle;
editBottle=function(id){
  const b=getBottle(id);
  if(!b)return;
  oldEditBottle_v155(id);
  setTimeout(()=>{
    const base=getBase(b.baseId);
    if(base)setSelectedBase_v155(base);
  },0);
};

const oldRender_v155=render;
render=function(){
  oldRender_v155();
  initPurchasedBottle_v155();
};


/* v1.56 full backup/restore to file */
function buildBackupPayload_v156(){
  return {app:'WhiskyLog',version:window.WHISKYLOG_VERSION||'1.56',exportedAt:new Date().toISOString(),state:state,settings:settings};
}
function downloadBackupFile_v156(){
  const text=JSON.stringify(buildBackupPayload_v156(),null,2);
  const safeDate=new Date().toISOString().slice(0,19).replace(/[:T]/g,'-');
  const blob=new Blob([text],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`whiskylog-backup-${safeDate}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{document.body.removeChild(a);URL.revokeObjectURL(url);},250);
}
function restoreBackupObject_v156(data){
  if(!data||typeof data!=='object')throw new Error('Invalid backup file');
  const nextState=data.state||data;
  const nextSettings=data.settings||null;
  if(!nextState||!Array.isArray(nextState.bases)||!Array.isArray(nextState.bottles))throw new Error('This does not look like a WhiskyLog backup');
  state=Object.assign({bases:[],bottles:[],tastings:[],comments:[],wishlist:[]},nextState);
  if(nextSettings)settings=Object.assign({ownerName:'Kenneth',currency:'NOK',language:'en',defaultTastingMl:20},nextSettings);
  save();
  saveSettings();
  const title=document.getElementById('appTitle');
  if(title)title.textContent=`${settings.ownerName||'Kenneth'}'s WhiskyLog`;
  render();
  show('home');
}
function restoreFromFile_v156(file){
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const data=JSON.parse(reader.result);
      const ok=confirm('Restore backup from file? This will replace the data currently stored in the app on this device.');
      if(!ok)return;
      restoreBackupObject_v156(data);
      alert('Backup restored.');
    }catch(err){
      alert('Could not restore backup: '+(err&&err.message?err.message:'Invalid file'));
    }
  };
  reader.onerror=()=>alert('Could not read file.');
  reader.readAsText(file);
}
function initBackupFileButtons_v156(){
  const backupBtn=document.getElementById('backupToFileBtn');
  const restoreBtn=document.getElementById('restoreFromFileBtn');
  const fileInput=document.getElementById('backupFileInput');
  if(backupBtn&&backupBtn.dataset.v156Bound!=='1'){
    backupBtn.dataset.v156Bound='1';
    backupBtn.onclick=e=>{e.preventDefault();downloadBackupFile_v156();};
  }
  if(restoreBtn&&fileInput&&restoreBtn.dataset.v156Bound!=='1'){
    restoreBtn.dataset.v156Bound='1';
    restoreBtn.onclick=e=>{e.preventDefault();fileInput.value='';fileInput.click();};
  }
  if(fileInput&&fileInput.dataset.v156Bound!=='1'){
    fileInput.dataset.v156Bound='1';
    fileInput.onchange=()=>{const file=fileInput.files&&fileInput.files[0];if(file)restoreFromFile_v156(file);};
  }
  const exportTextBtn=document.getElementById('exportBtn');
  if(exportTextBtn&&exportTextBtn.dataset.v156Bound!=='1'){
    exportTextBtn.dataset.v156Bound='1';
    exportTextBtn.onclick=e=>{e.preventDefault();const area=document.getElementById('importText');if(area)area.value=JSON.stringify(buildBackupPayload_v156(),null,2);};
  }
  const importTextBtn=document.getElementById('importBtn');
  if(importTextBtn&&importTextBtn.dataset.v156Bound!=='1'){
    importTextBtn.dataset.v156Bound='1';
    importTextBtn.onclick=e=>{
      e.preventDefault();
      try{
        const area=document.getElementById('importText');
        const data=JSON.parse(area.value);
        const ok=confirm('Restore backup from text? This will replace the data currently stored in the app on this device.');
        if(!ok)return;
        restoreBackupObject_v156(data);
        alert('Backup restored.');
      }catch(err){alert('Could not restore backup text.');}
    };
  }
}
const oldRender_v156=render;
render=function(){oldRender_v156();initBackupFileButtons_v156();};


/* v1.57 tasting comments restored */
function ensureTastingComment_v157(t){
  if(typeof t.comment==='undefined')t.comment='';
  return t;
}

const oldSaveTasting_v157=saveTasting;
saveTasting=function(e){
  if(e){
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  const f=document.getElementById('tastingForm');
  if(!f)return false;

  const bottleId=f.bottleId.value;
  const b=getBottle(bottleId);
  const base=b&&getBase(b.baseId);

  if(!b||!base){
    alert('Choose bottle');
    return false;
  }

  const tasting={
    id:uid(),
    bottleId,
    date:f.date.value||new Date().toISOString().slice(0,10),
    ml:dec(f.ml.value||settings.defaultTastingMl||20),
    appearance:dec(f.appearance.value),
    nose:dec(f.nose.value),
    taste:dec(f.taste.value),
    watered:dec(f.watered.value),
    finish:dec(f.finish.value),
    comment:String(f.tastingComment&&f.tastingComment.value||'').trim()
  };

  ensureTastingComment_v157(tasting);

  if(!Array.isArray(state.tastings))state.tastings=[];
  state.tastings.unshift(tasting);

  const current=dec(b.currentWeight||base.fullWeight||0);
  const emptyEstimate=dec(base.emptyWeight||0);

  if(base.fullWeight && current>0){
    const perMl=(dec(base.fullWeight)-emptyEstimate)/(dec(base.volume)||700);
    if(perMl>0){
      b.currentWeight=Math.max(emptyEstimate,current-(perMl*tasting.ml));
    }
  }

  if(tasting.comment){
    addLog(b.id,'tasting',tasting.comment);
  }

  save();
  render();
  f.reset();
  f.date.value=new Date().toISOString().slice(0,10);
  show('stock');
  return true;
};

function renderTastingComments_v157(){
  if(!Array.isArray(state.tastings))return;
  state.tastings.forEach(ensureTastingComment_v157);
}

const oldRender_v157=render;
render=function(){
  oldRender_v157();
  renderTastingComments_v157();
};
