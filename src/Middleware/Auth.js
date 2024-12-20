   
   
   const jwt = require("jsonwebtoken");
  const User = require("../models/user");
   
   const  userAuth = async(req,res,next)=>{
    try{
    const cookies = req.cookies;//all cookies that we have while login the user
    const{token} = cookies;
    if(!token){
        throw new Error("invalid token");
        
    }
    const isTokenValid = await jwt.verify(token,"VishalDEv@12345");
    const{_id} = isTokenValid;
     const user = await User.findById(_id);
     if(!user){
throw new Error("user not found")
     }
     req.user =user;
     next();
    }catch(err){
        res.status(400).send(err.message);

    }
    
    };
    module.exports={userAuth};