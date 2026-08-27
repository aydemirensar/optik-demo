/* ByteString fix: btoa/atob Türkçe karakterlerde (ı=305) patlamasın */
(function () {
  try {
    var _btoa = window.btoa.bind(window);
    window.btoa = function (s) {
      try { return _btoa(s); } catch (e) { return _btoa(unescape(encodeURIComponent(s))); }
    };
  } catch (e) {}
  try {
    var _atob = window.atob.bind(window);
    window.atob = function (s) {
      try { return _atob(s); } catch (e) {
        try { return decodeURIComponent(escape(_atob(s))); } catch (e2) { return _atob(s); }
      }
    };
  } catch (e) {}
})();

(function () {
  'use strict';

  /* Floating pill header: shrink on scroll + mobile menu */
  var header = document.getElementById('vcPillHeader');
  var burger = document.getElementById('vcPillBurger');
  var mobile = document.getElementById('vcPillMobile');
  var menuReturnFocus = null;

  function onScroll() {
    if (header) {
      if (window.scrollY > 40) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    }
    if (window.scrollY > 40) document.body.classList.add('vc-scrolled');
    else document.body.classList.remove('vc-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (burger && mobile) {
    burger.setAttribute('aria-controls', mobile.id || 'vcPillMobile');
    function setMenu(open) {
      mobile.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('vc-menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        menuReturnFocus = document.activeElement;
        document.addEventListener('click', onDocumentClick);
        document.addEventListener('keydown', onMenuKeydown);
        var firstLink = mobile.querySelector('a');
        if (firstLink) firstLink.focus();
      } else {
        document.removeEventListener('click', onDocumentClick);
        document.removeEventListener('keydown', onMenuKeydown);
        if (menuReturnFocus && typeof menuReturnFocus.focus === 'function') menuReturnFocus.focus();
      }
    }
    function onDocumentClick(event) {
      if (!mobile.contains(event.target) && !burger.contains(event.target) && mobile.classList.contains('open')) setMenu(false);
    }
    function onMenuKeydown(event) {
      if (event.key === 'Escape') { setMenu(false); return; }
      if (event.key !== 'Tab' || !mobile.classList.contains('open')) return;
      var focusable = mobile.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    burger.addEventListener('click', function (event) {
      event.stopPropagation();
      setMenu(!mobile.classList.contains('open'));
    });
    mobile.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        setMenu(false);
      }
    });
  }

  /* Camera preview for homepage and AR CTA links. */
  (function () {
    var modal = document.getElementById('vcArModal');
    var video = document.getElementById('vcArVideo');
    var overlay = document.getElementById('vcArOverlay');
    var guide = modal ? modal.querySelector('.vc-ar-stage__frame') : null;
    var status = document.getElementById('vcArStatus');
    var launchers = document.querySelectorAll('.vc-ar-launch, .vc-hero .vc-btn--teal, .vc-ar-cta .vc-btn--teal, .vc-shop-tryon');
    if (!modal || !video || !launchers.length) return;
    var heroBadge = document.querySelector('.vc-ar-badge');
    if (heroBadge && (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)) {
        heroBadge.textContent = 'AR ÖNİZLEME';
    }
    var stream = null;
    var faceLandmarker = null;
    var faceLandmarkerPromise = null;
    var trackingFrame = null;
    var productCanvas = null;
    var productImage = new Image();
    productImage.onload = function () {
      var source = document.createElement('canvas');
      source.width = productImage.naturalWidth;
      source.height = productImage.naturalHeight;
      var sourceContext = source.getContext('2d');
      sourceContext.drawImage(productImage, 0, 0);
      var pixels = sourceContext.getImageData(0, 0, source.width, source.height);
      /* Beyaz arka plani seffaflastir + gozlugun bounding box'ini bul */
      var minX = source.width, minY = source.height, maxX = -1, maxY = -1;
      for (var y = 0, i = 0; y < source.height; y++) {
        for (var x = 0; x < source.width; x++, i += 4) {
          var r = pixels.data[i], g = pixels.data[i + 1], b = pixels.data[i + 2];
          var brightness = (r + g + b) / 3;
          var alpha = Math.max(0, Math.min(255, (242 - brightness) * 10));
          if (alpha > 0 && alpha < 255) {
            /* Beyaz kenar sacagini temizle: unpremultiply against white */
            var t = alpha / 255;
            r = Math.max(0, Math.min(255, (r - 255 * (1 - t)) / t));
            g = Math.max(0, Math.min(255, (g - 255 * (1 - t)) / t));
            b = Math.max(0, Math.min(255, (b - 255 * (1 - t)) / t));
            pixels.data[i] = r; pixels.data[i + 1] = g; pixels.data[i + 2] = b;
          }
          /* Cam pikselleri (altin cerceve disindaki dusuk sicaklikli renkler) yari saydam */
          if (alpha > 0 && (r - b) < 50 && brightness > 80) {
            /* Camlari koyulastir: RGB kis + yuksek opaklik = koyu duman cam */
            r = Math.round(r * 0.28); g = Math.round(g * 0.28); b = Math.round(b * 0.28);
            pixels.data[i] = r; pixels.data[i + 1] = g; pixels.data[i + 2] = b;
            alpha = Math.round(alpha * 0.92);
          }
          pixels.data[i + 3] = alpha;
          if (alpha > 32) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      if (maxX < 0) return;
      var pad = Math.max(2, Math.round(source.width * 0.008));
      minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
      maxX = Math.min(source.width - 1, maxX + pad); maxY = Math.min(source.height - 1, maxY + pad);
      productCanvas = document.createElement('canvas');
      productCanvas.width = maxX - minX + 1;
      productCanvas.height = maxY - minY + 1;
      productCanvas.getContext('2d').putImageData(pixels, -minX, -minY);
    };
    productImage.src = 'code/assets/vc-ar-black-rect.png';
    var returnFocus = null;
    var focusableSelector = 'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    function stopCamera() {
      if (trackingFrame) cancelAnimationFrame(trackingFrame);
      trackingFrame = null;
      if (stream) stream.getTracks().forEach(function (track) { track.stop(); });
      stream = null;
      video.srcObject = null;
      if (overlay) overlay.getContext('2d').clearRect(0, 0, overlay.width, overlay.height);
      if (guide) guide.style.display = '';
    }
    function drawGlasses(landmarks) {
      if (!overlay || !landmarks || !landmarks.length) return;
      var points = landmarks[0];
      var left = points[33], right = points[263];
      if (!left || !right) return;
      var width = video.videoWidth || 640, height = video.videoHeight || 480;
      overlay.width = width; overlay.height = height;
      var ctx = overlay.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      var x1 = left.x * width, y1 = left.y * height;
      var x2 = right.x * width, y2 = right.y * height;
      var centerX = (x1 + x2) / 2, centerY = (y1 + y2) / 2 + (x2 - x1) * .04;
      var span = Math.hypot(x2 - x1, y2 - y1);
      var angle = Math.atan2(y2 - y1, x2 - x1);
      var frameWidth = span * 2.35, lensWidth = frameWidth * .38, lensHeight = frameWidth * .29;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      if (productCanvas) {
        /* Gozluk olculeri: genislik 1.65x, dikey 0.88x (mobil uyumlu) */
        var drawW = span * 1.65;
        var drawH = drawW * productCanvas.height / productCanvas.width * 0.88;
        ctx.globalAlpha = .98;
        ctx.drawImage(productCanvas, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.globalAlpha = 1;
      } else {
        ctx.strokeStyle = '#0f2557';
        ctx.fillStyle = 'rgba(6,182,212,.14)';
        ctx.lineWidth = Math.max(3, span * .028);
        [-1, 1].forEach(function (side) {
          var lensX = side * (lensWidth * .58);
          ctx.beginPath();
          ctx.roundRect(lensX - lensWidth / 2, -lensHeight / 2, lensWidth, lensHeight, lensHeight * .3);
          ctx.fill(); ctx.stroke();
        });
        ctx.beginPath();
        ctx.moveTo(-lensWidth * .58, 0); ctx.lineTo(lensWidth * .58, 0); ctx.stroke();
      }
      ctx.restore();
    }
    function trackFace() {
      if (!faceLandmarker || modal.hidden || video.readyState < 2) return;
      var result = faceLandmarker.detectForVideo(video, performance.now());
      if (result && result.faceLandmarks && result.faceLandmarks.length) {
        if (guide) guide.style.display = 'none';
        drawGlasses(result.faceLandmarks);
        status.textContent = 'Yüz algılandı — çerçeveyi hizala.';
      }
      trackingFrame = requestAnimationFrame(trackFace);
    }
    function startFaceTracking() {
      if (!overlay || faceLandmarkerPromise) return faceLandmarkerPromise;
      status.textContent = 'Yüz takip modeli yükleniyor...';
      faceLandmarkerPromise = import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/vision_bundle.mjs')
        .then(function (visionModule) {
          return visionModule.FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/wasm');
        })
        .then(function (vision) {
          return import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/vision_bundle.mjs').then(function (visionModule) {
            return visionModule.FaceLandmarker.createFromOptions(vision, {
              baseOptions: {
                modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
                delegate: 'GPU'
              },
              runningMode: 'VIDEO',
              numFaces: 1
            });
          });
        })
        .then(function (landmarker) { faceLandmarker = landmarker; status.textContent = 'Yüzünü çerçeveye hizala.'; trackFace(); return landmarker; })
        .catch(function () { faceLandmarkerPromise = null; status.textContent = 'Yüz takibi yüklenemedi. Kamera önizlemesi kullanılabilir.'; return null; });
      return faceLandmarkerPromise;
    }
    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = '';
      stopCamera();
      if (returnFocus && typeof returnFocus.focus === 'function') returnFocus.focus();
    }
    function onKeydown(event) {
      if (modal.hidden) return;
      if (event.key === 'Escape') { closeModal(); return; }
      if (event.key !== 'Tab') return;
      var focusable = modal.querySelectorAll(focusableSelector);
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    function openModal(event) {
      if (event && event.currentTarget.tagName === 'A') event.preventDefault();
      returnFocus = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      modal.querySelector('.vc-ar-modal__close').focus();
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        status.textContent = 'Bu cihazda kamera önizlemesi desteklenmiyor. Ürünleri mağazada inceleyebilirsin.';
        return;
      }
      status.textContent = 'Kamera izni bekleniyor...';
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
        .then(function (mediaStream) { stream = mediaStream; video.srcObject = mediaStream; startFaceTracking(); })
        .catch(function () { status.textContent = 'Kamera izni alınamadı. Tarayıcı izinlerinden kamerayı açıp tekrar dene.'; });
    }
    launchers.forEach(function (launcher) { launcher.addEventListener('click', openModal); });
    modal.querySelectorAll('[data-ar-close]').forEach(function (button) { button.addEventListener('click', closeModal); });
    document.addEventListener('keydown', onKeydown);
  })();

  var mobileSearchToggle = document.getElementById('vcMobileSearchToggle');
  var mobileSearch = document.getElementById('vcMobileSearch');
  if (mobileSearchToggle && mobileSearch) {
    function setMobileSearch(open) {
      mobileSearch.classList.toggle('is-open', open);
      mobileSearch.setAttribute('aria-hidden', open ? 'false' : 'true');
      mobileSearchToggle.classList.toggle('is-active', open);
      mobileSearchToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        var field = document.getElementById('vcMobileSearchField');
        if (field) window.setTimeout(function () { field.focus(); }, 80);
      }
    }
    mobileSearchToggle.addEventListener('click', function () {
      setMobileSearch(!mobileSearch.classList.contains('is-open'));
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMobileSearch(false);
    });
  }

  /* Floating pill footer: peek 28px, hover/scroll ile premium siyah açılma */
  var footer = document.getElementById('vcPillFooter');
  if (footer) {
    function updateFooter() {
      var nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 120;
      if (nearBottom) footer.classList.add('is-visible');
      else footer.classList.remove('is-visible');
    }
    window.addEventListener('scroll', updateFooter, { passive: true });
    window.addEventListener('resize', updateFooter);
    footer.addEventListener('mouseenter', function () { footer.classList.add('is-visible'); });
    footer.addEventListener('mouseleave', function () { updateFooter(); });
    footer.addEventListener('focusin', function () { footer.classList.add('is-visible'); });
    footer.addEventListener('focusout', function () { setTimeout(updateFooter, 150); });
    updateFooter();
  }

  /* Active nav link */
  var path = window.location.pathname.replace(/\/$/, '');
  var links = document.querySelectorAll('.vc-pill-nav a, .vc-pill-mobile a');
  for (var i = 0; i < links.length; i++) {
    var href = (links[i].getAttribute('href') || '').replace(/\/$/, '');
    if (href === path) links[i].classList.add('is-active');
  }

  /* Mobile brand rail: full-width cards with visible progress dots. */
  (function () {
    var rail = document.querySelector('.vc-cats--brands');
    if (!rail) return;
    var cards = rail.querySelectorAll('.vc-brand-image-card');
    if (cards.length < 2) return;
    var dots = document.createElement('div');
    dots.className = 'vc-brand-dots';
    dots.setAttribute('role', 'tablist');
    dots.setAttribute('aria-label', 'Marka kartlari');
    for (var i = 0; i < cards.length; i++) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Marka ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');
      (function (index) {
        dot.addEventListener('click', function () {
          rail.scrollTo({ left: cards[index].offsetLeft - cards[0].offsetLeft, behavior: 'smooth' });
        });
      })(i);
      dots.appendChild(dot);
    }
    rail.insertAdjacentElement('afterend', dots);
    var dotButtons = dots.querySelectorAll('button');
    function updateDots() {
      var center = rail.scrollLeft + rail.clientWidth / 2;
      var active = 0, best = Infinity;
      cards.forEach(function (card, index) {
        var cardCenter = card.offsetLeft + card.offsetWidth / 2;
        var distance = Math.abs(cardCenter - center);
        if (distance < best) { best = distance; active = index; }
      });
      dotButtons.forEach(function (button, index) { button.classList.toggle('is-active', index === active); });
    }
    rail.addEventListener('scroll', updateDots, { passive: true });
    window.addEventListener('resize', updateDots);
    updateDots();
  })();
  var dockLinks = document.querySelectorAll('.vc-mobile-dock [data-dock-path]');
  for (var dockIndex = 0; dockIndex < dockLinks.length; dockIndex++) {
    var dockPath = (dockLinks[dockIndex].getAttribute('data-dock-path') || '').replace(/\/$/, '');
    if (dockPath === path) dockLinks[dockIndex].classList.add('is-active');
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.vc-reveal, .vc-ar-cta');
  function show(el) {
    var d = el.getAttribute('data-delay');
    if (d) el.style.transitionDelay = d + 'ms';
    el.classList.add('is-visible');
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          show(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(show);
  }

  /* Animated counters */
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = (target % 1 !== 0) ? 1 : 0;
    var duration = 1300;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (eased * target).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = (el.getAttribute('data-count') || '') + (el.getAttribute('data-suffix') || '');
    });
  }

  /* Marquee: duplicate content for seamless loop */
  function duplicateForLoop(selector) {
    var track = document.querySelector(selector);
    if (track) track.innerHTML += track.innerHTML;
  }
  duplicateForLoop('.vc-marquee .vc-marquee-track');
  duplicateForLoop('.vc-testi .vc-testi-track');

  /* Featured products slider: auto-play carousel, seamless loop */
  (function () {
    var slider = document.getElementById('vcProdSlider');
    if (!slider) return;
    var track = slider.querySelector('.vc-prod-track');
    if (!track) return;
     var prevBtn = slider.querySelector('.vc-prod-nav--prev');
     var nextBtn = slider.querySelector('.vc-prod-nav--next');
     var statusEl = slider.querySelector('.vc-prod-status');
     var dotsWrap = null;
    var GAP = 24;
    var INTERVAL = 3500;
    var state = { index: 0, step: 0, clones: 0, total: 0, timer: null, hover: false };

    function visibleCount() {
      var w = slider.clientWidth;
      if (w < 700) return 1;
      if (w < 900) return 2;
      return 3;
    }
    function go(index, animate) {
      state.index = index;
      track.style.transition = animate ? 'transform .8s cubic-bezier(.25, 1, .4, 1)' : 'none';
       track.style.transform = 'translateX(' + (-index * state.step) + 'px)';
       if (statusEl && state.total) statusEl.textContent = ((index % state.total) + 1) + ' / ' + state.total;
       if (dotsWrap && state.total) {
         var active = ((index % state.total) + state.total) % state.total;
         dotsWrap.querySelectorAll('button').forEach(function (dot, dotIndex) { dot.classList.toggle('is-active', dotIndex === active); });
       }
    }
    function build() {
      slider.setAttribute('aria-busy','true');
      var cards = Array.prototype.slice.call(track.children);
      if (state.clones > 0) {
        cards.slice(-state.clones).forEach(function (c) { c.parentNode.removeChild(c); });
        cards = Array.prototype.slice.call(track.children);
      }
      var vis = visibleCount();
       var gap = slider.clientWidth < 700 ? 0 : GAP;
       var w = slider.clientWidth < 700
         ? slider.clientWidth
         : (slider.clientWidth - gap * (vis - 1)) / vis;
      cards.forEach(function (c) { c.style.width = w + 'px'; });
       state.step = w + gap;
       state.total = cards.length;
       if (!dotsWrap) {
         dotsWrap = document.createElement('div');
         dotsWrap.className = 'vc-prod-dots';
         dotsWrap.setAttribute('role', 'tablist');
         dotsWrap.setAttribute('aria-label', 'Öne çıkan modeller');
         var controls = slider.querySelector('.vc-prod-controls');
         if (controls) controls.appendChild(dotsWrap);
       }
       if (dotsWrap.children.length !== state.total) {
         dotsWrap.innerHTML = '';
         for (var dotIndex = 0; dotIndex < state.total; dotIndex++) {
           var dot = document.createElement('button');
           dot.type = 'button';
           dot.setAttribute('role', 'tab');
           dot.setAttribute('aria-label', 'Model ' + (dotIndex + 1));
           (function (targetIndex) {
             dot.addEventListener('click', function () { stop(); go(targetIndex, true); start(); });
           })(dotIndex);
           dotsWrap.appendChild(dot);
         }
       }
      var frag = document.createDocumentFragment();
      for (var i = 0; i < vis && i < cards.length; i++) {
        frag.appendChild(cards[i].cloneNode(true));
      }
      track.appendChild(frag);
      state.clones = Math.min(vis, cards.length);
      go(0, false);
      slider.removeAttribute('aria-busy');
    }
    function next() {
      if (state.index >= state.total) {
        go(0, false);
        requestAnimationFrame(function () { go(1, true); });
      } else {
        go(state.index + 1, true);
      }
    }
    function prev() {
      if (state.index <= 0) {
        go(state.total, false);
        requestAnimationFrame(function () { go(state.total - 1, true); });
      } else {
        go(state.index - 1, true);
      }
    }
    function start() {
      if (state.timer) return;
      state.timer = setInterval(function () { if (!state.hover) next(); }, INTERVAL);
    }
    function stop() {
      if (state.timer) { clearInterval(state.timer); state.timer = null; }
    }
    if (prevBtn) prevBtn.addEventListener('click', function () { stop(); prev(); start(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { stop(); next(); start(); });
    var touchStartX = 0;
    slider.addEventListener('touchstart', function (event) {
      touchStartX = event.touches && event.touches[0] ? event.touches[0].clientX : 0;
      stop();
    }, { passive: true });
    slider.addEventListener('touchend', function (event) {
      var touchEndX = event.changedTouches && event.changedTouches[0] ? event.changedTouches[0].clientX : touchStartX;
      var distance = touchEndX - touchStartX;
      if (Math.abs(distance) > 40) {
        if (distance < 0) next();
        else prev();
      }
      start();
    }, { passive: true });
    slider.addEventListener('mouseenter', function () { state.hover = true; });
    slider.addEventListener('mouseleave', function () { state.hover = false; });
    window.addEventListener('resize', build);
    build();
    start();
  })();

  /* Three-step mobile rail indicator. */
  (function () {
    var wrap = document.querySelector('.vc-steps');
    if (!wrap) return;
    var steps = wrap.querySelectorAll('.vc-step');
    if (steps.length < 2) return;
    var dots = document.createElement('div');
    dots.className = 'vc-steps-dots';
    dots.setAttribute('role', 'tablist');
    dots.setAttribute('aria-label', 'Yeni gözlük adımları');
    for (var i = 0; i < steps.length; i++) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Adım ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');
      (function (index) {
        dot.addEventListener('click', function () {
          steps[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });
      })(i);
      dots.appendChild(dot);
    }
    wrap.insertAdjacentElement('afterend', dots);
    var dotButtons = dots.querySelectorAll('button');
    function updateSteps() {
      var center = wrap.scrollLeft + wrap.clientWidth / 2;
      var active = 0, best = Infinity;
      steps.forEach(function (step, index) {
        var stepCenter = step.offsetLeft + step.offsetWidth / 2;
        var distance = Math.abs(stepCenter - center);
        if (distance < best) { best = distance; active = index; }
      });
      dotButtons.forEach(function (button, index) { button.classList.toggle('is-active', index === active); });
    }
    wrap.addEventListener('scroll', updateSteps, { passive: true });
    window.addEventListener('resize', updateSteps);
    updateSteps();
  })();

  /* FAQ accordion: close others when one opens */
  var faqs = document.querySelectorAll('.vc-faq details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        faqs.forEach(function (o) { if (o !== d) o.open = false; });
      }
    });
  });

  /* Button ripple — track mouse position for radial gradient */
  // Newsletter hardening: prevent double submit + live region
  document.querySelectorAll('.vc-newsletter form').forEach(function(nf){
    var emailInput=nf.querySelector('input[type="email"]');
    var errBox=nf.querySelector('#vcNewsletterError');
    nf.addEventListener('submit', function(e){
      var v=emailInput ? emailInput.value.trim() : '';
      var valid = v.length>0 && v.length<=254 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
      if(!valid){
        e.preventDefault();
        if(errBox){ errBox.textContent='Lütfen geçerli bir e-posta girin (örn. ad@ornek.com)'; errBox.style.display='block'; }
        if(emailInput){ emailInput.setAttribute('aria-invalid','true'); emailInput.focus(); }
        return;
      }
      if(errBox){ errBox.style.display='none'; errBox.textContent=''; }
      if(emailInput) emailInput.removeAttribute('aria-invalid');
      var b=nf.querySelector('button[type="submit"]'); if(b){ b.disabled=true; b.classList.add('is-loading'); b.setAttribute('aria-busy','true'); }
    });
    if(emailInput){ emailInput.addEventListener('input', function(){ if(errBox){ errBox.style.display='none'; } emailInput.removeAttribute('aria-invalid'); }); }
  });
  document.querySelectorAll('.vc-btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      var y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      btn.style.setProperty('--x', x + '%');
      btn.style.setProperty('--y', y + '%');
    });
  });

  /* ========================================================= 
     Prescription Upload Form — Bold Upload Handler
     ========================================================= */
  (function () {
    var form = document.querySelector('.vc-recete-form');
    if (!form) return;

    var fileInput = form.querySelector('.vc-dropzone-input');
    var zone = form.querySelector('.vc-dropzone-zone');
    var submitBtn = form.querySelector('.vc-upload-submit');
    var previewBox = form.querySelector('.vc-file-preview');
    var previewBadge = form.querySelector('.vc-file-preview-badge');
    var previewName = form.querySelector('.vc-file-name');
    var previewSize = form.querySelector('.vc-file-size');
    var previewRemove = form.querySelector('.vc-file-remove');
    var progressFill = form.querySelector('.vc-upload-progress-fill');
    var dropzonePrompt = form.querySelector('.vc-dropzone-prompt');
    var dropzoneLink = form.querySelector('.vc-dropzone-link');
    var submitText = submitBtn ? submitBtn.querySelector('.vc-btn-text') : null;

    var ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
    var MAX_SIZE = 5 * 1024 * 1024; // 5 MB
    var selectedFile = null;

    function formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      var k = 1024;
      var sizes = ['Bytes', 'KB', 'MB'];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    function getFileExtension(name) {
      var ext = name.split('.').pop().toUpperCase();
      if (ext.length > 5) ext = 'FILE';
      return ext;
    }

    function validateFile(file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return { valid: false, error: 'Geçersiz dosya türü. PDF, JPG veya PNG yükleyin.' };
      }
      if (file.size > MAX_SIZE) {
        return { valid: false, error: 'Dosya çok büyük. 5 MB\'a kadar yükleyin.' };
      }
      return { valid: true };
    }

    function showFile(file) {
      selectedFile = file;
      previewBadge.textContent = getFileExtension(file.name);
      previewName.textContent = file.name;
      previewSize.textContent = formatFileSize(file.size);
      zone.classList.add('is-selected');
      zone.classList.remove('is-error');
      submitBtn.disabled = false;
    }

    function clearFile() {
      selectedFile = null;
      fileInput.value = '';
      zone.classList.remove('is-selected', 'is-uploading', 'is-error');
      var eb = document.getElementById('vcReceteError'); if (eb) { eb.style.display='none'; eb.textContent=''; }
      submitBtn.disabled = true;
      form.removeAttribute('aria-busy');
      submitBtn.removeAttribute('aria-busy');
      if (submitText) submitText.textContent = 'Gönder';
      progressFill.style.width = '0';
    }

    // Click to select
    zone.addEventListener('click', function () {
      if (!zone.classList.contains('is-uploading')) {
        fileInput.click();
      }
    });
    zone.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!zone.classList.contains('is-uploading')) fileInput.click(); }
    });

    // Drop link click
    if (dropzoneLink) {
      dropzoneLink.addEventListener('click', function (e) {
        e.preventDefault();
        fileInput.click();
      });
    }

    // File input change
    fileInput.addEventListener('change', function () {
      var file = fileInput.files[0];
      if (!file) return;
      var validation = validateFile(file);
      var errBox = document.getElementById('vcReceteError');
      if (!validation.valid) {
        zone.classList.add('is-error');
        if (errBox) { errBox.textContent = validation.error; errBox.style.display = 'block'; }
        fileInput.value = '';
        return;
      }
      if (errBox) { errBox.style.display = 'none'; errBox.textContent = ''; }
      showFile(file);
    });

    // Drag & drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
      zone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    zone.addEventListener('dragover', function () {
      if (!zone.classList.contains('is-uploading')) {
        zone.classList.add('is-dragover');
      }
    });

    zone.addEventListener('dragleave', function () {
      zone.classList.remove('is-dragover');
    });

    zone.addEventListener('drop', function (e) {
      zone.classList.remove('is-dragover');
      var files = e.dataTransfer.files;
      if (files.length === 0) return;
      var file = files[0];
      var validation = validateFile(file);
      var errBox2 = document.getElementById('vcReceteError');
      if (!validation.valid) {
        zone.classList.add('is-error');
        if (errBox2) { errBox2.textContent = validation.error; errBox2.style.display = 'block'; }
        return;
      }
      if (errBox2) { errBox2.style.display = 'none'; errBox2.textContent = ''; }
      fileInput.files = files;
      showFile(file);
    });

    // Remove file
    previewRemove.addEventListener('click', function (e) {
      e.stopPropagation();
      clearFile();
    });

    // Form submit
    form.addEventListener('submit', function (e) {
      if (!selectedFile || zone.classList.contains('is-uploading')) {
        e.preventDefault();
        return;
      }
      zone.classList.add('is-uploading');
      submitBtn.disabled = true;
      form.setAttribute('aria-busy', 'true');
      submitBtn.setAttribute('aria-busy', 'true');
      if (submitText) submitText.textContent = 'Gönderiliyor...';
      // Simulate progress
      var progress = 0;
      var interval = setInterval(function () {
        progress += Math.random() * 35;
        if (progress > 95) progress = 95;
        progressFill.style.width = progress + '%';
        if (progress >= 95) clearInterval(interval);
      }, 200);
    });
  })();

  /* =========================================================
     Shop — hybrid filtre mantığı (client-side demo filtering)
     ========================================================= */
  (function () {
    var chips = document.querySelectorAll('#vcBrandChips .vc-chip[data-filter]');
    var grid = document.querySelector('ul.products.vc-shop-grid');
    if (!grid || !chips.length) return;

    var activeBrand = 'all';
    var activeNeed = [];
    var activeFrame = [];
    var activeGender = [];
    var activeColor = null;
    var saleOnly = false;
    var priceMinEl = document.getElementById('vcPriceMin');
    var priceMaxEl = document.getElementById('vcPriceMax');
    var saleOnlyEl = document.getElementById('vcSaleOnly');
    var countEl = document.getElementById('vcShopCount');
    var activeWrap = document.getElementById('vcActiveFilters');
    var clearBtn = document.getElementById('vcClearFilters');
    var clearBtn2 = document.getElementById('vcFilterClear2');
    var badge = document.getElementById('vcFilterBadge');
    var sortEl = document.getElementById('vcShopSort');
    var colorDots = document.querySelectorAll('.vc-color-dot');
    var needChecks = document.querySelectorAll('[data-group=\"need\"]');
    var frameChecks = document.querySelectorAll('[data-group=\"frame\"]');
    var genderChecks = document.querySelectorAll('[data-group=\"gender\"]');

    function getCards() { return Array.prototype.slice.call(grid.querySelectorAll('li.product')); }

    function updateActiveChips() {
      // brand chips
      chips.forEach(function (c) {
        var f = c.getAttribute('data-filter');
        if (f === activeBrand) c.classList.add('is-active');
        else c.classList.remove('is-active');
      });
      // active filters bar
      var parts = [];
      if (activeBrand !== 'all') parts.push('<span class=\"vc-active-filter\">' + activeBrand + ' <button type=\"button\" data-clear=\"brand\" aria-label=\"Kaldır\">×</button></span>');
      activeNeed.forEach(function (v) { parts.push('<span class=\"vc-active-filter\">' + v + ' <button type=\"button\" data-clear=\"need\" data-val=\"' + v + '\" aria-label=\"Kaldır\">×</button></span>'); });
      activeFrame.forEach(function (v) { parts.push('<span class=\"vc-active-filter\">' + v + ' <button type=\"button\" data-clear=\"frame\" data-val=\"' + v + '\" aria-label=\"Kaldır\">×</button></span>'); });
      if (saleOnly) parts.push('<span class=\"vc-active-filter\">İndirim <button type=\"button\" data-clear=\"sale\" aria-label=\"Kaldır\">×</button></span>');
      if (activeColor) parts.push('<span class=\"vc-active-filter\">' + activeColor + ' <button type=\"button\" data-clear=\"color\" aria-label=\"Kaldır\">×</button></span>');
      if (activeWrap) activeWrap.innerHTML = parts.join('');
      // badge
      var n = (activeBrand !== 'all' ? 1 : 0) + activeNeed.length + activeFrame.length + activeGender.length + (activeColor ? 1 : 0) + (saleOnly ? 1 : 0);
      if (badge) { badge.textContent = n; badge.style.display = n ? 'inline-block' : 'none'; }
      if (activeWrap) {
        activeWrap.querySelectorAll('button').forEach(function (b) {
          b.addEventListener('click', function () {
            var t = b.getAttribute('data-clear');
            var v = b.getAttribute('data-val');
            if (t === 'brand') { activeBrand = 'all'; }
            if (t === 'need') { activeNeed = activeNeed.filter(function (x) { return x !== v; }); needChecks.forEach(function (c) { if (c.value === v) c.checked = false; }); }
            if (t === 'frame') { activeFrame = activeFrame.filter(function (x) { return x !== v; }); frameChecks.forEach(function (c) { if (c.value === v) c.checked = false; }); }
            if (t === 'sale') { saleOnly = false; if (saleOnlyEl) saleOnlyEl.checked = false; }
            if (t === 'color') { activeColor = null; colorDots.forEach(function (d) { d.classList.remove('is-active'); }); }
            apply();
          });
        });
      }
    }

    function apply() {
      var min = parseInt(priceMinEl && priceMinEl.value ? priceMinEl.value : '0', 10);
      var max = parseInt(priceMaxEl && priceMaxEl.value ? priceMaxEl.value : '99999', 10);
      var cards = getCards();
      var visible = 0;
      cards.forEach(function (li) {
        var dataEl = li.querySelector('.vc-shop-data');
        var d = dataEl ? {
          brand: dataEl.getAttribute('data-brand') || '',
          need: dataEl.getAttribute('data-need') || '',
          price: parseInt(dataEl.getAttribute('data-price') || '0', 10),
          color: dataEl.getAttribute('data-color') || '',
          frame: dataEl.getAttribute('data-frame') || '',
          sale: dataEl.getAttribute('data-sale') === '1'
        } : null;
        if (!d) { li.style.display = ''; visible++; return; }
        var ok = true;
        if (activeBrand !== 'all' && d.brand !== activeBrand && d.brand.indexOf(activeBrand) === -1) ok = false;
        if (ok && activeNeed.length && activeNeed.indexOf(d.need) === -1) ok = false;
        if (ok && activeFrame.length && activeFrame.indexOf(d.frame) === -1) ok = false;
        if (ok && activeColor && d.color !== activeColor) ok = false;
        if (ok && saleOnly && !d.sale) ok = false;
        if (ok && (d.price < min || d.price > max)) ok = false;
        li.style.display = ok ? '' : 'none';
        if (ok) visible++;
      });
      // sort visible
      if (sortEl && sortEl.value !== 'default') {
        var visCards = cards.filter(function (li) { return li.style.display !== 'none'; });
        var hidden = cards.filter(function (li) { return li.style.display === 'none'; });
        visCards.sort(function (a, b) {
          var da = a.querySelector('.vc-shop-data'), db = b.querySelector('.vc-shop-data');
          var pa = da ? parseInt(da.getAttribute('data-price')||'0',10) : 0;
          var pb = db ? parseInt(db.getAttribute('data-price')||'0',10) : 0;
          if (sortEl.value === 'price-asc') return pa - pb;
          if (sortEl.value === 'price-desc') return pb - pa;
          if (sortEl.value === 'name') return a.textContent.localeCompare(b.textContent);
          return 0;
        });
        visCards.forEach(function (li) { grid.appendChild(li); });
        hidden.forEach(function (li) { grid.appendChild(li); });
      }
      if (countEl) countEl.innerHTML = '<strong>' + visible + '</strong> ürün gösteriliyor';
      updateActiveChips();
      // empty state
      var empty = document.getElementById('vcShopEmpty');
      if (visible === 0) {
        if (!empty) {
          empty = document.createElement('div');
          empty.id = 'vcShopEmpty';
          empty.className = 'vc-empty-state';
          empty.innerHTML = '<div style=\"font-size:2rem;\">◯</div><h3>Filtreye uyan ürün yok</h3><p>Filtreleri gevşetmeyi deneyin veya tümünü temizleyin.</p><button class=\"vc-btn\" type=\"button\" id=\"vcEmptyClear\">Filtreleri Temizle</button>';
          grid.parentNode.insertBefore(empty, grid.nextSibling);
          empty.querySelector('#vcEmptyClear').addEventListener('click', clearAll);
        }
        empty.style.display = '';
        grid.style.display = 'none';
      } else {
        if (empty) empty.style.display = 'none';
        grid.style.display = '';
      }
    }

    function clearAll() {
      activeBrand = 'all';
      activeNeed = []; activeFrame = []; activeGender = []; activeColor = null; saleOnly = false;
      needChecks.forEach(function (c) { c.checked = false; });
      frameChecks.forEach(function (c) { c.checked = false; });
      genderChecks.forEach(function (c) { c.checked = false; });
      colorDots.forEach(function (d) { d.classList.remove('is-active'); });
      if (saleOnlyEl) saleOnlyEl.checked = false;
      if (priceMinEl) priceMinEl.value = '1200';
      if (priceMaxEl) priceMaxEl.value = '5000';
      if (sortEl) sortEl.value = 'default';
      apply();
    }

    // events
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        var f = c.getAttribute('data-filter');
        if (!f) return;
        activeBrand = f;
        apply();
      });
    });
    needChecks.forEach(function (c) { c.addEventListener('change', function () { activeNeed = Array.prototype.slice.call(needChecks).filter(function (x){return x.checked;}).map(function(x){return x.value;}); apply(); }); });
    frameChecks.forEach(function (c) { c.addEventListener('change', function () { activeFrame = Array.prototype.slice.call(frameChecks).filter(function (x){return x.checked;}).map(function(x){return x.value;}); apply(); }); });
    genderChecks.forEach(function (c) { c.addEventListener('change', function () { activeGender = Array.prototype.slice.call(genderChecks).filter(function (x){return x.checked;}).map(function(x){return x.value;}); apply(); }); });
    colorDots.forEach(function (d) {
      d.addEventListener('click', function () {
        var col = d.getAttribute('data-color');
        if (activeColor === col) { activeColor = null; d.classList.remove('is-active'); }
        else { colorDots.forEach(function (x){x.classList.remove('is-active');}); activeColor = col; d.classList.add('is-active'); }
        apply();
      });
    });
    if (saleOnlyEl) saleOnlyEl.addEventListener('change', function () { saleOnly = saleOnlyEl.checked; apply(); });
    function debounce(fn, ms){ var t; return function(){ var a=arguments; clearTimeout(t); t=setTimeout(function(){ fn.apply(null,a); }, ms); }; }
    if (priceMinEl) priceMinEl.addEventListener('input', debounce(apply, 300));
    if (priceMaxEl) priceMaxEl.addEventListener('input', debounce(apply, 300));
    if (sortEl) sortEl.addEventListener('change', apply);
    if (clearBtn) clearBtn.addEventListener('click', clearAll);
    if (clearBtn2) clearBtn2.addEventListener('click', clearAll);

    // drawer
    var drawer = document.getElementById('vcShopDrawer');
    var openBtn = document.getElementById('vcOpenDrawer');
    var closeBtn = document.getElementById('vcCloseDrawer');
    var mount = document.getElementById('vcDrawerMount');
    var sidebar = document.getElementById('vcShopFilters');
    var drawerReturnFocus = null;
    function onDrawerKeydown(event) {
      if (!drawer || !drawer.classList.contains('open')) return;
      if (event.key === 'Escape') { closeDrawer(); return; }
      if (event.key !== 'Tab') return;
      var focusable = drawer.querySelectorAll('button, input, select, a[href], [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    function openDrawer() {
      if (!drawer || !sidebar || !mount) return;
      drawerReturnFocus = document.activeElement;
      // clone sidebar content into drawer on first open
      if (!mount.hasChildNodes()) {
        var clone = sidebar.cloneNode(true);
        clone.removeAttribute('id');
        clone.style.display = 'block';
        clone.style.position = 'static';
        mount.appendChild(clone);
        // rebind inside clone
        clone.querySelectorAll('input').forEach(function (inp) {
          inp.addEventListener('change', function () {
            var orig = sidebar.querySelector('[value=\"' + inp.value + '\"]');
            if (orig) { orig.checked = inp.checked; orig.dispatchEvent(new Event('change', {bubbles:true})); }
            if (inp.id === 'vcSaleOnly') { if (saleOnlyEl) { saleOnlyEl.checked = inp.checked; saleOnlyEl.dispatchEvent(new Event('change', {bubbles:true})); } }
          });
        });
        clone.querySelectorAll('.vc-color-dot').forEach(function (dot) {
          dot.addEventListener('click', function () {
            var col = dot.getAttribute('data-color');
            var origDot = sidebar.querySelector('.vc-color-dot[data-color=\"' + col + '\"]');
            if (origDot) origDot.click();
          });
        });
        var c2 = clone.querySelector('#vcFilterClear2');
        if (c2) c2.addEventListener('click', clearAll);
      }
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onDrawerKeydown);
      if (closeBtn) closeBtn.focus();
    }
    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onDrawerKeydown);
      if (drawerReturnFocus && typeof drawerReturnFocus.focus === 'function') drawerReturnFocus.focus();
    }
    if (openBtn) openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (drawer) drawer.addEventListener('click', function (e) { if (e.target === drawer) closeDrawer(); });

    // initial
    updateActiveChips();
    // apply after short delay to let Woo render
    setTimeout(apply, 80);
  })();
})();
