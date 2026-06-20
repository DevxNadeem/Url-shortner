const express = require("express");
const isLoggedin = require("../Services/AuthService");
const {shorten ,Urlredirect , DeleteUrl ,geturls}  =require("../Controllers/UrlsController");
const router = express.Router();

router.post('/shorten', isLoggedin, shorten);
router.post("/delete/:id" , isLoggedin , DeleteUrl);
router.get("/urls" , isLoggedin , geturls );
router.get("/:Id", Urlredirect)

module.exports = router;
