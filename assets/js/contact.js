/*
   FRATEX — contact.js
   Pré-remplit le formulaire de contact quand on arrive depuis une fiche
   produit (produit.html) via les paramètres ?produit=...&univers=...
*/

document.addEventListener("DOMContentLoaded", function () {
  var params = new URLSearchParams(window.location.search);
  var produit = params.get("produit");
  var univers = params.get("univers");
  if (!produit) return;

  var message = document.getElementById("contact-message");
  if (message && !message.value) {
    message.value =
      "Bonjour,\n\nJe souhaite un devis pour : " +
      produit +
      (univers ? " (univers " + univers + ")" : "") +
      ".\n\nVolumes estimés : \nDélais souhaités : ";
  }
});
