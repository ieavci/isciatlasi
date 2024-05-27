const express = require("express");

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

app.use("/admin", adminRoutes);
app.use("/", userRoutes);
app.use(express.urlencoded({ extended: false }))

app.listen(3000, function () {
    console.log("listening port at 3000")
});
