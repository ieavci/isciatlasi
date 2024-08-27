# İşçi Atlası Web Projesi

## Proje Amacı

**İşçi Atlası**, Türkiye'deki işgücüne katılım, sigortasız işçiler, işçi ve işveren hakları ile sendikalar üzerine odaklanan bir web projesidir. Bu proje, Türkiye'deki iş gücü piyasasını analiz etmek, görselleştirmek ve geleceğe yönelik öngörüler sağlamak amacıyla geliştirilmiştir. Kullanıcıların hem işgücü ile ilgili bilinçli stratejiler geliştirmesine yardımcı olmak hem de işçilerin hakları konusunda bilinçlenmesini sağlamak projenin temel amacıdır.


### Gereksinimler

Projenin çalıştırılabilmesi için aşağıdaki yazılımların sisteminizde kurulu olması gerekmektedir:

- [Node.js](https://nodejs.org/) (v14 veya üstü)
- [NPM](https://www.npmjs.com/) (Node Package Manager)

### Projeyi Klonlama

Proje deposunu yerel makinenize klonlayarak çalışmaya başlayabilirsiniz:

```bash
git clone https://github.com/ieavci/Labor-Rights.git
cd Labor-Rights
```
## Projenin Özellikleri

### Ana Sayfa

- SVG formatında Türkiye haritası üzerinden her şehre ait 2023 yılı sektörel istihdam verileri, pasta, çubuk ve radar grafikleri ile görselleştirilmiştir.
- 15+ yaş grubu için işgücüne katılım ve sektöre göre istihdam verileri, toplam, erkek ve kadın olarak çubuk ve çizgi grafikleri ile sunulmaktadır.
- Bölgelere göre istihdam verileri radar grafiği ile görselleştirilmiştir.

<img src="https://via.placeholder.com/400x300" alt="Türkiye Haritası ve Grafikler" /> <img src="https://via.placeholder.com/400x300" alt="Grafik Çeşitleri" />

<img src="https://via.placeholder.com/400x300" alt="İşgücüne Katılım Verileri" /> <img src="https://via.placeholder.com/400x300" alt="İstihdam Verileri" />

### Öngörü Sekmesi

- Kullanıcılar, belirli bir yıla ait istihdam verilerini ve bu yıl için öngörülen verileri görüntüleyebilir.
- Ayrıca, 10 yıllık öngörü verileri de grafiklerle sunulmaktadır.
- Seçilen yıla ait sektörel istihdam tahminleri ve eğitim durumuna göre işgücü tahminleri tablo şeklinde sunulmuştur.

<img src="https://via.placeholder.com/400x300" alt="Öngörü Verileri" /> <img src="https://via.placeholder.com/400x300" alt="10 Yıllık Öngörü" /> <img src="https://via.placeholder.com/400x300" alt="Tahmin Grafikleri" />

<img src="https://via.placeholder.com/400x300" alt="Sektörel İstihdam Tahmini" /> <img src="https://via.placeholder.com/400x300" alt="Eğitim Durumuna Göre Tahminler" />

### Sektörel Dağılım Sekmesi

- Yıllara göre Türkiye’deki istihdamın bölgelere göre sektörel dağılımı, harita üzerinde görselleştirilmiştir.

<img src="https://via.placeholder.com/800x600" alt="Bölgesel Sektörel Dağılım" />

### Sigortasız İşçi Sekmesi

- Sigortasız çalışan işçilerin hak arama yolları ayrıntılı bir şekilde açıklanmıştır.
- Kullanıcıların haklarını aramalarına yardımcı olacak bir dilekçe oluşturma web formu sunulmuştur.

<img src="https://via.placeholder.com/400x300" alt="Hak Arama Yolları" /> <img src="https://via.placeholder.com/400x300" alt="Dilekçe Formu" />

### Haklar Sekmesi

- İşveren ve işçi hakları ile yükümlülüklerinin hukuki dayanakları kanun maddeleri ile listelenmiştir.

<img src="https://via.placeholder.com/800x600" alt="Haklar ve Yükümlülükler" />

### Sendikalar Sekmesi

- Sendikaların ve sendikalaşmanın önemi anlatılmış; Türkiye'deki sendikalar ve işçi sendikaları konfederasyonları detaylandırılmıştır.

<img src="https://via.placeholder.com/400x300" alt="Sendikalar Listesi" /> <img src="https://via.placeholder.com/400x300" alt="Sendikalar ve Konfederasyonlar" />

### Sendikalar Dağılımı Sekmesi

- Türkiye'deki sendikaların il temsilcilikleri ve bağlı bulundukları konfederasyonlar, harita üzerinde görselleştirilmiştir.

<img src="https://via.placeholder.com/800x600" alt="Sendikalar Harita Üzerinde" />

### Graphs Sekmesi

- Pyvis kullanılarak oluşturulan graf tabanlı veriler, çeşitli istihdam ve sendika dağılımlarını içermektedir.
  - Bölgelere Göre İstihdam 2021
  - Bölgelere Göre İstihdam 2022
  - Sektöre Göre İstihdam
  - Eğitime Göre İstihdam
  - Türk-İş Sendika Grafikleri

<img src="https://via.placeholder.com/150x150" alt="Pyvis Grafikler 1" /> <img src="https://via.placeholder.com/150x150" alt="Pyvis Grafikler 2" /> <img src="https://via.placeholder.com/150x150" alt="Pyvis Grafikler 3" /> <img src="https://via.placeholder.com/150x150" alt="Pyvis Grafikler 4" /> <img src="https://via.placeholder.com/150x150" alt="Pyvis Grafikler 5" /> <img src="https://via.placeholder.com/150x150" alt="Pyvis Grafikler 6" /> <img src="https://via.placeholder.com/150x150" alt="Pyvis Grafikler 7" />

## Gerekli Paketler

Bu projeyi çalıştırmak için aşağıdaki paketler gerekmektedir:

- **Express**: Web sunucusu olarak kullanılan framework.
- **EJS**: Dinamik HTML sayfaları oluşturmak için kullanılan şablon motoru.
- **Chart.js**: Grafikler ve görselleştirmeler oluşturmak için kullanılan kütüphane.
- **Bootstrap**: Kullanıcı arayüzünü tasarlamak için kullanılan CSS framework.
- **Font Awesome**: İkonlar ve simgeler için kullanılan kütüphane.
- **MySQL2**: MySQL veritabanı ile bağlantı kurmak için kullanılan kütüphane.
- **Nodemon**: Geliştirme sırasında sunucunun otomatik olarak yeniden başlatılması için kullanılan araç.

### Kurulum

Projenin çalıştırılması için gereken adımlar:

1. **Bağımlılıkları Yükleyin**:
    ```bash
    npm install
    ```

2. **Projeyi Başlatın**:
    ```bash
    npm start
    ```

## Proje Detayları ve Teknik Özellikler

Bu projede **Node.js**, **Express**, **MySQL**, **EJS**, **Chart.js**, **Bootstrap**, **Font Awesome** gibi çeşitli teknolojiler kullanılmıştır. Web sitesinde, işgücü ve istihdam verilerinin analiz edilmesi, görselleştirilmesi ve tahmin edilmesi amacıyla Python ve Pyvis kütüphanesi de yer almıştır. Proje, ayrıca Türkiye’deki işçi haklarını ve sendikal yapılarını ele alan bilgilendirici içeriklere sahiptir.

Veritabanı olarak **MySQL** kullanılmış olup, verilerin esnek bir şekilde yönetilmesi ve saklanması sağlanmıştır. Web sitesinin kullanıcı arayüzü **Bootstrap** ile modern ve kullanıcı dostu bir şekilde tasarlanmıştır.

