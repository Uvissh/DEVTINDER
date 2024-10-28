 
const validator = require("validator");
 const validateSignupData = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not  valid!");
    }
    else if(firstName.length < 3 || firstName.length > 50){
        throw new Error("FirstName should in betwwen the 3-50");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter the strong password");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Please enter the valid email")
    }
 };
 const validateEditProfileData =(req)=>{
    const allowedEditField =
    ["firstName",
     "lastName",
     "about",
     "gender",
     "skills"
    ];
    const isEditAllowed = Object.keys(req.body).every((field)=>allowedEditField.includes(field));
    return isEditAllowed;
 }
 module.exports={validateSignupData, validateEditProfileData};