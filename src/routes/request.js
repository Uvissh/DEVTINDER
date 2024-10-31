const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../Middleware/Auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");


requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
  
    const fromUserId = req.user._id;//it is you who can sending the request
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });

   
    const  allowedStatus =["ignore","interested"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"invalid  status type:"+status});
    }
    const toUser = await User.findById(toUserId);//it only the id which is in the database
    if (!toUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    //check is there is any existing Connecton request
    const existingConnectionRequest = await ConnectionRequestModel.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    
    if(existingConnectionRequest){
      return res.status(400).send({message:"connection request already exist!!"})//if there is existing reqest then sends the existing request messsage
    }
    const data = await connectionRequest.save();//saving to  db;
    // res.json({message: `connection request sent successfully`}
    //   +data)
    res.json({message:req.user.firstName+ " "+"is"+ " "+status+" "+"in"+" "+ toUser.firstName,data});
    // res.send("Message sent successfully");


    }catch(err){
      res.status(400).send(err.message);
    }
    
  
  
  
  })

  requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
      const loggedInUser = req.user; // Validate the user is logged in
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"]; // Allowed statuses
  
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid status"); // Use return to prevent further execution
      }
  
      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
  
      if (!connectionRequest) {
        return res.status(404).json({ message: "Connection request not found" });
      }
  
      connectionRequest.status = status;//update the status
      const data = await connectionRequest.save();
  
      return res.json({ message: `${loggedInUser.firstName},  has been ${status},your request.`, data });
    } catch (err) {
      return res.status(400).send(err.message); // Ensure return to prevent further execution
    }
  });
  

  module.exports=requestRouter;
  
  