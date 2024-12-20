 const mongoose = require("mongoose");
 const validate = require("validator");
 const jwt = require("jsonwebtoken");
 const bcrypt = require("bcrypt");
 const userSchema = mongoose.Schema({

    firstName:{
    type:String,
    required:true,
    minlength:3,
    
},
lastName:{
    type:String
},
emailId:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:"true",
    validate(value){
        if(!validate.isEmail(value)){
            throw new Error("invalid email address"+value);
        }
    }
    
},
password:{
    type:String,
    required:true,
    min:8,
    validate(value){
        if(!validate.isStrongPassword(value)){
            throw new Error("it not a strong address"+value);
        }
    }
    
    
    
},
age:{
    type:Number,
    min:18
},
gender:{
    type:String,
    validate(value){
        if(!["male","female","other"].includes(value)){
            throw new Error("Gender data is not valid")
            

        }
    },

},
photoUrl:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVgPimc_RQYYbUhV3A_xER8GPifFju7nveLA&s",
    validate(value){
        if(!validate.isURL(value)){
            throw new Error("it not a valid Url"+value);
        }
    }
},
about:{
    type:String,
    default:"This is default about users"
},
skills:{
    type:[String],

}

 },
 {
    timestamps: true,
 }
) 



userSchema.methods.getJWT= async function(){

    
    const user = this;
    const token = await jwt.sign({_id:this._id},"VishalDEv@12345",{expiresIn:'1d'});//_id:user.id,"secretId","expiresIN"
    return token;
 
}
userSchema.methods.validateUser= async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;//it the password that was saved in the db;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);//req.bodyPassword,DbPassword
    return isPasswordValid;

}
 const User = mongoose.model("User",userSchema);//first is creating the name od model and the second is name of schema
 module.exports = User;