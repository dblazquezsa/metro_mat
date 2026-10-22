"use strict";
/* ============ Línea: Álgebra básica (A1–A5) ============
   Expresiones con cantidades Variables: de los patrones a las fórmulas, potencias,
   productos notables vistos como áreas, factorización y fracciones algebraicas. */

/* palillos: figura n de una tira de celdas que comparten un lado */
const STICK_KINDS={cuadrados:{a:3,lab:"cuadrados"},casas:{a:4,lab:"casitas"},hexagonos:{a:5,lab:"hexágonos"}};
function stickSVG(kind,n,s=30){const L=[];const seg=(x1,y1,x2,y2)=>L.push([x1,y1,x2,y2]);let H=s;
  for(let i=0;i<n;i++){const x=i*s;
    if(kind==="cuadrados"){if(!i)seg(x,0,x,s);seg(x,0,x+s,0);seg(x,s,x+s,s);seg(x+s,0,x+s,s);H=s}
    else if(kind==="casas"){const r=s*.6;if(!i)seg(x,r,x,r+s);seg(x,r+s,x+s,r+s);seg(x+s,r,x+s,r+s);seg(x,r,x+s/2,0);seg(x+s/2,0,x+s,r);H=r+s}
    else{const t=s*.29,h=s*.58;if(!i)seg(x,t,x,t+h);seg(x,t,x+s/2,0);seg(x+s/2,0,x+s,t);seg(x+s,t,x+s,t+h);seg(x+s,t+h,x+s/2,2*t+h);seg(x+s/2,2*t+h,x,t+h);H=2*t+h}}
  const sh=.12*s;
  return`<svg viewBox="-5 -5 ${n*s+10} ${H+10}" style="height:${(H+10)*1.4}px;width:auto;max-width:100%" aria-hidden="true">${L.map(([x1,y1,x2,y2])=>{const ax=x1+(x2-x1)*sh/s,ay=y1+(y2-y1)*sh/s,bx=x2-(x2-x1)*sh/s,by=y2-(y2-y1)*sh/s;
    return`<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="var(--av-sol)" stroke-width="4.5" stroke-linecap="round"/><circle cx="${bx}" cy="${by}" r="3" fill="var(--av-coral)"/>`}).join("")}</svg>`}
const figSticks=(kind,ns=[1,2,3])=>`<div class="sticks">${ns.map(n=>`<figure>${stickSVG(kind,n,26)}<figcaption>Figura ${n}</figcaption></figure>`).join("")}</div>`;
const AL=R=>R.p(["x","x","a","m","y"]);
const sgA=n=>(n<0?" − ":" + ")+Math.abs(n);         // para mostrar
const sgT=n=>(n<0?"-":"+")+Math.abs(n);              // para la respuesta que lee el corrector

Object.assign(NODES,{
A1:{title:"Fórmulas y patrones",sub:"Una fórmula cuenta todos los casos a la vez.",
 info:`<p class="lead">Muchas situaciones siguen un patrón. Una <b>fórmula</b> con una cantidad Variable lo describe de una vez para todos los casos.</p>
 <div class="ex-box"><span class="eyebrow">Cuadrados con palillos</span>${figSticks("cuadrados")}
 <p>Las figuras usan 4, 7 y 10 palillos. Cada cuadrado nuevo añade 3 palillos, porque comparte un lado con el anterior.</p>
 <p>Si n es el número de cuadrados: el primer palillo de la izquierda, más 3 por cada cuadrado. La figura n usa <b>3n + 1</b> palillos.</p></div>
 <p>Con la fórmula se responden preguntas sin dibujar: la figura 50 usa 3 · 50 + 1 = 151 palillos.</p>
 <div class="ex-box"><span class="eyebrow">Contar de otra forma</span><p>También se puede pensar: el primer cuadrado usa 4 palillos y cada uno de los otros n − 1 añade 3. Sale 4 + 3(n − 1). Si desarrollas, da 4 + 3n − 3 = 3n + 1: las dos fórmulas son <b>equivalentes</b>.</p></div>
 <p>Y se puede ir hacia atrás: si una figura usa 61 palillos, 3n + 1 = 61, así que 3n = 60 y n = 20.</p>
 <div class="callout"><span class="eyebrow">La pista de la diferencia</span><p>Si de un término al siguiente siempre se suma lo mismo, ese número multiplica a n en la fórmula. En 4, 7, 10, 13… se suma 3: la fórmula empieza por 3n.</p></div>`,
 explore:{intro:"Elige un tipo de figura y ve aumentando n. Cuenta los palillos y mira cómo crece la tabla.",fn:"aPatron"},
 key:"Una fórmula como 3n + 1 describe todas las figuras a la vez. Lo que se suma en cada paso multiplica a n. Dos formas distintas de contar dan fórmulas equivalentes.",
 ojo:"El número que se suma en cada paso no es el primer término: en 4, 7, 10… se suma 3, y la fórmula es 3n + 1, no 4n."},

A2:{title:"Potencias",sub:"Multiplicar un número por sí mismo, y sus reglas.",
 info:`<p class="lead">Una <b>potencia</b> abrevia una multiplicación repetida: ${P(2,5)} = 2 · 2 · 2 · 2 · 2 = 32. El 2 es la <b>base</b> y el 5, el <b>exponente</b>.</p>
 <div class="ex-box"><span class="eyebrow">Reglas de los exponentes</span>
 <p class="calc">${P("x",3)} · ${P("x",4)} = ${P("x",7)}    ${P("(x³)","2")} = ${P("x",6)}    ${P("x",5)} : ${P("x",2)} = ${P("x",3)}</p>
 <p>Se entienden contando factores: ${P("x",3)} · ${P("x",4)} son 3 + 4 = 7 factores x.</p></div>
 <div class="ex-box"><span class="eyebrow">Exponente cero y negativo</span><p>Al bajar el exponente de uno en uno, se divide entre la base: ${P(2,3)} = 8, ${P(2,2)} = 4, ${P(2,1)} = 2, ${P(2,0)} = 1, ${P(2,"−1")} = ${F(1,2)}, ${P(2,"−2")} = ${F(1,4)}.</p>
 <p>Por eso ${P("a",0)} = 1 y ${P("a","−n")} = ${FQ(1,P("a","n"))}.</p></div>
 <div class="callout"><span class="eyebrow">El paréntesis manda</span><p>${P("(−3)",2)} = (−3) · (−3) = 9, pero −${P(3,2)} = −(3 · 3) = −9: sin paréntesis, el exponente solo afecta al 3.</p>
 <p>Y ${P("(a + b)",2)} no es ${P("a",2)} + ${P("b",2)}: ${P("(3 + 4)",2)} = 49, mientras que ${P(3,2)} + ${P(4,2)} = 25.</p></div>`,
 explore:{intro:"Recorre la tabla de potencias de una base: cada vez que bajas un escalón, divides entre la base. Así aparecen el exponente cero y los negativos.",fn:"aPotencias"},
 key:"Una potencia es una multiplicación repetida. Al multiplicar se suman los exponentes y al elevar una potencia se multiplican. a⁰ = 1 y a⁻ⁿ = 1/aⁿ.",
 ojo:"−3² = −9, pero (−3)² = 9. Y (a + b)² no es a² + b²."},

A3:{title:"Productos notables",sub:"Fórmulas que se ven como áreas.",
 info:`<p class="lead">Algunas multiplicaciones aparecen tanto que conviene reconocerlas a simple vista. Se llaman <b>productos notables</b>.</p>
 <div class="ex-box"><span class="eyebrow">Cuadrado de una suma</span>
 <p class="calc">${P("(a + b)",2)} = ${P("a",2)} + 2ab + ${P("b",2)}</p>
 <p>Un cuadrado de lado a + b se parte en un cuadrado ${P("a",2)}, un cuadrado ${P("b",2)} y <b>dos rectángulos</b> ab. Esos dos rectángulos son lo que se olvida cuando se escribe ${P("a",2)} + ${P("b",2)}.</p></div>
 <div class="ex-box"><span class="eyebrow">Cuadrado de una diferencia</span><p class="calc">${P("(a − b)",2)} = ${P("a",2)} − 2ab + ${P("b",2)}</p><p>Ejemplo: ${P("(x − 3)",2)} = ${P("x",2)} − 6x + 9.</p></div>
 <div class="ex-box"><span class="eyebrow">Suma por diferencia</span><p class="calc">(a + b)(a − b) = ${P("a",2)} − ${P("b",2)}</p><p>Los términos de en medio se anulan: ab − ab = 0.</p></div>
 <div class="callout"><span class="eyebrow">Para el cálculo mental</span><p>${P(31,2)} = ${P("(30 + 1)",2)} = 900 + 60 + 1 = 961.  29 · 31 = (30 − 1)(30 + 1) = 900 − 1 = 899.</p></div>`,
 explore:{intro:"Cambia a y b y mira cómo se reparte el área del cuadrado grande. Después cambia al modo suma por diferencia.",fn:"aCuadrado"},
 key:"(a + b)² = a² + 2ab + b², (a − b)² = a² − 2ab + b² y (a + b)(a − b) = a² − b². El término 2ab son los dos rectángulos del dibujo.",
 ojo:"(x + 3)² no es x² + 9: falta el término 6x."},

A4:{title:"Factorización",sub:"Deshacer la multiplicación.",
 info:`<p class="lead"><b>Factorizar</b> es escribir una expresión como una multiplicación. Es el camino inverso de desarrollar.</p>
 <div class="ex-box"><span class="eyebrow">Factor común</span><p class="calc">6x + 15 = 3(2x + 5)    ${P("x",2)} − 7x = x(x − 7)</p><p>Se busca lo que divide a todos los términos y se saca fuera del paréntesis.</p></div>
 <div class="ex-box"><span class="eyebrow">Diferencia de cuadrados</span><p class="calc">${P("x",2)} − 25 = (x + 5)(x − 5)</p><p>Es la suma por diferencia leída al revés.</p></div>
 <div class="ex-box"><span class="eyebrow">Trinomios</span><p class="calc">${P("x",2)} + 7x + 12 = (x + 3)(x + 4)</p><p>Se buscan dos números que <b>sumen</b> 7 y <b>multipliquen</b> 12: el 3 y el 4. Si el trinomio es un cuadrado perfecto, como ${P("x",2)} + 6x + 9, los dos números son iguales: ${P("(x + 3)",2)}.</p></div>
 <div class="callout"><span class="eyebrow">Para comprobar</span><p>Desarrolla lo que obtuviste. Si vuelves a la expresión de partida, la factorización está bien.</p></div>`,
 explore:{intro:"Con fichas de álgebra: un cuadrado x², barras x y unidades. Cambia los números y mira cómo forman un rectángulo cuyos lados son los factores.",fn:"aFactor"},
 key:"Factorizar es escribir como producto: sacar factor común, reconocer una diferencia de cuadrados o buscar dos números que sumen el coeficiente de x y multipliquen el término independiente.",
 ojo:"x² + 9 no es (x + 3)²: el cuadrado de una suma tiene término 6x."},

A5:{title:"Fracciones algebraicas",sub:"Fracciones con cantidades Variables.",
 info:`<p class="lead">Una <b>fracción algebraica</b> tiene cantidades Variables en el numerador o en el denominador. Se trabaja como con las fracciones de números.</p>
 <div class="ex-box"><span class="eyebrow">Simplificar: primero factorizar</span><p class="calc">${FQ(P("x",2)+" − 9","x + 3")} = ${FQ("(x + 3)(x − 3)","x + 3")} = x − 3</p><p>Solo se tachan <b>factores</b> que multiplican a todo el numerador y a todo el denominador.</p></div>
 <div class="callout"><span class="eyebrow">Lo que no se puede tachar</span><p>${FQ("x + 6",6)} no es x + 1: el 6 de arriba es un <b>sumando</b>, no un factor. Lo correcto es ${FQ("x + 6",6)} = ${FQ("x",6)} + 1.</p></div>
 <div class="ex-box"><span class="eyebrow">Valores prohibidos</span><p>El denominador nunca puede valer cero. En ${FQ("x + 1","x − 4")}, x no puede valer 4.</p></div>
 <div class="ex-box"><span class="eyebrow">Sumar</span><p>Como con números: se busca un denominador común.</p><p class="calc">${FQ(3,"x")} + ${FQ(1,"2x")} = ${FQ(6,"2x")} + ${FQ(1,"2x")} = ${FQ(7,"2x")}</p></div>`,
 explore:{intro:"Compara la fracción (x² − k²)/(x − k) con la expresión x + k. Dan lo mismo en todas partes… menos en un punto.",fn:"aFraccion"},
 key:"Para simplificar una fracción algebraica se factoriza y se tachan factores comunes. El denominador no puede ser cero. Para sumar, se busca un denominador común.",
 ojo:"Solo se tachan factores, nunca sumandos: (x + 6)/6 no es x + 1."}
});

/* ---------- retos ---------- */
const pickPat=R=>{if(R.f()<.5){const k=R.p(Object.keys(STICK_KINDS));return{a:STICK_KINDS[k].a,b:1,kind:k}}return{a:R.i(2,7),b:R.i(1,6),kind:null}};
const patIntro=p=>p.kind?`Con palillos se forma esta tira de ${STICK_KINDS[p.kind].lab}.`:`Una sucesión empieza así: ${[1,2,3,4].map(n=>p.a*n+p.b).join(", ")}…`;
const patFig=p=>p.kind?figSticks(p.kind):figTable(["Figura n","1","2","3","4"],[["Cantidad",...[1,2,3,4].map(n=>String(p.a*n+p.b))]]);
Object.assign(RETO,{
A1:[
 R=>{const p=pickPat(R),N=R.p([10,20,25,30,50,100]);
  return{type:"fill",kind:"num",answer:p.a*N+p.b,fig:patFig(p),q:`${patIntro(p)} ¿Cuántos ${p.kind?"palillos":"elementos"} tiene la figura ${N}?`,hint:`En cada paso se suman ${p.a}. Busca la fórmula: ${p.a}n + algo.`,
   explain:`La figura n tiene ${p.a}n + ${p.b}. Para n = ${N}: ${p.a} · ${N} + ${p.b} = ${p.a*N+p.b}.`}},
 R=>{const p=pickPat(R);
  return{type:"fill",kind:"expr",answer:`${p.a}n+${p.b}`,show:`${p.a}n + ${p.b}`,maxTerms:2,fig:patFig(p),q:`${patIntro(p)} Escribe la fórmula de la cantidad de la figura ${M("n")}.`,hint:`De una figura a la siguiente se suman ${p.a}, así que la fórmula empieza por ${p.a}n. ¿Cuánto hay que sumar para que la figura 1 dé ${p.a+p.b}?`,
   explain:`${p.a}n + ${p.b}: para n = 1 da ${p.a+p.b}, para n = 2 da ${2*p.a+p.b}, y cada paso suma ${p.a}.`}},
 R=>{const k=R.p(Object.keys(STICK_KINDS)),a=STICK_KINDS[k].a;
  return{type:"choice",fig:figSticks(k),q:`La figura ${M("n")} usa ${M(`${a}n + 1`)} palillos. ¿Cuál de estas fórmulas también da el número de palillos?`,opts:[M(`${a+1} + ${a}(n − 1)`),M(`${a+1}n`),M(`${a}(n + 1)`),M(`n + ${a+1}`)],
   hint:"Prueba cada fórmula con n = 1 y n = 2.",explain:`${a+1} + ${a}(n − 1) = ${a+1} + ${a}n − ${a} = ${a}n + 1. Cuenta el primer ${STICK_KINDS[k].lab.replace(/s$/,"")} completo (${a+1} palillos) y ${a} más por cada uno de los otros n − 1.`}},
 R=>{const p=pickPat(R),N=R.i(12,60),T=p.a*N+p.b;
  return{type:"fill",kind:"num",answer:N,fig:patFig(p),q:`${patIntro(p)} La figura n tiene ${M(`${p.a}n + ${p.b}`)}. ¿Qué figura tiene ${T}?`,hint:`Resuelve ${p.a}n + ${p.b} = ${T}: primero quita ${p.b} y luego divide entre ${p.a}.`,
   explain:`${p.a}n + ${p.b} = ${T} → ${p.a}n = ${T-p.b} → n = ${N}.`}},
 R=>{const a=R.i(3,6),bs=R.sh([-2,-1,0,1,2,3,4,5].filter(b=>a+b>0)).slice(0,6),fm=b=>b===0?`${a}n`:`${a}n ${b<0?"−":"+"} ${Math.abs(b)}`;
  const pairs=bs.slice(0,4).map(b=>[[1,2,3,4].map(n=>a*n+b).join(", ")+"…",fm(b)]);
  return{type:"match",q:`Las cuatro sucesiones crecen de ${a} en ${a}. Arrastra cada fórmula junto a la suya (n = 1, 2, 3, 4). Sobran dos fichas.`,pairs,extra:bs.slice(4,6).map(fm),hint:"Mira cuánto se suma de un término al siguiente: es el número que multiplica a n. Luego comprueba con n = 1.",
   explain:"Lo que se suma en cada paso multiplica a n; el término independiente se ajusta para que n = 1 dé el primer número."}}],
A2:[
 R=>{const b=R.i(3,9);
  return{type:"choice",q:`¿Cuánto vale ${M("−"+P(b,2))}?`,opts:[M("−"+b*b),M(String(b*b)),M("−"+2*b),M(String(2*b))],hint:`Sin paréntesis, el exponente solo afecta al ${b}.`,
   explain:`−${b}² = −(${b} · ${b}) = −${b*b}. En cambio, (−${b})² = ${b*b}.`}},
 R=>{const b=R.i(2,5),e=R.i(2,b>3?3:4),neg=R.f()<.6,v=Math.pow(neg?-b:b,e);
  return{type:"fill",kind:"num",answer:v,q:`Calcula ${M(neg?P(`(−${b})`,e):P(b,e))}`,hint:neg?`Multiplica (−${b}) por sí mismo ${e} veces. Fíjate en cuántos signos menos hay.`:`Multiplica ${b} por sí mismo ${e} veces.`,
   explain:`${Array(e).fill(neg?`(−${b})`:String(b)).join(" · ")} = ${fmt(v)}${neg?`: ${e%2?"un número impar de factores negativos da negativo":"un número par de factores negativos da positivo"}`:""}.`}},
 R=>{const t=R.p(["mul","pow","div"]),L=AL(R);let a=R.i(2,6),b=R.i(2,5),e,q,ex;
  if(t==="mul"){e=a+b;q=`${P(L,a)} · ${P(L,b)}`;ex=`Se suman los exponentes: ${a} + ${b} = ${e} factores ${L}.`}
  else if(t==="pow"){b=R.i(2,3);e=a*b;q=P(`(${P(L,a)})`,b);ex=`Se multiplican los exponentes: ${b} grupos de ${a} factores son ${e} factores.`}
  else{a=R.i(5,9);b=R.i(2,a-2);e=a-b;q=`${P(L,a)} : ${P(L,b)}`;ex=`Se restan los exponentes: ${a} − ${b} = ${e}; se tachan ${b} factores ${L} arriba y abajo.`}
  return{type:"fill",kind:"expr",answer:`${L}^${e}`,show:`${L}^${e}`,onePow:true,q:`Escribe como una sola potencia: ${M(q)}`,hint:t==="mul"?"Cuenta cuántos factores hay en total.":t==="pow"?"Cuenta cuántos factores hay: son varios grupos iguales.":"Tacha los factores comunes de arriba y de abajo.",explain:`${ex} Resultado: ${P(L,e)}.`}},
 R=>{const b=R.i(2,5),n=R.i(1,b>3?2:3),d=Math.pow(b,n);
  return{type:"fill",kind:"frac",answer:1/d,show:frs(1,d),q:`Calcula ${M(P(b,"−"+n))} y escríbelo como fracción.`,hint:`Un exponente negativo significa «uno dividido entre la potencia positiva».`,explain:`${P(b,"−"+n)} = ${FQ(1,P(b,n))} = ${F(1,d)}.`}},
 R=>{const a=R.i(2,6);let b=R.i(2,6);if(b===a)b=a===6?2:a+1;
  return{type:"choice",q:`¿Cuánto vale ${M(P(`(${a} + ${b})`,2))}?`,opts:[M(String((a+b)**2)),M(String(a*a+b*b)),M(String(2*(a+b)))],hint:"Primero haz la suma de dentro del paréntesis.",
   explain:`(${a} + ${b})² = ${a+b}² = ${(a+b)**2}. Sumar ${a}² + ${b}² = ${a*a+b*b} olvida los dos rectángulos 2 · ${a} · ${b} = ${2*a*b}.`}}],
A3:[
 R=>{const L=AL(R),k=R.i(1,9);
  return{type:"fill",kind:"expr",answer:`${L}^2+${2*k}${L}+${k*k}`,show:`${L}^2 + ${2*k}${L} + ${k*k}`,maxTerms:3,noParens:true,q:`Desarrolla ${M(P(`(${L} + ${k})`,2))}`,hint:`Usa (a + b)² = a² + 2ab + b² con a = ${L} y b = ${k}.`,
   explain:`${P(L,2)} + 2 · ${k} · ${L} + ${k}² = ${P(L,2)} + ${2*k}${L} + ${k*k}.`}},
 R=>{const L=AL(R),k=R.i(1,9);
  return{type:"fill",kind:"expr",answer:`${L}^2-${2*k}${L}+${k*k}`,show:`${L}^2 − ${2*k}${L} + ${k*k}`,maxTerms:3,noParens:true,q:`Desarrolla ${M(P(`(${L} − ${k})`,2))}`,hint:`Usa (a − b)² = a² − 2ab + b². El último término es positivo.`,
   explain:`${P(L,2)} − 2 · ${k} · ${L} + ${k}² = ${P(L,2)} − ${2*k}${L} + ${k*k}.`}},
 R=>{const L=AL(R),k=R.i(1,12),r=R.f()<.5;
  return{type:"fill",kind:"expr",answer:`${L}^2-${k*k}`,show:`${L}^2 − ${k*k}`,maxTerms:2,noParens:true,q:`Desarrolla ${M(r?`(${L} − ${k})(${L} + ${k})`:`(${L} + ${k})(${L} − ${k})`)}`,hint:"Es una suma por diferencia: los términos de en medio se anulan.",
   explain:`(a + b)(a − b) = a² − b²: ${P(L,2)} − ${k*k}. Los productos ${k}${L} y −${k}${L} se anulan.`}},
 R=>{const t=R.i(2,9),T=10*t,v=R.p(["sq+","sq-","pm"]);const val=v==="sq+"?(T+1)**2:v==="sq-"?(T-1)**2:(T-1)*(T+1);
  const q=v==="sq+"?P(T+1,2):v==="sq-"?P(T-1,2):`${T-1} · ${T+1}`;
  return{type:"fill",kind:"num",answer:val,q:`Calcula mentalmente ${M(q)}`,hint:v==="pm"?`Escríbelo como (${T} − 1)(${T} + 1).`:`Escríbelo como (${T} ${v==="sq+"?"+":"−"} 1)².`,
   explain:v==="pm"?`(${T} − 1)(${T} + 1) = ${T*T} − 1 = ${val}.`:`(${T} ${v==="sq+"?"+":"−"} 1)² = ${T*T} ${v==="sq+"?"+":"−"} ${2*T} + 1 = ${val}.`}},
 R=>{const L=AL(R),k=R.i(3,9);
  return{type:"choice",q:`¿Qué término falta para que ${M(`${P(L,2)} + ___ + ${k*k}`)} sea ${M(P(`(${L} + ${k})`,2))}?`,opts:[M(`${2*k}${L}`),M(`${k}${L}`),M(`${k*k}${L}`),M(String(2*k))],hint:"Es el doble del producto de los dos términos.",
   explain:`El término de en medio es 2 · ${L} · ${k} = ${2*k}${L}: son los dos rectángulos de área ${k}${L}.`}}],
A4:[
 R=>{const L=AL(R),k=R.i(2,6);let a=R.i(2,7),b=R.i(1,9);while(gcd(a,b)!==1)b++;const s=R.f()<.5?1:-1;
  return{type:"fill",kind:"expr",factor:true,answer:`${k}(${a}${L}${sgT(s*b)})`,show:`${k}(${a}${L}${sgA(s*b)})`,q:`Factoriza sacando factor común: ${M(`${k*a}${L}${sgA(s*k*b)}`)}`,hint:`Busca el mayor número que divide a ${k*a} y a ${k*b}.`,
   explain:`${k} divide a los dos términos: ${k*a}${L}${sgA(s*k*b)} = ${k}(${a}${L}${sgA(s*b)}). Desarrollando vuelves al principio.`}},
 R=>{const L=AL(R),k=R.i(2,12);
  return{type:"fill",kind:"expr",factor:true,answer:`(${L}+${k})(${L}-${k})`,show:`(${L} + ${k})(${L} − ${k})`,q:`Factoriza ${M(`${P(L,2)} − ${k*k}`)}`,hint:`${k*k} = ${k}². Es una diferencia de cuadrados.`,
   explain:`${P(L,2)} − ${k}² = (${L} + ${k})(${L} − ${k}).`}},
 R=>{const L=AL(R),m=R.i(1,6);let n=R.nz(-7,7);while(n===m||n===-m)n=R.nz(-7,7);const s=m+n,p=m*n;
  return{type:"fill",kind:"expr",factor:true,answer:`(${L}${sgT(m)})(${L}${sgT(n)})`,show:`(${L}${sgA(m)})(${L}${sgA(n)})`,q:`Factoriza ${M(poly([[1,P(L,2)],[s,L],[p,""]]))}`,hint:`Busca dos números que sumen ${fmt(s)} y multipliquen ${fmt(p)}.`,
   explain:`${fmt(m)} + ${fmtP(n)} = ${fmt(s)} y ${fmt(m)} · ${fmtP(n)} = ${fmt(p)}, así que queda (${L}${sgA(m)})(${L}${sgA(n)}).`}},
 R=>{const L=AL(R),k=R.i(2,8);
  return{type:"choice",q:"¿Cuál de estas expresiones es un cuadrado perfecto?",opts:[M(`${P(L,2)} + ${2*k}${L} + ${k*k}`),M(`${P(L,2)} + ${k}${L} + ${k*k}`),M(`${P(L,2)} + ${k*k}`),M(`${P(L,2)} + ${2*k}${L} − ${k*k}`)],hint:`Para ser (${L} + ${k})² necesita el término 2 · ${k} · ${L} y el ${k*k} positivo.`,
   explain:`${P(L,2)} + ${2*k}${L} + ${k*k} = ${P(`(${L} + ${k})`,2)}. ${P(L,2)} + ${k*k} no lo es: le falta el término ${2*k}${L}.`}},
 R=>{const L=AL(R),a=R.nz(-9,9);
  return{type:"fill",kind:"expr",factor:true,answer:`${L}(${L}${sgT(-a)})`,show:`${L}(${L}${sgA(-a)})`,q:`Factoriza ${M(`${P(L,2)}${sgA(-a)}${L}`)}`,hint:`Los dos términos tienen el factor ${L}.`,
   explain:`${P(L,2)}${sgA(-a)}${L} = ${L} · ${L}${sgA(-a)} · ${L} = ${L}(${L}${sgA(-a)}).`}}],
A5:[
 R=>{const L=AL(R),k=R.i(1,9),plus=R.f()<.5;
  return{type:"fill",kind:"expr",noDiv:true,answer:plus?`${L}-${k}`:`${L}+${k}`,show:plus?`${L} − ${k}`:`${L} + ${k}`,maxTerms:2,q:`Simplifica ${FQ(`${P(L,2)} − ${k*k}`,`${L} ${plus?"+":"−"} ${k}`)}`,hint:"Factoriza el numerador como una diferencia de cuadrados.",
   explain:`${FQ(`(${L} + ${k})(${L} − ${k})`,`${L} ${plus?"+":"−"} ${k}`)} = ${L} ${plus?"−":"+"} ${k}, tachando el factor común.`}},
 R=>{const L=AL(R),k=R.i(2,9);
  return{type:"choice",q:`¿Qué se obtiene al simplificar ${FQ(`${L} + ${k}`,k)}?`,opts:[`${FQ(L,k)} + 1. No se puede tachar el ${k}: es un sumando`,M(`${L} + 1`),M(L),`${FQ(L,k)} + ${k}`],hint:`Separa la fracción en dos: ${FQ(L,k)} + ${FQ(k,k)}.`,
   explain:`${FQ(`${L} + ${k}`,k)} = ${FQ(L,k)} + ${FQ(k,k)} = ${FQ(L,k)} + 1. Tachar el ${k} de arriba sería tachar un sumando, y eso no se puede.`}},
 R=>{const L=AL(R),a=R.nz(-6,6),b=R.nz(-6,6),c=R.p([1,1,2,3]);
  const den=c===1?`${L}${sgA(-b)}`:`${c}${L}${sgA(-c*b)}`;
  return{type:"fill",kind:"num",answer:b,q:`¿Qué valor no puede tomar ${M(L)} en ${FQ(`${L}${sgA(a)}`,den)}?`,hint:"Busca el valor que hace cero el denominador.",
   explain:`${den} = 0 cuando ${L} = ${fmt(b)}: el denominador sería cero y la división no tiene sentido.`}},
 R=>{const L=AL(R),k=R.i(2,8),m=R.nz(-9,9);
  return{type:"fill",kind:"expr",noDiv:true,answer:`${L}${sgT(m)}`,show:`${L}${sgA(m)}`,maxTerms:2,q:`Simplifica ${FQ(`${k}${L}${sgA(k*m)}`,k)}`,hint:`Saca factor común ${k} en el numerador.`,
   explain:`${FQ(`${k}(${L}${sgA(m)})`,k)} = ${L}${sgA(m)}.`}},
 R=>{const L=AL(R),a=R.i(1,7),b=R.i(1,7);
  return{type:"choice",q:`¿Cuánto es ${FQ(a,L)} + ${FQ(b,"2"+L)}?`,opts:[FQ(2*a+b,"2"+L),FQ(a+b,"3"+L),FQ(a+b,"2"+L),FQ(a+b,"2"+P(L,2))],hint:`Escribe ${FQ(a,L)} con denominador 2${L}.`,
   explain:`${FQ(a,L)} = ${FQ(2*a,"2"+L)}, así que la suma es ${FQ(`${2*a} + ${b}`,"2"+L)} = ${FQ(2*a+b,"2"+L)}. No se suman los denominadores.`}}]
});

Object.assign(RECAP,{
A1:{map:[1,1,2,3,0],pts:[
  {s:"Lo que se suma en cada paso",t:"Si de un término al siguiente se suma siempre lo mismo, ese número multiplica a n en la fórmula.",ex:"4, 7, 10… → 3n + 1"},
  {s:"La fórmula responde todo",t:"Con la fórmula se calcula cualquier figura sin dibujarla.",ex:"figura 50: 3 · 50 + 1 = 151"},
  {s:"Fórmulas equivalentes",t:"Contar de formas distintas da fórmulas distintas pero equivalentes.",ex:"4 + 3(n − 1) = 3n + 1"},
  {s:"Ir hacia atrás",t:"Si se conoce la cantidad, se resuelve una ecuación para saber qué figura es.",ex:"3n + 1 = 61 → n = 20"}]},
A2:{map:[1,1,2,3,2],pts:[
  {s:"Multiplicación repetida",t:"Una potencia abrevia una multiplicación del mismo factor.",ex:"2⁵ = 2 · 2 · 2 · 2 · 2 = 32"},
  {s:"El paréntesis manda",t:"Sin paréntesis el exponente afecta solo al número; con paréntesis, también al signo.",ex:"−3² = −9; (−3)² = 9"},
  {s:"Reglas de los exponentes",t:"Al multiplicar se suman los exponentes y al elevar se multiplican. Pero (a + b)² no es a² + b².",ex:"x³ · x⁴ = x⁷"},
  {s:"Exponente cero y negativo",t:"Al bajar el exponente se divide entre la base: a⁰ = 1 y a⁻ⁿ = 1/aⁿ.",ex:"2⁻³ = 1/8"}]},
A3:{map:[0,1,2,3,0],pts:[
  {s:"Cuadrado de una suma",t:"(a + b)² = a² + 2ab + b²: el término 2ab son los dos rectángulos del cuadrado.",ex:"(x + 3)² = x² + 6x + 9"},
  {s:"Cuadrado de una diferencia",t:"(a − b)² = a² − 2ab + b², con el último término positivo.",ex:"(x − 4)² = x² − 8x + 16"},
  {s:"Suma por diferencia",t:"(a + b)(a − b) = a² − b²: los términos de en medio se anulan.",ex:"(x + 5)(x − 5) = x² − 25"},
  {s:"Cálculo mental",t:"Los productos notables permiten calcular cuadrados y productos sin papel.",ex:"29 · 31 = 900 − 1 = 899"}]},
A4:{map:[0,1,2,3,0],pts:[
  {s:"Factor común",t:"Se saca fuera del paréntesis lo que divide a todos los términos.",ex:"6x + 15 = 3(2x + 5)"},
  {s:"Diferencia de cuadrados",t:"a² − b² se factoriza como (a + b)(a − b).",ex:"x² − 25 = (x + 5)(x − 5)"},
  {s:"Trinomios",t:"Para x² + sx + p se buscan dos números que sumen s y multipliquen p.",ex:"x² + 7x + 12 = (x + 3)(x + 4)"},
  {s:"Reconocer cuadrados",t:"Un trinomio es un cuadrado perfecto si el término de en medio es el doble producto.",ex:"x² + 6x + 9 = (x + 3)²"}]},
A5:{map:[0,1,2,0,3],pts:[
  {s:"Simplificar factorizando",t:"Primero se factoriza; después se tachan los factores comunes.",ex:"(x² − 9)/(x + 3) = x − 3"},
  {s:"Solo se tachan factores",t:"Un sumando no se puede tachar con el denominador.",ex:"(x + 6)/6 = x/6 + 1"},
  {s:"Valores prohibidos",t:"El denominador no puede valer cero.",ex:"(x + 1)/(x − 4): x ≠ 4"},
  {s:"Sumar con denominador común",t:"Se suman los numeradores cuando los denominadores son iguales; los denominadores no se suman.",ex:"3/x + 1/(2x) = 7/(2x)"}]}
});

/* ---------- exploraciones ---------- */
Object.assign(EXPLORE,{
aPatron(host){let kind="cuadrados",n=3;
  host.innerHTML=`<div class="xp"><div class="ctrl"><span class="seg" role="group" aria-label="Tipo de figura">${Object.entries(STICK_KINDS).map(([k,v])=>`<button class="btn sm" data-k="${k}">${v.lab[0].toUpperCase()+v.lab.slice(1)}</button>`).join("")}</span>
   <label for="pn">Figura n = <output class="m" id="pno">3</output></label><input type="range" id="pn" min="1" max="10" value="3"></div>
   <div class="svgwrap" id="pfig" style="min-height:90px"></div><div id="ptab" style="overflow-x:auto"></div><div class="readout" id="prr"></div></div>`;
  const draw=()=>{const a=STICK_KINDS[kind].a;$("#pfig",host).innerHTML=stickSVG(kind,n,40);$("#pno",host).textContent=n;
    const ns=Array.from({length:Math.max(n,4)},(_,i)=>i+1);
    $("#ptab",host).innerHTML=figTable(["n",...ns.map(String)],[["Palillos",...ns.map(i=>String(a*i+1))],["Diferencia","—",...ns.slice(1).map(()=>"+"+a)]]);
    $$("[data-k]",host).forEach(b=>b.setAttribute("aria-current",b.dataset.k===kind?"page":"false"));
    $("#prr",host).innerHTML=`<span class="k">Contando</span>${n} ${STICK_KINDS[kind].lab}: ${a*n+1} palillos<br><span class="k">Una forma de verlo</span>1 palillo inicial + ${a} por cada figura: ${a} · ${n} + 1 = ${a*n+1}<br><span class="k">Otra forma</span>la primera completa (${a+1}) + ${a} por cada una de las otras ${n-1}: ${a+1} + ${a} · ${n-1} = ${a*n+1}<br><span class="k">Fórmula</span>${a}n + 1  (equivale a ${a+1} + ${a}(n − 1))`};
  $$("[data-k]",host).forEach(b=>b.onclick=()=>{kind=b.dataset.k;draw()});$("#pn",host).oninput=e=>{n=+e.target.value;draw()};draw()},

aPotencias(host){let b=2,neg=false;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="pb">Base: <output class="m" id="pbo">2</output></label><input type="range" id="pb" min="2" max="5" value="2"><button class="btn sm" id="pneg">Usar base negativa</button></div>
   <div class="powlad" id="plad"></div><div class="readout" id="prr2"></div></div>`;
  const draw=()=>{const B=neg?-b:b,bs=neg?`(−${b})`:String(b);let h="";
    for(let e=4;e>=-3;e--){const v=Math.pow(B,e),val=e>=0?fmt(v):(v<0?"−":"")+F(1,Math.abs(1/v));
      h+=`<div class="powrow ${e===0?"zero":""} ${e<0?"negx":""}"><span class="pw">${P(bs,e<0?"−"+(-e):e)}</span><span class="eq">=</span><span class="pv">${val}</span>${e>-3?`<span class="arrow">: ${bs}</span>`:""}</div>`}
    $("#plad",host).innerHTML=h;$("#pbo",host).textContent=b;$("#pneg",host).textContent=neg?"Usar base positiva":"Usar base negativa";
    $("#prr2",host).innerHTML=`<span class="k">El patrón</span>al bajar un escalón el exponente baja 1 y el valor se divide entre ${bs}<br><span class="k">Exponente 0</span>${P(bs,1)} : ${bs} = 1, así que ${P(bs,0)} = 1<br><span class="k">Exponentes negativos</span>${P(bs,"−2")} = ${FQ(1,P(bs,2))} = ${(neg?"":"")+F(1,b*b)}`+
      (neg?`<br><span class="k">El signo</span>con base negativa, los exponentes pares dan positivo y los impares negativo. Compara: ${P(`(−${b})`,2)} = ${b*b}, pero −${P(b,2)} = −${b*b}`:"")};
  $("#pb",host).oninput=e=>{b=+e.target.value;draw()};$("#pneg",host).onclick=()=>{neg=!neg;draw()};draw()},

aCuadrado(host){let a=5,b=2,mode="sum";
  host.innerHTML=`<div class="xp"><div class="ctrl"><span class="seg" role="group" aria-label="Producto"><button class="btn sm" data-m="sum">(a + b)²</button><button class="btn sm" data-m="dif">(a + b)(a − b)</button></span>
   <label for="ca">a: <output class="m" id="cao">5</output></label><input type="range" id="ca" min="2" max="8" value="5"><label for="cb">b: <output class="m" id="cbo">2</output></label><input type="range" id="cb" min="1" max="4" value="2"></div>
   <div class="svgwrap"><svg id="csv" role="img" aria-label="Cuadrado dividido en áreas" style="max-width:520px"></svg></div><div class="readout" id="crr"></div></div>`;
  const u=26,o=30;const rect=(x,y,w,h,f,lab)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" stroke="var(--surface)" stroke-width="2"/>`+(w>24&&h>18?`<text x="${x+w/2}" y="${y+h/2+5}" text-anchor="middle" style="font:700 13px var(--f-mono);fill:var(--ink)">${lab}</text>`:"");
  const draw=()=>{if(mode==="dif"&&b>=a)b=a-1;let s="",W,H;
    if(mode==="sum"){const A=a*u,Bv=b*u;W=o+A+Bv+20;H=o+A+Bv+20;
      s+=rect(o,o,A,A,"color-mix(in srgb,var(--l-alg) 45%,var(--surface))","a²")+rect(o+A,o,Bv,A,"color-mix(in srgb,var(--av-sol) 55%,var(--surface))","ab")+rect(o,o+A,A,Bv,"color-mix(in srgb,var(--av-sol) 55%,var(--surface))","ab")+rect(o+A,o+A,Bv,Bv,"color-mix(in srgb,var(--av-menta) 55%,var(--surface))","b²");
      s+=T_(o+A/2,o-8,`a = ${a}`)+T_(o+A+Bv/2,o-8,`b = ${b}`);
      $("#crr",host).innerHTML=`<span class="k">Lado del cuadrado</span>a + b = ${a+b}, área ${(a+b)**2}<br><span class="k">Las cuatro piezas</span>a² + ab + ab + b² = ${a*a} + ${a*b} + ${a*b} + ${b*b} = ${(a+b)**2}<br><span class="k">Si olvidas los rectángulos</span>a² + b² = ${a*a+b*b}: faltan ${2*a*b}`}
    else{const A=a*u,Bv=b*u,gap=50;W=o+A+gap+(a+b)*u+20;H=o+A+20;
      s+=rect(o,o,A-Bv,A,"color-mix(in srgb,var(--l-alg) 45%,var(--surface))","")+rect(o+A-Bv,o+Bv,Bv,A-Bv,"color-mix(in srgb,var(--av-sol) 55%,var(--surface))","")+`<rect x="${o+A-Bv}" y="${o}" width="${Bv}" height="${Bv}" fill="none" stroke="var(--bad)" stroke-width="2" stroke-dasharray="5 4"/>`;
      s+=T_(o+A/2,o-8,`a² − b² (se quita b²)`);
      const x2=o+A+gap;
      s+=rect(x2,o,A,(a-b)*u,"color-mix(in srgb,var(--l-alg) 45%,var(--surface))","")+rect(x2+A,o,Bv,(a-b)*u,"color-mix(in srgb,var(--av-sol) 55%,var(--surface))","");
      s+=T_(x2+(A+Bv)/2,o-8,`(a + b)(a − b)`)+T_(x2+(A+Bv)/2,o+(a-b)*u+18,`base a + b = ${a+b}`);
      $("#crr",host).innerHTML=`<span class="k">A la izquierda</span>un cuadrado a² = ${a*a} al que se le quita b² = ${b*b}: quedan ${a*a-b*b}<br><span class="k">A la derecha</span>la tira amarilla se mueve a un lado y se forma un rectángulo (a + b) × (a − b) = ${a+b} · ${a-b} = ${(a+b)*(a-b)}<br><span class="k">Por eso</span>(a + b)(a − b) = a² − b²`}
    const sv=$("#csv",host);sv.setAttribute("viewBox",`0 0 ${W} ${H}`);sv.innerHTML=s;$("#cao",host).textContent=a;$("#cbo",host).textContent=b;$("#cb",host).value=b;
    $$("[data-m]",host).forEach(x=>x.setAttribute("aria-current",x.dataset.m===mode?"page":"false"))};
  $$("[data-m]",host).forEach(x=>x.onclick=()=>{mode=x.dataset.m;draw()});$("#ca",host).oninput=e=>{a=+e.target.value;draw()};$("#cb",host).oninput=e=>{b=+e.target.value;draw()};draw()},

aFactor(host){let m=2,n=3,built=true;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="fm">m: <output class="m" id="fmo">2</output></label><input type="range" id="fm" min="0" max="5" value="2"><label for="fn">n: <output class="m" id="fno">3</output></label><input type="range" id="fn" min="1" max="5" value="3"><button class="btn sm primary" id="fbt">Desarmar</button></div>
   <div class="svgwrap"><svg id="fsv" role="img" aria-label="Fichas de álgebra" style="max-width:520px"></svg></div><div class="readout" id="frr"></div></div>`;
  const X=100,u=22,col={x2:"color-mix(in srgb,var(--l-alg) 45%,var(--surface))",x:"color-mix(in srgb,var(--av-sol) 55%,var(--surface))",one:"color-mix(in srgb,var(--av-menta) 60%,var(--surface))"};
  const tile=(x,y,w,h,c,l)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${c}" stroke="var(--ink)" stroke-width="1.2"/>`+(l?`<text x="${x+w/2}" y="${y+h/2+5}" text-anchor="middle" style="font:700 ${w<30||h<30?11:14}px var(--f-mono);fill:var(--ink)">${l}</text>`:"");
  const draw=()=>{let s="",W,H;const o=30;
    if(built){W=o+X+n*u+30;H=o+X+m*u+30;
      s+=tile(o,o,X,X,col.x2,"x²");for(let j=0;j<n;j++)s+=tile(o+X+j*u,o,u,X,col.x,"x");for(let i=0;i<m;i++)s+=tile(o,o+X+i*u,X,u,col.x,"x");
      for(let i=0;i<m;i++)for(let j=0;j<n;j++)s+=tile(o+X+j*u,o+X+i*u,u,u,col.one,"");
      s+=T_(o+(X+n*u)/2,o-10,`x + ${n}`,"700 13px var(--f-mono)")+`<text x="${o-10}" y="${o+(X+m*u)/2}" text-anchor="middle" transform="rotate(-90 ${o-10} ${o+(X+m*u)/2})" style="font:700 13px var(--f-mono);fill:var(--muted)">${m?"x + "+m:"x"}</text>`}
    else{W=520;H=o+X+70;s+=tile(o,o,X,X,col.x2,"x²");let x=o+X+20;for(let i=0;i<m+n;i++){s+=tile(x,o,u,X,col.x,"x");x+=u+6}
      let k=0;for(let i=0;i<m*n;i++){s+=tile(o+(k%14)*(u+6),o+X+20+Math.floor(k/14)*(u+6),u,u,col.one,"");k++}}
    const sv=$("#fsv",host);sv.setAttribute("viewBox",`0 0 ${W} ${H}`);sv.innerHTML=s;$("#fmo",host).textContent=m;$("#fno",host).textContent=n;$("#fbt",host).textContent=built?"Desarmar":"Armar el rectángulo";
    const ex=poly([[1,"x²"],[m+n,"x"],[m*n,""]]);
    $("#frr",host).innerHTML=`<span class="k">Fichas</span>1 cuadrado x², ${m+n} barras x y ${m*n} unidades: ${ex}<br>`+(built?`<span class="k">Rectángulo</span>lados ${m?`x + ${m}`:"x"} y x + ${n}, así que ${ex} = ${m?`(x + ${m})`:"x"}(x + ${n})<br><span class="k">La pista</span>${m?`${m} + ${n} = ${m+n} barras y ${m} · ${n} = ${m*n} unidades`:`sin unidades, x es factor común: x(x + ${n})`}`:`<span class="k">Reto</span>¿cómo colocarías estas fichas para formar un rectángulo? Piensa en dos números que sumen ${m+n} y multipliquen ${m*n}.`)};
  $("#fm",host).oninput=e=>{m=+e.target.value;draw()};$("#fn",host).oninput=e=>{n=+e.target.value;draw()};$("#fbt",host).onclick=()=>{built=!built;draw()};draw()},

aFraccion(host){let k=2,x=1;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="qk">k: <output class="m" id="qko">2</output></label><input type="range" id="qk" min="1" max="4" value="2"><label for="qx">x: <output class="m" id="qxo">1</output></label><input type="range" id="qx" min="-5" max="5" value="1"></div>
   <div class="svgwrap"><svg id="qsv" viewBox="0 0 440 330" role="img" aria-label="Gráfica de la fracción con un punto vacío" style="max-width:440px"></svg></div><div class="readout" id="qrr"></div></div>`;
  const X=v=>220+v*36,Y=v=>250-v*22;
  const draw=()=>{let s=`<line x1="20" y1="${Y(0)}" x2="420" y2="${Y(0)}" stroke="var(--rule)" stroke-width="1.5"/><line x1="${X(0)}" y1="10" x2="${X(0)}" y2="320" stroke="var(--rule)" stroke-width="1.5"/>`;
    for(let v=-5;v<=5;v++)if(v)s+=`<text x="${X(v)}" y="${Y(0)+16}" text-anchor="middle" style="font:10px var(--f-mono);fill:var(--muted)">${fmt(v)}</text>`;
    s+=`<line x1="${X(-5.5)}" y1="${Y(-5.5+k)}" x2="${X(5.5)}" y2="${Y(5.5+k)}" stroke="var(--l-alg)" stroke-width="3"/>`;
    s+=`<circle cx="${X(k)}" cy="${Y(2*k)}" r="6" fill="var(--surface)" stroke="var(--l-alg)" stroke-width="2.5"/>`;
    const at=x===k;s+=`<line x1="${X(x)}" y1="${Y(0)}" x2="${X(x)}" y2="${Y(x+k)}" stroke="var(--muted)" stroke-dasharray="4 3"/>`+(at?"":`<circle cx="${X(x)}" cy="${Y(x+k)}" r="5" fill="var(--av-coral)"/>`);
    $("#qsv",host).innerHTML=s;$("#qko",host).textContent=k;$("#qxo",host).textContent=fmt(x);
    const num=x*x-k*k,den=x-k;
    $("#qrr",host).innerHTML=`<span class="k">La fracción</span>(x² − ${k*k}) / (x − ${k}) con x = ${fmt(x)}: ${fmt(num)} / ${fmtP(den)} = ${at?"<b>no está definida</b> (0 / 0)":fmt(num/den)}<br><span class="k">La expresión simplificada</span>x + ${k} con x = ${fmt(x)}: ${fmt(x+k)}<br><span class="k">Por qué</span>(x² − ${k*k}) / (x − ${k}) = (x + ${k})(x − ${k}) / (x − ${k}) = x + ${k}, pero solo si x ≠ ${k}: en ${k} el denominador vale cero y la gráfica tiene un agujero`};
  $("#qk",host).oninput=e=>{k=+e.target.value;draw()};$("#qx",host).oninput=e=>{x=+e.target.value;draw()};draw()}
});
