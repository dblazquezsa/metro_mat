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
function tokenize(src){
  let s=String(src).replace(/[−–—]/g,"-").replace(/[·×]/g,"*").replace(/²/g,"^2").replace(/³/g,"^3").replace(/\s+/g,"").toLowerCase();
  const out=[];let i=0;
  while(i<s.length){const c=s[i];
    if(/[0-9.,]/.test(c)){let j=i;while(j<s.length&&/[0-9.,]/.test(s[j]))j++;const t=s.slice(i,j).replace(",",".");if(isNaN(+t))throw Error("num");out.push({t:"n",v:+t});i=j;continue}
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

/* Registros que llenan los ficheros de cada línea (js/lineas/*.js) */
const NODES={},RETO={},RECAP={},EXPLORE={};
