"use strict";
/* ============ Línea: Ecuaciones · Q6–Q10 ============
   Segundo grado (factorizar; fórmula general), ecuaciones con valor absoluto, con fracciones y con radicales. */

const xr=(c)=>`x ${c<0?"+":"−"} ${Math.abs(c)}`;           // x − c
const xp=(c)=>`x ${c<0?"−":"+"} ${Math.abs(c)}`;           // x + c
const setShow=a=>a.length?a.slice().sort((p,q)=>p-q).map(v=>Number.isInteger(v)?fmt(v):frs(Math.round(v*1e6),1e6)).join("; "):"no tiene";
const rtxt=v=>Number.isInteger(v)?fmt(v):(()=>{for(const d of [2,3,4,5,6]){if(Math.abs(v*d-Math.round(v*d))<1e-9)return frs(Math.round(v*d),d)}return decs(v,3)})();
const setShowR=a=>a.length?a.slice().sort((p,q)=>p-q).map(rtxt).join("; "):"no tiene";

Object.assign(NODES,{
Q6:{title:"Segundo grado: factorizar",sub:"Si un producto vale cero, alguno de sus factores es cero.",
 info:`<p class="lead">Una ecuación de <b>segundo grado</b> tiene la forma ${M(`a${P("x",2)} + bx + c = 0`)}, con a ≠ 0. Puede tener dos soluciones, una o ninguna.</p>
 <div class="ex-box"><span class="eyebrow">La clave: producto cero</span><p>Si A · B = 0, entonces A = 0 o B = 0. Por eso, si la ecuación se puede factorizar, se resuelve igualando cada factor a cero:</p>
 <p class="calc">${P("x",2)} + x − 6 = 0  →  (x + 3)(x − 2) = 0  →  x = −3  o  x = 2</p></div>
 <div class="ex-box"><span class="eyebrow">Casos rápidos</span><p>${M(`${P("x",2)} = 9`)}: x = 3 o x = −3. No olvides la solución negativa.</p>
 <p>${M(`${P("x",2)} − 5x = 0`)}: se saca factor común, x(x − 5) = 0, así que x = 0 o x = 5.</p></div>
 <div class="callout"><span class="eyebrow">Dos errores frecuentes</span><p>Dividir ${M(`${P("x",2)} = 5x`)} entre x hace perder la solución x = 0. Y para usar el producto cero hay que tener <b>cero</b> en un lado: x(x + 1) = 6 no dice que x = 6.</p></div>`,
 explore:{intro:"Elige las dos raíces y mira el producto (x − r₁)(x − r₂): cuando x vale una de ellas, uno de los factores es cero y el producto también.",fn:"qProdCero"},
 key:"Para resolver por factorización: pasar todo a un lado, factorizar e igualar cada factor a cero. x² = k tiene dos soluciones, ±√k.",
 ojo:"No dividas entre x: se pierde la solución x = 0. Y el producto cero solo funciona si un lado es 0."},

Q7:{title:"La fórmula general",sub:"Completar el cuadrado resuelve cualquier ecuación de segundo grado.",
 info:`<p class="lead">No todas las ecuaciones de segundo grado se factorizan a simple vista. <b>Completar el cuadrado</b> funciona siempre.</p>
 <div class="ex-box"><span class="eyebrow">Completar el cuadrado</span><p class="calc">${P("x",2)} + 6x = 7  →  ${P("x",2)} + 6x + 9 = 16  →  ${P("(x + 3)",2)} = 16  →  x + 3 = ±4</p>
 <p>Así x = 1 o x = −7. Se suma el cuadrado de la mitad del coeficiente de x: es la pieza que falta en el dibujo de «Productos notables».</p></div>
 <div class="ex-box"><span class="eyebrow">La fórmula general</span><p>Haciendo lo mismo con ${M(`a${P("x",2)} + bx + c = 0`)} se obtiene</p>
 <p class="calc">x = ${FQ(`−b ± √(${P("b",2)} − 4ac)`,"2a")}</p></div>
 <div class="ex-box"><span class="eyebrow">El discriminante</span><p>El número Δ = ${P("b",2)} − 4ac decide cuántas soluciones hay: si Δ &gt; 0, dos; si Δ = 0, una; si Δ &lt; 0, ninguna real (no existe la raíz cuadrada de un negativo).</p>
 <p>En la gráfica de y = a${P("x",2)} + bx + c, las soluciones son los cortes con el eje x.</p></div>
 <div class="callout"><span class="eyebrow">Cuidado con los signos</span><p>Si b es negativo, −b es positivo; y ${P("b",2)} siempre es positivo: para b = −5, ${P("b",2)} = 25.</p></div>`,
 explore:{intro:"Cambia a, b y c. Mira cómo se mueve la parábola, cuánto vale el discriminante y cuántas veces corta el eje x.",fn:"qParabola"},
 key:"x = (−b ± √(b² − 4ac)) / (2a). El discriminante b² − 4ac dice si hay dos soluciones, una o ninguna: los cortes de la parábola con el eje x.",
 ojo:"(−5)² = 25: el cuadrado de b siempre es positivo, aunque b sea negativo."},

Q8:{title:"Ecuaciones con valor absoluto",sub:"Dos casos: lo de dentro es positivo o negativo.",
 info:`<p class="lead">${M("|x − c| = r")} pide los números a distancia r de c, como en «Valor absoluto»: si r &gt; 0 hay dos soluciones, c + r y c − r.</p>
 <div class="ex-box"><span class="eyebrow">Con una expresión dentro</span><p>${M("|2x − 1| = 5")} se parte en dos ecuaciones:</p><p class="calc">2x − 1 = 5  →  x = 3        2x − 1 = −5  →  x = −2</p></div>
 <div class="ex-box"><span class="eyebrow">Casos especiales</span><p>${M("|x + 4| = 0")} solo tiene x = −4. ${M("|x + 4| = −3")} no tiene solución: un valor absoluto nunca es negativo.</p>
 <p>${M("|x − 1| = |x − 7|")}: o x − 1 = x − 7 (imposible) o x − 1 = −(x − 7), que da x = 4, el punto medio.</p></div>
 <div class="callout"><span class="eyebrow">Si hay x a los dos lados, comprueba</span><p>En ${M("|x − 3| = 2x")}, los dos casos dan x = −3 y x = 1. Pero con x = −3 el lado derecho vale −6, y un valor absoluto no puede valer −6: solo x = 1 es solución.</p></div>`,
 explore:{intro:"Mira la gráfica de y = |x − c| y la recta del lado derecho. Las soluciones son los cortes. Cambia los números y observa cuándo hay dos, una o ninguna.",fn:"qAbsEq"},
 key:"|A| = r se parte en A = r y A = −r. Si r < 0 no hay solución. Cuando el lado derecho tiene x, hay que comprobar cada candidato.",
 ojo:"Un valor absoluto nunca es negativo: |algo| = −3 no tiene solución."},

Q9:{title:"Ecuaciones con fracciones",sub:"Quitar denominadores, sin olvidar los valores prohibidos.",
 info:`<p class="lead">Cuando la incógnita está en un denominador, primero se anotan los <b>valores prohibidos</b>: los que hacen cero algún denominador.</p>
 <div class="ex-box"><span class="eyebrow">Multiplicar por el común denominador</span><p class="calc">${FQ(1,"x")} + ${FQ(1,"2x")} = ${FQ(3,4)}   (x ≠ 0)   ·4x   →   4 + 2 = 3x   →   x = 2</p></div>
 <div class="ex-box"><span class="eyebrow">Proporciones</span><p>Si ${FQ("a","b")} = ${FQ("c","d")}, entonces a · d = b · c. Por ejemplo ${FQ("x + 1",3)} = ${FQ("x − 1",2)} → 2(x + 1) = 3(x − 1) → x = 5.</p></div>
 <div class="callout"><span class="eyebrow">Soluciones que no valen</span><p>En ${FQ("x","x − 3")} = ${FQ(3,"x − 3")} (x ≠ 3), al multiplicar por x − 3 queda x = 3, que está prohibido. La ecuación <b>no tiene solución</b>. Por eso siempre se comprueba al final.</p></div>`,
 explore:{intro:"Elige una ecuación y mira las dos partes como gráficas: las soluciones son los cortes y los valores prohibidos son las rectas verticales donde la curva se rompe.",fn:"qFraccion"},
 key:"Anotar los valores prohibidos, multiplicar por el común denominador, resolver y descartar cualquier resultado prohibido.",
 ojo:"Si el resultado hace cero un denominador, no es solución."},

Q10:{title:"Ecuaciones con radicales",sub:"Aislar la raíz, elevar al cuadrado y comprobar.",
 info:`<p class="lead">Para resolver una ecuación con una raíz cuadrada: se <b>aísla la raíz</b>, se <b>elevan al cuadrado</b> los dos lados y se resuelve lo que queda.</p>
 <div class="ex-box"><span class="eyebrow">Ejemplo</span><p class="calc">√(x + 3) = x − 3  →  x + 3 = ${P("(x − 3)",2)} = ${P("x",2)} − 6x + 9  →  ${P("x",2)} − 7x + 6 = 0  →  x = 1  o  x = 6</p>
 <p><b>Comprobación:</b> con x = 6, √9 = 3 = 6 − 3 ✓. Con x = 1, √4 = 2, pero 1 − 3 = −2 ✗. La única solución es x = 6.</p></div>
 <div class="callout"><span class="eyebrow">¿Por qué aparecen soluciones falsas?</span><p>Al elevar al cuadrado se pierde el signo: 2 = −2 es falso, pero 2² = (−2)² es verdadero. La ecuación nueva tiene las soluciones de la original y, a veces, alguna más.</p></div>
 <p>Además, √(algo) nunca es negativa: √(x − 5) = −2 no tiene solución.</p>`,
 explore:{intro:"La curva es la raíz y la recta, el otro lado. La curva punteada muestra lo que se añade al elevar al cuadrado: sus cortes con la recta son las soluciones falsas.",fn:"qRadical"},
 key:"Aislar la raíz, elevar al cuadrado, resolver y comprobar cada candidato en la ecuación original: elevar al cuadrado puede añadir soluciones falsas.",
 ojo:"Comprueba siempre en la ecuación original. Y recuerda que una raíz cuadrada nunca da un número negativo."}
});

Object.assign(RETO,{
Q6:[
 R=>{const k=R.i(2,12),form=R.p(["eq","zero"]);
  return{type:"fill",kind:"set",answer:[k,-k],show:`${k}; −${k}`,q:`Resuelve ${M(form==="eq"?`${P("x",2)} = ${k*k}`:`${P("x",2)} − ${k*k} = 0`)}`,hint:`¿Qué números al cuadrado dan ${k*k}? Hay dos.`,
   explain:`${k}² = ${k*k} y (−${k})² = ${k*k}: x = ${k} o x = −${k}.`}},
 R=>{const a=R.p([1,1,2,3]),r=R.nz(-6,6),b=-a*r;
  return{type:"fill",kind:"set",answer:[0,r],show:setShow([0,r]),q:`Resuelve ${M(`${a===1?"":a}${P("x",2)}${sgA(b)}x = 0`)}`,hint:"Saca x como factor común e iguala cada factor a cero.",
   explain:`x(${a===1?"":a}x${sgA(b)}) = 0 → x = 0 o ${a===1?"":a}x = ${fmt(-b)}, es decir x = ${fmt(r)}.`}},
 R=>{let r1=R.nz(-7,7),r2=R.nz(-7,7);if(r1===r2)r2=-r1||3;const cs=[1,-(r1+r2),r1*r2];
  return{type:"fill",kind:"set",answer:[r1,r2],show:setShow([r1,r2]),q:`Resuelve ${M(`${pfmt(cs)} = 0`)}`,hint:`Busca dos números que sumen ${fmt(r1+r2)} y multipliquen ${fmt(r1*r2)}; los signos de las soluciones son los contrarios.`,
   explain:`${pfmt(cs)} = (${xr(r1)})(${xr(r2)}) = 0 → x = ${fmt(r1)} o x = ${fmt(r2)}.`}},
 R=>{const k=R.i(2,9),who=R.p(["Ana","Luis","Sara","Pedro"]);
  return{type:"choice",q:`${who} resuelve ${M(`${P("x",2)} = ${k}x`)} dividiendo entre x y obtiene x = ${k}. ¿Qué ocurre?`,opts:[`Pierde la solución x = 0; las soluciones son 0 y ${k}`,`Está bien: la única solución es ${k}`,`Las soluciones son ${k} y −${k}`,"No se puede resolver sin la fórmula general"],
   hint:"¿Qué pasa si x vale 0? ¿Se puede dividir entre 0?",explain:`${P("x",2)} − ${k}x = 0 → x(x − ${k}) = 0 → x = 0 o x = ${k}. Al dividir entre x se supone que x ≠ 0 y se pierde esa solución.`}},
 R=>{let r1=R.nz(-6,6),r2=R.nz(-6,6);if(r1===r2||r1*r2===0)return RETO.Q6[4](R);const s=r1+r2,p=r1*r2;
  return{type:"fill",kind:"set",answer:[r1,r2],show:setShow([r1,r2]),q:`Resuelve ${M(`x(x${sgA(-s)}) = ${fmt(-p)}`)}`,hint:"Primero desarrolla y pasa todo a un lado para que quede = 0; después factoriza.",
   explain:`${P("x",2)}${sgA(-s)}x${sgA(p)} = 0 → (${xr(r1)})(${xr(r2)}) = 0 → x = ${fmt(r1)} o x = ${fmt(r2)}. Igualar cada factor a ${fmt(-p)} sería un error.`}}],
Q7:[
 R=>{const a=R.nz(-3,4),b=R.i(-7,7),c=R.i(-6,6);
  return{type:"fill",kind:"num",answer:b*b-4*a*c,q:`Calcula el discriminante de ${M(`${pfmt([a,b,c])} = 0`)}`,hint:"Δ = b² − 4ac. Identifica a, b y c con su signo.",
   explain:`a = ${fmt(a)}, b = ${fmt(b)}, c = ${fmt(c)}: Δ = ${fmtP(b)}² − 4 · ${fmtP(a)} · ${fmtP(c)} = ${b*b} ${-4*a*c<0?"−":"+"} ${Math.abs(4*a*c)} = ${fmt(b*b-4*a*c)}.`}},
 R=>{const t=R.p(["dos","una","ninguna"]);let a=R.nz(-2,3),b,c;
  if(t==="una"){const r=R.nz(-4,4);b=-2*a*r;c=a*r*r}else{b=R.i(-6,6);c=R.i(-6,6);const D=b*b-4*a*c;if((t==="dos"&&D<=0)||(t==="ninguna"&&D>=0))return RETO.Q7[1](R)}
  const D=b*b-4*a*c;return{type:"choice",q:`¿Cuántas soluciones reales tiene ${M(`${pfmt([a,b,c])} = 0`)}?`,opts:t==="dos"?["Dos","Una","Ninguna"]:t==="una"?["Una","Dos","Ninguna"]:["Ninguna","Una","Dos"],
   hint:"Calcula el discriminante b² − 4ac y mira su signo.",explain:`Δ = ${fmt(D)}, que es ${D>0?"positivo: dos soluciones":D===0?"cero: una solución":"negativo: ninguna solución real"}.`}},
 R=>{const a=R.p([2,3]),m=R.nz(-5,5),n=R.nz(-4,4);if(m%a===0)return RETO.Q7[2](R);const cs=pmul([a,-m],[1,-n]);
  return{type:"fill",kind:"set",answer:[m/a,n],show:setShowR([m/a,n]),q:`Resuelve ${M(`${pfmt(cs)} = 0`)}. Si alguna solución no es entera, escríbela como fracción.`,hint:`Usa la fórmula general con a = ${cs[0]}, b = ${fmt(cs[1])}, c = ${fmt(cs[2])}.`,
   explain:`Δ = ${fmt(cs[1]*cs[1]-4*cs[0]*cs[2])} y √Δ = ${Math.round(Math.sqrt(cs[1]*cs[1]-4*cs[0]*cs[2]))}: x = (${fmt(-cs[1])} ± ${Math.round(Math.sqrt(cs[1]*cs[1]-4*cs[0]*cs[2]))}) / ${2*cs[0]}, que da ${rtxt(m/a)} y ${fmt(n)}.`}},
 R=>{const h=R.nz(-6,6),b=2*h,c=R.i(-9,9),rhs=h*h-c;
  return{type:"choice",q:`Al completar el cuadrado en ${M(`${P("x",2)}${sgA(b)}x${c?sgA(c):""} = 0`)}, ¿qué se obtiene?`,opts:[M(`${P(`(${xp(h)})`,2)} = ${fmt(rhs)}`),M(`${P(`(${xp(b)})`,2)} = ${fmt(b*b-c)}`),M(`${P(`(${xp(h)})`,2)} = ${fmt(-c)}`),M(`${P(`(${xp(h)})`,2)} = ${fmt(h*h+c)}`)].filter((v,i,a)=>a.indexOf(v)===i),
   hint:`La mitad de ${fmt(b)} es ${fmt(h)}; suma ${h*h} a los dos lados después de pasar ${fmt(c)} al otro lado.`,explain:`${P("x",2)}${sgA(b)}x = ${fmt(-c)} → ${P("x",2)}${sgA(b)}x + ${h*h} = ${fmt(-c)} + ${h*h} → ${P(`(${xp(h)})`,2)} = ${fmt(rhs)}.`}},
 R=>{const h=R.nz(-4,4),b=2*h,c=h*h;
  return{type:"slider",name:"c",min:-5,max:20,start:c>8?-4:15,answer:c,show:"c = "+c,label:v=>"c = "+v,
   q:`Ajusta c para que ${M(`${P("x",2)}${sgA(b)}x + c = 0`)} tenga <b>una sola</b> solución.`,hint:"Con una sola solución el discriminante es cero: b² − 4c = 0.",explain:`b² − 4c = ${b*b} − 4c = 0 → c = ${c}. La parábola toca el eje x en un solo punto, x = ${fmt(-h)}.`,
   render:(v,ok)=>{const D=b*b-4*v,rts=D>0?[(-b-Math.sqrt(D))/2,(-b+Math.sqrt(D))/2]:D===0?[-b/2]:[];
     return plot({xmin:-9,xmax:9,ymin:-8,ymax:24,w:520,h:300,xstep:1,ystep:4,fns:[{f:x=>x*x+b*x+v,color:ok?"var(--ok)":"var(--l-ecu)"}],pts:rts.map(r=>({x:r,y:0,color:"var(--ink)",r:5})),aria:"Parábola y sus cortes con el eje x"})}}}],
Q8:[
 R=>{const c=R.i(-6,6),r=R.i(1,7);
  return{type:"fill",kind:"set",answer:[c+r,c-r],show:setShow([c+r,c-r]),q:`Resuelve ${M(c?`|${xr(c)}| = ${r}`:`|x| = ${r}`)}`,hint:`Son los números a distancia ${r} de ${fmt(c)}.`,explain:`x = ${fmt(c)} + ${r} = ${fmt(c+r)} o x = ${fmt(c)} − ${r} = ${fmt(c-r)}.`}},
 R=>{const a=R.p([2,3]),x1=R.i(-4,6),d=R.i(1,4),x2=x1-d*(a===2?1:2);const r=a*(x1-x2)/2;if(!Number.isInteger(r))return RETO.Q8[1](R);const b=r-a*x1;
  return{type:"fill",kind:"set",answer:[x1,x2],show:setShow([x1,x2]),q:`Resuelve ${M(`|${a}x${b?sgA(b):""}| = ${r}`)}`,hint:`Plantea dos ecuaciones: ${a}x${b?sgA(b):""} = ${r} y ${a}x${b?sgA(b):""} = −${r}.`,
   explain:`${a}x${b?sgA(b):""} = ${r} → x = ${fmt(x1)};  ${a}x${b?sgA(b):""} = −${r} → x = ${fmt(x2)}.`}},
 R=>{const c=R.nz(-6,6),t=R.p(["neg","cero","pos"]),r=t==="neg"?-R.i(1,6):t==="cero"?0:R.i(1,6);
  return{type:"choice",q:`¿Cuántas soluciones tiene ${M(`|${xr(c)}| = ${fmt(r)}`)}?`,opts:t==="neg"?["Ninguna","Una","Dos"]:t==="cero"?["Una","Ninguna","Dos"]:["Dos","Una","Ninguna"],hint:"Un valor absoluto es una distancia: ¿puede valer un número negativo? ¿Cuántos números están a distancia 0 de un punto?",
   explain:t==="neg"?`Un valor absoluto nunca es negativo: |${xr(c)}| = ${fmt(r)} no tiene solución.`:t==="cero"?`Solo x = ${fmt(c)} está a distancia 0 de ${fmt(c)}.`:`Hay dos números a distancia ${r} de ${fmt(c)}: ${fmt(c+r)} y ${fmt(c-r)}.`}},
 R=>{const a=R.i(-6,4),b=a+2*R.i(1,5),m=(a+b)/2;
  return{type:"fill",kind:"set",answer:[m],show:fmt(m),q:`Resuelve ${M(`|${a?xr(a):"x"}| = |${xr(b)}|`)}`,hint:"Dos números que están a la misma distancia de a y de b… ¿dónde quedan? O plantea A = B y A = −B.",
   explain:`${a?xr(a):"x"} = ${xr(b)} es imposible; ${a?xr(a):"x"} = −(${xr(b)}) da 2x = ${fmt(a+b)}, x = ${fmt(m)}: el punto medio entre ${fmt(a)} y ${fmt(b)}.`}},
 R=>{for(let t=0;t<200;t++){const c=R.i(-6,6),d=R.i(-6,6),m=R.p([2,3]);
    // |x − c| = m·x + d. Caso 1: x − c = m x + d → x = (c + d)/(1 − m). Caso 2: −(x − c) = m x + d → x = (c − d)/(1 + m)
    const cA=(c+d)/(1-m),cB=(c-d)/(1+m);if(!Number.isInteger(cA)||!Number.isInteger(cB)||cA===cB)continue;
    const ok=[cA,cB].filter(x=>m*x+d>=0&&Math.abs(Math.abs(x-c)-(m*x+d))<1e-9),bad=[cA,cB].filter(x=>!ok.includes(x));if(ok.length!==1)continue;
    return{type:"fill",kind:"set",answer:ok,extraneous:bad,show:setShow(ok),q:`Resuelve ${M(`|${c?xr(c):"x"}| = ${m}x${d?sgA(d):""}`)}. Comprueba los candidatos.`,hint:"Resuelve los dos casos y sustituye cada resultado en la ecuación original: el lado derecho no puede ser negativo.",
     explain:`Los dos casos dan x = ${fmt(cA)} y x = ${fmt(cB)}. Con x = ${fmt(bad[0])} el lado derecho vale ${fmt(m*bad[0]+d)}, negativo: no sirve. La solución es x = ${fmt(ok[0])}.`}}
  return RETO.Q8[0](R)}],
Q9:[
 R=>{const a=R.nz(-6,6);let b=R.nz(-6,6);if(b===-a)b=a+1||2;const k=R.i(1,5);
  return{type:"fill",kind:"set",answer:[a,-b],show:setShow([a,-b]),q:`¿Qué valores no puede tomar x en ${FQ(xp(k),`(${xr(a)})(${xp(b)})`)}? Escríbelos separados por punto y coma.`,hint:"Busca los valores que hacen cero cada factor del denominador.",
   explain:`${xr(a)} = 0 cuando x = ${fmt(a)}, y ${xp(b)} = 0 cuando x = ${fmt(-b)}.`}},
 R=>{const c=R.p([2,3,4,5,-2,-3]),q=R.nz(-5,5),a=c*q,b=R.nz(-6,6);
  return{type:"fill",kind:"num",answer:b+q,q:`Resuelve ${FQ(fmt(a),xr(b))} = ${fmt(c)}`,hint:`Multiplica los dos lados por (${xr(b)}), con x ≠ ${fmt(b)}.`,
   explain:`${a} = ${fmt(c)}(${xr(b)}) → ${xr(b)} = ${fmt(q)} → x = ${fmt(b+q)}, que no es el valor prohibido ${fmt(b)}.`}},
 R=>{for(let t=0;t<500;t++){const x=R.i(-6,10),b=R.p([2,3,4,5]),d=R.p([2,3,4,5]),a=R.nz(-5,5);if(b===d)continue;const cc=x-d*(x+a)/b;if(!Number.isInteger(cc)||cc===0)continue;
    return{type:"fill",kind:"num",answer:x,q:`Resuelve ${FQ(xp(a),b)} = ${FQ(xr(cc),d)}`,hint:`Multiplica en cruz: ${d}(${xp(a)}) = ${b}(${xr(cc)}).`,explain:`${d}(${xp(a)}) = ${b}(${xr(cc)}) → ${pfmt([d,d*a])} = ${pfmt([b,-b*cc])} → x = ${fmt(x)}.`}}
  return RETO.Q9[1](R)},
 R=>{const k=R.i(2,7);
  return{type:"fill",kind:"set",answer:[-k],extraneous:[k],show:fmt(-k),q:`Resuelve ${FQ(P("x",2),xr(k))} = ${FQ(k*k,xr(k))}`,hint:`Anota primero el valor prohibido. Después multiplica por ${xr(k)} y comprueba.`,
   explain:`x ≠ ${k}. Multiplicando: ${P("x",2)} = ${k*k}, así que x = ${k} o x = −${k}. Pero ${k} está prohibido: la única solución es x = −${k}.`}},
 R=>{const x=R.p([1,2,3,4,5,6]),c=R.p([1,2,3]),a=R.i(1,c*x-1),b=2*c*x-2*a;if(b<=0)return RETO.Q9[4](R);
  return{type:"fill",kind:"num",answer:x,q:`Resuelve ${FQ(a,"x")} + ${FQ(b,"2x")} = ${c}`,hint:"El común denominador es 2x: multiplica todo por 2x (con x ≠ 0).",
   explain:`· 2x: ${2*a} + ${b} = ${2*c}x → ${2*a+b} = ${2*c}x → x = ${x}.`}}],
Q10:[
 R=>{const a=R.i(-8,8),b=R.i(1,7);
  return{type:"fill",kind:"num",answer:b*b-a,q:`Resuelve ${M(`√(${a?xp(a):"x"}) = ${b}`)}`,hint:"Eleva los dos lados al cuadrado.",explain:`${a?xp(a):"x"} = ${b*b} → x = ${fmt(b*b-a)}. Comprobación: √${b*b} = ${b} ✓.`}},
 R=>{const a=R.p([2,3,4,5]),x=R.i(-3,8),c=R.i(1,6),b=c*c-a*x;
  return{type:"fill",kind:"num",answer:x,q:`Resuelve ${M(`√(${a}x${b?sgA(b):""}) = ${c}`)}`,hint:"Eleva al cuadrado y despeja.",explain:`${a}x${b?sgA(b):""} = ${c*c} → ${a}x = ${fmt(c*c-b)} → x = ${fmt(x)}.`}},
 R=>{const [p,s,t]=R.p([[2,2,-1],[6,3,-2],[12,4,-3],[20,5,-4],[30,6,-5]]);
  return{type:"choice",q:`Al elevar al cuadrado ${M(`√(x + ${p}) = x`)} se obtiene ${M(`${P("x",2)} − x − ${p} = 0`)}, con soluciones ${s} y ${t}. ¿Cuál es la solución de la ecuación original?`,opts:[`Solo x = ${s}`,`Solo x = ${t}`,"Las dos","Ninguna"],
   hint:"Sustituye cada valor en √(x + "+p+") = x. Recuerda que una raíz cuadrada no da negativos.",explain:`Con x = ${s}: √${s+p} = ${s} ✓. Con x = ${t}: √${t+p} = ${Math.sqrt(t+p)}, que no es ${t}. Solo vale x = ${s}.`}},
 R=>{for(let i=0;i<300;i++){const q=R.i(-5,4),s=R.i(-4,9);const t=1-2*q-s,p=q*q-s*t;if(!(s+q>=0&&t+q<0&&s+p>=0)||t===s||Math.abs(p)>30)continue;
    return{type:"fill",kind:"set",answer:[s],extraneous:[t],show:fmt(s),q:`Resuelve ${M(`√(${p?xp(p):"x"}) = ${q?xp(q):"x"}`)}`,hint:"Eleva al cuadrado, resuelve la ecuación de segundo grado y comprueba los dos candidatos en la original.",
     explain:`${p?xp(p):"x"} = ${P(`(${q?xp(q):"x"})`,2)} → ${pfmt([1,2*q-1,q*q-p])} = 0 → x = ${fmt(s)} o x = ${fmt(t)}. Con x = ${fmt(t)} el lado derecho vale ${fmt(t+q)}, negativo: es una solución falsa. Solo vale x = ${fmt(s)}.`}}
  return RETO.Q10[0](R)},
 R=>{const a=R.i(1,9),r=R.i(2,5);
  return{type:"choice",q:`¿Qué se puede decir de ${M(`√(${xr(a)}) = −${r}`)}?`,opts:["No tiene solución: una raíz cuadrada nunca es negativa",`x = ${a+r*r}`,`x = ${a-r*r}`,`x = ${a+r}`],
   hint:`Calcula √ en el valor ${a+r*r}: ¿da −${r}?`,explain:`Elevando al cuadrado saldría x = ${a+r*r}, pero √${r*r} = ${r}, no −${r}. Como la raíz cuadrada nunca es negativa, la ecuación no tiene solución.`}}]
});

Object.assign(RECAP,{
Q6:{map:[1,2,0,2,3],pts:[
  {s:"Producto cero",t:"Si un producto vale cero, alguno de los factores es cero: se iguala cada factor a cero.",ex:"(x + 3)(x − 2) = 0 → −3 o 2"},
  {s:"x² = k tiene dos soluciones",t:"Si k > 0, x = √k o x = −√k.",ex:"x² = 49 → 7 o −7"},
  {s:"Factor común sin dividir",t:"En ax² + bx = 0 se saca x; dividir entre x pierde la solución 0.",ex:"x² − 5x = 0 → 0 o 5"},
  {s:"Primero, cero en un lado",t:"El producto cero solo funciona si un lado es 0: hay que pasar todo a un lado.",ex:"x(x − 1) = 6 → x² − x − 6 = 0"}]},
Q7:{map:[2,2,1,0,3],pts:[
  {s:"Completar el cuadrado",t:"Se suma el cuadrado de la mitad del coeficiente de x a los dos lados.",ex:"x² + 6x = 7 → (x + 3)² = 16"},
  {s:"La fórmula general",t:"x = (−b ± √(b² − 4ac)) / (2a).",ex:"2x² − x − 3 = 0 → 3/2 o −1"},
  {s:"El discriminante",t:"b² − 4ac positivo: dos soluciones; cero: una; negativo: ninguna real.",ex:"x² + 2x + 5: Δ = −16"},
  {s:"Cortes de la parábola",t:"Las soluciones son los cortes de y = ax² + bx + c con el eje x; con una sola, la parábola toca el eje.",ex:"x² − 6x + 9: toca en x = 3"}]},
Q8:{map:[0,1,2,3,3],pts:[
  {s:"Dos números a distancia r",t:"|x − c| = r con r > 0 tiene dos soluciones: c + r y c − r.",ex:"|x − 2| = 5 → 7 o −3"},
  {s:"Dos ecuaciones",t:"|A| = r se parte en A = r y A = −r.",ex:"|2x − 1| = 5 → 3 o −2"},
  {s:"Sin solución",t:"Un valor absoluto nunca es negativo; |A| = 0 da una sola solución.",ex:"|x + 4| = −3: ninguna"},
  {s:"Comprobar cuando hay x a los dos lados",t:"En |A| = |B| o |A| = expresión con x, se comprueba cada candidato.",ex:"|x − 3| = 2x → solo x = 1"}]},
Q9:{map:[0,1,2,3,1],pts:[
  {s:"Valores prohibidos",t:"Primero se anotan los valores que hacen cero algún denominador.",ex:"x/(x − 3): x ≠ 3"},
  {s:"Quitar denominadores",t:"Se multiplica todo por el común denominador.",ex:"1/x + 1/(2x) = 3/4 → 4 + 2 = 3x"},
  {s:"Proporciones",t:"a/b = c/d se convierte en a · d = b · c.",ex:"(x + 1)/3 = (x − 1)/2 → x = 5"},
  {s:"Descartar lo prohibido",t:"Si un resultado es un valor prohibido, no es solución.",ex:"x²/(x − 2) = 4/(x − 2) → solo −2"}]},
Q10:{map:[0,0,1,3,2],pts:[
  {s:"Aislar y elevar al cuadrado",t:"Se deja la raíz sola en un lado y se elevan los dos lados al cuadrado.",ex:"√(x + 3) = 4 → x + 3 = 16"},
  {s:"Comprobar los candidatos",t:"Elevar al cuadrado puede añadir soluciones falsas: se comprueba cada una en la original.",ex:"√(x + 2) = x → solo x = 2"},
  {s:"La raíz nunca es negativa",t:"√(algo) = número negativo no tiene solución.",ex:"√(x − 5) = −2: ninguna"},
  {s:"Puede llevar a segundo grado",t:"Si al otro lado hay x, al elevar aparece una ecuación de segundo grado.",ex:"√(x + 3) = x − 3 → x² − 7x + 6 = 0"}]}
});

Object.assign(EXPLORE,{
qProdCero(host){let r1=-3,r2=2,x=0;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="pz1">r₁ = <output class="m" id="pzo1">−3</output></label><input type="range" id="pz1" min="-6" max="6" value="-3"><label for="pz2">r₂ = <output class="m" id="pzo2">2</output></label><input type="range" id="pz2" min="-6" max="6" value="2"></div>
   <div class="ctrl"><label for="pzx">x = <output class="m" id="pzox">0</output></label><input type="range" id="pzx" min="-14" max="14" value="0"></div>
   <div class="svgwrap" id="pzs"></div><div class="readout" id="pzr"></div></div>`;
  const draw=()=>{const f=t=>(t-r1)*(t-r2),A=x-r1,B=x-r2,v=A*B,cs=[1,-(r1+r2),r1*r2];
    $("#pzs",host).innerHTML=plot({xmin:-7,xmax:7,ymin:-15,ymax:25,w:560,h:320,xstep:1,ystep:5,fns:[{f,color:"var(--l-ecu)"}],vl:[{x,color:"var(--muted)",dash:"4 3",width:1.5}],
      pts:[{x:r1,y:0,color:"var(--ok)",r:6},{x:r2,y:0,color:"var(--ok)",r:6},{x,y:v,color:v===0?"var(--ok)":"var(--ink)",label:fmt(v)}],aria:"Parábola con sus dos raíces"});
    $("#pzo1",host).textContent=fmt(r1);$("#pzo2",host).textContent=fmt(r2);$("#pzox",host).textContent=decs(x,1);
    $("#pzr",host).innerHTML=`<span class="k">Factorizado</span>(${xr(r1)})(${xr(r2)})<br><span class="k">Desarrollado</span>${pfmt(cs)}<br><span class="k">Con x = ${decs(x,1)}</span>(${decs(A,1)}) · (${decs(B,1)}) = ${decs(v,2)}${v===0?" → <b>un factor es cero, así que el producto es cero</b>":""}<br><span class="k">Soluciones de ${pfmt(cs)} = 0</span>x = ${fmt(r1)}${r1!==r2?` y x = ${fmt(r2)}`:" (raíz doble)"}`};
  $("#pz1",host).oninput=e=>{r1=+e.target.value;draw()};$("#pz2",host).oninput=e=>{r2=+e.target.value;draw()};$("#pzx",host).oninput=e=>{x=+e.target.value/2;draw()};draw()},

qParabola(host){let a=1,b=-2,c=-3;
  host.innerHTML=`<div class="xp"><div class="ctrl">${[["a",a,-3,3],["b",b,-8,8],["c",c,-8,8]].map(([n,v,mi,ma])=>`<label for="qp${n}">${n} = <output class="m" id="qpo${n}">${v}</output></label><input type="range" id="qp${n}" min="${mi}" max="${ma}" value="${v}" style="width:130px">`).join("")}</div>
   <div class="svgwrap" id="qps"></div><div class="readout" id="qpr"></div></div>`;
  const draw=()=>{if(!a)a=1;const D=b*b-4*a*c,rts=D>0?[(-b-Math.sqrt(D))/(2*a),(-b+Math.sqrt(D))/(2*a)].sort((p,q)=>p-q):D===0?[-b/(2*a)]:[],vx=-b/(2*a),vy=a*vx*vx+b*vx+c;
    $("#qps",host).innerHTML=plot({xmin:-8,xmax:8,ymin:-12,ymax:12,w:560,h:320,xstep:1,ystep:4,fns:[{f:x=>a*x*x+b*x+c,color:"var(--l-ecu)"}],pts:[...rts.map(r=>({x:r,y:0,color:"var(--ok)",label:decs(r,2),dy:-18})),{x:vx,y:vy,color:"var(--muted)",r:4}],aria:"Parábola y sus cortes"});
    ["a","b","c"].forEach(n=>$("#qpo"+n,host).textContent=fmt({a,b,c}[n]));
    $("#qpr",host).innerHTML=`<span class="k">Ecuación</span>${pfmt([a,b,c])} = 0<br><span class="k">Discriminante</span>Δ = ${fmtP(b)}² − 4 · ${fmtP(a)} · ${fmtP(c)} = ${fmt(D)}: ${D>0?"positivo, dos soluciones":D===0?"cero, una solución":"negativo, ninguna solución real"}<br><span class="k">Soluciones</span>${rts.length?rts.map(r=>"x = "+decs(r,3)).join(" y "):"no hay: la parábola no toca el eje x"}${D>0?`<br><span class="k">Con la fórmula</span>x = (${fmt(-b)} ± √${D}) / ${fmt(2*a)}`:""}`};
  ["a","b","c"].forEach(n=>$("#qp"+n,host).oninput=e=>{const v=+e.target.value;if(n==="a"){a=v||(a>0?-1:1);e.target.value=a}else if(n==="b")b=v;else c=v;draw()});draw()},

qAbsEq(host){let c=3,m=0,d=4;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ab1">c = <output class="m" id="abo1">3</output></label><input type="range" id="ab1" min="-5" max="5" value="3"><label for="ab2">pendiente m = <output class="m" id="abo2">0</output></label><input type="range" id="ab2" min="-2" max="2" value="0"><label for="ab3">d = <output class="m" id="abo3">4</output></label><input type="range" id="ab3" min="-6" max="6" value="4"></div>
   <div class="svgwrap" id="abs"></div><div class="readout" id="abr"></div></div>`;
  const draw=()=>{const cand=[];if(m!==1)cand.push((c+d)/(1-m));if(m!==-1)cand.push((c-d)/(1+m));const sols=[...new Set(cand.map(v=>Math.round(v*1e6)/1e6))].filter(x=>m*x+d>=-1e-9&&Math.abs(Math.abs(x-c)-(m*x+d))<1e-6);
    const bad=[...new Set(cand.map(v=>Math.round(v*1e6)/1e6))].filter(x=>!sols.includes(x));
    $("#abs",host).innerHTML=plot({xmin:-10,xmax:10,ymin:-6,ymax:12,w:560,h:320,xstep:2,ystep:2,fns:[{f:x=>Math.abs(x-c),color:"var(--l-ecu)"},{f:x=>m*x+d,color:"var(--l-rac)"}],pts:[...sols.map(x=>({x,y:m*x+d,color:"var(--ok)",label:"x = "+decs(x,2)})),...bad.map(x=>({x,y:m*x+d,color:"var(--bad)",open:true,label:"falsa"}))],aria:"Valor absoluto y recta"});
    $("#abo1",host).textContent=fmt(c);$("#abo2",host).textContent=fmt(m);$("#abo3",host).textContent=fmt(d);const rhs=`${m?(m===1?"":m===-1?"−":m)+"x":""}${m?(d?sgA(d):""):fmt(d)}`;
    $("#abr",host).innerHTML=`<span class="k">Ecuación</span>|${c?xr(c):"x"}| = ${rhs}<br><span class="k">Caso 1: ${c?xr(c):"x"} = ${rhs}</span>${m===1?(c+d===0?"se cumple para muchos x":"no tiene solución"):"x = "+decs((c+d)/(1-m),3)}<br><span class="k">Caso 2: ${c?xr(c):"x"} = −(${rhs})</span>${m===-1?(c-d===0?"se cumple para muchos x":"no tiene solución"):"x = "+decs((c-d)/(1+m),3)}<br><span class="k">Soluciones</span>${sols.length?sols.map(x=>decs(x,3)).join(" y "):"ninguna"}${bad.length?` · ${bad.map(x=>decs(x,3)).join(", ")} no sirve: el lado derecho sería negativo`:""}`};
  $("#ab1",host).oninput=e=>{c=+e.target.value;draw()};$("#ab2",host).oninput=e=>{m=+e.target.value;draw()};$("#ab3",host).oninput=e=>{d=+e.target.value;draw()};draw()},

qFraccion(host){const PR=[
   {eq:`${FQ(3,"x")} = ${FQ(6,"x + 2")}`,L:x=>3/x,Rf:x=>6/(x+2),proh:[0,-2],steps:"x ≠ 0, x ≠ −2. Multiplicando en cruz: 3(x + 2) = 6x → 3x + 6 = 6x → x = 2.",sol:[2],bad:[]},
   {eq:`${FQ("x","x − 3")} = ${FQ(3,"x − 3")}`,L:x=>x/(x-3),Rf:x=>3/(x-3),proh:[3],steps:"x ≠ 3. Multiplicando por x − 3: x = 3. ¡Prohibido! No hay solución: las dos gráficas no se cortan.",sol:[],bad:[3]},
   {eq:`${FQ(1,"x")} + ${FQ(1,"2x")} = ${FQ(3,4)}`,L:x=>1/x+1/(2*x),Rf:()=>0.75,proh:[0],steps:"x ≠ 0. Multiplicando por 4x: 4 + 2 = 3x → x = 2.",sol:[2],bad:[]},
   {eq:`${FQ("x + 1","x − 1")} = 2`,L:x=>(x+1)/(x-1),Rf:()=>2,proh:[1],steps:"x ≠ 1. Multiplicando por x − 1: x + 1 = 2x − 2 → x = 3.",sol:[3],bad:[]},
   {eq:`${FQ(P("x",2),"x − 2")} = ${FQ(4,"x − 2")}`,L:x=>x*x/(x-2),Rf:x=>4/(x-2),proh:[2],steps:"x ≠ 2. Multiplicando: x² = 4 → x = 2 o x = −2. El 2 está prohibido: solo vale x = −2.",sol:[-2],bad:[2]}];let k=0;
  host.innerHTML=`<div class="xp"><div class="ctrl"><span class="seg" role="group" aria-label="Ecuación">${PR.map((p,i)=>`<button class="btn sm" data-p="${i}">Ecuación ${i+1}</button>`).join("")}</span></div><div class="readout" id="fq0" style="font-size:1.15rem"></div>
   <div class="svgwrap" id="fqs"></div><div class="readout" id="fqr"></div></div>`;
  const draw=()=>{const p=PR[k];$("#fq0",host).innerHTML=`<span class="k">Ecuación</span>${p.eq}`;
    $("#fqs",host).innerHTML=plot({xmin:-6,xmax:6,ymin:-6,ymax:6,w:560,h:320,xstep:1,ystep:2,fns:[{f:x=>p.proh.some(q=>Math.abs(x-q)<0.03)?NaN:p.L(x),color:"var(--l-ecu)"},{f:x=>p.proh.some(q=>Math.abs(x-q)<0.03)?NaN:p.Rf(x),color:"var(--l-rac)"}],
      vl:p.proh.map(q=>({x:q,color:"var(--bad)",dash:"5 4",width:1.5})),pts:[...p.sol.map(x=>({x,y:p.L(x),color:"var(--ok)",label:"x = "+fmt(x)})),...p.bad.map(x=>({x,y:0,color:"var(--bad)",open:true,label:"prohibido"}))],aria:"Las dos partes de la ecuación como gráficas"});
    $$("[data-p]",host).forEach(b=>b.setAttribute("aria-current",+b.dataset.p===k?"page":"false"));
    $("#fqr",host).innerHTML=`<span class="k">Valores prohibidos</span>${p.proh.map(fmt).join(" y ")} (rectas rojas punteadas)<br><span class="k">Resolución</span>${p.steps}<br><span class="k">En la gráfica</span>${p.sol.length?"las curvas se cortan en x = "+p.sol.map(fmt).join(", "):"las curvas no se cortan"}${p.bad.length?"; el candidato "+p.bad.map(fmt).join(", ")+" cae justo en un valor prohibido":""}`};
  $$("[data-p]",host).forEach(b=>b.onclick=()=>{k=+b.dataset.p;draw()});draw()},

qRadical(host){let a=3,b=-3;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="rd1">a = <output class="m" id="rdo1">3</output></label><input type="range" id="rd1" min="-4" max="8" value="3"><label for="rd2">b = <output class="m" id="rdo2">−3</output></label><input type="range" id="rd2" min="-6" max="4" value="-3"></div>
   <div class="svgwrap" id="rds"></div><div class="readout" id="rdr"></div></div>`;
  const draw=()=>{// √(x + a) = x + b  →  x + a = (x + b)²  →  x² + (2b − 1)x + b² − a = 0
    const B=2*b-1,C=b*b-a,D=B*B-4*C,cand=D>=0?[...new Set([(-B-Math.sqrt(D))/2,(-B+Math.sqrt(D))/2].map(v=>Math.round(v*1e6)/1e6))]:[];
    const ok=cand.filter(x=>x+a>=0&&x+b>=-1e-9),bad=cand.filter(x=>!ok.includes(x));
    $("#rds",host).innerHTML=plot({xmin:-8,xmax:10,ymin:-6,ymax:8,w:560,h:320,xstep:2,ystep:2,fns:[{f:x=>x+a>=0?Math.sqrt(x+a):NaN,color:"var(--l-ecu)",from:-a},{f:x=>x+a>=0?-Math.sqrt(x+a):NaN,color:"var(--l-ecu)",dash:"5 5",width:2,from:-a},{f:x=>x+b,color:"var(--l-rac)"}],
      pts:[...ok.map(x=>({x,y:x+b,color:"var(--ok)",label:"x = "+decs(x,2)})),...bad.map(x=>({x,y:x+b,color:"var(--bad)",open:true,label:"falsa: x = "+decs(x,2)}))],aria:"Raíz cuadrada y recta"});
    $("#rdo1",host).textContent=fmt(a);$("#rdo2",host).textContent=fmt(b);
    $("#rdr",host).innerHTML=`<span class="k">Ecuación</span>√(${a?xp(a):"x"}) = ${b?xp(b):"x"}<br><span class="k">Al elevar al cuadrado</span>${a?xp(a):"x"} = ${P(`(${b?xp(b):"x"})`,2)}  →  ${pfmt([1,B,C])} = 0<br><span class="k">Candidatos</span>${cand.length?cand.map(x=>decs(x,3)).join(" y "):"ninguno (Δ < 0)"}<br><span class="k">Comprobación</span>${cand.length?cand.map(x=>`x = ${decs(x,3)}: √${decs(x+a,3)} = ${decs(Math.sqrt(Math.max(0,x+a)),3)} ${ok.includes(x)?"=":"≠"} ${decs(x+b,3)} ${ok.includes(x)?"✓":"✗"}`).join("<br>"):"—"}<br><span class="k">Curva punteada</span>es −√(x + a): lo que se añade al elevar al cuadrado; sus cortes con la recta son las soluciones falsas`};
  $("#rd1",host).oninput=e=>{a=+e.target.value;draw()};$("#rd2",host).oninput=e=>{b=+e.target.value;draw()};draw()}
});
