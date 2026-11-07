(() => {
  const p = window.SITE_PROFILE || {};
  const byId = (id) => document.getElementById(id);
  const setText = (id, value) => { if (value) byId(id).textContent = value; };
  const safeUrl = (value) => /^(https?:|mailto:|tel:)/i.test(value || "");
  const empty = (text) => `<div class="empty-note">${text}</div>`;

  setText("brand-name", p.name);
  setText("hero-name", p.name);
  setText("card-name", p.name);
  setText("footer-name", p.name);
  setText("card-role", p.role);
  setText("card-name", p.name);
  setText("headline", p.headline);
  setText("intro", p.intro);
  setText("about-text", p.about);
  setText("avatar", p.initials);
  if (p.location) document.querySelector(".card-bottom span:first-child").textContent = p.location;

  const renderItems = (id, items, emptyText, template) => {
    const el = byId(id);
    if (!items?.length) { el.innerHTML = empty(emptyText); return; }
    el.innerHTML = items.map(template).join("");
  };
  renderItems("experience-list", p.experience, "سوابق کاری پس از دریافت اطلاعات رزومه در این بخش ثبت می‌شود.", (x) =>
    `<article class="timeline-item"><span class="item-period">${x.period || ""}</span><h4>${x.title || ""}</h4><p>${x.organization || ""}${x.description ? ` — ${x.description}` : ""}</p></article>`);
  renderItems("education-list", p.education, "سوابق تحصیلی در این بخش نمایش داده می‌شود.", (x) =>
    `<article class="timeline-item"><span class="item-period">${x.period || ""}</span><h4>${x.title || ""}</h4><p>${x.organization || ""}</p></article>`);
  renderItems("skills-list", p.skills, "مهارت‌ها پس از تکمیل رزومه اضافه می‌شوند.", (x) => `<span class="skill-chip">${x}</span>`);
  renderItems("projects-list", p.projects, "پروژه‌ها به‌زودی اضافه می‌شوند.", (x) => {
    const link = safeUrl(x.url) ? `<a href="${x.url}" target="_blank" rel="noopener noreferrer">مشاهدهٔ پروژه ↗</a>` : `<span class="project-top">${x.status || ""}</span>`;
    return `<article class="project-card"><div class="project-top"><span>پروژهٔ ${x.number || ""}</span><span class="project-symbol">✳</span></div><h3>${x.name || ""}</h3><p>${x.description || ""}</p>${link}</article>`;
  });

  const addLinks = (id, items, cls) => {
    const container = byId(id);
    const valid = (items || []).filter((x) => safeUrl(x.url));
    container.innerHTML = valid.map((x) => cls === "contact-link"
      ? `<a class="contact-link" href="${x.url}" target="_blank" rel="noopener noreferrer"><span>${x.label || "ارتباط"} <b>${x.value || ""}</b></span><span>↗</span></a>`
      : `<a href="${x.url}" target="_blank" rel="noopener noreferrer">${x.label || "لینک"} ↗</a>`).join("");
  };
  addLinks("social-links", p.social, "social");
  addLinks("contact-links", p.contact, "contact-link");
  byId("print-resume").addEventListener("click", () => window.print());
})();
