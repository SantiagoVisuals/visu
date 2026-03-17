# VISU — Photography Explorer

Aplicación web interactiva construida con **Vue.js 3** que consume la **API de Unsplash** para explorar, buscar y descargar fotografías de alta calidad.

---

## 📷 API utilizada

**Unsplash API** — [unsplash.com/developers](https://unsplash.com/developers)

Unsplash es una plataforma de fotografías de alta resolución de uso libre. Su API REST permite acceder a más de 3 millones de imágenes de fotógrafos de todo el mundo.

### Endpoints consumidos

| Endpoint | Uso |
|---|---|
| `GET /photos` | Obtener fotos populares (página de inicio) |
| `GET /search/photos` | Buscar fotos por palabra clave |
| `GET /photos/:id` | Obtener detalles completos de una foto |

---

## 📝 Descripción del aplicativo

**VISU** es un explorador fotográfico con estética dark/editorial que permite:

- **Explorar** fotos populares en un grid tipo masonry
- **Buscar** fotografías por palabra clave (paisajes, arquitectura, retratos, etc.)
- **Filtrar** por categorías temáticas predefinidas (naturaleza, street, minimal, etc.)
- **Ver detalles** de cada foto: fotógrafo, resolución, likes, vistas, tags
- **Descargar** imágenes directamente desde la interfaz
- **Cargar más** fotos con paginación progresiva

### Características técnicas

- Vue.js 3 vía CDN con Composition API
- Componentes modulares (`AppHeader`, `PhotoCard`, `PhotoModal`)
- Consumo de API REST con `fetch` nativo
- Módulos ES6 (`import` / `export`)
- Diseño responsive: PC (4 cols) → Tablet (2-3 cols) → Móvil (1-2 cols)
- CSS Grid + CSS Columns para layout masonry
- Estados de carga (spinner, skeletons), error y vacío
- Atribución a fotógrafos según lineamientos de Unsplash

---

## 🖼️ Capturas de pantalla

> Agregar capturas de la app funcionando en PC, tablet y móvil.

| PC | Tablet | Móvil |
|---|---|---|
| *(captura)* | *(captura)* | *(captura)* |

---

## 🚀 Instrucciones de ejecución

### Requisitos previos

1. Tener una cuenta en [Unsplash Developers](https://unsplash.com/developers)
2. Crear una nueva aplicación y obtener el **Access Key**

### Configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/SantiagoVisuals/visu.git
   cd visu
   ```

2. Abrir `js/api.js` y reemplazar la API key:
   ```javascript
   const ACCESS_KEY = 'TU_ACCESS_KEY_AQUI'  // ← pegar tu clave aquí
   ```

3. Servir con cualquier servidor local (los módulos ES6 requieren servidor):
   ```bash
   npx serve .
   ```
   O abrir con la extensión Live Server de VS Code.

4. Acceder a `http://localhost:3000` (o el puerto que indique).

### Despliegue en Vercel

1. Subir el proyecto a GitHub
2. Importar el repositorio en [vercel.com](https://vercel.com)
3. No se requiere configuración adicional — Vercel detecta el proyecto estático automáticamente
4. La app estará disponible en el dominio asignado por Vercel

---

## 📂 Estructura del proyecto

```
visu/
├── index.html              ← Template principal (HTML + Vue)
├── css/
│   └── styles.css          ← Estilos globales + responsive
├── js/
│   ├── app.js              ← App Vue principal
│   ├── api.js              ← Conexión con Unsplash API
│   ├── data.js             ← Categorías predefinidas
│   └── components/
│       ├── AppHeader.js    ← Header con buscador
│       ├── PhotoCard.js    ← Tarjeta de foto (grid)
│       └── PhotoModal.js   ← Modal de detalle
├── vercel.json             ← Configuración de Vercel
└── README.md               ← Este archivo
```

---

## 🛠️ Tecnologías

- **Vue.js 3** — Framework frontend (CDN)
- **HTML5** — Estructura semántica
- **CSS3** — Flexbox, Grid, CSS Columns, variables, media queries
- **JavaScript ES6** — Módulos, async/await, fetch
- **Unsplash API** — API REST pública
- **Vercel** — Plataforma de despliegue

---

## 👤 Autor

Santiago — [@SantiagoVisuals](https://github.com/SantiagoVisuals)

Proyecto académico — Universidad San Buenaventura, 2026
