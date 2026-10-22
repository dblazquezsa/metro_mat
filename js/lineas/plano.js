"use strict";
/* ============ Línea: La recta real · L8 El plano cartesiano y L9 Distancias en el plano ============ */

const PT=(x,y)=>`(${fmt(x)}, ${fmt(y)})`;
const quad=(x,y)=>x===0||y===0?0:x>0?(y>0?1:4):(y>0?2:3);
const QN=["sobre un eje","I","II","III","IV"];
const SQRT=n=>{const r=Math.round(Math.sqrt(n));return r*r===n?String(r):"√"+n};
const TRIPLES=[[3,4,5],[6,8,10],[5,12,13],[8,6,10],[4,3,5],[12,5,13],[9,12,15],[12,9,15]];

/* Triángulo rectángulo con los lados rotulados (el ángulo recto abajo a la izquierda) */
function figTri(a,b,la,lb,lc){const s=Math.min(22,190/Math.max(a,b)),W=a*s,H=b*s,x0=60,y0=H+30;
  return`<svg viewBox="0 0 ${W+150} ${H+70}" role="img" aria-label="Triángulo rectángulo" style="max-width:${Math.round((W+150)*1.3)}px">
   <polygon points="${x0},${y0} ${x0+W},${y0} ${x0},${y0-H}" fill="color-mix(in srgb,var(--linec) 14%,var(--surface))" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
   <path d="M${x0} ${y0-14} h14 v14" fill="none" stroke="var(--ink)" stroke-width="1.6"/>
   ${T_(x0+W/2,y0+22,la,"700 15px var(--f-mono)")}${T_(x0-22,y0-H/2+5,lb,"700 15px var(--f-mono)")}${T_(x0+W/2+18,y0-H/2-6,lc,"700 15px var(--f-mono)")}</svg>`}

Object.assign(NODES,{
L8:{title:"El plano cartesiano",sub:"Dos rectas numéricas para ubicar cualquier punto.",
 info:`<p class="lead">Para ubicar puntos en un plano se usan dos rectas numéricas perpendiculares: el <b>eje x</b>, horizontal, y el <b>eje y</b>, vertical. Se cortan en el <b>origen</b>, O = (0, 0).</p>
 <div class="ex-box"><span class="eyebrow">Coordenadas</span><p>Cada punto se nombra con un <b>par ordenado</b> (x, y). La primera coordenada dice cuánto moverse en horizontal desde el origen; la segunda, cuánto en vertical.</p>
 <p>Para llegar a (3, −2): 3 pasos a la derecha y 2 hacia abajo. Para llegar a (−4, 1): 4 a la izquierda y 1 hacia arriba.</p>
 <div class="exfig">${plot({xmin:-5,xmax:5,ymin:-4,ymax:4,w:420,equal:true,xstep:1,ystep:1,axes:true,segs:[{x1:0,y1:0,x2:3,y2:0,color:"var(--l-rec)",dash:"5 4"},{x1:3,y1:0,x2:3,y2:-2,color:"var(--l-rec)",dash:"5 4"},{x1:0,y1:0,x2:-4,y2:0,color:"var(--l-ent)",dash:"5 4"},{x1:-4,y1:0,x2:-4,y2:1,color:"var(--l-ent)",dash:"5 4"}],
   pts:[{x:3,y:-2,color:"var(--l-rec)",label:"(3, −2)"},{x:-4,y:1,color:"var(--l-ent)",label:"(−4, 1)",dx:-14},{x:0,y:0,r:4,label:"O",dx:-16,dy:-16}],aria:"Los puntos (3, −2) y (−4, 1) en el plano"})}</div></div>
 <div class="callout"><span class="eyebrow">El orden importa</span><p>(2, 5) y (5, 2) son puntos distintos: por eso se llama par <b>ordenado</b>. Primero va siempre la x (horizontal) y después la y (vertical).</p></div>
 <div class="ex-box"><span class="eyebrow">Los cuatro cuadrantes</span><p>Los ejes dividen el plano en cuatro cuadrantes, numerados en sentido contrario a las agujas del reloj. Los signos de las coordenadas dicen en cuál está un punto:</p>
 ${figTable(["Cuadrante","I","II","III","IV"],[["Signo de x","+","−","−","+"],["Signo de y","+","+","−","−"]])}
 <p>Un punto con una coordenada igual a 0 está sobre un eje y no pertenece a ningún cuadrante: (0, 4) está en el eje y; (−2, 0), en el eje x.</p></div>
 <div class="ex-box"><span class="eyebrow">Simetrías</span><p>Cambiar el signo de una coordenada refleja el punto. El reflejo de (a, b) en el eje x es (a, −b); en el eje y, (−a, b); y respecto del origen, (−a, −b).</p></div>`,
 explore:{intro:"Arrastra el punto por el plano y mira cómo cambian sus coordenadas y su cuadrante. Activa los reflejos y prueba el reto rápido.",fn:"lPlano"},
 key:"Un punto del plano es un par ordenado (x, y): primero el desplazamiento horizontal, después el vertical. Los signos de x e y dicen el cuadrante.",
 ojo:"(a, b) y (b, a) no son el mismo punto: primero va la x. Y un punto con una coordenada 0 está sobre un eje, no en un cuadrante."},

L9:{title:"Distancias en el plano",sub:"El teorema de Pitágoras mide en diagonal.",
 info:`<p class="lead">En un triángulo rectángulo, el lado opuesto al ángulo recto se llama <b>hipotenusa</b> y los otros dos, <b>catetos</b>. El <b>teorema de Pitágoras</b> dice que el cuadrado de la hipotenusa es la suma de los cuadrados de los catetos: ${M(`${P("a",2)} + ${P("b",2)} = ${P("c",2)}`)}.</p>
 <div class="ex-box"><span class="eyebrow">Ejemplos</span><div class="exfig">${figTri(4,3,"4","3","c")}</div>
 <p>Con catetos 3 y 4: ${P("c",2)} = 9 + 16 = 25, así que c = 5.</p>
 <p>Si la hipotenusa mide 13 y un cateto 5: ${P("b",2)} = 169 − 25 = 144, así que b = 12.</p></div>
 <div class="ex-box"><span class="eyebrow">Distancia entre dos puntos</span><p>Entre P = (1, 2) y Q = (7, 10) se forma un triángulo rectángulo: el cateto horizontal mide 7 − 1 = 6 y el vertical 10 − 2 = 8. La distancia es la hipotenusa: ${M("d = √(36 + 64) = √100 = 10")}.</p>
 <div class="exfig">${plot({xmin:-1,xmax:9,ymin:-1,ymax:11,w:330,equal:true,xstep:1,ystep:1,axes:true,polys:[{pts:[[1,2],[7,2],[7,10]],fill:"color-mix(in srgb,var(--l-rec) 14%,transparent)",color:"var(--l-rec)",width:2}],segs:[{x1:1,y1:2,x2:7,y2:10,color:"var(--l-rec)",width:3.5}],
   pts:[{x:1,y:2,label:"P",dx:-16},{x:7,y:10,label:"Q",dx:-18},{x:7,y:2,r:3}],labels:[{x:3.6,y:1.2,text:"6"},{x:7.3,y:5.6,text:"8"},{x:3,y:7,text:"d = 10",color:"var(--l-rec)"}],aria:"Distancia entre P y Q con el triángulo rectángulo"})}</div>
 <p>En general: ${M("d = √((x₂ − x₁)² + (y₂ − y₁)²)")}.</p></div>
 <div class="callout"><span class="eyebrow">Dos cuidados</span><p>El orden de la resta no importa, porque se eleva al cuadrado: ${P("(−6)",2)} = ${P(6,2)} = 36. Y la distancia no es la suma de los catetos: 6 + 8 = 14 es el camino por la cuadrícula; el camino recto mide 10.</p></div>
 <div class="ex-box"><span class="eyebrow">Distancias que no son enteras</span><p>De (0, 0) a (2, 3): ${M("d = √(4 + 9) = √13 ≈ 3,61")}. Si se pide el valor exacto, se deja como raíz: √13.</p></div>`,
 explore:{intro:"Arrastra los puntos P y Q. El triángulo rectángulo muestra los catetos y la distancia. Prueba las ternas pitagóricas: dan distancias enteras.",fn:"lDist"},
 key:"La distancia entre dos puntos es la hipotenusa del triángulo cuyos catetos son las diferencias de las coordenadas: d = √(Δx² + Δy²).",
 ojo:"No sumes los catetos ni olvides la raíz: con catetos 6 y 8, la distancia es √(36 + 64) = 10, no 14 ni 100."}
});

Object.assign(RETO,{
L8:[
 R=>{let a,b;do{a=R.nz(-5,5);b=R.nz(-5,5)}while(Math.abs(a)===Math.abs(b));
  return{type:"grid",xmin:-6,xmax:6,ymin:-6,ymax:6,answer:[[a,b]],show:PT(a,b),q:`Marca en el plano el punto ${M(PT(a,b))}.`,hint:"Desde el origen, muévete primero en horizontal (la x) y después en vertical (la y).",
   why:p=>p[0][0]===b&&p[0][1]===a?"Cambiaste el orden de las coordenadas: primero va la x, que es el movimiento horizontal.":p[0][0]===-a||p[0][1]===-b?"Revisa los signos: x negativa es hacia la izquierda; y negativa, hacia abajo.":"",
   explain:`Desde el origen: ${Math.abs(a)} ${a>0?"a la derecha":"a la izquierda"} y ${Math.abs(b)} ${b>0?"hacia arriba":"hacia abajo"}.`}},
 R=>{const axis=R.f()<.25;let x=R.nz(-9,9),y=R.nz(-9,9);if(axis){if(R.f()<.5)x=0;else y=0}const q=quad(x,y);
  const opts=[1,2,3,4,0].map(k=>k?`Cuadrante ${QN[k]}`:"Sobre un eje: en ningún cuadrante");const right=opts[q===0?4:q-1];
  return{type:"choice",q:`¿Dónde está el punto ${M(PT(x,y))}?`,opts:[right,...opts.filter(o=>o!==right)],hint:"Mira el signo de cada coordenada. Si alguna es 0, el punto está sobre un eje.",
   explain:q?`x es ${x>0?"positiva":"negativa"} e y es ${y>0?"positiva":"negativa"}: cuadrante ${QN[q]}.`:`Una de sus coordenadas es 0, así que está sobre el eje ${x===0?"y":"x"}.`}},
 R=>{const items=[],seen=new Set();let tries=0;
  while(items.length<7&&tries++<200){let x=R.nz(-8,8),y=R.nz(-8,8);if(items.length&&R.f()<.4){const [px,py]=items[items.length-1].p;[x,y]=R.p([[py,px],[-px,py],[px,-py]])}
   const k=x+","+y;if(seen.has(k)||x===0||y===0)continue;seen.add(k);items.push({t:PT(x,y),bin:quad(x,y)-1,p:[x,y]})}
  if(new Set(items.map(i=>i.bin)).size<4)return RETO.L8[2](R);
  return{type:"bins",q:"Arrastra cada punto al cuadrante en el que está.",bins:["Cuadrante I","Cuadrante II","Cuadrante III","Cuadrante IV"],items:items.map(({t,bin})=>({t,bin})),hint:"Cuadrante I: (+, +). II: (−, +). III: (−, −). IV: (+, −).",
   explain:"Lo que decide el cuadrante es el signo de cada coordenada, en orden: primero el de x, después el de y."}},
 R=>{let a,b;do{a=R.nz(-6,6);b=R.nz(-6,6)}while(Math.abs(a)===Math.abs(b));const k=R.i(0,2),ans=[[a,-b],[-a,b],[-a,-b]][k],nm=["el eje x","el eje y","el origen"][k];
  return{type:"fill",kind:"pair",answer:ans,tip:"Escribe cada coordenada del punto reflejado. Puede ser negativa.",q:`Reflejamos el punto ${M("P = "+PT(a,b))} ${k===2?"respecto del origen":"en "+nm}. ¿Cuáles son las coordenadas del punto reflejado?`,
   fig:plot({xmin:-7,xmax:7,ymin:-7,ymax:7,w:330,equal:true,xstep:1,ystep:1,axes:true,pts:[{x:a,y:b,color:"var(--l-rec)",label:"P"}],...(k===0?{hl:[{y:0,color:"var(--l-ecu)",width:3}]}:k===1?{vl:[{x:0,color:"var(--l-ecu)",width:3}]}:{}),aria:"El punto P en el plano"}),
   hint:k===0?"Al reflejar en el eje x, la x no cambia y la y cambia de signo.":k===1?"Al reflejar en el eje y, la y no cambia y la x cambia de signo.":"Respecto del origen cambian de signo las dos coordenadas.",
   explain:`El reflejo de ${PT(a,b)} ${k===2?"respecto del origen":"en "+nm} es ${PT(...ans)}.`}},
 R=>{let a,c,b,d;do{a=R.i(-5,4);c=R.i(a+2,5);b=R.i(-5,4);d=R.i(b+2,5)}while(quad(a,b)===quad(c,d));const sw=R.f()<.5;if(sw)[b,d]=[d,b];
  return{type:"grid",xmin:-6,xmax:6,ymin:-6,ymax:6,answer:[[a,d]],show:PT(a,d),given:[{x:a,y:b,label:"A",color:"var(--ink)"},{x:c,y:b,label:"B",color:"var(--ink)"},{x:c,y:d,label:"C",color:"var(--ink)"}],
   segs:[{x1:a,y1:b,x2:c,y2:b,color:"var(--muted)",dash:"5 4",width:2},{x1:c,y1:b,x2:c,y2:d,color:"var(--muted)",dash:"5 4",width:2}],reveal:{segs:[{x1:c,y1:d,x2:a,y2:d,color:"var(--ok)",width:2},{x1:a,y1:d,x2:a,y2:b,color:"var(--ok)",width:2}]},
   q:`A = ${PT(a,b)}, B = ${PT(c,b)} y C = ${PT(c,d)} son tres vértices de un rectángulo con los lados paralelos a los ejes. Marca el cuarto vértice D.`,hint:"D está en la misma vertical que A y en la misma horizontal que C.",
   explain:`D tiene la x de A (${fmt(a)}) y la y de C (${fmt(d)}): D = ${PT(a,d)}.`}}],
L9:[
 R=>{const [a,b,c]=R.p(TRIPLES),leg=R.f()<.45;
  return leg?{type:"fill",kind:"num",answer:b,q:"En este triángulo rectángulo, ¿cuánto mide el cateto que falta?",fig:figTri(a,b,String(a),"?",String(c)),hint:`La hipotenusa es ${c}: ${P("?",2)} = ${P(c,2)} − ${P(a,2)}.`,
     explain:`${P(c,2)} − ${P(a,2)} = ${c*c} − ${a*a} = ${b*b}, y √${b*b} = ${b}.`}
   :{type:"fill",kind:"num",answer:c,q:"En este triángulo rectángulo, ¿cuánto mide la hipotenusa?",fig:figTri(a,b,String(a),String(b),"?"),hint:`${P("?",2)} = ${P(a,2)} + ${P(b,2)}.`,
     explain:`${P(a,2)} + ${P(b,2)} = ${a*a} + ${b*b} = ${c*c}, y √${c*c} = ${c}.`}},
 R=>{const [a,b,c]=R.p([[3,4,5],[4,3,5],[6,8,10],[8,6,10],[5,12,13],[12,5,13]]),sx=R.p([1,-1]),sy=R.p([1,-1]),x1=R.i(-4,3),y1=R.i(-4,3),x2=x1+sx*a,y2=y1+sy*b;
  return{type:"fill",kind:"num",answer:c,q:`¿Cuál es la distancia entre ${M("P = "+PT(x1,y1))} y ${M("Q = "+PT(x2,y2))}?`,hint:`Calcula las diferencias: ${fmt(x2)} − ${fmtP(x1)} y ${fmt(y2)} − ${fmtP(y1)}. Después usa Pitágoras.`,
   explain:`Δx = ${fmt(x2-x1)} y Δy = ${fmt(y2-y1)}. d = √(${P(fmtP(x2-x1),2)} + ${P(fmtP(y2-y1),2)}) = √${c*c} = ${c}.`}},
 R=>{let dx,dy;do{dx=R.i(1,5);dy=R.i(1,5)}while(Number.isInteger(Math.sqrt(dx*dx+dy*dy))||dx===dy);const x1=R.i(-3,3),y1=R.i(-3,3),s=dx*dx+dy*dy;
  const opts=[`√${s}`,String(dx+dy),String(s),`√${dx+dy}`].filter((v,i,a)=>a.indexOf(v)===i);
  return{type:"choice",q:`¿Cuál es la distancia exacta entre ${M(PT(x1,y1))} y ${M(PT(x1+dx,y1-dy))}?`,opts,hint:"Eleva al cuadrado cada diferencia, súmalas y saca la raíz cuadrada.",
   explain:`Δx = ${dx} y Δy = ${fmt(-dy)}. d = √(${dx*dx} + ${dy*dy}) = √${s} ≈ ${decs(Math.sqrt(s),2)}. Sumar los catetos (${dx+dy}) o no sacar la raíz (${s}) son los errores típicos.`}},
 R=>{const [k,b0]=R.p([[4,3],[3,4],[8,6],[6,8]]),b=b0*R.p([1,-1]),a=R.i(-3,3),d=Math.hypot(k,b);const lo=-10,hi=10,ans=[a+k,a-k].filter(v=>v>=lo&&v<=hi);
  let st=a;
  return{type:"slider",name:"x de Q",min:lo,max:hi,start:st,answer:ans[0],check:v=>Math.abs(v-a)===k,show:ans.map(v=>`Q = (${fmt(v)}, 0)`).join(" o "),label:v=>fmt(v),
   q:`El punto Q se mueve por el eje x. Ajústalo para que su distancia a ${M("P = "+PT(a,b))} sea exactamente ${d}.`,hint:`La altura del triángulo es ${Math.abs(b)}. ¿Qué cateto horizontal da hipotenusa ${d}?`,
   why:v=>`Ahora la distancia es √(${P(fmtP(v-a),2)} + ${P(Math.abs(b),2)}) = ${SQRT((v-a)*(v-a)+b*b)}.`,
   explain:`${P(d,2)} − ${P(Math.abs(b),2)} = ${d*d-b*b}, así que el cateto horizontal mide ${k}: Q está ${k} unidades a la izquierda o a la derecha de P (x = ${ans.map(fmt).join(" o x = ")}).`,
   render:(v,ok)=>plot({xmin:-11,xmax:11,ymin:-9,ymax:9,w:520,equal:true,xstep:2,ystep:2,axes:true,segs:[{x1:a,y1:b,x2:v,y2:0,color:ok?"var(--ok)":"var(--l-rec)",width:3},{x1:a,y1:b,x2:a,y2:0,color:"var(--muted)",dash:"4 4",width:2},{x1:a,y1:0,x2:v,y2:0,color:"var(--muted)",dash:"4 4",width:2}],
     pts:[{x:a,y:b,label:"P",color:"var(--ink)"},{x:v,y:0,label:`Q (${fmt(v)}, 0)`,color:ok?"var(--ok)":"var(--l-rec)",dy:b>0?-22:10}],aria:"P y el punto Q sobre el eje x"})}},
 R=>{const pool=R.sh([[5,0],[0,-5],[3,3],[-4,-4],[1,-6],[-6,2],[2,2],[-1,4],[4,-2],[-3,0],[0,7],[-5,5],[6,-1],[2,-7],[-4,3]]),pick=[];
  for(const p of pool){const d=p[0]*p[0]+p[1]*p[1];if(pick.length<5&&!pick.some(q=>q[0]*q[0]+q[1]*q[1]===d))pick.push(p)}
  const sorted=pick.slice().sort((p,q)=>(p[0]*p[0]+p[1]*p[1])-(q[0]*q[0]+q[1]*q[1]));
  return{type:"order",noEval:true,sep:"  →  ",q:"Ordena estos puntos del más cercano al más lejano del origen.",items:R.sh(pick.map(p=>PT(...p))),correct:sorted.map(p=>PT(...p)),hint:"Compara x² + y² de cada punto: no hace falta sacar la raíz para ordenar.",
   explain:`x² + y²: ${sorted.map(p=>`${PT(...p)} → ${p[0]*p[0]+p[1]*p[1]}`).join("; ")}. Los signos no importan, y un punto con coordenadas «grandes» puede estar más cerca que otro.`}}]
});

Object.assign(RECAP,{
L8:{map:[0,1,1,2,3],pts:[
  {s:"Coordenadas y orden",t:"Un punto es un par ordenado (x, y): primero el desplazamiento horizontal, después el vertical.",ex:"(3, −2): 3 a la derecha, 2 abajo"},
  {s:"Cuadrantes y signos",t:"Los signos de x e y dicen el cuadrante; si una coordenada es 0, el punto está sobre un eje.",ex:"(−2, 5) está en el II"},
  {s:"Simetrías",t:"Reflejar en un eje cambia el signo de la otra coordenada; respecto del origen cambian las dos.",ex:"(4, 1) → (4, −1) en el eje x"},
  {s:"Leer y ubicar figuras",t:"Los puntos en la misma vertical comparten la x; en la misma horizontal, la y.",ex:"Rectángulo: D tiene la x de A y la y de C"}]},
L9:{map:[0,1,2,1,3],pts:[
  {s:"Teorema de Pitágoras",t:"En un triángulo rectángulo, a² + b² = c², con c la hipotenusa.",ex:"3² + 4² = 5²"},
  {s:"Distancia entre dos puntos",t:"Los catetos son las diferencias de las coordenadas; la distancia es la hipotenusa.",ex:"(1, 2) y (7, 10): √(36 + 64) = 10"},
  {s:"Valores exactos",t:"Si la suma de cuadrados no es un cuadrado perfecto, la distancia exacta es una raíz.",ex:"√13 ≈ 3,61"},
  {s:"Comparar distancias",t:"Para comparar distancias basta comparar x² + y²; los signos no cuentan.",ex:"(3, 3) está más cerca que (−4, −4)"}]}
});

Object.assign(EXPLORE,{
lPlano(host){const B={xmin:-6,xmax:6,ymin:-6,ymax:6},W=460;let p=[3,2],refl={x:false,y:false,o:false},goal=null,hits=0;
  host.innerHTML=`<div class="xp"><div class="ctrl"><span class="seg" role="group" aria-label="Reflejos"><button class="btn sm" data-r="x" aria-pressed="false">Reflejo en el eje x</button><button class="btn sm" data-r="y" aria-pressed="false">Reflejo en el eje y</button><button class="btn sm" data-r="o" aria-pressed="false">Respecto del origen</button></span><button class="btn sm" id="pgo">Reto rápido</button></div>
   <div class="svgwrap gridpick" id="psvg" tabindex="0" aria-label="Plano: arrastra el punto o muévelo con las flechas"></div><div class="readout" id="prr"></div></div>`;
  const wrap=$("#psvg",host);
  const draw=()=>{const [x,y]=p,q=quad(x,y),G=[];if(refl.x)G.push({x,y:-y,color:"var(--l-ent)",label:"("+fmt(x)+", "+fmt(-y)+")",open:true});if(refl.y)G.push({x:-x,y,color:"var(--l-rac)",label:"("+fmt(-x)+", "+fmt(y)+")",open:true});if(refl.o)G.push({x:-x,y:-y,color:"var(--l-alg)",label:"("+fmt(-x)+", "+fmt(-y)+")",open:true});
    const lbl=[[3,3,"I"],[-3,3,"II"],[-3,-3,"III"],[3,-3,"IV"]].map(([a,b,t])=>({x:a-.25,y:b,text:t,color:"var(--muted)"}));
    wrap.innerHTML=plot({...B,w:W,equal:true,xstep:1,ystep:1,axes:true,labels:lbl,segs:[{x1:0,y1:0,x2:x,y2:0,color:"var(--l-rec)",dash:"5 4",width:2},{x1:x,y1:0,x2:x,y2:y,color:"var(--l-rec)",dash:"5 4",width:2}],
      pts:[...(goal?[{x:goal[0],y:goal[1],open:true,color:"var(--l-ecu)",r:9}]:[]),...G,{x,y,color:"var(--l-rec)",r:8,label:PT(x,y)}],aria:"Plano cartesiano con un punto que se puede mover"});
    const sx=x>0?"positiva (a la derecha)":x<0?"negativa (a la izquierda)":"cero",sy=y>0?"positiva (hacia arriba)":y<0?"negativa (hacia abajo)":"cero";
    $("#prr",host).innerHTML=`<span class="k">Punto</span>${PT(x,y)}<br><span class="k">x</span>${sx}<br><span class="k">y</span>${sy}<br><span class="k">Dónde está</span>${q?"cuadrante "+QN[q]:x===0&&y===0?"es el origen":"sobre el eje "+(x===0?"y":"x")+": en ningún cuadrante"}`+
      (goal?`<br><span class="k">Reto</span>${goal[0]===x&&goal[1]===y?`¡Llegaste a ${PT(...goal)}! Pulsa «Reto rápido» para otro (${hits} logrados).`:`lleva el punto al círculo rojo y comprueba que es ${PT(...goal)}`}`:"")};
  const set=q=>{p=q;if(goal&&q[0]===goal[0]&&q[1]===goal[1]&&!goal.hit){goal.hit=true;hits++}draw()};
  gridPointer(wrap,B,W,q=>set(q));
  wrap.addEventListener("keydown",e=>{const d={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,1],ArrowDown:[0,-1]}[e.key];if(!d)return;e.preventDefault();set([Math.max(-6,Math.min(6,p[0]+d[0])),Math.max(-6,Math.min(6,p[1]+d[1]))])});
  $$("[data-r]",host).forEach(b=>b.onclick=()=>{refl[b.dataset.r]=!refl[b.dataset.r];b.setAttribute("aria-pressed",refl[b.dataset.r]);draw()});
  $("#pgo",host).onclick=()=>{let g;do{g=[Math.floor(Math.random()*11)-5,Math.floor(Math.random()*11)-5]}while(quad(...g)===0||(g[0]===p[0]&&g[1]===p[1]));goal=g;draw()};
  draw()},

lDist(host){const B={xmin:-2,xmax:12,ymin:-2,ymax:10},W=520;let P_=[1,1],Q_=[5,4],drag=null;
  host.innerHTML=`<div class="xp"><div class="ctrl"><span class="seg" role="group" aria-label="Ternas pitagóricas"><button class="btn sm" data-t="3,4">Terna 3, 4, 5</button><button class="btn sm" data-t="6,8">Terna 6, 8, 10</button><button class="btn sm" data-t="12,5">Terna 5, 12, 13</button><button class="btn sm" data-t="2,3">Catetos 2 y 3</button></span></div>
   <div class="svgwrap gridpick" id="dsvg" aria-label="Plano con los puntos P y Q"></div><div class="readout" id="drr"></div></div>`;
  const wrap=$("#dsvg",host);
  const draw=()=>{const [x1,y1]=P_,[x2,y2]=Q_,dx=x2-x1,dy=y2-y1,s=dx*dx+dy*dy;
    wrap.innerHTML=plot({...B,w:W,equal:true,xstep:1,ystep:1,axes:true,polys:dx&&dy?[{pts:[[x1,y1],[x2,y1],[x2,y2]],fill:"color-mix(in srgb,var(--l-rec) 14%,transparent)",color:"var(--muted)",width:2,dash:"5 4"}]:[],
      segs:[{x1,y1,x2,y2,color:"var(--l-rec)",width:3.5}],labels:[...(dx?[{x:(x1+x2)/2-.3,y:y1+(dy>0?-.7:.4),text:"Δx = "+fmt(dx)}]:[]),...(dy?[{x:x2+.25,y:(y1+y2)/2,text:"Δy = "+fmt(dy)}]:[])],
      pts:[{x:x1,y:y1,label:"P "+PT(x1,y1),color:"var(--ink)",dx:-10,dy:-20},{x:x2,y:y2,label:"Q "+PT(x2,y2),color:"var(--l-rec)"}],aria:"Distancia entre P y Q"});
    $("#drr",host).innerHTML=`<span class="k">Catetos</span>Δx = ${fmt(x2)} − ${fmtP(x1)} = ${fmt(dx)}; Δy = ${fmt(y2)} − ${fmtP(y1)} = ${fmt(dy)}<br><span class="k">Pitágoras</span>d² = ${P(fmtP(dx),2)} + ${P(fmtP(dy),2)} = ${dx*dx} + ${dy*dy} = ${s}<br><span class="k">Distancia</span>d = ${SQRT(s)}${Number.isInteger(Math.sqrt(s))?" (exacta)":" ≈ "+decs(Math.sqrt(s),2)}<br><span class="k">Por la cuadrícula</span>${Math.abs(dx)+Math.abs(dy)}: siempre más que la distancia en línea recta${dx&&dy?"":", salvo cuando los puntos están en la misma horizontal o vertical"}`};
  gridPointer(wrap,B,W,(q,ph)=>{if(ph==="down")drag=Math.hypot(q[0]-P_[0],q[1]-P_[1])<Math.hypot(q[0]-Q_[0],q[1]-Q_[1])?"P":"Q";if(drag==="P")P_=q;else Q_=q;draw()});
  $$("[data-t]",host).forEach(b=>b.onclick=()=>{const [a,c]=b.dataset.t.split(",").map(Number);P_=[0,0];Q_=[a,c];if(a===12)P_=[-1,0],Q_=[11,5];draw()});
  draw()}
});
