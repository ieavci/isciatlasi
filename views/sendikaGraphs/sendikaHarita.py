import pandas as pd
import geopandas as gpd
import folium
import networkx as nx

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
    'Sehir': ['ADIYAMAN', 'AFYON', 'AĞRI', 'AMASYA', 'ANKARA', 'ANTALYA', 'ARTVİN', 'AYDIN', 'BALIKESİR', 'BİLECİK',
              'BİNGÖL', 'BİTLİS', 'BOLU', 'BURDUR', 'ÇANAKKALE', 'ÇANKIRI', 'ÇORUM', 'DENİZLİ', 'EDİRNE', 'ELAZIĞ',
              'ERZİNCAN', 'ERZURUM', 'GAZİANTEP', 'GİRESUN', 'GÜMÜŞHANE', 'HAKKARİ', 'HATAY', 'ISPARTA', 'İÇEL MERSİN',
              'KARS', 'KASTAMONU', 'KAYSERİ', 'KIRKLARELİ', 'KIRŞEHİR', 'KOCAELİ', 'KONYA', 'KÜTAHYA', 'MALATYA',
              'MANİSA', 'KAHRAMANMARAŞ', 'MARDİN', 'MUĞLA', 'MUŞ', 'NEVŞEHİR', 'NİĞDE', 'ORDU', 'RİZE', 'SAKARYA',
              'SAMSUN', 'SİİRT', 'SİNOP', 'TEKİRDAĞ', 'TOKAT', 'TRABZON', 'TUNCELİ', 'ŞANLIURFA', 'UŞAK', 'ŞIRNAK',
              'BARTIN', 'ARDAHAN', 'IĞDIR', 'YALOVA']
}

# Veriyi pandas DataFrame'e aktaralım
df = pd.DataFrame(data)

# Şehirlerin coğrafi konumlarını içeren bir veri seti
city_coords = {
    'ADIYAMAN': (37.760072, 38.276462),
    'AFYON': (38.750714, 30.556692),
    'AĞRI': (39.719089, 43.051833),
    'AMASYA': (40.651676, 35.835315),
    'ANKARA': (39.933364, 32.859742),
    'ANTALYA': (36.896896, 30.713323),
    'ARTVİN': (41.183516, 41.820231),
    'AYDIN': (37.849774, 27.845708),
    'BALIKESİR': (39.648369, 27.882610),
    'BİLECİK': (40.142825, 29.979322),
    'BİNGÖL': (38.885349, 40.498180),
    'BİTLİS': (38.394330, 42.123699),
    'BOLU': (40.735483, 31.606795),
    'BURDUR': (37.720979, 30.290277),
    'ÇANAKKALE': (40.155312, 26.414160),
    'ÇANKIRI': (40.598728, 33.615257),
    'ÇORUM': (40.550556, 34.955556),
    'DENİZLİ': (37.774929, 29.087509),
    'EDİRNE': (41.677191, 26.555968),
    'ELAZIĞ': (38.674761, 39.222576),
    'ERZİNCAN': (39.750000, 39.500000),
    'ERZURUM': (39.900000, 41.270000),
    'GAZİANTEP': (37.066220, 37.383320),
    'GİRESUN': (40.912811, 38.389533),
    'GÜMÜŞHANE': (40.438060, 39.508610),
    'HAKKARİ': (37.574478, 43.740833),
    'HATAY': (36.401824, 36.349809),
    'ISPARTA': (37.770202, 30.558080),
    'İÇEL MERSİN': (36.795068, 34.617739),
    'KARS': (40.601911, 43.097751),
    'KASTAMONU': (41.388713, 33.782730),
    'KAYSERİ': (38.733334, 35.483765),
    'KIRKLARELİ': (41.733334, 27.216667),
    'KIRŞEHİR': (39.145561, 34.163497),
    'KOCAELİ': (40.853270, 29.881520),
    'KONYA': (37.871422, 32.503975),
    'KÜTAHYA': (39.424702, 29.983864),
    'MALATYA': (38.355518, 38.309118),
    'MANİSA': (38.613838, 27.425384),
    'KAHRAMANMARAŞ': (37.574782, 36.937440),
    'MARDİN': (37.312236, 40.735112),
    'MUĞLA': (37.213333, 28.363611),
    'MUŞ': (38.746667, 41.496944),
    'NEVŞEHİR': (38.693333, 34.685050),
    'NİĞDE': (37.966667, 34.683333),
    'ORDU': (40.983334, 37.883331),
    'RİZE': (40.894825, 40.983535),
    'SAKARYA': (40.760780, 30.378139),
    'SAMSUN': (41.286670, 36.330002),
    'SİİRT': (37.927251, 41.944710),
    'SİNOP': (42.026422, 35.155075),
    'TEKİRDAĞ': (40.983334, 27.516666),
    'TOKAT': (40.313889, 36.554722),
    'TRABZON': (41.005270, 39.724720),
    'TUNCELİ': (39.108890, 39.548611),
    'ŞANLIURFA': (37.167080, 38.793919),
    'UŞAK': (38.674339, 29.405919),
    'ŞIRNAK': (37.517879, 42.457775),
    'BARTIN': (41.636967, 32.337502),
    'ARDAHAN': (41.110458, 42.702223),
    'IĞDIR': (39.923275, 44.045006),
    'YALOVA': (40.655014, 29.275351)
}

# Şehirler arasındaki bağlantıları oluşturmak için bir network grafiği oluşturalım
G = nx.Graph()

# Şehir düğümlerini ekleyelim
for city, coords in city_coords.items():
    G.add_node(city, pos=coords)

# Şehirler arasında bağlantıları ekleyelim (Ankara'dan diğer şehirlere bağlantılar)
ankara_coords = city_coords['ANKARA']
for city, coords in city_coords.items():
    if city != 'ANKARA':
        G.add_edge('ANKARA', city, weight=1)  # Bağlantı ağırlığı 1 olarak belirlendi

# Şehirlerin coğrafi konumlarını kullanarak bir harita oluşturalım
m = folium.Map(location=[ankara_coords[0], ankara_coords[1]], zoom_start=6)

# Şehir düğümlerini haritaya ekleyelim
for city, coords in city_coords.items():
    folium.Marker(location=[coords[0], coords[1]], popup=city).add_to(m)

# Şehirler arasındaki bağlantıları haritaya ekleyelim
for edge in G.edges():
    city1 = edge[0]
    city2 = edge[1]
    coords1 = city_coords[city1]
    coords2 = city_coords[city2]
    folium.PolyLine(locations=[(coords1[0], coords1[1]), (coords2[0], coords2[1])], color='blue', weight=1).add_to(m)

# Haritayı kaydedelim
m.save('sendikaHarita.ejs')

