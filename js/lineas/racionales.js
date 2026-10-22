"use strict";
/* ============ Línea: Los números racionales (R1–R6) ============
   Enfoque: la fracción nace de dos situaciones a la vez, el reparto en partes iguales (parte-todo)
   y la medida de lo que la unidad no alcanza (el grosor de una hoja, al estilo de Brousseau).
   Cada estación ataca un hábito heredado de los números naturales. */

const FQ=(t,q)=>`<span class="fr"><span>${t}</span><span>${q}</span></span>`;

Object.assign(NODES,{
R1:{title:"Repartir y medir",sub:"Las fracciones nacen al repartir y al medir lo que la regla no alcanza.",
 info:`<p class="lead">Los números naturales no alcanzan para todo. Las fracciones aparecen en dos situaciones muy distintas: cuando se <b>reparte</b> algo en partes iguales y cuando se <b>mide</b> algo más pequeño que la unidad.</p>
 <div class="ex-box"><span class="eyebrow">Repartir</span><p>Se reparten 3 chocolatinas iguales entre 4 personas. Cada chocolatina se parte en 4 trozos y cada persona se lleva un trozo de cada una: 3 trozos de ${F(1,4)}. Cada persona recibe ${F(3,4)} de chocolatina.</p>
 ${figBars([[1,4,PAL[0],"1.ª"],[1,4,PAL[0],"2.ª"],[1,4,PAL[0],"3.ª"],[3,4,PAL[0],"recibe"]])}
 <p>El denominador (4) dice en cuántas partes iguales se divide la unidad; el numerador (3), cuántas de esas partes se toman.</p></div>
 <div class="ex-box"><span class="eyebrow">Medir</span><p>¿Cuánto mide el grosor de una hoja de papel? Con una regla no se puede medir una sola hoja, pero sí un paquete. Si 50 hojas miden 3 mm, el grosor de una hoja es ${F(3,50)} de mm.</p>
 <p>Aquí la fracción no es un trozo de algo: es <b>una medida</b>, un número que dice cuánto mide una hoja.</p></div>
 <p>Las dos situaciones son en el fondo la misma operación: <b>dividir</b>. 3 chocolatinas entre 4 personas y 3 mm entre 50 hojas dan las fracciones ${F(3,4)} y ${F(3,50)}.</p>
 <div class="callout"><span class="eyebrow">Una fracción es un solo número</span><p>${F(3,4)} no son «un 3 y un 4» por separado: es una cantidad, que tiene su lugar en la recta entre el 0 y el 1. Con ella se puede comparar, sumar y medir, como con cualquier número.</p></div>`,
 explore:{intro:"Reparte chocolatinas entre personas y mira qué recibe cada una. Después mide un paquete de hojas con una regla que solo marca milímetros enteros.",fn:"rReparto"},
 key:"La fracción a/b sirve para repartir a entre b en partes iguales y para medir lo que la unidad no alcanza. Es el resultado de una división y es un solo número.",
 ojo:"No mires el numerador y el denominador como dos números sueltos: juntos forman una sola cantidad."},

R2:{title:"Fracciones equivalentes",sub:"Una misma cantidad puede tener muchos nombres.",
 info:`<p class="lead">Una misma cantidad puede escribirse con muchas fracciones distintas. Se llaman <b>fracciones equivalentes</b>.</p>
 <div class="ex-box"><span class="eyebrow">Ejemplo con el papel</span><p>Si 50 hojas de un papel miden 3 mm, 100 hojas del mismo papel miden 6 mm y 150 hojas miden 9 mm. El grosor de una hoja no cambia: ${F(3,50)} = ${F(6,100)} = ${F(9,150)}.</p></div>
 <div class="ex-box"><span class="eyebrow">Ejemplo con la barra</span>${figBars([[3,4,PAL[1]],[6,8,PAL[1]],[9,12,PAL[1]]])}<p>La parte sombreada es la misma. Al partir cada trozo en 2 hay el doble de trozos, y cada uno es la mitad de grande.</p></div>
 <p><b>Amplificar:</b> multiplicar el numerador y el denominador por el mismo número da una fracción equivalente: ${F(2,5)} = ${F(6,15)}.</p>
 <p><b>Simplificar:</b> dividir los dos por un divisor común también: ${F(18,24)} = ${F(9,12)} = ${F(3,4)}. Cuando ya no hay divisores comunes, la fracción es <b>irreducible</b>.</p>
 <div class="callout"><span class="eyebrow">Lo que no funciona</span><p>Sumar lo mismo arriba y abajo cambia el valor: ${F(1,2)} y ${F(2,3)} no son iguales. Solo multiplicar o dividir por el mismo número conserva la cantidad.</p></div>`,
 explore:{intro:"Elige una fracción y multiplica numerador y denominador por el mismo número. Mira cómo la parte sombreada no cambia.",fn:"rEquiv"},
 key:"Multiplicar o dividir el numerador y el denominador por el mismo número da una fracción equivalente: la misma cantidad con otro nombre.",
 ojo:"Sumar el mismo número arriba y abajo no da una fracción equivalente. Compruébalo dibujando las dos barras."},

R3:{title:"Comparar y ordenar",sub:"Para comparar fracciones hay que mirar el tamaño de las partes.",
 info:`<p class="lead">Para saber qué fracción es mayor no basta con mirar los números: hay que pensar en el <b>tamaño de las partes</b>.</p>
 <ol class="plain">
 <li><b>Mismo denominador:</b> las partes son del mismo tamaño, así que gana el numerador mayor. ${F(5,8)} &gt; ${F(3,8)}.</li>
 <li><b>Mismo numerador:</b> es mayor la de <b>denominador menor</b>, porque sus partes son más grandes. ${F(1,3)} &gt; ${F(1,8)}.</li>
 <li><b>Distintos:</b> se pasan a un denominador común. Para ${F(2,3)} y ${F(3,4)}: ${F(8,12)} &lt; ${F(9,12)}.</li></ol>
 <div class="ex-box"><span class="eyebrow">En la recta</span><p>Para colocar ${F(3,4)} se divide cada unidad en 4 partes iguales y se cuentan 3 desde el cero. ${F(7,4)} queda más allá del 1, porque ${F(7,4)} = 1 + ${F(3,4)}: cuando el numerador es mayor que el denominador, la fracción es mayor que 1.</p></div>
 <p>Entre dos fracciones distintas siempre hay otra: entre ${F(1,3)} y ${F(2,3)} está ${F(1,2)}, porque ${F(2,6)} &lt; ${F(3,6)} &lt; ${F(4,6)}. Siempre se puede partir más fino.</p>
 <div class="callout"><span class="eyebrow">El error más común</span><p>Pensar que ${F(1,8)} es mayor que ${F(1,4)} porque 8 es mayor que 4. Con los naturales, más es más; con las partes, más partes significa partes más pequeñas.</p></div>`,
 explore:{intro:"Coloca dos fracciones en la recta y compáralas. Fíjate en cómo cambia el tamaño de los saltos al cambiar el denominador.",fn:"rOrden"},
 key:"Para comparar fracciones se piensa en el tamaño de las partes o se pasan a un denominador común. Cada fracción tiene su lugar en la recta, y entre dos fracciones siempre hay otra.",
 ojo:"Un denominador mayor quiere decir partes más pequeñas: 1/8 es menor que 1/4."},

R4:{title:"Sumar y restar fracciones",sub:"Solo se suman directamente partes del mismo tamaño.",
 info:`<p class="lead">Solo se pueden sumar directamente partes del <b>mismo tamaño</b>, igual que al medir: para sumar 1 m y 30 cm, primero se pasa todo a centímetros.</p>
 <div class="ex-box"><span class="eyebrow">Ejemplo</span><p>${F(1,2)} + ${F(1,3)}: medios y tercios no son del mismo tamaño. Se pasan los dos a sextos, que encajan con ambos:</p>
 ${figBars([[1,2,PAL[1],"1/2"],[1,3,PAL[0],"1/3"],[3,6,PAL[1],"3/6"],[2,6,PAL[0],"2/6"]])}
 <p class="calc">${F(1,2)} + ${F(1,3)} = ${F(3,6)} + ${F(2,6)} = ${F(5,6)}</p></div>
 <p>El paso clave es encontrar un <b>denominador común</b>: un múltiplo de los dos denominadores (lo más cómodo es el mínimo común múltiplo). Después se suman o restan los numeradores.</p>
 <div class="ex-box"><span class="eyebrow">Restas con resultado negativo</span><p>Si se resta una fracción mayor, el resultado es negativo, y todo lo que aprendiste en la línea de Enteros sigue valiendo:</p><p class="calc">${F(1,3)} − ${F(3,4)} = ${F(4,12)} − ${F(9,12)} = −${F(5,12)}</p></div>
 <div class="callout"><span class="eyebrow">No se suman los denominadores</span><p>${F(1,2)} + ${F(1,3)} no es ${F(2,5)}. De hecho, ${F(2,5)} es menor que ${F(1,2)}: sumar algo positivo no puede dar menos de lo que había.</p></div>`,
 explore:{intro:"Elige dos fracciones y pásalas a un denominador común. Mira cómo los trozos se vuelven del mismo tamaño y se pueden juntar.",fn:"rSuma"},
 key:"Para sumar o restar fracciones se pasan a un denominador común y después se suman o restan los numeradores. Las reglas de los signos de los enteros siguen valiendo.",
 ojo:"No sumes los denominadores: comprueba siempre si el resultado tiene sentido comparándolo con los sumandos."},

R5:{title:"Multiplicar y dividir",sub:"Multiplicar es tomar una parte; dividir es ver cuántas veces cabe.",
 info:`<p class="lead">Multiplicar por una fracción es <b>tomar una parte</b> de algo. Dividir por una fracción es preguntar <b>cuántas veces cabe</b>.</p>
 <div class="ex-box"><span class="eyebrow">Fracción de una cantidad</span><p>${F(3,4)} de 20: se divide 20 en 4 partes iguales (5 cada una) y se toman 3: <span class="m">20 : 4 · 3 = 15</span>.</p></div>
 <div class="ex-box"><span class="eyebrow">Producto de dos fracciones</span><p>En un cuadrado de lado 1, se toma ${F(2,3)} de la base y ${F(3,5)} de la altura. El rectángulo que se forma ocupa 6 de las 15 casillas:</p>
 <p class="calc">${F(2,3)} · ${F(3,5)} = ${F(6,15)} = ${F(2,5)}</p><p>Se multiplica numerador por numerador y denominador por denominador.</p></div>
 <div class="ex-box"><span class="eyebrow">Dividir: ¿cuántas veces cabe?</span><p>¿Cuántas veces cabe ${F(1,4)} en 3? En cada unidad caben 4 cuartos, así que en 3 unidades caben 12: <span class="m">3 : ${F(1,4)} = 12</span>.</p>
 <p>En general, dividir por una fracción es multiplicar por su inversa: ${F(2,3)} : ${F(4,5)} = ${F(2,3)} · ${F(5,4)} = ${F(10,12)} = ${F(5,6)}.</p></div>
 <div class="callout"><span class="eyebrow">Lo que ya no vale</span><p>Con los naturales, multiplicar agranda y dividir achica. Con las fracciones no siempre: 12 · ${F(2,3)} = 8, que es menor que 12; y 3 : ${F(1,4)} = 12, que es mayor que 3.</p></div>`,
 explore:{intro:"Toma una fracción de la base y otra de la altura de un cuadrado: la parte común es el producto. Después toma una fracción de un grupo de puntos.",fn:"rProducto"},
 key:"Multiplicar por a/b es tomar a/b de algo: numerador por numerador y denominador por denominador. Dividir por una fracción es ver cuántas veces cabe, y equivale a multiplicar por su inversa.",
 ojo:"Multiplicar por una fracción menor que 1 achica, y dividir por ella agranda. No confíes en la intuición de los naturales."},

R6:{title:"Decimales y porcentajes",sub:"Fracciones de 10, 100 y 1000 con otra forma de escribirse.",
 info:`<p class="lead">Los números decimales son fracciones con denominador 10, 100, 1000…, escritas de otra forma.</p>
 <div class="ex-box"><span class="eyebrow">Ejemplos</span><p class="calc">0,7 = ${F(7,10)}    0,25 = ${F(25,100)} = ${F(1,4)}    ${F(3,4)} = ${F(75,100)} = 0,75</p>
 <p>Para pasar una fracción a decimal también se puede dividir: <span class="m">3 : 4 = 0,75</span>.</p></div>
 <div class="ex-box"><span class="eyebrow">Porcentajes</span><p>El porcentaje es una fracción de 100: 15 % = ${F(15,100)} = 0,15. Por eso, el 15 % de 80 es <span class="m">80 · 15 : 100 = 12</span>.</p></div>
 <p><b>Comparar decimales:</b> se igualan las cifras decimales y se comparan las centésimas con las centésimas. 0,3 = 0,30, que es mayor que 0,25.</p>
 <div class="callout"><span class="eyebrow">Más cifras no es más grande</span><p>0,25 no es mayor que 0,3 aunque 25 sea mayor que 3. Las cifras de un decimal no valen lo mismo: el 3 de 0,3 son décimas, y el 2 de 0,25 también.</p></div>`,
 explore:{intro:"Sombrea casillas de un cuadrado de 100 y mira la misma cantidad como fracción, como decimal y como porcentaje. Después compara décimas con centésimas.",fn:"rCentesimas"},
 key:"Un decimal es una fracción de denominador 10, 100 o 1000, y un porcentaje es una fracción de 100. Para comparar decimales se igualan las cifras.",
 ojo:"Compara décimas con décimas: 0,3 = 0,30 es mayor que 0,25."}
});

/* ---------- retos con variación ---------- */
const cop=(R,b)=>{let a=R.i(1,b-1);while(gcd(a,b)!==1)a=R.i(1,b-1);return a};
const isDec=q=>{[,q]=red(1,q);while(q%2===0)q/=2;while(q%5===0)q/=5;return q===1};
Object.assign(RETO,{
R1:[
 R=>{const p=R.i(3,8),c=R.i(1,p-1);
  return{type:"shade",cols:p,target:c/p,show:`${c}/${p}`,q:`Se reparten ${c} chocolatina${c>1?"s":""} iguales entre ${p} personas: cada chocolatina se parte en ${p} trozos y cada persona se lleva un trozo de cada una. Esta barra es una chocolatina: sombrea la cantidad total que recibe una persona.`,
   hint:`Cada persona recibe un trozo de cada chocolatina: ${c} trozo${c>1?"s":""} de ${F(1,p)}.`,explain:`Cada persona recibe ${c} trozo${c>1?"s":""} de ${F(1,p)}, es decir, ${F(c,p)} de chocolatina.`}},
 R=>{const n=R.p([20,25,40,50,100]),e=R.i(2,7);
  return{type:"choice",q:`${n} hojas de un papel miden ${e} mm de grosor. ¿Cuánto mide el grosor de una hoja?`,opts:[`${F(e,n)} de mm`,`${F(n,e)} de mm`,`${e} mm`,`${F(1,n)} de mm`],
   hint:"El grosor del paquete se reparte por igual entre todas las hojas.",explain:`Se divide el grosor del paquete entre las hojas: ${e} : ${n} = ${F(e,n)} de mm${gcd(e,n)>1?` = ${FR(e,n)} de mm`:""}.`}},
 R=>{const p=R.i(3,9);let a=R.i(2,7);if(a===p)a++;
  return{type:"fill",kind:"frac",answer:a/p,show:`${a}/${p}`,q:`Se reparten ${a} pizzas iguales entre ${p} amigos, en partes iguales. ¿Qué fracción de pizza recibe cada uno?`,
   hint:`Cada pizza se parte en ${p} trozos, y cada amigo se lleva un trozo de cada pizza.`,explain:`Cada uno recibe ${a} trozos de ${F(1,p)}: ${F(a,p)} de pizza${gcd(a,p)>1?`, que es lo mismo que ${FR(a,p)}`:""}${a>p?". Es más de una pizza entera":""}.`}},
 R=>{let nA,eA,nB,eB;do{nA=R.p([20,40,50]);eA=R.i(1,5);nB=R.p([25,60,100]);eB=R.i(1,8)}while(eA*nB===eB*nA||Math.abs(eA/nA-eB/nB)<.008);
  const L=lcm(nA,nB),mA=eA*L/nA,mB=eB*L/nB,aGana=mA>mB;
  return{type:"choice",q:`${nA} hojas del papel A miden ${eA} mm y ${nB} hojas del papel B miden ${eB} mm. ¿Qué papel es más grueso?`,opts:aGana?["El papel A","El papel B","Los dos son igual de gruesos"]:["El papel B","El papel A","Los dos son igual de gruesos"],
   hint:`Compara lo que medirían paquetes con la misma cantidad de hojas, por ejemplo ${L} hojas.`,explain:`${L} hojas del papel A medirían ${mA} mm y ${L} hojas del papel B medirían ${mB} mm. Una hoja de A mide ${FR(eA,nA)} de mm y una de B, ${FR(eB,nB)} de mm.`}},
 R=>{const k=R.i(3,8);let m=R.i(2,5);if(m===k)m++;const dec=isDec(k);
  return{type:"fill",kind:"frac",answer:m/k,show:`${m}/${k}`,q:`Una cinta de ${m} m se corta en ${k} trozos iguales. ¿Cuánto mide cada trozo, en metros?`,
   hint:`Medir cada trozo es dividir ${m} entre ${k}. Puedes dejar el resultado como fracción.`,explain:`${m} : ${k} = ${F(m,k)} m${dec?` = ${decs(m/k,3)} m`:""}. La fracción ${F(m,k)} es el resultado exacto de la división.`}}],
R2:[
 R=>{const b=R.i(2,5),k=R.i(2,3);let a=R.i(1,b-1);while(gcd(a,b)!==1)a=R.i(1,b-1);
  return{type:"shade",cols:b*k,target:a/b,show:`${a*k}/${b*k}`,q:`La barra está dividida en ${b*k} partes iguales. Sombrea ${F(a,b)} de la barra.`,
   hint:`Cada ${F(1,b)} de la barra son ${k} partes pequeñas.`,explain:`${F(a,b)} = ${F(a*k,b*k)}: hay que sombrear ${a*k} de las ${b*k} partes.`}},
 R=>{const b=R.i(3,9),k=R.i(2,6);let a=R.i(1,b-1);while(gcd(a,b)!==1)a=R.i(1,b-1);
  return{type:"fill",kind:"frac",irreducible:true,answer:a/b,show:`${a}/${b}`,q:`Simplifica ${F(a*k,b*k)} hasta la fracción irreducible.`,
   hint:`Busca un número que divida a la vez a ${a*k} y a ${b*k}.`,explain:`${a*k} y ${b*k} se pueden dividir entre ${k}: ${F(a*k,b*k)} = ${F(a,b)}. Ya no tienen divisores comunes.`}},
 R=>{const b=R.i(2,9),k=R.i(2,7);let a=R.i(1,b-1);while(gcd(a,b)!==1)a=R.i(1,b-1);
  return{type:"fill",kind:"num",answer:a*k,q:`Completa la igualdad: ${F(a,b)} = ${FQ("?",b*k)}`,hint:`¿Por qué número se multiplicó el denominador ${b} para llegar a ${b*k}?`,
   explain:`El denominador se multiplicó por ${k}; el numerador también: ${a} · ${k} = ${a*k}. Así ${F(a,b)} = ${F(a*k,b*k)}.`}},
 R=>{const pool=R.sh([[1,2],[1,3],[2,3],[1,4],[3,4],[2,5],[3,5],[5,6],[1,5],[4,5]]).slice(0,4),pairs=pool.map(([a,b])=>{const k=R.i(2,5);return[`${a}/${b}`,`${a*k}/${b*k}`]});
  const extra=[];pool.forEach(([a,b])=>{if(extra.length>=2)return;const k=R.i(2,5),n=R.f()<.5?a*k+1:a+k,d=R.f()<.5?b*k:b+k,t=`${n}/${d}`;
    if(!pool.some(([x,y])=>x*d===y*n)&&!pairs.some(p=>p[1]===t)&&!extra.includes(t))extra.push(t)});
  return{type:"match",q:"Arrastra cada fracción junto a su equivalente. Sobran fichas que parecen equivalentes, pero no lo son.",pairs,extra,
   hint:"Busca por qué número se multiplicaron a la vez el numerador y el denominador.",explain:"En cada pareja, el numerador y el denominador se multiplicaron por el mismo número."}},
 R=>{const b=R.i(3,8);let a=R.i(1,b-1);while(gcd(a,b)!==1)a=R.i(1,b-1);const ks=R.sh([2,3,4,5]).slice(0,3);
  return{type:"choice",q:`¿Cuál de estas fracciones <b>no</b> es equivalente a ${F(a,b)}?`,opts:[F(a+2,b+2),...ks.map(k=>F(a*k,b*k))],
   hint:"Comprueba en cada una si el numerador y el denominador se multiplicaron por el mismo número.",explain:`${F(a+2,b+2)} se obtuvo sumando 2 arriba y abajo, y eso cambia el valor. Las otras se obtienen multiplicando por un mismo número.`}}],
R3:[
 R=>{const m=R.i(2,7),n=R.i(m+1,12),k=R.i(1,m-1>0?Math.min(3,m-1):1);
  return{type:"choice",q:`¿Qué fracción es mayor?`,fig:figBars([[k,m,PAL[1],`${k}/${m}`],[k,n,PAL[0],`${k}/${n}`]]),opts:[F(k,m),F(k,n),"Son iguales"],
   hint:"Tienen el mismo numerador. ¿Qué fracción tiene las partes más grandes?",explain:`Con el mismo numerador, es mayor la de denominador menor, porque sus partes son más grandes: ${F(k,m)} &gt; ${F(k,n)}.`}},
 R=>{const seen=new Set(),fr=[];while(fr.length<4){const b=R.i(2,8),a=R.i(1,2*b-1),v=a/b;const key=Math.round(v*1e6);if(v<2&&!seen.has(key)){seen.add(key);fr.push([a,b])}}
  const sorted=fr.slice().sort((x,y)=>x[0]/x[1]-y[0]/y[1]);
  return{type:"order",q:"Ordena de menor a mayor.",items:fr.map(([a,b])=>`${a}/${b}`),correct:sorted.map(([a,b])=>`${a}/${b}`),
   hint:"Compara cada fracción con 1/2 y con 1, o pásalas a un denominador común.",explain:`De menor a mayor: ${sorted.map(([a,b])=>`${a}/${b}`).join(" < ")}.`}},
 R=>{const b=R.p([2,3,4,5,6]);let a=R.i(1,2*b-1);if(a%b===0)a++;
  return{type:"line",q:`Marca ${F(a,b)} en la recta.`,min:0,max:2,den:b,answer:a/b,hint:`Divide cada unidad en ${b} partes iguales y cuenta ${a} desde el cero.`,
   explain:`${F(a,b)}${a>b?` = 1 + ${FR(a-b,b)}`:""}: son ${a} saltos de ${F(1,b)} desde el cero.`}},
 R=>{const q=R.i(3,8),p=q+R.i(1,q-1),props=R.sh([[1,2],[2,3],[3,4],[4,5],[5,7],[3,8],[5,6],[7,9]]).filter(([a,b])=>a/b!==p/q).slice(0,3);
  return{type:"choice",q:"¿Cuál de estas fracciones es mayor que 1?",opts:[F(p,q),...props.map(([a,b])=>F(a,b))],
   hint:"Una fracción es mayor que 1 cuando tiene más partes de las que forman una unidad.",explain:`${F(p,q)} = 1 + ${F(p-q,q)}: su numerador es mayor que su denominador. Las demás son menores que 1.`}},
 R=>{const b=R.i(3,7),a=R.i(1,b-2);
  return{type:"fill",kind:"between",lo:a/b,hi:(a+1)/b,show:`${2*a+1}/${2*b}`,q:`Escribe una fracción que esté entre ${F(a,b)} y ${F(a+1,b)}.`,
   hint:`Pasa las dos a un denominador el doble de grande: ${F(2*a,2*b)} y ${F(2*a+2,2*b)}. ¿Qué fracción queda en medio?`,explain:`Por ejemplo ${F(2*a+1,2*b)}. Entre dos fracciones distintas siempre hay otra: siempre se puede partir más fino. Hay infinitas respuestas válidas.`}}],
R4:[
 R=>{const m=R.i(2,5),n=R.i(m+1,7),num=m+n,den=m*n;
  return{type:"choice",q:`¿Cuánto es ${F(1,m)} + ${F(1,n)}?`,fig:figBars([[1,m,PAL[1],`1/${m}`],[1,n,PAL[0],`1/${n}`]]),opts:[FR(num,den),F(2,m+n),F(2,m*n),F(1,m+n)],
   hint:`Pasa las dos fracciones a denominador ${den}.`,explain:`${F(1,m)} + ${F(1,n)} = ${F(n,den)} + ${F(m,den)} = ${F(num,den)}${gcd(num,den)>1?` = ${FR(num,den)}`:""}. Sumar los denominadores daría ${F(2,m+n)}, que es menor que ${F(1,m)}: no puede ser.`}},
 R=>{let b,d;do{b=R.i(2,8);d=R.i(2,8)}while(b===d);const a=cop(R,b),c=cop(R,d),L=lcm(b,d),s=a*L/b+c*L/d;
  return{type:"fill",kind:"frac",answer:s/L,show:frs(s,L),q:`Calcula ${F(a,b)} + ${F(c,d)}.`,hint:`Pasa las dos a denominador ${L}.`,
   explain:`${F(a,b)} + ${F(c,d)} = ${F(a*L/b,L)} + ${F(c*L/d,L)} = ${F(s,L)}${gcd(s,L)>1?` = ${FR(s,L)}`:""}.`}},
 R=>{let a,b,c,d;do{b=R.i(2,6);d=R.i(2,8);a=cop(R,b);c=cop(R,d)}while(a/b>=c/d||b===d);const L=lcm(b,d),r=a*L/b-c*L/d;
  return{type:"fill",kind:"frac",answer:r/L,show:frs(r,L),q:`Calcula ${F(a,b)} − ${F(c,d)}.`,hint:`Pasa las dos a denominador ${L}. El resultado puede ser negativo.`,
   explain:`${F(a*L/b,L)} − ${F(c*L/d,L)} = ${F(r,L)}${gcd(r,L)>1?` = ${FR(r,L)}`:""}. Es negativo porque ${F(c,d)} es mayor que ${F(a,b)}.`}},
 R=>{const [b,d]=R.sh([2,3,4,5,8]).slice(0,2),a=cop(R,b),c=cop(R,d),L=lcm(b,d),s=a*L/b+c*L/d;
  return{type:"fill",kind:"frac",answer:s/L,show:frs(s,L),q:`Una receta lleva ${F(a,b)} de taza de leche y ${F(c,d)} de taza de agua. ¿Cuánto líquido lleva en total, en tazas?`,
   hint:`Suma las dos fracciones pasándolas a denominador ${L}.`,explain:`${F(a*L/b,L)} + ${F(c*L/d,L)} = ${F(s,L)}${gcd(s,L)>1?` = ${FR(s,L)}`:""} de taza${s>L?", más de una taza":""}.`}},
 R=>{const d=R.p([4,6,8]),h=d/2,a=cop(R,h),c=cop(R,d);const top=2*a+c;
  return{type:"line",q:`Marca en la recta el resultado de ${F(a,h)} + ${F(c,d)}.`,min:0,max:2,den:d,answer:top/d,hint:`${F(a,h)} es lo mismo que ${F(2*a,d)}. Desde ahí, avanza ${c} saltos de ${F(1,d)}.`,
   explain:`${F(a,h)} + ${F(c,d)} = ${F(2*a,d)} + ${F(c,d)} = ${F(top,d)}${gcd(top,d)>1?` = ${FR(top,d)}`:""}.`}}],
R5:[
 R=>{const b=R.i(2,8),a=R.i(1,b-1),k=R.i(2,9),N=b*k;
  return{type:"fill",kind:"num",answer:a*k,q:`¿Cuánto es ${F(a,b)} de ${N}?`,hint:`Primero divide ${N} entre ${b} y después multiplica por ${a}.`,explain:`${N} : ${b} = ${k}, y ${k} · ${a} = ${a*k}.`}},
 R=>{const b=R.i(2,7),d=R.i(2,7),a=cop(R,b),c=cop(R,d);
  return{type:"fill",kind:"frac",answer:a*c/(b*d),show:frs(a*c,b*d),q:`Calcula ${F(a,b)} · ${F(c,d)}.`,hint:"Multiplica numerador por numerador y denominador por denominador.",
   explain:`${F(a,b)} · ${F(c,d)} = ${F(a*c,b*d)}${gcd(a*c,b*d)>1?` = ${FR(a*c,b*d)}`:""}.`}},
 R=>{const b=R.i(3,6),a=R.i(1,b-1),k=R.i(2,6),N=b*k;
  return{type:"choice",q:`¿Qué es mayor: ${N} · ${F(a,b)} o ${N}?`,opts:[`${N}, porque multiplicar por una fracción menor que 1 da menos`,`${N} · ${F(a,b)}, porque multiplicar siempre agranda`,"Son iguales"],
   hint:`${N} · ${F(a,b)} es lo mismo que ${F(a,b)} de ${N}.`,explain:`${N} · ${F(a,b)} = ${a*k}, que es menor que ${N}. Multiplicar por una fracción menor que 1 es tomar solo una parte.`}},
 R=>{const b=R.i(2,6),n=R.i(2,6);
  return{type:"fill",kind:"num",answer:n*b,q:`¿Cuántas veces cabe ${F(1,b)} en ${n}?`,hint:`¿Cuántos ${F(1,b)} hay en una unidad?`,explain:`En una unidad caben ${b}; en ${n} unidades caben ${n*b}. Por eso ${n} : ${F(1,b)} = ${n*b}.`}},
 R=>{const b=R.i(2,6),c=R.i(2,6),d=R.i(c+1,c+5),a=cop(R,b);const dd=gcd(c,d)===1?d:d+1;
  return{type:"fill",kind:"frac",answer:(a*dd)/(b*c),show:frs(a*dd,b*c),q:`Calcula ${F(a,b)} : ${FR(c,dd)}.`,hint:`Dividir por ${FR(c,dd)} es multiplicar por su inversa.`,
   explain:`${F(a,b)} : ${FR(c,dd)} = ${F(a,b)} · ${FR(dd,c)} = ${F(a*dd,b*c)}${gcd(a*dd,b*c)>1?` = ${FR(a*dd,b*c)}`:""}.`}}],
R6:[
 R=>{const x=R.i(2,8),yz=R.i(x*10-9,x*10-1);const big=`0,${x}`,small=`0,${yz}`;
  return{type:"choice",q:`¿Cuál es mayor, ${M(big)} o ${M(small)}?`,opts:[big,small,"Son iguales"],hint:`Escribe los dos con dos cifras decimales: ${big}0 y ${small}.`,
   explain:`${big} = ${big}0, y ${x*10} centésimas son más que ${yz} centésimas. Que ${yz} tenga más cifras no lo hace mayor.`}},
 R=>{const b=R.p([2,4,5,8,10,20,25]);let a=R.i(1,b-1);while(gcd(a,b)!==1)a=R.i(1,b-1);
  return{type:"fill",kind:"num",answer:a/b,show:decs(a/b,3),q:`Escribe ${F(a,b)} como número decimal.`,hint:`Divide ${a} entre ${b}, o busca una fracción equivalente con denominador 10, 100 o 1000.`,
   explain:`${a} : ${b} = ${decs(a/b,3)}.`}},
 R=>{const P=R.p([10,15,20,25,30,40,50,75]),N=20*R.i(2,10),ans=P*N/100;
  return{type:"fill",kind:"num",answer:ans,q:`¿Cuánto es el ${P} % de ${N}?`,hint:`${P} % es ${F(P,100)}: calcula ${F(P,100)} de ${N}.`,explain:`${P} % = ${F(P,100)}. ${N} · ${P} : 100 = ${fmt(ans)}.`}},
 R=>{const b=R.i(1,8);const vals=[b/10,(10*b-5)/100,(100*b-55)/1000,(b+1)/10];const lab=v=>decs(v,3);
  return{type:"order",q:"Ordena de menor a mayor.",items:R.sh(vals).map(lab),correct:vals.slice().sort((x,y)=>x-y).map(lab),
   hint:"Escribe todos con tres cifras decimales y compáralos cifra a cifra.",explain:`${vals.slice().sort((x,y)=>x-y).map(lab).join(" < ")}. Más cifras decimales no quiere decir un número mayor.`}},
 R=>{const n=R.i(15,85),pct=R.f()<.5;
  return{type:"shade",cols:10,rows:10,target:n/100,show:`${n} casillas`,q:pct?`El cuadrado tiene 100 casillas. Sombrea el ${n} % del cuadrado.`:`El cuadrado tiene 100 casillas. Sombrea ${M(decs(n/100))} del cuadrado.`,
   hint:"Cada casilla es la centésima parte del cuadrado: 0,01, es decir, el 1 %. Puedes arrastrar para sombrear varias seguidas.",explain:`${n} % = ${F(n,100)} = ${decs(n/100)}: son ${n} casillas de las 100.`}}]
});

Object.assign(RECAP,{
R1:{map:[0,1,0,2,3],pts:[
  {s:"Repartir en partes iguales",t:"Al repartir a objetos entre b personas, cada una recibe a/b.",ex:"3 chocolatinas entre 4: 3/4 para cada una"},
  {s:"Medir lo muy pequeño",t:"Si n hojas miden e mm, una hoja mide e/n de mm: la fracción mide lo que la regla no alcanza.",ex:"50 hojas miden 3 mm → una mide 3/50 de mm"},
  {s:"Comparar medidas",t:"Para comparar dos papeles se llevan a la misma cantidad de hojas.",ex:"3/40 y 4/60: en 120 hojas, 9 mm y 8 mm"},
  {s:"La fracción es una división",t:"a/b es el resultado exacto de dividir a entre b, y es un solo número.",ex:"3 m entre 4 = 3/4 m"}]},
R2:{map:[0,2,1,1,3],pts:[
  {s:"Muchos nombres para una cantidad",t:"La misma parte de la unidad se puede nombrar con distintas fracciones.",ex:"3/4 = 6/8 = 9/12"},
  {s:"Amplificar",t:"Multiplicar el numerador y el denominador por el mismo número da una fracción equivalente.",ex:"2/5 = 6/15"},
  {s:"Simplificar",t:"Dividir los dos por un divisor común lleva a la fracción irreducible.",ex:"18/24 = 3/4"},
  {s:"Lo que no funciona",t:"Sumar lo mismo arriba y abajo cambia el valor de la fracción.",ex:"1/2 no es igual a 2/3"}]},
R3:{map:[0,1,2,3,2],pts:[
  {s:"Tamaño de las partes",t:"Con el mismo numerador, es mayor la fracción de denominador menor: sus partes son más grandes.",ex:"1/3 > 1/8"},
  {s:"Denominador común",t:"Para comparar fracciones distintas se pasan a un denominador común.",ex:"2/3 = 8/12 < 9/12 = 3/4"},
  {s:"Fracciones en la recta",t:"Cada fracción tiene su lugar en la recta, y entre dos fracciones siempre hay otra.",ex:"entre 1/3 y 2/3 está 1/2"},
  {s:"Mayores que 1",t:"Si el numerador es mayor que el denominador, la fracción es mayor que 1.",ex:"7/4 = 1 + 3/4"}]},
R4:{map:[0,1,2,1,3],pts:[
  {s:"No se suman denominadores",t:"Solo se suman directamente partes del mismo tamaño.",ex:"1/2 + 1/3 = 5/6, no 2/5"},
  {s:"Denominador común",t:"Se pasan las fracciones a un denominador común y luego se suman los numeradores.",ex:"3/4 + 2/3 = 9/12 + 8/12 = 17/12"},
  {s:"Restas con resultado negativo",t:"Si se resta una fracción mayor, el resultado es negativo: las reglas de los enteros siguen valiendo.",ex:"1/3 − 3/4 = −5/12"},
  {s:"Sumar en la recta",t:"Sumar una fracción es avanzar en la recta tantos saltos como indica.",ex:"1/2 + 1/4 = 3/4"}]},
R5:{map:[0,1,2,3,3],pts:[
  {s:"Fracción de una cantidad",t:"Tomar a/b de una cantidad es dividirla entre b y multiplicar por a.",ex:"3/4 de 20 = 15"},
  {s:"Producto de fracciones",t:"Se multiplica numerador por numerador y denominador por denominador; el área de un rectángulo lo muestra.",ex:"2/3 · 3/5 = 6/15 = 2/5"},
  {s:"Multiplicar no siempre agranda",t:"Multiplicar por una fracción menor que 1 da un resultado más pequeño.",ex:"12 · 2/3 = 8"},
  {s:"Dividir es ver cuántas veces cabe",t:"Dividir por una fracción equivale a multiplicar por su inversa.",ex:"3 : 1/4 = 12"}]},
R6:{map:[2,0,1,2,3],pts:[
  {s:"Decimales y fracciones",t:"Un decimal es una fracción de denominador 10, 100 o 1000.",ex:"0,75 = 75/100 = 3/4"},
  {s:"Porcentajes",t:"Un porcentaje es una fracción de 100.",ex:"15 % de 80 = 80 · 15 : 100 = 12"},
  {s:"Comparar decimales",t:"Para comparar decimales se igualan las cifras: más cifras no significa más grande.",ex:"0,3 = 0,30 > 0,25"},
  {s:"Ver las centésimas",t:"En un cuadrado de 100 casillas, cada casilla es 0,01, es decir, el 1 %.",ex:"37 casillas = 0,37 = 37 %"}]}
});

/* ---------- exploraciones ---------- */
Object.assign(EXPLORE,{
rReparto(host){let c=3,p=4,paper="A",n=40;const PAP={A:[3,50],B:[2,25],C:[1,20]};const found={A:[],B:[],C:[]};
  host.innerHTML=`<div class="xp"><h4>Repartir</h4><div class="ctrl"><label for="rc">Chocolatinas: <output class="m" id="rco">3</output></label><input type="range" id="rc" min="1" max="5" value="3"><label for="rp">Personas: <output class="m" id="rpo">4</output></label><input type="range" id="rp" min="2" max="6" value="4"></div>
   <div class="svgwrap"><svg id="rsv1" role="img" aria-label="Chocolatinas partidas y repartidas entre personas" style="max-width:520px"></svg></div><div class="readout" id="rr1"></div>
   <h4 style="margin-top:8px">Medir</h4><p class="tip">La regla solo marca milímetros enteros. Cambia la cantidad de hojas hasta que el paquete mida un número exacto de milímetros.</p>
   <div class="ctrl"><span class="seg" role="group" aria-label="Tipo de papel">${["A","B","C"].map(k=>`<button class="btn sm" data-pp="${k}">Papel ${k}</button>`).join("")}</span><label for="rn">Hojas: <output class="m" id="rno">40</output></label><input type="range" id="rn" min="5" max="200" step="5" value="40"></div>
   <div class="paperrow"><div class="svgwrap"><svg id="rsv2" viewBox="0 0 230 236" role="img" aria-label="Paquete de hojas junto a una regla en milímetros"></svg></div><div class="readout" id="rr2"></div></div></div>`;
  const draw1=()=>{const W=360,h=24,x0=110;let y=8,g="";
    for(let k=0;k<c;k++){for(let i=0;i<p;i++)g+=`<rect x="${x0+i*W/p}" y="${y}" width="${W/p}" height="${h}" fill="${PAL[i%PAL.length]}" fill-opacity="${i===0?1:.28}" stroke="var(--surface)" stroke-width="2"/>`;
      g+=`<rect x="${x0}" y="${y}" width="${W}" height="${h}" fill="none" stroke="var(--muted)"/><text x="${x0-10}" y="${y+h/2+5}" text-anchor="end" style="font:600 12px var(--f-disp);fill:var(--muted)">chocolatina ${k+1}</text>`;y+=h+8}
    y+=8;const bars=Math.ceil(c/p);let left=c;
    for(let k=0;k<bars;k++){const take=Math.min(p,left);left-=take;for(let i=0;i<p;i++)g+=`<rect x="${x0+i*W/p}" y="${y}" width="${W/p}" height="${h}" fill="${i<take?PAL[0]:"var(--surface-2)"}" stroke="var(--surface)" stroke-width="2"/>`;
      g+=`<rect x="${x0}" y="${y}" width="${W}" height="${h}" fill="none" stroke="var(--ink)" stroke-width="1.5"/><text x="${x0-10}" y="${y+h/2+5}" text-anchor="end" style="font:700 12px var(--f-disp);fill:var(--ink)">${k===0?"persona 1":""}</text>`;y+=h+8}
    const svg=$("#rsv1",host);svg.setAttribute("viewBox",`0 0 ${x0+W+10} ${y}`);svg.innerHTML=g;
    $("#rr1",host).innerHTML=`<span class="k">Lo que recibe cada persona</span>${c} trozo${c>1?"s":""} de ${F(1,p)}: ${F(c,p)} de chocolatina${gcd(c,p)>1?` = ${FR(c,p)}`:""}${c>p?` (más de una entera: ${Math.floor(c/p)}${c%p?" y "+F(c%p,p):""})`:""}<br><span class="k">Como división</span>${c} : ${p} = ${F(c,p)}`};
  const draw2=()=>{const [a,b]=PAP[paper],mm=n*a/b,ex=Number.isInteger(mm),k=12,y0=220,x0=150;let g="";
    for(let v=0;v<=17;v++)g+=`<line x1="${x0}" y1="${y0-v*k}" x2="${x0+(v%2?8:14)}" y2="${y0-v*k}" stroke="var(--muted)"/>${v%2===0?`<text x="${x0+18}" y="${y0-v*k+4}" style="font:11px var(--f-mono);fill:var(--muted)">${v}</text>`:""}`;
    g+=`<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0-17*k}" stroke="var(--muted)" stroke-width="1.5"/><text x="${x0+18}" y="12" style="font:600 11px var(--f-disp);fill:var(--muted)">mm</text>`;
    const H=mm*k;g+=`<rect x="50" y="${y0-H}" width="90" height="${H}" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.2"/>`;
    if(n<=60)for(let i=1;i<n;i++)g+=`<line x1="50" y1="${y0-H*i/n}" x2="140" y2="${y0-H*i/n}" stroke="var(--rule)" stroke-width=".7"/>`;
    g+=`<line x1="44" y1="${y0-H}" x2="${x0}" y2="${y0-H}" stroke="${ex?"var(--ok)":"var(--l-rac)"}" stroke-width="2" stroke-dasharray="${ex?"":"4 3"}"/><text x="46" y="${y0-H-6}" style="font:700 12px var(--f-mono);fill:${ex?"var(--ok)":"var(--l-rac)"}">${n} hojas</text>`;
    $("#rsv2",host).innerHTML=g;
    if(ex&&!found[paper].some(f=>f[0]===n))found[paper].push([n,mm]);found[paper].sort((x,y)=>x[0]-y[0]);
    $$("[data-pp]",host).forEach(bt=>bt.setAttribute("aria-current",bt.dataset.pp===paper?"page":"false"));
    const lst=found[paper];
    $("#rr2",host).innerHTML=(ex?`<span class="k">Medida exacta</span>El paquete mide justo ${mm} mm. Una hoja mide ${F(mm,n)} de mm${gcd(mm,n)>1?` = ${FR(mm,n)} de mm`:""}.`:`<span class="k">Sin medida exacta</span>El paquete mide entre ${Math.floor(mm)} y ${Math.floor(mm)+1} mm: la regla no da un número entero. Prueba con otra cantidad de hojas.`)+
      `<br><span class="k">Medidas exactas del papel ${paper}</span>${lst.length?lst.map(([h,m])=>`${h} hojas → ${m} mm`).join("; "):"todavía ninguna"}`+
      (lst.length>1?`<br><span class="k">Lo que descubres</span>${lst.map(([h,m])=>F(m,h)).join(" = ")}: todas las parejas dan el mismo grosor de hoja.`:"")};
  const sync=()=>{$("#rco",host).textContent=c;$("#rpo",host).textContent=p;$("#rno",host).textContent=n;draw1();draw2()};
  $("#rc",host).oninput=e=>{c=+e.target.value;sync()};$("#rp",host).oninput=e=>{p=+e.target.value;sync()};$("#rn",host).oninput=e=>{n=+e.target.value;$("#rno",host).textContent=n;draw2()};
  $$("[data-pp]",host).forEach(bt=>bt.onclick=()=>{paper=bt.dataset.pp;draw2()});sync()},

rEquiv(host){let a=2,b=3,k=2;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ea">Numerador: <output class="m" id="eao">2</output></label><input type="range" id="ea" min="1" max="9" value="2"><label for="eb">Denominador: <output class="m" id="ebo">3</output></label><input type="range" id="eb" min="2" max="10" value="3"></div>
   <div class="ctrl"><label for="ek">Multiplicar arriba y abajo por: <output class="m" id="eko">2</output></label><input type="range" id="ek" min="1" max="6" value="2"></div>
   <div class="svgwrap"><svg id="esv" role="img" aria-label="Barras de fracciones equivalentes" style="max-width:560px"></svg></div><div class="readout" id="err"></div></div>`;
  const draw=()=>{if(a>b)a=b;const [ra,rb]=red(a,b);const rows=[[a,b,PAL[1]],[a*k,b*k,PAL[5]]];if(rb!==b)rows.push([ra,rb,PAL[3]]);
    const W=420,h=28,x0=86;let y=10,g="";rows.forEach(([p,q,col])=>{for(let i=0;i<q;i++)g+=`<rect x="${x0+i*W/q}" y="${y}" width="${W/q}" height="${h}" fill="${i<p?col:"var(--surface-2)"}" stroke="var(--surface)" stroke-width="${q>30?.6:2}"/>`;
      g+=`<rect x="${x0}" y="${y}" width="${W}" height="${h}" fill="none" stroke="var(--muted)"/><text x="${x0-10}" y="${y+h/2+5}" text-anchor="end" style="font:700 15px var(--f-mono);fill:var(--ink)">${p}/${q}</text>`;y+=h+14});
    const xe=x0+W*a/b;g+=`<line x1="${xe}" y1="2" x2="${xe}" y2="${y-6}" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 4"/>`;
    const svg=$("#esv",host);svg.setAttribute("viewBox",`0 0 ${x0+W+12} ${y}`);svg.innerHTML=g;
    $("#err",host).innerHTML=`<span class="k">Amplificar por ${k}</span>${F(a,b)} = ${F(a*k,b*k)}${k>1?`: cada trozo se partió en ${k}, así que hay ${k} veces más trozos y cada uno es ${k} veces más pequeño.`:""}`+
      (rb!==b?`<br><span class="k">Simplificar</span>${F(a,b)} = ${F(ra,rb)}, dividiendo arriba y abajo entre ${b/rb}. ${F(ra,rb)} es la fracción irreducible.`:`<br><span class="k">Irreducible</span>${F(a,b)} ya no se puede simplificar: ${a} y ${b} no tienen divisores comunes.`)+
      `<br><span class="k">La línea discontinua</span>marca dónde acaba la parte sombreada: es el mismo punto en todas las barras.`;
    [["ea",a],["eb",b],["ek",k]].forEach(([id,v])=>{$("#"+id,host).value=v;$("#"+id+"o",host).textContent=v});$("#ea",host).max=b};
  $("#ea",host).oninput=e=>{a=+e.target.value;draw()};$("#eb",host).oninput=e=>{b=+e.target.value;draw()};$("#ek",host).oninput=e=>{k=+e.target.value;draw()};draw()},

rOrden(host){let n1=3,d1=4,n2=2,d2=3;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="o1n">Primera: <output class="m" id="o1no">3</output> / <output class="m" id="o1do">4</output></label><input type="range" id="o1n" min="0" max="8" value="3"><input type="range" id="o1d" min="1" max="10" value="4" aria-label="Denominador de la primera"></div>
   <div class="ctrl"><label for="o2n">Segunda: <output class="m" id="o2no">2</output> / <output class="m" id="o2do">3</output></label><input type="range" id="o2n" min="0" max="6" value="2"><input type="range" id="o2d" min="1" max="10" value="3" aria-label="Denominador de la segunda"></div>
   <div class="svgwrap nl"><svg id="osv2" viewBox="0 0 640 150" role="img" aria-label="Recta del 0 al 2 con las dos fracciones"></svg></div><div class="readout" id="orr2"></div></div>`;
  const X=v=>40+v/2*560;
  const draw=()=>{n1=Math.min(n1,2*d1);n2=Math.min(n2,2*d2);let g=`<line x1="30" y1="75" x2="610" y2="75" stroke="var(--rule)" stroke-width="2"/>`;
    for(let v=0;v<=2;v++)g+=`<line x1="${X(v)}" y1="62" x2="${X(v)}" y2="88" stroke="var(--ink)" stroke-width="2"/><text x="${X(v)}" y="108" text-anchor="middle" style="font:700 14px var(--f-mono);fill:var(--ink)">${v}</text>`;
    for(let k=0;k<=2*d1;k++)g+=`<line x1="${X(k/d1)}" y1="64" x2="${X(k/d1)}" y2="75" stroke="var(--l-ent)" stroke-width="1.5"/>`;
    for(let k=0;k<=2*d2;k++)g+=`<line x1="${X(k/d2)}" y1="75" x2="${X(k/d2)}" y2="86" stroke="var(--l-rac)" stroke-width="1.5"/>`;
    g+=`<circle cx="${X(n1/d1)}" cy="75" r="8" fill="var(--l-ent)"/><text x="${X(n1/d1)}" y="44" text-anchor="middle" style="font:700 15px var(--f-mono);fill:var(--l-ent)">${n1}/${d1}</text>`;
    g+=`<circle cx="${X(n2/d2)}" cy="75" r="8" fill="var(--l-rac)" fill-opacity=".9"/><text x="${X(n2/d2)}" y="132" text-anchor="middle" style="font:700 15px var(--f-mono);fill:var(--l-rac)">${n2}/${d2}</text>`;
    $("#osv2",host).innerHTML=g;const L=lcm(d1,d2),A=n1*L/d1,B=n2*L/d2,sym=A>B?"&gt;":A<B?"&lt;":"=";
    $("#orr2",host).innerHTML=`<span class="k">Con denominador común ${L}</span>${F(n1,d1)} = ${F(A,L)} y ${F(n2,d2)} = ${F(B,L)}<br><span class="k">Resultado</span>${F(n1,d1)} ${sym} ${F(n2,d2)}${A===B?": son equivalentes, caen en el mismo punto.":""}<br><span class="k">Las marcas</span>arriba, los saltos de ${F(1,d1)}; abajo, los de ${F(1,d2)}. Cuanto mayor es el denominador, más cortos son los saltos.`;
    [["o1n",n1,2*d1],["o2n",n2,2*d2]].forEach(([id,v,mx])=>{$("#"+id,host).max=mx;$("#"+id,host).value=v});$("#o1no",host).textContent=n1;$("#o1do",host).textContent=d1;$("#o2no",host).textContent=n2;$("#o2do",host).textContent=d2};
  $("#o1n",host).oninput=e=>{n1=+e.target.value;draw()};$("#o1d",host).oninput=e=>{d1=+e.target.value;draw()};$("#o2n",host).oninput=e=>{n2=+e.target.value;draw()};$("#o2d",host).oninput=e=>{d2=+e.target.value;draw()};draw()},

rSuma(host){let a=1,b=2,c=1,d=3,common=false;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="sa">Primera: <output class="m" id="sao">1</output> / <output class="m" id="sbo">2</output></label><input type="range" id="sa" min="1" max="2" value="1"><input type="range" id="sb" min="2" max="8" value="2" aria-label="Denominador de la primera"></div>
   <div class="ctrl"><label for="sc">Segunda: <output class="m" id="sco">1</output> / <output class="m" id="sdo">3</output></label><input type="range" id="sc" min="1" max="3" value="1"><input type="range" id="sd" min="2" max="8" value="3" aria-label="Denominador de la segunda"></div>
   <div class="fillrow"><button class="btn sm primary" id="scom">Pasar a denominador común</button><span class="tip">Así los trozos se vuelven del mismo tamaño.</span></div>
   <div class="svgwrap"><svg id="ssv" role="img" aria-label="Barras de la suma de fracciones" style="max-width:560px"></svg></div><div class="readout" id="srr"></div></div>`;
  const draw=()=>{a=Math.min(a,b);c=Math.min(c,d);const L=lcm(b,d),A=a*L/b,C=c*L/d,S=A+C;const W=420,h=26,x0=96;let y=10,g="";
    const bar=(cells,q,label,fills)=>{for(let i=0;i<q;i++)g+=`<rect x="${x0+i*W/q}" y="${y}" width="${W/q}" height="${h}" fill="${fills(i)}" stroke="var(--surface)" stroke-width="${q>24?.8:2}"/>`;
      g+=`<rect x="${x0}" y="${y}" width="${W}" height="${h}" fill="none" stroke="var(--muted)"/><text x="${x0-10}" y="${y+h/2+5}" text-anchor="end" style="font:700 14px var(--f-mono);fill:var(--ink)">${label}</text>`;y+=h+12};
    if(!common){bar(a,b,`${a}/${b}`,i=>i<a?PAL[1]:"var(--surface-2)");bar(c,d,`${c}/${d}`,i=>i<c?PAL[0]:"var(--surface-2)")}
    else{bar(A,L,`${A}/${L}`,i=>i<A?PAL[1]:"var(--surface-2)");bar(C,L,`${C}/${L}`,i=>i<C?PAL[0]:"var(--surface-2)");y+=6;
      for(let u=0;u<Math.ceil(S/L);u++)bar(0,L,u===0?"suma":"",i=>{const j=u*L+i;return j<A?PAL[1]:j<S?PAL[0]:"var(--surface-2)"})}
    const svg=$("#ssv",host);svg.setAttribute("viewBox",`0 0 ${x0+W+12} ${y}`);svg.innerHTML=g;
    $("#scom",host).textContent=common?"Volver a las fracciones originales":"Pasar a denominador común";
    $("#srr",host).innerHTML=`<span class="k">Denominador común</span>${L}, porque es múltiplo de ${b} y de ${d}<br><span class="k">Suma</span>${F(a,b)} + ${F(c,d)} = ${F(A,L)} + ${F(C,L)} = ${F(S,L)}${gcd(S,L)>1?` = ${FR(S,L)}`:""}${S>L?` (más de una unidad)`:""}<br><span class="k">Resta</span>${F(a,b)} − ${F(c,d)} = ${F(A,L)} − ${F(C,L)} = ${FR(A-C,L)}`;
    [["sa",a,b],["sc",c,d]].forEach(([id,v,mx])=>{$("#"+id,host).max=mx;$("#"+id,host).value=v});$("#sao",host).textContent=a;$("#sbo",host).textContent=b;$("#sco",host).textContent=c;$("#sdo",host).textContent=d};
  $("#sa",host).oninput=e=>{a=+e.target.value;draw()};$("#sb",host).oninput=e=>{b=+e.target.value;draw()};$("#sc",host).oninput=e=>{c=+e.target.value;draw()};$("#sd",host).oninput=e=>{d=+e.target.value;draw()};
  $("#scom",host).onclick=()=>{common=!common;draw()};draw()},

rProducto(host){let a=2,b=3,c=3,d=5,fp=3,fq=4,fk=5;
  host.innerHTML=`<div class="xp"><h4>Producto de dos fracciones</h4><div class="ctrl"><label for="pa">Base: <output class="m" id="pao">2</output> / <output class="m" id="pbo">3</output></label><input type="range" id="pa" min="1" max="3" value="2"><input type="range" id="pb" min="1" max="8" value="3" aria-label="Denominador de la base"></div>
   <div class="ctrl"><label for="pc">Altura: <output class="m" id="pco">3</output> / <output class="m" id="pdo">5</output></label><input type="range" id="pc" min="1" max="5" value="3"><input type="range" id="pd" min="1" max="8" value="5" aria-label="Denominador de la altura"></div>
   <div class="paperrow"><div class="svgwrap"><svg id="psv" viewBox="0 0 300 300" role="img" aria-label="Cuadrado unidad con la parte común sombreada" style="max-width:320px"></svg></div><div class="readout" id="prr"></div></div>
   <h4 style="margin-top:8px">Fracción de una cantidad</h4><div class="ctrl"><label for="fp">Fracción: <output class="m" id="fpo">3</output> / <output class="m" id="fqo">4</output></label><input type="range" id="fp" min="1" max="4" value="3"><input type="range" id="fq" min="2" max="6" value="4" aria-label="Denominador"><label for="fk">Puntos por grupo: <output class="m" id="fko">5</output></label><input type="range" id="fk" min="1" max="8" value="5"></div>
   <div class="svgwrap"><svg id="fsv" role="img" aria-label="Puntos agrupados" style="max-width:560px"></svg></div><div class="readout" id="frr"></div></div>`;
  const draw=()=>{a=Math.min(a,b);c=Math.min(c,d);const S=270,o=15;let g="";
    for(let i=0;i<b;i++)for(let j=0;j<d;j++){const x=o+i*S/b,y=o+S-(j+1)*S/d,inA=i<a,inC=j<c;g+=`<rect x="${x}" y="${y}" width="${S/b}" height="${S/d}" fill="${inA&&inC?"var(--l-ent)":inA?"var(--add)":inC?"var(--corner)":"var(--surface)"}" stroke="var(--muted)" stroke-width=".8"/>`}
    g+=`<rect x="${o}" y="${o}" width="${S}" height="${S}" fill="none" stroke="var(--ink)" stroke-width="2"/>`;$("#psv",host).innerHTML=g;
    $("#prr",host).innerHTML=`<span class="k">Casillas</span>el cuadrado queda partido en ${b} · ${d} = ${b*d} casillas iguales<br><span class="k">Parte común</span>${a} · ${c} = ${a*c} casillas (azul)<br><span class="k">Producto</span>${F(a,b)} · ${F(c,d)} = ${F(a*c,b*d)}${gcd(a*c,b*d)>1?` = ${FR(a*c,b*d)}`:""}<br><span class="k">Colores</span>verde: ${F(a,b)} de la base · amarillo: ${F(c,d)} de la altura · azul: las dos cosas a la vez`;
    fp=Math.min(fp,fq);const N=fq*fk,r=5,sp=16;let h="",x=10;
    for(let gi=0;gi<fq;gi++){const on=gi<fp,cols=Math.min(fk,4),rows=Math.ceil(fk/cols);h+=`<rect x="${x-4}" y="4" width="${cols*sp+4}" height="${rows*sp+8}" rx="6" fill="${on?"var(--ok-bg)":"none"}" stroke="${on?"var(--ok)":"var(--rule)"}"/>`;
      for(let k=0;k<fk;k++)h+=`<circle cx="${x+6+(k%cols)*sp}" cy="${16+Math.floor(k/cols)*sp}" r="${r}" fill="${on?"var(--ok)":"var(--muted)"}"/>`;x+=cols*sp+14}
    const fsv=$("#fsv",host);fsv.setAttribute("viewBox",`0 0 ${x} ${Math.ceil(fk/Math.min(fk,4))*sp+16}`);fsv.innerHTML=h;
    $("#frr",host).innerHTML=`<span class="k">${F(fp,fq)} de ${N}</span>${N} puntos en ${fq} grupos iguales de ${fk}; se toman ${fp} grupos: ${N} : ${fq} · ${fp} = ${fk*fp}<br><span class="k">Como producto</span>${N} · ${F(fp,fq)} = ${fk*fp}${fp<fq?`, menos que ${N}: multiplicar por una fracción menor que 1 achica`:""}`;
    [["pa",a,b],["pc",c,d],["fp",fp,fq]].forEach(([id,v,mx])=>{$("#"+id,host).max=mx;$("#"+id,host).value=v});
    $("#pao",host).textContent=a;$("#pbo",host).textContent=b;$("#pco",host).textContent=c;$("#pdo",host).textContent=d;$("#fpo",host).textContent=fp;$("#fqo",host).textContent=fq;$("#fko",host).textContent=fk};
  [["pa",v=>a=v],["pb",v=>b=v],["pc",v=>c=v],["pd",v=>d=v],["fp",v=>fp=v],["fq",v=>fq=v],["fk",v=>fk=v]].forEach(([id,f])=>$("#"+id,host).oninput=e=>{f(+e.target.value);draw()});draw()},

rCentesimas(host){const on=new Array(100).fill(false);for(let i=0;i<37;i++)on[i]=true;let paint=null,t=3,hu=25;
  host.innerHTML=`<div class="xp"><div class="paperrow"><div class="svgwrap"><svg id="csv" class="shadesvg" viewBox="0 0 304 304" role="img" aria-label="Cuadrado de 100 casillas para sombrear" style="max-width:320px"></svg></div><div class="readout" id="crr"></div></div>
   <div class="fillrow"><button class="btn sm" id="cclr">Borrar todo</button><span class="tip">Toca o arrastra para sombrear casillas.</span></div>
   <h4 style="margin-top:8px">Décimas contra centésimas</h4><div class="ctrl"><label for="ct">Décimas: <output class="m" id="cto">0,3</output></label><input type="range" id="ct" min="0" max="10" value="3"><label for="ch">Centésimas: <output class="m" id="cho">0,25</output></label><input type="range" id="ch" min="0" max="100" value="25"></div>
   <div class="paperrow"><div class="svgwrap"><svg id="cvs" viewBox="0 0 330 160" role="img" aria-label="Dos cuadrados para comparar decimales" style="max-width:360px"></svg></div><div class="readout" id="cvr"></div></div></div>`;
  const svg=$("#csv",host),cs=30;
  const draw=()=>{let g="";for(let k=0;k<100;k++){const x=2+(k%10)*cs,y=2+Math.floor(k/10)*cs;g+=`<rect x="${x}" y="${y}" width="${cs}" height="${cs}" fill="${on[k]?"var(--l-rac)":"var(--surface)"}" stroke="var(--muted)" stroke-width=".8"/>`}
    g+=`<rect x="2" y="2" width="300" height="300" fill="none" stroke="var(--ink)" stroke-width="2"/>`;svg.innerHTML=g;const n=on.filter(Boolean).length;
    $("#crr",host).innerHTML=`<span class="k">Casillas</span>${n} de 100<br><span class="k">Fracción</span>${F(n,100)}${gcd(n,100)>1&&n?` = ${FR(n,100)}`:""}<br><span class="k">Decimal</span>${decs(n/100)}<br><span class="k">Porcentaje</span>${n} %`};
  const cellAt=p=>{const c=Math.floor((p.x-2)/cs),r=Math.floor((p.y-2)/cs);return c>=0&&c<10&&r>=0&&r<10?r*10+c:-1};
  dragOn(svg,{down:p=>{const k=cellAt(p);if(k<0)return false;paint=!on[k];on[k]=paint;draw()},move:p=>{const k=cellAt(p);if(k>=0&&on[k]!==paint){on[k]=paint;draw()}}});
  $("#cclr",host).onclick=()=>{on.fill(false);draw()};
  const drawV=()=>{let g="";const sq=(x0,n,col)=>{for(let k=0;k<100;k++){const x=x0+(k%10)*14,y=8+Math.floor(k/10)*14;g+=`<rect x="${x}" y="${y}" width="14" height="14" fill="${k<n?col:"var(--surface)"}" stroke="var(--rule)" stroke-width=".6"/>`}g+=`<rect x="${x0}" y="8" width="140" height="140" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`};
    sq(10,t*10,"var(--l-ent)");sq(180,hu,"var(--l-rac)");$("#cvs",host).innerHTML=g;const A=t*10,sym=A>hu?"&gt;":A<hu?"&lt;":"=";
    $("#cvr",host).innerHTML=`<span class="k">Comparación</span>${decs(t/10)} ${sym} ${decs(hu/100)}<br><span class="k">Con dos cifras decimales</span>${(t/10).toFixed(2).replace(".",",")} y ${(hu/100).toFixed(2).replace(".",",")}: ${A} centésimas frente a ${hu}<br><span class="k">En los cuadrados</span>cada décima es una fila entera de 10 casillas`;
    $("#cto",host).textContent=decs(t/10);$("#cho",host).textContent=decs(hu/100)};
  $("#ct",host).oninput=e=>{t=+e.target.value;drawV()};$("#ch",host).oninput=e=>{hu=+e.target.value;drawV()};draw();drawV()}
});
