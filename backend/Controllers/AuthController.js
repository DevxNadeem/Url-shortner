const bcrypt = require('bcrypt');
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
async function register (req, res) {
    const { name, email, password } = req.body;
    bcrypt.genSalt(10, async function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const user = await User.create({ name, email, password: hash });
            res.status(200).json({ message: `hey ${name} you registered`, user });
        });
    });
} 

 async function login(req, res){
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    bcrypt.compare(password, user.password, function (err, result) {
        if (!result) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(200).json({ message: "Logged in successfully" });
    });
}
 async function logout(req, res) {
     res.clearCookie("token");
     res.status(200).json({ message: "Logged out successfully" });
 }

module.exports = {
    register , 
    login , 
    logout
}
