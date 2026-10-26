// Turns "Coming soon on Amazon" buttons into real links when links.js has a URL for that book.
// If GACRUX_AFFILIATE_TAG is set, appends ?tag= / &tag= to Amazon product URLs.
(function () {
  var links = window.GACRUX_LINKS || {};
  var tag = String(window.GACRUX_AFFILIATE_TAG || "").trim();
  function withTag(url) {
    if (!tag) return url;
    // Only tag Amazon product URLs we control; leave amzn short links alone.
    if (!/^https:\/\/(www\.)?amazon\.[a-z.]+\/(dp|gp\/product)\//i.test(url)) return url;
    if (/[?&]tag=/.test(url)) return url;
    return url + (url.indexOf("?") >= 0 ? "&" : "?") + "tag=" + encodeURIComponent(tag);
  }
  var buttons = document.querySelectorAll("[data-amazon]");
  for (var i = 0; i < buttons.length; i++) {
    var a = buttons[i];
    var url = String(links[a.getAttribute("data-amazon")] || "").trim();
    if (/^https:\/\/(www\.)?amazon\.[a-z.]+\//.test(url) || /^https:\/\/amzn\.(to|eu)\//.test(url)) {
      a.href = withTag(url);
      a.textContent = a.getAttribute("data-label");
      a.classList.remove("is-soon");
      a.removeAttribute("aria-disabled");
      a.target = "_blank";
      a.rel = "noopener sponsored";
    }
  }
})();
