"use strict";
/* Plano de MetroMat sobre el valle de Aburrá (esquemático, norte arriba, no a escala).
   El río Medellín ordena el corredor de transbordo; cada línea sale de su cabecera en el corredor hacia una ladera.
   La salida, «Creencias sobre las matemáticas», está en la Biblioteca Efe Gómez del Campus El Volador (UNAL).
   Este archivo sólo tiene geometría y dibujo; los estados de las estaciones los pone js/app.js. */
const MAPA=(()=>{
const SC=1.32,sc=p=>[p[0]*SC,p[1]*SC];
const RIVER0=[[520,1260],[540,1150],[562,1030],[585,910],[600,800],[612,700],[618,620],[628,540],[640,450],[652,360],[666,260],[682,160],[700,20],[714,-80],[730,-200]];
const RIVER=RIVER0.map(sc);
const TRUNK=[[605,965],[622,880],[640,745],[650,650],[656,585],[667,480],[676,400],[684,330],[695,250],[712,160],[724,70],[738,-30],[752,-120]].map(sc);
const NUTI=[445,335,48]; /* vuelta de Conjuntos alrededor del cerro El Volador */
/* Trazado de cada línea desde su cabecera. side: lado de los nombres (1 o −1); alt: alterna lados; curve: suaviza.
   Las líneas más cercanas a la salida son Conjuntos, 1, 2 y 3; después 4 y 5 al sur y los cables (6 al norte, 7 al sur). */
const ROUTES={
  bie:{pts:[],side:1},
  fun:{pts:[[724,70],[470,44],[170,12]],side:-1,alt:true,cable:true},
  ent:{pts:[[697,240],[790,226],[880,204],[960,174],[1040,138],[1110,98],[1170,56]],side:-1,curve:true},
  con:{pts:[],side:-1},
  rac:{pts:[[676,420],[590,432],[500,440],[410,450],[320,464],[230,486],[150,516]],side:1,curve:true,alt:true},
  rec:{pts:[[670,472],[760,496],[850,522],[935,558],[1005,604],[1060,660],[1100,724],[1130,792]],side:1,curve:true},
  alg:{pts:[[650,640],[560,660],[470,698],[390,748],[320,808],[262,868],[214,930],[178,992]],side:-1,curve:true},
  ecu:{pts:[[633,770],[722,788],[810,816],[890,854],[960,902],[1012,960],[1052,1028],[1080,1100],[1100,1170],[1110,1235]],side:1,curve:true,alt:true},
  tri:{pts:[[608,935],[420,1000],[220,1060]],side:-1,alt:true,cable:true}};
{const [cx,cy,r]=NUTI,p=[[684,332],[600,348],[520,350]];for(let k=0;k<=34;k++){const a=.3+k/34*Math.PI*1.62;p.push([cx+r*Math.cos(a),cy+r*Math.sin(a)])}ROUTES.con.pts=p}
for(const R of Object.values(ROUTES))R.pts=R.pts.map(sc);
const HOODS=[["Bello",820,-95],["Castilla",600,128],["Robledo",225,190],["Aranjuez",930,295],["Santo Domingo",1090,250],["Manrique",910,650],["Centro",770,610],["Laureles",430,585],["San Javier",150,660],["Belén",410,895],["Guayabal",540,1090],["El Poblado",760,965],["Envigado",780,1225],["Itagüí",400,1225],["Santa Elena",1210,560],["Las Palmas",1190,945]].map(([n,x,y])=>[n,x*SC,y*SC]);
const HILLS=[["Cerro Nutibara",480,800],["Cerro El Volador",455,268],["Pan de Azúcar",960,640]].map(([n,x,y])=>[n,x*SC,y*SC]);
const CREEKS=[[[1250,560],[1100,580],[950,560],[820,560],[700,555],[630,548]],[[60,520],[200,560],[340,590],[470,600],[612,610]],[[1150,960],[1000,930],[860,900],[700,890],[592,890]]].map(c=>c.map(sc));
const W0=1300*SC,H0=1260*SC;

/* Recintos de la Universidad Nacional de Colombia, sede Medellín: contornos calcados de planos de la sede (en píxeles
   de cada imagen), escalados por su área real (Volador ≈ 27,6 ha; Minas ≈ 6,2 ha) y colocados en su lugar esquemático. */
const IMG_VR={
  vol:[[335,82],[372,96],[405,118],[425,145],[432,190],[430,250],[426,310],[420,360],[414,395],[370,392],[320,386],[270,390],[230,398],[200,385],[190,365],[200,330],[218,290],[240,250],[265,205],[290,160],[312,120]],
  rio:[[440,152],[468,136],[500,146],[498,196],[480,246],[454,262],[440,232],[438,190]]};
const IMG_ROB=[
  [[50,850],[70,760],[140,680],[230,590],[330,470],[420,390],[470,330],[560,300],[640,300],[720,360],[800,410],[880,470],[930,500],[960,540],[1000,600],[1080,660],[1140,720],[1150,790],[1120,860],[1050,910],[960,950],[860,975],[720,990],[580,1000],[480,1010],[390,1050],[330,1090],[260,1120],[200,1140],[150,1110],[100,1020],[60,940]],
  [[960,450],[1050,380],[1150,330],[1270,270],[1400,210],[1520,160],[1600,130],[1660,130],[1750,180],[1860,260],[1910,330],[1910,500],[1905,690],[1700,700],[1500,720],[1300,740],[1240,740],[1200,690],[1140,610],[1060,530],[990,480]],
  [[420,1090],[520,1080],[630,1090],[650,1180],[640,1260],[580,1300],[480,1290],[420,1250],[405,1170]]];
const IMG_LIB=[[284,283],[300,278],[314,282],[320,294],[312,306],[296,308],[286,300]];
const areaOf=P=>Math.abs(P.reduce((a,p,i)=>{const q=P[(i+1)%P.length];return a+p[0]*q[1]-q[0]*p[1]},0))/2;
const cenOf=P=>{let x=0,y=0;P.forEach(p=>{x+=p[0];y+=p[1]});return[x/P.length,y/P.length]};
function campusT(ref,haRef,at,k){const s=Math.sqrt(haRef*1e4)*k/Math.sqrt(areaOf(ref)),[cx,cy]=cenOf(ref);return([x,y])=>[at[0]+(x-cx)*s,at[1]+(y-cy)*s]}
const TVR=campusT(IMG_VR.vol,27.6,[730,300],.21),TROB=campusT(IMG_ROB[0],6.2,[420,252],.25);
const CAMPUS=[IMG_VR.vol.map(TVR),IMG_VR.rio.map(TVR),...IMG_ROB.map(P=>P.map(TROB))];
const LIB=(()=>{const P=IMG_LIB.map(TVR),[cx,cy]=cenOf(P);return{pts:P.map(([x,y])=>[cx+(x-cx)*2.2,cy+(y-cy)*2.2]),c:[cx,cy]}})();

/* ---------- utilidades de trazado ---------- */
function catmull(pts,seg=14){if(pts.length<3)return pts.slice();const out=[];const P=i=>pts[Math.max(0,Math.min(pts.length-1,i))];
  for(let i=0;i<pts.length-1;i++){const p0=P(i-1),p1=P(i),p2=P(i+1),p3=P(i+2);for(let k=0;k<seg;k++){const t=k/seg,t2=t*t,t3=t2*t;
    out.push([0,1].map(j=>.5*((2*p1[j])+(-p0[j]+p2[j])*t+(2*p0[j]-5*p1[j]+4*p2[j]-p3[j])*t2+(-p0[j]+3*p1[j]-3*p2[j]+p3[j])*t3)))}}out.push(pts[pts.length-1]);return out}
function measure(pts){const acc=[0];for(let i=1;i<pts.length;i++)acc.push(acc[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));return{pts,acc,len:acc[acc.length-1]}}
function at(m,s){s=Math.max(0,Math.min(m.len,s));let i=1;while(i<m.acc.length-1&&m.acc[i]<s)i++;const a=m.pts[i-1],b=m.pts[i],L=m.acc[i]-m.acc[i-1]||1,t=(s-m.acc[i-1])/L;
  return{x:a[0]+(b[0]-a[0])*t,y:a[1]+(b[1]-a[1])*t,dx:(b[0]-a[0])/L,dy:(b[1]-a[1])/L}}
function slice(m,s0,s1){const out=[],n=Math.max(2,Math.ceil(Math.abs(s1-s0)/4));for(let i=0;i<=n;i++){const p=at(m,s0+(s1-s0)*i/n);out.push([p.x,p.y])}return out}
const pd=pts=>"M"+pts.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" L");
const poly=P=>P.map(p=>p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ");
const rx=y=>{y/=SC;for(let i=1;i<RIVER0.length;i++){const [x0,y0]=RIVER0[i-1],[x1,y1]=RIVER0[i];if((y<=y0&&y>=y1)||(y>=y0&&y<=y1)){const t=(y-y0)/(y1-y0||1);return(x0+(x1-x0)*t)*SC}}return(y<0?708:520)*SC};
const riverM=measure(catmull(RIVER,10)),trunkM=measure(catmull(TRUNK,10));
/* Bienestar sale de la biblioteca, cruza al corredor del río (transbordo en «Cómo me veo como estudiante») y sigue al oriente */
{let tp=null;for(const p of trunkM.pts)if(p[1]<=383&&(!tp||p[1]>tp[1]))tp=p;const L=LIB.c,[tx,ty]=tp;
  Object.assign(ROUTES.bie,{pts:[L,[L[0]+70,L[1]+40],[tx-70,ty-6],[tx,ty],[tx+95,ty+22],[tx+185,ty+58]],stops:[0,3,4,5],head:3})}

/* ---------- estaciones colocadas a lo largo de cada línea ---------- */
const GEO={},HEADS={};
function build(LABS){const ST=[];
  for(const [l,R] of Object.entries(ROUTES)){const m=measure(R.curve?catmull(R.pts):R.pts);GEO[l]=m;
    const ids=[...(l!=="bie"?[["D"+l,["Diagnóstico"]]]:[]),...LABS[l]],step=m.len/(ids.length-1);
    m.headS=R.head!=null?m.acc[R.head]:0;
    ids.forEach(([id,lab],k)=>{const s=R.stops?m.acc[R.stops[k]]:k*step,p=at(m,s);ST.push({id,line:l,s,x:p.x,y:p.y,dx:p.dx,dy:p.dy,lab,k,diag:l!=="bie"&&k===0,start:l==="bie"&&k===0})});
    const h=at(m,m.headS);let best=0,bd=1e9;trunkM.pts.forEach((q,i)=>{const dd=Math.hypot(q[0]-h.x,q[1]-h.y);if(dd<bd){bd=dd;best=trunkM.acc[i]}});HEADS[l]=best}
  return ST}

/* ---------- fondo: valle, relieve (js/relieve.js), quebradas, río, barrios, recintos UNAL, corredor ---------- */
let BASE=null;
function base(){if(BASE)return BASE;let h=`<rect x="-1000" y="-500" width="${W0+2000}" height="${H0+1000}" fill="var(--valley)"/>`;
  if(typeof RELIEVE!=="undefined")h+=`<g class="relief" fill="var(--terrain)" stroke="var(--terrain)">${RELIEVE.map(([p,i])=>`<path d="${p}" style="fill-opacity:calc(var(--rk) * ${Math.min(.12,.06+i*.004).toFixed(3)});stroke-opacity:calc(var(--rk) * ${i%4===3?.6:.3})" stroke-width="${i%4===3?1.1:.7}"/>`).join("")}</g>`;
  CREEKS.forEach(c=>h+=`<path d="${pd(catmull(c,8))}" fill="none" stroke="var(--river)" stroke-width="1.6" stroke-opacity=".55"/>`);
  h+=`<path d="${pd(riverM.pts)}" fill="none" stroke="var(--river-bank)" stroke-width="22" stroke-linecap="round"/><path d="${pd(riverM.pts)}" fill="none" stroke="var(--river)" stroke-width="7" stroke-linecap="round"/>`;
  h+=`<text class="rivername" transform="translate(${(rx(1110*SC)-30).toFixed(1)} ${1110*SC}) rotate(-80)">Río Medellín</text>`;
  HILLS.forEach(([n,x,y])=>h+=`<text class="hill" x="${x}" y="${y+4}" text-anchor="middle">${n}</text>`);
  HOODS.forEach(([n,x,y])=>h+=`<text class="hood" x="${x}" y="${y}" text-anchor="middle">${n}</text>`);
  h+=`<polygon points="${poly(LIB.pts)}" fill="var(--l-bie)" fill-opacity=".28" stroke="var(--l-bie)" stroke-width="2.2" stroke-linejoin="round"/>`;
  h+=CAMPUS.map(P=>`<polygon points="${poly(P)}" fill="var(--unal-fill)" fill-opacity=".85" stroke="var(--unal)" stroke-width="2.2" stroke-dasharray="6 3.5" stroke-linejoin="round"/>`).join("");
  h+=`<path d="${pd(trunkM.pts)}" fill="none" stroke="var(--casing)" stroke-width="10" stroke-linecap="round"/><path d="${pd(trunkM.pts)}" fill="none" stroke="var(--muted)" stroke-width="5" stroke-linecap="round"/>`;
  const e=at(trunkM,trunkM.len);h+=`<circle cx="${e.x.toFixed(1)}" cy="${e.y.toFixed(1)}" r="9" fill="var(--surface)" stroke="var(--muted)" stroke-width="4"/><text class="term" x="${(e.x+16).toFixed(1)}" y="${(e.y+5).toFixed(1)}">Bello</text>`;
  h+=`<g transform="translate(${W0-70} ${H0-80})"><circle r="24" fill="var(--surface)" stroke="var(--rule)"/><path d="M0 -17 L6 4 L0 0 L-6 4 Z" fill="var(--ink)"/><text y="16" text-anchor="middle" class="term" style="font-size:11px;fill:var(--ink)">N</text></g>`;
  return BASE=h}
/* trazado de una línea; las de cable llevan su cable y una cabina entre cada par de estaciones */
function lineSVG(l,col,stops){const m=GEO[l],R=ROUTES[l];
  if(R.cable){let h=`<path d="${pd(m.pts)}" fill="none" stroke="var(--casing)" stroke-width="9" stroke-linecap="round"/><path d="${pd(m.pts)}" fill="none" stroke="${col}" stroke-width="4.5" stroke-linecap="round"/><path d="${pd(m.pts)}" fill="none" stroke="var(--ink)" stroke-width="1.2" stroke-opacity=".7" transform="translate(0 -5)"/>`;
    for(let i=0;i<stops.length-1;i++){const p=at(m,(stops[i]+stops[i+1])/2);h+=`<g transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})"><line x1="0" y1="-5" x2="0" y2="3" stroke="var(--ink)" stroke-width="1"/><rect x="-5" y="3" width="10" height="8" rx="2.4" fill="${col}" stroke="var(--casing)" stroke-width="1.2"/></g>`}return h}
  return`<path d="${pd(m.pts)}" fill="none" stroke="var(--casing)" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="${pd(m.pts)}" fill="none" stroke="${col}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"${l==="bie"?' stroke-dasharray="14 6"':""}/>`}
/* insignia al final de cada línea */
function badge(l,col,txt){const m=GEO[l],e=at(m,m.len),x=e.x+e.dx*26,y=e.y+e.dy*26;
  return`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="14" fill="${col}" stroke="var(--casing)" stroke-width="2.5"/><text x="${x.toFixed(1)}" y="${(y+5).toFixed(1)}" text-anchor="middle" class="lnum">${txt}</text>`}
/* nombre de la estación, a un lado del trazado (alternando en las líneas con alt) */
function label(s,lines){const R=ROUTES[s.line],sd=R.side*(R.alt&&s.k%2?-1:1);let nx=-s.dy*sd,ny=s.dx*sd;if(s.start){nx=-1;ny=-.15}
  const off=s.diag||s.start?24:17,lx=s.x+nx*off,ly=s.y+ny*off,anchor=nx>.35?"start":nx<-.35?"end":"middle",dy0=ny<-.35?-(lines.length-1)*14:ny>.35?10:-(lines.length-1)*7+4;
  return`<text x="${lx.toFixed(1)}" y="${(ly+dy0).toFixed(1)}" text-anchor="${anchor}">${lines.map((t,i)=>`<tspan x="${lx.toFixed(1)}" dy="${i?14:0}">${t}</tspan>`).join("")}</text>`}

/* ---------- viaje: por la línea hasta su cabecera, por el corredor del río y por la otra línea ---------- */
const RIDE={ent:"metro",rac:"metro",rec:"metro",alg:"metro",ecu:"metro",rio:"metro",fun:"cable",tri:"cable",bie:"bus",con:"bus"};
function legs(a,b){if(a.line===b.line)return[{line:a.line,pts:slice(GEO[a.line],a.s,b.s)}];
  return[{line:a.line,pts:slice(GEO[a.line],a.s,GEO[a.line].headS)},{line:"rio",pts:slice(trunkM,HEADS[a.line],HEADS[b.line])},{line:b.line,pts:slice(GEO[b.line],GEO[b.line].headS,b.s)}].filter(l=>measure(l.pts).len>2)}
const headSVG=(skin,hair)=>`<circle cx="0" cy="0" r="3.4" fill="${skin}" stroke="var(--ink)" stroke-width=".6"/><path d="M-3.1 -.6 Q-2.8 -4 .4 -3.8 Q3.2 -3.6 3.4 -.8 Q1.6 -2.4 -3.1 -.6Z" fill="${hair}"/>`;
function carSVG(c,front,head){return`<g><rect x="-15" y="-7.5" width="30" height="15" rx="${front?6:3}" fill="${c}" stroke="var(--casing)" stroke-width="1.6"/>
  ${[-9,-1.5,6].map(x=>`<rect x="${x}" y="-4.6" width="5.6" height="5.4" rx="1.2" fill="var(--surface)" opacity=".92"/>`).join("")}
  ${front?`<g transform="translate(9 -1.2) scale(.62)">${head}</g>`:""}<rect x="-15" y="3.2" width="30" height="2" fill="var(--ink)" opacity=".25"/>${front?`<circle cx="13" cy="4.6" r="1.3" fill="#FFE27A"/>`:""}</g>`}
function busSVG(c,head){return`<g><rect x="-17" y="-9" width="34" height="15" rx="4" fill="${c}" stroke="var(--casing)" stroke-width="1.6"/>
  ${[-13,-6,1].map(x=>`<rect x="${x}" y="-6.5" width="5.4" height="5" rx="1" fill="var(--surface)" opacity=".92"/>`).join("")}<rect x="8.5" y="-6.5" width="6" height="9" rx="1" fill="var(--surface)" opacity=".92"/>
  <g transform="translate(-3 -3.2) scale(.6)">${head}</g><circle cx="-9" cy="6.5" r="3.2" fill="var(--ink)" stroke="var(--casing)" stroke-width="1"/><circle cx="9" cy="6.5" r="3.2" fill="var(--ink)" stroke="var(--casing)" stroke-width="1"/><circle cx="15.5" cy="2.5" r="1.2" fill="#FFE27A"/></g>`}
function cabinSVG(c,head){return`<g><line x1="0" y1="-5" x2="0" y2="2" stroke="var(--ink)" stroke-width="1.4"/><circle cx="0" cy="-5" r="2" fill="var(--ink)"/>
  <rect x="-10" y="2" width="20" height="17" rx="4" fill="${c}" stroke="var(--casing)" stroke-width="1.6"/><rect x="-7" y="5" width="14" height="7" rx="1.5" fill="var(--surface)" opacity=".92"/>
  <g transform="translate(0 9) scale(.7)">${head}</g></g>`}
const orient=p=>{const a=Math.atan2(p.dy,p.dx)*180/Math.PI;return p.dx<-.02?`rotate(${(a-180).toFixed(1)}) scale(-1 1)`:`rotate(${a.toFixed(1)})`};
function vehicle(kind,c,m,sv,head){const T=p=>`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`;
  if(kind==="cable")return`<g transform="${T(at(m,sv))} scale(1.7)">${cabinSVG(c,head)}</g>`;
  if(kind==="bus"){const p=at(m,sv);return`<g transform="${T(p)} scale(1.6) ${orient(p)}">${busSVG(c,head)}</g>`}
  const p1=at(m,sv),p2=at(m,sv-34*1.6);return[[p2,false],[p1,true]].map(([p,f])=>`<g transform="${T(p)} scale(1.6) ${orient(p)}">${carSVG(c,f,head)}</g>`).join("")}

const FULL={x:-30,y:-200,w:W0+60,h:H0+230};
return{ROUTES,GEO,FULL,at,build,base,lineSVG,badge,label,legs,measure,vehicle,headSVG,RIDE}})();
