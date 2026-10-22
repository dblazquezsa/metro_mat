"use strict";
/* ============ Línea 3: La recta real · L10 Notación científica ============ */

const SUP10="⁰¹²³⁴⁵⁶⁷⁸⁹";
const supN=n=>(n<0?"⁻":"")+String(Math.abs(n)).replace(/\d/g,d=>SUP10[d]);
/* Un número se guarda como sus cifras significativas (texto sin ceros a la izquierda) y su exponente n: d₁,d₂d₃… × 10ⁿ */
const mant=m=>m[0]+(m.length>1?","+m.slice(1):"");
const sciT=(m,n)=>`${mant(m)} × 10${supN(n)}`;                     // fichas
const sciH=(m,n)=>`${mant(m)} × ${P(10,fmt(n))}`;                  // HTML
function decStr(m,n){let i,f;if(n>=0){const d=m.padEnd(n+1,"0");i=d.slice(0,n+1);f=d.slice(n+1)}else{i="0";f="0".repeat(-n-1)+m}
  i=i.replace(/\B(?=(\d{3})+(?!\d))/g," ");return f?i+","+f:i}
const sciVal=(m,n)=>+(m[0]+"."+m.slice(1))*Math.pow(10,n);
const randM=(R,k)=>{let s=String(R.i(1,9));for(let j=1;j<k;j++)s+=String(j===k-1?R.i(1,9):R.i(0,9));return s};
function sciOf(x,k){if(x===0)return["0",0];let n=Math.floor(Math.log10(Math.abs(x))),a=Math.abs(x)/Math.pow(10,n);
  if(k){a=Math.round(a*Math.pow(10,k-1))/Math.pow(10,k-1);if(a>=10){a=a/10;n++}return[a.toFixed(k-1).replace(".",""),n]}
  return[String(+a.toFixed(10)).replace(".",""),n]}
/* Cifras significativas de un número escrito (texto con coma decimal) */
function sigCount(t){t=t.replace(/[\s−-]/g,"");const dec=t.includes(",");let d=t.replace(",","").replace(/^0+/,"");if(!d)return{n:1,amb:false};
  if(dec)return{n:d.length,amb:false};const z=d.match(/0+$/);return{n:d.replace(/0+$/,"").length,amb:!!z}}

Object.assign(NODES,{
L10:{title:"Notación científica",sub:"Números muy grandes y muy pequeños, su tamaño y su precisión.",
 info:`<p class="lead">La distancia de la Tierra a la Luna es de unos 384 000 km y el tamaño de una bacteria, unos 0,000 002 m. Para escribir y comparar números así se usan las potencias de 10.</p>
 <div class="ex-box"><span class="eyebrow">Notación científica</span><p>Un número está en notación científica si se escribe como ${M(`a × ${P(10,"n")}`)}, con <b>1 ≤ a &lt; 10</b> y n entero. El exponente cuenta cuántos lugares se mueve la coma:</p>
 <p class="calc">384 000 = 3,84 × ${P(10,5)}        0,000 72 = 7,2 × ${P(10,"−4")}</p>
 <p>Si el número es grande, n es positivo; si está entre 0 y 1, n es negativo. 45 × ${P(10,3)} vale lo mismo que 4,5 × ${P(10,4)}, pero solo la segunda está en notación científica, porque 45 no está entre 1 y 10.</p></div>
 <div class="ex-box"><span class="eyebrow">Operar</span><p>Se multiplican las partes decimales y se suman los exponentes; después se reajusta si hace falta:</p>
 <p class="calc">(4 × ${P(10,3)}) · (5 × ${P(10,6)}) = 20 × ${P(10,9)} = 2 × ${P(10,10)}</p>
 <p>Para dividir, se dividen las partes decimales y se restan los exponentes: (8 × ${P(10,6)}) / (2 × ${P(10,"−2")}) = 4 × ${P(10,8)}.</p></div>
 <div class="ex-box"><span class="eyebrow">Orden de magnitud y logaritmo en base 10</span><p>El <b>orden de magnitud</b> de un número es el exponente n de su notación científica: dice, en potencias de 10, de qué tamaño es. La Luna está a una distancia del orden de ${P(10,5)} km; una bacteria mide del orden de ${P(10,"−6")} m.</p>
 <p>El <b>logaritmo en base 10</b> mide justamente eso: log ${P(10,"n")} = n, porque es el exponente al que hay que elevar 10. Para cualquier número positivo, log x está entre n y n + 1:</p>
 <p class="calc">log 384 000 ≈ 5,58  → orden ${P(10,5)}        log 0,000 72 ≈ −3,14  → orden ${P(10,"−4")}</p>
 <p>Ojo con los negativos: −3,14 está entre −4 y −3, así que el exponente es −4, no −3.</p></div>
 <div class="ex-box"><span class="eyebrow">Cifras significativas</span><p>Las cifras significativas son las que informan de la precisión de una medida:</p>
 ${figTable(["Número","Cifras significativas","Por qué"],[["4,52","3","todas las cifras distintas de 0 cuentan"],["4,05","3","los ceros entre cifras cuentan"],["0,0045","2","los ceros de la izquierda solo ubican la coma"],["4,50","3","un cero al final, después de la coma, dice que se midió esa cifra"],["4,50 × 10³","3","en notación científica cuentan todas las cifras de a"]])}
 <p>Para <b>redondear</b> a 2 cifras significativas: 0,004 567 → 0,0046 y 384 400 → 3,8 × ${P(10,5)}. La notación científica evita la duda de los ceros finales: 3800 puede tener 2, 3 o 4 cifras significativas, pero 3,8 × ${P(10,3)} tiene 2.</p></div>
 <div class="callout"><span class="eyebrow">En la calculadora</span><p>Muchas calculadoras muestran 3,84 × ${P(10,5)} como «3.84E5» o «3.84⁰⁵». La E significa «por 10 elevado a».</p></div>`,
 explore:{intro:"Recorre la escala de potencias de 10, del átomo a la galaxia. Después escribe un número en la lupa: verás su notación científica, su orden de magnitud, su logaritmo y cómo queda al redondear.",fn:"lCient"},
 key:"a × 10ⁿ con 1 ≤ a < 10. El exponente n es el orden de magnitud y log x está entre n y n + 1. Cifras significativas: todas salvo los ceros de la izquierda.",
 ojo:"45 × 10³ no está en notación científica (45 ≥ 10), y si log x ≈ −3,14 el exponente es −4, no −3."}
});

Object.assign(RETO,{
L10:[
 R=>{const m=randM(R,R.i(2,3));let n;do{n=R.i(-7,9)}while(Math.abs(n)<2);
  return{type:"choice",q:`¿Cuál es la notación científica de ${M(decStr(m,n))}?`,opts:[sciH(m,n),sciH(m,n+1),sciH(m,-n),`${m.slice(0,2)}${m.length>2?","+m.slice(2):""} × ${P(10,fmt(n-1))}`],hint:"Pon la coma después de la primera cifra distinta de 0 y cuenta cuántos lugares se movió.",
   explain:`${decStr(m,n)} = ${sciH(m,n)}: la coma se mueve ${Math.abs(n)} lugares ${n>0?"a la izquierda, así que el exponente es positivo":"a la derecha, así que el exponente es negativo"}. ${m.slice(0,2)}${m.length>2?","+m.slice(2):""} × ${P(10,fmt(n-1))} vale lo mismo, pero no está en notación científica porque ${m.slice(0,2)} ≥ 10.`}},
 R=>{const v=R.i(0,2);
  if(v===0){const m=randM(R,2),n=-R.i(3,8);return{type:"fill",kind:"num",answer:n,q:`Completa: ${M(`${decStr(m,n)} = ${mant(m)} × ${P(10,"?")}`)}. Escribe el exponente.`,hint:"Cuenta cuántos lugares hay que mover la coma hacia la derecha para que quede una sola cifra distinta de 0 antes de ella.",
    explain:`La coma se mueve ${-n} lugares a la derecha: el exponente es ${fmt(n)}.`}}
  if(v===1){let a,b;do{a=R.i(2,9);b=R.i(2,9)}while(a*b<10||(a*b)%10===0&&false);const p=R.i(-5,8),q=R.i(-5,8),c=a*b;
   return{type:"fill",kind:"num",answer:p+q+1,q:`El resultado de ${M(`(${a} × ${P(10,fmt(p))}) · (${b} × ${P(10,fmt(q))})`)} en notación científica es ${M(`${decs(c/10,2)} × ${P(10,"?")}`)}. ¿Cuál es el exponente?`,
    hint:`${a} · ${b} = ${c}, que es mayor que 10: hay que reajustar.`,explain:`${a} · ${b} = ${c} y ${fmt(p)} + ${fmtP(q)} = ${fmt(p+q)}: ${c} × ${P(10,fmt(p+q))} = ${decs(c/10,2)} × ${P(10,fmt(p+q+1))}.`}}
  const neg=R.f()<.5,n=neg?-R.i(1,6):R.i(1,9),fr=R.i(5,98)/100,L=n+fr;
  return{type:"fill",kind:"num",answer:n,q:`Para un número positivo x, la calculadora da ${M(`log x ≈ ${decs(L,2)}`)}. ¿Cuál es el exponente n de x en notación científica, es decir, su orden de magnitud?`,hint:"log x está entre n y n + 1. Busca el entero que queda justo por debajo de log x.",
   explain:`${decs(L,2)} está entre ${fmt(n)} y ${fmt(n+1)}, así que x ≈ ${decs(Math.pow(10,fr),2)} × ${P(10,fmt(n))}.${neg?` Con negativos hay que fijarse: el entero por debajo de ${decs(L,2)} es ${fmt(n)}.`:""}`}},
 R=>{const used=new Set(),pairs=[];while(pairs.length<4){const m=randM(R,2),n=R.p([-6,-5,-4,-3,-2,3,4,5,6,7]);if(used.has(n))continue;used.add(n);pairs.push([decStr(m,n),sciT(m,n),m,n])}
  const [, ,m0,n0]=pairs[0],[, ,m1,n1]=pairs[1];const extra=[sciT(m0,n0+1),sciT(m1,-n1)].filter(t=>!pairs.some(p=>p[1]===t));
  return{type:"match",q:"Arrastra a cada número su notación científica. Sobran fichas con el exponente equivocado.",pairs:pairs.map(p=>[p[0],p[1]]),extra,hint:"Cuenta los lugares que se mueve la coma y fíjate si el número es mayor o menor que 1.",
   explain:pairs.map(p=>`${p[0]} = ${p[1]}`).join("; ")+"."}},
 R=>{const d=()=>String(R.i(1,9)),T={2:[()=>"0,0"+d()+d(),()=>d()+","+d(),()=>"0,"+d()+"0",()=>d()+",0 × 10"+supN(-R.i(2,5))],3:[()=>d()+","+d()+"0",()=>"0,"+d()+d()+"0",()=>d()+",0"+d(),()=>d()+d()+",0",()=>"0,00"+d()+"0"+d()],
   4:[()=>"0,00"+d()+"0"+d()+"0",()=>d()+"0,"+d()+"0",()=>d()+",00"+d(),()=>d()+","+d()+d()+"0 × 10"+supN(R.i(2,8))]};
  const items=[];[2,3,4].forEach((k,b)=>{const fs=R.sh(T[k]);let c=0;for(const f of fs){if(c>=2)break;const t=f();if(!items.some(x=>x.t===t)){items.push({t,bin:b});c++}}});
  return{type:"bins",q:"Clasifica cada número según sus cifras significativas.",bins:["2 cifras","3 cifras","4 cifras"],items,hint:"Los ceros de la izquierda no cuentan; los que van entre cifras y los finales después de la coma, sí.",
   explain:"Cuentan todas las cifras desde la primera distinta de 0, incluidos los ceros intermedios y los ceros finales escritos después de la coma. En notación científica, cuentan las cifras de la parte decimal."}},
 R=>{const vals=[];let tries=0;while(vals.length<5&&tries++<100){const m=randM(R,2),n=R.i(-6,6),v=sciVal(m,n);if(vals.some(x=>Math.abs(x.v/v-1)<1e-9))continue;
   if(vals.length&&R.f()<.5){const o=vals[vals.length-1];const m2=String(R.i(Math.min(9,+o.m[0]+1),9))+R.i(1,9),n2=o.n-1,v2=sciVal(m2,n2);if(!vals.some(x=>Math.abs(x.v/v2-1)<1e-9)){vals.push({m:m2,n:n2,v:v2});continue}}vals.push({m,n,v})}
  const s=vals.slice().sort((a,b)=>a.v-b.v);
  return{type:"order",noEval:true,q:"Ordena estas cantidades de menor a mayor.",items:R.sh(vals.map(x=>sciT(x.m,x.n))),correct:s.map(x=>sciT(x.m,x.n)),hint:"Compara primero los exponentes: decide el tamaño. Solo si son iguales, compara la parte decimal. Recuerda que 10⁻⁵ es menor que 10⁻².",
   explain:`Primero manda el exponente: ${s.map(x=>sciT(x.m,x.n)).join(" < ")}.`}}]
});

Object.assign(RECAP,{
L10:{map:[0,1,0,3,2],pts:[
  {s:"Escribir en notación científica",t:"a × 10ⁿ con 1 ≤ a < 10; n cuenta los lugares que se mueve la coma.",ex:"0,000 72 = 7,2 × 10⁻⁴"},
  {s:"Operar y orden de magnitud",t:"Se multiplican las partes decimales, se suman los exponentes y se reajusta. log x está entre n y n + 1.",ex:"20 × 10⁹ = 2 × 10¹⁰; log 0,0045 ≈ −2,35 → 10⁻³"},
  {s:"Comparar tamaños",t:"Manda el exponente; la parte decimal solo desempata.",ex:"9 × 10⁻⁴ < 2 × 10⁻³"},
  {s:"Cifras significativas",t:"Cuentan todas salvo los ceros de la izquierda.",ex:"0,0450 tiene 3"}]}
});

Object.assign(EXPLORE,{
lCient(host){const OB=[[-10,"el tamaño de un átomo"],[-9,"una molécula de ADN (su grosor)"],[-8,"un virus pequeño"],[-7,"un virus grande"],[-6,"una bacteria"],[-5,"una célula humana"],[-4,"el grosor de un cabello"],[-3,"un grano de arena"],[-2,"una hormiga"],[-1,"un ratón"],[0,"una persona (en metros)"],[1,"una ballena"],[2,"un edificio de 30 pisos"],[3,"el cerro Nutibara y sus alrededores"],[4,"el valle de Aburrá"],[5,"la distancia de Medellín a Bogotá"],[6,"la longitud de Colombia"],[7,"el diámetro de la Tierra"],[8,"la distancia de la Tierra a la Luna"],[9,"el diámetro del Sol"],[10,"la órbita de la Luna alrededor del Sol, vista desde lejos"],[11,"la distancia de la Tierra al Sol"],[12,"la distancia del Sol a Júpiter"],[13,"el borde del sistema solar"],[16,"un año luz"],[17,"la distancia a la estrella más cercana"],[21,"el tamaño de la Vía Láctea"]];
  let e=0,txt="384000",k=3;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ce">Potencia de 10: <output class="m" id="ceo"></output></label><input type="range" id="ce" min="-10" max="21" value="0"></div>
   <div class="svgwrap" id="cesvg"></div><div class="readout" id="cer"></div>
   <div class="ctrl" style="margin-top:14px"><label for="cx">Lupa: escribe un número</label><input type="text" id="cx" value="${txt}" autocomplete="off" style="font-family:var(--f-mono);width:12em" inputmode="decimal">
    <span class="seg" role="group" aria-label="Cifras significativas">${[1,2,3,4].map(c=>`<button class="btn sm" data-k="${c}">${c} ${c===1?"cifra":"cifras"}</button>`).join("")}</span></div><div class="readout" id="cxr"></div></div>`;
  const drawE=()=>{const ob=OB.reduce((b,o)=>Math.abs(o[0]-e)<Math.abs(b[0]-e)?o:b),X=v=>30+(v+10)/31*580;let g=`<line x1="20" y1="50" x2="620" y2="50" stroke="var(--rule)" stroke-width="3"/>`;
    for(let v=-10;v<=21;v++)g+=`<line x1="${X(v)}" y1="${v%5===0?40:45}" x2="${X(v)}" y2="${v%5===0?60:55}" stroke="var(--muted)" stroke-width="${v===0?2.5:1.2}"/>`+(v%5===0?`<text x="${X(v)}" y="80" text-anchor="middle" style="font:12px var(--f-mono);fill:var(--muted)">10${supN(v)}</text>`:"");
    OB.forEach(o=>g+=`<circle cx="${X(o[0])}" cy="50" r="3.5" fill="var(--l-rec)"/>`);
    g+=`<circle cx="${X(e)}" cy="50" r="10" fill="var(--l-rec)" stroke="var(--surface)" stroke-width="3"/><text x="${X(e)}" y="26" text-anchor="middle" style="font:700 14px var(--f-mono);fill:var(--l-rec)">10${supN(e)} m</text>`;
    $("#cesvg",host).innerHTML=`<svg viewBox="0 0 640 92" role="img" aria-label="Escala de potencias de 10">${g}</svg>`;$("#ceo",host).textContent="10"+supN(e);
    $("#cer",host).innerHTML=`<span class="k">Tamaño</span>10${supN(e)} m = ${e>=0?decStr("1",e):decStr("1",e)} m<br><span class="k">Del orden de</span>${ob[1]}${ob[0]!==e?` (que es del orden de 10${supN(ob[0])} m)`:""}<br><span class="k">Logaritmo</span>log 10${supN(e)} = ${fmt(e)}: el logaritmo en base 10 cuenta el exponente${e>0?`<br><span class="k">Comparación</span>es 10${supN(e)} veces un metro: cada paso de la escala multiplica por 10`:e<0?`<br><span class="k">Comparación</span>caben 10${supN(-e)} en un metro`:""}`};
  const drawX=()=>{const r=$("#cxr",host),t=txt.trim();const x=parseFloat(t.replace(/\s/g,"").replace(/\.(?=\d{3}(\D|$))/g,"").replace(",","."));
    if(!t||!isFinite(x)||x===0){r.innerHTML=`<span class="k">Lupa</span>escribe un número distinto de 0, con coma decimal: 384000, 0,00072, 6,02`;return}
    const [m,n]=sciOf(x),[mk,nk]=sciOf(x,k),sc=sigCount(t),neg=x<0;
    $$("[data-k]",host).forEach(b=>b.setAttribute("aria-pressed",+b.dataset.k===k));
    r.innerHTML=`<span class="k">Notación científica</span>${neg?"−":""}${sciH(m.slice(0,10),n)}<br><span class="k">Orden de magnitud</span>10<sup>${fmt(n)}</sup><br><span class="k">Logaritmo</span>log ${decStr(m.slice(0,6),n)} ≈ ${decs(Math.log10(Math.abs(x)),3)}, que está entre ${fmt(n)} y ${fmt(n+1)}${neg?" (para un negativo se mira su valor absoluto)":""}<br><span class="k">Cifras significativas</span>${sc.n}${sc.amb?" o más: los ceros finales de un número sin coma son ambiguos":""}<br><span class="k">Redondeado a ${k} ${k===1?"cifra":"cifras"}</span>${neg?"−":""}${sciH(mk,nk)} = ${neg?"−":""}${decStr(mk,nk)}`};
  $("#ce",host).oninput=ev=>{e=+ev.target.value;drawE()};$("#cx",host).oninput=ev=>{txt=ev.target.value;drawX()};$$("[data-k]",host).forEach(b=>b.onclick=()=>{k=+b.dataset.k;drawX()});
  drawE();drawX()}
});
