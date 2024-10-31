const mongoose = require("mongoose");
 const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",//make the connection  with User
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignore","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`


        }

    }
  
 },

 {
    timestamps:true,
 })

 connectionRequestSchema.index({fromUserId:1,
    toUserId:1
 });//compound indexing

 connectionRequestSchema.pre("save",function(next){//it is called just before the save//it is a  middleware

    const connectionRequest = this;
    //check that the touserId and fromuserid are same throw the error
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send the request to yourself")
    }
    next();
        
 });
 const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel",connectionRequestSchema);
 module.exports= ConnectionRequestModel;