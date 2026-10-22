"use strict";
/* ============ Línea 6: Funciones de variable real · F1–F8 (F9 y F10 están en expolog.js) ============ */

const pw=rows=>`<span class="pw"><span class="pwb" aria-hidden="true">{</span><span class="pwl">${rows.map(([e,c])=>`<span>${e}</span><span>si ${c}</span>`).join("")}</span></span>`;
const linT=(m,b)=>poly([[m,"x"],[b,""]]);
const quadT=(a,b,c)=>poly([[a,"x²"],[b,"x"],[c,""]]);
const IV=(a,b,ca,cb)=>ivl(a,b,ca,cb);
/* Catálogo de funciones para exploraciones */
const FCAT={
  lin:{t:"2x + 3",f:x=>2*x+3},cuad:{t:"x²",f:x=>x*x},rest:{t:"10 − x",f:x=>10-x},mitad:{t:"x / 2",f:x=>x/2},abs:{t:"|x|",f:x=>Math.abs(x)},cub:{t:"x³",f:x=>x*x*x},
  raiz:{t:"√x",f:x=>x>=0?Math.sqrt(x):NaN},inv:{t:"1 / x",f:x=>x!==0?1/x:NaN}};

Object.assign(NODES,{
F1:{title:"¿Qué es una función?",sub:"Una regla que a cada entrada le asigna una sola salida.",
 info:`<p class="lead">Una <b>función</b> es una regla que a cada valor de una cantidad, la <b>variable independiente</b> x, le asigna <b>exactamente un</b> valor de otra, la <b>variable dependiente</b> y. Se escribe y = f(x) y se lee «f de x».</p>
 <div class="ex-box"><span class="eyebrow">Ejemplos</span><p>El área de un cuadrado depende de su lado: ${M("A(l) = l²")}. El lado es la variable independiente y el área, la dependiente: A(3) = 9.</p>
 <p>Si f(x) = 2x + 3, entonces f(4) = 2 · 4 + 3 = 11 y f(−1) = 2 · (−1) + 3 = 1. Se sustituye x por el número, con paréntesis si es negativo.</p></div>
 <div class="ex-box"><span class="eyebrow">Tres maneras de dar una función</span><p>Con una <b>fórmula</b> (f(x) = 2x + 3), con una <b>tabla</b> de valores o con una <b>gráfica</b>. También con palabras: «a cada estudiante, su fecha de nacimiento».</p>
 ${figTable(["x","−1","0","1","2","4"],[["f(x) = 2x + 3","1","3","5","7","11"]])}</div>
 <div class="ex-box"><span class="eyebrow">¿Qué no es una función?</span><p>Si a alguna entrada le corresponden dos salidas distintas, no hay función. «A cada número, sus divisores» no es función: al 6 le corresponden 1, 2, 3 y 6. Tampoco la tabla en la que x = 1 aparece con y = 3 y con y = 4.</p>
 <p>En cambio, sí puede pasar que dos entradas tengan la misma salida: con f(x) = x², f(2) = f(−2) = 4, y es función.</p></div>
 <div class="callout"><span class="eyebrow">f(x) no es f por x</span><p>Los paréntesis de f(x) no significan multiplicación: f(3) es «lo que la regla f produce con 3».</p></div>`,
 explore:{intro:"La máquina recibe una entrada x y devuelve f(x). Elige la regla, cambia la entrada y mira cómo se llena la tabla y aparecen los puntos.",fn:"fMaquina"},
 key:"Una función asigna a cada x de su dominio exactamente un valor f(x). x es la variable independiente; y = f(x), la dependiente.",
 ojo:"Dos entradas pueden tener la misma salida, pero una entrada no puede tener dos salidas."},

F2:{title:"Dominio y rango",sub:"Qué entradas acepta una función y qué salidas produce.",
 info:`<p class="lead">El <b>dominio</b> de una función es el conjunto de valores de x para los que f(x) tiene sentido. El <b>rango</b> (también llamado recorrido o imagen) es el conjunto de valores que toma f(x).</p>
 <div class="ex-box"><span class="eyebrow">Encontrar el dominio con la fórmula</span>
 ${figTable(["Función","Restricción","Dominio"],[["f(x) = 2x + 1","ninguna","ℝ"],["f(x) = 1 / (x − 2)","no se puede dividir entre 0: x ≠ 2","ℝ − {2}"],["f(x) = √(x − 3)","no hay raíz cuadrada real de un negativo: x − 3 ≥ 0","[3, +∞)"],["A(l) = l²  (área)","un lado mide más que 0","(0, +∞)"]])}</div>
 <div class="ex-box"><span class="eyebrow">El rango</span><p>f(x) = x² nunca es negativa y toma cualquier valor a partir de 0: su rango es [0, +∞). f(x) = x² + 3 tiene rango [3, +∞). f(x) = 2x + 1 puede dar cualquier número: su rango es ℝ. f(x) = 1 / x nunca vale 0: su rango es ℝ − {0}.</p></div>
 <div class="ex-box"><span class="eyebrow">En la gráfica</span><p>El dominio es la «sombra» de la gráfica sobre el eje x y el rango, su sombra sobre el eje y. Un punto lleno indica que el extremo se incluye; un punto vacío, que no.</p>
 <div class="exfig">${plot({xmin:-3,xmax:5,ymin:-2,ymax:5,w:360,equal:true,xstep:1,ystep:1,axes:true,segs:[{x1:-1,y1:1,x2:3,y2:4,color:"var(--l-fun)",width:3},{x1:-1,y1:-.15,x2:3,y2:-.15,color:"var(--l-ent)",width:6,op:.6},{x1:-.15,y1:1,x2:-.15,y2:4,color:"var(--l-rac)",width:6,op:.6}],pts:[{x:-1,y:1,color:"var(--l-fun)"},{x:3,y:4,open:true,color:"var(--l-fun)"}],labels:[{x:.2,y:-1.2,text:"dominio [−1, 3)",color:"var(--l-ent)"},{x:-2.9,y:4.5,text:"rango [1, 4)",color:"var(--l-rac)"}],aria:"Dominio y rango de un segmento"})}</div></div>
 <div class="callout"><span class="eyebrow">Dos restricciones típicas</span><p>Denominadores distintos de 0 y raíces cuadradas de números mayores o iguales que 0. Si aparecen las dos, se cumplen las dos a la vez.</p></div>`,
 explore:{intro:"Elige una función. Las franjas de colores muestran su dominio (sobre el eje x) y su rango (sobre el eje y). Restringe el dominio con los deslizadores y mira cómo cambia el rango.",fn:"fDomRan"},
 key:"Dominio: las x permitidas (sin dividir entre 0, sin raíces de negativos, con sentido en el contexto). Rango: los valores que toma f(x).",
 ojo:"√(x − 3) exige x ≥ 3, con el 3 incluido; 1 / (x − 3) excluye solo el 3."},

F3:{title:"La gráfica de una función",sub:"Ver una función de un vistazo.",
 info:`<p class="lead">La <b>gráfica</b> de f es el conjunto de puntos (x, f(x)) del plano. Para dibujarla a mano se hace una tabla de valores y se unen los puntos.</p>
 <div class="ex-box"><span class="eyebrow">Qué se lee en una gráfica</span><ul><li>f(a) es la altura de la gráfica sobre x = a.</li><li>El corte con el eje y es (0, f(0)).</li><li>Los <b>ceros</b> son las x donde f(x) = 0: los cortes con el eje x.</li><li>Dónde <b>crece</b> (sube de izquierda a derecha), dónde <b>decrece</b> y dónde alcanza un <b>máximo</b> o un <b>mínimo</b>.</li></ul>
 <div class="exfig">${plot({xmin:-3,xmax:5,ymin:-5,ymax:3,w:360,equal:true,xstep:1,ystep:1,axes:true,fns:[{f:x=>x*x-2*x-3,color:"var(--l-fun)"}],pts:[{x:-1,y:0,label:"cero"},{x:3,y:0,label:"cero"},{x:0,y:-3,label:"(0, −3)"},{x:1,y:-4,label:"mínimo (1, −4)",color:"var(--l-fun)"}],aria:"Parábola con sus ceros y su mínimo"})}</div>
 <p>Aquí f(x) = x² − 2x − 3: ceros en −1 y 3, corte con el eje y en −3 y mínimo en (1, −4). Decrece hasta x = 1 y crece después.</p></div>
 <div class="ex-box"><span class="eyebrow">La prueba de la recta vertical</span><p>Una curva es la gráfica de una función si <b>ninguna recta vertical la corta en más de un punto</b>: a cada x le corresponde una sola altura.</p>
 <p>Una circunferencia no pasa la prueba: la recta x = 0 corta a x² + y² = 4 en (0, 2) y en (0, −2). La semicircunferencia de arriba, y = √(4 − x²), sí es una función.</p></div>`,
 explore:{intro:"Elige una curva y mueve la recta vertical. Si en algún lugar la corta en dos puntos o más, la curva no es la gráfica de una función.",fn:"fVertical"},
 key:"La gráfica de f son los puntos (x, f(x)). Se leen valores, ceros, cortes, máximos y mínimos. Prueba de la recta vertical: cada vertical corta a lo sumo una vez.",
 ojo:"Los ceros son valores de x (donde la gráfica corta el eje x), no valores de y."},

F4:{title:"Funciones lineales",sub:"Cambiar siempre lo mismo.",
 info:`<p class="lead">Una <b>función lineal</b> tiene la forma ${M("f(x) = mx + b")}. Su gráfica es una recta: m es la pendiente y b, el valor inicial f(0).</p>
 <div class="ex-box"><span class="eyebrow">Razón de cambio constante</span><p>Lo que caracteriza a una función lineal es que cada vez que x aumenta 1, f(x) cambia siempre lo mismo: m. En la tabla, las diferencias son constantes.</p>
 ${figTable(["x","0","1","2","3","4"],[["f(x) = 3x + 2","2","5","8","11","14"],["diferencia","","+3","+3","+3","+3"]])}
 <p>Con x² las diferencias serían 1, 3, 5, 7…: no es lineal.</p></div>
 <div class="ex-box"><span class="eyebrow">Funciones lineales en contexto</span><p>Una factura de agua con cargo fijo de 12 000 pesos y 3 500 pesos por metro cúbico: ${M("f(x) = 3500x + 12 000")}. La pendiente es lo que cuesta cada unidad; b, lo que se paga aunque el consumo sea 0.</p>
 <p>Si b = 0, la función es de <b>proporcionalidad directa</b>. Si m = 0, es <b>constante</b>.</p></div>
 <div class="ex-box"><span class="eyebrow">De dos datos a la fórmula</span><p>Si f(2) = 7 y f(5) = 16: m = (16 − 7) / (5 − 2) = 3; después 7 = 3 · 2 + b, así que b = 1. La función es f(x) = 3x + 1.</p>
 <p>El <b>cero</b> de f(x) = mx + b (con m ≠ 0) es x = −b / m: donde la recta corta el eje x.</p></div>`,
 explore:{intro:"Mueve la pendiente y el valor inicial. Mira la tabla: las diferencias siempre son iguales a la pendiente. El punto rojo marca el cero de la función.",fn:"fLineal"},
 key:"f(x) = mx + b: cambio constante m por cada unidad de x, valor inicial b = f(0). Diferencias constantes en la tabla. Cero en x = −b / m.",
 ojo:"La pendiente es el cambio por unidad: con dos datos se divide la diferencia de f entre la diferencia de x."},

F5:{title:"Funciones por tramos y valor absoluto",sub:"Una regla distinta en cada parte del dominio.",
 info:`<p class="lead">Una función está <b>definida por tramos</b> cuando usa fórmulas distintas en distintos intervalos de x.</p>
 <div class="ex-box"><span class="eyebrow">Ejemplo</span><p class="calc">f(x) = ${pw([["x + 2","x &lt; 0"],["2","0 ≤ x &lt; 3"],["8 − 2x","x ≥ 3"]])}</p>
 <p>Para evaluar, primero se busca el tramo: f(−1) = 1 (primer tramo), f(0) = 2 (segundo tramo, porque 0 ≤ 0), f(3) = 2 (tercer tramo: 8 − 6).</p>
 <div class="exfig">${plot({xmin:-4,xmax:6,ymin:-3,ymax:4,w:380,equal:true,xstep:1,ystep:1,axes:true,fns:[{f:x=>x+2,to:0,color:"var(--l-fun)"},{f:()=>2,from:0,to:3,color:"var(--l-fun)"},{f:x=>8-2*x,from:3,color:"var(--l-fun)"}],pts:[{x:0,y:2,color:"var(--l-fun)"},{x:0,y:2,open:true,color:"var(--l-fun)",r:0},{x:3,y:2,color:"var(--l-fun)"}],aria:"Gráfica de la función por tramos"})}</div></div>
 <div class="ex-box"><span class="eyebrow">El valor absoluto es una función por tramos</span><p class="calc">|x| = ${pw([["x","x ≥ 0"],["−x","x &lt; 0"]])}</p>
 <p>Su gráfica es una V con el vértice en el origen. La gráfica de ${M("f(x) = |x − h| + k")} es la misma V desplazada: vértice en (h, k). Con a · |x − h| + k, la V se abre más o menos, y si a &lt; 0 queda boca abajo.</p></div>
 <div class="callout"><span class="eyebrow">En la vida diaria</span><p>Las tarifas por consumo funcionan por tramos: por ejemplo, la energía hasta el consumo de subsistencia se cobra a un precio y lo que pasa de ese consumo, a otro.</p></div>`,
 explore:{intro:"Mueve h, k y a para trasladar y abrir la V de a · |x − h| + k. Mira cómo cambia la fórmula escrita por tramos.",fn:"fTramos"},
 key:"Por tramos: primero se identifica el tramo y después se usa su fórmula. |x − h| + k es una V con vértice en (h, k).",
 ojo:"Mira bien los extremos: en x = 0, «0 ≤ x» incluye el 0 y «x < 0» lo excluye. Y el vértice de |x − 3| está en x = 3, no en −3."},

F6:{title:"Funciones de potencia",sub:"x², x³, √x, 1/x y sus parientes.",
 info:`<p class="lead">Las funciones ${M(`f(x) = ${P("x","n")}`)} se llaman <b>funciones de potencia</b>. Su forma depende del exponente.</p>
 <div class="ex-box"><span class="eyebrow">Exponente par o impar</span><p>Si n es par (x², x⁴), f(−x) = f(x): la gráfica es simétrica respecto del eje y, y f(x) ≥ 0. Son funciones <b>pares</b>.</p>
 <p>Si n es impar (x, x³), f(−x) = −f(x): la gráfica es simétrica respecto del origen y toma todos los valores. Son funciones <b>impares</b>.</p>
 <div class="exfig">${plot({xmin:-2,xmax:2,ymin:-3,ymax:3,w:330,equal:true,xstep:1,ystep:1,axes:true,fns:[{f:x=>x*x,color:"var(--l-fun)"},{f:x=>x*x*x,color:"var(--l-ent)",dash:"6 4"}],labels:[{x:1.25,y:2.7,text:"x²",color:"var(--l-fun)"},{x:.55,y:-2.5,text:"x³",color:"var(--l-ent)"}],aria:"Gráficas de x² y x³"})}</div></div>
 <div class="ex-box"><span class="eyebrow">Entre 0 y 1, al revés</span><p>Para x &gt; 1, las potencias mayores crecen más: 2 &lt; 2² &lt; 2³. Pero entre 0 y 1 pasa lo contrario: 0,5³ = 0,125 &lt; 0,5² = 0,25 &lt; 0,5.</p></div>
 <div class="ex-box"><span class="eyebrow">Exponentes negativos y fraccionarios</span><p>${M(`${P("x","−1")} = 1/x`)} y ${M(`${P("x","−2")} = 1/x²`)} no están definidas en 0; sus gráficas se acercan a los ejes sin tocarlos.</p>
 <p>${M(`${P("x","1/2")} = √x`)} solo está definida para x ≥ 0; en cambio ${M(`${P("x","1/3")} = ∛x`)} está definida en todo ℝ, porque ∛(−8) = −2.</p></div>`,
 explore:{intro:"Elige exponentes y compara las gráficas. Fíjate en la simetría, el dominio y qué pasa entre 0 y 1.",fn:"fPotencia"},
 key:"xⁿ con n par: simétrica respecto del eje y (función par); n impar: simétrica respecto del origen (impar). Entre 0 y 1, las potencias más altas son más pequeñas.",
 ojo:"√x solo acepta x ≥ 0, pero ∛x acepta negativos. Y 1/x no está definida en 0."},

F7:{title:"Composición de funciones",sub:"Una máquina detrás de otra.",
 info:`<p class="lead">Componer es aplicar una función al resultado de otra. ${M("(g ∘ f)(x) = g(f(x))")} se lee «g compuesta con f»: <b>primero f, después g</b>.</p>
 <div class="ex-box"><span class="eyebrow">Ejemplo</span><p>Con f(x) = x + 3 y g(x) = x²:</p>
 <p class="calc">(g ∘ f)(2) = g(f(2)) = g(5) = 25        (f ∘ g)(2) = f(g(2)) = f(4) = 7</p>
 <p>En general, ${M("(g ∘ f)(x) = (x + 3)²")} y ${M("(f ∘ g)(x) = x² + 3")}: el orden importa.</p></div>
 <div class="ex-box"><span class="eyebrow">Descomponer</span><p>${M("h(x) = √(2x + 1)")} se obtiene haciendo primero 2x + 1 y después la raíz: h = g ∘ f con f(x) = 2x + 1 y g(x) = √x.</p></div>
 <div class="callout"><span class="eyebrow">Ojo con el dominio</span><p>La salida de f tiene que ser una entrada válida para g. Si f(x) = x − 5 y g(x) = √x, g(f(x)) = √(x − 5) solo existe para x ≥ 5.</p></div>`,
 explore:{intro:"Elige f y g y una entrada. Mira cómo la salida de la primera máquina entra en la segunda, y compara g ∘ f con f ∘ g.",fn:"fCompo"},
 key:"(g ∘ f)(x) = g(f(x)): primero f, luego g. En general g ∘ f ≠ f ∘ g.",
 ojo:"En g(f(x)) se trabaja de dentro hacia fuera: f actúa primero, aunque se escriba a la derecha."},

F8:{title:"Función inversa",sub:"La función que deshace lo que hizo otra.",
 info:`<p class="lead">La <b>inversa</b> de f, que se escribe ${M(P("f","−1"))}, deshace lo que hace f: si f(a) = b, entonces ${M(`${P("f","−1")}(b) = a`)}.</p>
 <div class="ex-box"><span class="eyebrow">Calcularla</span><p>f(x) = 2x + 3 multiplica por 2 y suma 3. Para deshacerlo hay que restar 3 y dividir entre 2, en ese orden: ${M(`${P("f","−1")}(x) = (x − 3) / 2`)}.</p>
 <p>Con álgebra: se escribe y = 2x + 3, se despeja x = (y − 3) / 2 y se renombran las variables.</p>
 <p>Comprobación: f(5) = 13 y ${P("f","−1")}(13) = (13 − 3) / 2 = 5.</p></div>
 <div class="ex-box"><span class="eyebrow">La gráfica</span><p>Si (a, b) está en la gráfica de f, (b, a) está en la de ${P("f","−1")}. Por eso las dos gráficas son simétricas respecto de la recta y = x. El dominio de ${P("f","−1")} es el rango de f.</p></div>
 <div class="ex-box"><span class="eyebrow">¿Cuándo existe?</span><p>Solo si cada salida viene de una única entrada (f es <b>inyectiva</b>). En la gráfica: ninguna recta horizontal la corta dos veces. f(x) = x² no tiene inversa en ℝ, porque f(2) = f(−2) = 4. Si se restringe a x ≥ 0, sí la tiene: √x.</p></div>
 <div class="callout"><span class="eyebrow">No es 1 / f</span><p>El −1 de ${P("f","−1")} no es un exponente: ${P("f","−1")}(x) no es 1 / f(x). Para f(x) = x + 4, la inversa es x − 4, no 1 / (x + 4).</p></div>`,
 explore:{intro:"Elige una función y mueve el punto por su gráfica: su reflejo en la recta y = x está en la gráfica de la inversa. Con x² prueba la recta horizontal.",fn:"fInversa"},
 key:"f⁻¹ deshace f: f(a) = b ⟺ f⁻¹(b) = a. Se despeja x. Las gráficas son simétricas respecto de y = x. Existe si f es inyectiva.",
 ojo:"f⁻¹(x) no es 1 / f(x), y x² solo tiene inversa si se restringe a x ≥ 0."}
});

Object.assign(RETO,{
F1:[
 R=>{const a=R.p([1,2,-1,3]),b=R.i(-5,5),c=R.i(-6,6),x=R.nz(-3,3);
  return{type:"fill",kind:"num",answer:a*x*x+b*x+c,q:`Si ${M(`f(x) = ${quadT(a,b,c)}`)}, ¿cuánto vale ${M(`f(${fmt(x)})`)}?`,hint:`Sustituye x por ${fmtP(x)} en cada aparición, con paréntesis. Recuerda que ${P(fmtP(x),2)} = ${x*x}.`,
   explain:`f(${fmt(x)}) = ${a===1?"":a===-1?"−":a+" · "}${P(fmtP(x),2)}${b?` ${b<0?"−":"+"} ${Math.abs(b)} · ${fmtP(x)}`:""}${c?` ${c<0?"−":"+"} ${Math.abs(c)}`:""} = ${fmt(a*x*x+b*x+c)}.`}},
 R=>{const n=R.i(2,7),m=R.i(2,7),k=R.i(10,40);const pool=[
   {t:"A cada estudiante, su fecha de nacimiento",bin:0},{t:"A cada número, su doble",bin:0},{t:`x: 1, 2, 3 → y: ${k}, ${k}, ${k}`,bin:0},{t:"A cada número real x, el número x²",bin:0},{t:`x: −1, 0, 1 → y: ${n}, ${m}, ${n}`,bin:0},{t:"A cada persona, su número de documento de identidad",bin:0},
   {t:"A cada número natural, sus divisores",bin:1},{t:`x: 1, 1, 2 → y: ${n}, ${n+1}, ${m}`,bin:1},{t:"A cada número positivo x, los números y con y² = x",bin:1},{t:"A cada madre, sus hijos",bin:1},{t:`x: ${n}, ${m+n}, ${n} → y: 0, 1, 2`,bin:1}];
  const items=[...R.sh(pool.filter(p=>p.bin===0)).slice(0,3),...R.sh(pool.filter(p=>p.bin===1)).slice(0,3)];
  return{type:"bins",q:"¿Cuáles de estas relaciones son funciones (de la primera cantidad en la segunda)?",bins:["Es una función","No es una función"],items,hint:"Pregunta: ¿alguna entrada tiene dos salidas distintas? Si dos entradas tienen la misma salida, no pasa nada.",
   explain:"No son funciones las relaciones en las que una entrada tiene varias salidas: los divisores de un número, los hijos de una madre, las dos raíces de x, o una tabla con la misma x y dos y distintas."}},
 R=>{const [c,a,b,o]=R.p([["El costo de un viaje en taxi depende de los kilómetros recorridos.","los kilómetros","el costo","el taxista"],["La temperatura del café baja con el tiempo que pasa sobre la mesa.","el tiempo","la temperatura","la mesa"],["La nota de un examen depende de las horas de estudio.","las horas de estudio","la nota","el examen"],["El área de un círculo depende de su radio.","el radio","el área","π"],["La altura de una planta cambia con los días de riego.","los días","la altura","el riego"]]);
  return{type:"choice",q:`${c} ¿Cuáles son las variables?`,opts:[`Independiente: ${a}; dependiente: ${b}`,`Independiente: ${b}; dependiente: ${a}`,`Independiente: ${a}; dependiente: ${o}`,`Las dos son independientes`],hint:"La independiente es la que se elige o cambia libremente; la dependiente es la que resulta.",
   explain:`${b[0].toUpperCase()+b.slice(1)} depende de ${a}: ${a} es la variable independiente.`}},
 R=>{const a=R.nz(-5,5),x=R.i(-6,6),b=R.i(-9,9),c=a*x+b;
  return{type:"fill",kind:"num",answer:x,q:`Si ${M(`f(x) = ${linT(a,b)}`)}, ¿para qué valor de x se cumple ${M(`f(x) = ${fmt(c)}`)}?`,hint:"Ahora se conoce la salida y se busca la entrada: plantea la ecuación y despeja x.",
   explain:`${linT(a,b)} = ${fmt(c)} → ${a===1?"":a===-1?"−":a}x = ${fmt(c-b)} → x = ${fmt(x)}. Comprobación: f(${fmt(x)}) = ${fmt(c)}.`}},
 R=>{const pool=[["2x + 1",x=>2*x+1],["x² + 1",x=>x*x+1],["3x − 1",x=>3*x-1],["x² − x + 1",x=>x*x-x+1],["4 − x",x=>4-x],["2x² − 1",x=>2*x*x-1],["x + 1",x=>x+1],["5 − 2x",x=>5-2*x],["x²",x=>x*x],["3 − x²",x=>3-x*x]];
  const tab=f=>`f(0) = ${fmt(f(0))}, f(1) = ${fmt(f(1))}, f(2) = ${fmt(f(2))}`,sh=R.sh(pool),pick=[];for(const p of sh){if(pick.length<3&&!pick.some(q=>tab(q[1])===tab(p[1])))pick.push(p)}
  const extra=sh.filter(p=>!pick.includes(p)&&!pick.some(q=>tab(q[1])===tab(p[1]))).filter(p=>pick.some(q=>q[1](0)===p[1](0)||q[1](1)===p[1](1))).slice(0,2).map(p=>"f(x) = "+p[0]);
  return{type:"match",q:"Arrastra a cada tabla la fórmula que la produce. Sobran fórmulas que coinciden solo en algún valor.",pairs:pick.map(p=>[tab(p[1]),"f(x) = "+p[0]]),extra,hint:"Comprueba los tres valores, no solo el primero.",
   explain:pick.map(p=>`${p[0]}: ${tab(p[1])}`).join("; ")+"."}}],
F2:[
 R=>{const a=R.nz(-6,6);
  return{type:"choice",q:`¿Cuál es el dominio de ${M(`f(x) = ${FS("1","x "+(a>0?"− ":"+ ")+Math.abs(a))}`)}?`,opts:[`ℝ − {${fmt(a)}}`,`ℝ − {${fmt(-a)}}`,IV(a,null,false),"ℝ"],hint:"¿Para qué valor de x el denominador vale 0?",explain:`x ${a>0?"−":"+"} ${Math.abs(a)} = 0 cuando x = ${fmt(a)}: es el único valor prohibido. El dominio es ℝ − {${fmt(a)}}.`}},
 R=>{const a=R.nz(-6,6),rev=R.f()<.4,inside=rev?`${fmt(a)} − x`:`x ${a>0?"−":"+"} ${Math.abs(a)}`;
  const right=rev?IV(null,a,false,true):IV(a,null,true),opts=[right,rev?IV(null,a,false,false):IV(a,null,false),rev?IV(a,null,true):IV(null,a,false,true),"ℝ"];
  return{type:"choice",q:`¿Cuál es el dominio de ${M(`f(x) = √(${inside})`)}?`,opts,hint:`Dentro de la raíz debe quedar un número mayor o igual que 0: ${inside} ≥ 0.`,
   explain:`${inside} ≥ 0 se cumple cuando x ${rev?"≤":"≥"} ${fmt(a)}, con ${fmt(a)} incluido (√0 = 0). Dominio: ${right}.`}},
 R=>{const c=R.nz(-5,5),t=R.i(0,3),F_=[`x² ${c<0?"−":"+"} ${Math.abs(c)}`,`−x² ${c<0?"−":"+"} ${Math.abs(c)}`,`|x| ${c<0?"−":"+"} ${Math.abs(c)}`,`√x ${c<0?"−":"+"} ${Math.abs(c)}`][t];
  const right=t===1?IV(null,c,false,true):IV(c,null,true),opts=[right,t===1?IV(null,c,false,false):IV(c,null,false),t===1?IV(c,null,true):IV(null,c,false,true),"ℝ"];
  return{type:"choice",q:`¿Cuál es el rango de ${M(`f(x) = ${F_}`)}?`,opts,hint:t===1?"−x² nunca es positivo: su valor más alto es 0.":"x², |x| y √x nunca son negativos: su valor más bajo es 0.",
   explain:`${["x²","−x²","|x|","√x"][t]} toma ${t===1?"todos los valores menores o iguales que 0":"todos los valores mayores o iguales que 0"}; al ${c>0?"sumar":"restar"} ${Math.abs(c)}, el rango es ${right}.`}},
 R=>{let a,b,ya,yb;do{a=R.i(-4,0);b=R.i(a+2,5);ya=R.i(-3,1);yb=R.i(ya+2,4)}while(false);const dom=R.f()<.5,ca=R.f()<.5,cb=!ca;
  const right=dom?IV(a,b,ca,cb):IV(ya,yb,ca,cb),opts=(dom?[right,IV(a,b,!ca,!cb),IV(ya,yb,ca,cb),IV(a,b,true,true),IV(a,b,false,false)]:[right,IV(ya,yb,!ca,!cb),IV(a,b,ca,cb),IV(ya,yb,true,true),IV(ya,yb,false,false)]).filter((v,i,arr)=>arr.indexOf(v)===i).slice(0,4);
  return{type:"choice",q:`La gráfica de f es este segmento. ¿Cuál es su ${dom?"dominio":"rango"}?`,fig:plot({xmin:-5,xmax:6,ymin:-4,ymax:5,w:340,equal:true,xstep:1,ystep:1,axes:true,segs:[{x1:a,y1:ya,x2:b,y2:yb,color:"var(--l-fun)",width:3}],pts:[{x:a,y:ya,open:!ca,color:"var(--l-fun)"},{x:b,y:yb,open:!cb,color:"var(--l-fun)"}],aria:"Segmento con extremos marcados"}),
   opts,hint:dom?"Mira la sombra del segmento sobre el eje x y si cada extremo es un punto lleno o vacío.":"Mira la sombra del segmento sobre el eje y y si cada extremo es un punto lleno o vacío.",
   explain:`El segmento va de x = ${fmt(a)} a x = ${fmt(b)} y de y = ${fmt(ya)} a y = ${fmt(yb)}. El punto ${ca?"lleno":"vacío"} de la izquierda ${ca?"se incluye":"no se incluye"}: ${dom?"dominio":"rango"} ${right}.`}},
 R=>{const a=R.i(-4,1),b=R.i(a+2,a+5);const c=[[a-1,1],[a,0],[b,1],[b+1,0],[a-2,1],[b+2,0]];const mid=a+1===b?null:a+1;if(mid!==null)c.push([mid,0]);
  const items=R.sh(c).filter((v,i,arr)=>arr.findIndex(w=>w[0]===v[0])===i).slice(0,6).map(([v,bin])=>({t:fmt(v),bin}));
  if(!items.some(i=>i.bin===0)||!items.some(i=>i.bin===1))return RETO.F2[4](R);
  const rt=a===0?"√x":`√(x ${a>0?"−":"+"} ${Math.abs(a)})`,dn=b===0?"x":`x ${b>0?"−":"+"} ${Math.abs(b)}`;
  return{type:"bins",q:`Sea ${M(`f(x) = ${FS(rt,dn)}`)}. ¿Qué valores están en su dominio?`,bins:["Está en el dominio","No está en el dominio"],items,
   hint:`Dos condiciones a la vez: lo de dentro de la raíz debe ser ≥ 0 (x ≥ ${fmt(a)}) y el denominador no puede ser 0 (x ≠ ${fmt(b)}).`,explain:`Dominio: x ≥ ${fmt(a)} y x ≠ ${fmt(b)}, es decir, [${fmt(a)}, ${fmt(b)}) ∪ (${fmt(b)}, +∞).`}}],
F3:[
 R=>{const xs=[-4,-2,0,2,4],ys=xs.map(()=>R.i(-3,4));const f=x=>{for(let k=1;k<xs.length;k++)if(x<=xs[k]){const t=(x-xs[k-1])/(xs[k]-xs[k-1]);return ys[k-1]+t*(ys[k]-ys[k-1])}return ys[4]};
  let x0;do{x0=R.i(-4,4)}while(!Number.isInteger(f(x0))||x0===0);
  return{type:"fill",kind:"num",answer:f(x0),q:`Esta es la gráfica de una función f. ¿Cuánto vale ${M(`f(${fmt(x0)})`)}?`,fig:plot({xmin:-5,xmax:5,ymin:-4,ymax:5,w:360,equal:true,xstep:1,ystep:1,axes:true,fns:[{f,from:-4,to:4,color:"var(--l-fun)"}],pts:[{x:-4,y:ys[0],color:"var(--l-fun)",r:4},{x:4,y:ys[4],color:"var(--l-fun)",r:4}],aria:"Gráfica de f"}),
   hint:`Sube o baja desde x = ${fmt(x0)} en el eje x hasta la gráfica y lee la altura.`,explain:`Sobre x = ${fmt(x0)} la gráfica está a la altura ${fmt(f(x0))}: f(${fmt(x0)}) = ${fmt(f(x0))}.`}},
 R=>{const mk=(o,a)=>`<span style="display:inline-block;width:160px" aria-label="${a}">${plot({xmin:-3,xmax:3,ymin:-3,ymax:3,w:160,equal:true,xstep:1,ystep:1,...o,aria:a})}</span>`;
  const bad=R.p([["la circunferencia",{fns:[{f:x=>Math.sqrt(4-x*x),color:"var(--l-fun)"},{f:x=>-Math.sqrt(4-x*x),color:"var(--l-fun)"}]}],["la parábola acostada",{fns:[{f:x=>Math.sqrt(x+2),color:"var(--l-fun)"},{f:x=>-Math.sqrt(x+2),color:"var(--l-fun)"}]}],["la recta vertical",{vl:[{x:1,color:"var(--l-fun)",width:3}]}]]);
  const good=R.sh([["parábola",{fns:[{f:x=>x*x-2,color:"var(--l-fun)"}]}],["recta",{fns:[{f:x=>-x+1,color:"var(--l-fun)"}]}],["cúbica",{fns:[{f:x=>x*x*x/3-x,color:"var(--l-fun)"}]}],["valor absoluto",{fns:[{f:x=>Math.abs(x)-1,color:"var(--l-fun)"}]}],["semicircunferencia",{fns:[{f:x=>Math.sqrt(4-x*x),color:"var(--l-fun)"}]}]]).slice(0,3);
  return{type:"choice",show:bad[0],q:"¿Cuál de estas curvas <b>no</b> es la gráfica de una función?",opts:[mk(bad[1],bad[0]),...good.map(g=>mk(g[1],g[0]))],hint:"Imagina rectas verticales recorriendo cada dibujo: ¿alguna corta la curva dos veces?",
   explain:`En ${bad[0]} hay rectas verticales que la cortan en más de un punto: a una misma x le corresponderían dos alturas (o infinitas). Las demás pasan la prueba de la recta vertical.`}},
 R=>{const h=R.i(-4,4),k=R.i(1,4),a=R.p([.25,.5,1]),f=x=>-a*(x-h)*(x-h)+k;const st=h>0?-4:4;
  return{type:"slider",name:"x",min:-5,max:5,start:st,answer:h,show:`x = ${fmt(h)}`,label:v=>fmt(v),q:"Mueve la recta vertical hasta la x donde la función alcanza su valor máximo.",hint:"El máximo es el punto más alto de la gráfica: a su izquierda la función crece y a su derecha decrece.",
   explain:`El punto más alto es (${fmt(h)}, ${fmt(k)}): el máximo de f es ${fmt(k)} y se alcanza en x = ${fmt(h)}.`,
   render:(v,ok)=>plot({xmin:-6,xmax:6,ymin:-6,ymax:6,w:420,equal:true,xstep:1,ystep:1,axes:true,fns:[{f,color:"var(--l-fun)"}],vl:[{x:v,color:ok?"var(--ok)":"var(--ink)",dash:"5 4",width:2}],pts:[{x:v,y:f(v),color:ok?"var(--ok)":"var(--ink)",label:`f(${fmt(v)}) = ${decs(f(v),2)}`}],aria:"Gráfica de f con una recta vertical"})}},
 R=>{let r1,r2;do{r1=R.i(-4,3);r2=R.i(r1+1,4)}while(r2-r1>6);const s=R.p([1,-1])*R.p([.5,1]),f=x=>s*(x-r1)*(x-r2);
  return{type:"fill",kind:"set",answer:[r1,r2],show:`${r1<0?"-"+(-r1):r1}; ${r2<0?"-"+(-r2):r2}`,q:`Esta es la gráfica de f. ¿Para qué valores de x se cumple ${M("f(x) = 0")}?`,fig:plot({xmin:-6,xmax:6,ymin:-6,ymax:6,w:360,equal:true,xstep:1,ystep:1,axes:true,fns:[{f,color:"var(--l-fun)"}],aria:"Gráfica de una parábola"}),
   hint:"f(x) = 0 significa altura 0: busca dónde la gráfica corta el eje x.",explain:`La gráfica corta el eje x en x = ${fmt(r1)} y x = ${fmt(r2)}: esos son los ceros de f.`}},
 R=>{const t=R.i(0,2),[txt,f]=[["x² − 4",x=>x*x-4],["|x| − 3",x=>Math.abs(x)-3],["2x − 1",x=>2*x-1]][t];let a;do{a=R.nz(-3,3)}while(Math.abs(f(a))>6||f(a)===a);
  return{type:"grid",xmin:-6,xmax:6,ymin:-6,ymax:6,answer:[[a,f(a)]],show:PT(a,f(a)),reveal:{fns:[{f,color:"var(--ok)",width:2}]},q:`Marca el punto de la gráfica de ${M(`f(x) = ${txt}`)} que tiene ${M(`x = ${fmt(a)}`)}.`,hint:`Calcula f(${fmt(a)}): esa es la altura del punto.`,
   why:p=>p[0][0]===f(a)&&p[0][1]===a?"Cambiaste las coordenadas: la x del punto es "+fmt(a)+" y la y es f("+fmt(a)+").":"",explain:`f(${fmt(a)}) = ${fmt(f(a))}, así que el punto es ${PT(a,f(a))}.`}}],
F4:[
 R=>{const b=R.i(1,6),m=R.i(2,5);const T=v=>"x: 0, 1, 2, 3 → y: "+v.map(fmt).join(", ");
  const opts=[T([0,1,2,3].map(k=>b+m*k)),T([0,1,2,3].map(k=>b+k*k)),T([0,1,2,3].map(k=>b*Math.pow(2,k))),T([0,1,2,3].map(k=>b+k*(k+1)/2*m))];
  if(new Set(opts).size<4)return RETO.F4[0](R);
  return{type:"choice",q:"¿Cuál de estas tablas corresponde a una función lineal?",opts,hint:"Calcula las diferencias entre valores seguidos de y: en una función lineal son todas iguales.",
   explain:`En la primera tabla y aumenta siempre ${m}: es f(x) = ${m}x + ${b}. En las otras las diferencias cambian (cuadrados, duplicar, sumar cada vez más).`}},
 R=>{const [c,u,F_,p]=R.p([["Un plan de celular cobra un cargo fijo","GB adicional",R.p([20000,25000,30000]),R.p([3000,4000,5000])],["Un gimnasio cobra una inscripción","clase",R.p([50000,60000,80000]),R.p([8000,10000,12000])],["Un servicio de mensajería cobra una tarifa base","kilómetro",R.p([4000,5000,6000]),R.p([700,800,1200])]]);
  const L=v=>v.toLocaleString("es-CO");
  return{type:"fill",kind:"expr",answer:`${p}x+${F_}`,show:`${p}x + ${F_}`,q:`${c} de ${L(F_)} pesos más ${L(p)} pesos por cada ${u}. Escribe el costo total f(x) para x unidades. Completa: ${M("f(x) = …")}`,hint:"Lo que se cobra por unidad multiplica a x; el cargo fijo se suma.",
   explain:`f(x) = ${L(p)}x + ${L(F_)}: la pendiente es el precio por ${u} y b es el cargo fijo.`}},
 R=>{const m=R.nz(-4,4),b=R.i(-6,6);let x1=R.i(-3,2),x2;do{x2=R.i(-2,5)}while(x2===x1);let x3;do{x3=R.i(-5,6)}while(x3===x1||x3===x2);const f=x=>m*x+b;
  return{type:"fill",kind:"num",answer:f(x3),q:`f es una función lineal con ${M(`f(${fmt(x1)}) = ${fmt(f(x1))}`)} y ${M(`f(${fmt(x2)}) = ${fmt(f(x2))}`)}. ¿Cuánto vale ${M(`f(${fmt(x3)})`)}?`,hint:"Halla primero la pendiente (cambio de f dividido entre cambio de x) y después b.",
   explain:`m = (${fmt(f(x2))} − ${fmtP(f(x1))}) / (${fmt(x2)} − ${fmtP(x1)}) = ${fmt(m)}; b = ${fmt(b)}. f(x) = ${linT(m,b)}, así que f(${fmt(x3)}) = ${fmt(f(x3))}.`}},
 R=>{const m=R.nz(-5,5),b=R.nz(-9,9);if(Math.abs(m)===1)return RETO.F4[3](R);
  return{type:"fill",kind:"frac",answer:-b/m,show:frs(-b,m),q:`¿Cuál es el cero de ${M(`f(x) = ${linT(m,b)}`)}? Si no es entero, escríbelo como fracción.`,hint:"El cero es la x donde f(x) = 0: resuelve la ecuación.",
   explain:`${linT(m,b)} = 0 → ${m}x = ${fmt(-b)} → x = ${frs(-b,m)}.`}},
 R=>{const [mp,mq]=R.p([[1,1],[2,1],[-1,1],[-2,1],[1,2],[-1,2],[3,1]]),px=mq*R.i(-2,2),b=R.i(-5,5),py=b+mp*px/mq;if(Math.abs(py)>7||px===0)return RETO.F4[4](R);const st=b>0?-6:6;
  return{type:"slider",name:"b",min:-8,max:8,start:st,answer:b,show:`b = ${fmt(b)}`,label:v=>fmt(v),q:`Ajusta el valor inicial b para que la gráfica de ${M(`f(x) = ${rhs(mp,mq,0,1,"h")} + b`)} pase por ${M("P = "+PT(px,py))}.`,
   hint:`Sustituye P: ${fmt(py)} = ${frs(mp,mq)} · ${fmtP(px)} + b.`,explain:`${fmt(py)} = ${fmt(mp*px/mq)} + b, así que b = ${fmt(b)}.`,
   render:(v,ok)=>plot({xmin:-8,xmax:8,ymin:-8,ymax:8,w:420,equal:true,xstep:2,ystep:2,axes:true,fns:[{f:x=>mp/mq*x+v,color:ok?"var(--ok)":"var(--l-fun)"}],pts:[{x:px,y:py,label:"P",color:"var(--ink)"},{x:0,y:v,color:ok?"var(--ok)":"var(--l-fun)",label:`(0, ${fmt(v)})`,dx:-58}],aria:"Recta y el punto P"})}}],
F5:[
 R=>{const c=R.i(-1,2),a1=R.nz(-3,3),b1=R.i(-4,4),a2=R.nz(-3,3),b2=R.i(-4,4);const v=R.i(0,2),x=v===0?c:v===1?c-R.i(1,3):c+R.i(1,3);const f=x>=c?a2*x+b2:a1*x+b1;
  return{type:"fill",kind:"num",answer:f,q:`Sea ${M("f(x) = ")}${pw([[linT(a1,b1),`x &lt; ${fmt(c)}`],[linT(a2,b2),`x ≥ ${fmt(c)}`]])}. ¿Cuánto vale ${M(`f(${fmt(x)})`)}?`,hint:`Decide primero a qué tramo pertenece x = ${fmt(x)}.${x===c?" Cuidado: es justo el extremo.":""}`,
   explain:`${fmt(x)} ${x>=c?"≥":"<"} ${fmt(c)}, así que se usa ${x>=c?linT(a2,b2):linT(a1,b1)}: f(${fmt(x)}) = ${fmt(f)}.`}},
 R=>{let h,k;do{h=R.nz(-5,5);k=R.nz(-5,5)}while(h===k);const a=R.p([1,2,-1,3]);
  return{type:"choice",q:`¿Cuál es el vértice de la gráfica de ${M(`f(x) = ${a===1?"":a===-1?"−":a}|x ${h>0?"−":"+"} ${Math.abs(h)}| ${k<0?"−":"+"} ${Math.abs(k)}`)}?`,opts:[PT(h,k),PT(-h,k),PT(h,-k),PT(k,h)],hint:"El vértice está donde lo de dentro del valor absoluto vale 0.",
   explain:`x ${h>0?"−":"+"} ${Math.abs(h)} = 0 en x = ${fmt(h)}, y allí f vale ${fmt(k)}. Vértice: ${PT(h,k)}.`}},
 R=>{const a=R.nz(-5,5),A=`x ${a>0?"−":"+"} ${Math.abs(a)}`,B=a>0?`${a} − x`:`−x − ${-a}`;
  return{type:"choice",show:`${A} si x ≥ ${fmt(a)}; ${B} si x < ${fmt(a)}`,q:`¿Cuál de estas funciones por tramos es igual a ${M(`|${A}|`)}?`,
   opts:[pw([[A,`x ≥ ${fmt(a)}`],[B,`x &lt; ${fmt(a)}`]]),pw([[B,`x ≥ ${fmt(a)}`],[A,`x &lt; ${fmt(a)}`]]),pw([[A,`x ≥ ${fmt(-a)}`],[B,`x &lt; ${fmt(-a)}`]]),pw([[A,`x ≥ 0`],[B,`x &lt; 0`]])],
   hint:`|u| es u si u ≥ 0 y −u si u < 0. Aquí u = ${A}, que es ≥ 0 cuando x ≥ ${fmt(a)}.`,explain:`${A} ≥ 0 cuando x ≥ ${fmt(a)}: en ese tramo |${A}| = ${A}; en el otro, −(${A}) = ${B}.`}},
 R=>{const h=R.i(-4,4),k=R.i(-4,4),a=R.p([1,-1,2]);
  return{type:"grid",xmin:-6,xmax:6,ymin:-6,ymax:6,answer:[[h,k]],show:PT(h,k),reveal:{fns:[{f:x=>a*Math.abs(x-h)+k,color:"var(--ok)",width:2.5}]},q:`Marca el vértice de la gráfica de ${M(`f(x) = ${a===1?"":a===-1?"−":a}|x ${h>0?"− "+h:h<0?"+ "+(-h):""}|${k?` ${k<0?"−":"+"} ${Math.abs(k)}`:""}`.replace("x |","x|"))}.`,
   hint:"Busca la x que anula lo de dentro del valor absoluto y calcula f en ese punto.",why:p=>p[0][0]===-h&&p[0][1]===k?"El signo de la x del vértice va al revés de como aparece dentro del valor absoluto.":"",explain:`El vértice es ${PT(h,k)}.`}},
 R=>{const p1=R.p([600,650,700]),p2=R.p([800,850,900]),L=130,x=R.p([90,110,150,180,210,250]);const tot=x<=L?x*p1:L*p1+(x-L)*p2;
  return{type:"fill",kind:"num",answer:tot,q:`Una empresa cobra la energía a ${p1} pesos por kWh hasta ${L} kWh, y a ${p2} pesos cada kWh que pase de ${L}. ¿Cuánto paga en total un hogar que consume ${x} kWh?`,hint:x<=L?`${x} no pasa de ${L}: todo se cobra al primer precio.`:`Los primeros ${L} kWh van a ${p1} y los ${x-L} restantes a ${p2}.`,
   explain:x<=L?`${x} · ${p1} = ${tot.toLocaleString("es-CO")} pesos.`:`${L} · ${p1} + ${x-L} · ${p2} = ${(L*p1).toLocaleString("es-CO")} + ${((x-L)*p2).toLocaleString("es-CO")} = ${tot.toLocaleString("es-CO")} pesos.`}}],
F6:[
 R=>{const t=R.i(0,1);
  return t?{type:"choice",q:"¿Cuál de estas funciones tiene la gráfica simétrica respecto del eje y?",opts:[M(R.p(["x²","x⁴","x² + 1"])),M("x³"),M("√x"),M("1 / x")],hint:"Simetría respecto del eje y: f(−x) = f(x).",explain:"Con exponente par, f(−x) = f(x): los puntos (x, y) y (−x, y) están los dos en la gráfica."}
   :{type:"choice",q:"¿Cuál de estas funciones tiene la gráfica simétrica respecto del origen?",opts:[M(R.p(["x³","1 / x","x⁵"])),M("x²"),M("√x"),M("x² + x")],hint:"Simetría respecto del origen: f(−x) = −f(x).",explain:"Con exponente impar, f(−x) = −f(x): los puntos (x, y) y (−x, −y) están los dos en la gráfica."}},
 R=>{const x=R.p([0.5,0.2,4,9]),items=[["x",x],["x²",x*x],["x³",x*x*x],["√x",Math.sqrt(x)]].sort((a,b)=>a[1]-b[1]);
  return{type:"order",noEval:true,q:`Ordena de menor a mayor el valor de estas expresiones cuando ${M("x = "+decs(x,2))}.`,items:R.sh(items.map(i=>i[0])),correct:items.map(i=>i[0]),hint:x<1?"Entre 0 y 1, multiplicar por x achica: las potencias altas son más pequeñas.":"Para x > 1, las potencias altas son más grandes.",
   explain:`Con x = ${decs(x,2)}: ${items.map(i=>`${i[0]} = ${decs(i[1],3)}`).join(" < ")}.`}},
 R=>{const t=R.p([["√x","Dominio [0, +∞) y rango [0, +∞)",["Dominio ℝ y rango [0, +∞)","Dominio [0, +∞) y rango ℝ","Dominio ℝ y rango ℝ"]],["∛x","Dominio ℝ y rango ℝ",["Dominio [0, +∞) y rango [0, +∞)","Dominio ℝ y rango [0, +∞)","Dominio ℝ − {0} y rango ℝ"]],["1 / x","Dominio ℝ − {0} y rango ℝ − {0}",["Dominio ℝ y rango ℝ","Dominio (0, +∞) y rango (0, +∞)","Dominio ℝ − {0} y rango ℝ"]],["1 / x²","Dominio ℝ − {0} y rango (0, +∞)",["Dominio ℝ − {0} y rango ℝ − {0}","Dominio (0, +∞) y rango (0, +∞)","Dominio ℝ y rango [0, +∞)"]],["x³","Dominio ℝ y rango ℝ",["Dominio ℝ y rango [0, +∞)","Dominio [0, +∞) y rango ℝ","Dominio ℝ − {0} y rango ℝ"]]]);
  return{type:"choice",q:`¿Cuál es el dominio y el rango de ${M("f(x) = "+t[0])}?`,opts:[t[1],...t[2]],hint:"Piensa qué números se pueden sustituir y qué resultados pueden salir. Ayúdate con la gráfica.",explain:`Para ${t[0]}: ${t[1].toLowerCase()}.`}},
 R=>{const pool=[["x²",0],["x⁴",0],["|x|",0],["1 / x²",0],["x² − 3",0],["x³",1],["1 / x",1],["x",1],["x⁵",1],["x³ − x",1],["√x",2],["x² + x",2],["x³ + 1",2],["(x − 1)²",2]];
  const items=[0,1,2].flatMap(b=>R.sh(pool.filter(p=>p[1]===b)).slice(0,2)).map(([t,bin])=>({t,bin}));
  return{type:"bins",q:"Clasifica cada función según la simetría de su gráfica.",bins:["Par: simétrica respecto del eje y","Impar: simétrica respecto del origen","Ninguna de las dos"],items,hint:"Calcula f(−x): si da f(x) es par; si da −f(x) es impar; si no, ninguna.",
   explain:"Pares: f(−x) = f(x), como x² o |x|. Impares: f(−x) = −f(x), como x³ o 1/x. Un desplazamiento como (x − 1)² o x³ + 1 rompe la simetría, y √x ni siquiera está definida para negativos."}},
 R=>{const a=R.p([1,2,-1]),r=R.nz(-4,4),c=a*r*r*r;
  return{type:"fill",kind:"num",answer:r,q:`Resuelve ${M(`${a===1?"":a===-1?"−":a}${P("x",3)} = ${fmt(c)}`)}.`,hint:`Despeja x³ y saca la raíz cúbica. La raíz cúbica de un negativo es negativa.`,explain:`${P("x",3)} = ${fmt(c/a)}, así que x = ∛(${fmt(c/a)}) = ${fmt(r)}.`}}],
F7:[
 R=>{const a=R.nz(-3,3),b=R.i(-5,5),c=R.i(-4,4),x=R.i(-3,3),gf=R.f()<.5,f=v=>a*v+b,g=v=>v*v+c;
  const val=gf?g(f(x)):f(g(x));
  return{type:"fill",kind:"num",answer:val,q:`Sean ${M(`f(x) = ${linT(a,b)}`)} y ${M(`g(x) = ${quadT(1,0,c)}`)}. Calcula ${M(gf?`(g ∘ f)(${fmt(x)})`:`(f ∘ g)(${fmt(x)})`)}.`,hint:gf?"Primero calcula f del número; después aplica g al resultado.":"Primero calcula g del número; después aplica f al resultado.",
   explain:gf?`f(${fmt(x)}) = ${fmt(f(x))} y g(${fmt(f(x))}) = ${fmt(val)}.`:`g(${fmt(x)}) = ${fmt(g(x))} y f(${fmt(g(x))}) = ${fmt(val)}.`}},
 R=>{const xs=[1,2,3,4],fv=R.sh([1,2,3,4]),gv=xs.map(()=>R.i(-5,9)),x=R.p(xs),k=fv[xs.indexOf(x)];
  return{type:"fill",kind:"num",answer:gv[k-1],q:`Las funciones f y g están dadas por esta tabla. ¿Cuánto vale ${M(`g(f(${x}))`)}?`,fig:figTable(["x","1","2","3","4"],[["f(x)",...fv.map(String)],["g(x)",...gv.map(fmt)]]),hint:`Busca primero f(${x}) en la tabla y después busca g de ese número.`,
   explain:`f(${x}) = ${k} y g(${k}) = ${fmt(gv[k-1])}.`}},
 R=>{const a=R.nz(-3,3),b=R.nz(-4,4),t=R.i(0,1),c=R.i(-5,5),m=R.nz(-3,3);
  const asc=ts=>ts.filter(t=>t[0]!==0).map(([c,l],i)=>(c<0?"-":i?"+":"")+(Math.abs(c)===1&&l?"":Math.abs(c))+l).join("")||"0";
  if(t===0)return{type:"fill",kind:"expr",answer:asc([[a*a,"x^2"],[2*a*b,"x"],[b*b+c,""]]),show:quadT(a*a,2*a*b,b*b+c),noParens:true,q:`Sean ${M(`f(x) = ${linT(a,b)}`)} y ${M(`g(x) = ${quadT(1,0,c)}`)}. Escribe ${M("g(f(x))")} desarrollada.`,hint:`Sustituye la x de g por (${linT(a,b)}) y desarrolla el cuadrado.`,
   explain:`g(f(x)) = (${linT(a,b)})² ${c<0?"−":"+"} ${Math.abs(c)} = ${quadT(a*a,2*a*b,b*b+c)}.`};
  return{type:"fill",kind:"expr",answer:asc([[m*a,"x"],[m*b+c,""]]),show:linT(m*a,m*b+c),noParens:true,q:`Sean ${M(`f(x) = ${linT(a,b)}`)} y ${M(`g(x) = ${linT(m,c)}`)}. Escribe ${M("g(f(x))")} simplificada.`,hint:`Sustituye la x de g por (${linT(a,b)}).`,
   explain:`g(f(x)) = ${m} · (${linT(a,b)}) ${c<0?"−":"+"} ${Math.abs(c)} = ${linT(m*a,m*b+c)}.`}},
 R=>{const a=R.i(2,5),b=R.nz(-6,6),t=R.i(0,2);const inner=linT(a,b),outer=["√x","x³","1 / x"][t],h=["√(%)","(%)³","1 / (%)"][t].replace("%",inner);
  return{type:"choice",q:`Queremos escribir ${M(`h(x) = ${h}`)} como h = g ∘ f, es decir, h(x) = g(f(x)). ¿Qué elección es correcta?`,opts:[`f(x) = ${inner}, g(x) = ${outer}`,`f(x) = ${outer}, g(x) = ${inner}`,`f(x) = ${a}x, g(x) = ${outer.replace("x",`x ${b<0?"−":"+"} ${Math.abs(b)}`)}`,`f(x) = ${inner}, g(x) = ${inner}`].map(M),
   hint:"f es lo que se calcula primero (lo de dentro); g, lo que se aplica al final.",explain:`Primero se calcula ${inner} (f) y al resultado se le aplica ${outer} (g).`}},
 R=>{const a=R.i(1,5),k=R.i(2,4);const pairs=[["f ∘ g",`${k}x + ${a}`],["g ∘ f",`${k}x + ${k*a}`],["f ∘ f",`x + ${2*a}`],["g ∘ g",`${k*k}x`]];
  const extra=[`x + ${a*k}`,`${k}x² + ${a}`,`${k+a}x`].filter(t=>!pairs.some(p=>p[1]===t)).slice(0,2);
  return{type:"match",q:`Sean f(x) = x + ${a} y g(x) = ${k}x. Arrastra a cada composición su fórmula. Sobran fichas.`,pairs,extra,hint:"(f ∘ g)(x) = f(g(x)): primero g, después f.",
   explain:`f(g(x)) = ${k}x + ${a}; g(f(x)) = ${k}(x + ${a}) = ${k}x + ${k*a}; f(f(x)) = x + ${2*a}; g(g(x)) = ${k*k}x. El orden cambia el resultado.`}}],
F8:[
 R=>{const a=R.nz(-4,4),b=R.i(-6,6),x=R.i(-5,5),c=a*x+b;
  return{type:"fill",kind:"num",answer:x,q:`Si ${M(`f(x) = ${linT(a,b)}`)}, ¿cuánto vale ${M(`${P("f","−1")}(${fmt(c)})`)}?`,hint:`${P("f","−1")}(${fmt(c)}) es el número que f convierte en ${fmt(c)}.`,
   explain:`Buscamos x con ${linT(a,b)} = ${fmt(c)}: x = ${fmt(x)}. Comprobación: f(${fmt(x)}) = ${fmt(c)}.`}},
 R=>{const a=R.p([2,3,4,5,-2,-3]),b=R.nz(-7,7);
  return{type:"fill",kind:"expr",answer:`(x-(${b}))/(${a})`,show:`(x ${b<0?"+":"−"} ${Math.abs(b)}) / ${fmtP(a)}`,q:`Halla la inversa de ${M(`f(x) = ${linT(a,b)}`)}. Completa: ${M(`${P("f","−1")}(x) = …`)}`,hint:`f multiplica por ${fmt(a)} y luego ${b>0?"suma":"resta"} ${Math.abs(b)}. Deshazlo en orden contrario.`,
   explain:`y = ${linT(a,b)} → x = (y ${b<0?"+":"−"} ${Math.abs(b)}) / ${fmtP(a)}. Así ${P("f","−1")}(x) = (x ${b<0?"+":"−"} ${Math.abs(b)}) / ${fmtP(a)}.`}},
 R=>{const good=R.p(["x³","2x + 1","x³ + 2","4 − x","x / 3"]),bad=R.sh(["x²","|x|","x² + 1","x⁴","|x − 2|","x² − 4x"]).slice(0,3);
  return{type:"choice",q:"¿Cuál de estas funciones tiene inversa definida en todo ℝ?",opts:[good,...bad].map(t=>M("f(x) = "+t)),hint:"Busca si dos entradas distintas pueden dar la misma salida, por ejemplo x y −x.",
   explain:`${good} nunca repite salidas: cada valor viene de una sola entrada. En las otras hay dos entradas con la misma salida (como f(2) = f(−2) en x²), así que no se pueden deshacer.`}},
 R=>{let a,b;do{a=R.i(-5,5);b=R.i(-5,5)}while(a===b||(a===-b));
  return{type:"grid",xmin:-6,xmax:6,ymin:-6,ymax:6,answer:[[b,a]],show:PT(b,a),given:[{x:a,y:b,label:"P",color:"var(--l-fun)"}],fns:[{f:x=>x,color:"var(--muted)",dash:"5 4",width:1.5}],
   q:`El punto ${M("P = "+PT(a,b))} está en la gráfica de f. Marca el punto que le corresponde en la gráfica de ${M(P("f","−1"))}.`,hint:"Si f(a) = b, entonces f⁻¹(b) = a: se intercambian las coordenadas. Es el reflejo de P en la recta y = x.",
   why:p=>p[0][0]===-a&&p[0][1]===-b?"Ese es el simétrico respecto del origen; aquí el espejo es la recta y = x.":"",explain:`Se intercambian las coordenadas: ${PT(b,a)}, que es el reflejo de P en la recta y = x.`}},
 R=>{const k=R.nz(-6,6),s=k>0?"+":"−",K=Math.abs(k);
  return{type:"choice",q:`Si ${M(`f(x) = x ${s} ${K}`)}, ¿cuál es ${M(`${P("f","−1")}(x)`)}?`,opts:[`x ${k>0?"−":"+"} ${K}`,`1 / (x ${s} ${K})`,`−x ${k>0?"−":"+"} ${K}`,`${k>0?"":"−"}${K} − x`].map(M),hint:"La inversa deshace la operación; el −1 no es un exponente.",
   explain:`f ${k>0?"suma":"resta"} ${K}; para deshacerlo hay que ${k>0?"restar":"sumar"} ${K}. 1 / f(x) es otra cosa: el inverso multiplicativo del resultado.`}}]
});

Object.assign(RECAP,{
F1:{map:[0,1,2,3,0],pts:[
  {s:"Evaluar una función",t:"Se sustituye x por el número, con paréntesis si es negativo.",ex:"f(x) = 2x + 3: f(−1) = 1"},
  {s:"Qué es y qué no es función",t:"A cada entrada, exactamente una salida.",ex:"«los divisores de n» no es función"},
  {s:"Variables",t:"La independiente se elige; la dependiente resulta.",ex:"el área depende del radio"},
  {s:"Leer al revés",t:"Conocida la salida, se plantea una ecuación para hallar la entrada.",ex:"f(x) = 13 → x = 5"}]},
F2:{map:[0,1,2,3,1],pts:[
  {s:"Denominadores",t:"Se excluyen las x que anulan un denominador.",ex:"1/(x − 2): ℝ − {2}"},
  {s:"Raíces cuadradas",t:"Lo de dentro de √ debe ser ≥ 0.",ex:"√(x − 3): [3, +∞)"},
  {s:"El rango",t:"Los valores que puede tomar f(x).",ex:"x² + 3: [3, +∞)"},
  {s:"Leer en la gráfica",t:"Dominio: sombra sobre el eje x; rango: sombra sobre el eje y.",ex:"punto vacío: extremo excluido"}]},
F3:{map:[0,1,2,3,0],pts:[
  {s:"Leer valores",t:"f(a) es la altura de la gráfica sobre x = a.",ex:"f(2) = 3 si (2, 3) está en la gráfica"},
  {s:"Prueba de la recta vertical",t:"Es función si ninguna vertical corta la curva dos veces.",ex:"la circunferencia no es función"},
  {s:"Máximos y mínimos",t:"El punto más alto o más bajo de la gráfica.",ex:"−(x − 1)² + 3: máximo 3 en x = 1"},
  {s:"Ceros",t:"Las x donde la gráfica corta el eje x.",ex:"x² − 2x − 3: ceros −1 y 3"}]},
F4:{map:[0,1,2,3,2],pts:[
  {s:"Cambio constante",t:"En una función lineal las diferencias de la tabla son iguales a m.",ex:"2, 5, 8, 11: m = 3"},
  {s:"Fórmula desde un contexto",t:"El precio por unidad multiplica a x; el cargo fijo es b.",ex:"f(x) = 3500x + 12 000"},
  {s:"Fórmula desde dos datos",t:"m = Δf / Δx; después b con un dato.",ex:"f(2) = 7, f(5) = 16 → f(x) = 3x + 1"},
  {s:"Ceros",t:"mx + b = 0 en x = −b / m.",ex:"2x − 3: cero en 3/2"}]},
F5:{map:[0,2,1,2,3],pts:[
  {s:"Evaluar por tramos",t:"Primero el tramo, después la fórmula; cuidado con los extremos.",ex:"en x = c manda el tramo con ≤ o ≥"},
  {s:"|x| por tramos",t:"|u| = u si u ≥ 0 y −u si u < 0.",ex:"|x − 3| = 3 − x si x < 3"},
  {s:"Traslaciones de |x|",t:"a|x − h| + k es una V con vértice (h, k).",ex:"|x + 2| − 1: vértice (−2, −1)"},
  {s:"Tramos en contexto",t:"Las tarifas por bloques suman lo de cada tramo.",ex:"130 kWh a un precio y el resto a otro"}]},
F6:{map:[0,1,2,0,3],pts:[
  {s:"Pares e impares",t:"Exponente par: simetría con el eje y. Impar: con el origen.",ex:"x² par, x³ impar"},
  {s:"Comparar potencias",t:"Entre 0 y 1 las potencias altas son menores; para x > 1, mayores.",ex:"0,5³ < 0,5² < 0,5"},
  {s:"Dominio y rango",t:"√x exige x ≥ 0; 1/x excluye el 0; ∛x acepta todo ℝ.",ex:"1/x²: rango (0, +∞)"},
  {s:"Ecuaciones con potencias",t:"Se despeja la potencia y se saca la raíz; la cúbica conserva el signo.",ex:"x³ = −27 → x = −3"}]},
F7:{map:[0,0,2,3,1],pts:[
  {s:"Evaluar composiciones",t:"g(f(x)): primero f, después g.",ex:"g(f(2)) = g(5)"},
  {s:"El orden importa",t:"En general g ∘ f ≠ f ∘ g.",ex:"(x + 3)² ≠ x² + 3"},
  {s:"Fórmula de la composición",t:"Se sustituye la x de la exterior por la fórmula de la interior.",ex:"g(f(x)) = (2x + 1)² + 3"},
  {s:"Descomponer",t:"Lo de dentro es f; lo que se aplica al final es g.",ex:"√(2x + 1): f = 2x + 1, g = √x"}]},
F8:{map:[0,1,2,3,0],pts:[
  {s:"Deshacer la función",t:"f⁻¹(b) es el número que f convierte en b.",ex:"f(5) = 13 → f⁻¹(13) = 5"},
  {s:"Calcular la inversa",t:"Se despeja x de y = f(x).",ex:"2x + 3 → (x − 3) / 2"},
  {s:"Cuándo existe",t:"Solo si f no repite salidas (inyectiva).",ex:"x² no tiene inversa en ℝ"},
  {s:"La gráfica reflejada",t:"(a, b) en f ↔ (b, a) en f⁻¹: reflejo en y = x.",ex:"(2, 7) → (7, 2)"}]}
});

Object.assign(EXPLORE,{
fMaquina(host){let k="lin",x=2;const hist=[];
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="fm">Regla f(x) =</label><select id="fm">${Object.entries(FCAT).map(([c,v])=>`<option value="${c}" ${c===k?"selected":""}>${v.t}</option>`).join("")}</select><label for="fx">Entrada x = <output class="m" id="fxo"></output></label><input type="range" id="fx" min="-12" max="12" value="4"><button class="btn sm" id="fclr">Vaciar la tabla</button></div>
   <div class="svgwrap" id="fmsvg"></div><div id="fmtab" style="overflow-x:auto"></div><div class="svgwrap" id="fmplot"></div><div class="readout" id="fmr"></div></div>`;
  const draw=()=>{const F_=FCAT[k],y=F_.f(x),ok=isFinite(y);const ys=ok?decs(y,3):"no existe";
    if(ok&&!hist.some(h=>h[0]===x&&h[2]===k))hist.push([x,y,k]);while(hist.length>8)hist.shift();
    $("#fmsvg",host).innerHTML=`<svg viewBox="0 0 560 120" role="img" aria-label="Máquina de la función"><rect x="190" y="20" width="180" height="80" rx="14" fill="color-mix(in srgb,var(--l-fun) 16%,var(--surface))" stroke="var(--l-fun)" stroke-width="3"/>
      <text x="280" y="56" text-anchor="middle" style="font:700 15px var(--f-disp);fill:var(--l-fun)">f</text><text x="280" y="80" text-anchor="middle" style="font:700 16px var(--f-mono);fill:var(--ink)">${F_.t}</text>
      <path d="M60 60 H180" stroke="var(--ink)" stroke-width="3" marker-end="url(#ar)"/><path d="M380 60 H500" stroke="var(--ink)" stroke-width="3" marker-end="url(#ar)"/>
      <defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink)"/></marker></defs>
      <text x="40" y="66" text-anchor="middle" style="font:700 17px var(--f-mono);fill:var(--ink)">${decs(x,1)}</text><text x="530" y="66" text-anchor="middle" style="font:700 17px var(--f-mono);fill:${ok?"var(--l-fun)":"var(--bad)"}">${ys}</text></svg>`;
    const H=hist.filter(h=>h[2]===k);
    $("#fmtab",host).innerHTML=figTable(["x",...H.map(h=>decs(h[0],1))],[["f(x) = "+F_.t,...H.map(h=>decs(h[1],3))]]);
    $("#fmplot",host).innerHTML=plot({xmin:-6,xmax:6,ymin:-6,ymax:12,w:360,h:300,xstep:2,ystep:2,axes:true,pts:H.map(h=>({x:h[0],y:h[1],color:"var(--l-fun)",r:5})),aria:"Puntos (x, f(x)) obtenidos"});
    $("#fxo",host).textContent=decs(x,1);
    $("#fmr",host).innerHTML=`<span class="k">Cálculo</span>f(${decs(x,1)}) = ${ys}<br><span class="k">Variables</span>x es la entrada (independiente); f(x) es la salida (dependiente)`+(ok?"":`<br><span class="k">Ojo</span>${k==="raiz"?"no hay raíz cuadrada real de un negativo":"no se puede dividir entre 0"}: este x no está en el dominio`)};
  $("#fm",host).onchange=e=>{k=e.target.value;draw()};$("#fx",host).oninput=e=>{x=+e.target.value/2;draw()};$("#fclr",host).onclick=()=>{hist.length=0;draw()};draw()},

fDomRan(host){const C={cuad:{t:"x²",f:x=>x*x,d:"ℝ",r:"[0, +∞)"},raiz:{t:"√x",f:x=>x>=0?Math.sqrt(x):NaN,d:"[0, +∞)",r:"[0, +∞)"},inv:{t:"1 / x",f:x=>x!==0?1/x:NaN,d:"ℝ − {0}",r:"ℝ − {0}"},semi:{t:"√(9 − x²)",f:x=>9-x*x>=0?Math.sqrt(9-x*x):NaN,d:"[−3, 3]",r:"[0, 3]"},lin:{t:"x / 2 + 1",f:x=>x/2+1,d:"ℝ",r:"ℝ"},abs:{t:"|x| − 2",f:x=>Math.abs(x)-2,d:"ℝ",r:"[−2, +∞)"}};
  let k="cuad",res=false,a=-1,b=2;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="dk">f(x) =</label><select id="dk">${Object.entries(C).map(([c,v])=>`<option value="${c}">${v.t}</option>`).join("")}</select><button class="btn sm" id="dres" aria-pressed="false">Restringir el dominio</button>
   <label for="da">desde <output class="m" id="dao"></output></label><input type="range" id="da" min="-5" max="5" value="${a}"><label for="db">hasta <output class="m" id="dbo"></output></label><input type="range" id="db" min="-5" max="5" value="${b}"></div>
   <div class="svgwrap" id="dsvg2"></div><div class="readout" id="drr2"></div></div>`;
  const draw=()=>{const F_=C[k],lo=Math.min(a,b),hi=Math.max(a,b);let ymin=Infinity,ymax=-Infinity,hasPos=false;
    if(res)for(let i=0;i<=600;i++){const x=lo+(hi-lo)*i/600,y=F_.f(x);if(isFinite(y)){ymin=Math.min(ymin,y);ymax=Math.max(ymax,y);hasPos=true}}
    const segs=[];if(res&&hasPos){segs.push({x1:lo,y1:-.12,x2:hi,y2:-.12,color:"var(--l-ent)",width:7,op:.55},{x1:-.12,y1:ymin,x2:-.12,y2:ymax,color:"var(--l-rac)",width:7,op:.55})}
    $("#dsvg2",host).innerHTML=plot({xmin:-6,xmax:6,ymin:-4,ymax:8,w:440,equal:true,xstep:1,ystep:1,axes:true,segs,fns:[{f:F_.f,color:res?"var(--muted)":"var(--l-fun)",width:res?1.5:3},...(res?[{f:F_.f,from:lo,to:hi,color:"var(--l-fun)",width:3.5}]:[])],aria:"Gráfica con su dominio y su rango"});
    $("#dao",host).textContent=fmt(a);$("#dbo",host).textContent=fmt(b);$("#dres",host).setAttribute("aria-pressed",res);["#da","#db"].forEach(s=>$(s,host).disabled=!res);
    $("#drr2",host).innerHTML=`<span class="k">Función</span>f(x) = ${F_.t}<br><span class="k">Dominio natural</span>${F_.d}<br><span class="k">Rango</span>${F_.r}`+(res?(hasPos?`<br><span class="k">Restringida a</span>[${fmt(lo)}, ${fmt(hi)}] (franja azul)${k==="inv"&&lo<=0&&hi>=0?", sin el 0":""}<br><span class="k">Nuevo rango</span>${k==="inv"&&lo<=0&&hi>=0?"se parte en dos: f no está definida en 0":`[${decs(ymin,2)}, ${decs(ymax,2)}] (franja naranja)`}`:`<br><span class="k">Restringida</span>en [${fmt(lo)}, ${fmt(hi)}] la función no está definida: ningún x de ese tramo está en el dominio`):"")};
  $("#dk",host).onchange=e=>{k=e.target.value;draw()};$("#dres",host).onclick=()=>{res=!res;draw()};$("#da",host).oninput=e=>{a=+e.target.value;draw()};$("#db",host).oninput=e=>{b=+e.target.value;draw()};draw()},

fVertical(host){const C={par:["Parábola y = x² − 3",{fns:[{f:x=>x*x-3}]},x=>[x*x-3]],cir:["Circunferencia x² + y² = 9",{fns:[{f:x=>Math.sqrt(9-x*x)},{f:x=>-Math.sqrt(9-x*x)}]},x=>Math.abs(x)<3?[Math.sqrt(9-x*x),-Math.sqrt(9-x*x)]:Math.abs(x)===3?[0]:[]],
   semi:["Semicircunferencia y = √(9 − x²)",{fns:[{f:x=>Math.sqrt(9-x*x)}]},x=>Math.abs(x)<=3?[Math.sqrt(9-x*x)]:[]],acos:["Parábola acostada x = y² − 2",{fns:[{f:x=>Math.sqrt(x+2)},{f:x=>-Math.sqrt(x+2)}]},x=>x>-2?[Math.sqrt(x+2),-Math.sqrt(x+2)]:x===-2?[0]:[]],
   cub:["Cúbica y = x³/4 − 2x",{fns:[{f:x=>x*x*x/4-2*x}]},x=>[x*x*x/4-2*x]],vert:["Recta vertical x = 1",{vl:[{x:1,width:3}]},x=>x===1?["todos"]:[]]};
  let k="cir",x=1.5;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="vk">Curva</label><select id="vk">${Object.entries(C).map(([c,v])=>`<option value="${c}" ${c===k?"selected":""}>${v[0]}</option>`).join("")}</select><label for="vx">Recta vertical x = <output class="m" id="vxo"></output></label><input type="range" id="vx" min="-50" max="50" value="15"></div>
   <div class="svgwrap" id="vsvg"></div><div class="readout" id="vrr"></div></div>`;
  const draw=()=>{const [nm,o,cut]=C[k],ys=cut(x),inf=ys[0]==="todos";const col=o.fns?o.fns.map(f=>({...f,color:"var(--l-fun)"})):[];
    $("#vsvg",host).innerHTML=plot({xmin:-5,xmax:5,ymin:-5,ymax:5,w:420,equal:true,xstep:1,ystep:1,axes:true,fns:col,vl:[...(o.vl||[]).map(v=>({...v,color:"var(--l-fun)"})),{x,color:ys.length>1||inf?"var(--bad)":"var(--ink)",dash:"6 4",width:2}],pts:inf?[]:ys.map(y=>({x,y,color:ys.length>1?"var(--bad)":"var(--ok)"})),aria:"Prueba de la recta vertical"});
    $("#vxo",host).textContent=decs(x,1);
    $("#vrr",host).innerHTML=`<span class="k">Curva</span>${nm}<br><span class="k">La recta x = ${decs(x,1)}</span>${inf?"coincide con la curva: la corta en infinitos puntos":ys.length===0?"no corta la curva: ese x no está en el dominio":ys.length===1?"la corta en un punto":"la corta en "+ys.length+" puntos: a una misma x le tocarían dos alturas"}<br><span class="k">¿Es función?</span>${["cir","acos","vert"].includes(k)?"No: hay rectas verticales que la cortan más de una vez":"Sí: ninguna recta vertical la corta más de una vez"}`};
  $("#vk",host).onchange=e=>{k=e.target.value;draw()};$("#vx",host).oninput=e=>{x=+e.target.value/10;draw()};draw()},

fLineal(host){let m=3,b=2;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="lm">Pendiente m = <output class="m" id="lmo"></output></label><input type="range" id="lm" min="-8" max="8" value="6"><label for="lb">Valor inicial b = <output class="m" id="lbo"></output></label><input type="range" id="lb" min="-6" max="6" value="${b}"></div>
   <div class="svgwrap" id="lsvg3"></div><div id="ltab3" style="overflow-x:auto"></div><div class="readout" id="lrr3"></div></div>`;
  const draw=()=>{const f=x=>m*x+b,xs=[0,1,2,3,4];
    $("#lsvg3",host).innerHTML=plot({xmin:-6,xmax:6,ymin:-8,ymax:8,w:420,h:420,xstep:1,ystep:2,axes:true,fns:[{f,color:"var(--l-fun)"}],segs:m?[{x1:1,y1:f(1),x2:2,y2:f(1),color:"var(--l-ent)",width:2.5},{x1:2,y1:f(1),x2:2,y2:f(2),color:"var(--l-ent)",width:2.5}]:[],
      pts:[{x:0,y:b,color:"var(--l-fun)",label:`(0, ${decs(b,1)})`,dx:-60},...(m?[{x:-b/m,y:0,color:"var(--bad)",label:"cero"}]:[]),...xs.map(x=>({x,y:f(x),r:3.5,color:"var(--l-fun)"}))],aria:"Función lineal"});
    $("#ltab3",host).innerHTML=figTable(["x",...xs.map(String)],[["f(x)",...xs.map(x=>decs(f(x),1))],["diferencia","",...xs.slice(1).map(x=>(m>=0?"+":"")+decs(m,1))]]);
    $("#lmo",host).textContent=decs(m,1);$("#lbo",host).textContent=fmt(b);
    $("#lrr3",host).innerHTML=`<span class="k">Fórmula</span>f(x) = ${m===0?fmt(b):`${m===1?"":m===-1?"−":decs(m,1)}x${b?` ${b<0?"−":"+"} ${Math.abs(b)}`:""}`}<br><span class="k">Razón de cambio</span>${m===0?"0: la función es constante":`cada vez que x aumenta 1, f ${m>0?"aumenta":"disminuye"} ${decs(Math.abs(m),1)}`}<br><span class="k">Cero</span>${m===0?(b===0?"todos los x":"no tiene: la recta es horizontal y no toca el eje x"):`x = −b / m = ${decs(-b/m,2)}`}`+(b===0&&m!==0?`<br><span class="k">Proporcionalidad</span>b = 0: f(x) / x = ${decs(m,1)} siempre`:"")};
  $("#lm",host).oninput=e=>{m=+e.target.value/2;draw()};$("#lb",host).oninput=e=>{b=+e.target.value;draw()};draw()},

fTramos(host){let h=1,k=-1,a=1;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="th">h = <output class="m" id="tho"></output></label><input type="range" id="th" min="-4" max="4" value="${h}"><label for="tk">k = <output class="m" id="tko"></output></label><input type="range" id="tk" min="-4" max="4" value="${k}"><label for="ta">a = <output class="m" id="tao"></output></label><input type="range" id="ta" min="-6" max="6" value="2"></div>
   <div class="svgwrap" id="tsvg"></div><div class="readout" id="trr"></div></div>`;
  const draw=()=>{const f=x=>a*Math.abs(x-h)+k,in_=`x ${h>0?"− "+h:h<0?"+ "+(-h):""}`.trim(),aT=a===1?"":a===-1?"−":decs(a,1)+" · ";
    $("#tsvg",host).innerHTML=plot({xmin:-7,xmax:7,ymin:-7,ymax:7,w:420,equal:true,xstep:1,ystep:1,axes:true,fns:[{f,from:h,color:"var(--l-fun)"},{f,to:h,color:"var(--l-ent)"}],pts:[{x:h,y:k,label:`vértice (${fmt(h)}, ${fmt(k)})`,color:"var(--ink)"}],aria:"Gráfica de a|x − h| + k"});
    ["h","k"].forEach(n=>$(`#t${n}o`,host).textContent=fmt({h,k}[n]));$("#tao",host).textContent=decs(a,1);
    const right=`${aT}(${in_})${k?` ${k<0?"−":"+"} ${Math.abs(k)}`:""}`,left=`${aT}(${h>0?h+" − x":h<0?"−x − "+(-h):"−x"})${k?` ${k<0?"−":"+"} ${Math.abs(k)}`:""}`;
    $("#trr",host).innerHTML=`<span class="k">Fórmula</span>f(x) = ${aT}|${in_}|${k?` ${k<0?"−":"+"} ${Math.abs(k)}`:""}<br><span class="k">Por tramos</span>${pw([[right.replace("(x)","x"),`x ≥ ${fmt(h)}`],[left,`x &lt; ${fmt(h)}`]])}<br><span class="k">Forma</span>${a>0?"V abierta hacia arriba: mínimo "+fmt(k)+" en x = "+fmt(h):a<0?"V boca abajo: máximo "+fmt(k)+" en x = "+fmt(h):"con a = 0 la gráfica es la recta horizontal y = "+fmt(k)}${Math.abs(a)>1?"; más cerrada que |x|":Math.abs(a)<1&&a!==0?"; más abierta que |x|":""}`};
  $("#th",host).oninput=e=>{h=+e.target.value;draw()};$("#tk",host).oninput=e=>{k=+e.target.value;draw()};$("#ta",host).oninput=e=>{a=+e.target.value/2;draw()};draw()},

fPotencia(host){const E={"1":[x=>x,"x"],"2":[x=>x*x,"x²"],"3":[x=>x*x*x,"x³"],"4":[x=>x**4,"x⁴"],"-1":[x=>x?1/x:NaN,"1/x"],"-2":[x=>x?1/(x*x):NaN,"1/x²"],"1/2":[x=>x>=0?Math.sqrt(x):NaN,"√x"],"1/3":[x=>Math.cbrt(x),"∛x"]};
  const INFO={"1":["ℝ","ℝ","impar"],"2":["ℝ","[0, +∞)","par"],"3":["ℝ","ℝ","impar"],"4":["ℝ","[0, +∞)","par"],"-1":["ℝ − {0}","ℝ − {0}","impar"],"-2":["ℝ − {0}","(0, +∞)","par"],"1/2":["[0, +∞)","[0, +∞)","ninguna (no está definida para x < 0)"],"1/3":["ℝ","ℝ","impar"]};
  const on=new Set(["2","3"]),COL=["var(--l-fun)","var(--l-ent)","var(--l-rec)","var(--l-rac)"];let zoom=false;
  host.innerHTML=`<div class="xp"><div class="ctrl"><span class="seg" role="group" aria-label="Exponentes">${Object.entries(E).map(([n,v])=>`<button class="btn sm" data-n="${n}">${v[1]}</button>`).join("")}</span><button class="btn sm" id="pz" aria-pressed="false">Mirar entre 0 y 1</button></div>
   <div class="svgwrap" id="pwsvg"></div><div class="readout" id="pwr"></div></div>`;
  const draw=()=>{const L=[...on].slice(0,4);
    $("#pwsvg",host).innerHTML=plot({...(zoom?{xmin:-.2,xmax:1.4,ymin:-.2,ymax:1.4,xstep:.2,ystep:.2}:{xmin:-3,xmax:3,ymin:-3,ymax:3,xstep:1,ystep:1}),w:420,equal:true,axes:true,fns:L.map((n,i)=>({f:E[n][0],color:COL[i],dash:i?"7 4":""})),labels:L.map((n,i)=>({x:zoom?1.05:1.6,y:zoom?Math.min(1.3,E[n][0](1.05))+.05:Math.max(-2.8,Math.min(2.7,E[n][0](1.6)))+.15,text:E[n][1],color:COL[i]})),aria:"Gráficas de funciones de potencia"});
    $$("[data-n]",host).forEach(b=>b.setAttribute("aria-pressed",on.has(b.dataset.n)));$("#pz",host).setAttribute("aria-pressed",zoom);
    $("#pwr",host).innerHTML=L.map(n=>`<span class="k">${E[n][1]}</span>dominio ${INFO[n][0]} · rango ${INFO[n][1]} · simetría: ${INFO[n][2]==="par"?"par (eje y)":INFO[n][2]==="impar"?"impar (origen)":INFO[n][2]}`).join("<br>")+(zoom?`<br><span class="k">Entre 0 y 1</span>con x = 0,5: ${L.map(n=>`${E[n][1]} = ${decs(E[n][0](.5),3)}`).join(", ")}`:"")||"Elige al menos una función."};
  $$("[data-n]",host).forEach(b=>b.onclick=()=>{const n=b.dataset.n;on.has(n)?on.delete(n):on.size<4&&on.add(n);draw()});$("#pz",host).onclick=()=>{zoom=!zoom;draw()};draw()},

fCompo(host){const L_={a:["x + 3",x=>x+3],b:["2x",x=>2*x],c:["x²",x=>x*x],d:["x − 5",x=>x-5],e:["√x",x=>x>=0?Math.sqrt(x):NaN],g:["1 / x",x=>x?1/x:NaN]};let fk="a",gk="c",x=2;
  const sel=(id,v)=>`<select id="${id}">${Object.entries(L_).map(([c,t])=>`<option value="${c}" ${c===v?"selected":""}>${t[0]}</option>`).join("")}</select>`;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="cf">f(x) =</label>${sel("cf",fk)}<label for="cg">g(x) =</label>${sel("cg",gk)}<label for="cxx">x = <output class="m" id="cxo"></output></label><input type="range" id="cxx" min="-10" max="10" value="${x}"></div>
   <div class="svgwrap" id="csvg2"></div><div class="readout" id="crr5"></div></div>`;
  const sub=(outer,inner)=>outer.replace(/x/g,inner.length>2&&!/^[√]/.test(inner)?`(${inner})`:inner);
  const draw=()=>{const [ft,f]=L_[fk],[gt,g]=L_[gk],fx=f(x),gfx=g(fx),gx=g(x),fgx=f(gx),V=v=>isFinite(v)?decs(v,3):"no existe";
    const box=(cx,t,c)=>`<rect x="${cx-62}" y="25" width="124" height="60" rx="12" fill="color-mix(in srgb,${c} 16%,var(--surface))" stroke="${c}" stroke-width="3"/><text x="${cx}" y="62" text-anchor="middle" style="font:700 15px var(--f-mono);fill:var(--ink)">${t}</text>`;
    const ar=(x1,x2)=>`<path d="M${x1} 55 H${x2}" stroke="var(--ink)" stroke-width="2.5" marker-end="url(#ar2)"/>`,tx=(cx,t,c)=>`<text x="${cx}" y="45" text-anchor="middle" style="font:700 15px var(--f-mono);fill:${c||"var(--ink)"}">${t}</text>`;
    $("#csvg2",host).innerHTML=`<svg viewBox="0 0 620 110" role="img" aria-label="Composición: primero f, después g"><defs><marker id="ar2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink)"/></marker></defs>
      ${tx(30,fmt(x))}${ar(50,120)}${box(185,"f: "+ft,"var(--l-fun)")}${ar(250,300)}${tx(325,V(fx),"var(--l-fun)")}${ar(350,400)}${box(465,"g: "+gt,"var(--l-ent)")}${ar(530,575)}${tx(598,isFinite(fx)?V(gfx):"—","var(--l-ent)")}</svg>`;
    $("#cxo",host).textContent=fmt(x);
    $("#crr5",host).innerHTML=`<span class="k">(g ∘ f)(x)</span>g(f(x)) = ${sub(gt,ft)}<br><span class="k">(g ∘ f)(${fmt(x)})</span>g(f(${fmt(x)})) = g(${V(fx)}) = ${isFinite(fx)?V(gfx):"no existe"}<br><span class="k">(f ∘ g)(x)</span>f(g(x)) = ${sub(ft,gt)}<br><span class="k">(f ∘ g)(${fmt(x)})</span>f(g(${fmt(x)})) = f(${V(gx)}) = ${isFinite(gx)?V(fgx):"no existe"}<br><span class="k">Comparación</span>${isFinite(gfx)&&isFinite(fgx)&&Math.abs(gfx-fgx)<1e-9?"aquí coinciden, pero en general el orden importa":"el orden cambia el resultado"}`};
  $("#cf",host).onchange=e=>{fk=e.target.value;draw()};$("#cg",host).onchange=e=>{gk=e.target.value;draw()};$("#cxx",host).oninput=e=>{x=+e.target.value;draw()};draw()},

fInversa(host){const C={lin:["2x + 3",x=>2*x+3,y=>(y-3)/2,"(x − 3) / 2"],cub:["x³ / 4",x=>x*x*x/4,y=>Math.cbrt(4*y),"∛(4x)"],raiz:["x² con x ≥ 0",x=>x>=0?x*x:NaN,y=>y>=0?Math.sqrt(y):NaN,"√x"],cuad:["x² (en todo ℝ)",x=>x*x,null,"no tiene"],exp:["2ˣ",x=>Math.pow(2,x),y=>y>0?Math.log2(y):NaN,"log₂ x"]};
  let k="lin",t=1,hy=2;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ik">f(x) =</label><select id="ik">${Object.entries(C).map(([c,v])=>`<option value="${c}">${v[0]}</option>`).join("")}</select><label for="it">Punto: x = <output class="m" id="ito"></output></label><input type="range" id="it" min="-30" max="30" value="10"><label for="ih">Recta horizontal y = <output class="m" id="iho"></output></label><input type="range" id="ih" min="-10" max="50" value="20"></div>
   <div class="svgwrap" id="isvg"></div><div class="readout" id="irr"></div></div>`;
  const draw=()=>{const [nm,f,fi,ft]=C[k],y=f(t),ok=isFinite(y);let cuts=0;for(let i=0;i<=1000;i++){const x=-6+12*i/1000,a=f(x)-hy,b=f(x+.012)-hy;if(isFinite(a)&&isFinite(b)&&(a===0||a*b<0))cuts++}
    $("#isvg",host).innerHTML=plot({xmin:-6,xmax:6,ymin:-6,ymax:6,w:440,equal:true,xstep:1,ystep:1,axes:true,fns:[{f,color:"var(--l-fun)"},...(fi?[{f:fi,color:"var(--l-ent)",dash:"7 4"}]:[]),{f:x=>x,color:"var(--muted)",dash:"3 4",width:1.5}],hl:[{y:hy,color:cuts>1?"var(--bad)":"var(--l-rac)",dash:"5 4",width:1.5}],
      segs:ok?[{x1:t,y1:y,x2:y,y2:t,color:"var(--muted)",dash:"2 4",width:1.5}]:[],pts:ok?[{x:t,y,color:"var(--l-fun)",label:`(${decs(t,1)}, ${decs(y,2)})`},...(fi?[{x:y,y:t,color:"var(--l-ent)",label:`(${decs(y,2)}, ${decs(t,1)})`}]:[])]:[],aria:"Función, su inversa y la recta y = x"});
    $("#ito",host).textContent=decs(t,1);$("#iho",host).textContent=decs(hy,1);
    $("#irr",host).innerHTML=`<span class="k">f(x)</span>${nm}<br><span class="k">Inversa</span>${fi?"f⁻¹(x) = "+ft+" (línea punteada azul)":"no tiene: dos entradas dan la misma salida"}<br>`+(ok?`<span class="k">Reflejo</span>f(${decs(t,1)}) = ${decs(y,2)}${fi?`, así que f⁻¹(${decs(y,2)}) = ${decs(t,1)}`:""}<br>`:`<span class="k">Punto</span>x = ${decs(t,1)} no está en el dominio<br>`)+
      `<span class="k">Recta horizontal</span>y = ${decs(hy,1)} corta la gráfica de f en ${cuts} ${cuts===1?"punto":"puntos"}${cuts>1?": f no es inyectiva y no se puede deshacer":""}`};
  $("#ik",host).onchange=e=>{k=e.target.value;draw()};$("#it",host).oninput=e=>{t=+e.target.value/10;draw()};$("#ih",host).oninput=e=>{hy=+e.target.value/10;draw()};draw()}
});
