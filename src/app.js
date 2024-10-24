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
  res.status(400).status(err.message)

  
 }
})
 app.get("/feed",async(req,res)=>{
  try{
    
    const user = await User.find({});
    res.send(user);

  }catch(err){
    console.log("Something went wrong",err.message);
    
  }
 })
 app.get("/user",async(req,res)=>{
  try{
    const userEmail = req.body.emailId;
    const user = await User.findOne({emailId:userEmail});
    res.send(user);


  }catch(err){
    console.log("something went wrong",err.message);
    res.status(400).status(err.message)
    
  }
  
 })


 app.delete("/user",async(req,res)=>{
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    //and also cosnt user = awiat .findByIdAndDelete({_id:userId})

    res.send("User is delete successfully");
  }catch(err){
    res.status(400).send("something went wrong")
  }
 })

 
 app.patch("/user/:userId",async(req,res)=>{
  const userId = req.params?.userId;
  const data = req.body;

  try{

    // const Allowed_Updates =["photoUrl","skills","about","password"];
    // const isUpdatedAllowed = Object.keys(data).every((k)=>Allowed_Updates.includes(k));
    // if(!isUpdatedAllowed){
    //   throw new Error("update not allowed");

     
    // }
   
    if(data?.skills.length > 10){

      throw new Error("skills not more than 10");
    }
    const user = await User.findByIdAndUpdate({_id:userId},data,{
      returnDocument:"after",
      runValidators:"true",
      


    });
 
    res.send("user update succesfully");

  }catch(err){
    res.status(400).send(err.message);
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
 
