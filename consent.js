/* Google Analytics, loaded only after the visitor accepts cookies. GoatCounter (cookie-free) runs separately. */
(function () {
  var GA_ID = "G-0XKNVCNQVG";
  if (!GA_ID) return;
  var KEY = "ga-consent";
  var T = {
    tr: { text: "Size daha iyi bir deneyim sunabilmek için çerezler kullanılmaktadır. Ayrıntılı bilgi için", more: "Çerez Politikası", after: "'nı inceleyebilirsiniz.", yes: "Kabul Et", no: "Reddet", prefs: "Çerez tercihleri" },
    en: { text: "This website uses cookies to give you a better experience. For details, see the", more: "Cookie Policy", after: ".", yes: "Accept", no: "Decline", prefs: "Cookie preferences" }
  };
  function lang() { return (document.documentElement.lang || "tr").slice(0, 2) === "en" ? "en" : "tr"; }
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var loaded = false;
  function load() {
    if (loaded) return; loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", GA_ID);
    var s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
  }
  function clearCookies() {
    document.cookie.split(";").forEach(function (c) {
      var n = c.split("=")[0].trim();
      if (/^_ga/.test(n)) {
        var d = location.hostname.replace(/^www\./, "");
        document.cookie = n + "=; Max-Age=0; path=/";
        document.cookie = n + "=; Max-Age=0; path=/; domain=." + d;
      }
    });
  }

  var css = ".ck{position:fixed;left:16px;right:16px;bottom:16px;z-index:50;max-width:560px;margin:0 auto;background:#fff;color:#23292a;border:1px solid #dde3dd;border-radius:12px;box-shadow:0 8px 28px rgba(0,0,0,.12);padding:18px 20px;font:15px/1.5 Figtree,system-ui,sans-serif}" +
    ".ck p{margin:0 0 12px}.ck a{color:#4f6b57}.ck .b{display:flex;gap:10px;flex-wrap:wrap}" +
    ".ck button{font:inherit;font-weight:600;padding:9px 18px;border-radius:8px;cursor:pointer;border:1px solid #4f6b57}" +
    ".ck .y{background:#4f6b57;color:#fff}.ck .n{background:#fff;color:#4f6b57}" +
    ".ckp{background:none;border:0;padding:0;font:inherit;color:inherit;text-decoration:underline;cursor:pointer}";
  function banner() {
    if (document.querySelector(".ck")) return;
    var t = T[lang()];
    var st = document.getElementById("ck-css");
    if (!st) { st = document.createElement("style"); st.id = "ck-css"; st.textContent = css; document.head.appendChild(st); }
    var d = document.createElement("div");
    d.className = "ck"; d.setAttribute("role", "dialog"); d.setAttribute("aria-label", t.prefs);
    d.innerHTML = '<p>' + t.text + ' <a href="/#gizlilik">' + t.more + '</a>' + t.after + '</p><div class="b"><button class="y" type="button">' + t.yes + '</button><button class="n" type="button">' + t.no + '</button></div>';
    d.querySelector(".y").onclick = function () { set("yes"); d.remove(); load(); };
    d.querySelector(".n").onclick = function () { set("no"); window["ga-disable-" + GA_ID] = true; d.remove(); clearCookies(); };
    document.body.appendChild(d);
  }
  function prefsLink() {
    var f = document.querySelector("footer .wrap");
    if (!f || f.querySelector(".ckp")) return;
    var b = document.createElement("button");
    b.type = "button"; b.className = "ckp"; b.textContent = T[lang()].prefs;
    b.onclick = banner;
    f.appendChild(b);
    if (!document.getElementById("ck-css")) { var st = document.createElement("style"); st.id = "ck-css"; st.textContent = css; document.head.appendChild(st); }
  }

  function init() {
    prefsLink();
    var c = get();
    if (c === "yes") load();
    else if (c !== "no") banner();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
