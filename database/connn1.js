const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/registation",{
    useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>{
    console.log("succeful connection");
}).catch((e)=>{
    console.log("no  connections");
})