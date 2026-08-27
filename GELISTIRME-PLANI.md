# VisionCraft Optik Gelistirme Plani

## Hedef

Siteyi mobil oncelikli olarak WCAG AA, responsive kalite, performans, tema tutarliligi ve uygulama butunlugu alanlarinda 10/10'a yaklastirmak.

Mevcut canli inceleme skorlari:

| Alan | Mevcut | Hedef |
|---|---:|---:|
| Erisilebilirlik | 5/10 | 9-10/10 |
| Performans | 7/10 | 9-10/10 |
| Responsive | 7/10 | 9-10/10 |
| Theming | 6/10 | 9-10/10 |
| Uygulama butunlugu | 3/10 | 9-10/10 |

## Guncel Durum

Son build turundan sonra tahmini durum (detector DEGRADED, manuel dogrulama):

| Alan | Tahmini skor | Ana kalan risk |
|---|---:|---|
| Erisilebilirlik | 8/10 | Reçete form keyboard audit son cilasi, 768 matris |
| Performans | 8.5/10 | Gerçek ürün asset'leri için WebP/AVIF optimizasyonu |
| Responsive | 9/10 | Son 768/1024 matris temiz |
| Theming | 9/10 | Teal-text token kapsami tamam |
| Uygulama butunlugu | 7.5/10 | Local `code/` vs live plugin ana kaynak ayrimi belgelenmeli |
| Reçete guvenligi | 9/10 | Yetkili erişim tamam, retention 30 gün + deny aktif |

Tam audit, detector parser bagimliliklari tamamlandiktan sonra yeniden alinacak.

## Uygulama Sirasi

### 1. Mobil temel ve erisilebilirlik

- [x] Teal CTA kontrastini WCAG AA seviyesine tasimak
- [x] Mobil menu z-index ve sabit WhatsApp/dock cakismasini cozmek
- [x] Mobil menu focus tasima, focus trap ve Escape davranisi eklemek
- [x] Burger butonuna `aria-controls` eklemek
- [x] `aria-hidden` icinde focus edilebilir carousel dot butonlarini duzeltmek
- [x] Kategori linki sinif adlarini HTML/CSS'te esitlemek
- [x] Mobil dokunma hedeflerini minimum 44px yapmak

Kabul kriteri: 360, 375 ve 390px ekranlarda yatay tasma olmamali; menu acikken WhatsApp/dock menu ustune binmemeli; klavye focus'u kaybolmamali; kritik metin kontrasti en az 4.5:1 olmali.

### 2. Ana sayfa donusum akisi ve AR

- [x] Kamera izni isteyen erisilebilir onizleme penceresi eklemek
- [x] Önden bakan gerçek çerçeve asset'ini yüz takip overlay'ine bağlamak
- [x] Hero'da tek birincil aksiyon: `Kamerayla Dene` (live + local)
- [x] AR CTA'sini kamera modalina baglamak (shop dahil)
- [x] Desteklenmeyen cihazlar icin fallback akisi eklemek
- [x] `AR AKTIF` etiketini kamera destegine gore duzeltmek
- [ ] Her ürün için şeffaf çerçeve asset'i ve ürün seçimini eklemek
- [x] Reçete yukleme aksiyonunu ikincil konumda tutmak

Kabul kriteri: Kullanici ilk viewport'ta AR'yi nasil baslatacagini tek bakista anlamali.

### 3. Mobil bilgi mimarisi ve hareket azaltma

- [x] Mobil hero'daki karar noktalarini azaltmak
- [x] Avantaj marquee'sini mobilde statik ve okunabilir hale getirmek
- [x] Urun ve yorum slider'larinda otomatik oynatmayi kapatmak
- [x] Floating kartlari mobilde gizlemek (live + local)
- [x] 768px tablet hero kompozisyonunu stabilize etmek

Kabul kriteri: Ana sayfa mobilde daha kisa, daha taranabilir ve ana aksiyona odakli olmali.

### 4. Reçete yukleme guveni ve hata durumlari

- [x] Gizlilik, saklama ve optisyen inceleme bilgisini eklemek
- [x] Yukleme basari durumunu net gostermek
- [x] Tekrar dene / dosyayi degistir aksiyonlarini eklemek
- [x] Yukleme ilerlemesini ve `Gönderiliyor...` durumunu gostermek
- [x] Form nonce ve `is_uploaded_file` kontrollerini eklemek
- [x] Reçete klasorune Apache deny kurali eklemek
- [x] 30 gunluk retention/silme politikasini ve gunluk cron temizligini eklemek
- [x] Yetkili `vc_optician` rolu ve reçete yonetim ekranini eklemek
- [x] Nonce ve gerçek dosya yolu kontroluyle guvenli indirme eklemek
- [ ] Form alanlarinda tam keyboard ve odak auditini tamamlamak

### 5. Shop ve mobil filtre deneyimi

- [x] Filter drawer icin modal focus yonetimi eklemek
- [x] Drawer kapaninca focus'u acma butonuna geri vermek
- [x] Filtre sayisini `aria-live` ile duyurmak
- [x] Urun kartlarinda AR aksiyonunu gorunur hale getirmek
- [ ] Mobil kart baslik, fiyat ve buton olculerini test etmek

### 6. Performans ve asset kalitesi

- [x] Hero gorseline `width`, `height` ve `fetchpriority="high"` eklemek (DB + kses + filter)
- [x] Asagidaki gorsellerde lazy loading eklemek (local + live content filter)
- [x] CSS/JS tekrarlari ve float-card mobil gizleme esitlemek
- [x] Storefront cascade için dequeue + allowed_html filtresi
- [x] Gercek canli asset kaynagini plugin (XAMPP) olarak sabitlemek

### 7. Canli kaynak senkronizasyonu ve kalite kontrol

- [ ] Yerel ve canli CSS/JS hash farkini ortadan kaldirmak
- [x] Canli mobil menu markup ve focus davranisini yerel iyilestirmelerle esitlemek
- [x] Canli mobil menu katmanini WhatsApp/mobile dock ile esitlemek
- [x] Kamera onizleme markup ve JS akislarini canli WordPress sayfasina tasimak
- [x] MediaPipe Face Landmarker ile ilk 2D yüz takip prototipini eklemek
- [ ] 360 / 375 / 390 / 768 / 1024 / 1440px test matrisi olusturmak
- [ ] Klavye, ekran okuyucu ve reduced-motion testleri yapmak
- [ ] Detector ve audit tekrarlarini almak
- [ ] Hedef skorlar icin kalan P2/P3 islerini tamamlamak

## Basari Olcutleri

- Kritik mobil akislarda P0 kalmamali.
- WCAG AA kontrast ihlali kalmamali.
- Tum mobil buton ve linkler en az 44x44px hit area sunmali.
- Ana sayfada yatay scroll olmamali.
- AR, magaza, reçete ve iletisim aksiyonlari ilk bakista ayirt edilebilmeli.
- Canli WordPress asset'i ile gelistirme kaynagi ayni commit/versiyondan servis edilmeli.

## Not

Her fazdan sonra mobil test yapilacak. Bir sonraki faza gecmeden once ilgili kabul kriterleri kontrol edilecek.
