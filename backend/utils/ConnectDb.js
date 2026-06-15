const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])
async function ConnectDb(){
   try{
     await mongoose.connect(process.env.MONGO_URL);
     console.log("MongoDB connected successfully");
   }catch(err){
     console.log(err);
   }
    
}

module.exports = ConnectDb;