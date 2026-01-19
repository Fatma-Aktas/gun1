# 🚀 Desinoval - Portfolio Website

**Dijital Zirve Biletiniz!**

Modern, kreatif ve cesur tasarıma sahip tek sayfalık portföy web sitesi. WordPress, SEO, Google Ads, Video Prodüksiyon ve Dijital Pazarlama hizmetlerini sergileyen profesyonel bir platform.

---

## ✨ Özellikler

### 🎨 Tasarım
- **Kreatif & Cesur** modern tasarım
- Desinoval marka renkleri (#f3140c kırmızı vurgusu)
- Responsive tasarım (Mobil, Tablet, Desktop)
- Animasyonlu geçişler ve hover efektleri
- Smooth scroll navigasyon

### 📄 Bölümler
1. **Hero Section** - Etkileyici açılış sayfası
2. **Hakkımızda** - Ekip tanıtımı ve uzmanlık alanları
3. **Hizmetlerimiz** - 6 ana hizmet kategorisi
4. **Referanslar** - Filtrelenebilir proje portföyü
5. **Müşteri Yorumları** - Testimonials
6. **İletişim** - Form ve iletişim bilgileri

### 🛠️ Teknolojiler
- Pure HTML5
- CSS3 (CSS Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Heebo, Montserrat)

### 🎯 Performans
- Lazy loading images
- Debounced scroll events
- Intersection Observer API
- Minimal dependencies
- SEO optimized

---

## 📁 Proje Yapısı

```
desinoval-website/
├── index.html              # Ana HTML dosyası
├── styles.css              # Tüm CSS stilleri
├── script.js               # JavaScript işlevselliği
├── README.md              # Bu dosya
└── assets/
    ├── images/            # Görseller klasörü
    │   ├── hero-illustration.svg
    │   ├── team.jpg
    │   ├── portfolio-1.jpg
    │   ├── portfolio-2.jpg
    │   ├── portfolio-3.jpg
    │   ├── portfolio-4.jpg
    │   ├── portfolio-5.jpg
    │   ├── portfolio-6.jpg
    │   ├── avatar-1.jpg
    │   ├── avatar-2.jpg
    │   └── avatar-3.jpg
    ├── videos/            # Video dosyaları (opsiyonel)
    └── fonts/             # Özel fontlar (opsiyonel)
```

---

## 🖼️ Gerekli Görseller

Web sitesinin tam olarak çalışması için aşağıdaki görselleri `assets/images/` klasörüne eklemeniz gerekiyor:

### Hero Bölümü
- `hero-illustration.svg` - Ana sayfa illüstrasyonu (1000x800px önerilir)
  - Alternatif: Figma, Undraw, Freepik'ten ücretsiz illüstrasyon

### Hakkımızda Bölümü
- `team.jpg` - Ekip fotoğrafı (800x600px önerilir)
  - Fatma Hanım ve eşinizin profesyonel fotoğrafı

### Portföy Bölümü (6 adet)
- `portfolio-1.jpg` - Hukuk Bürosu Web Sitesi (600x400px)
- `portfolio-2.jpg` - Mali Müşavir SEO Projesi (600x400px)
- `portfolio-3.jpg` - Diş Kliniği Tanıtım Videosu (600x400px)
- `portfolio-4.jpg` - Psikiyatri Kliniği Meta Ads (600x400px)
- `portfolio-5.jpg` - Kurumsal Web & Video Paket (600x400px)
- `portfolio-6.jpg` - E-Ticaret SEO & PPC (600x400px)

### Müşteri Yorumları (3 adet)
- `avatar-1.jpg` - Müşteri 1 (200x200px, profil fotoğrafı)
- `avatar-2.jpg` - Müşteri 2 (200x200px, profil fotoğrafı)
- `avatar-3.jpg` - Müşteri 3 (200x200px, profil fotoğrafı)

**Not:** Görseller eklenene kadar placeholders görünecektir.

---

## 🚀 Kurulum ve Kullanım

### 1. Dosyaları İndirme
```bash
# Repository'yi clone edin
git clone https://github.com/Fatma-Aktas/gun1.git
cd gun1
```

### 2. Görselleri Ekleme
- `assets/images/` klasörüne yukarıda belirtilen görselleri ekleyin
- Görsellerin boyutlarını optimize edin (Web için max 1MB önerilir)
- Format: JPG (fotoğraflar için), PNG (logolar için), SVG (ikonlar için)

### 3. E-posta Yapılandırması
`script.js` dosyasında 231. satırı güncelleyin:

```javascript
const response = await fetch('https://formsubmit.co/ajax/info@desinoval.com', {
```

Bu satırdaki `info@desinoval.com` yerine kendi e-posta adresinizi yazın.

**FormSubmit.co İlk Kullanım:**
1. İlk form gönderiminde FormSubmit'e kayıt yapmanız gerekir
2. Belirlediğiniz e-postaya onay linki gelecek
3. Onayladıktan sonra formlar çalışacak

### 4. Sosyal Medya Linkleri
`index.html` dosyasında aşağıdaki linkleri güncelleyin:

```html
<!-- Footer'daki sosyal medya linkleri (satır 597-606) -->
<a href="#" class="social-link">  <!-- Facebook linkini ekleyin -->
<a href="#" class="social-link">  <!-- Instagram linkini ekleyin -->
<a href="https://www.linkedin.com/in/fatma-aktas-897512253/" target="_blank" class="social-link">  <!-- ✓ LinkedIn OK -->
<a href="#" class="social-link">  <!-- Twitter linkini ekleyin -->
```

### 5. Lokal Çalıştırma
Basit bir HTTP sunucusu başlatın:

#### Option A: Python
```bash
# Python 3
python -m http.server 8000

# Tarayıcıda açın: http://localhost:8000
```

#### Option B: Node.js (http-server)
```bash
npx http-server -p 8000
```

#### Option C: VS Code Live Server
- VS Code'da Live Server eklentisini kurun
- `index.html` dosyasını sağ tıklayın
- "Open with Live Server" seçin

---

## 🌐 Deployment (Yayınlama)

### Ücretsiz Hosting Seçenekleri

#### 1. **GitHub Pages** (Önerilen)
```bash
# Repository'nizde Settings > Pages bölümüne gidin
# Source: main branch seçin
# URL: https://fatma-aktas.github.io/gun1/
```

#### 2. **Netlify**
1. [netlify.com](https://netlify.com) hesabı açın
2. "New site from Git" tıklayın
3. GitHub repository'nizi bağlayın
4. Deploy edin (Otomatik)
5. Ücretsiz SSL sertifikası dahil

#### 3. **Vercel**
```bash
npm i -g vercel
vercel --prod
```

#### 4. **Cloudflare Pages**
1. [pages.cloudflare.com](https://pages.cloudflare.com) ücretsiz hesap
2. GitHub'ı bağlayın
3. Deploy (CDN hızı mükemmel)

### Özel Domain Bağlama
1. Domain sağlayıcınızdan (örn. GoDaddy, Namecheap) A kaydı ekleyin
2. Hosting platformunuzda custom domain ayarları yapın
3. SSL sertifikası otomatik oluşturulacak

---

## ⚙️ Özelleştirme

### Renkleri Değiştirme
`styles.css` dosyasında CSS değişkenlerini güncelleyin:

```css
:root {
    --primary-color: #f3140c;       /* Ana kırmızı renk */
    --primary-dark: #c10e08;        /* Koyu kırmızı */
    --primary-light: #ff4d47;       /* Açık kırmızı */
    --secondary-color: #26262c;     /* Koyu gri */
    --accent-color: #f4f4f5;        /* Açık gri */
}
```

### İçerik Güncelleme
- **Hizmetler:** `index.html` satır 235-337
- **Portföy:** `index.html` satır 346-452
- **Yorumlar:** `index.html` satır 468-536
- **İletişim:** `index.html` satır 551-623

### Font Değiştirme
`index.html` ve `styles.css` dosyalarında font linklerini güncelleyin:

```html
<!-- index.html head bölümü -->
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

```css
/* styles.css */
:root {
    --font-heading: 'YOUR_HEADING_FONT', sans-serif;
    --font-body: 'YOUR_BODY_FONT', sans-serif;
}
```

---

## 📱 Responsive Breakpoints

Tasarım aşağıdaki ekran boyutlarında test edilmiştir:

- **Desktop:** 1920px, 1440px, 1366px, 1024px
- **Tablet:** 768px, 820px (iPad)
- **Mobile:** 375px (iPhone), 414px, 390px

---

## 🎨 Tasarım Sistemi

### Spacing (Boşluklar)
```css
--spacing-xs: 0.5rem;   /* 8px */
--spacing-sm: 1rem;     /* 16px */
--spacing-md: 2rem;     /* 32px */
--spacing-lg: 4rem;     /* 64px */
--spacing-xl: 6rem;     /* 96px */
```

### Border Radius
```css
--radius-sm: 8px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-xl: 32px;
```

### Shadows
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.16);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.2);
```

---

## 🐛 Bilinen Sorunlar ve Çözümler

### Form Gönderilmiyor
- E-posta adresini `script.js` dosyasında güncellediniz mi?
- FormSubmit.co onayını yaptınız mı?
- Tarayıcı konsolunda hata var mı? (F12)

### Görseller Görünmüyor
- Dosya yolları doğru mu? (büyük/küçük harf duyarlı)
- Görseller `assets/images/` klasöründe mi?
- Dosya uzantıları doğru mu? (.jpg, .png, .svg)

### Mobil Menü Açılmıyor
- JavaScript yüklendi mi?
- Tarayıcı konsolunda hata var mı?
- `script.js` dosyası `</body>` etiketinden önce mi?

---

## 📈 SEO Optimizasyonu

Site SEO için optimize edilmiştir:

✅ Semantic HTML5 tags
✅ Meta description ve keywords
✅ Open Graph tags (sosyal medya)
✅ Alt text tüm görsellerde
✅ Mobile-friendly (responsive)
✅ Fast loading (minimal JS/CSS)
✅ Proper heading hierarchy (H1-H6)

### Ekstra SEO İyileştirmeleri
1. **Google Analytics** ekleyin (GA4)
2. **Google Search Console** kayıt yapın
3. **sitemap.xml** oluşturun
4. **robots.txt** ekleyin
5. **Schema.org** markup ekleyin

---

## 🔒 Güvenlik

### FormSubmit Ayarları (Opsiyonel)
Form spam'ini önlemek için:

```javascript
// script.js içinde form submission'a ekleyin:
_captcha: "true",           // reCAPTCHA ekler
_autoresponse: "Mesajınız alındı!",  // Otomatik yanıt
_cc: "secondary@email.com"  // Copy gönder
```

---

## 🤝 Katkıda Bulunma

Bu proje Desinoval için özel olarak geliştirilmiştir. İyileştirme önerileri için:

📧 E-posta: info@desinoval.com
💼 LinkedIn: [Fatma Aktaş](https://www.linkedin.com/in/fatma-aktas-897512253/)
🌐 Web: [desinoval.com](https://desinoval.com)

---

## 📄 Lisans

© 2026 Desinoval. Tüm hakları saklıdır.

Bu website Fatma Aktaş için özel olarak tasarlanmış ve geliştirilmiştir.

---

## 🆘 Destek

Sorun yaşıyorsanız veya sorularınız varsa:

1. **GitHub Issues:** Bu repository'de issue açın
2. **E-posta:** info@desinoval.com
3. **LinkedIn:** Direkt mesaj gönderin

---

## 🎉 Teşekkürler

Bu projeyi oluşturmak için kullanılan kaynaklar:

- **Fonts:** Google Fonts (Heebo, Montserrat)
- **Icons:** Font Awesome 6
- **Form Backend:** FormSubmit.co
- **Design Inspiration:** Desinoval brand identity

---

**🚀 Başarılar! Desinoval ile Dijital Zirve Biletiniz Hazır!**

---

## 📋 Kontrol Listesi

Yayına almadan önce:

- [ ] Tüm görselleri eklediniz mi?
- [ ] Form e-posta adresini güncellediniz mi?
- [ ] Sosyal medya linklerini eklediniz mi?
- [ ] Müşteri yorumlarını gerçek verilerle değiştirdiniz mi?
- [ ] Portföy projelerini kendi projelerinizle güncellediniz mi?
- [ ] Mobil görünümü test ettiniz mi?
- [ ] Farklı tarayıcılarda test ettiniz mi? (Chrome, Firefox, Safari)
- [ ] Form gönderimi çalışıyor mu?
- [ ] Tüm linkler doğru mu?
- [ ] Google Analytics eklediniz mi? (opsiyonel)
- [ ] Meta description'ları özelleştirdiniz mi?

Hepsini tamamladıysanız, yayınlamaya hazırsınız! 🎊
