"use strict";
/* ============ Tratamiento de datos personales (Ley 1581 de 2012) ============
   Política, autorización al crear la cuenta, autorización pendiente para cuentas antiguas,
   y gestión de los propios datos en «Mi progreso» (ver, retirar Bienestar, borrar la cuenta). */

const DATA_V="2026-10-21";           // si cambias la política, cambia la fecha: se volverá a pedir la autorización
const RESP=()=>PLATAFORMA.responsable?esc(PLATAFORMA.responsable):"la administración de la plataforma";
const CONT=()=>PLATAFORMA.contacto?`<a href="mailto:${esc(PLATAFORMA.contacto)}">${esc(PLATAFORMA.contacto)}</a>`:"<b>[correo de contacto pendiente de publicar]</b>";

function policyHTML(){return`<div class="policy">
 <p><b>Política de tratamiento de datos personales de la Caja de herramientas</b> · versión del ${fdate(new Date(DATA_V+"T12:00:00").getTime())}</p>
 <h4>1. Quién trata tus datos</h4>
 <p>El responsable del tratamiento es ${RESP()} (${esc(PLATAFORMA.ciudad||"Colombia")}). Contacto para consultas, reclamos y solicitudes: ${CONT()}.
 La plataforma no tiene profesores ni grupos: solo la administración de la plataforma tiene acceso a los datos de los usuarios.</p>
 <h4>2. Qué datos se recogen</h4>
 <ul><li>Tu email, tu nombre de usuario y el color de tu avatar.</li>
 <li>Tu avance: estaciones visitadas y completadas, respuestas a los retos, estrellas, resultados de los diagnósticos y fechas de actividad.</li>
 <li>Tus respuestas a las preguntas de reflexión al final de cada estación (cómo te sentiste, si te pareció difícil, si aprendiste algo nuevo y la frase que quieras escribir).</li>
 <li>Solo si lo autorizas aparte: tus respuestas a los autodiagnósticos de la línea Bienestar (creencias, autoconcepto, organización del estudio y ansiedad ante las matemáticas), tus notas y tu historial.</li></ul>
 <p>Tu contraseña la gestiona el servicio de autenticación y nadie de la plataforma puede verla. Si entras con tu cuenta de Google, el servicio de autenticación recibe de Google tu email, tu nombre y tu foto de perfil para identificarte; la plataforma solo usa tu email.</p>
 <h4>3. Para qué se usan</h4>
 <ul><li>Guardar tu avance y mostrártelo cuando vuelvas a entrar.</li>
 <li>Mejorar las actividades a partir de resultados de conjunto (por ejemplo, qué estaciones resultan más difíciles).</li></ul>
 <p>Tus datos no se venden, no se ceden a terceros con otros fines y no se usan para calificarte. Si en el futuro se quisieran usar en una investigación, se te pedirá una autorización nueva y específica.</p>
 <h4>4. Quién puede verlos</h4>
 <p>Tú ves todos tus datos. La administración de la plataforma ve tu nombre de usuario, tu email, tu avance y tus respuestas de reflexión. Las respuestas de la línea Bienestar solo las ves tú en la plataforma: la administración únicamente sabe si completaste cada estación.</p>
 <h4>5. Datos sensibles</h4>
 <p>Las respuestas de Bienestar pueden considerarse datos sensibles porque hablan de tus emociones. Responderlas es <b>facultativo</b>: no estás obligado u obligada a hacerlo, y no autorizar que se guarden no te impide usar el resto de la plataforma.</p>
 <h4>6. Dónde se guardan</h4>
 <p>Los datos se almacenan en Firebase, un servicio de Google que actúa como encargado del tratamiento y cuyos servidores pueden estar fuera de Colombia. Al aceptar autorizas esa transmisión internacional.</p>
 <h4>7. Tus derechos</h4>
 <p>Puedes conocer, actualizar y rectificar tus datos; pedir prueba de esta autorización; ser informado u informada sobre su uso; revocar la autorización y pedir que se borren; y presentar quejas ante la Superintendencia de Industria y Comercio. En <b>Mi progreso → Tus datos</b> puedes retirar la autorización de Bienestar o borrar tu cuenta y todos tus datos en cualquier momento. Para cualquier otra solicitud escribe al contacto del punto 1.</p>
 <h4>8. Menores de edad</h4>
 <p>Si tienes menos de 18 años, necesitas la autorización de tu madre, padre o representante legal para crear una cuenta.</p>
 <h4>9. Vigencia</h4>
 <p>Tus datos se conservan mientras tengas la cuenta. Si la borras, se eliminan de la plataforma. Si esta política cambia, se te avisará y se te pedirá de nuevo la autorización.</p>
 <p class="muted">Marco legal: Ley 1581 de 2012 y Decreto 1074 de 2015 (capítulo 25, que recoge el Decreto 1377 de 2013).</p></div>`}

/* bloque que va dentro del formulario de registro y de la autorización pendiente */
function consentBlock(){return`<div class="consent"><span class="eyebrow">Tratamiento de datos personales</span>
  <div class="policybox" tabindex="0" aria-label="Política de tratamiento de datos">${policyHTML()}</div>
  <label class="chk"><input type="checkbox" id="c-main"> <span>He leído la política y <b>autorizo</b> el tratamiento de mis datos personales para las finalidades descritas, incluido su almacenamiento en servidores de Firebase. <span class="req">Obligatoria</span></span></label>
  <label class="chk"><input type="checkbox" id="c-age"> <span>Declaro que soy mayor de edad, o que tengo la autorización de mi representante legal. <span class="req">Obligatoria</span></span></label>
  <label class="chk"><input type="checkbox" id="c-bie"> <span>Autorizo que se guarden mis respuestas a los autodiagnósticos de la línea Bienestar (datos sensibles). <span class="optl">Opcional</span></span></label></div>`}
function readConsent(root){const ok=$("#c-main",root).checked&&$("#c-age",root).checked;
  return{ok,data:{v:DATA_V,at:Date.now(),bie:$("#c-bie",root).checked}}}
const CONSENT_ERR="Para crear una cuenta necesitas aceptar la política de datos y confirmar tu edad (las dos casillas obligatorias). Si prefieres no hacerlo, puedes explorar sin cuenta.";
const hasConsent=()=>!!(S.consent&&S.consent.v===DATA_V);
const bieAllowed=()=>!!(S.consent&&S.consent.bie);

function openPolicy(){const m=$("#modal");
  m.innerHTML=`<div class="dialog wide" role="dialog" aria-modal="true" aria-labelledby="pol-t"><span class="eyebrow">Datos personales</span><h2 id="pol-t">Política de tratamiento de datos</h2>${policyHTML()}<div class="dlg-actions"><button class="btn primary" id="pclose">Cerrar</button></div></div>`;
  m.hidden=false;$("#pclose",m).onclick=()=>m.hidden=true;$("#pclose",m).focus()}

/* cuentas creadas antes de la política, o cuando la política cambia */
function consentGate(){return new Promise(res=>{const v=$("#view-auth");showView("auth");
  v.innerHTML=`<div class="authwrap one"><form class="dialog" id="cg" novalidate><h2>Antes de seguir</h2>
    <p>${S.consent?"La política de tratamiento de datos cambió.":"La plataforma ahora pide una autorización expresa para tratar tus datos personales."} Léela y decide. Si no la aceptas, se cerrará tu sesión; puedes seguir usando la caja sin cuenta, o escribir al contacto de la política para que se borren tus datos.</p>
    ${consentBlock()}<p class="err" id="cgerr" aria-live="polite"></p>
    <div class="dlg-actions"><button class="btn primary" type="submit">Acepto y continúo</button><button class="btn ghost" type="button" id="cgno">No acepto, cerrar sesión</button></div></form></div>`;
  if(S.consent&&S.consent.bie)$("#c-bie",v).checked=true;
  $("#cg",v).addEventListener("submit",e=>{e.preventDefault();const c=readConsent(v);if(!c.ok){$("#cgerr",v).textContent="Marca las dos casillas obligatorias para continuar.";return}
    const hadBie=bieAllowed();S.consent=c.data;flush();if(hadBie&&!c.data.bie)dropBie();res(true)});
  $("#cgno",v).onclick=async()=>{res(false);await RT.auth.signOut()}})}

/* «Mi progreso → Tus datos» */
function dataSection(){if(RT.guest)return`<h3>Tus datos</h3><p class="muted">Sin cuenta no se guarda ningún dato tuyo. <button class="linkbtn" id="dpol">Ver la política de tratamiento de datos</button></p>`;
  const c=S.consent||{};
  return`<h3>Tus datos</h3><div class="datacard">
   <p>${c.at?`Autorizaste el tratamiento de tus datos el ${fdate(c.at)}.`:"Todavía no consta tu autorización."} <button class="linkbtn" id="dpol">Ver la política</button></p>
   <label class="chk"><input type="checkbox" id="dbie" ${c.bie?"checked":""}> <span>Guardar mis respuestas de la línea Bienestar. Si lo desmarcas, se borran las que hay guardadas.</span></label>
   <div class="fillrow"><button class="btn danger" id="ddel">Borrar mi cuenta y todos mis datos</button></div></div>`}
function bindDataSection(v){$("#dpol",v).onclick=openPolicy;if(RT.guest)return;
  $("#dbie",v).onchange=async e=>{if(e.target.checked){S.consent={...(S.consent||{v:DATA_V,at:Date.now()}),bie:true,bieAt:Date.now()};flush();saveBie();toast("Tus respuestas de Bienestar se guardarán.")}
    else{S.consent={...S.consent,bie:false,bieAt:Date.now()};flush();await dropBie();toast("Se borraron tus respuestas de Bienestar guardadas.")}};
  $("#ddel",v).onclick=openDelete}
async function dropBie(){clearTimeout(bieT);BIE=freshBie();if(RT.uid)try{await RT.db.doc("bienestar/"+RT.uid).delete()}catch(e){toast("No se pudieron borrar tus respuestas de Bienestar. Inténtalo de nuevo.")}}

function openDelete(){const m=$("#modal");
  m.innerHTML=`<form class="dialog" id="delf" role="dialog" aria-modal="true" aria-labelledby="del-t" novalidate><span class="eyebrow">Borrar la cuenta</span><h2 id="del-t">¿Seguro?</h2>
   <p>Se borrarán tu cuenta, tu nombre de usuario, tu avance, tus diagnósticos, tus reflexiones y tus respuestas de Bienestar. <b>No se puede deshacer.</b></p>
   ${isGoogleUser(RT.auth.currentUser)?`<p>Para confirmar, vuelve a elegir tu cuenta de Google en la ventana que se abrirá.</p>`:`<div class="field"><label for="dpw">Escribe tu contraseña para confirmar</label><input id="dpw" type="password" autocomplete="current-password"></div>`}
   <p class="err" id="delerr" aria-live="polite"></p>
   <div class="dlg-actions"><button class="btn danger" type="submit" id="dgo">Borrar definitivamente</button><button class="btn ghost" type="button" id="dno">Cancelar</button></div></form>`;
  m.hidden=false;$("#dno",m).onclick=()=>m.hidden=true;const pwi=$("#dpw",m);if(pwi)pwi.focus();
  $("#delf",m).addEventListener("submit",async e=>{e.preventDefault();const err=t=>$("#delerr",m).textContent=t;
    const user=RT.auth.currentUser;if(!user){err("Tu sesión se cerró. Vuelve a entrar e inténtalo de nuevo.");return}
    const g=isGoogleUser(user),pw=pwi?pwi.value:"";if(!g&&!pw){err("Escribe tu contraseña.");return}
    $("#dgo",m).disabled=true;
    try{if(g)await user.reauthenticateWithPopup(googleProvider());else await user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(RT.email,pw))}
    catch(x){err(x&&x.code==="auth/user-mismatch"?"Elige la misma cuenta de Google con la que entraste.":authMsg(x));$("#dgo",m).disabled=false;return}
    const uid=RT.uid,name=S.nombre;clearTimeout(saveT);clearTimeout(bieT);RT.uid=null;
    try{await RT.db.doc("bienestar/"+uid).delete();await RT.db.doc("progreso/"+uid).delete();if(name)await RT.db.doc("nombres/"+name).delete().catch(()=>{})}
    catch(x){RT.uid=uid;err(x&&x.code==="permission-denied"?"La plataforma todavía no permite borrar datos (falta actualizar sus reglas). Escribe al contacto de la política para pedir el borrado.":"No se pudieron borrar tus datos. "+dbMsg(x));$("#dgo",m).disabled=false;return}
    try{await user.delete()}catch(x){err("Se borraron tus datos, pero no la cuenta de acceso. "+authMsg(x));return}
    m.hidden=true;toast("Tu cuenta y tus datos se borraron.")})}
