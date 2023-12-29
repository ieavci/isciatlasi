const express = require("express");

const router = express.Router();

const path = require("path");
const db = require("../data/db");

router.use("/haklar", async function (req, res) {

    const [tblSosyal] = await db.execute("select * from sosyalsigortalar")
    const [tblCezai] = await db.execute("select * from cezaiyaptirim")
    const [tblIsverenhaklari] = await db.execute("SELECT m.*, k.kanunbasligi FROM isverenkanunlarimaddeleri m JOIN isverenkanunlari k ON m.kanun_id = k.kanun_id ")
    const [tblIscihaklari] = await db.execute("select * from iscikanunlari")
    const [tblIscihaklariMaddeleri] = await db.execute("SELECT m.*, k.kanunbasligi FROM iscikanunlarimaddeleri m JOIN iscikanunlari k ON m.kanun_id = k.kanun_id where m.kanun_id=1 ")
    console.log(tblIscihaklariMaddeleri)

    try {
        res.render("isci-ve-isveren/isci-ve-isveren.ejs", {
            sosyal: tblSosyal[0],
            cezai: tblCezai[0],
            isveren: tblIsverenhaklari,
            isci: tblIscihaklari,
            isciKanunlari: tblIscihaklariMaddeleri,
        });

    } catch (error) {
        console.log(error)
    }
});
router.use("/sigortasiz", async function (req, res) {
    const [tblIller] = await db.execute("select * from iller order by sehiradi")

    try {
        res.render("sigortasiz_isci/sigortasiz-isci.ejs", {
            iller: tblIller,
        });

    } catch (error) {
        console.log(error)
    }

});
router.use("/sendikalar", async function (req, res) {
    const [tblDisk] = await db.execute("select * from `isciatlasi`.`disk sendika`");
    const [tblSendikaKonfederasyonlar] = await db.execute("select * from `isciatlasi`.`sendikakonfederasyonlar`");
    try {
        res.render("sendikalar/sendikalar.ejs", {
            disk: tblDisk,
            sendikaKonfederasyonlar: tblSendikaKonfederasyonlar,
        });

    } catch (error) {
        console.log(error)
    }

});
router.use("/haberler/:id", async function (req, res) {
    const id = req.params.id;


    try {
        const [haber,] = await db.query("select * from haberler where id=?", [id])     
        
        if (haber[0]) {
            res.render("haberler/haber-detail", {
               
                haber: haber[0]
            });
        } else {
            res.redirect("/")
        }


    } catch (error) {
        console.log(error)
    }

   
});

router.get("/haberler", async function (req, res) {
const [haberler]=await db.execute("select* from haberler")
    try {
       
        res.render("haberler/haberler.ejs", {
            haberler: haberler
        });
    } catch (error) {
        console.log(error)
    }

});






router.use("/", async function (req, res) {
    const [sgietoplamyuz] = await db.execute("select * from sgietopyuz where Yillar=2013");
    const [haberler]=await db.execute("SELECT * FROM haberler ORDER BY id DESC LIMIT 3")
   
    try {
        res.render("anasayfa/index", {
            sgietoplamyuz: sgietoplamyuz,
            haberler:haberler
        })
        module.exports = { sgietoplamyuz };

    } catch (error) {
        console.log(error)
    }

});

module.exports = router;
