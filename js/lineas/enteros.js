"use strict";
/* ============ Línea: Los números enteros (E1–E6) ============ */

Object.assign(NODES,{
E1:{title:"Programas de cálculo",sub:"Cuando falta un dato, la respuesta es una fórmula.",
 info:`<p class="lead">Cuando a un problema le falta un dato, la respuesta ya no es un número: es una <b>fórmula</b> que guarda el programa de cálculo y sirve para cualquier valor de ese dato.</p>
 <div class="ex-box"><span class="eyebrow">Ejemplo</span><p>Laura llevó sus tazos al colegio. En la primera partida perdió 9 y en la segunda ganó 7. ¿Cuántos tiene ahora?</p>
 <p>No sabemos con cuántos empezó, así que llamamos <span class="m">a</span> a ese número. La respuesta es <span class="m">a − 9 + 7</span>.</p></div>
 <p>Esa fórmula se puede decir más corta. Perder 9 y después ganar 7 tiene el mismo efecto que perder 2:</p>
 <p class="calc">a − 9 + 7 = a − 2</p>
 <p>Cada «+ número» o «− número» es un <b>movimiento</b> que se aplica a lo que haya. Dos movimientos seguidos se pueden <b>componer</b> en uno solo: restar 9 y sumar 7 es lo mismo que restar 2.</p>
 <div class="callout"><span class="eyebrow">Cambia la forma de leer los signos</span>
 <p>En aritmética, en <span class="m">13 − 5 − 3</span> se calcula de izquierda a derecha: 13 − 5 = 8 y luego 8 − 3 = 5. En <span class="m">b − 5 − 3</span> no se puede calcular <span class="m">b − 5</span>. Entonces cada signo se lee pegado al número que lo sigue: <span class="m">−5</span> y <span class="m">−3</span> son dos movimientos que, juntos, son <span class="m">−8</span>. Así, <span class="m">b − 5 − 3 = b − 8</span>.</p></div>
 <div class="ex-box"><span class="eyebrow">Ejemplo resuelto</span><p>Un tren sale con <span class="m">b</span> pasajeros. En la primera parada bajan 15 y suben 12; en la segunda bajan 38 y suben 42. ¿Con cuántos llega?</p>
 <p class="calc">b − 15 + 12 − 38 + 42<br>= b − 3 + 4<br>= b + 1</p><p>Si salió con 427 pasajeros, llegó con 428. La fórmula responde todas las preguntas de ese tipo a la vez.</p></div>`,
 explore:{intro:"Arma un programa de movimientos y mira cómo varios saltos se convierten en uno solo, empieces donde empieces.",fn:"xTraslaciones"},
 key:"Una fórmula guarda un programa de cálculo. Los signos + y − quedan pegados al número que los sigue e indican si se suma o se resta; varios movimientos seguidos se componen en uno solo.",
 ojo:"En los cálculos con expresiones en las que aparecen cantidades Variables no siempre se puede operar de izquierda a derecha. La pregunta útil es: ¿qué efecto tienen todos estos movimientos juntos?"},

E2:{title:"Calcular con economía",sub:"En álgebra se elige el camino más corto.",
 info:`<p class="lead">Los cálculos con expresiones en las que aparecen cantidades Variables no tienen un único algoritmo. Se trata de elegir el camino con menos cuentas. Hay cuatro herramientas:</p>
 <ol class="plain">
 <li><b>El orden de los movimientos no cambia el resultado.</b> Restar 5 y luego sumar 2 da lo mismo que sumar 2 y luego restar 5. Cada término se puede mover, siempre <b>con su signo</b>.</li>
 <li><b>Lo que se suma y se resta se anula.</b> <span class="m">a − 36 + 87 − 5 + 36 = a + 82</span></li>
 <li><b>Busca cuentas fáciles.</b> <span class="m">b − 42 + 25 − 38 = b − 80 + 25 = b − 55</span>, porque −42 − 38 da un número redondo.</li>
 <li><b>Los términos con la misma cantidad Variable se cuentan juntos.</b> <span class="m">3f + 5f − 2f = 6f</span>: tres efes más cinco efes menos dos efes.</li></ol>
 <div class="ex-box"><span class="eyebrow">Ejemplo resuelto</span><p class="calc">3f + 77 + 5f − 82 + 23 + 82 − 2f<br>= 3f + 5f − 2f + 77 + 23   <span class="muted">(−82 y +82 se anulan)</span><br>= 6f + 100</p></div>
 <div class="ex-box"><span class="eyebrow">Ejemplo resuelto</span><p class="calc">100 − r − n + 48 − 99 − 18<br>= 1 + 48 − 18 − r − n   <span class="muted">(100 − 99 = 1)</span><br>= 31 − r − n</p></div>`,
 explore:{intro:"Toca un término y después su opuesto para tacharlos. Antes de hacer cuentas, busca todas las parejas que se anulan.",fn:"xTachar"},
 key:"En el cálculo algebraico no hay una sola receta: se elige el camino más corto. Los términos se reordenan con su signo, los opuestos se anulan y los términos con la misma cantidad Variable se cuentan juntos.",
 ojo:"Al mover un término, su signo viaja con él. En d − 7 − 4, el 4 no se le resta al 7: se le resta a d."},

E3:{title:"Diferencias y paréntesis",sub:"Comparar obliga a restar expresiones completas.",
 info:`<p class="lead">Para comparar dos cantidades se calcula su <b>diferencia</b>. Cuando las cantidades son expresiones, hay que restar la expresión completa.</p>
 <div class="ex-box"><span class="eyebrow">Ejemplo</span><p>Alberto tiene <span class="m">a</span> mil pesos. Laura tiene 35 más que él y Clara tiene 20 menos. ¿Cuánto más tiene Laura que Clara?</p>
 <p>Laura tiene <span class="m">a + 35</span> y Clara <span class="m">a − 20</span>. Se resta todo lo de Clara, así que va entre paréntesis:</p>
 <p class="calc">(a + 35) − (a − 20)<br>= a + 35 − a + 20<br>= 55</p></div>
 <p>El menos que está delante de un paréntesis <b>cambia cada término de dentro</b>: lo que se sumaba pasa a restarse y lo que se restaba pasa a sumarse. Restar «20 menos» es devolver esos 20.</p>
 <p><b>Diferencias con signo.</b> Si se calcula al revés, <span class="m">(a − 20) − (a + 35) = −55</span>. El 55 dice cuánto se diferencian; el signo dice quién tiene más. Una diferencia negativa significa que el primer término es el menor. No es un error ni una deuda.</p>
 <div class="callout"><span class="eyebrow">El error más frecuente</span><p>En el estudio de Eva Cid (2015) con estudiantes de secundaria, cerca de la mitad cambiaba solo el signo del primer término del paréntesis y escribía <span class="m">a + 35 − a − 20</span>. Compruébalo siempre con un número: si <span class="m">a = 50</span>, Laura tiene 85, Clara tiene 30 y la diferencia es 55, no 15.</p></div>`,
 explore:{intro:"Mueve el dinero de Alberto. La diferencia entre Laura y Clara no cambia, y la forma de escribirla decide si la cuenta sale bien.",fn:"xComparar"},
 key:"Para restar una expresión completa hay que ponerla entre paréntesis, y el menos de delante cambia todos sus términos. Una diferencia negativa no es un error: indica que el primer término es el menor.",
 ojo:"Cambiar solo el signo del primer término del paréntesis es el error más común. Compruébalo con un número."},

E4:{title:"Las caras del menos",sub:"Un mismo signo, tres trabajos distintos.",
 info:`<p class="lead">El signo <span class="m">−</span> hace tres trabajos distintos. Leer bien una expresión empieza por saber cuál está haciendo cada vez.</p>
 <ol class="plain">
 <li><b>Restar.</b> Está entre dos términos: <span class="m">7 − 3</span>, <span class="m">a − 5</span>.</li>
 <li><b>Tomar el opuesto.</b> Cambia lo que tiene detrás: <span class="m">−(a − 5) = −a + 5</span>. Y <span class="m">−x</span> es el opuesto de <span class="m">x</span>.</li>
 <li><b>Ser negativo.</b> Forma parte del nombre de un número: <span class="m">−3</span> es el número que está tres lugares a la izquierda del cero.</li></ol>
 <div class="ex-box"><span class="eyebrow">Ejemplo</span><p>En <span class="m">5 − (−2)</span> el primer menos resta y el segundo dice que el 2 es negativo. Restar −2 es lo mismo que sumar 2:</p><p class="calc">5 − (−2) = 5 + 2 = 7</p></div>
 <div class="ex-box"><span class="eyebrow">El opuesto del opuesto</span><p class="calc">−(−3) = 3</p><p>Tomar el opuesto es reflejar en el cero. Dos reflejos devuelven el número a su sitio. Por eso, si <span class="m">−x = 7</span>, entonces <span class="m">x = −7</span>: x es el número cuyo opuesto es 7. Muchas personas responden <span class="m">x = 7</span>; compruébalo: el opuesto de 7 es −7, no 7.</p></div>
 <div class="callout"><span class="eyebrow">Una cantidad Variable puede valer un negativo</span><p><span class="m">−x</span> no siempre es negativo. Si <span class="m">x = −4</span>, entonces <span class="m">−x = 4</span>. Una cantidad Variable puede tomar cualquier valor, también uno negativo.</p></div>`,
 explore:{intro:"Elige un número y toma su opuesto varias veces. Después mira qué pasa con −x cuando x es negativo.",fn:"xOpuestos"},
 key:"El signo − tiene tres trabajos: restar, tomar el opuesto y marcar un número negativo. Para leer una expresión, pregúntate qué trabajo hace cada signo.",
 ojo:"Una cantidad Variable con un menos delante, como −x, no es necesariamente un número negativo."},

E5:{title:"Una sola fórmula",sub:"Los negativos permiten que una fórmula sirva en todos los casos.",
 info:`<p class="lead">Los números negativos no aparecieron para hablar de deudas o temperaturas. Su gran ventaja es que permiten que <b>una sola fórmula</b> sirva en todos los casos.</p>
 <div class="ex-box"><span class="eyebrow">Ejemplo</span><p>Un día el termómetro marca 6 grados sobre cero y otro día 5 bajo cero. Contando las marcas, hay 11 grados de diferencia.</p>
 <p>Si llamamos <span class="m">T</span> a la temperatura más alta y <span class="m">t</span> a la más baja, la diferencia es <span class="m">T − t</span>. ¿Sirve también bajo cero? Con <span class="m">t = −5</span>:</p>
 <p class="calc">T − t = 6 − (−5) = 6 + 5 = 11</p>
 <p>Y con dos temperaturas bajo cero, −3 y −8: <span class="m">−3 − (−8) = 5</span>. Sin negativos necesitaríamos una fórmula distinta para cada situación.</p></div>
 <p><b>El orden.</b> Un número es mayor que otro cuando la diferencia entre ellos es positiva. <span class="m">−3</span> es mayor que <span class="m">−8</span> porque <span class="m">−3 − (−8) = 5</span>. En la recta, mayor quiere decir más a la derecha.</p>
 <div class="callout"><span class="eyebrow">Lo que ya no vale en los enteros</span><p>Con los naturales, sumar siempre aumenta y restar siempre disminuye. Con los enteros no: <span class="m">7 + (−3) = 4</span> es menor que 7, y <span class="m">7 − (−3) = 10</span> es mayor que 7. Tampoco existe un número que sea el menor de todos.</p></div>`,
 explore:{intro:"Mueve las dos marcas del termómetro. Cuenta los grados entre ellas y compara con lo que da la fórmula T − t.",fn:"xTermometro"},
 key:"Los enteros permiten que una sola fórmula sirva en todos los casos. Las cantidades Variables pueden tomar valores positivos o negativos, y el orden lo decide el signo de la diferencia.",
 ojo:"Entre negativos, el que tiene la cifra más grande es el menor: −12 es menor que −3."},

E6:{title:"Productos con signo",sub:"La regla de los signos sale de la cuenta.",
 info:`<p class="lead">La regla de los signos del producto no hay que memorizarla a ciegas: sale de la <b>propiedad distributiva</b> y de llevar bien la cuenta de lo que se suma y lo que se quita.</p>
 <div class="ex-box"><span class="eyebrow">Un rectángulo que crece y encoge</span><p>Un rectángulo de base <span class="m">a</span> y altura <span class="m">b</span> tiene área <span class="m">ab</span>.</p>
 <p>Si la base aumenta 2: <span class="m">(a + 2)·b = ab + 2b</span>. Se añade una franja.</p>
 <p>Si la altura disminuye 1: <span class="m">a·(b − 1) = ab − a</span>. Se quita una franja.</p></div>
 <p>¿Y si los dos lados disminuyen? En <span class="m">(a − 1)(b − 2)</span> quitamos una franja de 1 por b y otra de a por 2. Pero la esquina de 1 por 2 queda quitada <b>dos veces</b>, así que hay que devolverla una vez:</p>
 <p class="calc">(a − 1)(b − 2) = ab − 2a − b + 2</p>
 <p>Ese <span class="m">+2</span> es «lo que se resta, multiplicado por lo que se resta, se suma». Con números: <span class="m">(−1)·(−2) = 2</span>.</p>
 <div class="ex-box"><span class="eyebrow">La regla, en resumen</span><p class="calc">(+)·(+) = +    (+)·(−) = −<br>(−)·(+) = −    (−)·(−) = +</p></div>
 <div class="callout"><span class="eyebrow">Ojo con el número de fuera</span><p>En <span class="m">−2(x − 5)</span> el −2 multiplica a los dos términos: <span class="m">−2x + 10</span>. El error frecuente es escribir <span class="m">−2x − 10</span>, cambiando solo el primer signo.</p></div>`,
 explore:{intro:"Cambia los lados del rectángulo. Mira qué franjas se añaden (verde), cuáles se quitan (rojo) y qué esquina se quita dos veces.",fn:"xRectangulo"},
 key:"La regla de los signos del producto sale de la propiedad distributiva: lo que se resta, multiplicado por lo que se resta, se devuelve sumando.",
 ojo:"Un número negativo delante de un paréntesis multiplica a todos los términos y cambia el signo de cada uno."}
});

function figHops(steps){const parts=[0];steps.forEach(s=>parts.push(parts[parts.length-1]+s));const lo=Math.min(...parts),hi=Math.max(...parts),X=v=>40+(v-lo)/((hi-lo)||1)*320;
  let g=`<svg viewBox="0 0 400 112" role="img" aria-label="Dos movimientos seguidos sobre la recta"><line x1="15" y1="70" x2="385" y2="70" stroke="var(--rule)" stroke-width="2"/>`;
  steps.forEach((s,i)=>{const x1=X(parts[i]),x2=X(parts[i+1]),h=20+i*12,c=s>0?"var(--ok)":"var(--bad)",d=x2>x1?1:-1;
    g+=`<path d="M${x1} 68 Q${(x1+x2)/2} ${68-h*2} ${x2} 68" fill="none" stroke="${c}" stroke-width="2.4"/><polygon points="${x2},68 ${x2-7*d},61 ${x2-2*d},72" fill="${c}"/>${T_((x1+x2)/2,68-h-6,(s>0?"+":"−")+Math.abs(s),"700 13px var(--f-mono)").replace("var(--muted)",c)}`});
  const xi=X(0),xf=X(parts[parts.length-1]);
  return g+`<circle cx="${xi}" cy="70" r="6" fill="var(--ink)"/>${T_(xi,92,"inicio")}<circle cx="${xf}" cy="70" r="5" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/>${T_(xf,Math.abs(xf-xi)<55?106:92,"final: ?")}</svg>`}
function figTrain(b1,s1,b2,s2,N){const xs=[40,150,270,380],nm=["Sale","Parada 1","Parada 2","Llega"],ch=["b",`−${b1}  +${s1}`,`−${b2}  +${s2}`,String(N)];
  return`<svg viewBox="0 0 420 92" role="img" aria-label="Recorrido del tren con sus paradas"><line x1="40" y1="42" x2="380" y2="42" stroke="var(--l-ent)" stroke-width="7" stroke-linecap="round"/>${xs.map((x,i)=>`<circle cx="${x}" cy="42" r="8" fill="var(--surface)" stroke="var(--l-ent)" stroke-width="4"/>${T_(x,20,nm[i])}${T_(x,74,ch[i],"600 13px var(--f-mono)").replace("var(--muted)","var(--ink)")}`).join("")}</svg>`}
function figThermo(t1,t2){const Y=v=>182-(v+15)/25*160;let g=`<svg viewBox="0 0 300 200" role="img" aria-label="Termómetro con las dos temperaturas"><rect x="100" y="14" width="18" height="176" rx="9" fill="var(--surface-2)" stroke="var(--rule)"/>`;
  for(let v=-15;v<=10;v+=5)g+=`<line x1="92" y1="${Y(v)}" x2="100" y2="${Y(v)}" stroke="var(--muted)"/><text x="88" y="${Y(v)+4}" text-anchor="end" style="font:11px var(--f-mono);fill:var(--muted)">${fmt(v)}</text>`;
  g+=`<line x1="92" y1="${Y(0)}" x2="126" y2="${Y(0)}" stroke="var(--ink)" stroke-width="2"/>`;
  let y1=Y(t1),y2=Y(t2);if(Math.abs(y1-y2)<18){const m=(y1+y2)/2,d=y1<y2?-9:9;y1=m+d;y2=m-d}
  [[t1,y1,"salida","var(--l-ent)"],[t2,y2,"llegada","var(--l-rac)"]].forEach(([v,ly,nm,c])=>{g+=`<polygon points="120,${Y(v)} 132,${Y(v)-6} 132,${Y(v)+6}" fill="${c}"/><path d="M132 ${Y(v)} L150 ${ly}" stroke="${c}" stroke-width="1.5" fill="none"/><text x="154" y="${ly+4}" style="font:700 12px var(--f-mono);fill:${c}">${nm} ${fmt(v)}</text>`});
  return g+`</svg>`}
function figCards(vals){return`<svg viewBox="0 0 360 120" role="img" aria-label="Las cuatro partidas de cromos">${vals.map((v,i)=>{const x=12+i*88;const c=v==null?"var(--muted)":v<0?"var(--bad)":"var(--ok)";
  return`<rect x="${x}" y="12" width="72" height="96" rx="10" fill="var(--surface)" stroke="${c}" stroke-width="2.5" ${v==null?'stroke-dasharray="6 4"':""}/>${T_(x+36,34,"Partida "+(i+1))}<text x="${x+36}" y="78" text-anchor="middle" style="font:700 24px var(--f-mono);fill:${c}">${v==null?"?":(v>0?"+":"−")+Math.abs(v)}</text>`}).join("")}</svg>`}
function figRect(h,u,w){const k=20,x0=60,y0=30,W=160,H=h*k;const nw=u*k,rw=w*k;
  return`<svg viewBox="0 0 ${x0+W+nw+60} ${y0+H+44}" role="img" aria-label="Rectángulo con la base aumentada y la altura reducida">
  <rect x="${x0}" y="${y0+rw}" width="${W}" height="${H-rw}" fill="var(--surface-2)"/>
  <rect x="${x0}" y="${y0}" width="${W}" height="${rw}" fill="var(--rem)"/>
  <rect x="${x0+W}" y="${y0+rw}" width="${nw}" height="${H-rw}" fill="var(--add)"/>
  <rect x="${x0}" y="${y0}" width="${W}" height="${H}" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 4"/>
  <rect x="${x0}" y="${y0+rw}" width="${W+nw}" height="${H-rw}" fill="none" stroke="var(--l-ent)" stroke-width="3"/>
  ${T_(x0+W/2,y0+H+22,"a","700 13px var(--f-mono)")}${T_(x0+W+nw/2,y0+H+22,"+"+u,"700 13px var(--f-mono)").replace("var(--muted)","var(--ok)")}
  ${T_(x0-22,y0+H/2+4,String(h),"700 13px var(--f-mono)")}${T_(x0-22,y0+rw/2+4,"−"+w,"700 13px var(--f-mono)").replace("var(--muted)","var(--bad)")}</svg>`}


Object.assign(RETO,{
E1:[
 R=>{const a=R.i(4,12);let b=R.i(2,11);if(b===a)b++;const s1=R.p([1,-1]),s2=-s1,net=s1*a+s2*b;const w=s=>s<0?"restar":"sumar";
  const ok=(net<0?"restar ":"sumar ")+Math.abs(net);
  return{type:"choice",fig:figHops([s1*a,s2*b]),q:`${w(s1)[0].toUpperCase()+w(s1).slice(1)} ${a} y después ${w(s2)} ${b} es lo mismo que…`,opts:[ok,(net<0?"sumar ":"restar ")+Math.abs(net),"restar "+(a+b),"sumar "+(a+b)],
   hint:"Imagina que tienes 20 y aplica los dos movimientos. ¿Cuánto cambió respecto a 20?",explain:`${fmt(s1*a)}${sg(s2*b)} = ${fmt(net)}. El efecto neto es ${ok}.`}},
 R=>{const L=R.p(["h","k","m","t"]),x=R.i(12,30),y=R.nz(-9,9);const show=poly([[1,L],[y,""]]);
  return{type:"fill",kind:"expr",q:`Simplifica con las menos operaciones posibles: ${M(lin(L,[-x,-x,2*x,y]))}`,answer:show,show,maxTerms:2,
   hint:`Junta los dos −${x}: son −${2*x}. ¿Qué pasa con −${2*x} y +${2*x}?`,explain:`−${x} − ${x} = −${2*x}, y −${2*x} + ${2*x} = 0. Solo queda ${show}.`}},
 R=>{const T=R.p([100,120,150,200]),p1=R.i(2,6)*10,p3=R.i(10,25),q=T-p1-p3,left=R.i(5,Math.min(40,q-5));const show=`${q} − z`;
  return{type:"fill",kind:"expr",q:`María sale de compras con ${T} mil pesos. Compra un pantalón de ${p1} mil, unos zapatos de ${M("z")} mil y un libro de ${p3} mil. Escribe, simplificada, la fórmula de lo que le queda (en miles).`,answer:show,show,maxTerms:2,
   hint:`Escribe primero ${T} − ${p1} − z − ${p3} y luego junta los números.`,explain:`${T} − ${p1} − z − ${p3} = ${show}. Si le quedan ${left} mil, los zapatos costaron ${q-left} mil.`}},
 R=>{const a=R.i(4,9),b=R.i(2,6),c=a+b+R.p([-3,-2,-1,1,2,3]),K=R.i(20,35),a2=R.i(5,9),K3=R.i(14,25),a3=R.i(3,8),b3=R.i(3,8),a4=R.i(30,60),b4=R.i(10,25);
  const pairs=[[lin("d",[-a,-b,c]),poly([[1,"d"],[c-a-b,""]])],[`${K} − q − ${a2} − ${a2}`,poly([[K-2*a2,""],[-1,"q"]])],[`${K3} − ${a3} + x + ${a3} − ${b3}`,poly([[1,"x"],[K3-b3,""]])],[lin("m",[-a4,a4-1,-b4,b4+1]),"m"]];
  return{type:"match",q:"Arrastra cada forma simplificada junto a su expresión.",pairs,hint:"Calcula el efecto neto de todos los números de cada expresión.",
   explain:`En la primera, ${lin(fmt(-a),[-b,c])} = ${fmt(c-a-b)}; en la segunda, ${K} − ${a2} − ${a2} = ${K-2*a2}; en la tercera, −${a3} y +${a3} se anulan; en la cuarta, todos los números juntos dan 0.`}},
 R=>{const b1=R.i(10,25),s1=R.i(5,20),b2=R.i(20,45);let s2=R.i(15,50);if(-b1+s1-b2+s2===0)s2++;const net=-b1+s1-b2+s2,N=R.i(300,900);
  return{type:"fill",kind:"num",fig:figTrain(b1,s1,b2,s2,N),q:`Un tren sale con ${M("b")} pasajeros. En la primera parada bajan ${b1} y suben ${s1}; en la segunda bajan ${b2} y suben ${s2}. Si llegan ${N} pasajeros, ¿con cuántos salió?`,answer:N-net,
   hint:`Primero simplifica la fórmula ${lin("b",[-b1,s1,-b2,s2])}.`,explain:`La fórmula es ${poly([[1,"b"],[net,""]])}. Si llegan ${N}, salieron ${N-net}.`}}],
E2:[
 R=>{const x=R.i(11,19),t2=x+10*R.i(5,8),t3=R.i(31,39),t4=10*R.i(5,7)-t3,t5=R.i(21,39),t6=R.i(1,5);const net=-x+t2+t3+t4-t5-t6;const show=poly([[1,"p"],[net,""]]);
  return{type:"fill",kind:"expr",q:`Simplifica: ${M(lin("p",[-x,t2,t3,t4,-t5,-t6]))}`,answer:show,show,maxTerms:2,hint:`−${x} + ${t2} da ${t2-x}, y ${t3} + ${t4} da ${t3+t4}.`,
   explain:`${t2-x} + ${t3+t4} = ${t2-x+t3+t4}; luego ${t2-x+t3+t4} − ${t5} − ${t6} = ${fmt(net)}. Resultado: ${show}.`}},
 R=>{const L=R.p(["a","b","n"]),n=R.i(3,6),K=R.i(20,40),Q=R.i(40,70);const show=`${K+Q} − ${n}${L}`;
  return{type:"fill",kind:"expr",q:`Simplifica: ${M(`${K}${(" − "+L).repeat(n)} + ${Q}`)}`,answer:show,show,maxTerms:2,hint:`Restar ${L} ${n} veces es restar ${n}${L}.`,explain:`${K} + ${Q} = ${K+Q}, y las ${n} ${L} restadas son −${n}${L}: ${show}.`}},
 R=>{const a=R.i(6,9),b=R.i(2,a-1),c=a+b+R.p([-3,-2,-1,1,2,3]);const right=poly([[1,"d"],[c-a-b,""]]),wrong=`d − ${a-b+c}`;
  return{type:"choice",q:`Un estudiante escribió ${M(`d − ${a} − ${b} + ${c} = d − ${a-b} + ${c} = ${wrong}`)}. ¿Qué opinas?`,
   opts:[`Se equivocó: −${a} − ${b} es −${a+b}, y el resultado es ${right}`,"Está bien hecho",`Se equivocó: el resultado es d + ${a-b+c}`,`Se equivocó: el resultado es d − ${a+b+c}`],
   hint:`¿Restar ${a} y luego restar ${b} es lo mismo que restar ${a-b}?`,explain:`Restar ${a} y restar ${b} es restar ${a+b}. Leyó «− ${a} − ${b}» como «${a} − ${b}». Lo correcto es d − ${a+b} + ${c} = ${right}.`}},
 R=>{const A=R.i(5,19),D=R.i(2,9),B=R.i(20,35),C=R.i(5,15),n1=R.i(20,40),n2=R.i(5,19);const show=poly([[A+D,"p"],[C-B,"q"],[n1-n2,""]]);
  return{type:"fill",kind:"expr",q:`Simplifica: ${M(`${A}p + ${n1} − ${B}q − ${n2} + ${C}q + ${D}p`)}`,answer:show,show,maxTerms:3,hint:"Junta las p por un lado, las q por otro y los números por otro.",
   explain:`${A}p + ${D}p = ${A+D}p; −${B}q + ${C}q = ${fmt(C-B)}q; ${n1} − ${n2} = ${n1-n2}.`}},
 R=>{const nums=R.sh([12,15,18,23,27,36,45,58,64,72,85,99]);const A=nums[0],C=nums[1],D=nums[2],E=nums[3],B=R.p([100,200,300,500]);const [L1,L2]=R.sh(["f","g","h","k"]);
  let terms=[{s:1,b:String(C)},{s:-1,b:L1},{s:1,b:L2},{s:-1,b:String(D)},{s:1,b:String(B)},{s:1,b:L1},{s:-1,b:String(B)},{s:1,b:String(A)},{s:1,b:String(E)},{s:-1,b:String(A)}];
  terms=[terms[0],...R.sh(terms.slice(1))];
  const pairsIdx=terms.map((t,i)=>terms.some((u,j)=>j!==i&&u.b===t.b&&u.s===-t.s)?i:-1).filter(i=>i>=0);const show=poly([[1,L2],[C-D+E,""]]);
  return{type:"cancel",q:"Toca los términos que se anulan entre sí para tacharlos. Busca todas las parejas antes de hacer cuentas.",terms,pairsIdx,
   hint:"Una pareja se anula cuando es el mismo término, una vez sumado y otra vez restado.",explain:`Se anulan +${A} y −${A}, +${B} y −${B}, +${L1} y −${L1}. Lo que queda, ${C} − ${D} + ${E} + ${L2}, se simplifica a ${show}.`}}],
E3:[
 R=>{const K=R.i(15,40),a=R.i(6,12),b=R.i(2,a-1),ok=K-a+b;
  return{type:"choice",q:`¿Cuánto vale ${M(`${K} − (${a} − ${b})`)}?`,opts:[ok,K-a-b,K+a-b,K+a+b].map(String),hint:`Calcula primero el paréntesis completo, o bien cambia los signos de dentro: ${K} − ${a} + ${b}.`,
   explain:`${K} − (${a} − ${b}) = ${K} − ${a-b} = ${ok}. También ${K} − ${a} + ${b} = ${ok}: restar «${a} menos ${b}» es restar ${a} y devolver ${b}.`}},
 R=>{const p=R.i(15,45),q=R.i(5,25),L=R.p(["a","x","n"]);
  return{type:"fill",kind:"expr",q:`Simplifica: ${M(`(${L} + ${p}) − (${L} − ${q})`)}`,answer:String(p+q),show:String(p+q),maxTerms:1,hint:`Quita el paréntesis cambiando el signo de los dos términos: −${L} y +${q}.`,explain:`${L} + ${p} − ${L} + ${q} = ${p+q}, para cualquier valor de ${L}.`}},
 R=>{const A=R.i(5,15),B=R.i(2,9),L=R.p(["x","y","t"]);const show=`2${L} − ${A+B}`;
  return{type:"fill",kind:"expr",q:`Simplifica: ${M(`${L} − (${A} − ${L} + ${B})`)}`,answer:show,show,maxTerms:2,hint:`El menos cambia los tres términos de dentro: −${A}, +${L}, −${B}.`,explain:`${L} − ${A} + ${L} − ${B} = ${show}.`}},
 R=>{const [P,Q]=R.sh(["Clara","Laura","Andrés","Sofía","Mateo","Valentina"]),n=R.i(20,80);
  return{type:"choice",q:`Si la diferencia (dinero de ${P}) − (dinero de ${Q}) da ${M("−"+n)}, quiere decir que…`,opts:[`${P} tiene ${n} menos que ${Q}`,`${P} tiene una deuda de ${n}`,"hubo un error: una diferencia no puede ser negativa",`${Q} tiene ${n} menos que ${P}`],
   hint:"El signo de una diferencia dice cuál de los dos términos es mayor.",explain:`−${n} indica que el primer término (${P}) es ${n} unidades menor que el segundo (${Q}). Nadie debe nada.`}},
 R=>{const offs=R.sh([-25,-20,-12,-5,0,8,15,35]).slice(0,4);const lab=k=>k===0?"a":"a"+sg(k);const sorted=offs.slice().sort((x,y)=>x-y).map(lab);
  return{type:"order",q:`Ordena de menor a mayor. El orden sirve para cualquier valor de ${M("a")}.`,items:offs.map(lab),correct:sorted,hint:"Compara cada expresión con a: ¿cuánto se le suma o se le resta?",
   explain:`De menor a mayor: ${sorted.join(" < ")}. Restar más deja menos; sumar más deja más.`}}],
E4:[
 R=>{const a=R.i(3,9),b=R.i(2,8);
  return{type:"choice",q:`En ${M(`${a} − (−${b})`)}, ¿qué trabajo hace cada signo menos?`,opts:[`El primero resta; el segundo indica que el ${b} es negativo`,"Los dos restan","Los dos indican números negativos","El primero toma el opuesto; el segundo resta"],
   hint:"¿Cuál está entre dos números y cuál está pegado a un solo número?",explain:`El primero está entre ${a} y (−${b}): resta. El segundo forma parte del número −${b}. Por eso ${a} − (−${b}) = ${a} + ${b} = ${a+b}.`}},
 R=>{const v=R.i(2,9),L=R.p(["x","a","t"]);
  return{type:"choice",q:`«Si ${L} es un número cualquiera, −${L} es negativo.» ¿Verdadero o falso?`,opts:[`Falso: si ${L} es negativo, −${L} es positivo`,"Verdadero: siempre lleva el signo menos",`Verdadero, salvo cuando ${L} vale 0`,`Falso: −${L} siempre es positivo`],
   hint:`Prueba con ${L} = −${v}.`,explain:`−${L} es el opuesto de ${L}. Si ${L} = −${v}, −${L} = ${v}, que es positivo.`}},
 R=>{const n=R.nz(-8,8);return{type:"line",q:`Si ${M("−x = "+fmt(n))}, marca ${M("x")} en la recta.`,min:-10,max:10,marks:[{v:n,label:"−x"}],answer:-n,hint:`x es el número cuyo opuesto es ${fmt(n)}: su reflejo al otro lado del cero.`,explain:`El opuesto de ${fmt(-n)} es ${fmt(n)}. Por eso x = ${fmt(-n)}: está a la misma distancia del cero, del otro lado.`}},
 R=>{const d=R.i(2,4),k=R.i(2,9)*R.p([1,-1]);const inner=fmt(k),ans=k*(d%2?-1:1);
  return{type:"fill",kind:"num",q:`Calcula ${M("−(".repeat(d)+inner+")".repeat(d))}`,answer:ans,hint:"Trabaja de dentro hacia fuera: cada «−( )» toma el opuesto de lo que hay dentro.",
   explain:`Se toma el opuesto ${d} veces. Con un número ${d%2?"impar":"par"} de opuestos, el signo ${d%2?"queda cambiado":"vuelve a ser el de partida"}: el resultado es ${fmt(ans)}.`}},
 R=>{const pos=R.f()<.5;
  return{type:"choice",q:pos?`Si ${M("a")} es positivo y ${M("b")} es negativo, ${M("a − b")} es…`:`Si ${M("a")} es negativo y ${M("b")} es positivo, ${M("a − b")} es…`,
   opts:pos?["siempre positivo","positivo o negativo, según los valores","siempre negativo","siempre cero"]:["siempre negativo","positivo o negativo, según los valores","siempre positivo","siempre cero"],
   hint:pos?"Restar un número negativo es sumar su opuesto, que es positivo.":"Restar un positivo a un número negativo lo aleja todavía más del cero, hacia la izquierda.",
   explain:pos?"a − b = a + (−b), y −b es positivo. Una suma de dos positivos es positiva.":"a − b = a + (−b), y −b es negativo. Una suma de dos negativos es negativa."}},
 R=>{const a=R.i(5,9),b=R.i(2,4),c=R.i(2,9),d=R.i(2,9),e=R.i(2,9),f=R.i(2,9);const H='<b class="hl">−</b>';
  return{type:"bins",q:"Arrastra cada expresión al grupo que corresponde al trabajo del signo resaltado.",bins:["Resta","Toma el opuesto","Forma parte de un número negativo"],
   items:[{t:`${a} ${H} ${b}`,bin:0},{t:`x ${H} ${c}`,bin:0},{t:`${H}(a − ${d})`,bin:1},{t:`${H}x`,bin:1},{t:`3 + (${H}${e})`,bin:2},{t:`y = ${H}${f}`,bin:2}],
   hint:"Mira qué hay a cada lado del signo resaltado: ¿está entre dos términos, delante de un paréntesis o de una cantidad Variable, o pegado a un número?",
   explain:"Resta cuando está entre dos términos. Toma el opuesto cuando va delante de un paréntesis o de una cantidad Variable. Forma parte de un número negativo cuando va pegado a un número que no se le resta a nada."}}],
E5:[
 R=>{let t1=-R.i(5,12),t2=R.p([-R.i(1,4),R.i(1,6)]);if(R.f()<.5)[t1,t2]=[t2,t1];const d=t2-t1,up=d>0;let alt=Math.abs(Math.abs(t1)-Math.abs(t2));if(alt===Math.abs(d)||alt===0)alt=Math.abs(d)+2;
  return{type:"choice",fig:figThermo(t1,t2),q:`En una ciudad hay ${fmt(t1)} °C y en otra ${fmt(t2)} °C. Si viajas de la primera a la segunda, la temperatura…`,
   opts:[`${up?"sube":"baja"} ${Math.abs(d)} grados`,`${up?"baja":"sube"} ${Math.abs(d)} grados`,`${up?"sube":"baja"} ${alt} grados`,`${up?"baja":"sube"} ${alt} grados`],
   hint:`Calcula llegada menos salida: ${fmt(t2)} − ${fmtP(t1)}.`,explain:`${fmt(t2)} − ${fmtP(t1)} = ${fmt(d)}. Es ${up?"positivo: sube":"negativo: baja"}. Calcular con los números sin signo lleva a errores.`}},
 R=>{const vals=[...R.sh([-15,-12,-9,-8,-6,-4,-3,-1]).slice(0,3),...R.sh([0,2,5,7,-2]).slice(0,2)];const sorted=vals.slice().sort((a,b)=>a-b).map(fmt);
  return{type:"order",q:"Ordena de menor a mayor.",items:R.sh(vals).map(fmt),correct:sorted,hint:"Entre dos negativos, el menor es el que está más lejos del cero.",explain:`${sorted.join(" < ")}. Entre dos negativos, el de cifra más grande es el menor.`}},
 R=>{const k=R.i(2,9),up=R.f()<.6,ans=up?-k+1:-k-1;
  return{type:"line",q:`Marca en la recta el número que es una unidad ${up?"mayor":"menor"} que ${M("−"+k)}.`,min:-10,max:10,marks:[{v:-k,label:"−"+k}],answer:ans,hint:`${up?"Mayor":"Menor"} quiere decir más a la ${up?"derecha":"izquierda"} en la recta.`,
   explain:`−${k} ${up?"+":"−"} 1 = ${fmt(ans)}.${up?` Responder −${k+1} es ordenar los negativos como si fueran naturales.`:""}`}},
 R=>{const f=R.p([["Al sumarle un número a otro, el resultado es mayor o igual que el primero","7 + (−3) = 4, que es menor que 7."],["Al restarle un número a otro, el resultado es menor o igual que el primero","7 − (−3) = 10, que es mayor que 7."],["Hay un número que es menor que todos los demás","En los enteros no hay un número menor que todos: siempre se puede restar 1."]]);
  return{type:"choice",q:"¿Cuál de estas propiedades de los naturales deja de cumplirse en los enteros?",opts:[f[0],...R.sh(["a + b = b + a","a + 0 = a","(a + b) + c = a + (b + c)","a · 1 = a","a · b = b · a"]).slice(0,3)],
   hint:"Prueba con un número negativo.",explain:`${f[1]} Las otras tres siguen valiendo.`}},
 R=>{const p1=-R.i(2,6),p3=R.i(3,8),p4=-R.i(2,6),x=R.nz(-5,5),c=p1+p3+p4,tot=c+x;const w=v=>v<0?`pierde ${-v}`:`gana ${v}`;const f=poly([[1,"x"],[c,""]]);
  return{type:"fill",kind:"num",fig:figCards([p1,null,p3,p4]),q:`Alberto juega cuatro partidas: en la primera ${w(p1)} cromos, de la segunda no se acuerda, en la tercera ${w(p3)} y en la cuarta ${w(p4)}. En total ${tot<0?`perdió ${-tot}`:tot>0?`ganó ${tot}`:"quedó igual"}. ¿Cuántos ganó o perdió en la segunda? (Escribe las pérdidas con signo menos.)`,answer:x,
   hint:`Llama x a la segunda partida: ${fmt(p1)} + x${sg(p3)}${sg(p4)} = ${f}. ¿Cuándo vale ${fmt(tot)}?`,explain:`${f} = ${fmt(tot)} cuando x = ${fmt(x)}: en la segunda partida ${x<0?`perdió ${-x}`:`ganó ${x}`} cromo${Math.abs(x)===1?"":"s"}.`}}],
E6:[
 R=>{const k=R.i(2,7),c=R.i(1,9),L=R.p(["b","a","y"]);const show=`${k}${L} + ${k*c}`;
  return{type:"fill",kind:"expr",q:`Desarrolla: ${M(`${k}(${L} + ${c})`)}`,answer:show,show,maxTerms:2,noParens:true,hint:`El ${k} multiplica a ${L} y también a ${c}.`,explain:`${k}(${L} + ${c}) = ${show}.`}},
 R=>{const k=R.i(2,6),c=R.i(2,9),L=R.p(["x","m"]);const show=`−${k}${L} + ${k*c}`;
  return{type:"fill",kind:"expr",q:`Desarrolla: ${M(`−${k}(${L} − ${c})`)}`,answer:show,show,maxTerms:2,noParens:true,hint:`−${k} por −${c}: lo que se resta por lo que se resta.`,explain:`−${k} · ${L} = −${k}${L} y −${k} · (−${c}) = +${k*c}.`}},
 R=>{const p=R.i(1,4),q=R.i(1,4);const show=poly([[1,"ab"],[-q,"a"],[-p,"b"],[p*q,""]]);
  return{type:"fill",kind:"expr",q:`Desarrolla: ${M(`(a − ${p})(b − ${q})`)}`,answer:show,show,maxTerms:4,noParens:true,hint:"Multiplica cada término del primer paréntesis por cada término del segundo: salen cuatro productos.",explain:`${show}. El +${p*q} es la esquina que se había quitado dos veces.`}},
 R=>{const w=R.i(1,3),h=w+R.i(2,4),u=w*R.i(1,3),T=u*(h-w)/w,k=u*(h-w);
  return{type:"choice",fig:figRect(h,u,w),q:`Un rectángulo mide ${M("a")} cm de base y ${h} cm de altura. Se aumenta la base ${u} cm y se reduce la altura ${w} cm. ¿Qué pasa con el área?`,
   opts:[`Cambia en ${k} − ${co(w,"a")} cm²: aumenta si a < ${T} y disminuye si a > ${T}`,"Siempre se mantiene igual","Siempre aumenta",`Siempre disminuye ${u*w} cm²`],
   hint:`Calcula (a + ${u})(${h} − ${w}) − ${h}a.`,explain:`(a + ${u})·${h-w} = ${co(h-w,"a")} + ${k}. La diferencia con ${h}a es ${k} − ${co(w,"a")}: positiva si a < ${T}, negativa si a > ${T}.`}},
 R=>{const a=R.i(2,7),b=R.i(2,7),c=R.i(2,6),d=R.i(2,9),ans=a*b+c*d;
  return{type:"fill",kind:"num",q:`Calcula ${M(`(−${a})·(−${b}) − ${c}·(−${d})`)}`,answer:ans,hint:`(−${a})·(−${b}) = ${a*b} y ${c}·(−${d}) = −${c*d}. ¿Cuánto es restar −${c*d}?`,explain:`${a*b} − (−${c*d}) = ${a*b} + ${c*d} = ${ans}.`}}]
});

Object.assign(RECAP,{
E1:{map:[1,2,0,2,3],pts:[
  {s:"Fórmulas como respuesta",t:"Cuando a un problema le falta un dato, la respuesta es una fórmula que guarda el programa de cálculo.",ex:"a − 9 + 7"},
  {s:"Componer movimientos",t:"Cada «+ número» o «− número» es un movimiento, y varios movimientos seguidos se componen en uno solo.",ex:"a − 9 + 7 = a − 2"},
  {s:"Leer los signos",t:"En los cálculos con expresiones en las que aparecen cantidades Variables, cada signo va pegado al número que lo sigue: no se opera de izquierda a derecha como en aritmética.",ex:"b − 5 − 3 = b − 8"},
  {s:"Usar la fórmula",t:"Una fórmula responde a la vez todas las preguntas del mismo tipo: basta dar un valor a la cantidad Variable.",ex:"si b = 427, b + 1 = 428"}]},
E2:{map:[2,3,0,3,1],pts:[
  {s:"Reordenar con su signo",t:"Los términos se pueden cambiar de lugar, siempre llevando su signo con ellos.",ex:"d − 7 − 4 + 10 = d − 11 + 10"},
  {s:"Anular opuestos",t:"Un término que se suma y se resta a la vez se anula, sin necesidad de hacer cuentas.",ex:"a − 36 + 87 + 36 = a + 87"},
  {s:"Buscar cuentas fáciles",t:"Conviene juntar primero los números que dan resultados redondos.",ex:"b − 42 − 38 = b − 80"},
  {s:"Juntar términos semejantes",t:"Los términos con la misma cantidad Variable se cuentan juntos.",ex:"3f + 5f − 2f = 6f"}]},
E3:{map:[1,0,1,2,3],pts:[
  {s:"Paréntesis en la resta",t:"Para restar una expresión completa hay que ponerla entre paréntesis.",ex:"(a + 35) − (a − 20)"},
  {s:"El menos cambia todo",t:"El signo menos delante de un paréntesis cambia el signo de todos los términos de dentro, no solo del primero.",ex:"−(a − 20) = −a + 20"},
  {s:"Diferencias con signo",t:"Una diferencia negativa no es un error: dice que el primer término es el menor.",ex:"(a − 20) − (a + 35) = −55"},
  {s:"Comparar sin saber el valor",t:"Se pueden ordenar expresiones aunque no se conozca el valor de la cantidad Variable.",ex:"a − 25 < a − 20 < a"}]},
E4:{map:[0,3,2,2,1,0],pts:[
  {s:"Tres trabajos del menos",t:"El signo − puede restar, tomar el opuesto o formar parte de un número negativo.",ex:"5 − (−2)"},
  {s:"Restar un negativo",t:"Restar un número negativo es lo mismo que sumar su opuesto.",ex:"5 − (−2) = 5 + 2 = 7"},
  {s:"El opuesto del opuesto",t:"Tomar el opuesto es reflejar en el cero; dos reflejos devuelven el número a su sitio.",ex:"−(−3) = 3"},
  {s:"−x no siempre es negativo",t:"Una cantidad Variable con un menos delante puede ser positiva: depende del valor que tome.",ex:"si x = −4, −x = 4"}]},
E5:{map:[0,2,1,3,0],pts:[
  {s:"Una sola fórmula",t:"Gracias a los números negativos, una misma fórmula sirve en todos los casos.",ex:"T − t sirve sobre y bajo cero"},
  {s:"Qué es ser mayor",t:"Un número es mayor que otro cuando su diferencia es positiva; en la recta, está más a la derecha.",ex:"−3 > −8 porque −3 − (−8) = 5"},
  {s:"Orden entre negativos",t:"Entre dos negativos, el de cifra más grande es el menor.",ex:"−12 < −3"},
  {s:"Lo que ya no vale",t:"Algunas propiedades de los naturales dejan de cumplirse: sumar no siempre aumenta.",ex:"7 + (−3) = 4"}]},
E6:{map:[0,1,2,3,1],pts:[
  {s:"Multiplicar un paréntesis",t:"Un número delante de un paréntesis multiplica a todos los términos de dentro.",ex:"3(b + 2) = 3b + 6"},
  {s:"Menos por menos",t:"Lo que se resta, multiplicado por lo que se resta, se suma.",ex:"(−2)·(−5) = 10"},
  {s:"Dos paréntesis",t:"Al multiplicar dos paréntesis salen cuatro productos, cada uno con su signo.",ex:"(a − 1)(b − 2) = ab − 2a − b + 2"},
  {s:"Ver la regla en un área",t:"El área de un rectángulo muestra por qué funciona la regla de los signos: la esquina quitada dos veces se devuelve.",ex:"(a − 1)(b − 2): esquina + 2"}]}
});

Object.assign(EXPLORE,{
xTraslaciones(host){let a=30,steps=[-9,7],geo=null,playing=false;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="xa">Valor inicial de <span class="m">a</span>: <output class="m" id="xao">30</output></label><input type="range" id="xa" min="0" max="60" value="30"></div>
   <div class="ctrl"><label for="xamt">Cantidad</label><input type="number" id="xamt" min="1" max="40" value="5"><button class="btn sm" data-s="1">Sumar</button><button class="btn sm" data-s="-1">Restar</button><button class="btn sm ghost" id="xundo">Quitar el último</button><button class="btn sm ghost" id="xreset">Empezar de nuevo</button></div>
   <div class="readout" id="xr"></div><div class="fillrow"><button class="btn sm primary" id="xplay">Ver el recorrido</button><span class="tip">Una ficha recorre los saltos uno a uno y después aparece el movimiento equivalente.</span></div>
   <div class="svgwrap nl"><svg id="xsvg" viewBox="0 0 640 176" role="img" aria-label="Saltos sobre la recta numérica"></svg></div></div>`;
  const draw=()=>{const net=sum(steps);const parts=[a];steps.forEach(s=>parts.push(parts[parts.length-1]+s));
    const ex="a"+steps.map(sg).join(""),simp=net===0?"a":"a"+sg(net);
    $("#xr",host).innerHTML=`<span class="k">Programa</span>${ex}<br><span class="k">Un solo movimiento</span>= ${simp}<br><span class="k">Con a = ${a}</span>${a}${steps.map(sg).join("")} = ${fmt(parts[parts.length-1])}`;
    const lo=Math.min(...parts)-4,hi=Math.max(...parts)+4,X=v=>30+(v-lo)/(hi-lo)*580,sp=580/(hi-lo);
    let g=`<line x1="20" y1="90" x2="620" y2="90" stroke="var(--rule)" stroke-width="2"/>`;
    for(let v=Math.ceil(lo);v<=hi;v++)g+=`<circle cx="${X(v)}" cy="90" r="${sp>9?2.6:1.8}" fill="var(--muted)"/>`;
    const stp=(hi-lo)>60?10:5;for(let v=Math.ceil(lo/stp)*stp;v<=hi;v+=stp)g+=`<text x="${X(v)}" y="110" text-anchor="middle" style="font:12px var(--f-mono);fill:var(--muted)">${fmt(v)}</text>`;
    const hops=[];parts.slice(0,-1).forEach((p,i)=>{const x1=X(p),x2=X(parts[i+1]),h=18+(i%2)*14,c=steps[i]>0?"var(--ok)":"var(--bad)",d=x2>x1?1:-1;hops.push({x1,x2,h});
      g+=`<g class="hop" data-i="${i}"><path d="M${x1} 88 Q${(x1+x2)/2} ${88-h*2} ${x2} 88" fill="none" stroke="${c}" stroke-width="2.2"/><polygon points="${x2},88 ${x2-7*d},82 ${x2-3*d},92" fill="${c}"/><text x="${(x1+x2)/2}" y="${88-h-6}" text-anchor="middle" style="paint-order:stroke;stroke:var(--surface);stroke-width:4px;font:600 12px var(--f-mono);fill:${c}">${steps[i]>0?"+":"−"}${Math.abs(steps[i])}</text></g>`});
    const x0=X(a),xn=X(parts[parts.length-1]);
    g+=`<g id="xnet"><line x1="${x0}" y1="142" x2="${xn}" y2="142" stroke="var(--linec)" stroke-width="4"/>${net?`<polygon points="${xn},142 ${xn-9*Math.sign(xn-x0)},136 ${xn-9*Math.sign(xn-x0)},148" fill="var(--linec)"/>`:""}<text x="${(x0+xn)/2}" y="166" text-anchor="middle" style="font:700 12px var(--f-disp);fill:var(--linec)">un solo movimiento: ${net===0?"no se mueve":(net>0?"+":"−")+Math.abs(net)}</text></g>`;
    parts.forEach((p,i)=>g+=`<circle cx="${X(p)}" cy="90" r="${i===0?6:4}" fill="${i===0?"var(--ink)":"var(--surface)"}" stroke="var(--ink)" stroke-width="1.5"/>`);
    g+=`<text x="${x0}" y="126" text-anchor="middle" style="font:700 12px var(--f-mono);fill:var(--ink)">inicio: a</text><circle id="xrun" cx="${x0}" cy="90" r="8" fill="var(--linec)" stroke="var(--surface)" stroke-width="2" opacity="0"/>`;
    $("#xsvg",host).innerHTML=g;geo={hops}};
  $("#xplay",host).onclick=async()=>{if(playing||!steps.length)return;playing=true;const svg=$("#xsvg",host),run=$("#xrun",svg),net=$("#xnet",svg);
    run.setAttribute("opacity","1");net.style.opacity=.12;$$(".hop",svg).forEach(h=>h.style.opacity=.25);
    for(const [i,hp] of geo.hops.entries()){const hg=$(`.hop[data-i="${i}"]`,svg);if(hg)hg.style.opacity=1;await tween(650,t=>{const [x,y]=qb(hp.x1,88,(hp.x1+hp.x2)/2,88-hp.h*2,hp.x2,88,t);run.setAttribute("cx",x);run.setAttribute("cy",y)})}
    await tween(500,t=>net.style.opacity=.12+.88*t);playing=false};
  $("#xa",host).oninput=e=>{a=+e.target.value;$("#xao",host).textContent=a;draw()};
  $$("[data-s]",host).forEach(b=>b.onclick=()=>{const n=Math.max(1,Math.min(40,Math.round(+$("#xamt",host).value||1)));if(steps.length>=7){toast("Hasta siete movimientos por programa.");return}steps.push(n*+b.dataset.s);draw()});
  $("#xundo",host).onclick=()=>{steps.pop();draw()};$("#xreset",host).onclick=()=>{steps=[];draw()};draw()},

xTachar(host){const EXPRS=["45 − f + g − 10 + 500 + f − 500 + 19 + 27 − 19","s + 72 − 67 + s + 67 − 48 − 72 − 5 − s + 50","a − 36 + 87 − 5 + 36 − 87 + 2a"];let k=0,terms,sel=null,pairs=0;
  const load=()=>{const tk=EXPRS[k].split(" ");terms=[{s:1,b:tk[0],g:false}];for(let i=1;i<tk.length;i+=2)terms.push({s:tk[i]==="−"?-1:1,b:tk[i+1],g:false});sel=null;pairs=0;draw()};
  const canPair=()=>terms.some((t,i)=>!t.g&&terms.some((u,j)=>j!==i&&!u.g&&u.b===t.b&&u.s===-t.s));
  const simplify=()=>{let c=0;const co={};terms.filter(t=>!t.g).forEach(t=>{const m=t.b.match(/^(\d*)([a-z])$/);if(m)co[m[2]]=(co[m[2]]||0)+t.s*(m[1]?+m[1]:1);else c+=t.s*+t.b});
    return poly([...Object.entries(co).map(([l,v])=>[v,l]),[c,""]])};
  const draw=()=>{const live=terms.filter(t=>!t.g);const nums=live.filter(t=>/^\d+$/.test(t.b));const P=sum(nums.filter(t=>t.s>0).map(t=>+t.b)),N=sum(nums.filter(t=>t.s<0).map(t=>+t.b)),mx=Math.max(P,N,1);
    host.innerHTML=`<div class="xp"><div class="tchips" role="group" aria-label="Términos de la expresión">${terms.map((t,i)=>`<button class="tchip ${t.g?"gone":""} ${sel===i?"sel":""} ${t.s<0?"neg":"pos"}" data-i="${i}" ${t.g?"disabled":""}>${i===0&&t.s>0?"":t.s<0?"− ":"+ "}${t.b}</button>`).join("")}</div>
      <div class="fbz" aria-live="polite"></div>
      <div class="bars"><div class="barrow"><span>Se suma</span><span class="track"><i style="width:${P/mx*100}%;background:var(--ok)"></i></span><span class="v">${P}</span></div>
       <div class="barrow"><span>Se resta</span><span class="track"><i style="width:${N/mx*100}%;background:var(--bad)"></i></span><span class="v">${N}</span></div>
       <div class="barrow"><span>Neto</span><span class="track"><i style="width:${Math.abs(P-N)/mx*100}%;background:var(--linec)"></i></span><span class="v">${fmt(P-N)}</span></div></div>
      <p class="tip">Las barras cuentan solo los números; cada pareja tachada desaparece de las dos barras a la vez, sin cambiar el neto.</p>
      <div class="readout"><span class="k">Quedan</span>${live.map((t,i)=>(i===0?(t.s<0?"−":""):(t.s<0?" − ":" + "))+t.b).join("")||"0"}<br><span class="k">Parejas tachadas</span>${pairs}${canPair()?"":`<br><span class="k">Forma más simple</span>= ${simplify()}`}</div>
      <div class="fillrow"><button class="btn sm" id="tnext">Otra expresión</button><button class="btn sm ghost" id="treset">Empezar de nuevo</button></div></div>`;
    $$(".tchip",host).forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(sel===null){sel=i;draw();return}if(sel===i){sel=null;draw();return}
      const a=terms[sel],c=terms[i];if(a.b===c.b&&a.s===-c.s){a.g=c.g=true;pairs++;sel=null;draw()}
      else{const n=(t,j)=>(j===0&&t.s>0?"+":t.s<0?"−":"+")+t.b;const s0=sel;sel=null;draw();$(".fbz",host).innerHTML=`<div class="fb info"><b>«${n(a,s0)}» y «${n(c,i)}» no se anulan.</b><span>Para anularse tienen que ser el mismo término con signos contrarios.</span></div>`}});
    $("#tnext",host).onclick=()=>{k=(k+1)%EXPRS.length;load()};$("#treset",host).onclick=load};
  load()},

xComparar(host){let a=50,mode="lc";
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ca">Dinero de Alberto (<span class="m">a</span>, en miles): <output class="m" id="cao">50</output></label><input type="range" id="ca" min="25" max="100" value="50"></div>
   <div class="bars" id="cb"></div><div class="seg" role="group" aria-label="Qué calcular"><button class="btn sm" data-m="lc">Laura − Clara</button><button class="btn sm" data-m="cl">Clara − Laura</button><button class="btn sm" data-m="err">Sin paréntesis</button></div><div class="readout" id="cr"></div></div>`;
  const draw=()=>{const L=a+35,C=a-20,mx=135;
    $("#cb",host).innerHTML=[["Alberto",a,"--muted"],["Laura",L,"--linec"],["Clara",C,"--l-rac"]].map(([n,v,c])=>`<div class="barrow"><span>${n}</span><span class="track"><i style="width:${v/mx*100}%;background:var(${c})"></i></span><span class="v">${v}</span></div>`).join("")+
      `<div class="barrow"><span>Diferencia</span><span class="track"><i style="margin-left:${C/mx*100}%;width:${(L-C)/mx*100}%;background:repeating-linear-gradient(135deg,var(--linec) 0 6px,var(--surface-2) 6px 10px)"></i></span><span class="v">${mode==="cl"?"−55":"55"}</span></div>`;
    $$("[data-m]",host).forEach(b=>b.setAttribute("aria-current",b.dataset.m===mode?"page":"false"));
    let t;if(mode==="lc")t=`<span class="k">Con cantidades Variables</span>(a + 35) − (a − 20) = a + 35 − a + 20 = 55<br><span class="k">Con a = ${a}</span>(${a} + 35) − (${a} − 20) = ${L} − ${C} = <b>55</b><br><span class="k">En las barras</span>La franja rayada es lo que Laura tiene de más: mide lo mismo muevas como muevas a Alberto.`;
    else if(mode==="cl")t=`<span class="k">Con cantidades Variables</span>(a − 20) − (a + 35) = a − 20 − a − 35 = −55<br><span class="k">Con a = ${a}</span>${C} − ${L} = <b>−55</b><br><span class="k">Qué dice el signo</span>El primer término (Clara) es 55 menor que el segundo (Laura).`;
    else t=`<span class="k">Sin paréntesis</span>a + 35 − a − 20 = 15<br><span class="k">Con a = ${a}</span>${a} + 35 − ${a} − 20 = <b class="bad-t">15</b>, pero la franja rayada mide <b class="ok-t">55</b>.<br><span class="k">Qué pasó</span>Se restó a, pero no se devolvieron los 20 que Clara tiene de menos.`;
    $("#cr",host).innerHTML=t};
  $("#ca",host).oninput=e=>{a=+e.target.value;$("#cao",host).textContent=a;draw()};$$("[data-m]",host).forEach(b=>b.onclick=()=>{mode=b.dataset.m;draw()});draw()},

xOpuestos(host){let n=3,k=0,x=-4,busy=false;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="on">Número de partida: <output class="m" id="ono">3</output></label><input type="range" id="on" min="-9" max="9" value="3"><button class="btn sm primary" id="oop">Tomar el opuesto −( )</button><button class="btn sm ghost" id="ore">Empezar de nuevo</button></div>
   <div class="readout" id="orr"></div><div class="svgwrap nl"><svg id="osv" viewBox="0 0 640 120" role="img" aria-label="Recta numérica con el número y su opuesto"></svg></div>
   <h4 style="margin-top:6px">¿−x es negativo?</h4><p class="tip">Arrastra el punto x sobre la recta (o usa el control).</p><div class="ctrl"><label for="ox">Valor de <span class="m">x</span>: <output class="m" id="oxo">−4</output></label><input type="range" id="ox" min="-8" max="8" value="-4"></div>
   <div class="readout" id="oxr"></div><div class="svgwrap nl"><svg id="oxs" viewBox="0 0 640 90" role="img" aria-label="Recta numérica con x y −x"></svg></div></div>`;
  const X=v=>320+v*29;
  const axis=y=>{let g=`<line x1="20" y1="${y}" x2="620" y2="${y}" stroke="var(--rule)" stroke-width="2"/>`;for(let v=-10;v<=10;v++)g+=`<circle cx="${X(v)}" cy="${y}" r="${v===0?4.5:3.4}" fill="${v===0?"var(--ink)":"var(--muted)"}"/><text x="${X(v)}" y="${y+22}" text-anchor="middle" style="font:${v===0?"700 ":""}11px var(--f-mono);fill:var(--muted)">${fmt(v)}</text>`;return g};
  const val=()=>n*(k%2?-1:1);
  const drawTop=(arcFrom)=>{const v=val();const ex=k===0?fmt(n):"−(".repeat(k)+(n<0?"("+fmt(n)+")":fmt(n))+")".repeat(k);
    $("#orr",host).innerHTML=`<span class="k">Expresión</span>${ex} = <b>${fmt(v)}</b><br><span class="k">Opuestos aplicados</span>${k} ${k?(k%2?"(impar: el signo cambia)":"(par: vuelve al número de partida)"):""}`;
    let g=axis(70)+`<text x="620" y="22" text-anchor="end" style="font:600 10px var(--f-disp);fill:var(--muted)">Cada punto es un número entero</text>`;
    if(arcFrom!=null&&arcFrom!==v){const x1=X(arcFrom),x2=X(v);g+=`<path d="M${x1} 64 Q${(x1+x2)/2} 10 ${x2} 64" fill="none" stroke="var(--linec)" stroke-width="2" stroke-dasharray="5 4"/><circle cx="${x1}" cy="70" r="5" fill="var(--surface)" stroke="var(--muted)" stroke-width="1.5"/>`}
    g+=`<line x1="320" y1="40" x2="320" y2="100" stroke="var(--ink)" stroke-width="1" stroke-dasharray="2 3" opacity=".5"/><circle id="opt" cx="${X(v)}" cy="70" r="7" fill="var(--linec)"/>`;$("#osv",host).innerHTML=g};
  const drawX=()=>{const nx=-x;$("#oxr",host).innerHTML=`<span class="k">Si x = ${fmt(x)}</span>−x = −(${fmt(x)}) = <b>${fmt(nx)}</b>, que es ${nx>0?"positivo":nx<0?"negativo":"cero"}.`;
    let h=axis(40)+`<circle cx="${X(x)}" cy="40" r="9" fill="var(--ink)" style="cursor:grab"/><text x="${X(x)}" y="20" text-anchor="middle" style="font:700 13px var(--f-mono);fill:var(--ink)">x</text>`;
    if(nx!==x)h+=`<circle cx="${X(nx)}" cy="40" r="7" fill="var(--l-rac)"/><text x="${X(nx)}" y="20" text-anchor="middle" style="font:700 13px var(--f-mono);fill:var(--l-rac)">−x</text>`;
    $("#oxs",host).innerHTML=h;$("#ox",host).value=x;$("#oxo",host).textContent=fmt(x)};
  $("#on",host).oninput=e=>{n=+e.target.value;k=0;$("#ono",host).textContent=fmt(n);drawTop()};
  $("#oop",host).onclick=async()=>{if(busy)return;if(k>=5){toast("Con cinco basta: ya se ve el patrón.");return}const from=val();k++;const to=val();drawTop(from);
    const pt=$("#opt",host);const x1=X(from),x2=X(to);busy=true;await tween(700,t=>{const [px,py]=qb(x1,64,(x1+x2)/2,10,x2,64,t);pt.setAttribute("cx",px);pt.setAttribute("cy",py+6*t)});busy=false};
  $("#ore",host).onclick=()=>{k=0;drawTop()};
  $("#ox",host).oninput=e=>{x=+e.target.value;drawX()};
  dragOn($("#oxs",host),{down:p=>{if(Math.abs(p.x-X(x))>22)return false},move:p=>{const v=Math.max(-8,Math.min(8,Math.round((p.x-320)/29)));if(v!==x){x=v;drawX()}}});
  drawTop();drawX()},

xTermometro(host){let A=6,B=-5,drag=null;
  host.innerHTML=`<div class="xp"><p class="tip">Arrastra las flechas del termómetro o usa los controles.</p><div class="ctrl"><label for="ta">Primera marca: <output class="m" id="tao">6</output> °C</label><input type="range" id="ta" min="-20" max="35" value="6"><label for="tb">Segunda marca: <output class="m" id="tbo">−5</output> °C</label><input type="range" id="tb" min="-20" max="35" value="-5"></div>
   <div class="seg"><button class="btn sm" data-p="6,-5">6 y −5</button><button class="btn sm" data-p="7,2">7 y 2</button><button class="btn sm" data-p="-3,-8">−3 y −8</button></div>
   <div class="thermo-grid"><div class="svgwrap"><svg id="tsv" viewBox="0 0 190 420" role="img" aria-label="Termómetro con dos marcas que se pueden arrastrar"></svg></div><div class="readout" id="trr"></div></div></div>`;
  const Y=v=>380-(v+20)/55*350,V=y=>Math.max(-20,Math.min(35,Math.round(-20+(380-y)/350*55)));
  const draw=()=>{const T=Math.max(A,B),t=Math.min(A,B);let g=`<rect x="80" y="22" width="22" height="364" rx="11" fill="var(--surface-2)" stroke="var(--rule)"/>`;
    for(let v=-20;v<=35;v++)g+=`<line x1="102" y1="${Y(v)}" x2="${v%10===0?118:v%5===0?112:107}" y2="${Y(v)}" stroke="var(--muted)" stroke-width="${v%5===0?1.2:.6}"/>${v%10===0?`<text x="124" y="${Y(v)+4}" style="font:12px var(--f-mono);fill:var(--muted)">${fmt(v)}</text>`:""}`;
    g+=`<line x1="60" y1="${Y(0)}" x2="120" y2="${Y(0)}" stroke="var(--ink)" stroke-width="2"/>`;
    g+=`<rect x="84" y="${Y(T)}" width="14" height="${Y(t)-Y(T)}" fill="var(--linec)" fill-opacity=".55" rx="4"/>`;
    [[A,"A"],[B,"B"]].forEach(([v,id])=>{const l=v===T&&!(A===B&&id==="B")?"T":"t";g+=`<g style="cursor:grab"><rect x="0" y="${Y(v)-13}" width="78" height="26" fill="transparent"/><polygon points="76,${Y(v)} 62,${Y(v)-8} 62,${Y(v)+8}" fill="var(--ink)"/><text x="56" y="${Y(v)+4}" text-anchor="end" style="font:700 13px var(--f-mono);fill:var(--ink)">${l}=${fmt(v)}</text></g>`});
    $("#tsv",host).innerHTML=g;
    const cnt=t<0&&T>0?`de ${fmt(t)} a 0 hay ${-t} y de 0 a ${fmt(T)} hay ${T}: en total ${T-t}`:`de ${fmt(t)} a ${fmt(T)} hay ${T-t}`;
    $("#trr",host).innerHTML=`<span class="k">Contando en el termómetro</span>${cnt} grados.<br><span class="k">Con la fórmula T − t</span>${fmt(T)} − ${fmtP(t)} = <b>${fmt(T-t)}</b><br><span class="k">Al revés, t − T</span>${fmt(t)} − ${fmtP(T)} = ${fmt(t-T)} <span class="muted">(negativo: t es la menor)</span>`};
  const sync=()=>{$("#ta",host).value=A;$("#tb",host).value=B;$("#tao",host).textContent=fmt(A);$("#tbo",host).textContent=fmt(B);draw()};
  dragOn($("#tsv",host),{down:p=>{if(p.x>110)return false;const dA=Math.abs(p.y-Y(A)),dB=Math.abs(p.y-Y(B));if(Math.min(dA,dB)>30)return false;drag=dA<=dB?"A":"B"},
    move:p=>{const v=V(p.y);if(drag==="A"&&v!==A){A=v;sync()}else if(drag==="B"&&v!==B){B=v;sync()}},up:()=>drag=null});
  $("#ta",host).oninput=e=>{A=+e.target.value;sync()};$("#tb",host).oninput=e=>{B=+e.target.value;sync()};
  $$("[data-p]",host).forEach(b=>b.onclick=()=>{[A,B]=b.dataset.p.split(",").map(Number);sync()});sync()},

xRectangulo(host){let a=6,b=4,da=-1,db=-2,drag=null;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ra">Base <span class="m">a</span>: <output class="m" id="rao">6</output></label><input type="range" id="ra" min="3" max="9" value="6"><label for="rb">Altura <span class="m">b</span>: <output class="m" id="rbo">4</output></label><input type="range" id="rb" min="2" max="7" value="4"></div>
   <div class="ctrl"><label for="rda">Cambio en la base: <output class="m" id="rdao">−1</output></label><input type="range" id="rda" min="-2" max="3" value="-1"><label for="rdb">Cambio en la altura: <output class="m" id="rdbo">−2</output></label><input type="range" id="rdb" min="-2" max="3" value="-2"></div>
   <p class="tip">También puedes arrastrar los dos tiradores redondos del rectángulo nuevo.</p>
   <div class="legendrow"><span><i style="background:var(--surface-2)"></i>se mantiene</span><span><i style="background:var(--add)"></i>se añade</span><span><i style="background:var(--rem)"></i>se quita</span><span><i style="background:var(--twice)"></i>se quitó dos veces</span><span><i style="background:var(--corner)"></i>esquina añadida</span></div>
   <div class="svgwrap"><svg id="rsv" role="img" aria-label="Rectángulo con franjas añadidas y quitadas" style="max-width:460px"></svg></div><div class="readout" id="rr"></div></div>`;
  const ox=40,oy=20;let cs=30;
  const draw=()=>{const A=a+da,B=b+db,W=Math.max(a,A),H=Math.max(b,B);cs=Math.min(36,Math.floor(330/Math.max(a+3,b+3)));let g="";
    for(let i=0;i<W;i++)for(let j=0;j<H;j++){const o=i<a&&j<b,n=i<A&&j<B;let f=null;
      if(o&&n)f="var(--surface-2)";else if(n&&!o)f=(i>=a&&j>=b)?"var(--corner)":"var(--add)";else if(o&&!n)f=(da<0&&db<0&&i>=A&&j>=B)?"var(--twice)":"var(--rem)";
      if(f)g+=`<rect x="${ox+i*cs}" y="${oy+j*cs}" width="${cs}" height="${cs}" fill="${f}" stroke="var(--surface)" stroke-width="1.5"/>`}
    g+=`<rect x="${ox}" y="${oy}" width="${a*cs}" height="${b*cs}" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 4"/><rect x="${ox}" y="${oy}" width="${A*cs}" height="${B*cs}" fill="none" stroke="var(--linec)" stroke-width="3"/>`;
    g+=`<text x="${ox+A*cs/2}" y="${oy+H*cs+24}" text-anchor="middle" style="font:600 13px var(--f-mono);fill:var(--ink)">base ${a}${da?sg(da):""} = ${A}</text><text x="${ox-10}" y="${oy+B*cs/2}" text-anchor="end" dominant-baseline="middle" style="font:600 13px var(--f-mono);fill:var(--ink)">${B}</text>`;
    g+=`<circle cx="${ox+A*cs}" cy="${oy+B*cs/2}" r="9" fill="var(--linec)" stroke="var(--surface)" stroke-width="2.5" style="cursor:ew-resize"/><circle cx="${ox+A*cs/2}" cy="${oy+B*cs}" r="9" fill="var(--linec)" stroke="var(--surface)" stroke-width="2.5" style="cursor:ns-resize"/>`;
    const svg=$("#rsv",host);svg.setAttribute("viewBox",`0 0 ${ox+(W+1)*cs+20} ${oy+(H+1)*cs+20}`);svg.innerHTML=g;
    const t2=a*db,t3=da*b,t4=da*db,term=(v,s)=>v===0?"":(v<0?" − ":" + ")+s,cf=(v,l)=>(Math.abs(v)===1?"":Math.abs(v))+l;
    $("#rr",host).innerHTML=`<span class="k">Con cantidades Variables</span>(a${da?sg(da):""})(b${db?sg(db):""}) = ab${term(db,cf(db,"a"))}${term(da,cf(da,"b"))}${term(t4,Math.abs(t4))}<br>
     <span class="k">Con a = ${a}, b = ${b}</span>${a}·${b}${term(t2,a+"·"+Math.abs(db))}${term(t3,Math.abs(da)+"·"+b)}${term(t4,Math.abs(da)+"·"+Math.abs(db))} = ${a*b}${term(t2,Math.abs(t2))}${term(t3,Math.abs(t3))}${term(t4,Math.abs(t4))} = <b>${a*b+t2+t3+t4}</b><br>
     <span class="k">Comprobación</span>${A} · ${B} = ${A*B} ${A*B===a*b+t2+t3+t4?'<span class="ok-t">✓</span>':""}
     ${da<0&&db<0?`<br><span class="k">La esquina</span>Al quitar las dos franjas, la esquina de ${-da}·${-db} se quitó dos veces. Por eso se suma una vez: (${fmt(da)})·(${fmt(db)}) = +${t4}.`:""}`;
    [["ra",a],["rb",b],["rda",da],["rdb",db]].forEach(([id,v])=>{$("#"+id,host).value=v;$("#"+id+"o",host).textContent=fmt(v)})};
  dragOn($("#rsv",host),{down:p=>{const A=a+da,B=b+db;if(Math.hypot(p.x-(ox+A*cs),p.y-(oy+B*cs/2))<22)drag="da";else if(Math.hypot(p.x-(ox+A*cs/2),p.y-(oy+B*cs))<22)drag="db";else return false},
    move:p=>{if(drag==="da"){const v=Math.max(-2,Math.min(3,Math.round((p.x-ox)/cs)-a));if(v!==da&&a+v>0){da=v;draw()}}else{const v=Math.max(-2,Math.min(3,Math.round((p.y-oy)/cs)-b));if(v!==db&&b+v>0){db=v;draw()}}},up:()=>drag=null});
  const bind=(id,fn)=>$("#"+id,host).oninput=e=>{fn(+e.target.value);draw()};
  bind("ra",v=>a=v);bind("rb",v=>b=v);bind("rda",v=>da=v);bind("rdb",v=>db=v);draw()}
});
