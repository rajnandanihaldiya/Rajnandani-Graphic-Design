(function () {
  if (window.__cometCursor) return;
  window.__cometCursor = true;
  if (!window.matchMedia || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var N = reduce ? 1 : 8;
  function init() {
    var st = document.createElement('style');
    st.textContent = 'html.cc-on,html.cc-on *{cursor:none!important}html.cc-on input,html.cc-on textarea,html.cc-on [contenteditable]{cursor:text!important}';
    document.head.appendChild(st);
    document.documentElement.classList.add('cc-on');
    var dots = [], pts = [];
    for (var i = 0; i < N; i++) {
      var d = document.createElement('div'), s = Math.max(3, 10 - i);
      d.setAttribute('aria-hidden', 'true');
      d.style.cssText = 'position:fixed;left:0;top:0;width:' + s + 'px;height:' + s + 'px;margin:' + (-s / 2) + 'px 0 0 ' + (-s / 2) + 'px;border-radius:50%;background:#fff;mix-blend-mode:difference;pointer-events:none;z-index:2147483647;opacity:0;will-change:transform;transition:opacity .25s' + (i === 0 ? ',scale .2s cubic-bezier(.2,0,0,1)' : '') + ';' + (i ? 'opacity:0' : '');
      d.dataset.a = i === 0 ? 1 : (0.6 - i * 0.07).toFixed(2);
      document.body.appendChild(d);
      dots.push(d); pts.push({ x: -100, y: -100 });
    }
    var mx = -100, my = -100, shown = false, hot = false, down = false;
    function show(v) { if (v === shown) return; shown = v; dots.forEach(function (d) { d.style.opacity = v ? d.dataset.a : 0; }); }
    function head() { dots[0].style.scale = down ? '.7' : hot ? '2.4' : '1'; }
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!shown) pts.forEach(function (p) { p.x = mx; p.y = my; });
      var t = e.target;
      show(!(t && t.tagName === 'IFRAME'));
      var h = !!(t && t.closest && t.closest('a,button,[role="button"],[role="tab"],select,label,summary,video,[tabindex]:not([tabindex="-1"])'));
      if (h !== hot) { hot = h; head(); }
    }, { passive: true });
    document.addEventListener('mousedown', function () { down = true; head(); });
    document.addEventListener('mouseup', function () { down = false; head(); });
    document.documentElement.addEventListener('mouseleave', function () { show(false); });
    window.addEventListener('blur', function () { show(false); });
    (function loop() {
      pts[0].x = mx; pts[0].y = my;
      for (var i = 1; i < N; i++) { pts[i].x += (pts[i - 1].x - pts[i].x) * 0.42; pts[i].y += (pts[i - 1].y - pts[i].y) * 0.42; }
      for (var j = 0; j < N; j++) dots[j].style.transform = 'translate(' + pts[j].x + 'px,' + pts[j].y + 'px)';
      requestAnimationFrame(loop);
    })();
  }
  if (document.body) init(); else document.addEventListener('DOMContentLoaded', init);
})();
