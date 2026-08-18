/*
   FRATEX — catalogue.js
   Module partagé pour toutes les pages produits :
   chargement des JSON, helpers de rendu, calcul des produits suggérés.
   Chargé par produits.html, produits-section.html et produit.html,
   avant leur script de page respectif.
*/

var Catalogue = (function () {
  var cache = {};

  function loadJSON(path) {
    if (cache[path]) return cache[path];
    cache[path] = fetch(path).then(function (res) {
      if (!res.ok) throw new Error("Impossible de charger " + path);
      return res.json();
    });
    return cache[path];
  }

  function loadSections() {
    return loadJSON("assets/data/sections.json");
  }

  function loadSection(slug) {
    return loadJSON("assets/data/" + slug + ".json");
  }

  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function setQueryParams(params) {
    var url = new URL(window.location.href);
    Object.keys(params).forEach(function (key) {
      var value = params[key];
      if (value === null || value === undefined || value === "") {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });
    window.history.replaceState({}, "", url);
  }

  function escapeHtml(str) {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function categoryName(data, categorySlug) {
    var cat = data.categories.find(function (c) {
      return c.slug === categorySlug;
    });
    return cat ? cat.name : "";
  }

  function subcategoryName(data, categorySlug, subcategorySlug) {
    var cat = data.categories.find(function (c) {
      return c.slug === categorySlug;
    });
    if (!cat) return "";
    var sub = cat.subcategories.find(function (s) {
      return s.slug === subcategorySlug;
    });
    return sub ? sub.name : "";
  }

  function productCardHTML(product, sectionSlug, data) {
    var catName = categoryName(data, product.category);
    return (
      '<a class="product-card" href="produit.html?section=' +
      encodeURIComponent(sectionSlug) +
      "&id=" +
      encodeURIComponent(product.id) +
      '">' +
      '<div class="product-card-img">' +
      '<img src="' +
      escapeHtml(product.image) +
      '" alt="' +
      escapeHtml(product.name) +
      '" loading="lazy" width="512" height="512" />' +
      "</div>" +
      '<div class="product-card-body">' +
      '<p class="product-card-cat">' +
      escapeHtml(catName) +
      "</p>" +
      "<h3>" +
      escapeHtml(product.name) +
      "</h3>" +
      '<p class="product-card-desc">' +
      escapeHtml(product.short_description) +
      "</p>" +
      '<span class="product-card-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      "</div>" +
      "</a>"
    );
  }

  /* Produits suggérés : d'abord la même sous-catégorie, puis la même
     catégorie, puis en dernier recours d'autres catégories de la section. */
  function findRelated(data, product, limit) {
    limit = limit || 4;
    var pool = data.products.filter(function (p) {
      return p.id !== product.id;
    });

    var sameSub = pool.filter(function (p) {
      return (
        p.category === product.category && p.subcategory === product.subcategory
      );
    });
    var sameCat = pool.filter(function (p) {
      return (
        p.category === product.category && p.subcategory !== product.subcategory
      );
    });
    var rest = pool.filter(function (p) {
      return p.category !== product.category;
    });

    var result = sameSub.concat(sameCat).concat(rest);
    return result.slice(0, limit);
  }

  return {
    loadSections: loadSections,
    loadSection: loadSection,
    qs: qs,
    setQueryParams: setQueryParams,
    escapeHtml: escapeHtml,
    categoryName: categoryName,
    subcategoryName: subcategoryName,
    productCardHTML: productCardHTML,
    findRelated: findRelated,
  };
})();
