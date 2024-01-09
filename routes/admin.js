const express = require("express");
const router = express.Router();
const db = require("../data/db")




router.get("/haberler", async function (req, res) {
    try {
        //const [haberler] = await db.query("");
        res.render("admin/haberler.ejs", {
            
        });
    } catch (error) {
        console.error(error)
    }

});

router.get("/haber/create", async function (req, res) {
    try {
        
        const [hbr] = await db.query("SELECT * FROM haberler");
        res.render("admin/haber-create", {
            title: "haber ekle",
            hbr: hbr
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/haber/create", async function (req, res) {
    
    const { baslik, yazar, tarih, icerik, img } = req.body;

    try {
        console.log("Received POST request with body:", req.body);
        await db.query("INSERT INTO haberler (id, baslik, yazar, tarih, icerik, img) VALUES (?, ?, ?, ?, ?, ?)", [0, baslik, yazar, tarih, icerik, img]);
        res.redirect("/haberler/create");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

























module.exports = router;