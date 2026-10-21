"use strict";
/* ============ Línea: Ecuaciones (Q1–Q5) ============
   Igualdad como equilibrio, ecuaciones de primer grado, problemas, sistemas 2 × 2 e inecuaciones. */

const ex1=(a,b)=>poly([[a,"x"],[b,""]]);              // ax + b para mostrar
const eqS=(a,b,c,d)=>`${ex1(a,b)} = ${ex1(c,d)}`;
const xs=v=>`x = ${fmt(v)}`;
const SYS=(e1,e2)=>`<span class="sys">${e1}<br>${e2}</span>`;

Object.assign(NODES,{
Q1:{title:"Igualdad y equivalencia",sub:"Una ecuación es una balanza en equilibrio.",
 info:`<p class="lead">Una <b>ecuación</b> es una igualdad con una cantidad Variable desconocida, la <b>incógnita</b>. Una <b>solución</b> es un valor que hace cierta la igualdad.</p>
 <div class="ex-box"><span class="eyebrow">¿Es solución?</span><p>En 3x + 2 = 14, prueba x = 4: 3 · 4 + 2 = 14. Se cumple, así que 4 es solución. Con x = 5: 3 · 5 + 2 = 17 ≠ 14, no lo es.</p></div>
 <div class="ex-box"><span class="eyebrow">La balanza</span><p>Piensa la ecuación como una balanza en equilibrio. Si haces lo mismo en los dos platos (sumar, restar, multiplicar o dividir por el mismo número distinto de cero), sigue en equilibrio. Obtienes una ecuación <b>equivalente</b>: con las mismas soluciones.</p>
 <p class="calc">3x + 2 = 14  →  (restar 2)  3x = 12  →  (dividir entre 3)  x = 4</p></div>
 <p>Algunas igualdades se cumplen para cualquier valor: 2(x + 1) = 2x + 2. Se llaman <b>identidades</b>. Las ecuaciones, en cambio, solo se cumplen para algunos valores.</p>
 <div class="callout"><span class="eyebrow">Mejor que «pasar al otro lado»</span><p>La regla «lo que suma pasa restando» es un atajo de lo mismo: restar en los dos lados. Si la olvidas, piensa en la balanza.</p></div>`,
 explore:{intro:"Resuelve la ecuación en la balanza: quita lo mismo de los dos platos o reparte en grupos iguales. Prueba también a quitar de un solo lado y mira qué pasa.",fn:"qBalanza"},
 key:"Una solución es un valor que cumple la igualdad. Hacer lo mismo en los dos lados da una ecuación equivalente. Una identidad se cumple para cualquier valor.",
 ojo:"Si cambias solo un lado, la balanza se desequilibra: la ecuación nueva ya no tiene las mismas soluciones."},

Q2:{title:"Ecuaciones de primer grado",sub:"Despejar la incógnita paso a paso.",
 info:`<p class="lead">Una ecuación de <b>primer grado</b> tiene la incógnita sin exponentes: 5x − 3 = 2x + 9. Se resuelve juntando las x en un lado y los números en el otro.</p>
 <div class="ex-box"><span class="eyebrow">Paso a paso</span><p class="calc">5x − 3 = 2x + 9<br>3x − 3 = 9      (restar 2x a los dos lados)<br>3x = 12      (sumar 3 a los dos lados)<br>x = 4      (dividir entre 3)</p>
 <p>Comprueba: 5 · 4 − 3 = 17 y 2 · 4 + 9 = 17.</p></div>
 <div class="ex-box"><span class="eyebrow">Con paréntesis</span><p>Primero se quitan: 3(x − 2) = x + 4 → 3x − 6 = x + 4 → 2x = 10 → x = 5.</p></div>
 <div class="callout"><span class="eyebrow">Dividir con signo</span><p>En −3x = 12 se divide entre −3, con su signo: x = −4. Dividir entre 3 o restar 3 es un error frecuente.</p></div>
 <div class="ex-box"><span class="eyebrow">Casos especiales</span><p>Si al simplificar desaparecen las x: 2x + 4 = 2x + 4 se cumple siempre (infinitas soluciones), y 2x + 4 = 2x + 1 no se cumple nunca (sin solución).</p></div>`,
 explore:{intro:"Elige qué hacer en cada paso. La aplicación lo aplica a los dos lados y guarda la lista de pasos.",fn:"qPasos"},
 key:"Para resolver: quitar paréntesis, juntar las x en un lado y los números en el otro, y dividir entre el coeficiente con su signo. Siempre se puede comprobar sustituyendo.",
 ojo:"En −3x = 12 se divide entre −3: x = −4."},

Q3:{title:"Problemas con ecuaciones",sub:"Del enunciado a la ecuación.",
 info:`<p class="lead">Resolver un problema con ecuaciones tiene cuatro pasos: elegir la incógnita, traducir el enunciado, resolver y comprobar en el enunciado.</p>
 <div class="ex-box"><span class="eyebrow">Ejemplo</span><p>Una madre tiene 38 años y su hijo 10. ¿Dentro de cuántos años la madre tendrá el doble de edad que su hijo?</p>
 <p><b>1. Incógnita:</b> x = años que pasan. <b>2. Traducir:</b> dentro de x años la madre tiene 38 + x y el hijo 10 + x, así que 38 + x = 2(10 + x).</p>
 <p><b>3. Resolver:</b> 38 + x = 20 + 2x → x = 18. <b>4. Comprobar:</b> en 18 años tendrán 56 y 28, y 56 es el doble de 28.</p></div>
 <div class="ex-box"><span class="eyebrow">Diccionario breve</span><p>«El doble de un número» → 2x. «Un número aumentado en 5» → x + 5. «Tres números consecutivos» → x, x + 1, x + 2. «El doble de un número menos 5» → 2x − 5, que no es lo mismo que «el doble de un número menos 5 unidades», 2(x − 5).</p></div>
 <div class="callout"><span class="eyebrow">Comprueba en el enunciado</span><p>No basta con que la x cumpla la ecuación: la ecuación podría estar mal planteada. Comprueba con los datos del problema.</p></div>`,
 explore:{intro:"Mueve el tiempo con el deslizador y mira cuándo la barra de la madre mide exactamente el doble que la del hijo. Después compara con la ecuación.",fn:"qModelo"},
 key:"Elegir qué es x, traducir el enunciado a una ecuación, resolverla y comprobar la respuesta con los datos del problema.",
 ojo:"«El doble de un número menos 5» es 2x − 5, no 2(x − 5)."},

Q4:{title:"Sistemas 2 × 2",sub:"Dos ecuaciones, dos incógnitas.",
 info:`<p class="lead">Un <b>sistema</b> de dos ecuaciones con dos incógnitas busca un par (x, y) que cumpla las dos a la vez.</p>
 <div class="ex-box"><span class="eyebrow">Reducción</span><p class="calc">x + y = 10<br>x − y = 4</p><p>Si se suman las dos ecuaciones, la y desaparece: 2x = 14, x = 7. Y con x + y = 10, y = 3.</p></div>
 <div class="ex-box"><span class="eyebrow">Sustitución</span><p>Con 2x + y = 7 y x + 3y = 11: de la primera, y = 7 − 2x. En la segunda: x + 3(7 − 2x) = 11 → −5x = −10 → x = 2, y = 3.</p></div>
 <p>Cada ecuación es una <b>recta</b> en el plano. La solución es el punto donde se cortan.</p>
 <div class="callout"><span class="eyebrow">Casos especiales</span><p>Si las rectas son paralelas (x + y = 3 y x + y = 5), no hay solución. Si son la misma recta (x + y = 3 y 2x + 2y = 6), hay infinitas.</p></div>`,
 explore:{intro:"Mueve la segunda recta y observa el punto de corte. Busca un caso sin solución y otro con infinitas.",fn:"qRectas"},
 key:"Un sistema 2 × 2 se resuelve eliminando una incógnita, por reducción o sustitución. La solución es el punto de corte de dos rectas: puede haber uno, ninguno o infinitos.",
 ojo:"Comprueba la solución en las dos ecuaciones, no solo en una."},

Q5:{title:"Inecuaciones",sub:"Desigualdades con una incógnita.",
 info:`<p class="lead">Una <b>inecuación</b> es una desigualdad con una incógnita: 2x + 1 &lt; 7. Sus soluciones suelen ser un <b>intervalo</b> entero de números.</p>
 <div class="ex-box"><span class="eyebrow">Se resuelve casi como una ecuación</span><p class="calc">2x + 1 &lt; 7  →  2x &lt; 6  →  x &lt; 3</p><p>Solución: (−∞, 3). Comprueba con un número: x = 0 da 1 &lt; 7, verdadero.</p></div>
 <div class="callout"><span class="eyebrow">La única diferencia</span><p>Al <b>multiplicar o dividir por un número negativo</b>, la desigualdad cambia de sentido. 5 &gt; 2, pero −5 &lt; −2.</p>
 <p class="calc">−2x &gt; 8  →  x &lt; −4</p></div>
 <p>Sumar o restar, o multiplicar por un positivo, no cambia el sentido.</p>
 <div class="ex-box"><span class="eyebrow">Escribir la solución</span><p>x ≥ 2 es el intervalo [2, +∞); x &lt; −1 es (−∞, −1). Lo viste en la línea Recta real.</p></div>`,
 explore:{intro:"Elige la inecuación y mira su solución sombreada en la recta. Mueve el número de prueba para comprobar si cumple la desigualdad.",fn:"qInecuacion"},
 key:"Una inecuación se resuelve como una ecuación, pero al multiplicar o dividir por un negativo la desigualdad cambia de sentido. La solución es un intervalo.",
 ojo:"−2x > 8 da x < −4, no x > −4."}
});

/* ---------- retos ---------- */
const flip={"<":">",">":"<","<=":">=",">=":"<="},OPH={"<":"&lt;",">":"&gt;","<=":"≤",">=":"≥"};
Object.assign(RETO,{
Q1:[
 R=>{const a=R.i(2,6),s=R.i(-4,6),b=R.nz(-9,9),c=a*s+b,yes=R.f()<.5,t=yes?s:s+R.p([-1,1,2]);
  return{type:"choice",q:`¿Es ${M(xs(t))} una solución de ${M(`${ex1(a,b)} = ${fmt(c)}`)}?`,opts:yes?["Sí","No"]:["No","Sí"],hint:`Sustituye x por ${fmt(t)} y calcula el lado izquierdo.`,
   explain:`${a} · ${fmtP(t)}${sgA(b)} = ${fmt(a*t+b)}${yes?`, que es igual a ${fmt(c)}: sí es solución.`:`, que no es ${fmt(c)}: no es solución.`}`}},
 R=>{const a=R.i(2,7),b=R.i(2,9),c=R.i(b+1,30);
  return{type:"choice",q:`¿Qué ecuación es equivalente a ${M(`${a}x + ${b} = ${c}`)}?`,opts:[M(`${a}x = ${c-b}`),M(`${a}x = ${c+b}`),M(`${a}x = ${c}`),M(`x + ${b} = ${frs(c,a)}`)],hint:"Busca la que resulta de hacer lo mismo en los dos lados.",
   explain:`Restando ${b} a los dos lados: ${a}x = ${c-b}. Las demás cambian un solo lado o solo una parte de un lado.`}},
 R=>{const k=R.i(2,9),m=R.i(2,5);
  return{type:"choice",q:"¿Cuál de estas igualdades se cumple para cualquier valor de x?",opts:[M(`${m}(x + ${k}) = ${m}x + ${m*k}`),M(`${m}(x + ${k}) = ${m}x + ${k}`),M(`x + ${k} = ${k}`),M(`${m}x = ${m+1}x`)],hint:"Desarrolla el paréntesis.",
   explain:`${m}(x + ${k}) = ${m}x + ${m*k} es una identidad: se cumple siempre. x + ${k} = ${k} y ${m}x = ${m+1}x solo se cumplen con x = 0.`}},
 R=>{const a=R.nz(-15,15),b=R.i(-20,20);
  return{type:"fill",kind:"num",answer:b-a,q:`Resuelve ${M(`x${sgA(a)} = ${fmt(b)}`)}. ¿Cuánto vale x?`,hint:`${a>0?"Resta "+a:"Suma "+(-a)} a los dos lados.`,explain:`x = ${fmt(b)} ${a>0?"−":"+"} ${Math.abs(a)} = ${fmt(b-a)}.`}},
 R=>{const sols=R.sh([-6,-5,-4,-3,-2,2,3,4,5,6,7,8]).slice(0,4);const a=R.i(2,5),b=R.i(2,9),c=R.i(2,4),d=R.i(1,6);
  const eqs=[`x + ${b} = ${fmt(sols[0]+b)}`,`x − ${d} = ${fmt(sols[1]-d)}`,`${a}x = ${fmt(a*sols[2])}`,`x / ${c} = ${frs(sols[3],c)}`];
  return{type:"match",q:"Arrastra cada solución junto a su ecuación.",pairs:eqs.map((e,i)=>[e,xs(sols[i])]),hint:"Deshaz la operación que acompaña a la x, haciendo la contraria en los dos lados.",
   explain:"Sumar se deshace restando, restar sumando, multiplicar dividiendo y dividir multiplicando."}}],
Q2:[
 R=>{const a=R.nz(-9,9),s=R.i(-8,8),b=R.nz(-15,15),c=a*s+b;if(a===1||a===-1)return RETO.Q2[0](R);
  return{type:"fill",kind:"num",answer:s,q:`Resuelve ${M(`${ex1(a,b)} = ${fmt(c)}`)}`,hint:`Primero ${b>0?"resta "+b:"suma "+(-b)} en los dos lados; después divide entre ${fmt(a)}.`,
   explain:`${co(a,"x")} = ${fmt(c)}${b>0?" − ":" + "}${Math.abs(b)} = ${fmt(c-b)}, así que x = ${fmt(c-b)} : ${fmtP(a)} = ${fmt(s)}.`}},
 R=>{let a=R.i(2,9),c=R.i(-6,8);while(c===a||c===0)c=R.i(-6,8);const b=R.nz(-9,9),d=R.nz(-9,9);if(d===b)return RETO.Q2[1](R);const num=d-b,den=a-c;
  return{type:"fill",kind:"frac",answer:num/den,show:frs(num,den),q:`Resuelve ${M(eqS(a,b,c,d))}. Si la solución no es entera, escríbela como fracción.`,hint:`Junta las x a la izquierda (${c>0?"resta "+co(c,"x"):"suma "+co(-c,"x")}) y los números a la derecha.`,
   explain:`${co(a-c,"x")} = ${fmt(num)}, así que x = ${FR(num,den)}.`}},
 R=>{const a=R.i(2,5),b=R.nz(-6,6),s=R.i(-6,6);let c=R.i(-3,6);while(c===a)c++;const d=a*(s+b)-c*s;
  return{type:"fill",kind:"num",answer:s,q:`Resuelve ${M(`${a}(x${sgA(b)}) = ${ex1(c,d)}`)}`,hint:`Primero quita el paréntesis: ${a}x${sgA(a*b)}.`,
   explain:`${ex1(a,a*b)} = ${ex1(c,d)} → ${co(a-c,"x")} = ${fmt(d-a*b)} → x = ${fmt(s)}.`}},
 R=>{const a=R.i(2,9),s=R.nz(-9,9),c=-a*s;
  return{type:"choice",q:`Resuelve ${M(`−${a}x = ${fmt(c)}`)}`,opts:[M(xs(s)),M(xs(-s)),M(xs(c+a)),M(xs(c-a))].filter((v,i,ar)=>ar.indexOf(v)===i),hint:`Divide los dos lados entre −${a}, con su signo.`,
   explain:`x = ${fmt(c)} : (−${a}) = ${fmt(s)}. El −${a} multiplica a la x, así que se divide; no se suma ni se resta.`}},
 R=>{const m=R.i(2,5),k=R.nz(-6,6),inf=R.f()<.5,r=inf?m*k:m*k+R.p([-3,-1,1,2,4]);
  return{type:"choice",q:`¿Cuántas soluciones tiene ${M(`${m}(x${sgA(k)}) = ${ex1(m,r)}`)}?`,opts:inf?["Infinitas: cualquier número es solución","Ninguna","Una sola: x = 0"]:["Ninguna","Infinitas: cualquier número es solución","Una sola: x = 0"],hint:"Desarrolla el paréntesis y compara los dos lados.",
   explain:`${m}(x${sgA(k)}) = ${ex1(m,m*k)}. ${inf?"Los dos lados son iguales: se cumple para cualquier x.":`Comparado con ${ex1(m,r)}, las x se anulan y queda ${fmt(m*k)} = ${fmt(r)}, que es falso: no hay solución.`}`}}],
Q3:[
 R=>{const n=R.i(5,60),S=3*n+3;
  return{type:"fill",kind:"num",answer:n,q:`La suma de tres números consecutivos es ${S}. ¿Cuál es el menor?`,hint:"Llama x al menor: los otros son x + 1 y x + 2.",explain:`x + (x + 1) + (x + 2) = ${S} → 3x + 3 = ${S} → x = ${n}. Comprueba: ${n} + ${n+1} + ${n+2} = ${S}.`}},
 R=>{const w=R.i(3,20),k=R.i(2,10),P2=2*(w+w+k);
  return{type:"fill",kind:"num",answer:w,q:`El largo de un rectángulo mide ${k} cm más que el ancho, y su perímetro es ${P2} cm. ¿Cuánto mide el ancho?`,hint:`Llama x al ancho: el largo es x + ${k} y el perímetro, 2x + 2(x + ${k}).`,
   explain:`2x + 2(x + ${k}) = ${P2} → 4x + ${2*k} = ${P2} → x = ${w}. El rectángulo mide ${w} × ${w+k} cm.`}},
 R=>{const a=R.p([2,3]),b=R.i(2,9),c=R.i(10,30),w=a===2?"El doble":"El triple";
  return{type:"choice",q:`¿Qué ecuación traduce «${w} de un número, menos ${b}, es ${c}»?`,opts:[M(`${a}x − ${b} = ${c}`),M(`${a}(x − ${b}) = ${c}`),M(`${b} − ${a}x = ${c}`),M(`${a}x + ${b} = ${c}`)],hint:`Primero se multiplica el número por ${a}; después se resta ${b}.`,
   explain:`«${w} de un número» es ${a}x, y «menos ${b}» resta ${b} a eso: ${a}x − ${b} = ${c}. ${a}(x − ${b}) restaría ${b} antes de multiplicar.`}},
 R=>{const h=R.i(4,15),x=R.i(2,20),m=2*h+x;
  return{type:"fill",kind:"num",answer:x,q:`Una madre tiene ${m} años y su hijo ${h}. ¿Dentro de cuántos años la madre tendrá el doble de edad que su hijo?`,hint:`Dentro de x años: ${m} + x = 2(${h} + x).`,
   explain:`${m} + x = ${2*h} + 2x → x = ${x}. Entonces tendrán ${m+x} y ${h+x} años, y ${m+x} = 2 · ${h+x}.`}},
 R=>{const k=R.i(1,20)*2,lo=R.i(5,60),T=2*lo+k;
  return{type:"fill",kind:"num",answer:lo,q:`Ana y Luis se reparten ${T} mil pesos de modo que Ana recibe ${k} mil más que Luis. ¿Cuánto recibe Luis (en miles)?`,hint:`Si Luis recibe x, Ana recibe x + ${k}.`,
   explain:`x + (x + ${k}) = ${T} → 2x = ${T-k} → x = ${lo}. Luis recibe ${lo} mil y Ana ${lo+k} mil.`}}],
Q4:[
 R=>{const x=R.i(-5,12),y=R.i(-5,12);if(x===y)return RETO.Q4[0](R);
  return{type:"fill",kind:"pair",answer:[x,y],q:`Resuelve el sistema: ${SYS(`x + y = ${fmt(x+y)}`,`x − y = ${fmt(x-y)}`)}`,hint:"Suma las dos ecuaciones: la y desaparece.",
   explain:`Sumando: 2x = ${fmt(2*x)}, x = ${fmt(x)}. Entonces y = ${fmt(x+y)} − ${fmtP(x)} = ${fmt(y)}.`}},
 R=>{const x=R.i(-4,6),y=R.i(-4,6);let a=R.i(1,4),b=R.nz(-3,3),c=R.nz(-3,3),d=R.i(1,4);if(a*d-b*c===0)return RETO.Q4[1](R);
  return{type:"fill",kind:"pair",answer:[x,y],q:`Resuelve el sistema: ${SYS(`${poly([[a,"x"],[b,"y"]])} = ${fmt(a*x+b*y)}`,`${poly([[c,"x"],[d,"y"]])} = ${fmt(c*x+d*y)}`)}`,hint:"Despeja una incógnita en una ecuación y sustitúyela en la otra, o multiplica para que una incógnita se anule al sumar.",
   explain:`La solución es x = ${fmt(x)}, y = ${fmt(y)}. Comprueba: ${a} · ${fmtP(x)} + ${fmtP(b)} · ${fmtP(y)} = ${fmt(a*x+b*y)} y ${fmtP(c)} · ${fmtP(x)} + ${d} · ${fmtP(y)} = ${fmt(c*x+d*y)}.`}},
 R=>{const x=R.i(-3,6),y=R.i(-3,6),a=R.i(1,3),b=R.i(1,3);const e1=`${poly([[a,"x"],[b,"y"]])} = ${fmt(a*x+b*y)}`,e2=`x − y = ${fmt(x-y)}`;
  const cand=[[x,y],[y,x],[x+1,y+1],[x+b,y-a]].filter((p,i,ar)=>ar.findIndex(q=>q[0]===p[0]&&q[1]===p[1])===i);
  return{type:"choice",q:`¿Qué par (x, y) es solución de este sistema? ${SYS(e1,e2)}`,opts:cand.map(p=>M(`(${fmt(p[0])}, ${fmt(p[1])})`)),hint:"Sustituye cada par en las dos ecuaciones.",
   explain:`(${fmt(x)}, ${fmt(y)}) cumple las dos. Cuidado: algunos pares cumplen una sola ecuación.`}},
 R=>{const g=R.i(3,20),r=R.i(2,20),H=g+r,L=2*g+4*r;
  return{type:"fill",kind:"num",answer:r,q:`En una granja hay gallinas y conejos. En total hay ${H} cabezas y ${L} patas. ¿Cuántos conejos hay?`,hint:"Llama x a las gallinas e y a los conejos: x + y = cabezas y 2x + 4y = patas.",
   explain:`x + y = ${H} y 2x + 4y = ${L}. Restando el doble de la primera: 2y = ${L-2*H}, y = ${r}. Hay ${r} conejos y ${g} gallinas.`}},
 R=>{const a=R.i(1,6),m=R.i(2,3),inf=R.f()<.5,b=inf?m*a:m*a+R.p([-2,-1,1,3]);
  return{type:"choice",q:`¿Cuántas soluciones tiene este sistema? ${SYS(`x + y = ${a}`,`${m}x + ${m}y = ${fmt(b)}`)}`,opts:inf?["Infinitas","Ninguna","Una sola"]:["Ninguna","Infinitas","Una sola"],hint:`Divide la segunda ecuación entre ${m} y compárala con la primera.`,
   explain:`La segunda equivale a x + y = ${frs(b,m)}. ${inf?"Es la misma ecuación que la primera: la misma recta, infinitas soluciones.":`Pero x + y no puede valer ${a} y ${frs(b,m)} a la vez: rectas paralelas, sin solución.`}`}}],
Q5:[
 R=>{const a=R.i(2,7),s=R.i(-6,8),b=R.nz(-9,9),c=a*s+b,op=R.p(["<",">","<=",">="]);
  return{type:"fill",kind:"ineq",op,value:s,show:`x ${OPS[op]} ${fmt(s)}`,q:`Resuelve ${M(`${ex1(a,b)} ${OPH[op]} ${fmt(c)}`)}`,hint:`Como en una ecuación: ${b>0?"resta "+b:"suma "+(-b)} y divide entre ${a}. Al dividir entre un positivo el sentido no cambia.`,
   explain:`${a}x ${OPH[op]} ${fmt(c-b)}, así que x ${OPH[op]} ${fmt(s)}.`}},
 R=>{const a=R.i(2,6),s=R.i(-6,6),b=R.nz(-9,9),c=-a*s+b,op=R.p(["<",">","<=",">="]),f=flip[op];
  return{type:"fill",kind:"ineq",op:f,value:s,show:`x ${OPS[f]} ${fmt(s)}`,q:`Resuelve ${M(`${ex1(-a,b)} ${OPH[op]} ${fmt(c)}`)}`,hint:`Al dividir entre −${a}, la desigualdad cambia de sentido.`,
   explain:`−${a}x ${OPH[op]} ${fmt(c-b)}. Al dividir entre −${a} el sentido cambia: x ${OPH[f]} ${fmt(s)}.`}},
 R=>{const a=R.i(2,5),b=R.nz(-6,6),s=R.i(-3,5),c=a*s+b;const good=s+R.i(1,3);const bad=R.sh([s,s-1,s-2,s-4]).slice(0,3);
  return{type:"choice",q:`¿Cuál de estos números es solución de ${M(`${ex1(a,b)} &gt; ${fmt(c)}`)}?`,opts:[good,...bad].map(v=>M(fmt(v))),hint:"Sustituye cada número y comprueba si la desigualdad es verdadera.",
   explain:`La solución es x &gt; ${fmt(s)}. ${fmt(good)} es mayor que ${fmt(s)}; ${fmt(s)} no sirve porque la desigualdad es estricta.`}},
 R=>{const s=R.i(-6,6),op=R.p(["<",">","<=",">="]);const right=op===">"||op===">=",cl=op.length>1;
  const sol=right?ivl(s,null,cl,false):ivl(null,s,false,cl),w=[right?ivl(s,null,!cl,false):ivl(null,s,false,!cl),right?ivl(null,s,false,cl):ivl(s,null,cl,false),right?`[${fmt(s)}, +∞]`:`[−∞, ${fmt(s)}]`];
  return{type:"choice",fig:figInterval(right?s:null,right?null:s,cl,cl),q:`¿Cómo se escribe como intervalo la solución ${M(`x ${OPH[op]} ${fmt(s)}`)}?`,opts:[sol,...w],hint:"≤ y ≥ incluyen el extremo (corchete). El infinito siempre va con paréntesis.",
   explain:`x ${OPH[op]} ${fmt(s)} es ${sol}.`}},
 R=>{const a=R.i(2,6),s=R.nz(-6,6),c=-a*s;
  return{type:"choice",q:`Resuelve ${M(`−${a}x &gt; ${fmt(c)}`)}`,opts:[M(`x &lt; ${fmt(s)}`),M(`x &gt; ${fmt(s)}`),M(`x &gt; ${fmt(-s)}`),M(`x &lt; ${fmt(-s)}`)],hint:`Divide entre −${a} y no olvides cambiar el sentido.`,
   explain:`Al dividir entre −${a} el sentido cambia: x &lt; ${fmt(c)} : (−${a}) = ${fmt(s)}. Comprueba con x = ${fmt(s-1)}: −${a} · ${fmtP(s-1)} = ${fmt(-a*(s-1))} &gt; ${fmt(c)}.`}}]
});

Object.assign(RECAP,{
Q1:{map:[0,1,2,3,0],pts:[
  {s:"Qué es una solución",t:"Una solución es un valor que, al sustituirlo, hace cierta la igualdad.",ex:"3 · 4 + 2 = 14: x = 4 es solución"},
  {s:"Ecuaciones equivalentes",t:"Hacer lo mismo en los dos lados mantiene el equilibrio y las soluciones.",ex:"3x + 2 = 14 ⇔ 3x = 12"},
  {s:"Identidades",t:"Una identidad se cumple para cualquier valor; una ecuación, solo para algunos.",ex:"2(x + 1) = 2x + 2"},
  {s:"Deshacer operaciones",t:"Para despejar, se hace la operación contraria en los dos lados.",ex:"x − 5 = 3 → x = 8"}]},
Q2:{map:[0,0,1,2,3],pts:[
  {s:"Juntar las x y los números",t:"Se suman o restan términos en los dos lados hasta tener las x en uno y los números en el otro.",ex:"5x − 3 = 2x + 9 → 3x = 12"},
  {s:"Paréntesis primero",t:"Antes de mover términos se quitan los paréntesis.",ex:"3(x − 2) = 3x − 6"},
  {s:"Dividir con signo",t:"Se divide entre el coeficiente de x con su signo.",ex:"−3x = 12 → x = −4"},
  {s:"Sin solución o infinitas",t:"Si las x se anulan, queda algo siempre cierto (infinitas soluciones) o siempre falso (ninguna).",ex:"2x + 4 = 2x + 1: ninguna"}]},
Q3:{map:[0,2,1,3,2],pts:[
  {s:"Elegir la incógnita",t:"Lo primero es decidir qué cantidad es x y escribir las demás a partir de ella.",ex:"consecutivos: x, x + 1, x + 2"},
  {s:"Traducir el enunciado",t:"Cada frase se convierte en una expresión; el orden de las operaciones importa.",ex:"el doble de un número menos 5 → 2x − 5"},
  {s:"Plantear y resolver",t:"La igualdad del enunciado da la ecuación, que se resuelve como siempre.",ex:"2x + 2(x + 3) = 26"},
  {s:"Comprobar en el enunciado",t:"La respuesta se comprueba con los datos del problema, no solo en la ecuación.",ex:"56 es el doble de 28"}]},
Q4:{map:[0,0,1,2,3],pts:[
  {s:"Eliminar una incógnita",t:"Por reducción (sumar o restar ecuaciones) o por sustitución se pasa a una sola incógnita.",ex:"x + y = 10, x − y = 4 → 2x = 14"},
  {s:"Comprobar en las dos",t:"La solución tiene que cumplir las dos ecuaciones a la vez.",ex:"(7, 3): 7 + 3 = 10 y 7 − 3 = 4"},
  {s:"Plantear un sistema",t:"Dos datos sobre dos cantidades desconocidas dan dos ecuaciones.",ex:"cabezas: x + y; patas: 2x + 4y"},
  {s:"Paralelas o iguales",t:"Rectas paralelas: sin solución. La misma recta: infinitas soluciones.",ex:"x + y = 3 y x + y = 5: ninguna"}]},
Q5:{map:[0,1,3,2,1],pts:[
  {s:"Como una ecuación",t:"Se suman, restan, multiplican o dividen los dos lados igual que en una ecuación.",ex:"2x + 1 < 7 → x < 3"},
  {s:"Un negativo invierte",t:"Al multiplicar o dividir por un número negativo, la desigualdad cambia de sentido.",ex:"−2x > 8 → x < −4"},
  {s:"La solución es un intervalo",t:"La solución se escribe como intervalo, con corchete si el extremo está incluido.",ex:"x ≥ 2 → [2, +∞)"},
  {s:"Comprobar con un número",t:"Sustituir un número de la solución (y uno de fuera) confirma el sentido.",ex:"x = 0 en 2x + 1 < 7: 1 < 7 ✓"}]}
});

/* ---------- exploraciones ---------- */
Object.assign(EXPLORE,{
qBalanza(host){let st,sol,hist;
  host.innerHTML=`<div class="xp"><div class="svgwrap"><svg id="bsv" viewBox="0 0 600 270" role="img" aria-label="Balanza con cajas x y unidades" style="max-width:560px"></svg></div>
   <div class="readout" id="brr"></div><div class="ctrl"><button class="btn sm" id="bx">Quitar una x de cada plato</button><button class="btn sm" id="bu">Quitar una unidad de cada plato</button><button class="btn sm" id="bd">Repartir en grupos iguales</button></div>
   <div class="ctrl"><button class="btn sm ghost" id="b1">Quitar una unidad solo a la izquierda</button><button class="btn sm ghost" id="bn">Nueva ecuación</button></div><ol class="hist" id="bh"></ol></div>`;
  const fresh=()=>{sol=R0.i(1,4);const d=R0.i(0,2),a=d+R0.i(1,3),b=R0.i(0,5);st={L:{x:a,u:b},R:{x:d,u:(a-d)*sol+b}};hist=[]};
  const R0=rng(newSeed());
  const side=s=>poly([[s.x,"x"],[s.u,""]]);
  const draw=()=>{const wL=st.L.x*sol+st.L.u,wR=st.R.x*sol+st.R.u,ang=Math.max(-12,Math.min(12,(wR-wL)*3));
    const cx=300,cy=70,arm=200,r=ang*Math.PI/180,lx=cx-arm*Math.cos(r),ly=cy-arm*Math.sin(r),rx=cx+arm*Math.cos(r),ry=cy+arm*Math.sin(r);
    const pan=(px,py,s)=>{let g=`<line x1="${px}" y1="${py}" x2="${px-70}" y2="${py+80}" stroke="var(--muted)"/><line x1="${px}" y1="${py}" x2="${px+70}" y2="${py+80}" stroke="var(--muted)"/><path d="M${px-80} ${py+80} h160 l-14 16 h-132 z" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.5"/>`;
      const items=[...Array(s.x).fill("x"),...Array(s.u).fill("u")];items.forEach((t,i)=>{const col=i%8,row=Math.floor(i/8),x=px-76+col*19,y=py+61-row*20;
        g+=t==="x"?`<rect x="${x}" y="${y}" width="17" height="17" rx="3" fill="var(--l-ecu)"/><text x="${x+8.5}" y="${y+13}" text-anchor="middle" style="font:700 11px var(--f-mono);fill:var(--surface)">x</text>`:`<circle cx="${x+8.5}" cy="${y+8.5}" r="7.5" fill="var(--av-sol)" stroke="var(--ink)" stroke-width="1"/>`});return g};
    let g=`<path d="M${cx-30} 250 L${cx} ${cy} L${cx+30} 250 Z" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.5"/><line x1="${lx}" y1="${ly}" x2="${rx}" y2="${ry}" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="6" fill="var(--ink)"/>`;
    g+=pan(lx,ly,st.L)+pan(rx,ry,st.R);$("#bsv",host).innerHTML=g;
    const bal=wL===wR,done=st.L.x===1&&st.L.u===0&&st.R.x===0;
    $("#brr",host).innerHTML=`<span class="k">Ecuación</span>${side(st.L)} = ${side(st.R)}<br><span class="k">Balanza</span>${bal?"en equilibrio":"¡desequilibrada! Cambiaste solo un lado: esta ecuación ya no tiene la misma solución"}${done&&bal?`<br><span class="k">Resuelta</span>x = ${st.R.u}. Comprueba en la ecuación de partida`:""}`;
    $("#bx",host).disabled=!(st.L.x>0&&st.R.x>0);$("#bu",host).disabled=!(st.L.u>0&&st.R.u>0);$("#bd",host).disabled=!(st.L.u===0&&st.R.x===0&&st.L.x>1&&st.R.u%st.L.x===0);$("#b1",host).disabled=st.L.u===0;
    $("#bh",host).innerHTML=hist.map(h=>`<li>${h}</li>`).join("")};
  const step=(f,txt)=>{f();hist.push(txt+" → "+side(st.L)+" = "+side(st.R));draw()};
  $("#bx",host).onclick=()=>step(()=>{st.L.x--;st.R.x--},"Quito una x de cada lado");
  $("#bu",host).onclick=()=>step(()=>{st.L.u--;st.R.u--},"Quito una unidad de cada lado");
  $("#bd",host).onclick=()=>{const k=st.L.x;step(()=>{st.L.x=1;st.R.u/=k},`Reparto en ${k} grupos iguales`)};
  $("#b1",host).onclick=()=>step(()=>{st.L.u--},"Quito una unidad solo a la izquierda");
  $("#bn",host).onclick=()=>{fresh();draw()};fresh();draw()},

qPasos(host){let a,b,c,d,hist,R0=rng(newSeed());
  host.innerHTML=`<div class="xp"><div class="readout" id="prr" style="font-size:1.2rem"></div><div class="ctrl" id="pbt"></div><ol class="hist" id="ph"></ol><div class="ctrl"><button class="btn sm ghost" id="pnew">Nueva ecuación</button></div></div>`;
  const fresh=()=>{const s=R0.i(-6,6);a=R0.i(2,7);do{c=R0.i(-4,6)}while(c===a||c===0);b=R0.nz(-9,9);d=(a-c)*s+b;hist=[`${eqS(a,b,c,d)}`]};
  const draw=()=>{$("#prr",host).innerHTML=`<span class="k">Ecuación actual</span>${eqS(a,b,c,d)}`;const btn=[];
    if(c)btn.push([`${c>0?"Restar":"Sumar"} ${co(Math.abs(c),"x")} a los dos lados`,()=>{a-=c;c=0}]);
    if(b)btn.push([`${b>0?"Restar":"Sumar"} ${Math.abs(b)} a los dos lados`,()=>{d-=b;b=0}]);
    if(!b&&!c&&a!==1&&a)btn.push([`Dividir los dos lados entre ${fmt(a)}`,()=>{d=d/a;a=1}]);
    $("#pbt",host).innerHTML=btn.length?btn.map((x,i)=>`<button class="btn sm primary" data-i="${i}">${x[0]}</button>`).join(""):`<span class="tip">¡Resuelta! Comprueba sustituyendo x = ${fmt(d)} en la ecuación de partida.</span>`;
    $$("[data-i]",host).forEach(e=>e.onclick=()=>{const x=btn[+e.dataset.i];x[1]();hist.push(`${eqS(a,b,c,d)}   <span class="muted">(${x[0].toLowerCase()})</span>`);draw()});
    $("#ph",host).innerHTML=hist.map(h=>`<li>${h}</li>`).join("")};
  $("#pnew",host).onclick=()=>{fresh();draw()};fresh();draw()},

qModelo(host){const PRE=[[38,10],[40,16],[30,12],[45,20]];let m=38,h=10,x=0,found=false;
  host.innerHTML=`<div class="xp"><div class="ctrl"><span class="seg" role="group" aria-label="Datos del problema">${PRE.map((p,i)=>`<button class="btn sm" data-p="${i}">Madre ${p[0]}, hijo ${p[1]}</button>`).join("")}</span></div>
   <div class="ctrl"><label for="mx">Años que pasan, x = <output class="m" id="mxo">0</output></label><input type="range" id="mx" min="-10" max="30" value="0"></div>
   <div class="svgwrap"><svg id="msv" viewBox="0 0 600 170" role="img" aria-label="Barras de edades" style="max-width:560px"></svg></div><div class="readout" id="mrr"></div></div>`;
  const draw=()=>{const sc=6,bar=(y,v,col,lab)=>`<rect x="140" y="${y}" width="${Math.max(0,v*sc)}" height="30" rx="4" fill="${col}"/><text x="130" y="${y+20}" text-anchor="end" style="font:600 13px var(--f-disp);fill:var(--ink)">${lab}</text><text x="${146+Math.max(0,v*sc)}" y="${y+20}" style="font:700 13px var(--f-mono);fill:var(--ink)">${v}</text>`;
    const M_=m+x,H_=h+x,eq=M_===2*H_;if(eq)found=true;
    let s=bar(14,M_,"var(--l-ecu)","Madre")+bar(60,H_,"var(--l-rac)","Hijo")+bar(106,2*H_,eq?"var(--ok)":"color-mix(in srgb,var(--l-rac) 45%,var(--surface))","Doble del hijo");
    $("#msv",host).innerHTML=s;$("#mxo",host).textContent=fmt(x);
    $("#mrr",host).innerHTML=`<span class="k">${x>0?"Dentro de "+x+" años":x<0?"Hace "+(-x)+" años":"Hoy"}</span>madre ${M_}, hijo ${H_}, doble del hijo ${2*H_}: ${eq?"<b>¡la madre tiene el doble!</b>":M_>2*H_?"la madre tiene más del doble":"la madre tiene menos del doble"}<br><span class="k">Ecuación</span>${!found?`${m} + x = 2(${h} + x). Encuentra x moviendo el deslizador; luego verás cómo se resuelve.`:`${m} + x = 2(${h} + x) → ${m} + x = ${2*h} + 2x → x = ${m-2*h}${m-2*h<0?" (negativo: ocurrió hace "+(2*h-m)+" años)":""}`}`;
    $$("[data-p]",host).forEach(b=>b.setAttribute("aria-current",PRE[+b.dataset.p][0]===m&&PRE[+b.dataset.p][1]===h?"page":"false"))};
  $$("[data-p]",host).forEach(b=>b.onclick=()=>{[m,h]=PRE[+b.dataset.p];x=0;found=false;$("#mx",host).value=0;draw()});$("#mx",host).oninput=e=>{x=+e.target.value;draw()};draw()},

qRectas(host){const L1={a:1,b:1,c:4};let a=1,b=-1,c=2;
  host.innerHTML=`<div class="xp"><p class="tip">Recta 1 fija: x + y = 4. Cambia la recta 2: ${M("a·x + b·y = c")}.</p><div class="ctrl"><label for="ra">a: <output class="m" id="rao">1</output></label><input type="range" id="ra" min="-3" max="3" value="1"><label for="rb">b: <output class="m" id="rbo">−1</output></label><input type="range" id="rb" min="-3" max="3" value="-1"><label for="rc">c: <output class="m" id="rco">2</output></label><input type="range" id="rc" min="-8" max="8" value="2"></div>
   <div class="svgwrap"><svg id="rsv" viewBox="0 0 360 360" role="img" aria-label="Dos rectas en el plano" style="max-width:360px"></svg></div><div class="readout" id="rrr"></div></div>`;
  const X=v=>180+v*24,Y=v=>180-v*24,lineSeg=(A,B,C,col)=>{if(!A&&!B)return"";let p;if(B){p=[[-7.5,(C-A*-7.5)/B],[7.5,(C-A*7.5)/B]]}else p=[[C/A,-7.5],[C/A,7.5]];return`<line x1="${X(p[0][0])}" y1="${Y(p[0][1])}" x2="${X(p[1][0])}" y2="${Y(p[1][1])}" stroke="${col}" stroke-width="3"/>`};
  const draw=()=>{let s=`<defs><clipPath id="rcl"><rect x="0" y="0" width="360" height="360"/></clipPath></defs>`;for(let v=-7;v<=7;v++)s+=`<line x1="${X(v)}" y1="0" x2="${X(v)}" y2="360" stroke="var(--rule)" stroke-width="${v?.5:1.5}"/><line x1="0" y1="${Y(v)}" x2="360" y2="${Y(v)}" stroke="var(--rule)" stroke-width="${v?.5:1.5}"/>`+(v&&v%2===0?`<text x="${X(v)}" y="${Y(0)+13}" text-anchor="middle" style="font:10px var(--f-mono);fill:var(--muted)">${fmt(v)}</text><text x="${X(0)-5}" y="${Y(v)+4}" text-anchor="end" style="font:10px var(--f-mono);fill:var(--muted)">${fmt(v)}</text>`:"");
    s+=`<g clip-path="url(#rcl)">${lineSeg(L1.a,L1.b,L1.c,"var(--l-ecu)")}${lineSeg(a,b,c,"var(--l-rac)")}</g>`;
    const det=L1.a*b-a*L1.b;let msg;
    if(!a&&!b)msg=c?"0 = "+fmt(c)+" no se cumple nunca: no es una recta":"0 = 0: no es una recta";
    else if(det){const x=(L1.c*b-c*L1.b)/det,y=(L1.a*c-a*L1.c)/det;s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="6" fill="var(--av-coral)" stroke="var(--ink)"/>`;msg=`las rectas se cortan en (${decs(x,2)}, ${decs(y,2)}): <b>una solución</b>`}
    else msg=(a*L1.c===c*L1.a&&b*L1.c===c*L1.b)?"<b>la misma recta</b>: infinitas soluciones":"<b>rectas paralelas</b>: no se cortan, sin solución";
    $("#rsv",host).innerHTML=s;["a","b","c"].forEach(k=>$(`#r${k}o`,host).textContent=fmt({a,b,c}[k]));
    $("#rrr",host).innerHTML=`<span class="k">Sistema</span>x + y = 4<br>${a||b?poly([[a,"x"],[b,"y"]]):"0"} = ${fmt(c)}<br><span class="k">Resultado</span>${msg}`};
  const fix=(who)=>{if(!a&&!b){if(who==="a"){b=1;$("#rb",host).value=1}else{a=1;$("#ra",host).value=1}}};$("#ra",host).oninput=e=>{a=+e.target.value;fix("a");draw()};$("#rb",host).oninput=e=>{b=+e.target.value;fix("b");draw()};$("#rc",host).oninput=e=>{c=+e.target.value;draw()};draw()},

qInecuacion(host){let a=2,b=1,c=7,op="<",t=0;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ia">a: <output class="m" id="iao">2</output></label><input type="range" id="ia" min="-4" max="4" value="2"><label for="ib">b: <output class="m" id="ibo">1</output></label><input type="range" id="ib" min="-6" max="6" value="1"><label for="ic">c: <output class="m" id="ico">7</output></label><input type="range" id="ic" min="-9" max="9" value="7"></div>
   <div class="ctrl"><span class="seg" role="group" aria-label="Desigualdad">${Object.keys(OPS).map(o=>`<button class="btn sm" data-o="${o}">${OPH[o]}</button>`).join("")}</span></div>
   <p class="tip">Arrastra el rombo para probar números.</p><div class="svgwrap nl"><svg id="isv2" viewBox="0 0 640 110" role="img" aria-label="Solución de la inecuación en la recta"></svg></div><div class="readout" id="irr2"></div></div>`;
  const X=v=>320+v*28;const test=(v,o,r)=>o==="<"?v<r:o===">"?v>r:o==="<="?v<=r:v>=r;
  const draw=()=>{if(!a)a=1;const s=(c-b)/a,o2=a<0?flip[op]:op,right=o2[0]===">",cl=o2.length>1;
    let g=`<line x1="14" y1="60" x2="626" y2="60" stroke="var(--rule)" stroke-width="2"/>`;for(let v=-10;v<=10;v++)g+=`<line x1="${X(v)}" y1="55" x2="${X(v)}" y2="65" stroke="var(--muted)"/><text x="${X(v)}" y="86" text-anchor="middle" style="font:11px var(--f-mono);fill:var(--muted)">${fmt(v)}</text>`;
    const xs_=Math.max(-10.5,Math.min(10.5,s));g+=`<line x1="${X(xs_)}" y1="60" x2="${right?626:14}" y2="60" stroke="var(--l-ecu)" stroke-width="7"/><circle cx="${X(xs_)}" cy="60" r="9" fill="${cl?"var(--l-ecu)":"var(--surface)"}" stroke="var(--l-ecu)" stroke-width="3.5"/>`;
    const ok=test(a*t+b,op,c);g+=`<polygon points="${X(t)},18 ${X(t)+8},28 ${X(t)},38 ${X(t)-8},28" fill="${ok?"var(--ok)":"var(--bad)"}" style="cursor:grab"/><text x="${X(t)}" y="12" text-anchor="middle" style="font:700 11px var(--f-mono);fill:${ok?"var(--ok)":"var(--bad)"}">${fmt(t)}</text>`;
    $("#isv2",host).innerHTML=g;["a","b","c"].forEach(k=>$(`#i${k}o`,host).textContent=fmt({a,b,c}[k]));$$("[data-o]",host).forEach(e=>e.setAttribute("aria-current",e.dataset.o===op?"page":"false"));
    const sv=frs(c-b,a);
    $("#irr2",host).innerHTML=`<span class="k">Inecuación</span>${ex1(a,b)} ${OPH[op]} ${fmt(c)}<br><span class="k">Pasos</span>${co(a,"x")} ${OPH[op]} ${fmt(c-b)}${a!==1?`  →  dividir entre ${fmt(a)}${a<0?" (negativo: <b>cambia el sentido</b>)":""}`:""}  →  x ${OPH[o2]} ${sv}<br><span class="k">Intervalo</span>${right?`${cl?"[":"("}${sv}, +∞)`:`(−∞, ${sv}${cl?"]":")"}`}<br><span class="k">Prueba con x = ${fmt(t)}</span>${fmt(a)} · ${fmtP(t)}${b?sgA(b):""} = ${fmt(a*t+b)} ${ok?"cumple":"no cumple"} ${OPH[op]} ${fmt(c)}`};
  let drag=false;dragOn($("#isv2",host),{down:p=>{if(p.y>44||Math.abs(p.x-X(t))>24)return false;drag=true},move:p=>{const v=Math.max(-10,Math.min(10,Math.round((p.x-320)/28)));if(drag&&v!==t){t=v;draw()}},up:()=>drag=false});
  $("#ia",host).oninput=e=>{a=+e.target.value||(a>0?-1:1);if(!+e.target.value)e.target.value=a;draw()};$("#ib",host).oninput=e=>{b=+e.target.value;draw()};$("#ic",host).oninput=e=>{c=+e.target.value;draw()};
  $$("[data-o]",host).forEach(e=>e.onclick=()=>{op=e.dataset.o;draw()});draw()}
});
