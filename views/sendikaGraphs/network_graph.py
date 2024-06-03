import pandas as pd
import networkx as nx
from pyvis.network import Network

data = {
    'Ad_Soyad': ['Mehmet KARAMAN', 'Muharrem USLU', 'Agit ARSLAN', 'Ali TOPUZ', 'Nihat ZENGİN', 'Cemil ÜNAL',
                 'Nizamettin GÜNEŞ', 'Kazım GÜLTEKİN', 'Nedim VESKE', 'Osman Vedat TAYLAN', 'Şeyhmus ALTUNBAY',
                 'Mustafa CENGİZ', 'Hakan GÜLEN', 'Mustafa ONAY', 'Hakan BAYTUR', 'Vedat GÖKTEPE', 'İhsan ÜÇTEPE',
                 'Yakup ÇETİN', 'Zeki ŞİŞKO', 'Mehmet KARA', 'Oğuz BİNGÖL', 'Yusuf GÖKCAN', 'Mehmet Akif SARICA',
                 'Tarık SAYIN', 'İlyas KOCAMAN', 'Murat ÇATAL', 'Çakır VARAN', 'Osman KORKMAZ', 'İrfan GÜLTEKİN',
                 'Dinçer YILMAZ', 'Mehmet ÇELİK', 'İdris GÜVEN', 'Mehmet ÖZMÜŞ', 'Muzaffer YILMAZ', 'Ali Bostan',
                 'Abdülkadir TAMAK', 'İsmail GÖK', 'Hikmet KAZGAN', 'Ercan DERELİ', 'Hacı Mehmet KAVUK', 'Cemal ÖZKAN',
                 'Fatih ERÇELİK', 'Salih AKYÜREK', 'Ersin DÖRTKOL', 'Barış AYDOĞAN', 'Ulvi ŞEN', 'Harun ERDOĞAN',
                 'Cemal YAMAN', 'Fati KÖYMEN', 'Fahrettin NAZLIER', 'Muhittin DURDU', 'Murat KOÇAK', 'Nurullah ALFAT',
                 'Gökhan GEDİKLİ', 'Ali Bedri KIRMIZITOPRAK', 'Erol DÜZME', 'Ali Murat YALÇINDAĞ', 'Selim ÖĞMEN',
                 'Ümit Çınar', 'Mehmet ÖZDEMİR', 'Mehmet Sıddık KAMAN', 'Murat ŞAHİN'],
    'Sendika': ['Petrol-İş', 'Demiryol-İş', 'Şeker-İş', 'Tes-İş', 'Türk Metal', 'Yol-İş', 'T.Yol-İş', 'Tes-İş',
                'Türk Metal', 'ÇİMSE-İŞ', 'T.Yol-İş', 'T. Koop-İş', 'Türk Metal', 'Şeker-İş', 'Türk Metal', 'Türk Metal',
                'Yol-İş', 'Çimse-İş', 'Tes-İş', 'T.Yol-İş', 'Şeker-İş', 'Demiryol-İş', 'T.Koop-İş', 'Tezkoop-İş',
                'T.Yol-İş', 'T.Yol-İş', 'Türk Metal', 'Tes-İş', 'T.Yol-İş', 'Demiryol-İş', 'T.Yol-İş', 'Koop-İş',
                'Kristal –İş', 'T.Yol-İş', 'TEKGIDA-İŞ', 'Tarım-İş', 'Çimse-İş', 'Demiryol-İş', 'Türk Metal', 'Tes-İş',
                'T.Yol-İş', 'T.Yol-İş', 'Yol-İş', 'T.Yol-İş', 'Tes-İş', 'Yol-İş', 'Demiryol-İş', 'Koop-İş', 'T.Yol-İş',
                'Sağlık-İş', 'Türk Metal', 'Şeker-İş', 'T.Yol-İş', 'T.Yol-İş', 'Tes–İş', 'Çimse-İş', 'T.Yol-İş',
                'G.Maden-iş', 'Petrol-İş', 'Petrol-İş', 'T.Yol-İş', 'G.Maden-İş', 'T.Yol-İş', 'T.Yol-İş', 'Toleyis'],
    'Sehir': ['ADIYAMAN', 'AFYON', 'AĞRI', 'AMASYA', 'ANKARA', 'ANTALYA', 'ARTVİN', 'AYDIN', 'BALIKESİR', 'BİLECİK',
              'BİNGÖL', 'BİTLİS', 'BOLU', 'BURDUR', 'ÇANAKKALE', 'ÇANKIRI', 'ÇORUM', 'DENİZLİ', 'EDİRNE', 'ELAZIĞ',
              'ERZİNCAN', 'ERZURUM', 'GAZİANTEP', 'GİRESUN', 'GÜMÜŞHANE', 'HAKKARİ', 'HATAY', 'ISPARTA', 'İÇEL MERSİN',
              'KARS', 'KASTAMONU', 'KAYSERİ', 'KIRKLARELİ', 'KIRŞEHİR', 'KOCAELİ', 'KONYA', 'KÜTAHYA', 'MALATYA',
              'MANİSA', 'KAHRAMANMARAŞ', 'MARDİN', 'MUĞLA', 'MUŞ', 'NEVŞEHİR', 'NİĞDE', 'ORDU', 'RİZE', 'SAKARYA',
              'SAMSUN', 'SİİRT', 'SİNOP', 'TEKİRDAĞ', 'TOKAT', 'TRABZON', 'TUNCELİ', 'ŞANLIURFA', 'UŞAK', 'ŞIRNAK',
              'BARTIN', 'ARDAHAN', 'IĞDIR', 'YALOVA'],
}

# Verilerin uzunluklarını kontrol edelim
for key, value in data.items():
    print(f"{key}: {len(value)}")

# Eğer verilerde eksiklik varsa eksik değerleri ekleyelim veya çıkaralım
lengths = [len(value) for value in data.values()]
min_length = min(lengths)
print(f"Min length: {min_length}")

# Tüm dizileri min_length ile eşitleyelim
for key in data.keys():
    data[key] = data[key][:min_length]

# Veriyi pandas DataFrame'e aktaralım
df = pd.DataFrame(data)

# PyVis grafiğini oluşturalım
net = Network(notebook=True, cdn_resources='in_line')

# Şehirleri ekleyelim
cities = df['Sehir'].unique()
for city in cities:
    net.add_node(city, label=city, color='blue')

# Sendikaları ekleyelim
unions = df['Sendika'].unique()
for union in unions:
    net.add_node(union, label=union, color='green')

# Temsilcileri ve bağlantılarını ekleyelim
for index, row in df.iterrows():
    net.add_node(row['Ad_Soyad'], label=row['Ad_Soyad'], color='red')
    net.add_edge(row['Sehir'], row['Ad_Soyad'], title='görevli')
    net.add_edge(row['Sendika'], row['Ad_Soyad'], title='başkan')

# Grafiği kaydetmek için
html_content = net.generate_html()

# UTF-8 kodlamasıyla kaydetme
with open('network_graph.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
