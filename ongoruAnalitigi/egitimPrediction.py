import pandas as pd
from sklearn.linear_model import LinearRegression

# Verileri bir DataFrame'e yükleme
data = {
    'Year': ['2021 Q1', '2021 Q2', '2021 Q3', '2021 Q4',
             '2022 Q1', '2022 Q2', '2022 Q3', '2022 Q4',
             '2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4',
             '2024 Q1'],
    'Labor_Force': [705, 736, 886, 871, 826, 858, 867, 885, 734, 804, 799, 747, 769],
    'Employment': [639, 676, 825, 798, 754, 801, 832, 837, 689, 769, 760, 709, 735],
    'Unemployment': [66, 60, 60, 73, 72, 56, 34, 47, 45, 35, 40, 38, 34],
    'Uneducated_Labor_Force': [705, 736, 886, 871, 826, 858, 867, 885, 734, 804, 799, 747, 769],
    'Uneducated_Employment': [639, 676, 825, 798, 754, 801, 832, 837, 689, 769, 760, 709, 735],
    'Uneducated_Unemployment': [66, 60, 60, 73, 72, 56, 34, 47, 45, 35, 40, 38, 34],
    'LessThanHighSchool_Labor_Force': [14877, 15308, 15444, 15366, 14989, 15505, 15324, 15360, 14914, 14966, 14984, 14771, 14786],
    'LessThanHighSchool_Employment': [12889, 13565, 13901, 13848, 13357, 14059, 14024, 14096, 13509, 13759, 13883, 13626, 13504],
    'LessThanHighSchool_Unemployment': [1988, 1743, 1543, 1517, 1632, 1446, 1300, 1265, 1405, 1207, 1101, 1146, 1282],
    'HighSchool_Labor_Force': [3582, 3703, 4092, 4121, 4272, 4490, 4805, 4769, 4760, 4904, 5181, 5074, 5145],
    'HighSchool_Employment': [3025, 3168, 3541, 3587, 3677, 3930, 4239, 4170, 4125, 4302, 4561, 4510, 4539],
    'HighSchool_Unemployment': [557, 535, 551, 534, 595, 561, 566, 599, 635, 602, 620, 564, 606],
    'Vocational_Labor_Force': [3591, 3559, 3792, 3846, 3920, 3899, 3967, 4073, 4107, 4012, 4137, 4186, 4107],
    'Vocational_Employment': [3055, 3114, 3317, 3396, 3417, 3491, 3536, 3605, 3643, 3619, 3718, 3792, 3712],
    'Vocational_Unemployment': [537, 445, 475, 450, 503, 408, 432, 468, 464, 393, 419, 395, 395],
    'HigherEducation_Labor_Force': [8912, 8938, 9350, 9292, 9275, 9482, 9698, 10002, 9927, 10033, 10215, 10270, 10462],
    'HigherEducation_Employment': [7783, 7925, 8067, 8186, 8214, 8484, 8529, 8847, 8890, 9058, 9122, 9383, 9524],
    'HigherEducation_Unemployment': [1130, 1013, 1283, 1106, 1061, 998, 1169, 1155, 1038, 975, 1093, 887, 938]
}

# DataFrame oluşturma
df = pd.DataFrame(data)

# Verileri CSV dosyasına yazma
df.to_csv('labor_force_data.csv', index=False)


# Verileri yükleme
df = pd.read_csv('labor_force_data.csv')

# "Year" sütununu güncelleme (sadece yıl bilgisini almak için)
df['Year'] = df['Year'].str.extract('(\d+)').astype(int)

# Tahmin edilecek yıl
import sys
import json

predictionYear = int(sys.argv[1])

# Tahmin modeli oluşturma ve eğitme
X = df[['Year']]
fields = ['Labor_Force', 'Employment', 'Unemployment', 
          'Uneducated_Labor_Force', 'Uneducated_Employment', 'Uneducated_Unemployment',
          'LessThanHighSchool_Labor_Force', 'LessThanHighSchool_Employment', 'LessThanHighSchool_Unemployment',
          'HighSchool_Labor_Force', 'HighSchool_Employment', 'HighSchool_Unemployment',
          'Vocational_Labor_Force', 'Vocational_Employment', 'Vocational_Unemployment',
          'HigherEducation_Labor_Force', 'HigherEducation_Employment', 'HigherEducation_Unemployment']

predictions = {}

for field in fields:
    y = df[field]
    model = LinearRegression()
    model.fit(X, y)
    predicted_value = model.predict([[predictionYear]])[0]
    predictions[field] = predicted_value

# Tahmin edilen değerleri JSON formatında yazdırma
import json
print(json.dumps(predictions))
