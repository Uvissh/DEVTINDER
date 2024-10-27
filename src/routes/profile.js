
const express = require("express");
const profileAuth = express.Router();
const {userAuth} = require("../Middleware/Auth");



profileAuth.get("/profile",userAuth, async(req,res)=>{
    try{
  //   const cookies = req.cookies;//extract all the cookies
  //  console.log(cookies);
  //  const{token} = cookies;//extract the token from the cookie
  //  if(!token){
  //  throw new Error("Invalid token");
  //  }
  
  
  //   const isTokenValid = await jwt.verify(token,"VishalDEv@12345");//verify the token
  //   console.log(isTokenValid);
  //   const{_id}= isTokenValid;
  //   console.log("loggegd in users" +_id);//see the user_id
  //   const user = await User.findById(_id);//find the user by _id 
  const user = req.user;
    if(!user){
      throw new Error("User doesnot exist");
    }
    res.send(user);
   
    }catch(err){
      res.status(400).send("Error",err.message);
      
    }
  
  })
  module.exports = profileAuth;