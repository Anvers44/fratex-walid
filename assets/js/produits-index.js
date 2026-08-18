/*
   FRATEX — produits-index.js
   Page d'accueil produits (produits.html) : rend l'index éditorial
   des 5 univers (panneaux plein écran) et pilote l'effet de scroll
   "un scroll = un univers" (snap + reveal + navigation par points).
   Dépend de catalogue.js, chargé avant ce fichier.
*/

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById("universe-index");
  if (!root) return;

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

    /* Filet de sécurité : si IntersectionObserver n'est pas supporté,
       on affiche tout directement plutôt que de laisser le contenu
       invisible (l'effet de révélation est un bonus, pas un prérequis). */
    if (!("IntersectionObserver" in window)) {
      panels.forEach(function (panel) {
        panel.classList.add("is-active");
      });
      return;
    }

    /* Hauteur réelle du header sticky, pour caler la hauteur des panneaux
       exactement sur l'espace visible restant (évite tout décalage). */
    var header = document.querySelector(".site-header");
    function setHeaderHeight() {
      var h = header ? header.offsetHeight : 0;
      document.documentElement.style.setProperty("--header-h", h + "px");
    }
    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);

    /* Navigation par points : un point par panneau, cliquable. */
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

      dotsNav.querySelectorAll(".panel-dot").forEach(function (dot, i) {
        dot.addEventListener("click", function () {
          panels[i].scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }

    var dotEls = dotsNav
      ? Array.prototype.slice.call(dotsNav.querySelectorAll(".panel-dot"))
      : [];

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

    /* Détecte le panneau le plus visible pour piloter l'effet de
       révélation et l'état actif de la navigation par points. */
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            var index = panels.indexOf(entry.target);
            if (index !== -1) setActivePanel(index);
          }
        });
      },
      { root: wrapper, threshold: [0.55] },
    );
    panels.forEach(function (panel) {
      observer.observe(panel);
    });
    setActivePanel(0);

    /* Un cran de molette = un univers : on relaie la molette vers un
       défilement contrôlé plutôt que de laisser le scroll libre,
       avec un court verrou pour éviter de sauter plusieurs panneaux. */
    var isAnimating = false;
    function goToPanel(index) {
      if (index < 0 || index >= panels.length) return;
      isAnimating = true;
      panels[index].scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(function () {
        isAnimating = false;
      }, 650);
    }

    wrapper.addEventListener(
      "wheel",
      function (e) {
        if (isAnimating) {
          e.preventDefault();
          return;
        }
        var current = panels.findIndex(function (p) {
          return p.classList.contains("is-active");
        });
        if (current === -1) current = 0;

        if (e.deltaY > 0 && current < panels.length - 1) {
          e.preventDefault();
          goToPanel(current + 1);
        } else if (e.deltaY < 0 && current > 0) {
          e.preventDefault();
          goToPanel(current - 1);
        }
        /* Sur le premier ou le dernier panneau, on laisse le
           comportement natif (rien à faire : la molette ne fait
           alors rien puisque le conteneur n'a pas d'overflow au-delà). */
      },
      { passive: false },
    );

    /* Sur tactile, on laisse le snap CSS natif gérer le swipe
       (comportement fluide et déjà "un swipe ≈ un panneau" grâce à
       scroll-snap-stop: always, sans risquer de doubler le mouvement
       avec un scroll programmatique par-dessus l'inertie du doigt). */

    if (scrollCue) {
      scrollCue.addEventListener("click", function () {
        goToPanel(1);
      });
    }
  }
});
