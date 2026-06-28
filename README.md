# Línea 109 · Huincul Transportes

Sitio web de la **Línea 109** (Liniers ↔ Puerto de Buenos Aires) desarrollado
**desde cero con HTML5, CSS3 y JavaScript (ES6)**, sin frameworks ni dependencias
externas.

Proyecto Integrador · Diseño y Desarrollo Web · UADE.

## Estructura

```
huincul_linea_109/
├── index.html          Página principal (HTML semántico, un solo <h1>)
├── css/
│   └── styles.css      Hoja de estilos única: tokens del Design System + base + componentes + responsive
├── js/
│   └── main.js         Interacciones: tema, menú mobile, año, hora, paradas, horarios
└── assets/
    ├── img/            Imágenes (logo)
    └── icons/          Carpeta reservada (los iconos son SVG inline)
```

## Cómo verlo

Abrir `index.html` directo en el navegador, o servirlo con un server estático:

```bash
# Python
python -m http.server 5500

# Node
npx serve
```

Luego abrir `http://localhost:5500`.

## Funcionalidades

- **Tema claro/oscuro** persistido en `localStorage` (sin parpadeo al cargar).
- **Menú hamburguesa** en mobile con `aria-expanded`.
- **Buscador de paradas** (filtra las paradas por nombre o barrio).
- **Selector de horarios** por dirección (ida/vuelta) y franja, con horas pico
  destacadas.
- **Año** y **hora de última actualización** dinámicos.
- **Mapa** del recorrido embebido (uMap / OpenStreetMap).

## Diseño y accesibilidad

- Design System definido con variables CSS en `:root` (colores, tipografía,
  espaciados, radios y sombras), reutilizadas en todo el sitio.
- HTML semántico (`header`, `nav`, `main`, `section`, `footer`), jerarquía de
  headings correcta y sin estilos inline.
- Foco visible, textos alternativos en imágenes y `aria-label` donde corresponde.

## Responsive

Mobile-first con breakpoints en **480px**, **768px** y **1024px**, sin scroll
horizontal.

## Despliegue

Publicado con **GitHub Pages** desde la rama `main` (carpeta raíz).
