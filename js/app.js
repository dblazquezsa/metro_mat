"use strict";
/* Aplicación: plano, estado, motor de ejercicios, vistas, cuentas y arranque. */
/* ============ contenido ============ */
const LINES={
  ent:{name:"Los números enteros",short:"Enteros",c:"--l-ent"},
  rac:{name:"Los números racionales",short:"Racionales",c:"--l-rac"},
  rec:{name:"La recta real",short:"Recta real",c:"--l-rec"},
  alg:{name:"Álgebra básica",short:"Álgebra",c:"--l-alg"},
  ecu:{name:"Ecuaciones",short:"Ecuaciones",c:"--l-ecu"},
  bie:{name:"Bienestar y aprendizaje",short:"Bienestar",c:"--l-bie"}};
/* Plano: cinco líneas de matemáticas en columnas, numeradas en el orden recomendado (1 Enteros → 5 Ecuaciones),
   más Bienestar. Cada línea empieza en su propia estación de diagnóstico. Un pasillo de transbordo une las cabeceras
   para que el viajero pueda caminar de una línea a otra; las líneas no forman una secuencia. */
const LNUM={ent:1,rac:2,rec:3,alg:4,ecu:5};
const COLX={bie:60,ent:235,rac:410,rec:585,alg:760,ecu:935},HEADY=110,ST0=185,STEP=70;
const PATHS={pas:[[COLX.bie,HEADY],[COLX.ecu,HEADY]]};
const ST=[];
const LABS={ent:[["Sumando","y restando"],["Calcular","con economía"],["Diferencias","y paréntesis"],["Las caras","del menos"],["Una sola","fórmula"],["Productos","con signo"]],
  rac:[["Repartir","y medir"],["Fracciones","equivalentes"],["Comparar","y ordenar"],["Sumar y restar","fracciones"],["Multiplicar","y dividir"],["Decimales y","porcentajes"]],
  rec:[["Decimales","periódicos"],["Números","irracionales"],["Densidad","y orden"],["Valor","absoluto"],["Intervalos"]],
  alg:[["Fórmulas","y patrones"],["Potencias"],["Productos","notables"],["Factorización"],["Fracciones","algebraicas"]],
  ecu:[["Igualdad y","equivalencia"],["Primer grado"],["Problemas con","ecuaciones"],["Sistemas 2 × 2"]],
  bie:[["Creencias sobre","las matemáticas"],["Cómo me veo","como estudiante"],["Cómo organizo","mi estudio"],["Ansiedad ante","las matemáticas"]]};
LABS.ecu.push(["Inecuaciones"]);
const PREF={ent:"E",rac:"R",rec:"L",alg:"A",ecu:"Q",bie:"B"},DIAGID={ent:"Dent",rac:"Drac",rec:"Drec",alg:"Dalg",ecu:"Decu"};
for(const l of Object.keys(COLX)){const x=COLX[l];
  if(l==="bie")ST.push({id:"Bhub",line:"bie",x,y:HEADY,lab:[],hidden:true,built:true});
  else ST.push({id:DIAGID[l],line:l,x,y:HEADY,lab:["Diagnóstico"],lp:"rtop",diag:true,built:true});
  LABS[l].forEach((lab,k)=>ST.push({id:PREF[l]+(k+1),line:l,x,y:ST0+k*STEP,lab,lp:"right"}));
  PATHS[l]=[[x,HEADY],[x,ST0+(LABS[l].length-1)*STEP]]}
const STM=Object.fromEntries(ST.map(s=>[s.id,s]));
const SEQS=[["Bhub","Dent","Drac","Drec","Dalg","Decu"],...Object.keys(COLX).map(l=>ST.filter(x=>x.line===l).map(x=>x.id))];
const ADJ={};SEQS.forEach(q=>q.forEach((id,i)=>{ADJ[id]=ADJ[id]||new Set();if(i>0)ADJ[id].add(q[i-1]);if(i<q.length-1)ADJ[id].add(q[i+1])}));
// Una estación está construida cuando su línea la registró (js/lineas/*.js o js/bienestar.js)
ST.forEach(s=>{if(s.diag||s.hidden)return;if(s.line==="bie")s.built=!!SOCIO[s.id];else s.built=!!NODES[s.id]});
const MLINES=["ent","rac","rec","alg","ecu"];
const LSEQ={};MLINES.forEach(l=>LSEQ[l]=ST.filter(s=>s.line===l&&s.built&&!s.diag).map(s=>s.id));
const ACTIVE=MLINES.filter(l=>LSEQ[l].length);
const MATH=ACTIVE.flatMap(l=>LSEQ[l]);
const ENT=LSEQ.ent;
const BUILT=[...MATH,...BIE_IDS];
const lineOf=id=>(STM[id]||{}).line;

const diagN=l=>2*LSEQ[l].length;
function buildDiag(seed,line){const R=rng(seed),out=[];
  LSEQ[line].forEach(id=>{const its=RETO[id].map((g,i)=>({...g(rng(seed+id+i)),node:id})).filter(x=>!["match","bins","cancel"].includes(x.type));R.sh(its).slice(0,2).forEach(x=>out.push(x))});return out}

const FACES=["Muy mal","Mal","Normal","Bien","Muy bien"],DIFS=["Nada difícil","Poco","Algo","Bastante","Muy difícil"],APRS=["Nada nuevo","Un poco","Bastante","Mucho"];
function faceSVG(i){const curve=[-7,-3.5,0,4,7][i],my=i<2?29:26;
  return`<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="var(--surface-2)" stroke="var(--muted)" stroke-width="1.8"/><circle cx="14" cy="16" r="2.2" fill="var(--ink)"/><circle cx="26" cy="16" r="2.2" fill="var(--ink)"/><path d="M12 ${my} Q20 ${my+curve} 28 ${my}" fill="none" stroke="var(--ink)" stroke-width="2.2" stroke-linecap="round"/></svg>`}
function reflMsg(r,st){if(!r)return"";const m=[];
  if(r.emo!=null){if(r.emo<=1)m.push("Gracias por contarlo. Sentirse incómodo o incómoda con un tema nuevo es normal. Si te pasa a menudo, la estación «Ansiedad ante las matemáticas» de la línea Bienestar puede ayudarte.");
    else if(r.emo>=3)m.push("Qué bien que te sentiste a gusto: esa sensación ayuda a seguir aprendiendo.")}
  if(r.dif!=null){if(r.dif>=3&&st>=2)m.push("Te pareció difícil y aun así lo resolviste: ese esfuerzo es justamente lo que hace que se aprenda.");
    else if(r.dif>=3)m.push("Es una estación exigente. Volver a la exploración antes de repetir el reto suele ayudar mucho.");
    else if(r.dif<=1&&st===3)m.push("Te resultó fácil: puedes avanzar con confianza.")}
  if(r.apr!=null){if(r.apr===0&&st===3)m.push("Si sientes que no aprendiste nada nuevo, quizá ya dominabas este tema; la siguiente estación te planteará retos distintos.");
    else if(r.apr>=1)m.push("Escribe en el recuadro, con tus palabras, qué fue lo nuevo: explicarlo ayuda a fijarlo.")}
  return m.join(" ")}

/* ============ estado y almacenamiento ============ */
function freshState(){return{v:1,nombre:"",grupo:"",avatar:"coral",current:"Dent",nodes:{},diags:{},bie:{},updatedAt:0}}
let S=freshState();
let BIE={ans:{},hist:{},notes:{},plan:[],goal:""};
const RT={db:null,auth:null,uid:null,email:"",teacher:false,saving:false,dirty:false,unsubPanel:null,view:"auth",registering:false,guest:false};
let saveT;
function save(){S.updatedAt=Date.now();if(!RT.uid)return;clearTimeout(saveT);saveT=setTimeout(flush,700)}
async function flush(){if(!RT.uid)return;if(RT.saving){RT.dirty=true;return}RT.saving=true;
  try{await RT.db.doc("progreso/"+RT.uid).set({...JSON.parse(JSON.stringify(S)),email:RT.email,uid:RT.uid})}
  catch(e){toast(dbMsg(e));setTimeout(()=>{RT.saving=false;flush()},8000);return}
  RT.saving=false;if(RT.dirty){RT.dirty=false;flush()}}
let bieT;
function saveBie(){if(!RT.uid||!bieAllowed())return;clearTimeout(bieT);bieT=setTimeout(async()=>{try{await RT.db.doc("bienestar/"+RT.uid).set(JSON.parse(JSON.stringify({...BIE,updatedAt:Date.now()})))}catch(e){toast("No se pudieron guardar tus respuestas. Revisa tu conexión.")}},500)}
const nodeSt=id=>(S.nodes[id]=S.nodes[id]||{moment:0,max:0,results:{},done:false,stars:0});
const conv=id=>{const d=S.diags&&S.diags[lineOf(id)];return!!(d&&d.conv&&d.conv.includes(id))};
const hasDiag=()=>!!(S.diags&&Object.keys(S.diags).length);
const isDone=id=>id[0]==="B"?!!(S.bie&&S.bie[id]):!!(S.nodes[id]&&S.nodes[id].done);
function unlocked(id){const s=STM[id];if(!s||!s.built)return false;if(RT.guest)return true;if(s.diag||id[0]==="B")return true;
  const seq=LSEQ[lineOf(id)]||[],k=seq.indexOf(id);if(k===0)return true;if(k>0){const p=seq[k-1];return isDone(p)||conv(p)||conv(id)}return false}
function nextTarget(){const l=lineOf(S.current);const order=LSEQ[l]&&LSEQ[l].length?[...LSEQ[l],...MATH]:MATH;return order.find(id=>unlocked(id)&&!isDone(id)&&!conv(id))}

/* ============ cabecera y navegación ============ */
function renderProg(){const n=BUILT.filter(id=>isDone(id)||conv(id)).length;
  const stars=MATH.reduce((a,id)=>a+(S.nodes[id]&&S.nodes[id].stars||0),0);
  $("#prog").innerHTML=`<span>${n} de ${BUILT.length} estaciones</span><span class="bar" aria-hidden="true"><i style="width:${Math.round(n/BUILT.length*100)}%"></i></span><span class="stars" title="Estrellas ganadas en los retos">★ ${stars}</span>`;
  $("#greet").textContent=S.nombre?`Hola, ${S.nombre}. ¿A qué estación vas?`:"Elige una estación"}
function showView(v){RT.view=v;if(typeof stopBreath==="function")stopBreath();["map","node","me","panel","auth"].forEach(k=>$("#view-"+k).hidden=k!==v);
  $("#tab-map").setAttribute("aria-current",v==="map"||v==="node"?"page":"false");$("#tab-me").setAttribute("aria-current",v==="me"?"page":"false");$("#tab-panel").setAttribute("aria-current",v==="panel"?"page":"false");
  if(v!=="panel"&&RT.unsubPanel){RT.unsubPanel();RT.unsubPanel=null}
  window.scrollTo({top:0,behavior:reduceMotion?"auto":"smooth"})}
$("#tab-map").onclick=()=>{showView("map");renderMap()};
$("#tab-me").onclick=()=>{renderMe();showView("me")};
$("#tab-panel").onclick=()=>{renderPanel();showView("panel")};
function showNotice(msg,action){const n=$("#notice");n.hidden=!msg;n.textContent=msg||"";
  if(msg&&action){const b=document.createElement("button");b.className="linkbtn";b.style.marginLeft="8px";b.textContent=action.label;b.onclick=action.fn;n.appendChild(b)}}
function leaveGuest(){RT.guest=false;S=freshState();BIE=freshBie();$("#who").hidden=true;$("#modal").hidden=true;showNotice("");showView("auth");renderAuth("login")}
function enterGuest(){RT.guest=true;RT.uid=null;RT.email="";RT.teacher=false;S=freshState();BIE=freshBie();
  enterApp(false);showNotice("Estás explorando sin cuenta: puedes abrir todas las estaciones, pero tu avance no se guarda.",{label:"Crear una cuenta",fn:leaveGuest})}
$("#tab-out").onclick=async()=>{if(RT.guest){leaveGuest();return}clearTimeout(saveT);if(RT.uid)await flush();if(RT.unsubPanel){RT.unsubPanel();RT.unsubPanel=null}await RT.auth.signOut()};

/* ============ avatar: estudiante con su morral ============ */
/* Viajeros: aspectos variados (pelo, piel, ropa, gafas, falda, hiyab). Los ids antiguos (coral, sol, menta, lila) siguen valiendo. */
const AVATARS={
  coral:{lab:"Pelo corto",shirt:"var(--av-coral)",skin:"#D9A47E",hair:"#3A281C",style:"short"},
  sol:{lab:"Pelo largo",shirt:"var(--av-sol)",skin:"#F1C9A5",hair:"#6B4226",style:"long",skirt:true},
  menta:{lab:"Coleta",shirt:"var(--av-menta)",skin:"#8D5A3B",hair:"#21150E",style:"pony"},
  lila:{lab:"Pelo rizado",shirt:"var(--av-lila)",skin:"#6E4429",hair:"#1B120C",style:"afro"},
  cielo:{lab:"Trenzas",shirt:"var(--l-ent)",skin:"#B07850",hair:"#2A1A12",style:"braids",skirt:true},
  arena:{lab:"Hiyab",shirt:"var(--l-rac)",skin:"#C99272",hair:"#1F5F8B",style:"hijab",skirt:true},
  bosque:{lab:"Gafas",shirt:"var(--l-rec)",skin:"#F1C9A5",hair:"#C9973F",style:"short",glasses:true},
  ciruela:{lab:"Moño",shirt:"var(--l-ecu)",skin:"#A8714B",hair:"#3A2416",style:"bun",glasses:true}
};
const AVS=Object.keys(AVATARS);
const avOf=id=>AVATARS[id]||AVATARS.coral;
function avatarSVG(id,still,left){const a=avOf(id),H=a.hair,st=a.style;
  const fringe=`<path d="M-5.1 -21.2 Q-4.8 -27.4 1 -27 Q6 -26.5 6.3 -21.6 Q3.4 -24.4 -5.1 -21.2 Z" fill="${H}"/>`;
  const back=st==="long"?`<path d="M-5.6 -23 Q-7.2 -16 -5.8 -12.6 L-0.6 -12.8 L-0.2 -21 Z" fill="${H}"/>`
    :st==="pony"?`<path d="M-4.4 -24.6 Q-10.4 -24 -9.4 -15.6 Q-8 -19.6 -4.6 -21.4 Z" fill="${H}"/><circle cx="-5" cy="-23.6" r="1.4" fill="var(--av-coral)"/>`
    :st==="afro"?`<circle cx="-0.2" cy="-22.6" r="7.9" fill="${H}"/>`
    :st==="bun"?`<circle cx="-3.4" cy="-27.4" r="2.9" fill="${H}"/>`
    :st==="braids"?`<path d="M-4.2 -21 Q-6.2 -17 -5.6 -11.6" fill="none" stroke="${H}" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="1.6 0.9"/><path d="M-1.8 -17 Q-2.6 -14 -2.2 -11.2" fill="none" stroke="${H}" stroke-width="2" stroke-linecap="round" stroke-dasharray="1.6 0.9"/>`
    :st==="hijab"?`<path d="M0.6 -28.2 Q-7.6 -28.4 -7.4 -20 Q-7.6 -13.6 -1.6 -12.6 L5 -13.6 Q2 -15.6 0.6 -18 Z" fill="${H}"/>`:"";
  const front=st==="afro"?"":st==="hijab"?`<path d="M6.9 -21.2 Q7 -28.4 0.6 -28.2 Q-6 -28 -6.3 -21 Q-3.6 -25.6 1.2 -25.4 Q5.2 -25.2 6.9 -21.2 Z" fill="${H}"/>`:fringe;
  return `<g class="${still?"":"bob"}"><g class="fig"${left?' transform="scale(-1,1)"':""}>
  <ellipse cx="0" cy="12.5" rx="9" ry="2.6" fill="var(--ink)" fill-opacity=".18"/>
  <rect x="-11" y="-13.5" width="8" height="13.5" rx="2.8" fill="var(--bag)" stroke="var(--surface)" stroke-width="1.4"/>
  <rect x="-9.8" y="-6.5" width="5.6" height="4.2" rx="1.2" fill="var(--bag-2)"/>
  <path class="leg leg-a" d="M-3.2 5 L-3.6 11.8" stroke="var(--legs)" stroke-width="3.3" stroke-linecap="round"/><path class="leg leg-b" d="M2.4 5 L2.9 11.8" stroke="var(--legs)" stroke-width="3.3" stroke-linecap="round"/>
  <path d="M-6 -11.5 Q-6.2 -14.6 -1.5 -14.6 L1.8 -14.6 Q6 -14.6 5.7 -10.5 L5.2 6 L-5.6 6 Z" fill="${a.shirt}" stroke="var(--surface)" stroke-width="1.4"/>
  ${a.skirt?`<path d="M-5.8 2.6 L5.4 2.6 L7.2 8.4 L-7.4 8.4 Z" fill="${a.shirt}" stroke="var(--surface)" stroke-width="1.2"/><path d="M-5.8 2.6 L5.4 2.6" stroke="var(--ink)" stroke-opacity=".25" stroke-width="1"/>`:""}
  <path d="M-4.6 -13.8 L3.6 -1.2" stroke="var(--bag)" stroke-width="2.3" stroke-linecap="round"/>
  ${back}
  <circle cx="0.6" cy="-20.6" r="5.7" fill="${a.skin}" stroke="var(--surface)" stroke-width="1.4"/>
  ${front}
  <circle cx="3.5" cy="-20.2" r="0.95" fill="var(--ink)"/>
  ${a.glasses?`<rect x="2.1" y="-21.7" width="3.4" height="2.6" rx="1" fill="#fff" fill-opacity=".35" stroke="var(--ink)" stroke-width="0.55"/><path d="M2.1 -20.8 L-1.2 -21.6" stroke="var(--ink)" stroke-width="0.55" stroke-linecap="round"/>`:""}</g></g>`}

// El viajero se para encima de su estación; la etiqueta de esa estación sube para dejarle sitio.
function avPos(id){const s=STM[id]||STM.Dent;return `translate(${s.x}px,${s.y-20}px)`}

/* ============ plano ============ */
const NS="http://www.w3.org/2000/svg";
function stState(s){if(!s.built)return"soon";if(s.diag)return S.diags&&S.diags[s.line]?"done":"open";if(isDone(s.id))return"done";if(conv(s.id))return"conv";if(!unlocked(s.id))return"locked";const ns=S.nodes[s.id];return ns&&ns.max>0?"prog":"open"}
function renderMap(){if(!STM[S.current]||STM[S.current].hidden)S.current="Dent";
  const svg=$("#map");const col=l=>`var(${LINES[l]?LINES[l].c:"--ink"})`;let h="";
  // pasillo de transbordo entre cabeceras
  h+=`<polyline points="${PATHS.pas.map(p=>p.join(",")).join(" ")}" fill="none" stroke="var(--rule)" stroke-width="7" stroke-linecap="round" stroke-dasharray="2 9"/>`;
  // líneas y sus cabeceras numeradas
  for(const l of Object.keys(COLX)){const pts=PATHS[l],built=l==="bie"||ACTIVE.includes(l),x=COLX[l];
    h+=`<polyline points="${pts.map(p=>p.join(",")).join(" ")}" fill="none" stroke="${col(l)}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" ${built?"":'stroke-opacity=".32"'}/>`;
    const ids=ST.filter(s=>s.line===l&&s.built&&!s.diag&&!s.hidden).map(s=>s.id),done=ids.filter(id=>isDone(id)||conv(id)).length;
    h+=`<g class="lhead"><circle cx="${x+30}" cy="40" r="13" fill="${col(l)}"/><text x="${x+30}" y="45" text-anchor="middle" class="lnum">${LNUM[l]||"♥"}</text>
      <text x="${x+50}" y="38" class="lname" fill="${col(l)}">${LINES[l].short}</text><text x="${x+50}" y="54" class="lcount">${done} de ${ids.length}</text></g>`}
  // estaciones
  const tgt=nextTarget();
  for(const s of ST){if(s.hidden)continue;const st=stState(s);const c=col(s.line);
    const r=s.diag?13:9;
    let lx=s.x,ly=s.y,anchor="middle",lines=s.lab;
    if(s.lp==="rtop"){lx=s.x+20;anchor="start";ly=s.y-12}else if(s.lp==="top"){ly=s.y-22-(lines.length-1)*15-(s.id===S.current?40:0)}else if(s.lp==="bottom"){ly=s.y+28}else if(s.lp==="right"){lx=s.x+20;anchor="start";ly=s.y+4-(lines.length-1)*7.5}else{lx=s.x-20;anchor="end";ly=s.y+4-(lines.length-1)*7.5}
    const ring=st==="soon"?"var(--l-off)":st==="locked"?"var(--l-off)":c;
    const fill=st==="done"||st==="conv"?c:"var(--surface)";
    const label=`${s.lab.join(" ")}. ${st==="soon"?"En construcción":st==="locked"?"Bloqueada":st==="done"?"Completada":st==="conv"?"Convalidada en el diagnóstico":st==="prog"?"En curso":"Disponible"}`;
    h+=`<g class="st ${st}" data-id="${s.id}" tabindex="0" role="button" aria-label="${esc(label)}">`;
    if(s.id===tgt&&!reduceMotion)h+=`<circle class="pulse" cx="${s.x}" cy="${s.y}" r="${r}" fill="none" stroke="${c}" stroke-width="3"/>`;
    h+=`<circle class="ring" cx="${s.x}" cy="${s.y}" r="${r+4}" fill="transparent" stroke="transparent"/>`;
    h+=`<circle class="dot" cx="${s.x}" cy="${s.y}" r="${st==="soon"?6:r}" fill="${fill}" stroke="${ring}" stroke-width="${st==="soon"?3:4}" ${st==="conv"?'stroke-dasharray="4 3"':""}/>`;
    if(st==="done"&&!s.diag)h+=`<path d="M${s.x-4} ${s.y} l3 3.5 l5.5 -6.5" fill="none" stroke="var(--surface)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    if(st==="locked")h+=`<rect x="${s.x-3.5}" y="${s.y-1}" width="7" height="5.5" rx="1" fill="var(--l-off)"/><path d="M${s.x-2} ${s.y-1} v-1.8 a2 2 0 0 1 4 0 v1.8" fill="none" stroke="var(--l-off)" stroke-width="1.5"/>`;
    if(s.diag)h+=`<text x="${s.x}" y="${s.y+4.5}" text-anchor="middle" style="font-size:12px;font-weight:800;fill:${st==="done"?"var(--surface)":"var(--ink)"}">${st==="done"?"✓":"?"}</text>`;
    h+=`<text text-anchor="${anchor}" x="${lx}" y="${ly}">${lines.map((t,i)=>`<tspan x="${lx}" dy="${i?15:0}">${esc(t)}</tspan>`).join("")}</text></g>`}
  // avatar
  h+=`<g id="avatar" style="transform:${avPos(S.current)}" aria-hidden="true"><g transform="scale(1.3)">${avatarSVG(S.avatar,false,RT.faceLeft)}</g></g>`;
  svg.innerHTML=h;
  $$(".st",svg).forEach(g=>{const go=()=>clickStation(g.dataset.id);g.addEventListener("click",go);g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}})});
  renderProg()}
function route(a,b){if(a===b)return[a];const prev={[a]:null},q=[a];
  while(q.length){const x=q.shift();for(const y of ADJ[x]||[]){if(!(y in prev)){prev[y]=x;if(y===b){const r=[b];let z=b;while(prev[z]){z=prev[z];r.unshift(z)}return r}q.push(y)}}}return[a,b]}
let moving=false;
// Geometría de las líneas para que el viajero camine por el trazado, curvas incluidas
const LGEO={};for(const [l,pts] of Object.entries(PATHS)){let acc=0;const seg=[];for(let k=1;k<pts.length;k++){const [x0,y0]=pts[k-1],[x1,y1]=pts[k],L=Math.hypot(x1-x0,y1-y0);seg.push({x0,y0,x1,y1,L,s0:acc});acc+=L}LGEO[l]=seg}
function proj(l,x,y){let best=null;for(const g of LGEO[l]){const t=Math.max(0,Math.min(1,((x-g.x0)*(g.x1-g.x0)+(y-g.y0)*(g.y1-g.y0))/(g.L*g.L)));const px=g.x0+t*(g.x1-g.x0),py=g.y0+t*(g.y1-g.y0),d=Math.hypot(px-x,py-y);if(!best||d<best.d)best={d,s:g.s0+t*g.L}}return best}
function ptAt(l,s){const seg=LGEO[l];for(const g of seg)if(s<=g.s0+g.L+1e-6){const t=g.L?(s-g.s0)/g.L:0;return[g.x0+t*(g.x1-g.x0),g.y0+t*(g.y1-g.y0)]}const g=seg[seg.length-1];return[g.x1,g.y1]}
function edgePts(a,b){const A=STM[a],B=STM[b];for(const l of Object.keys(LGEO)){const pa=proj(l,A.x,A.y),pb=proj(l,B.x,B.y);
  if(pa.d<2&&pb.d<2){const lo=Math.min(pa.s,pb.s),hi=Math.max(pa.s,pb.s);let cs=LGEO[l].map(g=>g.s0).filter(v=>v>lo+.5&&v<hi-.5);if(pa.s>pb.s)cs=cs.reverse();return[pa.s,...cs,pb.s].map(v=>ptAt(l,v))}}
  return[[A.x,A.y],[B.x,B.y]]}
async function moveAvatar(to){if(!STM[S.current]||STM[S.current].hidden)S.current="Dent";const av=$("#avatar");if(!av||S.current===to){S.current=to;save();return}
  const path=route(S.current,to);let pts=[];path.slice(1).forEach((id,k)=>{const e=edgePts(path[k],id);pts=pts.concat(k?e.slice(1):e)});
  moving=true;
  if(!reduceMotion&&pts.length>1){const segs=[];let L=0;for(let k=1;k<pts.length;k++){const d=Math.hypot(pts[k][0]-pts[k-1][0],pts[k][1]-pts[k-1][1]);segs.push({a:pts[k-1],b:pts[k],d,s0:L});L+=d}
    const speed=Math.max(150,L/3.5),fig=$(".fig",av);av.classList.add("walking");
    await new Promise(res=>{const t0=performance.now();const step=t=>{const sd=Math.min(L,(t-t0)/1000*speed);const g=segs.find(q=>sd<=q.s0+q.d)||segs[segs.length-1];const u=g.d?(sd-g.s0)/g.d:1;
      const x=g.a[0]+u*(g.b[0]-g.a[0]),y=g.a[1]+u*(g.b[1]-g.a[1]);const dx=g.b[0]-g.a[0];if(Math.abs(dx)>.5){RT.faceLeft=dx<0;if(fig)fig.setAttribute("transform",RT.faceLeft?"scale(-1,1)":"")}
      av.style.transform=`translate(${x}px,${y-20}px)`;if(sd<L)requestAnimationFrame(step);else res()};requestAnimationFrame(step)});
    av.classList.remove("walking")}
  S.current=to;moving=false;save();if(RT.view==="map")renderMap()}
function lineAdvice(id){const l=lineOf(id),n=LNUM[l];if(!n||n===1||RT.guest)return"";const prev=MLINES[n-2],started=LSEQ[prev].some(x=>isDone(x)||conv(x))||(S.diags&&S.diags[prev]);
  return started?"":`Te recomendamos empezar por la línea ${n-1} (${LINES[prev].short}): las líneas están numeradas en el orden en que se apoyan unas en otras.`}
async function clickStation(id){if(moving)return;const s=STM[id];if(!s||s.hidden)return;
  if(!s.built){toast(`«${s.lab.join(" ")}» está en construcción. Llegará en la próxima versión.`);return}
  if(!unlocked(id)){const seq=LSEQ[lineOf(id)],k=seq.indexOf(id);toast(`Completa «${NODES[seq[k-1]].title}» o haz el diagnóstico para desbloquear esta estación.`);return}
  await moveAvatar(id);if(!reduceMotion)await sleep(120);
  const adv=(s.diag||LSEQ[s.line]&&LSEQ[s.line][0]===id)?lineAdvice(id):"";if(adv)toast(adv);
  if(s.diag)openDiag(s.line);else if(id[0]==="B")openSocio(id);else openNode(id)}

/* ============ arrastre (ratón y pantalla táctil) ============ */
function dragify(el,{onDrop,onTap,can}){
  el.addEventListener("pointerdown",e=>{if(e.button>0||(can&&!can()))return;e.preventDefault();
    const r=el.getBoundingClientRect(),ox=e.clientX-r.left,oy=e.clientY-r.top,sx=e.clientX,sy=e.clientY;let moved=false,ghost=null,hi=null;
    const mv=ev=>{if(!moved&&Math.hypot(ev.clientX-sx,ev.clientY-sy)>5){moved=true;ghost=el.cloneNode(true);ghost.classList.add("ghost");ghost.classList.remove("sel");ghost.style.width=r.width+"px";document.body.appendChild(ghost);el.classList.add("dragging")}
      if(moved){ghost.style.left=ev.clientX-ox+"px";ghost.style.top=ev.clientY-oy+"px";const t=dropAt(ev.clientX,ev.clientY);if(hi!==t){hi&&hi.classList.remove("drop-hi");hi=t;hi&&hi.classList.add("drop-hi")}}};
    const up=ev=>{window.removeEventListener("pointermove",mv);window.removeEventListener("pointerup",up);window.removeEventListener("pointercancel",up);
      hi&&hi.classList.remove("drop-hi");if(ghost)ghost.remove();el.classList.remove("dragging");
      if(moved&&ev.type==="pointerup")onDrop(dropAt(ev.clientX,ev.clientY),ev.clientX);else if(!moved)onTap&&onTap()};
    window.addEventListener("pointermove",mv);window.addEventListener("pointerup",up);window.addEventListener("pointercancel",up)})}
function dropAt(x,y){const t=document.elementFromPoint(x,y);return t?t.closest("[data-drop]"):null}

/* ============ motor de ejercicios ============ */
function mountItem(box,item,opts){
  // opts: {idx,total,prev,single,key,onResult}
  const single=!!opts.single;let attempts=0,finished=false;
  box.className="ex";
  box.innerHTML=`<span class="exn">${opts.label||"Reto"} ${opts.idx+1} de ${opts.total}</span><div class="q">${item.q}</div>${item.fig?`<div class="exfig">${item.fig}</div>`:""}<div class="area"></div><div class="fbz" aria-live="polite"></div>`;
  const area=$(".area",box),fbz=$(".fbz",box);
  const fb=(cls,title,text)=>{fbz.innerHTML=`<div class="fb ${cls}"><b>${title}</b>${text?`<span>${text}</span>`:""}</div>`};
  function finish(res,silent){finished=true;
    if(single){fb(res==="first"?"ok":"bad",res==="first"?"Correcto.":"Incorrecto.",res==="first"?"":`Respuesta: ${correctText()}`)}
    else{const t=res==="first"?"¡Bien, a la primera!":res==="hint"?"Correcto, con ayuda de la pista.":"Esta vez no salió. Aquí está la respuesta.";
      fb(res==="shown"?"bad":"ok",t,(res==="shown"?`Respuesta: <span class="m">${esc(correctText())}</span>. `:"")+(item.explain||""))}
    if(!silent)opts.onResult(res)}
  function wrong(extra){attempts++;
    if(single){finish("shown");return true}
    if(attempts===1){fb("hint","Todavía no. Pista:",(extra?extra+" ":"")+(item.hint||"Revisa con calma cada paso."));return false}
    finish("shown");return true}
  function correctText(){if(item.type==="choice")return item.opts[0].replace(/<[^>]+>/g,"");if(item.type==="fill")return item.kind==="pair"?`x = ${fmt(item.answer[0])}, y = ${fmt(item.answer[1])}`:item.kind==="num"?(item.show||fmt(item.answer)):item.show;
    if(item.type==="order")return item.correct.join("  <  ");if(item.type==="line")return item.den>1?frs(Math.round(item.answer*item.den),item.den):fmt(item.answer);if(item.type==="shade"||item.type==="slider")return item.show||"";if(item.type==="bins")return item.bins.join(" · ");if(item.type==="cancel")return "tachar "+item.pairsIdx.length+" términos";if(item.type==="match")return item.pairs.map(p=>p[0]+" → "+p[1]).join(";  ");return""}

  if(item.type==="choice"){
    const order=shuffle(item.opts.map((t,i)=>({t,i})),opts.key);
    area.innerHTML=`<div class="opts">${order.map(o=>`<button class="opt" data-i="${o.i}">${o.t}</button>`).join("")}</div>`;
    const btns=$$(".opt",area);
    const reveal=()=>{btns.forEach(b=>{b.disabled=true;if(b.dataset.i==="0")b.classList.add("right")})};
    btns.forEach(b=>b.onclick=()=>{if(finished)return;
      if(b.dataset.i==="0"){b.classList.add("right");btns.forEach(x=>x.disabled=true);finish(attempts===0?"first":"hint")}
      else{b.classList.add("wrong");b.disabled=true;if(wrong())reveal()}});
    if(opts.prev){reveal();finish(opts.prev,true)}}

  else if(item.type==="fill"&&item.kind==="pair"){
    area.innerHTML=`<div class="fillrow pair"><label>x = <input type="text" autocomplete="off" spellcheck="false" aria-label="Valor de x"></label><label>y = <input type="text" autocomplete="off" spellcheck="false" aria-label="Valor de y"></label><button class="btn primary">Comprobar</button></div><span class="tip">Escribe el valor de cada incógnita. Puede ser negativo o una fracción.</span>`;
    const ins=$$("input",area),btn=$("button",area);
    const lock=()=>{ins.forEach((i,k)=>{i.disabled=true;i.value=fmt(item.answer[k]);i.classList.add("okv")});btn.disabled=true};
    const check=()=>{if(finished)return;const vals=[];for(const i of ins){const t=i.value.trim();if(!t){fb("info","Escribe los dos valores.","");return}try{const a=parseExpr(t);if(varsOf(a).size)throw 0;vals.push(evalAst(a,{}))}catch(e){fb("info","No entendí alguno de los valores.","Escribe solo números, como -3 o 5/2.");return}}
      if(vals.every((x,k)=>Math.abs(x-item.answer[k])<1e-9)){lock();finish(attempts===0?"first":"hint")}else if(wrong())lock()};
    btn.onclick=check;ins.forEach(i=>i.addEventListener("keydown",e=>{if(e.key==="Enter")check()}));
    if(opts.prev){lock();finish(opts.prev,true)}}

  else if(item.type==="fill"){
    area.innerHTML=`<div class="fillrow"><input type="text" inputmode="${item.kind==="num"?"text":"text"}" autocomplete="off" spellcheck="false" aria-label="Tu respuesta" id="in-${opts.key}" placeholder="${item.kind==="ineq"?"Por ejemplo: x < 4":item.kind==="num"?"Escribe un número":item.kind==="frac"?"Escribe una fracción, como 3/4":item.kind==="between"?"Escribe un número, como 2,35":"Escribe la expresión"}"><button class="btn primary">Comprobar</button></div><span class="tip">${item.kind==="ineq"?"Escribe la solución despejando x: x < 4, x > -2, x <= 5 o x >= 1/2 (también sirven ≤ y ≥).":item.kind==="num"?"Para un negativo, escribe el signo menos: -7. Para decimales usa la coma: 0,75. Para miles no pongas puntos: 1500.":item.kind==="frac"?"Escribe la fracción con una barra: 3/4. Para un negativo: -5/12.":item.kind==="between"?"Escribe un decimal con coma, como 2,35, o una fracción, como 3/4.":"Puedes escribir 2x, a-5, (x+1). Para potencias usa ^, como x^2."}</span>`;
    const inp=$("input",area),btn=$("button",area);
    const lock=()=>{inp.disabled=true;btn.disabled=true;inp.value=item.kind==="num"?(item.show||fmt(item.answer)):item.show;inp.classList.add("okv")};
    const check=()=>{if(finished)return;const v=inp.value.trim();if(!v)return;let ast;
      if(item.kind==="ineq"){const r=parseIneq(v);if(!r){fb("info","Escribe la solución despejando x.","Por ejemplo: x < 4, x >= -2 o x ≤ 1/2.");return}
        if(r.op===item.op&&Math.abs(r.val-item.value)<1e-9){lock();finish(attempts===0?"first":"hint")}else if(wrong(r.op!==item.op&&Math.abs(r.val-item.value)<1e-9?"El número límite es correcto, pero revisa el sentido de la desigualdad.":""))lock();return}
      try{ast=parseExpr(v)}catch(e){if(e&&e.message==="num"){fb("info","Revisa cómo escribiste el número.","Para decimales usa una sola coma: 0,75. Para miles no pongas puntos, o ponlos de tres en tres: 1500 o 1.500.");return}fb("info","No entendí lo que escribiste.","Usa números, las letras de las cantidades Variables, +, −, paréntesis y ^ para potencias.");return}
      let ok=false;
      if(item.kind==="num"){ok=varsOf(ast).size===0&&Math.abs(evalAst(ast,{})-item.answer)<1e-9}
      else if(item.kind==="frac"){if(varsOf(ast).size){fb("info","Escribe un número o una fracción, sin letras.","");return}const val=evalAst(ast,{});const eq=Math.abs(val-item.answer)<1e-9;
        if(!eq&&/[.,]/.test(v)&&Math.abs(val-item.answer)<0.01){fb("info","Ese decimal se acerca, pero no es exacto.","Aquí se pide el valor exacto: escríbelo como fracción, por ejemplo 7/9.");return}
        if(eq&&item.irreducible&&/[.,]/.test(v)){if(!single){fb("info","Ese es el valor correcto, pero aquí se pide una fracción.","Escríbela con la forma a/b, por ejemplo 3/4.");return}}
        else if(eq&&item.irreducible){const t=v.replace(/[−–]/g,"-").replace(/\s/g,""),mm=t.match(/^(-?)(\d+)(?:\/(\d+))?$/);
          if(!mm||(mm[3]&&gcd(+mm[2],+mm[3])!==1)||(mm[3]&&+mm[3]===1)){if(!single){fb("info","Es equivalente, pero todavía se puede simplificar.","Divide numerador y denominador por un divisor común, o escribe la fracción con la forma a/b.");return}}else ok=true}
        else ok=eq}
      else if(item.kind==="between"){if(varsOf(ast).size){fb("info","Escribe un número o una fracción, sin letras.","");return}const val=evalAst(ast,{});ok=val>item.lo+1e-12&&val<item.hi-1e-12}
      else{const target=parseExpr(item.answer);
        if(equivalent(ast,target)){
          const why=countTerms(ast)>item.maxTerms?["simplificar","Junta los términos que se puedan juntar."]:(item.noParens&&/[()]/.test(v))?["desarrollar","Quita los paréntesis multiplicando cada término."]
            :(item.noDiv&&/\//.test(v))?["simplificar","Factoriza el numerador y tacha los factores comunes: el resultado no lleva fracción."]
            :(item.onePow&&(/[*·(]/.test(v)||(v.match(/\^/g)||[]).length>1))?["escribir como una sola potencia","Usa las reglas de los exponentes para dejar una base y un exponente."]
            :(item.factor&&!isProduct(ast))?["factorizar","Escríbela como una multiplicación de factores, por ejemplo 3(x + 2) o (x + 1)(x − 1)."]:null;
          if(why&&!single){fb("info","Es equivalente, pero todavía se puede "+why[0]+".",why[1]);return}
          ok=!why}}
      if(ok){lock();finish(attempts===0?"first":"hint")}else{if(wrong())lock()}};
    btn.onclick=check;inp.addEventListener("keydown",e=>{if(e.key==="Enter")check()});
    if(opts.prev){lock();finish(opts.prev,true)}}

  else if(item.type==="order"){
    area.innerHTML=`<div class="chips" data-drop="row" aria-label="Fichas para ordenar"></div><div class="fillrow"><button class="btn primary">Comprobar orden</button><span class="tip">Arrastra las fichas, o toca dos para intercambiarlas.</span></div>`;
    const row=$(".chips",area),btn=$(".btn",area);let sel=null;
    const start=shuffle(item.items,opts.key+"o");const lockAll=()=>{$$(".chip",row).forEach(c=>{c.classList.add("locked");c.disabled=true});btn.disabled=true};
    const build=arr=>{row.innerHTML=arr.map(t=>`<button class="chip" data-drop="chip" data-v="${esc(t)}">${esc(t)}</button>`).join("");
      $$(".chip",row).forEach(c=>{
        dragify(c,{can:()=>!finished,onDrop:(t,x)=>{if(!t)return;if(t.dataset.drop==="chip"&&t!==c){const rr=t.getBoundingClientRect();if(x<rr.left+rr.width/2)row.insertBefore(c,t);else row.insertBefore(c,t.nextSibling)}else if(t===row)row.appendChild(c)},
          onTap:()=>{if(finished)return;if(sel&&sel!==c){const a=sel,b=c,n=b.nextSibling===a?b:b.nextSibling;row.insertBefore(b,a);row.insertBefore(a,n);a.classList.remove("sel");sel=null}else if(sel===c){c.classList.remove("sel");sel=null}else{sel=c;c.classList.add("sel")}}});
        c.addEventListener("keydown",e=>{if(finished)return;if(e.key==="ArrowLeft"&&c.previousElementSibling){row.insertBefore(c,c.previousElementSibling);c.focus();e.preventDefault()}if(e.key==="ArrowRight"&&c.nextElementSibling){row.insertBefore(c.nextElementSibling,c);c.focus();e.preventDefault()}})})};
    build(start);
    btn.onclick=()=>{if(finished)return;const cur=$$(".chip",row).map(c=>c.dataset.v);
      if(cur.join("|")===item.correct.join("|")){lockAll();finish(attempts===0?"first":"hint")}else if(wrong()){build(item.correct);lockAll()}};
    if(opts.prev){build(item.correct);lockAll();finish(opts.prev,true)}}

  else if(item.type==="match"){
    const rights=shuffle([...item.pairs.map(p=>p[1]),...(item.extra||[])],opts.key+"m");
    area.innerHTML=`<div class="mrows">${item.pairs.map((p,i)=>`<div class="mrow"><span class="left">${esc(p[0])}</span><span aria-hidden="true">=</span><div class="slot" data-drop="slot" data-i="${i}" tabindex="0" aria-label="Casilla para ${esc(p[0])}"></div></div>`).join("")}</div>
      <div class="chips" data-drop="bank">${rights.map(t=>`<button class="chip" data-v="${esc(t)}">${esc(t)}</button>`).join("")}</div>
      <div class="fillrow"><button class="btn primary chk">Comprobar</button><span class="tip">Arrastra cada ficha a su casilla, o toca una ficha y después la casilla.</span></div>`;
    const bank=$(".chips",area),slots=$$(".slot",area),btn=$(".chk",area);let sel=null;
    const place=(chip,target)=>{if(!target)return;if(target.dataset.drop==="slot"){const old=target.querySelector(".chip");const from=chip.parentElement;if(old&&old!==chip){from.dataset.drop==="slot"?from.appendChild(old):bank.appendChild(old)}target.appendChild(chip)}else if(target===bank)bank.appendChild(chip);
      slots.forEach(s=>s.classList.remove("okv","badv"))};
    $$(".chip",area).forEach(c=>dragify(c,{can:()=>!finished,onDrop:t=>place(c,t),onTap:()=>{if(finished)return;if(sel===c){c.classList.remove("sel");sel=null;return}sel&&sel.classList.remove("sel");sel=c;c.classList.add("sel")}}));
    const slotTap=s=>{if(finished||!sel)return;place(sel,s);sel.classList.remove("sel");sel=null};
    slots.forEach(s=>{s.addEventListener("click",()=>slotTap(s));s.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();slotTap(s)}})});
    bank.addEventListener("click",e=>{if(e.target===bank&&sel){place(sel,bank);sel.classList.remove("sel");sel=null}});
    const solve=()=>{const chips=$$(".chip",area);slots.forEach((s,i)=>{const c=chips.find(x=>x.dataset.v===item.pairs[i][1]&&!x._u);c._u=1;s.appendChild(c);s.classList.add("okv")});chips.forEach(c=>{c.classList.add("locked");c.disabled=true});btn.disabled=true};
    btn.onclick=()=>{if(finished)return;let all=true,ok=true;
      slots.forEach((s,i)=>{const c=s.querySelector(".chip");if(!c){all=false;return}const good=c.dataset.v===item.pairs[i][1];s.classList.toggle("okv",good);s.classList.toggle("badv",!good);if(!good)ok=false});
      if(!all){fb("info","Faltan casillas por llenar.","");return}
      if(ok){solve();finish(attempts===0?"first":"hint")}else if(wrong("Las casillas en rojo no corresponden.")){solve()}};
    if(opts.prev){solve();finish(opts.prev,true)}}

  else if(item.type==="line"){const {min,max}=item,den=item.den||1,nP=(max-min)*den;let val=null;const lab=v=>den===1?fmt(v):frs(Math.round(v*den),den);
    area.innerHTML=`<div class="svgwrap nl"><svg class="nlpick" viewBox="0 0 640 116" tabindex="0" role="slider" aria-label="Recta numérica: elige un número" aria-valuemin="${min}" aria-valuemax="${max}"></svg></div><div class="fillrow"><button class="btn primary">Comprobar</button><span class="tip">Toca o arrastra sobre la recta para marcar un número. Con el teclado, usa las flechas.</span></div>`;
    const svg=$("svg",area),btn=$(".btn",area),X=v=>30+(v-min)/(max-min)*580,snap=v=>Math.round(v*den)/den;
    const draw=ok=>{let g=`<line x1="20" y1="62" x2="620" y2="62" stroke="var(--rule)" stroke-width="2"/>`;
      for(let k=0;k<=nP;k++){const v=min+k/den,whole=k%den===0;g+=`<circle cx="${X(v)}" cy="62" r="${v===0?6:whole?4.8:3.2}" fill="${v===0?"var(--ink)":"var(--muted)"}"/>`+(whole?`<text x="${X(v)}" y="92" text-anchor="middle" style="font:${v===0?"700 ":""}15px var(--f-mono);fill:var(--muted)">${fmt(v)}</text>`:"")}
      (item.marks||[]).forEach(m=>g+=`<circle cx="${X(m.v)}" cy="62" r="8.5" fill="var(--l-rac)"/><text x="${X(m.v)}" y="${val===m.v?112:40}" text-anchor="middle" style="font:700 16px var(--f-mono);fill:var(--l-rac)">${m.label}</text>`);
      if(val!=null){const c=ok?"var(--ok)":"var(--linec)";g+=`<line x1="${X(val)}" y1="22" x2="${X(val)}" y2="50" stroke="${c}" stroke-width="3"/><circle cx="${X(val)}" cy="62" r="11" fill="${c}" stroke="var(--surface)" stroke-width="2.5"/><text x="${X(val)}" y="17" text-anchor="middle" style="font:700 16px var(--f-mono);fill:${c}">${lab(val)}</text>`}
      svg.innerHTML=g;svg.setAttribute("aria-valuenow",val??"")};
    const setV=v=>{if(finished)return;val=Math.max(min,Math.min(max,snap(v)));fbz.innerHTML="";draw()};
    dragOn(svg,{down:p=>{if(finished)return false;setV(min+(p.x-30)/580*(max-min))},move:p=>setV(min+(p.x-30)/580*(max-min))});
    svg.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="ArrowUp"){setV((val??min)+1/den);e.preventDefault()}if(e.key==="ArrowLeft"||e.key==="ArrowDown"){setV((val??min)-1/den);e.preventDefault()}});
    const lock=()=>{val=item.answer;btn.disabled=true;draw(true)};
    btn.onclick=()=>{if(finished)return;if(val==null){fb("info","Marca primero un número en la recta.","");return}
      if(Math.abs(val-item.answer)<1e-9){lock();finish(attempts===0?"first":"hint")}else if(wrong())lock()};
    draw();if(opts.prev){lock();finish(opts.prev,true)}}

  else if(item.type==="slider"){let v=item.start??item.min;const lab=k=>item.label?item.label(k):fmt(k);
    area.innerHTML=`<div class="sldfig"></div><div class="sldrow"><span class="sldname">${item.name||"Valor"}</span><input type="range" min="${item.min}" max="${item.max}" step="1" value="${v}" aria-label="${esc(item.name||"Valor")}">${item.hideValue?"":`<output class="m sldval"></output>`}<button class="btn primary">Comprobar</button></div><span class="tip">${item.tip||"Mueve el deslizador y pulsa «Comprobar». Con el teclado, usa las flechas."}</span>`;
    const fig=$(".sldfig",area),rg=$("input",area),out=$(".sldval",area),btn=$(".btn",area);
    const draw=ok=>{fig.innerHTML=item.render(v,ok);if(out)out.textContent=lab(v)};
    rg.oninput=()=>{if(finished)return;v=+rg.value;fbz.innerHTML="";draw()};
    const lock=()=>{v=item.answer;rg.value=v;rg.disabled=true;btn.disabled=true;draw(true)};
    btn.onclick=()=>{if(finished)return;const ok=item.check?item.check(v):v===item.answer;
      if(ok){lock();finish(attempts===0?"first":"hint")}else if(wrong(item.why?item.why(v):""))lock()};
    draw();if(opts.prev){lock();finish(opts.prev,true)}}

  else if(item.type==="bins"){const order=shuffle(item.items.map((it,i)=>({...it,i})),opts.key+"b");
    area.innerHTML=`<div class="bins">${item.bins.map((b,i)=>`<div class="bin" data-drop="bin" data-b="${i}" tabindex="0" aria-label="Grupo: ${esc(b)}"><span class="binlab">${b}</span><div class="binbody"></div></div>`).join("")}</div>
      <div class="chips" data-drop="bank">${order.map(it=>`<button class="chip" data-i="${it.i}">${it.t}</button>`).join("")}</div>
      <div class="fillrow"><button class="btn primary chk">Comprobar</button><span class="tip">Arrastra cada ficha a su grupo, o toca una ficha y después el grupo.</span></div>`;
    const bank=$(".chips",area),bins=$$(".bin",area),btn=$(".chk",area);let sel=null;
    const clear=()=>$$(".chip",area).forEach(c=>c.classList.remove("okc","badc"));
    const place=(chip,t)=>{if(!t)return;if(t.dataset.drop==="bin")$(".binbody",t).appendChild(chip);else if(t===bank)bank.appendChild(chip);clear()};
    $$(".chip",area).forEach(c=>dragify(c,{can:()=>!finished,onDrop:t=>place(c,t),onTap:()=>{if(finished)return;if(sel===c){c.classList.remove("sel");sel=null;return}sel&&sel.classList.remove("sel");sel=c;c.classList.add("sel")}}));
    const binTap=bn=>{if(finished||!sel)return;place(sel,bn);sel.classList.remove("sel");sel=null};
    bins.forEach(bn=>{bn.addEventListener("click",e=>{if(e.target.closest(".chip"))return;binTap(bn)});bn.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();binTap(bn)}})});
    const solve=()=>{$$(".chip",area).forEach(c=>{$(".binbody",bins[item.items[+c.dataset.i].bin]).appendChild(c);c.classList.remove("badc");c.classList.add("okc","locked");c.disabled=true});btn.disabled=true};
    btn.onclick=()=>{if(finished)return;if($$(".chip",bank).length){fb("info","Todavía quedan fichas sin colocar.","");return}let ok=true;
      $$(".chip",area).forEach(c=>{const good=+c.closest(".bin").dataset.b===item.items[+c.dataset.i].bin;c.classList.toggle("okc",good);c.classList.toggle("badc",!good);if(!good)ok=false});
      if(ok){solve();finish(attempts===0?"first":"hint")}else if(wrong("Las fichas en rojo están en otro grupo.")){solve()}};
    if(opts.prev){solve();finish(opts.prev,true)}}

  else if(item.type==="shade"){const C=item.cols,Rw=item.rows||1,N=C*Rw,cw=Rw===1?Math.min(60,560/C):34,ch=Rw===1?46:34;const on=new Array(N).fill(false);let paint=null;
    area.innerHTML=`<div class="svgwrap"><svg class="shadesvg" viewBox="0 0 ${C*cw+4} ${Rw*ch+4}" style="max-width:${Rw>1?Math.min(360,C*cw+4):600}px" role="group" aria-label="Figura para sombrear: ${N} partes iguales"></svg></div><div class="fillrow"><button class="btn primary">Comprobar</button><span class="tip" id="sh-${opts.key}">Toca o arrastra sobre las partes para sombrearlas. Sombreadas: 0 de ${N}.</span></div>`;
    const svg=$("svg",area),btn=$(".btn",area),tip=$(".tip",area);
    const draw=okc=>{let g="";for(let k=0;k<N;k++){const x=2+(k%C)*cw,y=2+Math.floor(k/C)*ch;g+=`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" fill="${on[k]?(okc||"var(--l-rac)"):"var(--surface)"}" stroke="var(--muted)" stroke-width="1.2"/>`}
      g+=`<rect x="2" y="2" width="${C*cw}" height="${Rw*ch}" fill="none" stroke="var(--ink)" stroke-width="2"/>`;svg.innerHTML=g;tip.textContent=`Sombreadas: ${on.filter(Boolean).length} de ${N}.`};
    const cellAt=p=>{const c=Math.floor((p.x-2)/cw),r=Math.floor((p.y-2)/ch);return c>=0&&c<C&&r>=0&&r<Rw?r*C+c:-1};
    dragOn(svg,{down:p=>{if(finished)return false;const k=cellAt(p);if(k<0)return false;paint=!on[k];on[k]=paint;fbz.innerHTML="";draw()},move:p=>{const k=cellAt(p);if(k>=0&&on[k]!==paint){on[k]=paint;draw()}}});
    const lock=()=>{const n=Math.round(item.target*N);on.fill(false);for(let k=0;k<n;k++)on[k]=true;btn.disabled=true;draw("var(--ok)")};
    btn.onclick=()=>{if(finished)return;const n=on.filter(Boolean).length;if(!n){fb("info","Sombrea primero alguna parte.","");return}
      if(Math.abs(n/N-item.target)<1e-9){btn.disabled=true;draw("var(--ok)");finish(attempts===0?"first":"hint")}else if(wrong(`Sombreaste ${n} de ${N}.`))lock()};
    draw();if(opts.prev){lock();finish(opts.prev,true)}}

  else if(item.type==="cancel"){const T=item.terms,want=new Set(item.pairsIdx);
    area.innerHTML=`<div class="tchips" role="group" aria-label="Términos de la expresión">${T.map((t,i)=>`<button class="tchip ${t.s<0?"neg":"pos"}" data-i="${i}" aria-pressed="false">${i===0?(t.s<0?"− ":""):t.s<0?"− ":"+ "}${t.b}</button>`).join("")}</div><div class="fillrow"><button class="btn primary chk">Comprobar</button><span class="tip">Toca un término para tacharlo; vuelve a tocarlo para quitar la marca.</span></div>`;
    const chips=$$(".tchip",area),btn=$(".chk",area);
    chips.forEach(c=>c.onclick=()=>{if(finished)return;const on=c.getAttribute("aria-pressed")!=="true";c.setAttribute("aria-pressed",on);c.classList.toggle("cross",on);fbz.innerHTML=""});
    const solve=()=>{chips.forEach(c=>{const w=want.has(+c.dataset.i);c.classList.toggle("cross",w);c.setAttribute("aria-pressed",w);c.disabled=true});btn.disabled=true};
    btn.onclick=()=>{if(finished)return;const pick=chips.filter(c=>c.getAttribute("aria-pressed")==="true").map(c=>+c.dataset.i);if(!pick.length){fb("info","Tacha primero las parejas que se anulan.","");return}
      const ok=pick.length===want.size&&pick.every(i=>want.has(i));if(ok){solve();finish(attempts===0?"first":"hint")}else if(wrong(pick.some(i=>!want.has(i))?"Tachaste algún término que no tiene pareja.":"Falta alguna pareja por tachar.")){solve()}};
    if(opts.prev){solve();finish(opts.prev,true)}}
}

/* ============ ficha de estación ============ */
const MOMENTS=["Información","Exploración","Reto","Retroalimentación"];
function nodeShell(id,line,num,title,sub){
  return `<article class="node" style="--linec:var(${LINES[line].c})"><div class="nodehead"><span class="badge"><i style="background:var(${LINES[line].c})"></i>Línea ${LINES[line].short} · Estación ${num}</span><h2>${title}</h2><p class="muted">${sub}</p></div>
  <ol class="steps" aria-label="Momentos de la actividad"></ol><div class="body"></div><div class="navrow"></div></article>`}
function renderSteps(root,cur,max,go,canGo,labels=MOMENTS,subs=["Lee","Explora","Resuelve","Revisa"]){const ol=$(".steps",root);ol.style.gridTemplateColumns=`repeat(${labels.length},minmax(0,1fr))`;
  ol.innerHTML=labels.map((m,i)=>`<li><button class="${i<cur||i<=max&&i!==cur?"done":""} ${i===cur?"cur":""}" ${canGo(i)?"":"disabled"} data-i="${i}" ${i===cur?'aria-current="step"':""}><span>${i+1} · ${subs[i]}</span>${m}</button></li>`).join("");
  $$("button",ol).forEach(b=>b.onclick=()=>go(+b.dataset.i))}
function openNode(id){const N=NODES[id],ns=nodeSt(id);const v=$("#view-node");const GEN=RETO[id];ns.results=ns.results||{};
  const regen=()=>{ns.seed=newSeed();ns.results={}};{const k=Object.keys(ns.results).length;if(!ns.seed||k===0||k>=GEN.length)regen()}
  let ITEMS=GEN.map((g,i)=>g(rng(ns.seed+":"+i)));
  const LN=lineOf(id),SEQ=LSEQ[LN];v.innerHTML=nodeShell(id,LN,SEQ.indexOf(id)+1,N.title,N.sub);showView("node");
  const root=$(".node",v),body=$(".body",root),nav=$(".navrow",root);
  const allAnswered=()=>GEN.every((_,i)=>ns.results[i]);
  const canGo=i=>i<=Math.max(ns.max,ns.moment)+(i===3?0:1)&&(i<3||allAnswered()||ns.done);
  function go(m){ns.moment=m;ns.max=Math.max(ns.max,m);if(m===3&&allAnswered()){const st=calcStars(GEN,ns.results);ns.lastRes={...ns.results};ns.tally=["first","hint","shown"].map(k=>GEN.filter((_,i)=>ns.results[i]===k).length);ns.last=st;ns.stars=Math.max(ns.stars||0,st);if(!ns.done){ns.done=true;ns.doneAt=Date.now()}}
    save();draw();root.scrollIntoView({behavior:reduceMotion?"auto":"smooth",block:"start"})}
  function draw(){const m=ns.moment;renderSteps(root,m,ns.max,go,canGo);body.className="body";
    if(m===0){body.innerHTML=N.info}
    else if(m===1){body.classList.add("wide");body.innerHTML=`<p class="lead" style="max-width:70ch">${N.explore.intro}</p><div class="xp-host"></div>${(DESAFIOS[id]||[]).map((d,i)=>`<section class="desafio"><span class="eyebrow">Desafío para pensar${(DESAFIOS[id]||[]).length>1?` ${i+1}`:""} · opcional</span><h3>${d.title}</h3><p>${d.intro}</p><div class="dz-host" data-i="${i}"></div><p class="credit">${d.credit}</p></section>`).join("")}`;EXPLORE[N.explore.fn]($(".xp-host",body));(DESAFIOS[id]||[]).forEach((d,i)=>EXPLORE[d.fn]($(`.dz-host[data-i="${i}"]`,body)))}
    else if(m===2){body.innerHTML=`<p class="lead">Resuelve los retos. Si te equivocas una vez, recibes una pista; a la segunda, la respuesta explicada. Tómate tu tiempo.</p><div class="items" style="display:grid;gap:20px"></div>`;
      const host=$(".items",body);ITEMS.forEach((it,i)=>{const b=document.createElement("div");host.appendChild(b);
        mountItem(b,it,{idx:i,total:ITEMS.length,prev:ns.results[i],key:id+"-"+i+"-"+ns.seed,onResult:r=>{ns.results[i]=r;save();drawNav()}})})}
    else{drawRetro()}
    drawNav()}
  function drawNav(){const m=ns.moment;const nextOk=m<3&&(m<2||allAnswered());
    nav.innerHTML=`<button class="btn ghost" data-a="back">${m===0?"Volver al plano":"Anterior"}</button>`+
     (m<3?`<button class="btn primary" data-a="next" ${nextOk?"":"disabled"}>${m===2?(allAnswered()?"Ver mi retroalimentación":"Responde todos los retos para seguir"):"Siguiente: "+MOMENTS[m+1]}</button>`:`<button class="btn primary" data-a="map">Volver al plano</button>`);
    $$("button",nav).forEach(b=>b.onclick=()=>{const a=b.dataset.a;if(a==="back"){if(m===0){showView("map");renderMap()}else go(m-1)}else if(a==="next")go(m+1);else{showView("map");renderMap()}})}
  function drawRetro(){const T=ns.tally||[0,0,0];const st=ns.last||ns.stars||1;const k=SEQ.indexOf(id),nxt=SEQ[k+1];const best=ns.stars||st;
    const RC=RECAP[id],LR=ns.lastRes||{};
    const pts=RC.pts.map((p,pi)=>{const rs=RC.map.map((m,i)=>m===pi?LR[i]:null).filter(Boolean);return{...p,lvl:!rs.length?"na":rs.every(r=>r==="first")?"ok":rs.some(r=>r==="shown")?"bad":"mid"}});
    const weak=pts.filter(p=>p.lvl==="bad").map(p=>`«${p.s.toLowerCase()}»`),soso=pts.filter(p=>p.lvl==="mid").map(p=>`«${p.s.toLowerCase()}»`);
    const list=a=>a.length<2?a.join(""):a.slice(0,-1).join(", ")+" y "+a[a.length-1];
    const rec=st===3?{c:"ok",t:nxt?"Te recomendamos avanzar a la siguiente estación":`Completaste la línea ${LINES[LN].short}`,x:`Resolviste casi todo a la primera.${soso.length||weak.length?` Antes de seguir, echa un vistazo a ${list([...weak,...soso])}, donde necesitaste ayuda.`:""}`}
      :st===2?{c:"mid",t:"Te recomendamos repasar y repetir el reto",x:`Vas bien, pero ${list([...weak,...soso])||"algunos retos"} ${[...weak,...soso].length>1?"todavía necesitan":"todavía necesita"} práctica. Repasa la exploración y repite el reto: los números cambian. Si esta vez sale bien, avanza.`}
      :{c:"bad",t:"Te recomendamos volver a la explicación y repetir el reto",x:"Esta estación todavía te cuesta, y es normal: es un cambio en la forma de pensar los números. Relee la información, juega otra vez con la exploración y repite el reto. Se aprende mucho del segundo intento."};
    const lvTxt={ok:"Lo dominas",mid:"Con ayuda",bad:"Para repasar",na:"—"};
    const r=ns.refl||{};
    const btnNext=nxt?`<button class="btn ${st===3?"primary":""}" id="nextst">${st===3?"Ir a":"Avanzar de todos modos a"} «${NODES[nxt].title}»</button>`:`<button class="btn ${st===3?"primary":""}" id="tomap">Volver al plano</button>`;
    const actions=st===3?btnNext+`<button class="btn" id="redo">Repetir el reto con otros números</button>`
      :st===2?`<button class="btn primary" id="redo">Repetir el reto con otros números</button><button class="btn" id="toexp">Volver a la exploración</button>`+btnNext
      :`<button class="btn primary" id="toinfo">Volver a la explicación</button><button class="btn" id="redo">Repetir el reto con otros números</button>`+btnNext;
    body.innerHTML=`<div class="retro-score"><span class="bigstars" aria-label="${st} de 3 estrellas">${"★".repeat(st)}<span style="opacity:.25">${"★".repeat(3-st)}</span></span>
      <div class="tally">${best>st?`<span>Tu mejor resultado: <b>${"★".repeat(best)}</b></span>`:""}<span><b>${T[0]}</b> a la primera</span><span><b>${T[1]}</b> con pista</span><span><b>${T[2]}</b> con la respuesta</span></div></div>
      <div class="rec ${rec.c}"><b>${rec.t}</b><p>${rec.x}</p><div class="fillrow">${actions}</div></div>
      <h3>Lo que trabajaste en esta estación</h3>
      <div class="recap">${pts.map((p,n)=>`<div class="rcp"><span class="lv ${p.lvl}">${lvTxt[p.lvl]}</span><div><p><b>${n+1}. ${p.s}.</b> ${p.t}</p><p class="m">${p.ex}</p></div></div>`).join("")}</div>
      <div class="callout"><span class="eyebrow">Para la próxima vez</span><p>${N.ojo}</p></div>
      <h3>Tu reflexión</h3>
      <div class="refl">
        <div class="rq"><p><b>¿Cómo te has sentido realizando esta actividad?</b></p><div class="faces" role="group" aria-label="Cómo te has sentido">${FACES.map((f,i)=>`<button class="face" data-q="emo" data-v="${i}" aria-pressed="${r.emo===i}">${faceSVG(i)}<span>${f}</span></button>`).join("")}</div></div>
        <div class="rq"><p><b>¿Has encontrado esta actividad difícil?</b></p><div class="lkopts" role="group" aria-label="Dificultad">${DIFS.map((f,i)=>`<button data-q="dif" data-v="${i}" aria-pressed="${r.dif===i}">${f}</button>`).join("")}</div></div>
        <div class="rq"><p><b>¿Sientes que has aprendido o pensado algo nuevo en esta actividad?</b></p><div class="lkopts four" role="group" aria-label="Aprendizaje">${APRS.map((f,i)=>`<button data-q="apr" data-v="${i}" aria-pressed="${r.apr===i}">${f}</button>`).join("")}</div></div>
        <div class="field"><label for="rnote">Si quieres, escribe en una frase lo más importante que te llevas de esta estación.</label><textarea id="rnote" placeholder="Por ejemplo: que el menos delante de un paréntesis cambia todos los signos.">${esc(r.note||"")}</textarea></div>
        <p class="fb info" id="rmsg" aria-live="polite" ${reflMsg(r,st)?"":"hidden"}>${reflMsg(r,st)}</p>
        <p class="tip">${RT.guest?"Sin cuenta, tus respuestas no se guardan.":"La administración de la plataforma puede ver estas respuestas para mejorar las actividades."}</p>
      </div>`;
    $$(".refl [data-q]",body).forEach(b=>b.onclick=()=>{ns.refl={...(ns.refl||{}),[b.dataset.q]:+b.dataset.v,at:Date.now()};
      $$(`.refl [data-q="${b.dataset.q}"]`,body).forEach(x=>x.setAttribute("aria-pressed",x===b));const msg=reflMsg(ns.refl,st),el=$("#rmsg",body);el.textContent=msg;el.hidden=!msg;save()});
    let nt;$("#rnote",body).oninput=e=>{ns.refl={...(ns.refl||{}),note:e.target.value.slice(0,400),at:Date.now()};clearTimeout(nt);nt=setTimeout(save,800)};
    const on=(sel,fn)=>{const b=$(sel,body);if(b)b.onclick=fn};
    on("#redo",()=>{regen();ITEMS=GEN.map((g,i)=>g(rng(ns.seed+":"+i)));go(2)});on("#toinfo",()=>go(0));on("#toexp",()=>go(1));on("#tomap",()=>{showView("map");renderMap()});
    on("#nextst",async()=>{showView("map");renderMap();await sleep(150);clickStation(nxt)})}
  draw()}
function calcStars(items,res){const pts=items.reduce((a,_,i)=>a+(res[i]==="first"?2:res[i]==="hint"?1:0),0)/(2*items.length);return pts>=.8?3:pts>=.5?2:1}

/* ============ diagnóstico (uno por línea) ============ */
function openDiag(line){const v=$("#view-node");line=line||"ent";
  const res={},dseed=newSeed(),DG=buildDiag(dseed,line),N=DG.length,seq=LSEQ[line],L=LINES[line];
  v.innerHTML=`<article class="node" style="--linec:var(${L.c})"><div class="nodehead"><span class="badge"><i style="background:var(${L.c})"></i>Línea ${LNUM[line]} · ${L.short} · Diagnóstico opcional</span><h2>Diagnóstico: ${L.name.toLowerCase()}</h2><p class="muted">${N} preguntas, unos ${Math.round(N*1.2)} minutos.</p></div><div class="body"></div><div class="navrow"></div></article>`;showView("node");
  const body=$(".body",v),nav=$(".navrow",v),back=()=>{showView("map");renderMap()};
  const d=S.diags[line];
  if(d){const c=d.conv||[];body.innerHTML=`<p class="lead">Ya hiciste este diagnóstico: acertaste ${d.score} de ${N}.</p><p>${c.length?`Convalidaste ${c.length===1?"la estación":"las estaciones"} ${c.map(id=>`«${NODES[id].title}»`).join(", ")}. Puedes visitarlas cuando quieras para repasar.`:`No convalidaste estaciones: empieza por «${NODES[seq[0]].title}».`}</p>`;
    nav.innerHTML=`<button class="btn ghost" id="dback">Volver</button><button class="btn" id="dredo">Repetir el diagnóstico</button>`;
    $("#dback",v).onclick=back;$("#dredo",v).onclick=()=>{delete S.diags[line];save();openDiag(line)};return}
  body.innerHTML=`<p class="lead">Cada par de preguntas corresponde a una estación de la línea ${L.short}: si aciertas las dos, la estación queda convalidada y desbloquea la siguiente.</p><p class="muted">Aquí no hay pistas: una sola oportunidad por pregunta. Es un punto de partida, no una nota.</p><div class="items" style="display:grid;gap:20px"></div>`;
  const host=$(".items",body);
  DG.forEach((it,i)=>{const b=document.createElement("div");host.appendChild(b);mountItem(b,it,{idx:i,total:N,single:true,label:"Pregunta",key:"D"+line+i+dseed,onResult:r=>{res[i]=r;draw()}})});
  const draw=()=>{const n=Object.keys(res).length;nav.innerHTML=`<button class="btn ghost" id="dback">Volver</button><button class="btn primary" id="dend" ${n<N?"disabled":""}>${n<N?`Respondidas ${n} de ${N}`:"Ver mi resultado"}</button>`;
    $("#dback",v).onclick=back;
    $("#dend",v).onclick=async()=>{const score=DG.filter((_,i)=>res[i]==="first").length;const convs=seq.filter(id=>DG.every((q,i)=>q.node!==id||res[i]==="first"));
      S.diags[line]={score,conv:convs,at:Date.now()};save();showView("map");renderMap();
      toast(convs.length?`Convalidaste ${convs.length} ${convs.length===1?"estación":"estaciones"}. Tu avatar va a la siguiente.`:`Listo. Empieza por «${NODES[seq[0]].title}».`);
      const t=seq.find(id=>unlocked(id)&&!isDone(id)&&!conv(id));if(t){await sleep(400);moveAvatar(t)}}};
  draw()}

/* ============ mi progreso ============ */
function renderMe(){const v=$("#view-me");
  const row=(id,line,name,state)=>`<div class="stitem" style="--linec:var(${LINES[line].c})"><span class="dotl ${state==="Completada"||state.startsWith("Convalidada")?"d":""}"></span><span>${name}</span><span class="state">${state}</span></div>`;
  const stTxt=id=>{if(isDone(id)){const s=S.nodes[id]&&S.nodes[id].stars;return"Completada"+(id[0]!=="B"&&s?" · "+"★".repeat(s):"")}if(conv(id))return"Convalidada en el diagnóstico";if(!unlocked(id))return"Bloqueada";return S.nodes[id]&&S.nodes[id].max>0?"En curso":"Disponible"};
  v.innerHTML=`<div class="panel"><div><span class="eyebrow">Mi progreso</span><h2 style="font-size:1.6rem;font-weight:800">${esc(S.nombre||(RT.guest?"Recorrido sin cuenta":"Tu recorrido"))}</h2>${RT.guest?"":`<p class="muted">${esc(RT.email)}</p>`}</div>
    <h3>Línea Bienestar</h3><div class="stlist">${BIE_IDS.map(id=>row(id,"bie",SOCIO[id].title,stTxt(id)+(isDone(id)&&BIE.ans[id]&&SOCIO[id].items.every((_,i)=>BIE.ans[id][i])?" · "+bandName(id,bieScore(id).band).toLowerCase():""))).join("")}</div>
    ${ACTIVE.map(l=>`<h3>Línea ${LNUM[l]} · ${LINES[l].short}</h3><p class="muted">${S.diags[l]?`Diagnóstico: ${S.diags[l].score} de ${diagN(l)} aciertos.`:"Diagnóstico opcional sin hacer: es la primera estación de la línea."}</p><div class="stlist">${LSEQ[l].map(id=>row(id,l,NODES[id].title,stTxt(id))).join("")}</div>`).join("")}
    ${MLINES.filter(l=>!ACTIVE.includes(l)).length?`<p class="muted">En construcción: ${MLINES.filter(l=>!ACTIVE.includes(l)).map(l=>LINES[l].name.toLowerCase()).join(", ")}.</p>`:""}
    ${RT.guest?`<div class="callout"><span class="eyebrow">Sin cuenta</span><p>Este recorrido no se guarda: al cerrar o recargar la página empiezas de cero. Crea una cuenta si quieres conservar tu avance.</p></div><div class="fillrow"><button class="btn primary" id="mkacc">Crear una cuenta</button></div>`:""}
    ${dataSection()}</div>`;
  const acc=document.createElement("div");acc.className="acctcard";
  acc.innerHTML=`<div class="acc-av"><svg viewBox="-13 -31 26 45" width="52" height="84" aria-hidden="true">${avatarSVG(S.avatar,true)}</svg></div>
    <div class="acc-body"><span class="eyebrow">${RT.guest?"Tu recorrido":"Tu cuenta"}</span><p class="muted">${RT.guest?"Puedes cambiar de viajero o empezar de cero cuando quieras.":"Puedes cambiar de viajero, empezar de cero o borrar tu cuenta cuando quieras."}</p>
    <div class="fillrow"><button class="btn" id="edit">Cambiar mi avatar</button><button class="btn" id="reset">Borrar mi progreso</button>${RT.guest?"":`<button class="btn danger" id="ddel">Borrar mi cuenta</button>`}</div></div>`;
  $(".panel",v).insertBefore(acc,$(".panel",v).children[1]);
  $("#edit",v).onclick=openProfile;$("#reset",v).onclick=openReset;if(RT.guest)$("#mkacc",v).onclick=leaveGuest;bindDataSection(v)}
function openReset(){const m=$("#modal");
  m.innerHTML=`<div class="dialog" role="dialog" aria-modal="true" aria-labelledby="rs-t"><span class="eyebrow">Empezar de cero</span><h2 id="rs-t">¿Borrar tu progreso?</h2>
   <p>Se borran las estaciones completadas, las estrellas, los diagnósticos y tus reflexiones. Tu ${RT.guest?"viajero":"cuenta, tu nombre de usuario y tu viajero"} se conservan.</p>
   <label class="chk"><input type="checkbox" id="rsbie"> <span>Borrar también mis respuestas de la línea Bienestar y su historial.</span></label>
   <p class="muted">No se puede deshacer.</p>
   <div class="dlg-actions"><button class="btn danger" id="rsgo">Borrar mi progreso</button><button class="btn ghost" id="rsno">Cancelar</button></div></div>`;
  m.hidden=false;$("#rsno",m).onclick=()=>m.hidden=true;
  $("#rsgo",m).onclick=async()=>{const alsoBie=$("#rsbie",m).checked;S.nodes={};S.diags={};S.current="Dent";if(alsoBie){S.bie={};await dropBie()}
    save();await flush();m.hidden=true;renderMe();renderProg();toast("Tu progreso se borró. Puedes empezar de nuevo cuando quieras.")}}

/* ============ panel de administración ============ */
function renderPanel(){const v=$("#view-panel");
  v.innerHTML=`<div class="panel"><div><span class="eyebrow">Solo visible para la administración</span><h2 style="font-size:1.6rem;font-weight:800">Panel de administración</h2></div>
   <p class="muted">Aquí aparece cada persona que crea una cuenta en la caja. Las respuestas de la línea Bienestar son privadas: solo ves si completaron cada estación. Usa estos datos únicamente para las finalidades de la política de tratamiento de datos.</p>
   <div class="tablewrap"><table><thead><tr><th>Usuario</th><th>Diagnóstico</th><th>Estaciones</th><th>Bienestar</th><th>Estrellas</th><th>Última actividad</th></tr></thead><tbody id="pt"><tr><td colspan="6" class="muted">Cargando el avance de los usuarios…</td></tr></tbody></table></div>
   <p class="tip">Cuadros: lleno = completada · rayado = convalidada en el diagnóstico · borde = en curso.</p><h3>Cómo vivieron las estaciones</h3><p class="muted">Respuestas de los usuarios a las preguntas de reflexión al final de cada estación.</p><div class="tablewrap"><table><thead><tr><th>Estación</th><th>Respuestas</th><th>Cómo se sintieron</th><th>La encontraron difícil</th><th>Aprendieron algo nuevo</th></tr></thead><tbody id="pr"><tr><td colspan="5" class="muted">Sin respuestas todavía.</td></tr></tbody></table></div></div>`;
  if(!RT.db){$("#pt",v).innerHTML=`<tr><td colspan="6" class="muted">El avance compartido no está disponible en esta vista.</td></tr>`;return}
  if(RT.unsubPanel)RT.unsubPanel();
  RT.unsubPanel=RT.db.collection("progreso").onSnapshot(snap=>{const rows=snap.docs.map(d=>d.data()).filter(Boolean).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
    const tb=$("#pt",v);if(!tb)return;
    if(!rows.length){tb.innerHTML=`<tr><td colspan="6" class="muted">Todavía no hay usuarios registrados. Comparte el enlace de la página para que creen su cuenta.</td></tr>`;return}
    tb.innerHTML=rows.map(r=>{const nodes=r.nodes||{},dg={...(r.diag?{ent:r.diag}:{}),...(r.diags||{})},cv=Object.values(dg).flatMap(x=>x.conv||[]);const stars=MATH.reduce((a,id)=>a+(nodes[id]&&nodes[id].stars||0),0);
      const sq=ACTIVE.map(l=>`<span class="sqg" title="Línea ${LINES[l].short}" style="--sqc:var(${LINES[l].c})">${LSEQ[l].map(id=>`<i class="${nodes[id]&&nodes[id].done?"d":cv.includes(id)?"c":nodes[id]&&nodes[id].max>0?"p":""}" title="${NODES[id].title}"></i>`).join("")}</span>`).join("");
      const dtxt=ACTIVE.filter(l=>dg[l]).map(l=>`${LINES[l].short} ${dg[l].score}/${diagN(l)}`).join("<br>")||"—";
      return`<tr><td>${esc(r.nombre||"Sin nombre")}<br><span class="muted" style="font-size:.82rem">${esc(r.email||"")}</span></td><td>${dtxt}</td><td><span class="sq">${sq}</span></td><td>${r.bie?Object.values(r.bie).filter(Boolean).length:0} / 4</td><td>★ ${stars}</td><td>${r.updatedAt?new Date(r.updatedAt).toLocaleString("es-CO",{dateStyle:"medium",timeStyle:"short"}):"—"}</td></tr>`}).join("");renderRefl(rows)},
   ()=>{const tb=$("#pt",v);if(tb)tb.innerHTML=`<tr><td colspan="6" class="muted">No se pudo leer el avance de los usuarios. Vuelve a abrir el panel en un momento.</td></tr>`})}

function renderRefl(rows){const tb=$("#pr");if(!tb)return;
  const out=MATH.map(id=>{const rs=rows.map(r=>r.nodes&&r.nodes[id]&&r.nodes[id].refl).filter(x=>x&&x.emo!=null);if(!rs.length)return"";
    const avg=sum(rs.map(x=>x.emo))/rs.length,d=rs.filter(x=>x.dif!=null),ap=rs.filter(x=>x.apr!=null);
    const pc=(arr,f)=>arr.length?Math.round(arr.filter(f).length/arr.length*100)+" %":"—";
    return`<tr><td>${NODES[id].title}</td><td>${rs.length}</td><td><span class="facecell">${faceSVG(Math.round(avg))}</span> ${FACES[Math.round(avg)].toLowerCase()} (${dec(avg+1)} de 5)</td><td>${pc(d,x=>x.dif>=3)} bastante o muy</td><td>${pc(ap,x=>x.apr>=2)} bastante o mucho</td></tr>`}).join("");
  tb.innerHTML=out||`<tr><td colspan="5" class="muted">Sin respuestas todavía.</td></tr>`}
/* ============ perfil ============ */
function openProfile(){const m=$("#modal");let av=S.avatar;
  m.innerHTML=`<div class="dialog" role="dialog" aria-modal="true" aria-labelledby="pt-t"><span class="eyebrow">${RT.guest?"Tu viajero":"Tu cuenta"}</span><h2 id="pt-t">${esc(S.nombre||"Elige tu viajero")}</h2>${RT.email?`<p class="muted">${esc(RT.email)}</p>`:""}
   ${avatarPicker(av)}
   <div class="dlg-actions"><button class="btn primary" id="psave">Guardar</button><button class="btn ghost" id="pcancel">Cancelar</button></div></div>`;
  m.hidden=false;bindAvatar(m,a=>av=a);
  $("#pcancel",m).onclick=()=>m.hidden=true;
  $("#psave",m).onclick=()=>{S.avatar=av;save();m.hidden=true;renderMap();renderMe()}}
const avatarPicker=av=>`<div class="field"><span style="font-family:var(--f-disp);font-weight:600;font-size:.92rem">Elige tu viajero</span><div class="avs" role="group" aria-label="Viajero">${AVS.map(a=>`<button type="button" data-a="${a}" aria-pressed="${a===av}" aria-label="${avOf(a).lab}" title="${avOf(a).lab}"><svg viewBox="-13 -31 26 45" width="26" height="42">${avatarSVG(a,true)}</svg></button>`).join("")}</div></div>`;
function bindAvatar(root,set){$$(".avs button",root).forEach(b=>b.onclick=()=>{set(b.dataset.a);$$(".avs button",root).forEach(x=>x.setAttribute("aria-pressed",x===b))})}
function openStart(){const m=$("#modal");
  m.innerHTML=`<div class="dialog" role="dialog" aria-modal="true" aria-labelledby="st-t"><span class="eyebrow">Cuenta creada</span><h2 id="st-t">Hola, ${esc(S.nombre)}</h2>
   <p>En cada estación lees una explicación, exploras, resuelves un reto y recibes retroalimentación. Si ya manejas algunos temas, el diagnóstico te permite saltarlos.</p>
   <div class="dlg-actions"><button class="btn primary" id="sd">Empezar con el diagnóstico</button><button class="btn" id="sm">Ir directo al plano</button></div></div>`;
  m.hidden=false;$("#sm",m).onclick=()=>m.hidden=true;$("#sd",m).onclick=()=>{m.hidden=true;clickStation("Dent")}}

/* ============ cuentas ============ */
const AUTH_ERR={"auth/email-already-in-use":"Ya existe una cuenta con ese email. Inicia sesión.","auth/invalid-email":"El email no es válido.","auth/weak-password":"La contraseña debe tener al menos 6 caracteres.",
  "auth/user-not-found":"Email o contraseña incorrectos.","auth/wrong-password":"Email o contraseña incorrectos.","auth/invalid-credential":"Email o contraseña incorrectos.","auth/invalid-login-credentials":"Email o contraseña incorrectos.",
  "auth/too-many-requests":"Demasiados intentos seguidos. Espera unos minutos y vuelve a probar.","auth/network-request-failed":"No hay conexión. Revisa tu internet.","auth/operation-not-allowed":"El registro con correo y contraseña no está activado en Firebase (Authentication → Método de acceso).","auth/unauthorized-domain":"Este dominio no está autorizado en Firebase (Authentication → Configuración → Dominios autorizados).","auth/api-key-not-valid.-please-pass-a-valid-api-key.":"La clave de Firebase de la página no es válida. Revisa FIREBASE_CONFIG.","auth/configuration-not-found":"Authentication no está activado en el proyecto de Firebase. Ábrelo y pulsa «Comenzar».","auth/admin-restricted-operation":"El proyecto no permite crear cuentas desde la página. Revisa la configuración de Authentication."};
const authMsg=e=>{console.error("[Caja] Error de Firebase:",e&&e.code,e&&e.message);return(AUTH_ERR[e&&e.code]||"Algo salió mal. Inténtalo de nuevo.")+(e&&e.code?` (código: ${e.code})`:"")};
const dbMsg=e=>{console.error("[Caja] Error de Firestore:",e&&e.code,e&&e.message);const c=e&&e.code;
  return(c==="permission-denied"?"Firestore rechazó la escritura: revisa que las reglas de firestore.rules estén publicadas (Firestore → Reglas).":c==="not-found"||c==="failed-precondition"?"No se encontró la base de datos Firestore: créala con el ID (default).":c==="unavailable"?"No hay conexión con Firestore. Revisa tu internet.":"No se pudo guardar en Firestore.")+(c?` (código: ${c})`:"")};
const USER_RE=/^[a-z0-9_.]{3,20}$/;
const MINI_MAP=`<svg viewBox="0 0 460 150" aria-hidden="true"><polyline points="20,40 300,40 360,100 440,100" fill="none" stroke="var(--l-ent)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><polyline points="20,40 80,100 260,100" fill="none" stroke="var(--l-bie)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><polyline points="300,40 300,130" fill="none" stroke="var(--l-rac)" stroke-width="8" stroke-linecap="round" stroke-opacity=".35"/>${[[20,40],[110,40],[200,40],[300,40],[400,100],[150,100],[240,100]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${i?8:11}" fill="var(--surface)" stroke="${i===0?"var(--ink)":y===40||x===400?"var(--l-ent)":"var(--l-bie)"}" stroke-width="4"/>`).join("")}<g transform="translate(110,26)">${avatarSVG("sol")}</g></svg>`;
function renderAuth(mode){const v=$("#view-auth");let av="coral";
  const intro=`<div class="authintro"><h2>Desarrollemos las bases del pensamiento matemático estación a estación.</h2>${MINI_MAP}
    <p>En cada estación lees una explicación, exploras con una herramienta interactiva, resuelves un reto y recibes retroalimentación. Con una cuenta, tu avance queda guardado.</p>
    <div class="fillrow"><button type="button" class="btn" data-guest>Explorar sin cuenta</button><span class="tip">Abres todas las estaciones, pero tu avance no se guarda.</span></div>
    <p class="tip"><button type="button" class="linkbtn" id="apol">Política de tratamiento de datos personales</button></p></div>`;
  let form;
  if(mode==="reg")form=`<form class="dialog" id="af" novalidate><h2>Crear una cuenta</h2>
    <div class="field"><label for="fu">Nombre de usuario</label><input id="fu" autocomplete="username" autocapitalize="none" spellcheck="false" placeholder="por ejemplo: laura.gomez" maxlength="20"><span class="tip">De 3 a 20 caracteres: letras minúsculas, números, punto o guion bajo. Lo verá la administración de la plataforma.</span></div>
    <div class="field"><label for="fe">Email</label><input id="fe" type="email" autocomplete="email" autocapitalize="none"></div>
    <div class="field"><label for="fp">Contraseña</label><input id="fp" type="password" autocomplete="new-password" minlength="6"><span class="tip">Al menos 6 caracteres.</span></div>
    <div class="field"><label for="fp2">Repite la contraseña</label><input id="fp2" type="password" autocomplete="new-password"></div>
    ${avatarPicker(av)}
    ${consentBlock()}
    <p class="err" id="ferr" aria-live="polite"></p>
    <div class="dlg-actions"><button class="btn primary" type="submit" id="fsub">Crear mi cuenta</button></div>
    ${GOOGLE_ROW}
    <p class="tip">¿Ya tienes cuenta? <button type="button" class="linkbtn" data-go="login">Inicia sesión</button></p></form>`;
  else if(mode==="reset")form=`<form class="dialog" id="af" novalidate><h2>Recuperar la contraseña</h2><p>Escribe el email de tu cuenta y te enviaremos un enlace para crear una contraseña nueva.</p>
    <div class="field"><label for="fe">Email</label><input id="fe" type="email" autocomplete="email" autocapitalize="none"></div>
    <p class="err" id="ferr" aria-live="polite"></p>
    <div class="dlg-actions"><button class="btn primary" type="submit" id="fsub">Enviar el enlace</button></div>
    <p class="tip"><button type="button" class="linkbtn" data-go="login">Volver a iniciar sesión</button></p></form>`;
  else form=`<form class="dialog" id="af" novalidate><h2>Iniciar sesión</h2>
    <div class="field"><label for="fe">Email</label><input id="fe" type="email" autocomplete="email" autocapitalize="none"></div>
    <div class="field"><label for="fp">Contraseña</label><input id="fp" type="password" autocomplete="current-password"></div>
    <p class="err" id="ferr" aria-live="polite"></p>
    <div class="dlg-actions"><button class="btn primary" type="submit" id="fsub">Entrar</button></div>
    ${GOOGLE_ROW}
    <p class="tip"><button type="button" class="linkbtn" data-go="reset">¿Olvidaste tu contraseña?</button></p>
    <p class="tip">¿Es tu primera vez? <button type="button" class="linkbtn" data-go="reg">Crea una cuenta</button></p></form>`;
  v.innerHTML=`<div class="authwrap">${intro}${form}</div>`;
  bindAvatar(v,a=>av=a);
  $$("[data-go]",v).forEach(b=>b.onclick=()=>renderAuth(b.dataset.go));$("[data-guest]",v).onclick=enterGuest;$("#apol",v).onclick=openPolicy;const gb=$("#gbtn",v);if(gb)gb.onclick=()=>googleSignIn(t=>{$("#ferr",v).className="err";$("#ferr",v).textContent=t});
  const err=t=>{$("#ferr",v).className="err";$("#ferr",v).textContent=t};const busy=on=>{$("#fsub",v).disabled=on};
  $("#af",v).addEventListener("submit",async e=>{e.preventDefault();err("");const email=($("#fe",v).value||"").trim();
    if(!/^\S+@\S+\.\S+$/.test(email)){err("Escribe un email válido.");return}
    if(mode==="reset"){busy(true);try{await RT.auth.sendPasswordResetEmail(email)}catch(x){if(!x||x.code!=="auth/user-not-found"){err(authMsg(x));busy(false);return}}
      $("#ferr",v).className="okmsg";$("#ferr",v).textContent="Si hay una cuenta con ese email, te llegará un enlace en unos minutos. Revisa también la carpeta de spam.";busy(false);return}
    const pass=$("#fp",v).value;
    if(mode==="login"){if(!pass){err("Escribe tu contraseña.");return}busy(true);try{await RT.auth.signInWithEmailAndPassword(email,pass)}catch(x){err(authMsg(x));busy(false)}return}
    const u=($("#fu",v).value||"").trim().toLowerCase();
    if(!USER_RE.test(u)){err("El nombre de usuario debe tener de 3 a 20 caracteres: letras minúsculas, números, punto o guion bajo.");return}
    if(pass.length<6){err("La contraseña debe tener al menos 6 caracteres.");return}
    if(pass!==$("#fp2",v).value){err("Las dos contraseñas no coinciden.");return}
    const consent=readConsent(v);if(!consent.ok){err(CONSENT_ERR);return}
    busy(true);RT.registering=true;let cred;
    try{cred=await RT.auth.createUserWithEmailAndPassword(email,pass)}catch(x){RT.registering=false;err(authMsg(x));busy(false);return}
    const rv=await reserveName(u,cred.user.uid);
    if(rv.error){await cred.user.delete().catch(()=>{});RT.registering=false;busy(false);err(dbMsg(rv.error));return}
    if(rv.taken){await cred.user.delete().catch(()=>{});RT.registering=false;busy(false);err("Ese nombre de usuario ya está en uso. Elige otro.");return}
    await cred.user.updateProfile({displayName:u}).catch(()=>{});
    S=freshState();S.nombre=u;S.avatar=av;S.consent=consent.data;BIE=freshBie();
    RT.uid=cred.user.uid;RT.email=email;RT.teacher=false;await flush();RT.registering=false;enterApp(true)});
  setTimeout(()=>{const f=$("input",v);f&&f.focus()},30)}
/* ---------- nombre de usuario y acceso con Google ---------- */
async function reserveName(name,uid){try{const n=await RT.db.doc("nombres/"+name).get();if(n.exists)return n.data().uid===uid?{ok:true}:{taken:true};
  await RT.db.doc("nombres/"+name).set({uid,creado:Date.now()});return{ok:true}}catch(e){return{error:e}}}
const GOOGLE_G=`<svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`;
const GOOGLE_ROW=`<div class="orrow"><span>o</span></div><button type="button" class="btn gbtn" id="gbtn">${GOOGLE_G}<span>Continuar con Google</span></button>`;
const googleProvider=()=>{const p=new firebase.auth.GoogleAuthProvider();p.setCustomParameters({prompt:"select_account"});return p};
const isGoogleUser=u=>!!(u&&u.providerData&&u.providerData.some(p=>p.providerId==="google.com")&&!u.providerData.some(p=>p.providerId==="password"));
async function googleSignIn(err){try{await RT.auth.signInWithPopup(googleProvider())}
  catch(x){const c=x&&x.code;if(c==="auth/popup-closed-by-user"||c==="auth/cancelled-popup-request")return;
    err(c==="auth/popup-blocked"?"El navegador bloqueó la ventana de Google. Permite las ventanas emergentes para esta página y vuelve a intentarlo.":
      c==="auth/operation-not-allowed"?"El acceso con Google no está activado en Firebase (Authentication → Método de acceso → Google). (código: "+c+")":
      c==="auth/account-exists-with-different-credential"?"Ya hay una cuenta con ese email creada con contraseña. Entra con tu email y contraseña.":authMsg(x))}}
/* primera entrada con Google: elegir nombre de usuario, avatar y aceptar la política */
function completeAccount(u){return new Promise(res=>{const v=$("#view-auth");showView("auth");let av="coral";
  const sug=((u.email||"").split("@")[0]||"").toLowerCase().replace(/[^a-z0-9_.]/g,"").slice(0,20);
  v.innerHTML=`<div class="authwrap one"><form class="dialog" id="ca" novalidate><span class="eyebrow">Último paso</span><h2>Completa tu cuenta</h2>
    <p class="muted">Entraste como ${esc(u.email||"")}.</p>
    <div class="field"><label for="fu">Nombre de usuario</label><input id="fu" autocomplete="username" autocapitalize="none" spellcheck="false" maxlength="20" value="${esc(sug.length>=3?sug:"")}"><span class="tip">De 3 a 20 caracteres: letras minúsculas, números, punto o guion bajo. Lo verá la administración de la plataforma.</span></div>
    ${avatarPicker(av)}${consentBlock()}<p class="err" id="ferr" aria-live="polite"></p>
    <div class="dlg-actions"><button class="btn primary" type="submit" id="fsub">Crear mi cuenta</button><button class="btn ghost" type="button" id="cano">Cancelar</button></div></form></div>`;
  bindAvatar(v,a=>av=a);const err=t=>$("#ferr",v).textContent=t;
  $("#cano",v).onclick=async()=>{res(false);RT.uid=null;await u.delete().catch(()=>{});await RT.auth.signOut().catch(()=>{})};
  $("#ca",v).addEventListener("submit",async e=>{e.preventDefault();err("");const name=($("#fu",v).value||"").trim().toLowerCase();
    if(!USER_RE.test(name)){err("El nombre de usuario debe tener de 3 a 20 caracteres: letras minúsculas, números, punto o guion bajo.");return}
    const c=readConsent(v);if(!c.ok){err("Para crear la cuenta necesitas aceptar la política de datos y confirmar tu edad (las dos casillas obligatorias).");return}
    $("#fsub",v).disabled=true;const rv=await reserveName(name,u.uid);
    if(rv.error){err(dbMsg(rv.error));$("#fsub",v).disabled=false;return}
    if(rv.taken){err("Ese nombre de usuario ya está en uso. Elige otro.");$("#fsub",v).disabled=false;return}
    await u.updateProfile({displayName:name}).catch(()=>{});
    S=freshState();S.nombre=name;S.avatar=av;S.consent=c.data;BIE=freshBie();await flush();res(true)});
  setTimeout(()=>{const f=$("#fu",v);f&&f.focus()},30)})}
function enterApp(isNew){$("#who").hidden=false;$("#tab-out").textContent=RT.guest?"Crear cuenta o entrar":"Salir";$("#tab-panel").hidden=!RT.teacher;$("#modal").hidden=true;showView("map");renderMap();if(isNew)openStart()}

/* ============ arranque ============ */
(function boot(){
  const configured=window.firebase&&FIREBASE_CONFIG.apiKey&&!FIREBASE_CONFIG.apiKey.startsWith("PEGA");
  if(!configured){$("#view-auth").innerHTML=`<div class="panel"><span class="eyebrow">Falta un paso</span><h2 style="font-size:1.5rem;font-weight:800">Conecta la caja con Firebase</h2>
    <p>Esta página necesita un proyecto de Firebase para guardar las cuentas y el progreso. Abre el archivo en un editor de texto, busca <span class="m">FIREBASE_CONFIG</span> y pega la configuración de tu proyecto. La guía que acompaña al archivo explica cada paso.</p>
    ${window.firebase?"":`<p class="muted">Tampoco se pudo cargar la librería de Firebase. Revisa la conexión a internet.</p>`}</div>`;return}
  firebase.initializeApp(FIREBASE_CONFIG);RT.auth=firebase.auth();RT.db=firebase.firestore();
  RT.auth.onAuthStateChanged(async u=>{if(RT.registering)return;
    if(!u){if(RT.guest)return;RT.uid=null;RT.email="";RT.teacher=false;S=freshState();BIE=freshBie();$("#who").hidden=true;$("#modal").hidden=true;showNotice("");showView("auth");renderAuth("login");return}
    RT.guest=false;RT.uid=u.uid;RT.email=u.email||"";$("#view-auth").innerHTML=`<p class="muted">Abriendo tu plano…</p>`;let isNew=false;
    try{const snap=await RT.db.doc("progreso/"+u.uid).get();
      if(snap.exists){const d=snap.data();delete d.email;delete d.uid;S={...freshState(),...d};if(!S.diags)S.diags={};if(S.diag){if(!S.diags.ent)S.diags.ent=S.diag;delete S.diag}}else{S=freshState();isNew=true}
      const b=await RT.db.doc("bienestar/"+u.uid).get();BIE=b.exists?{...freshBie(),...b.data()}:freshBie();
      showNotice("")}
    catch(e){RT.uid=null;showNotice("No se pudo cargar tu avance guardado; lo que hagas ahora no se guardará. "+dbMsg(e))}
    if(RT.uid&&isNew){const ok=await completeAccount(u);if(!ok)return}
    else if(RT.uid&&!hasConsent()){const ok=await consentGate();if(!ok)return}
    try{const d=await RT.db.doc("docentes/"+u.uid).get();RT.teacher=d.exists}catch(e){RT.teacher=false}
    enterApp(isNew)})})();
