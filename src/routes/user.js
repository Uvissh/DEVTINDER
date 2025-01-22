 const express = require("express");
 const userRouter = express.Router();
 const {userAuth} = require("../Middleware/Auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

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
    
     res.json({message:"connection are",
        data});
        

    }catch(err){
        res.send(err.message);
    }
})


userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;//take the page no from the query
        let  limit = parseInt(req.query.limit) || 10;//take the limit from query
        const skip = (page-1)*limit;//skip the page means if 3 then 2*10=20 skip 20 and start from the 21
        limit > 50? 50:limit;//modified the limit
        
        const connectionRequest = await ConnectionRequestModel.find({

            $or:[
                {
                    fromUserId:loggedInUser._id,

                },
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId   toUserId")
        const hideUserFromFeed = new Set();//the set ds only take the  unique items;
        connectionRequest.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());//add the fromUserId to the  hideUser
            hideUserFromFeed.add(req.toUserId.toString());//add the hideuser to toUserId
        })
      
        console.log(hideUserFromFeed);
        const users = await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUserFromFeed)}},
                {_id:{$ne:loggedInUser._id}}//this is you who is logged who also not see our profile while opening
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)//only select the data which is not in the connection and how to skip and limit the  query
        res.json({ message:"fetching the cards",
            data:users});
    }catch(err){
        res.send(err.message);
    }
})


 module.exports = userRouter