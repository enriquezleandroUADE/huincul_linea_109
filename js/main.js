/* ============================================================================
   main.js — Interacciones de la página principal (Línea 109)
   JavaScript (ES6+), sin librerías. Cada interacción vive en su propio módulo.
   ============================================================================ */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     Iconos reutilizados en contenido dinámico (archivos en assets/icons via CSS)
     -------------------------------------------------------------------------- */
  const ICON = {
    pin: '<span class="icon icon--md icon--map-pin" aria-hidden="true"></span>',
    externalLink:
      '<span class="icon icon--sm icon--external-link" aria-hidden="true"></span>',
  };

  /* ==========================================================================
     1) Tema claro / oscuro (persistido en localStorage)
     ========================================================================== */
  function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    const root = document.documentElement;

    toggle.addEventListener("click", function () {
      const isDark = root.classList.toggle("dark");
      try {
        localStorage.setItem("theme", isDark ? "dark" : "light");
      } catch (e) {
        /* localStorage no disponible: el cambio sigue siendo visual */
      }
    });
  }

  /* ==========================================================================
     2) Menú mobile (hamburguesa)
     ========================================================================== */
  function initMobileMenu() {
    const btn = document.getElementById("menu-toggle");
    const nav = document.getElementById("mobile-nav");
    if (!btn || !nav) return;

    const iconOpen = btn.querySelector(".menu-toggle__open");
    const iconClose = btn.querySelector(".menu-toggle__close");

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      if (iconOpen) iconOpen.style.display = open ? "none" : "block";
      if (iconClose) iconClose.style.display = open ? "block" : "none";
    }

    btn.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    // Cerrar al hacer clic en un enlace del menú
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  /* ==========================================================================
     3) Año dinámico en el footer
     ========================================================================== */
  function initYear() {
    const el = document.getElementById("footer-year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ==========================================================================
     4) Hora de última actualización del estado del servicio
     ========================================================================== */
  function initEstadoHora() {
    const el = document.getElementById("estado-hora");
    if (!el) return;
    el.textContent = new Date().toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  /* ==========================================================================
     5) Paradas: render + buscador
     ========================================================================== */
  const PARADAS = [
    { nombre: "Casco y Francisco de Viedma", zona: "Liniers" },
    { nombre: "Madero y Nogoyá", zona: "Versalles" },
    { nombre: "Emilio Lamarca y Lascano", zona: "Monte Castro" },
    { nombre: "Cuenca y Adolfo P. Carranza", zona: "Villa del Parque" },
    { nombre: "Gavilán y Juan Agustín García", zona: "General Mitre" },
    { nombre: "Av. San Martín y Nicasio Oroño", zona: "La Paternal" },
    { nombre: "Av. Juan B. Justo y Av. Warnes", zona: "Villa Crespo" },
    { nombre: "Acevedo y Av. Corrientes", zona: "Villa Crespo" },
    { nombre: "Gascón y José Antonio Cabrera", zona: "Palermo" },
    { nombre: "Gallo y Paraguay", zona: "Palermo" },
    { nombre: "Junín y Viamonte", zona: "Barrio Norte" },
    { nombre: "Av. Corrientes y Bouchard", zona: "Microcentro" },
    { nombre: "Av. Rosales y Sarmiento", zona: "Puerto de Buenos Aires" },
  ];

  function initParadas() {
    const grid = document.getElementById("paradas-grid");
    const empty = document.getElementById("paradas-empty");
    const input = document.getElementById("paradas-busqueda");
    if (!grid) return;

    function cardHTML(parada) {
      return (
        '<article class="parada-card">' +
        '<div class="parada-card__head">' +
        '<span class="parada-card__pin">' +
        ICON.pin +
        "</span>" +
        '<div class="parada-card__info">' +
        '<h3 class="parada-card__name">' +
        escapeHTML(parada.nombre) +
        "</h3>" +
        '<p class="parada-card__zone">' +
        escapeHTML(parada.zona) +
        "</p>" +
        "</div>" +
        "</div>" +
        '<a class="parada-card__link" href="#mapa">Ver en mapa' +
        ICON.externalLink +
        "</a>" +
        "</article>"
      );
    }

    function render(filtro) {
      const q = (filtro || "").trim().toLowerCase();
      const lista = PARADAS.filter(function (p) {
        return (
          p.nombre.toLowerCase().includes(q) || p.zona.toLowerCase().includes(q)
        );
      });

      grid.innerHTML = lista.map(cardHTML).join("");

      const vacio = lista.length === 0;
      if (empty) empty.hidden = !vacio;
      grid.hidden = vacio;
    }

    render("");
    if (input) {
      input.addEventListener("input", function (e) {
        render(e.target.value);
      });
    }
  }

  /* ==========================================================================
     6) Horarios: selector de dirección + franja con horas pico
     ========================================================================== */
  const HORARIOS = {
    ida: {
      mañana: ["05:00","05:30","06:00","06:15","06:30","06:45","07:00","07:15","07:30","07:45","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30"],
      tarde: ["12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:15","17:30","17:45","18:00","18:15","18:30","19:00"],
      noche: ["19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],
    },
    vuelta: {
      mañana: ["05:15","05:45","06:15","06:30","06:45","07:00","07:15","07:30","07:45","08:00","08:15","08:45","09:15","09:45","10:15","10:45","11:15","11:45"],
      tarde: ["12:15","12:45","13:15","13:45","14:15","14:45","15:15","15:45","16:15","16:45","17:15","17:30","17:45","18:00","18:15","18:30","18:45","19:15"],
      noche: ["19:45","20:15","20:45","21:15","21:45","22:15","22:45","23:15","23:45"],
    },
  };

  const HORAS_PICO = ["06:30","06:45","07:00","07:15","07:30","07:45","08:00","17:00","17:15","17:30","17:45","18:00","18:15","18:30"];

  function initHorarios() {
    const grid = document.getElementById("horarios-grid");
    const dirGroup = document.getElementById("horarios-direccion");
    const franjaGroup = document.getElementById("horarios-franja");
    if (!grid || !dirGroup || !franjaGroup) return;

    const estado = { direccion: "ida", franja: "mañana" };

    function render() {
      const horas = HORARIOS[estado.direccion][estado.franja] || [];
      grid.innerHTML = horas
        .map(function (hora) {
          const pico = HORAS_PICO.includes(hora);
          return (
            '<div class="horarios__time' +
            (pico ? " horarios__time--pico" : "") +
            '">' +
            hora +
            "</div>"
          );
        })
        .join("");
    }

    // Activa un botón dentro de un grupo y desactiva el resto
    function setActive(group, btn) {
      group.querySelectorAll(".horarios__toggle-btn").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
    }

    dirGroup.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-direccion]");
      if (!btn) return;
      estado.direccion = btn.dataset.direccion;
      setActive(dirGroup, btn);
      render();
    });

    franjaGroup.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-franja]");
      if (!btn) return;
      estado.franja = btn.dataset.franja;
      setActive(franjaGroup, btn);
      render();
    });

    render();
  }

  /* --------------------------------------------------------------------------
     Utilidad: escapa texto para evitar inyección al construir HTML
     -------------------------------------------------------------------------- */
  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* --------------------------------------------------------------------------
     Arranque
     -------------------------------------------------------------------------- */
  function init() {
    initTheme();
    initMobileMenu();
    initYear();
    initEstadoHora();
    initParadas();
    initHorarios();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
