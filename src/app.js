 const express = require("express");
  const connectDB=require("./config/Database") 
 const app = express();//new application of express
 const User = require("./models/user");
 const {validateSignupData} = require("./utils/validation");
 const bcrypt = require("bcrypt");
 const  cookieParser = require("cookie-parser");
 const jwt = require("jsonwebtoken");


 app.use(express.json());  //we use middleware to convert json into js object
 app.use(cookieParser());//we use middleware  to read the token
 app.post("/signup",async(req,res)=>{
  

 
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

app.post("/login",async(req,res)=>{
  try{
  
    //first we have to see the is user exit or not for that we use the emailid
    const{emailId,password}= req.body;
    const user = await User.findOne({emailId:emailId});
   

    if(!user){
      throw new Error("email is not valid");
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(isPasswordValid){

   const token = await  jwt.sign({_id:user._id},"VishalDEv@12345");
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
app.get("/profile",async(req,res)=>{
  try{
  const cookies = req.cookies;//extract all the cookies
 console.log(cookies);
 const{token} = cookies;//extract the token from the cookie
 if(!token){
 throw new Error("Invalid token");
 }


  const isTokenValid = await jwt.verify(token,"VishalDEv@12345");//verify the token
  console.log(isTokenValid);
  const{_id}= isTokenValid;
  console.log("loggeg in users" +_id);
  const user = await User.findById(_id);
  if(!user){
    throw new Error("User doesnot exist");
  }
  res.send(user);
 
  }catch(err){
    res.status(400).send("Error",err.message);
    
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

    // const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    // const isUpdateAllowed = Object.keys(data).every((k) =>
    //   ALLOWED_UPDATES.includes(k)
    // );
    // if (!isUpdateAllowed) {
    //   throw new Error("Update not allowed");
    // }

     
    // // }
   
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
 
