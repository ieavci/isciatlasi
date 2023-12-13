const express = require("express");

const app = express();

const path = require("path");

const mongoose = require("mongoose");

const userRoutes = require("./routes/user");

app.set("view engine", "ejs");

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(userRoutes);

//mongoose

// mongoose.connect("mongodb+srv://ieavci:mongohesap1@cluster0.jza4kdk.mongodb.net/?retryWrites=true&w=majority")
//     .then(() => console.log("mongodb connected."))
//     .catch((err) => {
//         console.error("MongoDB connection error:", err);
//     });

app.listen(3000, function () {
    console.log("listening port at 3000")
})