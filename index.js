const express = require("express");
const { spawn } = require('child_process');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

app.set("view engine", "ejs");

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

// Prediction route with year parameter
app.get('/prediction', (req, res) => {
    let predictionYear = req.query.predictionYear;

    if (!predictionYear) {
        predictionYear=2024;
    }

    // İlk Python betiği için spawn çağrısı
    const pythonProcess1 = spawn('python', ['./ongoruAnalitigi/prediction.py', predictionYear]);

    pythonProcess1.stdout.on('data', (data) => {
        const result1 = JSON.parse(data.toString());

        // İşgücüne katılım verileri
        const predicted_unemployment_rate = result1.unemployment_rate;
        const predicted_not_in_labor_force = result1.not_in_labor_force;
        const predicted_labor_force_participation_rate = result1.labor_force_participation_rate;
        const predicted_employment_rate = result1.employment_rate;

        // İkinci Python betiği için spawn çağrısı
        const pythonProcess2 = spawn('python', ['./ongoruAnalitigi/sektorPrediction.py', predictionYear]);

        pythonProcess2.stdout.on('data', (data) => {
            const result2 = JSON.parse(data.toString());
            
            // Sektör tahmin verileri
            const predicted_tarim = result2.Tarım;
            const predicted_sanayi = result2.Sanayi;
            const predicted_insaat = result2.İnşaat;
            const predicted_hizmet = result2.Hizmet;
            const predicted_tarim_yuzde = result2.TarımYüzde;
            const predicted_sanayi_yuzde = result2.SanayiYüzde;
            const predicted_insaat_yuzde = result2.İnşaatYüzde;
            const predicted_hizmet_yuzde = result2.HizmetYüzde;

            // Üçüncü Python betiği için spawn çağrısı
            const pythonProcess3 = spawn('python', ['./ongoruAnalitigi/egitimPrediction.py', predictionYear]);

            pythonProcess3.stdout.on('data', (data) => {
                const result3 = JSON.parse(data.toString());
                
                // Eğitim durumuna göre tahmin verileri
                const predicted_uneducated_labor_force = result3.Uneducated_Labor_Force;
                const predicted_uneducated_employment = result3.Uneducated_Employment;
                const predicted_uneducated_unemployment = result3.Uneducated_Unemployment;
                const predicted_less_than_highschool_labor_force = result3.LessThanHighSchool_Labor_Force;
                const predicted_less_than_highschool_employment = result3.LessThanHighSchool_Employment;
                const predicted_less_than_highschool_unemployment = result3.LessThanHighSchool_Unemployment;
                const predicted_highschool_labor_force = result3.HighSchool_Labor_Force;
                const predicted_highschool_employment = result3.HighSchool_Employment;
                const predicted_highschool_unemployment = result3.HighSchool_Unemployment;
                const predicted_vocational_labor_force = result3.Vocational_Labor_Force;
                const predicted_vocational_employment = result3.Vocational_Employment;
                const predicted_vocational_unemployment = result3.Vocational_Unemployment;
                const predicted_highereducation_labor_force = result3.HigherEducation_Labor_Force;
                const predicted_highereducation_employment = result3.HigherEducation_Employment;
                const predicted_highereducation_unemployment = result3.HigherEducation_Unemployment;

                // Render işlemi
                res.render('./ongoruAnalitigi/prediction', { 
                    predicted_unemployment_rate,
                    predicted_not_in_labor_force,
                    predicted_labor_force_participation_rate,
                    predicted_employment_rate,
                    predicted_tarim,
                    predicted_sanayi,
                    predicted_insaat,
                    predicted_hizmet,
                    predicted_tarim_yuzde,
                    predicted_sanayi_yuzde,
                    predicted_insaat_yuzde,
                    predicted_hizmet_yuzde,
                    predicted_uneducated_labor_force,
                    predicted_uneducated_employment,
                    predicted_uneducated_unemployment,
                    predicted_less_than_highschool_labor_force,
                    predicted_less_than_highschool_employment,
                    predicted_less_than_highschool_unemployment,
                    predicted_highschool_labor_force,
                    predicted_highschool_employment,
                    predicted_highschool_unemployment,
                    predicted_vocational_labor_force,
                    predicted_vocational_employment,
                    predicted_vocational_unemployment,
                    predicted_highereducation_labor_force,
                    predicted_highereducation_employment,
                    predicted_highereducation_unemployment
                });
            });

            pythonProcess3.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            pythonProcess3.on('close', (code) => {
                console.log(`Eğitim tahmini betiği için child process exited with code ${code}`);
            });
        });
        
        pythonProcess2.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pythonProcess2.on('close', (code) => {
            console.log(`Sektör betiği için child process exited with code ${code}`);
        });
    });

    pythonProcess1.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess1.on('close', (code) => {
        console.log(`Ana betiği için child process exited with code ${code}`);
    });
});

app.use("/admin", adminRoutes);
app.use("/", userRoutes);
app.use(express.urlencoded({ extended: false }))

app.listen(3000, function () {
    console.log("listening port at 3000")
});
