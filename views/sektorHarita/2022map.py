import pandas as pd
import folium

# Verileri oku
bolgelere2021_df = pd.read_csv('/Users/muhammet.saltuk/PycharmProjects/graph/bolgelere2021.csv', sep=';', encoding='utf-8')
bolgelere2022_df = pd.read_csv('/Users/muhammet.saltuk/PycharmProjects/graph/bolgelere2022.csv', sep=';', encoding='utf-8')

# Sütun adlarını temizle
bolgelere2021_df.columns = bolgelere2021_df.columns.str.strip()
bolgelere2022_df.columns = bolgelere2022_df.columns.str.strip()

# Koordinatları içeren sözlük
coordinates = {
    "TR10 (Istanbul)": [41.0082, 28.9784], "TR21 (Tekirdag, Edirne, Kirklareli)": [41.2867, 36.33], "TR22 (Balikesir, Canakkale)": [39.6484, 27.8826],
    "TR31 (Izmir)": [38.4192, 27.1287], "TR32 (Aydin, Denizli, Mugla)": [37.8483, 27.8455], "TR33 (Manisa, Afyonkarahisar, Kutahya, Usak)": [38.7637, 30.5387],
    "TR41 (Bursa, Eskisehir, Bilecik)": [40.1885, 29.061], "TR42 (Kocaeli, Sakarya, Duzce, Bolu, Yalova)": [40.8533, 29.8815], "TR51 (Ankara)": [39.9334, 32.8597],
    "TR52 (Konya, Karaman)": [37.8746, 32.4934], "TR61 (Antalya, Isparta, Burdur)": [36.8969, 30.7133], "TR62 (Adana, Mersin)": [37.0, 35.3213],
    "TR63 (Hatay, Kahramanmaras, Osmaniye)": [37.074, 36.2462], "TR71 (Kirikkale, Aksaray, Nigde, Nevsehir, Kirsehir)": [38.3686, 34.0292],
    "TR72 (Kayseri, Sivas, Yozgat)": [38.7225, 35.4853], "TR81 (Zonguldak, Karabuk, Bartin)": [41.4564, 31.7987], "TR82 (Kastamonu, Cankiri, Sinop)": [41.3887, 33.7827],
    "TR83 (Samsun, Tokat, Corum, Amasya)": [41.2867, 36.33], "TR90 (Trabzon, Ordu, Giresun, Rize, Artvin, Gumushane)": [40.9128, 38.3895], "TRA1 (Erzurum, Erzincan, Bayburt)": [39.9043, 41.2675],
    "TRA2 (Agri, Kars, Igdir, Ardahan)": [40.6167, 43.0975], "TRB1 (Malatya, Elazig, Bingol, Tunceli)": [38.6748, 39.2228], "TRB2 (Van, Mus, Bitlis, Hakkari)": [37.576, 43.737],
    "TRC1 (Gaziantep, Adiyaman, Kilis)": [37.0662, 37.3833], "TRC2 (Sanliurfa, Diyarbakir)": [37.1673, 38.7939], "TRC3 (Mardin, Batman, Sirnak, Siirt)": [37.3212, 40.7245]
}

# Koordinatları dataframe'e ekle
def add_coordinates(df, coord_dict):
    df['Latitude'] = df['Unnamed: 0'].apply(lambda x: coord_dict[x][0] if x in coord_dict else None)
    df['Longitude'] = df['Unnamed: 0'].apply(lambda x: coord_dict[x][1] if x in coord_dict else None)

add_coordinates(bolgelere2021_df, coordinates)
add_coordinates(bolgelere2022_df, coordinates)

# 2021 verilerini haritaya ekle
m_2021 = folium.Map(location=[39.0, 35.0], zoom_start=6)
for _, row in bolgelere2021_df.iterrows():
    if pd.notna(row['Latitude']) and pd.notna(row['Longitude']):
        folium.Marker(
            location=[row['Latitude'], row['Longitude']],
            popup=f"{row['Unnamed: 0']}<br>Toplam: {row['Toplam']}<br>Tarım: {row['Tarim(%)']}%<br>Sanayi: {row['Sanayi(%)']}%<br>Hizmetler: {row['Hizmet (%)']}%",
            icon=folium.Icon(color='blue')
        ).add_to(m_2021)

# 2022 verilerini haritaya ekle
m_2022 = folium.Map(location=[39.0, 35.0], zoom_start=6)
for _, row in bolgelere2022_df.iterrows():
    if pd.notna(row['Latitude']) and pd.notna(row['Longitude']):
        folium.Marker(
            location=[row['Latitude'], row['Longitude']],
            popup=f"{row['Unnamed: 0']}<br>Toplam: {row['Toplam']}<br>Tarım: {row['Tarim(%)']}%<br>Sanayi: {row['Sanayi(%)']}%<br>Hizmetler: {row['Hizmet (%)']}%",
            icon=folium.Icon(color='green')
        ).add_to(m_2022)

# Haritaları kaydet
m_2021.save("turkey_map_2021.html")
m_2022.save("turkey_map_2022.html")
