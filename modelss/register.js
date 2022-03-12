const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const async = require("hbs/lib/async");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");



const employeeschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword: {
        type:String,
        required:true
        
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

// generate tojken
employeeschema.methods.generateAuthotoken = async function () {
    try {
        console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
         console.log(token);
        await this.save();
        return token;
        
    } catch (error) {
       res.send("this error part") 
       console.log(error);
    }
    
}


// convarting hash
employeeschema.pre("save",async function(next) {
    // console.log(this.password);
    this.password = await bcrypt.hash(this.password,10)
    // console.log(this.password);
    // this.confirmpassword=undefined
    next();
    
})

const jenish = new mongoose.model('registationdatabase',employeeschema);
module.exports= jenish;