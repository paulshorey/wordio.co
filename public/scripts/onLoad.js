// /*
//  * Fun stuff - make the background gradient spin!
//  */
// // detect macbook pro, rather than an external monitor (which can't render gradient animations as well)
// // (needs better detection than this, but for now this is better than nothing)
// if ([1024, 1280, 1440, 1680, 1792, 1920, 2048, 3072].includes(window.innerWidth)) {
//   const is_retina = function () {
//     return typeof window === "object"
//       ? window.matchMedia("(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)")
//           .matches
//       : false;
//   };
//   // --home-gradient-one: hsl(200deg, 80%, 55%); --home-gradient-two: hsl(265deg, 75%, 45%);
//   // var(--home-gradient-one) var(--home-gradient-two)
//   if (is_retina()) {
//     setTimeout(function () {
//       let deg_start = 161;
//       let deg = deg_start;
//       let deg_mid = 50;
//       let deg_add = 0.1;
//       let set_deg = function () {
//         let el = document.querySelector(".Search.Home");
//         if (el) {
//           // increment faster in the middle of rotation
//           let deg_add_more = Math.abs(deg_mid - Math.abs(deg - deg_mid)) / deg_mid;
//           // increment degree to rotate gradient
//           deg = deg + deg_add + deg_add_more;
//           // apply changes
//           el.style.background = `linear-gradient(${deg}deg,hsl(215deg,95%,60%)15%,hsl(265deg,75%,45%) 70%)`;
//           // once is enough
//           if (deg >= deg_start + 360) {
//             clearInterval(homeGradientInterval);
//           }
//         }
//       };
//       let homeGradientInterval = setInterval(set_deg, 50);
//     }, 1000);
//   }
// }

/*
 * Affiliate links
 */
window.open101Domain = function (phraseStringNoSpaces) {
  let form = window.document.getElementById("Domain101Form");
  let input = window.document.getElementById("Domain101Input");
  if (form && input) {
    input.value = phraseStringNoSpaces;
    form.submit();
  }
};

/*
 * Loading Animation - call window.isLoading() to show, then window.doneLoading() to hide
 */
window.doneLoading = function (what) {
  // remove loading animation
  window.document.body.classList.remove("loading_" + what);
};
window.isLoading = function (what, max = 3000) {
  // add loading animation
  window.document.body.classList.add("loading_" + what);
  // auto remove if forgot or errorred
  setTimeout(() => {
    window.document.body.classList.remove("loading_" + what);
  }, max);
};

/*
 * Pause Execution - because Chrome's "pause javascript execution" shortcut is not working!
 */
window.document.body.addEventListener(
  "keyup",
  function (event) {
    if (event.key === "F8") {
      debugger;
    }
  },
  false
);

/*
 * Captcha v3 (initial page load)
 */
if (typeof grecaptcha !== "undefined") {
  grecaptcha.ready(function () {
    grecaptcha.execute("6LfSN-MUAAAAAOxMUojSlBxkicjSeX1YLW8ds8C1", { action: "pageLoad" }).then(function (token) {
      console.warn("EXECUTED CAPTCHA V3 TOKEN =", token);
      window.recaptcha3_token = token;
    });
  });
}

/*
 * Google Analytics
 */
(function (i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function () {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");
ga("create", 'UA-175046769-${PRODUCTION ? "1" : "3"}', "auto");
ga("set", "dimension1", '${PRODUCTION ? "production" : "development"}');
ga("set", "dimension2", "0.0.3");
ga("config", {
  custom_map: { dimension3: "user_id" }
});

/*
 * GTag
 */
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'UA-175046769-1', {
//   'custom_map': {'dimension3': 'user_id'}
// });
// gtag('set', 'dimension1', '${PRODUCTION ? "production" : "development"}');
// gtag('set', 'dimension2', '0.0.2');

/*
 * Talk.io Chat Support
 */
// var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
// (function(){
// var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
// s1.async=true;
// s1.src='https://embed.tawk.to/5f4585c6cc6a6a5947aec934/default';
// s1.charset='UTF-8';
// s1.setAttribute('crossorigin','*');
// s0.parentNode.insertBefore(s1,s0);
// })();

/*
 * Elfsight
 */
setTimeout(function () {
  // let elfsightlink = document.querySelector('.eapps-link');
  let elftext = document.querySelector(".eapps-form-header-text");
  if (elftext) {
    // elfsightlink.setAttribute('style', 'display:none', 'important')
    elftext.innerHTML = elftext.innerHTML.replace(
      "paul@besta.domains",
      '<a href="mailto:paul@besta.domains" target="_blank">paul@besta.domains</a>'
    );
    elftext.innerHTML = elftext.innerHTML.replace(
      "+1.385.770.6789",
      '<a href="mailto:13857706789" target="_blank">+1.385.770.6789</a>'
    );
  }
}, 2000);

/*
 * Time
 */
window.time1start = performance.now();
window.time1log = function (message) {
  let time = performance.now();
  console.log(((time - window.time1start || 0) / 1000).toFixed(4), message);
  window.time1start = time;
};
