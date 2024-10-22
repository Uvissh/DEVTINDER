 const express = require("express");
  const connectDB=require("./config/Database") 
 const app = express();//new application of express
 const User = require("./models/user");



 app.post("/signup",async(req,res)=>{
 const  userObj = ({
  firstName:"vishal",
  lastName:"Bhateria",
  emailId:"vishalbhateria124@gmail.com",
  password:12334,
  age:19,
  gender:"male"

 })

 //make the user
 const user = new User(userObj);//herre we made the new instance of the class or new object
 try{
  await user.save();
  res.send("User Added successfully");

 }catch(err){
  console.log("their is error in the user ",err.message);

  
 }
})

 


 connectDB()
 .then(()=>{
  console.log("Database  connection established")
  app.listen(7777,()=>{
    console.log("server is successfully running in the port");
    
 });
  
 }).catch((err)=>{
  console.error("Database cannot be connected!!",err.message);
  
 })
// first establised the database and then  running the api into the port
 
