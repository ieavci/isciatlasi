const express = require("express");

const router = express.Router();

const path = require("path");
const db = require("../data/db");

router.use("/haklar", async function (req, res) {

    const [tblSosyal] = await db.execute("select * from sosyalsigortalar")
    const [tblCezai] = await db.execute("select * from cezaiyaptirim")
    const [tblIsverenhaklari] = await db.execute("SELECT m.*, k.kanunbasligi FROM isverenkanunlarimaddeleri m JOIN isverenkanunlari k ON m.kanun_id = k.kanun_id ")
    const [tblIscihaklari] = await db.execute("SELECT m.*, k.kanunbasligi FROM iscikanunlarimaddeleri m JOIN iscikanunlari k ON m.kanun_id = k.kanun_id ")


    try {
        res.render("isci-ve-isveren/isci-ve-isveren.ejs", {
            sosyal: tblSosyal[0],
            cezai: tblCezai[0],
            isveren: tblIsverenhaklari,
            isci: tblIscihaklari,
        });

    } catch (error) {
        console.log(error)
    }
});
router.use("/sigortasiz", function (req, res) {
    res.render("sigortasiz_isci/sigortasiz-isci.ejs");
});
router.use("/sendikalar", async function (req, res) {
    const [tblDisk] = await db.execute("select * from `isciatlasi`.`disk sendika`");    
    const [tblSendikaKonfederasyonlar] = await db.execute("select * from `isciatlasi`.`sendikakonfederasyonlar`");    
    try {
        res.render("sendikalar/sendikalar.ejs", {
            disk: tblDisk,
            sendikaKonfederasyonlar:tblSendikaKonfederasyonlar,
        });

    } catch (error) {
        console.log(error)
    }

});


router.use("/", function (req, res) {
    res.render("anasayfa/index")
});

module.exports = router;