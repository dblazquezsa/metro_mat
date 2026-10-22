"use strict";
/* ============ Línea: Ecuaciones · Q11 La ecuación de la recta y Q12 La ecuación de la circunferencia ============ */

/* Pendientes como fracciones [p, q] con q > 0 */
const coefT=(p,q=1)=>{[p,q]=red(p,q);return q===1?(p===1?"":p===-1?"−":fmt(p)):`${p<0?"−":""}${Math.abs(p)}/${q}`};          // texto: −3/4
const coefP=(p,q=1)=>{[p,q]=red(p,q);return q===1?coefT(p,1):`(${coefT(p,q)})`};                                           // fichas: (−3/4)
const coefH=(p,q=1)=>{[p,q]=red(p,q);return q===1?coefT(p,1):`${p<0?"−":""}${F(Math.abs(p),q)}`};                          // HTML con barra
/* Lado derecho de y = mx + b. mode: "t" texto que el lector entiende, "p" fichas, "h" HTML */
function rhs(mp,mq,bp,bq=1,mode="t"){const C=mode==="h"?coefH:mode==="p"?coefP:coefT;[mp,mq]=red(mp,mq);[bp,bq]=red(bp,bq);let s="";
  if(mp!==0)s=C(mp,mq)+"x";
  if(bp!==0){const bt=bq===1?String(Math.abs(bp)):mode==="h"?F(Math.abs(bp),bq):`${Math.abs(bp)}/${bq}`;s+=s?(bp<0?" − ":" + ")+bt:(bp<0?"−":"")+bt}
  return s||"0"}
const FS=(a,b)=>`<span class="fr"><span>${a}</span><span>${b}</span></span>`;
const ansLine=(mp,mq,bp,bq=1)=>`(${mp})/(${mq})*x+(${bp})/(${bq})`;
const sqT=(v,h)=>typeof h==="string"?P(`(${v} − ${h})`,2):h===0?P(v,2):P(`(${v} ${h>0?"−":"+"} ${Math.abs(h)})`,2);
const sqP=(v,h)=>h===0?v+"²":`(${v} ${h>0?"−":"+"} ${Math.abs(h)})²`;

Object.assign(NODES,{
Q11:{title:"La ecuación de la recta",sub:"Proporcionalidad, pendiente y la forma y = mx + b.",
 info:`<p class="lead">Una recta del plano se describe con una ecuación que relaciona x con y. La forma más útil es ${M("y = mx + b")}: <b>m</b> es la pendiente y <b>b</b>, el punto donde la recta corta el eje y.</p>
 <div class="ex-box"><span class="eyebrow">Proporcionalidad</span><p>Si 1 kg de café cuesta 30 000 pesos, x kg cuestan ${M("y = 30 000x")}. Dos cantidades son <b>proporcionales</b> cuando el cociente y / x es siempre el mismo: es la <b>constante de proporcionalidad</b>.</p>
 ${figTable(["x (kg)","1","2","3","5"],[["y (pesos)","30 000","60 000","90 000","150 000"],["y / x","30 000","30 000","30 000","30 000"]])}
 <p>La gráfica de una proporcionalidad es una recta que pasa por el origen: si x = 0, y = 0.</p></div>
 <div class="ex-box"><span class="eyebrow">La pendiente</span><p>La <b>pendiente</b> mide cuánto cambia y cuando x aumenta: ${M(`m = ${FS("y₂ − y₁","x₂ − x₁")}`)}. Entre (1, 3) y (4, 9): ${M(`m = ${FS("9 − 3","4 − 1")} = ${F(6,3)} = 2`)}. Por cada paso a la derecha, la recta sube 2.</p>
 <p>Si m &gt; 0, la recta sube; si m &lt; 0, baja; si m = 0, es horizontal. Las rectas verticales, como x = 3, no tienen pendiente.</p></div>
 <div class="ex-box"><span class="eyebrow">La forma y = mx + b</span><p>Un taxi cobra 4500 pesos de banderazo y 1200 por kilómetro: ${M("y = 1200x + 4500")}. La pendiente es lo que se suma por cada kilómetro; b = 4500 es el valor cuando x = 0. Aquí no hay proporcionalidad: 2 km no cuestan el doble que 1 km.</p>
 <p>Para hallar la recta que pasa por (1, 3) y (4, 9): primero m = 2; después b, sustituyendo un punto: 3 = 2 · 1 + b, así que b = 1. La recta es ${M("y = 2x + 1")}.</p></div>
 <div class="ex-box"><span class="eyebrow">Paralelas y perpendiculares</span><p>Dos rectas son <b>paralelas</b> si tienen la misma pendiente: ${M("y = 2x + 1")} y ${M("y = 2x − 5")}.</p>
 <p>Son <b>perpendiculares</b> si el producto de sus pendientes es −1: ${M("y = 2x + 1")} y ${M(`y = −${F(1,2)}x + 3`)}, porque ${M(`2 · (−${F(1,2)}) = −1`)}. Para obtener la pendiente perpendicular se invierte la fracción y se cambia el signo: ${F(2,3)} → −${F(3,2)}.</p></div>
 <div class="callout"><span class="eyebrow">Las dos cosas a la vez</span><p>La pendiente perpendicular a m = 2 no es −2 ni ${F(1,2)}: es −${F(1,2)}. Hay que invertir <b>y</b> cambiar el signo.</p></div>`,
 explore:{intro:"Mueve los deslizadores de la pendiente y del corte con el eje y. Arrastra el punto P y activa la paralela y la perpendicular que pasan por él.",fn:"qRecta"},
 key:"y = mx + b: m es la pendiente (cambio de y por cada unidad de x) y b, el corte con el eje y. Si b = 0 hay proporcionalidad. Paralelas: misma pendiente. Perpendiculares: producto de pendientes −1.",
 ojo:"La perpendicular de m = a/b es −b/a: se invierte y se cambia el signo. Solo invertir, o solo cambiar el signo, no basta."},

Q12:{title:"La ecuación de la circunferencia",sub:"Pitágoras alrededor de un centro.",
 info:`<p class="lead">La circunferencia de centro C = (h, k) y radio r está formada por todos los puntos que están a distancia r del centro.</p>
 <div class="ex-box"><span class="eyebrow">De Pitágoras a la ecuación</span><p>Un punto (x, y) está en la circunferencia cuando su distancia al centro es r. Por Pitágoras:</p>
 <p class="calc">${sqT("x","h")} + ${sqT("y","k")} = ${P("r",2)}</p>
 <p>Con centro (2, −1) y radio 3: ${M(`${sqT("x",2)} + ${sqT("y",-1)} = 9`)}. El punto (2, 2) está en ella: ${P(0,2)} + ${P(3,2)} = 9.</p>
 <div class="exfig">${plot({xmin:-3,xmax:7,ymin:-5,ymax:3,w:360,equal:true,xstep:1,ystep:1,axes:true,circs:[{cx:2,cy:-1,r:3,color:"var(--l-ecu)",width:3}],segs:[{x1:2,y1:-1,x2:2,y2:2,color:"var(--muted)",dash:"5 4",width:2}],pts:[{x:2,y:-1,label:"C (2, −1)",r:4},{x:2,y:2,label:"(2, 2)",color:"var(--l-ecu)"}],labels:[{x:2.2,y:0.3,text:"r = 3"}],aria:"Circunferencia de centro (2, −1) y radio 3"})}</div></div>
 <div class="callout"><span class="eyebrow">Ojo con los signos y el radio</span><p>En ${M(`${sqT("x",-3)} + ${sqT("y",4)} = 25`)} el centro es (−3, 4), no (3, −4): x + 3 = x − (−3). Y el radio es 5, no 25: a la derecha está r².</p></div>
 <div class="ex-box"><span class="eyebrow">Reconocer la ecuación desarrollada</span><p>${M("x² + y² − 4x + 2y − 4 = 0")} también es una circunferencia. Se completan cuadrados:</p>
 <p class="calc">(x² − 4x + 4) + (y² + 2y + 1) = 4 + 4 + 1   →   ${sqT("x",2)} + ${sqT("y",-1)} = 9</p>
 <p>Para que sea una circunferencia: x² e y² con el mismo coeficiente, sin término xy, y, al completar cuadrados, un número positivo a la derecha. Con x² + y² + 2x + 5 = 0 queda ${sqT("x",-1)} + ${P("y",2)} = −4: ningún punto la cumple.</p></div>
 <div class="ex-box"><span class="eyebrow">La recta tangente</span><p>La tangente en un punto P toca la circunferencia solo en P y es <b>perpendicular al radio</b> CP. Con centro C = (1, 2) y P = (4, 6):</p>
 <ol><li>Pendiente del radio: ${M(`${FS("6 − 2","4 − 1")} = ${F(4,3)}`)}.</li><li>Pendiente de la tangente: se invierte y se cambia el signo, ${M(`−${F(3,4)}`)}.</li><li>Recta por P: ${M(`y − 6 = −${F(3,4)}(x − 4)`)}, es decir, ${M(`y = −${F(3,4)}x + 9`)}.</li></ol>
 <p>Si el radio es horizontal, la tangente es vertical (x = constante); si el radio es vertical, la tangente es horizontal.</p></div>`,
 explore:{intro:"Mueve el centro, el radio y el punto P. La tangente en P siempre forma un ángulo recto con el radio: mira el producto de las pendientes.",fn:"qCirc"},
 key:"(x − h)² + (y − k)² = r² es la circunferencia de centro (h, k) y radio r. La tangente en P es perpendicular al radio CP: su pendiente es −1 dividido por la pendiente del radio.",
 ojo:"Los signos del centro van al revés de como aparecen en la ecuación, y a la derecha está r², no r."}
});

Object.assign(RETO,{
Q11:[
 R=>{const c=R.p([
   {k:R.p([28000,32000,36000]),n:R.p([2,3,5]),t:(k,n)=>`El precio y (en pesos) del café es proporcional a la cantidad x de kilos. ${n} kg cuestan ${(k*n).toLocaleString("es-CO")} pesos.`},
   {k:R.p([15,18,20,24]),n:R.p([2,3,4]),t:(k,n)=>`Un ciclista va a velocidad constante: en ${n} horas recorre ${k*n} km. La distancia y (km) es proporcional al tiempo x (horas).`},
   {k:R.p([150,200,250]),n:R.p([12,20,30]),t:(k,n)=>`Las fotocopias tienen precio fijo por hoja: ${n} hojas cuestan ${(k*n).toLocaleString("es-CO")} pesos. El precio y es proporcional al número x de hojas.`}]);
  return{type:"fill",kind:"expr",answer:`${c.k}x`,show:`${c.k}x`,q:`${c.t(c.k,c.n)} Escribe la fórmula. Completa: ${M("y = …")}`,hint:"En una proporcionalidad y = kx: divide para hallar cuánto corresponde a 1.",
   explain:`La constante es ${(c.k*c.n).toLocaleString("es-CO")} / ${c.n} = ${c.k.toLocaleString("es-CO")}: y = ${c.k.toLocaleString("es-CO")}x.`}},
 R=>{const [p,q]=R.p([[2,1],[-3,1],[1,2],[-2,3],[3,2],[-1,4],[-5,2],[4,3],[-1,1]]),x1=R.i(-5,2),dx=q*R.i(1,2)*R.p([1,-1]),y1=R.i(-5,5),x2=x1+dx,y2=y1+p*dx/q;
  return{type:"fill",kind:"frac",answer:p/q,show:frs(p,q),q:`¿Cuál es la pendiente de la recta que pasa por ${M(PT(x1,y1))} y ${M(PT(x2,y2))}? Si no es entera, escríbela como fracción.`,hint:"m = (y₂ − y₁) / (x₂ − x₁): resta las y arriba y las x abajo, en el mismo orden.",
   explain:`m = (${fmt(y2)} − ${fmtP(y1)}) / (${fmt(x2)} − ${fmtP(x1)}) = ${fmt(y2-y1)} / ${fmt(x2-x1)} = ${frs(p,q)}.`}},
 R=>{const m=R.nz(-4,4),b=R.i(-6,6);let x1=R.i(-4,3),x2;do{x2=R.i(-4,4)}while(x2===x1);const y1=m*x1+b,y2=m*x2+b;
  return{type:"fill",kind:"expr",answer:ansLine(m,1,b),show:rhs(m,1,b),q:`Escribe la ecuación de la recta que pasa por ${M(PT(x1,y1))} y ${M(PT(x2,y2))}. Completa: ${M("y = …")}`,hint:"Calcula primero la pendiente; después sustituye uno de los puntos en y = mx + b para hallar b.",
   explain:`m = ${fmt(y2-y1)} / ${fmt(x2-x1)} = ${fmt(m)}. Con ${PT(x1,y1)}: ${fmt(y1)} = ${fmt(m)} · ${fmtP(x1)} + b, así que b = ${fmt(b)}. La recta es y = ${rhs(m,1,b)}.`}},
 R=>{const [p,q]=R.p([[1,1],[2,1],[-1,1],[-2,1],[1,2],[-1,2],[3,2],[-2,3],[2,3],[-3,2]]),b=R.i(-3,3);const on=([x,y])=>y*q===p*x+b*q;
  const s2=b+p<=6&&b+p>=-6?[q,b+p]:[-q,b-p];
  return{type:"grid",n:2,xmin:-6,xmax:6,ymin:-6,ymax:6,check:pts=>pts.length===2&&pts.every(on)&&!(pts[0][0]===pts[1][0]&&pts[0][1]===pts[1][1]),sol:[[0,b],s2],show:`(0, ${fmt(b)}) y ${PT(...s2)}, por ejemplo`,
   reveal:{fns:[{f:x=>p/q*x+b,color:"var(--ok)",width:2.5}]},q:`Dibuja la recta ${M("y = "+rhs(p,q,b,1,"h"))} marcando dos de sus puntos.`,
   hint:`Empieza por el corte con el eje y, (0, ${fmt(b)}). Desde ahí, ${q===1?"1 a la derecha":q+" a la derecha"} y ${p>0?"sube":"baja"} ${Math.abs(p)}.`,
   why:pts=>pts.filter(on).length===1?"Uno de tus puntos está en la recta, el otro no. Sustituye su x en la ecuación y mira qué y da.":"",
   explain:`Por ejemplo (0, ${fmt(b)}) y ${PT(...s2)}: al sustituir la x de cada punto en la ecuación, sale su y. Con dos puntos queda dibujada la recta.`}},
 R=>{const [p,q]=R.p([[2,1],[3,1],[1,2],[1,3],[2,3],[3,2],[-2,1],[-1,2],[-3,2],[-2,3],[3,4],[-4,3]]),b0=R.i(-4,4);const cs=R.sh([-5,-3,-2,1,2,3,5,6].filter(c=>c!==b0));
  const s=Math.abs(p)===1?2:1,k1=R.nz(-6,6),k2=R.nz(-6,6);
  const std=(a,cp,cq,k)=>`${a}y = ${coefT(cp,cq)}x ${k<0?"−":"+"} ${Math.abs(k)}`;
  const items=[
   {t:`y = ${rhs(p,q,cs[0],1,"p")}`,bin:0},{t:`${q===1?2:q}y = ${coefT((q===1?2:1)*p,1)}x ${k1<0?"−":"+"} ${Math.abs(k1)}`,bin:0},
   {t:`y = ${rhs(-q,p,cs[1],1,"p")}`,bin:1},{t:std(s*Math.abs(p),(p>0?-1:1)*s*q,1,k2),bin:1},
   {t:`y = ${rhs(q,p,cs[2],1,"p")}`,bin:2},{t:`y = ${rhs(-p,q,cs[3],1,"p")}`,bin:2}];
  return{type:"bins",q:`La recta r es ${M("y = "+rhs(p,q,b0,1,"h"))}. Clasifica las demás rectas según su relación con r.`,bins:["Paralela a r","Perpendicular a r","Ninguna de las dos"],items,hint:`La pendiente de r es ${frs(p,q)}. Si la ecuación empieza por un número delante de y, divide todo entre ese número.`,
   explain:`Paralelas: pendiente ${frs(p,q)}. Perpendiculares: pendiente ${frs(-q,p)}, porque ${frs(p,q)} · (${frs(-q,p)}) = −1. ${frs(q,p)} (solo invertir) y ${frs(-p,q)} (solo cambiar el signo) no sirven.`}}],
Q12:[
 R=>{const h=R.nz(-5,5),k=R.nz(-5,5),r=R.i(2,7),Rr=r*r;
  return{type:"choice",q:`¿Cuál es el centro y el radio de la circunferencia ${M(`${sqT("x",h)} + ${sqT("y",k)} = ${Rr}`)}?`,
   opts:[`Centro ${PT(h,k)} y radio ${r}`,`Centro ${PT(-h,-k)} y radio ${r}`,`Centro ${PT(h,k)} y radio ${Rr}`,`Centro ${PT(-h,-k)} y radio ${Rr}`],hint:"En (x − h)² el centro tiene x = h: el signo va al revés. Y a la derecha está r².",
   explain:`${sqP("x",h)} = (x − ${fmtP(h)})², así que h = ${fmt(h)}; igual k = ${fmt(k)}. El radio es √${Rr} = ${r}.`}},
 R=>{const nz=()=>R.nz(-4,4),T=[
   ()=>{const r=R.i(2,6);return`x² + y² = ${r*r}`},
   ()=>{const h=nz(),k=nz(),r=R.i(2,6);return`${sqP("x",h)} + ${sqP("y",k)} = ${r*r}`},
   ()=>{const h=nz(),k=nz(),r=R.i(Math.max(Math.abs(h),Math.abs(k))+1,7);return poly([[1,"x²"],[1,"y²"],[-2*h,"x"],[-2*k,"y"],[h*h+k*k-r*r,""]])+" = 0"},
   ()=>{const r=R.i(2,5);return`2x² + 2y² = ${2*r*r}`}],
  Fs=[()=>`x² + ${R.i(2,4)}y² = ${R.p([8,12,16])}`,()=>`x² − y² = ${R.p([4,9,16])}`,()=>{const h=nz(),k=nz();return`${sqP("x",h)} + ${sqP("y",k)} = −${R.p([4,9,16])}`},
   ()=>{const h=nz(),k=nz();return poly([[1,"x²"],[1,"y²"],[-2*h,"x"],[-2*k,"y"],[h*h+k*k+R.i(1,6),""]])+" = 0"},()=>`x + y² = ${R.i(2,9)}`,()=>`x² + xy + y² = ${R.p([4,9,16])}`];
  const ts=R.sh(T).slice(0,3).map(f=>({t:f(),bin:0})),fs=R.sh(Fs).slice(0,3).map(f=>({t:f(),bin:1}));
  return{type:"bins",q:"¿Cuáles de estas ecuaciones son circunferencias?",bins:["Es una circunferencia","No es una circunferencia"],items:[...ts,...fs],hint:"x² e y² deben tener el mismo coeficiente, sin término xy; y al completar cuadrados, a la derecha debe quedar un número positivo.",
   explain:"Fallan las que tienen distinto coeficiente en x² e y², un signo menos entre ellos, un término xy, una variable sin cuadrado, o un número negativo como r²."}},
 R=>{const h=R.i(-4,4),k=R.i(-4,4),a=R.nz(-5,5),b=R.nz(-5,5);
  return{type:"fill",kind:"num",answer:a*a+b*b,q:`Una circunferencia tiene centro ${M("C = "+PT(h,k))} y pasa por ${M("P = "+PT(h+a,k+b))}. En su ecuación ${M(`${sqT("x","h")} + ${sqT("y","k")} = ${P("r",2)}`)}, ¿cuánto vale ${M(P("r",2))}?`,
   hint:"r es la distancia de C a P: r² = Δx² + Δy².",explain:`Δx = ${fmt(a)} y Δy = ${fmt(b)}, así que r² = ${a*a} + ${b*b} = ${a*a+b*b}. La ecuación es ${sqP("x",h)} + ${sqP("y",k)} = ${a*a+b*b}.`}},
 R=>{const h=R.i(-2,2),k=R.i(-2,2),[a,b]=R.p([[3,4],[4,3],[-3,4],[4,-3],[1,2],[2,1],[-2,1],[1,-2],[2,2],[-1,3],[3,-1]]),x0=h+a,y0=k+b;
  const [mp,mq]=red(-a,b),[bp,bq]=red(y0*b+a*x0,b),r=Math.hypot(a,b),L=Math.ceil(r)+2;
  return{type:"fill",kind:"expr",answer:ansLine(mp,mq,bp,bq),show:rhs(mp,mq,bp,bq),q:`La circunferencia tiene centro ${M("C = "+PT(h,k))} y pasa por ${M("P = "+PT(x0,y0))}. Escribe la ecuación de la recta tangente en P. Completa: ${M("y = …")}`,
   fig:plot({xmin:h-L,xmax:h+L,ymin:k-L,ymax:k+L,w:330,equal:true,xstep:1,ystep:1,axes:true,circs:[{cx:h,cy:k,r,color:"var(--l-ecu)"}],segs:[{x1:h,y1:k,x2:x0,y2:y0,color:"var(--muted)",dash:"5 4",width:2}],pts:[{x:h,y:k,label:"C",r:4},{x:x0,y:y0,label:"P",color:"var(--l-ecu)"}],aria:"Circunferencia con su centro C y el punto P"}),
   hint:`La pendiente del radio CP es ${frs(b,a)}. La tangente es perpendicular: invierte y cambia el signo. Después usa P para hallar b.`,
   explain:`Radio: m = ${fmt(b)} / ${fmt(a)} = ${frs(b,a)}. Tangente: m = ${frs(mp,mq)}. Con P: ${fmt(y0)} = ${frs(mp,mq)} · ${fmtP(x0)} + b, así que b = ${frs(bp,bq)}. La tangente es y = ${rhs(mp,mq,bp,bq)}.`}},
 R=>{const h=R.i(-1,1),k=R.i(-1,1),d2=([x,y])=>(x-h)*(x-h)+(y-k)*(y-k);
  return{type:"grid",xmin:-6,xmax:6,ymin:-6,ymax:6,circs:[{cx:h,cy:k,r:5,color:"var(--l-ecu)",width:2.5}],given:[{x:h,y:k,label:"C",r:4}],check:p=>d2(p[0])===25&&p[0][0]!==h&&p[0][1]!==k,sol:[[h+3,k+4]],show:`${PT(h+3,k+4)}, por ejemplo`,
   q:`Esta es la circunferencia ${M(`${sqT("x",h)} + ${sqT("y",k)} = 25`)}. Marca un punto suyo con coordenadas enteras que <b>no</b> esté en la misma horizontal ni en la misma vertical que el centro.`,
   hint:"Busca catetos enteros con 3² + 4² = 25: muévete 3 en una dirección y 4 en la otra desde el centro.",
   why:p=>d2(p[0])===25?"Ese punto está en la circunferencia, pero en la horizontal o en la vertical del centro. Busca otro.":`Ese punto está a distancia √${d2(p[0])} del centro, no a 5.`,
   explain:`Desde C = ${PT(h,k)}, moverse 3 en horizontal y 4 en vertical (o 4 y 3) da distancia √(9 + 16) = 5. Hay 8 puntos así, como ${PT(h+3,k+4)} o ${PT(h-4,k+3)}.`}}]
});

Object.assign(RECAP,{
Q11:{map:[0,1,2,2,3],pts:[
  {s:"Proporcionalidad",t:"Dos cantidades son proporcionales si y / x es constante: y = kx, una recta por el origen.",ex:"3 kg por 90 000 → y = 30 000x"},
  {s:"La pendiente",t:"m = (y₂ − y₁) / (x₂ − x₁): cuánto cambia y por cada unidad de x.",ex:"(1, 3) y (4, 9): m = 2"},
  {s:"La forma y = mx + b",t:"Con m y un punto se halla b; b es el corte con el eje y.",ex:"y = 2x + 1 pasa por (0, 1)"},
  {s:"Paralelas y perpendiculares",t:"Paralelas: misma pendiente. Perpendiculares: producto −1 (invertir y cambiar el signo).",ex:"2/3 ⟂ −3/2"}]},
Q12:{map:[0,1,2,3,2],pts:[
  {s:"Centro y radio",t:"En (x − h)² + (y − k)² = r² el centro es (h, k): los signos van al revés. A la derecha está r².",ex:"(x + 3)² + (y − 4)² = 25: centro (−3, 4), radio 5"},
  {s:"Reconocer la ecuación",t:"Mismo coeficiente en x² e y², sin término xy y, al completar cuadrados, r² positivo.",ex:"x² + 2y² = 8 no es una circunferencia"},
  {s:"Distancia y radio",t:"El radio es la distancia del centro a cualquier punto de la circunferencia (Pitágoras).",ex:"C = (0, 0), P = (3, 4): r² = 25"},
  {s:"Recta tangente",t:"La tangente en P es perpendicular al radio CP.",ex:"radio 4/3 → tangente −3/4"}]}
});

Object.assign(EXPLORE,{
qRecta(host){const SL=[[-3,1],[-2,1],[-3,2],[-1,1],[-2,3],[-1,2],[-1,3],[0,1],[1,3],[1,2],[2,3],[1,1],[3,2],[2,1],[3,1]],B={xmin:-7,xmax:7,ymin:-7,ymax:7},W=480;let mi=13,b=1,Pt=[3,-2],par=false,per=false;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="qm">Pendiente m = <output class="m" id="qmo"></output></label><input type="range" id="qm" min="0" max="${SL.length-1}" value="${mi}"><label for="qb">Corte b = <output class="m" id="qbo"></output></label><input type="range" id="qb" min="-5" max="5" value="1">
   <span class="seg" role="group" aria-label="Rectas por P"><button class="btn sm" id="qpar" aria-pressed="false">Paralela por P</button><button class="btn sm" id="qper" aria-pressed="false">Perpendicular por P</button></span></div>
   <div class="svgwrap gridpick" id="qsvg" aria-label="Plano con la recta y el punto P, que se puede arrastrar"></div><div class="readout" id="qrr"></div></div>`;
  const wrap=$("#qsvg",host);
  const draw=()=>{const [p,q]=SL[mi],m=p/q,[px,py]=Pt;const fns=[{f:x=>m*x+b,color:"var(--l-ecu)",width:3.5}],vl=[],segs=[];
    if(p!==0)segs.push({x1:0,y1:b,x2:q,y2:b,color:"var(--l-ent)",width:2.5},{x1:q,y1:b,x2:q,y2:b+p,color:"var(--l-ent)",width:2.5});
    const bpar=py-m*px;if(par)fns.push({f:x=>m*x+bpar,color:"var(--l-rec)",dash:"7 5"});
    let perTxt="";if(per){if(p===0){vl.push({x:px,color:"var(--l-alg)",dash:"7 5",width:3});perTxt=`x = ${fmt(px)} (vertical: la perpendicular a una horizontal no tiene pendiente)`}
      else{const [rp,rq]=red(-q,p),[cp,cq]=red(py*p+q*px,p);fns.push({f:x=>rp/rq*x+cp/cq,color:"var(--l-alg)",dash:"7 5"});perTxt=`y = ${rhs(rp,rq,cp,cq,"h")}  ·  ${frs(p,q)} · (${frs(rp,rq)}) = −1`}}
    wrap.innerHTML=plot({...B,w:W,equal:true,xstep:1,ystep:1,axes:true,fns,vl,segs,labels:p!==0?[{x:q/2-.2,y:b+(p>0?-.7:.45),text:String(q),color:"var(--l-ent)"},{x:q+.25,y:b+p/2,text:fmt(p),color:"var(--l-ent)"}]:[],
      pts:[{x:0,y:b,color:"var(--l-ecu)",label:`(0, ${fmt(b)})`,dx:-52},{x:px,y:py,color:"var(--ink)",label:"P "+PT(px,py),r:7}],aria:"Recta y = mx + b y rectas por P"});
    $("#qmo",host).innerHTML=frs(p,q);$("#qbo",host).textContent=fmt(b);
    $("#qrr",host).innerHTML=`<span class="k">Recta</span>y = ${rhs(p,q,b,1,"h")}<br><span class="k">Pendiente</span>${p===0?"0: la recta es horizontal":`${frs(p,q)}: por cada ${q} a la derecha, ${p>0?"sube":"baja"} ${Math.abs(p)}`}<br><span class="k">Corte con el eje y</span>(0, ${fmt(b)})${b===0&&p!==0?" · pasa por el origen: x e y son proporcionales, y / x = "+frs(p,q)+" siempre":""}`+
      (par?`<br><span class="k">Paralela por P</span>y = ${rhs(p,q,Math.round(bpar*q),q,"h")} (misma pendiente)`:"")+(per?`<br><span class="k">Perpendicular por P</span>${perTxt}`:"")};
  gridPointer(wrap,B,W,q=>{Pt=q;draw()});
  $("#qm",host).oninput=e=>{mi=+e.target.value;draw()};$("#qb",host).oninput=e=>{b=+e.target.value;draw()};
  $("#qpar",host).onclick=e=>{par=!par;e.target.setAttribute("aria-pressed",par);draw()};$("#qper",host).onclick=e=>{per=!per;e.target.setAttribute("aria-pressed",per);draw()};
  draw()},

qCirc(host){let h=1,k=0,r=4,t=2;const B={xmin:-9,xmax:9,ymin:-9,ymax:9},W=480;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ch">h = <output class="m" id="cho"></output></label><input type="range" id="ch" min="-3" max="3" value="${h}"><label for="ck">k = <output class="m" id="cko"></output></label><input type="range" id="ck" min="-3" max="3" value="${k}">
   <label for="cr">Radio r = <output class="m" id="cro"></output></label><input type="range" id="cr" min="1" max="6" value="${r}"><label for="ct">Punto P</label><input type="range" id="ct" min="0" max="23" value="${t}"></div>
   <div class="svgwrap" id="csvg"></div><div class="readout" id="crr"></div></div>`;
  const draw=()=>{const th=t*Math.PI/12,ux=Math.cos(th),uy=Math.sin(th),x0=h+r*ux,y0=k+r*uy,vx=-uy,vy=ux,s=.55,Lt=7;
    const sq=[[x0-ux*s,y0-uy*s],[x0-ux*s+vx*s,y0-uy*s+vy*s],[x0+vx*s,y0+vy*s]];
    $("#csvg",host).innerHTML=plot({...B,w:W,equal:true,xstep:1,ystep:1,axes:true,circs:[{cx:h,cy:k,r,color:"var(--l-ecu)",width:3}],
      segs:[{x1:h,y1:k,x2:x0,y2:y0,color:"var(--ink)",width:2.5},{x1:x0-vx*Lt,y1:y0-vy*Lt,x2:x0+vx*Lt,y2:y0+vy*Lt,color:"var(--l-alg)",width:3}],raw:(X,Y)=>`<polyline points="${sq.map(([a,b])=>X(a).toFixed(1)+","+Y(b).toFixed(1)).join(" ")}" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`,
      pts:[{x:h,y:k,label:"C",r:4},{x:x0,y:y0,label:"P",color:"var(--l-alg)"}],aria:"Circunferencia, radio y recta tangente"});
    ["h","k","r"].forEach(n=>$(`#c${n}o`,host).textContent=fmt({h,k,r}[n]));
    const mr=Math.abs(ux)<1e-9?null:uy/ux,mt=Math.abs(uy)<1e-9?null:-ux/uy;
    $("#crr",host).innerHTML=`<span class="k">Ecuación</span>${sqT("x",h)} + ${sqT("y",k)} = ${r*r}<br><span class="k">Punto P</span>≈ (${decs(x0,2)}, ${decs(y0,2)}); comprobación: ${sqP("x",h).replace("x",decs(x0,2))} + ${sqP("y",k).replace("y",decs(y0,2))} ≈ ${decs((x0-h)**2+(y0-k)**2,2)}<br>`+
      (mr===null?`<span class="k">Radio</span>vertical<br><span class="k">Tangente</span>horizontal: y ≈ ${decs(y0,2)}`:mt===null?`<span class="k">Radio</span>horizontal<br><span class="k">Tangente</span>vertical: x ≈ ${decs(x0,2)}`
      :`<span class="k">Pendiente del radio</span>≈ ${decs(mr,2)}<br><span class="k">Pendiente de la tangente</span>≈ ${decs(mt,2)}<br><span class="k">Producto</span>${decs(mr,2)} · (${decs(mt,2)}) = −1: son perpendiculares`)};
  ["h","k","r","t"].forEach(n=>$(`#c${n}`,host).oninput=e=>{const v=+e.target.value;if(n==="h")h=v;else if(n==="k")k=v;else if(n==="r")r=v;else t=v;draw()});
  draw()}
});
