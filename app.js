require('dotenv').config();


const express = require("express")
const jwt = require("jsonwebtoken")
const path = require("path")
const app = express()
const bcrypt = require("bcrypt");


const hbs = require("hbs")

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const port = process.env.PORT||3000
require("../mernbackend/database/connn1")
const jenish = require("../mernbackend/modelss/register")
const async = require("hbs/lib/async")
// const { json } = require("express/lib/response")
//  const spath = path.join(__dirname,"/public")
//  app.use(express.static(spath));
//  console.log(spath);
const templatepath = path.join(__dirname,"/templates/views")
const partialepath = path.join(__dirname,"/templates/partials")

app.set("view engine","hbs");
app.set("views",templatepath)
hbs.registerPartials(partialepath)

console.log(process.env.SECRET_KEY);

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/index",(req,res)=>{
    res.render("index")
})
app.get("/register",(req,res)=>{
    res.render("register");
})
app.post("/register",async(req,res)=>{
    try {
      const password = req.body.psw
      const cpassword = req.body.pswre
      if (password===cpassword) {
          const registerem= new jenish({

              name:req.body.name,
              email:req.body.email,
              password:password,
              confirmpassword:cpassword
          }) 

        //   console.log(registerem);
           const token = await registerem.generateAuthotoken();
          console.log(token);

           const regi = await registerem.save();
        //   console.log(regi);


          res.status(201).render("index")
        //   console.log(token);

        //   console.log(empdata);
      } else {
          res.send("do not match")
      }
    
  
        
    } catch (error) {
        res.status(400).send(error)
    }

})
app.get("/login",(req,res)=>{
    res.render("login");
})
// login check
app.post("/login",async(req,res)=>{
   try {
       const email = req.body.email
       const passwrd = req.body.password
    //    console.log(password);

      const useremail= await jenish.findOne({email});
      console.log(useremail);
      console.log(useremail.password);
      console.log(passwrd);
    //   const newpass = await bcrypt.compare(passwrd,useremail.password)
    const match = await bcrypt.compare(passwrd,useremail.password);

     const token = await useremail.generateAuthotoken();
     console.log(token);
      
      console.log(match);
    
    if (match) 
    {
        res.status(201).render("welcome");
        
    } 
    else 
    {
        res.send("invalid  details")
    }
       
   } catch (error) {
       res.status(400).send("invalid login details")
   }
})

app.listen(port,()=>{
    console.log("succeful on port 3000");
})