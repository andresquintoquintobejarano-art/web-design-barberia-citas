# Guion del video de presentación

**Duración máxima:** 5 minutos · **Hablan:** Davier y Manuela (por turnos)

La idea no es leer: cada uno se aprende sus puntos y los dice con sus palabras. Lo que está entre corchetes es lo que se muestra en pantalla.

| Tiempo | Quién | Tema |
|---|---|---|
| 0:00 – 0:30 | Manuela | Presentación y problema |
| 0:30 – 1:30 | Davier | Stack y las 3 herramientas TIC |
| 1:30 – 2:15 | Davier | Diagramas ER y de arquitectura |
| 2:15 – 3:15 | Manuela | Prototipo en Google Stitch |
| 3:15 – 4:15 | Davier | Demostración del proyecto funcionando |
| 4:15 – 4:45 | Manuela | GitHub Flow |
| 4:45 – 5:00 | Los dos | Cierre |

---

## 1. Presentación y problema (Manuela · 0:00 – 0:30)

[README abierto en GitHub, arriba]

- Hola, somos Manuela Córdoba y Davier Quinto, de la ficha 3229209, y este es **BarberCitas**.
- Muchas barberías todavía agendan por WhatsApp o en un cuaderno: se cruzan los horarios, los clientes olvidan la cita y no se sabe qué barbero atiende qué.
- BarberCitas junta la agenda en una página web sencilla y usa inteligencia artificial para mandarle recordatorios a los clientes.

## 2. Stack y herramientas TIC (Davier · 0:30 – 1:30)

[Sección 2 del README: tablas de stack y herramientas]

- El frontend está hecho en **React con Vite**, y la parte de servidor son funciones de **Vercel** en la carpeta `api`.
- Usamos tres herramientas TIC:
  1. **Google Sheets API** como base de datos: guardamos clientes, barberos, servicios y citas en una hoja. Es gratis y el dueño de la barbería la puede ver sin saber de bases de datos.
  2. **Gemini API** para escribir los mensajes de recordatorio de cada cita.
  3. **Vercel con GitHub Actions**: cada Pull Request corre el build y, cuando se une a `main`, la página se publica sola.
- Y **Google Stitch** lo usamos para diseñar las pantallas antes de programarlas.

## 3. Diagramas (Davier · 1:30 – 2:15)

[Secciones 4 y 5 del README con los diagramas Mermaid]

- En el **diagrama ER** están las 4 entidades: un cliente puede tener muchas citas, un barbero atiende muchas citas y un servicio puede estar en muchas citas. La cita es la que las une.
- En el **diagrama de arquitectura** se ve el camino de los datos: el usuario usa el frontend, el frontend le pide los datos a las funciones de Vercel, y esas funciones hablan con Google Sheets y con Gemini. Las claves nunca llegan al navegador: se quedan en el servidor.

## 4. Prototipo en Google Stitch (Manuela · 2:15 – 3:15)

[Proyecto de Stitch abierto: las 3 pantallas]

- Diseñé las 3 vistas en Google Stitch, en modo web, con los mismos colores de la app: fondo oscuro y dorado.
- **Dashboard:** el resumen del día, los filtros y la tabla de citas. Con el botón *Ver* se abre el detalle.
- **Detalle de la cita:** los datos del cliente, el barbero, el servicio y la hora, los botones para completar, reprogramar o cancelar, y el acceso al recordatorio con IA.
- **Configuración y Asistente IA:** aquí se escoge la cita, el tipo de mensaje y el tono, y Gemini escribe el recordatorio. A la derecha se ve el estado de las tres integraciones.
- En el README, cada pantalla tiene su captura, su ruta y el endpoint que le da los datos.

## 5. Demostración (Davier · 3:15 – 4:15)

[Página publicada en Vercel]

- Esta es la página publicada en Vercel.
- [Dashboard] Aquí carga la lista de citas, que viene de la hoja de Google Sheets.
- [Abrir una cita] Este es el detalle de una cita.
- [Configuración] Y aquí le pedimos a Gemini un mensaje de recordatorio para el cliente.
- [Mostrar la hoja de Google Sheets] Estos son los mismos datos guardados en la hoja.

## 6. GitHub Flow (Manuela · 4:15 – 4:45)

[Pestaña *Pull requests* del repositorio y `docs/GIT_FLOW.md`]

- Nadie sube cambios directo a `main`. Cada uno trabaja en su rama y abre un Pull Request.
- Davier hizo el esqueleto en el PR #1; yo subí el prototipo de Stitch en el PR #2 y la documentación del flujo en el PR #3, y él los revisó antes de unirlos.
- Todo el proceso está explicado en `GIT_FLOW.md`.

## 7. Cierre (los dos · 4:45 – 5:00)

- **Manuela:** con BarberCitas la barbería tiene su agenda en orden y los clientes reciben su recordatorio.
- **Davier:** gracias por vernos.

---

## Antes de grabar

- [ ] Las variables de entorno están configuradas en Vercel y la página muestra las citas.
- [ ] La hoja de Google Sheets tiene datos de ejemplo en las 4 pestañas.
- [ ] Cronometrar un ensayo: que no pase de 5 minutos.
- [ ] Subir el video a YouTube como **No listado** (o a Drive con "Cualquier persona con el enlace") y pegar el enlace en la sección 9 del README.
