const express = require("express");

const app = express();
const body_parser = require('body-parser');
const path = require("path");

app.use(body_parser.json({limit:"30mb",extends:true}))
app.use(body_parser.urlencoded({limit:"30mb",extends:true}))

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

app.set("view engine", "ejs");

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use("/", userRoutes);
app.use(express.urlencoded({extended:false}))

app.listen(3000, function () {
    console.log("listening port at 3000")
})