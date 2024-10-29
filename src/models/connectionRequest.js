const mongoose = require("mongoose");
 const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
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