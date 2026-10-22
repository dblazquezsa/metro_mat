"use strict";
/* ============ Retos gráficos con deslizador ============
   Un reto más en varias estaciones: el estudiante mueve un deslizador y ve el efecto en un dibujo.
   Se añaden al final de RETO[id] y su idea correspondiente al final de RECAP[id].map. */

const addReto=(id,idea,gen)=>{RETO[id].push(gen);RECAP[id].map.push(idea)};
const svgW=(w,h,inner,label,y0=0)=>`<svg viewBox="0 ${y0} ${w} ${h}" role="img" aria-label="${label}" style="max-width:${w}px">${inner}</svg>`;
const startAway=(R,min,max,ans)=>{let s;do{s=R.i(min,max)}while(Math.abs(s-ans)<2);return s};
const lineAxis=(X,y,min,max,every=1,lab=v=>fmt(v))=>{let g=`<line x1="${X(min)-12}" y1="${y}" x2="${X(max)+12}" y2="${y}" stroke="var(--rule)" stroke-width="2"/>`;
  for(let v=min;v<=max;v++)g+=`<circle cx="${X(v)}" cy="${y}" r="${v===0?4.5:2.6}" fill="${v===0?"var(--ink)":"var(--muted)"}"/>`+(v%every===0?`<text x="${X(v)}" y="${y+20}" text-anchor="middle" style="font:${v===0?"700 ":""}12px var(--f-mono);fill:var(--muted)">${lab(v)}</text>`:"");return g};

/* E1: un solo salto equivalente */
addReto("E1",1,R=>{const s=[R.nz(-12,12),R.nz(-12,12),R.nz(-9,9)],net=sum(s);if(Math.abs(net)>18||net===0)return RETO.E1[RETO.E1.length-1](R);
  const X=v=>40+(v+20)*14;
  return{type:"slider",name:"Salto",min:-20,max:20,start:startAway(R,-15,15,net),answer:net,show:(net>0?"+":"−")+Math.abs(net),label:k=>(k>0?"+":k<0?"−":"")+Math.abs(k),
    q:`Desde un punto a se hacen tres saltos: ${M(s.map(x=>(x>0?"+":"−")+Math.abs(x)).join(" "))}. Ajusta el deslizador para dar <b>un solo salto</b> que lleve al mismo sitio.`,
    hint:"Junta primero los saltos hacia la derecha, después los de la izquierda, y compara.",explain:`${s.map(sg).join("").trim()} = ${fmt(net)}: el salto equivalente es ${net>0?"+":"−"}${Math.abs(net)}.`,
    render:(k,ok)=>{let g=lineAxis(X,70,-20,20,100),p=0;s.forEach((x,i)=>{const x1=X(p),x2=X(p+x),h=24+i*16,c=x>0?"var(--ok)":"var(--bad)";g+=`<path d="M${x1} 68 Q${(x1+x2)/2} ${68-2*h} ${x2} 68" fill="none" stroke="${c}" stroke-width="2.2" opacity=".75"/>`;p+=x});
      g+=`<text x="${X(0)}" y="92" text-anchor="middle" style="font:700 14px var(--f-mono);fill:var(--ink)">a</text>`;
      const c=ok?"var(--ok)":"var(--linec)";g+=`<line x1="${X(0)}" y1="110" x2="${X(k)}" y2="110" stroke="${c}" stroke-width="5"/>`+(k?`<polygon points="${X(k)},110 ${X(k)-10*Math.sign(k)},103 ${X(k)-10*Math.sign(k)},117" fill="${c}"/>`:"")+`<text x="${X(0)}" y="134" text-anchor="middle" style="font:600 11px var(--f-disp);fill:var(--muted)">tu salto desde a</text>`;
      return svgW(660,185,g,"Tres saltos y tu salto equivalente",-40)}}});

/* E5: termómetro */
addReto("E5",0,R=>{const t1=-R.i(3,12),d=R.i(5,18),ans=t1+d;const Y=v=>200-(v+15)/30*180;
  return{type:"slider",name:"Temperatura",min:-15,max:15,start:startAway(R,-15,15,ans),answer:ans,show:fmt(ans)+" °C",label:k=>fmt(k)+" °C",
    q:`A las 6 de la mañana el termómetro marcaba ${M(fmt(t1)+" °C")}. Al mediodía la temperatura había subido ${M(d+" grados")}. Ajusta el termómetro a la temperatura del mediodía.`,
    hint:`Desde ${fmt(t1)} sube ${-t1} grados hasta el cero; ¿cuántos quedan por subir?`,explain:`${fmt(t1)} + ${d} = ${fmt(ans)} °C.`,
    render:(k,ok)=>{let g=`<rect x="140" y="12" width="22" height="200" rx="11" fill="var(--surface-2)" stroke="var(--rule)"/><circle cx="151" cy="214" r="16" fill="${ok?"var(--ok)":"var(--av-coral)"}"/>`;
      for(let v=-15;v<=15;v+=5)g+=`<line x1="128" y1="${Y(v)}" x2="140" y2="${Y(v)}" stroke="var(--muted)"/><text x="122" y="${Y(v)+4}" text-anchor="end" style="font:${v===0?"700 ":""}12px var(--f-mono);fill:var(--muted)">${fmt(v)}</text>`;
      for(let v=-15;v<=15;v++)g+=`<line x1="${v%5?134:128}" y1="${Y(v)}" x2="140" y2="${Y(v)}" stroke="var(--muted)" stroke-width=".8"/>`;
      g+=`<rect x="145" y="${Y(k)}" width="12" height="${214-Y(k)}" fill="${ok?"var(--ok)":"var(--av-coral)"}"/>`;
      g+=`<path d="M170 ${Y(t1)} h20" stroke="var(--l-ent)" stroke-width="2.5"/><text x="196" y="${Y(t1)+4}" style="font:600 12px var(--f-disp);fill:var(--l-ent)">6 a. m.</text>`;
      return svgW(300,240,g,"Termómetro")}}});

/* R4: sumar fracciones sombreando una barra */
addReto("R4",1,R=>{const [b,d]=R.p([[2,3],[3,4],[2,5],[4,6],[3,5],[4,5],[2,7],[3,8]]),L=lcm(b,d);let a,c;do{a=R.i(1,b-1);c=R.i(1,d-1)}while(a*L/b+c*L/d>=L||gcd(a,b)>1||gcd(c,d)>1);
  const ans=a*L/b+c*L/d,W=480,x0=60;
  const bar=(y,n,k,col,lab)=>{let g=`<text x="${x0-10}" y="${y+20}" text-anchor="end" style="font:700 14px var(--f-mono);fill:var(--ink)">${lab}</text>`;for(let i=0;i<n;i++)g+=`<rect x="${x0+i*W/n}" y="${y}" width="${W/n}" height="30" fill="${i<k?col:"var(--surface-2)"}" stroke="var(--surface)" stroke-width="2"/>`;return g+`<rect x="${x0}" y="${y}" width="${W}" height="30" fill="none" stroke="var(--muted)"/>`};
  return{type:"slider",name:`Partes de ${L}`,min:0,max:L,start:0,answer:ans,show:`${ans}/${L}`,label:k=>`${k}/${L}`,
    q:`Sombrea en la barra de abajo, dividida en ${L} partes iguales, la suma ${FQ(a,b)} + ${FQ(c,d)}.`,
    hint:`¿Cuántas partes de ${L} son ${frs(a,b)}? ¿Y ${frs(c,d)}?`,explain:`${frs(a,b)} = ${a*L/b}/${L} y ${frs(c,d)} = ${c*L/d}/${L}; juntas son ${ans}/${L}${gcd(ans,L)>1?` = ${frs(ans,L)}`:""}.`,
    render:(k,ok)=>svgW(560,170,bar(10,b,a,PAL[1],`${a}/${b}`)+bar(52,d,c,PAL[3],`${c}/${d}`)+bar(112,L,k,ok?"var(--ok)":"var(--l-rac)","¿?"),"Barras de fracciones")}});

/* L2: altura del rectángulo para una diagonal dada */
addReto("L2",0,R=>{const k=R.i(1,5),n=1+k*k,U=48;
  return{type:"slider",name:"Altura",min:1,max:6,start:k===1?4:1,answer:k,show:String(k),
    q:`Un rectángulo tiene base 1. Ajusta su altura para que su diagonal mida ${M("√"+n)}.`,
    hint:"Por Pitágoras, diagonal² = 1² + altura².",explain:`1² + ${k}² = ${n}, así que la diagonal mide √${n} cuando la altura es ${k}.`,
    render:(h,ok)=>{const x0=150,y0=320,c=ok?"var(--ok)":"var(--l-rec)";let g="";for(let v=0;v<=6;v++)g+=`<line x1="${x0-6}" y1="${y0-v*U}" x2="${x0}" y2="${y0-v*U}" stroke="var(--muted)"/><text x="${x0-10}" y="${y0-v*U+4}" text-anchor="end" style="font:11px var(--f-mono);fill:var(--muted)">${v}</text>`;
      g+=`<rect x="${x0}" y="${y0-h*U}" width="${U}" height="${h*U}" fill="color-mix(in srgb,var(--l-rec) 14%,var(--surface))" stroke="var(--ink)" stroke-width="1.5"/><line x1="${x0}" y1="${y0}" x2="${x0+U}" y2="${y0-h*U}" stroke="${c}" stroke-width="3.5"/><text x="${x0+U/2}" y="${y0+18}" text-anchor="middle" style="font:12px var(--f-mono);fill:var(--muted)">1</text>`;
      return svgW(360,340,g,"Rectángulo y su diagonal")}}});

/* L3: ubicar un decimal en una recta ampliada */
addReto("L3",0,R=>{const p=R.i(10,89)/10,k=R.i(1,9),val=Math.round((p+k/100)*100)/100,X=i=>40+i*58;
  return{type:"slider",name:"Posición",min:0,max:10,start:k<5?9:1,answer:k,show:decs(val,2),hideValue:true,tip:"Mueve el deslizador para llevar la flecha a su sitio y pulsa «Comprobar».",
    q:`La recta muestra el tramo entre ${M(decs(p,1))} y ${M(decs(p+0.1,1))}, ampliado. Lleva la flecha hasta ${M(decs(val,2))}.`,
    hint:"El tramo está dividido en diez partes iguales: cada una mide una centésima, 0,01.",explain:`${decs(val,2)} = ${decs(p,1)} + ${k} centésimas: está en la marca ${k} del tramo.`,
    render:(i,ok)=>{let g=`<line x1="30" y1="70" x2="630" y2="70" stroke="var(--rule)" stroke-width="2"/>`;for(let j=0;j<=10;j++)g+=`<line x1="${X(j)}" y1="${j%5?62:56}" x2="${X(j)}" y2="${j%5?78:84}" stroke="var(--muted)" stroke-width="${j%10?1.5:2.5}"/>`;
      g+=`<text x="${X(0)}" y="104" text-anchor="middle" style="font:700 13px var(--f-mono);fill:var(--ink)">${decs(p,1)}</text><text x="${X(10)}" y="104" text-anchor="middle" style="font:700 13px var(--f-mono);fill:var(--ink)">${decs(p+0.1,1)}</text>`;
      const c=ok?"var(--ok)":"var(--l-rec)";g+=`<path d="M${X(i)} 50 l-8 -14 h16 z" fill="${c}"/><line x1="${X(i)}" y1="50" x2="${X(i)}" y2="70" stroke="${c}" stroke-width="2.5"/>`;
      return svgW(660,115,g,"Recta ampliada entre dos décimas")}}});

/* L4: radio de |x − c| ≤ r para un intervalo dado */
addReto("L4",2,R=>{const c=R.i(-4,4),r=R.i(2,6),p=c-r,q2=c+r,X=v=>30+(v+10)*29;
  return{type:"slider",name:"r",min:0,max:9,start:r>4?1:8,answer:r,show:"r = "+r,label:k=>"r = "+k,
    q:`Ajusta r para que la solución de ${M(`|x ${c<0?"+":"−"} ${Math.abs(c)}| ≤ r`)} sea el intervalo ${M(`[${fmt(p)}, ${fmt(q2)}]`)}.`.replace("|x − 0|","|x|").replace("|x + 0|","|x|"),
    hint:`El intervalo está centrado en ${fmt(c)}: r es la distancia de ${fmt(c)} a cada extremo.`,explain:`De ${fmt(c)} a ${fmt(q2)} hay ${r}, y de ${fmt(p)} a ${fmt(c)} también: r = ${r}.`,
    render:(k,ok)=>{const col=ok?"var(--ok)":"var(--l-rec)",a=Math.max(-10,c-k),b=Math.min(10,c+k);let g=lineAxis(X,70,-10,10,2);
      g+=`<line x1="${X(a)}" y1="70" x2="${X(b)}" y2="70" stroke="${col}" stroke-width="8" stroke-linecap="round" opacity=".85"/>${[a,b].map(v=>`<circle cx="${X(v)}" cy="70" r="8" fill="${col}" stroke="var(--surface)" stroke-width="2"/>`).join("")}`;
      g+=`<path d="M${X(c)} 40 v18" stroke="var(--ink)" stroke-width="2"/><text x="${X(c)}" y="34" text-anchor="middle" style="font:700 12px var(--f-mono);fill:var(--ink)">c = ${fmt(c)}</text>`;
      return svgW(670,110,g,"Intervalo alrededor de c")}}});

/* A1: qué figura tiene T palillos */
addReto("A1",3,R=>{const kind=R.p(Object.keys(STICK_KINDS)),a=STICK_KINDS[kind].a,N=R.i(5,11),T=a*N+1;
  return{type:"slider",name:"Figura n",min:1,max:12,start:N>8?2:12,answer:N,show:"figura "+N,label:k=>String(k),
    q:`En esta tira de ${STICK_KINDS[kind].lab}, la figura n usa ${M(`${a}n + 1`)} palillos. Ajusta n hasta la figura que usa exactamente ${M(String(T))} palillos.`,
    hint:`Resuelve ${a}n + 1 = ${T}, o cuenta: cada figura nueva añade ${a} palillos.`,explain:`${a}n + 1 = ${T} → ${a}n = ${T-1} → n = ${N}.`,
    render:k=>`<div style="display:grid;place-items:center;min-height:90px">${stickSVG(kind,k,Math.min(30,420/k))}</div>`}});

/* A3: el lado del cuadrado de un trinomio cuadrado perfecto */
addReto("A3",0,R=>{const b=R.i(2,7),u=30,X0=40;
  return{type:"slider",name:"b",min:1,max:8,start:b>4?1:8,answer:b,show:"b = "+b,label:k=>"b = "+k,
    q:`El cuadrado de lado ${M("x + b")} tiene área ${M(`${P("x",2)} + ${2*b}x + ${b*b}`)}. Ajusta b.`,
    hint:"Los dos rectángulos juntos dan el término de en medio: 2 · b · x.",explain:`(x + ${b})² = x² + 2 · ${b} · x + ${b}² = x² + ${2*b}x + ${b*b}.`,
    render:(k,ok)=>{const xs=150,B=k*u*.55,c=ok?"var(--ok)":"var(--l-alg)",rc=(x,y,w,h,f,t)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" stroke="var(--surface)" stroke-width="2"/><text x="${x+w/2}" y="${y+h/2+5}" text-anchor="middle" style="font:700 ${Math.min(15,Math.max(10,Math.min(w,h)/3))}px var(--f-mono);fill:var(--ink)">${t}</text>`;
      let g=rc(X0,20,xs,xs,"color-mix(in srgb,var(--l-alg) 40%,var(--surface))","x²")+rc(X0+xs,20,B,xs,"color-mix(in srgb,var(--av-sol) 55%,var(--surface))",B>26?k+"x":"")+rc(X0,20+xs,xs,B,"color-mix(in srgb,var(--av-sol) 55%,var(--surface))",k+"x")+rc(X0+xs,20+xs,B,B,"color-mix(in srgb,var(--av-menta) 55%,var(--surface))",B>26?k*k:"");
      g+=`<rect x="${X0}" y="20" width="${xs+B}" height="${xs+B}" fill="none" stroke="${c}" stroke-width="3"/>`;
      return svgW(380,20+xs+8*u*.55+20,g,"Cuadrado de lado x + b")}}});

/* Q1: equilibrar la balanza */
addReto("Q1",0,R=>{const a=R.i(2,3),s=R.i(2,6),b=R.i(1,5),c=a*s+b;
  return{type:"slider",name:"Cada caja x pesa",min:1,max:9,start:s>4?1:9,answer:s,show:"x = "+s,label:k=>String(k),
    q:`En el plato izquierdo hay ${a} cajas iguales y ${b} ${b===1?"pesa":"pesas"} de 1; en el derecho, ${c} pesas de 1. Ajusta cuánto pesa cada caja para que la balanza quede en equilibrio.`,
    hint:`Escribe la ecuación ${a}x + ${b} = ${c} y quita ${b} de cada plato.`,explain:`${a}x + ${b} = ${c} → ${a}x = ${c-b} → x = ${s}.`,
    render:(k,ok)=>{const wl=a*k+b,wr=c,ang=Math.max(-12,Math.min(12,(wr-wl)*2.2)),r=ang*Math.PI/180,cx=300,cy=60,arm=190,lx=cx-arm*Math.cos(r),ly=cy-arm*Math.sin(r),rx=cx+arm*Math.cos(r),ry=cy+arm*Math.sin(r);
      const pan=(px,py,nx,nu)=>{let g=`<line x1="${px}" y1="${py}" x2="${px-80}" y2="${py+70}" stroke="var(--muted)" stroke-width="1.4"/><line x1="${px}" y1="${py}" x2="${px+80}" y2="${py+70}" stroke="var(--muted)" stroke-width="1.4"/><path d="M${px-92} ${py+70} h184 l-14 15 h-156 z" fill="color-mix(in srgb,var(--l-ecu) 12%,var(--surface))" stroke="var(--ink)" stroke-width="1.6"/>`;
        [...Array(nx).fill("x"),...Array(nu).fill("u")].forEach((t,i)=>{const col=i%10,row=Math.floor(i/10),x=px-88+col*17.8,y=py+53-row*17;g+=t==="x"?`<rect x="${x}" y="${y}" width="16" height="16" rx="3" fill="var(--l-ecu)"/><text x="${x+8}" y="${y+12}" text-anchor="middle" style="font:700 10px var(--f-mono);fill:#fff">${k}</text>`:`<circle cx="${x+8}" cy="${y+8}" r="7.3" fill="var(--av-sol)" stroke="var(--ink)" stroke-width="1"/>`});return g};
      let g=`<path d="M${cx-22} 238 L${cx} ${cy} L${cx+22} 238 Z" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.6"/><rect x="${cx-60}" y="236" width="120" height="10" rx="5" fill="var(--ink)" opacity=".8"/><line x1="${lx}" y1="${ly}" x2="${rx}" y2="${ry}" stroke="${ok?"var(--ok)":"var(--ink)"}" stroke-width="5" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="6" fill="var(--ink)"/>`;
      return svgW(600,255,g+pan(lx,ly,a,b)+pan(rx,ry,0,c),"Balanza")}}});

/* Q3: ¿cuándo tendrá el triple? */
addReto("Q3",2,R=>{const h=R.i(2,8),x=R.i(2,10),m=3*h+2*x;
  return{type:"slider",name:"Años que pasan",min:0,max:20,start:x>10?0:20,answer:x,show:x+" años",label:k=>k+" años",
    q:`Una madre tiene ${m} años y su hija ${h}. Ajusta los años que pasan hasta que la madre tenga exactamente el <b>triple</b> de la edad de su hija.`,
    hint:`Dentro de x años: ${m} + x = 3(${h} + x).`,explain:`${m} + x = ${3*h} + 3x → ${m-3*h} = 2x → x = ${x}. Tendrán ${m+x} y ${h+x} años.`,
    render:(k,ok)=>{const sc=4.4,bar=(y,v,col,lab)=>`<rect x="130" y="${y}" width="${v*sc}" height="26" rx="4" fill="${col}"/><text x="120" y="${y+18}" text-anchor="end" style="font:600 13px var(--f-disp);fill:var(--ink)">${lab}</text><text x="${136+v*sc}" y="${y+18}" style="font:700 12px var(--f-mono);fill:var(--ink)">${v}</text>`;
      return svgW(560,140,bar(12,m+k,"var(--l-ecu)","Madre")+bar(52,h+k,"var(--l-rac)","Hija")+bar(92,3*(h+k),ok?"var(--ok)":"color-mix(in srgb,var(--l-rac) 40%,var(--surface))","Triple de la hija"),"Barras de edades")}}});
