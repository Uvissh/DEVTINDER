const express = require("express");
const authRouter = express.Router();
const  User = require("../models/user");
const bcrypt = require("bcrypt");
const {validateSignupData} = require("../utils/validation");











authRouter.post("/signup",async(req,res)=>{
  

 
    const user = new User(req.body);
   
  
    
  
  try{
   validateSignupData(req);
  
   //make the user
  const{firstName,lastName,password,emailId} = req.body
  
    
  
   
  //  console.log(req.body);
   //by requesting the body we get all the data that has been we dynammilcally write int postmon
  
   const passwordHash = await bcrypt.hash(password,10);
   console.log(passwordHash);
     
  
   const user = new User({
    firstName,
    lastName,
    password:passwordHash,
    emailId,
   })
  
  
  
  
  
  
    await user.save();
    res.send("User Added successfully");
  
   }catch(err){
  
    res.status(400).send(err.message)
  
    
   }
  })

  
authRouter.post("/login",async(req,res)=>{
    try{
    
      //first we have to see the is user exit or not for that we use the emailid
      const{emailId,password}= req.body;
      const user = await User.findOne({emailId:emailId});
     
  
      if(!user){
        throw new Error("email is not valid");
      } 
      const isPasswordValid = await user.validateUser(password);//offload the bcrypt into userSchema
      if(isPasswordValid){
  
     const token = await  user.getJWT();//hidden userid and the secertcode//offload the jwt sign method into the userschema it is the rightway to write code
     console.log(token);
  
  
       res.cookie("token",token);//express give you the cookie//wrap the token inside the cookie
  
        res.send("login successful");
      }
      else{
        throw new  Error("invalid password");
      }
  
      
    }catch(err){
      res.status(400).send(err.message);
    }
  })
  module.exports =authRouter;