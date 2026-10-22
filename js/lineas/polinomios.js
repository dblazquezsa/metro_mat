"use strict";
/* ============ Línea: Álgebra básica · A6 Polinomios, A7 División de polinomios, A8 Residuo y raíces ============
   Los coeficientes se guardan de mayor a menor grado: [a_n, …, a_1, a_0]. */

const PSUP=["","","²","³","⁴","⁵"];
const pfmt=(cs,v="x")=>{const n=cs.length-1;return poly(cs.map((c,i)=>{const d=n-i;return[c,d===0?"":d===1?v:v+PSUP[d]]}))};
const pasc=(cs,v="x")=>{const n=cs.length-1;let s="";cs.forEach((c,i)=>{if(!c)return;const d=n-i;s+=(c<0?"-":(s?"+":""))+Math.abs(c)+(d===0?"":d===1?v:`${v}^${d}`)});return s||"0"};
const peval=(cs,x)=>cs.reduce((acc,c)=>acc*x+c,0);
const pmul=(a,b)=>{const r=Array(a.length+b.length-1).fill(0);a.forEach((x,i)=>b.forEach((y,j)=>r[i+j]+=x*y));return r};
const synth=(cs,a)=>{const row=[cs[0]];for(let i=1;i<cs.length;i++)row.push(cs[i]+row[i-1]*a);return{q:row.slice(0,-1),r:row[row.length-1],row}};
const fromRoots=rs=>rs.reduce((p,r)=>pmul(p,[1,-r]),[1]);
const factStr=rs=>rs.map(r=>`(x ${r<0?"+":"−"} ${Math.abs(r)})`).join("");
const factAsc=rs=>rs.map(r=>`(x${r<0?"+":"-"}${Math.abs(r)})`).join("");
const divs=n=>{n=Math.abs(n);const d=[];for(let k=1;k<=n;k++)if(n%k===0)d.push(k,-k);return d};
const figRuffini=(cs,a,row,upto)=>{const n=cs.length,cw=54,W=60+n*cw,H=130;let g=`<line x1="52" y1="10" x2="52" y2="96" stroke="var(--ink)" stroke-width="2"/><line x1="40" y1="66" x2="${W}" y2="66" stroke="var(--ink)" stroke-width="2"/>`;
  g+=`<text x="40" y="58" text-anchor="end" style="font:700 15px var(--f-mono);fill:var(--l-alg)">${fmt(a)}</text>`;
  cs.forEach((c,i)=>{const x=60+i*cw+cw/2;g+=`<text x="${x}" y="30" text-anchor="middle" style="font:700 15px var(--f-mono);fill:var(--ink)">${fmt(c)}</text>`;
    if(i>0&&i<=upto)g+=`<text x="${x}" y="58" text-anchor="middle" style="font:14px var(--f-mono);fill:var(--muted)">${fmt(row[i-1]*a)}</text>`;
    if(i<=upto)g+=`<text x="${x}" y="88" text-anchor="middle" style="font:700 15px var(--f-mono);fill:${i===n-1?"var(--l-ecu)":"var(--l-alg)"}">${fmt(row[i])}</text>`});
  g+=`<rect x="${60+(n-1)*cw+6}" y="70" width="${cw-12}" height="26" rx="5" fill="none" stroke="var(--l-ecu)" stroke-width="1.5" stroke-dasharray="3 3"/><text x="${60+(n-1)*cw+cw/2}" y="114" text-anchor="middle" style="font:600 11px var(--f-disp);fill:var(--l-ecu)">residuo</text>`;
  return`<svg viewBox="0 0 ${W+10} ${H}" role="img" aria-label="Tabla de división sintética" style="max-width:${Math.round((W+10)*1.45)}px">${g}</svg>`};

Object.assign(NODES,{
A6:{title:"Polinomios",sub:"Sumas de términos con potencias de una cantidad Variable.",
 info:`<p class="lead">Un <b>polinomio</b> en x es una suma de términos de la forma ${M(`a · ${P("x","n")}`)}, con n entero y no negativo. Por ejemplo ${M(`P(x) = 3${P("x",3)} − 5x + 2`)}.</p>
 <div class="ex-box"><span class="eyebrow">Vocabulario</span><p>El <b>grado</b> es el mayor exponente (aquí, 3). Los <b>coeficientes</b> son los números que multiplican a cada potencia: 3, 0, −5 y 2 (el término en ${P("x",2)} falta, así que su coeficiente es 0). El <b>término independiente</b> es el que no lleva x: 2.</p>
 <p>No son polinomios ${M(`${F(1,"x")}`)}, ${M("√x")} ni ${M(P(2,"x"))}: tienen la x en un denominador, en una raíz o en un exponente.</p></div>
 <div class="ex-box"><span class="eyebrow">Valor numérico</span><p>Sustituir x por un número: P(−2) = 3 · ${P("(−2)",3)} − 5 · (−2) + 2 = −24 + 10 + 2 = −12.</p></div>
 <div class="ex-box"><span class="eyebrow">Sumar y multiplicar</span><p>Para sumar o restar se juntan los términos del mismo grado: (${P("x",2)} + 3x) − (2${P("x",2)} − x) = −${P("x",2)} + 4x.</p>
 <p>Para multiplicar, cada término de un polinomio multiplica a cada término del otro, como en los rectángulos de «Productos con signo»: (x + 2)(${P("x",2)} − x + 3) = ${P("x",3)} + ${P("x",2)} + x + 6. El grado del producto es la suma de los grados.</p></div>
 <div class="callout"><span class="eyebrow">El menos delante de un paréntesis</span><p>Al restar un polinomio, el signo menos cambia <b>todos</b> sus términos: −(2${P("x",2)} − x) = −2${P("x",2)} + x.</p></div>`,
 explore:{intro:"Arma un polinomio moviendo sus coeficientes. Mira cómo cambian su grado y su gráfica, y calcula su valor en cualquier punto.",fn:"aPoli"},
 key:"Un polinomio es una suma de términos a · xⁿ. Su grado es el mayor exponente. Se suman juntando términos del mismo grado y se multiplican término a término.",
 ojo:"Si falta una potencia, su coeficiente es 0; y al restar un polinomio entre paréntesis, cambian todos los signos."},

A7:{title:"División de polinomios",sub:"Dividendo = divisor · cociente + residuo.",
 info:`<p class="lead">Dividir polinomios funciona como dividir números: 47 = 5 · 9 + 2. Para polinomios, <b>P(x) = D(x) · Q(x) + R(x)</b>, y el residuo R tiene menor grado que el divisor D.</p>
 <div class="ex-box"><span class="eyebrow">División sintética (Ruffini)</span><p>Cuando el divisor es ${M("x − a")}, hay un atajo. Para (${P("x",3)} − 2${P("x",2)} − 5x + 6) ÷ (x − 3):</p>
 ${figRuffini([1,-2,-5,6],3,[1,1,-2,0],3)}
 <p>1. Escribe los coeficientes (con 0 en los que falten) y a = 3 a la izquierda. 2. Baja el primero. 3. Multiplícalo por a y escríbelo bajo el siguiente. 4. Suma la columna. 5. Repite hasta el final.</p>
 <p>La última cifra es el <b>residuo</b> (0); las demás, los coeficientes del <b>cociente</b>, un grado menor: ${M(`${P("x",2)} + x − 2`)}.</p></div>
 <div class="callout"><span class="eyebrow">Dos trampas</span><p>Si el divisor es ${M("x + 2")}, entonces a = −2. Y si falta un término, como en ${M(`${P("x",3)} − 4x + 1`)}, hay que escribir su 0: 1, 0, −4, 1.</p></div>`,
 explore:{intro:"Sigue la división sintética paso a paso. Pide otra división cuando quieras y comprueba el resultado multiplicando.",fn:"aRuffini"},
 key:"P = D · Q + R, con el residuo de menor grado que el divisor. Para dividir entre x − a: coeficientes con ceros, bajar, multiplicar por a, sumar.",
 ojo:"Para x + 2 se usa a = −2, y los términos que faltan se escriben con coeficiente 0."},

A8:{title:"Residuo y raíces",sub:"Cuando el residuo es cero, aparece un factor.",
 info:`<p class="lead"><b>Teorema del residuo:</b> el residuo de dividir P(x) entre ${M("x − a")} es ${M("P(a)")}. Basta con sustituir.</p>
 <div class="ex-box"><span class="eyebrow">Por qué</span><p>Como P(x) = (x − a) · Q(x) + R, al poner x = a el primer sumando se anula: P(a) = R.</p></div>
 <p><b>Teorema del factor:</b> si P(a) = 0, entonces ${M("x − a")} es un factor de P(x). Ese número a es una <b>raíz</b> de P: un punto donde la gráfica corta el eje x.</p>
 <div class="ex-box"><span class="eyebrow">Buscar raíces enteras</span><p>Si los coeficientes son enteros y el primero es 1, las raíces enteras dividen al término independiente. Para ${M(`${P("x",3)} − 2${P("x",2)} − 5x + 6`)} se prueban ±1, ±2, ±3, ±6.</p>
 <p>P(1) = 0, así que x − 1 es factor. Con Ruffini, P(x) = (x − 1)(${P("x",2)} − x − 6) = (x − 1)(x − 3)(x + 2). Raíces: 1, 3 y −2.</p></div>
 <div class="callout"><span class="eyebrow">Signo de la raíz</span><p>El factor ${M("x + 2")} corresponde a la raíz −2, no a 2: hace cero el factor cuando x = −2.</p></div>`,
 explore:{intro:"Mueve a y mira a la vez el valor P(a), el residuo de la división sintética y el punto en la gráfica. Busca todas las raíces.",fn:"aRaices"},
 key:"El residuo de P(x) ÷ (x − a) es P(a). Si P(a) = 0, a es raíz y x − a es factor. Las raíces enteras se buscan entre los divisores del término independiente.",
 ojo:"La raíz de x + 2 es −2: el signo cambia al pasar del factor a la raíz."}
});

Object.assign(RETO,{
A6:[
 R=>{const n=R.i(2,4),cs=[R.nz(-6,6),...Array.from({length:n},()=>R.i(-6,6))];if(cs[cs.length-1]===0)cs[cs.length-1]=R.nz(-6,6);const c0=cs[cs.length-1],lead=cs[0];
  return{type:"choice",q:`¿Cuál es el grado y el término independiente de ${M(`P(x) = ${pfmt(cs)}`)}?`,opts:[`Grado ${n}; término independiente ${fmt(c0)}`,`Grado ${n}; término independiente ${fmt(lead)}`,`Grado ${n+1}; término independiente ${fmt(c0)}`,`Grado ${cs.filter(x=>x).length}; término independiente ${fmt(c0)}`,`Grado ${n}; término independiente ${fmt(cs[n-1])}`,`Grado ${fmt(lead)}; término independiente ${fmt(c0)}`].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4),
   hint:"El grado es el mayor exponente de x; el término independiente es el que no lleva x.",explain:`El mayor exponente es ${n} y el término sin x es ${fmt(c0)}.`}},
 R=>{const cs=[R.nz(-3,3),R.i(-5,5),R.i(-5,5),R.i(-9,9)],a=R.nz(-3,3),v=peval(cs,a);
  return{type:"fill",kind:"num",answer:v,q:`Si ${M(`P(x) = ${pfmt(cs)}`)}, calcula ${M(`P(${fmt(a)})`)}.`,hint:`Sustituye x por ${fmtP(a)} en cada término. Cuidado con las potencias de un número negativo.`,
   explain:`P(${fmt(a)}) = ${cs.map((c,i)=>`${fmtP(c)} · ${P(fmtP(a),3-i)}`).slice(0,3).join(" + ")} + ${fmtP(cs[3])} = ${fmt(v)}.`}},
 R=>{const p=[R.nz(-5,5),R.i(-6,6),R.i(-9,9)],q=[R.nz(-5,5),R.i(-6,6),R.i(-9,9)],d=p.map((c,i)=>c-q[i]);if(!d[0]||d.every(x=>!x))return RETO.A6[2](R);
  return{type:"fill",kind:"expr",answer:pasc(d),show:pfmt(d),maxTerms:3,noParens:true,q:`Calcula y simplifica ${M(`(${pfmt(p)}) − (${pfmt(q)})`)}`,hint:"El menos cambia el signo de todos los términos del segundo paréntesis; después junta los del mismo grado.",
   explain:`Al quitar el paréntesis cambian todos los signos del segundo polinomio: ${pfmt(p)} + (${pfmt(q.map(c=>-c))}). Juntando términos del mismo grado: ${pfmt(d)}.`}},
 R=>{const a=R.nz(-4,4),q=[1,R.i(-4,4),R.nz(-5,5)],pr=pmul([1,a],q);
  return{type:"fill",kind:"expr",answer:pasc(pr),show:pfmt(pr),maxTerms:4,noParens:true,q:`Multiplica y simplifica ${M(`(x ${a<0?"−":"+"} ${Math.abs(a)})(${pfmt(q)})`)}`,hint:"Multiplica x por cada término del segundo paréntesis, después el otro término, y junta los del mismo grado.",
   explain:`x · (${pfmt(q)}) = ${pfmt([...q,0])}; ${fmt(a)} · (${pfmt(q)}) = ${pfmt(q.map(c=>c*a))}. Sumando: ${pfmt(pr)}.`}},
 R=>{const yes=R.sh(["3x² − 1","x/2 + 5","7","−x³ + x","0,5x⁴ − 2x"]).slice(0,3),no=R.sh(["1/x + 2","√x − 3","2ˣ + 1","x⁻² + x","5/(x + 1)"]).slice(0,3);
  return{type:"bins",q:"Arrastra cada expresión a su grupo.",bins:["Es un polinomio","No es un polinomio"],items:R.sh([...yes.map(t=>({t,bin:0})),...no.map(t=>({t,bin:1}))]),
   hint:"En un polinomio la x solo aparece con exponentes enteros no negativos: nunca en un denominador, en una raíz ni en un exponente.",explain:"x/2 es un polinomio (coeficiente 1/2) y 7 también (grado 0). 1/x, √x, x⁻² y 2ˣ no lo son."}}],
A7:[
 R=>{const n=3,cs=[1,0,R.nz(-6,6),R.nz(-9,9)];const miss=R.f()<.5;const c=miss?cs:[1,R.nz(-4,4),0,R.nz(-9,9)];
  const right=`${c.map(fmt).join(", ")}`,drop=c.filter(x=>x!==0).map(fmt).join(", ");
  return{type:"choice",q:`Para dividir ${M(pfmt(c))} entre ${M("x − 2")} con división sintética, ¿qué fila de coeficientes se escribe?`,opts:[right,drop,c.slice().reverse().map(fmt).join(", "),c.map(x=>fmt(-x)).join(", ")],
   hint:"Hay que escribir un coeficiente por cada potencia, de la mayor a la menor, incluidas las que faltan.",explain:`${pfmt(c)} tiene grado 3, así que lleva 4 coeficientes: ${right}. El 0 ocupa el lugar del término que falta.`}},
 R=>{const rs=[R.nz(-4,4),R.nz(-4,4),R.nz(-4,4)],cs=fromRoots(rs),a=rs[0],qq=synth(cs,a).q;
  return{type:"fill",kind:"expr",answer:pasc(qq),show:pfmt(qq),maxTerms:3,noParens:true,noDiv:true,fig:"",q:`Divide ${M(`(${pfmt(cs)}) ÷ (x ${a<0?"+":"−"} ${Math.abs(a)})`)}. La división es exacta. Escribe el cociente.`,
   hint:`Usa la división sintética con a = ${fmt(a)}.`,explain:`Con a = ${fmt(a)}: ${synth(cs,a).row.map(fmt).join(", ")}. El residuo es 0 y el cociente es ${pfmt(qq)}.`}},
 R=>{const cs=[R.nz(-3,3),R.i(-5,5),R.i(-6,6),R.i(-9,9)],a=R.nz(-3,3),s=synth(cs,a);
  return{type:"fill",kind:"num",answer:s.r,q:`¿Cuál es el residuo de dividir ${M(pfmt(cs))} entre ${M(`x ${a<0?"+":"−"} ${Math.abs(a)}`)}?`,fig:"",hint:`Haz la división sintética con a = ${fmt(a)} y mira la última cifra.`,
   explain:`Fila de Ruffini con a = ${fmt(a)}: ${s.row.map(fmt).join(", ")}. El residuo es ${fmt(s.r)}.`}},
 R=>{const steps=["Escribir los coeficientes, con 0 en los términos que faltan","Bajar el primer coeficiente","Multiplicar por a y escribir el resultado bajo el siguiente coeficiente","Sumar esa columna","Repetir hasta la última columna","Leer el cociente y el residuo"];
  return{type:"order",noEval:true,q:"Ordena los pasos de la división sintética entre x − a.",items:R.sh(steps),correct:steps,hint:"Empieza por preparar la fila de coeficientes; termina leyendo el resultado.",explain:steps.map((s,i)=>`${i+1}. ${s}`).join(". ")+"."}},
 R=>{const k=R.i(1,4),cs=[1,0,R.nz(-6,6),R.nz(-9,9)],s=synth(cs,-k);
  return{type:"fill",kind:"num",answer:s.r,q:`Calcula el residuo de ${M(`(${pfmt(cs)}) ÷ (x + ${k})`)} con división sintética.`,hint:`El divisor es x + ${k} = x − (−${k}): usa a = −${k}, y no olvides el 0 del término en x².`,
   explain:`Coeficientes 1, 0, ${fmt(cs[2])}, ${fmt(cs[3])} y a = −${k}: ${s.row.map(fmt).join(", ")}. El residuo es ${fmt(s.r)}.`}}],
A8:[
 R=>{const cs=[1,R.i(-4,4),R.i(-6,6),R.i(-6,6),R.i(-9,9)],a=R.nz(-2,2),v=peval(cs,a);
  return{type:"fill",kind:"num",answer:v,q:`Sin hacer la división, halla el residuo de dividir ${M(pfmt(cs))} entre ${M(`x ${a<0?"+":"−"} ${Math.abs(a)}`)}.`,hint:`Por el teorema del residuo, basta con calcular P(${fmt(a)}).`,
   explain:`El residuo es P(${fmt(a)}) = ${fmt(v)}.`}},
 R=>{let rs;do{rs=[R.nz(-4,4),R.nz(-4,4),R.nz(-4,4)]}while(new Set(rs.map(Math.abs)).size<3);const cs=fromRoots(rs),r=rs[0],others=divs(cs[3]).filter(d=>!rs.includes(d)&&d!==-r);
  const w=R.sh(others).slice(0,2);if(w.length<2)return RETO.A8[1](R);
  return{type:"choice",q:`¿Cuál de estos es un factor de ${M(`P(x) = ${pfmt(cs)}`)}?`,opts:[M(`x ${r<0?"+":"−"} ${Math.abs(r)}`),M(`x ${r<0?"−":"+"} ${Math.abs(r)}`),...w.map(d=>M(`x ${d<0?"+":"−"} ${Math.abs(d)}`))],
   hint:"x − a es factor si P(a) = 0. Prueba cada valor.",explain:`P(${fmt(r)}) = 0, así que x ${r<0?"+":"−"} ${Math.abs(r)} es factor. ${M(`x ${r<0?"−":"+"} ${Math.abs(r)}`)} correspondería a la raíz ${fmt(-r)}, y P(${fmt(-r)}) = ${fmt(peval(cs,-r))}.`}},
 R=>{let rs;do{rs=[R.nz(-4,4),R.nz(-4,4),R.nz(-4,4)]}while(new Set(rs).size<3);const cs=fromRoots(rs);
  return{type:"fill",kind:"set",answer:rs,show:rs.slice().sort((a,b)=>a-b).map(fmt).join("; "),q:`Encuentra todas las raíces de ${M(`P(x) = ${pfmt(cs)}`)}.`,hint:`Prueba los divisores de ${fmt(cs[3])}. Cuando encuentres una raíz, divide con Ruffini y resuelve lo que queda.`,
   explain:`P(x) = ${factStr(rs)}: las raíces son ${rs.slice().sort((a,b)=>a-b).map(fmt).join(", ")}.`}},
 R=>{let rs;do{rs=[R.nz(-4,4),R.nz(-4,4),R.nz(-4,4)]}while(new Set(rs).size<3);const cs=fromRoots(rs);
  return{type:"fill",kind:"expr",factor:true,answer:factAsc(rs),show:factStr(rs),q:`Factoriza completamente ${M(pfmt(cs))}.`,hint:`Busca una raíz entre los divisores de ${fmt(cs[3])}, divide con Ruffini y factoriza el trinomio que queda.`,
   explain:`Las raíces son ${rs.map(fmt).join(", ")}, así que ${pfmt(cs)} = ${factStr(rs)}.`}},
 R=>{const a=R.nz(-4,4),b=R.i(-4,4),k=-(a*a+b*a);if(Math.abs(k)>22||k===0)return RETO.A8[4](R);
  return{type:"slider",name:"k",min:-24,max:24,start:k>0?-20:20,answer:k,show:"k = "+k,label:v=>"k = "+v,
   q:`Ajusta k para que ${M(`x = ${fmt(a)}`)} sea raíz de ${M(`${P("x",2)}${b?sgA(b)+"x":""} + k`)}.`,hint:`Necesitas P(${fmt(a)}) = 0: ${fmtP(a)}² ${b?sgA(b)+" · "+fmtP(a):""} + k = 0.`,
   explain:`${P(fmtP(a),2)}${b?sgA(b)+" · "+fmtP(a):""} = ${fmt(a*a+b*a)}, así que k = ${fmt(k)}.`,
   render:(v,ok)=>plot({xmin:-7,xmax:7,ymin:-30,ymax:30,w:520,h:300,ystep:10,xstep:1,fns:[{f:x=>x*x+b*x+v,color:ok?"var(--ok)":"var(--l-alg)"}],pts:[{x:a,y:0,color:"var(--l-ecu)",open:true,label:"x = "+fmt(a)}],aria:"Parábola que se desplaza con k"})}}]
});

Object.assign(RECAP,{
A6:{map:[0,1,2,3,0],pts:[
  {s:"Grado y coeficientes",t:"El grado es el mayor exponente; si falta una potencia, su coeficiente es 0. Solo hay exponentes enteros no negativos.",ex:"3x³ − 5x + 2: grado 3"},
  {s:"Valor numérico",t:"Se sustituye x por el número, con cuidado con las potencias de negativos.",ex:"P(−2) = 3(−8) + 10 + 2 = −12"},
  {s:"Sumar y restar",t:"Se juntan los términos del mismo grado; el menos delante de un paréntesis cambia todos los signos.",ex:"(x² + 3x) − (2x² − x) = −x² + 4x"},
  {s:"Multiplicar",t:"Cada término multiplica a cada término; el grado del producto es la suma de los grados.",ex:"(x + 2)(x² − x + 3) = x³ + x² + x + 6"}]},
A7:{map:[2,1,0,1,3],pts:[
  {s:"Dividendo = divisor · cociente + residuo",t:"Como con los números; el residuo tiene menor grado que el divisor.",ex:"47 = 5 · 9 + 2"},
  {s:"División sintética",t:"Para dividir entre x − a: bajar, multiplicar por a, sumar; la última cifra es el residuo.",ex:"x³ − 2x² − 5x + 6 ÷ (x − 3) → x² + x − 2"},
  {s:"Los ceros que faltan",t:"Cada potencia ausente se escribe con coeficiente 0.",ex:"x³ − 4x + 1 → 1, 0, −4, 1"},
  {s:"Divisor x + k",t:"Dividir entre x + k es dividir entre x − (−k): se usa a = −k.",ex:"x + 2 → a = −2"}]},
A8:{map:[0,1,2,3,1],pts:[
  {s:"Teorema del residuo",t:"El residuo de dividir P(x) entre x − a es P(a).",ex:"P(2) = residuo de P ÷ (x − 2)"},
  {s:"Teorema del factor",t:"Si P(a) = 0, entonces a es raíz y x − a es factor; la raíz de x + 2 es −2.",ex:"P(1) = 0 → (x − 1) es factor"},
  {s:"Candidatos a raíz",t:"Las raíces enteras dividen al término independiente.",ex:"x³ − 2x² − 5x + 6: ±1, ±2, ±3, ±6"},
  {s:"Factorizar con raíces",t:"Con una raíz y Ruffini se baja el grado hasta factorizar del todo.",ex:"(x − 1)(x − 3)(x + 2)"}]}
});

Object.assign(EXPLORE,{
aPoli(host){const c=[0,1,-2,-3];let t=1;
  host.innerHTML=`<div class="xp"><div class="ctrl">${["x³","x²","x","1"].map((l,i)=>`<label for="pc${i}">${l}: <output class="m" id="pco${i}">${c[i]}</output></label><input type="range" id="pc${i}" min="-4" max="4" value="${c[i]}" style="width:110px">`).join("")}</div>
   <div class="ctrl"><label for="pt">Valor de x = <output class="m" id="pto">1</output></label><input type="range" id="pt" min="-6" max="6" value="2"></div>
   <div class="svgwrap" id="psv3"></div><div class="readout" id="prr3"></div></div>`;
  const draw=()=>{const cs=c.slice(),first=cs.findIndex(v=>v!==0),deg=first<0?0:3-first,v=peval(cs,t);
    $("#psv3",host).innerHTML=plot({xmin:-4,xmax:4,ymin:-12,ymax:12,w:560,h:330,ystep:4,xstep:1,fns:[{f:x=>peval(cs,x),color:"var(--l-alg)"}],pts:[{x:t,y:v,color:"var(--l-ecu)",label:`P(${decs(t,1)}) = ${decs(v,3)}`}],aria:"Gráfica del polinomio"});
    c.forEach((x,i)=>$("#pco"+i,host).textContent=x);$("#pto",host).textContent=decs(t,1);
    $("#prr3",host).innerHTML=`<span class="k">Polinomio</span>P(x) = ${pfmt(cs)}<br><span class="k">Grado</span>${first<0?"no tiene (es el polinomio cero)":deg}${first>0?" (los coeficientes de las potencias mayores son 0)":""}<br><span class="k">Término independiente</span>${fmt(cs[3])}: es P(0), el corte con el eje y<br><span class="k">Valor numérico</span>P(${decs(t,1)}) = ${cs.map((k,i)=>k?`${fmtP(k)}·${P("("+decs(t,1)+")",3-i)}`:"").filter(Boolean).join(" + ")||"0"} = ${decs(v,3)}`};
  c.forEach((_,i)=>$("#pc"+i,host).oninput=e=>{c[i]=+e.target.value;draw()});$("#pt",host).oninput=e=>{t=+e.target.value/2;draw()};draw()},

aRuffini(host){let cs,a,step=0;const R0=rng(newSeed());
  host.innerHTML=`<div class="xp"><div class="readout" id="rf0"></div><div class="svgwrap" id="rfs" style="text-align:center"></div><div class="ctrl"><button class="btn sm primary" id="rfn">Siguiente paso</button><button class="btn sm ghost" id="rfa">Ver todo</button><button class="btn sm ghost" id="rfnew">Otra división</button></div><div class="readout" id="rfr"></div></div>`;
  const fresh=()=>{const n=R0.p([3,3,4]);cs=[1,...Array.from({length:n},()=>R0.i(-6,6))];if(R0.f()<.5)cs[R0.i(1,n-1)]=0;a=R0.nz(-3,3);step=0;draw()};
  const draw=()=>{const s=synth(cs,a),n=cs.length;$("#rf0",host).innerHTML=`<span class="k">División</span>(${pfmt(cs)}) ÷ (x ${a<0?"+":"−"} ${Math.abs(a)})  →  a = ${fmt(a)}`;
    $("#rfs",host).innerHTML=figRuffini(cs,a,s.row,step);
    const msg=step===0?`Baja el primer coeficiente: ${fmt(cs[0])}.`:step<n-1?`Columna ${step+1}: ${fmt(s.row[step-1])} · ${fmtP(a)} = ${fmt(s.row[step-1]*a)}; ${fmt(cs[step])} + ${fmtP(s.row[step-1]*a)} = ${fmt(s.row[step])}.`:`Última columna: ${fmt(s.row[step-1])} · ${fmtP(a)} = ${fmt(s.row[step-1]*a)}; ${fmt(cs[step])} + ${fmtP(s.row[step-1]*a)} = ${fmt(s.r)}. Ese es el residuo.`;
    $("#rfr",host).innerHTML=`<span class="k">Paso ${step+1} de ${n}</span>${msg}`+(step===n-1?`<br><span class="k">Resultado</span>cociente ${pfmt(s.q)}, residuo ${fmt(s.r)}<br><span class="k">Comprobación</span>(x ${a<0?"+":"−"} ${Math.abs(a)})(${pfmt(s.q)})${s.r?sgA(s.r):""} = ${pfmt(cs)}`:"");
    $("#rfn",host).disabled=step>=n-1};
  $("#rfn",host).onclick=()=>{step++;draw()};$("#rfa",host).onclick=()=>{step=cs.length-1;draw()};$("#rfnew",host).onclick=fresh;fresh()},

aRaices(host){let rs,cs,a=0,found;const R0=rng(newSeed());
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ra3">a = <output class="m" id="rao3">0</output></label><input type="range" id="ra3" min="-6" max="6" value="0"><button class="btn sm ghost" id="rnew3">Otro polinomio</button></div>
   <div class="svgwrap" id="rsv3"></div><div class="readout" id="rrr3"></div></div>`;
  const fresh=()=>{do{rs=[R0.nz(-4,4),R0.nz(-4,4),R0.nz(-4,4)]}while(new Set(rs).size<3);cs=fromRoots(rs);found=new Set();a=0;$("#ra3",host).value=0;draw()};
  const draw=()=>{const v=peval(cs,a),s=synth(cs,a);if(v===0)found.add(a);const ym=Math.max(30,...[-5,-4,4,5].map(x=>Math.abs(peval(cs,x))).filter(x=>x<200));
    $("#rsv3",host).innerHTML=plot({xmin:-6,xmax:6,ymin:-60,ymax:60,w:560,h:320,ystep:20,xstep:1,fns:[{f:x=>peval(cs,x),color:"var(--l-alg)"}],vl:[{x:a,color:"var(--muted)",dash:"4 3",width:1.5}],
      pts:[{x:a,y:v,color:v===0?"var(--ok)":"var(--l-ecu)",label:`P(${fmt(a)}) = ${fmt(v)}`},...[...found].map(r=>({x:r,y:0,color:"var(--ok)",r:7}))],aria:"Gráfica del polinomio y el punto a"});
    $("#rao3",host).textContent=fmt(a);
    $("#rrr3",host).innerHTML=`<span class="k">Polinomio</span>P(x) = ${pfmt(cs)}<br><span class="k">Candidatos a raíz</span>divisores de ${fmt(cs[3])}: ${divs(cs[3]).map(fmt).join(", ")}<br><span class="k">Ruffini con a = ${fmt(a)}</span>${s.row.map(fmt).join(", ")} → residuo ${fmt(s.r)}<br><span class="k">P(${fmt(a)})</span>${fmt(v)} ${v===0?`= 0: <b>${fmt(a)} es raíz</b> y x ${a<0?"+":"−"} ${Math.abs(a)} es un factor`:"(igual al residuo)"}<br><span class="k">Raíces encontradas</span>${found.size?[...found].sort((p,q)=>p-q).map(fmt).join(", "):"todavía ninguna"}${found.size===3?`. ¡Todas! P(x) = ${factStr([...found].sort((p,q)=>p-q))}`:""}`};
  $("#ra3",host).oninput=e=>{a=+e.target.value;draw()};$("#rnew3",host).onclick=fresh;fresh()}
});
