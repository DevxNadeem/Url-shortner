const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    
    LongUrl : {
        type : String , 
        required : true
    },
    ShortUrl : {
        type : String , 
        required : true
    } , 
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" , 
        required : true
    }

}, {timestamps : true});

const UrlModel = mongoose.model("Url" , urlSchema);
module.exports = UrlModel;