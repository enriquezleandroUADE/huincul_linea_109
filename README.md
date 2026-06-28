# Línea 109 · Huincul Transportes — versión HTML/CSS/JS vanilla

Reescritura del proyecto de Figma Make (React + Tailwind + Vite) a **HTML5 + CSS3 +
JavaScript ES6** puro, sin frameworks ni build step. El diseño, los tokens, las
imágenes y las interacciones se mantienen idénticos al original.

> El código original de Figma Make queda intacto fuera de esta carpeta (`/src`,
> `package.json`, etc.). Todo lo nuevo vive aislado acá dentro de `vanilla/`.

## Estructura

```
vanilla/
├── index.html          Página principal (HTML semántico, un solo <h1>)
├── css/
│   ├── tokens.css      Design System en :root (colores, tipografía, espaciados, radios, sombras)
│   ├── base.css        Reset, tipografía base y utilidades
│   └── styles.css      Layout y componentes (convención BEM, mobile-first)
├── js/
│   └── main.js         Interacciones: tema, menú mobile, año, hora, paradas, horarios
└── assets/
    ├── img/
    │   └── logo-huincul.png
    └── icons/          (los iconos son SVG inline; carpeta reservada)
```

## Cómo verlo

Abrir `index.html` directo en el navegador, o servirlo con un server estático:

```bash
# Python
python -m http.server 5500 --directory vanilla

# Node
npx serve vanilla
```

Luego abrir `http://localhost:5500`.

## Funcionalidades

- **Tema claro/oscuro** persistido en `localStorage` (sin parpadeo al cargar).
- **Menú hamburguesa** en mobile con `aria-expanded`.
- **Buscador de paradas** (filtra las 13 paradas por nombre o barrio).
- **Selector de horarios** por dirección (ida/vuelta) y franja, con horas pico
  destacadas. Datos simulados en JS.
- **Año** y **hora de última actualización** dinámicos.
- **Mapa** del recorrido embebido (uMap / OpenStreetMap).

## Responsive

Mobile-first con breakpoints en **480px**, **768px** y **1024px**. Verificado sin
scroll horizontal a 360/375px, 768px y 1280px.
