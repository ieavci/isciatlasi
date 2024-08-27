from pyvis.network import Network
import pandas as pd

# Dosyaları oku
bolgelere2021_df = pd.read_csv('/Users/muhammet.saltuk/PycharmProjects/graph/bolgelere2021.csv', sep=';', encoding='utf-8')
bolgelere2022_df = pd.read_csv('/Users/muhammet.saltuk/PycharmProjects/graph/bolgelere2022.csv', sep=';', encoding='utf-8')
sektoregoreistihdamtoplam_df = pd.read_csv('/Users/muhammet.saltuk/PycharmProjects/graph/sektoregoreistihdamtoplam.csv', sep=';', encoding='utf-8')

# labor_force_data dosyasını oku ve gerekli sütunları seç
labor_force_data_df = pd.read_csv('/Users/muhammet.saltuk/PycharmProjects/graph/labor_force_data.csv', sep=',', encoding='utf-8', header=0)
labor_force_data_df = labor_force_data_df[['Year', 'Uneducated_Labor_Force', 'LessThanHighSchool_Labor_Force', 'HighSchool_Labor_Force', 'Vocational_Labor_Force', 'HigherEducation_Labor_Force']]

# Sütun isimlerini temizle ve düzenle
bolgelere2021_df.columns = ['Bölge', 'Toplam', 'Tarım', 'Sanayi', 'Hizmetler', 'Tarım(%)', 'Sanayi(%)', 'Hizmetler(%)']
bolgelere2022_df.columns = ['Bölge', 'Toplam', 'Tarım', 'Sanayi', 'Hizmetler', 'Tarım(%)', 'Sanayi(%)', 'Hizmetler(%)']
sektoregoreistihdamtoplam_df.columns = ['Yıl', 'Toplam', 'Tarım', 'Sanayi', 'İnşaat', 'Hizmetler', 'Toplam1', 'Tarım(%)', 'Sanayi(%)', 'İnşaat(%)', 'Hizmetler(%)']
labor_force_data_df.columns = ['Yıl', 'Eğitimsiz İşgücü', 'Lise Altı İşgücü', 'Lise İşgücü', 'Meslek Lisesi İşgücü', 'Yükseköğretim İşgücü']

# Initialize networks
net_2021 = Network(height='600px', width='100%')
net_2022 = Network(height='600px', width='100%')
net_employment = Network(height='600px', width='100%')
net_labor_force = Network(height='600px', width='100%')

# Adjust physics settings to decrease spacing
for net in [net_2021, net_2022, net_employment, net_labor_force]:
    net.barnes_hut(gravity=-20000, central_gravity=0.3, spring_length=30, spring_strength=0.05, damping=0.1)

# Function to add nodes and edges for regions and sectors with percentage coloring and edge thickness
def add_region_sector_nodes(net, df, year_label):
    central_node = f'Türkiye {year_label}'
    net.add_node(central_node, label=central_node, color='blue', title=central_node)

    sectors = df.columns[2:5]  # Adjusted column indices
    for sector in sectors:
        net.add_node(sector, label=sector, color='green', title=sector)
        net.add_edge(central_node, sector, value=1, arrows=None)

        for _, row in df.iterrows():
            region = row['Bölge']
            try:
                percentage_str = row[f'{sector}(%)']
                percentage_str = percentage_str.replace(' ', '').replace(',', '').replace('%', '').strip()
                percentage = float(percentage_str)
                if percentage > 1:
                    percentage = percentage / 10.0  # Adjust percentage values to be in correct range
            except ValueError:
                percentage = 0.0
            color = 'red' if percentage > 50 else 'yellow' if percentage > 25 else 'lightgreen'
            title = f'{region} {sector}: {percentage}% Toplam: {row["Toplam"]} Tarım: {row["Tarım"]} Sanayi: {row["Sanayi"]} Hizmetler: {row["Hizmetler"]}'
            net.add_node(f'{region}_{sector}_{year_label}', label=region, color=color, title=title)  # Node ID is combined with sector and year_label
            net.add_edge(sector, f'{region}_{sector}_{year_label}', value=percentage / 10, arrows=None)  # Adjust edge thickness based on percentage

# Add nodes and edges for 2021 data
add_region_sector_nodes(net_2021, bolgelere2021_df, '2021')

# Add nodes and edges for 2022 data
add_region_sector_nodes(net_2022, bolgelere2022_df, '2022')

# Function to add nodes and edges for employment data
def add_employment_nodes(net, df):
    central_node = 'Türkiye İstihdam'
    net.add_node(central_node, label=central_node, color='blue', title=central_node)

    sectors = ['Tarım', 'Sanayi', 'İnşaat', 'Hizmetler']
    for sector in sectors:
        net.add_node(sector, label=sector, color='green', title=sector)
        net.add_edge(central_node, sector, value=1, arrows=None)

        sector_df = df[['Yıl', sector]]
        for _, row in sector_df.iterrows():
            year = row['Yıl']
            try:
                year = int(year)
            except ValueError:
                year = str(year)
            value = row[sector]
            title = f'{year} {sector}: {value}'
            net.add_node(f'{year}_{sector}_employment', label=str(year), color='lightblue', title=title)
            net.add_edge(sector, f'{year}_{sector}_employment', value=value / 10000, arrows=None)  # Adjust edge thickness based on value

# Add nodes and edges for employment data
add_employment_nodes(net_employment, sektoregoreistihdamtoplam_df)

# Function to add nodes and edges for labor force data
def add_labor_force_nodes(net, df):
    central_node = 'Türkiye İşgücü'
    net.add_node(central_node, label=central_node, color='blue', title=central_node)

    education_levels = ['Eğitimsiz İşgücü', 'Lise Altı İşgücü', 'Lise İşgücü', 'Meslek Lisesi İşgücü', 'Yükseköğretim İşgücü']
    for education_level in education_levels:
        net.add_node(education_level, label=education_level, color='purple', title=education_level)
        net.add_edge(central_node, education_level, value=1, arrows=None)

        education_df = df[['Yıl', education_level]]
        for _, row in education_df.iterrows():
            year = row['Yıl']
            try:
                year = int(year)
            except ValueError:
                year = str(year)
            value = row[education_level]
            title = f'{year}:{education_level}: {value}'
            net.add_node(f'{year}_{education_level}_labor', label=str(year), color='lightblue', title=title)
            net.add_edge(education_level, f'{year}_{education_level}_labor', value=value / 10000, arrows=None)  # Adjust edge thickness based on value

# Add nodes and edges for labor force data
add_labor_force_nodes(net_labor_force, labor_force_data_df)

# Save the networks to HTML files
net_2021.write_html('network_2021.html')
net_2022.write_html('network_2022.html')
net_employment.write_html('network_employment.html')
net_labor_force.write_html('network_labor_force.html')