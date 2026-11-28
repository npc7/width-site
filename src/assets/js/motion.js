// Width DART · 动效（配合 assets/css/motion.css）。无依赖。
// 只在 html.motion 下运行（head 里的小脚本在用户没有开启「减少动态效果」时加上这个 class）。
// 所有效果都是渐进增强：这个文件加载失败，页面内容照常显示（head 里有 4 秒兜底）。
(() => {
  const root = document.documentElement;
  const on = root.classList.contains("motion");
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ---------- 阅读进度线 ----------
  const line = document.createElement("div");
  line.className = "scroll-line"; line.setAttribute("aria-hidden", "true");
  document.body.appendChild(line);
  let ticking = false;
  const progress = () => {
    const max = root.scrollHeight - innerHeight;
    line.style.setProperty("--sp", max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(progress); } }, { passive: true });
  progress();

  if (!on) return;
  // 这个文件正常加载了：取消 head 里「4 秒后全部显示」的兜底，改由滚动触发。浏览器不支持 IntersectionObserver 时直接全部显示。
  if (!("IntersectionObserver" in window)) { root.classList.add("rv-all"); return; }
  clearTimeout(window.__rv);

  // ---------- 滚动出现：给常见版块里的元素自动加 data-rv，同一组里错开 ----------
  const groups = [
    [".section-head > *", 1],
    [".cards > *, .cases > *, .steps > *, .points3 > *, .post-grid > *, .news-grid > *", 1],
    [".story-col", 1], [".story-tagline", 0], [".stack-copilot", 0],
    [".faq details, .faq-item", 1],
    [".table-wrap tbody tr", 1],
    [".split-copy > *, .split-visual", 1],
    [".console", 0], [".tabs, .tab-panels", 0],
    [".cta-band", 0], [".section-note", 0], [".stat-strip .stat", 1],
    [".glossary .g-term, .glossary-term", 1],
    [".prose > *", 1],
  ];
  const seen = new Set();
  groups.forEach(([sel, stagger]) => {
    const byParent = new Map();
    $$(sel).forEach((el) => {
      if (seen.has(el) || el.matches(".eyebrow") || el.closest(".ledger-copy, .hero-copy, .docs-shell, [data-no-rv]")) return;
      seen.add(el);
      const list = byParent.get(el.parentNode) || []; list.push(el); byParent.set(el.parentNode, list);
    });
    byParent.forEach((list) => list.forEach((el, i) => {
      el.setAttribute("data-rv", el.matches(".console, .cta-band, .split-visual") ? "scale" : "");
      if (stagger) el.style.setProperty("--i", Math.min(i, 8));
    }));
  });
  $$(".stack-layer").forEach((el, i) => { el.setAttribute("data-rv", ""); el.style.setProperty("--i", 2 - i); });
  // 版块标题：把内容包进 .rv-inner，由它上升；h2 自己只做遮罩
  $$(".section-head h2[data-rv]").forEach((h) => {
    const inner = document.createElement("span"); inner.className = "rv-inner";
    while (h.firstChild) inner.appendChild(h.firstChild);
    h.appendChild(inner); h.classList.add("rv-rise");
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, i = parseFloat(el.style.getPropertyValue("--i")) || 0;
      el.classList.add("in");
      io.unobserve(el);
      // 出现动画放完后，把会倾斜的卡片从 data-rv 里放出来：不然 .in 的 transform: none 会一直压住倾斜效果
      setTimeout(() => {
        el.style.removeProperty("--i");
        if (el.classList.contains("tilt")) { el.removeAttribute("data-rv"); el.classList.remove("in"); }
      }, 1300 + i * 80);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  $$("[data-rv]").forEach((el) => io.observe(el));

  // ---------- 数字从 0 跳到位（只处理纯数字开头的值，「当天」这类文字不动） ----------
  const counters = $$(".stat-value, .case-metric").map((el) => {
    const node = [...el.childNodes].find((n) => n.nodeType === 3 && /\d/.test(n.nodeValue));
    if (!node) return null;
    const m = node.nodeValue.match(/^(\D*?)(\d[\d,]*\.?\d*)(.*)$/s);
    if (!m) return null;
    const to = parseFloat(m[2].replace(/,/g, ""));
    if (!isFinite(to)) return null;
    const dec = (m[2].split(".")[1] || "").length, comma = m[2].includes(",");
    return { el, node, pre: m[1], post: m[3], to, dec, comma, final: node.nodeValue };
  }).filter(Boolean);
  const fmt = (c, v) => {
    let s = v.toFixed(c.dec);
    if (c.comma) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return c.pre + s + c.post;
  };
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      const c = counters.find((x) => x.el === e.target);
      const t0 = performance.now(), dur = 1400;
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur), ease = 1 - Math.pow(1 - p, 4);
        c.node.nodeValue = p < 1 ? fmt(c, c.to * ease) : c.final;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => cio.observe(c.el));

  // ---------- 光标聚光 + 轻微立体倾斜 + 磁吸按钮（只在有鼠标的设备上） ----------
  if (fine) {
    $$(".card, .case, .points3 > div, .stack-layer, .stack-copilot, .story-col, .post-card").forEach((el) => {
      el.classList.add("spot");
      const tilt = el.matches(".case, .stack-copilot, .card-link");
      if (tilt) el.classList.add("tilt");
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        el.style.setProperty("--mx", x + "px"); el.style.setProperty("--my", y + "px");
        if (tilt) {
          el.style.setProperty("--ry", ((x / r.width - 0.5) * 5).toFixed(2) + "deg");
          el.style.setProperty("--rx", ((0.5 - y / r.height) * 5).toFixed(2) + "deg");
        }
      });
      el.addEventListener("pointerleave", () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
    });
    $$(".btn-primary").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * 8}px, ${((e.clientY - r.top) / r.height - 0.5) * 6}px)`;
      });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });
  }

  // ---------- 品类故事：进入屏幕才播放，离开就暂停 ----------
  $$(".story-grid").forEach((g) => {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) g.classList.add("play");
      g.classList.toggle("paused", !e.isIntersecting);
    }, { threshold: 0.35 }).observe(g);
  });

  // ---------- Copilot 小终端：逐字打出，循环 ----------
  $$(".cp-term[data-term]").forEach((term) => {
    let lines; try { lines = JSON.parse(term.dataset.term); } catch (_) { return; }
    const tag = term.querySelector(".tag");
    const body = document.createElement("span"); term.appendChild(body);
    const caret = document.createElement("span"); caret.className = "caret"; term.appendChild(caret);
    let visible = false, running = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const run = async () => {
      if (running) return; running = true;
      while (visible) {
        body.textContent = "";
        for (const [cls, text] of lines) {
          const row = document.createElement("span"); row.className = cls; body.appendChild(row);
          if (cls === "q") { for (const ch of text) { row.textContent += ch; await wait(26 + Math.random() * 30); } await wait(380); }
          else { await wait(260); row.textContent = text; await wait(900); }
          body.appendChild(document.createTextNode("\n"));
          if (!visible) break;
        }
        await wait(2600);
      }
      running = false;
    };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) run(); }, { threshold: 0.4 }).observe(term);
    if (tag) term.insertBefore(tag, body);
  });

  // ---------- 底部 CTA：资金流星图（节点 + 连线 + 沿线流动的光点） ----------
  $$(".cta-section, .cta-band").forEach((band) => {
    // 画在整条蓝色带（.cta-section）上；页面里没有 .cta-section 包着的 .cta-band 才画在自己身上
    if (band.matches(".cta-band") && band.closest(".cta-section")) return;
    const cv = document.createElement("canvas"); cv.className = "cta-net"; cv.setAttribute("aria-hidden", "true");
    band.prepend(cv);
    const ctx = cv.getContext("2d");
    let W = 0, H = 0, nodes = [], edges = [], pulses = [], raf = 0, visible = false, last = 0;
    const dpr = Math.min(2, devicePixelRatio || 1);
    const build = () => {
      const r = band.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(14, Math.min(34, Math.round(W * H / 26000)));
      // 固定种子的伪随机，保证每次布局一致、不闪
      let s = 20261128; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647; for (let k = 0; k < 8; k++) rnd();
      nodes = Array.from({ length: n }, () => ({ x: rnd() * W, y: rnd() * H, r: 1.2 + rnd() * 2.2, vx: (rnd() - .5) * .12, vy: (rnd() - .5) * .12 }));
      edges = [];
      nodes.forEach((a, i) => {
        nodes.map((b, j) => [j, Math.hypot(a.x - b.x, a.y - b.y)]).filter(([j]) => j !== i).sort((p, q) => p[1] - q[1]).slice(0, 2)
          .forEach(([j]) => { if (!edges.some((e) => (e[0] === j && e[1] === i))) edges.push([i, j]); });
      });
      pulses = [];
    };
    const frame = (t) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const dt = Math.min(48, t - last || 16); last = t;
      ctx.clearRect(0, 0, W, H);
      nodes.forEach((p) => { p.x += p.vx * dt * .06; p.y += p.vy * dt * .06; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; });
      ctx.lineWidth = 1;
      edges.forEach(([i, j]) => {
        const a = nodes[i], b = nodes[j];
        ctx.strokeStyle = "rgba(255,255,255,.10)"; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      });
      if (pulses.length < 9 && Math.random() < .05) pulses.push({ e: edges[(Math.random() * edges.length) | 0], p: 0, v: .0006 + Math.random() * .0007, dir: Math.random() < .5 });
      pulses = pulses.filter((q) => q.p < 1);
      pulses.forEach((q) => {
        q.p += q.v * dt;
        const a = nodes[q.e[q.dir ? 0 : 1]], b = nodes[q.e[q.dir ? 1 : 0]];
        const x = a.x + (b.x - a.x) * q.p, y = a.y + (b.y - a.y) * q.p;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, "rgba(190,215,255,.95)"); g.addColorStop(1, "rgba(190,215,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 9, 0, 6.2832); ctx.fill();
      });
      nodes.forEach((p) => { ctx.fillStyle = "rgba(255,255,255,.55)"; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill(); });
    };
    build();
    new ResizeObserver(build).observe(band);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 }).observe(band);
    document.addEventListener("visibilitychange", () => { if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(frame); });
    raf = requestAnimationFrame(frame);
  });
})();
