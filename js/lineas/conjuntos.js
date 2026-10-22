"use strict";
/* ============ Línea alternativa: Conjuntos · C1–C5 ============ */

const setT=a=>{const v=[...new Set(a)].sort((x,y)=>x-y);return v.length?"{"+v.map(fmt).join(", ")+"}":"∅"};
const setIn=a=>{const v=[...new Set(a)].sort((x,y)=>x-y);return v.length?v.map(n=>n<0?"-"+Math.abs(n):String(n)).join("; "):"∅"};
const SETTIP="Escribe los elementos separados por punto y coma, por ejemplo: -2; 0; 5. El orden no importa. Si el conjunto es vacío, escribe ∅ o «vacío».";
const setItem=(o,vals)=>({type:"fill",kind:"set",noun:"elemento",answer:[...new Set(vals)],show:setIn(vals),showText:setT(vals),tip:SETTIP,ph:"Por ejemplo: -2; 0; 5",...o});
const range=(a,b)=>{const r=[];for(let k=a;k<=b;k++)r.push(k);return r};
const isPrime=n=>{if(n<2)return false;for(let k=2;k*k<=n;k++)if(n%k===0)return false;return true};
/* Regiones del diagrama de Venn para cada conjunto */
const RG={2:{A:["a","ab"],B:["b","ab"],U:["a","ab","b","o"]},3:{A:["a","ab","ac","abc"],B:["b","ab","bc","abc"],C:["c","ac","bc","abc"],U:["a","b","c","ab","ac","bc","abc","o"]}};
const rU=(x,y)=>[...new Set([...x,...y])],rI=(x,y)=>x.filter(r=>y.includes(r)),rD=(x,y)=>x.filter(r=>!y.includes(r));
const sameR=(x,y)=>x.length===y.length&&x.every(r=>y.includes(r));
/* Diagramas pequeños para «todo P es Q» */
function miniVenn(kind,aria){const c=k=>`<circle cx="${k[0]}" cy="${k[1]}" r="${k[2]}" fill="color-mix(in srgb,var(--linec) 16%,transparent)" stroke="var(--ink)" stroke-width="2"/>`,t=(x,y,s)=>`<text x="${x}" y="${y}" text-anchor="middle" style="font:italic 700 15px var(--f-body);fill:var(--ink)">${s}</text>`;
  const g=kind==="PinQ"?c([75,48,40])+c([82,56,18])+t(82,61,"P")+t(52,32,"Q"):kind==="QinP"?c([75,48,40])+c([82,56,18])+t(82,61,"Q")+t(52,32,"P")
   :kind==="over"?c([58,48,30])+c([92,48,30])+t(45,53,"P")+t(105,53,"Q"):c([40,48,26])+c([110,48,26])+t(40,53,"P")+t(110,53,"Q");
  return`<svg viewBox="0 0 150 96" width="150" height="96" role="img" aria-label="${aria}"><rect x="2" y="2" width="146" height="92" rx="8" fill="none" stroke="var(--muted)" stroke-width="1.2"/>${g}</svg>`}

Object.assign(NODES,{
C1:{title:"Elementos y pertenencia",sub:"Qué es un conjunto y qué está dentro de él.",
 info:`<p class="lead">Un <b>conjunto</b> es una colección de objetos bien definida: siempre se puede decidir si algo está o no está en él. Los objetos que lo forman se llaman <b>elementos</b>.</p>
 <div class="ex-box"><span class="eyebrow">Pertenencia</span><p>Si A = {2, 3, 5, 7}, el 3 <b>pertenece</b> a A y el 4 no:</p><p class="calc">3 ∈ A        4 ∉ A</p></div>
 <div class="ex-box"><span class="eyebrow">Sin orden y sin repeticiones</span><p>En un conjunto no importa el orden ni las repeticiones: {1, 2, 3} = {3, 1, 2} = {1, 1, 2, 3}. El <b>cardinal</b> |A| es el número de elementos distintos: |{1, 1, 2, 3}| = 3.</p>
 <p>Las letras de la palabra CASA forman el conjunto {C, A, S}, de cardinal 3.</p></div>
 <div class="ex-box"><span class="eyebrow">El conjunto vacío</span><p>∅ = { } no tiene elementos: |∅| = 0. En cambio {∅} no es vacío: tiene un elemento, que es el conjunto vacío.</p></div>
 <div class="callout"><span class="eyebrow">Conjuntos dentro de conjuntos</span><p>Un conjunto puede ser elemento de otro. En B = {1, {2, 3}} los elementos son 1 y {2, 3}: |B| = 2, {2, 3} ∈ B, pero 2 ∉ B. El 2 está dentro de un elemento de B, no es un elemento de B.</p></div>`,
 explore:{intro:"Escribe una palabra y mira el conjunto de sus letras: las repetidas no cuentan dos veces. Después pregunta si una letra pertenece al conjunto.",fn:"cElem"},
 key:"Un conjunto se describe por sus elementos, sin orden y sin repeticiones. x ∈ A significa que x es un elemento de A; |A| es el número de elementos distintos.",
 ojo:"En {1, {2, 3}} el 2 no es un elemento: el elemento es {2, 3}. Y {∅} tiene un elemento, no cero."},

C2:{title:"Extensión y comprensión",sub:"Dos maneras de describir un conjunto.",
 info:`<p class="lead">Un conjunto se describe <b>por extensión</b> cuando se escriben todos sus elementos, y <b>por comprensión</b> cuando se da una propiedad que cumplen exactamente sus elementos.</p>
 <div class="ex-box"><span class="eyebrow">El mismo conjunto, de dos maneras</span><p class="calc">A = {2, 4, 6, 8}        A = {x ∈ ℤ : x es par y 0 &lt; x &lt; 10}</p>
 <p>La segunda se lee: «el conjunto de los x enteros <b>tales que</b> x es par y está entre 0 y 10».</p></div>
 <div class="ex-box"><span class="eyebrow">Conjuntos de referencia</span><p>ℕ = {1, 2, 3, …} son los naturales (en esta caja empiezan en 1), ℤ los enteros, ℚ los racionales y ℝ los reales. El conjunto de referencia cambia el resultado:</p>
 <p class="calc">{x ∈ ℤ : −2 ≤ x &lt; 3} = {−2, −1, 0, 1, 2}</p>
 <p>En cambio {x ∈ ℝ : −2 ≤ x &lt; 3} es el intervalo [−2, 3): tiene infinitos elementos y no se puede escribir por extensión.</p></div>
 <div class="ex-box"><span class="eyebrow">Con una fórmula</span><p>{2n − 1 : n ∈ ℕ, n ≤ 4} = {1, 3, 5, 7}: se sustituye n = 1, 2, 3, 4 en la fórmula. Y {n² : n ∈ ℤ, |n| ≤ 2} = {0, 1, 4}, porque (−2)² y 2² dan el mismo elemento.</p></div>
 <div class="callout"><span class="eyebrow">Mira bien los extremos</span><p>&lt; deja fuera el extremo y ≤ lo incluye: {x ∈ ℤ : 1 &lt; x ≤ 4} = {2, 3, 4}. Contar los enteros de a hasta b, ambos incluidos, da b − a + 1, no b − a.</p></div>`,
 explore:{intro:"Elige una propiedad y los extremos. Verás la descripción por comprensión, la lista por extensión y los números que cumplen la condición. Toca un número para saber por qué está o no.",fn:"cComp"},
 key:"Por extensión se listan los elementos; por comprensión se da la propiedad que los caracteriza. El conjunto de referencia (ℕ, ℤ, ℝ) y los extremos (< o ≤) cambian el conjunto.",
 ojo:"De −2 a 3, ambos incluidos, hay 6 enteros: 3 − (−2) + 1. No olvides el cero ni los extremos."},

C3:{title:"Subconjuntos e inclusión",sub:"Cuando todos los elementos de un conjunto están en otro.",
 info:`<p class="lead">B es <b>subconjunto</b> de A, y se escribe B ⊆ A, cuando todo elemento de B es también elemento de A. Se dice que B está <b>incluido</b> en A.</p>
 <div class="ex-box"><span class="eyebrow">Ejemplos</span><p>Con A = {1, 2, 3, 4}: {1, 3} ⊆ A, pero {1, 5} ⊄ A, porque 5 ∉ A. Todo conjunto es subconjunto de sí mismo (A ⊆ A) y el vacío es subconjunto de cualquier conjunto (∅ ⊆ A).</p>
 <div class="exfig">${miniVenn("PinQ","B dentro de A").replace(/>P</,">B<").replace(/>Q</,">A<")}</div>
 <p>En un diagrama, B ⊆ A se dibuja con B dentro de A.</p></div>
 <div class="ex-box"><span class="eyebrow">Pertenencia o inclusión</span><p>∈ relaciona un <b>elemento</b> con un conjunto; ⊆ relaciona dos <b>conjuntos</b>. Con A = {1, 2, 3, 4}:</p>
 ${figTable(["Afirmación","¿Es cierta?"],[["2 ∈ A","Sí: 2 es un elemento de A"],["{2} ⊆ A","Sí: el único elemento de {2} está en A"],["{2} ∈ A","No: los elementos de A son números, no conjuntos"],["2 ⊆ A","No tiene sentido: 2 no es un conjunto"]])}</div>
 <div class="ex-box"><span class="eyebrow">¿Cuántos subconjuntos?</span><p>{a, b} tiene 4 subconjuntos: ∅, {a}, {b} y {a, b}. Al formar un subconjunto, cada elemento puede estar o no estar: con n elementos hay ${M(P(2,"n"))} subconjuntos.</p></div>
 <div class="callout"><span class="eyebrow">Igualdad e inclusiones encadenadas</span><p>A = B exactamente cuando A ⊆ B y B ⊆ A. Las inclusiones se encadenan: ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ, y todo múltiplo de 6 es múltiplo de 3.</p></div>`,
 explore:{intro:"Elige cuántos elementos tiene A y forma un subconjunto B tocando sus elementos. Mira la lista completa de subconjuntos: cada vez que A gana un elemento, el número de subconjuntos se duplica.",fn:"cSub"},
 key:"B ⊆ A si todo elemento de B está en A. ∅ y A son siempre subconjuntos de A. Un conjunto de n elementos tiene 2ⁿ subconjuntos.",
 ojo:"∈ es para elementos y ⊆ para conjuntos: 2 ∈ A, pero {2} ⊆ A."},

C4:{title:"Operaciones y diagramas de Venn",sub:"Unir, intersecar, restar y complementar.",
 info:`<p class="lead">Dentro de un conjunto universal U se pueden combinar conjuntos. Los diagramas de Venn ayudan a ver el resultado.</p>
 <div class="ex-box"><span class="eyebrow">Las cuatro operaciones</span>
 ${figTable(["Operación","Se lee","Elementos que…"],[["A ∪ B","A unión B","están en A o en B (o en los dos)"],["A ∩ B","A intersección B","están en A y en B a la vez"],["A − B","A menos B","están en A pero no en B"],["Aᶜ","complemento de A","están en U pero no en A"]])}
 <div class="exfig" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px">${[["A ∪ B",["a","ab","b"]],["A ∩ B",["ab"]],["A − B",["a"]],["Aᶜ",["b","o"]]].map(([t,r])=>`<figure style="margin:0;text-align:center">${vennSVG({n:2,shade:r,uid:"ci"+r.join(""),color:"var(--l-con)",w:200,aria:t})}<figcaption class="m">${t}</figcaption></figure>`).join("")}</div></div>
 <div class="ex-box"><span class="eyebrow">Ejemplo</span><p>U = {1, 2, …, 10}, A = {1, 2, 3, 4, 5, 6} y B = {2, 4, 6, 8, 10}:</p>
 <p class="calc">A ∪ B = {1, 2, 3, 4, 5, 6, 8, 10}    A ∩ B = {2, 4, 6}    A − B = {1, 3, 5}    Bᶜ = {1, 3, 5, 7, 9}</p>
 <p>Si A ∩ B = ∅, los conjuntos son <b>disjuntos</b>: no tienen elementos en común.</p></div>
 <div class="ex-box"><span class="eyebrow">Con tres conjuntos</span><p>Los paréntesis indican qué se hace primero. (A ∩ B) ∪ C y A ∩ (B ∪ C) son conjuntos distintos:</p>
 <div class="exfig" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px">${[["(A ∩ B) ∪ C",rU(rI(RG[3].A,RG[3].B),RG[3].C)],["A ∩ (B ∪ C)",rI(RG[3].A,rU(RG[3].B,RG[3].C))]].map(([t,r],i)=>`<figure style="margin:0;text-align:center">${vennSVG({n:3,shade:r,uid:"ct"+i,color:"var(--l-con)",w:230,aria:t})}<figcaption class="m">${t}</figcaption></figure>`).join("")}</div></div>
 <div class="callout"><span class="eyebrow">A − B no es B − A</span><p>En el ejemplo, A − B = {1, 3, 5}, pero B − A = {8, 10}. La diferencia, como la resta, depende del orden.</p></div>`,
 explore:{intro:"Elige qué números forman A y B dentro de U = {1, 2, …, 20}. Cada número aparece en su región del diagrama. Pulsa una operación para ver su resultado.",fn:"cVenn"},
 key:"A ∪ B: en A o en B. A ∩ B: en los dos. A − B: en A y no en B. Aᶜ: en U y no en A. En los diagramas, cada operación es un grupo de regiones.",
 ojo:"La unión no repite elementos y A − B no es lo mismo que B − A."},

C5:{title:"Contar con inclusión-exclusión",sub:"Sumar sin contar dos veces.",
 info:`<p class="lead">Para contar los elementos de una unión no basta sumar: los que están en los dos conjuntos se contarían dos veces. Por eso se restan una vez:</p>
 <p class="calc">|A ∪ B| = |A| + |B| − |A ∩ B|</p>
 <div class="ex-box"><span class="eyebrow">Ejemplo</span><p>En un curso de 40 estudiantes, 25 juegan fútbol, 18 baloncesto y 10 juegan los dos. Juegan al menos uno: 25 + 18 − 10 = 33. No juegan ninguno: 40 − 33 = 7.</p>
 <div class="exfig">${vennSVG({n:2,names:["F","B"],texts:{a:"15",ab:"10",b:"8",o:"7"},color:"var(--l-con)",uid:"c5i",w:360,aria:"Fútbol y baloncesto: 15 solo fútbol, 10 ambos, 8 solo baloncesto y 7 ninguno"})}</div>
 <p>Conviene llenar el diagrama de dentro hacia fuera: primero la intersección (10), después «solo fútbol» (25 − 10 = 15) y «solo baloncesto» (18 − 10 = 8), y al final los de fuera.</p></div>
 <div class="ex-box"><span class="eyebrow">Contar múltiplos</span><p>Del 1 al 30 hay 15 múltiplos de 2 y 10 múltiplos de 3. Los múltiplos de 6 están en los dos grupos: son 5. Múltiplos de 2 o de 3: 15 + 10 − 5 = 20.</p></div>
 <div class="ex-box"><span class="eyebrow">Con tres conjuntos</span><p class="calc">|A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|</p>
 <p>Al restar las intersecciones de dos en dos, los elementos que están en los tres se quitan tres veces; por eso se suman una vez al final.</p></div>`,
 explore:{intro:"Mueve los deslizadores. Mira cómo la suma |A| + |B| cuenta dos veces la intersección y cómo la fórmula lo corrige.",fn:"cConteo"},
 key:"|A ∪ B| = |A| + |B| − |A ∩ B|. Para resolver problemas, llena el diagrama de Venn de dentro hacia fuera.",
 ojo:"Si sumas |A| + |B| sin restar la intersección, cuentas dos veces a los que están en los dos."}
});

Object.assign(RETO,{
C1:[
 R=>{const nums=R.sh(range(1,12));const [a,b,c,d,x,y]=nums;const A=`A = {${a}, ${b}, {${c}}, ${d}}`;
  const pool=[{t:`${a} ∈ A`,bin:0},{t:`${x} ∉ A`,bin:0},{t:`{${c}} ∈ A`,bin:0},{t:"|A| = 4",bin:0},{t:`${c} ∈ A`,bin:1},{t:`${b} ∉ A`,bin:1},{t:"|A| = 5",bin:1},{t:`${y} ∈ A`,bin:1},{t:`{${d}} ∈ A`,bin:1}];
  const items=[...R.sh(pool.filter(p=>p.bin===0)).slice(0,3),...R.sh(pool.filter(p=>p.bin===1)).slice(0,3)].filter((p,i,arr)=>arr.findIndex(q=>q.t===p.t)===i);
  return{type:"bins",q:`Sea ${M(A)}. Clasifica cada afirmación.`,bins:["Verdadera","Falsa"],items,hint:`Los elementos de A son cuatro: ${a}, ${b}, {${c}} y ${d}. El ${c} solo está dentro de un elemento.`,
   explain:`A tiene 4 elementos: ${a}, ${b}, {${c}} y ${d}. Por eso {${c}} ∈ A, pero ${c} ∉ A; y {${d}} ∉ A, porque el elemento es ${d}, no el conjunto {${d}}.`}},
 R=>{const w=R.p(["MATEMATICAS","COLOMBIA","MEDELLIN","CONJUNTO","PAPAYA","ANTIOQUIA","BANANO","PARALELO","CORDILLERA","ECUACION"]),L=[...new Set(w)];
  return{type:"fill",kind:"num",answer:L.length,q:`¿Cuál es el cardinal del conjunto de las letras de la palabra ${w}?`,hint:"Escribe cada letra una sola vez, aunque se repita en la palabra.",
   explain:`El conjunto es {${L.join(", ")}}: tiene ${L.length} elementos. Las letras repetidas no se cuentan dos veces.`}},
 R=>{const [a,b,c,d]=R.sh(range(1,15));
  return{type:"choice",q:`¿Cuál de estos conjuntos es igual a ${M(`{${a}, ${b}, ${c}}`)}?`,opts:[`{${c}, ${a}, ${b}, ${a}}`,`{${a}, ${b}}`,`{${a}, ${b}, ${c}, ${d}}`,`{{${a}, ${b}, ${c}}}`],hint:"Para que dos conjuntos sean iguales deben tener exactamente los mismos elementos. El orden y las repeticiones no importan.",
   explain:`{${c}, ${a}, ${b}, ${a}} tiene los mismos elementos: ${a}, ${b} y ${c}. {{${a}, ${b}, ${c}}} es distinto: tiene un solo elemento, que es un conjunto.`}},
 R=>{const C=[["∅","{ }"],["{∅}","{0}","{{1, 2, 3}}","{7, 7, 7}"],["{1, {2, 3}}","{x, y, x}","{∅, 0}","{3, 3, 8, 8}"],["{1, 2, {1, 2}}","{a, b, c, a}","{0, ∅, {0}}"],["{2, 4, 6, 8, 2}","{1, {1}, {{1}}, 2}","{∅, {∅}, 0, 1}"]];
  const picks=C.map(g=>R.p(g));
  return{type:"order",noEval:true,q:"Ordena estos conjuntos de menor a mayor cardinal (número de elementos distintos).",items:R.sh(picks),correct:picks,hint:"Cuenta los elementos distintos. Un conjunto escrito dentro de otro cuenta como un solo elemento.",
   explain:`Cardinales: ${picks.map((p,i)=>`|${p}| = ${i}`).join("; ")}.`}},
 R=>{const [a,b,c,d]=R.sh(range(1,9));
  return{type:"choice",q:`Sea ${M(`B = {${a}, {${b}}, {${c}, ${d}}}`)}. ¿Cuál afirmación es verdadera?`,opts:[`{${b}} ∈ B`,`${b} ∈ B`,"|B| = 4",`{${c}} ∈ B`],hint:"Haz la lista de los elementos de B, separados por las comas de primer nivel.",
   explain:`Los elementos de B son ${a}, {${b}} y {${c}, ${d}}: |B| = 3. Por eso {${b}} ∈ B, pero ${b} ∉ B y {${c}} ∉ B.`}}],
C2:[
 R=>{const v=R.i(0,3);
  if(v===0){const a=R.i(-5,1),b=R.i(a+1,a+5),sa=R.f()<.5,sb=R.f()<.5,lo=sa?a+1:a,hi=sb?b-1:b;
   return setItem({q:`Escribe por extensión el conjunto ${M(`{x ∈ ℤ : ${fmt(a)} ${sa?"&lt;":"≤"} x ${sb?"&lt;":"≤"} ${fmt(b)}}`)}.`,hint:"&lt; deja fuera el extremo; ≤ lo incluye.",explain:`Son los enteros desde ${fmt(lo)} hasta ${fmt(hi)}: ${setT(range(lo,hi))}.`},range(lo,hi))}
  if(v===1){const n=R.p([12,18,20,28,30]),D=range(1,n).filter(k=>n%k===0);
   return setItem({q:`Escribe por extensión el conjunto ${M(`{x ∈ ℕ : x es divisor de ${n}}`)}.`,hint:`Busca los números que dividen a ${n} sin residuo, por parejas: 1 · ${n}, 2 · ${n/2}…`,explain:`Divisores de ${n}: ${setT(D)}.`},D)}
  if(v===2){const N=R.p([5,10,17,26]),m=Math.floor(Math.sqrt(N-1)),S=range(-m,m);
   return setItem({q:`Escribe por extensión el conjunto ${M(`{x ∈ ℤ : ${P("x",2)} &lt; ${N}}`)}.`,hint:"No olvides los negativos ni el 0: (−2)² también es 4.",explain:`x² < ${N} se cumple para los enteros de −${m} a ${m}: ${setT(S)}.`},S)}
  const a=R.p([2,3]),b=R.p([-1,1,0]),k=R.i(3,4),S=range(0,k).map(n=>a*n+b);
  return setItem({q:`Escribe por extensión el conjunto ${M(`{${a}n ${b<0?"− 1":b>0?"+ 1":""} : n ∈ ℤ, 0 ≤ n ≤ ${k}}`.replace("n  :","n :"))}.`,hint:`Sustituye n = 0, 1, …, ${k} en la fórmula.`,explain:`Con n = 0, 1, …, ${k}: ${setT(S)}.`},S)},
 R=>{const t=R.i(0,3);let ext,opts,why;
  if(t===0){const n=R.p([4,5,6]);ext=setT(range(1,n).map(k=>k*k));opts=[`{n² : n ∈ ℕ, n ≤ ${n}}`,`{n² : n ∈ ℕ, n ≤ ${n*n}}`,`{2n : n ∈ ℕ, n ≤ ${n}}`,`{x ∈ ℕ : x ≤ ${n*n}}`];why=`son los cuadrados de 1 a ${n}`}
  else if(t===1){const k=R.p([3,4,5,6,7]);ext=setT([k,2*k,3*k,4*k]);opts=[`{x ∈ ℕ : x es múltiplo de ${k} y x ≤ ${4*k}}`,`{x ∈ ℕ : x es múltiplo de ${k} y x &lt; ${4*k}}`,`{x ∈ ℕ : x es divisor de ${4*k}}`,`{${k} + n : n ∈ ℕ, n ≤ 4}`];why=`son los múltiplos de ${k} hasta ${4*k}, incluido`}
  else if(t===2){const n=R.p([4,5,6]);ext=setT(range(1,n).map(k=>2*k-1));opts=[`{2n − 1 : n ∈ ℕ, n ≤ ${n}}`,`{2n + 1 : n ∈ ℕ, n ≤ ${n}}`,`{2n − 1 : n ∈ ℕ, n ≤ ${2*n-1}}`,`{x ∈ ℕ : x es impar y x &lt; ${2*n-1}}`];why=`son los ${n} primeros impares`}
  else{const m=R.p([2,3]);ext=setT(range(-m,m));opts=[`{x ∈ ℤ : |x| ≤ ${m}}`,`{x ∈ ℤ : |x| &lt; ${m}}`,`{x ∈ ℕ : x ≤ ${m}}`,`{x ∈ ℤ : x² &lt; ${m}}`];why=`son los enteros cuyo valor absoluto no pasa de ${m}`}
  return{type:"choice",q:`¿Qué descripción por comprensión corresponde al conjunto ${M(ext)}?`,opts:opts.map(M),hint:"Prueba cada descripción: calcula sus elementos y compara con la lista. Fíjate en los extremos.",explain:`La correcta es ${opts[0]}: ${why}. Las demás dan otros conjuntos.`}},
 R=>{const N=R.p([10,17,26]),m=Math.floor(Math.sqrt(N-1));const pool=R.sh([{t:"0",bin:0},{t:fmt(m),bin:0},{t:fmt(-m),bin:0},{t:fmt(m-1),bin:0},{t:fmt(m+1),bin:1},{t:fmt(-m-1),bin:1},{t:"1/2",bin:1},{t:fmt(N),bin:1}]);
  const items=[...pool.filter(p=>p.bin===0).slice(0,3),...pool.filter(p=>p.bin===1).slice(0,3)];
  return{type:"bins",q:`Sea ${M(`A = {x ∈ ℤ : ${P("x",2)} &lt; ${N}}`)}. Arrastra cada número a su grupo.`,bins:["Pertenece a A","No pertenece a A"],items,hint:"Comprueba dos cosas: que sea entero y que su cuadrado sea menor que "+N+".",
   explain:`A = ${setT(range(-m,m))}. ${fmt(m+1)}² = ${(m+1)*(m+1)} ya no es menor que ${N}, y 1/2 no es entero.`}},
 R=>{if(R.f()<.5){const a=R.i(-9,-1),b=R.i(1,9);return{type:"fill",kind:"num",answer:b-a+1,q:`¿Cuántos elementos tiene ${M(`{x ∈ ℤ : ${fmt(a)} ≤ x ≤ ${b}}`)}?`,hint:"Cuenta los negativos, el cero y los positivos; o calcula b − a + 1.",explain:`Hay ${-a} negativos, el 0 y ${b} positivos: ${b} − (${fmt(a)}) + 1 = ${b-a+1}.`}}
  const k=R.p([3,4,6,7]),N=R.i(40,90);return{type:"fill",kind:"num",answer:Math.floor(N/k),q:`¿Cuántos elementos tiene ${M(`{x ∈ ℕ : x es múltiplo de ${k} y x ≤ ${N}}`)}?`,hint:`Los múltiplos son ${k} · 1, ${k} · 2, … ¿Hasta qué número llega el factor sin pasarse de ${N}?`,
   explain:`${k} · ${Math.floor(N/k)} = ${k*Math.floor(N/k)} ≤ ${N}, pero ${k} · ${Math.floor(N/k)+1} = ${k*(Math.floor(N/k)+1)} se pasa: hay ${Math.floor(N/k)}.`}},
 R=>{const cand=[];for(let a=-3;a<=2;a++)for(let b=a+1;b<=a+4;b++)for(const sa of [0,1])for(const sb of [0,1]){const lo=a+sa,hi=b-sb;if(hi<lo)continue;cand.push({t:`{x ∈ ℤ : ${fmt(a)} ${sa?"<":"≤"} x ${sb?"<":"≤"} ${fmt(b)}}`,s:setT(range(lo,hi))})}
  const pick=[];for(const c of R.sh(cand)){if(pick.length<3&&!pick.some(p=>p.s===c.s))pick.push(c)}
  const extra=R.sh(cand).filter(c=>!pick.some(p=>p.s===c.s||p.t===c.t)).filter((c,i,arr)=>arr.findIndex(x=>x.t===c.t)===i).slice(0,2).map(c=>c.t);
  return{type:"match",q:"Arrastra a cada conjunto escrito por extensión su descripción por comprensión. Sobran dos fichas.",pairs:pick.map(p=>[p.s,p.t]),extra,hint:"Fíjate en los extremos: < deja fuera el número y ≤ lo incluye.",
   explain:pick.map(p=>`${p.t} = ${p.s}`).join("; ")+"."}}],
C3:[
 R=>{const [a,b,c,d,x,y]=R.sh(range(1,12));const A=[a,b,c,d];
  const pool=[{t:setT([a,c]),bin:0},{t:"∅",bin:0},{t:`{${d}, ${b}, ${c}, ${a}}`,bin:0},{t:setT([b,c,d]),bin:0},{t:setT([a,x]),bin:1},{t:`{${y}}`,bin:1},{t:`{{${a}}}`,bin:1},{t:setT([a,b,c,d,x]),bin:1}];
  const items=[...R.sh(pool.filter(p=>p.bin===0)).slice(0,3),...R.sh(pool.filter(p=>p.bin===1)).slice(0,3)];
  return{type:"bins",q:`Sea ${M("A = "+setT(A))}. ¿Cuáles de estos conjuntos son subconjuntos de A?`,bins:["Es subconjunto de A","No es subconjunto de A"],items,hint:"Revisa elemento por elemento: todos deben estar en A. El vacío y el propio A siempre son subconjuntos.",
   explain:`∅ y A son subconjuntos de A. {{${a}}} no lo es: su único elemento es el conjunto {${a}}, que no es un elemento de A.`}},
 R=>{const [a,b,c]=R.sh(range(1,9)),A=setT([a,b,c]);
  return{type:"choice",q:`Sea ${M("A = "+A)}. ¿Cuál afirmación es verdadera?`,opts:[`{${a}} ⊆ A`,`{${a}} ∈ A`,`A ⊆ ${setT([a,b])}`,"∅ ∈ A"],hint:"∈ relaciona un elemento con un conjunto; ⊆ relaciona dos conjuntos.",
   explain:`{${a}} ⊆ A porque su único elemento, ${a}, está en A. {${a}} ∈ A es falsa: los elementos de A son números. A no cabe en ${setT([a,b])} porque ${c} no está allí. ∅ ⊆ A, pero ∅ ∉ A.`}},
 R=>{const n=R.i(3,6),L="abcdef".slice(0,n).split(""),v=R.f()<.35;
  return v?{type:"fill",kind:"num",answer:Math.pow(2,n-1),q:`¿Cuántos subconjuntos de ${M(`{${L.join(", ")}}`)} contienen al elemento a?`,hint:"El elemento a está fijo; los demás pueden estar o no estar.",explain:`Quedan ${n-1} elementos libres, cada uno con dos opciones: ${P(2,n-1)} = ${Math.pow(2,n-1)}.`}
   :{type:"fill",kind:"num",answer:Math.pow(2,n),q:`¿Cuántos subconjuntos tiene ${M(`{${L.join(", ")}}`)}? Cuenta también ∅ y el conjunto completo.`,hint:"Cada elemento puede estar o no estar en el subconjunto: 2 opciones por elemento.",explain:`${n} elementos, 2 opciones cada uno: ${P(2,n)} = ${Math.pow(2,n)}.`}},
 R=>{const [p,q]=R.p([["los múltiplos de 4","los números pares"],["los cuadrados","los rectángulos"],["los números naturales","los números enteros"],["las personas nacidas en Medellín","las personas nacidas en Colombia"],["los números enteros","los números racionales"],["los múltiplos de 10","los múltiplos de 5"]]);
  const K=[["PinQ","P dentro de Q"],["QinP","Q dentro de P"],["over","P y Q se cruzan"],["sep","P y Q separados"]];
  return{type:"choice",show:"P dentro de Q",q:`P es el conjunto de ${p} y Q el de ${q}. ¿Qué diagrama representa la relación entre P y Q?`,opts:K.map(([k,a])=>miniVenn(k,a)),hint:`¿Todo elemento de P está en Q? ¿Y al revés?`,
   explain:`Todo elemento de P está en Q, pero no al revés: P ⊆ Q, así que el círculo de P va dentro del de Q.`}},
 R=>{const t=R.i(0,3);let ch;
  if(t===0){const k=R.p([2,3,5]);ch=[`múltiplos de ${8*k}`,`múltiplos de ${4*k}`,`múltiplos de ${2*k}`,`múltiplos de ${k}`]}
  else if(t===1){const k=R.p([2,3]);ch=[`divisores de ${k}`,`divisores de ${2*k}`,`divisores de ${4*k}`,`divisores de ${12*k}`]}
  else if(t===2)ch=["ℕ","ℤ","ℚ","ℝ"];else ch=["cuadrados","rectángulos","paralelogramos","cuadriláteros"];
  return{type:"order",noEval:true,sep:"  ⊆  ",q:"Ordena estos conjuntos de modo que cada uno quede incluido en el siguiente.",items:R.sh(ch),correct:ch,hint:t===0?"Un múltiplo de 8 es también múltiplo de 4: los múltiplos de números más grandes forman conjuntos más pequeños.":t===1?"Si a divide a b, todo divisor de a es divisor de b.":"Empieza por el conjunto más pequeño.",
   explain:`${ch.join(" ⊆ ")}: cada conjunto está contenido en el siguiente.`}}],
C4:[
 R=>{const U=range(1,10),A=R.sh(U).slice(0,R.i(4,5)),B=R.sh(U).slice(0,R.i(3,5)),op=R.i(0,3);
  const res=op===0?[...A,...B]:op===1?A.filter(x=>B.includes(x)):op===2?A.filter(x=>!B.includes(x)):U.filter(x=>!A.includes(x));const nm=["A ∪ B","A ∩ B","A − B","Aᶜ"][op];
  return setItem({q:`U = {1, 2, …, 10}, ${M("A = "+setT(A))} y ${M("B = "+setT(B))}. Escribe por extensión ${M(nm)}.`,hint:["Junta los elementos de los dos conjuntos, sin repetir.","Busca los elementos que están en los dos.","Quita de A los elementos que también están en B.","Son los elementos de U que no están en A."][op],
   explain:`${nm} = ${setT(res)}.`},res)},
 R=>{const three=R.f()<.5,G=RG[three?3:2],A=G.A,B=G.B,C=G.C,U=G.U;
  const L=three?[["(A ∩ B) ∪ C",rU(rI(A,B),C)],["A ∩ (B ∪ C)",rI(A,rU(B,C))],["A − (B ∪ C)",rD(A,rU(B,C))],["(A ∪ B) ∩ C",rI(rU(A,B),C)],["A ∩ B ∩ C",rI(rI(A,B),C)],["(A ∩ B) − C",rD(rI(A,B),C)],["(A ∪ C) − B",rD(rU(A,C),B)]]
   :[["A ∪ B",rU(A,B)],["A ∩ B",rI(A,B)],["A − B",rD(A,B)],["B − A",rD(B,A)],["Aᶜ",rD(U,A)],["(A ∪ B)ᶜ",rD(U,rU(A,B))],["(A ∩ B)ᶜ",rD(U,rI(A,B))]];
  const [e,ans]=R.p(L);
  return{type:"venn",sets:three?3:2,answer:ans,show:ans.map(r=>vennName(r,["A","B","C"].slice(0,three?3:2))).join(" · "),q:`Sombrea en el diagrama el conjunto ${M(e)}.`,hint:three?"Resuelve primero el paréntesis y después la otra operación, región por región.":"Recuerda: ∪ es «o», ∩ es «y», − es «pero no» y ᶜ es «fuera de».",
   explain:`${e} está formado por las regiones: ${ans.map(r=>vennName(r,["A","B","C"].slice(0,three?3:2)).toLowerCase()).join("; ")}.`}},
 R=>{const G=RG[2],A=G.A,B=G.B,U=G.U;const L=[["A ∪ B",rU(A,B)],["A ∩ B",rI(A,B)],["A − B",rD(A,B)],["B − A",rD(B,A)],["Aᶜ",rD(U,A)],["Bᶜ",rD(U,B)],["(A ∪ B)ᶜ",rD(U,rU(A,B))],["(A ∩ B)ᶜ",rD(U,rI(A,B))],["(A − B) ∪ (B − A)",rU(rD(A,B),rD(B,A))]];
  const sh=R.sh(L),right=sh[0],others=[];for(const x of sh.slice(1))if(others.length<3&&!sameR(x[1],right[1])&&!others.some(o=>sameR(o[1],x[1])))others.push(x);
  return{type:"choice",q:"¿Qué conjunto está sombreado en el diagrama?",fig:vennSVG({n:2,shade:right[1],color:"var(--l-con)",uid:"cq"+right[0].replace(/[^A-Za-z]/g,""),w:340,aria:"Diagrama con regiones sombreadas"}),opts:[right[0],...others.map(o=>o[0])].map(M),
   hint:"Mira qué regiones están sombreadas: ¿solo en A? ¿en los dos? ¿fuera de todo?",explain:`Las regiones sombreadas son: ${right[1].map(r=>vennName(r,["A","B"]).toLowerCase()).join("; ")}. Eso es ${right[0]}.`}},
 R=>{const [p,q,lp,lq]=R.p([[2,3,"pares","múltiplos de 3"],[2,5,"pares","múltiplos de 5"],[3,4,"múltiplos de 3","múltiplos de 4"]]),U=range(1,R.p([15,20]));
  const bin=n=>n%p===0&&n%q===0?1:n%p===0?0:n%q===0?2:3,byB=[0,1,2,3].map(b=>R.sh(U.filter(n=>bin(n)===b)));
  const items=[];byB.forEach(l=>{if(l.length)items.push(l[0])});R.sh(U.filter(n=>!items.includes(n))).slice(0,7-items.length).forEach(n=>items.push(n));
  return{type:"bins",q:`En U = {1, 2, …, ${U.length}}, A es el conjunto de los ${lp} y B el de los ${lq}. Arrastra cada número a su región.`,bins:["Solo en A","En A y en B","Solo en B","Fuera de A y de B"],items:items.map(n=>({t:String(n),bin:bin(n)})),
   hint:`Para cada número pregunta dos cosas: ¿es múltiplo de ${p}? ¿Es múltiplo de ${q}?`,explain:`Están en A y en B los múltiplos de ${p} y de ${q} a la vez, es decir, los de ${lcm(p,q)}. Los que no son ni lo uno ni lo otro quedan fuera.`}},
 R=>{let A,B;do{A=R.sh(range(1,9)).slice(0,R.i(4,5));B=R.sh(range(1,9)).slice(0,R.i(3,4))}while(A.filter(x=>B.includes(x)).length<1||B.every(x=>A.includes(x))||A.every(x=>B.includes(x)));
  const r={u:setT([...A,...B]),i:setT(A.filter(x=>B.includes(x))),d:setT(A.filter(x=>!B.includes(x))),e:setT(B.filter(x=>!A.includes(x)))};
  const pairs=[["A ∪ B",r.u],["A ∩ B",r.i],["A − B",r.d],["B − A",r.e]];
  if(new Set(pairs.map(p=>p[1])).size<4)return RETO.C4[4](R);
  const extra=[setT([...A.filter(x=>!B.includes(x)),...B.filter(x=>!A.includes(x))]),setT(A),"∅"].filter((t,i,a)=>a.indexOf(t)===i&&!pairs.some(p=>p[1]===t)).slice(0,2);
  return{type:"match",q:`Sean ${M("A = "+setT(A))} y ${M("B = "+setT(B))}. Arrastra a cada operación su resultado. Sobran fichas.`,pairs,extra,hint:"Unión: en alguno. Intersección: en los dos. A − B: en A pero no en B.",
   explain:pairs.map(p=>`${p[0]} = ${p[1]}`).join("; ")+"."}}],
C5:[
 R=>{const N=R.i(30,45),x=R.i(4,10),a=R.i(x+4,x+16),b=R.i(x+3,Math.min(x+14,N-(a-x)-1));const [ta,tb]=R.p([["fútbol","baloncesto"],["café","té"],["inglés","francés"],["bicicleta","patineta"]]);
  return{type:"fill",kind:"num",answer:a+b-x,q:`En un grupo de ${N} personas, ${a} prefieren ${ta}, ${b} prefieren ${tb} y ${x} los prefieren los dos. ¿Cuántas personas prefieren al menos uno de los dos?`,hint:`Si sumas ${a} + ${b}, cuentas dos veces a las ${x} que están en los dos grupos.`,
   explain:`|A ∪ B| = ${a} + ${b} − ${x} = ${a+b-x}.`}},
 R=>{const x=R.i(3,9),sa=R.i(4,14),sb=R.i(3,12),k=R.i(2,8),N=sa+sb+x+k,a=sa+x,b=sb+x;
  return{type:"fill",kind:"num",answer:x,q:`En una encuesta a ${N} estudiantes, ${a} usan bus, ${b} usan metro y ${k} no usan ninguno de los dos. ¿Cuántos usan los dos?`,hint:`Los que usan al menos uno son ${N} − ${k}. Usa |A ∪ B| = |A| + |B| − |A ∩ B| y despeja.`,
   explain:`Usan al menos uno: ${N} − ${k} = ${N-k}. Entonces ${N-k} = ${a} + ${b} − |A ∩ B|, así que |A ∩ B| = ${a+b} − ${N-k} = ${x}.`}},
 R=>{const [p,q]=R.p([[2,3],[2,5],[3,5],[3,4],[4,6],[2,7]]),N=R.i(30,100),l=lcm(p,q),ans=Math.floor(N/p)+Math.floor(N/q)-Math.floor(N/l);
  return{type:"fill",kind:"num",answer:ans,q:`¿Cuántos números del 1 al ${N} son múltiplos de ${p} o de ${q}?`,hint:`Cuenta los múltiplos de ${p}, los de ${q}, y resta los que están en los dos grupos: los múltiplos de ${l}.`,
   explain:`Múltiplos de ${p}: ${Math.floor(N/p)}. De ${q}: ${Math.floor(N/q)}. De los dos (múltiplos de ${l}): ${Math.floor(N/l)}. Total: ${Math.floor(N/p)} + ${Math.floor(N/q)} − ${Math.floor(N/l)} = ${ans}.`}},
 R=>{const g={a:R.i(2,9),b:R.i(2,9),c:R.i(2,9),ab:R.i(1,5),ac:R.i(1,5),bc:R.i(1,5),abc:R.i(1,4)};const A=g.a+g.ab+g.ac+g.abc,B=g.b+g.ab+g.bc+g.abc,C=g.c+g.ac+g.bc+g.abc,AB=g.ab+g.abc,AC=g.ac+g.abc,BC=g.bc+g.abc,T=Object.values(g).reduce((s,v)=>s+v,0);
  return{type:"fill",kind:"num",answer:T,q:`En un club, ${A} personas nadan (A), ${B} corren (B) y ${C} montan en bicicleta (C). ${AB} nadan y corren, ${AC} nadan y montan en bicicleta, ${BC} corren y montan en bicicleta, y ${g.abc} hacen las tres cosas. ¿Cuántas personas hacen al menos una actividad?`,
   hint:"|A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|.",explain:`${A} + ${B} + ${C} − ${AB} − ${AC} − ${BC} + ${g.abc} = ${T}.`}},
 R=>{const x=R.i(3,9),a=x+R.i(4,10),b=x+R.i(3,9),k=R.i(2,9),N=a+b-x+k,lo=Math.max(0,a+b-N),hi=Math.min(a,b);const st=x+3<=hi?x+3:lo;
  return{type:"slider",name:"|A ∩ B|",min:lo,max:hi,start:st===x?hi:st,answer:x,show:`|A ∩ B| = ${x}`,label:v=>String(v),
   q:`En un grupo de ${N} personas, ${a} están en A y ${b} están en B. Ajusta cuántas están en los dos para que haya exactamente ${k} personas fuera de A y de B.`,hint:`Fuera quedan ${N} − |A ∪ B|, y |A ∪ B| = ${a} + ${b} − |A ∩ B|.`,
   why:v=>`Con |A ∩ B| = ${v}, |A ∪ B| = ${a+b-v} y fuera quedan ${N-(a+b-v)}.`,explain:`Se necesita |A ∪ B| = ${N} − ${k} = ${N-k}. Entonces ${a} + ${b} − |A ∩ B| = ${N-k}, y |A ∩ B| = ${x}.`,
   render:(v,ok)=>vennSVG({n:2,texts:{a:String(a-v),ab:String(v),b:String(b-v),o:ok?String(k):"?"},shade:ok?["o"]:[],color:"var(--ok)",uid:"c5s"+v+(ok?"k":""),w:400,aria:"Diagrama con las cantidades de cada región"})+`<p class="m" style="text-align:center;margin:4px 0 0">Total: ${N}  ·  |A| = ${a}  ·  |B| = ${b}</p>`}}]
});

Object.assign(RECAP,{
C1:{map:[0,1,1,2,0],pts:[
  {s:"Pertenencia",t:"x ∈ A si x es uno de los elementos de A; un conjunto puede ser elemento de otro.",ex:"{2} ∈ {1, {2}}, pero 2 ∉ {1, {2}}"},
  {s:"Sin orden ni repeticiones",t:"El orden y las repeticiones no cambian un conjunto.",ex:"{1, 1, 2} = {2, 1}"},
  {s:"Cardinal",t:"|A| es el número de elementos distintos; |∅| = 0 y |{∅}| = 1.",ex:"|{C, A, S, A}| = 3"}]},
C2:{map:[0,1,2,3,1],pts:[
  {s:"Por extensión",t:"Listar todos los elementos, sin olvidar el 0, los negativos ni los extremos.",ex:"{x ∈ ℤ : −2 ≤ x < 1} = {−2, −1, 0}"},
  {s:"Por comprensión",t:"Una propiedad que cumplen exactamente los elementos del conjunto.",ex:"{1, 4, 9} = {n² : n ∈ ℕ, n ≤ 3}"},
  {s:"Pertenencia por comprensión",t:"Un objeto pertenece si es del conjunto de referencia y cumple la propiedad.",ex:"1/2 ∉ {x ∈ ℤ : x² < 10}"},
  {s:"Contar elementos",t:"De a hasta b, ambos incluidos, hay b − a + 1 enteros.",ex:"De −3 a 4: 8 enteros"}]},
C3:{map:[0,1,2,0,3],pts:[
  {s:"Subconjuntos",t:"B ⊆ A si todo elemento de B está en A; ∅ y A siempre lo son.",ex:"{1, 3} ⊆ {1, 2, 3, 4}"},
  {s:"∈ frente a ⊆",t:"∈ relaciona un elemento con un conjunto; ⊆, dos conjuntos.",ex:"2 ∈ A y {2} ⊆ A"},
  {s:"Número de subconjuntos",t:"Con n elementos hay 2ⁿ subconjuntos.",ex:"{a, b, c} tiene 8"},
  {s:"Cadenas de inclusión",t:"Las inclusiones se encadenan.",ex:"múltiplos de 12 ⊆ múltiplos de 6 ⊆ múltiplos de 3"}]},
C4:{map:[0,1,1,2,0],pts:[
  {s:"Calcular operaciones",t:"Unión: en alguno. Intersección: en los dos. Diferencia: en el primero y no en el segundo. Complemento: fuera.",ex:"{1, 2, 3} − {2, 5} = {1, 3}"},
  {s:"Leer y sombrear diagramas",t:"Cada operación corresponde a un grupo de regiones del diagrama de Venn.",ex:"A − B: solo la parte de A que no toca a B"},
  {s:"Ubicar elementos",t:"Cada elemento va a una sola región según a qué conjuntos pertenece.",ex:"6 es par y múltiplo de 3: va en A ∩ B"}]},
C5:{map:[0,1,1,2,0],pts:[
  {s:"Unión de dos conjuntos",t:"|A ∪ B| = |A| + |B| − |A ∩ B|; también sirve para despejar la intersección.",ex:"25 + 18 − 10 = 33"},
  {s:"Contar múltiplos",t:"Múltiplos de p o de q: se restan los múltiplos del mínimo común múltiplo.",ex:"Del 1 al 30: 15 + 10 − 5 = 20"},
  {s:"Tres conjuntos",t:"Se restan las intersecciones de dos en dos y se suma la de los tres.",ex:"|A ∪ B ∪ C| = … + |A ∩ B ∩ C|"}]}
});

Object.assign(EXPLORE,{
cElem(host){let word="MATEMATICAS",ord=null;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="cw">Palabra</label><input type="text" id="cw" value="${word}" maxlength="24" autocomplete="off" style="font-family:var(--f-mono);text-transform:uppercase"><button class="btn sm" id="cmix">Desordenar el conjunto</button>
   <label for="cl">¿Pertenece la letra…?</label><input type="text" id="cl" maxlength="1" value="E" autocomplete="off" style="width:3em;font-family:var(--f-mono);text-transform:uppercase"></div>
   <div class="elgrid" id="cletters" aria-label="Letras de la palabra"></div><div class="readout" id="crr1"></div></div>`;
  const norm=s=>s.normalize("NFD").replace(/[̀-ͯ]/g,"").toUpperCase().replace(/[^A-ZÑ]/g,"");
  const draw=()=>{const w=norm(word),L=[...new Set(w)],seen=new Set();const show=ord&&ord.length===L.length&&ord.every(c=>L.includes(c))?ord:L;
    $("#cletters",host).innerHTML=[...w].map(c=>{const rep=seen.has(c);seen.add(c);return`<button type="button" class="${rep?"out":""}" aria-pressed="${!rep}" title="${rep?"Repetida: ya está en el conjunto":"Nuevo elemento"}" tabindex="-1">${c}</button>`}).join("")||"<span class='muted'>Escribe una palabra.</span>";
    const l=norm($("#cl",host).value).slice(0,1);
    $("#crr1",host).innerHTML=`<span class="k">Conjunto</span><span class="setbox">L = ${show.length?"{"+show.join(", ")+"}":"∅"}</span><br><span class="k">Cardinal</span>|L| = ${show.length}${w.length>show.length?` (la palabra tiene ${w.length} letras, pero ${w.length-show.length} se repiten)`:""}`+
      (l?`<br><span class="k">Pertenencia</span>${l} ${L.includes(l)?"∈":"∉"} L`:"")+(ord?`<br><span class="k">Orden</span>cambiar el orden no cambia el conjunto: sigue siendo el mismo L`:"")};
  $("#cw",host).oninput=e=>{word=e.target.value;ord=null;draw()};$("#cl",host).oninput=draw;
  $("#cmix",host).onclick=()=>{const L=[...new Set(norm(word))];ord=L.slice().sort(()=>Math.random()-.5);draw()};draw()},

cComp(host){const PROPS={none:["",()=>true],par:["x es par",x=>x%2===0],impar:["x es impar",x=>Math.abs(x%2)===1],m3:["x es múltiplo de 3",x=>x%3===0],m5:["x es múltiplo de 5",x=>x%5===0],primo:["x es primo",isPrime],cuad:["x es un cuadrado perfecto",x=>x>=0&&Number.isInteger(Math.sqrt(x))]};
  let pr="par",lo=-4,hi=10,slo=false,shi=true,why="";
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="cp">Propiedad</label><select id="cp">${Object.entries(PROPS).map(([k,v])=>`<option value="${k}" ${k===pr?"selected":""}>${k==="none"?"(ninguna)":v[0]}</option>`).join("")}</select>
   <label for="clo">Desde <output class="m" id="cloo"></output></label><input type="range" id="clo" min="-10" max="20" value="${lo}"><button class="btn sm" id="cslo"></button>
   <label for="chi">Hasta <output class="m" id="chio"></output></label><input type="range" id="chi" min="-10" max="20" value="${hi}"><button class="btn sm" id="cshi"></button></div>
   <div class="elgrid" id="cnums"></div><div class="readout" id="crr2"></div></div>`;
  const inS=x=>(slo?x>lo:x>=lo)&&(shi?x<hi:x<=hi)&&PROPS[pr][1](x);
  const draw=()=>{const S=range(-10,20).filter(inS),cond=[`${fmt(lo)} ${slo?"&lt;":"≤"} x ${shi?"&lt;":"≤"} ${fmt(hi)}`,PROPS[pr][0]].filter(Boolean).join(" y ");
    $("#cnums",host).innerHTML=range(-10,20).map(x=>`<button type="button" data-x="${x}" aria-pressed="${inS(x)}" class="${inS(x)?"":"out"}">${fmt(x)}</button>`).join("");
    $$("#cnums button",host).forEach(b=>b.onclick=()=>{const x=+b.dataset.x,okR=(slo?x>lo:x>=lo)&&(shi?x<hi:x<=hi),okP=PROPS[pr][1](x);
      why=`${fmt(x)} ${okR&&okP?"∈":"∉"} A: ${!okR?`no cumple ${fmt(lo)} ${slo?"&lt;":"≤"} x ${shi?"&lt;":"≤"} ${fmt(hi)}`:!okP?`no cumple «${PROPS[pr][0]}»`:"cumple todas las condiciones"}.`;draw()});
    $("#cloo",host).textContent=fmt(lo);$("#chio",host).textContent=fmt(hi);$("#cslo",host).textContent=slo?"< (sin incluir)":"≤ (incluido)";$("#cshi",host).textContent=shi?"< (sin incluir)":"≤ (incluido)";
    $("#crr2",host).innerHTML=`<span class="k">Por comprensión</span>A = {x ∈ ℤ : ${cond}}<br><span class="k">Por extensión</span>A = ${setT(S)}<br><span class="k">Cardinal</span>|A| = ${S.length}`+(why?`<br><span class="k">¿Por qué?</span>${why}`:"")};
  $("#cp",host).onchange=e=>{pr=e.target.value;why="";draw()};$("#clo",host).oninput=e=>{lo=+e.target.value;why="";draw()};$("#chi",host).oninput=e=>{hi=+e.target.value;why="";draw()};
  $("#cslo",host).onclick=()=>{slo=!slo;why="";draw()};$("#cshi",host).onclick=()=>{shi=!shi;why="";draw()};draw()},

cSub(host){let n=3,B=new Set(["a"]);const L="abcde";
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="cn">Elementos de A: <output class="m" id="cno"></output></label><input type="range" id="cn" min="1" max="5" value="${n}"><span class="muted">Toca los elementos para formar B:</span><span class="elgrid" id="cel" style="margin:0"></span></div>
   <div id="csubs"></div><div class="readout" id="crr3"></div></div>`;
  const key=s=>[...s].sort().join("");
  const draw=()=>{const A=L.slice(0,n).split("");[...B].forEach(x=>{if(!A.includes(x))B.delete(x)});
    $("#cel",host).innerHTML=A.map(x=>`<button type="button" data-e="${x}" aria-pressed="${B.has(x)}">${x}</button>`).join("");
    $$("#cel button",host).forEach(b=>b.onclick=()=>{const e=b.dataset.e;B.has(e)?B.delete(e):B.add(e);draw()});
    const subs=[];for(let m=0;m<1<<n;m++)subs.push(A.filter((_,i)=>m>>i&1));const kb=key(B);
    $("#csubs",host).innerHTML=range(0,n).map(sz=>`<p class="muted" style="margin:8px 0 2px">Con ${sz} ${sz===1?"elemento":"elementos"}:</p><div class="subs">${subs.filter(s=>s.length===sz).map(s=>`<span class="${key(s)===kb?"hl":""}">${s.length?"{"+s.join(", ")+"}":"∅"}</span>`).join("")}</div>`).join("");
    $("#cno",host).textContent=n;
    $("#crr3",host).innerHTML=`<span class="k">A</span>{${A.join(", ")}}<br><span class="k">B</span>${B.size?"{"+[...B].sort().join(", ")+"}":"∅"} ⊆ A${B.size===0?" (el vacío es subconjunto de todo conjunto)":B.size===n?" (todo conjunto es subconjunto de sí mismo)":""}<br><span class="k">Subconjuntos de A</span>${subs.length} = ${Array(n).fill("2").join(" · ")}${n>1?" = "+P(2,n):""}: cada elemento puede estar o no estar`};
  $("#cn",host).oninput=e=>{n=+e.target.value;draw()};draw()},

cVenn(host){const U=range(1,20),PR={par:["los pares",x=>x%2===0],m3:["los múltiplos de 3",x=>x%3===0],primo:["los primos",isPrime],men8:["los menores que 8",x=>x<8],cuad:["los cuadrados perfectos",x=>Number.isInteger(Math.sqrt(x))],d24:["los divisores de 24",x=>24%x===0],m5:["los múltiplos de 5",x=>x%5===0]};
  let pa="par",pb="m3",op="i";const OPS={u:["A ∪ B",["a","ab","b"]],i:["A ∩ B",["ab"]],d:["A − B",["a"]],e:["B − A",["b"]],c:["Aᶜ",["b","o"]],n:["(A ∪ B)ᶜ",["o"]]};
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="cva">A =</label><select id="cva">${Object.entries(PR).map(([k,v])=>`<option value="${k}" ${k===pa?"selected":""}>${v[0]}</option>`).join("")}</select><label for="cvb">B =</label><select id="cvb">${Object.entries(PR).map(([k,v])=>`<option value="${k}" ${k===pb?"selected":""}>${v[0]}</option>`).join("")}</select>
   <span class="seg" role="group" aria-label="Operación">${Object.entries(OPS).map(([k,v])=>`<button class="btn sm" data-o="${k}">${v[0]}</button>`).join("")}</span></div>
   <div class="svgwrap" id="cvsvg"></div><div class="readout" id="crr4"></div></div>`;
  const draw=()=>{const fa=PR[pa][1],fb=PR[pb][1],reg=x=>(fa(x)?"a":"")+(fb(x)?"b":"")||"o",slots=vennSlots(2,24),used={};let extra="";
    U.forEach(x=>{const r=reg(x),k=used[r]=(used[r]||0);used[r]++;const s=slots[r][k];if(s)extra+=`<text x="${s[0]}" y="${s[1]+5}" text-anchor="middle" style="font:700 14px var(--f-mono);fill:${OPS[op][1].includes(r)?"var(--ink)":"var(--muted)"}">${x}</text>`});
    $("#cvsvg",host).innerHTML=vennSVG({n:2,shade:OPS[op][1],color:"var(--l-con)",uid:"cvx",extra,w:520,aria:"Diagrama de Venn con los números del 1 al 20"});
    $$("[data-o]",host).forEach(b=>b.setAttribute("aria-current",b.dataset.o===op?"page":"false"));
    const res=U.filter(x=>OPS[op][1].includes(reg(x)));
    $("#crr4",host).innerHTML=`<span class="k">A</span>${PR[pa][0]}: ${setT(U.filter(fa))}<br><span class="k">B</span>${PR[pb][0]}: ${setT(U.filter(fb))}<br><span class="k">${OPS[op][0]}</span>${setT(res)}  ·  ${res.length} ${res.length===1?"elemento":"elementos"}`+(op==="i"&&!res.length?" (A y B son disjuntos)":"")};
  $("#cva",host).onchange=e=>{pa=e.target.value;draw()};$("#cvb",host).onchange=e=>{pb=e.target.value;draw()};$$("[data-o]",host).forEach(b=>b.onclick=()=>{op=b.dataset.o;draw()});draw()},

cConteo(host){let N=40,a=25,b=18,x=10,dbl=false;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="kN">Total |U| = <output class="m" id="kNo"></output></label><input type="range" id="kN" min="10" max="60" value="${N}"><label for="ka">|A| = <output class="m" id="kao"></output></label><input type="range" id="ka" min="0" max="60" value="${a}">
   <label for="kb">|B| = <output class="m" id="kbo"></output></label><input type="range" id="kb" min="0" max="60" value="${b}"><label for="kx">|A ∩ B| = <output class="m" id="kxo"></output></label><input type="range" id="kx" min="0" max="60" value="${x}"><button class="btn sm" id="kd" aria-pressed="false">Sumar sin restar</button></div>
   <div class="svgwrap" id="ksvg"></div><div class="readout" id="krr"></div></div>`;
  const draw=()=>{const bad=x>Math.min(a,b)?"|A ∩ B| no puede ser mayor que |A| ni que |B|.":a+b-x>N?`A ∪ B tendría ${a+b-x} elementos: no caben en un total de ${N}.`:"";
    const T=bad?{a:"?",ab:"?",b:"?",o:"?"}:{a:String(a-x),ab:dbl?`${x} + ${x}`:String(x),b:String(b-x),o:String(N-(a+b-x))};
    $("#ksvg",host).innerHTML=vennSVG({n:2,texts:T,shade:dbl&&!bad?["ab"]:[],color:"var(--bad)",uid:"kc"+(dbl?1:0),w:440,aria:"Diagrama con las cantidades de cada región"});
    ["N","a","b","x"].forEach(k=>$(`#k${k}o`,host).textContent={N,a,b,x}[k]);$("#kd",host).setAttribute("aria-pressed",dbl);
    $("#krr",host).innerHTML=bad?`<span class="k">Imposible</span>${bad}`:`<span class="k">Solo A</span>${a} − ${x} = ${a-x}  ·  <b>Solo B</b> ${b} − ${x} = ${b-x}<br><span class="k">|A| + |B|</span>${a} + ${b} = ${a+b}${x?` (la intersección, ${x}, está contada dos veces)`:""}<br><span class="k">|A ∪ B|</span>${a} + ${b} − ${x} = ${a+b-x}<br><span class="k">Fuera de A y de B</span>${N} − ${a+b-x} = ${N-(a+b-x)}`};
  ["N","a","b","x"].forEach(k=>$(`#k${k}`,host).oninput=e=>{const v=+e.target.value;if(k==="N")N=v;else if(k==="a")a=v;else if(k==="b")b=v;else x=v;draw()});
  $("#kd",host).onclick=()=>{dbl=!dbl;draw()};draw()}
});
