# Proje Kurulum ve Kullanım Kılavuzu

## 🚀 Başlangıç

Bu proje React ve Tailwind CSS kullanılarak geliştirilmiş bir web uygulamasıdır.

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn

### Kurulum

1. Projeyi klonlayın:
   ```bash
   git clone [proje-repo-url]
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
   veya
   ```bash
   yarn install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm start
   ```
   veya
   ```bash
   yarn start
   ```

## 📁 Proje Yapısı

src/
├── components/
│   └── common/
│       └── Logo.js # Ortak logo bileşeni
├── pages/
│   ├── Feedback/
│   │   ├── index.js # Geri bildirim sayfası
│   │   └── StarRating.js # Yıldız değerlendirme bileşeni
│   ├── Profile/
│   │   ├── index.js # Profil ana sayfası
│   │   └── ChangePassword.js # Şifre değiştirme sayfası
│   └── Support/
│       └── index.js # Destek sayfası

## 🔧 Özellikler

### Geri Bildirim Sistemi
- 5 yıldızlı değerlendirme sistemi
- Konu ve mesaj girişi
- Form veri yönetimi

### Destek Sayfası
- İletişim bilgileri (e-posta ve telefon)
- İletişim formu
- Responsive tasarım

### Profil Yönetimi
- Kullanıcı profil bilgileri
- Şifre değiştirme özelliği

## 🎨 Stil ve Tasarım

Proje Tailwind CSS kullanılarak stillendirilmiştir. Ana tema renkleri:

- Arka plan: #242424
- Kenarlıklar: #333333
- Metin: #e0e0e0
- Vurgu: blue-600

## 📦 Kullanılan Paketler

- react-icons: İkon kütüphanesi
- tailwindcss: CSS framework'ü

## 🔐 Ortam Değişkenleri

Proje iki ortam değişkeni dosyası kullanır:
- `.env`
- `.env.local`

## 💡 Geliştirici Notları

1. **Form Yönetimi**
   - Tüm formlar kontrollü bileşenler olarak tasarlanmıştır.
   - Form verileri local state'te tutulur.

2. **Responsive Tasarım**
   - md breakpoint: 768px
   - Grid sistemi: grid-cols-1 md:grid-cols-2

3. **Bileşen Yapısı**
   - Atomic tasarım prensiplerine uygun.
   - Ortak bileşenler common/ dizininde.

## 🔄 API Entegrasyonu

Form gönderimlerinde API entegrasyonu için TODO notları eklenmiştir:
- Geri bildirim formu
- İletişim formu
- Şifre değiştirme formu

## 🌐 Tarayıcı Desteği

- Chrome (son 2 versiyon)
- Firefox (son 2 versiyon)
- Safari (son 2 versiyon)
- Edge (son 2 versiyon)

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun
3. Değişikliklerinizi commit'leyin
4. Branch'inizi push'layın
5. Pull request açın

## 📝 Lisans

Bu proje [LICENSE] altında lisanslanmıştır.