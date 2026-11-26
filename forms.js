// Endereços de envio dos formulários. Preencher ao publicar o site
// (ex.: o endereço fornecido pelo serviço de formulários e pela ferramenta de e-mail).
var FORM_ENDPOINTS = { contact: "", news: "" };

document.querySelectorAll("form[data-form]").forEach(function (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var status = form.querySelector(".form-status");
    var show = function (msg, kind) { status.textContent = msg; status.className = "form-status " + kind; };
    if (form.elements.website && form.elements.website.value) return;          // anti-spam
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var url = FORM_ENDPOINTS[form.dataset.form];
    if (!url) { show("Pré-visualização: o envio será ativado quando o site for publicado.", "info"); return; }
    var btn = form.querySelector("button[type=submit]"); btn.disabled = true;
    fetch(url, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error("falha");
        form.reset();
        show(form.dataset.form === "news" ? "Obrigada! Confira seu e-mail para confirmar a inscrição." : "Obrigada! Recebi seus dados e retorno em breve.", "ok");
      })
      .catch(function () { show("Não foi possível enviar agora. Por favor, tente pelo WhatsApp.", "err"); })
      .then(function () { btn.disabled = false; });
  });
});
