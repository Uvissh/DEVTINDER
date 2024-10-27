 const express = require("express");
  const connectDB=require("./config/Database") 
 const app = express();//new application of express
 const User = require("./models/user");
 const {validateSignupData} = require("./utils/validation");
 const bcrypt = require("bcrypt");
 const  cookieParser = require("cookie-parser");
 const jwt = require("jsonwebtoken");
 const {userAuth} =require("./Middleware/Auth");



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
app.get("/profile",userAuth, async(req,res)=>{
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
app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
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
 
