/*
   FRATEX — produit.js
   Logique de la fiche produit (produit.html) : affichage du détail
   et calcul des produits similaires.
   Dépend de catalogue.js, chargé avant ce fichier.
*/

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById("product-root");
  if (!root) return;

  var sectionSlug = Catalogue.qs("section");
  var productId = Catalogue.qs("id");

  var els = {
    breadcrumb: document.getElementById("breadcrumb-trail"),
    visual: document.getElementById("product-visual-img"),
    catLabel: document.getElementById("product-cat-label"),
    title: document.getElementById("product-title"),
    lead: document.getElementById("product-lead"),
    description: document.getElementById("product-description"),
    specs: document.getElementById("product-specs-body"),
    tags: document.getElementById("product-tags"),
    ctaLink: document.getElementById("product-cta-link"),
    relatedTitle: document.getElementById("related-title"),
    relatedGrid: document.getElementById("related-grid"),
  };

  if (!sectionSlug || !productId) {
    root.innerHTML =
      '<div class="container"><p class="product-error">Produit introuvable. <a href="produits.html">Retour aux produits</a>.</p></div>';
    return;
  }

  Catalogue.loadSection(sectionSlug)
    .then(function (data) {
      var product = data.products.find(function (p) {
        return p.id === productId || p.slug === productId;
      });
      if (!product) throw new Error("Produit introuvable");
      render(data, product);
    })
    .catch(function () {
      root.innerHTML =
        '<div class="container"><p class="product-error">Ce produit n\'existe pas ou n\'a pas pu être chargé. <a href="produits.html">Retour aux produits</a>.</p></div>';
    });

  function render(data, product) {
    var catName = Catalogue.categoryName(data, product.category);
    var subName = Catalogue.subcategoryName(
      data,
      product.category,
      product.subcategory
    );

    document.title = product.name + " – Fratex";

    if (els.breadcrumb) {
      els.breadcrumb.innerHTML =
        '<a href="index.html">Accueil</a><span class="sep">/</span>' +
        '<a href="produits.html">Produits</a><span class="sep">/</span>' +
        '<a href="produits-section.html?section=' +
        encodeURIComponent(sectionSlug) +
        '">' +
        Catalogue.escapeHtml(data.section.name) +
        "</a>" +
        '<span class="sep">/</span>' +
        '<a href="produits-section.html?section=' +
        encodeURIComponent(sectionSlug) +
        "&categorie=" +
        encodeURIComponent(product.category) +
        '">' +
        Catalogue.escapeHtml(catName) +
        "</a>" +
        '<span class="sep">/</span>' +
        "<span>" +
        Catalogue.escapeHtml(product.name) +
        "</span>";
    }

    if (els.visual) {
      els.visual.src = product.image;
      els.visual.alt = product.name;
    }
    if (els.catLabel)
      els.catLabel.textContent = catName + (subName ? " · " + subName : "");
    if (els.title) els.title.textContent = product.name;
    if (els.lead) els.lead.textContent = product.short_description;
    if (els.description) els.description.textContent = product.description;

    if (els.specs) {
      var rows = Object.keys(product.specs || {})
        .map(function (key) {
          return (
            "<tr><th>" +
            Catalogue.escapeHtml(key) +
            "</th><td>" +
            Catalogue.escapeHtml(product.specs[key]) +
            "</td></tr>"
          );
        })
        .join("");
      els.specs.innerHTML = rows;
    }

    if (els.tags) {
      els.tags.innerHTML = (product.tags || [])
        .map(function (tag) {
          return "<span>" + Catalogue.escapeHtml(tag) + "</span>";
        })
        .join("");
    }

    if (els.ctaLink) {
      els.ctaLink.href =
        "contact.html?produit=" +
        encodeURIComponent(product.name) +
        "&univers=" +
        encodeURIComponent(data.section.name);
    }

    var related = Catalogue.findRelated(data, product, 4);
    if (els.relatedTitle) {
      els.relatedTitle.textContent = subName
        ? "Autres produits en " + subName
        : "Produits similaires";
    }
    if (els.relatedGrid) {
      if (!related.length) {
        els.relatedGrid.innerHTML =
          '<p class="product-loading">Pas d\'autre produit disponible dans cet univers pour le moment.</p>';
      } else {
        els.relatedGrid.innerHTML = related
          .map(function (p) {
            return Catalogue.productCardHTML(p, sectionSlug, data);
          })
          .join("");
      }
    }
  }
});
