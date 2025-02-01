 const express = require("express");
  const connectDB=require("./config/Database") 
 const app = express();
 const  cookieParser = require("cookie-parser");
 const cors = require("cors");
 const http = require("http");
 require('dotenv').config();


 

 //new application of express
//  const User = require("./models/user");
//  const {validateSignupData} = require("./utils/validation");
//  const bcrypt = require("bcrypt");

//  const jwt = require("jsonwebtoken");
//  const {userAuth} =require("./Middleware/Auth");




 app.use(express.json());  //we use middleware to convert json into js object
 app.use(cookieParser());//we use middleware  to read the token
 

 app.use(cors({
  origin: 'http://localhost:5173',
   // Update to match your frontend URL
  
  
 
  credentials: true,
}));

 const authRouter = require("./routes/auth");
 const profileAuth = require("./routes/profile");
 const requestRouter = require("./routes/request");
 const userRouter = require("./routes/user");
 const intializeSocket = require("./utils/socket");
 const  chatRouter = require("./routes/chat");

 app.use("/",authRouter);
 app.use("/",profileAuth);
 app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",chatRouter);





const server = http.createServer(app);
intializeSocket(server);












   



 
 

 connectDB()
 .then(()=>{
  console.log("Database  connection established")
  server.listen(process.env.Port,()=>{
    console.log("server is successfully running in the port");
    
 });
  
 }).catch((err)=>{
  console.error("Database cannot be connected!!",err.message);
  
 })
// first establised the database and then  running the api into the port
 
