const express = require("express");
const { spawn } = require('child_process');
const app = express();
const body_parser = require('body-parser');
const path = require("path");

app.use(body_parser.json({ limit: "30mb", extends: true }))
app.use(body_parser.urlencoded({ limit: "30mb", extends: true }))

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

app.set("view engine", "ejs");

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));
app.get('/prediction', (req, res) => {
    
    const pythonProcess = spawn('python', ['./ongoruAnalitigi/prediction.py']);

    pythonProcess.stdout.on('data', (data) => {
        const result = JSON.parse(data.toString());
        
        const predicted_unemployment_rate = result.unemployment_rate;
        const predicted_not_in_labor_force = result.not_in_labor_force;
        const predicted_labor_force_participation_rate = result.labor_force_participation_rate;
        const predicted_employment_rate = result.employment_rate;

        res.render('./ongoruAnalitigi/prediction', { 
            predicted_unemployment_rate,
            predicted_not_in_labor_force,
            predicted_labor_force_participation_rate,
            predicted_employment_rate
        });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});

app.use("/admin", adminRoutes);
app.use("/", userRoutes);
app.use(express.urlencoded({ extended: false }))

app.listen(3000, function () {
    console.log("listening port at 3000")
})