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

























module.exports = router;