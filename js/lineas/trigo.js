"use strict";
/* ============ Línea 7: Trigonometría · T1–T6 ============ */

/* Valores exactos de los ángulos notables: [cos, sen] */
const TV={0:["1","0"],30:["√3/2","1/2"],45:["√2/2","√2/2"],60:["1/2","√3/2"],90:["0","1"]};
const negS=s=>s==="0"?"0":s.startsWith("−")?s.slice(1):"−"+s;
function trigEx(d){d=((d%360)+360)%360;const q=Math.floor(d/90),r=d%90;let ref=q%2===0?r:90-r,[c,s]=TV[ref]||[null,null];if(c===null)return null;
  if(r===0){const k=d/90;return[["1","0","−1","0"][k],["0","1","0","−1"][k]]}
  if(q===1)[c,s]=[negS(TV[90-r][0]),TV[90-r][1]];else if(q===2)[c,s]=[negS(TV[r][0]),negS(TV[r][1])];else if(q===3)[c,s]=[TV[90-r][0],negS(TV[90-r][1])];else[c,s]=TV[r];return[c,s]}
const rad=d=>d*Math.PI/180,deg=x=>x*180/Math.PI;
const radT=(p,q)=>{[p,q]=red(p,q);if(p===0)return"0";const n=(p<0?"−":"")+(Math.abs(p)===1?"π":Math.abs(p)+"π");return q===1?n:n+"/"+q};
const degRad=d=>radT(d,180);
const PI_TICKS=(a,b)=>{const t=[];for(let k=Math.ceil(a/(Math.PI/2));k*Math.PI/2<=b+1e-9;k++)t.push([k*Math.PI/2,k===0?"0":radT(k,2)]);return t};
/* Triángulo rectángulo con el ángulo α en el vértice de la derecha */
function figTriA(a,b,la,lb,lc,ang="α"){const s=Math.min(30,200/Math.max(a,b)),W=a*s,H=b*s,x0=100,y0=H+30,ax=x0+W;const r=26,th=Math.atan2(H,W);
  return`<svg viewBox="0 0 ${W+180} ${H+70}" role="img" aria-label="Triángulo rectángulo con el ángulo ${ang}" style="max-width:${Math.round((W+180)*1.3)}px">
   <polygon points="${x0},${y0} ${ax},${y0} ${x0},${y0-H}" fill="color-mix(in srgb,var(--l-tri) 14%,var(--surface))" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
   <path d="M${x0} ${y0-14} h14 v14" fill="none" stroke="var(--ink)" stroke-width="1.6"/><path d="M${ax-r} ${y0} A${r} ${r} 0 0 1 ${ax-r*Math.cos(th)} ${y0-r*Math.sin(th)}" fill="none" stroke="var(--l-tri)" stroke-width="2.5"/>
   ${T_(ax-r-14,y0-8,ang,"italic 700 15px var(--f-body)")}${T_(x0+W/2,y0+22,la,"700 15px var(--f-mono)")}${T_(x0-48,y0-H/2+5,lb,"700 15px var(--f-mono)")}${T_(x0+W/2+16,y0-H/2-8,lc,"700 15px var(--f-mono)")}</svg>`}
/* Circunferencia unitaria con el punto del ángulo d (grados) */
function unitFig(d,o={}){const t=rad(d),c=Math.cos(t),s=Math.sin(t);
  return plot({xmin:-1.5,xmax:1.5,ymin:-1.5,ymax:1.5,w:o.w||340,equal:true,xstep:.5,ystep:.5,axes:true,circs:[{cx:0,cy:0,r:1,color:"var(--muted)",width:2}],
    segs:[{x1:0,y1:0,x2:c,y2:s,color:o.color||"var(--l-tri)",width:3},...(o.proj?[{x1:c,y1:0,x2:c,y2:s,color:"var(--l-ecu)",dash:"4 3",width:2},{x1:0,y1:0,x2:c,y2:0,color:"var(--l-ent)",width:4}]:[]),...(o.extra||[])],
    raw:(X,Y)=>{const r=.25,N=Math.max(2,Math.round(Math.abs(d)/6));let p=`M${X(r)} ${Y(0)}`;for(let i=1;i<=N;i++){const a=t*i/N;p+=` L${X(r*Math.cos(a)).toFixed(1)} ${Y(r*Math.sin(a)).toFixed(1)}`}return d?`<path d="${p}" fill="none" stroke="var(--l-tri)" stroke-width="2"/>`:""},
    pts:[{x:c,y:s,color:o.color||"var(--l-tri)",label:o.label||"P",r:6}],fns:o.fns||[],aria:o.aria||"Circunferencia trigonométrica"})}

Object.assign(NODES,{
T1:{title:"Triángulos rectángulos",sub:"Seno, coseno y tangente de un ángulo agudo.",
 info:`<p class="lead">En un triángulo rectángulo, respecto de un ángulo agudo α, cada cateto tiene un nombre: el <b>opuesto</b> está enfrente de α y el <b>adyacente</b> forma α junto con la hipotenusa.</p>
 <div class="ex-box"><span class="eyebrow">Las razones trigonométricas</span><div class="exfig">${figTriA(4,3,"adyacente","opuesto","hipotenusa")}</div>
 <p class="calc">sen α = ${FS("opuesto","hipotenusa")}     cos α = ${FS("adyacente","hipotenusa")}     tan α = ${FS("opuesto","adyacente")}</p>
 <p>En el triángulo 3, 4, 5 con α frente al lado 3: sen α = 3/5, cos α = 4/5, tan α = 3/4. Estas razones no dependen del tamaño del triángulo, solo del ángulo: todos los triángulos rectángulos con el mismo α son semejantes.</p></div>
 <div class="ex-box"><span class="eyebrow">Ángulos notables</span>
 ${figTable(["α","30°","45°","60°"],[["sen α","1/2","√2/2","√3/2"],["cos α","√3/2","√2/2","1/2"],["tan α","√3/3","1","√3"]])}
 <p>Salen del triángulo equilátero partido por la mitad (30° y 60°) y del cuadrado partido por la diagonal (45°).</p></div>
 <div class="ex-box"><span class="eyebrow">Resolver un triángulo</span><p>Una escalera de 5 m forma un ángulo de 60° con el suelo. ¿A qué altura llega? La altura es el cateto opuesto: ${M("h = 5 · sen 60° ≈ 4,33 m")}.</p>
 <p>Para hallar un ángulo se usa la función inversa de la calculadora: si tan α = 0,75, entonces ${M("α = tan⁻¹(0,75) ≈ 36,9°")}. Los dos ángulos agudos suman 90°.</p></div>
 <div class="callout"><span class="eyebrow">La calculadora</span><p>Revisa que esté en grados (DEG) cuando trabajes con grados. En radianes (RAD), sen 30 da otro resultado.</p></div>`,
 explore:{intro:"Mueve el ángulo y el tamaño del triángulo. Los lados cambian, pero las razones seno, coseno y tangente solo dependen del ángulo.",fn:"tTriangulo"},
 key:"sen = opuesto / hipotenusa, cos = adyacente / hipotenusa, tan = opuesto / adyacente. Dependen solo del ángulo. Ángulos notables: 30°, 45°, 60°.",
 ojo:"Opuesto y adyacente dependen de qué ángulo se mire: el cateto opuesto a α es el adyacente del otro ángulo agudo."},

T2:{title:"Ángulos y radianes",sub:"Medir ángulos con el radio.",
 info:`<p class="lead">Una vuelta completa mide 360°. Hay otra unidad, más natural para las matemáticas: el <b>radián</b>.</p>
 <div class="ex-box"><span class="eyebrow">Qué es un radián</span><p>Un radián es el ángulo central que abarca un arco de la misma longitud que el radio. Como la circunferencia mide 2πr, en una vuelta caben 2π radianes ≈ 6,28.</p>
 <p class="calc">360° = 2π rad        180° = π rad        1 rad ≈ 57,3°</p></div>
 <div class="ex-box"><span class="eyebrow">Convertir</span><p>De grados a radianes se multiplica por π/180; de radianes a grados, por 180/π:</p>
 <p class="calc">60° = 60 · π/180 = π/3 rad        3π/4 rad = (3π/4) · (180/π) = 135°</p>
 ${figTable(["Grados","30°","45°","60°","90°","180°","270°","360°"],[["Radianes","π/6","π/4","π/3","π/2","π","3π/2","2π"]])}</div>
 <div class="ex-box"><span class="eyebrow">Longitud de arco</span><p>Con el ángulo θ en radianes, el arco mide ${M("s = r · θ")}. En una circunferencia de radio 5, un ángulo de 2 rad abarca un arco de 10.</p></div>
 <div class="ex-box"><span class="eyebrow">Más de una vuelta y ángulos negativos</span><p>Los ángulos se miden desde el eje x positivo, en sentido contrario a las agujas del reloj; si son negativos, en el sentido de las agujas. 405° y 45° terminan en el mismo lugar (405 = 360 + 45): son <b>coterminales</b>, igual que −90° y 270°.</p></div>`,
 explore:{intro:"Mueve el ángulo y mira cuántos radios caben en el arco. El ángulo aparece en grados y en radianes.",fn:"tRadian"},
 key:"π rad = 180°. Grados a radianes: × π/180. Arco: s = r · θ con θ en radianes. Ángulos que se diferencian en 360° son coterminales.",
 ojo:"La fórmula s = r · θ solo vale con θ en radianes."},

T3:{title:"La circunferencia trigonométrica",sub:"Seno y coseno para cualquier ángulo.",
 info:`<p class="lead">La <b>circunferencia trigonométrica</b> tiene centro en el origen y radio 1. Un ángulo θ se mide desde el eje x positivo, y su lado final corta la circunferencia en un punto P.</p>
 <div class="ex-box"><span class="eyebrow">La definición</span><p class="calc">P = (cos θ, sen θ)</p>
 <p>El coseno es la coordenada x de P y el seno, la coordenada y. Para ángulos agudos coincide con lo de los triángulos, porque la hipotenusa mide 1. Pero ahora sirve para cualquier ángulo: cos 180° = −1 y sen 270° = −1.</p>
 <div class="exfig">${unitFig(150,{proj:true,label:"P (−√3/2, 1/2)",aria:"El ángulo de 150° en la circunferencia trigonométrica"})}</div></div>
 <div class="ex-box"><span class="eyebrow">La identidad fundamental</span><p>Como P está en la circunferencia x² + y² = 1 (lo que trabajaste con Pitágoras), para todo ángulo ${M("sen² θ + cos² θ = 1")}.</p></div>
 <div class="ex-box"><span class="eyebrow">Signos por cuadrante</span>${figTable(["Cuadrante","I","II","III","IV"],[["cos θ","+","−","−","+"],["sen θ","+","+","−","−"]])}
 <p>Los valores se repiten con otros signos. El <b>ángulo de referencia</b> es el ángulo agudo que forma el lado final con el eje x: el de 150° es 30°, así que P = (−√3/2, 1/2).</p></div>`,
 explore:{intro:"Mueve el ángulo. La barra azul es el coseno (coordenada x) y la roja, el seno (coordenada y). Mira cómo cambian los signos en cada cuadrante.",fn:"tUnit"},
 key:"P = (cos θ, sen θ) en la circunferencia de radio 1. sen² θ + cos² θ = 1. Signos según el cuadrante; el ángulo de referencia da el valor absoluto.",
 ojo:"El coseno es la x y el seno es la y, no al revés."},

T4:{title:"Seno y coseno",sub:"Funciones que se repiten.",
 info:`<p class="lead">Si se «desenrolla» la circunferencia trigonométrica, el seno y el coseno se convierten en funciones de x (en radianes) cuya gráfica es una onda.</p>
 <div class="ex-box"><span class="eyebrow">y = sen x y y = cos x</span><div class="exfig">${plot({xmin:-.3,xmax:2*Math.PI+.3,ymin:-1.5,ymax:1.5,w:520,h:240,ystep:.5,xticks:PI_TICKS(0,2*Math.PI),axes:true,fns:[{f:Math.sin,color:"var(--l-tri)"},{f:Math.cos,color:"var(--l-ent)",dash:"7 4"}],labels:[{x:1.4,y:1.2,text:"sen x",color:"var(--l-tri)"},{x:5.6,y:1.2,text:"cos x",color:"var(--l-ent)"}],aria:"Gráficas de seno y coseno"})}</div>
 <p>Las dos tienen <b>período</b> 2π (se repiten cada vuelta), toman valores entre −1 y 1 y tienen la misma forma: el coseno es el seno adelantado π/2. sen x vale 0 en 0, π, 2π…; cos x vale 0 en π/2, 3π/2…</p></div>
 <div class="ex-box"><span class="eyebrow">Amplitud y período</span><p>En ${M("y = a · sen(bx)")}, |a| es la <b>amplitud</b> (la onda va de −|a| a |a|) y el período es ${M("2π / b")}: con b = 2, la onda se repite el doble de rápido, cada π.</p>
 <p>Si se suma una constante, y = a · sen x + k, la onda sube k: su máximo es |a| + k y su mínimo, k − |a|.</p></div>
 <div class="callout"><span class="eyebrow">Ecuaciones con seno y coseno</span><p>sen x = 1/2 tiene dos soluciones en cada vuelta: 30° y 150° (π/6 y 5π/6). La circunferencia ayuda a encontrar las dos.</p></div>`,
 explore:{intro:"Mueve el punto por la circunferencia y mira cómo dibuja la onda. Cambia la amplitud y el número de ondas por vuelta.",fn:"tOnda"},
 key:"sen y cos: período 2π, valores entre −1 y 1. En a · sen(bx): amplitud |a|, período 2π / b.",
 ojo:"Con b = 2 el período es π, no 4π: la onda se repite más rápido."},

T5:{title:"Tangente y cotangente",sub:"Pendientes en la circunferencia.",
 info:`<p class="lead">La <b>tangente</b> de un ángulo es el cociente ${M("tan θ = sen θ / cos θ")}. En la circunferencia trigonométrica es la <b>pendiente del radio</b> OP, como las pendientes que trabajaste en la ecuación de la recta.</p>
 <div class="ex-box"><span class="eyebrow">Dónde se ve</span><p>Si se prolonga el radio OP hasta la recta vertical x = 1, la altura del punto de corte es tan θ. Por eso se llama tangente: esa recta es tangente a la circunferencia.</p>
 <div class="exfig">${unitFig(35,{fns:[],extra:[{x1:1,y1:-1.5,x2:1,y2:1.5,color:"var(--muted)",dash:"4 3",width:1.5},{x1:0,y1:0,x2:1,y2:Math.tan(rad(35)),color:"var(--l-tri)",dash:"6 4",width:2},{x1:1,y1:0,x2:1,y2:Math.tan(rad(35)),color:"var(--l-rac)",width:4}],aria:"La tangente como segmento sobre la recta x = 1"})}</div></div>
 <div class="ex-box"><span class="eyebrow">Cuándo no existe</span><p>tan θ no está definida cuando cos θ = 0: en 90° y 270° (π/2 y 3π/2) el radio es vertical y no corta la recta x = 1. En la gráfica de y = tan x hay asíntotas verticales allí. Su período es π (180°): tan(θ + 180°) = tan θ.</p></div>
 <div class="ex-box"><span class="eyebrow">Cotangente</span><p>${M("cot θ = cos θ / sen θ = 1 / tan θ")}. No está definida cuando sen θ = 0: en 0°, 180° y 360°. Si tan θ = 3/4, cot θ = 4/3. (También existen la secante, 1/cos θ, y la cosecante, 1/sen θ.)</p></div>
 <div class="callout"><span class="eyebrow">Signos</span><p>tan θ es positiva cuando seno y coseno tienen el mismo signo (cuadrantes I y III) y negativa en II y IV.</p></div>`,
 explore:{intro:"Mueve el ángulo. El segmento naranja sobre la recta x = 1 mide tan θ, y el punto recorre la gráfica de y = tan x. Acércate a 90° y mira qué pasa.",fn:"tTangente"},
 key:"tan θ = sen θ / cos θ es la pendiente del radio; no existe si cos θ = 0. cot θ = 1 / tan θ; no existe si sen θ = 0. Período π.",
 ojo:"cot θ es 1 / tan θ, no −tan θ ni tan(−θ)."},

T6:{title:"Identidades trigonométricas",sub:"Igualdades que valen para todos los ángulos.",
 info:`<p class="lead">Una <b>identidad</b> es una igualdad que se cumple para todos los ángulos en los que sus dos lados están definidos. Una ecuación, en cambio, solo se cumple para algunos.</p>
 <div class="ex-box"><span class="eyebrow">Las fundamentales</span>
 ${figTable(["Identidad","De dónde sale"],[["sen² x + cos² x = 1","Pitágoras en la circunferencia de radio 1"],["tan x = sen x / cos x,  cot x = cos x / sen x","definiciones"],["1 + tan² x = 1 / cos² x","dividir la primera entre cos² x"],["sen(−x) = −sen x,  cos(−x) = cos x","simetría respecto del eje x"],["sen(90° − x) = cos x","los ángulos agudos de un triángulo rectángulo"]])}</div>
 <div class="ex-box"><span class="eyebrow">Suma y ángulo doble</span><p class="calc">sen(a + b) = sen a cos b + cos a sen b        cos(a + b) = cos a cos b − sen a sen b</p>
 <p class="calc">sen 2x = 2 sen x cos x        cos 2x = cos² x − sen² x</p>
 <p>Con ellas se calculan valores exactos: sen 75° = sen(45° + 30°) = (√6 + √2) / 4.</p></div>
 <div class="ex-box"><span class="eyebrow">Demostrar una identidad</span><p>Se transforma un lado, paso a paso, hasta llegar al otro. Por ejemplo:</p>
 <p class="calc">(1 − cos² x) / sen x = sen² x / sen x = sen x</p></div>
 <div class="callout"><span class="eyebrow">Un contraejemplo basta</span><p>sen(a + b) no es sen a + sen b: con a = b = 90°, sen 180° = 0, pero sen 90° + sen 90° = 2. Para ver que algo no es identidad basta un caso donde falle; para ver que sí lo es, no basta probar unos cuantos casos.</p></div>`,
 explore:{intro:"Elige una igualdad y compara las gráficas de sus dos lados. Si son identidad, las curvas coinciden en todas partes; si no, se separan.",fn:"tIdent"},
 key:"sen² + cos² = 1; tan = sen / cos; sen 2x = 2 sen x cos x; cos 2x = cos² x − sen² x. Una identidad vale para todos los ángulos; un contraejemplo la descarta.",
 ojo:"sen 2x no es 2 sen x, y sen(a + b) no es sen a + sen b."}
});

Object.assign(RETO,{
T1:[
 R=>{const [a,b,c]=R.p([[4,3,5],[3,4,5],[12,5,13],[5,12,13],[8,6,10],[6,8,10],[15,8,17],[8,15,17]]),k=R.i(0,2),nm=["sen","cos","tan"][k];const op=`${b}/${c}`,ad=`${a}/${c}`,tg=`${b}/${a}`;
  const right=[op,ad,tg][k],opts=[right,...[op,ad,tg,`${a}/${b}`,`${c}/${b}`].filter(x=>x!==right)].slice(0,4);
  return{type:"choice",q:`En este triángulo, ¿cuánto vale ${M(nm+" α")}?`,fig:figTriA(a,b,String(a),String(b),String(c)),opts,hint:"Ubica el lado opuesto a α (enfrente), el adyacente (al lado, que no es la hipotenusa) y la hipotenusa.",
   explain:`El opuesto a α mide ${b}, el adyacente ${a} y la hipotenusa ${c}. ${nm} α = ${["opuesto / hipotenusa","adyacente / hipotenusa","opuesto / adyacente"][k]} = ${right}.`}},
 R=>{const h=R.p([4,6,8,10,12]),t=R.i(0,1);
  return t?{type:"fill",kind:"num",answer:h/2,q:`Una escalera de ${h} m se apoya en una pared y forma un ángulo de 60° con el suelo. ¿A qué distancia de la pared está el pie de la escalera?`,hint:"La distancia al pie es el cateto adyacente al ángulo de 60°. Usa cos 60° = 1/2.",explain:`d = ${h} · cos 60° = ${h} · 1/2 = ${h/2} m.`}
   :{type:"fill",kind:"num",answer:h/2,q:`Un cable de ${h} m va desde el suelo hasta lo alto de un poste y forma un ángulo de 30° con el suelo. ¿Qué altura tiene el poste?`,hint:"La altura es el cateto opuesto al ángulo de 30°. Usa sen 30° = 1/2.",explain:`h = ${h} · sen 30° = ${h} · 1/2 = ${h/2} m.`}},
 R=>{const d=R.p([10,12,15,20,25,30]),a=R.p([25,35,40,50,55,65]),ans=d*Math.tan(rad(a));
  return{type:"fill",kind:"between",lo:ans-0.06,hi:ans+0.06,show:decs(ans,1),q:`Desde un punto del suelo a ${d} m de la base de un árbol, la copa se ve con un ángulo de elevación de ${a}°. ¿Cuánto mide el árbol? Usa la calculadora y redondea a una décima.`,
   hint:`Conoces el cateto adyacente (${d} m) y buscas el opuesto: usa la tangente.`,explain:`tan ${a}° = h / ${d}, así que h = ${d} · tan ${a}° ≈ ${decs(ans,2)} m.`}},
 R=>{const [t,v]=R.p([["sen α = 1/2",30],["cos α = 1/2",60],["tan α = 1",45],["sen α = √3/2",60],["cos α = √3/2",30],["tan α = √3",60],["sen α = √2/2",45],["tan α = √3/3",30]]);
  return{type:"fill",kind:"num",answer:v,q:`α es un ángulo agudo con ${M(t)}. ¿Cuántos grados mide α?`,hint:"Recuerda la tabla de los ángulos notables: 30°, 45° y 60°.",explain:`${t} corresponde a α = ${v}°.`}},
 R=>{const [c,v,f]=R.p([["el cateto opuesto mida la mitad de la hipotenusa",30,a=>Math.sin(rad(a))],["el cateto adyacente mida la mitad de la hipotenusa",60,a=>Math.cos(rad(a))],["los dos catetos midan lo mismo",45,null]]);const st=v===45?20:v===30?55:25;
  return{type:"slider",name:"α",min:5,max:85,start:st,answer:v,show:`α = ${v}°`,label:a=>a+"°",q:`La hipotenusa mide 10. Ajusta el ángulo α para que ${c}.`,hint:v===45?"Con los catetos iguales el triángulo es isósceles.":"Piensa en sen α o cos α = 1/2.",
   explain:v===45?"Catetos iguales: tan α = 1, así que α = 45°.":`${v===30?"sen":"cos"} α = 5/10 = 1/2, así que α = ${v}°.`,
   render:(a,ok)=>{const o=10*Math.sin(rad(a)),d=10*Math.cos(rad(a));return`<div style="text-align:center">${figTriA(Math.max(d,.3),Math.max(o,.3),"ady. "+decs(d,1),"op. "+decs(o,1),"10",a+"°").replace(/var\(--l-tri\) 14%/,ok?"var(--ok) 25%":"var(--l-tri) 14%")}</div>`}}}],
T2:[
 R=>{const d=R.p([30,45,60,120,135,150,210,225,240,270,300,315,330]);const [p,q]=red(d,180);
  const c=[degRad(d),radT(q,p),radT(2*p,q),radT(p,2*q),radT(p+q,q),radT(d,1)].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
  return{type:"choice",q:`¿Cuántos radianes son ${M(d+"°")}?`,opts:c.map(t=>M(t+" rad")),hint:"Multiplica por π/180 y simplifica la fracción.",explain:`${d} · π/180 = ${degRad(d)} rad.`}},
 R=>{const d=R.p([30,45,60,90,120,135,150,210,240,270,300,330,720]);
  return{type:"fill",kind:"num",answer:d,q:`¿Cuántos grados son ${M(degRad(d)+" rad")}?`,hint:"Sustituye π por 180°, o multiplica por 180/π.",explain:`${degRad(d)} · 180/π = ${d}°.`}},
 R=>{const all=R.sh([30,45,60,90,120,135,150,180,270,360]).slice(0,4);const pairs=all.map(d=>[d+"°",degRad(d)+" rad"]);
  const extra=[radT(red(all[0],180)[1],red(all[0],180)[0])+" rad",degRad(all[1]*2)+" rad"].filter((t,i,a)=>a.indexOf(t)===i&&!pairs.some(p=>p[1]===t));
  return{type:"match",q:"Arrastra a cada ángulo en grados su medida en radianes. Sobran fichas.",pairs,extra,hint:"180° = π rad: 90° es la mitad, π/2; 60° es un tercio de 180°, π/3.",explain:pairs.map(p=>`${p[0]} = ${p[1]}`).join("; ")+"."}},
 R=>{const r=R.i(2,9),t=R.i(1,4);
  return{type:"fill",kind:"num",answer:r*t,q:`En una circunferencia de radio ${r} cm, ¿cuánto mide el arco que abarca un ángulo central de ${t} ${t===1?"radián":"radianes"}?`,hint:"Con el ángulo en radianes, s = r · θ.",explain:`s = ${r} · ${t} = ${r*t} cm: el arco mide ${t} ${t===1?"vez":"veces"} el radio.`}},
 R=>{const b=R.i(1,71)*5,neg=R.f()<.4,A=neg?b-360*R.i(1,2):b+360*R.i(1,2);
  return{type:"fill",kind:"num",answer:b,q:`¿Qué ángulo entre 0° y 360° es coterminal con ${M(fmt(A)+"°")}, es decir, termina en el mismo lugar?`,hint:neg?"Suma 360° las veces que haga falta hasta quedar entre 0° y 360°.":"Resta 360° las veces que haga falta.",
   explain:`${fmt(A)}° ${neg?"+":"−"} ${Math.abs(A-b)}° = ${b}°.`}}],
T3:[
 R=>{const d=R.p([30,45,60,120,135,150,210,225,240,300,315,330]),[c,s]=trigEx(d);
  const cand=[[c,s],[s,c],[negS(c),s],[c,negS(s)],[negS(c),negS(s)],[negS(s),negS(c)]].map(([x,y])=>`(${x}, ${y})`).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
  return{type:"choice",q:`¿Cuáles son las coordenadas del punto P de la circunferencia trigonométrica que corresponde a ${M(d+"°")}?`,opts:cand.map(M),hint:"P = (cos θ, sen θ). Busca el ángulo de referencia y pon los signos del cuadrante.",
   explain:`El ángulo de referencia es ${d<90?d:d<180?180-d:d<270?d-180:360-d}°. En el cuadrante ${QN[quad(Math.cos(rad(d)),Math.sin(rad(d)))]}, cos θ ${Math.cos(rad(d))>0?"> 0":"< 0"} y sen θ ${Math.sin(rad(d))>0?"> 0":"< 0"}: P = (${c}, ${s}).`}},
 R=>{const pool=R.sh([20,35,50,70,100,115,140,160,200,215,230,255,290,310,335,350]);const items=[];const used=new Set();
  for(const d of pool){const q=quad(Math.cos(rad(d)),Math.sin(rad(d)))-1;if(items.filter(i=>i.bin===q).length<2&&items.length<7){items.push({t:d+"°",bin:q});used.add(q)}}
  return{type:"bins",q:"Clasifica cada ángulo según los signos de su seno y su coseno.",bins:["sen > 0 y cos > 0","sen > 0 y cos < 0","sen < 0 y cos < 0","sen < 0 y cos > 0"],items,hint:"Ubica el cuadrante: I de 0° a 90°, II de 90° a 180°, III de 180° a 270° y IV de 270° a 360°.",
   explain:"El coseno es la x de P y el seno, la y: en I los dos son positivos; en II solo el seno; en III ninguno; en IV solo el coseno."}},
 R=>{const [a,b,c]=R.p([[4,3,5],[3,4,5],[12,5,13],[5,12,13],[8,6,10],[15,8,17]]),q=R.p([2,3,4]);const sv=q<=2?b:-b,cv=q===2||q===3?-a:a;
  return{type:"fill",kind:"frac",answer:cv/c,show:frs(cv,c),q:`El ángulo θ está en el cuadrante ${QN[q]} y ${M(`sen θ = ${frs(sv,c)}`)}. ¿Cuánto vale ${M("cos θ")}?`,hint:"Usa sen² θ + cos² θ = 1 y decide el signo según el cuadrante.",
   explain:`cos² θ = 1 − (${frs(sv,c)})² = ${c*c-b*b}/${c*c}, así que |cos θ| = ${a}/${c}. En el cuadrante ${QN[q]} el coseno es ${cv>0?"positivo":"negativo"}: cos θ = ${frs(cv,c)}.`}},
 R=>{const [t,v]=R.p([["cos θ = −1",180],["sen θ = −1",270],["P = (0, 1)",90],["sen θ = 1/2 y cos θ < 0",150],["cos θ = 1/2 y sen θ < 0",300],["sen θ = −√2/2 y cos θ < 0",225],["cos θ = −√3/2 y sen θ > 0",150],["sen θ = −√3/2 y cos θ > 0",300]]);const k=v/15,st=k>12?3:20;
  return{type:"slider",name:"θ",min:0,max:24,start:st,answer:k,show:`θ = ${v}°`,label:i=>i*15+"°",q:`Ajusta el ángulo θ (entre 0° y 360°) para que ${M(t)}.`,hint:"Piensa en qué cuadrante debe estar P y cuál es el ángulo de referencia.",
   explain:`θ = ${v}°: P = (${trigEx(v)[0]}, ${trigEx(v)[1]}).`,render:(i,ok)=>unitFig(i*15,{proj:true,color:ok?"var(--ok)":"var(--l-tri)",label:`${i*15}°`,w:360})}},
 R=>{const d=R.p([120,135,150,210,225,240,300,315,330,100,200,290,340]),ref=d<180?180-d:d<270?d-180:360-d;
  const opts=[ref,180-ref,d-90,90-ref,360-d].map(x=>((x%360)+360)%360).filter((v,i,a)=>v>0&&a.indexOf(v)===i).slice(0,4);if(opts.length<4||opts[0]!==ref)opts.splice(0,opts.length,ref,...[15,75,105].filter(x=>x!==ref).slice(0,3));
  return{type:"choice",q:`¿Cuál es el ángulo de referencia de ${M(d+"°")}?`,opts:opts.map(x=>M(x+"°")),hint:"Es el ángulo agudo entre el lado final y el eje x más cercano (el de 0° o el de 180°).",
   explain:`${d}° está en el cuadrante ${QN[quad(Math.cos(rad(d)),Math.sin(rad(d)))]}: su ángulo con el eje x es ${ref}°.`}}],
T4:[
 R=>{const [bp,bq]=R.p([[2,1],[3,1],[4,1],[1,2],[1,3]]),bT=bq===1?String(bp):`x/${bq}`;const per=radT(2*bq,bp);
  const c=[per,radT(2*bp,bq),radT(bq,bp),radT(bp,bq),"2π"].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
  return{type:"choice",q:`¿Cuál es el período de ${M(bq===1?`f(x) = sen(${bp}x)`:`f(x) = sen(x/${bq})`)}?`,opts:c.map(M),hint:"El período de sen(bx) es 2π / b.",explain:`2π / ${bq===1?bp:"(1/"+bq+")"} = ${per}.`}},
 R=>{const a=R.nz(-5,5),k=R.i(-3,4),mx=R.f()<.5;const v=mx?Math.abs(a)+k:k-Math.abs(a);
  return{type:"fill",kind:"num",answer:v,q:`¿Cuál es el valor ${mx?"máximo":"mínimo"} de ${M(`f(x) = ${a===1?"":a===-1?"−":fmt(a)} sen x ${k<0?"−":"+"} ${Math.abs(k)}`.replace(" + 0","").replace(" − 0",""))}?`,hint:"sen x va de −1 a 1. Multiplica por el coeficiente (si es negativo, se invierten) y suma la constante.",
   explain:`${a===1?"":a===-1?"−":fmt(a)} sen x va de ${-Math.abs(a)} a ${Math.abs(a)}; al sumar ${fmt(k)}, f va de ${k-Math.abs(a)} a ${Math.abs(a)+k}.`}},
 R=>{const a=R.p([1,2,3]),b=R.p([1,2]),cs=R.f()<.5,f=cs?x=>a*Math.cos(b*x):x=>a*Math.sin(b*x);const T=(fn,A,B)=>`y = ${A===1?"":A+" "}${fn}(${B===1?"":B}x)`.replace("(1x)","(x)");
  const right=T(cs?"cos":"sen",a,b),opts=[right,T(cs?"sen":"cos",a,b),T(cs?"cos":"sen",a===1?2:1,b),T(cs?"cos":"sen",a,b===1?2:1)].filter((v,i,arr)=>arr.indexOf(v)===i);
  return{type:"choice",q:"¿Qué fórmula corresponde a esta gráfica?",fig:plot({xmin:-.3,xmax:2*Math.PI+.3,ymin:-3.5,ymax:3.5,w:520,h:260,ystep:1,xticks:PI_TICKS(0,2*Math.PI),axes:true,fns:[{f,color:"var(--l-tri)"}],aria:"Gráfica de una función trigonométrica"}),opts:opts.map(M),
   hint:"Mira tres cosas: el valor en x = 0 (el seno empieza en 0, el coseno en su máximo), la altura máxima (amplitud) y cuántas ondas completas hay entre 0 y 2π.",
   explain:`Empieza en ${cs?a:0} (${cs?"coseno":"seno"}), sube hasta ${a} (amplitud ${a}) y hace ${b} ${b===1?"onda":"ondas"} entre 0 y 2π (período ${radT(2,b)}): ${right}.`}},
 R=>{const [t,v]=R.p([["sen x = 0",[0,180,360]],["cos x = 0",[90,270]],["sen x = 1/2",[30,150]],["cos x = 1/2",[60,300]],["cos x = −1/2",[120,240]],["sen x = −1",[270]],["sen x = −√2/2",[225,315]]]);
  return{type:"fill",kind:"set",answer:v,show:v.join("; "),q:`¿Para qué ángulos x entre 0° y 360° (ambos incluidos) se cumple ${M(t)}? Escribe los valores en grados.`,hint:"Busca en la circunferencia todos los puntos con esa coordenada: suele haber dos en cada vuelta.",
   explain:`En la circunferencia: ${t} en x = ${v.map(x=>x+"°").join(", ")}.`}},
 R=>{const B=[[1,2],[1,1],[2,1],[3,1],[4,1]],k=R.i(0,4),[bp,bq]=B[k],per=radT(2*bq,bp),st=k===2?4:2;const bt=i=>B[i][1]===1?String(B[i][0]):`1/${B[i][1]}`;
  return{type:"slider",name:"b",min:0,max:4,start:st,answer:k,show:`b = ${bt(k)}`,label:bt,hideValue:false,q:`Ajusta b para que ${M("y = sen(bx)")} tenga período ${M(per)}: la onda se repite entre las dos líneas rojas.`,hint:"El período es 2π / b: despeja b.",
   explain:`2π / b = ${per}, así que b = ${bt(k)}.`,render:(i,ok)=>{const b=B[i][0]/B[i][1],T=2*Math.PI*bq/bp;return plot({xmin:-.3,xmax:4*Math.PI+.3,ymin:-1.6,ymax:1.6,w:540,h:220,ystep:.5,xticks:PI_TICKS(0,4*Math.PI),axes:true,fns:[{f:x=>Math.sin(b*x),color:ok?"var(--ok)":"var(--l-tri)"}],vl:[{x:0,color:"var(--l-ecu)",dash:"5 4",width:2},{x:T,color:"var(--l-ecu)",dash:"5 4",width:2}],aria:"Onda y = sen(bx)"})}}}],
T5:[
 R=>{const [a,b,c]=R.p([[4,3,5],[3,4,5],[12,5,13],[5,12,13],[15,8,17],[8,15,17]]),q=R.i(1,4),s=(q<=2?1:-1)*b,co=(q===2||q===3?-1:1)*a;
  return{type:"fill",kind:"frac",answer:s/co,show:frs(s,co),q:`Para un ángulo θ, ${M(`sen θ = ${frs(s,c)}`)} y ${M(`cos θ = ${frs(co,c)}`)}. ¿Cuánto vale ${M("tan θ")}?`,hint:"tan θ = sen θ / cos θ: los denominadores se simplifican.",
   explain:`tan θ = (${frs(s,c)}) / (${frs(co,c)}) = ${frs(s,co)}.`}},
 R=>{const t=R.f()<.5;
  return t?{type:"choice",q:`¿En cuál de estos ángulos ${M("tan θ")} no está definida?`,opts:[R.p(["90°","270°"]),"0°","45°","180°"].map(M),hint:"tan θ = sen θ / cos θ: ¿cuándo es 0 el denominador?",explain:"tan θ no existe cuando cos θ = 0, es decir, en 90° y 270°: el radio es vertical y no corta la recta x = 1."}
   :{type:"choice",q:`¿En cuál de estos ángulos ${M("cot θ")} no está definida?`,opts:[R.p(["0°","180°"]),"90°","45°","270°"].map(M),hint:"cot θ = cos θ / sen θ: ¿cuándo es 0 el denominador?",explain:"cot θ no existe cuando sen θ = 0, es decir, en 0°, 180° y 360°."}},
 R=>{const pool=R.sh([[30,0],[60,0],[200,0],[230,0],[250,0],[120,1],[150,1],[300,1],[340,1],[100,1],[90,2],[270,2]]);const items=[];for(const [d,b] of pool){if(items.filter(i=>i.bin===b).length<(b===2?1:3)&&items.length<7)items.push({t:d+"°",bin:b})}
  return{type:"bins",q:"Clasifica cada ángulo según el signo de su tangente.",bins:["tan θ > 0","tan θ < 0","No está definida"],items,hint:"tan θ es positiva si seno y coseno tienen el mismo signo (cuadrantes I y III).",explain:"Positiva en I y III, negativa en II y IV, y no definida en 90° y 270°."}},
 R=>{let p,q;do{p=R.nz(-5,5);q=R.i(2,7)}while(Math.abs(p)===q||gcd(p,q)!==1);
  return{type:"choice",q:`Si ${M(`tan θ = ${frs(p,q)}`)}, ¿cuánto vale ${M("cot θ")}?`,opts:[frs(q,p),frs(-q,p),frs(-p,q),frs(p*p,q*q)].filter((v,i,a)=>a.indexOf(v)===i).map(M),hint:"cot θ = 1 / tan θ: se invierte la fracción, sin cambiar el signo.",
   explain:`cot θ = 1 / (${frs(p,q)}) = ${frs(q,p)}.`}},
 R=>{const [t,v]=R.p([["tan θ = 1",45],["tan θ = −1",135],["tan θ = √3",60],["tan θ = −√3/3",150],["la pendiente del radio OP sea −√3",120],["tan θ = √3/3",30]]);const k=v/15,st=k>6?2:10;
  return{type:"slider",name:"θ",min:0,max:12,start:st,answer:k,show:`θ = ${v}°`,label:i=>i*15+"°",q:`Ajusta θ (entre 0° y 180°) para que ${M(t)}.`,hint:"tan θ es la pendiente del radio: positiva si sube hacia la derecha, negativa si baja. Recuerda los ángulos notables.",
   explain:`tan ${v}° = ${v===45?"1":v===135?"−1":v===60?"√3":v===120?"−√3":v===150?"−√3/3":"√3/3"}.`,
   render:(i,ok)=>{const d=i*15,T=Math.abs(Math.cos(rad(d)))>1e-9?Math.tan(rad(d)):null;return unitFig(d,{color:ok?"var(--ok)":"var(--l-tri)",label:`${d}°`,w:360,extra:[{x1:1,y1:-1.5,x2:1,y2:1.5,color:"var(--muted)",dash:"4 3",width:1.5},...(T!==null?[{x1:-1.5,y1:-1.5*T,x2:1.5,y2:1.5*T,color:ok?"var(--ok)":"var(--l-tri)",dash:"6 4",width:1.5}]:[])]})}}}],
T6:[
 R=>{const [c,s2]=R.p([["0,6","0,64"],["0,8","0,36"],["0,5","0,75"],["−0,6","0,64"],["0,2","0,96"],["−0,8","0,36"]]);
  return{type:"fill",kind:"num",answer:+s2.replace(",","."),show:s2,q:`Si ${M(`cos x = ${c}`)}, ¿cuánto vale ${M("sen² x")}?`,hint:"Usa sen² x + cos² x = 1.",explain:`sen² x = 1 − (${c})² = 1 − ${decs(1-+s2.replace(",","."),2)} = ${s2}.`}},
 R=>{const pool=[["sen² x + cos² x = 1",0],["sen(−x) = −sen x",0],["cos(−x) = cos x",0],["1 + tan² x = 1 / cos² x",0],["tan x · cot x = 1",0],["sen 2x = 2 sen x cos x",0],["sen(90° − x) = cos x",0],
   ["sen 2x = 2 sen x",1],["cos(−x) = −cos x",1],["sen(x + y) = sen x + sen y",1],["sen² x − cos² x = 1",1],["tan x = cos x / sen x",1],["cos 2x = 2 cos x",1]];
  const items=[...R.sh(pool.filter(p=>p[1]===0)).slice(0,3),...R.sh(pool.filter(p=>p[1]===1)).slice(0,3)].map(([t,bin])=>({t,bin}));
  return{type:"bins",q:"¿Cuáles de estas igualdades son identidades (valen para todo x)?",bins:["Es identidad","No es identidad"],items,hint:"Prueba con un ángulo fácil, como x = 90° o x = 45°: si falla una vez, no es identidad.",
   explain:"Por ejemplo, con x = 90°: sen 180° = 0, pero 2 sen 90° = 2, así que sen 2x = 2 sen x no es identidad. Las verdaderas salen de Pitágoras, de la simetría o de las fórmulas de suma."}},
 R=>{const [e,r]=R.p([["(1 − cos² x) / sen x","sen x"],["sen x · cot x","cos x"],["sen x / tan x","cos x"],["1 − sen² x","cos² x"],["tan x · cos x","sen x"],["(sen² x + cos² x) / cos x","1 / cos x"]]);
  return{type:"choice",q:`Simplifica ${M(e)}.`,opts:[r,...["sen x","cos x","tan x","1","sen² x","cos² x","1 / cos x"].filter(x=>x!==r).slice(0,3)].map(M),hint:"Escribe todo en senos y cosenos y usa sen² x + cos² x = 1.",explain:`${e} = ${r}.`}},
 R=>{const [a,b,c]=R.p([[4,3,5],[3,4,5],[12,5,13],[5,12,13],[15,8,17]]),t=R.f()<.5;
  return t?{type:"fill",kind:"frac",answer:2*a*b/(c*c),show:frs(2*a*b,c*c),q:`Si x es agudo, ${M(`sen x = ${b}/${c}`)} y ${M(`cos x = ${a}/${c}`)}, ¿cuánto vale ${M("sen 2x")}?`,hint:"sen 2x = 2 sen x cos x.",explain:`sen 2x = 2 · ${b}/${c} · ${a}/${c} = ${frs(2*a*b,c*c)}.`}
   :{type:"fill",kind:"frac",answer:(a*a-b*b)/(c*c),show:frs(a*a-b*b,c*c),q:`Si x es agudo, ${M(`sen x = ${b}/${c}`)} y ${M(`cos x = ${a}/${c}`)}, ¿cuánto vale ${M("cos 2x")}?`,hint:"cos 2x = cos² x − sen² x.",explain:`cos 2x = ${a*a}/${c*c} − ${b*b}/${c*c} = ${frs(a*a-b*b,c*c)}.`}},
 R=>{const t=R.i(0,1);
  return t?{type:"choice",q:`¿Qué valores muestran que ${M("sen(a + b) = sen a + sen b")} no es una identidad?`,opts:["a = b = 90°","a = b = 0°","a = 0°, b = 90°","a = 180°, b = 0°"].map(M),hint:"Calcula los dos lados en cada caso: busca uno donde den distinto.",explain:"Con a = b = 90°: sen 180° = 0, pero sen 90° + sen 90° = 2. En los otros casos los dos lados coinciden por casualidad."}
   :{type:"choice",q:`¿Qué valor de x muestra que ${M("cos 2x = 2 cos x")} no es una identidad?`,opts:["x = 0°","Ninguno: sí es una identidad","Hace falta probar todos los valores","Solo se puede ver con la gráfica"].map(M),hint:"Calcula los dos lados en x = 0°.",explain:"Con x = 0°: cos 0° = 1, pero 2 cos 0° = 2. Un solo contraejemplo basta para descartar una identidad."}}]
});

Object.assign(RECAP,{
T1:{map:[0,1,2,3,1],pts:[
  {s:"Razones trigonométricas",t:"sen = op/hip, cos = ady/hip, tan = op/ady.",ex:"3, 4, 5: sen α = 3/5"},
  {s:"Ángulos notables",t:"sen 30° = 1/2, cos 60° = 1/2, tan 45° = 1.",ex:"escalera de 6 m a 60°: pie a 3 m"},
  {s:"Resolver con calculadora",t:"Se elige la razón que relaciona el dato con la incógnita.",ex:"h = 20 · tan 35° ≈ 14,0"},
  {s:"Hallar un ángulo",t:"Con el valor de la razón se busca el ángulo (o tan⁻¹ en la calculadora).",ex:"tan α = √3 → 60°"}]},
T2:{map:[0,1,0,2,3],pts:[
  {s:"Grados a radianes",t:"Multiplicar por π/180 y simplificar.",ex:"135° = 3π/4"},
  {s:"Radianes a grados",t:"Cambiar π por 180°.",ex:"5π/6 = 150°"},
  {s:"Longitud de arco",t:"s = r · θ con θ en radianes.",ex:"r = 5, θ = 2 → s = 10"},
  {s:"Ángulos coterminales",t:"Sumar o restar vueltas de 360°.",ex:"−90° y 270°"}]},
T3:{map:[0,1,2,3,3],pts:[
  {s:"Coordenadas de P",t:"P = (cos θ, sen θ).",ex:"150°: (−√3/2, 1/2)"},
  {s:"Signos por cuadrante",t:"cos es la x y sen es la y de P.",ex:"en II: sen > 0, cos < 0"},
  {s:"sen² + cos² = 1",t:"Con uno de los dos y el cuadrante se halla el otro.",ex:"sen θ = 3/5 en II → cos θ = −4/5"},
  {s:"Ángulos de referencia",t:"El ángulo agudo con el eje x da el valor; el cuadrante, el signo.",ex:"225° → 45°"}]},
T4:{map:[0,1,2,3,0],pts:[
  {s:"Período",t:"sen(bx) se repite cada 2π / b.",ex:"sen 2x: período π"},
  {s:"Amplitud y extremos",t:"a sen x + k va de k − |a| a k + |a|.",ex:"3 sen x + 1: de −2 a 4"},
  {s:"Leer la gráfica",t:"Valor en 0, altura máxima y número de ondas en [0, 2π].",ex:"empieza en el máximo: coseno"},
  {s:"Ecuaciones básicas",t:"Suele haber dos soluciones por vuelta.",ex:"sen x = 1/2: 30° y 150°"}]},
T5:{map:[0,1,2,3,0],pts:[
  {s:"tan = sen / cos",t:"Es la pendiente del radio OP.",ex:"sen = 3/5, cos = −4/5 → tan = −3/4"},
  {s:"Dónde no existe",t:"tan no existe si cos = 0; cot no existe si sen = 0.",ex:"tan 90° no existe"},
  {s:"Signos",t:"Positiva en I y III, negativa en II y IV.",ex:"tan 120° < 0"},
  {s:"Cotangente",t:"cot θ = 1 / tan θ.",ex:"tan = 3/4 → cot = 4/3"}]},
T6:{map:[0,1,2,3,1],pts:[
  {s:"Identidad pitagórica",t:"sen² x + cos² x = 1 permite pasar de uno a otro.",ex:"cos x = 0,6 → sen² x = 0,64"},
  {s:"Reconocer identidades",t:"Valen para todo x; un contraejemplo las descarta.",ex:"sen 2x ≠ 2 sen x"},
  {s:"Simplificar",t:"Escribir todo en senos y cosenos.",ex:"sen x · cot x = cos x"},
  {s:"Ángulo doble",t:"sen 2x = 2 sen x cos x; cos 2x = cos² x − sen² x.",ex:"sen x = 3/5, cos x = 4/5 → sen 2x = 24/25"}]}
});

Object.assign(EXPLORE,{
tTriangulo(host){let a=35,h=8;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ta1">Ángulo α = <output class="m" id="ta1o"></output></label><input type="range" id="ta1" min="5" max="85" value="${a}"><label for="th1">Hipotenusa = <output class="m" id="th1o"></output></label><input type="range" id="th1" min="2" max="12" value="${h}">
   <span class="seg" role="group" aria-label="Ángulos notables"><button class="btn sm" data-a="30">30°</button><button class="btn sm" data-a="45">45°</button><button class="btn sm" data-a="60">60°</button></span></div>
   <div class="svgwrap" id="ttsvg" style="text-align:center"></div><div class="readout" id="ttr"></div></div>`;
  const draw=()=>{const o=h*Math.sin(rad(a)),d=h*Math.cos(rad(a));
    $("#ttsvg",host).innerHTML=figTriA(Math.max(d,.2),Math.max(o,.2),"ady. "+decs(d,2),"op. "+decs(o,2),"hip. "+h,a+"°");
    $("#ta1o",host).textContent=a+"°";$("#th1o",host).textContent=h;const ex=TV[a];
    $("#ttr",host).innerHTML=`<span class="k">Seno</span>${decs(o,2)} / ${h} ≈ ${decs(Math.sin(rad(a)),4)}${ex?` = ${ex[1]}`:""}<br><span class="k">Coseno</span>${decs(d,2)} / ${h} ≈ ${decs(Math.cos(rad(a)),4)}${ex?` = ${ex[0]}`:""}<br><span class="k">Tangente</span>${decs(o,2)} / ${decs(d,2)} ≈ ${decs(Math.tan(rad(a)),4)}<br><span class="k">El otro ángulo</span>${90-a}°: su seno es el coseno de α<br><span class="k">Prueba</span>cambia la hipotenusa: los lados cambian, las razones no`};
  $("#ta1",host).oninput=e=>{a=+e.target.value;draw()};$("#th1",host).oninput=e=>{h=+e.target.value;draw()};$$("[data-a]",host).forEach(b=>b.onclick=()=>{a=+b.dataset.a;$("#ta1",host).value=a;draw()});draw()},

tRadian(host){let d=120,r=2;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="rd">Ángulo = <output class="m" id="rdo"></output></label><input type="range" id="rd" min="0" max="144" value="24"><label for="rr">Radio r = <output class="m" id="rro"></output></label><input type="range" id="rr" min="1" max="3" value="2"></div>
   <div class="svgwrap" id="rsvg"></div><div class="readout" id="rrr"></div></div>`;
  const draw=()=>{const t=rad(d),L=r+.8,n=Math.floor(t);let raw=(X,Y)=>{let g="";for(let k=0;k<=n;k++){const a0=k,a1=Math.min(k+1,t);if(a1<=a0)continue;let p=`M${X(r*Math.cos(a0))} ${Y(r*Math.sin(a0))}`;for(let i=1;i<=20;i++){const a=a0+(a1-a0)*i/20;p+=` L${X(r*Math.cos(a)).toFixed(1)} ${Y(r*Math.sin(a)).toFixed(1)}`}
      g+=`<path d="${p}" fill="none" stroke="${k%2?"var(--l-tri)":"var(--l-rac)"}" stroke-width="6" stroke-linecap="butt"/>`}return g};
    $("#rsvg",host).innerHTML=plot({xmin:-L,xmax:L,ymin:-L,ymax:L,w:400,equal:true,xstep:1,ystep:1,axes:true,circs:[{cx:0,cy:0,r,color:"var(--rule)",width:2}],raw,segs:[{x1:0,y1:0,x2:r,y2:0,color:"var(--ink)",width:2.5},{x1:0,y1:0,x2:r*Math.cos(t),y2:r*Math.sin(t),color:"var(--ink)",width:2.5}],aria:"Arco medido en radios"});
    $("#rdo",host).textContent=d+"°";$("#rro",host).textContent=r;const nice=d%15===0;
    $("#rrr",host).innerHTML=`<span class="k">Grados</span>${d}°<br><span class="k">Radianes</span>${nice?degRad(d)+" ≈ ":""}${decs(t,3)} rad<br><span class="k">Arco</span>s = r · θ = ${r} · ${decs(t,3)} ≈ ${decs(r*t,2)}: caben ${decs(t,2)} radios a lo largo del arco (tramos de colores)<br><span class="k">Vueltas</span>${d>=360?`${d}° = ${Math.floor(d/360)} ${Math.floor(d/360)===1?"vuelta":"vueltas"} + ${d%360}°: coterminal con ${d%360}°`:"menos de una vuelta (360° = 2π ≈ 6,28 rad)"}`};
  $("#rd",host).oninput=e=>{d=+e.target.value*5;draw()};$("#rr",host).oninput=e=>{r=+e.target.value;draw()};draw()},

tUnit(host){let d=150;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ud">θ = <output class="m" id="udo"></output></label><input type="range" id="ud" min="0" max="360" value="${d}"><button class="btn sm" id="usnap" aria-pressed="false">Solo ángulos notables</button></div>
   <div class="svgwrap" id="usvg"></div><div class="readout" id="urr"></div></div>`;let snap=false;
  const draw=()=>{const c=Math.cos(rad(d)),s=Math.sin(rad(d)),ex=trigEx(d),q=quad(Math.round(c*1e9),Math.round(s*1e9)),ref=d%90===0?null:d<90?d:d<180?180-d:d<270?d-180:360-d;
    $("#usvg",host).innerHTML=unitFig(d,{proj:true,w:420,label:`(${decs(c,2)}, ${decs(s,2)})`});
    $("#udo",host).textContent=d+"°";$("#usnap",host).setAttribute("aria-pressed",snap);
    $("#urr",host).innerHTML=`<span class="k">Ángulo</span>${d}° = ${degRad(d)} rad<br><span class="k">cos θ (azul)</span>${decs(c,3)}${ex?` = ${ex[0]}`:""}<br><span class="k">sen θ (roja)</span>${decs(s,3)}${ex?` = ${ex[1]}`:""}<br><span class="k">Comprobación</span>sen² θ + cos² θ = ${decs(s*s,3)} + ${decs(c*c,3)} = 1<br><span class="k">Dónde</span>${q?`cuadrante ${QN[q]}: cos ${c>0?"+":"−"}, sen ${s>0?"+":"−"}${ref!==null?`; ángulo de referencia ${ref}°`:""}`:"sobre un eje"}`};
  $("#ud",host).oninput=e=>{let v=+e.target.value;if(snap){const N=[0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330,360];v=N.reduce((b,x)=>Math.abs(x-v)<Math.abs(b-v)?x:b)}d=v;draw()};$("#usnap",host).onclick=()=>{snap=!snap;draw()};draw()},

tOnda(host){let t=60,a=1,b=1,cs=false;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ot">Ángulo x = <output class="m" id="oto"></output></label><input type="range" id="ot" min="0" max="360" value="${t}"><label for="oa">Amplitud a = <output class="m" id="oao"></output></label><input type="range" id="oa" min="1" max="3" value="1"><label for="ob">Ondas por vuelta b = <output class="m" id="obo"></output></label><input type="range" id="ob" min="1" max="4" value="1">
   <span class="seg" role="group" aria-label="Función"><button class="btn sm" data-c="0">seno</button><button class="btn sm" data-c="1">coseno</button></span></div>
   <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:10px;align-items:center"><div class="svgwrap" id="ocir"></div><div class="svgwrap" id="ograf"></div></div><div class="readout" id="orr"></div></div>`;
  const draw=()=>{const F=cs?Math.cos:Math.sin,x=rad(t),y=a*F(b*x),c=Math.cos(b*x),s=Math.sin(b*x);
    $("#ocir",host).innerHTML=unitFig(t*b,{w:260,label:"",proj:true});
    $("#ograf",host).innerHTML=plot({xmin:-.2,xmax:2*Math.PI+.2,ymin:-3.3,ymax:3.3,w:520,h:280,ystep:1,xticks:PI_TICKS(0,2*Math.PI),axes:true,fns:[{f:v=>a*F(b*v),color:"var(--l-tri)"}],vl:[{x,color:"var(--muted)",dash:"4 4",width:1.5}],pts:[{x,y,color:"var(--l-tri)",label:decs(y,2)}],aria:"Gráfica de la onda"});
    $("#oto",host).textContent=t+"°";$("#oao",host).textContent=a;$("#obo",host).textContent=b;$$("[data-c]",host).forEach(e=>e.setAttribute("aria-pressed",+e.dataset.c===+cs));
    $("#orr",host).innerHTML=`<span class="k">Función</span>y = ${a===1?"":a+" "}${cs?"cos":"sen"}(${b===1?"":b}x)<br><span class="k">En x = ${t}°</span>y = ${a===1?"":a+" · "}${cs?"cos":"sen"}(${b*t}°) ≈ ${decs(y,3)}<br><span class="k">Amplitud</span>${a}: la onda va de −${a} a ${a}<br><span class="k">Período</span>2π / ${b} = ${radT(2,b)} (${360/b}°): ${b===1?"una onda":b+" ondas"} por vuelta`};
  $("#ot",host).oninput=e=>{t=+e.target.value;draw()};$("#oa",host).oninput=e=>{a=+e.target.value;draw()};$("#ob",host).oninput=e=>{b=+e.target.value;draw()};$$("[data-c]",host).forEach(e=>e.onclick=()=>{cs=e.dataset.c==="1";draw()});draw()},

tTangente(host){let d=35;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="tgd">θ = <output class="m" id="tgdo"></output></label><input type="range" id="tgd" min="-80" max="260" value="${d}"></div>
   <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:10px;align-items:center"><div class="svgwrap" id="tgc"></div><div class="svgwrap" id="tgg"></div></div><div class="readout" id="tgr"></div></div>`;
  const draw=()=>{const t=rad(d),c=Math.cos(t),s=Math.sin(t),und=Math.abs(c)<1e-9,T=und?null:s/c;
    $("#tgc",host).innerHTML=unitFig(d,{w:320,label:"P",extra:[{x1:1,y1:-2.5,x2:1,y2:2.5,color:"var(--muted)",dash:"4 3",width:1.5},...(T!==null?[{x1:Math.min(0,c),y1:Math.min(0,c)*T,x2:1,y2:T,color:"var(--l-tri)",dash:"6 4",width:1.5},{x1:1,y1:0,x2:1,y2:T,color:"var(--l-rac)",width:4}]:[])]});
    $("#tgg",host).innerHTML=plot({xmin:-Math.PI/2,xmax:3*Math.PI/2,ymin:-4,ymax:4,w:440,h:320,ystep:1,xticks:PI_TICKS(-Math.PI/2,3*Math.PI/2),axes:true,fns:[{f:x=>Math.abs(Math.cos(x))<.02?NaN:Math.tan(x),color:"var(--l-tri)"}],vl:[{x:Math.PI/2,color:"var(--muted)",dash:"3 4",width:1},{x:-Math.PI/2+1e-6,color:"var(--muted)",dash:"3 4",width:1},{x:3*Math.PI/2-1e-6,color:"var(--muted)",dash:"3 4",width:1}],pts:T!==null&&Math.abs(T)<4?[{x:t,y:T,color:"var(--l-rac)",label:decs(T,2)}]:[],aria:"Gráfica de y = tan x"});
    $("#tgdo",host).textContent=d+"°";
    $("#tgr",host).innerHTML=`<span class="k">tan θ</span>${und?"no está definida: cos θ = 0 y el radio es vertical":`sen θ / cos θ = ${decs(s,3)} / ${decs(c,3)} ≈ ${decs(T,3)}`}<br><span class="k">Pendiente del radio</span>${und?"vertical, sin pendiente":decs(T,3)}<br><span class="k">cot θ</span>${Math.abs(s)<1e-9?"no está definida: sen θ = 0":`1 / tan θ ≈ ${und?"0":decs(1/T,3)}`}<br><span class="k">Período</span>tan(θ + 180°) = tan θ: la gráfica se repite cada π`};
  $("#tgd",host).oninput=e=>{d=+e.target.value;draw()};draw()},

tIdent(host){const I={pit:["sen² x + cos² x","1",x=>Math.sin(x)**2+Math.cos(x)**2,x=>1,true],dob:["sen 2x","2 sen x cos x",x=>Math.sin(2*x),x=>2*Math.sin(x)*Math.cos(x),true],dob2:["sen 2x","2 sen x",x=>Math.sin(2*x),x=>2*Math.sin(x),false],
   cos2:["cos 2x","cos² x − sen² x",x=>Math.cos(2*x),x=>Math.cos(x)**2-Math.sin(x)**2,true],par:["cos(−x)","cos x",x=>Math.cos(-x),x=>Math.cos(x),true],par2:["sen(−x)","sen x",x=>Math.sin(-x),x=>Math.sin(x),false],
   suma:["sen(x + π/2)","sen x + sen(π/2)",x=>Math.sin(x+Math.PI/2),x=>Math.sin(x)+1,false],comp:["sen(π/2 − x)","cos x",x=>Math.sin(Math.PI/2-x),x=>Math.cos(x),true]};
  let k="pit",x=1;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ik2">Igualdad</label><select id="ik2">${Object.entries(I).map(([c,v])=>`<option value="${c}">${v[0]} = ${v[1]}</option>`).join("")}</select><label for="ix2">x = <output class="m" id="ix2o"></output></label><input type="range" id="ix2" min="0" max="63" value="10"></div>
   <div class="svgwrap" id="isvg2"></div><div class="readout" id="irr2"></div></div>`;
  const draw=()=>{const [l,r,fl,fr,ok]=I[k],vl=fl(x),vr=fr(x);
    $("#isvg2",host).innerHTML=plot({xmin:-.2,xmax:2*Math.PI+.2,ymin:-2.5,ymax:2.5,w:540,h:280,ystep:.5,xticks:PI_TICKS(0,2*Math.PI),axes:true,fns:[{f:fl,color:"var(--l-tri)",width:4},{f:fr,color:"var(--l-rac)",dash:"7 5",width:2.5}],vl:[{x,color:"var(--muted)",dash:"4 4",width:1.5}],pts:[{x,y:vl,color:"var(--l-tri)"},{x,y:vr,color:"var(--l-rac)",r:4}],labels:[{x:.2,y:2.2,text:l,color:"var(--l-tri)"},{x:3.6,y:2.2,text:r,color:"var(--l-rac)"}],aria:"Gráficas de los dos lados"});
    $("#ix2o",host).textContent=decs(x,1)+" rad";
    $("#irr2",host).innerHTML=`<span class="k">Izquierda</span>${l} ≈ ${decs(vl,3)}<br><span class="k">Derecha</span>${r} ≈ ${decs(vr,3)}<br><span class="k">En este x</span>${Math.abs(vl-vr)<1e-6?"coinciden":"son distintos"}<br><span class="k">Veredicto</span>${ok?"es una identidad: las dos curvas coinciden en todo el intervalo":"no es una identidad: las curvas se separan; basta un x donde no coinciden"}`};
  $("#ik2",host).onchange=e=>{k=e.target.value;draw()};$("#ix2",host).oninput=e=>{x=+e.target.value/10;draw()};draw()}
});
