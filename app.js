
const KEY='whiskylog_appstore_v18_premium';
const TYPES=['Whisky','Single Malt Scotch','Blended Scotch','Bourbon','Rye Whiskey','Irish Whiskey','Japanese Whisky','Rum','Dark Rum','Aged Rum','Agricole Rum','Cognac','Armagnac','Brandy','Calvados','Tequila','Mezcal','Gin','Vodka','Aquavit','Grappa','Pisco','Liqueur','Amaro','Other'];

const DENSITY_TABLE=[
  {abv:0,dens:0.9982},{abv:5,dens:0.9892},{abv:10,dens:0.9807},{abv:15,dens:0.9723},
  {abv:20,dens:0.9640},{abv:25,dens:0.9559},{abv:30,dens:0.9479},{abv:35,dens:0.9399},
  {abv:40,dens:0.9319},{abv:45,dens:0.9239},{abv:50,dens:0.9157},{abv:55,dens:0.9073},{abv:60,dens:0.8987}
];

const state=load();
let pendingBaseImage='';
document.addEventListener('DOMContentLoaded',()=>{init();render();});

function load(){const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw):{bases:[],bottles:[],tastings:[]};}
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8);}
function esc(v=''){return String(v).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));}
function money(n){return Math.round(Number(n||0)).toLocaleString('en-US');}
function ml(n){return Math.round(Number(n||0)).toLocaleString('en-US')+' ml';}
function avg(a){return a.length?a.reduce((s,x)=>s+x,0)/a.length:0;}

function init(){
  document.getElementById('typeSelect').innerHTML=TYPES.map(t=>`<option>${t}</option>`).join('');
  document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>show(b.dataset.go));
  document.getElementById('backupButton').onclick=()=>show('backup');
  document.getElementById('baseForm').onsubmit=saveBase;
  document.getElementById('bottleForm').onsubmit=saveBottle;
  document.getElementById('tastingForm').onsubmit=saveTasting;
  document.getElementById('baseCancelButton').onclick=resetBaseForm;
  document.getElementById('bottleCancelButton').onclick=resetBottleForm;
  document.getElementById('tastingCancelButton').onclick=resetTastingForm;
  document.getElementById('exportButton').onclick=exportBackup;
  document.getElementById('importInput').onchange=importBackup;
  document.getElementById('resetButton').onclick=resetAll;
  document.getElementById('baseSearch').oninput=renderBaseList;
  document.getElementById('bottleSearch').oninput=renderBottleList;
  document.getElementById('baseImageInput').onchange=handleBaseImage;
  const today=new Date().toISOString().slice(0,10);
  document.querySelector('#bottleForm [name="purchaseDate"]').value=today;
  document.querySelector('#tastingForm [name="date"]').value=today;
  document.querySelector('#tastingForm [name="ml"]').value=20;
  ['abv','volume','fullWeight'].forEach(name=>document.querySelector(`#baseForm [name="${name}"]`).addEventListener('input',updateBaseHints));
  updateBaseHints();
}
function show(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.dataset.view===name));
  document.querySelectorAll('.navbtn').forEach(v=>v.classList.toggle('active',v.dataset.go===name));
  window.scrollTo({top:0,behavior:'smooth'});
}
async function handleBaseImage(e){
  const file=e.target.files[0]; if(!file)return;
  pendingBaseImage=await resizeImage(file);
  const p=document.getElementById('baseImagePreview');p.src=pendingBaseImage;p.classList.remove('hidden');
}
function resizeImage(file){
  return new Promise((resolve,reject)=>{
    const fr=new FileReader();
    fr.onload=()=>{const img=new Image();img.onload=()=>{const ratio=Math.min(1,1200/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*ratio);c.height=Math.round(img.height*ratio);c.getContext('2d').drawImage(img,0,0,c.width,c.height);resolve(c.toDataURL('image/jpeg',0.82));};img.onerror=reject;img.src=fr.result;};
    fr.onerror=reject;fr.readAsDataURL(file);
  });
}
function densityFromAbv(abv){
  let a=Math.max(0,Math.min(60,Number(abv||0)));
  for(let i=0;i<DENSITY_TABLE.length-1;i++){
    const lo=DENSITY_TABLE[i],hi=DENSITY_TABLE[i+1];
    if(a>=lo.abv&&a<=hi.abv){
      const t=(a-lo.abv)/(hi.abv-lo.abv);
      return lo.dens+t*(hi.dens-lo.dens);
    }
  }
  return DENSITY_TABLE[DENSITY_TABLE.length-1].dens;
}
function computedEmptyWeight(base){
  const fw=Number(base.fullWeight||0),vol=Number(base.volume||0),dens=densityFromAbv(Number(base.abv||0));
  if(fw>0&&vol>0)return fw-vol*dens;
  return null;
}
function updateBaseHints(){
  const f=document.getElementById('baseForm');
  const abv=Number(f.querySelector('[name="abv"]').value||0);
  const vol=Number(f.querySelector('[name="volume"]').value||0);
  const fw=Number(f.querySelector('[name="fullWeight"]').value||0);
  const dens=densityFromAbv(abv);
  document.getElementById('densityHint').textContent=dens.toFixed(4)+' g/ml';
  const empty=(fw>0&&vol>0)?fw-vol*dens:null;
  document.getElementById('emptyHint').textContent=empty!==null?Math.round(empty)+' g':'—';
}
function getBase(id){return state.bases.find(b=>b.id===id);}
function getBottle(id){return state.bottles.find(b=>b.id===id);}
function bottleName(b){
  const base=getBase(b.baseId),parts=[];
  if(b.batchNo)parts.push('Batch '+b.batchNo);
  if(b.bottleNo)parts.push('Bottle '+b.bottleNo);
  return `${base?base.name:'Unknown'}${parts.length?' ('+parts.join(' · ')+')':''}`;
}
function bottleTastings(id){return state.tastings.filter(t=>t.bottleId===id);}
function bottleAvg(id){return avg(bottleTastings(id).map(t=>Number(t.score||0)));}
function bottleUsed(id){return bottleTastings(id).reduce((s,t)=>s+Number(t.ml||0),0);}
function bottleVolume(id){
  const bottle=getBottle(id);if(!bottle)return 0;
  const base=getBase(bottle.baseId);if(!base)return 0;
  const ew=computedEmptyWeight(base),fw=Number(base.fullWeight||0),cw=Number(bottle.currentWeight||0);
  if(ew!==null&&fw>ew&&cw>0){
    const fraction=Math.max(0,Math.min(1,(cw-ew)/(fw-ew)));
    return Math.round(Number(base.volume||0)*fraction);
  }
  return Math.max(0,Math.round(Number(base.volume||0)-bottleUsed(id)));
}
function lastTasted(id){
  const arr=bottleTastings(id).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  return arr[0]?.date||'—';
}
function bestValueScore(id){
  const bottle=getBottle(id),base=getBase(bottle?.baseId);
  if(!bottle||!base)return 0;
  const ppm=Number(bottle.price||0)/Math.max(1,Number(base.volume||0));
  return bottleAvg(id)/Math.max(0.001,ppm);
}
function bottleNeedsWeighing(id){
  const bottle=getBottle(id),base=getBase(bottle?.baseId);
  return !!(bottle&&base&&Number(bottle.currentWeight||0)<=0&&Number(base.fullWeight||0)>0&&Number(base.volume||0)>0);
}
function thumb(base){
  return base?.image?`<img class="thumb" src="${base.image}" alt="">`:`<div class="thumb placeholder">🥃</div>`;
}
function saveBase(e){
  e.preventDefault();
  const f=new FormData(e.target),id=f.get('editId')||uid();
  upsert(state.bases,{id,name:f.get('name'),distillery:f.get('distillery')||'',type:f.get('type')||'Whisky',abv:Number(f.get('abv')||0),volume:Number(f.get('volume')||0),fullWeight:Number(f.get('fullWeight')||0),region:f.get('region')||'',notes:f.get('notes')||'',image:pendingBaseImage||(getBase(id)?.image||'')});
  save();resetBaseForm();render();show('library');
}
function saveBottle(e){
  e.preventDefault();
  const f=new FormData(e.target),id=f.get('editId')||uid();
  upsert(state.bottles,{id,baseId:f.get('baseId'),batchNo:f.get('batchNo')||'',bottleNo:f.get('bottleNo')||'',price:Number(f.get('price')||0),purchasePlace:f.get('purchasePlace')||'',purchaseDate:f.get('purchaseDate')||'',currentWeight:Number(f.get('currentWeight')||0),notes:f.get('notes')||''});
  save();resetBottleForm();render();show('bottles');
}
function saveTasting(e){
  e.preventDefault();
  const f=new FormData(e.target),id=f.get('editId')||uid();
  const nose=Number(f.get('nose')||0),palate=Number(f.get('palate')||0),finish=Number(f.get('finish')||0),balance=Number(f.get('balance')||0);
  upsert(state.tastings,{id,bottleId:f.get('bottleId'),date:f.get('date'),ml:Number(f.get('ml')||0),nose,palate,finish,balance,score:Number(((nose+palate+finish+balance)/4).toFixed(1)),notes:f.get('notes')||''});
  save();resetTastingForm();render();show('tastings');
}
function upsert(arr,item){const idx=arr.findIndex(x=>x.id===item.id);if(idx>=0)arr[idx]=item;else arr.unshift(item);}
function resetBaseForm(){document.getElementById('baseForm').reset();document.querySelector('#baseForm [name="editId"]').value='';pendingBaseImage='';const p=document.getElementById('baseImagePreview');p.src='';p.classList.add('hidden');document.getElementById('baseSaveButton').textContent='Save library item';document.getElementById('baseCancelButton').classList.add('hidden');updateBaseHints();}
function resetBottleForm(){document.getElementById('bottleForm').reset();document.querySelector('#bottleForm [name="editId"]').value='';document.getElementById('bottleSaveButton').textContent='Save bottle';document.getElementById('bottleCancelButton').classList.add('hidden');document.querySelector('#bottleForm [name="purchaseDate"]').value=new Date().toISOString().slice(0,10);}
function resetTastingForm(){document.getElementById('tastingForm').reset();document.querySelector('#tastingForm [name="editId"]').value='';document.getElementById('tastingSaveButton').textContent='Save tasting';document.getElementById('tastingCancelButton').classList.add('hidden');document.querySelector('#tastingForm [name="date"]').value=new Date().toISOString().slice(0,10);document.querySelector('#tastingForm [name="ml"]').value=20;}
function editBase(id){const b=getBase(id);if(!b)return;const f=document.getElementById('baseForm');f.querySelector('[name="name"]').value=b.name||'';f.querySelector('[name="distillery"]').value=b.distillery||'';f.querySelector('[name="type"]').value=b.type||'Whisky';f.querySelector('[name="abv"]').value=b.abv||'';f.querySelector('[name="volume"]').value=b.volume||'';f.querySelector('[name="fullWeight"]').value=b.fullWeight||'';f.querySelector('[name="region"]').value=b.region||'';f.querySelector('[name="notes"]').value=b.notes||'';f.querySelector('[name="editId"]').value=b.id;if(b.image){pendingBaseImage=b.image;const p=document.getElementById('baseImagePreview');p.src=b.image;p.classList.remove('hidden');}document.getElementById('baseSaveButton').textContent='Update library item';document.getElementById('baseCancelButton').classList.remove('hidden');updateBaseHints();show('library');}
function editBottle(id){const b=getBottle(id);if(!b)return;const f=document.getElementById('bottleForm');f.querySelector('[name="baseId"]').value=b.baseId||'';f.querySelector('[name="batchNo"]').value=b.batchNo||'';f.querySelector('[name="bottleNo"]').value=b.bottleNo||'';f.querySelector('[name="price"]').value=b.price||'';f.querySelector('[name="purchasePlace"]').value=b.purchasePlace||'';f.querySelector('[name="purchaseDate"]').value=b.purchaseDate||'';f.querySelector('[name="currentWeight"]').value=b.currentWeight||'';f.querySelector('[name="notes"]').value=b.notes||'';f.querySelector('[name="editId"]').value=b.id;document.getElementById('bottleSaveButton').textContent='Update bottle';document.getElementById('bottleCancelButton').classList.remove('hidden');show('new-bottle');}
function editTasting(id){const t=state.tastings.find(x=>x.id===id);if(!t)return;const f=document.getElementById('tastingForm');f.querySelector('[name="bottleId"]').value=t.bottleId||'';f.querySelector('[name="date"]').value=t.date||'';f.querySelector('[name="ml"]').value=t.ml||'';f.querySelector('[name="nose"]').value=t.nose||'';f.querySelector('[name="palate"]').value=t.palate||'';f.querySelector('[name="finish"]').value=t.finish||'';f.querySelector('[name="balance"]').value=t.balance||'';f.querySelector('[name="notes"]').value=t.notes||'';f.querySelector('[name="editId"]').value=t.id;document.getElementById('tastingSaveButton').textContent='Update tasting';document.getElementById('tastingCancelButton').classList.remove('hidden');show('tastings');}
function deleteBase(id){if(!confirm('Delete this library item? Related bottles and tastings will also be deleted.'))return;const ids=state.bottles.filter(b=>b.baseId===id).map(b=>b.id);state.bases=state.bases.filter(b=>b.id!==id);state.bottles=state.bottles.filter(b=>b.baseId!==id);state.tastings=state.tastings.filter(t=>!ids.includes(t.bottleId));save();render();}
function deleteBottle(id){if(!confirm('Delete this bottle? Related tastings will also be deleted.'))return;state.bottles=state.bottles.filter(b=>b.id!==id);state.tastings=state.tastings.filter(t=>t.bottleId!==id);save();render();}
function deleteTasting(id){if(!confirm('Delete this tasting?'))return;state.tastings=state.tastings.filter(t=>t.id!==id);save();render();}
function weighBottle(id){const b=getBottle(id);if(!b)return;const val=prompt('Current weight in grams',b.currentWeight||'');if(val===null)return;b.currentWeight=Number(val||0);save();render();}
function exportBackup(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='whiskylog-backup.json';a.click();}
function importBackup(e){const file=e.target.files[0];if(!file)return;const fr=new FileReader();fr.onload=()=>{try{const data=JSON.parse(fr.result);state.bases=Array.isArray(data.bases)?data.bases:[];state.bottles=Array.isArray(data.bottles)?data.bottles:[];state.tastings=Array.isArray(data.tastings)?data.tastings:[];save();render();alert('Backup imported.');}catch{alert('Could not read backup file.');}};fr.readAsText(file);}
function resetAll(){if(!confirm('Reset all data?'))return;state.bases=[];state.bottles=[];state.tastings=[];save();render();}
function render(){renderPickers();renderHome();renderBaseList();renderBottleList();renderTastings();}
function renderPickers(){document.getElementById('basePick').innerHTML=state.bases.length?state.bases.map(b=>`<option value="${b.id}">${esc(b.name)} — ${esc(b.type)}</option>`).join(''):'<option value="">No library items</option>';document.getElementById('bottlePick').innerHTML=state.bottles.length?state.bottles.map(b=>`<option value="${b.id}">${esc(bottleName(b))}</option>`).join(''):'<option value="">No bottles</option>';}
function renderHome(){document.getElementById('totalCost').textContent=money(state.bottles.reduce((s,b)=>s+Number(b.price||0),0));document.getElementById('totalVolume').textContent=ml(state.bottles.reduce((s,b)=>s+bottleVolume(b.id),0));document.getElementById('bottleCount').textContent=state.bottles.length;document.getElementById('tastingCount').textContent=state.tastings.length;
const best=[...state.bottles].sort((a,b)=>bestValueScore(b.id)-bestValueScore(a.id)).slice(0,5);document.getElementById('bestValueList').innerHTML=best.length?best.map(renderBottleMiniCard).join(''):'<div class="sub">No bottles yet.</div>';
const weigh=[...state.bottles].filter(b=>bottleNeedsWeighing(b.id)).slice(0,5);document.getElementById('weighNextList').innerHTML=weigh.length?weigh.map(b=>`<div class="item">${thumb(getBase(b.baseId))}<div><div class="title">${esc(bottleName(b))}</div><div class="meta">Ready for weight-based volume tracking</div></div><div class="side"><button class="smallbtn" onclick="weighBottle('${b.id}')">Weigh</button></div></div>`).join(''):'<div class="sub">No bottles need weighing.</div>';
const low=[...state.bottles].filter(b=>bottleVolume(b.id)<=200).sort((a,b)=>bottleVolume(a.id)-bottleVolume(b.id)).slice(0,5);document.getElementById('lowStockList').innerHTML=low.length?low.map(renderBottleMiniCard).join(''):'<div class="sub">No low-stock bottles.</div>';
const recent=[...state.tastings].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,5);document.getElementById('recentList').innerHTML=recent.length?recent.map(t=>`<div class="item"><div class="thumb placeholder">📝</div><div><div class="title">${esc(bottleName(getBottle(t.bottleId)||{}))}</div><div class="meta">${esc(t.date)} · Score ${t.score} · ${t.ml} ml</div><div class="sub">${esc(t.notes||'')}</div></div></div>`).join(''):'<div class="sub">No tastings yet.</div>';
const typeTotals={};state.bottles.forEach(b=>{const base=getBase(b.baseId);const type=base?.type||'Other';typeTotals[type]=(typeTotals[type]||0)+bottleVolume(b.id);});document.getElementById('typeVolumeList').innerHTML=Object.keys(typeTotals).length?Object.entries(typeTotals).sort((a,b)=>b[1]-a[1]).map(([type,vol])=>`<div class="item"><div class="thumb placeholder">📊</div><div><div class="title">${esc(type)}</div><div class="meta">${ml(vol)}</div></div></div>`).join(''):'<div class="sub">No bottles yet.</div>';}
function renderBottleMiniCard(b){const base=getBase(b.baseId);return `<div class="item">${thumb(base)}<div><div class="title">${esc(bottleName(b))}</div><div class="meta">${ml(bottleVolume(b.id))} left · Avg ${bottleAvg(b.id).toFixed(1)} · Value ${bestValueScore(b.id).toFixed(2)}</div></div></div>`;}
function renderBaseList(){const q=(document.getElementById('baseSearch').value||'').toLowerCase().trim();const items=state.bases.filter(b=>[b.name,b.distillery,b.type,b.region,b.notes].join(' ').toLowerCase().includes(q));document.getElementById('baseList').innerHTML=items.length?items.map(b=>{const dens=densityFromAbv(Number(b.abv||0)),empty=computedEmptyWeight(b);return `<div class="item">${thumb(b)}<div><div class="title">${esc(b.name)}</div><div class="meta">${esc(b.type)} · ${esc(b.distillery||'')}</div><div class="meta">${esc(b.region||'')} · ${b.abv?b.abv+'%':'ABV not set'} · density ${dens.toFixed(4)} g/ml</div><div class="tags"><span class="pill">${ml(b.volume)}</span><span class="pill">${b.fullWeight?Math.round(b.fullWeight)+' g full':'Full weight not set'}</span><span class="pill ok">${empty!==null?Math.round(empty)+' g empty':'Empty weight unavailable'}</span></div></div><div class="side"><button class="smallbtn" onclick="editBase('${b.id}')">Edit</button><button class="smallbtn" onclick="deleteBase('${b.id}')">Delete</button></div></div>`;}).join(''):'<div class="sub">No library items.</div>';}
function renderBottleList(){const q=(document.getElementById('bottleSearch').value||'').toLowerCase().trim();const items=state.bottles.filter(b=>{const base=getBase(b.baseId);return [base?.name,b.batchNo,b.bottleNo,b.purchasePlace,b.notes].join(' ').toLowerCase().includes(q);});document.getElementById('bottleList').innerHTML=items.length?items.map(b=>{const base=getBase(b.baseId);return `<div class="item">${thumb(base)}<div><div class="title">${esc(bottleName(b))}</div><div class="meta">${esc(base?.type||'')} · ${esc(base?.distillery||'')}</div><div class="meta">${esc(b.purchasePlace||'')} · Last tasted ${esc(lastTasted(b.id))}</div><div class="tags"><span class="pill">${ml(bottleVolume(b.id))} left</span><span class="pill">${money(b.price)}</span><span class="pill ok">Avg ${bottleAvg(b.id).toFixed(1)}</span><span class="pill ${Number(base?.fullWeight||0)>0?'ok':'warn'}">${Number(base?.fullWeight||0)>0?'Weight tracking ready':'Needs full weight'}</span></div></div><div class="side"><button class="smallbtn" onclick="weighBottle('${b.id}')">Weigh</button><button class="smallbtn" onclick="editBottle('${b.id}')">Edit</button><button class="smallbtn" onclick="deleteBottle('${b.id}')">Delete</button></div></div>`;}).join(''):'<div class="sub">No bottles.</div>';}
function renderTastings(){const items=[...state.tastings].sort((a,b)=>String(b.date).localeCompare(String(a.date)));document.getElementById('tastingList').innerHTML=items.length?items.map(t=>`<div class="item"><div class="thumb placeholder">📝</div><div><div class="title">${esc(bottleName(getBottle(t.bottleId)||{}))}</div><div class="meta">${esc(t.date)} · ${t.ml} ml · Score ${t.score}</div><div class="sub">${esc(t.notes||'')}</div></div><div class="side"><button class="smallbtn" onclick="editTasting('${t.id}')">Edit</button><button class="smallbtn" onclick="deleteTasting('${t.id}')">Delete</button></div></div>`).join(''):'<div class="sub">No tastings.</div>';}
