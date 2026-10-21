# Caja de herramientas: cómo publicarla en internet

La carpeta tiene dos archivos:

- `index.html`: la página completa (plano, estaciones, diagnóstico, bienestar, registro e inicio de sesión).
- `firestore.rules`: las reglas de seguridad de la base de datos.

Las cuentas y el progreso se guardan en **Firebase** (de Google), que tiene un plan gratuito suficiente para varios grupos. La puesta en marcha toma unos 20 minutos.

## 1. Crear el proyecto de Firebase

1. Entra en <https://console.firebase.google.com> con tu cuenta de Google y pulsa **Crear un proyecto**. Ponle un nombre, por ejemplo `caja-herramientas`. Google Analytics no hace falta.
2. En el menú lateral, abre **Compilación → Authentication → Comenzar**. En la pestaña **Método de acceso**, activa **Correo electrónico/contraseña** (solo la primera opción) y guarda.
3. Abre **Compilación → Firestore Database → Crear base de datos**. Elige una ubicación cercana (por ejemplo `southamerica-east1`) y empieza en **modo de producción**.
4. En Firestore, pestaña **Reglas**, borra lo que haya, pega el contenido de `firestore.rules` y pulsa **Publicar**.

## 2. Conectar la página con tu proyecto

1. En la consola, pulsa el engranaje → **Configuración del proyecto**. En **Tus apps**, pulsa el icono `</>` (Web), dale un apodo y registra la app. No hace falta activar Hosting.
2. Firebase te muestra un bloque `const firebaseConfig = { ... }`. Copia los valores.
3. Abre `index.html` con un editor de texto (por ejemplo VS Code), busca `FIREBASE_CONFIG` y reemplaza los valores de ejemplo por los tuyos. Guarda el archivo.

Esos valores no son secretos: identifican tu proyecto, y la seguridad la ponen las reglas del paso 1.4.

## 3. Publicar la página

Con **GitHub Pages**:

1. Crea un repositorio nuevo (por ejemplo `caja-herramientas`) y sube `index.html`.
2. En el repositorio: **Settings → Pages → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`. Guarda.
3. En un par de minutos la página queda en `https://TU-USUARIO.github.io/caja-herramientas/`.

Después, en Firebase: **Authentication → Configuración → Dominios autorizados → Agregar dominio**, y escribe `TU-USUARIO.github.io`. Sin este paso, el registro y el inicio de sesión fallan desde tu dominio.

Sirve cualquier otro alojamiento de páginas estáticas (Netlify, Firebase Hosting, el servidor de la universidad); solo hay que autorizar su dominio.

## 4. Activar tu panel docente

1. Abre la página publicada y **crea tu propia cuenta** como si fueras un estudiante.
2. En Firebase, **Authentication → Usuarios**, copia el **UID de usuario** de tu cuenta.
3. En **Firestore Database → Datos**, pulsa **Iniciar colección**, ponle de nombre `docentes` y como ID de documento pega tu UID. Añade un campo cualquiera, por ejemplo `nombre` = `David`, y guarda.
4. Recarga la página: aparece la pestaña **Panel del grupo** con el avance de cada estudiante registrado.

Para dar acceso al panel a otra persona docente, repite los pasos con su UID.

## Qué se guarda y quién lo ve

| Colección | Contenido | Quién lo lee |
|---|---|---|
| `progreso/{uid}` | Usuario, email, grupo, estaciones, estrellas, diagnóstico | El propio estudiante y los docentes |
| `bienestar/{uid}` | Respuestas y plan de la estación de bienestar | Solo el propio estudiante |
| `nombres/{usuario}` | Reserva del nombre de usuario | Usuarios con sesión iniciada |
| `docentes/{uid}` | Lista de docentes | Cada persona solo comprueba si es docente |

Los estudiantes inician sesión con su email y contraseña. Si olvidan la contraseña, la página les envía un enlace de recuperación al correo. Para borrar la cuenta de un estudiante, elimínala en **Authentication → Usuarios** y borra sus documentos en `progreso`, `bienestar` y `nombres`.

## Antes de usarla con estudiantes

- La caja guarda datos personales (email y respuestas sobre emociones). Conviene informar a los estudiantes, con un aviso o un consentimiento según la política de tratamiento de datos de tu universidad (en Colombia aplica la Ley 1581 de 2012).
- Haz una prueba completa con una cuenta de prueba: registro, una estación, el diagnóstico, cerrar sesión y volver a entrar.
