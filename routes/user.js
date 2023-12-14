const express = require("express");

const router = express.Router();

const path = require("path");
const db = require("../data/db");

router.use("/haklar", async function (req, res) {

    const [tblSosyal] = await db.execute("select * from sosyalsigortalar")
    const [tblCezai] = await db.execute("select * from cezaiyaptirim")

    try {
        res.render("isci-ve-isveren/isci-ve-isveren.ejs", {
            sosyal: tblSosyal[0],
            cezai: tblCezai[0],
        });

    } catch (error) {
        console.log(error)
    }
});
router.use("/sigortasiz", function (req, res) {
    res.render("sigortasiz_isci/sigortasiz-isci.ejs");
});
router.use("/sendikalar", function (req, res) {
    res.render("sendikalar/sendikalar.ejs");
});


router.use("/", function (req, res) {
    res.render("anasayfa/index")
});

module.exports = router;