# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Demo / Sunum — potansiyel optik mağazası müşterilerine gösterilmek üzere hazırlanmış bir vitrin demosu. Ziyaretçi profile: Türk optical shop sahipleri ve karar vericiler.

## Product Purpose

VisionCraft Optik'in dijital varlığını sergilemek: AR sanal deneme, reçete yükleme, e-ticaret ve fiziksel mağaza güvenini tek bir demo sitesinde birleştirmek. Başarılı demo: ziyaretçinin ürünü denemesi, reçete yüklemesi ve sipariş verme yolunu görmesi.

## Positioning

"Mağazada dene, evinde karar ver" — AR ile 40+ çerçeveyi saniyeler içinde yüzünde görme imkanı + fiziksel mağaza güvencesi + ücretsiz kargo. Rakiplerinden farkı: sanal deneme + fiziksel mağaza birlikteliği.

## Operating Context

- XAMPP local geliştirme ortamı (Apache + MySQL)
- WordPress 6.x + WooCommerce + Storefront tema
- Özel plugin: visioncraft-tools (header, footer, shortcodes, carousel, AR teaser)
- Türkçe dil,_TRY para birimi
- Tüm sayfalar pill header ile (floating glassmorphism)
- Demo verileri: 13 ürün, 3 kategori, 6 hero görseli

## Capabilities and Constraints

- AR sanal deneme (camera icon + "Yüzümde Dene" CTA)
- Reçete yükleme (PDF/JPG/PNG, form handler)
- Ürün kataloğu (3 kategori: Güneş Gözlükleri, Mavi Işık Korumalı, Progresif Camlar)
- Ürün slider carousel (6 ürün, 3 visible, otomatik kaydırma)
- WhatsApp butonu (sabit, sağ alt)
- Newsletter abonelik formu
- Sepet / Ödeme / Hesabım (WooCommerce)
- Tüm sayfalarda Sayfa başlığı gizli, içerik yukarıda
- Breadcrumb gizli (tüm sayfalar)
- Mobil responsive (pill header, mobil menü)

## Brand Commitments

- İsim: VisionCraft Optik
- Renkler: Navy #0f2557, Teal #06b6d4, Line #e7e9ee, Muted #4a4f58
- Font: Plus Jakarta Sans (400-800)
- İkonlar: FlatIcon PNG (glasses, camera, diamond, truck, return, shield, bolt, store, document, wrench, mail, instagram, youtube, whatsapp, x)
- Footer'da Flaticon atıf zorunlu
- Logo: Navy daire + gözlük ikonu + "VisionCraft" yazısı

## Evidence on Hand

- 6 hero görseli: wp-content/uploads/2026/08/img*.jpg
- 13 ürün görseli (WooCommerce thumbnails)
- Tüm FlatIcon ikonları: wp-content/plugins/visioncraft-tools/assets/icons/
- Çalışan shortcodes: vc_hero, vc_products, vc_ar_cta, vc_recete_form, vc_map, vc_newsletter
- DB sayfa ID'leri: 38 Ana Sayfa, 39 Hakkımızda, 40 İletişim, 41 Reçete Yükle

## Product Principles

1. Demo gerçekçiliği — tüm sayfalar gerçek bir optik mağazası gibi görünmeli
2. Mobil öncelikli — her tasarım kararı önce mobilde test edilmeli
3. Teknoloji visible — AR, reçete yükleme, e-ticaret özellikleri öne çıkarılmalı
4. Temiz ve profesyonel — glassmorphism header, subtle animasyonlar,professionel tipografi
5. Türkçe dil前三 — tüm UI kopyaları doğal Türkçe olmalı

## Accessibility & Inclusion

- WCAG 2.1 AA hedefi (renk kontrastı, alt metinler, keyboard navigasyonu)
- Tüm ikonlarda aria-label veya alt metin
- Yeterli kontrast oranları (navy/teal/beyaz)
