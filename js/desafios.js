"use strict";
/* ============ Desafíos para pensar ============
   Tareas abiertas que aparecen al final de la exploración de algunas estaciones.
   Adaptadas de las tareas «Try This» recopiladas por Peter Liljedahl en
   Building Thinking Classrooms in Mathematics (Corwin, 2020). No cuentan para las estrellas. */

const BTC="Adaptado de una tarea recopilada por P. Liljedahl, <i>Building Thinking Classrooms in Mathematics</i> (2020).";
const DESAFIOS={
  E2:[{title:"Los resultados son…",fn:"dzResultados",credit:BTC,
       intro:"Usa cada número del 1 al 10 una sola vez para formar cinco operaciones de dos números. Tienen que dar exactamente los resultados de la lista, en cualquier orden. Hay dos niveles."},
      {title:"Cuatro cifras",fn:"dzCuatro",credit:BTC,
       intro:"Con estas cuatro cifras, usando cada una exactamente una vez y las operaciones que quieras (+, −, ×, ÷ y paréntesis), consigue el mayor número posible de resultados entre 1 y 30."}],
  R5:[{title:"Partir el 25",fn:"dzVeinticinco",credit:"Adaptado de una tarea de Malcolm Swan recopilada por P. Liljedahl, <i>Building Thinking Classrooms in Mathematics</i> (2020).",
       intro:"Escribe 25 como una suma, por ejemplo 10 + 10 + 5. Después multiplica los sumandos: 10 · 10 · 5 = 500. ¿Cuál es el mayor producto que puedes conseguir?"}],
  A1:[{title:"El cubo pintado",fn:"dzCubo",credit:BTC,
       intro:"Un cubo de 3 × 3 × 3, hecho con 27 cubitos, se sumerge en pintura. Cuando se seca, se desarma. ¿Cuántos cubitos tienen 3 caras pintadas? ¿Y 2, 1 o ninguna? ¿Y si el cubo fuera de n × n × n?"}],
  A2:[{title:"El diamante de los piratas",fn:"dzPiratas",credit:"Adaptado del problema de Josefo, en la versión recopilada por P. Liljedahl, <i>Building Thinking Classrooms in Mathematics</i> (2020).",
       intro:"Una banda de piratas se disuelve y queda un diamante que no se puede partir. El capitán (con corona) los pone en círculo y señala a uno: ese se va, el siguiente se queda, el siguiente se va, y así, saltando uno de cada dos, hasta que queda uno solo. ¿A quién debe señalar el capitán para quedarse con el diamante?"}],
  A3:[{title:"¿De cuántas formas ves los puntos?",fn:"dzPuntos",credit:BTC,
       intro:"Este cuadrado tiene 25 puntos. Agrúpalos en rectángulos arrastrando sobre ellos, hasta cubrirlos todos. Cada forma de agrupar es una manera distinta de escribir 25. Busca varias."}],
  Q4:[{title:"Una ecuación, muchas soluciones",fn:"dzGranja",credit:BTC,
       intro:"Cuando hay dos cantidades desconocidas y un solo dato, suele haber muchas soluciones. Encuéntralas todas y piensa cómo sabes que no falta ninguna."}]
};

/* ---------- utilidades comunes ---------- */
const dzMsg=(el,kind,html)=>{el.className="fb "+kind;el.innerHTML=html?`<p>${html}</p>`:"";el.hidden=!html};
const stepper=(id,lab,val)=>`<div class="stepper"><span>${lab}</span><button class="btn sm" data-dec="${id}" aria-label="Quitar uno: ${lab}">−</button><output class="m" id="${id}">${val}</output><button class="btn sm" data-inc="${id}" aria-label="Añadir uno: ${lab}">+</button></div>`;

Object.assign(EXPLORE,{
/* ---------- 1. Los resultados son… ---------- */
dzResultados(host){let level=1,T,rows,used,sel=null;const OPS1=["+","−"],OPS2=["+","−","×","÷"];
  const calc=(a,o,b)=>o==="+"?a+b:o==="−"?a-b:o==="×"?a*b:a/b;
  const gen=()=>{const R=rng(newSeed());for(let t=0;t<500;t++){const nums=R.sh([1,2,3,4,5,6,7,8,9,10]);
      const ops=level===1?R.sh(["+","+","−","−",R.p(OPS1)]):R.sh(["+","−","×","÷",R.p(OPS2)]);let ok=true;const res=[];
      for(let k=0;k<5;k++){let a=nums[2*k],b=nums[2*k+1];if(a<b)[a,b]=[b,a];if(ops[k]==="÷"&&(a%b!==0||b===1)){ok=false;break}res.push(calc(a,ops[k],b))}
      if(ok)return res.sort((x,y)=>x-y)}return[]};
  const fresh=()=>{T=gen();rows=Array.from({length:5},()=>({a:null,o:null,b:null}));used=new Set();sel=null;draw()};
  host.innerHTML=`<div class="dz-body"><div class="ctrl"><span class="seg" role="group" aria-label="Nivel"><button class="btn sm" data-lv="1">Nivel 1: + y −</button><button class="btn sm" data-lv="2">Nivel 2: + − × ÷</button></span><button class="btn sm ghost" id="rnew">Otra lista</button></div>
    <p class="tip" id="rrule"></p><div class="targets" id="rt"></div><div class="pool" id="rp"></div><div class="exrows" id="rr"></div><p class="fb" id="rmsg" hidden></p></div>`;
  const draw=()=>{const ops=level===1?OPS1:OPS2;
    $("#rrule",host).innerHTML=level===1?"Reglas: cada número del 1 al 10 se usa una vez; la suma y la resta se usan al menos dos veces cada una (una de ellas, tres veces).":"Reglas: cada número del 1 al 10 se usa una vez; cada operación (+, −, ×, ÷) se usa al menos una vez (una de ellas, dos veces).";
    $$("[data-lv]",host).forEach(b=>b.setAttribute("aria-current",+b.dataset.lv===level?"page":"false"));
    const got=rows.filter(r=>r.a!=null&&r.b!=null&&r.o).map(r=>calc(r.a,r.o,r.b));const left=got.slice();
    $("#rt",host).innerHTML=`<span class="k">Resultados que buscas</span>`+T.map(v=>{const i=left.findIndex(x=>Math.abs(x-v)<1e-9);if(i>=0)left.splice(i,1);return`<span class="tgt ${i>=0?"hit":""}">${fmt(v)}</span>`}).join("");
    $("#rp",host).innerHTML=Array.from({length:10},(_,i)=>i+1).map(n=>`<button class="chip numc ${used.has(n)?"usedc":""} ${sel===n?"sel":""}" data-n="${n}" ${used.has(n)?"disabled":""}>${n}</button>`).join("");
    $("#rr",host).innerHTML=rows.map((r,k)=>{const v=r.a!=null&&r.b!=null&&r.o?calc(r.a,r.o,r.b):null;
      return`<div class="exrow"><button class="slotb" data-r="${k}" data-s="a">${r.a??"?"}</button><button class="opb" data-r="${k}" aria-label="Cambiar operación">${r.o||"op"}</button><button class="slotb" data-r="${k}" data-s="b">${r.b??"?"}</button><span class="eq">=</span><span class="val">${v==null?"":Number.isInteger(v)?fmt(v):frs(r.a,r.b)}</span></div>`}).join("");
    $$("[data-n]",host).forEach(b=>b.onclick=()=>{sel=sel===+b.dataset.n?null:+b.dataset.n;draw()});
    $$(".slotb",host).forEach(b=>b.onclick=()=>{const r=rows[+b.dataset.r],s=b.dataset.s;
      if(r[s]!=null){used.delete(r[s]);r[s]=null}
      if(sel!=null){r[s]=sel;used.add(sel);sel=null}draw()});
    $$(".opb",host).forEach(b=>b.onclick=()=>{const r=rows[+b.dataset.r];r.o=ops[(ops.indexOf(r.o)+1)%ops.length];draw()});
    check()};
  const check=()=>{const m=$("#rmsg",host);if(rows.some(r=>r.a==null||r.b==null||!r.o)){dzMsg(m,"info",sel!=null?`Toca una casilla para colocar el ${sel}.`:"Toca un número y después una casilla. Toca la operación para cambiarla.");return}
    const cnt=o=>rows.filter(r=>r.o===o).length;const ops=level===1?OPS1:OPS2;
    if(level===1&&(cnt("+")<2||cnt("−")<2)){dzMsg(m,"info","Revisa las reglas: suma y resta tienen que aparecer al menos dos veces cada una.");return}
    if(level===2&&ops.some(o=>cnt(o)<1)){dzMsg(m,"info","Revisa las reglas: cada una de las cuatro operaciones tiene que aparecer al menos una vez.");return}
    const got=rows.map(r=>calc(r.a,r.o,r.b)).sort((x,y)=>x-y);
    if(got.every((v,i)=>Math.abs(v-T[i])<1e-9))dzMsg(m,"ok","<b>¡Lo lograste!</b> Puede haber otras soluciones. Pide otra lista para seguir.");
    else dzMsg(m,"bad","Usaste bien los números, pero los resultados no coinciden con la lista. ¿Qué número de la lista es más difícil de conseguir? Empieza por ese.")};
  $$("[data-lv]",host).forEach(b=>b.onclick=()=>{level=+b.dataset.lv;fresh()});$("#rnew",host).onclick=fresh;fresh()},

/* ---------- 2. Cuatro cifras ---------- */
dzCuatro(host){let D,found,reach;
  const all=nums=>{const out=new Set();const rec=a=>{if(a.length===1){const v=a[0];if(Math.abs(v-Math.round(v))<1e-9)out.add(Math.round(v));return}
      for(let i=0;i<a.length;i++)for(let j=0;j<a.length;j++){if(i===j)continue;const rest=a.filter((_,k)=>k!==i&&k!==j),x=a[i],y=a[j];
        const c=[x+y,x-y,x*y];if(Math.abs(y)>1e-12)c.push(x/y);c.forEach(v=>rec([...rest,v]))}};rec(nums);return out};
  const fresh=()=>{const R=rng(newSeed());D=[R.i(1,9),R.i(1,9),R.i(1,9),R.i(1,9)];found={};const s=all(D);reach=new Set([...s].filter(v=>v>=1&&v<=30));draw()};
  host.innerHTML=`<div class="dz-body"><div class="ctrl"><span class="k">Tus cifras</span><span class="digits" id="cd"></span><button class="btn sm ghost" id="cnew">Otras cifras</button></div>
    <div class="fillrow"><input type="text" id="cin" autocomplete="off" spellcheck="false" placeholder="Por ejemplo: (7 − 2) × 3 + 4" aria-label="Tu expresión"><button class="btn primary" id="cgo">Probar</button></div>
    <p class="fb" id="cmsg" hidden></p><div class="board" id="cb"></div><p class="tip" id="cinfo"></p><button class="btn sm ghost" id="cshow">Mostrar cuáles son imposibles</button></div>`;
  let showImp=false;
  const draw=()=>{$("#cd",host).innerHTML=D.map(d=>`<b>${d}</b>`).join("");
    $("#cb",host).innerHTML=Array.from({length:30},(_,i)=>i+1).map(n=>`<span class="cell ${found[n]?"hit":showImp&&!reach.has(n)?"imp":""}" title="${found[n]?esc(found[n]):""}">${n}</span>`).join("");
    const k=Object.keys(found).length;$("#cinfo",host).innerHTML=`Llevas <b>${k}</b>. Con estas cifras se pueden conseguir <b>${reach.size}</b> de los 30 números (usando +, −, × y ÷). Pasa el cursor por un número conseguido para ver tu expresión.`};
  const tryIt=()=>{const v=$("#cin",host).value.replace(/÷/g,"/").trim(),m=$("#cmsg",host);if(!v)return;
    if(/[a-z^]/i.test(v)){dzMsg(m,"info","Usa solo las cifras, los signos + − × ÷ (o * y /) y paréntesis.");return}
    let toks,ast;try{toks=tokenize(v);ast=parseExpr(v)}catch(e){dzMsg(m,"info","No entendí la expresión. Revisa los paréntesis y los signos.");return}
    const ns=toks.filter(t=>t.t==="n").map(t=>t.v);
    if(ns.some(x=>!Number.isInteger(x)||x<1||x>9)){dzMsg(m,"info","Cada número tiene que ser una sola cifra: no se pueden pegar cifras para formar 12 o 34.");return}
    if(ns.slice().sort().join()!==D.slice().sort().join()){dzMsg(m,"info",`Tienes que usar exactamente estas cifras, cada una una vez: ${D.join(", ")}.`);return}
    const r=evalAst(ast,{});if(!isFinite(r)){dzMsg(m,"info","No se puede dividir entre cero.");return}
    if(Math.abs(r-Math.round(r))>1e-9){dzMsg(m,"info",`Da ${decs(r,3)}, que no es un número entero.`);return}
    const n=Math.round(r);if(n<1||n>30){dzMsg(m,"info",`Da ${fmt(n)}: está fuera del 1 al 30.`);return}
    const isNew=!found[n];found[n]=v;dzMsg(m,"ok",isNew?`<b>${v} = ${n}</b>. ¡Uno más!`:`<b>${n}</b> ya lo tenías; guardé esta nueva forma.`);$("#cin",host).value="";draw();
    if(Object.keys(found).length===reach.size)dzMsg(m,"ok",`<b>¡Conseguiste todos los posibles!</b> Pide otras cifras o busca formas distintas para los mismos números.`)};
  $("#cgo",host).onclick=tryIt;$("#cin",host).addEventListener("keydown",e=>{if(e.key==="Enter")tryIt()});$("#cnew",host).onclick=fresh;
  $("#cshow",host).onclick=()=>{showImp=!showImp;$("#cshow",host).textContent=showImp?"Ocultar los imposibles":"Mostrar cuáles son imposibles";draw()};fresh()},

/* ---------- 3. Partir el 25 ---------- */
dzVeinticinco(host){let bestInt=0,bestAny=0,k=5;const BEST_INT=8748;
  host.innerHTML=`<div class="dz-body"><h4>Parte 1</h4><div class="fillrow"><input type="text" id="vin" autocomplete="off" placeholder="Por ejemplo: 10 + 10 + 5" aria-label="Suma que da 25"><button class="btn primary" id="vgo">Multiplicar</button></div>
    <p class="fb" id="vmsg" hidden></p><div class="readout" id="vbest">Tu mejor producto todavía: —</div>
    <div id="vp2" hidden><h4 style="margin-top:6px">Parte 2: ¿y si los sumandos no tienen que ser enteros?</h4><p class="tip">Nadie dijo que los sumandos tuvieran que ser números enteros. Parte 25 en k partes iguales y mira el producto.</p>
    <div class="ctrl"><label for="vk">Número de partes iguales, k = <output class="m" id="vko">5</output></label><input type="range" id="vk" min="1" max="15" value="5"></div>
    <div class="svgwrap"><svg id="vsv" viewBox="0 0 560 210" role="img" aria-label="Producto según el número de partes" style="max-width:560px"></svg></div><div class="readout" id="vrr"></div></div>
    <button class="btn sm ghost" id="vskip">Ir a la parte 2</button></div>`;
  const prod=kk=>Math.pow(25/kk,kk);
  const draw2=()=>{const vals=Array.from({length:15},(_,i)=>prod(i+1)),mx=Math.max(...vals);let g="";
    vals.forEach((v,i)=>{const h=v/mx*150,x=30+i*35;g+=`<rect x="${x}" y="${175-h}" width="26" height="${h}" rx="3" fill="${i+1===k?"var(--l-rac)":"color-mix(in srgb,var(--l-rac) 35%,var(--surface))"}"/><text x="${x+13}" y="195" text-anchor="middle" style="font:11px var(--f-mono);fill:var(--muted)">${i+1}</text>`});
    $("#vsv",host).innerHTML=g;$("#vko",host).textContent=k;const part=25/k;
    $("#vrr",host).innerHTML=`<span class="k">Cada parte</span>25 : ${k} = ${Number.isInteger(part)?part:frs(25,k)+" ≈ "+decs(part,3)}<br><span class="k">Producto</span>${P(`(${frs(25,k)})`,k)} ≈ ${decs(prod(k),1)}`+
      (k===9?`<br><span class="k">El máximo</span>con 9 partes de 25/9 ≈ 2,78 el producto llega a ≈ 9846,6, más que el mejor con enteros (8748). Las partes iguales dan el mayor producto, y el mejor tamaño está cerca de 2,7.`:"")};
  const show2=()=>{$("#vp2",host).hidden=false;$("#vskip",host).hidden=true;draw2()};
  const go=()=>{const v=$("#vin",host).value.trim(),m=$("#vmsg",host);if(!v)return;const parts=v.split("+").map(s=>s.trim()).filter(Boolean);let vals;
    try{vals=parts.map(p=>{const a=parseExpr(p);if(varsOf(a).size)throw 0;return evalAst(a,{})})}catch(e){dzMsg(m,"info","Escribe solo números separados por +, como 10 + 10 + 5.");return}
    if(vals.some(x=>!(x>0))){dzMsg(m,"info","Usa sumandos positivos.");return}
    const s=sum(vals);if(Math.abs(s-25)>1e-9){dzMsg(m,"info",`Esa suma da ${decs(s,3)}, no 25.`);return}
    const p=vals.reduce((a,b)=>a*b,1),allInt=vals.every(x=>Number.isInteger(x));
    if(allInt)bestInt=Math.max(bestInt,p);bestAny=Math.max(bestAny,p);
    dzMsg(m,p>=BEST_INT-1e-9&&allInt?"ok":"info",`${vals.map(x=>decs(x,3)).join(" · ")} = <b>${decs(p,2)}</b>`+(allInt&&Math.abs(p-BEST_INT)<1e-9?". <b>¡Es el mayor producto posible con sumandos enteros!</b> ¿Por qué ganan los treses?":p<500?". Prueba con más sumandos.":""));
    $("#vbest",host).innerHTML=`<span class="k">Tu mejor producto</span>con enteros: ${bestInt?decs(bestInt,2):"—"}${bestAny>bestInt?` · con cualquier número: ${decs(bestAny,2)}`:""}`;
    if(allInt&&Math.abs(p-BEST_INT)<1e-9)show2()};
  $("#vgo",host).onclick=go;$("#vin",host).addEventListener("keydown",e=>{if(e.key==="Enter")go()});$("#vskip",host).onclick=show2;
  $("#vk",host).oninput=e=>{k=+e.target.value;draw2()}},

/* ---------- 4. El cubo pintado ---------- */
dzCubo(host){let n=3,showCount=false;const COL=["var(--surface-2)","var(--l-ent)","var(--av-sol)","var(--av-coral)"],NAMES=["ninguna","1 cara","2 caras","3 caras"];
  const cnt=nn=>nn<2?[0,0,0,1]:[Math.pow(nn-2,3),6*Math.pow(nn-2,2),12*(nn-2),8];
  host.innerHTML=`<div class="dz-body"><div class="ctrl"><label for="kn">Tamaño del cubo, n = <output class="m" id="kno">3</output></label><input type="range" id="kn" min="2" max="8" value="3"><button class="btn sm ghost" id="kcnt">Ver los conteos</button></div>
    <div class="cuberow"><div class="svgwrap"><svg id="ksv" viewBox="0 0 300 320" role="img" aria-label="Cubo pintado visto en perspectiva"></svg></div><div class="svgwrap"><svg id="ksl" viewBox="0 0 220 240" role="img" aria-label="Una capa del medio vista desde arriba"></svg></div></div>
    <p class="legend">${[3,2,1,0].map(c=>`<span><i style="background:${COL[c]}"></i>${NAMES[c]}</span>`).join("")}</p><div class="readout" id="krr" hidden></div>
    <h4>Tu tabla</h4><div class="tablewrap"><table class="mini dzt"><thead><tr><th>n</th><th>3 caras</th><th>2 caras</th><th>1 cara</th><th>ninguna</th></tr></thead><tbody>${[3,4,5].map(r=>`<tr><td>${r}</td>${[3,2,1,0].map(c=>`<td><input inputmode="numeric" data-n="${r}" data-c="${c}" aria-label="n = ${r}, ${NAMES[c]}"></td>`).join("")}</tr>`).join("")}</tbody></table></div>
    <div class="fillrow"><button class="btn primary" id="kchk">Comprobar la tabla</button></div><p class="fb" id="kmsg" hidden></p>
    <div id="kgen" hidden><h4>Para cualquier n</h4><p class="tip">Escribe una fórmula con n para cada tipo de cubito. Pista: piensa en las aristas, las caras y el interior de un cubo de n − 2 cubitos de lado.</p>
    ${[3,2,1,0].map(c=>`<div class="fillrow"><label class="flab" for="kf${c}">${NAMES[c]}</label><input id="kf${c}" autocomplete="off" spellcheck="false" placeholder="fórmula con n"></div>`).join("")}
    <div class="fillrow"><button class="btn primary" id="kfchk">Comprobar las fórmulas</button></div><p class="fb" id="kfmsg" hidden></p></div></div>`;
  const draw=()=>{const s=150/n,cx=150,cy=160,ex=[.866*s,.5*s],ey=[-.866*s,.5*s],ez=[0,-s];
    const P=(x,y,z)=>[cx+x*ex[0]+y*ey[0]+z*ez[0],cy+x*ex[1]+y*ey[1]+z*ez[1]];
    const f=(i,j,k)=>[i,j,k].filter(v=>v===0||v===n-1).length;let g="";
    const quad=(a,b,c,d,col,sh)=>`<polygon points="${[a,b,c,d].map(p=>p.map(v=>v.toFixed(1)).join(",")).join(" ")}" fill="${col}" stroke="var(--surface)" stroke-width="1"/>`+(sh?`<polygon points="${[a,b,c,d].map(p=>p.map(v=>v.toFixed(1)).join(",")).join(" ")}" fill="#000" fill-opacity="${sh}" />`:"");
    for(let i=0;i<n;i++)for(let j=0;j<n;j++)g+=quad(P(i,j,n),P(i+1,j,n),P(i+1,j+1,n),P(i,j+1,n),COL[f(i,j,n-1)],0);
    for(let j=0;j<n;j++)for(let k=0;k<n;k++)g+=quad(P(n,j,k),P(n,j+1,k),P(n,j+1,k+1),P(n,j,k+1),COL[f(n-1,j,k)],.12);
    for(let i=0;i<n;i++)for(let k=0;k<n;k++)g+=quad(P(i,n,k),P(i+1,n,k),P(i+1,n,k+1),P(i,n,k+1),COL[f(i,n-1,k)],.24);
    $("#ksv",host).innerHTML=g;
    const c=180/n,mid=Math.floor(n/2);let h=`<text x="110" y="16" text-anchor="middle" style="font:600 12px var(--f-disp);fill:var(--muted)">${n>2?"Una capa del medio, desde arriba":"Una capa, desde arriba"}</text>`;
    for(let i=0;i<n;i++)for(let j=0;j<n;j++)h+=`<rect x="${20+i*c}" y="${30+j*c}" width="${c}" height="${c}" fill="${COL[f(i,j,n>2?mid:n-1)]}" stroke="var(--surface)" stroke-width="1.5"/>`;
    $("#ksl",host).innerHTML=h;$("#kno",host).textContent=n;
    const k=cnt(n);$("#krr",host).hidden=!showCount;$("#krr",host).innerHTML=`<span class="k">Cubo de ${n} × ${n} × ${n} = ${n**3} cubitos</span>3 caras: ${k[3]} · 2 caras: ${k[2]} · 1 cara: ${k[1]} · ninguna: ${k[0]}`;
    $("#kcnt",host).textContent=showCount?"Ocultar los conteos":"Ver los conteos"};
  $("#kn",host).oninput=e=>{n=+e.target.value;draw()};$("#kcnt",host).onclick=()=>{showCount=!showCount;draw()};
  $("#kchk",host).onclick=()=>{let bad=0,empty=0;$$(".dzt input",host).forEach(inp=>{const v=inp.value.trim();if(!v){empty++;inp.classList.remove("okv","badv");return}
      const want=cnt(+inp.dataset.n)[+inp.dataset.c],ok=+v===want;inp.classList.toggle("okv",ok);inp.classList.toggle("badv",!ok);if(!ok)bad++});
    const m=$("#kmsg",host);if(empty){dzMsg(m,"info","Completa toda la tabla. Puedes mover el deslizador para ver cada cubo.");return}
    if(bad){dzMsg(m,"bad",`Hay ${bad} ${bad===1?"casilla que no cuadra":"casillas que no cuadran"}. Comprueba que cada fila suma n³.`);return}
    dzMsg(m,"ok","<b>¡La tabla está bien!</b> ¿Ves algún patrón? Ahora busca una fórmula para cualquier n.");$("#kgen",host).hidden=false};
  $("#kfchk",host).onclick=()=>{const ANS={3:"8",2:"12(n-2)",1:"6(n-2)^2",0:"(n-2)^3"};let ok=0;
    [3,2,1,0].forEach(c=>{const inp=$("#kf"+c,host);let good=false;try{const a=parseExpr(inp.value);good=!!inp.value.trim()&&equivalent(a,parseExpr(ANS[c]))}catch(e){}inp.classList.toggle("okv",good);inp.classList.toggle("badv",!good&&!!inp.value.trim());if(good)ok++});
    const m=$("#kfmsg",host);if(ok<4){dzMsg(m,"info",`Tienes ${ok} de 4. Pista: los cubitos sin pintar forman un cubo de (n − 2) de lado; en cada arista quedan n − 2 cubitos de 2 caras.`);return}
    dzMsg(m,"ok",`<b>¡Perfecto!</b> 8 + 12(n − 2) + 6(n − 2)² + (n − 2)³ tiene que dar n³. Llamando m = n − 2 es (m + 2)³ = m³ + 6m² + 12m + 8: el desarrollo de un cubo de una suma.`)};
  draw()},

/* ---------- 5. El diamante de los piratas ---------- */
dzPiratas(host){let N=9,ptr=null,alive=null,busy=false;const solved={};
  const surv=(nn,p)=>{let a=Array.from({length:nn},(_,i)=>((p-1+i)%nn)+1),idx=0;const out=[];while(a.length>1){out.push(a[idx]);a.splice(idx,1);idx=idx%a.length;idx=(idx+1)%a.length}return{last:a[0],order:out}};
  const answer=nn=>{for(let p=1;p<=nn;p++)if(surv(nn,p).last===1)return p};
  host.innerHTML=`<div class="dz-body"><div class="ctrl"><label for="pn">Número de piratas, N = <output class="m" id="pno">9</output></label><input type="range" id="pn" min="2" max="20" value="9"><button class="btn sm primary" id="pgo" disabled>Empezar</button></div>
    <p class="tip">Toca al pirata que señala el capitán (el capitán es el 1, con corona) y pulsa «Empezar».</p>
    <div class="svgwrap"><svg id="psv" viewBox="0 0 320 320" role="img" aria-label="Piratas en círculo" style="max-width:340px"></svg></div><p class="fb" id="pmsg" hidden></p>
    <div class="tablewrap"><table class="mini"><thead><tr><th>N</th>${Array.from({length:19},(_,i)=>`<th>${i+2}</th>`).join("")}</tr></thead><tbody><tr><td>Señalar a</td>${Array.from({length:19},(_,i)=>`<td id="ps${i+2}">·</td>`).join("")}</tr></tbody></table></div>
    <div id="pq" hidden><h4>Sin dibujar</h4><div class="fillrow"><label class="flab" for="pin">Con N = 100, ¿a quién señala?</label><input id="pin" inputmode="numeric" style="max-width:120px"><button class="btn primary" id="pcheck">Comprobar</button></div><p class="fb" id="pqmsg" hidden></p></div></div>`;
  const draw=()=>{const R=120,C=160;let g="";for(let i=1;i<=N;i++){const a=-Math.PI/2+(i-1)*2*Math.PI/N,x=C+R*Math.cos(a),y=C+R*Math.sin(a),gone=alive&&!alive.has(i);
      g+=`<g class="pirate" data-p="${i}" style="cursor:pointer;opacity:${gone?.18:1}"><circle cx="${x}" cy="${y}" r="15" fill="${i===1?"var(--av-sol)":ptr===i?"var(--l-alg)":"var(--surface-2)"}" stroke="${ptr===i?"var(--ink)":"var(--muted)"}" stroke-width="${ptr===i?3:1.5}"/><text x="${x}" y="${y+5}" text-anchor="middle" style="font:700 13px var(--f-mono);fill:var(--ink)">${i}</text>${i===1?`<path d="M${x-9} ${y-17} l3 -8 l6 5 l6 -5 l3 8 z" fill="var(--av-sol)" stroke="var(--ink)" stroke-width="1"/>`:""}</g>`}
    g+=`<path d="M${C} ${C-30} l-12 20 h24 z" fill="var(--l-rac)" opacity=".85"/><text x="${C}" y="${C+16}" text-anchor="middle" style="font:600 12px var(--f-disp);fill:var(--muted)">diamante</text>`;
    const sv=$("#psv",host);sv.innerHTML=g;$("#pno",host).textContent=N;$("#pgo",host).disabled=!ptr||busy;
    $$(".pirate",sv).forEach(el=>el.onclick=()=>{if(busy)return;ptr=+el.dataset.p;alive=null;dzMsg($("#pmsg",host),"","");draw()});
    for(let k=2;k<=20;k++)$("#ps"+k,host).textContent=solved[k]||"·"};
  $("#pn",host).oninput=e=>{N=+e.target.value;ptr=null;alive=null;dzMsg($("#pmsg",host),"","");draw()};
  $("#pgo",host).onclick=async()=>{if(!ptr||busy)return;busy=true;alive=new Set(Array.from({length:N},(_,i)=>i+1));const r=surv(N,ptr);draw();
    for(const p of r.order){await sleep(reduceMotion?0:330);alive.delete(p);draw()}
    busy=false;const ok=r.last===1;if(ok){solved[N]=ptr;if(Object.keys(solved).length>=4)$("#pq",host).hidden=false}
    dzMsg($("#pmsg",host),ok?"ok":"info",ok?`<b>¡El capitán se queda con el diamante!</b> Con ${N} piratas hay que señalar al ${ptr}. Prueba con otro N y busca el patrón.`:`Se queda el pirata ${r.last}. Prueba a señalar a otro.`+(Object.keys(solved).length>=3?" Pista: mira qué pasa con N = 2, 4, 8, 16: las potencias de 2.":""));draw()};
  $("#pcheck",host).onclick=()=>{const v=+$("#pin",host).value,m=$("#pqmsg",host),a=answer(100);
    dzMsg(m,v===a?"ok":"info",v===a?`<b>¡Exacto!</b> 100 = 64 + 36. Cuando N es una potencia de 2 hay que señalar al 2, y cada pirata que sobra por encima de la potencia de 2 corre la respuesta dos lugares hacia atrás: 2 − 2 · 36 = −70, que en un círculo de 100 piratas es el ${a}.`:"Todavía no. Busca la mayor potencia de 2 que no pasa de 100, mira cuántos piratas sobran y revisa en tu tabla cómo cambia la respuesta cuando N crece de uno en uno.")};
  draw()},

/* ---------- 6. ¿De cuántas formas ves los puntos? ---------- */
dzPuntos(host){let n=5,groups=[],start=null,cur=null;const found=new Map();const COLS=["var(--l-ent)","var(--av-coral)","var(--av-sol)","var(--av-menta)","var(--av-lila)","var(--l-rac)","var(--l-rec)","var(--l-ecu)"];
  host.innerHTML=`<div class="dz-body"><div class="ctrl"><label for="dn">Lado del cuadrado: <output class="m" id="dno">5</output></label><input type="range" id="dn" min="3" max="7" value="5"><button class="btn sm ghost" id="dundo">Quitar el último grupo</button><button class="btn sm ghost" id="dclr">Borrar todo</button></div>
    <p class="tip">Arrastra de un punto a otro para encerrar un rectángulo de puntos. Toca un grupo para quitarlo.</p>
    <div class="svgwrap"><svg id="dsv" viewBox="0 0 300 300" role="img" aria-label="Cuadrado de puntos para agrupar" style="max-width:320px"></svg></div>
    <div class="readout" id="drr"></div><p class="fb" id="dmsg" hidden></p><h4>Formas encontradas</h4><ul class="found" id="dfound"><li class="muted">Todavía ninguna.</li></ul></div>`;
  const c=()=>260/n,X=i=>20+c()*(i+.5);
  const cellAt=p=>{const i=Math.floor((p.x-20)/c()),j=Math.floor((p.y-20)/c());return i>=0&&j>=0&&i<n&&j<n?[i,j]:null};
  const rectOf=(a,b)=>({x0:Math.min(a[0],b[0]),y0:Math.min(a[1],b[1]),x1:Math.max(a[0],b[0]),y1:Math.max(a[1],b[1])});
  const overlap=(r,s)=>!(r.x1<s.x0||s.x1<r.x0||r.y1<s.y0||s.y1<r.y0);
  const dims=r=>[r.x1-r.x0+1,r.y1-r.y0+1];
  const term=r=>{const[w,h]=dims(r);return w===1&&h===1?"1":w===1||h===1?String(w*h):w===h?P(w,2):`${h} × ${w}`};
  const draw=()=>{let g="";const cc=c();
    groups.forEach(r=>{g+=`<rect class="grp" data-g="${groups.indexOf(r)}" x="${20+r.x0*cc+3}" y="${20+r.y0*cc+3}" width="${(r.x1-r.x0+1)*cc-6}" height="${(r.y1-r.y0+1)*cc-6}" rx="${cc/3}" fill="${r.col}" fill-opacity=".22" stroke="${r.col}" stroke-width="2.5" style="cursor:pointer"/>`});
    if(start&&cur){const r=rectOf(start,cur);g+=`<rect x="${20+r.x0*cc+3}" y="${20+r.y0*cc+3}" width="${(r.x1-r.x0+1)*cc-6}" height="${(r.y1-r.y0+1)*cc-6}" rx="${cc/3}" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 4"/>`}
    for(let i=0;i<n;i++)for(let j=0;j<n;j++)g+=`<circle cx="${X(i)}" cy="${X(j)}" r="${Math.min(9,cc*.2)}" fill="var(--ink)" pointer-events="none"/>`;
    const sv=$("#dsv",host);sv.innerHTML=g;$("#dno",host).textContent=n;
    const covered=sum(groups.map(r=>dims(r)[0]*dims(r)[1]));
    $("#drr",host).innerHTML=`<span class="k">Tu agrupación</span>${groups.length?groups.map(term).join(" + ")+` = ${covered}`:"—"}<br><span class="k">Puntos</span>${covered} de ${n*n} agrupados`;
    const m=$("#dmsg",host);
    if(covered===n*n&&groups.length){const key=groups.map(r=>dims(r).sort((a,b)=>a-b).join("×")).sort().join(" + ");const isNew=!found.has(key);if(isNew)found.set(key,groups.map(term).join(" + "));
      const sq=groups.filter(r=>{const[w,h]=dims(r);return w===h}),special=groups.length===4&&sq.length===2&&dims(sq[0])[0]+dims(sq[1])[0]===n;
      dzMsg(m,"ok",(isNew?"<b>¡Forma nueva!</b> ":"Esa forma ya la tenías. ")+`${n*n} = ${groups.map(term).join(" + ")}.`+(special?` Es el cuadrado de una suma: ${P(`(${dims(sq[0])[0]} + ${dims(sq[1])[0]})`,2)} = ${P(dims(sq[0])[0],2)} + 2 · ${dims(sq[0])[0]} · ${dims(sq[1])[0]} + ${P(dims(sq[1])[0],2)}.`:" Borra y busca otra.")+(found.size>=3&&!special?" Reto: cubre el cuadrado con dos cuadrados y dos rectángulos iguales.":""))}
    else dzMsg(m,"","");
    $("#dfound",host).innerHTML=found.size?[...found.values()].map(v=>`<li>${n*n} = ${v}</li>`).join(""):`<li class="muted">Todavía ninguna.</li>`};
  dragOn($("#dsv",host),{down:(p,e)=>{const t=e.target.closest&&e.target.closest(".grp");if(t){groups.splice(+t.dataset.g,1);draw();return false}const a=cellAt(p);if(!a)return false;start=a;cur=a;draw()},
    move:p=>{const a=cellAt(p);if(a&&(a[0]!==cur[0]||a[1]!==cur[1])){cur=a;draw()}},
    up:()=>{if(start&&cur){const r=rectOf(start,cur);if(groups.some(s=>overlap(r,s)))toast("Ese grupo se cruza con otro. Cada punto va en un solo grupo.");else{r.col=COLS[groups.length%COLS.length];groups.push(r)}}start=cur=null;draw()}});
  $("#dn",host).oninput=e=>{n=+e.target.value;groups=[];found.clear();draw()};$("#dundo",host).onclick=()=>{groups.pop();draw()};$("#dclr",host).onclick=()=>{groups=[];draw()};draw()},

/* ---------- 7. Una ecuación, muchas soluciones ---------- */
dzGranja(host){let tab="granja";
  host.innerHTML=`<div class="dz-body"><div class="ctrl"><span class="seg" role="group" aria-label="Problema"><button class="btn sm" data-t="granja">Gallinas y cerdos</button><button class="btn sm" data-t="monedas">Monedas</button></span></div><div id="gbody"></div></div>`;
  const R=rng(newSeed()),L=R.p([22,26,28,30,34]);let g=1,c=1,sols=[],extra=null;let m1=0,m2=0,m5=0,coin=[];
  const solsG=()=>{const out=[];for(let cc=1;4*cc<=L-2;cc++)out.push([(L-4*cc)/2,cc]);return out},TOTC=10;
  const draw=()=>{$$("[data-t]",host).forEach(b=>b.setAttribute("aria-current",b.dataset.t===tab?"page":"false"));const B=$("#gbody",host);
    if(tab==="granja"){const all=solsG(),legs=2*g+4*c;
      B.innerHTML=`<p>Una granjera tiene gallinas y cerdos (al menos uno de cada tipo). Entre todos tienen <b>${L} patas</b>. ¿Cuántas gallinas y cuántos cerdos puede tener?</p>
        <div class="ctrl">${stepper("gg","Gallinas",g)}${stepper("gc","Cerdos",c)}</div>
        <div class="readout"><span class="k">Patas</span>2 · ${g} + 4 · ${c} = ${legs} ${legs===L?"✓":legs<L?`(faltan ${L-legs})`:`(sobran ${legs-L})`}</div>
        <div class="fillrow"><button class="btn primary" id="gadd" ${legs===L?"":"disabled"}>Anotar esta solución</button></div><p class="fb" id="gmsg" hidden></p>
        <div class="tablewrap"><table class="mini"><thead><tr><th>Gallinas</th><th>Cerdos</th></tr></thead><tbody>${sols.length?sols.slice().sort((a,b)=>a[1]-b[1]).map(s=>`<tr class="${extra&&s[0]+s[1]===extra?"hl":""}"><td>${s[0]}</td><td>${s[1]}</td></tr>`).join(""):`<tr><td colspan="2" class="muted">Todavía ninguna</td></tr>`}</tbody></table></div>
        <div id="gx" ${sols.length===all.length?"":"hidden"}><div class="callout"><span class="eyebrow">Un dato más</span><p>${extra?`Con ${extra} cabezas solo queda una solución: ${all.find(s=>s[0]+s[1]===extra).join(" gallinas y ")} cerdos. Con dos datos tienes un sistema: x + y = ${extra} y 2x + 4y = ${L}.`:"Tienes todas. Ahora te cuentan cuántas cabezas hay en total. ¿Qué pasa con tus soluciones?"}</p>${extra?"":`<div class="fillrow"><button class="btn sm" id="gext">Darme el dato de las cabezas</button></div>`}</div></div>`;
      B.querySelectorAll("[data-inc],[data-dec]").forEach(b=>b.onclick=()=>{const id=b.dataset.inc||b.dataset.dec,d=b.dataset.inc?1:-1;if(id==="gg")g=Math.max(0,g+d);else c=Math.max(0,c+d);draw()});
      $("#gadd",B).onclick=()=>{const m=$("#gmsg",B);if(g<1||c<1){dzMsg(m,"info","Tiene que haber al menos una gallina y un cerdo.");return}
        if(sols.some(s=>s[0]===g&&s[1]===c)){dzMsg(m,"info","Esa ya la tenías.");return}sols.push([g,c]);draw();
        const mm=$("#gmsg",B);if(sols.length===all.length)dzMsg(mm,"ok",`<b>¡Son todas: ${all.length}!</b> ¿Cómo sabes que no falta ninguna? Fíjate: cada cerdo más son dos gallinas menos.`);else dzMsg(mm,"ok",`Llevas ${sols.length}. ¿Hay más? Organízate: prueba con 1 cerdo, 2 cerdos, 3 cerdos…`)};
      const ge=$("#gext",B);if(ge)ge.onclick=()=>{const s=all[Math.floor(all.length/2)];extra=s[0]+s[1];draw()}}
    else{const tot=100*m1+200*m2+500*m5;
      B.innerHTML=`<p>¿De cuántas maneras se pueden juntar <b>$1000</b> usando solo monedas de $100, $200 y $500?</p>
        <div class="ctrl">${stepper("c1","$100",m1)}${stepper("c2","$200",m2)}${stepper("c5","$500",m5)}</div>
        <div class="readout"><span class="k">Total</span>100 · ${m1} + 200 · ${m2} + 500 · ${m5} = $${tot} ${tot===1000?"✓":tot<1000?`(faltan $${1000-tot})`:`(sobran $${tot-1000})`}</div>
        <div class="fillrow"><button class="btn primary" id="cadd" ${tot===1000?"":"disabled"}>Anotar esta manera</button></div><p class="fb" id="cmsg2" hidden></p>
        <div class="tablewrap"><table class="mini"><thead><tr><th>$100</th><th>$200</th><th>$500</th></tr></thead><tbody>${coin.length?coin.slice().sort((a,b)=>b[2]-a[2]||b[1]-a[1]).map(s=>`<tr><td>${s[0]}</td><td>${s[1]}</td><td>${s[2]}</td></tr>`).join(""):`<tr><td colspan="3" class="muted">Todavía ninguna</td></tr>`}</tbody></table></div>`;
      B.querySelectorAll("[data-inc],[data-dec]").forEach(b=>b.onclick=()=>{const id=b.dataset.inc||b.dataset.dec,d=b.dataset.inc?1:-1;if(id==="c1")m1=Math.max(0,m1+d);else if(id==="c2")m2=Math.max(0,m2+d);else m5=Math.max(0,m5+d);draw()});
      $("#cadd",B).onclick=()=>{if(coin.some(s=>s[0]===m1&&s[1]===m2&&s[2]===m5)){dzMsg($("#cmsg2",B),"info","Esa ya la tenías.");return}coin.push([m1,m2,m5]);draw();
        dzMsg($("#cmsg2",B),"ok",coin.length===TOTC?`<b>¡Son todas: ${TOTC}!</b> La ecuación es 100x + 200y + 500z = 1000, o sea x + 2y + 5z = 10: una ecuación, tres incógnitas y diez soluciones.`:`Llevas ${coin.length}. Pista para organizarte: empieza por cuántas monedas de $500 usas (0, 1 o 2).`)}}};
  $$("[data-t]",host).forEach(b=>b.onclick=()=>{tab=b.dataset.t;draw()});draw()}
});
