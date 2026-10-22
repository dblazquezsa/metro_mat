"use strict";
/* ============ Línea: La recta real · L6 La función exponencial y L7 Logaritmos ============ */

const SUBD="₀₁₂₃₄₅₆₇₈₉",SUPD="⁰¹²³⁴⁵⁶⁷⁸⁹";
const sub_=n=>String(n).replace(/\d/g,d=>SUBD[d]);
const sup_=n=>String(n).replace(/\d/g,d=>SUPD[d]).replace("-","⁻").replace("−","⁻");
const LOG=(b,y)=>`log${b===10?"":`<sub>${b}</sub>`} ${y}`;          // HTML
const LOGt=(b,y)=>`log${b===10?"":sub_(b)} ${y}`;                    // texto plano (fichas)

Object.assign(NODES,{
L6:{title:"La función exponencial",sub:"Cuando algo crece multiplicándose, no sumándose.",
 info:`<p class="lead">Si una cantidad se <b>multiplica</b> por el mismo número en cada paso, crece de forma <b>exponencial</b>. La fórmula es ${M(`y = C · ${P("a","x")}`)}: C es la cantidad inicial y a, la base.</p>
 <div class="ex-box"><span class="eyebrow">Ejemplo</span><p>Un cultivo empieza con 100 bacterias y se duplica cada hora. Tras x horas hay ${M(`100 · ${P(2,"x")}`)}: 100, 200, 400, 800, 1600… En 10 horas ya son 102 400.</p></div>
 <div class="ex-box"><span class="eyebrow">Exponentes que no son enteros</span><p>Las reglas de las potencias permiten dar sentido a cualquier exponente real:</p>
 <p class="calc">${P(2,0)} = 1    ${P(2,"−3")} = ${F(1,8)}    ${P(9,"1/2")} = √9 = 3    ${P(8,"2/3")} = ${P("(∛8)",2)} = 4</p>
 <p>Así la gráfica de ${M(P("a","x"))} es una curva continua, sin saltos.</p></div>
 <p>La gráfica de ${M(P("a","x"))} (con a &gt; 0) siempre pasa por (0, 1) y nunca toca el eje x: una potencia de base positiva nunca es cero ni negativa. Si a &gt; 1, crece; si 0 &lt; a &lt; 1, decrece.</p>
 <div class="callout"><span class="eyebrow">No confundas ${P(2,"x")} con ${P("x",2)}</span><p>En ${P(2,"x")} la cantidad Variable está en el exponente; en ${P("x",2)}, en la base. Para x = 10: ${P(2,10)} = 1024, pero ${P(10,2)} = 100. A la larga, la exponencial siempre gana.</p></div>`,
 explore:{intro:"Cambia la base y la cantidad inicial. Mira la tabla: cada paso multiplica por la base. Compara después con una potencia.",fn:"lExpo"},
 key:"Una exponencial multiplica por la base en cada paso: y = C · aˣ. Pasa por (0, C), nunca es negativa, crece si a > 1 y decrece si 0 < a < 1. Los exponentes fraccionarios son raíces.",
 ojo:"2ˣ no es x²: en la exponencial la cantidad Variable está en el exponente, y a la larga crece mucho más."},

L7:{title:"Logaritmos",sub:"El logaritmo es un exponente.",
 info:`<p class="lead">El <b>logaritmo</b> responde a la pregunta: ¿a qué exponente hay que elevar la base para obtener un número?</p>
 <p class="calc">${LOG(2,8)} = 3  porque  ${P(2,3)} = 8          ${LOG(10,1000)} = 3  porque  ${P(10,3)} = 1000</p>
 <div class="ex-box"><span class="eyebrow">En general</span><p class="calc">${LOG("a","y")} = x   significa   ${P("a","x")} = y</p>
 <p>Por eso ${LOG("a",1)} = 0, ${LOG("a","a")} = 1 y ${LOG(2,F(1,4))} = −2, porque ${P(2,"−2")} = ${F(1,4)}. Cuando no se escribe la base, es 10.</p></div>
 <div class="ex-box"><span class="eyebrow">Propiedades</span><p>Como los exponentes se suman al multiplicar potencias, los logaritmos convierten productos en sumas:</p>
 <p class="calc">log(x · y) = log x + log y    log(x / y) = log x − log y    log(${P("x","n")}) = n · log x</p></div>
 <div class="ex-box"><span class="eyebrow">Resolver ecuaciones exponenciales</span><p>Si las dos partes se pueden escribir con la misma base, se igualan los exponentes: ${P(2,"x+1")} = 32 = ${P(2,5)}, así que x + 1 = 5 y x = 4.</p>
 <p>Si no, se toman logaritmos: ${P(2,"x")} = 20 → x = log 20 / log 2 ≈ 4,32.</p></div>
 <div class="callout"><span class="eyebrow">Solo números positivos</span><p>No existe el logaritmo de 0 ni de un número negativo: ninguna potencia de base positiva da 0 o un número negativo.</p></div>`,
 explore:{intro:"Mueve el punto por la curva de la exponencial y mira su reflejo en la del logaritmo: lo que en una es x, en la otra es y.",fn:"lLog"},
 key:"logₐ y = x significa aˣ = y: el logaritmo es un exponente. Convierte productos en sumas y potencias en productos, y sirve para despejar exponentes.",
 ojo:"log(x + y) no es log x + log y: la propiedad es para el producto, log(x · y)."}
});

Object.assign(RETO,{
L6:[
 R=>{const C=R.p([50,100,200,300,500]),t=R.i(3,7),k=R.p([2,3]);
  return{type:"fill",kind:"num",answer:C*Math.pow(k,t),q:`Un cultivo empieza con ${C} bacterias y se ${k===2?"duplica":"triplica"} cada hora. ¿Cuántas bacterias hay después de ${t} horas?`,hint:`Cada hora se multiplica por ${k}: ${C} · ${P(k,t)}.`,
   explain:`${C} · ${P(k,t)} = ${C} · ${Math.pow(k,t)} = ${C*Math.pow(k,t)}.`}},
 R=>{const dec=R.f()<.5,b=dec?R.p(["1/2","1/3","0,5"]):R.p(["2","3","1,5"]),C=R.i(1,4);
  return{type:"choice",q:`¿Qué describe la gráfica de ${M(`y = ${C===1?"":C+" · "}${P(`(${b})`,"x")}`)}?`,
   opts:[dec?`Decrece y corta el eje y en ${C}`:`Crece y corta el eje y en ${C}`,dec?`Crece y corta el eje y en ${C}`:`Decrece y corta el eje y en ${C}`,dec?"Decrece y corta el eje x":"Crece y pasa por el origen (0, 0)",`Es una recta que pasa por (0, ${C})`],
   hint:"Calcula y para x = 0 y para x = 1.",explain:`Para x = 0, y = ${C} · 1 = ${C}. ${dec?"Como la base es menor que 1, cada paso multiplica por menos de 1: decrece":"Como la base es mayor que 1, cada paso multiplica por más de 1: crece"}, sin llegar nunca al eje x.`}},
 R=>{const [b,e,v]=R.p([[4,"1/2",2],[9,"1/2",3],[8,"1/3",2],[27,"1/3",3],[16,"1/4",2],[4,"3/2",8],[9,"3/2",27],[8,"2/3",4],[16,"3/4",8],[25,"3/2",125]]);
  return{type:"fill",kind:"num",answer:v,q:`Calcula ${M(P(b,e))}`,hint:`El denominador del exponente es una raíz: ${P(b,"1/"+e.split("/")[1])} es la raíz ${e.split("/")[1]==="2"?"cuadrada":e.split("/")[1]==="3"?"cúbica":"cuarta"} de ${b}.`,
   explain:`${P(b,e)}: raíz ${e.split("/")[1]==="2"?"cuadrada":e.split("/")[1]==="3"?"cúbica":"cuarta"} de ${b}${e.split("/")[0]!=="1"?`, elevada a ${e.split("/")[0]}`:""} = ${v}.`}},
 R=>{const x=R.p([8,9,10]),c=R.i(3,6)*10,vals=[["x²",x*x],["2ˣ",Math.pow(2,x)],["10x",10*x],[`3x + ${c}`,3*x+c]].filter((v,i,a)=>a.findIndex(w=>w[1]===v[1])===i);
  const sorted=vals.slice().sort((p,q)=>p[1]-q[1]);if(sorted.length<4)return RETO.L6[3](R);
  return{type:"order",noEval:true,q:`Ordena de menor a mayor el valor de estas expresiones cuando ${M("x = "+x)}.`,items:R.sh(vals.map(v=>v[0])),correct:sorted.map(v=>v[0]),hint:"Calcula cada una con ese valor de x.",
   explain:`Con x = ${x}: ${sorted.map(v=>`${v[0]} = ${v[1]}`).join(" < ")}. La exponencial ya va muy por delante.`}},
 R=>{const C=R.p([100,200,500]),N=C*Math.pow(2,R.i(4,7))-R.i(1,C-1),ans=Math.ceil(Math.log2(N/C));
  return{type:"slider",name:"Horas",min:0,max:10,start:ans>5?0:10,answer:ans,show:ans+" horas",label:k=>k+" h",
   q:`Una población de ${C} bacterias se duplica cada hora. Ajusta las horas hasta el <b>primer</b> momento en que haya más de ${N}.`,hint:`Ve duplicando: ${C}, ${2*C}, ${4*C}…`,explain:`${C} · ${P(2,ans-1)} = ${C*Math.pow(2,ans-1)} todavía no pasa de ${N}; ${C} · ${P(2,ans)} = ${C*Math.pow(2,ans)} sí.`,
   render:(k,ok)=>plot({xmin:0,xmax:10,ymin:0,ymax:Math.max(N*1.3,C*Math.pow(2,Math.min(k,10))*1.05),w:540,h:300,fns:[{f:x=>C*Math.pow(2,x),color:"var(--l-rec)"}],hl:[{y:N,color:"var(--l-ecu)",dash:"6 4"}],
     vl:[{x:k,color:ok?"var(--ok)":"var(--ink)",dash:"3 3",width:1.5}],pts:[{x:k,y:C*Math.pow(2,k),color:ok?"var(--ok)":"var(--l-rec)",label:String(C*Math.pow(2,k))}],labels:[{x:0.3,y:N,text:"meta: "+N,color:"var(--l-ecu)"}],aria:"Crecimiento de la población"})}}],
L7:[
 R=>{const [b,y,v]=R.p([[2,32,5],[2,64,6],[3,81,4],[3,27,3],[5,125,3],[10,1000,3],[10,"0,01",-2],[2,"1/8",-3],[4,64,3],[5,"1/25",-2],[10,10000,4],[7,49,2]]);
  return{type:"fill",kind:"num",answer:v,q:`Calcula ${M(LOG(b,y))}`,hint:`¿A qué exponente hay que elevar ${b} para obtener ${y}?`,explain:`${P(b,fmt(v))} = ${y}, así que ${LOG(b,y)} = ${fmt(v)}.`}},
 R=>{const [b,y,p,q]=R.p([[4,2,1,2],[8,2,1,3],[9,3,1,2],[27,3,1,3],[16,2,1,4],[16,8,3,4],[8,4,2,3],[25,5,1,2],[4,8,3,2]]);
  return{type:"fill",kind:"frac",answer:p/q,show:frs(p,q),q:`Calcula ${M(LOG(b,y))}. Escribe el resultado como fracción si no es entero.`,hint:`Escribe ${b} y ${y} como potencias de un mismo número.`,
   explain:`${P(b,`${p}/${q}`)} = ${y}, así que ${LOG(b,y)} = ${frs(p,q)}.`}},
 R=>{const t=R.p([["log 20 + log 5","2",["log 25","100","1"]],["log 2 + log 50","2",["log 52","100","3"]],["log 500 − log 5","2",["log 495","100","1"]],["3 · log 10","3",["30","log 30","1"]],["log 8 − log 4 + log 50","2",["log 54","100","log 2"]]]);
  return{type:"choice",q:`¿Cuánto vale ${M(t[0])}? (log es el logaritmo en base 10)`,opts:[M(t[1]),...t[2].map(M)],hint:"Usa log x + log y = log(x · y) y log x − log y = log(x / y).",
   explain:`${t[0]} = log ${t[0].includes("3 ·")?"1000":"100"} = ${t[1]}, porque ${P(10,t[1])} = ${Math.pow(10,+t[1])}.`}},
 R=>{const b=R.p([2,3]),m=R.i(1,3),c=R.i(-2,3),x=R.i(1,4),e=m*x+c;if(e<2||e>6||(m===1&&c===0))return RETO.L7[3](R);const V=Math.pow(b,e);
  return{type:"fill",kind:"num",answer:x,q:`Resuelve ${M(`${P(b,`${m===1?"":m}x${c?sgA(c).replace(/ /g,""):""}`)} = ${V}`)}`,hint:`Escribe ${V} como potencia de ${b} e iguala los exponentes.`,
   explain:`${V} = ${P(b,e)}, así que ${m===1?"":m}x${c?sgA(c):""} = ${e} y x = ${x}.`}},
 R=>{const all=R.sh([[2,3],[3,2],[2,5],[10,2],[5,2],[2,4],[3,3],[10,3]]),pick=[];for(const p of all){if(pick.length<4&&!pick.some(q=>Math.pow(q[0],q[1])===Math.pow(p[0],p[1])))pick.push(p)}
  const pairs=pick.map(([b,e])=>[`${b}${sup_(e)} = ${Math.pow(b,e)}`,LOGt(b,Math.pow(b,e))+" = "+e]),[b0,e0]=pick[0];
  const extra=[`${LOGt(Math.pow(b0,e0),b0)} = ${e0}`,`${LOGt(b0,e0)} = ${Math.pow(b0,e0)}`].filter(t=>!pairs.some(p=>p[1]===t));
  return{type:"match",q:"Arrastra cada logaritmo junto a la potencia que dice lo mismo. Sobran fichas con la base o el resultado cambiados.",pairs,extra,hint:"logₐ y = x significa aˣ = y: la base del logaritmo es la base de la potencia.",
   explain:"En cada pareja, el logaritmo es el exponente: la base se mantiene y el resultado de la potencia va dentro del logaritmo."}}]
});

Object.assign(RECAP,{
L6:{map:[0,1,2,3,0],pts:[
  {s:"Multiplicar en cada paso",t:"Una exponencial multiplica por la base en cada paso: y = C · aˣ.",ex:"100, 200, 400, 800…"},
  {s:"La forma de la gráfica",t:"Pasa por (0, C), nunca toca el eje x; crece si a > 1 y decrece si 0 < a < 1.",ex:"(1/2)ˣ decrece"},
  {s:"Exponentes fraccionarios",t:"El denominador del exponente es una raíz; el numerador, una potencia.",ex:"8^(2/3) = (∛8)² = 4"},
  {s:"Exponencial frente a potencia",t:"2ˣ no es x²; a la larga, la exponencial crece mucho más.",ex:"2¹⁰ = 1024; 10² = 100"}]},
L7:{map:[0,1,2,3,0],pts:[
  {s:"El logaritmo es un exponente",t:"logₐ y = x significa aˣ = y.",ex:"log₂ 32 = 5"},
  {s:"Logaritmos fraccionarios y negativos",t:"Si y no es una potencia entera de la base, el logaritmo puede ser una fracción; si y < 1, es negativo.",ex:"log₄ 2 = 1/2; log₂ (1/8) = −3"},
  {s:"Propiedades",t:"El logaritmo de un producto es la suma de los logaritmos; el de una potencia, el exponente por el logaritmo.",ex:"log 20 + log 5 = log 100 = 2"},
  {s:"Despejar exponentes",t:"Con la misma base se igualan los exponentes; si no, se toman logaritmos.",ex:"2^(x+1) = 32 → x = 4"}]}
});

Object.assign(EXPLORE,{
lExpo(host){let a=2,C=1,cmp=false;
  host.innerHTML=`<div class="xp"><div class="ctrl"><label for="ea2">Base a = <output class="m" id="eao2">2</output></label><input type="range" id="ea2" min="2" max="30" value="20"><label for="ec2">Cantidad inicial C = <output class="m" id="eco2">1</output></label><input type="range" id="ec2" min="1" max="5" value="1"><button class="btn sm" id="ecmp">Comparar con x²</button></div>
   <div class="svgwrap" id="esvg2"></div><div id="etab2" style="overflow-x:auto"></div><div class="readout" id="err2"></div></div>`;
  const draw=()=>{const f=x=>C*Math.pow(a,x),ymax=Math.max(8,Math.min(60,f(4)*1.1));
    $("#esvg2",host).innerHTML=plot({xmin:-3,xmax:4,ymin:-1,ymax,w:560,h:320,fns:[{f,color:"var(--l-rec)"},...(cmp?[{f:x=>x*x,color:"var(--l-alg)",dash:"6 4"}]:[])],pts:[{x:0,y:C,color:"var(--l-rec)",label:`(0, ${C})`}],aria:"Gráfica de la exponencial"});
    const xs=[-2,-1,0,1,2,3,4];$("#etab2",host).innerHTML=figTable(["x",...xs.map(String)],[[`${C===1?"":C+" · "}${decs(a,1)}ˣ`,...xs.map(x=>decs(f(x),3))],["paso","—",...xs.slice(1).map(()=>"× "+decs(a,1))],...(cmp?[["x²",...xs.map(x=>String(x*x))]]:[])]);
    $("#eao2",host).textContent=decs(a,1);$("#eco2",host).textContent=C;$("#ecmp",host).textContent=cmp?"Quitar x²":"Comparar con x²";
    $("#err2",host).innerHTML=`<span class="k">Fórmula</span>y = ${C===1?"":C+" · "}${decs(a,1)}<sup>x</sup><br><span class="k">Comportamiento</span>${a>1?"crece: cada paso multiplica por más de 1":a<1?"decrece: cada paso multiplica por menos de 1, pero nunca llega a 0":"es constante: multiplicar por 1 no cambia nada"}<br><span class="k">Corte con el eje y</span>en x = 0 vale ${C}, porque ${decs(a,1)}<sup>0</sup> = 1`+(cmp?`<br><span class="k">Comparación</span>${a>1.5?"cerca de 0 la parábola x² puede ir por encima, pero a la larga la exponencial la supera":"con una base tan pequeña la exponencial apenas crece"}`:"")};
  $("#ea2",host).oninput=e=>{a=+e.target.value/10;draw()};$("#ec2",host).oninput=e=>{C=+e.target.value;draw()};$("#ecmp",host).onclick=()=>{cmp=!cmp;draw()};
  $("#ea2",host).min=3;draw()},

lLog(host){let b=2,k=3;
  host.innerHTML=`<div class="xp"><div class="ctrl"><span class="seg" role="group" aria-label="Base"><button class="btn sm" data-b="2">Base 2</button><button class="btn sm" data-b="3">Base 3</button><button class="btn sm" data-b="10">Base 10</button></span>
   <label for="lk2">Exponente x = <output class="m" id="lko2">3</output></label><input type="range" id="lk2" min="-6" max="8" value="6"></div>
   <div class="svgwrap" id="lsvg2"></div><div class="readout" id="lrr2"></div></div>`;
  const draw=()=>{const y=Math.pow(b,k),lim=b===10?2:b===3?3:4,M_=Math.pow(b,lim);const L=Math.min(M_,10);
    $("#lsvg2",host).innerHTML=plot({xmin:-3,xmax:L,ymin:-3,ymax:L,w:440,h:440,fns:[{f:x=>Math.pow(b,x),color:"var(--l-rec)"},{f:x=>x>0?Math.log(x)/Math.log(b):NaN,color:"var(--l-alg)",from:0.001},{f:x=>x,color:"var(--muted)",dash:"4 4",width:1.5}],
      pts:[{x:k,y,color:"var(--l-rec)",label:`(${decs(k,1)}, ${decs(y,3)})`},{x:y,y:k,color:"var(--l-alg)",label:`(${decs(y,3)}, ${decs(k,1)})`}],aria:"Exponencial y logaritmo, simétricas respecto de y = x"});
    $$("[data-b]",host).forEach(e=>e.setAttribute("aria-current",+e.dataset.b===b?"page":"false"));$("#lko2",host).textContent=decs(k,1);
    $("#lrr2",host).innerHTML=`<span class="k">Exponencial</span>${b}<sup>${decs(k,1)}</sup> = ${decs(y,4)}<br><span class="k">Logaritmo</span>log<sub>${b}</sub> ${decs(y,4)} = ${decs(k,1)}<br><span class="k">Reflejo</span>el punto (${decs(k,1)}, ${decs(y,3)}) de la exponencial se refleja en (${decs(y,3)}, ${decs(k,1)}) del logaritmo: la recta punteada y = x es el espejo`+(y<1?`<br><span class="k">Ojo</span>el número es menor que 1, así que su logaritmo es negativo`:"")};
  $$("[data-b]",host).forEach(e=>e.onclick=()=>{b=+e.dataset.b;draw()});$("#lk2",host).oninput=e=>{k=+e.target.value/2;draw()};k=3;draw()}
});
