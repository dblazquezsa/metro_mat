"use strict";
/* ============ Línea: La recta real (L1–L5) ============
   De los racionales a los reales: decimales periódicos, números que no son fracciones (√2),
   densidad (no existe «el siguiente»), distancia con el valor absoluto e intervalos. */

Object.assign(NODES,{
L1:{title:"Decimales periódicos",sub:"Toda fracción es un decimal finito o periódico.",
 info:`<p class="lead">Al dividir el numerador entre el denominador de una fracción, el decimal o se <b>termina</b> o se <b>repite</b> para siempre. Nunca hace otra cosa.</p>
 <div class="ex-box"><span class="eyebrow">¿Por qué se repite?</span><p>Al dividir entre 6, los restos posibles son 1, 2, 3, 4 y 5. Si alguno es 0, la división termina. Si no, tarde o temprano un resto se repite, y desde ahí todas las cifras se repiten en el mismo orden:</p>
 <p class="calc">${F(1,3)} = 0,333…    ${F(5,6)} = 0,8333…    ${F(1,7)} = 0,142857142857…</p>
 <p>En esta caja escribimos entre paréntesis la parte que se repite (el <b>periodo</b>): 0,(3), 0,8(3), 0,(142857).</p></div>
 <p><b>¿Cuándo termina?</b> Cuando el denominador de la fracción irreducible solo tiene los factores 2 y 5: ${F(3,8)} = 0,375 termina, porque 8 = 2 · 2 · 2; ${F(1,6)} no termina, porque 6 = 2 · 3.</p>
 <div class="ex-box"><span class="eyebrow">Del periódico a la fracción</span><p>Si x = 0,(7), entonces 10x = 7,(7). Al restar, el periodo desaparece:</p>
 <p class="calc">10x − x = 7,(7) − 0,(7) = 7  →  9x = 7  →  x = ${F(7,9)}</p>
 <p>Con dos cifras en el periodo se multiplica por 100: 0,(12) = ${F(12,99)}.</p></div>
 <div class="callout"><span class="eyebrow">Una sorpresa</span><p>0,(9) = 0,999… es exactamente 1. Con el mismo método: 10x − x = 9, así que x = 1. También se ve así: 3 · ${F(1,3)} = 3 · 0,(3) = 0,(9), y 3 · ${F(1,3)} = 1.</p></div>`,
 explore:{intro:"Elige una fracción y sigue la división paso a paso. Mira los restos: en cuanto uno se repite, las cifras empiezan a repetirse.",fn:"lDivision"},
 key:"Toda fracción es un decimal finito o periódico, porque los restos de la división son limitados. Y al revés: todo decimal periódico se puede escribir como fracción.",
 ojo:"Un decimal periódico es un número exacto: 0,(3) es exactamente 1/3, y 0,(9) es exactamente 1."},

L2:{title:"Números irracionales",sub:"Hay números que no son fracciones.",
 info:`<p class="lead">Durante siglos se pensó que cualquier longitud podía medirse con una fracción. No es así: hay números que <b>no son fracciones</b>. Se llaman <b>irracionales</b>.</p>
 <div class="ex-box"><span class="eyebrow">La diagonal del cuadrado</span><p>Un cuadrado de lado 1 tiene una diagonal d. Por el teorema de Pitágoras, d² = 1² + 1² = 2, así que d = √2.</p>
 <p>√2 no se puede escribir como fracción. Si fuera ${FQ("p","q")} irreducible, tendríamos p² = 2q²: p sería par, entonces p² sería múltiplo de 4, y q también sería par. Pero la fracción era irreducible: contradicción.</p></div>
 <p>Su desarrollo decimal nunca termina y nunca se repite: √2 = 1,41421356… Lo mismo pasa con √3, √5, √7… (la raíz de un natural que no es un cuadrado perfecto) y con π.</p>
 <div class="ex-box"><span class="eyebrow">Encerrar a √2</span><p>1,4² = 1,96 es menor que 2 y 1,5² = 2,25 es mayor, así que √2 está entre 1,4 y 1,5. Con 1,41² = 1,9881 y 1,42² = 2,0164, queda entre 1,41 y 1,42. Se puede seguir afinando sin fin.</p></div>
 <p>Racionales e irracionales juntos forman los <b>números reales</b>: todos los puntos de la recta.</p>
 <div class="callout"><span class="eyebrow">Muchos decimales no es lo mismo que irracional</span><p>${F(1,7)} = 0,(142857) tiene un decimal largo, pero es racional: tiene periodo. Lo que define a un irracional es que sus cifras nunca forman un periodo.</p></div>`,
 explore:{intro:"Lleva la diagonal de un rectángulo hasta la recta con un compás, y después encierra el número entre decimales cada vez más cercanos.",fn:"lIrracional"},
 key:"Un número irracional no se puede escribir como fracción: su decimal no termina ni se repite. √2, la diagonal de un cuadrado de lado 1, es el ejemplo clásico. Racionales e irracionales forman los reales.",
 ojo:"Que un decimal sea largo no lo hace irracional. Lo que importa es si tiene periodo."},

L3:{title:"Densidad y orden",sub:"Entre dos números reales siempre hay infinitos más.",
 info:`<p class="lead">En los enteros, después del 3 viene el 4 y no hay nada en medio. En los reales es al revés: <b>entre dos números distintos siempre hay infinitos más</b>.</p>
 <div class="ex-box"><span class="eyebrow">El punto medio</span><p>Entre a y b siempre está su punto medio, ${FQ("a + b",2)}. Entre 1,4 y 1,5 está 1,45; entre 1,4 y 1,45 está 1,425… y se puede seguir sin fin.</p></div>
 <p>Por eso <b>no existe «el siguiente número»</b>. ¿Qué viene después de 1? ¿1,1? ¿1,01? ¿1,001? Siempre hay otro más cerca.</p>
 <div class="ex-box"><span class="eyebrow">Ordenar decimales</span><p>Se comparan cifra a cifra, igualando la cantidad de decimales: 1,405 &lt; 1,45 &lt; 1,5. Con negativos el orden se invierte, como en los enteros: −1,5 &lt; −1,45 &lt; −1,405.</p></div>
 <p>Racionales e irracionales están completamente mezclados: entre 1,41 y 1,42 hay infinitos racionales y también está √2.</p>
 <div class="callout"><span class="eyebrow">Hábito de los enteros</span><p>Con los enteros, entre 2 y 5 hay exactamente dos números. Con los reales, entre 2,1 y 2,2 ya hay infinitos. «Contar lo que hay en medio» deja de tener sentido.</p></div>`,
 explore:{intro:"Acércate a la recta como con una lupa: cada tramo se divide en diez más pequeños, y así sin fin. Persigue a √2 o a 1/3.",fn:"lZoom"},
 key:"Entre dos números reales distintos siempre hay infinitos más; por eso no existe el número siguiente. Los decimales se ordenan cifra a cifra, y con negativos el orden se invierte.",
 ojo:"No busques «el siguiente número» de un real: siempre hay otro más cerca."},

L4:{title:"Valor absoluto",sub:"La distancia al cero, y la distancia entre dos números.",
 info:`<p class="lead">El <b>valor absoluto</b> de un número es su distancia al cero. Como una distancia nunca es negativa, el valor absoluto tampoco.</p>
 <p class="calc">|−5| = 5    |5| = 5    |0| = 0</p>
 <div class="ex-box"><span class="eyebrow">Distancia entre dos números</span><p>La distancia entre a y b es |a − b|. Entre −3 y 4: |−3 − 4| = |−7| = 7. Da lo mismo restar al revés: |4 − (−3)| = 7.</p></div>
 <div class="ex-box"><span class="eyebrow">Ecuaciones con valor absoluto</span><p>|x| = 3 tiene dos soluciones: los números a distancia 3 del cero, x = 3 y x = −3.</p>
 <p>|x − 2| = 5 pide los números a distancia 5 del 2: x = 7 y x = −3.</p></div>
 <div class="callout"><span class="eyebrow">Ojo con la regla «quitar el signo»</span><p>Si x es negativo, |x| = −x. Por ejemplo, si x = −4, |x| = 4 = −(−4). Lo que vimos en «Las caras del menos» sirve aquí: −x no es necesariamente negativo.</p></div>`,
 explore:{intro:"Mueve dos puntos por la recta y mira sus distancias al cero y entre ellos. Después resuelve |x − c| = r mirando la recta.",fn:"lAbs"},
 key:"El valor absoluto es la distancia al cero, y |a − b| es la distancia entre a y b. Una ecuación como |x − c| = r tiene dos soluciones: c + r y c − r.",
 ojo:"|x| no es «x sin el signo» cuando x es una cantidad Variable: si x es negativo, |x| = −x."},

L5:{title:"Intervalos",sub:"Tramos de la recta real, en tres lenguajes.",
 info:`<p class="lead">Un <b>intervalo</b> es un tramo de la recta: todos los números reales entre dos extremos. Se puede escribir de tres formas: con un dibujo, con desigualdades y con corchetes.</p>
 <div class="ex-box"><span class="eyebrow">Extremos incluidos o no</span>${figInterval(-2,3,true,false)}
 <p>[−2, 3) es el conjunto de los x con −2 ≤ x &lt; 3. El <b>corchete</b> y el punto relleno indican que el extremo está incluido; el <b>paréntesis</b> y el punto vacío, que no.</p></div>
 <div class="ex-box"><span class="eyebrow">Intervalos sin fin</span>${figInterval(1,null,false,false)}<p>(1, +∞) son todos los números mayores que 1: x &gt; 1. El símbolo ∞ no es un número, así que siempre va con paréntesis.</p></div>
 <p>El valor absoluto y los intervalos se relacionan: |x| ≤ 3 son los números a distancia 3 o menos del cero, es decir, [−3, 3].</p>
 <div class="callout"><span class="eyebrow">Infinitos números, pocos enteros</span><p>[2, 5] contiene infinitos números reales, pero solo cuatro enteros: 2, 3, 4 y 5.</p></div>`,
 explore:{intro:"Mueve los extremos, decide si están incluidos y mira el mismo intervalo escrito de tres formas. Después prueba qué números pertenecen.",fn:"lIntervalo"},
 key:"Un intervalo se escribe con un dibujo, con desigualdades o con corchetes. El corchete incluye el extremo y el paréntesis lo excluye; el infinito siempre va con paréntesis.",
 ojo:"Revisa cada extremo por separado: un intervalo puede ser cerrado por un lado y abierto por el otro."}
});

/* ---------- retos ---------- */
const factor25=b=>{[,b]=red(1,b);while(b%2===0)b/=2;while(b%5===0)b/=5;return b===1};
Object.assign(RETO,{
L1:[
 R=>{const fin=R.f()<.5,b=fin?R.p([8,16,20,25,40,50]):R.p([3,6,7,9,11,12,15]);const a=cop(R,b);
  return{type:"choice",q:`¿Qué tipo de número decimal es ${F(a,b)}?`,opts:fin?["Un decimal finito","Un decimal periódico","Un número irracional"]:["Un decimal periódico","Un decimal finito","Un número irracional"],
   hint:`Descompón el denominador ${b} en factores primos: ¿tiene factores distintos de 2 y 5?`,
   explain:fin?`${b} solo tiene los factores 2 y 5, así que la división termina: ${F(a,b)} = ${decs(a/b,4)}.`:`${b} tiene factores distintos de 2 y 5, así que la división nunca termina y las cifras se repiten. Toda fracción es racional, nunca irracional.`}},
 R=>{const b=R.p([8,16,20,40,25,32]),a=cop(R,b);
  return{type:"fill",kind:"num",answer:a/b,show:decs(a/b,5),q:`Escribe ${F(a,b)} como número decimal.`,hint:`Divide ${a} entre ${b}. La división termina porque ${b} solo tiene factores 2 y 5.`,explain:`${a} : ${b} = ${decs(a/b,5)}.`}},
 R=>{const two=R.f()<.4;if(!two){const d=R.i(1,8);return{type:"fill",kind:"frac",answer:d/9,show:frs(d,9),q:`Escribe ${M(`0,(${d})`)} = 0,${String(d).repeat(4)}… como fracción.`,
    hint:`Llama x al número y calcula 10x − x: el periodo desaparece.`,explain:`10x − x = ${d},(${d}) − 0,(${d}) = ${d}, así que 9x = ${d} y x = ${F(d,9)}${gcd(d,9)>1?` = ${FR(d,9)}`:""}.`}}
  let ab=R.i(10,98);if(ab%11===0)ab++;const s=String(ab).padStart(2,"0");
  return{type:"fill",kind:"frac",answer:ab/99,show:frs(ab,99),q:`Escribe ${M(`0,(${s})`)} = 0,${s.repeat(3)}… como fracción.`,hint:"El periodo tiene dos cifras: calcula 100x − x.",
   explain:`100x − x = ${ab}, así que 99x = ${ab} y x = ${F(ab,99)}${gcd(ab,99)>1?` = ${FR(ab,99)}`:""}.`}},
 R=>{const v=R.f()<.5;
  return{type:"choice",q:v?`¿Cuánto vale ${M("0,(9) = 0,999…")}?`:`Sabemos que ${F(1,3)} = 0,(3). ¿Cuánto vale ${M("3 · 0,(3)")}?`,opts:v?["Exactamente 1","Un poco menos que 1","0,9","No se puede saber, tiene infinitas cifras"]:["Exactamente 1","0,(9), que es un poco menos que 1","0,9","No se puede calcular"],
   hint:v?"Llama x = 0,(9) y calcula 10x − x.":"3 · 1/3 es 1. ¿Puede dar otra cosa al escribirlo como decimal?",explain:"0,(9) es exactamente 1: con x = 0,(9), 10x − x = 9, así que x = 1. Que tenga infinitas cifras no le impide ser un número exacto."}},
 R=>{const t=R.i(1,8);const vals=[[t/10,decs(t/10)],[11*t/100,decs(11*t/100)],[t/9,`${t}/9`],[(11*t+1)/100,decs((11*t+1)/100)]];
  return{type:"order",q:"Ordena de menor a mayor.",items:R.sh(vals).map(v=>v[1]),correct:vals.map(v=>v[1]),hint:`Escribe ${t}/9 como decimal: 0,${String(t).repeat(4)}…`,
   explain:`${t}/9 = 0,(${t}), que es un poco más que ${decs(11*t/100)} y un poco menos que ${decs((11*t+1)/100)}: ${vals.map(v=>v[1]).join(" < ")}.`}}],
L2:[
 R=>{const n=R.p([2,3,5,6,7,8,10,11,12]);const rats=R.sh([`${M("0,(27)")}`,F(R.i(2,9),R.i(11,13)),`${M("√"+R.p([4,9,16,25,36]))}`,M(decs(R.i(101,199)/100)),M("−"+R.i(2,9))]).slice(0,3);
  return{type:"choice",q:"¿Cuál de estos números es irracional?",opts:[M("√"+n),...rats],hint:"Una raíz cuadrada es irracional cuando el número no es un cuadrado perfecto. Un decimal con periodo es una fracción.",
   explain:`√${n} es irracional: ${n} no es un cuadrado perfecto. Los demás son racionales: fracciones, decimales finitos o periódicos, o raíces exactas como √16 = 4.`}},
 R=>{let n=R.i(2,99);while(Number.isInteger(Math.sqrt(n)))n++;const f=Math.floor(Math.sqrt(n));
  return{type:"fill",kind:"num",answer:f,q:`${M("√"+n)} está entre dos números enteros consecutivos. ¿Cuál es el menor de los dos?`,hint:"Busca el mayor entero cuyo cuadrado no pase de "+n+".",explain:`${f}² = ${f*f} y ${f+1}² = ${(f+1)*(f+1)}. Como ${f*f} < ${n} < ${(f+1)*(f+1)}, √${n} está entre ${f} y ${f+1}.`}},
 R=>{const k=R.i(2,4),d2=1+k*k;
  return{type:"choice",q:`¿Cuánto mide la diagonal de un rectángulo de lados 1 y ${k}?`,opts:[M("√"+d2),M(String(1+k)),M("√"+(1+k)),M(String(d2))],hint:`Por el teorema de Pitágoras, d² = 1² + ${k}².`,
   explain:`d² = 1 + ${k*k} = ${d2}, así que d = √${d2}${Number.isInteger(Math.sqrt(d2))?"":`, un número irracional (≈ ${decs(Math.sqrt(d2),3)})`}.`}},
 R=>{let n=R.i(3,90);while(Number.isInteger(Math.sqrt(n)))n++;const r=Math.round(Math.sqrt(n));
  return{type:"line",q:`Marca en la recta el número entero más cercano a ${M("√"+n)}.`,min:0,max:10,answer:r,hint:"Compara "+n+" con los cuadrados perfectos más cercanos.",
   explain:`√${n} ≈ ${decs(Math.sqrt(n),2)}, así que el entero más cercano es ${r}.`}},
 R=>{const n=R.p([2,3]),ap=n===2?["1,41","141/100"]:["1,73","173/100"];
  return{type:"choice",q:"¿Qué afirmación es verdadera?",opts:[`√${n} no se puede escribir como fracción`,`√${n} = ${ap[0]}`,`√${n} = ${ap[1]}`,`√${n} es un decimal periódico`],hint:`Calcula ${ap[0]}²: ¿da exactamente ${n}?`,
   explain:`${ap[0]}² = ${decs(Math.pow(+ap[0].replace(",","."),2),4)}, no ${n}: es solo una aproximación. √${n} es irracional: no es una fracción y su decimal no tiene periodo.`}}],
L3:[
 R=>{const a=R.i(100,999)/100,b=a+0.01;
  return{type:"fill",kind:"between",lo:a,hi:b,show:decs(a+0.005,3),q:`Escribe un número que esté entre ${M(decs(a))} y ${M(decs(b))}.`,hint:`Añade una cifra más: entre ${decs(a)}0 y ${decs(b)}0 hay muchos números de tres decimales.`,
   explain:`Por ejemplo ${decs(a+0.005,3)}. Hay infinitas respuestas válidas: siempre se puede añadir otra cifra.`}},
 R=>{const p=R.i(-30,30),q=p+2*R.i(1,15)+1;
  return{type:"fill",kind:"num",answer:(p+q)/20,show:decs((p+q)/20,3),q:`¿Cuál es el punto medio entre ${M(decs(p/10))} y ${M(decs(q/10))}?`,hint:"Suma los dos números y divide entre 2.",
   explain:`(${decs(p/10)} + ${decs(q/10)}) : 2 = ${decs((p+q)/10)} : 2 = ${decs((p+q)/20,3)}.`}},
 R=>{const m=R.i(1,4),vals=[-(m+0.5),-(m+0.45),-(m+0.405),-(m+0.4)];
  return{type:"order",q:"Ordena de menor a mayor.",items:R.sh(vals).map(v=>decs(v,3)),correct:vals.map(v=>decs(v,3)),hint:"Con negativos, el que está más lejos del cero es el menor.",
   explain:`${vals.map(v=>decs(v,3)).join(" < ")}. Entre ${decs(m+0.5,3)} y ${decs(m+0.4,3)} el mayor es ${decs(m+0.5,3)}, así que con signo menos es el menor.`}},
 R=>{const n=R.i(1,9);
  return{type:"choice",q:`¿Cuál es el número real que va justo después de ${n}?`,opts:["No existe: siempre hay otro más cerca",`${n},1`,`${n},01`,`${n+1}`],hint:`Si dices ${n},01, ¿hay algún número entre ${n} y ${n},01?`,
   explain:`Entre ${n} y cualquier número mayor siempre está su punto medio. Por eso en los reales no existe «el siguiente».`}},
 R=>{const a=R.i(10,99)/10,b=a+0.1;
  return{type:"choice",q:`¿Cuántos números reales hay entre ${M(decs(a))} y ${M(decs(b))}?`,opts:["Infinitos","Ninguno","Nueve","Uno"],hint:`Piensa en ${decs(a)}5, ${decs(a)}55, ${decs(a)}555…`,
   explain:`Infinitos: entre dos reales distintos siempre se puede encontrar otro, y otro, sin fin.`}}],
L4:[
 R=>{const a=-R.i(2,15),b=R.i(1,15);
  return{type:"fill",kind:"num",answer:Math.abs(a)-Math.abs(b),q:`Calcula ${M(`|${fmt(a)}| − |${b}|`)}`,hint:"Primero calcula cada valor absoluto: la distancia al cero.",explain:`|${fmt(a)}| = ${-a} y |${b}| = ${b}; ${-a} − ${b} = ${fmt(-a-b)}.`}},
 R=>{const a=-R.i(1,9),b=R.i(1,9);
  return{type:"fill",kind:"num",answer:b-a,q:`¿Qué distancia hay entre ${M(fmt(a))} y ${M(String(b))} en la recta?`,hint:"Calcula el valor absoluto de la diferencia.",explain:`|${b} − (${fmt(a)})| = |${b-a}| = ${b-a}: ${-a} hasta el cero y ${b} más.`}},
 R=>{const c=R.nz(-5,5),r=R.i(1,6);
  return{type:"choice",q:`¿Cuáles son las soluciones de ${M(`|x ${c<0?"+":"−"} ${Math.abs(c)}| = ${r}`)}?`,opts:[`x = ${fmt(c+r)} y x = ${fmt(c-r)}`,`Solo x = ${fmt(c+r)}`,`x = ${r} y x = −${r}`,`Solo x = ${fmt(r-c)}`],
   hint:`Son los números que están a distancia ${r} del ${fmt(c)}.`,explain:`A distancia ${r} del ${fmt(c)} están ${fmt(c)} + ${r} = ${fmt(c+r)} y ${fmt(c)} − ${r} = ${fmt(c-r)}.`}},
 R=>{const c=R.i(-4,4),d=R.i(1,6),left=R.f()<.5,ans=left?c-d:c+d;
  return{type:"line",q:`Marca en la recta el número que está a distancia ${d} del ${fmt(c)}, a su ${left?"izquierda":"derecha"}.`,min:-10,max:10,answer:ans,hint:`Cuenta ${d} saltos hacia la ${left?"izquierda":"derecha"} desde ${fmt(c)}.`,explain:`${fmt(c)} ${left?"−":"+"} ${d} = ${fmt(ans)}.`}},
 R=>{const L=R.p(["x","a","t"]);
  return{type:"choice",q:`Si ${M(L)} es un número negativo, ¿a qué es igual ${M(`|${L}|`)}?`,opts:[M("−"+L),M(L),M("0"),"No se puede saber"],hint:`Prueba con ${L} = −4.`,
   explain:`Si ${L} = −4, |${L}| = 4 = −(−4) = −${L}. Cuando ${L} es negativo, −${L} es positivo.`}}],
L5:[
 R=>{let a=R.i(-8,3),b=R.i(a+2,9);const ca=R.f()<.5,cb=R.f()<.5,inf=R.f()<.25;if(inf){b=null}
  const right=ivl(a,b,ca,cb),w=[ivl(a,b,!ca,cb),b==null?`[${fmt(a)}, +∞]`:ivl(a,b,ca,!cb),b==null?`(−∞, ${fmt(a)}${ca?"]":")"}`:ivl(a,b,!ca,!cb)];
  return{type:"choice",fig:figInterval(a,b,ca,cb),q:"¿Qué intervalo está dibujado en la recta?",opts:[right,...w],hint:"Punto relleno: extremo incluido, con corchete. Punto vacío: excluido, con paréntesis. El infinito siempre va con paréntesis.",
   explain:`${right}: ${ca?"el "+fmt(a)+" está incluido":"el "+fmt(a)+" no está incluido"}${b==null?" y el intervalo sigue sin fin hacia la derecha":cb?", y el "+fmt(b)+" también":", y el "+fmt(b)+" no"}.`}},
 R=>{const a=R.i(-9,-4),b=R.i(-2,2),c=R.i(3,6),d=R.i(-7,-1),e=R.i(4,6),f=R.i(7,9);
  return{type:"match",q:"Arrastra cada intervalo junto a su desigualdad.",pairs:[[`${fmt(a)} ≤ x < ${fmt(b)}`,`[${fmt(a)}, ${fmt(b)})`],[`x > ${c}`,`(${c}, +∞)`],[`x ≤ ${fmt(d)}`,`(−∞, ${fmt(d)}]`],[`${e} < x < ${f}`,`(${e}, ${f})`]],
   hint:"≤ y ≥ incluyen el extremo (corchete); < y > lo excluyen (paréntesis).",explain:"Cada desigualdad dice qué extremos se incluyen; los intervalos sin límite llevan ∞ con paréntesis."}},
 R=>{const a=R.i(-6,2),b=R.i(a+2,8),ca=R.f()<.5,cb=R.f()<.5,pick=R.p(["a","b","in"]);const t=pick==="a"?a:pick==="b"?b:R.i(a+1,b-1);const yes=pick==="in"||(pick==="a"&&ca)||(pick==="b"&&cb);
  return{type:"choice",q:`¿Pertenece el número ${M(fmt(t))} al intervalo ${M(ivl(a,b,ca,cb))}?`,opts:yes?["Sí","No"]:["No","Sí"],hint:"Fíjate en si el número es un extremo y, en ese caso, en si el extremo está incluido.",
   explain:pick==="in"?`${fmt(t)} está entre ${fmt(a)} y ${fmt(b)}, así que pertenece.`:`${fmt(t)} es un extremo y ${yes?"está incluido (corchete)":"no está incluido (paréntesis)"}.`}},
 R=>{const r=R.i(1,9),strict=R.f()<.5;
  return{type:"choice",q:`¿Qué intervalo corresponde a ${M(`|x| ${strict?"<":"≤"} ${r}`)}?`,opts:[strict?`(−${r}, ${r})`:`[−${r}, ${r}]`,strict?`[−${r}, ${r}]`:`(−${r}, ${r})`,`[0, ${r}]`,`(−∞, ${r}]`],
   hint:`Son los números cuya distancia al cero es ${strict?"menor que":"como mucho"} ${r}.`,explain:`Los números a distancia ${strict?"menor que":"menor o igual que"} ${r} del cero van de −${r} a ${r}${strict?", sin incluirlos":", incluidos"}.`}},
 R=>{const a=R.i(-8,3),b=R.i(a+1,a+9),ca=R.f()<.5,cb=R.f()<.5;const cnt=b-a-1+(ca?1:0)+(cb?1:0);
  return{type:"fill",kind:"num",answer:cnt,q:`¿Cuántos números enteros hay en el intervalo ${M(ivl(a,b,ca,cb))}?`,hint:"Escríbelos todos, fijándote en si los extremos cuentan.",
   explain:`Los enteros son ${Array.from({length:cnt},(_,k)=>fmt(a+(ca?0:1)+k)).join(", ")||"ninguno"}: ${cnt} en total. En cambio, números reales hay infinitos.`}}]
});

Object.assign(RECAP,{
L1:{map:[1,0,2,3,0],pts:[
  {s:"Finito o periódico",t:"Toda fracción da un decimal finito o periódico, porque los restos de la división son limitados.",ex:"5/6 = 0,8(3)"},
  {s:"Cuándo termina",t:"El decimal termina si el denominador irreducible solo tiene factores 2 y 5.",ex:"3/8 = 0,375; 1/6 = 0,1(6)"},
  {s:"Del periódico a la fracción",t:"Multiplicando por 10 o por 100 y restando, el periodo desaparece.",ex:"0,(7) = 7/9"},
  {s:"0,(9) = 1",t:"Un decimal periódico es un número exacto; 0,(9) es exactamente 1.",ex:"3 · 0,(3) = 0,(9) = 1"}]},
L2:{map:[1,2,0,2,3],pts:[
  {s:"La diagonal y √2",t:"La diagonal de un cuadrado de lado 1 mide √2, por el teorema de Pitágoras.",ex:"d² = 1² + 1² = 2"},
  {s:"No es una fracción",t:"Un irracional no se puede escribir como fracción; la raíz de un natural que no es cuadrado perfecto es irracional.",ex:"√2, √3, √5, π"},
  {s:"Encerrar entre enteros",t:"Comparando con cuadrados perfectos se sabe entre qué enteros está una raíz.",ex:"5² = 25 < 30 < 36 = 6²"},
  {s:"Decimales sin periodo",t:"Un irracional tiene infinitas cifras que nunca se repiten en periodo; 1,41 es solo una aproximación de √2.",ex:"√2 = 1,41421356…"}]},
L3:{map:[0,1,2,3,0],pts:[
  {s:"Siempre hay otro",t:"Entre dos números reales distintos hay infinitos más.",ex:"entre 1,4 y 1,5 está 1,45"},
  {s:"El punto medio",t:"El punto medio de a y b es (a + b) : 2, y siempre está entre los dos.",ex:"(1,4 + 1,5) : 2 = 1,45"},
  {s:"Orden de los decimales",t:"Se comparan cifra a cifra; con negativos el orden se invierte.",ex:"−1,5 < −1,45 < −1,405"},
  {s:"No hay siguiente",t:"En los reales no existe el número que va justo después de otro.",ex:"después de 1 no viene 1,01: está 1,001"}]},
L4:{map:[0,1,2,1,3],pts:[
  {s:"Distancia al cero",t:"El valor absoluto es la distancia al cero, y nunca es negativo.",ex:"|−5| = |5| = 5"},
  {s:"Distancia entre dos números",t:"La distancia entre a y b es |a − b|.",ex:"|−3 − 4| = 7"},
  {s:"Dos soluciones",t:"|x − c| = r tiene dos soluciones: los números a distancia r de c.",ex:"|x − 2| = 5 → x = 7 o x = −3"},
  {s:"|x| cuando x es negativo",t:"Si x es negativo, |x| = −x, que es positivo.",ex:"x = −4 → |x| = 4 = −x"}]},
L5:{map:[0,1,0,3,2],pts:[
  {s:"Corchetes y paréntesis",t:"El corchete incluye el extremo y el paréntesis lo excluye; en el dibujo, punto relleno o vacío.",ex:"[−2, 3): −2 sí, 3 no"},
  {s:"Tres lenguajes",t:"Un intervalo se escribe con dibujo, con desigualdades o con corchetes; el infinito siempre con paréntesis.",ex:"x > 1 = (1, +∞)"},
  {s:"Contar lo que hay dentro",t:"Un intervalo contiene infinitos reales, pero solo una cantidad finita de enteros si está acotado.",ex:"[2, 5]: los enteros 2, 3, 4 y 5"},
  {s:"Valor absoluto e intervalos",t:"|x| ≤ r es el intervalo [−r, r].",ex:"|x| < 3 = (−3, 3)"}]}
});

/* ---------- exploraciones ---------- */
Object.assign(EXPLORE,{
lDivision(host){let a=5,b=6;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="da">Numerador: <output class="m" id="dao">5</output></label><input type="range" id="da" min="1" max="30" value="5"><label for="db">Denominador: <output class="m" id="dbo">6</output></label><input type="range" id="db" min="2" max="17" value="6"></div>
   <div class="readout" id="dres"></div><h4>Los pasos de la división</h4><div class="remrow" id="drem"></div><p class="tip">Cada paso: el resto se multiplica por 10, se divide entre el denominador y queda una cifra y un resto nuevo. Los restos con borde de color forman el periodo: después se repiten en el mismo orden.</p></div>`;
  const draw=()=>{const q0=Math.floor(a/b);let r=a%b;const steps=[],seen={};let ps=-1;
    while(steps.length<24){if(r===0)break;if(seen[r]!=null){ps=seen[r];break}seen[r]=steps.length;const d=Math.floor(r*10/b);steps.push({r,d});r=(r*10)%b}
    const digs=steps.map(s=>s.d).join(""),txt=ps<0?(digs?`${q0},${digs}`:String(q0)):`${q0},${digs.slice(0,ps)}(${digs.slice(ps)})`;
    const [ra,rb]=red(a,b);let f=rb;const fs=[];for(const p of [2,3,5,7,11,13,17]){while(f%p===0){fs.push(p);f/=p}}if(f>1)fs.push(f);
    $("#dres",host).innerHTML=`<span class="k">Resultado</span>${F(a,b)} = ${txt}${ps>=0?` <span class="muted">(periodo: ${digs.slice(ps)})</span>`:""}<br><span class="k">Restos posibles</span>de 1 a ${b-1}: como mucho ${b-1} restos distintos antes de que uno se repita<br><span class="k">El denominador</span>${gcd(a,b)>1?`simplificada, la fracción es ${F(ra,rb)}. `:""}Denominador ${rb}${fs.length>1?" = "+fs.join(" · "):""}: ${rb===1?"es un número entero":factor25(rb)?"solo factores 2 y 5, el decimal termina":"tiene factores distintos de 2 y 5, el decimal es periódico"}`;
    $("#drem",host).innerHTML=steps.map((s,i)=>`<span class="remchip ${ps>=0&&i>=ps?"per":""}"><small>resto</small><b>${s.r}</b><small>cifra ${s.d}</small></span>`).join("")+(ps>=0?`<span class="remchip again"><small>resto</small><b>${steps[ps].r}</b><small>¡se repite!</small></span>`:r===0&&steps.length?`<span class="remchip end"><small>resto</small><b>0</b><small>termina</small></span>`:"");
    $("#dao",host).textContent=a;$("#dbo",host).textContent=b};
  $("#da",host).oninput=e=>{a=+e.target.value;draw()};$("#db",host).oninput=e=>{b=+e.target.value;draw()};draw()},

lIrracional(host){let k=1,ang=0,busy=false,g=140;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ik">Altura del rectángulo: <output class="m" id="iko">1</output></label><input type="range" id="ik" min="1" max="3" value="1"><button class="btn sm primary" id="igo">Girar el compás</button></div>
   <div class="svgwrap"><svg id="isv" viewBox="0 0 560 400" role="img" aria-label="Rectángulo sobre la recta y su diagonal llevada con un compás" style="max-width:520px"></svg></div><div class="readout" id="irr"></div>
   <h4 style="margin-top:8px">Encerrar la raíz</h4><div class="ctrl"><label for="ig">Tu aproximación: <output class="m" id="igo2">1,4</output></label><input type="range" id="ig" min="100" max="200" value="140" step="1"></div><div class="readout" id="igr"></div></div>`;
  const U=110,x0=50,X=v=>x0+v*U;let y0=360;
  const draw=()=>{y0=40+k*U;$("#isv",host).setAttribute("viewBox",`0 0 560 ${y0+45}`);const n=1+k*k,d=Math.sqrt(n),a0=Math.atan2(k,1),a=a0*(1-ang),ex=x0+Math.cos(a)*d*U,ey=y0-Math.sin(a)*d*U;
    let s=`<line x1="20" y1="${y0}" x2="550" y2="${y0}" stroke="var(--rule)" stroke-width="2"/>`;
    for(let v=0;v<=4;v++)s+=`<line x1="${X(v)}" y1="${y0-6}" x2="${X(v)}" y2="${y0+6}" stroke="var(--ink)" stroke-width="2"/><text x="${X(v)}" y="${y0+28}" text-anchor="middle" style="font:700 15px var(--f-mono);fill:var(--ink)">${v}</text>`;
    s+=`<rect x="${X(0)}" y="${y0-k*U}" width="${U}" height="${k*U}" fill="var(--surface-2)" stroke="var(--muted)" stroke-width="1.5"/>`;
    s+=`<text x="${X(.5)}" y="${y0-k*U-8}" text-anchor="middle" style="font:600 13px var(--f-mono);fill:var(--muted)">1</text><text x="${X(1)+8}" y="${y0-k*U/2+4}" style="font:600 13px var(--f-mono);fill:var(--muted)">${k}</text>`;
    s+=`<path d="M${X(0)+Math.cos(a0)*d*U} ${y0-Math.sin(a0)*d*U} A ${d*U} ${d*U} 0 0 1 ${X(d)} ${y0}" fill="none" stroke="var(--l-rec)" stroke-width="1.5" stroke-dasharray="5 4" opacity=".45"/>`;
    s+=`<line x1="${X(0)}" y1="${y0}" x2="${ex}" y2="${ey}" stroke="var(--l-rec)" stroke-width="3.5"/><circle cx="${X(0)}" cy="${y0}" r="5" fill="var(--ink)"/><circle cx="${ex}" cy="${ey}" r="7" fill="var(--l-rec)"/>`;
    if(ang>=1)s+=`<text x="${X(d)}" y="${y0-16}" text-anchor="middle" style="paint-order:stroke;stroke:var(--surface);stroke-width:4px;font:700 16px var(--f-mono);fill:var(--l-rec)">√${n}</text>`;
    $("#isv",host).innerHTML=s;
    $("#irr",host).innerHTML=`<span class="k">Diagonal</span>d² = 1² + ${k}² = ${n}, así que d = √${n}<br><span class="k">En la recta</span>${ang>=1?`el compás deja la diagonal en el punto √${n} ≈ ${decs(d,4)}`:"pulsa «Girar el compás» para llevar la diagonal a la recta"}<br><span class="k">¿Es una fracción?</span>${n} no es un cuadrado perfecto, así que √${n} es irracional: no es una fracción`};
  const drawG=()=>{const n=1+k*k,v=g/100,sq=v*v,lo=Math.floor(Math.sqrt(n)*100)/100;$("#igo2",host).textContent=decs(v,2);
    $("#igr",host).innerHTML=`<span class="k">Tu aproximación al cuadrado</span>${decs(v,2)}² = ${decs(sq,4)} ${sq<n?"&lt; "+n+" (te falta)":"&gt; "+n+" (te pasaste)"}<br><span class="k">Lo mejor con dos decimales</span>${decs(lo,2)} &lt; √${n} &lt; ${decs(lo+.01,2)}. Ningún decimal da al cuadrado exactamente ${n}: se puede afinar sin fin.`};
  $("#ik",host).oninput=e=>{k=+e.target.value;$("#iko",host).textContent=k;ang=0;const f=Math.floor(Math.sqrt(1+k*k));const sl=$("#ig",host);sl.min=f*100;sl.max=(f+1)*100;g=f*100+40;sl.value=g;draw();drawG()};
  $("#igo",host).onclick=async()=>{if(busy)return;busy=true;ang=0;await tween(1400,t=>{ang=t;draw()});ang=1;draw();busy=false};
  $("#ig",host).oninput=e=>{g=+e.target.value;drawG()};draw();drawG()},

lZoom(host){const T={r2:[Math.SQRT2,"√2"],t3:[1/3,"1/3"],pi:[Math.PI,"π"]};let tg="r2",lo=0,z=0;
  host.innerHTML=`<div class="xp"><div class="ctrl"><span class="seg" role="group" aria-label="Número que persigues">${Object.entries(T).map(([k,v])=>`<button class="btn sm" data-t="${k}">Perseguir ${v[1]}</button>`).join("")}</span><button class="btn sm ghost" id="zout">Alejar</button><button class="btn sm ghost" id="zrst">Empezar de nuevo</button></div>
   <p class="tip">Toca el tramo donde está el número para acercarte diez veces.</p><div class="svgwrap nl"><svg id="zsv" viewBox="0 0 640 130" role="img" aria-label="Tramo de la recta dividido en diez partes"></svg></div><div class="readout" id="zrr"></div></div>`;
  const W=()=>Math.pow(10,1-z),X=v=>30+(v-lo)/W()*580;
  const draw=()=>{const w=W(),t=T[tg][0],step=w/10,dg=Math.max(0,z);let g="";
    for(let i=0;i<10;i++){const a=lo+i*step,inside=t>=a&&t<a+step;g+=`<rect class="zseg" data-i="${i}" x="${X(a)}" y="40" width="${580/10}" height="40" fill="${inside?"var(--surface-2)":"transparent"}" stroke="none" style="cursor:pointer"/>`}
    g+=`<line x1="30" y1="60" x2="610" y2="60" stroke="var(--rule)" stroke-width="2"/>`;
    for(let i=0;i<=10;i++){const v=lo+i*step;g+=`<line x1="${X(v)}" y1="52" x2="${X(v)}" y2="68" stroke="var(--muted)" stroke-width="1.5"/><text x="${X(v)}" y="${i%2?104:92}" text-anchor="middle" style="font:11px var(--f-mono);fill:var(--muted)">${decs(v,dg+1)}</text>`}
    if(t>=lo&&t<=lo+w)g+=`<circle cx="${X(t)}" cy="60" r="7" fill="var(--l-rec)"/><text x="${X(t)}" y="30" text-anchor="middle" style="font:700 14px var(--f-mono);fill:var(--l-rec)">${T[tg][1]}</text>`;
    const svg=$("#zsv",host);svg.innerHTML=g;$$(".zseg",svg).forEach(r=>r.onclick=()=>{const i=+r.dataset.i;const a=lo+i*W()/10;if(z>=7){toast("Ya estás muy cerca: podrías seguir sin fin.");return}if(!(t>=a&&t<a+W()/10)){toast("El número no está en ese tramo.");return}lo=a;z++;draw()});
    $$("[data-t]",host).forEach(b=>b.setAttribute("aria-current",b.dataset.t===tg?"page":"false"));
    $("#zrr",host).innerHTML=`<span class="k">Tramo actual</span>de ${decs(lo,dg+1)} a ${decs(lo+w,dg+1)} (ancho ${decs(w,dg+1)})<br><span class="k">Lo que ya sabes</span>${decs(lo,dg+1)} &lt; ${T[tg][1]} &lt; ${decs(lo+w,dg+1)}<br><span class="k">Lo que no cambia</span>cada tramo se divide otra vez en diez: nunca se llega a dos números «pegados»`};
  $$("[data-t]",host).forEach(b=>b.onclick=()=>{tg=b.dataset.t;lo=0;z=0;draw()});$("#zout",host).onclick=()=>{if(z>0){z--;lo=Math.floor(lo/W())*W();draw()}};$("#zrst",host).onclick=()=>{lo=0;z=0;draw()};draw()},

lAbs(host){let a=-3,b=4,c=2,r=5;
  host.innerHTML=`<div class="xp"><p class="tip">Arrastra los puntos A y B.</p><div class="svgwrap nl"><svg id="asv" viewBox="0 0 640 150" role="img" aria-label="Recta con dos puntos y sus distancias"></svg></div><div class="readout" id="arr"></div>
   <h4 style="margin-top:8px">Resolver |x − c| = r</h4><div class="ctrl"><label for="ac">c: <output class="m" id="aco">2</output></label><input type="range" id="ac" min="-6" max="6" value="2"><label for="ar">r: <output class="m" id="aro">5</output></label><input type="range" id="ar" min="0" max="6" value="5"></div>
   <div class="svgwrap nl"><svg id="asv2" viewBox="0 0 640 100" role="img" aria-label="Soluciones de la ecuación con valor absoluto"></svg></div><div class="readout" id="arr2"></div></div>`;
  const X=v=>320+v*28,axis=y=>{let g=`<line x1="20" y1="${y}" x2="620" y2="${y}" stroke="var(--rule)" stroke-width="2"/>`;for(let v=-10;v<=10;v++)g+=`<circle cx="${X(v)}" cy="${y}" r="${v===0?4.5:3}" fill="${v===0?"var(--ink)":"var(--muted)"}"/><text x="${X(v)}" y="${y+20}" text-anchor="middle" style="font:${v===0?"700 ":""}11px var(--f-mono);fill:var(--muted)">${fmt(v)}</text>`;return g};
  const draw=()=>{let g=axis(90);const br=(x1,x2,y,col,lab)=>`<path d="M${X(x1)} ${y+6} V${y} H${X(x2)} V${y+6}" fill="none" stroke="${col}" stroke-width="2"/><text x="${(X(x1)+X(x2))/2}" y="${y-5}" text-anchor="middle" style="paint-order:stroke;stroke:var(--surface);stroke-width:4px;font:700 12px var(--f-mono);fill:${col}">${lab}</text>`;
    g+=br(Math.min(a,b),Math.max(a,b),22,"var(--l-rec)",`|A − B| = ${Math.abs(a-b)}`);if(a)g+=br(Math.min(a,0),Math.max(a,0),56,"var(--l-ent)",`|A| = ${Math.abs(a)}`);if(b)g+=br(Math.min(b,0),Math.max(b,0),56,"var(--l-rac)",`|B| = ${Math.abs(b)}`);
    g+=`<circle cx="${X(a)}" cy="90" r="9" fill="var(--l-ent)" style="cursor:grab"/><text x="${X(a)}" y="94" text-anchor="middle" style="font:700 10px var(--f-disp);fill:var(--surface)">A</text><circle cx="${X(b)}" cy="90" r="9" fill="var(--l-rac)" style="cursor:grab"/><text x="${X(b)}" y="94" text-anchor="middle" style="font:700 10px var(--f-disp);fill:var(--surface)">B</text>`;
    $("#asv",host).innerHTML=g;$("#arr",host).innerHTML=`<span class="k">Distancias al cero</span>|${fmt(a)}| = ${Math.abs(a)}  y  |${fmt(b)}| = ${Math.abs(b)}<br><span class="k">Distancia entre A y B</span>|${fmt(a)} − ${fmtP(b)}| = |${fmt(a-b)}| = ${Math.abs(a-b)}, y al revés |${fmt(b)} − ${fmtP(a)}| = ${Math.abs(b-a)}`};
  const draw2=()=>{let g=axis(50);if(r>0)g+=`<line x1="${X(c-r)}" y1="50" x2="${X(c+r)}" y2="50" stroke="var(--l-rec)" stroke-width="2" stroke-dasharray="5 4"/>`;
    g+=`<circle cx="${X(c)}" cy="50" r="6" fill="var(--ink)"/><text x="${X(c)}" y="30" text-anchor="middle" style="font:700 12px var(--f-mono);fill:var(--ink)">c</text>`;
    [c-r,c+r].filter((v,i,arr)=>arr.indexOf(v)===i&&v>=-10&&v<=10).forEach(v=>g+=`<circle cx="${X(v)}" cy="50" r="8" fill="var(--ok)"/><text x="${X(v)}" y="30" text-anchor="middle" style="font:700 12px var(--f-mono);fill:var(--ok)">${fmt(v)}</text>`);
    $("#asv2",host).innerHTML=g;const eq=c?`|x ${c<0?"+":"−"} ${Math.abs(c)}| = ${r}`:`|x| = ${r}`;
    $("#arr2",host).innerHTML=`<span class="k">Ecuación</span>${eq}<br><span class="k">Soluciones</span>${r===0?`una sola: x = ${fmt(c)}`:`x = ${fmt(c)} + ${r} = ${fmt(c+r)}  y  x = ${fmt(c)} − ${r} = ${fmt(c-r)}`}: los números a distancia ${r} de ${fmt(c)}`;$("#aco",host).textContent=fmt(c);$("#aro",host).textContent=r};
  let drag=null;dragOn($("#asv",host),{down:p=>{const dA=Math.abs(p.x-X(a)),dB=Math.abs(p.x-X(b));if(Math.min(dA,dB)>20)return false;drag=dA<=dB?"a":"b"},move:p=>{const v=Math.max(-10,Math.min(10,Math.round((p.x-320)/28)));if(drag==="a"&&v!==a){a=v;draw()}else if(drag==="b"&&v!==b){b=v;draw()}},up:()=>drag=null});
  $("#ac",host).oninput=e=>{c=+e.target.value;draw2()};$("#ar",host).oninput=e=>{r=+e.target.value;draw2()};draw();draw2()},

lIntervalo(host){let a=-3,b=4,ca=true,cb=false,ia=false,ib=false,t=0;
  host.innerHTML=`<div class="xp"><p class="tip">Arrastra los extremos (círculos grandes) y el número de prueba (rombo).</p>
   <div class="ctrl"><button class="btn sm" id="tca">Extremo izquierdo: incluido</button><button class="btn sm" id="tcb">Extremo derecho: excluido</button><button class="btn sm ghost" id="tia">Sin límite a la izquierda</button><button class="btn sm ghost" id="tib">Sin límite a la derecha</button></div>
   <div class="svgwrap nl"><svg id="vsv" viewBox="0 0 640 120" role="img" aria-label="Intervalo en la recta con un número de prueba"></svg></div><div class="readout" id="vrr"></div></div>`;
  const X=v=>320+v*28;
  const draw=()=>{if(a>b)[a,b]=[b,a];const A=ia?null:a,B=ib?null:b;let g=`<line x1="14" y1="60" x2="626" y2="60" stroke="var(--rule)" stroke-width="2"/>`;
    for(let v=-10;v<=10;v++)g+=`<line x1="${X(v)}" y1="55" x2="${X(v)}" y2="65" stroke="var(--muted)"/><text x="${X(v)}" y="86" text-anchor="middle" style="font:11px var(--f-mono);fill:var(--muted)">${fmt(v)}</text>`;
    const xa=A==null?14:X(A),xb=B==null?626:X(B);g+=`<line x1="${xa}" y1="60" x2="${xb}" y2="60" stroke="var(--l-rec)" stroke-width="7"/>`;
    if(A==null)g+=`<polygon points="8,60 22,52 22,68" fill="var(--l-rec)"/>`;else g+=`<circle cx="${xa}" cy="60" r="10" fill="${ca?"var(--l-rec)":"var(--surface)"}" stroke="var(--l-rec)" stroke-width="3.5" style="cursor:grab"/>`;
    if(B==null)g+=`<polygon points="632,60 618,52 618,68" fill="var(--l-rec)"/>`;else g+=`<circle cx="${xb}" cy="60" r="10" fill="${cb?"var(--l-rec)":"var(--surface)"}" stroke="var(--l-rec)" stroke-width="3.5" style="cursor:grab"/>`;
    const inside=(A==null||t>A||(ca&&t===A))&&(B==null||t<B||(cb&&t===B));
    g+=`<polygon points="${X(t)},18 ${X(t)+8},28 ${X(t)},38 ${X(t)-8},28" fill="${inside?"var(--ok)":"var(--bad)"}" style="cursor:grab"/><text x="${X(t)}" y="12" text-anchor="middle" style="font:700 11px var(--f-mono);fill:${inside?"var(--ok)":"var(--bad)"}">${fmt(t)}</text>`;
    $("#vsv",host).innerHTML=g;const L=ca?"≤":"<",Rr=cb?"≤":"<";
    const ineq=A==null&&B==null?"cualquier número real":A==null?`x ${cb?"≤":"<"} ${fmt(B)}`:B==null?`x ${ca?"≥":">"} ${fmt(A)}`:`${fmt(A)} ${L} x ${Rr} ${fmt(B)}`;
    const words=A==null&&B==null?"toda la recta":A==null?`los números ${cb?"menores o iguales que":"menores que"} ${fmt(B)}`:B==null?`los números ${ca?"mayores o iguales que":"mayores que"} ${fmt(A)}`:`los números entre ${fmt(A)} y ${fmt(B)}, ${ca?"con":"sin"} el ${fmt(A)} y ${cb?"con":"sin"} el ${fmt(B)}`;
    $("#vrr",host).innerHTML=`<span class="k">Con corchetes</span>${ivl(A,B,ca,cb)}<br><span class="k">Con desigualdades</span>${ineq}<br><span class="k">Con palabras</span>${words}<br><span class="k">Número de prueba</span>${fmt(t)} ${inside?"pertenece":"no pertenece"} al intervalo`;
    $("#tca",host).textContent=`Extremo izquierdo: ${ca?"incluido":"excluido"}`;$("#tcb",host).textContent=`Extremo derecho: ${cb?"incluido":"excluido"}`;
    $("#tia",host).textContent=ia?"Poner límite a la izquierda":"Sin límite a la izquierda";$("#tib",host).textContent=ib?"Poner límite a la derecha":"Sin límite a la derecha";$("#tca",host).disabled=ia;$("#tcb",host).disabled=ib};
  let drag=null;dragOn($("#vsv",host),{down:p=>{const v=Math.round((p.x-320)/28);if(p.y<44&&Math.abs(p.x-X(t))<22){drag="t";return}const dA=ia?99:Math.abs(p.x-X(a)),dB=ib?99:Math.abs(p.x-X(b));if(Math.min(dA,dB)>22)return false;drag=dA<=dB?"a":"b"},
    move:p=>{const v=Math.max(-10,Math.min(10,Math.round((p.x-320)/28)));if(drag==="t"&&v!==t){t=v;draw()}else if(drag==="a"&&v!==a&&v<=b){a=v;draw()}else if(drag==="b"&&v!==b&&v>=a){b=v;draw()}},up:()=>drag=null});
  $("#tca",host).onclick=()=>{ca=!ca;draw()};$("#tcb",host).onclick=()=>{cb=!cb;draw()};$("#tia",host).onclick=()=>{ia=!ia;draw()};$("#tib",host).onclick=()=>{ib=!ib;draw()};draw()}
});
