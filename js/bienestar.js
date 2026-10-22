"use strict";
/* ============ Línea: Bienestar y aprendizaje (B1–B4) ============ */
const BIE_IDS=["B1","B2","B3","B4"];
const SOCIO={
B1:{title:"Creencias sobre las matemáticas",sub:"Qué crees que son las matemáticas y qué hace falta para aprenderlas.",
 intro:"Todas las personas tenemos ideas sobre qué son las matemáticas y qué hace falta para aprenderlas. Muchas vienen del colegio y casi nunca las revisamos, pero influyen en cómo estudiamos: en cuánto tiempo le damos a un problema, en qué hacemos con un error y en si nos preguntamos por qué funciona algo.",
 items:[
  {t:"Las matemáticas son sobre todo memorizar fórmulas y procedimientos.",rev:true,note:"Si las matemáticas fueran solo memoria, olvidar una fórmula sería quedarse sin salida. Entender de dónde sale una regla permite reconstruirla cuando se olvida."},
  {t:"Entender por qué funciona un procedimiento es tan importante como llegar al resultado.",note:"Cuando solo importa el resultado, los errores se repiten sin que sepamos por qué. Preguntarte «¿por qué funciona?» es una inversión que se recupera rápido."},
  {t:"Si un problema no me sale en pocos minutos, es que no lo voy a poder resolver.",rev:true,note:"Los problemas que vale la pena resolver suelen tomar tiempo. Atascarse es parte del trabajo matemático, no una señal de que no puedes."},
  {t:"Hay varias formas válidas de resolver un mismo problema.",note:"Buscar otro camino es una de las mejores maneras de salir de un bloqueo. Casi nunca hay una única forma correcta."},
  {t:"Equivocarse en matemáticas es una pérdida de tiempo.",rev:true,note:"Un error bien analizado muestra exactamente qué parte del razonamiento hay que ajustar. Es información, no tiempo perdido."},
  {t:"Lo que aprendo en matemáticas me sirve para pensar mejor, no solo para pasar exámenes.",note:"Ver para qué sirve lo que aprendes ayuda a sostener el esfuerzo cuando un tema se pone difícil."}],
 fb:{hi:"Ves las matemáticas como algo que se entiende y se construye, no solo como fórmulas que hay que recordar. Esa idea te ayuda a sostenerte cuando un tema se pone difícil.",
     mid:"Conviven en ti dos ideas: que las matemáticas se entienden y que se memorizan. Es muy común. Lo que suele inclinar la balanza son las experiencias de entender de verdad un tema: cada estación de MetroMat empieza explicando el porqué, aprovéchalo.",
     lo:"Es probable que hayas vivido las matemáticas como una lista de reglas que hay que recordar y aplicar rápido. No es tu culpa: muchas veces se enseñan así. Te proponemos verlas de otra forma, como un lugar donde las reglas tienen razones y donde atascarse un rato es parte normal del trabajo."},
 why:"Las creencias funcionan como un filtro. Quien cree que las matemáticas son memorizar busca la fórmula ante un problema nuevo y, si no la recuerda, abandona. Quien cree que se trata de entender intenta relacionar el problema con lo que ya sabe. La investigación en educación matemática ha encontrado que estas creencias se relacionan con la persistencia y con la forma de estudiar.",
 todo:{hi:["Cuando entiendas algo, explícalo con tus palabras: es la mejor prueba de que lo entendiste.","Busca una segunda forma de resolver algún reto que ya hiciste.","Elige un problema que te parezca difícil y dale tiempo, sin prisa por la respuesta."],
   mid:["En cada estación, lee la explicación antes de ir a los ejercicios y pregúntate por qué funciona cada paso.","Cuando te atasques, date 10 minutos más antes de mirar la solución.","Después de un error, escribe en una línea qué parte del razonamiento falló."],
   lo:["Empieza por la estación «Sumando y restando» y fíjate en por qué funciona cada regla, no solo en cómo se usa.","Cuando no recuerdes una regla, intenta reconstruirla con un ejemplo de números pequeños.","Cambia la pregunta «¿cuál es la fórmula?» por «¿qué está pasando en este problema?»."]},
 ask:"¿Qué experiencia con las matemáticas en el colegio crees que más marcó tu forma de verlas?"},

B2:{title:"Cómo me veo como estudiante",sub:"Tu confianza para aprender matemáticas y cómo interpretas tus resultados.",
 intro:"El autoconcepto es la imagen que tienes de ti como estudiante de matemáticas: si te ves capaz, si crees que tu esfuerzo cuenta, cómo te comparas con otras personas. Esa imagen se forma con años de notas y comentarios, y puede cambiar.",
 items:[
  {t:"Me considero capaz de aprender matemáticas si les dedico tiempo.",note:"Tu capacidad no está fijada. La forma en que aprendes cambia con la práctica y con buenas estrategias."},
  {t:"Hay gente que nace con cabeza para las matemáticas y yo no soy una de ellas.",rev:true,note:"La idea de que hay que nacer con talento para las matemáticas está muy extendida, pero el dominio de las matemáticas se construye sobre todo con práctica y con buena enseñanza."},
  {t:"Cuando entiendo un tema, siento que lo logré por mi propio esfuerzo.",note:"Si atribuyes tus logros a la suerte o a que «era fácil», te pierdes la evidencia de lo que sí puedes hacer."},
  {t:"Si saco una mala nota en matemáticas, pienso que no sirvo para esto.",rev:true,note:"Una nota describe un momento, no a una persona. Mira qué parte del examen salió mal y qué se puede ajustar para la próxima vez."},
  {t:"Puedo explicarle a otra persona algo de matemáticas que ya entendí.",note:"Explicar es una forma de aprender. Si te cuesta, practícalo en voz alta o con alguien de confianza."},
  {t:"Cuando me comparo con mis compañeros, siento que voy por detrás.",rev:true,note:"Cada persona llega a la universidad con una trayectoria distinta. Compárate con quien eras hace un mes, no con quien está a tu lado."}],
 fb:{hi:"Confías en tu capacidad de aprender matemáticas y reconoces tu esfuerzo. Esa confianza es una de las cosas que más ayudan a persistir cuando algo cuesta.",
     mid:"Tu confianza depende del tema o del momento. Es normal. Lleva la cuenta de lo que logras: cada reto superado en MetroMat es evidencia de que sí aprendes.",
     lo:"Hoy no te ves con mucha capacidad para las matemáticas, y probablemente tienes razones para sentirlo así. Pero esa imagen se formó con experiencias pasadas y puede cambiar con experiencias nuevas. Empieza por estaciones cortas y date crédito por cada paso."},
 why:"Quien cree que su capacidad puede crecer suele persistir más ante las dificultades e interpreta los errores como información. Quien cree que «no sirve» tiende a evitar los retos, y así tiene menos oportunidades de comprobar que sí puede. Por eso el autoconcepto no es solo un sentimiento: cambia lo que hacemos.",
 todo:{hi:["Ponte retos un poco más difíciles que los que ya dominas.","Ofrece ayuda a algún compañero: explicar consolida lo que sabes.","Cuando algo te salga bien, fíjate en qué hiciste para lograrlo."],
   mid:["Al terminar cada estación, escribe una cosa que ahora sabes y antes no.","Cuando pienses «no soy bueno en esto», añade «todavía».","Compara tu avance con el tuyo de la semana pasada, no con el de otros."],
   lo:["Empieza por estaciones cortas y celebra cada una que completes.","Guarda una lista de los retos que lograste y léela cuando dudes de ti.","Habla con alguien de confianza sobre lo que te cuesta (un compañero, un monitor o el servicio de bienestar de tu universidad): pedir ayuda es una estrategia, no una debilidad."]},
 ask:"¿Qué tema de matemáticas lograste entender alguna vez aunque al principio te costara? ¿Qué hiciste para lograrlo?"},

B3:{title:"Cómo organizo mi estudio",sub:"Planear, supervisar y ajustar tu forma de aprender.",
 intro:"Autorregular el aprendizaje es dirigir tu propio estudio: decidir qué quieres lograr, darte cuenta de si vas por buen camino y ajustar lo que no funciona. En el colegio mucho de esto lo hacían los profesores; en la universidad depende más de ti.",
 items:[
  {t:"Antes de estudiar, decido qué quiero lograr en esa sesión.",note:"Sin una meta concreta es difícil saber si la sesión sirvió. Prueba con metas pequeñas, como «terminar una estación»."},
  {t:"Mientras resuelvo un ejercicio, me detengo a comprobar si lo que hago tiene sentido.",note:"Comprobar con un número o estimar el resultado evita llegar al final con un error arrastrado desde el principio."},
  {t:"Cuando me equivoco, busco en qué paso estuvo el error.",note:"Mirar solo la respuesta correcta enseña poco. Encontrar el paso donde te desviaste enseña mucho más."},
  {t:"Suelo dejar el estudio de matemáticas para el último momento.",rev:true,note:"Estudiar todo la noche anterior cansa y se olvida rápido. Repartir el estudio en varios días funciona mejor."},
  {t:"Si una forma de estudiar no me funciona, pruebo otra.",note:"Repetir lo mismo esperando otro resultado agota. Cambiar de estrategia es parte de aprender a aprender."},
  {t:"Cuando me distraigo estudiando, me cuesta retomar.",rev:true,note:"Las distracciones son normales. Ayuda estudiar en bloques cortos, con el celular lejos y una pausa planeada."}],
 parts:[{name:"Planear",idx:[0,3]},{name:"Supervisar",idx:[1,5]},{name:"Evaluar y ajustar",idx:[2,4]}],
 fb:{hi:"Diriges tu estudio: planeas, revisas lo que haces y ajustas cuando algo no funciona. Son las habilidades que más pesan en la universidad.",
     mid:"Tienes algunas buenas prácticas de estudio y otras que todavía puedes fortalecer. Mira en qué fase del estudio estás más fuerte y en cuál menos.",
     lo:"Organizar el estudio es una habilidad que se aprende, como cualquier otra. Empieza por una sola práctica: sesiones cortas con una meta clara y una revisión de los errores al final funcionan mejor que una sesión larga la noche antes."},
 why:"Muchos estudiantes que tenían buenos resultados en el colegio tropiezan en la universidad, no por falta de capacidad, sino porque nadie les enseñó a organizar su estudio. Planear, supervisar y evaluar forman un ciclo: cada vuelta te permite estudiar mejor la siguiente vez.",
 todo:{hi:["Revisa tu plan cada domingo: qué funcionó y qué cambiar.","Prueba estudiar explicando en voz alta, como si dieras clase.","Ayuda a un compañero a armar su propio plan."],
   mid:["Antes de cada sesión, escribe en una línea qué quieres lograr.","Al terminar un reto, compara tu respuesta con la explicación aunque hayas acertado.","Reparte el estudio de la semana en varios días cortos."],
   lo:["Elige dos momentos fijos a la semana, de 30 minutos, para estudiar matemáticas.","Deja el celular en otra habitación durante esos 30 minutos.","Al terminar, anota una cosa que entendiste y una duda para preguntar."]},
 plan:true,
 ask:"¿En qué momento de la semana estudias mejor, y qué lo hace posible?"},

B4:{title:"Ansiedad ante las matemáticas",sub:"Lo que sientes en el cuerpo y en la mente frente a una tarea o un examen.",anx:true,
 intro:"La ansiedad ante las matemáticas es la tensión, la preocupación o el bloqueo que algunas personas sienten frente a tareas o exámenes de matemáticas. Es muy frecuente entre quienes empiezan la universidad. No mide tu inteligencia: ocupa parte de la atención que necesitas para razonar, y por eso conviene reconocerla y trabajarla.",
 items:[
  {t:"Me pongo nervioso o nerviosa cuando tengo que resolver un ejercicio delante de otras personas.",note:"Equivocarse delante de otros se siente arriesgado. Practicar primero a solas y luego en grupos pequeños ayuda a ganar seguridad."},
  {t:"Antes de un examen de matemáticas siento tensión en el cuerpo (en el estómago, las manos o la respiración).",note:"La tensión física antes de un examen es la respuesta natural del cuerpo ante algo que importa. Respirar despacio antes de empezar la reduce."},
  {t:"Cuando veo un problema con muchos signos y cantidades Variables, me bloqueo aunque sepa hacerlo.",note:"Cuando un problema se ve muy cargado, divídelo: copia solo la primera parte y resuélvela antes de mirar el resto."},
  {t:"En general, pienso en las matemáticas con tranquilidad.",rev:true,note:"Si las matemáticas te intranquilizan en general, vale la pena hablarlo con alguien: ponerle nombre a lo que pasa ya lo hace más manejable."},
  {t:"Durante un examen, me cuesta pensar porque me preocupa sacar mala nota.",note:"Escribir durante dos minutos lo que te preocupa justo antes de un examen libera la mente para pensar en el problema."},
  {t:"Evito las clases o las tareas de matemáticas siempre que puedo.",note:"Evitar alivia en el momento, pero hace que la tensión crezca la siguiente vez. Acercarse de a poco funciona mejor."}],
 parts:[{name:"Exámenes y evaluación",idx:[1,4]},{name:"Bloqueo ante la tarea",idx:[2,5]},{name:"Frente a otras personas",idx:[0]},{name:"En general",idx:[3]}],
 fb:{lo:"Según tus respuestas, las matemáticas no te generan mucha tensión. Si algún tema o examen te pone nervioso o nerviosa más adelante, vuelve a esta estación.",
     mid:"Sientes algo de tensión en algunas situaciones de matemáticas. Es muy frecuente y se puede trabajar. Mira en qué situaciones aparece más, para empezar por ahí.",
     hi:"Las matemáticas te generan bastante tensión. No es falta de capacidad: la ansiedad ocupa parte de la atención que necesitas para razonar. Se puede trabajar, y no tienes que hacerlo solo o sola. Además de las estrategias de abajo, te recomendamos hablar con el servicio de bienestar o de acompañamiento psicológico de tu universidad, que trabaja este tema con frecuencia."},
 why:"La ansiedad y el rendimiento se alimentan entre sí: la tensión dificulta pensar, el resultado sale peor y eso aumenta la tensión la próxima vez. Romper ese ciclo no exige dejar de sentir nervios, sino tener estrategias para que no tomen el control: prepararse con tiempo, respirar, escribir lo que preocupa y acercarse a las matemáticas de a poco.",
 todo:{lo:["Sigue practicando en sesiones cortas: la confianza se mantiene con práctica.","Antes de un examen importante, repasa con tiempo para llegar con calma.","Si un compañero se pone nervioso, recuérdale que equivocarse es parte del proceso."],
   mid:["Antes de empezar un reto o un examen, respira despacio durante un minuto. Puedes probarlo aquí abajo.","Antes de un examen, escribe en dos líneas lo que te preocupa.","En los exámenes, empieza por el ejercicio que mejor sabes hacer."],
   hi:["Practica la respiración lenta de abajo antes de cada sesión de estudio, no solo antes de los exámenes.","Acércate a las matemáticas en pasos pequeños: una estación de MetroMat al día es suficiente.","Busca el servicio de bienestar o de acompañamiento psicológico de tu universidad. Pedir apoyo es una decisión sensata."]},
 breath:true,
 ask:"¿Qué situación concreta de matemáticas te genera más tensión? ¿Qué te ayudaría a vivirla de otra manera?"}
};
const LIKERT=["Nada de acuerdo","Poco","Más o menos","Bastante","Totalmente de acuerdo"];
const STRATS=["Antes de estudiar, escribir qué quiero lograr en la sesión","Cuando me equivoque, buscar en qué paso estuvo el error antes de mirar la respuesta","Estudiar en sesiones cortas (25 a 40 minutos) varios días a la semana","Respirar despacio un minuto antes de empezar un examen o un reto","Escribir en dos líneas lo que me preocupa antes de un examen","Explicarle un tema a otra persona","Pedir ayuda cuando lleve más de 20 minutos atascado o atascada","Comprobar mis resultados con un número concreto"];

/* ============ estaciones de bienestar: autodiagnóstico y retroalimentación ============ */
const freshBie=()=>({ans:{},hist:{},notes:{},plan:[],goal:""});
const dec=x=>x.toFixed(1).replace(".",",");
const fdate=t=>new Date(t).toLocaleDateString("es-CO",{day:"numeric",month:"short",year:"numeric"});
function bieScore(id){const D=SOCIO[id],A=BIE.ans[id]||{};
  const val=i=>{const v=A[i];if(!v)return null;return D.items[i].rev?6-v:v};
  const vals=D.items.map((_,i)=>val(i)).filter(v=>v!=null);const m=vals.length?sum(vals)/vals.length:0;
  const band=D.anx?(m>=3.7?"hi":m<=2.3?"lo":"mid"):(m>=3.7?"hi":m<=2.5?"lo":"mid");return{m,band,val}}
const bandName=(id,b)=>SOCIO[id].anx?{lo:"Tensión baja",mid:"Tensión moderada",hi:"Tensión alta"}[b]:{hi:"Fortaleza",mid:"En desarrollo",lo:"Para trabajar"}[b];
let breathT=null;function stopBreath(){if(breathT){clearInterval(breathT);breathT=null}}
function openSocio(id){stopBreath();const D=SOCIO[id],ns=nodeSt(id);const v=$("#view-node");
  BIE.ans[id]=BIE.ans[id]||{};const A=BIE.ans[id];
  v.innerHTML=nodeShell(id,"bie",BIE_IDS.indexOf(id)+1,D.title,D.sub);showView("node");
  const root=$(".node",v),body=$(".body",root),nav=$(".navrow",root);
  const LAB=["Antes de empezar","Autodiagnóstico","Retroalimentación"],SUB=["Lee","Responde","Revisa"];
  const allQ=()=>D.items.every((_,i)=>A[i]);
  if(!(ns.moment>=0&&ns.moment<=2))ns.moment=0;
  if(S.bie[id]&&allQ())ns.moment=2;
  const canGo=i=>i<=1||allQ();
  function go(m){stopBreath();
    if(m===2&&allQ()){if(!ns.counted){BIE.hist[id]=(BIE.hist[id]||[]).concat({at:Date.now(),m:+bieScore(id).m.toFixed(2)}).slice(-10);ns.counted=true;saveBie()}
      if(!S.bie[id]){S.bie[id]=true;ns.done=true;ns.doneAt=Date.now()}}
    ns.moment=m;ns.max=Math.max(ns.max||0,m);save();draw();root.scrollIntoView({behavior:reduceMotion?"auto":"smooth",block:"start"})}
  function draw(){const m=ns.moment;renderSteps(root,m,ns.max||0,go,canGo,LAB,SUB);body.className="body";
    if(m===0)body.innerHTML=`<p class="lead">${D.intro}</p>
      <div class="ex-box"><span class="eyebrow">Cómo funciona</span><p>Vas a leer ${D.items.length} afirmaciones y a decir cuánto se parecen a ti. Toma unos tres minutos. Después recibes una retroalimentación con lo que dicen tus respuestas, por qué importa y qué puedes hacer.</p></div>
      <div class="callout"><span class="eyebrow">Tus respuestas son privadas</span><p>Lo que respondas aquí solo lo ves tú. La administración de la plataforma únicamente ve que completaste la estación. No es un examen ni un diagnóstico clínico: es una herramienta para conocerte mejor. Puedes repetirla cuando quieras y comparar.</p></div>${RT.guest?`<p class="tip">Sin cuenta, tus respuestas no se guardan.</p>`:bieAllowed()?"":`<div class="callout"><span class="eyebrow">No se guardará</span><p>No autorizaste guardar tus respuestas de Bienestar. Puedes hacer el autodiagnóstico y leer tu retroalimentación, pero al salir se perderán. Puedes cambiarlo en <b>Mi progreso → Tus datos</b>.</p></div>`}`;
    else if(m===1){body.innerHTML=`<p class="lead">Responde con sinceridad, pensando en cómo eres ahora. No hay respuestas buenas ni malas.</p><div class="likert">${D.items.map((it,i)=>`<div class="lk" role="group" aria-label="${esc(it.t)}"><p>${esc(it.t)}</p><div class="lkopts">${LIKERT.map((l,j)=>`<button data-k="${i}" data-v="${j+1}" aria-pressed="${A[i]===j+1}">${l}</button>`).join("")}</div></div>`).join("")}</div>`;
      $$(".lkopts button",body).forEach(b=>b.onclick=()=>{A[b.dataset.k]=+b.dataset.v;ns.counted=false;$$(`[data-k="${b.dataset.k}"]`,body).forEach(x=>x.setAttribute("aria-pressed",x===b));saveBie();drawNav()})}
    else drawFeedback();
    drawNav()}
  function drawFeedback(){const sc=bieScore(id),pct=x=>Math.max(0,Math.min(100,(x-1)/4*100));const H=BIE.hist[id]||[];const prev=H.length>1?H[H.length-2]:null;
    let h=`<div class="res"><div class="resbar"><div class="track" aria-hidden="true"><i style="width:${pct(sc.m)}%"></i>${prev?`<b class="prevmark" style="left:${pct(prev.m)}%"></b>`:""}</div>
      <div class="scale" aria-hidden="true"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div></div>
      <p class="resline"><span class="bchip ${sc.band}${D.anx?" anx":""}">${bandName(id,sc.band)}</span><span class="muted">${dec(sc.m)} de 5${D.anx?" · más alto quiere decir más tensión":" · más alto quiere decir más favorable para aprender"}</span></p></div>
      <p class="lead">${D.fb[sc.band]}</p>`;
    if(prev){const d=sc.m-prev.m;h+=`<p class="muted">La vez anterior (${fdate(prev.at)}) obtuviste ${dec(prev.m)}; la marca vertical de la barra lo muestra. ${Math.abs(d)<.2?"Se mantiene parecido.":D.anx?(d<0?"Ahora sientes menos tensión.":"Ahora sientes más tensión; mira qué situaciones han cambiado."):(d>0?"Has avanzado.":"Ahora sale un poco más bajo; vale la pena mirar qué cambió.")}</p>`}
    if(D.parts){h+=`<h3>${D.anx?"En qué situaciones aparece la tensión":"Por fases del estudio"}</h3><div class="parts">${D.parts.map(p=>{const mm=sum(p.idx.map(i=>sc.val(i)))/p.idx.length;return`<div class="part"><span>${p.name}</span><span class="track" aria-hidden="true"><i style="width:${pct(mm)}%"></i></span><span class="m">${dec(mm)}</span></div>`}).join("")}</div>`;
      const ps=D.parts.map(p=>({n:p.name,m:sum(p.idx.map(i=>sc.val(i)))/p.idx.length})).sort((a,b)=>b.m-a.m);
      h+=`<p>${D.anx?`La situación que más tensión te genera es <b>${ps[0].n.toLowerCase()}</b>${ps[0].m-ps[ps.length-1].m<.5?", aunque las diferencias entre situaciones son pequeñas":""}.`:`Tu fase más fuerte es <b>${ps[0].n.toLowerCase()}</b> y la que más puedes fortalecer es <b>${ps[ps.length-1].n.toLowerCase()}</b>.`}</p>`}
    const good=[],look=[];D.items.forEach((it,i)=>{const x=sc.val(i);if(D.anx?x<=2:x>=4)good.push(i);else if(D.anx?x>=4:x<=2)look.push(i)});
    const ans=i=>`<span class="muted">Tu respuesta: ${LIKERT[A[i]-1].toLowerCase()}</span>`;
    if(look.length)h+=`<h3>${D.anx?"Lo que te genera más tensión":"Para mirar con calma"}</h3><div class="looks">${look.map(i=>`<div class="lookitem"><p>«${esc(D.items[i].t)}» ${ans(i)}</p><p>${D.items[i].note}</p></div>`).join("")}</div>`;
    if(good.length)h+=`<h3>${D.anx?"Lo que tienes a favor":"Lo que te ayuda"}</h3><ul class="plain">${good.map(i=>`<li>«${esc(D.items[i].t)}» ${ans(i)}</li>`).join("")}</ul>`;
    if(!good.length&&!look.length)h+=`<p>Tus respuestas están en un punto intermedio: ninguna afirmación destaca especialmente. Lee las estrategias de abajo y elige la que más te sirva.</p>`;
    h+=`<div class="ex-box"><span class="eyebrow">Por qué importa</span><p>${D.why}</p></div>`;
    h+=`<h3>Qué puedes hacer esta semana</h3><ul class="plain">${D.todo[sc.band].map(t=>`<li>${t}</li>`).join("")}</ul>`;
    if(D.breath)h+=`<div class="ex-box breathbox"><span class="eyebrow">Pruébalo ahora: un minuto de respiración lenta</span><p>Inhala por la nariz mientras el círculo crece (4 segundos) y suelta el aire despacio mientras se encoge (6 segundos). Seis vueltas son un minuto.</p>
      <div class="breath" id="br" aria-hidden="true"></div><p class="breathtxt" id="brt" aria-live="polite">Cuando quieras, pulsa «Empezar».</p><div class="fillrow"><button class="btn primary" id="brgo">Empezar</button><button class="btn ghost" id="brstop" hidden>Detener</button></div></div>`;
    if(D.plan)h+=`<h3>Mi plan para esta semana</h3><p>Elige hasta tres estrategias y escribe una meta concreta.</p><div class="strat">${STRATS.map((t,i)=>`<button data-i="${i}" aria-pressed="${BIE.plan.includes(i)}">${t}</button>`).join("")}</div>
      <div class="field"><label for="goal">Mi meta concreta</label><textarea id="goal" placeholder="Por ejemplo: hacer dos estaciones de la línea Enteros, el martes y el jueves después de clase.">${esc(BIE.goal||"")}</textarea></div>`;
    h+=`<div class="field"><label for="note">Para pensar: ${D.ask}</label><textarea id="note" placeholder="Si quieres, escribe aquí. Solo tú lo verás.">${esc(BIE.notes[id]||"")}</textarea></div>`;
    if(H.length>1)h+=`<h3>Tu evolución</h3><div class="hist">${H.slice(-5).map(x=>`<div class="part"><span>${fdate(x.at)}</span><span class="track" aria-hidden="true"><i style="width:${pct(x.m)}%"></i></span><span class="m">${dec(x.m)}</span></div>`).join("")}</div>`;
    h+=`<p class="muted">Esta herramienta sirve para reflexionar; no es un diagnóstico. Si en algún momento la tensión o el malestar te superan, busca a una persona de confianza o al servicio de bienestar de tu universidad.</p>`;
    body.innerHTML=h;
    let nt;const note=$("#note",body);note.oninput=()=>{BIE.notes[id]=note.value;clearTimeout(nt);nt=setTimeout(saveBie,800)};
    if(D.plan){$$(".strat button",body).forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(BIE.plan.includes(i))BIE.plan=BIE.plan.filter(x=>x!==i);else{if(BIE.plan.length>=3){toast("Elige como máximo tres: un plan corto se cumple mejor.");return}BIE.plan.push(i)}b.setAttribute("aria-pressed",BIE.plan.includes(i));saveBie()});
      let gt;$("#goal",body).oninput=e=>{BIE.goal=e.target.value;clearTimeout(gt);gt=setTimeout(saveBie,800)}}
    if(D.breath){const br=$("#br",body),txt=$("#brt",body),go=$("#brgo",body),st=$("#brstop",body);
      const end=msg=>{stopBreath();br.className="breath";txt.textContent=msg;go.hidden=false;st.hidden=true};
      go.onclick=()=>{let t=0;go.hidden=true;st.hidden=false;const tick=()=>{const c=t%10;if(t>=60){end("Listo. Fíjate en cómo está ahora tu cuerpo.");return}
          if(c===0){br.className="breath in";txt.textContent=`Inhala… (vuelta ${Math.floor(t/10)+1} de 6)`}else if(c===4){br.className="breath out";txt.textContent="Suelta el aire despacio…"}t++};tick();breathT=setInterval(tick,1000)};
      st.onclick=()=>end("Detenido. Puedes volver a empezar cuando quieras.")}}
  function drawNav(){const m=ns.moment;const k=BIE_IDS.indexOf(id),nxt=BIE_IDS[k+1];
    if(m===0)nav.innerHTML=`<button class="btn ghost" data-a="map">Volver al plano</button><button class="btn primary" data-a="next">Empezar el autodiagnóstico</button>`;
    else if(m===1)nav.innerHTML=`<button class="btn ghost" data-a="back">Anterior</button><button class="btn primary" data-a="next" ${allQ()?"":"disabled"}>${allQ()?"Ver mi retroalimentación":`Responde todas las afirmaciones (${D.items.filter((_,i)=>A[i]).length} de ${D.items.length})`}</button>`;
    else nav.innerHTML=`<button class="btn ghost" data-a="redo">Responder de nuevo</button><span class="fillrow">${nxt?`<button class="btn" data-a="nextst">Ir a «${SOCIO[nxt].title}»</button>`:""}<button class="btn primary" data-a="map">Volver al plano</button></span>`;
    $$("button",nav).forEach(b=>b.onclick=async()=>{const a=b.dataset.a;stopBreath();
      if(a==="map"){showView("map");renderMap()}else if(a==="back")go(m-1);else if(a==="next")go(m+1);
      else if(a==="redo"){for(const key in A)delete A[key];ns.counted=false;saveBie();go(1)}
      else if(a==="nextst"){showView("map");renderMap();await sleep(150);clickStation(nxt)}})}
  draw()}

