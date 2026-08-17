/*
   FRATEX — produits-index.js
   Page d'accueil produits (produits.html) : rend l'index éditorial
   des 5 univers (lignes plein écran alternées).
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
            '<a class="universe-row" href="produits-section.html?section=' +
            encodeURIComponent(s.slug) +
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
    })
    .catch(function () {
      root.innerHTML =
        '<p class="universe-index-error">Impossible de charger les univers produits pour le moment.</p>';
    });
});
