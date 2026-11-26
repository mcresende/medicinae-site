// Envio dos formulários via Web3Forms (chave pública; as mensagens chegam por e-mail à Medicinae).
var WEB3FORMS_URL = "https://api.web3forms.com/submit";
var WEB3FORMS_KEY = "130ebc63-8eb7-41ca-bef1-cc471f8e98da";
var FORM_SUBJECTS = {
  contact: "Site Medicinae: novo contato",
  news: "Site Medicinae: quero ser avisada (novidades)"
};

var INTERESSES = {
  "circulos-estudos-feminino": "Círculos de Mulheres e Estudos sobre o Feminino",
  "eventos-imersoes": "Eventos e imersões",
  "profissionais": "Supervisão e grupos de estudo para profissionais",
  "textos": "Textos e crônicas"
};

document.querySelectorAll("form[data-form]").forEach(function (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var status = form.querySelector(".form-status");
    var show = function (msg, kind) { status.textContent = msg; status.className = "form-status " + kind; };
    if (form.elements.website && form.elements.website.value) return;          // anti-spam
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var kind = form.dataset.form;
    var data = new FormData(form);
    data.delete("website");
    data.delete("interesses");
    var marcados = Array.prototype.map.call(form.querySelectorAll("input[name=interesses]:checked"), function (c) { return INTERESSES[c.value] || c.value; });
    if (marcados.length) data.set("interesses", marcados.join("; "));
    data.set("access_key", WEB3FORMS_KEY);
    data.set("subject", FORM_SUBJECTS[kind] || "Site Medicinae");
    data.set("from_name", "Site Medicinae");
    var btn = form.querySelector("button[type=submit]"); btn.disabled = true;
    fetch(WEB3FORMS_URL, { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j || !j.success) throw new Error("falha");
        form.reset();
        show(kind === "news" ? "Obrigada! Você será avisada quando houver novidades." : "Obrigada! Recebi seus dados e retorno em breve.", "ok");
      })
      .catch(function () { show("Não foi possível enviar agora. Por favor, tente pelo WhatsApp.", "err"); })
      .then(function () { btn.disabled = false; });
  });
});
