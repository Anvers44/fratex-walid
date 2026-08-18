/*
   FRATEX — produits-index.js
   Page d'accueil produits (produits.html) : rend l'index éditorial
   des 5 univers (panneaux plein écran) et pilote l'effet de scroll
   "un scroll = un univers" (snap CSS natif + reveal + navigation
   par points). Dépend de catalogue.js, chargé avant ce fichier.
*/

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById("universe-index");
  if (!root) return;

  /* Hauteur réelle du header sticky, pour caler la hauteur des panneaux
     (et du conteneur défilant) exactement sur l'espace visible restant.
     Calculée dès que possible, indépendamment du chargement des univers,
     pour éviter tout décalage visuel pendant le fetch JSON. */
  var header = document.querySelector(".site-header");
  function setHeaderHeight() {
    var h = header ? header.offsetHeight : 0;
    document.documentElement.style.setProperty("--header-h", h + "px");
  }
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);

  var arrowSvg =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  Catalogue.loadSections()
    .then(function (sections) {
      root.innerHTML = sections
        .map(function (s, i) {
          var num = String(i + 1).padStart(2, "0");
          return (
            '<a class="universe-row produits-panel" href="produits-section.html?section=' +
            encodeURIComponent(s.slug) +
            '" data-panel-label="' +
            Catalogue.escapeHtml(s.name) +
            '">' +
            '<div class="universe-row-media">' +
            '<img src="' +
            Catalogue.escapeHtml(s.image) +
            '" alt="' +
            Catalogue.escapeHtml(s.name) +
            '" loading="lazy" width="900" height="600" />' +
            "</div>" +
            '<div class="universe-row-content">' +
            '<span class="universe-row-num" aria-hidden="true">' +
            num +
            "</span>" +
            '<div class="universe-row-head">' +
            '<span class="universe-row-index">' +
            num +
            "</span>" +
            "<h2>" +
            Catalogue.escapeHtml(s.name) +
            "</h2>" +
            "</div>" +
            "<p>" +
            Catalogue.escapeHtml(s.tagline) +
            "</p>" +
            '<span class="universe-row-link">Découvrir l\'univers ' +
            arrowSvg +
            "</span>" +
            "</div>" +
            "</a>"
          );
        })
        .join("");

      initFullpageScroll();
    })
    .catch(function () {
      root.innerHTML =
        '<p class="universe-index-error">Impossible de charger les univers produits pour le moment.</p>';
    });

  function initFullpageScroll() {
    var wrapper = document.getElementById("fullpage-panels");
    var dotsNav = document.getElementById("panel-dots");
    var scrollCue = document.getElementById("scroll-cue");
    if (!wrapper) return;

    var panels = Array.prototype.slice.call(
      wrapper.querySelectorAll(".produits-panel"),
    );
    if (!panels.length) return;

    /* Navigation par points : un point par panneau, cliquable. */
    var dotEls = [];
    if (dotsNav) {
      dotsNav.innerHTML = panels
        .map(function (panel, i) {
          var label =
            panel.getAttribute("data-panel-label") ||
            (i === 0 ? "Introduction" : "Univers " + i);
          return (
            '<button type="button" class="panel-dot" data-panel-index="' +
            i +
            '" aria-label="Aller à ' +
            Catalogue.escapeHtml(label) +
            '"><span></span></button>'
          );
        })
        .join("");

      dotEls = Array.prototype.slice.call(
        dotsNav.querySelectorAll(".panel-dot"),
      );
      dotEls.forEach(function (dot, i) {
        dot.addEventListener("click", function () {
          panels[i].scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }

    function setActivePanel(index) {
      panels.forEach(function (panel, i) {
        panel.classList.toggle("is-active", i === index);
      });
      dotEls.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
      if (scrollCue) {
        scrollCue.classList.toggle("is-hidden", index !== 0);
      }
    }

    /* Filet de sécurité : si IntersectionObserver n'est pas supporté,
       on affiche tout directement plutôt que de laisser le contenu
       invisible (l'effet de révélation est un bonus, pas un prérequis). */
    if (!("IntersectionObserver" in window)) {
      panels.forEach(function (panel) {
        panel.classList.add("is-active");
      });
      return;
    }

    /* Détecte le panneau le plus visible DANS le conteneur défilant
       (wrapper est bien la racine de scroll ici, car c'est lui qui a
       overflow-y: auto — c'est ce qui permet à l'observateur de
       fonctionner correctement) pour piloter la révélation et les
       points de navigation. */
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            var index = panels.indexOf(entry.target);
            if (index !== -1) setActivePanel(index);
          }
        });
      },
      { root: wrapper, threshold: [0.5] },
    );
    panels.forEach(function (panel) {
      observer.observe(panel);
    });
    setActivePanel(0);

    if (scrollCue) {
      scrollCue.addEventListener("click", function () {
        panels[1].scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }
});
