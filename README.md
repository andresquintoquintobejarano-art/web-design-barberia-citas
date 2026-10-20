# 💈 Web Design Barbería — Gestión de Citas

Aplicación web para una barbería, desarrollada con React, que permite visualizar información desde un dashboard y contempla la integración con Google Sheets para consultar los datos de la aplicación.

El proyecto se ejecuta en un entorno local y cuenta con una conexión exitosa con Google Sheets. Este repositorio contiene el código fuente, la configuración y la documentación necesaria para continuar su desarrollo.

## 📋 Tabla de contenido

- [Descripción del proyecto](#-descripción-del-proyecto)
- [Estado actual](#-estado-actual-del-proyecto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación-y-ejecución-local)
- [Configuración de Google Sheets](#-conexión-con-google-sheets)
- [Variables de entorno](#-variables-de-entorno)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Capturas de pantalla](#-capturas-de-pantalla)
- [Seguridad](#-seguridad)
- [Próximos pasos](#-próximos-pasos)

## 📌 Descripción del proyecto

El proyecto consiste en una aplicación web orientada a una barbería, con una interfaz administrativa para visualizar la información relacionada con las citas.

Se utiliza React para la interfaz y Google Sheets como servicio externo para la conexión y consulta de datos, de acuerdo con la implementación del proyecto.

El objetivo es disponer de una base funcional que permita continuar desarrollando las funcionalidades de gestión de citas y mejorar la experiencia de uso.

## ✅ Estado actual del proyecto

- **Aplicación local:** funcionando en el entorno de desarrollo.
- **Google Sheets:** conexión probada y exitosa.
- **Dashboard:** interfaz principal disponible para visualizar la información implementada.
- **Git y GitHub:** repositorio configurado para el control de versiones.
- **Google Gemini:** integración opcional, pendiente de verificar si se habilita el asistente.
- **Vercel:** publicación en producción pendiente de configuración y validación.

> El estado de cada funcionalidad debe actualizarse a medida que se realicen nuevas pruebas y avances.

## ✨ Funcionalidades

- Dashboard para consultar la información disponible.
- Visualización de datos mediante una tabla.
- Interfaz web desarrollada con React.
- Conexión con Google Sheets para acceder a la información configurada.
- Ejecución local para desarrollar y probar los cambios.
- Estructura preparada para continuar incorporando funcionalidades.

Las operaciones específicas disponibles dependen de los componentes y servicios implementados en el código fuente.

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React | Construcción de la interfaz. |
| JavaScript | Lógica de la aplicación. |
| Vite | Entorno de desarrollo y compilación, si está configurado en el proyecto. |
| Node.js | Entorno de ejecución. |
| npm | Instalación de dependencias y ejecución de scripts. |
| Google Sheets API | Conexión con la hoja de cálculo. |
| Google Cloud | Configuración de la cuenta de servicio y permisos. |
| Git | Control de versiones. |
| GitHub | Alojamiento del repositorio. |
| Vercel | Plataforma prevista para el despliegue. |
| Google Gemini API | Integración opcional de inteligencia artificial. |

## 📦 Requisitos

Antes de ejecutar el proyecto, necesitas:

- Node.js instalado.
- npm.
- Git.
- Visual Studio Code u otro editor.
- Credenciales configuradas para Google Sheets, si el código las requiere para ejecutarse.

## 🚀 Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/andresquintoquintobejarano-art/web-design-barberia-citas.git
```

### 2. Entrar en la carpeta

```bash
cd web-design-barberia-citas
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno

Crea el archivo `.env` en la ubicación que espera la aplicación. Utiliza como referencia `.env.example`, si contiene las variables necesarias.

Completa las variables con tus propias credenciales y no compartas el archivo.

### 5. Iniciar la aplicación

Si el proyecto utiliza el script `dev` de Vite, ejecuta:

```bash
npm run dev
```

Abre en el navegador la dirección local que indique la terminal. Si el proyecto está configurado en el puerto 3000, utiliza:

http://localhost:3000

Si Vite muestra otro puerto, utiliza la dirección exacta que aparece en la terminal.

## 🔗 Conexión con Google Sheets

La aplicación cuenta con una conexión exitosa con Google Sheets en el entorno local.

Esta integración permite que el proyecto se comunique con la hoja de cálculo configurada mediante los permisos y las credenciales correspondientes.

### Configuración general

1. Crear o seleccionar un proyecto en Google Cloud.
2. Habilitar Google Sheets API.
3. Configurar una cuenta de servicio.
4. Crear las credenciales necesarias para la aplicación.
5. Compartir la hoja de cálculo con la dirección de correo de la cuenta de servicio, otorgándole los permisos requeridos.
6. Configurar las variables de entorno que utiliza el código.
7. Ejecutar la aplicación y comprobar que la conexión funcione.

### Verificación

La conexión se considera verificada en el entorno local según las pruebas realizadas durante el desarrollo.

La disponibilidad de las operaciones de lectura y escritura depende de los métodos que implemente el proyecto y de los permisos concedidos a la cuenta de servicio.

Documentación oficial: [Google Sheets API](https://developers.google.com/workspace/sheets/api/guides/concepts).

## 🔐 Variables de entorno

Las variables de entorno permiten almacenar la configuración necesaria para conectarse con servicios externos.

Según la implementación, el proyecto puede utilizar variables como:

| Variable | Descripción |
|---|---|
| `GOOGLE_PRIVATE_KEY` | Clave privada de la cuenta de servicio, si así lo requiere el código. |
| `GEMINI_API_KEY` | Clave de Google Gemini, si se utiliza el asistente de IA. |

Es posible que el código requiera variables adicionales, como el correo de la cuenta de servicio o el identificador de la hoja de cálculo. Consulta `.env.example` y los archivos de configuración para conocer los nombres exactos.

**No publiques valores reales de estas variables en el repositorio.**

## 📁 Estructura del proyecto

La estructura general del repositorio incluye:

```text
web-design-barberia-citas/
├── .github/
├── api/
├── docs/
├── scripts/
├── src/
├── .gitignore
├── .env.example
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
├── vite.config.js
└── README.md
```

Esta estructura corresponde a los directorios identificados en el proyecto. Los archivos internos pueden variar según la implementación.

## 📸 Capturas de pantalla

Las capturas permiten documentar el funcionamiento de la aplicación y las pruebas realizadas.

Cuando guardes una captura del Dashboard en `docs/screenshot.png`, puedes visualizarla desde GitHub con el siguiente bloque:

![Dashboard de la aplicación de barbería](docs/screenshot.png)

Si la captura todavía no existe, agrega la imagen a la carpeta `docs` antes de publicar esta sección.

## 🔒 Seguridad

Para proteger el proyecto y las credenciales:

- Mantener `.env` fuera del repositorio.
- No publicar `.env.local`.
- No subir archivos JSON que contengan claves privadas.
- Mantener las credenciales fuera del código fuente.
- Configurar los permisos mínimos necesarios para la cuenta de servicio.
- Si una clave privada se expone accidentalmente, revocarla y generar una nueva.
- Configurar las variables sensibles en la plataforma de despliegue cuando se publique la aplicación.

## 🚧 Próximos pasos

- Completar y validar las funcionalidades de gestión de citas.
- Añadir capturas reales del Dashboard.
- Probar la integración con Google Gemini, si se requiere el asistente de IA.
- Configurar las variables de entorno de producción.
- Publicar y verificar la aplicación en Vercel.
- Mantener actualizada la documentación de acuerdo con las funcionalidades reales.

## 👨‍💻 Repositorio

**GitHub:** [andresquintoquintobejarano-art/web-design-barberia-citas](https://github.com/andresquintoquintobejarano-art/web-design-barberia-citas)

Proyecto de desarrollo web para una barbería y la gestión de citas.
