$root = $PSScriptRoot

$head = '<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="code/storefront.css">
<link rel="stylesheet" href="code/gutenberg-blocks.css">
<link rel="stylesheet" href="code/wc-blocks.css">
<link rel="stylesheet" href="code/icons.css">
<link rel="stylesheet" href="code/woocommerce.css">
<link rel="stylesheet" href="code/brands.css">
<link rel="stylesheet" href="code/visioncraft.css">
</head>
<body class="page woocommerce-no-js storefront-full-width-content">'

$nav = '<header class="vc-pill-header" id="vcPillHeader">
  <div class="vc-pill-inner">
    <a class="vc-pill-logo" href="homepage.html">
      <span class="vc-logo-ico"><img class="vc-icon vc-icon--light" src="code/assets/glasses.png" alt="" width="18" height="18" /></span>
      <span class="vc-logo-copy"><strong>VisionCraft</strong><small>OPT&#304;K</small></span>
    </a>
    <nav class="vc-pill-nav" aria-label="Ana men&#252;">
      <a href="homepage.html">Ana Sayfa</a><a href="magaza.html">Ma&#287;aza</a><a href="recete-yukle.html">Re&#231;ete Y&#252;kle</a><a href="hakkimizda.html">Hakk&#305;m&#305;zda</a><a href="iletisim.html">&#304;leti&#351;im</a>
    </nav>
    <div class="vc-pill-actions">
      <a class="vc-pill-cart" href="sepet.html" aria-label="Sepet">
        <span class="vc-pill-cart-text">Sepetim</span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      </a>
      <a class="vc-pill-btn" href="tel:+905425304245">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span class="vc-pill-btn-text">Hemen G&#246;r&#252;&#351;elim</span>
      </a>
      <button class="vc-pill-burger" id="vcPillBurger" aria-label="Men&#252;"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>'

$footer = '<footer id="colophon" class="site-footer" role="contentinfo">
  <div class="col-full">
    <div class="vc-pill-footer" id="vcPillFooter">
      <div class="vc-pill-footer-inner">
        <div class="vc-footer-col">
          <a class="vc-footer-logo" href="homepage.html">
            <span class="vc-footer-logo-ico"><img class="vc-icon vc-icon--light" src="code/assets/glasses.png" alt="" width="18" height="18" /></span>
            <span class="vc-logo-copy"><strong>VisionCraft</strong><small>OPT&#304;K</small></span>
          </a>
          <p>15 y&#305;ld&#305;r mahallenizin g&#252;venilir g&#246;zl&#252;k&#231;&#252;s&#252;.</p>
          <div class="vc-footer-social">
            <a href="#" aria-label="Instagram"><img src="code/assets/instagram.png" alt="Instagram" width="20" height="20" loading="lazy" /></a>
            <a href="#" aria-label="WhatsApp"><img src="code/assets/whatsapp.png" alt="WhatsApp" width="20" height="20" loading="lazy" /></a>
          </div>
        </div>
        <div class="vc-footer-col">
          <h4>Al&#305;&#351;veri&#351;</h4>
          <a href="magaza.html">Ma&#287;aza</a>
          <a href="sepet.html">Sepet</a>
        </div>
        <div class="vc-footer-col">
          <h4>Destek</h4>
          <a href="recete-yukle.html">Re&#231;ete Y&#252;kle</a>
          <a href="hakkimizda.html">Hakk&#305;m&#305;zda</a>
          <a href="iletisim.html">&#304;leti&#351;im</a>
        </div>
        <div class="vc-footer-col">
          <h4>&#304;leti&#351;im</h4>
          <p><strong>Adres:</strong> KuleSite AVM, Sel&#231;uklu / Konya</p>
          <p><strong>Telefon:</strong> +90 542 530 42 45</p>
          <p><strong>E-posta:</strong> info@visioncraft.com.tr</p>
        </div>
      </div>
      <div class="vc-pill-footer-bottom">
        <span>&#169; 2026 VisionCraft Optik. T&#252;m haklar&#305; sakl&#305;d&#305;r.</span>
      </div>
    </div>
  </div>
</footer>
<script src="code/visioncraft.js"></script>
</body>
</html>'

# ---- SHOP PAGE ----
$shopBody = '<div id="page" class="hfeed site">
  <div id="content" class="site-content"><div class="col-full"><div id="primary" class="content-area"><main id="main" class="site-main" role="main">
    <article class="post page">
      <header class="entry-header"><h1 class="entry-title">Ma&#287;aza</h1></header>
      <div class="entry-content">
        <div class="vc-section-head vc-reveal">
          <span class="vc-kicker">T&#252;m Modeller</span>
          <h2>G&#246;zl&#252;k Koleksiyonu</h2>
          <p>Ray-Ban, Oakley, Police, Carrera ve Mustang''den orijinal &#231;er&#231;eveler.</p>
        </div>
        <div class="vc-prod-slider" id="vcProdSlider">
          <div class="vc-prod-viewport"><div class="vc-prod-track">
            <a class="vc-prod-card" href="sepet.html"><span class="vc-prod-img"><img src="code/assets/oakley-ox-3218-titanium-1-324x324.jpg" alt="Oakley OX-3218" width="324" height="324" loading="lazy" /></span><span class="vc-prod-body"><span class="vc-prod-name">Oakley OX-3218 Optik Titanium Gri</span><span class="vc-prod-price"><span class="woocommerce-Price-amount amount"><bdi>4.690,00 &#8378;</bdi></span></span><span class="vc-prod-buy">Sipari&#351; Ver</span></span></a>
            <a class="vc-prod-card" href="sepet.html"><span class="vc-prod-img"><img src="code/assets/oakley-holbrook-oo9244-1-324x324.jpg" alt="Oakley Holbrook" width="324" height="324" loading="lazy" /></span><span class="vc-prod-body"><span class="vc-prod-name">Oakley Holbrook OO9244 Mat Siyah</span><span class="vc-prod-price"><del><span class="woocommerce-Price-amount amount"><bdi>4.290,00 &#8378;</bdi></span></del> <ins><span class="woocommerce-Price-amount amount"><bdi>3.890,00 &#8378;</bdi></span></ins></span><span class="vc-prod-buy">Sipari&#351; Ver</span></span></a>
            <a class="vc-prod-card" href="sepet.html"><span class="vc-prod-img"><img src="code/assets/police-vpll92-legend-2-1-324x324.jpg" alt="Police Legend 2" width="324" height="324" loading="lazy" /></span><span class="vc-prod-body"><span class="vc-prod-name">Police VPLL92 Legend 2 Mavi</span><span class="vc-prod-price"><span class="woocommerce-Price-amount amount"><bdi>3.290,00 &#8378;</bdi></span></span><span class="vc-prod-buy">Sipari&#351; Ver</span></span></a>
            <a class="vc-prod-card" href="sepet.html"><span class="vc-prod-img"><img src="code/assets/police-vplp07-origins-lite-1-324x324.jpg" alt="Police Origins Lite" width="324" height="324" loading="lazy" /></span><span class="vc-prod-body"><span class="vc-prod-name">Police VPLP07 Origins Lite Siyah</span><span class="vc-prod-price"><del><span class="woocommerce-Price-amount amount"><bdi>3.590,00 &#8378;</bdi></span></del> <ins><span class="woocommerce-Price-amount amount"><bdi>2.990,00 &#8378;</bdi></span></ins></span><span class="vc-prod-buy">Sipari&#351; Ver</span></span></a>
            <a class="vc-prod-card" href="sepet.html"><span class="vc-prod-img"><img src="code/assets/carrera-grand-prix-2-sari-1-324x324.jpg" alt="Carrera Grand Prix" width="324" height="324" loading="lazy" /></span><span class="vc-prod-body"><span class="vc-prod-name">Carrera Grand Prix 2/S Sar&#305;</span><span class="vc-prod-price"><span class="woocommerce-Price-amount amount"><bdi>3.990,00 &#8378;</bdi></span></span><span class="vc-prod-buy">Sipari&#351; Ver</span></span></a>
            <a class="vc-prod-card" href="sepet.html"><span class="vc-prod-img"><img src="code/assets/carrera-ca-8888-havana-1-324x324.jpg" alt="Carrera 8888" width="324" height="324" loading="lazy" /></span><span class="vc-prod-body"><span class="vc-prod-name">Carrera CA-8888 Optik Havana</span><span class="vc-prod-price"><span class="woocommerce-Price-amount amount"><bdi>2.990,00 &#8378;</bdi></span></span><span class="vc-prod-buy">Sipari&#351; Ver</span></span></a>
            <a class="vc-prod-card" href="sepet.html"><span class="vc-prod-img"><img src="code/assets/carrera-1012-s-polarize-1-324x324.jpg" alt="Carrera 1012" width="324" height="324" loading="lazy" /></span><span class="vc-prod-body"><span class="vc-prod-name">Carrera 1012/S Siyah Polarize</span><span class="vc-prod-price"><del><span class="woocommerce-Price-amount amount"><bdi>3.790,00 &#8378;</bdi></span></del> <ins><span class="woocommerce-Price-amount amount"><bdi>3.290,00 &#8378;</bdi></span></ins></span><span class="vc-prod-buy">Sipari&#351; Ver</span></span></a>
            <a class="vc-prod-card" href="sepet.html"><span class="vc-prod-img"><img src="code/assets/mustang-mu-3301-progresif-1-324x324.jpg" alt="Mustang MU-3301" width="324" height="324" loading="lazy" /></span><span class="vc-prod-body"><span class="vc-prod-name">Mustang MU-3301 Progresif Uyumlu</span><span class="vc-prod-price"><span class="woocommerce-Price-amount amount"><bdi>2.490,00 &#8378;</bdi></span></span><span class="vc-prod-buy">Sipari&#351; Ver</span></span></a>
          </div></div>
          <div class="vc-prod-controls">
            <button class="vc-prod-nav vc-prod-nav--prev" type="button" aria-label="&#214;nceki"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" stroke-width="3"><path d="M19 12H5M11 18l-6-6 6-6"/></svg></button>
            <span class="vc-prod-status" aria-live="polite">1 / 8</span>
            <button class="vc-prod-nav vc-prod-nav--next" type="button" aria-label="Sonraki"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" stroke-width="3"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
          </div>
        </div>
      </div>
    </article>
  </main></div></div></div>
</div>'

# ---- CART PAGE ----
$cartBody = '<div id="page" class="hfeed site">
  <div id="content" class="site-content"><div class="col-full"><div id="primary" class="content-area"><main id="main" class="site-main" role="main">
    <article class="post page">
      <header class="entry-header"><h1 class="entry-title">Sepetim</h1></header>
      <div class="entry-content">
        <div style="text-align:center;padding:80px 20px">
          <img src="code/assets/glasses.png" alt="Sepet bo&#351;" width="80" height="80" style="opacity:0.4;margin-bottom:20px" />
          <h2 style="color:var(--vc-navy);margin-bottom:10px">Sepetiniz bo&#351;</h2>
          <p style="color:var(--vc-muted);margin-bottom:30px;max-width:400px;margin-left:auto;margin-right:auto">Hen&#252;z sepetinize &#252;r&#252;n eklemediniz. Ma&#287;azam&#305;za g&#246;z at&#305;n ve be&#287;endi&#287;iniz &#231;er&#231;eveyi sepete ekleyin.</p>
          <a class="vc-btn vc-btn--teal" href="magaza.html" style="display:inline-block">Ma&#287;azaya Git</a>
        </div>
      </div>
    </article>
  </main></div></div></div>
</div>'

# ---- ACCOUNT PAGE ----
$accountBody = '<div id="page" class="hfeed site">
  <div id="content" class="site-content"><div class="col-full"><div id="primary" class="content-area"><main id="main" class="site-main" role="main">
    <article class="post page">
      <header class="entry-header"><h1 class="entry-title">Hesab&#305;m</h1></header>
      <div class="entry-content">
        <div style="max-width:440px;margin:60px auto;padding:40px;background:var(--vc-bg-soft);border-radius:var(--vc-radius)">
          <h2 style="color:var(--vc-navy);margin-bottom:8px;text-align:center">Giri&#351; Yap</h2>
          <p style="color:var(--vc-muted);text-align:center;margin-bottom:30px;font-size:0.95rem">Hesab&#305;n&#305;za giri&#351; yaparak sipari&#351;lerinizi takip edin.</p>
          <form onsubmit="event.preventDefault();alert(''Demo s&#252;r&#252;m &#8212; giri&#351; &#246;zelli&#287;i yak&#305;nda aktif olacak.'')" style="display:flex;flex-direction:column;gap:16px">
            <div>
              <label style="display:block;font-weight:600;font-size:0.9rem;margin-bottom:6px;color:var(--vc-ink)">E-posta</label>
              <input type="email" placeholder="ornek@email.com" required style="width:100%;padding:12px 16px;border:1.5px solid var(--vc-line);border-radius:10px;font-size:1rem;font-family:inherit" />
            </div>
            <div>
              <label style="display:block;font-weight:600;font-size:0.9rem;margin-bottom:6px;color:var(--vc-ink)">&#350;ifre</label>
              <input type="password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" required style="width:100%;padding:12px 16px;border:1.5px solid var(--vc-line);border-radius:10px;font-size:1rem;font-family:inherit" />
            </div>
            <button type="submit" class="vc-btn vc-btn--teal" style="width:100%;justify-content:center">Giri&#351; Yap</button>
          </form>
          <p style="text-align:center;margin-top:20px;font-size:0.9rem;color:var(--vc-muted)">Hesab&#305;n&#305;z yok mu? <a href="#" style="color:var(--vc-teal);font-weight:600">Kay&#305;t olun</a></p>
        </div>
      </div>
    </article>
  </main></div></div></div>
</div>'

# ---- PRESCRIPTION UPLOAD PAGE ----
$receteBody = '<div id="page" class="hfeed site">
  <div id="content" class="site-content"><div class="col-full"><div id="primary" class="content-area"><main id="main" class="site-main" role="main">
    <article class="post page">
      <header class="entry-header"><h1 class="entry-title">Re&#231;ete Y&#252;kle</h1></header>
      <div class="entry-content">
        <div style="max-width:600px;margin:40px auto">
          <div style="text-align:center;margin-bottom:40px">
            <img src="code/assets/document.png" alt="Re&#231;ete" width="64" height="64" style="margin-bottom:16px" />
            <h2 style="color:var(--vc-navy);margin-bottom:8px">Re&#231;etenizi Y&#252;kleyin</h2>
            <p style="color:var(--vc-muted)">G&#246;z doktorunuzdan ald&#305;&#287;&#305;n&#305;z re&#231;eteyi PDF veya foto&#287;raf olarak y&#252;kleyin. Optisyenimiz cam indeksini belirleyip sizinle ileti&#351;ime ge&#231;sin.</p>
          </div>
          <form onsubmit="event.preventDefault();alert(''Demo s&#252;r&#252;m &#8212; dosya y&#252;kleme yak&#305;nda aktif olacak.'')" style="background:var(--vc-bg-soft);padding:32px;border-radius:var(--vc-radius)">
            <div style="margin-bottom:20px">
              <label style="display:block;font-weight:600;font-size:0.9rem;margin-bottom:6px">Ad Soyad</label>
              <input type="text" placeholder="Ad&#305;n&#305;z Soyad&#305;n&#305;z" required style="width:100%;padding:12px 16px;border:1.5px solid var(--vc-line);border-radius:10px;font-size:1rem;font-family:inherit;box-sizing:border-box" />
            </div>
            <div style="margin-bottom:20px">
              <label style="display:block;font-weight:600;font-size:0.9rem;margin-bottom:6px">E-posta</label>
              <input type="email" placeholder="ornek@email.com" required style="width:100%;padding:12px 16px;border:1.5px solid var(--vc-line);border-radius:10px;font-size:1rem;font-family:inherit;box-sizing:border-box" />
            </div>
            <div style="margin-bottom:20px">
              <label style="display:block;font-weight:600;font-size:0.9rem;margin-bottom:6px">Telefon</label>
              <input type="tel" placeholder="+90 5XX XXX XX XX" style="width:100%;padding:12px 16px;border:1.5px solid var(--vc-line);border-radius:10px;font-size:1rem;font-family:inherit;box-sizing:border-box" />
            </div>
            <div style="margin-bottom:24px">
              <label style="display:block;font-weight:600;font-size:0.9rem;margin-bottom:6px">Re&#231;ete Dosyas&#305;</label>
              <div style="border:2px dashed var(--vc-line);border-radius:12px;padding:40px 20px;text-align:center;background:#fff;cursor:pointer" onclick="this.querySelector(''input'').click()">
                <p style="color:var(--vc-muted);margin:0;font-size:0.95rem">PDF, JPG veya PNG dosyan&#305;z&#305; s&#252;r&#252;kleyin veya <strong style="color:var(--vc-teal)">t&#305;klay&#305;n</strong></p>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" style="display:none" />
              </div>
            </div>
            <button type="submit" class="vc-btn vc-btn--teal" style="width:100%;justify-content:center">Re&#231;eteyi G&#246;nder</button>
          </form>
        </div>
      </div>
    </article>
  </main></div></div></div>
</div>'

# ---- CONTACT PAGE ----
$iletisimBody = '<div id="page" class="hfeed site">
  <div id="content" class="site-content"><div class="col-full"><div id="primary" class="content-area"><main id="main" class="site-main" role="main">
    <article class="post page">
      <header class="entry-header"><h1 class="entry-title">&#304;leti&#351;im</h1></header>
      <div class="entry-content">
        <div style="max-width:800px;margin:40px auto;display:grid;grid-template-columns:1fr 1fr;gap:40px">
          <div>
            <h2 style="color:var(--vc-navy);margin-bottom:20px">Bize Ula&#351;&#305;n</h2>
            <div style="margin-bottom:20px">
              <strong style="color:var(--vc-navy);display:block;margin-bottom:4px">Adres</strong>
              <p style="color:var(--vc-muted);margin:0">KuleSite AVM, Sel&#231;uklu / Konya</p>
            </div>
            <div style="margin-bottom:20px">
              <strong style="color:var(--vc-navy);display:block;margin-bottom:4px">Telefon</strong>
              <p style="margin:0"><a href="tel:+905425304245" style="color:var(--vc-teal);text-decoration:none;font-weight:600">+90 542 530 42 45</a></p>
            </div>
            <div style="margin-bottom:20px">
              <strong style="color:var(--vc-navy);display:block;margin-bottom:4px">E-posta</strong>
              <p style="margin:0"><a href="mailto:info@visioncraft.com.tr" style="color:var(--vc-teal);text-decoration:none;font-weight:600">info@visioncraft.com.tr</a></p>
            </div>
            <div style="margin-bottom:20px">
              <strong style="color:var(--vc-navy);display:block;margin-bottom:4px">&#199;al&#305;&#351;ma Saatleri</strong>
              <p style="color:var(--vc-muted);margin:0">Pazartesi - Cumartesi: 10:00 - 22:00<br/>Pazar: 12:00 - 20:00</p>
            </div>
            <a class="vc-btn vc-btn--teal" href="https://wa.me/905425304245" target="_blank" style="display:inline-block;margin-top:10px">WhatsApp ile Yaz</a>
          </div>
          <div>
            <form onsubmit="event.preventDefault();alert(''Demo s&#252;r&#252;m &#8212; mesaj g&#246;nderme yak&#305;nda aktif olacak.'')" style="background:var(--vc-bg-soft);padding:32px;border-radius:var(--vc-radius)">
              <div style="margin-bottom:16px">
                <label style="display:block;font-weight:600;font-size:0.9rem;margin-bottom:6px">Ad Soyad</label>
                <input type="text" placeholder="Ad&#305;n&#305;z Soyad&#305;n&#305;z" required style="width:100%;padding:12px 16px;border:1.5px solid var(--vc-line);border-radius:10px;font-size:1rem;font-family:inherit;box-sizing:border-box" />
              </div>
              <div style="margin-bottom:16px">
                <label style="display:block;font-weight:600;font-size:0.9rem;margin-bottom:6px">E-posta</label>
                <input type="email" placeholder="ornek@email.com" required style="width:100%;padding:12px 16px;border:1.5px solid var(--vc-line);border-radius:10px;font-size:1rem;font-family:inherit;box-sizing:border-box" />
              </div>
              <div style="margin-bottom:16px">
                <label style="display:block;font-weight:600;font-size:0.9rem;margin-bottom:6px">Konu</label>
                <input type="text" placeholder="Mesaj&#305;n&#305;z&#305;n konusu" style="width:100%;padding:12px 16px;border:1.5px solid var(--vc-line);border-radius:10px;font-size:1rem;font-family:inherit;box-sizing:border-box" />
              </div>
              <div style="margin-bottom:20px">
                <label style="display:block;font-weight:600;font-size:0.9rem;margin-bottom:6px">Mesaj</label>
                <textarea rows="4" placeholder="Mesaj&#305;n&#305;z&#305; yaz&#305;n..." required style="width:100%;padding:12px 16px;border:1.5px solid var(--vc-line);border-radius:10px;font-size:1rem;font-family:inherit;box-sizing:border-box;resize:vertical"></textarea>
              </div>
              <button type="submit" class="vc-btn vc-btn--teal" style="width:100%;justify-content:center">Mesaj G&#246;nder</button>
            </form>
          </div>
        </div>
      </div>
    </article>
  </main></div></div></div>
</div>'

$pages = @{
    'magaza.html' = $shopBody
    'sepet.html' = $cartBody
    'hesabim.html' = $accountBody
    'recete-yukle.html' = $receteBody
    'iletisim.html' = $iletisimBody
}

foreach ($page in $pages.GetEnumerator()) {
    $fullHtml = $head + $nav + $page.Value + $footer
    [System.IO.File]::WriteAllText((Join-Path $root $page.Key), $fullHtml, [System.Text.Encoding]::UTF8)
    Write-Host "$($page.Key) recreated: $((Get-Item (Join-Path $root $page.Key)).Length) bytes"
}
