const express = require("express");
const isLoggedin = require("../Services/AuthService");
const {shorten ,Urlredirect , DeleteUrl}  =require("../Controllers/UrlsController");
const router = express.Router();

router.post('/shorten', isLoggedin, shorten);
router.post("/delete/:id" , isLoggedin , DeleteUrl);
router.get("/:Id", Urlredirect)

module.exports = router;
