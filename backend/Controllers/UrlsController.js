const Url = require("../Models/UrlModel");
const generateShortUrl = require("../Services/generateShortUrl");
async function shorten(req, res) {
    const { longUrl } = req.body;
    const shortCode = generateShortUrl();
    await Url.create({
        LongUrl: longUrl,
        ShortUrl: shortCode,
        userId: req.user._id
    });
    res.status(200).json({ shortUrl: `http://localhost:3000/${shortCode}`, longUrl });
};

async function Urlredirect(req, res) {
    const { Id } = req.params;
    const record = await Url.findOne({ ShortUrl: Id });
    if (!record) return res.status(404).json({ error: "URL not found" });
    res.redirect(301, record.LongUrl);
};
async function DeleteUrl(req, res) {
    try {
        console.log(req.user);
        
        const { Id } = req.params;
        const record = await Url.findOneAndDelete({ shortUrl: Id });
        if (!record) return res.status(404).json({ error: "URL not found" });
        res.status(200).json({ message: `thisUrl is now ` });
    } catch (error) {
      console.log("error"  ,error);
    }
};
async function geturls(req ,res) {
    try{
      const urls = await findone({userId : req.user._id }).sort({ createdAt: -1 });
       res.status(200).json(urls);
    }catch(e){
        console.log("error" ,e);
    }
    
} ;

module.exports = {
    shorten,
    Urlredirect,
    DeleteUrl , 
    geturls
}
