const LN={en:["🇬🇧","Ingliz tili","en-US"],es:["🇪🇸","Ispan tili","es-ES"],ko:["🇰🇷","Koreys tili","ko-KR"],ru:["🇷🇺","Rus tili","ru-RU"],de:["🇩🇪","Nemis tili","de-DE"]};
const UZL=[["Salomlashish","Salom va xayrlashish uchun eng kerakli so‘zlar."],["Sonlar 1–6","Birinchi oltita sonni o‘rganamiz."],["Ranglar","Asosiy ranglarni o‘rganamiz."]];
const UZW=["Salom","Xayr","Rahmat","Iltimos","Ha","Yo‘q","bir","ikki","uch","to‘rt","besh","olti","qizil","ko‘k","yashil","sariq","qora","oq"];
const F={en:["Hello","Goodbye","Thank you","Please","Yes","No","one","two","three","four","five","six","red","blue","green","yellow","black","white"],
es:["Hola","Adiós","Gracias","Por favor","Sí","No","uno","dos","tres","cuatro","cinco","seis","rojo","azul","verde","amarillo","negro","blanco"],
ko:["안녕하세요","안녕히 가세요","감사합니다","부탁합니다","네","아니요","하나","둘","셋","넷","다섯","여섯","빨간색","파란색","초록색","노란색","검은색","흰색"],
ru:["Привет","До свидания","Спасибо","Пожалуйста","Да","Нет","один","два","три","четыре","пять","шесть","красный","синий","зелёный","жёлтый","чёрный","белый"],
de:["Hallo","Tschüss","Danke","Bitte","Ja","Nein","eins","zwei","drei","vier","fünf","sechs","rot","blau","grün","gelb","schwarz","weiß"]};
const PR={ko:["annyeonghaseyo","annyeonghi gaseyo","gamsahamnida","butakamnida","ne","aniyo","hana","dul","set","net","daseot","yeoseot","ppalgansaek","paransaek","choroksaek","norangsaek","geomeunsaek","huinsaek"],
ru:["privet","do svidaniya","spasibo","pozhaluysta","da","net","odin","dva","tri","chetyre","pyat","shest","krasnyy","siniy","zelyonyy","zhyoltyy","chyornyy","belyy"]};
const NL=3;
const SH=[["h1","🎩","Silindr",10,"h"],["h2","👑","Toj",25,"h"],["g1","🕶️","Qora ko‘zoynak",15,"g"],["g2","🤓","Aqlli ko‘zoynak",12,"g"],["a1","🎀","Bant",8,"a"],["a2","🧣","Sharf",10,"a"],["c1","🟣","Binafsha rang",20,"c",270],["c2","🟠","To‘q sariq rang",20,"c",150]];
const MS=[["a","5 ta savolga javob berish","5 ta savolga to‘g‘ri javob bering",5,10],["l","1 ta darsni tugatish","Bitta darsni oxirigacha yakunlang",1,15],["x","30 XP to‘plash","Bugun 30 XP yig‘ing",30,20]];
const AC=[["Birinchi dars","Birinchi darsni tugating",s=>s.ld>=1],["5 ta to‘g‘ri javob","5 ta savolga to‘g‘ri javob bering",s=>s.cor>=5],["100 XP","100 XP to‘plang",s=>s.xp>=100],["7 kunlik seriya","7 kun ketma-ket o‘qing",s=>s.streak>=7],["10 ta tugatilgan dars","10 ta dars tugating",s=>s.ld>=10],["Til o‘rganish ustasi","Bitta tilning barcha darslarini tugating",s=>Object.values(s.prog).some(p=>p.length>=NL)]];
const OK=["Ajoyib! To‘g‘ri javob!","Barakalla! Sen uddalading!","Zo‘r! Davom et!","Juda yaxshi!","Sen haqiqiy bilimdon ekansan!","A’lo! Yana bir qadam oldinga!"];
const NO=["Hechqisi yo‘q! Yana urinib ko‘r!","Xato qilish ham o‘rganishning bir qismi!","Sen buni uddalaysan!"];
const D={name:"",src:"",lang:"en",level:"",time:"",done:false,xp:0,gems:0,tr:0,streak:0,last:"",cor:0,ld:0,prog:{en:[],es:[],ko:[],ru:[],de:[]},mis:{d:"",a:0,l:0,x:0,c:[]},ach:[],own:[],eq:{},chests:0,hist:[],mute:false};
let S;try{S={...D,...JSON.parse(localStorage.getItem("le_v1")||"{}")}}catch(e){S={...D}}S.prog={...D.prog,...S.prog};
const save=()=>{try{localStorage.setItem("le_v1",JSON.stringify(S))}catch(e){}};
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const rand=n=>Math.floor(Math.random()*n),shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const T=()=>new Date().toLocaleDateString("sv",{timeZone:"Asia/Tashkent"});
function dayCheck(){if(S.mis.d!==T())S.mis={d:T(),a:0,l:0,x:0,c:[]}}
function tick(){const t=T();if(S.last!==t){const y=new Date(Date.now()-864e5).toLocaleDateString("sv",{timeZone:"Asia/Tashkent"});S.streak=S.last===y?S.streak+1:1;S.last=t}}
function toast(t){const e=document.createElement("div");e.className="toast";e.textContent=t;document.body.append(e);setTimeout(()=>e.remove(),2400)}
function boom(){["⭐","✨","🎉","💚","💙","💛"].forEach((c,i)=>{for(let k=0;k<3;k++){const e=document.createElement("span");e.className="fx";e.textContent=c;e.style.left=10+rand(80)+"vw";e.style.top=40+rand(40)+"vh";document.body.append(e);setTimeout(()=>e.remove(),1400)}})}
function snd(ok=true){try{const a=new(window.AudioContext||window.webkitAudioContext)();(ok?[523,659,784]:[330,262]).forEach((f,i)=>{const o=a.createOscillator(),g=a.createGain();o.frequency.value=f;o.connect(g);g.connect(a.destination);g.gain.setValueAtTime(.15,a.currentTime+i*.12);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+i*.12+.2);o.start(a.currentTime+i*.12);o.stop(a.currentTime+i*.12+.22)})}catch(e){}}
function talk(v){document.querySelectorAll(".robo").forEach(r=>r.classList.toggle("talk",!!v))}
function say(t,l="uz-UZ",force){if(!window.speechSynthesis||(S.mute&&!force))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang=l;u.rate=.9;u.onstart=()=>talk(1);u.onend=u.onerror=()=>talk(0);speechSynthesis.speak(u)}
function robot(sz){const g=t=>(SH.find(x=>x[0]===S.eq[t])||[])[1]||"",c=SH.find(x=>x[0]===S.eq.c);return`<div class="robo" style="font-size:${sz}px"><div class="hat">${g("h")}</div><div class="face" style="${c?`filter:hue-rotate(${c[5]}deg)`:""}">🤖</div><div class="acc">${g("g")}${g("a")}</div></div>`}
function addMis(k,n){dayCheck();S.mis[k]+=n;MS.forEach(m=>{if(S.mis[m[0]]>=m[3]&&!S.mis.c.includes(m[0])){S.mis.c.push(m[0]);S.xp+=m[4];S.chests++;toast(`🎯 Vazifa bajarildi! +${m[4]} XP va 🎁 sandiq`);boom()}})}
const addXP=n=>{S.xp+=n;addMis("x",n)};
function chk(){AC.forEach((a,i)=>{if(!S.ach.includes(i)&&a[2](S)){S.ach.push(i);S.gems+=5;toast(`🏅 Yutuq: ${a[0]} (+5 💎)`);boom()}})}
// ---------- Onboarding ----------
const KEY=["name","src","lang","level","time"],QT=["Ismingiz nima?","Siz bizni qayerdan bildingiz?","Siz qaysi tilni tanlaysiz?","Siz qaysi darajadasiz?","Kuniga qancha vaqtingizni ajrata olasiz?"],LK=Object.keys(LN);
const OPT=[0,["Instagram","YouTube","Do‘stlarimdan","Telegram","Boshqa"],LK.map(k=>LN[k][0]+" "+LN[k][1]),["Men yangi boshlovchiman","Bir nechta oddiy so‘zlarni bilaman","Oddiy suhbat qura olaman","Turli mavzularda suhbatlasha olaman","Tilni juda yaxshi bilaman"],["5 daqiqa","10 daqiqa","20 daqiqa","30 daqiqa","60 daqiqa"]];
let ob={s:0,name:"",src:"",lang:"",level:"",time:""},view=0;
function obR(){const s=ob.s,A=$("#app");
if(s>4){A.innerHTML=`<div class="card" style="text-align:center">${robot(90)}<h1>Tabriklaymiz, ${esc(ob.name)}! 🎉</h1><p>Til: <b>${LN[ob.lang][0]} ${LN[ob.lang][1]}</b><br>Daraja: <b>${esc(ob.level)}</b></p><button class="btn" onclick="obGo()">O‘qishni boshlash</button></div>`;say(`Tabriklayman, ${ob.name}! Keling, o‘qishni boshlaymiz!`);return}
A.innerHTML=`<div class="row"><div class="bar" style="flex:1"><i style="width:${s*20}%"></i></div><b>${s+1}/5</b></div>
<div class="row card"><div>${robot(70)}</div><div class="bub">${QT[s]}<div class="row" style="margin-top:8px"><button class="btn o" onclick="say(QT[ob.s],'uz-UZ',1)">🔊 Qayta</button><button class="btn o" onclick="S.mute=!S.mute;speechSynthesis.cancel();save();obR()">${S.mute?"🔇 Ovozsiz":"🔈 Ovoz bor"}</button></div></div></div>
${s?OPT[s].map((o,i)=>`<button class="opt ${(s==2?ob.lang===LK[i]:ob[KEY[s]]===o)?"sel":""}" onclick="obPick(${i})">${o}</button>`).join(""):`<input class="in" id="nm" placeholder="Ismingizni yozing" value="${esc(ob.name)}" oninput="ob.name=this.value">`}
<div class="row" style="margin-top:12px">${s?`<button class="btn o" onclick="ob.s--;obR()">Orqaga</button>`:""}<button class="btn" onclick="obNext()">Davom etish</button></div>`;say(QT[s])}
function obPick(i){const s=ob.s;ob[KEY[s]]=s==2?LK[i]:OPT[s][i];const h=speechSynthesis;obR()}
function obNext(){if(!ob[KEY[ob.s]].trim())return toast(ob.s?"Iltimos, javobni tanlang":"Iltimos, ismingizni kiriting");ob.s++;obR()}
function obGo(){Object.assign(S,{name:ob.name.trim(),src:ob.src,lang:ob.lang,level:ob.level,time:ob.time,done:true});save();speechSynthesis.cancel();R()}
// ---------- Main ----------
const V=["Bosh sahifa","Kurslar","Darslar","Vazifalar","Mukofotlar","Yutuqlar","Robotim","Profil"];
const cur=l=>{const p=S.prog[l];for(let i=0;i<NL;i++)if(!p.includes(i))return i;return -1};
const pct=l=>Math.round(S.prog[l].length/NL*100);
function R(){if(!S.done){return obR()}dayCheck();tick();chk();save();
const body=[home,courses,lessons,missions,rewards,ach,shop,prof][view]();
$("#app").innerHTML=`<nav>${V.map((v,i)=>`<button class="${i==view?"on":""}" onclick="view=${i};R()">${v}</button>`).join("")}</nav>${body}`}
function lessonCard(i){const l=S.lang,p=S.prog[l],d=p.includes(i),ok=i==0||p.includes(i-1),c=cur(l)==i;
return`<div class="card ${d?"dn":c?"cur":!ok?"lk":""}"><div class="row"><b style="font-size:24px">${d?"✅":ok?"▶️":"🔒"}</b><div style="flex:1"><b>${i+1}. ${UZL[i][0]}</b><br><small>A1 · ${UZL[i][1]}</small></div><button class="btn ${d?"o":""}" ${ok?"":"disabled"} onclick="play(${i})">${d?"Qaytarish":ok?"Boshlash":"Qulflangan"}</button></div></div>`}
function home(){const l=S.lang,c=cur(l);return`<div class="card row">${robot(80)}<div style="flex:1"><h2>Salom, ${esc(S.name)}!</h2><small>${LN[l][0]} ${LN[l][1]} · ${esc(S.level)} · Kuniga ${esc(S.time)}</small></div></div>
<div class="grid"><div class="card stat"><b>${S.xp}</b>XP</div><div class="card stat"><b>${S.gems}</b>💎 Gemlar</div><div class="card stat"><b>${S.tr}</b>🏆 Kubok</div><div class="card stat"><b>${S.streak}</b>🔥 Seriya</div></div>
<div class="card"><b>Kurs jarayoni: ${pct(l)}%</b><div class="bar"><i style="width:${pct(l)}%"></i></div></div>
${c>=0?lessonCard(c):`<div class="card">🎓 Bu tilning barcha mavjud darslari tugatildi!</div>`}
<h3>Bugungi vazifalar</h3>${MS.map(m=>`<div class="card"><b>${m[1]}</b> ${S.mis.c.includes(m[0])?"✅":""}<div class="bar"><i style="width:${Math.min(100,S.mis[m[0]]/m[3]*100)}%"></i></div></div>`).join("")}`}
function courses(){return`<h2>Kurslar</h2><div class="grid">${LK.map(k=>`<div class="card ${k==S.lang?"cur":""}" style="text-align:center"><div style="font-size:42px">${LN[k][0]}</div><b>${LN[k][1]}</b><div class="bar"><i style="width:${pct(k)}%"></i></div><small>${S.prog[k].length}/${NL} dars</small><br><br><button class="btn ${k==S.lang?"o":"b"}" onclick="S.lang='${k}';save();view=2;R()">${k==S.lang?"Tanlangan":"Tanlash"}</button></div>`).join("")}</div>`}
function lessons(){return`<h2>${LN[S.lang][0]} ${LN[S.lang][1]} — darslar</h2><div class="card"><b>A1 · Boshlang‘ich</b> <small>(${S.prog[S.lang].length}/${NL} dars tayyor)</small></div>${[...Array(NL).keys()].map(lessonCard).join("")}`}
function missions(){dayCheck();return`<h2>Kunlik vazifalar</h2>${MS.map(m=>`<div class="card"><b>${m[1]}</b> ${S.mis.c.includes(m[0])?"✅ Bajarildi":""}<br><small>${m[2]} · Mukofot: ${m[4]} XP + 🎁</small><div class="bar"><i style="width:${Math.min(100,S.mis[m[0]]/m[3]*100)}%"></i></div><small>${Math.min(S.mis[m[0]],m[3])}/${m[3]}</small></div>`).join("")}`}
function rewards(){return`<h2>Mukofotlar</h2><div class="grid"><div class="card stat"><b>${S.xp}</b>XP</div><div class="card stat"><b>${S.gems}</b>💎</div><div class="card stat"><b>${S.tr}</b>🏆</div><div class="card stat"><b>${S.chests}</b>🎁 Sandiq</div></div><button class="btn" ${S.chests?"":"disabled"} onclick="openChest()">🎁 Sandiqni ochish</button><h3>Tarix</h3>${S.hist.length?S.hist.map(h=>`<div class="card">${h}</div>`).join(""):"<small>Hali sandiq ochilmagan.</small>"}`}
function ach(){return`<h2>Yutuqlar</h2>${AC.map((a,i)=>`<div class="card ${S.ach.includes(i)?"dn":"lk"}"><b>${S.ach.includes(i)?"🏅":"🔒"} ${a[0]}</b><br><small>${a[1]}</small></div>`).join("")}`}
function shop(){return`<div class="card" style="text-align:center">${robot(90)}<br><b>💎 ${S.gems}</b></div><div class="grid">${SH.map(x=>{const o=S.own.includes(x[0]),e=S.eq[x[4]]==x[0];return`<div class="card" style="text-align:center"><div style="font-size:36px">${x[1]}</div><b>${x[2]}</b><br><small>${o?"Sizniki":x[3]+" 💎"}</small><br><br><button class="btn ${o?"b":""}" onclick="buy('${x[0]}')">${e?"Yechish":o?"Kiyish":"Sotib olish"}</button></div>`}).join("")}</div>`}
function buy(id){const x=SH.find(i=>i[0]==id);if(!S.own.includes(id)){if(S.gems<x[3])return toast("Gem yetarli emas 💎");S.gems-=x[3];S.own.push(id);S.eq[x[4]]=id}else if(S.eq[x[4]]==id)delete S.eq[x[4]];else S.eq[x[4]]=id;save();R()}
function prof(){return`<div class="card"><h2>${esc(S.name)}</h2><p>Til: ${LN[S.lang][1]}<br>Daraja: ${esc(S.level)}<br>Kunlik vaqt: ${esc(S.time)}<br>Qayerdan bildi: ${esc(S.src)}<br>Tugatilgan darslar: ${S.ld}<br>To‘g‘ri javoblar: ${S.cor}</p><button class="btn o" onclick="if(confirm('Barcha ma’lumotlar o‘chiriladi. Davom etasizmi?')){localStorage.removeItem('le_v1');location.reload()}">Hisobni tozalash</button></div>`}
function openChest(){if(S.chests<1)return;S.chests--;save();const m=document.createElement("div");m.className="md";m.innerHTML=`<div><div class="chest">🎁</div><b>Ochilmoqda...</b></div>`;document.body.append(m);snd();
setTimeout(()=>{const r=Math.random();let t;if(r<.35){const n=20+rand(31);addXP(n);t=`+${n} XP`}else if(r<.7){const n=5+rand(11);S.gems+=n;t=`+${n} 💎`}else if(r<.85){S.tr++;t="+1 🏆 kubok"}else{const f=SH.filter(x=>!S.own.includes(x[0]));if(f.length){const it=f[rand(f.length)];S.own.push(it[0]);t=`${it[1]} ${it[2]} (aksessuar)`}else{S.gems+=10;t="+10 💎"}}
S.hist.unshift(t);S.hist=S.hist.slice(0,20);save();m.innerHTML=`<div><div style="font-size:70px">🎉</div><h2>${t}</h2><button class="btn" onclick="this.closest('.md').remove();R()">Zo‘r!</button></div>`;boom()},1100)}
// ---------- Lesson player ----------
let P=null;
function play(i){const l=S.lang,w=F[l].slice(i*6,i*6+6),u=UZW.slice(i*6,i*6+6);
const op=(a,k)=>shuf([a[k],...shuf(a.filter((_,j)=>j!=k)).slice(0,3)]);
const qs=[...w.map((x,k)=>({q:x,a:u[k],o:op(u,k),f:1,s:x})),...shuf([0,1,2,3,4,5]).slice(0,4).map(k=>({q:u[k],a:w[k],o:op(w,k),f:0,s:w[k]}))];
P={i,l,w,u,qs,n:-1,err:0,bad:[],done:0,fb:"",ok:0};let o=$("#pl");if(!o){o=document.createElement("div");o.id="pl";o.className="ov";document.body.append(o)}PR_();say(UZL[i][1])}
function PR_(){const o=$("#pl"),p=P,l=p.l;
if(p.n<0){o.innerHTML=`<div><button class="btn o" onclick="closeP()">✕ Chiqish</button><div class="card"><h2>${UZL[p.i][0]}</h2><p>${UZL[p.i][1]}</p><table>${p.w.map((x,k)=>`<tr><td><b>${x}</b> <button class="btn o" style="padding:2px 8px" onclick="say('${x}','${LN[l][2]}',1)">🔊</button>${PR[l]?`<br><small>${PR[l][p.i*6+k]}</small>`:""}</td><td>${p.u[k]}</td></tr>`).join("")}</table></div><button class="btn" onclick="P.n=0;PR_()">Boshlash</button></div>`;return}
if(p.n>=p.qs.length){const first=!S.prog[l].includes(p.i);o.innerHTML=`<div class="card" style="text-align:center">${robot(90)}<h1>Dars tugadi! 🎉</h1><p>To‘g‘ri javoblar: <b>${p.ok}/${p.qs.length}</b></p>${first?`<p>+20 XP · +5 💎 · +1 🏆</p>`:`<p><small>Bu dars avval tugatilgan — takroriy mukofot berilmaydi.</small></p>`}<button class="btn" onclick="closeP()">Davom etish</button></div>`;return}
const q=p.qs[p.n];o.innerHTML=`<div><div class="row"><button class="btn o" onclick="closeP()">✕</button><div class="bar" style="flex:1"><i style="width:${p.n/p.qs.length*100}%"></i></div><b>${p.n+1}/${p.qs.length}</b></div>
<div class="card row">${robot(60)}<div class="bub">Tarjimasini tanlang:<div style="font-size:30px">“${q.q}” ${q.f?`<button class="btn o" onclick="say('${q.q}','${LN[l][2]}',1)">🔊</button>`:""}</div></div></div>
${q.o.map((x,j)=>`<button class="opt ${p.bad.includes(j)?"bad":p.done&&x==q.a?"ok":""}" ${p.done||p.bad.includes(j)?"disabled":""} onclick="pick(${j})">${x}</button>`).join("")}
${p.fb?`<div class="fb ${p.done?"g":""}">${p.fb}</div>`:""}${p.done?`<button class="btn" onclick="P.n++;P.err=0;P.bad=[];P.done=0;P.fb='';PR_()">Keyingisi</button>`:""}</div>`}
function pick(j){const p=P,q=p.qs[p.n];if(p.done)return;
if(q.o[j]==q.a){p.done=1;if(!p.err){S.cor++;addXP(10);addMis("a",1);tick();p.ok++;toast("+10 XP");p.fb=OK[rand(OK.length)]+" 🤩"}else p.fb="To‘g‘ri! Endi eslab qolasan 👍";snd();boom();say(p.fb.replace(/[^\p{L}\s‘’!?,.]/gu,""))}
else{p.err=1;p.bad.push(j);const a=q.f?q.q:q.a,b=q.f?q.a:q.q;p.fb=`${NO[rand(NO.length)]} 🤗 Eslatma: “${a}” — “${b}” degani.`;snd(false);say(NO[rand(NO.length)])}
chk();save();PR_()}
function closeP(){const p=P;if(p&&p.n>=p.qs.length&&!S.prog[p.l].includes(p.i)){S.prog[p.l].push(p.i);addXP(20);S.gems+=5;S.tr++;S.ld++;addMis("l",1);tick();if(S.ld%5==0){S.chests++;toast("🎁 5 ta dars uchun sandiq!")}}
speechSynthesis.cancel();$("#pl")&&$("#pl").remove();P=null;save();R()}
R();
