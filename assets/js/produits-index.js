/*
   FRATEX — produits-index.js
   Logique de la page d'accueil produits (produits.html) :
   affichage de la grille des univers (sections).
   Dépend de catalogue.js, chargé avant ce fichier.
*/

document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("sections-grid");
  if (!grid) return;

  var arrowSvg =
    '<span class="section-card-arrow"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';

  Catalogue.loadSections()
    .then(function (sections) {
      grid.innerHTML = sections
        .map(function (s) {
          return (
            '<a class="section-card" href="produits-section.html?section=' +
            encodeURIComponent(s.slug) +
            '">' +
            '<img src="' +
            Catalogue.escapeHtml(s.image) +
            '" alt="' +
            Catalogue.escapeHtml(s.name) +
            '" loading="lazy" width="800" height="600" />' +
            arrowSvg +
            '<div class="section-card-body">' +
            "<h2>" +
            Catalogue.escapeHtml(s.name) +
            "</h2>" +
            "<p>" +
            Catalogue.escapeHtml(s.tagline) +
            "</p>" +
            "</div>" +
            "</a>"
          );
        })
        .join("");
    })
    .catch(function () {
      grid.innerHTML =
        '<p class="sections-error">Impossible de charger les univers produits pour le moment.</p>';
    });
});
