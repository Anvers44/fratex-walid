/*
   FRATEX — produits-section.js
   Logique de la page section produits (produits-section.html) :
   hero de section, filtres catégorie/sous-catégorie, recherche, grille.
   Dépend de catalogue.js, chargé avant ce fichier.
*/

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById("section-root");
  if (!root) return;

  var sectionSlug = Catalogue.qs("section");
  var state = {
    category: Catalogue.qs("categorie") || "",
    subcategory: Catalogue.qs("sous-categorie") || "",
    q: Catalogue.qs("q") || "",
  };

  var els = {
    hero: document.getElementById("section-hero"),
    heroLabel: document.getElementById("section-hero-label"),
    heroTitle: document.getElementById("section-hero-title"),
    heroDesc: document.getElementById("section-hero-desc"),
    breadcrumb: document.getElementById("breadcrumb-current"),
    otherSections: document.getElementById("other-sections"),
    categoryChips: document.getElementById("category-chips"),
    subcategoryBlock: document.getElementById("subcategory-block"),
    subcategoryChips: document.getElementById("subcategory-chips"),
    resetBtn: document.getElementById("filters-reset"),
    searchInput: document.getElementById("catalogue-search-input"),
    count: document.getElementById("catalogue-count"),
    grid: document.getElementById("product-grid"),
  };

  if (!sectionSlug) {
    root.innerHTML =
      '<div class="container"><p class="catalogue-error">Univers introuvable. <a href="produits.html">Retour aux produits</a>.</p></div>';
    return;
  }

  Promise.all([Catalogue.loadSection(sectionSlug), Catalogue.loadSections()])
    .then(function (results) {
      var data = results[0];
      var sections = results[1];
      init(data, sections);
    })
    .catch(function () {
      root.innerHTML =
        '<div class="container"><p class="catalogue-error">Cet univers n\'existe pas ou n\'a pas pu être chargé. <a href="produits.html">Retour aux produits</a>.</p></div>';
    });

  function init(data, sections) {
    document.title =
      data.section.name + " – Produits Fratex";

    if (els.hero) {
      els.hero.style.backgroundImage =
        "linear-gradient(180deg, rgba(1,30,20,0.35) 0%, rgba(1,30,20,0.82) 100%), url('" +
        data.section.hero_image +
        "')";
    }
    if (els.heroTitle) els.heroTitle.textContent = data.section.name;
    if (els.heroDesc) els.heroDesc.textContent = data.section.description;
    if (els.breadcrumb) els.breadcrumb.textContent = data.section.name;

    if (els.otherSections) {
      els.otherSections.innerHTML = sections
        .map(function (s) {
          var cls = s.slug === sectionSlug ? "is-current" : "";
          return (
            '<a class="' +
            cls +
            '" href="produits-section.html?section=' +
            encodeURIComponent(s.slug) +
            '">' +
            Catalogue.escapeHtml(s.name) +
            "</a>"
          );
        })
        .join("");
    }

    // Valide l'état initial par rapport aux données réelles
    if (
      state.category &&
      !data.categories.some(function (c) {
        return c.slug === state.category;
      })
    ) {
      state.category = "";
      state.subcategory = "";
    }
    if (state.category && state.subcategory) {
      var cat = data.categories.find(function (c) {
        return c.slug === state.category;
      });
      var validSub =
        cat &&
        cat.subcategories.some(function (s) {
          return s.slug === state.subcategory;
        });
      if (!validSub) state.subcategory = "";
    }
    if (els.searchInput) els.searchInput.value = state.q;

    renderCategoryChips(data);
    renderSubcategoryChips(data);
    renderGrid(data);

    if (els.resetBtn) {
      els.resetBtn.addEventListener("click", function () {
        state.category = "";
        state.subcategory = "";
        state.q = "";
        if (els.searchInput) els.searchInput.value = "";
        renderCategoryChips(data);
        renderSubcategoryChips(data);
        renderGrid(data);
        syncUrl();
      });
    }

    if (els.searchInput) {
      els.searchInput.addEventListener("input", function (e) {
        state.q = e.target.value;
        renderGrid(data);
        syncUrl();
      });
    }
  }

  function renderCategoryChips(data) {
    if (!els.categoryChips) return;
    var chips = [
      '<button type="button" class="filter-chip' +
        (state.category === "" ? " is-active" : "") +
        '" data-cat="">Toutes les catégories</button>',
    ];
    data.categories.forEach(function (cat) {
      chips.push(
        '<button type="button" class="filter-chip' +
          (state.category === cat.slug ? " is-active" : "") +
          '" data-cat="' +
          cat.slug +
          '">' +
          Catalogue.escapeHtml(cat.name) +
          "</button>"
      );
    });
    els.categoryChips.innerHTML = chips.join("");

    els.categoryChips.querySelectorAll(".filter-chip").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.category = btn.getAttribute("data-cat");
        state.subcategory = "";
        renderCategoryChips(data);
        renderSubcategoryChips(data);
        renderGrid(data);
        syncUrl();
      });
    });
  }

  function renderSubcategoryChips(data) {
    if (!els.subcategoryBlock || !els.subcategoryChips) return;
    if (!state.category) {
      els.subcategoryBlock.hidden = true;
      els.subcategoryChips.innerHTML = "";
      return;
    }
    var cat = data.categories.find(function (c) {
      return c.slug === state.category;
    });
    if (!cat || !cat.subcategories.length) {
      els.subcategoryBlock.hidden = true;
      return;
    }
    els.subcategoryBlock.hidden = false;
    var chips = [
      '<button type="button" class="filter-chip' +
        (state.subcategory === "" ? " is-active" : "") +
        '" data-sub="">Toutes</button>',
    ];
    cat.subcategories.forEach(function (sub) {
      chips.push(
        '<button type="button" class="filter-chip' +
          (state.subcategory === sub.slug ? " is-active" : "") +
          '" data-sub="' +
          sub.slug +
          '">' +
          Catalogue.escapeHtml(sub.name) +
          "</button>"
      );
    });
    els.subcategoryChips.innerHTML = chips.join("");

    els.subcategoryChips
      .querySelectorAll(".filter-chip")
      .forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.subcategory = btn.getAttribute("data-sub");
          renderSubcategoryChips(data);
          renderGrid(data);
          syncUrl();
        });
      });
  }

  function renderGrid(data) {
    var q = state.q.trim().toLowerCase();
    var results = data.products.filter(function (p) {
      if (state.category && p.category !== state.category) return false;
      if (state.subcategory && p.subcategory !== state.subcategory)
        return false;
      if (q) {
        var haystack = (
          p.name +
          " " +
          p.short_description +
          " " +
          (p.tags || []).join(" ")
        ).toLowerCase();
        if (haystack.indexOf(q) === -1) return false;
      }
      return true;
    });

    if (els.count) {
      els.count.innerHTML =
        "<strong>" + results.length + "</strong> produit" +
        (results.length > 1 ? "s" : "");
    }

    if (!els.grid) return;
    if (!results.length) {
      els.grid.innerHTML =
        '<div class="catalogue-empty"><h3>Aucun produit trouvé</h3><p>Essayez un autre filtre ou une autre recherche.</p></div>';
      return;
    }
    els.grid.innerHTML = results
      .map(function (p) {
        return Catalogue.productCardHTML(p, sectionSlug, data);
      })
      .join("");
  }

  function syncUrl() {
    Catalogue.setQueryParams({
      section: sectionSlug,
      categorie: state.category,
      "sous-categorie": state.subcategory,
      q: state.q,
    });
  }
});
