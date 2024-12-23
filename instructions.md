# Proje Kurulum ve Kullanım Kılavuzu

## 🚀 Başlangıç

Bu proje React, Tailwind CSS ve ek olarak bir dizi çağdaş teknoloji kullanılarak geliştirilmiş **YükBul** platformudur. Proje, nakliye süreçlerini kolaylaştırıp verimliliği artırmak üzere tasarlanmıştır. Şoförler ve yük gönderenlerin teklif ve taleplerini yönetebileceği bir sistem sunar.

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn
- MongoDB veya PostgreSQL
- Firebase veya Pusher (gerçek zamanlı bildirimler için)

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

3. Ortam değişkenlerini ayarlayın. Şu dosyaları örnek alarak doldurun:
   - `.env`
   - `.env.local`

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm start
   ```
   veya
   ```bash
   yarn start
   ```

## 🗋 Proje Yapısı

```
src/
├── components/
│   ├── common/
│   │   └── Logo.js # Ortak logo bileşeni
│   ├── Feedback/
│   │   └── StarRating.js # Yıldız değerlendirme bileşeni
│   ├── Notifications/
│   │   └── NotificationBell.js # Bildirim bileşeni
├── pages/
│   ├── Profile/
│   │   ├── index.js # Profil ana sayfası
│   │   └── ChangePassword.js # Şifre değiştirme sayfası
│   ├── Listings/
│   │   ├── index.js # Yük ilanları ana sayfası
│   │   └── LoadDetails.js # Yük detayları sayfası
│   └── Dashboard/
│       ├── DriverDashboard.js # Şoför için özel panel
│       └── ShipperDashboard.js # Yük gönderici için özel panel
├── utils/
│   └── api.js # API isteklerini yöneten yardımcı fonksiyonlar
├── styles/
│   └── tailwind.css # Proje genelinde kullanılan Tailwind CSS
```

## 🔧 Yeni Modüller ve Genişletmeler

### Geri Bildirim Sistemi
- 5 yıldızlı değerlendirme sistemi.
- Kullanıcılar, teslimattan sonra birbirlerini değerlendirebilir.
- Değerlendirmeler ve yorumlar profil sayfasında görüntülenir.

### Yük Listesi ve Teklif Modülü
- Şoförler, kendilerine uygun yükleri filtreleyebilir ve teklif verebilir.
- **Yıldaırım Teklifi**: Yük gönderenler, özellikle çabuk teslimat isteyen yükler için belirli şoförlere doğrudan teklif gönderebilir.

### Gerçek Zamanlı Bildirimler
- Firebase Cloud Messaging veya Pusher entegrasyonu ile teklif onayı ve teslimat durumu bildirimleri.
- Şoför ve yük gönderenler için ayrıntılı bildirim menüsü.

### Şeffaflık ve Güvenlik Modülü
- Kullanıcı profilleri değerlendirme puanları ve geçmiş teslimatları içerir.
- Kullanıcılar, geri bildirim ve yorumlara dayanarak karar verebilir.

### Görsel Harita Entegrasyonu
- Google Maps veya Leaflet ile şoförlerin yarıçap belirleyebileceği bir sistem.
- Yük ilanları, harita üzerinde konum bilgileriyle birlikte görüntülenir.

### Finansal Sistem
- Stripe veya PayPal API entegrasyonu ile güvenli ödeme işlemleri.
- Teslimattan sonra şoförlere otomatik ödeme.

### Kullanıcı Profilleri
- Profil bilgilerini düzenleme.
- Araç bilgisi ekleme (şoförler için).
- Yük geçmişini listeleme (yük gönderenler için).

## 🎨 Stil ve Tasarım

Tailwind CSS kullanılarak projenin responsive bir yapıda tasarlanması sağlanmıştır. Yeni renk temaları eklenmiştir:

- Arka plan: #1e293b
- Kenarlıklar: #334155
- Metin: #f8fafc
- Vurgu: emerald-500

## 🛎️ Kullanılan Paketler ve Teknolojiler

- **react-icons**: Kullanışlı ikonlar için.
- **tailwindcss**: CSS framework.
- **firebase**: Gerçek zamanlı bildirimler ve kimlik doğrulama.
- **axios**: API isteklerini yönetmek için.
- **formik**: Form doğrulama ve yönetimi için.
- **react-router-dom**: Sayfa yönlendirme.
- **redux**: Durum yönetimi.

## 🔒 Ortam Değişkenleri

Projede aşağıdaki ortam değişkenleri kullanılır:

- `REACT_APP_API_URL`: API temel URL'si.
- `REACT_APP_FIREBASE_KEY`: Firebase API anahtarı.
- `REACT_APP_STRIPE_KEY`: Stripe API anahtarı.

## 💡 Geliştirici Notları

1. **API Entegrasyonu**
   - Tüm API işlemleri `utils/api.js` içerisinde merkezi olarak yönetilir.
   - React Query kullanılarak veri çekme ve önbellekleme desteklenmiştir.

2. **Form Yönetimi**
   - **Formik** ile tüm formlar kontrollü bir yapıda tasarlanmıştır.

3. **Durum Yönetimi**
   - **Redux Toolkit** ile geliştirilmiştir.

4. **Harita Modülü**
   - Harita entegrasyonları Google Maps veya Leaflet kullanılarak yapılmıştır.

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

## 📜 Lisans

Bu proje [LICENSE] altında lisanslanmıştır.

