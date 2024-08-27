<i>Türkçe</i>

# İşçi Atlası Web Projesi 

## Proje Amacı

**İşçi Atlası**, Türkiye'deki işgücüne katılım, sigortasız işçiler, işçi ve işveren hakları ile sendikalar üzerine odaklanan bir web projesidir. Bu proje, Türkiye'deki iş gücü piyasasını analiz etmek, görselleştirmek ve geleceğe yönelik öngörüler sağlamak amacıyla geliştirilmiştir. Kullanıcıların hem işgücü ile ilgili bilinçli stratejiler geliştirmesine yardımcı olmak hem de işçilerin hakları konusunda bilinçlenmesini sağlamak projenin temel amacıdır.

## Lisans

Bu proje [ISC lisansı](https://opensource.org/licenses/ISC) altında lisanslanmıştır.

## İletişim

Soru veya geri bildirimleriniz için aşağıdaki iletişim bilgilerini kullanabilirsiniz:

- GitHub: [ieavci/Labor-Rights](https://github.com/ieavci/Labor-Rights)
- Hata bildirimleri için: [LinkedIn](www.linkedin.com/in/ismail-avci-tr)

  
### Gereksinimler

Projenin çalıştırılabilmesi için aşağıdaki yazılımların sisteminizde kurulu olması gerekmektedir:

- [Node.js](https://nodejs.org/) (v14 veya üstü)
- [NPM](https://www.npmjs.com/) (Node Package Manager)
- Projenin çalışması için gereken bağımlılıklar:

- `bootstrap` v5.3.2
- `chart.js` v4.4.1
- `ejs` v3.1.8
- `express` v4.18.1
- `font-awesome` v4.7.0
- `jquery` v3.7.1
- `mysql2` v2.3.3


## Gerekli Paketler

Bu projeyi çalıştırmak için aşağıdaki paketler gerekmektedir:

- **Express**: Web sunucusu olarak kullanılan framework.
- **EJS**: Dinamik HTML sayfaları oluşturmak için kullanılan şablon motoru.
- **Chart.js**: Grafikler ve görselleştirmeler oluşturmak için kullanılan kütüphane.
- **Bootstrap**: Kullanıcı arayüzünü tasarlamak için kullanılan CSS framework.
- **Font Awesome**: İkonlar ve simgeler için kullanılan kütüphane.
- **MySQL2**: MySQL veritabanı ile bağlantı kurmak için kullanılan kütüphane.
- **Nodemon**: Geliştirme sırasında sunucunun otomatik olarak yeniden başlatılması için kullanılan araç.



### Projeyi Klonlama

Proje deposunu yerel makinenize klonlayarak çalışmaya başlayabilirsiniz:

```bash
git clone https://github.com/ieavci/Labor-Rights.git
cd Labor-Rights
```

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
## Projenin Özellikleri

### Ana Sayfa

- SVG formatında Türkiye haritası üzerinden her şehre ait 2023 yılı sektörel istihdam verileri, pasta, çubuk ve radar grafikleri ile görselleştirilmiştir.
- 15+ yaş grubu için işgücüne katılım ve sektöre göre istihdam verileri, toplam, erkek ve kadın olarak çubuk ve çizgi grafikleri ile sunulmaktadır.
- Bölgelere göre istihdam verileri radar grafiği ile görselleştirilmiştir.

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/a1.png" width="400" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/a2.png" width="auto" height="400" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/b1.png" width="400" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/b2.png" width="400" height="auto" /> 

### Öngörü Sekmesi

- Kullanıcılar, belirli bir yıla ait istihdam verilerini ve bu yıl için öngörülen verileri görüntüleyebilir.
- Ayrıca, 10 yıllık öngörü verileri de grafiklerle sunulmaktadır.
- Seçilen yıla ait sektörel istihdam tahminleri ve eğitim durumuna göre işgücü tahminleri tablo şeklinde sunulmuştur.

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/c1.png" width="400" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/c2.png" width="400" height="auto" />

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/c3.png" width="400" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/c4.png" width="400" height="auto" style="margin:5;"/>

### Sektörel Dağılım Sekmesi

- Yıllara göre Türkiye’deki istihdamın bölgelere göre sektörel dağılımı, harita üzerinde görselleştirilmiştir.

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/d1.png" width="500" height="auto" />

### Sigortasız İşçi Sekmesi

- Sigortasız çalışan işçilerin hak arama yolları ayrıntılı bir şekilde açıklanmıştır.
- Kullanıcıların haklarını aramalarına yardımcı olacak bir dilekçe oluşturma web formu sunulmuştur.

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/e1.png" width="500" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/e2.png" width="500" height="auto" />

### Haklar Sekmesi

- İşveren ve işçi hakları ile yükümlülüklerinin hukuki dayanakları kanun maddeleri ile listelenmiştir.

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/f1.png" width="500" height="auto" />

### Sendikalar Sekmesi

- Sendikaların ve sendikalaşmanın önemi anlatılmış; Türkiye'deki sendikalar ve işçi sendikaları konfederasyonları detaylandırılmıştır.

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/g1.png" width="500" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/g2.png" width="500" height="auto" />

### Sendikalar Dağılımı Sekmesi

- Türkiye'deki sendikaların il temsilcilikleri ve bağlı bulundukları konfederasyonlar, harita üzerinde görselleştirilmiştir.

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/h1.png" width="500" height="auto" />

### Graphs Sekmesi

- Pyvis kullanılarak oluşturulan graf tabanlı veriler, çeşitli istihdam ve sendika dağılımlarını içermektedir.
  - Bölgelere Göre İstihdam 2021
  - Bölgelere Göre İstihdam 2022
  - Sektöre Göre İstihdam
  - Eğitime Göre İstihdam
  - Türk-İş Sendika Grafikleri

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/z1.png" width="400" height="auto" />

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/z2.png" width="200" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/z3.png" width="200" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/z4.png" width="200" height="auto" />

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/z5.png" width="300" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/z6.png" width="400" height="auto" /> 


## Proje Detayları ve Teknik Özellikler

Bu projede **Node.js**, **Express**, **MySQL**, **EJS**, **Chart.js**, **Bootstrap**, **Font Awesome** gibi çeşitli teknolojiler kullanılmıştır. Web sitesinde, işgücü ve istihdam verilerinin analiz edilmesi, görselleştirilmesi ve tahmin edilmesi amacıyla Python ve Pyvis kütüphanesi de yer almıştır. Proje, ayrıca Türkiye’deki işçi haklarını ve sendikal yapılarını ele alan bilgilendirici içeriklere sahiptir.

Veritabanı olarak **MySQL** kullanılmış olup, verilerin esnek bir şekilde yönetilmesi ve saklanması sağlanmıştır. Web sitesinin kullanıcı arayüzü **Bootstrap** ile modern ve kullanıcı dostu bir şekilde tasarlanmıştır.

<i>English</i>

## Project Purpose

**Worker Atlas** is a web project focusing on labor force participation, uninsured workers, worker and employer rights, and unions in Turkey. This project was developed to analyze, visualize, and provide future predictions about the labor market in Turkey. The main purpose of the project is to help users develop conscious strategies regarding labor force and to raise awareness of workers' rights.

## License

This project is licensed under the [ISC license](https://opensource.org/licenses/ISC).

## Contact

For questions or feedback, you can use the following contact information:

- GitHub: [ieavci/Labor-Rights](https://github.com/ieavci/Labor-Rights)
- For bug reports: [LinkedIn](www.linkedin.com/in/ismail-avci-tr)

### Requirements

The following software must be installed on your system to run the project:

- [Node.js](https://nodejs.org/) (v14 or later)
- [NPM](https://www.npmjs.com/) (Node Package Manager)
- Dependencies required for the project to run:

- `bootstrap` v5.3.2
- `chart.js` v4.4.1
- `ejs` v3.1.8
- `express` v4.18.1
- `font-awesome` v4.7.0
- `jquery` v3.7.1
- `mysql2` v2.3.3

## Required Packages

The following packages are required to run this project:

- **Express**: Framework used as a web server.
- **EJS**: Template engine used to create dynamic HTML pages.
- **Chart.js**: Library used to create charts and visualizations.
- **Bootstrap**: CSS framework used to design the user interface.
- **Font Awesome**: Library used for icons and symbols.
- **MySQL2**: Library used to connect to the MySQL database.
- **Nodemon**: Tool used to automatically restart the server during development.

### Cloning the Project

You can start by cloning the project repository to your local machine:

```bash
git clone https://github.com/ieavci/Labor-Rights.git
cd Labor-Rights
```

### Installation

Steps required to run the project:

1. **Install Dependencies**:
```bash
npm install
```

2. **Start the Project**:
```bash
npm start
```
## Project Features

### Home

- 2023 sectoral employment data for each city on a map of Turkey in SVG format are visualized with pie, bar and radar charts.
- Labor force participation and employment data by sector for the 15+ age group are presented with bar and line charts as total, male and female.
- Employment data by region is visualized with radar charts.

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/a1.png" width="400" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/a2.png" width="auto" height="400" /> <img src="https://git hub.com/ieavci/isciatlasi/blob/main/public/img/ss/b1.png" width="400" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/b2.png" width="400" height="auto" /> ### Prediction Tab - Users can view a specific can view employment data for the year and projected data for this year.
- In addition, 10-year forecast data is also presented in graphs.
- Sectoral employment estimates for the selected year and labor force estimates by education status are presented in table form.

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/c1.png" width="400" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/c2.png" width="400" height="auto" /> <img src="https://git hub.com/ieavci/isciatlasi/blob/main/public/img/ss/c3.png" width="400" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/c4.png" width="400" height="auto" style="margin:5;"/> ### Sectoral Distribution Tab

- The sectoral distribution of employment in Turkey by region over the years is visualized on the map.

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/d1.png" width="500" height="auto" />

### Uninsured Workers Tab

- The ways in which uninsured workers can seek their rights are explained in detail.

- A petition creation web form has been provided to help users seek their rights.

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/e1.png" width="500" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/e2.png" width="500" height="auto" />

### Rights Tab

- The legal basis of employer and employee rights and obligations are listed with articles of law.

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/f1.png" width="500" height="auto" />

### Unions Tab

- The importance of unions and unionization is explained; Unions and labor union confederations in Turkey are detailed.

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/g1.png" width="500" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/g2.png" width="500" height="auto" />

### Trade Unions Distribution Tab

- Provincial representatives of trade unions in Turkey and the confederations they are affiliated with are visualized on the map.

<img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/h1.png" width="500" height="auto" />

### Graphs Tab

- Graph-based data created using Pyvis includes various employment and union distributions.
- Employment by Regions 2021
- Employment by Regions 2022
- Employment by Sector
- Employment by Education 
- Türk-İş Union Graphics <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/z1.png" width="400" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/z2.png" width="200" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/z3.png" width="200" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/z4.png" width="200" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/z5.png" width="300" height="auto" /> <img src="https://github.com/ieavci/isciatlasi/blob/main/public/img/ss/z6.png" width="400" height="auto" />

## Project Details and Technical Specifications

Various technologies such as **Node.js**, **Express**, **MySQL**, **EJS**, **Chart.js**, **Bootstrap**, **Font Awesome** were used in this project. The website also includes Python and Pyvis libraries for analyzing, visualizing and predicting labor force and employment data. The project also has informative content on labor rights and union structures in Turkey.

**MySQL** was used as the database, allowing flexible management and storage of data. The user interface of the website was designed in a modern and user-friendly way with **Bootstrap**.
