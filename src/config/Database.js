 const mongoose = require("mongoose");
  const connectDB = async()=>{
    await mongoose.connect ("mongodb+srv://bhateriavishal1234:Vishal%4012345@cluster0.avbl4.mongodb.net/devTinder")
  

  };





  module.exports = connectDB;
 




  