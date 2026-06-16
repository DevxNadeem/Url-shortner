const bcrypt = require('bcrypt');
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");


async function register(req, res) {
    const { name, email, password } = req.body;
    try {
        bcrypt.genSalt(10, async function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const user = await User.create({ name, email, password: hash });
                res.status(200).json({ message: `hey ${name} you registered`, user });
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server problem", error });
    }

}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        bcrypt.compare(password, user.password, function (err, result) {
            if (!result) return res.status(400).json({ message: "Invalid credentials" });
            const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET);
            res.cookie("token", token);
            res.status(200).json({ message: "Logged in successfully" });
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server problem", error });
    }

}
async function logout(req, res) {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server problem", error });
    }
}

module.exports = {
    register,
    login,
    logout
}
