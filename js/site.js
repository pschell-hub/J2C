// journey2change — small helpers: mobile menu, contact form, footer year.

// -------------------------------------------------------------
// CONTACT FORM SETTING
// After creating a free form at https://formspree.io, paste the
// address it gives you (it looks like https://formspree.io/f/abcdwxyz)
// between the quotes below. Until then, the form opens an email
// to Patrick instead, so no message is ever lost.
// -------------------------------------------------------------
const FORM_ENDPOINT = "";
const FALLBACK_EMAIL = "patrick@journey2change.com";

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });

  // Contact forms
  document.querySelectorAll("form.contact-form").forEach(form => {
    const status = form.querySelector(".form-status");
    const button = form.querySelector("button[type=submit]");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (form.querySelector("input[name=_gotcha]")?.value) return; // spam trap
      if (!form.reportValidity()) return; // name, email and message are required

      const data = new FormData(form);

      if (!FORM_ENDPOINT) {
        const name = `${data.get("first_name") || ""} ${data.get("last_name") || ""}`.trim();
        const body =
          `${data.get("message") || ""}\n\n— ${name}\n${data.get("email") || ""}\n${data.get("phone") || ""}`;
        window.location.href =
          `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent("Website enquiry from " + name)}&body=${encodeURIComponent(body)}`;
        return;
      }

      button.disabled = true;
      status.className = "form-status";
      status.textContent = "Sending…";
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" }
        });
        if (res.ok) {
          form.reset();
          status.classList.add("ok");
          status.textContent = "Thank you — your message has been sent. I'll get back to you within 24 hours.";
        } else {
          throw new Error("send failed");
        }
      } catch {
        status.classList.add("err");
        status.innerHTML = `Sorry, something went wrong. Please email me directly at <a href="mailto:${FALLBACK_EMAIL}">${FALLBACK_EMAIL}</a>.`;
      } finally {
        button.disabled = false;
      }
    });
  });
});
