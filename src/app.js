 const express = require("express");
 const app = express();//new application of express
 app.listen(7777,()=>{
    console.log("server is successfully running in the port");
    
 });
 const{adminAuth} = require("./Middleware/Auth");



app.get("/getUserData",(req,res)=>{
   try{
    throw newError("dhbjsb");
    res.send("user send the data")
   }catch(err){
    res.status(500).send("some error");
   }
})
app.use("/",(err,req,res,next)=>{
  if(err){
    res.status(500).send("something went wrong");
  }
})

  // app.use("/admin",adminAuth);
  
  //  app.get("/admin/getuser",(req,res)=>{
  //   res.send("all data is come")
  //  });
  //  app.get("/admin/delete",(req,res)=>{
  //   res.send("delete the admin");
  //  });
  //how to handle the error by try catch and use trycatch
