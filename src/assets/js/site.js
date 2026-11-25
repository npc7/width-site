// Width 官网交互：导航下拉、手机菜单、标签页。无依赖。
(() => {
  const nav = document.querySelector("[data-nav]");
  const burger = document.querySelector("[data-burger]");
  const mobile = () => window.matchMedia("(max-width: 980px)").matches;

  // 下拉菜单：桌面端悬停 / 点击，手机端点击展开
  document.querySelectorAll(".nav-item.has-menu").forEach((item) => {
    const btn = item.querySelector("[data-menu-toggle]");
    const set = (open) => {
      item.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    };
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const open = !item.classList.contains("open");
      document.querySelectorAll(".nav-item.open").forEach((o) => o !== item && o.classList.remove("open"));
      set(open);
    });
    let timer;
    item.addEventListener("mouseenter", () => { if (!mobile()) { clearTimeout(timer); set(true); } });
    item.addEventListener("mouseleave", () => { if (!mobile()) timer = setTimeout(() => set(false), 120); });
    item.addEventListener("focusout", (e) => { if (!mobile() && !item.contains(e.relatedTarget)) set(false); });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") document.querySelectorAll(".nav-item.open").forEach((o) => o.classList.remove("open"));
  });
  document.addEventListener("click", (e) => {
    if (!mobile() && !e.target.closest(".nav-item")) document.querySelectorAll(".nav-item.open").forEach((o) => o.classList.remove("open"));
  });

  // 手机菜单
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = !nav.classList.contains("open");
      nav.classList.toggle("open", open);
      document.body.classList.toggle("nav-open", open);
      burger.setAttribute("aria-expanded", String(open));
    });
  }

  // 标签页（audiences 版块）
  document.querySelectorAll("[data-tabs]").forEach((tabs) => {
    const buttons = [...tabs.querySelectorAll('[role="tab"]')];
    const select = (btn) => {
      buttons.forEach((b) => {
        const on = b === btn;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
        document.getElementById(b.getAttribute("aria-controls")).hidden = !on;
      });
    };
    buttons.forEach((b, i) => {
      b.addEventListener("click", () => select(b));
      b.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        const next = buttons[(i + d + buttons.length) % buttons.length];
        select(next);
        next.focus();
      });
    });
  });
  // 联系表单：链接里带 ?type=exchange|wallet|payments|custody|otc|lea|academic|demo 时自动预选
  const form = document.querySelector("[data-form]");
  if (form) {
    const type = new URLSearchParams(location.search).get("type");
    const order = ["exchange", "wallet", "payments", "custody", "otc", "lea", "academic", "other"];
    const select = form.querySelector('select[name="type"]');
    const i = order.indexOf(type);
    if (select && i >= 0) select.selectedIndex = i;
    if (type) {
      const hidden = document.createElement("input");
      hidden.type = "hidden"; hidden.name = "intent"; hidden.value = type;
      form.appendChild(hidden);
    }
  }
})();

// 中文标题不留孤字（首页 hero 的导语 .ledger-lead 也一样）：把标题按标点切成小段（.ph，inline-block），浏览器就只会在标点后换行，
// 不会把一个词拆到两行，也不会在行尾剩一个字。段落太长放不下一行时仍会在段内正常换行。
(function () {
  if (!document.body.classList.contains("lang-zh")) return;
  document.querySelectorAll("h1, h2, h3, .stat-label, summary, .ledger-lead p").forEach(function (h) {
    var walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT), nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      var parts = n.nodeValue.match(/[^，、。？！：；]+[，、。？！：；]*/g);
      if (!parts || !n.nodeValue.trim()) return;
      var frag = document.createDocumentFragment();
      parts.forEach(function (t) {
        var span = document.createElement("span");
        span.className = "ph"; span.textContent = t; frag.appendChild(span);
      });
      n.parentNode.replaceChild(frag, n);
    });
  });
})();

// 页脚微信图标：点击（手机上）切换二维码，点别处或按 Esc 关闭；桌面端悬停时由 CSS 显示
(() => {
  const btn = document.querySelector(".foot-wechat button");
  if (!btn) return;
  const set = (open) => btn.setAttribute("aria-expanded", String(open));
  btn.addEventListener("click", (e) => { e.stopPropagation(); set(btn.getAttribute("aria-expanded") !== "true"); });
  document.addEventListener("click", () => set(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
})();

// 文档中心：本页目录（从正文 h2 / h3 生成，滚动时高亮当前段落）+ 站内搜索（读 search-index.json）
(() => {
  const shell = document.querySelector("[data-docs]");
  if (!shell) return;
  // 手机上目录默认收起
  const nav = shell.querySelector(".docs-nav");
  if (nav && window.matchMedia("(max-width: 860px)").matches) nav.open = false;

  const body = shell.querySelector("[data-docs-body]"), toc = shell.querySelector("[data-docs-toc]");
  if (body && toc) {
    const hs = [...body.querySelectorAll("h2[id], h3[id]")];
    if (hs.length < 2) toc.closest(".docs-toc").style.visibility = "hidden";
    hs.forEach((h) => {
      const li = document.createElement("li"); li.className = "lv" + h.tagName[1];
      const a = document.createElement("a"); a.href = "#" + h.id; a.textContent = h.textContent; li.appendChild(a); toc.appendChild(li);
    });
    const links = [...toc.querySelectorAll("a")];
    const onScroll = () => {
      let cur = 0; hs.forEach((h, i) => { if (h.getBoundingClientRect().top < 120) cur = i; });
      links.forEach((a, i) => a.classList.toggle("is-active", i === cur));
    };
    if (hs.length) { onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); }
  }

  const input = shell.querySelector("[data-docs-search]"), box = shell.querySelector("[data-docs-results]");
  if (!input || !box) return;
  const zh = document.documentElement.lang.startsWith("zh");
  let idx = null, sel = -1;
  const load = () => idx ? Promise.resolve(idx) : fetch(shell.dataset.index).then((r) => r.json()).then((j) => (idx = j));
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mark = (s, terms) => { let out = esc(s); terms.forEach((t) => { if (t) out = out.replace(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), (m) => "<mark>" + m + "</mark>"); }); return out; };
  const snippet = (text, t) => { const i = text.toLowerCase().indexOf(t); if (i < 0) return ""; const s = Math.max(0, i - 30); return (s ? "…" : "") + text.slice(s, i + 70) + "…"; };
  const run = () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { box.hidden = true; return; }
    load().then((list) => {
      const terms = q.split(/\s+/).filter(Boolean);
      const res = [];
      list.forEach((d) => {
        let score = 0, hit = null;
        // 中文没有空格分词：一个词先整体匹配；匹配不到时，退一步要求它的每个字都出现在同一处（标题、小标题或问题）
        const cjk = (t) => /[\u4e00-\u9fff]/.test(t);
        const loose = (str, t) => { const cs = [...t.replace(/[\s\p{P}]/gu, "")]; const low = str.toLowerCase(); return cs.length > 1 && cs.every((c) => low.includes(c)); };
        for (const t of terms) {
          let s = 0;
          if (d.t.toLowerCase().includes(t)) s += 10;
          if (d.d.toLowerCase().includes(t)) s += 4;
          let h = d.h.find((x) => x.text.toLowerCase().includes(t)); if (h) { s += h.q ? 8 : 6; hit = hit || h; }
          if (d.x.toLowerCase().includes(t)) s += 1;
          if (!s && cjk(t)) {
            h = d.h.find((x) => loose(x.text, t));
            if (h) { s += h.q ? 5 : 3; hit = hit || h; }
            else if (loose(d.t, t)) s += 3;
          }
          if (!s) { score = 0; break; }
          score += s;
        }
        if (score) res.push({ d, score, hit });
      });
      res.sort((a, b) => b.score - a.score);
      sel = -1;
      box.innerHTML = res.length ? res.slice(0, 8).map(({ d, hit }) => {
        const url = d.u + (hit ? "#" + hit.id : "");
        const sub = hit ? (hit.q ? (zh ? "问：" : "Q: ") + hit.text : hit.text) : (snippet(d.x, terms[0]) || d.d);
        return `<a href="${url}"><b>${mark(d.t, terms)}</b><small>${mark(sub, terms)}</small></a>`;
      }).join("") : `<p class="empty">${zh ? "没有找到相关内容。换个说法，或直接联系我们，我们会补进文档。" : "Nothing found. Try other words, or contact us and we'll add it."}</p>`;
      box.hidden = false;
    });
  };
  input.addEventListener("input", run);
  input.addEventListener("focus", () => { load(); if (input.value.trim()) run(); });
  input.addEventListener("keydown", (e) => {
    const items = [...box.querySelectorAll("a")];
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); if (!items.length) return; sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length; items.forEach((a, i) => a.classList.toggle("is-active", i === sel)); }
    else if (e.key === "Enter" && items.length) { e.preventDefault(); (items[sel] || items[0]).click(); }
    else if (e.key === "Escape") { box.hidden = true; }
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".docs-search")) box.hidden = true; });
  // 文档首页的大搜索框：把输入转到侧栏搜索
  const hub = document.querySelector("[data-docs-hub-search]");
  if (hub) hub.addEventListener("input", () => { input.value = hub.value; run(); input.scrollIntoView({ block: "nearest" }); });
})();
