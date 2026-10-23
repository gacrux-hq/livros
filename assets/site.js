// Turns "Coming soon on Amazon" buttons into real links when links.js has a URL for that book.
(function () {
  var links = window.GACRUX_LINKS || {};
  var buttons = document.querySelectorAll("[data-amazon]");
  for (var i = 0; i < buttons.length; i++) {
    var a = buttons[i];
    var url = String(links[a.getAttribute("data-amazon")] || "").trim();
    if (/^https:\/\/(www\.)?amazon\.[a-z.]+\//.test(url) || /^https:\/\/amzn\.(to|eu)\//.test(url)) {
      a.href = url;
      a.textContent = a.getAttribute("data-label");
      a.classList.remove("is-soon");
      a.removeAttribute("aria-disabled");
      a.target = "_blank";
      a.rel = "noopener";
    }
  }
})();
