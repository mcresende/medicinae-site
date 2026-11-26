// Estatística de visitas (opcional). Para ativar, cole abaixo o código (token) do
// Cloudflare Web Analytics. Enquanto estiver vazio, nada é carregado.
var CF_ANALYTICS_TOKEN = "";
if (CF_ANALYTICS_TOKEN) {
  var s = document.createElement("script");
  s.defer = true;
  s.src = "https://static.cloudflareinsights.com/beacon.min.js";
  s.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_ANALYTICS_TOKEN }));
  document.head.appendChild(s);
}
