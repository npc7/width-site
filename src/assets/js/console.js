// 首页 console 演示（visuals/console.njk）：像一段产品录屏那样循环播放一次地址筛查。
// 每条命中出现时，左边表格里这一行、右边资金图里它依据的节点和连线一起高亮。
//
// 时间轴（一轮约 15 秒，毫秒）：
//   第 0 步     0     地址逐字打出（250–1200），1250 起「筛查中」+ 三道蓝环从被筛地址扩散
//   第 1 步  2400     追踪：先出一跳节点（0x8a…、TQf…、混币器、交易所），再出两跳（制裁实体、黑客）
//   第 2 步  4000     命中 1 制裁：两段红线按时间先后画出、时间戳、说明框，表格第 1 行；分数 0 → 30
//   第 3 步  6100     命中 2 混币器：一跳的橙色连线和说明框，第 2 行；分数 30 → 36
//   第 4 步  7800     命中 3 黑客：灰色虚线，后一笔时间变红、划掉、「时间倒流 · 排除」，第 3 行划线
//   第 5 步  9900     命中 4 交易所：青色连线、「豁免」，第 4 行
//   第 6 步 11500     处置：20–49 档亮起、「复核」弹出、快照一行逐字出现、连线上跑起流动的点
//          14500     全部淡出，15200 回到第 0 步
// 每个元素在模板里用 data-at（第几步）+ data-d（这一步里再晚几秒）标出出场时间，data-hit 标出它属于第几条命中。
// JS 只按时间切换 class / data 属性，动作全由 site.css 里的 transition 完成。
//
// 只在 console 进入屏幕时播放，离开屏幕或切到别的标签页时暂停。
// 没有 JS、或系统设置了「减少动态效果」：不加 is-demo，页面上就是最终结果（四条命中、36 分、复核），没有动效。
//
// 调试钩子（截图、检查用，保留）：
//   ?demoStep=N   停在第 N 步结束时（N = 0–6；7 = 淡出中），并把 console 滚到屏幕中间（比屏幕高时顶边对齐到导航条下面）。
//   ?demoAt=毫秒  停在时间轴上的任意一刻，例如 ?demoAt=4300 看命中 1 刚开始、第二段红线还没出来时。
//   定格时不播放过渡（is-reset），所以看到的是这一刻已经出场的元素的最终样子，看不到画线画到一半。
(function () {
  var root = document.querySelector("[data-console]");
  if (!root) return;
  var svg = root.querySelector(".viz-flow svg");
  var typed = root.querySelector("[data-type]");
  var field = root.querySelector(".console-q");
  var dial = root.querySelector(".score-dial");
  var dialN = dial && dial.querySelector(".dial-n");
  var FULL = typed ? typed.textContent : "";

  var S = [0, 2400, 4000, 6100, 7800, 9900, 11500];   // 每一步开始的时间
  var OUT = 14500, LOOP = 15200;                        // 淡出、回到开头
  var TYPE0 = 250, TYPE_MS = 85, SCAN0 = 1250;          // 打字、扫描

  var items = [].map.call(root.querySelectorAll("[data-at]"), function (el) {
    var at = S[+el.getAttribute("data-at")] + 1000 * (parseFloat(el.getAttribute("data-d")) || 0);
    return { el: el, at: at, on: null };
  });

  // 只做一次：每条连线配一个遮罩（从起点画到箭头），每个带 data-hit 的节点加一圈高亮环。
  var built = false;
  function build() {
    if (built || !svg) return;
    built = true;
    var NS = "http://www.w3.org/2000/svg";
    var defs = svg.querySelector("defs");
    svg.querySelectorAll(".edge").forEach(function (edge, i) {
      var m = document.createElementNS(NS, "mask");
      m.id = "cdraw-" + i;
      m.setAttribute("maskUnits", "userSpaceOnUse");
      m.setAttribute("x", "-20"); m.setAttribute("y", "-20"); m.setAttribute("width", "600"); m.setAttribute("height", "480");
      var p = document.createElementNS(NS, "path");
      p.setAttribute("d", edge.getAttribute("d"));
      p.setAttribute("pathLength", "1");
      p.setAttribute("class", "draw");
      m.appendChild(p);
      defs.appendChild(m);
      edge.setAttribute("mask", "url(#cdraw-" + i + ")");
      items.forEach(function (it) { if (it.el === edge) it.draw = p; });
    });
    svg.querySelectorAll(".node[data-hit]").forEach(function (node) {
      var shape = node.querySelector("rect, circle");
      var h = shape.cloneNode(false);
      h.setAttribute("class", "halo");
      if (shape.tagName === "circle") {
        h.setAttribute("r", +shape.getAttribute("r") + 6);
      } else {
        ["x", "y"].forEach(function (k) { h.setAttribute(k, +shape.getAttribute(k) - 5); });
        h.setAttribute("width", +shape.getAttribute("width") + 10);
        h.setAttribute("height", +shape.getAttribute("height") + 10);
        h.setAttribute("rx", +shape.getAttribute("rx") + 5);
      }
      node.insertBefore(h, node.firstChild);
    });
  }

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ease(x) { x = clamp(x); return x * x * (3 - 2 * x); }
  function flag(cls, on) { if (root.classList.contains(cls) !== on) root.classList.toggle(cls, on); }
  function attr(k, v) { if (root.getAttribute(k) !== v) root.setAttribute(k, v); }

  var lastScore = -1, lastChars = -1;
  // 把整个 console 摆成时间轴上 t 毫秒时的样子
  function render(t) {
    var out = t >= OUT;
    var step = 0;
    for (var i = 0; i < S.length; i++) if (t >= S[i]) step = i;
    attr("data-step", String(step));
    attr("data-active", !out && step >= 2 && step <= 5 ? String(step - 1) : "");
    flag("is-out", out);

    // 地址逐字打出
    var chars = Math.max(0, Math.min(FULL.length, Math.floor((t - TYPE0) / TYPE_MS) + 1));
    if (out) chars = FULL.length;
    if (typed && chars !== lastChars) { typed.textContent = FULL.slice(0, chars); lastChars = chars; }
    flag("is-typing", !out && t < SCAN0);
    flag("is-scan", t >= SCAN0 && !out);
    flag("is-scanning", t >= SCAN0 && t < S[6]);
    if (field) field.style.setProperty("--p", out ? 0 : clamp((t - SCAN0) / (S[6] - SCAN0)).toFixed(3));

    items.forEach(function (it) {
      var on = !out && t >= it.at;
      if (on === it.on) return;
      it.on = on;
      it.el.classList.toggle("is-shown", on);
      if (it.draw) it.draw.classList.toggle("is-shown", on);
    });

    // 分数：命中 1 加 30，命中 2 再加 6；淡出时回到 0
    var score = 30 * ease((t - S[2] - 300) / 1000) + 6 * ease((t - S[3] - 300) / 600);
    if (out) score = 36 * (1 - ease((t - OUT) / 500));
    score = Math.round(score);
    if (dial && score !== lastScore) {
      lastScore = score;
      dial.style.setProperty("--score", score);
      dialN.textContent = score;
    }
  }

  // 回到开头：先关掉过渡，免得东西「倒着」动回去
  function reset() {
    root.classList.add("is-reset");
    render(0);
    void root.offsetWidth;
    root.classList.remove("is-reset");
  }

  function start() {
    build();
    root.classList.add("is-demo");
    reset();
  }

  // 还原成最终结果（「减少动态效果」打开时）
  function stop() {
    pause();
    root.classList.remove("is-demo", "is-out", "is-typing", "is-scan", "is-scanning");
    root.removeAttribute("data-active");
    root.removeAttribute("data-step");
    items.forEach(function (it) { it.el.classList.remove("is-shown"); it.on = null; if (it.draw) it.draw.classList.remove("is-shown"); });
    if (typed) typed.textContent = FULL;
    if (field) field.style.removeProperty("--p");
    if (dial) { dial.style.removeProperty("--score"); dialN.textContent = "36"; }
    lastScore = lastChars = -1;
    t = 0;
  }

  var t = 0, last = 0, raf = 0, playing = false, visible = false;
  function frame(now) {
    if (!playing) return;
    t += Math.min(now - last, 250);   // 卡顿或切回标签页时不一下子跳过好几步
    last = now;
    if (t >= LOOP) { t = 0; reset(); } else render(t);
    raf = requestAnimationFrame(frame);
  }
  function play() {
    if (playing || !visible || document.hidden || !root.classList.contains("is-demo")) return;
    playing = true;
    last = performance.now();
    if (svg && svg.unpauseAnimations) svg.unpauseAnimations();
    raf = requestAnimationFrame(frame);
  }
  function pause() {
    playing = false;
    cancelAnimationFrame(raf);
    if (svg && svg.pauseAnimations) svg.pauseAnimations();
  }

  // 调试钩子：?demoStep=N / ?demoAt=毫秒
  var q = new URLSearchParams(location.search);
  var freezeAt = null;
  if (q.has("demoAt")) freezeAt = Math.max(0, +q.get("demoAt") || 0);
  else if (q.has("demoStep")) {
    var n = Math.max(0, Math.min(7, parseInt(q.get("demoStep"), 10) || 0));
    freezeAt = n === 7 ? OUT + 250 : (n === 6 ? OUT : S[n + 1]) - 60;
  }
  if (freezeAt !== null) {
    start();
    t = freezeAt;
    root.classList.add("is-reset");   // 定格：不播过渡和循环动画，直接摆成这一刻各元素的最终样子
    render(t);
    // 放得下就居中；比屏幕高（手机）就让顶边停在导航条下面。马上滚一次，页面全部加载完再滚一次（字体、图片会改变高度）
    var toConsole = function () {
      var r = root.getBoundingClientRect();
      var y = r.height < window.innerHeight - 90 ? r.top - (window.innerHeight - r.height) / 2 : r.top - 80;
      window.scrollTo({ top: window.scrollY + y, behavior: "instant" });
    };
    toConsole();
    window.addEventListener("load", toConsole);
    return;
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!reduce.matches) start();
  var onReduce = function () { if (reduce.matches) stop(); else { start(); play(); } };
  if (reduce.addEventListener) reduce.addEventListener("change", onReduce); else if (reduce.addListener) reduce.addListener(onReduce);

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      var e = entries[0];
      if (!e.isIntersecting) { visible = false; pause(); }
      else if (e.intersectionRatio >= 0.25 || e.intersectionRect.height >= window.innerHeight * 0.5) { visible = true; play(); }
    }, { threshold: [0, 0.25, 0.5] }).observe(root);
  } else {
    visible = true;
    play();
  }
  document.addEventListener("visibilitychange", function () { if (document.hidden) pause(); else play(); });
})();
