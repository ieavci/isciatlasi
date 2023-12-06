const express=require("express");

const router=express.Router();

const path=require("path");

router.use("/haklar", function(req,res){
    res.render("isci-ve-isveren/isci-ve-isveren.ejs");
});

router.use("/", function(req,res){
    res.render("anasayfa/index")
});

module.exports=router;