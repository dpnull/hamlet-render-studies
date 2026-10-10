import {makeTown,THREE} from './world.js';
/*! canvas-confetti v1.9.4 | ISC License | (c) 2020 Kiril Vatev — vendored from the bird game */
import confetti from './vendor/confetti/confetti.module.mjs';
const app=document.getElementById('app'),scene=document.getElementById('scene');
const texts={zh:{edition:'小镇新作 · 设计提案',day:'日光',dusk:'暮色',weather:'午后 · 有一点风',nightWeather:'傍晚 · 窗里亮起了灯',title:'日子，在这里慢慢长大。',nightTitle:'灯亮着，慢慢回来就好。',caption:'有信等你，也有一会儿发呆的时间。',nightCaption:'把今天放下来，留一点时间给自己。',hint:'点一栋小房子，走近看看',town:'小镇',things:'小事',mail:'来信',study:'可交互的视觉提案',references:'灵感来源 ↗',enter:'走进去看看',leave:'回到门口',inside:'屋里也有一点日常',capture:'留下一点什么',captureLead:'想到的、做过的，或者想留给明天的。',placeholder:'此刻想到的小事……',save:'放进小镇',saved:'已经放进小镇了',emptyInput:'先写下一点什么',savedLabel:'保存在这台浏览器',storageError:'浏览器无法保存，请先复制这段文字',thingsTitle:'留在这里的小事',thingsLead:'想回头看时，它们就在这里。',empty:'这里还空着。想到什么，就随手留下一点。',add:'记一件小事',localNote:'这些记录只保存在当前浏览器。此处是设计演示，还未连接原生应用或云同步。',mailTitle:'今天的小小来信',mailOverline:'午后邮局 / 一封演示来信',mailBody:'窗边的光又挪了一点。书翻到了新的一页，桌上的杯子还温着。<br><br>今天留下的那些小事，都有了自己的位置。剩下的，明天再慢慢来。',mailSign:'你的小镇',mailDemo:'这封信是预写的演示内容。正式的来信如何回应真实记录，仍需另行设计。',mailAction:'也留下一件小事',aboutTitle:'一条安静的小街',aboutLead:'几栋房子，一只小豆，几件正在发生的小事。',aboutBody:'屋顶有自己的轮廓，颜色只在小地方发亮。界面轻轻浮在上面，让小镇有足够的呼吸空间。',aboutBoundary:'这是用可编辑几何搭建的浏览器视觉提案。半透明控件用于表达 Liquid Glass 的层次关系，并非原生 Apple 控件；iPhone 性能、自由摆放与真实数据功能仍未实现。Scarlet 决定最终美术方向。',exportImage:'保存小镇画面',aboutRefs:'看看灵感板',apple:'Apple 设计参考',pause:'暂停小镇的动态',play:'继续小镇的动态',zoomIn:'放大',zoomOut:'缩小',reset:'回到整座小镇',close:'关闭',labelHome:'我的小屋',labelPost:'邮局',labelLibrary:'书屋',arrive:'邮车慢慢经过，小镇照常过日子。'},en:{edition:'A new town study',day:'Daylight',dusk:'Dusk',weather:'AFTERNOON · A LITTLE BREEZE',nightWeather:'EVENING · THE WINDOWS ARE WARM',title:'A little place for your days.',nightTitle:'There’s a light on for you.',caption:'A letter waiting. A moment with nothing to do.',nightCaption:'Put today down. Keep a little time for yourself.',hint:'Choose a small building. Take a closer look.',town:'Town',things:'Things',mail:'Letters',study:'Interactive visual proposal',references:'The mood board ↗',enter:'Take a look inside',leave:'Back to the doorstep',inside:'There’s a little life inside, too.',capture:'Leave a little something',captureLead:'A thought, a thing you did, or something for tomorrow.',placeholder:'Something on your mind…',save:'Keep it here',saved:'A little thing, kept safely here',emptyInput:'Write a little something first',savedLabel:'Saved in this browser',storageError:'Browser storage is unavailable. Please copy your words first.',thingsTitle:'The little things you kept',thingsLead:'They’re here whenever you want to look back.',empty:'A little space for whatever comes to mind.',add:'Keep a little thing',localNote:'These records stay in this browser. This design study is not connected to a native app or cloud sync.',mailTitle:'A small afternoon letter',mailOverline:'THE POST OFFICE / A SAMPLE LETTER',mailBody:'The light has moved a little across the window. A book has found a new page. The cup on the desk is still warm.<br><br>The small things you kept today have a place of their own. The rest can wait for another day.',mailSign:'Your little town',mailDemo:'This is a prewritten sample. How real letters respond to your records still needs to be designed.',mailAction:'Keep a little thing, too',aboutTitle:'A quiet little street',aboutLead:'A few buildings. One bean. A little life happening.',aboutBody:'Distinct roofs, soft materials, and colour in small places. The interface floats lightly above it, leaving the town room to breathe.',aboutBoundary:'An editable geometry study in a browser. Translucent controls suggest the Liquid Glass hierarchy; they are not native Apple controls. iPhone performance, free placement and real data features remain unbuilt. Scarlet chooses the final art direction.',exportImage:'Save the town image',aboutRefs:'Explore the mood board',apple:'Apple design reference',pause:'Pause ambient movement',play:'Resume ambient movement',zoomIn:'Zoom in',zoomOut:'Zoom out',reset:'Return to the whole town',close:'Close',labelHome:'Your little home',labelPost:'Post office',labelLibrary:'Reading room',arrive:'The post van passes. The town goes about its day.'}};
const buildings={home:{zh:['留一点时间给自己','我的小屋','桌上放着写到一半的笔记。窗边的位置，一直给你留着。','笔记、信件，还有发呆的位置','记一件小事'],en:['A LITTLE ROOM OF YOUR OWN','Your little home','An unfinished notebook on the desk. Your place by the window is still here.','A notebook, a letter tray, room to daydream.','Keep a little thought']},post:{zh:['一些话，值得留下','午后邮局','今天的信已经到了。也许只是很小的一件事，也有专门的地方装下它。','一封午后来信，正在等你','打开今天的信'],en:['SOME WORDS WORTH KEEPING','The afternoon post','A letter has arrived. Even a very small thing deserves somewhere of its own.','A small afternoon letter is waiting.','Open the letter']},library:{zh:['读到哪里，都算一页','窗边书屋','上次读到的那一页，还夹着书签。小豆可以陪你再坐一会儿。','书架、笔记，以及一张安静的桌子','看看留下的笔记'],en:['A PAGE IS STILL A PAGE','The reading room','Your bookmark is still where you left it. The bean can sit with you a little longer.','Books, notes, and one quiet desk.','Look through your notes']}};

// v1: one building = one job = one tab. 小屋 keeps small things, 邮局 holds the postcard and letters to tomorrow,
// 书屋 keeps reading notes, 工坊 keeps tasks. The left sheet lists them; a note opens on the right in a
// Notes-style editor, a task opens in place as a card, like Things.
const placeIds=['home','post','library','workshop'];
Object.assign(texts.zh,{
  tabHome:'小屋',tabPost:'邮局',tabLibrary:'书屋',tabWorkshop:'工坊',labelWorkshop:'工坊',
  add:{home:'小事',post:'一封信',library:'读书笔记',workshop:'待办'},addMenu:'新建',
  newNote:{home:'新建小事',library:'新建读书笔记',post:'写一张给明天'},
  untitled:{home:'新的小事',library:'新的读书笔记',post:'给明天的信'},
  titlePh:'标题',bodyPh:{home:'写点什么……',library:'读到了什么，想到了什么……',post:'写几句给明天的自己……'},
  noText:'没有其他内容',deleted:'删掉了',
  today:'今天',week:'过去 7 天',earlier:'更早',sample:'示例',writeTitle:'寄给明天',linksTitle:'看看更多',
  samples:{home:[['给窗台的薄荷浇了水','叶子比上周多了两片。'],['明天早点出门','走那条有树的路。']],library:[['《瓦尔登湖》第二章','读了二十页，停在湖边的那一章。'],['书签背面','把喜欢的一句话抄了下来。']]},
  greetSmall:'GREETINGS FROM',greet:'来自小镇的问候',postTo:'致 住在小屋里的你',flipHint:'点一下明信片，翻到背面',flipBack:'再点一下，翻回正面',
  soundOn:'关掉夜晚的声音',soundOff:'打开夜晚的声音'
});
Object.assign(texts.en,{
  tabHome:'Home',tabPost:'Post',tabLibrary:'Reading',tabWorkshop:'Tasks',labelWorkshop:'Workshop',
  add:{home:'Small thing',post:'Letter',library:'Reading note',workshop:'Task'},addMenu:'New',
  newNote:{home:'New small thing',library:'New reading note',post:'Write to tomorrow'},
  untitled:{home:'New small thing',library:'New reading note',post:'Letter to tomorrow'},
  titlePh:'Title',bodyPh:{home:'Write something…',library:'What you read, and what it made you think…',post:'A few lines for tomorrow’s you…'},
  noText:'No additional text',deleted:'Deleted',
  today:'Today',week:'Previous 7 Days',earlier:'Earlier',sample:'Sample',writeTitle:'Write to tomorrow',linksTitle:'More to see',
  samples:{home:[['Watered the mint','Two new leaves since last week.'],['Leave a little early tomorrow','Take the tree-lined way.']],library:[['Walden, chapter two','Read twenty pages. Stopped at the chapter by the lake.'],['The back of a bookmark','Copied a favourite line onto it.']]},
  greetSmall:'GREETINGS FROM',greet:'',postTo:'To: you, at your little home',flipHint:'Tap the postcard to turn it over',flipBack:'Tap again to turn it back',
  soundOn:'Turn night sounds off',soundOff:'Turn night sounds on'
});

const newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const nowIso=()=>new Date().toISOString();
let lang='zh',sheetMode=null,notes=[],current=null,toastTimer,night=true,sheetOpener=null,sheetTimer,menuTimer,editorTimer,saveTimer,soundOn=true;
try{
  lang=localStorage.getItem('hamlet-quiet-lang')==='en'?'en':'zh';
  soundOn=localStorage.getItem('hamlet-quiet-audio')!=='off';
  const v=JSON.parse(localStorage.getItem('hamlet-quiet-notes')||'[]');
  // Older saves were {text,date}; the first line becomes the title.
  if(Array.isArray(v))notes=v.filter(n=>n&&typeof n.date==='string').map(n=>{
    const kind=placeIds.includes(n.kind)?n.kind:'home';
    if(typeof n.title==='string')return{...n,kind,body:String(n.body||''),updated:n.updated||n.date};
    const[first,...rest]=String(n.text||'').split('\n');
    return{id:newId(),kind,title:first,body:rest.join('\n'),date:n.date,updated:n.date};
  });
}catch{}
const t=k=>texts[lang][k];
let usingKeys=false;
document.addEventListener('keydown',()=>{usingKeys=true;},true);
document.addEventListener('pointerdown',()=>{usingKeys=false;},true);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=id=>document.getElementById(id);
const isPhone=()=>app.clientWidth<=650;
const isPlace=mode=>placeIds.includes(mode);

let world;
try{world=makeTown(scene,id=>select(id));}
catch(e){$('loading').innerHTML='<p>当前浏览器无法显示 3D 小镇。请在支持 WebGL 的浏览器中打开。</p>';throw e;}
window.quietTown=world;

const sheet=$('sheet'),sheetBody=$('sheet-body'),editor=$('editor'),nav=document.querySelector('.bottom-nav'),lens=document.querySelector('.nav-lens'),addMenu=$('add-menu'),audio=$('night-audio');

// Place labels follow their buildings and fade when the sheet covers them.
const labels=$('labels');
for(const b of world.buildings){
  const el=document.createElement('button');
  el.className='place-label';el.dataset.building=b.id;el.onclick=()=>select(b.id);
  labels.append(el);
}
function updateLabels(){
  const cover=sheetMode?sheet.getBoundingClientRect():null;
  world.buildings.forEach(b=>{
    const pos=world.screenPoint(b.label),el=labels.querySelector(`[data-building="${b.id}"]`);
    el.style.left=pos.x+'px';el.style.top=pos.y+'px';
    el.classList.toggle('occluded',Boolean(cover)&&pos.x>cover.left-24&&pos.x<cover.right+24&&pos.y>cover.top-16&&pos.y<cover.bottom+16);
  });
  requestAnimationFrame(updateLabels);
}
requestAnimationFrame(updateLabels);

function toast(s){
  const e=$('toast');e.textContent=s;e.classList.add('visible');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('visible'),2300);
}

// Tapping a building (or its tab) focuses it on the right and opens its page; null closes it.
function select(id){
  if(id)openSheet(id);
  else if(isPlace(sheetMode))closeSheet();
}
function focusBuilding(id){
  world.focus(id);
  app.classList.toggle('focused',Boolean(id));
  labels.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.building===id));
}

// ── Language, time of day, motion, sound ──
function setLanguage(v){
  lang=v;samples=null;
  document.documentElement.lang=lang==='zh'?'zh-CN':'en';
  document.title=lang==='zh'?'Hamlet · 慢慢长出来的小镇':'Hamlet · A little place for your days';
  app.classList.toggle('english',lang==='en');
  document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
  $('language').textContent=lang==='zh'?'EN':'中';
  $('language').setAttribute('aria-label',lang==='zh'?'Switch to English':'切换到简体中文');
  labels.querySelectorAll('button').forEach(b=>{
    b.textContent=t({home:'labelHome',post:'labelPost',library:'labelLibrary',workshop:'labelWorkshop'}[b.dataset.building]);
    b.setAttribute('aria-label',b.textContent);
  });
  for(const[id,key]of[['zoom-in','zoomIn'],['zoom-out','zoomOut'],['reset','reset'],['close-sheet','close'],['editor-done','close'],['editor-back','close']])$(id).setAttribute('aria-label',t(key));
  $('capture').setAttribute('aria-label',t('addMenu'));
  addMenu.setAttribute('aria-label',t('addMenu'));
  addMenu.innerHTML=placeIds.map(id=>`<button role="menuitem" data-add="${id}"><span class="tile small">${icons.plus}</span>${t('add')[id]}</button>`).join('');
  updateMotionLabel();updateSkyText();updateSound();
  if(sheetMode)renderSheet(sheetMode);
  if(current)fillEditor();
  updateIdentity(false);
  renderNews();if(noticeItem)openNotice(noticeItem);
  requestAnimationFrame(syncChrome);
  try{localStorage.setItem('hamlet-quiet-lang',lang);}catch{}
}
function updateSkyText(){
  $('weather').textContent=t(night?'nightWeather':'weather');
  $('greeting-title').textContent=t(night?'nightTitle':'title');
  $('greeting-caption').textContent=t(night?'nightCaption':'caption');
}
function updateMotionLabel(){
  const m=world.getState().motion,b=$('motion');
  b.setAttribute('aria-pressed',String(m));b.setAttribute('aria-label',t(m?'pause':'play'));
  b.innerHTML=m?'<svg viewBox="0 0 24 24"><path d="M8 5v14m8-14v14"/></svg>':'<svg viewBox="0 0 24 24"><path d="m9 5 10 7-10 7Z"/></svg>';
  app.classList.toggle('no-motion',!m);
}
function setDusk(v,instant=false){
  night=v;world.setDusk(v,instant);app.classList.toggle('dusk',v);
  $('day').classList.toggle('selected',!v);$('dusk').classList.toggle('selected',v);
  $('day').setAttribute('aria-pressed',String(!v));$('dusk').setAttribute('aria-pressed',String(v));
  updateSkyText();updateSound();
}
// Night plays the nature sounds. Browsers only allow sound after the first tap or key,
// so a blocked start waits for that and then fades in.
let fadeRaf,soundBlocked=false;
function fadeTo(target,ms,then){
  cancelAnimationFrame(fadeRaf);
  const from=audio.volume,start=performance.now();
  const step=now=>{const k=Math.min(1,Math.max(0,(now-start)/ms));audio.volume=Math.min(1,Math.max(0,from+(target-from)*k));if(k<1)fadeRaf=requestAnimationFrame(step);else then?.();};
  fadeRaf=requestAnimationFrame(step);
}
function updateSound(){
  const on=night&&soundOn,b=$('sound');
  b.setAttribute('aria-pressed',String(soundOn));b.setAttribute('aria-label',t(soundOn?'soundOn':'soundOff'));
  b.innerHTML=soundOn?svg('M4 9.5h3.5L12 6v12l-4.5-3.5H4ZM15.5 9.5a3.5 3.5 0 0 1 0 5M18 7a7 7 0 0 1 0 10'):svg('M4 9.5h3.5L12 6v12l-4.5-3.5H4ZM16 9.5l5 5m0-5-5 5');
  if(on){
    if(audio.paused){audio.volume=0;audio.play().then(()=>{soundBlocked=false;fadeTo(.6,2200);}).catch(()=>{soundBlocked=true;});}
    else fadeTo(.6,900);
  }else if(!audio.paused)fadeTo(0,900,()=>audio.pause());
}
for(const type of['pointerdown','pointerup','touchend','click','keydown'])document.addEventListener(type,()=>{if(soundBlocked){soundBlocked=false;updateSound();}},{capture:true});

// ── The top-left identity shows the open page's title ──
const titles={
  home:()=>buildings.home[lang].slice(0,2).reverse(),
  post:()=>buildings.post[lang].slice(0,2).reverse(),
  library:()=>buildings.library[lang].slice(0,2).reverse(),
  workshop:()=>buildings.workshop[lang].slice(0,2).reverse(),
  about:()=>[t('aboutTitle'),'HAMLET / QUIET TOWN']
};
function updateIdentity(animate=true){
  const[title,sub]=sheetMode?titles[sheetMode]():['Hamlet',t('edition')];
  if($('identity-title').textContent===title&&$('identity-sub').textContent===sub)return;
  $('identity-title').textContent=title;$('identity-sub').textContent=sub;
  if(animate&&world.getState().motion)$('identity-text').animate([{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.2,.8,.2,1)'});
}

// ── Icons: all clear, line-drawn ──
const svg=d=>`<svg viewBox="0 0 24 24"><path d="${d}"/></svg>`;
const icons={
  home:svg('m4 11 8-7 8 7v9H4ZM9 20v-6h6v6'),
  post:'<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="m3.5 8 8.5 6 8.5-6"/></svg>',
  library:svg('M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5V19c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5ZM12 6v13.5'),
  plus:svg('M12 6v12M6 12h12'),
  compose:svg('M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M17.5 3.5l3 3L12 15l-4 1 1-4Z'),
  chevron:'<svg class="chevron" viewBox="0 0 24 24"><path d="m10 7 5 5-5 5"/></svg>',
  arrow:'<svg class="chevron" viewBox="0 0 24 24"><path d="M8 16 16 8m-6 0h6v6"/></svg>',
  camera:'<svg viewBox="0 0 24 24"><path d="M4 8.5h3l1.5-2.5h7L17 8.5h3V19H4Z"/><circle cx="12" cy="13.5" r="3.2"/></svg>'
};
const tile=icon=>`<span class="tile">${icon}</span>`;

// ── Notes ──
let samples=null;
// Shown until a building has notes of its own; editing one turns it into a real note.
function sampleNotes(kind){
  if(!samples)samples=Object.fromEntries(Object.entries(t('samples')).map(([k,list])=>[k,list.map(([title,body],i)=>({id:`sample-${k}-${i}`,kind:k,title,body,sample:true,date:nowIso(),updated:nowIso()}))]));
  return samples[kind]||[];
}
const findNote=id=>notes.find(n=>n.id===id)||placeIds.flatMap(sampleNotes).find(n=>n.id===id);
function saveNotes(){
  try{localStorage.setItem('hamlet-quiet-notes',JSON.stringify(notes));}catch{toast(t('storageError'));}
}
const saveSoon=()=>{clearTimeout(saveTimer);saveTimer=setTimeout(saveNotes,300);};
const locale=()=>lang==='zh'?'zh-CN':'en-GB';
const timeOf=d=>d.toLocaleTimeString(locale(),{hour:'2-digit',minute:'2-digit'});
function shortWhen(iso){
  const d=new Date(iso),days=(new Date().setHours(0,0,0,0)-new Date(iso).setHours(0,0,0,0))/864e5;
  if(days<1)return timeOf(d);
  if(days<7)return d.toLocaleDateString(locale(),{weekday:'long'});
  return d.toLocaleDateString(locale(),{month:'short',day:'numeric'});
}
function longWhen(iso){
  const d=new Date(iso);
  return lang==='zh'?`${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 ${timeOf(d)}`:`${d.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})} at ${timeOf(d)}`;
}
function rowText(n){
  const lines=n.body.split('\n').map(s=>s.trim()).filter(Boolean),title=n.title.trim()||lines.shift()||t('untitled')[n.kind];
  return`<strong>${esc(title)}</strong><small><b>${esc(n.sample?t('sample'):shortWhen(n.updated))}</b>${esc(lines[0]||t('noText'))}</small>`;
}
const noteRow=n=>`<li><button class="row note-row${n===current?' active':''}${n.sample?' sample':''}" data-note="${n.id}"><span class="row-text">${rowText(n)}</span></button></li>`;
function noteList(kind){
  const mine=notes.filter(n=>n.kind===kind).sort((a,b)=>b.updated.localeCompare(a.updated));
  if(!mine.length)return sampleNotes(kind).length?`<ul class="group notes">${sampleNotes(kind).map(noteRow).join('')}</ul>`:'';
  const day=d=>(new Date().setHours(0,0,0,0)-new Date(d).setHours(0,0,0,0))/864e5;
  const groups=[[t('today'),mine.filter(n=>day(n.updated)<1)],[t('week'),mine.filter(n=>day(n.updated)>=1&&day(n.updated)<7)],[t('earlier'),mine.filter(n=>day(n.updated)>=7)]];
  return groups.filter(g=>g[1].length).map(([title,list])=>`<h3 class="group-title">${title}</h3><ul class="group notes">${list.map(noteRow).join('')}</ul>`).join('');
}

// ── The editor: the right-hand page ──
function fillEditor(arriving=false){
  $('editor-where').textContent=buildings[current.kind][lang][1];
  const card=current.kind==='post';
  editor.classList.toggle('as-postcard',card);
  $('editor-done').setAttribute('aria-label',t(card?'send':'close'));
  if(card){fillDesk(arriving&&world.getState().motion);return;}
  if(desk.innerHTML){desk.innerHTML='';world.setThumbs([],'desk');}
  $('editor-date').textContent=longWhen(current.updated);
  $('editor-title').value=current.title;$('editor-title').placeholder=t('titlePh');
  $('editor-body').value=current.body;$('editor-body').placeholder=t('bodyPh')[current.kind];
}
function openNote(note,focus='body'){
  if(current&&current!==note)releaseNote();
  // A letter is all message: an older one with a title keeps it as its first line.
  if(note.kind==='post'&&note.title){note.body=note.title+(note.body?'\n'+note.body:'');note.title='';saveSoon();}
  current=note;fillEditor(focus==='title');
  clearTimeout(editorTimer);
  if(editor.hidden){editor.hidden=false;editor.getBoundingClientRect();}
  editor.classList.add('open');app.classList.add('editing');
  sheetBody.querySelectorAll('[data-note]').forEach(r=>r.classList.toggle('active',r.dataset.note===note.id));
  const letter=note.kind==='post',field=letter?$('pc-text'):$(focus==='title'?'editor-title':'editor-body');
  const place=()=>{
    if(current!==note)return;
    field.focus({preventScroll:true});
    if(letter||focus==='body')field.setSelectionRange(field.value.length,field.value.length);
  };
  // A new postcard arrives and turns over first; the pen waits for it.
  if(letter&&focus==='title'&&world.getState().motion)setTimeout(place,1000);else place();
}
// Leaving a note: an untouched empty one is dropped, like Notes does.
function releaseNote(){
  if(current&&!current.sample&&!current.title.trim()&&!current.body.trim()){notes=notes.filter(n=>n!==current);saveNotes();}
  current=null;
}
function closeNote(){
  if(!current)return;
  const focusInside=editor.contains(document.activeElement);
  releaseNote();saveNotes();
  editor.classList.remove('open');app.classList.remove('editing');
  editorTimer=setTimeout(()=>{if(!current){editor.hidden=true;editor.classList.remove('as-postcard');desk.innerHTML='';world.setThumbs([],'desk');}},360);
  if(isPlace(sheetMode))renderSheet(sheetMode);
  if(focusInside)sheet.focus({preventScroll:true});
}
function newNote(kind){
  const n={id:newId(),kind,title:'',body:'',date:nowIso(),updated:nowIso()};
  notes.unshift(n);
  if(sheetMode!==kind)openSheet(kind);else renderSheet(kind);
  openNote(n,'title');
  sheetBody.querySelector(`[data-note="${n.id}"]`)?.classList.add('active');
}
function editNote(change){
  if(current.sample){
    delete current.sample;current.id=newId();current.date=nowIso();notes.unshift(current);samples=null;
    Object.assign(current,change,{updated:nowIso()});
    renderSheet(current.kind);
  }else{
    Object.assign(current,change,{updated:nowIso()});
    const row=sheetBody.querySelector(`[data-note="${current.id}"] .row-text`);
    if(row)row.innerHTML=rowText(current);
  }
  $('editor-date').textContent=longWhen(current.updated);
  saveSoon();
}
$('editor-title').addEventListener('input',e=>editNote({title:e.target.value}));
$('editor-body').addEventListener('input',e=>editNote({body:e.target.value}));
$('editor-title').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();const b=$('editor-body');b.focus();b.setSelectionRange(0,0);}});
// ✓ on a written postcard posts it, in about two seconds: the card shrinks to a third, a mailbox on its wooden
// post slides in from the right with a wobble and settles, drops its door, takes the card, shuts with the flag
// up, throws the confetti, then shrinks away and pops like a bubble.
const mailboxArt=`<div class="mb-inner"><svg class="mb-art" viewBox="0 0 200 260" aria-hidden="true">
  <ellipse cx="113" cy="249" rx="42" ry="7" fill="rgba(20,30,24,.22)"/>
  <path d="M95 249q3-11 6 0M100 249q4-14 7 0M121 249q3-10 6 0M126 249q4-13 7 0" stroke="#6f9a6a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <rect x="104" y="112" width="18" height="137" rx="3" fill="#b78b5e"/>
  <path d="M109 132v38M116 152v48M110 208v28" stroke="#9a7148" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <rect x="74" y="113" width="80" height="11" rx="3" fill="#a87d52"/>
  <path d="M49 46H160a18 18 0 0 1 18 18v52a4 4 0 0 1-4 4H49Z" fill="#8aa58c"/>
  <path d="M49 46H160a18 18 0 0 1 17.2 13H49Z" fill="#a6bfa3"/>
  <path d="M49 106H178" stroke="#78937a" stroke-width="1.5" fill="none"/>
  <path class="mb-mouth" d="M28 120V67a21 21 0 0 1 42 0v53Z" fill="#2f3b35"/>
</svg><div class="mb-flag"><svg viewBox="0 0 40 40" aria-hidden="true"><rect x="17" y="2" width="5" height="36" rx="2" fill="#5f6b65"/><path d="M22 3h15v12H22Z" fill="#e2574c"/></svg></div>
<div class="mb-door"><svg viewBox="0 0 42 74" aria-hidden="true"><path d="M1 73V22a20 20 0 0 1 40 0v51Z" fill="#9db79c" stroke="#6f8c74" stroke-width="2"/><rect x="15" y="17" width="12" height="5" rx="2.5" fill="#6f8c74"/></svg></div></div>`;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function postLetter(card){
  const note=current,d=desk.getBoundingClientRect(),c=card.getBoundingClientRect(),s=isPhone()?.72:1;
  card.classList.remove('arriving');card.classList.add('sending');
  // Where the shrunk card will sit, and the mailbox beside it with its mouth level with the card.
  const cx=c.left+c.width*.44,cy=c.top+c.height*.48,box=document.createElement('div');
  box.className='mailbox';box.innerHTML=mailboxArt;box.style.scale=s;
  box.style.left=(cx+c.width*.165+34*s-28*s-d.left)+'px';box.style.top=(cy-83*s-d.top)+'px';
  desk.append(box);
  const inner=box.querySelector('.mb-inner'),door=box.querySelector('.mb-door'),flag=box.querySelector('.mb-flag');
  const base='translate(-6%,-2%) scale(.33) rotate(-4deg)';
  card.animate([{transform:'none'},{transform:base}],{duration:360,easing:'cubic-bezier(.2,.9,.25,1)',fill:'forwards'});
  await wait(80);
  await inner.animate([{transform:`translateX(${(d.right-c.right+260)/s}px) rotate(-12deg)`},{transform:'translateX(-12px) rotate(9deg)',offset:.6},{transform:'translateX(4px) rotate(-5deg)',offset:.76},{transform:'translateX(-1px) rotate(2deg)',offset:.9},{transform:'none'}],{duration:600,easing:'cubic-bezier(.25,.8,.3,1)',fill:'both'}).finished;
  await door.animate([{transform:'rotateX(0)'},{transform:'rotateX(-112deg)'}],{duration:180,easing:'cubic-bezier(.3,1.4,.6,1)',fill:'forwards'}).finished;
  const now=card.getBoundingClientRect(),m=box.querySelector('.mb-mouth').getBoundingClientRect();
  const dx=m.left+m.width/2-(now.left+now.width/2),dy=m.top+m.height*.62-(now.top+now.height/2);
  await card.animate([{transform:base},{transform:`translate(${dx*.5}px,${dy-70}px) ${base}`,offset:.45},{transform:`translate(${dx}px,${dy}px) translate(-6%,-2%) scale(.07) rotate(10deg)`,opacity:1,offset:.9},{transform:`translate(${dx}px,${dy}px) translate(-6%,-2%) scale(.04) rotate(10deg)`,opacity:0}],{duration:360,easing:'cubic-bezier(.45,0,.55,1)',fill:'forwards'}).finished;
  door.animate([{transform:'rotateX(-112deg)'},{transform:'rotateX(10deg)',offset:.72},{transform:'rotateX(0)'}],{duration:220,easing:'ease-out',fill:'forwards'});
  flag.animate([{rotate:'90deg'},{rotate:'-14deg',offset:.7},{rotate:'0deg'}],{duration:380,easing:'cubic-bezier(.3,1.5,.5,1)',fill:'forwards'});
  await wait(150);
  celebrateAt(box.querySelector('.mb-mouth'));
  await wait(200);
  // Smaller and smaller until it's gone, then a bubble pops where it stood.
  const r=box.querySelector('.mb-art').getBoundingClientRect(),pop=document.createElement('span');
  pop.className='mb-pop';pop.innerHTML='<i></i>'.repeat(8);
  pop.style.left=(r.left+r.width*.5-d.left)+'px';pop.style.top=(r.top+r.height*.32-d.top)+'px';
  inner.style.transformOrigin='103px 83px';
  await inner.animate([{transform:'none'},{transform:'scale(1.08)',offset:.3},{transform:'scale(0)'}],{duration:240,easing:'cubic-bezier(.5,0,.75,0)',fill:'forwards'}).finished;
  desk.append(pop);
  await wait(230);
  if(current===note){closeNote();toast(t('sent'));}
}
$('editor-done').onclick=()=>{
  const card=desk.querySelector('.pc-card');
  if(card?.classList.contains('sending'))return;
  if(current?.kind==='post'&&current.body.trim()&&card&&world.getState().motion)postLetter(card);
  else closeNote();
};
$('editor-back').onclick=()=>closeNote();
$('editor-delete').onclick=()=>{
  if(!current)return;
  if(!current.sample){notes=notes.filter(n=>n!==current);saveNotes();toast(t('deleted'));}
  current.title=current.body='';closeNote();
};

// ── The postcard: picture on the front, message and stamp on the back ──
const stampArt=`<svg viewBox="0 0 40 46" aria-hidden="true"><rect width="40" height="46" fill="#a3c693"/><circle cx="20" cy="23" r="13.2" fill="#efcf9b" stroke="#e2b778" stroke-width="2.6" stroke-dasharray="2.1 1.5"/><circle cx="20" cy="23" r="9.6" fill="#f6e0b6"/><path d="M20 29.6c-4.6-3-7.1-5.6-7.1-8.4a3.6 3.6 0 0 1 7.1-1.1 3.6 3.6 0 0 1 7.1 1.1c0 2.8-2.5 5.4-7.1 8.4Z" fill="#d8434d"/><path d="M15.5 20.4a1.9 1.9 0 0 1 2.5-1.1" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".85"/></svg>`;
const postmark=d=>`<svg class="postmark" viewBox="0 0 132 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="32" cy="32" r="26"/><circle cx="32" cy="32" r="20"/><path d="M64 20q8-5 16 0t16 0 16 0 16 0M64 32q8-5 16 0t16 0 16 0 16 0M64 44q8-5 16 0t16 0 16 0 16 0"/></g><text x="32" y="30.5" text-anchor="middle" font-size="7" letter-spacing="1.2" fill="currentColor">HAMLET</text><text x="32" y="39.5" text-anchor="middle" font-size="4.9" letter-spacing=".2" fill="currentColor">${d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase()}</text></svg>`;
function postcard(){
  return`<div class="postcard" role="button" tabindex="0" aria-pressed="false">
    <div class="postcard-inner">
      <div class="postcard-face postcard-front"><div class="postcard-photo">
        <span class="postcard-stars"></span>
        <canvas data-model="post" data-fill="1" data-outside data-still aria-hidden="true"></canvas>
        <p class="postcard-greet"><small>${t('greetSmall')}</small><em>Hamlet</em>${t('greet')?`<span>${t('greet')}</span>`:''}</p>
      </div></div>
      <div class="postcard-face postcard-back">
        <div class="postcard-message"><p>${t('mailBody').replace(/<br><br>/g,' ')}</p><p class="postcard-sign">— ${t('mailSign')}</p></div>
        <div class="postcard-side">
          <div class="stamp"><div class="stamp-frame">${stampArt}</div></div>
          ${postmark(new Date())}
          <div class="postcard-lines"><span>${t('postTo')}</span><span></span><span></span></div>
        </div>
      </div>
    </div>
  </div>
  <p class="flip-hint">${t('flipHint')}</p>`;
}
// ── Letters to tomorrow are written on a postcard ──
// "写一张给明天" brings one up on the right: it arrives picture side up, turns over, and you write on the back,
// on ruled lines, in a handwriting face. ✓ posts it. An empty one is dropped, like any note.
Object.assign(texts.zh,{pcTo:'致 明天的我',pcAddr:'小镇 · 你的小屋',pcFrom:'— 今天的我',pcLabel:'写在明信片背面',send:'寄出',sent:'寄出去了，明天见'});
Object.assign(texts.en,{pcTo:'To: tomorrow’s me',pcAddr:'Your little home, Hamlet',pcFrom:'— me, today',pcLabel:'The back of the postcard',send:'Post it',sent:'Posted. See you tomorrow.'});
const desk=$('pc-desk');
function fillDesk(arriving){
  desk.innerHTML=`<div class="pc-card${arriving?' arriving':' turned'}"><div class="pc-inner">
    <div class="pc-face pc-front"><div class="postcard-photo"><span class="postcard-stars"></span><canvas aria-hidden="true"></canvas><p class="postcard-greet"><small>${t('greetSmall')}</small><em>Hamlet</em>${t('greet')?`<span>${t('greet')}</span>`:''}</p></div></div>
    <div class="pc-face pc-back">
      <div class="pc-top"><div class="pc-address"><span>${t('pcTo')}</span><span>${t('pcAddr')}</span><span></span></div><div class="stamp"><div class="stamp-frame">${stampArt}</div></div>${postmark(new Date(current.date))}</div>
      <textarea id="pc-text" class="pc-text" aria-label="${t('pcLabel')}" placeholder="${t('bodyPh').post}">${esc(current.body)}</textarea>
      <p class="pc-sign">${t('pcFrom')}</p>
    </div></div></div>`;
  world.setThumbs([{canvas:desk.querySelector('canvas'),id:'post',fill:1,interior:false,still:true}],'desk');
  if(arriving)setTimeout(()=>desk.querySelector('.pc-card')?.classList.add('turned'),560);
}
desk.addEventListener('input',e=>{if(e.target.id==='pc-text')editNote({body:e.target.value});});
function flipPostcard(card){
  const flipped=card.classList.toggle('flipped');
  card.setAttribute('aria-pressed',String(flipped));
  card.nextElementSibling.textContent=t(flipped?'flipBack':'flipHint');
}

// ── The sheet ──
const interior=id=>`<span class="hero"><canvas data-model="${id}" data-fill=".74" aria-hidden="true"></canvas></span>`;
const newButton=kind=>`<button class="new-note" data-new="${kind}">${icons.compose}<span>${t('newNote')[kind]}</span></button>`;
const views={
  home:()=>`${interior('home')}<p class="sheet-lead">${buildings.home[lang][2]}</p>${newButton('home')}${noteList('home')}`,
  library:()=>`${interior('library')}<p class="sheet-lead">${buildings.library[lang][2]}</p>${newButton('library')}${noteList('library')}`,
  post:()=>`${interior('post')}${postcard()}${newButton('post')}${noteList('post')}`,
  about:()=>`<p class="sheet-lead">${t('aboutLead')}</p><p>${t('aboutBody')}</p>
    <h3 class="group-title">${t('linksTitle')}</h3>
    <ul class="group">
      <li><a class="row" href="https://dpnull.github.io/hamlet-render-studies/mood-board/" target="_blank" rel="noopener">${tile(icons.library)}<span class="row-text"><strong>${t('aboutRefs')}</strong><small>Townscaper · Garden Galaxy · Minami Lane · Tiny Glade</small></span>${icons.arrow}</a></li>
      <li><a class="row" href="https://developer.apple.com/design/human-interface-guidelines/materials" target="_blank" rel="noopener">${tile(icons.home)}<span class="row-text"><strong>${t('apple')}</strong><small>Liquid Glass · Materials</small></span>${icons.arrow}</a></li>
      <li><button class="row" data-action="export">${tile(icons.camera)}<span class="row-text"><strong>${t('exportImage')}</strong><small>hamlet-quiet-town.png</small></span>${icons.chevron}</button></li>
    </ul>
    <p class="sample-note">${t('aboutBoundary')}</p>
    <p class="sample-note">© ${lang==='zh'?'各参考作品归原作者所有。此处的几何与场景为原创设计提案。':'Reference works belong to their creators. This geometry and scene are an original design proposal.'}</p>`
};

function renderSheet(mode){
  closePop();
  sheet.dataset.mode=mode;
  sheet.toggleAttribute('data-place',isPlace(mode));
  const scroll=sheetBody.scrollTop,same=sheetBody.dataset.mode===mode;
  sheetBody.innerHTML=views[mode]();sheetBody.dataset.mode=mode;
  sheetBody.scrollTop=same?scroll:0;
  world.setThumbs([...sheetBody.querySelectorAll('canvas[data-model]')].map(c=>({canvas:c,id:c.dataset.model,fill:Number(c.dataset.fill),interior:!c.hasAttribute('data-outside'),still:c.hasAttribute('data-still')})));
}

function openSheet(mode){
  closeAddMenu();
  const switching=Boolean(sheetMode),changed=mode!==sheetMode;
  if(!switching)sheetOpener=document.activeElement;
  if(changed){closeNote();resetTaskUI();}
  sheetMode=mode;
  if(changed||!switching){
    focusBuilding(isPlace(mode)?mode:null);
    renderSheet(mode);
    if(mode==='post')app.classList.add('mail-read');
    if(switching&&world.getState().motion)sheetBody.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:300,easing:'cubic-bezier(.2,.8,.2,1)'});
  }
  clearTimeout(sheetTimer);
  if(sheet.hidden){sheet.hidden=false;sheet.getBoundingClientRect();}
  sheet.classList.add('open');app.classList.add('sheet-open');
  syncChrome();updateIdentity();
}
function closeSheet(){
  if(!sheetMode)return;
  closeNote();resetTaskUI();
  const focusInside=sheet.contains(document.activeElement);
  sheetMode=null;
  focusBuilding(null);
  sheet.classList.remove('open');app.classList.remove('sheet-open');
  clearTimeout(sheetTimer);sheetTimer=setTimeout(()=>{if(!sheetMode){sheet.hidden=true;world.setThumbs([]);}},420);
  syncChrome();updateIdentity();
  if(focusInside)(sheetOpener?.isConnected?sheetOpener:$('home-tab')).focus({preventScroll:true});
}
const toggleSheet=mode=>sheetMode===mode?closeSheet():openSheet(mode);

sheetBody.addEventListener('click',e=>{
  if(sheetMode==='workshop'&&taskClick(e))return;
  const note=e.target.closest('[data-note]'),add=e.target.closest('[data-new]'),card=e.target.closest('.postcard');
  if(note)openNote(findNote(note.dataset.note));
  if(add)newNote(add.dataset.new);
  if(card)flipPostcard(card);
  if(e.target.closest('[data-action="export"]'))world.capture();
});
sheetBody.addEventListener('keydown',e=>{
  if(sheetMode==='workshop'&&taskKeys(e))return;
  const card=e.target.closest('.postcard');
  if(card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();flipPostcard(card);}
});

// ── The + menu: a small glass list above the button, one "+ name" per building ──
function openAddMenu(){
  clearTimeout(menuTimer);
  addMenu.hidden=false;addMenu.getBoundingClientRect();
  addMenu.classList.add('open');$('capture').classList.add('active');$('capture').setAttribute('aria-expanded','true');
  if(usingKeys)addMenu.querySelector('button').focus({preventScroll:true});
}
function closeAddMenu(){
  if(!addMenu.classList.contains('open'))return;
  addMenu.classList.remove('open');$('capture').classList.remove('active');$('capture').setAttribute('aria-expanded','false');
  menuTimer=setTimeout(()=>{addMenu.hidden=true;},260);
}
addMenu.addEventListener('click',e=>{
  const item=e.target.closest('[data-add]');
  if(item){closeAddMenu();create(item.dataset.add);}
});
addMenu.addEventListener('keydown',e=>{
  const items=[...addMenu.querySelectorAll('button')],i=items.indexOf(document.activeElement);
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();items[(i+(e.key==='ArrowDown'?1:items.length-1))%items.length].focus();}
});
document.addEventListener('pointerdown',e=>{if(!e.target.closest('#add-menu,#capture'))closeAddMenu();});

// Nav selection, the glass lens, the info state and the camera inset all follow sheetMode.
let lensTab=null;
function syncChrome(){
  const active=isPlace(sheetMode)?sheetMode:null;
  nav.querySelectorAll('button').forEach(b=>{
    b.classList.toggle('selected',b.dataset.sheet===active);
    b.setAttribute('aria-expanded',String(b.dataset.sheet===active));
  });
  $('about').classList.toggle('active',sheetMode==='about');
  $('about').setAttribute('aria-expanded',String(sheetMode==='about'));
  placeLens(active);
  updateInset();
}
function placeLens(active){
  const b=active&&nav.querySelector(`[data-sheet="${active}"]`);
  lens.classList.toggle('open',Boolean(b));
  if(!b){lens.style.opacity='0';lensTab=null;return;}
  if(lensTab&&lensTab!==active&&world.getState().motion){
    lens.classList.add('moving');setTimeout(()=>lens.classList.remove('moving'),260);
  }
  if(!lensTab)lens.style.transition='none';
  lens.style.width=b.offsetWidth+'px';lens.style.translate=b.offsetLeft+'px 0';
  if(!lensTab){lens.getBoundingClientRect();lens.style.transition='';}
  lensTab=active;lens.style.opacity='1';
}
// Centre the town, or the focused building, in the part of the screen the sheet leaves free.
// On a phone a building page is a half-height sheet, so the building rises into the top half.
function updateInset(){
  if(!sheetMode){world.setInset(0,0,1);return;}
  const w=app.clientWidth,h=app.clientHeight;
  if(isPhone()){world.setInset(0,isPlace(sheetMode)?(h-sheet.offsetTop)/2:0,1);return;}
  const left=sheet.offsetLeft+sheet.offsetWidth;
  world.setInset(left/2,0,Math.max(.8,Math.sqrt((w-left)/w)));
}
new ResizeObserver(syncChrome).observe(app);


// ── The workshop: tasks, in the manner of Things ──
// A row is a checkbox, a star when it's for today, ! to !!! for priority, a little battery for effort, and a date.
// The date and priority buttons only show on hover. The + button opens into a card (name, effort, date):
// Tab moves to the next field and Enter adds the task. Tapping a task opens the same card to edit it.
Object.assign(texts.zh,{
  newTask:'新建待办',taskPh:'写下要做的事……',
  effortPh:'需要多少力气',efforts:['轻松','适中','费劲'],
  duePh:'哪天做',dueQuick:['今天','明天','本周末','下周'],pickDate:'选日期…',clearDate:'清除日期',tomorrow:'明天',yesterday:'昨天',
  prioPh:'有多要紧',prios:['不要紧','有点要紧','挺要紧','很要紧'],effortNone:'说不好',setEffort:'估一下力气',
  taskHint:'<kbd>Tab</kbd> 切换到下一项<i></i><kbd>Enter</kbd> 确认',
  addDate:'添加日期',setPrio:'设置优先级',deleteTask:'删除待办',
  showDone:n=>`显示 ${n} 个已完成`,hideDone:'收起已完成',clearDone:'清除已完成',
  allDone:'都做完了。今天就到这里吧。',noTasks:'这里还空着。想到要做的事，就写下来。',
  calPrev:'上个月',calNext:'下个月',weekdays:['一','二','三','四','五','六','日'],monthTitle:(y,m)=>`${y}年${m}月`,
  taskSamples:['把借来的伞还给邻居','给窗台的薄荷换个大一点的盆','去花市买一包花种','修好吱呀响的院门','给奶奶打个电话','把工作台擦干净']
});
Object.assign(texts.en,{
  newTask:'New task',taskPh:'Type a name…',
  effortPh:'Add effort',efforts:['Light','Medium','Heavy'],
  duePh:'Add date',dueQuick:['Today','Tomorrow','This weekend','Next week'],pickDate:'Pick a date…',clearDate:'Clear date',tomorrow:'Tomorrow',yesterday:'Yesterday',
  prioPh:'Add priority',prios:['None','Low','Medium','High'],effortNone:'Not sure',setEffort:'Set effort',
  taskHint:'<kbd>Tab</kbd> next field<i></i><kbd>Enter</kbd> add the task',
  addDate:'Add a date',setPrio:'Set priority',deleteTask:'Delete task',
  showDone:n=>`Show ${n} completed`,hideDone:'Hide completed',clearDone:'Clear completed',
  allDone:'All done. That’s plenty for today.',noTasks:'Nothing here yet. Write down something you’d like to do.',
  calPrev:'Previous month',calNext:'Next month',weekdays:['M','T','W','T','F','S','S'],monthTitle:(y,m)=>new Date(y,m-1,1).toLocaleDateString('en-GB',{month:'long',year:'numeric'}),
  taskSamples:['Return the neighbour’s umbrella','Repot the mint into a bigger pot','Get flower seeds from the market','Fix the squeaky gate','Call Grandma','Wipe down the workbench']
});
Object.assign(buildings,{workshop:{
  zh:['一件一件，慢慢来','街角工坊','墙上的软木板钉着要做的事。做完一件，就打一个勾。','工作台、软木板，和一盏小台灯','写一件要做的事'],
  en:['ONE THING AT A TIME','The corner workshop','The cork board on the wall holds what’s next. Finish one, tick it off.','A workbench, a cork board, one little lamp.','Add a task']}});
Object.assign(icons,{
  workshop:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4.5"/><path d="m8.6 12.3 2.3 2.3 4.6-4.9"/></svg>',
  calendar:'<svg viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14.5" rx="3"/><path d="M4 10.2h16M8.5 3.6v3.6M15.5 3.6v3.6"/></svg>',
  bang:'<svg viewBox="0 0 24 24"><path d="M12 5.2v9M12 18.6v.1"/></svg>',
  star:'<svg class="star" viewBox="0 0 24 24"><path d="m12 3.8 2.45 5.06 5.55.78-4.03 3.9.97 5.52L12 16.43l-4.94 2.63.97-5.52L4 9.64l5.55-.78Z"/></svg>',
  box:'<svg viewBox="0 0 24 24"><rect x="4.5" y="4.5" width="15" height="15" rx="4"/></svg>',
  tick:'<svg viewBox="0 0 24 24"><path d="m6.6 12.4 3.5 3.5 7.3-7.8"/></svg>',
  trash:'<svg viewBox="0 0 24 24"><path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12M10.5 11v5M13.5 11v5"/></svg>',
  bolt:'<svg viewBox="0 0 24 24"><rect x="3" y="7.5" width="16" height="9" rx="2.4"/><path d="M21 10.6v2.8M11.8 8.9 9.6 12.3h3.2l-2.2 3.4"/></svg>',
  cross:'<svg viewBox="0 0 24 24"><path d="M8 8l8 8M16 8l-8 8"/></svg>',
  back:'<svg viewBox="0 0 24 24"><path d="m14 7-5 5 5 5"/></svg>',
  forward:'<svg viewBox="0 0 24 24"><path d="m10 7 5 5-5 5"/></svg>'
});
// Effort reads as a battery: one, two or three cells of energy.
const battery=n=>`<svg class="battery" viewBox="0 0 24 24"><rect x="3" y="7.5" width="16" height="9" rx="2.4"/><path d="M21 10.6v2.8"/>${[0,1,2].map(i=>`<rect class="cell${i<n?' on':''}" x="${5.3+i*4.6}" y="9.8" width="3.4" height="4.4" rx=".9"/>`).join('')}</svg>`;

// Dates are local day keys, 2026-10-10.
const dayKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const fromKey=k=>{const[y,m,d]=k.split('-').map(Number);return new Date(y,m-1,d);};
const addDays=(d,n)=>{const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()+n);return x;};
const todayKey=()=>dayKey(new Date());
const daysFrom=k=>Math.round((fromKey(k)-addDays(new Date(),0))/864e5);
// The quick dates: today, tomorrow, this weekend (Saturday, or today at the weekend), next Monday.
function quickDue(i){
  const d=addDays(new Date(),0),wd=(d.getDay()+6)%7;
  return dayKey(i===0?d:i===1?addDays(d,1):i===2?addDays(d,wd>=5?0:5-wd):addDays(d,7-wd));
}
function dueText(k){
  const n=daysFrom(k),d=fromKey(k);
  if(n===0)return t('today');
  if(n===1)return t('tomorrow');
  if(n===-1)return t('yesterday');
  if(n>1&&n<7)return d.toLocaleDateString(locale(),{weekday:'short'});
  return lang==='zh'?`${d.getMonth()+1}月${d.getDate()}日`:d.toLocaleDateString('en-GB',{day:'numeric',month:'short'});
}
const longDay=k=>fromKey(k).toLocaleDateString(locale(),{weekday:'long',month:'long',day:'numeric'});

// ── Task records ──
// {id, title, effort 0–3, due day key or null, priority 0–3, done ISO or null, created ISO}. A first visit gets a
// few example tasks so the list has something to show; their words follow the language until they're edited.
let tasks=[],taskDraft=null,editingTask=null,selectedTask=null,picking=null,showDone=false,pop=null,calMonth=null,taskSaveTimer;
const lingering=new Set();
function exampleTasks(){
  const at=n=>dayKey(addDays(new Date(),n)),now=Date.now();
  return[[0,0,1,2],[1,0,2,0],[2,2,2,0],[3,null,3,1],[4,null,1,0],[5,-1,1,0,true]].map(([sample,due,effort,priority,done],i)=>({id:'example-'+i,sample,title:'',effort,due:due===null?null:at(due),priority,done:done?new Date(now-36e5).toISOString():null,created:new Date(now+i).toISOString()}));
}
try{
  const raw=localStorage.getItem('hamlet-quiet-tasks');
  if(raw===null){tasks=exampleTasks();localStorage.setItem('hamlet-quiet-tasks',JSON.stringify(tasks));}
  else{const v=JSON.parse(raw);if(Array.isArray(v))tasks=v.filter(x=>x&&typeof x.id==='string'&&typeof x.created==='string');}
}catch{if(!tasks.length)tasks=exampleTasks();}
function saveTasks(){
  clearTimeout(taskSaveTimer);
  try{localStorage.setItem('hamlet-quiet-tasks',JSON.stringify(tasks));}catch{toast(t('storageError'));}
}
const saveTasksSoon=()=>{clearTimeout(taskSaveTimer);taskSaveTimer=setTimeout(saveTasks,300);};
const titleOf=x=>x.sample!=null&&!x.title?t('taskSamples')[x.sample]||'':x.title;
const findTask=id=>tasks.find(x=>x.id===id);
const forToday=x=>!x.done&&x.due&&daysFrom(x.due)<=0;
// Today and overdue first (most pressing first), then dated ones by date, then the rest.
function byWhen(a,b){
  const g=x=>!x.due?2:daysFrom(x.due)<=0?0:1,ga=g(a),gb=g(b);
  return ga-gb||(ga===1?a.due.localeCompare(b.due):0)||(b.priority||0)-(a.priority||0)||(ga===0?a.due.localeCompare(b.due):0)||a.created.localeCompare(b.created);
}

// ── Rows ──
// Date, effort and priority each keep a fixed column on the right, so they line up down the list. The date
// column is the wide one, so it goes first: its spare room joins the title's instead of opening a gap. An empty
// column holds its place and offers its button on hover.
function taskRow(x){
  if(x.id===editingTask)return`<li class="task editing" data-task="${x.id}">${taskCard(x)}</li>`;
  const title=titleOf(x),checked=Boolean(x.done),n=x.due?daysFrom(x.due):null,label=x.due&&n!==0&&!checked?dueText(x.due):'';
  const act=(pick,label,icon)=>checked?'':`<button class="task-act" data-pick="${pick}" aria-label="${label}">${icon}</button>`;
  return`<li class="task${checked?' checked':''}${x.id===selectedTask?' selected':''}" data-task="${x.id}">`+
    `<button class="check" role="checkbox" aria-checked="${checked}" aria-label="${esc(title)}">${icons.tick}</button>`+
    (n!==null&&n<=0&&!checked?`<span class="task-star" title="${t('today')}">${icons.star}</span>`:'')+
    `<button class="task-title" data-open-task>${esc(title)}</button>`+
    `<span class="task-end">`+
      `<span class="col col-due">${label?`<button class="due${n<0?' late':''}" data-pick="due" aria-label="${esc(longDay(x.due))}">${label}</button>`:act('due',t('addDate'),icons.calendar)}</span>`+
      `<span class="col col-effort">${x.effort?`<button class="effort" data-pick="effort" aria-label="${esc(t('effortPh')+' · '+t('efforts')[x.effort-1])}">${battery(x.effort)}</button>`:act('effort',t('setEffort'),icons.bolt)}</span>`+
      `<span class="col col-prio">${x.priority?`<button class="prio" data-pick="prio" aria-label="${esc(t('prioPh')+' · '+t('prios')[x.priority])}">${'!'.repeat(x.priority)}</button>`:act('prio',t('setPrio'),icons.bang)}</span>`+
    `</span></li>`;
}
function taskListsHtml(){
  const open=tasks.filter(x=>!x.done||lingering.has(x.id)).sort(byWhen),done=tasks.filter(x=>x.done&&!lingering.has(x.id)).sort((a,b)=>b.done.localeCompare(a.done));
  return(open.length?`<ul class="tasks">${open.map(taskRow).join('')}</ul>`:`<p class="tasks-empty">${t(done.length?'allDone':'noTasks')}</p>`)+
    (done.length?`<div class="done-bar"><button class="done-toggle" data-done-toggle aria-expanded="${showDone}">${showDone?t('hideDone'):t('showDone')(done.length)}</button>${showDone?`<button class="done-clear" data-done-clear>${t('clearDone')}</button>`:''}</div>`+
      (showDone?`<ul class="tasks done">${done.map(taskRow).join('')}</ul>`:''):'');
}
const taskNewHtml=()=>taskDraft?taskCard(null):`<button class="new-note" data-task-new>${icons.plus}<span>${t('newTask')}</span></button>`;
function renderTaskList(){const el=$('task-lists');if(el)el.innerHTML=taskListsHtml();}

// ── The card: new (from the + button) or an open task ──
// Effort and date (and, when editing, priority) are quiet rows until picked; picking shows them as chips.
function taskCard(x){
  const isNew=!x,v=isNew?taskDraft:x,title=isNew?v.title:titleOf(v);
  const qi=v.due?[0,1,2,3].find(i=>quickDue(i)===v.due):undefined,custom=Boolean(v.due)&&qi===undefined;
  const chip=(name,val,label,on,extra='')=>`<button class="tc-chip${on?' on':''}" role="radio" aria-checked="${on}" data-chip="${name}" data-val="${val}" tabindex="-1"${extra}>${label}</button>`;
  const field=(name,icon,ph,value,chips)=>`<div class="tc-field${value?' set':''}${picking===name?' picking':''}" data-field="${name}">`+
    `<button class="tc-row" data-row="${name}" tabindex="-1">${icon}<span>${value||ph}</span>${value?`<i class="tc-clear" data-clear="${name}" aria-hidden="true">${icons.cross}</i>`:''}</button>`+
    `<div class="tc-chips" role="radiogroup" aria-label="${ph}">${chips}</div></div>`;
  return`<div class="task-card${isNew?' new':''}" data-card="${isNew?'new':x.id}"><div class="tc-head">`+
    (isNew?`<span class="tc-box" aria-hidden="true">${icons.box}</span>`:`<button class="check" role="checkbox" aria-checked="${Boolean(x.done)}" aria-label="${esc(title)}">${icons.tick}</button>`)+
    `<input class="tc-name" data-field="name" value="${esc(title)}" placeholder="${t('taskPh')}" aria-label="${t('taskPh')}" autocomplete="off" enterkeyhint="done">`+
    (isNew?'':`<button class="tc-del" data-del aria-label="${t('deleteTask')}">${icons.trash}</button>`)+`</div>`+
    field('effort',v.effort?battery(v.effort):icons.bolt,t('effortPh'),v.effort?t('efforts')[v.effort-1]:'',[1,2,3].map(n=>chip('effort',n,battery(n)+t('efforts')[n-1],v.effort===n)).join(''))+
    field('due',icons.calendar,t('duePh'),v.due?esc(dueText(v.due)):'',t('dueQuick').map((l,i)=>chip('due',i,(i===0?icons.star:'')+l,qi===i)).join('')+chip('due','pick',custom?esc(dueText(v.due)):t('pickDate'),custom,' aria-haspopup="dialog"'))+
    (field('prio',v.priority?`<b class="prio-mark">${'!'.repeat(v.priority)}</b>`:icons.bang,t('prioPh'),v.priority?t('prios')[v.priority]:'',[1,2,3].map(n=>chip('prio',n,`<b>${'!'.repeat(n)}</b>${t('prios')[n]}`,v.priority===n)).join('')))+
    (isNew?`<p class="tc-hint">${t('taskHint')}</p>`:'')+`</div>`;
}
const PROP={effort:'effort',due:'due',prio:'priority'};
const cardTarget=()=>sheetBody.querySelector('.task-card.new')?'draft':editingTask;
const valueOf=(target,prop)=>target==='draft'?taskDraft?.[prop]:findTask(target)?.[prop];
const touchOnly=()=>matchMedia('(hover: none)').matches;
// Re-draw the open card from its state, keeping focus on the same control.
function refreshCard(focusSel){
  const card=sheetBody.querySelector('.task-card');if(!card)return;
  const a=document.activeElement,sel=focusSel||(card.contains(a)?(a.classList.contains('tc-name')?'.tc-name':a.dataset.chip?`[data-chip="${a.dataset.chip}"][data-val="${a.dataset.val}"]`:null):null);
  const box=document.createElement('div');box.innerHTML=card.classList.contains('new')?taskCard(null):taskCard(findTask(editingTask));
  card.replaceWith(box.firstElementChild);
  const next=sel?sheetBody.querySelector('.task-card '+sel):(!touchOnly()&&!pop?sheetBody.querySelector('.task-card .tc-name'):null);
  next?.focus({preventScroll:true});
}
function setValue(target,prop,v){
  if(target==='draft'){if(taskDraft)taskDraft[prop]=v;}
  else{const x=findTask(target);if(!x)return;x[prop]=v;saveTasks();}
  if(target==='draft'||target===editingTask)refreshCard();else renderTaskList();
}
function setPicking(name){
  picking=name;
  sheetBody.querySelectorAll('.task-card .tc-field').forEach(f=>f.classList.toggle('picking',f.dataset.field===name));
}
function focusField(name){
  const card=sheetBody.querySelector('.task-card');if(!card)return;
  setPicking(name==='name'?null:name);
  if(name==='name'){const i=card.querySelector('.tc-name');i.focus({preventScroll:true});i.setSelectionRange(i.value.length,i.value.length);return;}
  const f=card.querySelector(`.tc-field[data-field="${name}"]`);
  (f.querySelector('.tc-chip.on')||f.querySelector('.tc-chip')).focus({preventScroll:true});
}
// A chip: a tap chooses it (tapping the chosen one again clears it); arrow keys always choose.
function pickChip(chip,{toggle=true,stay=false}={}){
  const name=chip.dataset.chip,val=chip.dataset.val,target=cardTarget();
  if(name==='due'&&val==='pick'){openPop('due',target,chip);return;}
  const prop=PROP[name],cur=valueOf(target,prop);
  let v=name==='due'?quickDue(Number(val)):Number(val);
  if(toggle&&cur===v)v=name==='due'?null:0;
  picking=stay?name:null;
  setValue(target,prop,v);
  if(stay)sheetBody.querySelector(`.task-card [data-chip="${name}"][data-val="${val}"]`)?.focus({preventScroll:true});
}

function openNewCard(){
  if(editingTask)closeTaskCard();
  closePop();
  taskDraft={title:'',effort:0,due:null,priority:0};picking=null;
  const holder=$('task-new');if(!holder)return;
  holder.innerHTML=taskCard(null);
  const card=holder.firstElementChild;card.classList.add('entering');
  const name=card.querySelector('.tc-name');name.focus({preventScroll:true});
  requestAnimationFrame(()=>card.scrollIntoView({block:'nearest',behavior:world.getState().motion?'smooth':'auto'}));
}
function closeNewCard(){
  if(!taskDraft)return;
  taskDraft=null;picking=null;closePop();
  const holder=$('task-new');if(holder)holder.innerHTML=taskNewHtml();
  if(usingKeys)holder?.querySelector('[data-task-new]')?.focus({preventScroll:true});
}
// Enter adds the task and leaves the card ready for the next; Enter on an empty card closes it.
function commitNew(closeAfter=false){
  if(!taskDraft)return;
  const title=taskDraft.title.trim();
  if(title){
    const x={id:newId(),title,effort:taskDraft.effort||0,due:taskDraft.due||null,priority:taskDraft.priority||0,done:null,created:nowIso()};
    tasks.push(x);saveTasks();selectedTask=x.id;renderTaskList();
    sheetBody.querySelector(`[data-task="${x.id}"]`)?.classList.add('fresh');
  }
  if(!title||closeAfter){closeNewCard();return;}
  taskDraft={title:'',effort:0,due:null,priority:0};picking=null;
  refreshCard('.tc-name');
}
function openTaskCard(id){
  if(taskDraft)commitNew(true);
  if(editingTask&&editingTask!==id)closeTaskCard();
  closePop();
  editingTask=id;picking=null;selectedTask=null;renderTaskList();
  const name=sheetBody.querySelector('.task-card .tc-name');
  if(name&&!touchOnly()){name.focus({preventScroll:true});name.setSelectionRange(name.value.length,name.value.length);}
  sheetBody.querySelector('.task-card')?.scrollIntoView({block:'nearest'});
}
// Closing keeps the edits; a task whose name was cleared goes away.
function closeTaskCard(){
  const id=editingTask;if(!id)return;
  editingTask=null;picking=null;closePop();
  const x=findTask(id);
  if(x&&!titleOf(x).trim()){tasks=tasks.filter(y=>y!==x);saveTasks();}
  renderTaskList();
  if(usingKeys)sheetBody.querySelector(`[data-task="${id}"] .task-title`)?.focus({preventScroll:true});
}
const closeAnyCard=()=>sheetBody.querySelector('.task-card.new')?closeNewCard():closeTaskCard();
function resetTaskUI(){
  if(editingTask){const x=findTask(editingTask);if(x&&!titleOf(x).trim()){tasks=tasks.filter(y=>y!==x);saveTasks();}}
  taskDraft=null;editingTask=null;picking=null;selectedTask=null;closePop();
}
function deleteTask(id){
  tasks=tasks.filter(x=>x.id!==id);saveTasks();
  if(editingTask===id){editingTask=null;picking=null;}
  closePop();renderTaskList();toast(t('deleted'));
}
// Ticking: the box squashes and pops blue, a ripple runs out, the tick and a line through the words draw in,
// and the bird game's confetti goes up from the box. A moment later the task slides into the completed list.
const fireConfetti=confetti.create($('confetti-fx'),{resize:true,useWorker:false});
// The bird game's promotion burst (two staggered waves), in a smaller dose for a checkbox. Tuned by eye at size.
const TICK_CONFETTI={particleCount:55,spread:70,startVelocity:26,gravity:1,scalar:.8,ticks:150,bursts:2,burstDelayMs:180,colors:['#4a8af4','#f5c443','#ef8f7a','#8fbf8a','#ffffff']};
function celebrateAt(el){
  if(!world.getState().motion)return;
  const r=el.getBoundingClientRect(),c=$('confetti-fx').getBoundingClientRect(),C=TICK_CONFETTI;
  const origin={x:(r.left+r.width/2-c.left)/c.width,y:(r.top+r.height/2-c.top)/c.height};
  for(let i=0;i<C.bursts;i++)setTimeout(()=>fireConfetti({particleCount:C.particleCount,spread:C.spread,startVelocity:C.startVelocity,gravity:C.gravity,scalar:C.scalar,ticks:C.ticks,colors:C.colors,origin,angle:i?100:80,disableForReducedMotion:true}),i*C.burstDelayMs);
}
function toggleDone(id){
  const x=findTask(id);if(!x)return;
  if(editingTask===id){editingTask=null;picking=null;closePop();renderTaskList();}
  x.done=x.done?null:nowIso();saveTasks();
  const li=sheetBody.querySelector(`[data-task="${id}"]`);
  if(!x.done){lingering.delete(id);renderTaskList();return;}
  lingering.add(id);
  if(li){
    li.getBoundingClientRect();
    li.classList.add('checked','ticking');li.querySelector('.check')?.setAttribute('aria-checked','true');
    celebrateAt(li.querySelector('.check'));
  }else renderTaskList();
  setTimeout(()=>{
    if(!x.done||!lingering.has(id))return;
    lingering.delete(id);
    const row=sheetBody.querySelector(`[data-task="${id}"]`);
    if(row&&world.getState().motion){row.classList.add('leaving');setTimeout(()=>{renderTaskList();sheetBody.querySelector('.done-toggle')?.classList.add('bump');},320);}
    else renderTaskList();
  },1150);
}

// ── Popovers: the date (quick picks and a month, today is a star like Things) and the priority ──
function openPop(kind,target,anchor){
  closePop();
  const el=document.createElement('div');
  el.className=`glass task-pop ${kind}${kind==='due'?'':' menu'}`;el.setAttribute('role',kind==='due'?'dialog':'menu');
  el.setAttribute('aria-label',t({due:'duePh',prio:'prioPh',effort:'effortPh'}[kind]));
  pop={el,kind,target,anchor};
  if(kind==='due'){const cur=valueOf(target,'due'),d=cur&&cur>=todayKey()?fromKey(cur):new Date();calMonth=new Date(d.getFullYear(),d.getMonth(),1);}
  fillPop();sheet.append(el);placePop();
  anchor.classList.add('pop-open');if(!anchor.closest('.task-card'))anchor.closest('.task')?.classList.add('popping');
  el.addEventListener('click',popClick);el.addEventListener('keydown',popKeys);
  if(usingKeys)(el.querySelector('.cal-day[tabindex="0"]')||el.querySelector('[aria-checked="true"]')||el.querySelector('button:not(:disabled)'))?.focus({preventScroll:true});
}
function fillPop(){
  const{el,kind,target}=pop,prop=PROP[kind],cur=valueOf(target,prop);
  if(kind==='prio'){
    el.innerHTML=[3,2,1,0].map(n=>`<button role="menuitemradio" aria-checked="${(cur||0)===n}" data-set-prio="${n}"><b>${'!'.repeat(n)}</b><span>${t('prios')[n]}</span>${(cur||0)===n?icons.tick:''}</button>`).join('');
    return;
  }
  if(kind==='effort'){
    el.innerHTML=[3,2,1,0].map(n=>`<button role="menuitemradio" aria-checked="${(cur||0)===n}" data-set-effort="${n}"><i>${n?battery(n):''}</i><span>${n?t('efforts')[n-1]:t('effortNone')}</span>${(cur||0)===n?icons.tick:''}</button>`).join('');
    return;
  }
  const y=calMonth.getFullYear(),m=calMonth.getMonth(),tk=todayKey(),first=(new Date(y,m,1).getDay()+6)%7,count=new Date(y,m+1,0).getDate();
  const now=new Date(),thisMonth=y===now.getFullYear()&&m===now.getMonth();
  const inMonth=k=>k&&k.slice(0,7)===dayKey(new Date(y,m,1)).slice(0,7);
  const focusKey=inMonth(cur)?cur:thisMonth?tk:dayKey(new Date(y,m,1));
  let days='';
  for(let i=0;i<first;i++)days+='<span></span>';
  for(let d=1;d<=count;d++){
    const k=dayKey(new Date(y,m,d));
    days+=`<button class="cal-day${k===tk?' today':''}${k===cur?' on':''}" data-day="${k}"${k<tk?' disabled':''} tabindex="${k===focusKey?0:-1}" aria-label="${esc(longDay(k))}"${k===cur?' aria-pressed="true"':''}>${k===tk?icons.star:d}</button>`;
  }
  el.innerHTML=`<div class="cal-quick">${t('dueQuick').map((l,i)=>`<button class="tc-chip${cur===quickDue(i)?' on':''}" data-day="${quickDue(i)}">${i===0?icons.star:''}${l}</button>`).join('')}</div>`+
    `<div class="cal-head"><button class="cal-nav" data-cal="-1" aria-label="${t('calPrev')}"${thisMonth?' disabled':''}>${icons.back}</button><strong>${t('monthTitle')(y,m+1)}</strong><button class="cal-nav" data-cal="1" aria-label="${t('calNext')}">${icons.forward}</button></div>`+
    `<div class="cal-grid">${t('weekdays').map(w=>`<span class="cal-wd">${w}</span>`).join('')}${days}</div>`+
    (cur?`<button class="cal-clear" data-day="">${t('clearDate')}</button>`:'');
}
function placePop(){
  if(!pop)return;
  const s=sheet.getBoundingClientRect(),a=pop.anchor.getBoundingClientRect(),w=pop.el.offsetWidth,h=pop.el.offsetHeight;
  let top=a.bottom-s.top+6;
  if(top+h>s.height-10)top=a.top-s.top-h-6;
  top=Math.max(10,Math.min(top,s.height-h-10));
  pop.el.style.top=top+'px';
  pop.el.style.left=Math.max(10,Math.min(a.right-s.left-w,s.width-w-10))+'px';
}
function closePop(refocus=false){
  if(!pop)return;
  const{el,anchor}=pop;pop=null;el.remove();
  anchor.classList.remove('pop-open');anchor.closest('.task')?.classList.remove('popping');
  if(refocus&&anchor.isConnected)anchor.focus({preventScroll:true});
}
// A choice from a popover lands on the card or the row it came from.
function popChoose(prop,v){
  const{target,kind}=pop,fromCard=target==='draft'||target===editingTask;
  closePop();
  if(fromCard)picking=usingKeys?kind:null;
  setValue(target,prop,v);
  if(fromCard){if(usingKeys)focusField(kind);}
  else if(usingKeys)sheetBody.querySelector(`[data-task="${target}"] [data-pick="${kind}"]`)?.focus({preventScroll:true});
}
function popClick(e){
  const day=e.target.closest('[data-day]'),nav=e.target.closest('[data-cal]'),prio=e.target.closest('[data-set-prio]'),effort=e.target.closest('[data-set-effort]');
  if(day&&!day.disabled)popChoose('due',day.dataset.day||null);
  else if(nav&&!nav.disabled){calMonth=new Date(calMonth.getFullYear(),calMonth.getMonth()+Number(nav.dataset.cal),1);fillPop();placePop();pop.el.querySelector(`[data-cal="${nav.dataset.cal}"]`)?.focus({preventScroll:true});}
  else if(prio)popChoose('priority',Number(prio.dataset.setPrio));
  else if(effort)popChoose('effort',Number(effort.dataset.setEffort));
}
function popKeys(e){
  if(pop.kind!=='due'&&(e.key==='ArrowDown'||e.key==='ArrowUp')){
    e.preventDefault();
    const items=[...pop.el.querySelectorAll('button')],i=items.indexOf(document.activeElement);
    items[(i+(e.key==='ArrowDown'?1:items.length-1))%items.length].focus();
    return;
  }
  const day=e.target.closest('.cal-day'),step={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7}[e.key];
  if(!day||!step)return;
  e.preventDefault();
  let d=addDays(fromKey(day.dataset.day),step);
  if(dayKey(d)<todayKey())d=addDays(new Date(),0);
  if(d.getMonth()!==calMonth.getMonth()||d.getFullYear()!==calMonth.getFullYear()){calMonth=new Date(d.getFullYear(),d.getMonth(),1);fillPop();}
  pop.el.querySelector(`.cal-day[data-day="${dayKey(d)}"]`)?.focus({preventScroll:true});
}

// ── Events ──
function taskClick(e){
  const el=e.target;
  if(el.closest('[data-task-new]')){openNewCard();return true;}
  const card=el.closest('.task-card');
  if(card){
    const row=el.closest('[data-row]'),chip=el.closest('[data-chip]'),target=cardTarget();
    if(el.closest('[data-clear]')){const name=el.closest('[data-clear]').dataset.clear;picking=null;setValue(target,PROP[name],name==='due'?null:0);}
    else if(row)focusField(row.dataset.row);
    else if(chip)pickChip(chip,{stay:e.detail===0});
    else if(el.closest('.check'))toggleDone(editingTask);
    else if(el.closest('[data-del]'))deleteTask(editingTask);
    else if(picking&&!el.closest('.tc-chips'))setPicking(null);
    return true;
  }
  if(el.closest('[data-done-toggle]')){showDone=!showDone;renderTaskList();return true;}
  if(el.closest('[data-done-clear]')){tasks=tasks.filter(x=>!x.done||lingering.has(x.id));saveTasks();showDone=false;renderTaskList();return true;}
  const li=el.closest('[data-task]');if(!li)return false;
  const id=li.dataset.task;
  if(el.closest('.check')){toggleDone(id);return true;}
  const pick=el.closest('[data-pick]');
  if(pick){
    const anchor=sheetBody.querySelector(`[data-task="${id}"] [data-pick="${pick.dataset.pick}"]`);
    if(!anchor)return true;
    if(pop&&pop.anchor===anchor)closePop();else openPop(pick.dataset.pick,id,anchor);
    return true;
  }
  openTaskCard(id);
  return true;
}
function taskKeys(e){
  const card=e.target.closest('.task-card');if(!card)return false;
  const chip=e.target.closest('[data-chip]');
  if(e.key==='Tab'){
    e.preventDefault();
    const list=[...card.querySelectorAll('[data-field]')].map(f=>f.dataset.field),cur=e.target.closest('[data-field]')?.dataset.field||'name';
    focusField(list[(list.indexOf(cur)+(e.shiftKey?list.length-1:1))%list.length]);
    return true;
  }
  if(e.key==='Enter'&&!e.isComposing&&e.keyCode!==229){
    e.preventDefault();
    if(card.classList.contains('new'))commitNew();else closeTaskCard();
    return true;
  }
  if(chip&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){
    e.preventDefault();
    const chips=[...chip.parentElement.children],next=chips[(chips.indexOf(chip)+(e.key==='ArrowRight'?1:chips.length-1))%chips.length];
    if(next.dataset.val==='pick')next.focus({preventScroll:true});else pickChip(next,{toggle:false,stay:true});
    return true;
  }
  if(chip&&chip.dataset.val==='pick'&&e.key==='ArrowDown'){e.preventDefault();openPop('due',cardTarget(),chip);return true;}
  return false;
}
sheetBody.addEventListener('input',e=>{
  if(!e.target.classList.contains('tc-name'))return;
  if(e.target.closest('.task-card.new')){if(taskDraft)taskDraft.title=e.target.value;return;}
  const x=findTask(editingTask);if(!x)return;
  x.title=e.target.value;delete x.sample;saveTasksSoon();
  e.target.closest('.task-card').querySelector('.check')?.setAttribute('aria-label',x.title);
});
// A click outside the open card closes it: a new card keeps what was typed as a task, an open task keeps its edits.
document.addEventListener('click',e=>{
  if(sheetMode!=='workshop')return;
  const card=sheetBody.querySelector('.task-card');
  if(!card||card.contains(e.target)||e.target.closest?.('.task-pop'))return;
  if(card.classList.contains('new'))commitNew(true);else closeTaskCard();
},true);
document.addEventListener('pointerdown',e=>{
  if(pop&&!pop.el.contains(e.target)&&!pop.anchor.contains(e.target))closePop();
  if(selectedTask&&!e.target.closest?.(`[data-task="${selectedTask}"]`)){sheetBody.querySelector('.task.selected')?.classList.remove('selected');selectedTask=null;}
});
sheetBody.addEventListener('scroll',()=>closePop(),{passive:true});
addEventListener('resize',()=>closePop());

views.workshop=()=>`${interior('workshop')}<p class="sheet-lead">${buildings.workshop[lang][2]}</p><div class="task-new" id="task-new">${taskNewHtml()}</div><div id="task-lists">${taskListsHtml()}</div>`;
// Every "new" goes through here: tasks open the card in the workshop, the rest open a note.
function create(kind){
  if(kind!=='workshop')return newNote(kind);
  if(sheetMode!=='workshop')openSheet('workshop');
  openNewCard();
}

// ── Town news: a small queue of gentle nudges, one per building, fresh on every visit ──
// Tapping one opens a glass card; OK does the thing, × lets it go. Either way it leaves the queue.
Object.assign(texts.zh,{newsLabel:'小镇快报',ok:'好的',news:{
  home:[['小屋的书桌上，留着一页空白。','今天有什么小事，想放进小屋里？','write'],['窗边的位置还暖着。','坐一会儿，记下一件今天的小事吧。','write']],
  post:[['该给明天的自己写几句了。','邮差说，明天一早就送到。','write'],['邮局今天有一张明信片。','看完以后，也给明天写一张吧。','open']],
  library:[['书签还夹在上次那一页。','今天读到了什么？记一笔就好。','write'],['书屋的灯亮着。','读到喜欢的句子，就抄下来吧。','write']],
  workshop:[['工坊的小黑板上，还空着一行。','有什么想做的事？写一件就好。','write'],['工具都摆好了。','写下今天想做完的一件小事吧。','write']]},
  newsToday:n=>[`今天有${['零','一','两','三','四','五','六','七','八','九','十'][n]??n}件小事在等你。`,'不急，一件一件来。','open']});
Object.assign(texts.en,{newsLabel:'Town news',ok:'OK',news:{
  home:[['There’s a blank page on the desk at home.','Anything small from today you’d like to keep?','write'],['The seat by the window is still warm.','Sit a while, and jot down one small thing.','write']],
  post:[['Time for a little letter to tomorrow.','The postie says it’ll arrive first thing.','write'],['A postcard came for you today.','Read it, then write one for tomorrow.','open']],
  library:[['Your bookmark is right where you left it.','What did you read today? A line is enough.','write'],['The reading room light is on.','Found a sentence you love? Copy it down.','write']],
  workshop:[['There’s an empty line on the workshop chalkboard.','Anything you’d like to get done? One is plenty.','write'],['The tools are all laid out.','Write down one small thing to finish today.','write']]},
  newsToday:n=>[n===1?'One little thing is waiting for you today.':`${n} little things are waiting for you today.`,'No rush. One at a time.','open']});
const newsQueue=placeIds.map(id=>({id,pick:Math.floor(Math.random()*2)}));
let noticeItem=null,noticeTimer;
const newsText=item=>{
  const due=item.id==='workshop'?tasks.filter(forToday).length:0;
  return due?t('newsToday')(due):t('news')[item.id][item.pick];
};
function renderNews(){
  const tray=$('news');
  tray.setAttribute('aria-label',t('newsLabel'));
  $('news-count').textContent=newsQueue.length;
  $('news-items').innerHTML=newsQueue.map((item,i)=>`<button class="news-item${i===0?' next':''}" data-news="${item.id}" aria-label="${esc(buildings[item.id][lang][1]+'：'+newsText(item)[0])}">${icons[item.id]}</button>`).join('');
  tray.classList.toggle('empty',!newsQueue.length);
}
function openNotice(item){
  noticeItem=item;
  const[title,body]=newsText(item),notice=$('notice');
  $('notice-from').textContent=buildings[item.id][lang][1];
  $('notice-title').textContent=title;$('notice-body').textContent=body;$('notice-ok').textContent=t('ok');
  $('notice-close').setAttribute('aria-label',t('close'));
  $('notice-canvas').dataset.model=item.id;
  world.setThumbs([{canvas:$('notice-canvas'),id:item.id,fill:.7,interior:false}],'notice');
  clearTimeout(noticeTimer);
  if(notice.hidden){notice.hidden=false;notice.getBoundingClientRect();}
  else if(world.getState().motion)notice.animate([{opacity:.4,transform:'translateY(-4px) scale(.98)'},{opacity:1,transform:'none'}],{duration:260,easing:'cubic-bezier(.2,.8,.2,1)'});
  notice.classList.add('open');
  if(usingKeys)$('notice-ok').focus({preventScroll:true});
}
// Both buttons take the item out of the queue; OK also does what it suggests.
function closeNotice(accept){
  if(!noticeItem)return;
  const item=noticeItem,[, ,action]=newsText(item);
  noticeItem=null;
  newsQueue.splice(newsQueue.indexOf(item),1);
  $('notice').classList.remove('open');
  noticeTimer=setTimeout(()=>{if(!noticeItem){$('notice').hidden=true;world.setThumbs([],'notice');}},300);
  renderNews();
  if(accept){if(action==='write')create(item.id);else openSheet(item.id);}
  else if(newsQueue.length)$('news-items').querySelector('button')?.focus({preventScroll:true});
}
$('news-items').addEventListener('click',e=>{
  const b=e.target.closest('[data-news]');
  if(b)openNotice(newsQueue.find(item=>item.id===b.dataset.news));
});
$('news').addEventListener('click',e=>{if(!e.target.closest('[data-news]')&&newsQueue.length)openNotice(newsQueue[0]);});
$('notice-ok').onclick=()=>closeNotice(true);
$('notice-close').onclick=()=>closeNotice(false);

// ── Wiring ──
nav.querySelectorAll('button').forEach(b=>b.onclick=()=>toggleSheet(b.dataset.sheet));
$('capture').onclick=()=>addMenu.classList.contains('open')?closeAddMenu():openAddMenu();
$('about').onclick=()=>toggleSheet('about');
$('close-sheet').onclick=()=>closeSheet();
$('day').onclick=()=>setDusk(false);
$('dusk').onclick=()=>setDusk(true);
$('sound').onclick=()=>{soundOn=!soundOn;try{localStorage.setItem('hamlet-quiet-audio',soundOn?'on':'off');}catch{}updateSound();};
$('language').onclick=()=>setLanguage(lang==='zh'?'en':'zh');
$('motion').onclick=()=>{world.setMotion(!world.getState().motion);updateMotionLabel();};
$('zoom-in').onclick=()=>world.zoomBy(1.18);
$('zoom-out').onclick=()=>world.zoomBy(1/1.18);
$('reset').onclick=()=>select(null);
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  if(noticeItem)closeNotice(false);
  else if(addMenu.classList.contains('open')){closeAddMenu();$('capture').focus();}
  else if(pop)closePop(true);
  else if(sheetBody.querySelector('.task-card'))closeAnyCard();
  else if(current)closeNote();
  else closeSheet();
});

setDusk(true,true);
setLanguage(lang);
requestAnimationFrame(()=>{$('loading').style.opacity='0';setTimeout(()=>$('loading').hidden=true,550);});
setTimeout(()=>{$('news').hidden=false;},900);
