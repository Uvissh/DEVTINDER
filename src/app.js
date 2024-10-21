 const express = require("express");
 const app = express();//new application of express
 app.listen(7777,()=>{
    console.log("server is successfully running in the port");
    
 });
 const{adminAuth} = require("./Middleware/Auth");




  // app.use("/admin",(req,res,next)=>{
  //   console.log("admin auth is getting check");
  //   const token = "xyz";
  //   const auth = token==="xyz";
  //   if(!auth){
  //   res.status(401).send("unautherzied");
    
      
  //   }
  //   else{
  //     next();
  //   }
    
  // })
  app.use("/admin",adminAuth);
  
   app.get("/admin/getuser",(req,res)=>{
    res.send("all data is come")
   });
   app.get("/admin/delete",(req,res)=>{
    res.send("delete the admin");
   });