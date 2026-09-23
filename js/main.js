/* =========================================================
   main.js — 页面渲染与交互（原生 JS，无依赖）
   ---------------------------------------------------------
   职责：个人信息绑定 / 渲染目录与项目 / 渲染关于与联系 /
        导航滚动状态 / 移动端菜单 / 滚动淡入 / 深浅色主题切换
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 工具函数 ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const pad2 = (n) => String(n).padStart(2, "0");

  /* ---------- 1. 个人信息绑定（替换 data.js 即全站生效） ---------- */
  function bindProfile() {
    document.title = `${PROFILE.name} · 个人作品集`;
    $$("[data-profile]").forEach((el) => {
      const key = el.dataset.profile;
      if (PROFILE[key] != null) el.textContent = PROFILE[key];
    });
  }

  /* ---------- 2. 渲染作品区 ---------- */

  /* 目录索引条目 */
  function tocItem(p, i) {
    return `
      <li>
        <a href="#project-${i + 1}">
          <span class="toc__no">${pad2(i + 1)}</span>
          <span class="toc__name">${p.name}</span>
          <span class="toc__cat">${p.category}</span>
          <span class="toc__date">${p.date}</span>
        </a>
      </li>`;
  }

  /* 项目条目：variant 未指定时按 a → b → c 自动轮换 */
  function projectArticle(p, i) {
    const variant = (p.variant || ["a", "b", "c"][i % 3]).toLowerCase();
    return `
      <article class="project project--${variant} reveal" id="project-${i + 1}">
        <div class="project__meta-top">
          <span class="project__no">${pad2(i + 1)}</span>
        </div>
        <div class="project__layout">
          <figure class="project__media">
            <div class="project__frame">
              <img src="${p.image}" alt="${p.alt || p.name}" loading="lazy" />
            </div>
          </figure>
          <div class="project__content">
            <span class="project__tag">${p.category}</span>
            <h3 class="project__title">${p.name}</h3>
            <p class="project__intro">${p.intro}</p>
            <div class="project__meta">
              <span>${p.date}</span><span class="sep">·</span><span>${p.category}</span>
            </div>
            <ul class="project__stack">
              ${p.stack.map((s) => `<li>${s}</li>`).join("")}
            </ul>
          </div>
        </div>
      </article>`;
  }

  function renderWorks() {
    $("#toc-list").innerHTML = PROJECTS.map(tocItem).join("");
    $("#project-list").innerHTML = PROJECTS.map(projectArticle).join("");
    $("#works-count").textContent = `(${pad2(PROJECTS.length)})`;
  }

  /* ---------- 3. 渲染关于我 ---------- */
  function renderAbout() {
    $("#about-lead").textContent = PROFILE.aboutLead;
    $("#about-cols").innerHTML = PROFILE.aboutParas
      .map((t) => `<p>${t}</p>`)
      .join("");
    $("#about-skills").innerHTML = PROFILE.skills
      .map((s, i) => `<li><i>${pad2(i + 1)}</i><span>${s}</span></li>`)
      .join("");
    $("#about-edu").innerHTML = PROFILE.education
      .map((e) => `<li><span class="time">${e.time}</span><span>${e.text}</span></li>`)
      .join("");
  }

  /* ---------- 4. 渲染联系方式（有 link 才生成 <a>） ---------- */
  function renderContacts() {
    $("#contact-rows").innerHTML = PROFILE.contacts
      .map((c) => {
        const inner = `
          <span class="contact-row__label">${c.label}</span>
          <span class="contact-row__value">${c.value}</span>
          <span class="contact-row__arrow" aria-hidden="true">→</span>`;
        return c.link
          ? `<a class="contact-row" href="${c.link}"${
              c.link.startsWith("http") ? ' target="_blank" rel="noopener"' : ""
            }>${inner}</a>`
          : `<div class="contact-row">${inner}</div>`;
      })
      .join("");
  }

  /* ---------- 5. 导航：滚动态 + 移动端菜单 ---------- */
  function initHeader() {
    const header = $("#site-header");
    const toggle = $("#nav-toggle");

    const onScroll = () =>
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    });

    /* 点击导航链接后收起移动端菜单 */
    $$(".site-nav__link").forEach((a) =>
      a.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- 6. 深浅色主题（初始状态由 index.html 内联脚本提前设置） ---------- */
  function initTheme() {
    const btn = $("#theme-toggle");
    const root = document.documentElement;

    btn.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      if (next === "dark") {
        root.dataset.theme = "dark";
      } else {
        delete root.dataset.theme;
      }
      /* 记住选择；隐私模式下 localStorage 可能不可用，忽略即可 */
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  /* ---------- 7. 滚动淡入 ---------- */
  function initReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ---------- 启动 ---------- */
  function init() {
    bindProfile();
    renderWorks();
    renderAbout();
    renderContacts();
    $("#year").textContent = new Date().getFullYear();
    initHeader();
    initTheme();
    initReveal();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
