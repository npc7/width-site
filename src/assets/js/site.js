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
