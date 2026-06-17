require('dotenv').config();
const express = require('express');
const ConnectDb = require("./utils/ConnectDb");
const isLoggedin = require("./Services/AuthService");
const {register , login , logout} = require("./Controllers/AuthController");
const {shorten , Urlredirect , DeleteUrl}  =require("./Controllers/UrlsController")
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
ConnectDb();


app.post('/register', register );
app.post('/login', login);
app.get("/logout", logout);
app.post('/shorten', isLoggedin, shorten);
app.post("/delete/:id" , isLoggedin , DeleteUrl);
app.get("/:Id", Urlredirect);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});