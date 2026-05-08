
window.WHISKYLOG_VERSION='1.72';
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
function renderLibrary(){
  const no = settings && settings.language === 'no';
  const editLabel = no ? 'Rediger' : 'Edit';
  const deleteLabel = no ? 'Slett' : 'Delete';
  const emptyLabel = no ? 'Ingen flasker i biblioteket.' : 'No library items.';

  libraryList.innerHTML = (state.bases || []).map(b => `
    <div class="item">
      ${thumb(b)}
      <div>
        <div class="title">${esc(b.name)}</div>
        <div class="meta">${esc(b.type)} · ${b.abv || '—'}% · ${b.volume || '—'} ml</div>
      </div>
      <div class="side library-actions-v171">
        <button class="ghost" type="button" onclick="editBase('${b.id}')">${editLabel}</button>
        <button class="danger" type="button" onclick="deleteBase_v171('${b.id}')">${deleteLabel}</button>
      </div>
    </div>
  `).join('') || `<div class="sub">${emptyLabel}</div>`;
}
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


/* v1.58 tasting mode, water drops and tasting overview */
let tastingOverviewBottleId_v158='';

function initTastingMode_v158(){
  const sel=document.getElementById('tastingModeSelect');
  const label=document.getElementById('waterDropsLabel');
  if(!sel||!label||sel.dataset.v158Bound==='1')return;
  sel.dataset.v158Bound='1';
  const update=()=>{sel.value==='water'?label.classList.remove('hidden'):label.classList.add('hidden')};
  sel.addEventListener('change',update);
  update();
}

function tastingModeLabel_v158(t){
  const mode=t.tastingMode||t.mode||'neat';
  if(mode==='water'){
    const drops=dec(t.waterDrops);
    return drops ? `With water · ${drops} drops` : 'With water';
  }
  return 'Neat';
}

function tastingAverage_v158(t){
  const vals=[dec(t.appearance),dec(t.nose),dec(t.taste||t.tasteNeat),dec(t.watered||t.tasteWater),dec(t.finish)].filter(v=>v>0);
  if(!vals.length)return dec(t.score)||0;
  return Math.round((vals.reduce((a,b)=>a+b,0)/vals.length)*10)/10;
}

const oldSaveTasting_v158=typeof saveTasting==='function'?saveTasting:null;
saveTasting=function(e){
  if(e){e.preventDefault();e.stopImmediatePropagation();}
  const f=document.getElementById('tastingForm');
  if(!f){return oldSaveTasting_v158?oldSaveTasting_v158(e):false;}
  const bottleId=f.bottleId.value;
  const b=getBottle(bottleId);
  const base=b&&getBase(b.baseId);
  if(!b||!base){alert('Choose bottle');return false;}
  const mode=(f.tastingMode&&f.tastingMode.value)||'neat';
  let drops=0;
  if(mode==='water'){
    drops=dec(f.waterDrops&&f.waterDrops.value);
    if(!drops){alert('Enter number of water drops.');return false;}
  }
  const tasting={
    id:uid(),
    bottleId,
    date:f.date.value||new Date().toISOString().slice(0,10),
    ml:dec(f.ml.value||settings.defaultTastingMl||20),
    tastingMode:mode,
    waterDrops:drops,
    appearance:dec(f.appearance&&f.appearance.value),
    nose:dec(f.nose&&f.nose.value),
    taste:dec(f.taste&&f.taste.value),
    watered:dec(f.watered&&f.watered.value),
    finish:dec(f.finish&&f.finish.value),
    comment:String(f.tastingComment&&f.tastingComment.value||'').trim()
  };
  tasting.score=tastingAverage_v158(tasting);
  if(!Array.isArray(state.tastings))state.tastings=[];
  state.tastings.unshift(tasting);
  const current=dec(b.currentWeight||base.fullWeight||0);
  const emptyEstimate=dec(base.emptyWeight||0);
  if(base.fullWeight&&current>0){
    const perMl=(dec(base.fullWeight)-emptyEstimate)/(dec(base.volume)||700);
    if(perMl>0)b.currentWeight=Math.max(emptyEstimate,current-(perMl*tasting.ml));
  }
  if(!b.openedDate)b.openedDate=tasting.date;
  addLog(b.id,'tasting',[tastingModeLabel_v158(tasting),tasting.comment].filter(Boolean).join(' — ')||'Tasting registered');
  save();
  render();
  f.reset();
  if(f.date)f.date.value=new Date().toISOString().slice(0,10);
  if(f.tastingMode)f.tastingMode.value='neat';
  const dropsLabel=document.getElementById('waterDropsLabel');
  if(dropsLabel)dropsLabel.classList.add('hidden');
  show('stock');
  return true;
};

function openTastingOverview_v158(bottleId){
  tastingOverviewBottleId_v158=bottleId;
  renderTastingOverview_v158();
  show('tastingOverview');
}

function renderTastingOverview_v158(){
  const host=document.getElementById('tastingOverviewList');
  if(!host)return;
  const tastings=(state.tastings||[]).filter(t=>t.bottleId===tastingOverviewBottleId_v158);
  if(!tastings.length){host.innerHTML='<div class="sub">No tastings registered for this bottle.</div>';return;}
  host.innerHTML=tastings.map(t=>{
    const avg=tastingAverage_v158(t);
    return `<div class="item"><div>📝</div><div><div class="title">${esc(t.date||'—')} · Average ${avg||'—'}</div><div class="tasting-mode-pill">${esc(tastingModeLabel_v158(t))}</div><div class="tasting-score-grid"><small>Appearance: ${t.appearance||'—'}</small><small>Nose: ${t.nose||'—'}</small><small>Taste: ${t.taste||t.tasteNeat||'—'}</small><small>Water: ${t.watered||t.tasteWater||'—'}</small><small>Finish: ${t.finish||'—'}</small><small>Volume: ${t.ml||'—'} ml</small></div><div class="sub">${esc(t.comment||t.notes||'')}</div></div></div>`;
  }).join('');
}

const oldOpenDetail_v158=openDetail;
openDetail=function(id,rv='stock'){
  oldOpenDetail_v158(id,rv);
  const detail=document.getElementById('detailContent');
  if(detail&&!detail.querySelector('[data-v158-overview]')){
    const card=document.createElement('div');
    card.className='card shortcut-bar';
    card.setAttribute('data-v158-overview','1');
    card.innerHTML=`<button class="ghost" type="button" onclick="openTastingOverview_v158('${id}')">Tasting overview / smaksoversikt</button>`;
    detail.appendChild(card);
  }
};

const oldRender_v158=render;
render=function(){
  oldRender_v158();
  initTastingMode_v158();
  if(tastingOverviewBottleId_v158)renderTastingOverview_v158();
};


/* v1.59 edit/delete wishlist and tastings with confirmations */
let editingWishlistId_v159='';
let editingTastingId_v159='';

function confirmChange_v159(message){return confirm(message||'Are you sure?');}

function editWishlist_v159(id){
  const item=(state.wishlist||[]).find(w=>w.id===id);
  if(!item)return;
  if(!confirmChange_v159('Edit this wishlist item?'))return;
  const f=document.getElementById('wishForm'); if(!f)return;
  editingWishlistId_v159=id;
  if(f.id)f.id.value=id;
  if(f.name)f.name.value=item.name||'';
  if(f.notes)f.notes.value=item.notes||'';
  show('wishlist');
}
function deleteWishlist_v159(id){
  const item=(state.wishlist||[]).find(w=>w.id===id);
  if(!item)return;
  if(!confirmChange_v159('Delete this wishlist item permanently? This cannot be undone.'))return;
  state.wishlist=state.wishlist.filter(w=>w.id!==id);
  save(); render();
}
function saveWish_v159(e){
  if(e){e.preventDefault();e.stopImmediatePropagation();}
  const f=document.getElementById('wishForm'); if(!f)return false;
  const name=String(f.name&&f.name.value||'').trim();
  if(!name){alert('Name is required.');return false;}
  const notes=String(f.notes&&f.notes.value||'').trim();
  const id=(f.id&&f.id.value)||editingWishlistId_v159||uid();
  const existing=(state.wishlist||[]).find(w=>w.id===id);
  if(existing){
    if(!confirmChange_v159('Save changes to this wishlist item?'))return false;
    existing.name=name; existing.notes=notes;
  }else{
    state.wishlist=state.wishlist||[];
    state.wishlist.push({id,name,notes});
  }
  editingWishlistId_v159='';
  if(f.id)f.id.value='';
  f.reset(); save(); render(); show('wishlist');
  return true;
}
function renderWish_v159(){
  const host=document.getElementById('wishList'); if(!host)return;
  const items=state.wishlist||[];
  host.innerHTML=items.map(w=>`
    <div class="item"><div>⭐</div><div>
      <div class="title">${esc(w.name||'')}</div>
      <div class="sub">${esc(w.notes||'')}</div>
      <div class="row-actions">
        <button class="ghost" type="button" onclick="editWishlist_v159('${w.id}')">Edit</button>
        <button class="danger" type="button" onclick="deleteWishlist_v159('${w.id}')">Delete</button>
      </div>
    </div></div>`).join('') || '<div class="sub">No wishlist items.</div>';
}

function getTasting_v159(id){return (state.tastings||[]).find(t=>t.id===id);}
function editTasting_v159(id){
  const t=getTasting_v159(id); if(!t)return;
  if(!confirmChange_v159('Edit this tasting?'))return;
  editingTastingId_v159=id;
  const f=document.getElementById('tastingForm'); if(!f)return;
  if(f.bottleId)f.bottleId.value=t.bottleId||'';
  if(f.date)f.date.value=t.date||new Date().toISOString().slice(0,10);
  if(f.ml)f.ml.value=t.ml||settings.defaultTastingMl||20;
  if(f.tastingMode)f.tastingMode.value=t.tastingMode||'neat';
  if(f.waterDrops)f.waterDrops.value=t.waterDrops||'';
  if(f.appearance)f.appearance.value=t.appearance||'';
  if(f.nose)f.nose.value=t.nose||'';
  if(f.taste)f.taste.value=t.taste||t.tasteNeat||'';
  if(f.watered)f.watered.value=t.watered||t.tasteWater||'';
  if(f.finish)f.finish.value=t.finish||'';
  if(f.tastingComment)f.tastingComment.value=t.comment||t.notes||'';
  const dropsLabel=document.getElementById('waterDropsLabel');
  if(dropsLabel){((f.tastingMode&&f.tastingMode.value)==='water')?dropsLabel.classList.remove('hidden'):dropsLabel.classList.add('hidden');}
  show('tasting');
}
function deleteTasting_v159(id){
  const t=getTasting_v159(id); if(!t)return;
  if(!confirmChange_v159('Delete this tasting permanently? This cannot be undone.'))return;
  state.tastings=state.tastings.filter(x=>x.id!==id);
  save(); render();
  if(typeof renderTastingOverview_v159==='function')renderTastingOverview_v159();
}
function saveTasting_v159(e){
  if(e){e.preventDefault();e.stopImmediatePropagation();}
  const f=document.getElementById('tastingForm'); if(!f)return false;
  const bottleId=f.bottleId.value;
  const b=getBottle(bottleId), base=b&&getBase(b.baseId);
  if(!b||!base){alert('Choose bottle');return false;}
  const isEdit=!!editingTastingId_v159;
  if(isEdit&&!confirmChange_v159('Save changes to this tasting?'))return false;
  const mode=(f.tastingMode&&f.tastingMode.value)||'neat';
  let drops=0;
  if(mode==='water'){drops=dec(f.waterDrops&&f.waterDrops.value); if(!drops){alert('Enter number of water drops.');return false;}}
  const tasting={
    id:isEdit?editingTastingId_v159:uid(), bottleId,
    date:f.date.value||new Date().toISOString().slice(0,10),
    ml:dec(f.ml.value||settings.defaultTastingMl||20),
    tastingMode:mode, waterDrops:drops,
    appearance:dec(f.appearance&&f.appearance.value),
    nose:dec(f.nose&&f.nose.value),
    taste:dec(f.taste&&f.taste.value),
    watered:dec(f.watered&&f.watered.value),
    finish:dec(f.finish&&f.finish.value),
    comment:String(f.tastingComment&&f.tastingComment.value||'').trim()
  };
  tasting.score=typeof tastingAverage_v158==='function'?tastingAverage_v158(tasting):0;
  state.tastings=state.tastings||[];
  if(isEdit){
    const idx=state.tastings.findIndex(t=>t.id===editingTastingId_v159);
    if(idx>=0)state.tastings[idx]=tasting;
  }else{
    state.tastings.unshift(tasting);
    const current=dec(b.currentWeight||base.fullWeight||0);
    const emptyEstimate=dec(base.emptyWeight||0);
    if(base.fullWeight&&current>0){
      const perMl=(dec(base.fullWeight)-emptyEstimate)/(dec(base.volume)||700);
      if(perMl>0)b.currentWeight=Math.max(emptyEstimate,current-(perMl*tasting.ml));
    }
  }
  if(!b.openedDate)b.openedDate=tasting.date;
  if(tasting.comment)addLog(b.id,'tasting',tasting.comment);
  editingTastingId_v159='';
  save(); render(); f.reset();
  if(f.date)f.date.value=new Date().toISOString().slice(0,10);
  if(f.tastingMode)f.tastingMode.value='neat';
  const dropsLabel=document.getElementById('waterDropsLabel'); if(dropsLabel)dropsLabel.classList.add('hidden');
  show(isEdit?'tastingOverview':'stock');
  return true;
}
function renderTastingOverview_v159(){
  const host=document.getElementById('tastingOverviewList'); if(!host)return;
  const bottleId=typeof tastingOverviewBottleId_v158!=='undefined'?tastingOverviewBottleId_v158:'';
  const tastings=(state.tastings||[]).filter(t=>t.bottleId===bottleId);
  if(!tastings.length){host.innerHTML='<div class="sub">No tastings registered for this bottle.</div>';return;}
  host.innerHTML=tastings.map(t=>{
    const avg=typeof tastingAverage_v158==='function'?tastingAverage_v158(t):(t.score||0);
    const mode=typeof tastingModeLabel_v158==='function'?tastingModeLabel_v158(t):(t.tastingMode||'neat');
    return `<div class="item"><div>📝</div><div>
      <div class="title">${esc(t.date||'—')} · Average ${avg||'—'}</div>
      <div class="tasting-mode-pill">${esc(mode)}</div>
      <div class="tasting-score-grid">
        <small>Appearance: ${t.appearance||'—'}</small><small>Nose: ${t.nose||'—'}</small>
        <small>Taste: ${t.taste||t.tasteNeat||'—'}</small><small>Water: ${t.watered||t.tasteWater||'—'}</small>
        <small>Finish: ${t.finish||'—'}</small><small>Volume: ${t.ml||'—'} ml</small>
      </div>
      <div class="sub">${esc(t.comment||t.notes||'')}</div>
      <div class="row-actions">
        <button class="ghost" type="button" onclick="editTasting_v159('${t.id}')">Edit</button>
        <button class="danger" type="button" onclick="deleteTasting_v159('${t.id}')">Delete</button>
      </div>
    </div></div>`;
  }).join('');
}
function initEditDelete_v159(){
  const wish=document.getElementById('wishForm');
  if(wish&&wish.dataset.v159Bound!=='1'){wish.dataset.v159Bound='1';wish.addEventListener('submit',saveWish_v159,true);}
  const tasting=document.getElementById('tastingForm');
  if(tasting&&tasting.dataset.v159Bound!=='1'){tasting.dataset.v159Bound='1';tasting.addEventListener('submit',saveTasting_v159,true);}
}
const oldRender_v159=render;
render=function(){
  oldRender_v159();
  initEditDelete_v159();
  renderWish_v159();
  if(typeof tastingOverviewBottleId_v158!=='undefined'&&tastingOverviewBottleId_v158)renderTastingOverview_v159();
};
if(typeof openTastingOverview_v158==='function'){
  openTastingOverview_v158=function(bottleId){
    tastingOverviewBottleId_v158=bottleId;
    show('tastingOverview');
    renderTastingOverview_v159();
  };
}


/* v1.60 restore points and visible version */
const RESTORE_POINTS_KEY_v160='whiskylog_restore_points_v160';
const MAX_RESTORE_POINTS_v160=10;

function getRestorePoints_v160(){
  try{
    const points=JSON.parse(localStorage.getItem(RESTORE_POINTS_KEY_v160)||'[]');
    return Array.isArray(points)?points:[];
  }catch(e){
    return [];
  }
}

function saveRestorePoints_v160(points){
  localStorage.setItem(RESTORE_POINTS_KEY_v160,JSON.stringify(points.slice(0,MAX_RESTORE_POINTS_v160)));
}

function createRestorePoint_v160(){
  const name=prompt('Restore point name', 'Before cleanup');
  if(name===null)return;
  const point={
    id:uid(),
    name:String(name||'Restore point').trim(),
    createdAt:new Date().toLocaleString('sv-SE'),
    version:window.WHISKYLOG_VERSION||'1.60',
    state:JSON.parse(JSON.stringify(state)),
    settings:JSON.parse(JSON.stringify(settings))
  };
  const points=getRestorePoints_v160();
  points.unshift(point);
  saveRestorePoints_v160(points);
  renderRestorePoints_v160();
  alert('Restore point created.');
}

function restorePoint_v160(id){
  const points=getRestorePoints_v160();
  const point=points.find(p=>p.id===id);
  if(!point)return;
  const ok=confirm('Restore this restore point? This will replace the current app data on this device.');
  if(!ok)return;
  state=Object.assign({bases:[],bottles:[],tastings:[],comments:[],wishlist:[]}, point.state||{});
  settings=Object.assign({ownerName:'Kenneth',currency:'NOK',language:'en',defaultTastingMl:20}, point.settings||{});
  save();
  saveSettings();
  const title=document.getElementById('appTitle');
  if(title)title.textContent=`${settings.ownerName||'Kenneth'}'s WhiskyLog`;
  render();
  show('home');
  alert('Restore point restored.');
}

function deleteRestorePoint_v160(id){
  const ok=confirm('Delete this restore point permanently?');
  if(!ok)return;
  const points=getRestorePoints_v160().filter(p=>p.id!==id);
  saveRestorePoints_v160(points);
  renderRestorePoints_v160();
}

function renderRestorePoints_v160(){
  const host=document.getElementById('restorePointList');
  if(!host)return;
  const points=getRestorePoints_v160();
  if(!points.length){
    host.innerHTML='<div class="sub">No restore points yet.</div>';
    return;
  }
  host.innerHTML=points.map(p=>`
    <div class="item">
      <div>↩️</div>
      <div>
        <div class="title">${esc(p.name||'Restore point')}</div>
        <div class="meta">${esc(p.createdAt||'')} · v${esc(p.version||'')}</div>
        <div class="sub">${(p.state&&p.state.bases?p.state.bases.length:0)} library · ${(p.state&&p.state.bottles?p.state.bottles.length:0)} bottles · ${(p.state&&p.state.tastings?p.state.tastings.length:0)} tastings</div>
        <div class="restore-point-actions">
          <button class="ghost" type="button" onclick="restorePoint_v160('${p.id}')">Restore</button>
          <button class="danger" type="button" onclick="deleteRestorePoint_v160('${p.id}')">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

function initRestorePoints_v160(){
  const btn=document.getElementById('createRestorePointBtn');
  if(btn&&btn.dataset.v160Bound!=='1'){
    btn.dataset.v160Bound='1';
    btn.onclick=e=>{
      e.preventDefault();
      createRestorePoint_v160();
    };
  }
  const version=document.getElementById('appVersionText');
  if(version)version.textContent='v'+(window.WHISKYLOG_VERSION||'1.60');
  renderRestorePoints_v160();
}

const oldRender_v160=render;
render=function(){
  oldRender_v160();
  initRestorePoints_v160();
};


/* v1.61 tasting edit/delete, correction cleanup, and broader language support */
function lang_v161(){return settings && settings.language==='no' ? 'no' : 'en'}
const L_v161={
  en:{
    edit:'Edit',delete:'Delete',save:'Save',cancel:'Cancel',restore:'Restore',
    tastingOverview:'Tasting overview',noTastings:'No tastings registered for this bottle.',
    editTastingConfirm:'Edit this tasting?',deleteTastingConfirm:'Delete this tasting permanently? This cannot be undone.',
    saveTastingConfirm:'Save changes to this tasting?',chooseBottle:'Choose bottle',
    tastingDate:'Tasting date',amountMl:'Amount ml',appearance:'Appearance',nose:'Nose / smell',
    tasteNeat:'Taste neat',tasteWater:'Taste with water',finish:'Finish',comment:'Comment',
    tastingType:'Tasting type',neat:'Neat',water:'With water',waterDrops:'Water drops',
    enterDrops:'Enter number of water drops.',average:'Average',volume:'Volume',
    saveAddNext:'Save & add next',clearForm:'Clear form',backupToFile:'Backup to file',
    restoreFromFile:'Restore from file',exportBackupText:'Export backup text',importBackupText:'Import backup text',
    createRestorePoint:'Create restore point'
  },
  no:{
    edit:'Rediger',delete:'Slett',save:'Lagre',cancel:'Avbryt',restore:'Gjenopprett',
    tastingOverview:'Smaksoversikt',noTastings:'Ingen smakinger registrert for denne flasken.',
    editTastingConfirm:'Vil du redigere denne smakingen?',deleteTastingConfirm:'Slette denne smakingen permanent? Dette kan ikke angres.',
    saveTastingConfirm:'Lagre endringer i denne smakingen?',chooseBottle:'Velg flaske',
    tastingDate:'Smaksdato',amountMl:'Mengde ml',appearance:'Utseende',nose:'Lukt',
    tasteNeat:'Smak ren',tasteWater:'Smak med vann',finish:'Ettersmak',comment:'Kommentar',
    tastingType:'Smakstype',neat:'Ren',water:'Med vann',waterDrops:'Antall dråper',
    enterDrops:'Legg inn antall dråper vann.',average:'Snitt',volume:'Volum',
    saveAddNext:'Lagre og legg til neste',clearForm:'Tøm skjema',backupToFile:'Lagre backup til fil',
    restoreFromFile:'Hent backup fra fil',exportBackupText:'Eksporter backuptekst',importBackupText:'Importer backuptekst',
    createRestorePoint:'Opprett gjenopprettingspunkt'
  }
};
function tv161(k){return (L_v161[lang_v161()]&&L_v161[lang_v161()][k])||k}
function localizeExtra_v161(){
  document.querySelectorAll('[data-i18n]').forEach(e=>{
    const k=e.dataset.i18n;
    if(L_v161[lang_v161()] && L_v161[lang_v161()][k])e.textContent=tv161(k);
  });
  // translate dynamically inserted button texts by id where data-i18n was not present
  const pairs=[
    ['librarySaveNewButton','saveAddNext'],['libraryClearButton','clearForm'],
    ['backupToFileBtn','backupToFile'],['restoreFromFileBtn','restoreFromFile'],
    ['createRestorePointBtn','createRestorePoint']
  ];
  pairs.forEach(([id,k])=>{const el=document.getElementById(id); if(el)el.textContent=tv161(k);});
}

function tastingModeLabel_v161(t){
  const mode=t.tastingMode||t.mode||'neat';
  if(mode==='water'){
    const drops=dec(t.waterDrops);
    return drops ? `${tv161('water')} · ${drops} ${lang_v161()==='no'?'dråper':'drops'}` : tv161('water');
  }
  return tv161('neat');
}
function tastingAverage_v161(t){
  const vals=[dec(t.appearance),dec(t.nose),dec(t.taste||t.tasteNeat),dec(t.watered||t.tasteWater),dec(t.finish)].filter(v=>v>0);
  return vals.length ? Math.round((vals.reduce((a,b)=>a+b,0)/vals.length)*10)/10 : (dec(t.score)||0);
}
function getTasting_v161(id){return (state.tastings||[]).find(t=>t.id===id)}
let editingTastingId_v161='';
let tastingOverviewBottleId_v161='';

async function promptTastingField_v161(label, opts={}){
  if(typeof modal==='function')return await modal(label, opts);
  const v=prompt(label, opts.value||'');
  return v===null?null:v;
}

async function addOrEditTasting_v161(bottleId, tastingId=''){
  const b=getBottle(bottleId), base=b&&getBase(b.baseId);
  if(!b||!base){alert(tv161('chooseBottle'));return;}
  const existing=tastingId?getTasting_v161(tastingId):null;
  if(existing && !confirm(tv161('editTastingConfirm')))return;

  const date=await promptTastingField_v161(tv161('tastingDate'),{type:'date',inputmode:'none',value:existing?.date||new Date().toISOString().slice(0,10)});
  if(date===null)return;
  const ml=dec(await promptTastingField_v161(tv161('amountMl'),{type:'number',inputmode:'decimal',value:String(existing?.ml||settings.defaultTastingMl||20)}));
  if(!ml)return;

  let mode=existing?.tastingMode||'neat';
  const modeChoice=confirm(lang_v161()==='no' ? 'Trykk OK for med vann, Avbryt for ren.' : 'Press OK for with water, Cancel for neat.');
  mode=modeChoice?'water':'neat';
  let drops=0;
  if(mode==='water'){
    drops=dec(await promptTastingField_v161(tv161('waterDrops'),{type:'number',inputmode:'numeric',value:String(existing?.waterDrops||'')}));
    if(!drops){alert(tv161('enterDrops'));return;}
  }
  const appearance=dec(await promptTastingField_v161(tv161('appearance')+' 1-10',{type:'number',inputmode:'numeric',value:String(existing?.appearance||'')}));
  const nose=dec(await promptTastingField_v161(tv161('nose')+' 1-10',{type:'number',inputmode:'numeric',value:String(existing?.nose||'')}));
  const taste=dec(await promptTastingField_v161(tv161('tasteNeat')+' 1-10',{type:'number',inputmode:'numeric',value:String(existing?.taste||existing?.tasteNeat||'')}));
  const watered=dec(await promptTastingField_v161(tv161('tasteWater')+' 1-10',{type:'number',inputmode:'numeric',value:String(existing?.watered||existing?.tasteWater||'')}));
  const finish=dec(await promptTastingField_v161(tv161('finish')+' 1-10',{type:'number',inputmode:'numeric',value:String(existing?.finish||'')}));
  const comment=await promptTastingField_v161(tv161('comment'),{multiline:true,value:existing?.comment||existing?.notes||''});
  if(comment===null)return;
  if(existing && !confirm(tv161('saveTastingConfirm')))return;

  const tasting={id:existing?existing.id:uid(),bottleId,date,ml,tastingMode:mode,waterDrops:drops,appearance,nose,taste,watered,finish,comment:String(comment||'').trim()};
  tasting.score=tastingAverage_v161(tasting);

  state.tastings=state.tastings||[];
  if(existing){
    const idx=state.tastings.findIndex(t=>t.id===existing.id);
    if(idx>=0)state.tastings[idx]=tasting;
  }else{
    state.tastings.unshift(tasting);
    // deduct only on new tasting, not on edit
    const current=dec(b.currentWeight||base.fullWeight||0);
    const emptyEstimate=dec(base.emptyWeight||0);
    if(base.fullWeight&&current>0){
      const perMl=(dec(base.fullWeight)-emptyEstimate)/(dec(base.volume)||700);
      if(perMl>0)b.currentWeight=Math.max(emptyEstimate,current-(perMl*tasting.ml));
    }
  }
  if(!b.openedDate)b.openedDate=tasting.date;
  if(tasting.comment)addLog(b.id,'tasting',[tastingModeLabel_v161(tasting),tasting.comment].filter(Boolean).join(' — '));
  save(); render();
  if(tastingOverviewBottleId_v161){renderTastingOverview_v161();}
  show(existing?'tastingOverview':'stock');
}

function editTasting_v161(id){
  const t=getTasting_v161(id);
  if(!t)return;
  tastingOverviewBottleId_v161=t.bottleId;
  addOrEditTasting_v161(t.bottleId,id);
}
function deleteTasting_v161(id){
  const t=getTasting_v161(id);
  if(!t)return;
  if(!confirm(tv161('deleteTastingConfirm')))return;
  state.tastings=(state.tastings||[]).filter(x=>x.id!==id);
  save();render();renderTastingOverview_v161();
}

function renderTastingOverview_v161(){
  const host=document.getElementById('tastingOverviewList');
  if(!host)return;
  const tastings=(state.tastings||[]).filter(t=>t.bottleId===tastingOverviewBottleId_v161);
  if(!tastings.length){host.innerHTML=`<div class="sub">${tv161('noTastings')}</div>`;return;}
  host.innerHTML=tastings.map(t=>`
    <div class="item">
      <div>📝</div>
      <div>
        <div class="title">${esc(t.date||'—')} · ${tv161('average')} ${tastingAverage_v161(t)||'—'}</div>
        <div class="tasting-mode-pill">${esc(tastingModeLabel_v161(t))}</div>
        <div class="tasting-score-grid">
          <small>${tv161('appearance')}: ${t.appearance||'—'}</small>
          <small>${tv161('nose')}: ${t.nose||'—'}</small>
          <small>${tv161('tasteNeat')}: ${t.taste||t.tasteNeat||'—'}</small>
          <small>${tv161('tasteWater')}: ${t.watered||t.tasteWater||'—'}</small>
          <small>${tv161('finish')}: ${t.finish||'—'}</small>
          <small>${tv161('volume')}: ${t.ml||'—'} ml</small>
        </div>
        <div class="sub">${esc(t.comment||t.notes||'')}</div>
        <div class="row-actions">
          <button class="ghost" type="button" onclick="editTasting_v161('${t.id}')">${tv161('edit')}</button>
          <button class="danger" type="button" onclick="deleteTasting_v161('${t.id}')">${tv161('delete')}</button>
        </div>
      </div>
    </div>
  `).join('');
}
function openTastingOverview_v161(bottleId){
  tastingOverviewBottleId_v161=bottleId;
  renderTastingOverview_v161();
  show('tastingOverview');
}
function patchDetailTastingButton_v161(){
  // override detail button injection to use v161 overview
  if(typeof openDetail!=='function'||openDetail.v161)return;
  const old=openDetail;
  const wrapped=function(id,rv='stock'){
    old(id,rv);
    const detail=document.getElementById('detailContent');
    if(detail&&!detail.querySelector('[data-v161-overview]')){
      const card=document.createElement('div');
      card.className='card shortcut-bar';
      card.setAttribute('data-v161-overview','1');
      card.innerHTML=`<button class="ghost" type="button" onclick="openTastingOverview_v161('${id}')">${tv161('tastingOverview')}</button>`;
      detail.appendChild(card);
    }
  };
  wrapped.v161=true;
  openDetail=wrapped;
}
function patchTastingList_v161(){
  const list=document.getElementById('tastingList');
  if(!list)return;
  list.querySelectorAll('.item[onclick^="addTasting("]').forEach(el=>{
    const m=String(el.getAttribute('onclick')||'').match(/addTasting\('([^']+)'\)/);
    if(m)el.setAttribute('onclick',`addOrEditTasting_v161('${m[1]}')`);
  });
}
const oldRender_v161=render;
render=function(){
  oldRender_v161();
  localizeExtra_v161();
  patchDetailTastingButton_v161();
  patchTastingList_v161();
  if(tastingOverviewBottleId_v161)renderTastingOverview_v161();
};

/* v1.61 route older tasting overview names */
if(typeof openTastingOverview_v158==='function'){
  openTastingOverview_v158=function(bottleId){openTastingOverview_v161(bottleId);}
}
if(typeof renderTastingOverview_v158==='function'){
  renderTastingOverview_v158=function(){renderTastingOverview_v161();}
}
if(typeof renderTastingOverview_v159==='function'){
  renderTastingOverview_v159=function(){renderTastingOverview_v161();}
}


/* v1.62 delete from library + compact modal hooks */
function t162(en,no){return settings&&settings.language==='no'?no:en}

function deleteBase_v162(id){
  const base=getBase(id);
  if(!base)return;

  const relatedBottles=(state.bottles||[]).filter(b=>b.baseId===id);
  const relatedBottleIds=relatedBottles.map(b=>b.id);
  const relatedTastings=(state.tastings||[]).filter(t=>relatedBottleIds.includes(t.bottleId));
  const relatedComments=(state.comments||[]).filter(c=>relatedBottleIds.includes(c.bottleId));

  let message='';
  if(relatedBottles.length){
    message=t162(
      `Delete "${base.name}" from the library permanently?\n\nThis library item is used by ${relatedBottles.length} bottle(s), ${relatedTastings.length} tasting(s) and ${relatedComments.length} comment/log item(s).\n\nDeleting it will also delete those related bottles, tastings and comments. This cannot be undone.`,
      `Slette "${base.name}" permanent fra biblioteket?\n\nDenne bibliotekflasken brukes av ${relatedBottles.length} flaske(r), ${relatedTastings.length} smaking(er) og ${relatedComments.length} kommentar/loggpunkt.\n\nSletting vil også slette disse tilknyttede flaskene, smakingene og kommentarene. Dette kan ikke angres.`
    );
  }else{
    message=t162(
      `Delete "${base.name}" from the library permanently?\n\nThis cannot be undone.`,
      `Slette "${base.name}" permanent fra biblioteket?\n\nDette kan ikke angres.`
    );
  }

  if(!confirm(message))return;

  state.bases=(state.bases||[]).filter(b=>b.id!==id);
  if(relatedBottleIds.length){
    state.bottles=(state.bottles||[]).filter(b=>b.baseId!==id);
    state.tastings=(state.tastings||[]).filter(t=>!relatedBottleIds.includes(t.bottleId));
    state.comments=(state.comments||[]).filter(c=>!relatedBottleIds.includes(c.bottleId));
  }

  save();
  render();
  const f=document.getElementById('libraryForm');
  if(f&&f.id&&f.id.value===id){
    f.reset();
    f.id.value='';
  }
  alert(t162('Library item deleted.','Bibliotekflaske slettet.'));
}

function patchLibraryDeleteButtons_v162(){
  const host=document.getElementById('baseList') || document.getElementById('libraryList') || document.querySelector('#library .list');
  if(!host)return;

  // Avoid duplicate buttons.
  host.querySelectorAll('.item').forEach(item=>{
    if(item.querySelector('[data-v162-delete-base]'))return;

    const editBtn=item.querySelector('button[onclick^="editBase"],button[onclick*="editBase("]');
    let id='';
    if(editBtn){
      const oc=editBtn.getAttribute('onclick')||'';
      const m=oc.match(/editBase\('([^']+)'\)/);
      if(m)id=m[1];
    }

    // Fallback: try finding base by exact title text.
    if(!id){
      const title=item.querySelector('.title');
      const txt=title?title.textContent.trim():'';
      const base=(state.bases||[]).find(b=>String(b.name||'').trim()===txt);
      if(base)id=base.id;
    }

    if(!id)return;

    let actions=item.querySelector('.row-actions');
    if(!actions){
      actions=document.createElement('div');
      actions.className='row-actions';
      const content=item.children[item.children.length-1] || item;
      content.appendChild(actions);
    }

    const btn=document.createElement('button');
    btn.type='button';
    btn.className='danger';
    btn.setAttribute('data-v162-delete-base','1');
    btn.textContent=t162('Delete','Slett');
    btn.onclick=()=>deleteBase_v162(id);
    actions.appendChild(btn);
  });
}

function compactDateModals_v162(){
  document.querySelectorAll('input[type="date"]').forEach(inp=>{
    inp.style.maxWidth='260px';
    inp.style.width='100%';
  });
  // Some modal implementations use a generic wrapper; constrain any visible modal-like block.
  document.querySelectorAll('.modal,.prompt,.dialog,.input-modal').forEach(el=>{
    el.style.maxWidth='320px';
    el.style.width='calc(100vw - 52px)';
  });
}

const oldRender_v162=render;
render=function(){
  oldRender_v162();
  patchLibraryDeleteButtons_v162();
  compactDateModals_v162();
};

// Re-run compacting after modal creation too.
document.addEventListener('focusin',()=>setTimeout(compactDateModals_v162,30));
document.addEventListener('click',()=>setTimeout(()=>{patchLibraryDeleteButtons_v162();compactDateModals_v162();},50));


/* v1.63 reliable library delete next to Edit + broader Norwegian UI */
function lang163(){return settings && settings.language==='no' ? 'no' : 'en'}
const UI163={
en:{edit:'Edit',delete:'Delete',noLibrary:'No library items yet.',libraryDeleted:'Library item deleted.',deleteLibraryFree:'Delete this library item permanently? This cannot be undone.',deleteLibraryUsed:'Delete this library item permanently?\n\nIt is used by {bottles} bottle(s), {tastings} tasting(s) and {comments} comment/log item(s).\n\nDeleting it will also delete related bottles, tastings and comments. This cannot be undone.',addBottleStock:'Purchased bottle',addBottleStockSub:'Register a purchased bottle',myStock:'My stock',logging:'Logging',overview:'Overview / statistics',wishlist:'Wishlist',unopened:'Unopened bottles',opened:'Opened bottles',empty:'Empty bottles',registerTasting:'Register tasting',correctStock:'Correct stock',library:'Bottle library',backupToFile:'Backup to file',restoreFromFile:'Restore from file',createRestorePoint:'Create restore point',exportBackupText:'Export backup text',importBackupText:'Import backup text',saveAddNext:'Save & add next',clearForm:'Clear form',tastingOverview:'Tasting overview'},
no:{edit:'Rediger',delete:'Slett',noLibrary:'Ingen flasker i biblioteket ennå.',libraryDeleted:'Bibliotekflaske slettet.',deleteLibraryFree:'Slette denne bibliotekflasken permanent? Dette kan ikke angres.',deleteLibraryUsed:'Slette denne bibliotekflasken permanent?\n\nDen brukes av {bottles} flaske(r), {tastings} smaking(er) og {comments} kommentar/loggpunkt.\n\nSletting vil også slette tilknyttede flasker, smakinger og kommentarer. Dette kan ikke angres.',addBottleStock:'Kjøpt flaske',addBottleStockSub:'Registrer kjøpt flaske',myStock:'Min beholdning',logging:'Loggføring',overview:'Oversikt / statistikk',wishlist:'Ønskeliste',unopened:'Uåpnede flasker',opened:'Åpnede flasker',empty:'Tomme flasker',registerTasting:'Registrer smaking',correctStock:'Korriger beholdning',library:'Flaskebibliotek',backupToFile:'Lagre backup til fil',restoreFromFile:'Hent backup fra fil',createRestorePoint:'Opprett gjenopprettingspunkt',exportBackupText:'Eksporter backuptekst',importBackupText:'Importer backuptekst',saveAddNext:'Lagre og legg til neste',clearForm:'Tøm skjema',tastingOverview:'Smaksoversikt'}
};
function u163(k){return (UI163[lang163()]&&UI163[lang163()][k])||k}
function fmt163(template,data){return String(template).replace(/\{(\w+)\}/g,(m,k)=>data[k]??m)}

function deleteBase_v163(id){
  const base=getBase(id); if(!base)return;
  const relatedBottles=(state.bottles||[]).filter(b=>b.baseId===id);
  const relatedBottleIds=relatedBottles.map(b=>b.id);
  const relatedTastings=(state.tastings||[]).filter(t=>relatedBottleIds.includes(t.bottleId));
  const relatedComments=(state.comments||[]).filter(c=>relatedBottleIds.includes(c.bottleId));
  const message=relatedBottles.length
    ? fmt163(u163('deleteLibraryUsed'),{bottles:relatedBottles.length,tastings:relatedTastings.length,comments:relatedComments.length})
    : u163('deleteLibraryFree');
  if(!confirm(message))return;

  state.bases=(state.bases||[]).filter(b=>b.id!==id);
  if(relatedBottleIds.length){
    state.bottles=(state.bottles||[]).filter(b=>b.baseId!==id);
    state.tastings=(state.tastings||[]).filter(t=>!relatedBottleIds.includes(t.bottleId));
    state.comments=(state.comments||[]).filter(c=>!relatedBottleIds.includes(c.bottleId));
  }
  save();
  const f=document.getElementById('libraryForm');
  if(f&&f.id&&f.id.value===id){f.reset();f.id.value='';}
  render();
  alert(u163('libraryDeleted'));
}

function renderLibraryList_v163(){
  const host=document.getElementById('baseList') || document.getElementById('libraryList') || document.querySelector('#library .list');
  if(!host)return false;
  const bases=state.bases||[];
  if(!bases.length){host.innerHTML=`<div class="sub">${u163('noLibrary')}</div>`;return true;}
  host.innerHTML=bases.map(b=>{
    const used=(state.bottles||[]).filter(x=>x.baseId===b.id).length;
    return `<div class="item">
      <div>${b.image?`<img class="thumb" src="${b.image}">`:'📚'}</div>
      <div>
        <div class="title">${esc(b.name||'')}</div>
        <div class="meta">${esc(b.type||'')} · ${b.abv||'—'}% · ${b.volume||'—'} ml</div>
        <div class="sub">${esc(b.distillery||'')}${b.region?' · '+esc(b.region):''}${used?` · ${used} ${lang163()==='no'?'i beholdning':'in stock'}`:''}</div>
        <div class="library-actions">
          <button class="ghost" type="button" onclick="editBase('${b.id}')">${u163('edit')}</button>
          <button class="danger" type="button" onclick="deleteBase_v163('${b.id}')">${u163('delete')}</button>
        </div>
      </div>
    </div>`;
  }).join('');
  return true;
}

function applyLanguage163(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.dataset.i18n;
    if(UI163[lang163()] && UI163[lang163()][k])el.textContent=u163(k);
  });
  [['librarySaveNewButton','saveAddNext'],['libraryClearButton','clearForm'],['backupToFileBtn','backupToFile'],['restoreFromFileBtn','restoreFromFile'],['createRestorePointBtn','createRestorePoint']].forEach(([id,k])=>{
    const el=document.getElementById(id); if(el)el.textContent=u163(k);
  });
  document.querySelectorAll('button').forEach(btn=>{
    const text=(btn.textContent||'').trim();
    const no={'Edit':'Rediger','Delete':'Slett','Back':'Tilbake','Home':'Hjem','Save & add next':'Lagre og legg til neste','Clear form':'Tøm skjema','Backup to file':'Lagre backup til fil','Restore from file':'Hent backup fra fil','Create restore point':'Opprett gjenopprettingspunkt','Tasting overview':'Smaksoversikt','Tasting overview / smaksoversikt':'Smaksoversikt'};
    const en={'Rediger':'Edit','Slett':'Delete','Tilbake':'Back','Hjem':'Home','Lagre og legg til neste':'Save & add next','Tøm skjema':'Clear form','Lagre backup til fil':'Backup to file','Hent backup fra fil':'Restore from file','Opprett gjenopprettingspunkt':'Create restore point','Smaksoversikt':'Tasting overview'};
    if(lang163()==='no' && no[text])btn.textContent=no[text];
    if(lang163()==='en' && en[text])btn.textContent=en[text];
  });
}

const oldRender_v163=render;
render=function(){
  oldRender_v163();
  renderLibraryList_v163();
  applyLanguage163();
};
document.addEventListener('click',()=>setTimeout(()=>{renderLibraryList_v163();applyLanguage163();},80));
document.addEventListener('change',()=>setTimeout(applyLanguage163,80));


/* v1.64 language, spacing and version fix */
function lang164(){return settings&&settings.language==='no'?'no':'en'}
const UI164={
  en:{createRestorePoint:'Create restore point',backupToFile:'Backup to file',restoreFromFile:'Restore from file',exportBackupText:'Export backup text',importBackupText:'Import backup text',saveAddNext:'Save & add next',clearForm:'Clear form',appVersion:'App version',restorePoints:'Restore points',restorePointsSub:'Create an internal restore point before cleanup or larger edits. Stored only in this browser/app on this device.',backupSub:'Backup includes library, bottles, images saved in the app, tastings, notes, wishlist and settings.',restore:'Restore',delete:'Delete',noRestorePoints:'No restore points yet.',restorePointName:'Restore point name',beforeCleanup:'Before cleanup',restorePointCreated:'Restore point created.',restoreConfirm:'Restore this restore point? This will replace the current app data on this device.',deleteRestoreConfirm:'Delete this restore point permanently?',restorePointRestored:'Restore point restored.',restorePointDeleted:'Restore point deleted.',fileRestoreConfirm:'Restore backup from file? This will replace the data currently stored in the app on this device.',fileRestored:'Backup restored.',fileRestoreError:'Could not restore backup',invalidBackup:'This does not look like a WhiskyLog backup'},
  no:{createRestorePoint:'Opprett gjenopprettingspunkt',backupToFile:'Lagre backup til fil',restoreFromFile:'Hent backup fra fil',exportBackupText:'Eksporter backuptekst',importBackupText:'Importer backuptekst',saveAddNext:'Lagre og legg til neste',clearForm:'Tøm skjema',appVersion:'Appversjon',restorePoints:'Gjenopprettingspunkter',restorePointsSub:'Opprett et internt gjenopprettingspunkt før rydding eller større endringer. Lagres kun i denne nettleseren/appen på denne enheten.',backupSub:'Backup inkluderer bibliotek, flasker, bilder lagret i appen, smakinger, notater, ønskeliste og innstillinger.',restore:'Gjenopprett',delete:'Slett',noRestorePoints:'Ingen gjenopprettingspunkter ennå.',restorePointName:'Navn på gjenopprettingspunkt',beforeCleanup:'Før rydding',restorePointCreated:'Gjenopprettingspunkt opprettet.',restoreConfirm:'Gjenopprette dette punktet? Dette erstatter gjeldende appdata på denne enheten.',deleteRestoreConfirm:'Slette dette gjenopprettingspunktet permanent?',restorePointRestored:'Gjenopprettingspunkt gjenopprettet.',restorePointDeleted:'Gjenopprettingspunkt slettet.',fileRestoreConfirm:'Hente backup fra fil? Dette erstatter dataene som ligger i appen på denne enheten.',fileRestored:'Backup gjenopprettet.',fileRestoreError:'Kunne ikke gjenopprette backup',invalidBackup:'Dette ser ikke ut som en WhiskyLog-backup'}
};
function tr164(k){return (UI164[lang164()]&&UI164[lang164()][k])||k}
function readableText164(text){
  const raw=String(text||'').trim();
  const map={createRestorePoint:'createRestorePoint',backupToFile:'backupToFile',restoreFromFile:'restoreFromFile',exportBackupText:'exportBackupText',importBackupText:'importBackupText',saveAddNext:'saveAddNext',clearForm:'clearForm'};
  return map[raw]?tr164(map[raw]):raw;
}
function localizeSettings164(){
  const v=document.getElementById('appVersionText');
  if(v)v.textContent='v'+(window.WHISKYLOG_VERSION||'1.64');

  [['createRestorePointBtn','createRestorePoint'],['backupToFileBtn','backupToFile'],['restoreFromFileBtn','restoreFromFile'],['exportBtn','exportBackupText'],['importBtn','importBackupText'],['librarySaveNewButton','saveAddNext'],['libraryClearButton','clearForm']].forEach(([id,key])=>{
    const el=document.getElementById(id); if(el)el.textContent=tr164(key);
  });

  document.querySelectorAll('button').forEach(btn=>{btn.textContent=readableText164(btn.textContent)});
  document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.getAttribute('data-i18n'); if(UI164[lang164()]&&UI164[lang164()][key])el.textContent=tr164(key)});

  document.querySelectorAll('h3,h2,p,.sub,label,span,div').forEach(el=>{
    if(!el||el.children.length>0)return;
    const t=(el.textContent||'').trim();
    if(t==='Restore points'||t==='Gjenopprettingspunkter')el.textContent=tr164('restorePoints');
    if(t.startsWith('Create an internal restore point')||t.startsWith('Opprett et internt gjenopprettingspunkt'))el.textContent=tr164('restorePointsSub');
    if(t.startsWith('Backup includes')||t.startsWith('Backup inkluderer'))el.textContent=tr164('backupSub');
    if(t.startsWith('App version:')||t.startsWith('Appversjon:'))el.innerHTML=`${tr164('appVersion')}: <strong id="appVersionText">v${window.WHISKYLOG_VERSION||'1.64'}</strong>`;
  });
}

const RESTORE_POINTS_KEY_v164='whiskylog_restore_points_v160';
const MAX_RESTORE_POINTS_v164=10;
function getRestorePoints_v164(){try{const p=JSON.parse(localStorage.getItem(RESTORE_POINTS_KEY_v164)||'[]');return Array.isArray(p)?p:[]}catch(e){return []}}
function saveRestorePoints_v164(points){localStorage.setItem(RESTORE_POINTS_KEY_v164,JSON.stringify(points.slice(0,MAX_RESTORE_POINTS_v164)))}
function createRestorePoint_v164(){
  const name=prompt(tr164('restorePointName'),tr164('beforeCleanup'));
  if(name===null)return;
  const point={id:uid(),name:String(name||tr164('beforeCleanup')).trim(),createdAt:new Date().toLocaleString('sv-SE'),version:window.WHISKYLOG_VERSION||'1.64',state:JSON.parse(JSON.stringify(state)),settings:JSON.parse(JSON.stringify(settings))};
  const points=getRestorePoints_v164();points.unshift(point);saveRestorePoints_v164(points);renderRestorePoints_v164();alert(tr164('restorePointCreated'));
}
function restorePoint_v164(id){
  const point=getRestorePoints_v164().find(p=>p.id===id);if(!point)return;
  if(!confirm(tr164('restoreConfirm')))return;
  state=Object.assign({bases:[],bottles:[],tastings:[],comments:[],wishlist:[]},point.state||{});
  settings=Object.assign({ownerName:'Kenneth',currency:'NOK',language:'en',defaultTastingMl:20},point.settings||{});
  save();saveSettings();render();show('home');alert(tr164('restorePointRestored'));
}
function deleteRestorePoint_v164(id){
  if(!confirm(tr164('deleteRestoreConfirm')))return;
  saveRestorePoints_v164(getRestorePoints_v164().filter(p=>p.id!==id));renderRestorePoints_v164();alert(tr164('restorePointDeleted'));
}
function renderRestorePoints_v164(){
  const host=document.getElementById('restorePointList');if(!host)return;
  const points=getRestorePoints_v164();
  if(!points.length){host.innerHTML=`<div class="sub">${tr164('noRestorePoints')}</div>`;return}
  host.innerHTML=points.map(p=>`<div class="item"><div>↩️</div><div><div class="title">${esc(p.name||tr164('beforeCleanup'))}</div><div class="meta">${esc(p.createdAt||'')} · v${esc(p.version||'')}</div><div class="sub">${(p.state&&p.state.bases?p.state.bases.length:0)} ${lang164()==='no'?'bibliotek':'library'} · ${(p.state&&p.state.bottles?p.state.bottles.length:0)} ${lang164()==='no'?'flasker':'bottles'} · ${(p.state&&p.state.tastings?p.state.tastings.length:0)} ${lang164()==='no'?'smakinger':'tastings'}</div><div class="restore-point-actions"><button class="ghost" type="button" onclick="restorePoint_v164('${p.id}')">${tr164('restore')}</button><button class="danger" type="button" onclick="deleteRestorePoint_v164('${p.id}')">${tr164('delete')}</button></div></div></div>`).join('');
}
function initRestorePoints_v164(){
  const btn=document.getElementById('createRestorePointBtn');
  if(btn)btn.onclick=e=>{e.preventDefault();createRestorePoint_v164()};
  renderRestorePoints_v164();
}

function restoreBackupObject_v164(data){
  if(!data||typeof data!=='object')throw new Error(tr164('invalidBackup'));
  const nextState=data.state||data;
  const nextSettings=data.settings||null;
  if(!nextState||!Array.isArray(nextState.bases)||!Array.isArray(nextState.bottles))throw new Error(tr164('invalidBackup'));
  state=Object.assign({bases:[],bottles:[],tastings:[],comments:[],wishlist:[]},nextState);
  if(nextSettings)settings=Object.assign({ownerName:'Kenneth',currency:'NOK',language:'en',defaultTastingMl:20},nextSettings);
  save();saveSettings();
  const title=document.getElementById('appTitle');if(title)title.textContent=`${settings.ownerName||'Kenneth'}'s WhiskyLog`;
  render();show('home');
}
function restoreFromFile_v164(file){
  const reader=new FileReader();
  reader.onload=()=>{try{const data=JSON.parse(reader.result);if(!confirm(tr164('fileRestoreConfirm')))return;restoreBackupObject_v164(data);alert(tr164('fileRestored'))}catch(err){alert(`${tr164('fileRestoreError')}: ${err&&err.message?err.message:''}`)}};
  reader.onerror=()=>alert(tr164('fileRestoreError'));
  reader.readAsText(file);
}
function initBackupFileButtons_v164(){
  const restoreBtn=document.getElementById('restoreFromFileBtn');
  const fileInput=document.getElementById('backupFileInput');
  if(restoreBtn&&fileInput){
    restoreBtn.onclick=e=>{e.preventDefault();fileInput.value='';fileInput.click()};
    fileInput.onchange=()=>{const file=fileInput.files&&fileInput.files[0];if(file)restoreFromFile_v164(file)};
  }
}
const oldRender_v164=render;
render=function(){oldRender_v164();initRestorePoints_v164();initBackupFileButtons_v164();localizeSettings164()};
document.addEventListener('click',()=>setTimeout(localizeSettings164,60));
document.addEventListener('change',()=>setTimeout(localizeSettings164,60));
document.addEventListener('DOMContentLoaded',()=>setTimeout(localizeSettings164,100));


/* v1.65 final library delete + Norwegian text fix */
function isNo165(){
  return settings && settings.language === 'no';
}
function tx165(en,no){
  return isNo165() ? no : en;
}
function deleteBase_v165(id){
  const base = getBase(id);
  if(!base) return;

  const bottleIds = (state.bottles || []).filter(b => b.baseId === id).map(b => b.id);
  const tCount = (state.tastings || []).filter(t => bottleIds.includes(t.bottleId)).length;
  const cCount = (state.comments || []).filter(c => bottleIds.includes(c.bottleId)).length;

  const msg = bottleIds.length
    ? tx165(
        `Delete "${base.name}" from the library permanently?\n\nThis is used by ${bottleIds.length} bottle(s), ${tCount} tasting(s) and ${cCount} comment/log item(s).\n\nDeleting it will also delete all related bottles, tastings and comments. This cannot be undone.`,
        `Slette "${base.name}" permanent fra biblioteket?\n\nDenne brukes av ${bottleIds.length} flaske(r), ${tCount} smaking(er) og ${cCount} kommentar/loggpunkt.\n\nSletting vil også slette alle tilknyttede flasker, smakinger og kommentarer. Dette kan ikke angres.`
      )
    : tx165(
        `Delete "${base.name}" from the library permanently?\n\nThis cannot be undone.`,
        `Slette "${base.name}" permanent fra biblioteket?\n\nDette kan ikke angres.`
      );

  if(!confirm(msg)) return;

  state.bases = (state.bases || []).filter(b => b.id !== id);
  if(bottleIds.length){
    state.bottles = (state.bottles || []).filter(b => b.baseId !== id);
    state.tastings = (state.tastings || []).filter(t => !bottleIds.includes(t.bottleId));
    state.comments = (state.comments || []).filter(c => !bottleIds.includes(c.bottleId));
  }

  const f = document.getElementById('libraryForm');
  if(f && f.id && f.id.value === id){
    f.reset();
    f.id.value = '';
  }

  save();
  render();
  alert(tx165('Library item deleted.','Bibliotekflaske slettet.'));
}

function renderLibraryList_v165(){
  const host = document.getElementById('baseList') || document.getElementById('libraryList') || document.querySelector('#library .list');
  if(!host) return false;

  const bases = state.bases || [];
  if(!bases.length){
    host.innerHTML = `<div class="sub">${tx165('No library items yet.','Ingen flasker i biblioteket ennå.')}</div>`;
    return true;
  }

  host.innerHTML = bases.map(b => {
    const used = (state.bottles || []).filter(x => x.baseId === b.id).length;
    const img = b.image ? `<img class="thumb" src="${b.image}" alt="">` : '📚';
    const usedTxt = used ? ` · ${used} ${tx165('in stock','i beholdning')}` : '';
    return `
      <div class="item">
        <div>${img}</div>
        <div>
          <div class="title">${esc(b.name || '')}</div>
          <div class="meta">${esc(b.type || '')} · ${b.abv || '—'}% · ${b.volume || '—'} ml</div>
          <div class="sub">${esc(b.distillery || '')}${b.region ? ' · ' + esc(b.region) : ''}${usedTxt}</div>
          <div class="library-actions-v165">
            <button class="ghost" type="button" onclick="editBase('${b.id}')">${tx165('Edit','Rediger')}</button>
            <button class="danger" type="button" onclick="deleteBase_v165('${b.id}')">${tx165('Delete','Slett')}</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  return true;
}

function fixLibraryNorwegianText_v165(){
  const no = isNo165();

  document.querySelectorAll('#library p,.hero p,.card p,.sub').forEach(el => {
    const t = (el.textContent || '').trim();

    if(t === 'Use Save & add next when entering several bottles. Saved bottles appear immediately when adding to stock.' ||
       t === 'Bruk Lagre og legg til neste når du legger inn flere flasker. Lagrede flasker vises straks når du legger dem inn i beholdning.'){
      el.textContent = no
        ? 'Bruk «Lagre og legg til neste» når du legger inn flere flasker. Lagrede flasker vises straks når du legger dem inn i beholdning.'
        : 'Use “Save & add next” when entering several bottles. Saved bottles appear immediately when adding to stock.';
    }

    if(t === 'Core data can only be edited here.' || t === 'Grunndata kan kun redigeres her.'){
      el.textContent = no ? 'Grunndata kan kun redigeres her.' : 'Core data can only be edited here.';
    }
  });

  const libTitle = document.querySelector('#library h2');
  if(libTitle && (libTitle.textContent.trim() === 'Bottle library' || libTitle.textContent.trim() === 'Flaskebibliotek')){
    libTitle.textContent = no ? 'Flaskebibliotek' : 'Bottle library';
  }

  // Force known button texts in library area.
  document.querySelectorAll('#library button').forEach(btn => {
    const txt = (btn.textContent || '').trim();
    if(['Edit','Rediger'].includes(txt)) btn.textContent = no ? 'Rediger' : 'Edit';
    if(['Delete','Slett'].includes(txt)) btn.textContent = no ? 'Slett' : 'Delete';
    if(['Save & add next','Lagre og legg til neste'].includes(txt)) btn.textContent = no ? 'Lagre og legg til neste' : 'Save & add next';
    if(['Clear form','Tøm skjema'].includes(txt)) btn.textContent = no ? 'Tøm skjema' : 'Clear form';
  });
}

const oldRender_v165 = render;
render = function(){
  oldRender_v165();
  renderLibraryList_v165();
  fixLibraryNorwegianText_v165();
};

document.addEventListener('click', () => setTimeout(() => {
  renderLibraryList_v165();
  fixLibraryNorwegianText_v165();
}, 80));
document.addEventListener('change', () => setTimeout(fixLibraryNorwegianText_v165, 80));


/* v1.66 forced library renderer + final text normalization */
window.WHISKYLOG_VERSION='1.72';

function no66(){return settings && settings.language==='no'}
function txt66(en,no){return no66()?no:en}

function fixCamelLabels66(root=document){
  const mapNo={
    saveAddNext:'Lagre og legg til neste',
    clearForm:'Tøm skjema',
    createRestorePoint:'Opprett gjenopprettingspunkt',
    backupToFile:'Lagre backup til fil',
    restoreFromFile:'Hent backup fra fil',
    exportBackupText:'Eksporter backuptekst',
    importBackupText:'Importer backuptekst',
    Edit:'Rediger',
    Delete:'Slett'
  };
  const mapEn={
    saveAddNext:'Save & add next',
    clearForm:'Clear form',
    createRestorePoint:'Create restore point',
    backupToFile:'Backup to file',
    restoreFromFile:'Restore from file',
    exportBackupText:'Export backup text',
    importBackupText:'Import backup text',
    Rediger:'Edit',
    Slett:'Delete'
  };
  root.querySelectorAll('button').forEach(btn=>{
    const t=(btn.textContent||'').trim();
    if(no66() && mapNo[t])btn.textContent=mapNo[t];
    if(!no66() && mapEn[t])btn.textContent=mapEn[t];
  });
  const v=document.getElementById('appVersionText');
  if(v)v.textContent='v1.66';
}

function deleteBase_v166(id){
  const base=getBase(id);
  if(!base)return;
  const bottleIds=(state.bottles||[]).filter(b=>b.baseId===id).map(b=>b.id);
  const tCount=(state.tastings||[]).filter(t=>bottleIds.includes(t.bottleId)).length;
  const cCount=(state.comments||[]).filter(c=>bottleIds.includes(c.bottleId)).length;

  const msg=bottleIds.length
    ? txt66(
      `Delete "${base.name}" from the library permanently?\n\nThis is used by ${bottleIds.length} bottle(s), ${tCount} tasting(s) and ${cCount} comment/log item(s).\n\nDeleting it will also delete all related bottles, tastings and comments. This cannot be undone.`,
      `Slette "${base.name}" permanent fra biblioteket?\n\nDenne brukes av ${bottleIds.length} flaske(r), ${tCount} smaking(er) og ${cCount} kommentar/loggpunkt.\n\nSletting vil også slette alle tilknyttede flasker, smakinger og kommentarer. Dette kan ikke angres.`
    )
    : txt66(
      `Delete "${base.name}" from the library permanently?\n\nThis cannot be undone.`,
      `Slette "${base.name}" permanent fra biblioteket?\n\nDette kan ikke angres.`
    );

  if(!confirm(msg))return;

  state.bases=(state.bases||[]).filter(b=>b.id!==id);
  if(bottleIds.length){
    state.bottles=(state.bottles||[]).filter(b=>b.baseId!==id);
    state.tastings=(state.tastings||[]).filter(t=>!bottleIds.includes(t.bottleId));
    state.comments=(state.comments||[]).filter(c=>!bottleIds.includes(c.bottleId));
  }
  save();

  const f=document.getElementById('libraryForm');
  if(f && f.id && f.id.value===id){
    f.reset();
    f.id.value='';
  }

  render();
  alert(txt66('Library item deleted.','Bibliotekflaske slettet.'));
}

function findLibraryHost66(){
  return document.getElementById('baseList') ||
         document.getElementById('libraryList') ||
         document.querySelector('#library .list') ||
         document.querySelector('#library [id$="List"]');
}

function forceRenderLibrary66(){
  const host=findLibraryHost66();
  if(!host)return false;

  const bases=state.bases||[];
  if(!bases.length){
    host.innerHTML=`<div class="sub">${txt66('No library items yet.','Ingen flasker i biblioteket ennå.')}</div>`;
    return true;
  }

  host.innerHTML=bases.map(b=>{
    const used=(state.bottles||[]).filter(x=>x.baseId===b.id).length;
    const img=b.image ? `<img class="thumb" src="${b.image}" alt="">` : '📚';
    const usedTxt=used ? ` · ${used} ${txt66('in stock','i beholdning')}` : '';
    return `
      <div class="item library-item-v166">
        <div>${img}</div>
        <div>
          <div class="title">${esc(b.name||'')}</div>
          <div class="meta">${esc(b.type||'')} · ${b.abv||'—'}% · ${b.volume||'—'} ml</div>
          <div class="sub">${esc(b.distillery||'')}${b.region?' · '+esc(b.region):''}${usedTxt}</div>
          <div class="library-actions-v166">
            <button class="ghost" type="button" onclick="editBase('${b.id}')">${txt66('Edit','Rediger')}</button>
            <button class="danger" type="button" onclick="deleteBase_v166('${b.id}')">${txt66('Delete','Slett')}</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  return true;
}

function fixLibraryText66(){
  const lib=document.getElementById('library');
  if(!lib)return;
  const h=lib.querySelector('h2');
  if(h && ['Bottle library','Flaskebibliotek'].includes(h.textContent.trim())){
    h.textContent=txt66('Bottle library','Flaskebibliotek');
  }
  lib.querySelectorAll('p,.sub').forEach(el=>{
    const t=(el.textContent||'').trim();
    if(t.includes('Use Save & add next when entering several bottles') ||
       t.includes('Use “Save & add next” when entering several bottles') ||
       t.includes('Bruk «Lagre og legg til neste»')){
      el.textContent=txt66(
        'Use “Save & add next” when entering several bottles. Saved bottles appear immediately when adding to stock.',
        'Bruk «Lagre og legg til neste» når du legger inn flere flasker. Lagrede flasker vises straks når du legger dem inn i beholdning.'
      );
    }
    if(t==='Core data can only be edited here.' || t==='Grunndata kan kun redigeres her.'){
      el.textContent=txt66('Core data can only be edited here.','Grunndata kan kun redigeres her.');
    }
  });
}

function forceAll66(){
  forceRenderLibrary66();
  fixLibraryText66();
  fixCamelLabels66();
}

// Important: run AFTER all older render wrappers have run.
const oldRender_v166=render;
render=function(){
  oldRender_v166();
  setTimeout(forceAll66,0);
  setTimeout(forceAll66,80);
};

// Also run when page/navigation changes.
document.addEventListener('click',()=>setTimeout(forceAll66,120),true);
document.addEventListener('change',()=>setTimeout(forceAll66,120),true);
document.addEventListener('DOMContentLoaded',()=>setTimeout(forceAll66,200));

// Safety interval for first seconds after load to defeat older late renderers.
let v166Runs=0;
const v166Timer=setInterval(()=>{
  forceAll66();
  v166Runs++;
  if(v166Runs>20)clearInterval(v166Timer);
},250);


/* v1.67 HARD replace library cards */
window.WHISKYLOG_VERSION='1.72';

function wl67No(){return settings&&settings.language==='no'}
function wl67Txt(en,no){return wl67No()?no:en}

function wl67Delete(id){
 const base=getBase(id);
 if(!base)return;
 if(!confirm(wl67Txt(
   `Delete "${base.name}" permanently?`,
   `Slette "${base.name}" permanent?`
 ))) return;

 const bottleIds=(state.bottles||[]).filter(b=>b.baseId===id).map(b=>b.id);
 state.bases=(state.bases||[]).filter(b=>b.id!==id);
 state.bottles=(state.bottles||[]).filter(b=>b.baseId!==id);
 state.tastings=(state.tastings||[]).filter(t=>!bottleIds.includes(t.bottleId));
 state.comments=(state.comments||[]).filter(c=>!bottleIds.includes(c.bottleId));

 save();
 render();
}

function wl67ReplaceLibrary(){
 const lib=document.getElementById('library');
 if(!lib)return;

 const allButtons=[...lib.querySelectorAll('button')];
 allButtons.forEach(btn=>{
   const t=(btn.textContent||'').trim();
   if(t==='saveAddNext')btn.textContent=wl67Txt('Save & add next','Lagre og legg til neste');
   if(t==='clearForm')btn.textContent=wl67Txt('Clear form','Tøm skjema');
 });

 const items=[...lib.querySelectorAll('.item')];
 items.forEach(item=>{
   const oldEdit=[...item.querySelectorAll('button')].find(b=>(b.textContent||'').trim().toLowerCase().includes('edit')||(b.textContent||'').trim().toLowerCase().includes('rediger'));
   if(!oldEdit)return;
   if(item.querySelector('.wl67-delete'))return;

   const onclick=oldEdit.getAttribute('onclick')||'';
   const m=onclick.match(/editBase\('([^']+)'\)/);
   if(!m)return;
   const id=m[1];

   const del=document.createElement('button');
   del.className='danger wl67-delete';
   del.style.marginLeft='8px';
   del.textContent=wl67Txt('Delete','Slett');
   del.onclick=()=>wl67Delete(id);

   oldEdit.parentNode.insertBefore(del, oldEdit.nextSibling);
 });

 const v=document.getElementById('appVersionText');
 if(v)v.textContent='v1.67';
}

const oldRender67=render;
render=function(){
 oldRender67();
 setTimeout(wl67ReplaceLibrary,50);
 setTimeout(wl67ReplaceLibrary,300);
}

document.addEventListener('DOMContentLoaded',()=>{
 setTimeout(wl67ReplaceLibrary,300);
});

setInterval(wl67ReplaceLibrary,1000);


/* v1.68 FORCE DELETE BUTTONS */
function forceDeleteButtons(){
  document.querySelectorAll('#library .item').forEach(item=>{
    if(item.querySelector('.forceDeleteBtn')) return;

    const editBtn=[...item.querySelectorAll('button')].find(b=>{
      const t=(b.innerText||'').toLowerCase().trim();
      return t==='edit' || t==='rediger';
    });

    if(!editBtn) return;

    const onclick=editBtn.getAttribute('onclick')||'';
    const match=onclick.match(/editBase\('([^']+)'\)/);
    if(!match) return;

    const id=match[1];

    const btn=document.createElement('button');
    btn.className='forceDeleteBtn danger';
    btn.innerText=settings && settings.language==='no' ? 'Slett' : 'Delete';
    btn.style.marginLeft='10px';

    btn.onclick=function(){
      const base=getBase(id);
      if(!base) return;

      const ok=confirm(
        settings && settings.language==='no'
        ? `Slette "${base.name}" permanent?`
        : `Delete "${base.name}" permanently?`
      );

      if(!ok) return;

      const bottleIds=(state.bottles||[])
        .filter(b=>b.baseId===id)
        .map(b=>b.id);

      state.bases=(state.bases||[]).filter(b=>b.id!==id);
      state.bottles=(state.bottles||[]).filter(b=>b.baseId!==id);
      state.tastings=(state.tastings||[]).filter(t=>!bottleIds.includes(t.bottleId));

      save();
      render();
    };

    editBtn.parentNode.appendChild(btn);
  });

  document.querySelectorAll('button').forEach(btn=>{
    if(btn.innerText==='saveAddNext'){
      btn.innerText='Lagre og neste';
    }
    if(btn.innerText==='clearForm'){
      btn.innerText='Tøm skjema';
    }
  });
}

setInterval(forceDeleteButtons,500);

document.addEventListener('DOMContentLoaded',()=>{
  setTimeout(forceDeleteButtons,1000);
});


/* v1.69 final delete + label fix */
window.WHISKYLOG_VERSION='1.72';

function wl69No(){ return settings && settings.language === 'no'; }
function wl69(en,no){ return wl69No() ? no : en; }

function wl69DeleteBase(id){
  const base = getBase(id);
  if(!base) return;

  const bottleIds = (state.bottles || []).filter(b => b.baseId === id).map(b => b.id);
  const tCount = (state.tastings || []).filter(t => bottleIds.includes(t.bottleId)).length;
  const cCount = (state.comments || []).filter(c => bottleIds.includes(c.bottleId)).length;

  const msg = bottleIds.length
    ? wl69(
      `Delete "${base.name}" permanently?\n\nThis will also delete ${bottleIds.length} stock bottle(s), ${tCount} tasting(s) and ${cCount} comment/log item(s). This cannot be undone.`,
      `Slette "${base.name}" permanent?\n\nDette vil også slette ${bottleIds.length} beholdningsflaske(r), ${tCount} smaking(er) og ${cCount} kommentar/loggpunkt. Dette kan ikke angres.`
    )
    : wl69(
      `Delete "${base.name}" permanently? This cannot be undone.`,
      `Slette "${base.name}" permanent? Dette kan ikke angres.`
    );

  if(!confirm(msg)) return;

  state.bases = (state.bases || []).filter(b => b.id !== id);
  state.bottles = (state.bottles || []).filter(b => b.baseId !== id);
  state.tastings = (state.tastings || []).filter(t => !bottleIds.includes(t.bottleId));
  state.comments = (state.comments || []).filter(c => !bottleIds.includes(c.bottleId));

  save();
  render();
}

function wl69FixLabels(){
  const labelMapNo = {
    saveAddNext: 'Lagre og legg til neste',
    clearForm: 'Tøm skjema',
    createRestorePoint: 'Opprett gjenopprettingspunkt',
    backupToFile: 'Lagre backup til fil',
    restoreFromFile: 'Hent backup fra fil',
    Edit: 'Rediger',
    Delete: 'Slett'
  };
  const labelMapEn = {
    saveAddNext: 'Save & add next',
    clearForm: 'Clear form',
    createRestorePoint: 'Create restore point',
    backupToFile: 'Backup to file',
    restoreFromFile: 'Restore from file',
    Rediger: 'Edit',
    Slett: 'Delete'
  };

  document.querySelectorAll('button').forEach(btn => {
    const t = (btn.textContent || '').trim();
    if(wl69No() && labelMapNo[t]) btn.textContent = labelMapNo[t];
    if(!wl69No() && labelMapEn[t]) btn.textContent = labelMapEn[t];
  });

  const v = document.getElementById('appVersionText');
  if(v) v.textContent = 'v1.69';
}

function wl69FindBaseIdFromEditButton(btn){
  const onclick = btn.getAttribute('onclick') || '';
  let m = onclick.match(/editBase\('([^']+)'\)/);
  if(m) return m[1];

  // fallback: match by title text in the card
  const item = btn.closest('.item');
  const title = item && item.querySelector('.title');
  const name = title ? title.textContent.trim() : '';
  const base = (state.bases || []).find(b => String(b.name || '').trim() === name);
  return base ? base.id : '';
}

function wl69ForceDeleteButtons(){
  const lib = document.getElementById('library');
  if(!lib) return;

  wl69FixLabels();

  const editButtons = [...lib.querySelectorAll('button')].filter(btn => {
    const t = (btn.textContent || '').trim().toLowerCase();
    return t === 'edit' || t === 'rediger';
  });

  editButtons.forEach(editBtn => {
    const item = editBtn.closest('.item');
    if(!item || item.querySelector('.wl69-delete')) return;

    const id = wl69FindBaseIdFromEditButton(editBtn);
    if(!id) return;

    let actionWrap = editBtn.parentElement;
    if(!actionWrap.classList.contains('wl69-actions')){
      const wrap = document.createElement('div');
      wrap.className = 'wl69-actions';
      editBtn.parentNode.insertBefore(wrap, editBtn);
      wrap.appendChild(editBtn);
      actionWrap = wrap;
    }

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'wl69-delete';
    del.textContent = wl69('Delete','Slett');
    del.onclick = () => wl69DeleteBase(id);
    actionWrap.appendChild(del);
  });
}

const oldRender169 = render;
render = function(){
  oldRender169();
  setTimeout(wl69ForceDeleteButtons, 0);
  setTimeout(wl69ForceDeleteButtons, 100);
  setTimeout(wl69ForceDeleteButtons, 500);
};

document.addEventListener('DOMContentLoaded', () => setTimeout(wl69ForceDeleteButtons, 300));
document.addEventListener('click', () => setTimeout(wl69ForceDeleteButtons, 120), true);
document.addEventListener('change', () => setTimeout(wl69ForceDeleteButtons, 120), true);
setInterval(wl69ForceDeleteButtons, 1000);


function renderBases(){
  const host = document.getElementById('baseList');
  if(!host) return;

  const no = settings && settings.language === 'no';
  const editLabel = no ? 'Rediger' : 'Edit';
  const deleteLabel = no ? 'Slett' : 'Delete';
  const emptyLabel = no ? 'Ingen flasker i biblioteket ennå.' : 'No library items yet.';

  if(!(state.bases || []).length){
    host.innerHTML = `<div class="sub">${emptyLabel}</div>`;
    return;
  }

  host.innerHTML = (state.bases || []).map(b => `
    <div class="item library-item">
      <div>${b.image ? `<img class="thumb" src="${b.image}" alt="">` : '📚'}</div>
      <div>
        <div class="title">${esc(b.name || '')}</div>
        <div class="meta">${esc(b.type || '')} · ${b.abv || '—'}% · ${b.volume || '—'} ml</div>
        <div class="sub">${esc(b.distillery || '')}${b.region ? ' · ' + esc(b.region) : ''}</div>
        <div class="library-actions-v170">
          <button class="ghost" type="button" onclick="editBase('${b.id}')">${editLabel}</button>
          <button class="danger" type="button" onclick="deleteBase_v170('${b.id}')">${deleteLabel}</button>
        </div>
      </div>
    </div>
  `).join('');
}


/* v1.70 direct library delete */
window.WHISKYLOG_VERSION='1.72';

function deleteBase_v170(id){
  const base = getBase(id);
  if(!base) return;

  const no = settings && settings.language === 'no';
  const bottleIds = (state.bottles || []).filter(b => b.baseId === id).map(b => b.id);
  const tCount = (state.tastings || []).filter(t => bottleIds.includes(t.bottleId)).length;
  const cCount = (state.comments || []).filter(c => bottleIds.includes(c.bottleId)).length;

  const msg = bottleIds.length
    ? (no
      ? `Slette "${base.name}" permanent?\n\nDette vil også slette ${bottleIds.length} beholdningsflaske(r), ${tCount} smaking(er) og ${cCount} kommentar/loggpunkt. Dette kan ikke angres.`
      : `Delete "${base.name}" permanently?\n\nThis will also delete ${bottleIds.length} stock bottle(s), ${tCount} tasting(s) and ${cCount} comment/log item(s). This cannot be undone.`)
    : (no
      ? `Slette "${base.name}" permanent? Dette kan ikke angres.`
      : `Delete "${base.name}" permanently? This cannot be undone.`);

  if(!confirm(msg)) return;

  state.bases = (state.bases || []).filter(b => b.id !== id);
  state.bottles = (state.bottles || []).filter(b => b.baseId !== id);
  state.tastings = (state.tastings || []).filter(t => !bottleIds.includes(t.bottleId));
  state.comments = (state.comments || []).filter(c => !bottleIds.includes(c.bottleId));

  const f = document.getElementById('libraryForm');
  if(f && f.id && f.id.value === id){
    f.reset();
    f.id.value = '';
  }

  save();
  render();
}

function fixLabels_v170(){
  const no = settings && settings.language === 'no';
  const mapNo = {
    saveAddNext:'Lagre og legg til neste',
    clearForm:'Tøm skjema',
    createRestorePoint:'Opprett gjenopprettingspunkt',
    backupToFile:'Lagre backup til fil',
    restoreFromFile:'Hent backup fra fil',
    Edit:'Rediger',
    Delete:'Slett'
  };
  const mapEn = {
    saveAddNext:'Save & add next',
    clearForm:'Clear form',
    createRestorePoint:'Create restore point',
    backupToFile:'Backup to file',
    restoreFromFile:'Restore from file',
    Rediger:'Edit',
    Slett:'Delete'
  };
  document.querySelectorAll('button').forEach(btn => {
    const t = (btn.textContent || '').trim();
    if(no && mapNo[t]) btn.textContent = mapNo[t];
    if(!no && mapEn[t]) btn.textContent = mapEn[t];
  });
  const v = document.getElementById('appVersionText');
  if(v) v.textContent = 'v1.70';
}

const render_old_v170 = render;
render = function(){
  render_old_v170();
  if(typeof renderBases === 'function') renderBases();
  fixLabels_v170();
};


/* v1.71 delete handler for directly replaced renderLibrary */
function deleteBase_v171(id){
  const base = getBase(id);
  if(!base) return;

  const no = settings && settings.language === 'no';
  const bottleIds = (state.bottles || []).filter(b => b.baseId === id).map(b => b.id);
  const tCount = (state.tastings || []).filter(t => bottleIds.includes(t.bottleId)).length;
  const cCount = (state.comments || []).filter(c => bottleIds.includes(c.bottleId)).length;

  const msg = bottleIds.length
    ? (no
      ? `Slette "${base.name}" permanent?\n\nDette vil også slette ${bottleIds.length} beholdningsflaske(r), ${tCount} smaking(er) og ${cCount} kommentar/loggpunkt. Dette kan ikke angres.`
      : `Delete "${base.name}" permanently?\n\nThis will also delete ${bottleIds.length} stock bottle(s), ${tCount} tasting(s) and ${cCount} comment/log item(s). This cannot be undone.`)
    : (no
      ? `Slette "${base.name}" permanent? Dette kan ikke angres.`
      : `Delete "${base.name}" permanently? This cannot be undone.`);

  if(!confirm(msg)) return;

  state.bases = (state.bases || []).filter(b => b.id !== id);
  state.bottles = (state.bottles || []).filter(b => b.baseId !== id);
  state.tastings = (state.tastings || []).filter(t => !bottleIds.includes(t.bottleId));
  state.comments = (state.comments || []).filter(c => !bottleIds.includes(c.bottleId));

  save();
  render();
}

function fixLabels_v171(){
  const no = settings && settings.language === 'no';
  document.querySelectorAll('button').forEach(btn => {
    const t = (btn.textContent || '').trim();
    if(no){
      if(t === 'saveAddNext') btn.textContent = 'Lagre og legg til neste';
      if(t === 'clearForm') btn.textContent = 'Tøm skjema';
      if(t === 'createRestorePoint') btn.textContent = 'Opprett gjenopprettingspunkt';
      if(t === 'backupToFile') btn.textContent = 'Lagre backup til fil';
      if(t === 'restoreFromFile') btn.textContent = 'Hent backup fra fil';
      if(t === 'Edit') btn.textContent = 'Rediger';
      if(t === 'Delete') btn.textContent = 'Slett';
    }else{
      if(t === 'saveAddNext') btn.textContent = 'Save & add next';
      if(t === 'clearForm') btn.textContent = 'Clear form';
      if(t === 'createRestorePoint') btn.textContent = 'Create restore point';
      if(t === 'backupToFile') btn.textContent = 'Backup to file';
      if(t === 'restoreFromFile') btn.textContent = 'Restore from file';
    }
  });
  const v = document.getElementById('appVersionText');
  if(v) v.textContent = 'v1.71';
}

const oldRender_v171 = render;
render = function(){
  oldRender_v171();
  fixLabels_v171();
};


/* v1.72 FINAL settings override: active version + no camelCase visible labels */
window.WHISKYLOG_VERSION='1.72';

function no172(){
  return settings && settings.language === 'no';
}
function t172(en,no){
  return no172() ? no : en;
}

function fixSettings172(){
  const settingsView = document.getElementById('settings');
  if(!settingsView) return;

  settingsView.classList.add('settings-fixed-v172');

  // Version must always be code version, never old stored/legacy value.
  const version = document.getElementById('appVersionText');
  if(version) version.textContent = 'v1.72';

  // Buttons by id.
  const labels = {
    createRestorePointBtn: t172('Create restore point','Opprett gjenopprettingspunkt'),
    backupToFileBtn: t172('Backup to file','Lagre backup til fil'),
    restoreFromFileBtn: t172('Restore from file','Hent backup fra fil'),
    exportBtn: t172('Export backup','Eksporter backup'),
    importBtn: t172('Import backup','Importer backup')
  };
  Object.entries(labels).forEach(([id,label])=>{
    const el = document.getElementById(id);
    if(el) el.textContent = label;
  });

  // CamelCase leftovers anywhere in settings.
  settingsView.querySelectorAll('button').forEach(btn=>{
    const txt = (btn.textContent || '').trim();
    const mapNo = {
      createRestorePoint:'Opprett gjenopprettingspunkt',
      backupToFile:'Lagre backup til fil',
      restoreFromFile:'Hent backup fra fil',
      exportBackupText:'Eksporter backuptekst',
      importBackupText:'Importer backuptekst',
      saveAddNext:'Lagre og legg til neste',
      clearForm:'Tøm skjema',
      'Create restore point':'Opprett gjenopprettingspunkt',
      'Backup to file':'Lagre backup til fil',
      'Restore from file':'Hent backup fra fil'
    };
    const mapEn = {
      createRestorePoint:'Create restore point',
      backupToFile:'Backup to file',
      restoreFromFile:'Restore from file',
      exportBackupText:'Export backup text',
      importBackupText:'Import backup text',
      saveAddNext:'Save & add next',
      clearForm:'Clear form',
      'Opprett gjenopprettingspunkt':'Create restore point',
      'Lagre backup til fil':'Backup to file',
      'Hent backup fra fil':'Restore from file'
    };
    if(no172() && mapNo[txt]) btn.textContent = mapNo[txt];
    if(!no172() && mapEn[txt]) btn.textContent = mapEn[txt];
  });

  // Headings and descriptions.
  settingsView.querySelectorAll('h2,h3,p,.sub,div').forEach(el=>{
    if(!el || el.children.length > 0) return;
    const txt = (el.textContent || '').trim();

    if(txt === 'Restore points' || txt === 'Gjenopprettingspunkter'){
      el.textContent = t172('Restore points','Gjenopprettingspunkter');
    }

    if(txt.startsWith('Create an internal restore point') || txt.startsWith('Opprett et internt gjenopprettingspunkt')){
      el.textContent = t172(
        'Create an internal restore point before cleanup or larger edits. Stored only in this browser/app on this device.',
        'Opprett et internt gjenopprettingspunkt før rydding eller større endringer. Lagres kun i denne nettleseren/appen på denne enheten.'
      );
    }

    if(txt.startsWith('Backup includes') || txt.startsWith('Backup inkluderer')){
      el.textContent = t172(
        'Backup includes library, bottles, images saved in the app, tastings, notes, wishlist and settings.',
        'Backup inkluderer bibliotek, flasker, bilder lagret i appen, smakinger, notater, ønskeliste og innstillinger.'
      );
    }

    if(txt.startsWith('App version:') || txt.startsWith('Appversjon:')){
      el.innerHTML = `${t172('App version','Appversjon')}: <strong id="appVersionText">v1.72</strong>`;
    }
  });
}

// Override old restore point init functions after they run.
const oldRender172 = render;
render = function(){
  oldRender172();
  setTimeout(fixSettings172, 0);
  setTimeout(fixSettings172, 100);
  setTimeout(fixSettings172, 500);
};

document.addEventListener('DOMContentLoaded',()=>setTimeout(fixSettings172,300));
document.addEventListener('click',()=>setTimeout(fixSettings172,120),true);
document.addEventListener('change',()=>setTimeout(fixSettings172,120),true);
setInterval(fixSettings172,1000);
