/* =========================================================
   Site ayarları — "X" geçici adını buradan değiştirin.
   (Logo dosyası: assets/X.png)
   ========================================================= */
const SITE_CONFIG = {
  name: 'X',
  sliderInterval: 5000, // otomatik geçiş süresi (ms)
};

document.addEventListener('DOMContentLoaded', () => {
  applySiteName();
  initHeader();
  initSlider(document.querySelector('.slider'));
  if (typeof MEDIA_CONFIG !== 'undefined') initMedia(MEDIA_CONFIG);
  document.querySelectorAll('[data-accordion]').forEach(initAccordion);
});

/* ---------- Makaleler: aynı anda tek açık öğeli akordeon ---------- */
function initAccordion(root) {
  const triggers = Array.from(root.querySelectorAll('.article-trigger'));

  const setOpen = (btn, open) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.closest('.article-item').classList.toggle('is-open', open);
  };

  triggers.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const willOpen = btn.getAttribute('aria-expanded') !== 'true';
      triggers.forEach((other) => { if (other !== btn) setOpen(other, false); });
      setOpen(btn, willOpen);
    });

    // Enter/Boşluk butonda yerleşik; ok tuşları başlıklar arasında gezdirir
    btn.addEventListener('keydown', (e) => {
      const last = triggers.length - 1;
      const target = {
        ArrowDown: i === last ? 0 : i + 1,
        ArrowUp: i === 0 ? last : i - 1,
        Home: 0,
        End: last,
      }[e.key];
      if (target === undefined) return;
      e.preventDefault();
      triggers[target].focus();
    });
  });
}

/* ---------- Site adı ---------- */
function applySiteName() {
  const name = SITE_CONFIG.name;
  document.querySelectorAll('[data-site-name]').forEach((el) => { el.textContent = name; });
  document.querySelectorAll('.logo-img[alt]').forEach((img) => { if (img.alt) img.alt = name; });
  document.querySelectorAll('.logo, .footer-logo').forEach((a) => a.setAttribute('aria-label', `${name} ana sayfa`));
  document.title = document.title.replace(/^[^|]+\|/, `${name} |`);
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
}

/* ---------- Header: hamburger menü ve arama alanı ---------- */
function initHeader() {
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  const searchBtn = document.querySelector('.search-toggle');
  const searchPanel = document.getElementById('search-panel');
  const searchInput = document.getElementById('search-input');

  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  };

  const setSearch = (open) => {
    searchPanel.hidden = !open;
    searchBtn.setAttribute('aria-expanded', String(open));
    searchBtn.setAttribute('aria-label', open ? 'Aramayı kapat' : 'Aramayı aç');
    if (open) searchInput.focus();
  };

  menuBtn.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    setMenu(open);
    if (open) setSearch(false);
  });

  searchBtn.addEventListener('click', () => {
    const open = searchPanel.hidden;
    setSearch(open);
    if (open) setMenu(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (nav.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); }
    if (!searchPanel.hidden) { setSearch(false); searchBtn.focus(); }
  });

  // Menü dışına tıklanınca kapat
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
      setMenu(false);
    }
  });

  // Masaüstü genişliğine dönülünce mobil menü durumunu sıfırla
  window.matchMedia('(min-width: 1101px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });
}

/* ---------- Slider: sonsuz döngü, otomatik + manuel + dokunmatik ---------- */
function initSlider(root) {
  if (!root) return;

  const viewport = root.querySelector('.slider-viewport');
  const track = root.querySelector('.slider-track');
  const prevBtn = root.querySelector('.slider-prev');
  const nextBtn = root.querySelector('.slider-next');
  const slides = Array.from(track.children);
  const count = slides.length;
  if (count < 2) return;

  // Kesintisiz geçiş için baş ve sona kopya slaytlar eklenir:
  // [kopya 4] 1 2 3 4 [kopya 1]
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[count - 1].cloneNode(true);
  [firstClone, lastClone].forEach((c) => {
    c.setAttribute('aria-hidden', 'true');
    c.querySelectorAll('a').forEach((a) => a.setAttribute('tabindex', '-1'));
    c.querySelectorAll('img').forEach((img) => img.removeAttribute('loading'));
  });
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  let index = 1;            // gerçek ilk slayt
  let animating = false;
  let fallbackTimer = null;
  let autoTimer = null;
  let paused = false;

  const setPosition = (animate, offsetPx = 0) => {
    track.style.transition = animate ? '' : 'none';
    track.style.transform = `translateX(calc(${-index * 100}% + ${offsetPx}px))`;
  };

  // Kopya slayta ulaşıldığında animasyonsuz olarak gerçek karşılığına atla
  const onTransitionEnd = () => {
    clearTimeout(fallbackTimer);
    if (!animating) return;
    animating = false;
    if (index === 0) index = count;
    else if (index === count + 1) index = 1;
    setPosition(false);
    void track.offsetWidth; // reflow: atlama animasyonsuz uygulansın
    track.style.transition = '';
  };

  track.addEventListener('transitionend', (e) => {
    if (e.target === track && e.propertyName === 'transform') onTransitionEnd();
  });

  const goTo = (target) => {
    if (animating) return;
    animating = true;
    index = target;
    setPosition(true);
    // Sekme arka plandayken transitionend gelmeyebilir; güvenlik zamanlayıcısı
    fallbackTimer = setTimeout(onTransitionEnd, 800);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  /* Otomatik geçiş */
  const stopAuto = () => { clearInterval(autoTimer); autoTimer = null; };
  const startAuto = () => {
    stopAuto();
    if (paused || document.hidden) return;
    autoTimer = setInterval(next, SITE_CONFIG.sliderInterval);
  };

  prevBtn.addEventListener('click', () => { prev(); startAuto(); });
  nextBtn.addEventListener('click', () => { next(); startAuto(); });

  // Fare üzerindeyken veya klavyeyle odaklanıldığında duraklat (dokunmatikte değil)
  root.addEventListener('pointerenter', (e) => {
    if (e.pointerType === 'mouse') { paused = true; stopAuto(); }
  });
  root.addEventListener('pointerleave', (e) => {
    if (e.pointerType === 'mouse') { paused = false; startAuto(); }
  });
  root.addEventListener('focusin', (e) => {
    if (e.target.matches(':focus-visible')) { paused = true; stopAuto(); }
  });
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget) && !root.matches(':hover')) { paused = false; startAuto(); }
  });
  document.addEventListener('visibilitychange', () => (document.hidden ? stopAuto() : startAuto()));

  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prev(); }
    if (e.key === 'ArrowRight') { next(); }
  });

  /* Dokunmatik kaydırma (pointer events; fare sürüklemesi hariç) */
  let startX = 0;
  let startY = 0;
  let deltaX = 0;
  let startTime = 0;
  let dragging = false;
  let pointerId = null;

  viewport.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' || animating) return;
    dragging = true;
    pointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    deltaX = 0;
    startTime = performance.now();
    stopAuto();
  });

  viewport.addEventListener('pointermove', (e) => {
    if (!dragging || e.pointerId !== pointerId) return;
    deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    if (Math.abs(deltaX) > 6 && Math.abs(deltaX) > Math.abs(deltaY)) {
      try {
        if (!viewport.hasPointerCapture(pointerId)) viewport.setPointerCapture(pointerId);
      } catch (_) { /* yakalama desteklenmiyorsa sürükleme yine çalışır */ }
      setPosition(false, deltaX);
    }
  });

  const endDrag = (e, cancelled) => {
    if (!dragging || e.pointerId !== pointerId) return;
    dragging = false;
    const width = viewport.clientWidth;
    const elapsed = performance.now() - startTime;
    const isFlick = Math.abs(deltaX) > 30 && elapsed < 250;
    const passed = Math.abs(deltaX) > width * 0.18 || isFlick;

    if (!cancelled && passed) {
      // Sola kaydırma → sonraki, sağa kaydırma → önceki
      goTo(deltaX < 0 ? index + 1 : index - 1);
    } else if (deltaX !== 0) {
      setPosition(true);   // yerine geri dön
    }
    // Sürükleme sonrası slayttaki bağlantının istemeden açılmasını engelle
    suppressClick = Math.abs(deltaX) > 6;
    deltaX = 0;
    if (!paused) startAuto();
  };

  let suppressClick = false;
  viewport.addEventListener('pointerup', (e) => endDrag(e, false));
  viewport.addEventListener('pointercancel', (e) => endDrag(e, true));
  viewport.addEventListener('click', (e) => {
    if (suppressClick) { e.preventDefault(); suppressClick = false; }
  }, true);
  viewport.addEventListener('pointerdown', () => { suppressClick = false; }, true);

  // Başlangıç
  setPosition(false);
  void track.offsetWidth;
  track.style.transition = '';
  startAuto();
}

/* ---------- Video ve Shorts (veriler: js/media-config.js) ---------- */
const youtubeEmbedUrl = (id, params = {}) =>
  `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?${new URLSearchParams({ rel: '0', playsinline: '1', ...params })}`;
const youtubeWatchUrl = (id) => `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
const youtubeThumb = (id, name) => `https://i.ytimg.com/vi/${encodeURIComponent(id)}/${name}.jpg`;

function createYoutubeIframe(id, title, params) {
  const iframe = document.createElement('iframe');
  iframe.src = youtubeEmbedUrl(id, params);
  iframe.title = title;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  return iframe;
}

function initMedia(config) {
  initVideoSection(config);
  initShorts(config);
}

function initVideoSection({ featuredVideo, videoList = [] }) {
  const frame = document.getElementById('featured-video');
  const list = document.getElementById('video-list');

  // Ana video: site içinde oynatılır, otomatik başlamaz
  if (frame && featuredVideo) {
    // enablejsapi: Shorts açıldığında ana videoyu duraklatabilmek için
    const iframe = createYoutubeIframe(featuredVideo.id, featuredVideo.title, { enablejsapi: '1' });
    iframe.loading = 'lazy';
    frame.appendChild(iframe);
    document.getElementById('featured-title').textContent = featuredVideo.title;
    document.getElementById('featured-channel').textContent = featuredVideo.channel || '';
  }

  // Liste: her bağlantı YouTube'da yeni sekmede açılır
  if (list) {
    videoList.forEach((video) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'video-item';
      a.href = youtubeWatchUrl(video.id);
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.title = "YouTube'da izle";

      const thumb = document.createElement('span');
      thumb.className = 'video-thumb';
      const img = document.createElement('img');
      img.src = youtubeThumb(video.id, 'mqdefault');
      img.alt = '';
      img.loading = 'lazy';
      thumb.appendChild(img);

      const text = document.createElement('span');
      text.className = 'video-item-text';
      const title = document.createElement('span');
      title.className = 'video-item-title';
      title.textContent = video.title;
      const channel = document.createElement('span');
      channel.className = 'video-channel';
      channel.textContent = video.channel || '';
      const hint = document.createElement('span');
      hint.className = 'visually-hidden';
      hint.textContent = " (YouTube'da yeni sekmede açılır)";
      text.append(title, channel, hint);

      a.append(thumb, text);
      li.appendChild(a);
      list.appendChild(li);
    });
  }
}

function initShorts({ shorts = [], shortsMoreUrl }) {
  const row = document.getElementById('shorts-row');
  const more = document.getElementById('shorts-more');
  const modal = document.getElementById('shorts-modal');
  if (!row || !modal) return;

  if (more && shortsMoreUrl) more.href = shortsMoreUrl;

  const modalFrame = modal.querySelector('.video-modal-frame');
  const closeBtn = modal.querySelector('.video-modal-close');
  let lastTrigger = null;

  const pauseFeatured = () => {
    const featured = document.querySelector('#featured-video iframe');
    if (featured && featured.contentWindow) {
      featured.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
    }
  };

  const openShort = (item, trigger) => {
    lastTrigger = trigger;
    pauseFeatured();
    modalFrame.replaceChildren(createYoutubeIframe(item.id, item.title, { autoplay: '1' }));
    modal.showModal();
  };

  // Kapanınca videoyu tamamen kaldır (oynatma durur). Temizlik hem doğrudan
  // hem de 'close' olayıyla (Esc tuşu) yapılır; iki kez çalışması zararsızdır.
  const cleanup = () => {
    if (!modalFrame.firstChild) return;
    modalFrame.replaceChildren();
    if (lastTrigger) lastTrigger.focus();
  };
  const closeModal = () => {
    if (modal.open) modal.close();
    cleanup();
  };
  modal.addEventListener('close', cleanup);
  closeBtn.addEventListener('click', closeModal);
  // Arka plana tıklayınca kapat
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  shorts.forEach((item) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'short-card';
    btn.setAttribute('aria-label', `${item.title} — kısa videoyu oynat`);

    // Dikey kapak (oar2); yoksa standart kapağın ortası kırpılarak kullanılır
    const img = document.createElement('img');
    img.alt = '';
    img.loading = 'lazy';
    img.src = youtubeThumb(item.id, 'oar2');
    const fallback = () => {
      if (!img.dataset.fallback) { img.dataset.fallback = '1'; img.src = youtubeThumb(item.id, 'hqdefault'); }
    };
    img.addEventListener('error', fallback);
    img.addEventListener('load', () => { if (img.naturalWidth <= 120) fallback(); });

    const play = document.createElement('span');
    play.className = 'short-play';
    play.setAttribute('aria-hidden', 'true');
    play.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';

    const title = document.createElement('span');
    title.className = 'short-title';
    title.textContent = item.title;

    btn.append(img, play, title);
    btn.addEventListener('click', () => openShort(item, btn));
    li.appendChild(btn);
    row.appendChild(li);
  });
}
