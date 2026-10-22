"use strict";
/* Base común: utilidades, lector de expresiones, azar y dibujo. Lo usan todas las líneas. */
/* ============ utilidades ============ */
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=n=>{const r=Math.round(n*1000)/1000;return r<0?"−"+Math.abs(r):String(r)};
const fmtP=n=>n<0?"("+fmt(n)+")":fmt(n);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const reduceMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
function seeded(str){let h=2166136261;for(const c of str){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return()=>{h^=h<<13;h^=h>>>17;h^=h<<5;return((h>>>0)%100000)/100000}}
function shuffle(arr,key){const r=seeded(key);const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
let toastT;function toast(msg){const t=$("#toast");t.textContent=msg;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,3400)}

/* ============ lector de expresiones (para corregir respuestas algebraicas) ============ */
/* Números escritos a la colombiana: coma decimal (0,75) y punto de miles (1.500 o 1.500,25).
   También se acepta el punto decimal (0.75, 2.5) cuando no puede ser un separador de miles. */
function readNum(raw){let t=raw;const dots=(t.match(/\./g)||[]).length,commas=(t.match(/,/g)||[]).length;
  if(commas>1)throw Error("num");
  if(commas&&dots){if(!/^\d{1,3}(\.\d{3})+,\d*$/.test(t))throw Error("num");t=t.replace(/\./g,"").replace(",",".")}
  else if(commas)t=t.replace(",",".");
  else if(dots){if(/^[1-9]\d{0,2}(\.\d{3})+$/.test(t))t=t.replace(/\./g,"");else if(dots>1)throw Error("num")}
  if(t==="."||t==="")throw Error("num");const v=+t;if(isNaN(v))throw Error("num");return v}
function tokenize(src){
  let s=String(src).replace(/[−–—]/g,"-").replace(/[·×]/g,"*").replace(/²/g,"^2").replace(/³/g,"^3").replace(/\s+/g,"").toLowerCase();
  const out=[];let i=0;
  while(i<s.length){const c=s[i];
    if(/[0-9.,]/.test(c)){let j=i;while(j<s.length&&/[0-9.,]/.test(s[j]))j++;out.push({t:"n",v:readNum(s.slice(i,j))});i=j;continue}
    if(/[a-z]/.test(c)){out.push({t:"v",v:c});i++;continue}
    if("+-*/^()".includes(c)){out.push({t:c});i++;continue}
    throw Error("char")}
  const res=[];
  for(let k=0;k<out.length;k++){const a=res[res.length-1],b=out[k];
    if(a&&(a.t==="n"||a.t==="v"||a.t===")")&&(b.t==="v"||b.t==="("||(a.t===")"&&b.t==="n")))res.push({t:"*"});
    res.push(b)}
  return res}
function parseExpr(src){
  const tk=tokenize(src);let p=0;const peek=()=>tk[p],eat=t=>{if(!tk[p]||tk[p].t!==t)throw Error("syntax");p++};
  function expr(){let n=term();while(peek()&&(peek().t==="+"||peek().t==="-")){const op=tk[p++].t;n={op,a:n,b:term()}}return n}
  function term(){let n=unary();while(peek()&&(peek().t==="*"||peek().t==="/")){const op=tk[p++].t;n={op,a:n,b:unary()}}return n}
  function unary(){if(peek()&&peek().t==="-"){p++;return{op:"neg",a:unary()}}if(peek()&&peek().t==="+"){p++;return unary()}return power()}
  function power(){const b=atom();if(peek()&&peek().t==="^"){p++;return{op:"^",a:b,b:unary()}}return b}
  function atom(){const t=peek();if(!t)throw Error("end");
    if(t.t==="n"){p++;return{num:t.v}}if(t.t==="v"){p++;return{v:t.v}}
    if(t.t==="("){p++;const e=expr();eat(")");return e}throw Error("syntax")}
  const n=expr();if(p!==tk.length)throw Error("trail");return n}
function evalAst(n,env){
  if("num"in n)return n.num;if("v"in n)return env[n.v]??0;
  switch(n.op){case"neg":return-evalAst(n.a,env);case"+":return evalAst(n.a,env)+evalAst(n.b,env);case"-":return evalAst(n.a,env)-evalAst(n.b,env);
    case"*":return evalAst(n.a,env)*evalAst(n.b,env);case"/":return evalAst(n.a,env)/evalAst(n.b,env);case"^":return Math.pow(evalAst(n.a,env),evalAst(n.b,env))}}
function varsOf(n,s=new Set()){if("v"in n)s.add(n.v);if(n.a)varsOf(n.a,s);if(n.b)varsOf(n.b,s);return s}
function countTerms(n){if(n.op==="+"||n.op==="-")return countTerms(n.a)+countTerms(n.b);return 1}
function equivalent(a,b){const vs=new Set([...varsOf(a),...varsOf(b)]);
  for(let k=0;k<6;k++){const env={};vs.forEach(v=>env[v]=((k*7.31+v.charCodeAt(0)*1.17)%9)-4.21);
    const x=evalAst(a,env),y=evalAst(b,env);if(!isFinite(x)||Math.abs(x-y)>1e-7*Math.max(1,Math.abs(y)))return false}return true}

/* ============ ejercicios con variación: cada visita genera números nuevos ============ */
function rng(seed){const r=seeded(String(seed));return{f:r,i:(a,b)=>a+Math.floor(r()*(b-a+1)),p:arr=>arr[Math.floor(r()*arr.length)],
  nz:(a,b)=>{let v=0;while(v===0)v=a+Math.floor(r()*(b-a+1));return v},
  sh:arr=>{const x=arr.slice();for(let k=x.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[x[k],x[j]]=[x[j],x[k]]}return x}}}
const newSeed=()=>Math.random().toString(36).slice(2,10);
const M=s=>`<span class='m'>${s}</span>`;
const sg=n=>(n<0?" − ":" + ")+Math.abs(n);
const lin=(lead,ts)=>lead+ts.map(sg).join("");
const co=(c,l)=>c===1?l:c===-1?"−"+l:fmt(c)+l;
const poly=terms=>{let out="";terms.filter(t=>t[0]!==0).forEach(([c,l],i)=>{const a=Math.abs(c);const body=(a===1&&l?"":a)+l;out+=i===0?(c<0?"−":"")+body:(c<0?" − ":" + ")+body});return out||"0"};
const sum=a=>a.reduce((x,y)=>x+y,0);
/* dibujos que acompañan a algunos enunciados */
const T_=(x,y,t,st="")=>`<text x="${x}" y="${y}" text-anchor="middle" style="paint-order:stroke;stroke:var(--surface);stroke-width:4px;font:${st||"600 12px var(--f-disp)"};fill:var(--muted)">${t}</text>`;
/* ============ exploraciones ============ */
function svgPt(svg,e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse())}
function tween(ms,fn){return new Promise(res=>{if(reduceMotion){fn(1);res();return}const t0=performance.now();
  const f=t=>{const u=Math.min(1,(t-t0)/ms);fn(u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2);if(u<1)requestAnimationFrame(f);else res()};requestAnimationFrame(f)})}
const qb=(x1,y1,cx,cy,x2,y2,t)=>[(1-t)*(1-t)*x1+2*(1-t)*t*cx+t*t*x2,(1-t)*(1-t)*y1+2*(1-t)*t*cy+t*t*y2];
function dragOn(svg,{down,move,up}){svg.style.touchAction="none";let on=false;
  svg.addEventListener("pointerdown",e=>{if(down(svgPt(svg,e),e)===false)return;on=true;try{svg.setPointerCapture(e.pointerId)}catch(x){}e.preventDefault()});
  svg.addEventListener("pointermove",e=>{if(on)move(svgPt(svg,e),e)});
  const end=()=>{if(on){on=false;up&&up()}};svg.addEventListener("pointerup",end);svg.addEventListener("pointercancel",end)}

/* Fracciones */
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1};
const lcm=(a,b)=>a/gcd(a,b)*b;
const red=(p,q)=>{if(q<0){p=-p;q=-q}const g=gcd(p,q);return[p/g,q/g]};
const frs=(p,q)=>{[p,q]=red(p,q);return q===1?fmt(p):(p<0?"−":"")+Math.abs(p)+"/"+q};
const F=(p,q)=>(p<0?"−":"")+`<span class="fr"><span>${Math.abs(p)}</span><span>${q}</span></span>`;
const FR=(p,q)=>{[p,q]=red(p,q);return q===1?fmt(p):F(p,q)};
const decs=(x,d=2)=>{let t=(Math.round(x*Math.pow(10,d))/Math.pow(10,d)).toFixed(d).replace(/0+$/,"").replace(/\.$/,"");return(t.startsWith("-")?"−"+t.slice(1):t).replace(".",",")};
const PAL=["var(--av-coral)","var(--l-ent)","var(--av-sol)","var(--av-menta)","var(--av-lila)","var(--l-rac)"];
/* Barra de fracción (para enunciados y explicaciones) */
function figBars(list,opt={}){const W=opt.w||360,h=26,gap=14,x0=opt.lab===false?10:70;let y=10,g="";
  list.forEach(([a,b,col,lab])=>{const cw=W/b;for(let i=0;i<b;i++)g+=`<rect x="${x0+i*cw}" y="${y}" width="${cw}" height="${h}" fill="${i<a?(col||"var(--l-rac)"):"var(--surface-2)"}" stroke="var(--surface)" stroke-width="2"/>`;
    g+=`<rect x="${x0}" y="${y}" width="${W}" height="${h}" fill="none" stroke="var(--muted)" stroke-width="1.5"/>`;
    if(opt.lab!==false)g+=`<text x="${x0-10}" y="${y+h/2+5}" text-anchor="end" style="font:700 14px var(--f-mono);fill:var(--ink)">${lab||(a+"/"+b)}</text>`;y+=h+gap});
  return`<svg viewBox="0 0 ${x0+W+12} ${y}" role="img" aria-label="Barras de fracciones">${g}</svg>`}

/* Producto (para comprobar factorizaciones) e inecuaciones escritas por el estudiante */
function isProduct(n){while(n&&n.op==="neg")n=n.a;return!!n&&(n.op==="*"||n.op==="^")}
function parseIneq(src){let t=String(src).replace(/≤/g,"<=").replace(/≥/g,">=").replace(/[−–]/g,"-").replace(/\s+/g,"").toLowerCase();
  const flip={"<":">",">":"<","<=":">=",">=":"<="};let m=t.match(/^x(<=|>=|<|>)(.+)$/),op,val;
  if(m){op=m[1];val=m[2]}else{m=t.match(/^(.+?)(<=|>=|<|>)x$/);if(!m)return null;op=flip[m[2]];val=m[1]}
  try{const a=parseExpr(val);if(varsOf(a).size)return null;return{op,val:evalAst(a,{})}}catch(e){return null}}
const OPS={"<":"<",">":">","<=":"≤",">=":"≥"};
const P=(b,e)=>`${b}<sup>${e}</sup>`;
/* Recta con un intervalo dibujado: a o b pueden ser null (infinito) */
function figInterval(a,b,ca,cb,min=-10,max=10){const X=v=>30+(v-min)/(max-min)*580;let g=`<svg viewBox="0 0 640 86" role="img" aria-label="Intervalo dibujado en la recta"><line x1="14" y1="44" x2="626" y2="44" stroke="var(--rule)" stroke-width="2"/>`;
  for(let v=min;v<=max;v++)g+=`<line x1="${X(v)}" y1="39" x2="${X(v)}" y2="49" stroke="var(--muted)"/>`+(v%2===0||max-min<=12?`<text x="${X(v)}" y="70" text-anchor="middle" style="font:12px var(--f-mono);fill:var(--muted)">${fmt(v)}</text>`:"");
  const xa=a==null?14:X(a),xb=b==null?626:X(b);g+=`<line x1="${xa}" y1="44" x2="${xb}" y2="44" stroke="var(--l-rec)" stroke-width="6"/>`;
  if(a==null)g+=`<polygon points="10,44 22,37 22,51" fill="var(--l-rec)"/>`;if(b==null)g+=`<polygon points="630,44 618,37 618,51" fill="var(--l-rec)"/>`;
  if(a!=null)g+=`<circle cx="${xa}" cy="44" r="7" fill="${ca?"var(--l-rec)":"var(--surface)"}" stroke="var(--l-rec)" stroke-width="3"/>`;
  if(b!=null)g+=`<circle cx="${xb}" cy="44" r="7" fill="${cb?"var(--l-rec)":"var(--surface)"}" stroke="var(--l-rec)" stroke-width="3"/>`;return g+`</svg>`}
const ivl=(a,b,ca,cb)=>`${a==null?"(":ca?"[":"("}${a==null?"−∞":fmt(a)}, ${b==null?"+∞":fmt(b)}${b==null?")":cb?"]":")"}`;
/* Tabla sencilla para enunciados */
function figTable(head,rows){return`<div class="tablewrap"><table class="mini"><thead><tr>${head.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`}

/* Registros que llenan los ficheros de cada línea (js/lineas/*.js) */
const NODES={},RETO={},RECAP={},EXPLORE={};

/* Plano cartesiano en SVG para exploraciones y retos.
   o: {xmin,xmax,ymin,ymax,w,h,grid,fns:[{f,color,width,dash,from,to}],pts:[{x,y,color,open,label,r}],
       hl:[{y,color,dash,label}],vl:[{x,color,dash,label}],xstep,ystep,xlab,ylab} */
function plot(o){const w=o.w||560,pad=34,h=o.equal?Math.round(2*pad+(w-2*pad)*(o.ymax-o.ymin)/(o.xmax-o.xmin)):(o.h||340),X=x=>pad+(x-o.xmin)/(o.xmax-o.xmin)*(w-2*pad),Y=y=>h-pad-(y-o.ymin)/(o.ymax-o.ymin)*(h-2*pad);
  const xs=o.xstep||niceStep(o.xmax-o.xmin),ys=o.ystep||niceStep(o.ymax-o.ymin);let g=`<rect x="${pad}" y="${pad}" width="${w-2*pad}" height="${h-2*pad}" fill="var(--surface)" stroke="var(--rule)"/>`;
  const XT=o.xticks||(()=>{const a=[];for(let x=Math.ceil(o.xmin/xs)*xs;x<=o.xmax+1e-9;x+=xs)a.push([x,decs(x,2)]);return a})();
  XT.forEach(([x,lab])=>{const px=X(x);g+=`<line x1="${px}" y1="${pad}" x2="${px}" y2="${h-pad}" stroke="var(--rule)" stroke-width="${Math.abs(x)<1e-9?1.6:.6}"/><text x="${px}" y="${h-pad+15}" text-anchor="middle" style="font:11px var(--f-mono);fill:var(--muted)">${lab}</text>`});
  for(let y=Math.ceil(o.ymin/ys)*ys;y<=o.ymax+1e-9;y+=ys){const py=Y(y);g+=`<line x1="${pad}" y1="${py}" x2="${w-pad}" y2="${py}" stroke="var(--rule)" stroke-width="${Math.abs(y)<1e-9?1.6:.6}"/><text x="${pad-5}" y="${py+4}" text-anchor="end" style="font:11px var(--f-mono);fill:var(--muted)">${decs(y,2)}</text>`}
  if(o.xmin<0&&o.xmax>0)g+=`<line x1="${X(0)}" y1="${pad}" x2="${X(0)}" y2="${h-pad}" stroke="var(--ink)" stroke-width="1.4" opacity=".6"/>`;
  if(o.ymin<0&&o.ymax>0)g+=`<line x1="${pad}" y1="${Y(0)}" x2="${w-pad}" y2="${Y(0)}" stroke="var(--ink)" stroke-width="1.4" opacity=".6"/>`;
  g+=`<defs><clipPath id="pc${w}${h}"><rect x="${pad}" y="${pad}" width="${w-2*pad}" height="${h-2*pad}"/></clipPath></defs><g clip-path="url(#pc${w}${h})">`;
  const sx=(w-2*pad)/(o.xmax-o.xmin),sy=(h-2*pad)/(o.ymax-o.ymin),stl=e=>`fill="${e.fill||"none"}" stroke="${e.color||"var(--ink)"}" stroke-width="${e.width||2.5}" ${e.dash?`stroke-dasharray="${e.dash}"`:""} ${e.op!=null?`opacity="${e.op}"`:""}`;
  (o.polys||[]).forEach(e=>g+=`<polygon points="${e.pts.map(([x,y])=>X(x).toFixed(1)+","+Y(y).toFixed(1)).join(" ")}" ${stl(e)} stroke-linejoin="round"/>`);
  (o.circs||[]).forEach(e=>g+=`<ellipse cx="${X(e.cx)}" cy="${Y(e.cy)}" rx="${(e.r*sx).toFixed(1)}" ry="${(e.r*sy).toFixed(1)}" ${stl(e)}/>`);
  (o.segs||[]).forEach(e=>g+=`<line x1="${X(e.x1)}" y1="${Y(e.y1)}" x2="${X(e.x2)}" y2="${Y(e.y2)}" ${stl(e)} stroke-linecap="round"/>`);
  if(o.raw)g+=o.raw(X,Y);
  (o.hl||[]).forEach(l=>g+=`<line x1="${pad}" y1="${Y(l.y)}" x2="${w-pad}" y2="${Y(l.y)}" stroke="${l.color||"var(--muted)"}" stroke-width="${l.width||2}" ${l.dash?`stroke-dasharray="${l.dash}"`:""}/>`);
  (o.vl||[]).forEach(l=>g+=`<line x1="${X(l.x)}" y1="${pad}" x2="${X(l.x)}" y2="${h-pad}" stroke="${l.color||"var(--muted)"}" stroke-width="${l.width||2}" ${l.dash?`stroke-dasharray="${l.dash}"`:""}/>`);
  (o.fns||[]).forEach(F_=>{const a=F_.from??o.xmin,b=F_.to??o.xmax,N=400;let d="",pen=false;
    for(let i=0;i<=N;i++){const x=a+(b-a)*i/N,y=F_.f(x);if(!isFinite(y)||Math.abs(y)>1e4||y>o.ymax+(o.ymax-o.ymin)*2||y<o.ymin-(o.ymax-o.ymin)*2){pen=false;continue}d+=(pen?"L":"M")+X(x).toFixed(1)+" "+Y(y).toFixed(1);pen=true}
    g+=`<path d="${d}" fill="none" stroke="${F_.color||"var(--linec)"}" stroke-width="${F_.width||3}" ${F_.dash?`stroke-dasharray="${F_.dash}"`:""} stroke-linejoin="round"/>`});
  g+=`</g>`;
  (o.pts||[]).forEach(p=>{if(p.x<o.xmin||p.x>o.xmax||p.y<o.ymin||p.y>o.ymax)return;g+=`<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="${p.r||6}" fill="${p.open?"var(--surface)":p.color||"var(--ink)"}" stroke="${p.color||"var(--ink)"}" stroke-width="2.5"/>`+(p.label?`<text x="${X(p.x)+(p.dx??8)}" y="${Y(p.y)-(p.dy??10)}" style="paint-order:stroke;stroke:var(--surface);stroke-width:4px;font:700 12px var(--f-mono);fill:${p.color||"var(--ink)"}">${p.label}</text>`:"")});
  if(o.axes){if(o.ymin<0&&o.ymax>0)g+=`<text x="${w-pad-4}" y="${Y(0)-8}" text-anchor="end" style="font:italic 700 14px var(--f-body);fill:var(--ink)">x</text>`;if(o.xmin<0&&o.xmax>0)g+=`<text x="${X(0)+8}" y="${pad+14}" style="font:italic 700 14px var(--f-body);fill:var(--ink)">y</text>`}
  (o.labels||[]).forEach(t=>g+=`<text x="${X(t.x)}" y="${Y(t.y)}" style="paint-order:stroke;stroke:var(--surface);stroke-width:4px;font:700 13px var(--f-mono);fill:${t.color||"var(--ink)"}">${t.text}</text>`);
  return`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${o.aria||"Gráfica"}" style="max-width:${w}px">${g}</svg>`}
function niceStep(range){const raw=range/8,p=Math.pow(10,Math.floor(Math.log10(raw))),m=raw/p;return(m<1.5?1:m<3?2:m<7?5:10)*p}

/* Diagramas de Venn de 2 o 3 conjuntos dentro de un universo U.
   Regiones: letras de los conjuntos a los que pertenece (a, ab, abc…) y «o» para la de fuera. */
const VENN={
  2:{W:400,H:250,U:[10,10,380,230],c:[[160,130,85],[240,130,85]],nm:[[92,52],[308,52]],
     at:{a:[118,135],ab:[200,135],b:[282,135],o:[40,225]},regs:["a","ab","b","o"]},
  3:{W:400,H:310,U:[10,10,380,290],c:[[160,125,80],[240,125,80],[200,195,80]],nm:[[85,52],[315,52],[300,290]],
     at:{a:[128,105],b:[272,105],c:[200,240],ab:[200,95],ac:[155,175],bc:[245,175],abc:[200,150],o:[40,285]},regs:["a","b","c","ab","ac","bc","abc","o"]}};
const VL="abc";
function vennRegion(n,x,y){const V=VENN[n],[ux,uy,uw,uh]=V.U;if(x<ux||y<uy||x>ux+uw||y>uy+uh)return null;
  const k=V.c.map(([cx,cy,r],i)=>Math.hypot(x-cx,y-cy)<r?VL[i]:"").join("");return k||"o"}
function vennName(code,names){const N=names.length,ins=[...code].filter(c=>c!=="o").map(c=>names[VL.indexOf(c)]);
  if(code==="o")return N===2?`Fuera de ${names[0]} y de ${names[1]}`:"Fuera de los tres";
  if(ins.length===1)return"Solo "+ins[0];if(ins.length===N)return N===2?`${names[0]} y ${names[1]}`:`${names[0]}, ${names[1]} y ${names[2]}`;
  const out=names.filter(nm=>!ins.includes(nm));return`${ins.join(" y ")}, no ${out[0]}`}
/* o: {n, names, shade:[códigos], color, texts:{código:texto}, uid, hide:[índices de círculos sin nombre]} */
function vennSVG(o){const n=o.n||2,V=VENN[n],names=o.names||["A","B","C"].slice(0,n),uid=o.uid||("v"+Math.random().toString(36).slice(2,8)),[ux,uy,uw,uh]=V.U,col=o.color||"var(--linec)";
  let defs="",g=`<rect x="${ux}" y="${uy}" width="${uw}" height="${uh}" rx="10" fill="var(--surface)" stroke="var(--muted)" stroke-width="1.6"/>`;
  V.c.forEach(([cx,cy,r],i)=>defs+=`<clipPath id="${uid}c${i}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>`);
  (o.shade||[]).forEach(code=>{const inc=[],exc=[];V.c.forEach((_,i)=>(code.includes(VL[i])?inc:exc).push(i));
    defs+=`<mask id="${uid}m${code}"><rect x="0" y="0" width="${V.W}" height="${V.H}" fill="#fff"/>${exc.map(i=>`<circle cx="${V.c[i][0]}" cy="${V.c[i][1]}" r="${V.c[i][2]}" fill="#000"/>`).join("")}</mask>`;
    let sh=`<rect x="${ux}" y="${uy}" width="${uw}" height="${uh}" rx="10" fill="${col}" fill-opacity=".42" mask="url(#${uid}m${code})"/>`;
    inc.forEach(i=>sh=`<g clip-path="url(#${uid}c${i})">${sh}</g>`);g+=sh});
  V.c.forEach(([cx,cy,r],i)=>g+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--ink)" stroke-width="2.2"/>`);
  names.forEach((nm,i)=>g+=`<text x="${V.nm[i][0]}" y="${V.nm[i][1]}" text-anchor="middle" style="font:italic 700 20px var(--f-body);fill:var(--ink)">${nm}</text>`);
  g+=`<text x="${ux+12}" y="${uy+24}" style="font:italic 700 16px var(--f-body);fill:var(--muted)">${o.uname||"U"}</text>`;
  Object.entries(o.texts||{}).forEach(([code,t])=>{const [x,y]=V.at[code];g+=`<text x="${x}" y="${y+6}" text-anchor="middle" style="paint-order:stroke;stroke:var(--surface);stroke-width:4px;font:700 ${o.fs||17}px var(--f-mono);fill:var(--ink)">${t}</text>`});
  if(o.extra)g+=o.extra;
  return`<svg viewBox="0 0 ${V.W} ${V.H}" role="img" aria-label="${o.aria||"Diagrama de Venn"}" style="max-width:${o.w||V.W}px;width:100%"><defs>${defs}</defs>${g}</svg>`}
/* Puntos libres dentro de cada región, para colocar elementos sueltos */
function vennSlots(n,step=24){const V=VENN[n],[ux,uy,uw,uh]=V.U,out={};
  for(let y=uy+18;y<uy+uh-8;y+=step)for(let x=ux+18;x<ux+uw-8;x+=step){if(V.c.some(([cx,cy,r])=>Math.abs(Math.hypot(x-cx,y-cy)-r)<11))continue;const k=vennRegion(n,x,y);if(k==="o"&&x<ux+40&&y<uy+36)continue;(out[k]=out[k]||[]).push([x,y])}
  for(const k in out){const [ax,ay]=V.at[k];out[k].sort((p,q)=>Math.hypot(p[0]-ax,p[1]-ay)-Math.hypot(q[0]-ax,q[1]-ay))}return out}
/* Arrastrar sobre un plano dibujado con plot({equal:true}): devuelve coordenadas redondeadas al paso */
function gridPointer(wrap,B,W,cb,step=1){const H=Math.round(68+(W-68)*(B.ymax-B.ymin)/(B.xmax-B.xmin));let on=false;wrap.style.touchAction="none";
  const at=e=>{const svg=wrap.querySelector("svg");if(!svg)return null;const p=svgPt(svg,e);
    let x=Math.round((B.xmin+(p.x-34)/(W-68)*(B.xmax-B.xmin))/step)*step,y=Math.round((B.ymax-(p.y-34)/(H-68)*(B.ymax-B.ymin))/step)*step;
    return[Math.max(B.xmin,Math.min(B.xmax,x)),Math.max(B.ymin,Math.min(B.ymax,y))]};
  wrap.addEventListener("pointerdown",e=>{const q=at(e);if(!q)return;on=true;try{wrap.setPointerCapture(e.pointerId)}catch(x){}e.preventDefault();cb(q,"down")});
  wrap.addEventListener("pointermove",e=>{if(!on)return;const q=at(e);if(q)cb(q,"move")});
  const end=()=>{on=false};wrap.addEventListener("pointerup",end);wrap.addEventListener("pointercancel",end)}
/* Coeficientes como texto: cx(2,3) → "2/3", cx(-1,1) → "−"; tx(p,q) → número o fracción con signo */
const tx=(p,q=1)=>frs(p,q);
