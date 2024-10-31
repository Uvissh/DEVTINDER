 const express = require("express");
 const userRouter = express.Router();
 const {userAuth} = require("../Middleware/Auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const USER_SAFE_DATA ="firstName  lastName  photoUrl age about skills"


 userRouter.get("/user/requests/recieved", userAuth,async(req,res)=>{
     try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            toUserId:loggedInUser._id,
            status:"interested",


        }).populate("fromUserId",USER_SAFE_DATA); //by populate u can add the information of the fromUserId
        
 res.json({message:"Data fetched successfullly",
          data:connectionRequest
 })

     }catch(err){
        res.status(400).send(err.message)
     }
 })

userRouter.get("/user/connection",userAuth,async(req,res)=>{
    try{

        const loggedInUser = req.user;
        if(!loggedInUser){
            throw new Error("not defined");
        }
        const connectionRequest = await ConnectionRequestModel.find({
           $or: [
            {fromUserId:loggedInUser._id,status:"accepted"},//here we take the or condition because user is fromUserId and as  well as to userid so we  think in both case
            {toUserId:loggedInUser._id,status:"accepted"}

            ],
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
        
        console.log(connectionRequest);
        
          

    const data = connectionRequest.map((row)=>{
        if (row.fromUserId && row.toUserId) {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId; // Return toUserId if loggedInUser is fromUserId
            }
            return row.fromUserId; // Otherwise return fromUserId
        }
        return null; // Return null if either is not defined
    }).filter(id => id !== null); // Filter out null values
    
     res.json({message:data});
        

    }catch(err){
        res.send(err.message);
    }
})


 module.exports = userRouter