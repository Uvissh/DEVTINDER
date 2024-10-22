 const express = require("express");
  const connectDB=require("./config/Database") 
 const app = express();//new application of express
 const User = require("./models/user");


 app.use(express.json());  //we use middleware to convert json into js object
 app.post("/signup",async(req,res)=>{
 



  



 //make the user
 const user = new User(req.body);
//  console.log(req.body);
 //by requesting the body we get all the data that has been we dynammilcally write int postmon
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
 
