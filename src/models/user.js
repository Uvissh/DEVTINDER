 const mongoose = require("mongoose");
 const userSchema = mongoose.Schema({

    firstName:{
    type:String
},
lastName:{
    type:String
},
emailId:{
    type:String
},
password:{
    type:Number
    
},
age:{
    type:Number
},
gender:{
    type:String

}

 })
 const User = mongoose.model("User",userSchema);//first is creating the name od model and the second is name of schema
 module.exports = User;