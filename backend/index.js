require('dotenv').config();
const express = require('express');
const ConnectDb = require("./utils/ConnectDb");
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/AuthRoutes");
const urlRoutes = require("./routes/UrlRoutes");
const cors = require("cors");
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
ConnectDb();


app.use("/", authRoutes);
app.use("/", urlRoutes);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});