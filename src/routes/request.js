const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../Middleware/Auth");


requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    try{
  
    
    const user = req.user;
    if(!user){
      throw new Error("invalid user ");
    }
    res.send(user.firstName +  "sent the connection request");
    }catch(err){
      res.status(400).send(err.message);
    }
    
  
  
  
  })

  module.exports=requestRouter;
  
  