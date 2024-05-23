import pandas as pd
from sklearn.linear_model import LinearRegression
import json

# Veri seti
data = {
    'Yıl': [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    'Toplam': [19357, 19717, 20001, 20399, 20534, 21810, 23166, 23738, 24486, 25774, 26501, 27126, 28075, 28691, 28042, 26695, 28797, 30752],
    'Tarım': [4945, 4612, 4410, 4445, 4783, 5073, 5289, 5156, 5039, 5220, 5357, 5287, 5401, 5282, 5096, 4737, 4948, 4866],
    'Sanayi': [4140, 4299, 4388, 4524, 4153, 4619, 4855, 4891, 5133, 5339, 5345, 5295, 5394, 5686, 5572, 5482, 6143, 6663],
    'İnşaat': [1096, 1182, 1228, 1237, 1299, 1423, 1672, 1714, 1788, 1913, 1916, 1991, 2108, 2012, 1566, 1546, 1777, 1846],
    'Hizmet': [9176, 9624, 9975, 10193, 10299, 10696, 11350, 11977, 12525, 13302, 13884, 14552, 15171, 15711, 15808, 14930, 15928, 17378],
    'TarımYüzde': [25.5, 23.4, 22.0, 21.8, 23.3, 23.3, 22.8, 21.7, 20.6, 20.3, 20.2, 19.5, 19.2, 18.4, 18.2, 17.7, 17.2, 15.8],
    'SanayiYüzde': [21.4, 21.8, 21.9, 22.2, 20.2, 21.2, 21.0, 20.6, 21.0, 20.7, 20.2, 19.5, 19.2, 19.8, 19.9, 20.5, 21.3, 21.7],
    'İnşaatYüzde': [5.7, 6.0, 6.1, 6.1, 6.3, 6.5, 7.2, 7.2, 7.3, 7.4, 7.2, 7.3, 7.5, 7.0, 5.6, 5.8, 6.2, 6.0],
    'HizmetYüzde': [47.4, 48.8, 49.9, 50.0, 50.2, 49.0, 49.0, 50.5, 51.2, 51.6, 52.4, 53.6, 54.0, 54.8, 56.4, 55.9, 55.3, 56.5]
}

# DataFrame oluşturma
df = pd.DataFrame(data)
import sys
import json

predictionYear = int(sys.argv[1])

# Model oluşturma ve tahmin yapma fonksiyonu
def predict_future(df, column, year):
    X = df[['Yıl']]
    y = df[column]
    model = LinearRegression()
    model.fit(X, y)
    return model.predict([[year]])[0]

# Sektörlere göre tahmin yapma
predictions = {
    'Tarım': predict_future(df, 'Tarım', predictionYear),
    'Sanayi': predict_future(df, 'Sanayi', predictionYear),
    'İnşaat': predict_future(df, 'İnşaat', predictionYear),
    'Hizmet': predict_future(df, 'Hizmet', predictionYear),
    'TarımYüzde': predict_future(df, 'TarımYüzde', predictionYear),
    'SanayiYüzde': predict_future(df, 'SanayiYüzde', predictionYear),
    'İnşaatYüzde': predict_future(df, 'İnşaatYüzde', predictionYear),
    'HizmetYüzde': predict_future(df, 'HizmetYüzde', predictionYear)
}

# Tahmin edilen değerleri JSON formatında yazdırma
print(json.dumps(predictions, indent=4))

