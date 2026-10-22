"use strict";
/* ============ Línea 4: Álgebra básica · A9 Racionalización ============ */

const RD=t=>`√<span class="rad">${t}</span>`;                       // raíz con vínculo (HTML)
const SQF=[2,3,5,6,7,10,11];
const RTIP="Para las raíces escribe √ o sqrt, con paréntesis si dentro hay más de un término: 3√2/2, sqrt(x+1). Para fracciones usa /.";
const kT=k=>k===1?"":String(k);

Object.assign(NODES,{
A9:{title:"Racionalización",sub:"Quitar las raíces del denominador.",
 info:`<p class="lead"><b>Racionalizar</b> una fracción es reescribirla, sin cambiar su valor, para que el denominador no tenga raíces. Se multiplica arriba y abajo por un mismo factor, es decir, por una forma del 1.</p>
 <div class="ex-box"><span class="eyebrow">Una sola raíz en el denominador</span><p>Se multiplica por esa misma raíz, porque ${M(`${RD("a")} · ${RD("a")} = a`)}:</p>
 <p class="calc">${FS("1",RD(2))} = ${FS(`1 · ${RD(2)}`,`${RD(2)} · ${RD(2)}`)} = ${FS(RD(2),"2")}&emsp;&emsp;&emsp;${FS("6",RD(3))} = ${FS(`6${RD(3)}`,"3")} = 2${RD(3)}</p>
 <p>Así se ve mejor el tamaño: ${RD(2)}/2 ≈ 1,414 / 2 ≈ 0,707.</p></div>
 <div class="ex-box"><span class="eyebrow">Un binomio en el denominador: el conjugado</span><p>Si el denominador es una suma o una resta con raíces, se multiplica por su <b>conjugado</b>: el mismo binomio con el signo del medio cambiado. Por el producto notable ${M("(a − b)(a + b) = a² − b²")}, las raíces desaparecen:</p>
 <p class="calc">${FS("1",`${RD(3)} − ${RD(2)}`)} = ${FS(`${RD(3)} + ${RD(2)}`,`(${RD(3)} − ${RD(2)})(${RD(3)} + ${RD(2)})`)} = ${FS(`${RD(3)} + ${RD(2)}`,"3 − 2")} = ${RD(3)} + ${RD(2)}</p>
 <p class="calc">${FS("4",`${RD(5)} + 1`)} = ${FS(`4(${RD(5)} − 1)`,"5 − 1")} = ${RD(5)} − 1</p></div>
 <div class="ex-box"><span class="eyebrow">Con cantidades Variables</span><p>Funciona igual con expresiones algebraicas:</p>
 <p class="calc">${FS("x",`${RD("x + 1")} − ${RD("x")}`)} = ${FS(`x(${RD("x + 1")} + ${RD("x")})`,"(x + 1) − x")} = x(${RD("x + 1")} + ${RD("x")})</p>
 <p class="calc">${FS("1",`${RD("x")} − 2`)} = ${FS(`${RD("x")} + 2`,"x − 4")}   (para x ≥ 0 y x ≠ 4)</p>
 <p>Esta técnica se usa mucho en cálculo: a veces se racionaliza el numerador para simplificar una expresión como ${FS(`${RD("x + h")} − ${RD("x")}`,"h")}.</p></div>
 <div class="callout"><span class="eyebrow">Errores frecuentes</span><p>${RD("a + b")} no es ${RD("a")} + ${RD("b")}: ${RD(9+16)} = 5, pero ${RD(9)} + ${RD(16)} = 7. Y el conjugado de ${RD(3)} − ${RD(2)} es ${RD(3)} + ${RD(2)}: solo cambia el signo del medio, no los dos.</p></div>`,
 explore:{intro:"Elige una expresión y avanza paso a paso. Comprueba con los decimales que el valor no cambia; en las expresiones con x, mueve el deslizador.",fn:"aRacional"},
 key:"Racionalizar: multiplicar arriba y abajo por la raíz (si hay una sola) o por el conjugado (si hay un binomio). (a − b)(a + b) = a² − b² hace desaparecer las raíces.",
 ojo:"√(a + b) no es √a + √b, y el conjugado solo cambia el signo del medio."}
});

Object.assign(RETO,{
A9:[
 R=>{const b=R.p(SQF),a=R.f()<.5?b*R.i(1,3):R.i(1,9),g=gcd(a,b),p=a/g,q=b/g;
  const show=q===1?`${kT(p)}√${b}`:`${kT(p)}√${b}/${q}`;
  return{type:"fill",kind:"expr",answer:`${a}*sqrt(${b})/${b}`,show,noRootDen:true,tip:RTIP,ph:"Por ejemplo: 3√2/2",q:`Racionaliza y simplifica ${M(FS(a,RD(b)))}.`,hint:`Multiplica arriba y abajo por ${RD(b)}: abajo queda ${b}.`,
   explain:`${FS(a,RD(b))} = ${FS(`${a}${RD(b)}`,b)}${g>1?` = ${q===1?`${kT(p)}${RD(b)}`:FS(`${kT(p)}${RD(b)}`,q)}`:""}.`}},
 R=>{const k=R.i(1,3);
  if(R.f()<.55){let a,b;do{a=R.p(SQF);b=R.p(SQF)}while(a<=b);const d=a-b,c=k*d,mn=R.f()<.5;const sgn=mn?"−":"+",csgn=mn?"+":"−";
   return{type:"fill",kind:"expr",answer:`${k}*(sqrt(${a})${mn?"+":"-"}sqrt(${b}))`,show:`${k===1?"":k}${k===1?"":"("}√${a} ${csgn} √${b}${k===1?"":")"}`,noRootDen:true,tip:RTIP,ph:"Por ejemplo: √5 + √3",
    q:`Racionaliza y simplifica ${M(FS(c,`${RD(a)} ${sgn} ${RD(b)}`))}.`,hint:`Multiplica por el conjugado, ${RD(a)} ${csgn} ${RD(b)}. Abajo queda ${a} − ${b} = ${d}.`,
    explain:`${FS(`${c}(${RD(a)} ${csgn} ${RD(b)})`,`${a} − ${b}`)} = ${FS(`${c}(${RD(a)} ${csgn} ${RD(b)})`,d)} = ${kT(k)}${k===1?"":"("}${RD(a)} ${csgn} ${RD(b)}${k===1?"":")"}.`}}
  let n,a;do{n=R.i(1,3);a=R.i(n*n+1,n*n+8)}while(Number.isInteger(Math.sqrt(a)));const d=a-n*n,c=k*d,mn=R.f()<.5,sgn=mn?"−":"+",csgn=mn?"+":"−";
  return{type:"fill",kind:"expr",answer:`${k}*(sqrt(${a})${mn?"+":"-"}${n})`,show:`${k===1?"":k}${k===1?"":"("}√${a} ${csgn} ${n}${k===1?"":")"}`,noRootDen:true,tip:RTIP,ph:"Por ejemplo: √5 − 1",
   q:`Racionaliza y simplifica ${M(FS(c,`${RD(a)} ${sgn} ${n}`))}.`,hint:`Multiplica por el conjugado, ${RD(a)} ${csgn} ${n}. Abajo queda ${a} − ${n*n} = ${d}.`,
   explain:`${FS(`${c}(${RD(a)} ${csgn} ${n})`,`${a} − ${n*n}`)} = ${kT(k)}${k===1?"":"("}${RD(a)} ${csgn} ${n}${k===1?"":")"}.`}},
 R=>{const t=R.i(0,2);
  if(t===0){const b=R.p(SQF);return{type:"choice",q:`Para racionalizar ${M(FS(1,RD(b)))}, ¿por qué conviene multiplicar el numerador y el denominador?`,opts:[RD(b),b,`${RD(b)} + 1`,P(b,2)].map(String).map(M),hint:"Busca un factor que, multiplicado por el denominador, quite la raíz.",explain:`${RD(b)} · ${RD(b)} = ${b}: el denominador queda sin raíz.`}}
  if(t===1){let a,b;do{a=R.p(SQF);b=R.p(SQF)}while(a===b);return{type:"choice",q:`Para racionalizar ${M(FS(1,`${RD(a)} − ${RD(b)}`))}, ¿por qué conviene multiplicar el numerador y el denominador?`,opts:[`${RD(a)} + ${RD(b)}`,`${RD(a)} − ${RD(b)}`,RD(`${a} − ${b}`),`−${RD(a)} − ${RD(b)}`].map(M),
   hint:"Usa (a − b)(a + b) = a² − b²: el conjugado cambia solo el signo del medio.",explain:`(${RD(a)} − ${RD(b)})(${RD(a)} + ${RD(b)}) = ${a} − ${b}: sin raíces. Con ${RD(a)} − ${RD(b)} quedaría un cuadrado con un término cruzado que sigue teniendo raíz.`}}
  const n=R.i(1,4);return{type:"choice",q:`Para racionalizar ${M(FS("1",`${RD("x")} + ${n}`))}, ¿por qué conviene multiplicar el numerador y el denominador?`,opts:[`${RD("x")} − ${n}`,`${RD("x")} + ${n}`,RD("x"),`${RD("x")} − ${RD(n)}`].map(M),
   hint:"El conjugado cambia el signo del medio.",explain:`(${RD("x")} + ${n})(${RD("x")} − ${n}) = x − ${n*n}.`}},
 R=>{const v=R.i(0,2);
  if(v===0){const k=R.i(1,3);return{type:"fill",kind:"expr",answer:`x*(sqrt(x+${k})+sqrt(x))/${k}`,show:k===1?"x(√(x + 1) + √x)":`x(√(x + ${k}) + √x)/${k}`,noRootDen:true,tip:RTIP,ph:"Por ejemplo: x(√(x + 1) + √x)",
   q:`Racionaliza ${M(FS("x",`${RD(`x + ${k}`)} − ${RD("x")}`))}.`,hint:`Multiplica por el conjugado ${RD(`x + ${k}`)} + ${RD("x")}. Abajo queda (x + ${k}) − x.`,
   explain:`Abajo: (x + ${k}) − x = ${k}. El resultado es ${k===1?`x(${RD("x + 1")} + ${RD("x")})`:FS(`x(${RD(`x + ${k}`)} + ${RD("x")})`,k)}.`}}
  const n=R.i(1,4);
  if(v===1)return{type:"fill",kind:"expr",answer:`(sqrt(x)+${n})/(x-${n*n})`,show:`(√x + ${n})/(x − ${n*n})`,noRootDen:true,tip:RTIP,ph:"Por ejemplo: (√x + 2)/(x − 4)",
   q:`Racionaliza ${M(FS(1,`${RD("x")} − ${n}`))}.`,hint:`Multiplica por ${RD("x")} + ${n}. Abajo queda x − ${n*n}.`,explain:`${FS(`${RD("x")} + ${n}`,`(${RD("x")} − ${n})(${RD("x")} + ${n})`)} = ${FS(`${RD("x")} + ${n}`,`x − ${n*n}`)}.`};
  return{type:"fill",kind:"expr",answer:`sqrt(x)+${n}`,show:`√x + ${n}`,noRootDen:true,noDiv:true,tip:RTIP,ph:"Por ejemplo: √x + 2",
   q:`Racionaliza y simplifica ${M(FS(`x − ${n*n}`,`${RD("x")} − ${n}`))}.`,hint:`Multiplica por ${RD("x")} + ${n}: abajo queda x − ${n*n}, igual que arriba.`,
   explain:`${FS(`(x − ${n*n})(${RD("x")} + ${n})`,`x − ${n*n}`)} = ${RD("x")} + ${n}. También se ve factorizando: x − ${n*n} = (${RD("x")} − ${n})(${RD("x")} + ${n}).`}},
 R=>{const pool=[["1/√2","√2/2",Math.SQRT1_2],["3/√3","√3",Math.sqrt(3)],["4/√2","2√2",2*Math.SQRT2],["1/(√3 − √2)","√3 + √2",Math.sqrt(3)+Math.SQRT2],["1/(√2 + 1)","√2 − 1",Math.SQRT2-1],
   ["2/(√3 + 1)","√3 − 1",Math.sqrt(3)-1],["1/(√5 + 2)","√5 − 2",Math.sqrt(5)-2],["6/√6","√6",Math.sqrt(6)],["4/(√5 − 1)","√5 + 1",Math.sqrt(5)+1],["1/√5","√5/5",Math.sqrt(5)/5],["2/(√7 − √5)","√7 + √5",Math.sqrt(7)+Math.sqrt(5)]];
  const pick=[];for(const p of R.sh(pool)){if(pick.length<4&&!pick.some(q=>Math.abs(q[2]-p[2])<1e-9))pick.push(p)}
  const wrong=pick.map(p=>p[1].includes("+")?p[1].replace("+","−"):p[1].includes("−")?p[1].replace("−","+"):null).filter(Boolean),extra=R.sh(wrong).filter(t=>!pick.some(p=>p[1]===t)).slice(0,2);
  return{type:"match",q:"Arrastra a cada expresión su forma racionalizada. Sobran fichas con el signo del conjugado equivocado.",pairs:pick.map(p=>[p[0],p[1]]),extra,hint:"Racionaliza cada una; si quieres comprobar, calcula los decimales de las dos formas.",
   explain:pick.map(p=>`${p[0]} = ${p[1]}`).join("; ")+". Al multiplicar por el conjugado, el resultado lleva el signo contrario al del denominador original."}}]
});

Object.assign(RECAP,{
A9:{map:[0,1,2,3,1],pts:[
  {s:"Una sola raíz",t:"Se multiplica arriba y abajo por esa raíz.",ex:"6/√3 = 6√3/3 = 2√3"},
  {s:"El conjugado",t:"Con un binomio se multiplica por el conjugado: (a − b)(a + b) = a² − b².",ex:"1/(√3 − √2) = √3 + √2"},
  {s:"Elegir el factor",t:"El conjugado cambia solo el signo del medio.",ex:"√x + 3 → √x − 3"},
  {s:"Con cantidades Variables",t:"El mismo método funciona con expresiones algebraicas.",ex:"x/(√(x + 1) − √x) = x(√(x + 1) + √x)"}]}
});

Object.assign(EXPLORE,{
aRacional(host){const E=[
  {t:"1 / √2",f:()=>1/Math.SQRT2,steps:[FS(1,RD(2)),`${FS(1,RD(2))} · ${FS(RD(2),RD(2))}`,FS(RD(2),2)],why:["Hay una raíz en el denominador.","Multiplicamos por √2/√2, que vale 1: el valor no cambia.","√2 · √2 = 2. Ya no hay raíz abajo."],g:()=>Math.SQRT2/2},
  {t:"6 / √3",f:()=>6/Math.sqrt(3),steps:[FS(6,RD(3)),`${FS(6,RD(3))} · ${FS(RD(3),RD(3))}`,FS(`6${RD(3)}`,3),`2${RD(3)}`],why:["Raíz sola en el denominador.","Multiplicamos por √3/√3.","√3 · √3 = 3.","Simplificamos 6/3 = 2."],g:()=>2*Math.sqrt(3)},
  {t:"1 / (√3 − √2)",f:()=>1/(Math.sqrt(3)-Math.SQRT2),steps:[FS(1,`${RD(3)} − ${RD(2)}`),`${FS(1,`${RD(3)} − ${RD(2)}`)} · ${FS(`${RD(3)} + ${RD(2)}`,`${RD(3)} + ${RD(2)}`)}`,FS(`${RD(3)} + ${RD(2)}`,`(${RD(3)})² − (${RD(2)})²`),FS(`${RD(3)} + ${RD(2)}`,"3 − 2"),`${RD(3)} + ${RD(2)}`],
   why:["Binomio con raíces en el denominador.","Multiplicamos por el conjugado: solo cambia el signo del medio.","(a − b)(a + b) = a² − b².","Los cuadrados quitan las raíces.","El denominador es 1."],g:()=>Math.sqrt(3)+Math.SQRT2},
  {t:"4 / (√5 + 1)",f:()=>4/(Math.sqrt(5)+1),steps:[FS(4,`${RD(5)} + 1`),`${FS(4,`${RD(5)} + 1`)} · ${FS(`${RD(5)} − 1`,`${RD(5)} − 1`)}`,FS(`4(${RD(5)} − 1)`,"5 − 1"),`${RD(5)} − 1`],why:["Binomio con una raíz.","El conjugado de √5 + 1 es √5 − 1.","(√5)² − 1² = 4.","4/4 = 1."],g:()=>Math.sqrt(5)-1},
  {t:"x / (√(x + 1) − √x)",x:true,f:x=>x/(Math.sqrt(x+1)-Math.sqrt(x)),steps:[FS("x",`${RD("x + 1")} − ${RD("x")}`),`${FS("x",`${RD("x + 1")} − ${RD("x")}`)} · ${FS(`${RD("x + 1")} + ${RD("x")}`,`${RD("x + 1")} + ${RD("x")}`)}`,FS(`x(${RD("x + 1")} + ${RD("x")})`,"(x + 1) − x"),`x(${RD("x + 1")} + ${RD("x")})`],
   why:["Las raíces tienen cantidades Variables, pero el método es el mismo.","Conjugado: √(x + 1) + √x.","Diferencia de cuadrados: (x + 1) − x.","El denominador vale 1."],g:x=>x*(Math.sqrt(x+1)+Math.sqrt(x))},
  {t:"1 / (√x − 2)",x:true,f:x=>1/(Math.sqrt(x)-2),steps:[FS(1,`${RD("x")} − 2`),`${FS(1,`${RD("x")} − 2`)} · ${FS(`${RD("x")} + 2`,`${RD("x")} + 2`)}`,FS(`${RD("x")} + 2`,"x − 4")],why:["Binomio con una raíz de x.","Conjugado: √x + 2.","(√x)² − 2² = x − 4. Ojo: x = 4 no está en el dominio."],g:x=>(Math.sqrt(x)+2)/(x-4)}];
  let k=0,st=0,x=2;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="rk">Expresión</label><select id="rk">${E.map((e,i)=>`<option value="${i}">${e.t}</option>`).join("")}</select><button class="btn sm" id="rprev">Paso anterior</button><button class="btn sm primary" id="rnext">Siguiente paso</button>
   <label for="rx" id="rxl">x = <output class="m" id="rxo"></output></label><input type="range" id="rx" min="1" max="100" value="20"></div>
   <div class="rsteps" id="rst" style="font-size:1.15rem;display:grid;gap:10px;padding:8px 4px"></div><div class="readout" id="rrr"></div></div>`;
  const draw=()=>{const e=E[k];$("#rst",host).innerHTML=e.steps.slice(0,st+1).map((s,i)=>`<div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;opacity:${i===st?1:.6}"><span class="m" style="min-width:2.2em">${i?"=":""}</span><span class="m">${s}</span><span class="muted" style="font-size:.9rem">${e.why[i]}</span></div>`).join("");
    $("#rprev",host).disabled=st===0;$("#rnext",host).disabled=st===e.steps.length-1;["#rx","#rxl"].forEach(s=>$(s,host).style.display=e.x?"":"none");$("#rxo",host).textContent=decs(x,1);
    const a=e.x?e.f(x):e.f(),b=e.x?e.g(x):e.g();
    $("#rrr",host).innerHTML=`<span class="k">Comprobación${e.x?` con x = ${decs(x,1)}`:""}</span>expresión inicial ≈ ${isFinite(a)?decs(a,5):"no existe"}; resultado ≈ ${isFinite(b)?decs(b,5):"no existe"}${isFinite(a)&&isFinite(b)?": el valor no cambia":""}`+(st===e.steps.length-1?`<br><span class="k">Listo</span>el denominador ya no tiene raíces`:"")};
  $("#rk",host).onchange=e=>{k=+e.target.value;st=0;draw()};$("#rnext",host).onclick=()=>{st++;draw()};$("#rprev",host).onclick=()=>{st--;draw()};$("#rx",host).oninput=e=>{x=+e.target.value/10;draw()};draw()}
});
