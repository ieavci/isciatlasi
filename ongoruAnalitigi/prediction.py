import pandas as pd
from sklearn.linear_model import LinearRegression
import sys
import json

# Güncellenmiş veri seti
data = {
    'Year': [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    'Population_15_and_Over': [48356, 49274, 50177, 50981, 51833, 52903, 53984, 54961, 55981, 56985, 57870, 58739, 59892, 60653, 61468, 62579, 63704, 64679],
    'Labor_Force': [21321, 21602, 21954, 22628, 23588, 24516, 25452, 25891, 26871, 28605, 29550, 30449, 31516, 32203, 32505, 30735, 32716, 34334],
    'Employment': [19357, 19717, 20001, 20399, 20534, 21810, 23166, 23738, 24486, 25774, 26501, 27126, 28075, 28691, 28042, 26695, 28797, 30752],
    'Unemployment': [1964, 1885, 1953, 2228, 3055, 2705, 2287, 2153, 2386, 2831, 3049, 3323, 3441, 3512, 4463, 4040, 3919, 3582],
    'Not_in_Labor_Force': [27035, 27672, 28223, 28354, 28245, 28387, 28531, 29070, 29110, 28379, 28320, 28290, 28377, 28449, 28962, 31844, 30989, 30345],
    'Labor_Force_Participation_Rate': [44.1, 43.8, 43.8, 44.4, 45.5, 46.3, 47.1, 47.1, 48.0, 50.2, 51.1, 51.8, 52.6, 53.1, 52.9, 49.1, 51.4, 53.1],
    'Employment_Rate': [40.0, 40.0, 39.9, 40.0, 39.6, 41.2, 42.9, 43.2, 43.7, 45.2, 45.8, 46.2, 46.9, 47.3, 45.6, 42.7, 45.2, 47.5],
    'Unemployment_Rate': [9.2, 8.7, 8.9, 9.8, 12.9, 11.0, 9.0, 8.3, 8.9, 9.9, 10.3, 10.9, 10.9, 10.9, 13.7, 13.1, 12.0, 10.4]
}

# DataFrame oluşturma
df = pd.DataFrame(data)

predictionYear = int(sys.argv[1])

# Model oluşturma ve tahmin etme fonksiyonu
def predict_future(years, X, y):
    model = LinearRegression()
    model.fit(X, y)
    predictions = []
    for year in years:
        predictions.append(model.predict([[year]])[0])
    return predictions

future_years = list(range(2025, 2035))

predicted_unemployment_rate = predict_future(future_years, df[['Year']], df['Unemployment_Rate'])
predicted_not_in_labor_force = predict_future(future_years, df[['Year']], df['Not_in_Labor_Force'])
predicted_labor_force_participation_rate = predict_future(future_years, df[['Year']], df['Labor_Force_Participation_Rate'])
predicted_employment_rate = predict_future(future_years, df[['Year']], df['Employment_Rate'])

# Tahmin edilen değerleri JSON formatında yazdırma
predictions = {
    'years': future_years,
    'unemployment_rate': predicted_unemployment_rate,
    'not_in_labor_force': predicted_not_in_labor_force,
    'labor_force_participation_rate': predicted_labor_force_participation_rate,
    'employment_rate': predicted_employment_rate,
    'selected_year_prediction': {
        'year': predictionYear,
        'unemployment_rate': predict_future([predictionYear], df[['Year']], df['Unemployment_Rate'])[0],
        'not_in_labor_force': predict_future([predictionYear], df[['Year']], df['Not_in_Labor_Force'])[0],
        'labor_force_participation_rate': predict_future([predictionYear], df[['Year']], df['Labor_Force_Participation_Rate'])[0],
        'employment_rate': predict_future([predictionYear], df[['Year']], df['Employment_Rate'])[0]
    }
}

print(json.dumps(predictions))
