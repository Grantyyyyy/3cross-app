/* 3Cross App Catalog — renderer + router
   -------------------------------------------------------------
   Plain vanilla JS. Hash-based routing so it works from any static
   host (and even from file://). All content comes from data.js.        */

(function () {
  "use strict";

  const apps = window.APPS || [];
  const view = document.getElementById("view");

  // ---- small helpers -------------------------------------------------
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");
  const statusClass = (s) => slug(s);

  // Deterministic, app-specific SVG preview/screenshot placeholder.
  function mockSVG(app, opts) {
    const { variant = 0, w = 600, h = 300, label = "", cover = false } = opts || {};
    // When used as a fixed-height card banner we must fill the box; "slice"
    // crops to cover instead of letterboxing (and prevents overflow).
    const fit = cover
      ? ` width="100%" height="100%" preserveAspectRatio="xMidYMid slice"`
      : "";
    const a = app.accent;
    const a2 = shade(a, -18);
    const gid = `g-${app.id}-${variant}`;
    // A clean "browser window" abstraction with a few UI bars.
    const bars = [];
    const startY = 92;
    for (let i = 0; i < 5; i++) {
      const bw = 120 + ((variant * 37 + i * 53) % 200);
      bars.push(
        `<rect x="40" y="${startY + i * 30}" width="${bw}" height="12" rx="6" fill="white" opacity="${0.85 - i * 0.12}"/>`
      );
    }
    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"${fit} role="img" aria-label="${esc(label || app.name + " preview")}">
  <defs>
    <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${a2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${gid})"/>
  <g transform="translate(0,0)">
    <circle cx="40" cy="36" r="7" fill="white" opacity="0.55"/>
    <circle cx="64" cy="36" r="7" fill="white" opacity="0.4"/>
    <circle cx="88" cy="36" r="7" fill="white" opacity="0.28"/>
    <rect x="${w - 160}" y="29" width="120" height="14" rx="7" fill="white" opacity="0.3"/>
  </g>
  <rect x="0" y="62" width="${w}" height="1.5" fill="white" opacity="0.25"/>
  <text x="40" y="${h - 28}" fill="white" opacity="0.92" font-family="sans-serif" font-size="20" font-weight="700">${esc(app.monogram)}</text>
  ${bars.join("\n  ")}
</svg>`;
  }

  // darken/lighten a hex color
  function shade(hex, pct) {
    const n = parseInt(hex.slice(1), 16);
    const clamp = (v) => Math.max(0, Math.min(255, v));
    const r = clamp((n >> 16) + Math.round(2.55 * pct));
    const g = clamp(((n >> 8) & 0xff) + Math.round(2.55 * pct));
    const b = clamp((n & 0xff) + Math.round(2.55 * pct));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  // ---- index page state ---------------------------------------------
  const state = { q: "", category: "All", status: "All" };

  function uniq(key) {
    return ["All", ...Array.from(new Set(apps.map((a) => a[key])))];
  }

  function matches(app) {
    const q = state.q.trim().toLowerCase();
    if (q) {
      const hay = [app.name, app.tagline, app.description, app.category, ...app.techStack]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (state.category !== "All" && app.category !== state.category) return false;
    if (state.status !== "All" && app.status !== state.status) return false;
    return true;
  }

  // Card banner: use the first real screenshot image if one exists,
  // otherwise the generated SVG (in cover mode so it fills the banner).
  function previewHTML(app) {
    const img = (app.screenshots || []).find((s) => s.type === "image" && s.src);
    if (img) {
      return `<img class="preview-img" src="${esc(img.src)}" alt="${esc(app.name)} preview" loading="lazy" />`;
    }
    return mockSVG(app, { variant: 0, label: app.name, cover: true });
  }

  function cardHTML(app) {
    return `
<a class="card" href="#/app/${app.id}">
  <div class="card-preview">${previewHTML(app)}</div>
  <div class="card-body">
    <div class="card-head">
      <div class="logo" style="background:${app.accent}">${esc(app.monogram)}</div>
      <div>
        <h3>${esc(app.name)}</h3>
        <div class="cat">${esc(app.category)}</div>
      </div>
    </div>
    <p class="card-tagline">${esc(app.tagline)}</p>
    <div class="card-foot">
      <span class="badge ${statusClass(app.status)}">${esc(app.status)}</span>
      <div class="card-tags">
        ${app.techStack.slice(0, 2).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
      </div>
    </div>
  </div>
</a>`;
  }

  function renderIndex() {
    const cats = uniq("category");
    const statuses = uniq("status");

    view.innerHTML = `
<section class="hero">
  <h1>3Cross App Catalog</h1>
  <p>A browsable catalog of the web applications built for 3Cross — for internal reference, client handoff, and portfolio use.</p>
</section>

<div class="controls">
  <div class="search-box">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
    <input id="search" type="search" placeholder="Search apps, tech, descriptions…" value="${esc(state.q)}" autocomplete="off" />
  </div>
  <div class="filter-group">
    <label>Category</label>
    <div class="chips" id="cat-chips">
      ${cats.map((c) => chip(c, state.category === c, "category")).join("")}
    </div>
  </div>
  <div class="filter-group">
    <label>Status</label>
    <div class="chips" id="status-chips">
      ${statuses.map((s) => chip(s, state.status === s, "status")).join("")}
    </div>
  </div>
</div>

<p class="result-count" id="count"></p>
<div class="grid" id="grid"></div>`;

    // wire controls
    const search = view.querySelector("#search");
    search.addEventListener("input", (e) => {
      state.q = e.target.value;
      refreshGrid();
    });
    view.querySelectorAll(".chip").forEach((c) => {
      c.addEventListener("click", () => {
        state[c.dataset.filter] = c.dataset.value;
        renderIndex(); // re-render to update pressed states
      });
    });
    // keep focus/caret after re-render when typing-driven? we only re-render
    // index on chip clicks, so search focus is preserved during typing.
    refreshGrid();
  }

  function chip(value, pressed, filter) {
    return `<button class="chip" data-filter="${filter}" data-value="${esc(value)}" aria-pressed="${pressed}">${esc(value)}</button>`;
  }

  function refreshGrid() {
    const grid = view.querySelector("#grid");
    const count = view.querySelector("#count");
    if (!grid) return;
    const list = apps.filter(matches);
    count.textContent = `${list.length} ${list.length === 1 ? "app" : "apps"}`;
    if (!list.length) {
      grid.innerHTML = `<div class="empty"><strong>No apps match your filters</strong><span>Try clearing the search or selecting “All”.</span></div>`;
      grid.style.display = "block";
      return;
    }
    grid.style.display = "grid";
    grid.innerHTML = list.map(cardHTML).join("");
  }

  // ---- detail page ---------------------------------------------------
  function shotHTML(app, shot, i) {
    const inner =
      shot.type === "image" && shot.src
        ? `<img src="${esc(shot.src)}" alt="${esc(shot.label || app.name)}" loading="lazy" />`
        : mockSVG(app, { variant: i + 1, label: shot.label });
    return `<figure class="shot">${inner}<figcaption class="shot-label">${esc(shot.label || "Preview")}</figcaption></figure>`;
  }

  const hasLink = (app) => !!app.link && /^https?:\/\//i.test(app.link);

  function renderDetail(id) {
    const app = apps.find((a) => a.id === id);
    if (!app) return renderNotFound();

    document.title = `${app.name} — 3Cross App Catalog`;
    const live = hasLink(app);
    view.innerHTML = `
<a class="back-link" href="#/">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
  Back to all apps
</a>

<div class="detail-head" style="--app-accent:${app.accent}">
  <div class="logo" style="background:${app.accent}">${esc(app.monogram)}</div>
  <div>
    <h1>${esc(app.name)}</h1>
    <p class="detail-tagline">${esc(app.tagline)}</p>
    <div class="detail-meta">
      <span class="cat-pill">${esc(app.category)}</span>
      <span class="badge ${statusClass(app.status)}">${esc(app.status)}</span>
    </div>
  </div>
  <div class="detail-actions">
    ${
      live
        ? `<a class="btn" href="${esc(app.link)}" target="_blank" rel="noopener noreferrer">
      Launch app
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M17 7H8M17 7v9"/></svg>
    </a>`
        : `<span class="btn btn-disabled" aria-disabled="true">Not yet deployed</span>`
    }
  </div>
</div>

<div class="detail-layout" style="--app-accent:${app.accent}">
  <div class="detail-main">
    <section class="detail-section">
      <h2>About</h2>
      <p>${esc(app.description)}</p>
    </section>

    <section class="detail-section">
      <h2>Key features</h2>
      <ul class="feature-list">
        ${app.features.map((f) => `<li>${esc(f)}</li>`).join("")}
      </ul>
    </section>

    <section class="detail-section">
      <h2>Screenshots</h2>
      <div class="shots">
        ${app.screenshots.map((s, i) => shotHTML(app, s, i)).join("")}
      </div>
    </section>
  </div>

  <aside class="sidebar">
    <div class="side-card">
      <div class="side-row">
        <div class="k">Status</div>
        <span class="badge ${statusClass(app.status)}">${esc(app.status)}</span>
      </div>
      <div class="side-row">
        <div class="k">Category</div>
        <div>${esc(app.category)}</div>
      </div>
      <div class="side-row">
        <div class="k">Tech stack</div>
        <div class="stack-tags">
          ${app.techStack.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
        </div>
      </div>
      <div class="side-row">
        <div class="k">Access</div>
        ${
          live
            ? `<a href="${esc(app.link)}" target="_blank" rel="noopener noreferrer" style="color:${app.accent};font-weight:600;word-break:break-all">${esc(app.link)}</a>`
            : `<span style="color:var(--text-soft)">Not yet deployed</span>`
        }
      </div>
    </div>
  </aside>
</div>`;
    window.scrollTo(0, 0);
  }

  function renderNotFound() {
    document.title = "Not found — 3Cross App Catalog";
    view.innerHTML = `<div class="empty"><strong>App not found</strong><span>That listing doesn’t exist. <a href="#/" style="color:var(--text)">Back to catalog</a>.</span></div>`;
  }

  // ---- router --------------------------------------------------------
  function route() {
    const hash = location.hash || "#/";
    const m = hash.match(/^#\/app\/(.+)$/);
    if (m) {
      renderDetail(decodeURIComponent(m[1]));
    } else {
      document.title = "3Cross — App Catalog";
      renderIndex();
    }
  }

  window.addEventListener("hashchange", route);
  route();
})();
