const jwt  = require("jsonwebtoken");
function isLoggedin(req, res, next) {
    const token = req.cookies.token;
    if(!token) return res.status(500).json({message : "logged In First !"})
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }

}
module.exports = isLoggedin;