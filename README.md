# Aconex - Aplicación Frontend

## 🚀 Instalación

Para instalar este proyecto utilizando npm, sigue estos pasos:

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:

   ```bash
   cd aconex
   ```

3. Instala las dependencias del proyecto utilizando npm:
   ```bash
   npm install
   ```

## Estructura de Carpetas 📁

La estructura de carpetas de este proyecto se verá de la siguiente manera:

- `.husky/`: incluye los "git hooks" del repositorio. Son comandos que se ejecutan antes o después de un comando de git para asegurar que se siguen protocolos en el desarrollo. Por ejemplo, correr eslint antes de un commit.
- `public/`: Almacena activos estáticos como archivos HTML, imágenes y fuentes que pueden ser accedidos directamente por los usuarios.
- `src/`:
  - `components/`: contiene todos los componentes globales de la aplicación; componentes que se utilizan en todos lados.
  - `theme/`: contiene la configuración customizada de Material UI.
  - `pages/`: componentes que representan el contenido de una URL.
  - `app.jsx`: núcleo de la aplicación. Provee el enrutamiento de la aplicación y otras librerías a nivel global como React Query.
  - `main.jsx`: archivo de entrada de la aplicación. A partir de él se renderiza toda la aplicación cuando se ejecuta `npm run dev` o `npm run build`.

## Flujo de Trabajo (GitHub Flow) 🌐

Este repositorio sigue el flujo de trabajo de GitHub (GitHub Flow). Aquí está cómo funciona:

1. **Ramas (Branches)**: Puedes crear nuevas ramas para trabajar en nuevas funcionalidades o solucionar problemas. Usa comandos como `git checkout -b <nombre-de-la-rama>` para crear y cambiar a una nueva rama.

2. **Commits (Compromisos)**: Realiza tus cambios en la rama y haz commits con mensajes descriptivos que expliquen tus modificaciones.

3. **Solicitudes de extracción (Pull Requests)**: Cuando hayas terminado con tus cambios, crea una solicitud de extracción hacia la rama principal (generalmente "main"). Otros colaboradores pueden revisar tus cambios antes de fusionarlos.

4. **Combinar (Merge)**: Después de la revisión y la aprobación de tus cambios, puedes combinarlos en la rama principal.

Recuerda que este es un repositorio privado sin un plan de pago, lo que significa que no hay ramas protegidas ni regulaciones estrictas. Te pedimos que seas cuidadoso y sigas buenas prácticas de desarrollo. Puedes obtener más información sobre GitHub Flow en la [documentación oficial de GitHub](https://docs.github.com/es/github/collaborating-with-issues-and-pull-requests/github-flow).

## Metodologías y Convenciones de Escritura de Código 📐

### Nombrado de archivos 🅰️

Los nombres de los archivos se escriben con la nomenclatura _kebab-case_.

### Exportaciones de componentes 📦

Cada carpeta de un componente tendrá un _Barrel File_ que exportará todas los módulos públicos dentro de la carpeta.

### Tipos de exportaciones 🛻

Todas las exportaciones son _named exports_. No usamos _default exports_.

### Importación de Material UI 🟦

Las importaciones de componentes de Material UI deben utilizar el path completo del componente en cuestión.
![Ejemplo](/public/readme/ejemplo-import-mui.png)

### Código limpio 🧹

La limpieza del código es prioritaria. Si modificas un archivo, déjalo mejor que como estaba antes. Si es necesario y lo haces, haz un commit de refactor solo dedicado a eso.

### Tipado con JSDOC 🚓

Aunque el código está escrito en JavaScript, utilizamos un tipado estricto gracias al tipado de **JSDoc** y el compilador de TypeScript. Si le pasas un tipo incorrecto a una prop de un componente, **VSCode te advertirá que es un error**. Si ejecutas el comando `npm run check` en la consola, **te saltará un error**. Pero sigue siendo JavaScript. No hay que preocuparse por casi por sintaxis de TypeScript, solo de **tipar los componentes y funciones y JSDoc para evitar bugs**.
![Ejemplo](/public/readme/ejemplo-jsdoc-type-error.png)

## Frameworks Principales y Herramientas Utilizadas 🛠️

Este proyecto utiliza los siguientes marcos y herramientas principales:

- [React](https://reactjs.org/) - Una biblioteca de JavaScript para construir interfaces de usuario.
- [Material-UI](https://mui.com/) - Un conjunto de componentes de interfaz de usuario para React.
- [React Router](https://reactrouter.com/) - Enrutamiento para aplicaciones React.
- [Vite](https://vitejs.dev/) - Un entorno de desarrollo rápido para aplicaciones web.

Además, se utilizan otras dependencias y herramientas, que puedes encontrar en el archivo `package.json`.
