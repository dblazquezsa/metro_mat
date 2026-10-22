# Caja de herramientas: cómo publicarla en internet

## Qué hay en la carpeta

```
index.html               la página: estructura y orden de carga de los scripts
css/estilos.css          todo el diseño (colores, tipografía, plano, retos)
js/config.js             la configuración de Firebase y los datos del responsable de la plataforma
js/base.js               utilidades comunes: lector de expresiones, fracciones, azar, dibujo
js/lineas/enteros.js     línea Enteros: explicaciones, retos, recapitulación y exploraciones
js/lineas/racionales.js  línea Racionales: lo mismo
js/lineas/recta.js       línea Recta real
js/lineas/algebra.js     línea Álgebra básica
js/lineas/ecuaciones.js  línea Ecuaciones (Q1–Q5)
js/lineas/expolog.js     Funciones: la función exponencial y el logaritmo (F9, F10)
js/lineas/polinomios.js  Álgebra: polinomios, división y residuo y raíces (A6, A7, A8)
js/lineas/ecuaciones2.js Ecuaciones: segundo grado, valor absoluto, fracciones y radicales (Q6–Q10)
js/lineas/notacion.js    Recta real: notación científica, orden de magnitud y cifras significativas (L10)
js/lineas/funciones.js   Funciones: F1–F8 (qué es una función … función inversa)
js/lineas/trigo.js       Trigonometría: T1–T6
js/lineas/racional.js    Álgebra: racionalización (A9)
js/lineas/plano.js       Recta real: el plano cartesiano y distancias (L8–L9)
js/lineas/rectas.js      Ecuaciones: la ecuación de la recta y la de la circunferencia (Q11–Q12)
js/lineas/conjuntos.js   línea alternativa Conjuntos (C1–C5)
js/graficos.js           retos con deslizador y dibujo (uno más en diez estaciones)
js/desafios.js           desafíos opcionales al final de algunas exploraciones (tareas adaptadas de Liljedahl)
js/bienestar.js          línea Bienestar: autodiagnósticos y retroalimentación
js/datos.js              política de datos personales, autorización y borrado de la cuenta
js/app.js                plano, motor de ejercicios, vistas, cuentas y arranque
firestore.rules          reglas de seguridad de la base de datos (no se sube a la web)
LICENCIA.md              licencia Creative Commons BY-NC-SA 4.0
```

Para publicar hay que subir **toda la carpeta**, manteniendo las subcarpetas `css` y `js`. Si solo subes `index.html`, la página no funciona.

Cada línea vive en su propio fichero dentro de `js/lineas/`. Para corregir un texto de una explicación o de un reto, basta con editar ese fichero. Las siete líneas numeradas tienen 57 estaciones y la línea alternativa Conjuntos, 5; con Bienestar son 66. El orden de las estaciones de cada línea se define en la lista LABS de js/app.js. Si en el futuro quitas una estación de su fichero, el plano la mostrará en gris como «en construcción».

Las cuentas y el progreso se guardan en **Firebase** (de Google), que tiene un plan gratuito suficiente para varios grupos. La puesta en marcha toma unos 20 minutos.

## 1. Crear el proyecto de Firebase

1. Entra en <https://console.firebase.google.com> con tu cuenta de Google y pulsa **Crear un proyecto**. Ponle un nombre, por ejemplo `caja-herramientas`. Google Analytics no hace falta.
2. En el menú lateral, abre **Compilación → Authentication → Comenzar**. En la pestaña **Método de acceso**, activa **Correo electrónico/contraseña** (solo la primera opción) y guarda.
3. Abre **Compilación → Firestore Database → Crear base de datos**. Elige una ubicación cercana (por ejemplo `southamerica-east1`) y empieza en **modo de producción**.
4. En Firestore, pestaña **Reglas**, borra lo que haya, pega el contenido de `firestore.rules` y pulsa **Publicar**.

## 2. Conectar la página con tu proyecto

1. En la consola, pulsa el engranaje → **Configuración del proyecto**. En **Tus apps**, pulsa el icono `</>` (Web), dale un apodo y registra la app. No hace falta activar Hosting.
2. Firebase te muestra un bloque `const firebaseConfig = { ... }`. Copia los valores.
3. Abre `js/config.js` con un editor de texto (por ejemplo VS Code) y reemplaza los valores de `FIREBASE_CONFIG` por los tuyos. Guarda el archivo. (La versión que te entregué ya trae la configuración del proyecto `metromat1`.)

Esos valores no son secretos: identifican tu proyecto, y la seguridad la ponen las reglas del paso 1.4.

## Acceso con cuenta de Google

Además del registro con email y contraseña, la página ofrece **Continuar con Google**. Para activarlo:

1. En Firebase, **Authentication → Método de acceso → Agregar proveedor nuevo → Google**.
2. Activa el interruptor **Habilitar**, elige un **correo electrónico de asistencia del proyecto** (el tuyo) y pulsa **Guardar**.
3. Comprueba que tu dominio (`dblazquezsa.github.io`) siga en **Authentication → Configuración → Dominios autorizados**.

La primera vez que alguien entra con Google, la página le pide un nombre de usuario, el color del avatar y la aceptación de la política de datos, igual que en el registro normal. Google abre una ventana emergente: si el navegador la bloquea, la página lo avisa. Si alguien ya tenía cuenta con email y contraseña, debe seguir entrando así.

## 3. Publicar la página

Con **GitHub Pages**:

1. Crea un repositorio nuevo (por ejemplo `caja-herramientas`) y sube `index.html` junto con las carpetas `css` y `js`. Si ya tenías la versión de un solo fichero, reemplaza `index.html` y añade las dos carpetas.
2. En el repositorio: **Settings → Pages → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`. Guarda.
3. En un par de minutos la página queda en `https://TU-USUARIO.github.io/caja-herramientas/`.

Después, en Firebase: **Authentication → Configuración → Dominios autorizados → Agregar dominio**, y escribe `TU-USUARIO.github.io`. Sin este paso, el registro y el inicio de sesión fallan desde tu dominio.

Sirve cualquier otro alojamiento de páginas estáticas (Netlify, Firebase Hosting, el servidor de la universidad); solo hay que autorizar su dominio.

## 4. Activar el panel de administración

La plataforma no tiene profesores ni grupos: solo hay usuarios y la administración de la plataforma.

1. Abre la página publicada y **crea tu propia cuenta** como cualquier usuario.
2. En Firebase, **Authentication → Usuarios**, copia el **UID de usuario** de tu cuenta.
3. En **Firestore Database → Datos**, pulsa **Iniciar colección**, ponle de nombre `docentes` (el nombre se conserva por compatibilidad) y como ID de documento pega tu UID. Añade un campo cualquiera, por ejemplo `nombre` = `David`, y guarda. Si ya lo habías hecho, no hay que repetirlo.
4. Recarga la página: aparece la pestaña **Administración** con el avance de cada usuario registrado.

Para dar acceso al panel a otra persona de la administración, repite los pasos con su UID.

## 5. Tratamiento de datos personales (obligatorio antes de abrir la plataforma)

Al crear la cuenta, cada usuario lee la política de tratamiento de datos y marca dos casillas obligatorias (autorización y edad) y una opcional (guardar sus respuestas de Bienestar, que pueden ser datos sensibles). La autorización queda guardada con su fecha en `progreso/{uid}`, campo `consent`. Las cuentas creadas antes de esta versión ven la política al entrar y deben aceptarla para seguir.

1. Abre `js/config.js` y completa `PLATAFORMA.responsable` (persona o entidad responsable) y `PLATAFORMA.contacto` (correo para consultas y solicitudes). Mientras estén vacíos, la política muestra «correo de contacto pendiente de publicar».
2. Publica de nuevo las reglas de `firestore.rules` (**Firestore Database → Reglas → Publicar**). Las reglas nuevas permiten que cada usuario borre sus propios datos; sin ellas, el botón **Borrar mi cuenta y todos mis datos** de **Mi progreso → Tus datos** no funciona.
3. Si cambias el texto de la política en `js/datos.js`, cambia también la fecha `DATA_V`: así la plataforma vuelve a pedir la autorización a todos.
4. El texto es una base razonable, pero no es asesoría jurídica. Si la plataforma se usará en una universidad, conviene que lo revise su oficina de protección de datos.

Si un usuario pide el borrado por correo: elimina su cuenta en **Authentication → Usuarios** y sus documentos en `progreso`, `bienestar` y `nombres`.

## Qué se guarda y quién lo ve

| Colección | Contenido | Quién lo lee |
|---|---|---|
| `progreso/{uid}` | Usuario, email, estaciones, estrellas, diagnósticos por línea, respuestas de reflexión y autorización de datos | El propio usuario y la administración |
| `bienestar/{uid}` | Respuestas, historial, notas y plan de las estaciones de Bienestar (solo si el usuario lo autorizó) | Solo el propio usuario |
| `nombres/{usuario}` | Reserva del nombre de usuario | Usuarios con sesión iniciada |
| `docentes/{uid}` | Lista de la administración | Cada persona solo comprueba si está en la lista |

Quien no quiera registrarse puede pulsar **Explorar sin cuenta**: abre todas las estaciones, pero su avance no se guarda en ningún sitio y no aparece en el panel. Los usuarios inician sesión con su email y contraseña. Si olvidan la contraseña, la página les envía un enlace de recuperación al correo.

## Antes de abrirla a estudiantes

- Completa el paso 5 (responsable, contacto y reglas).
- Haz una prueba completa con una cuenta de prueba: registro, una estación, el diagnóstico, cerrar sesión, volver a entrar y borrar la cuenta.

## Probarla en tu computador

Abrir `index.html` con doble clic no basta: Firebase necesita que la página se sirva desde una dirección web. Desde la carpeta, ejecuta `python -m http.server 8000` y abre `http://localhost:8000`.
