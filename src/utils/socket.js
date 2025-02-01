

 const socket = require("socket.io");
 const crypto = require("crypto");
 const {Chat} = require("../models/chat");
const ConnectionRequestModel = require("../models/connectionRequest");

const  intializeSocket =(server)=>{
    const io = socket(server,{

        cors:{
            origin: 'http://localhost:5173',
        },
    });

    const getSecretRoomId =(userId,targetUserId)=>{
        return crypto
        .createHash("sha256")
        .update([userId,targetUserId].sort().join("_"))
        .digest("hex");
    };
    //socket configuration
    io.on("connection",(socket)=>{

        socket.on("joinchat",({firstName,userId,targetUserId})=>{

    //create a room id
    const roomId =getSecretRoomId(userId,targetUserId);
    console.log( firstName+"joined"+roomId);
    socket.join(roomId);
})
//sending the message
socket.on("sendMessage",async({firstName,userId,targetUserId,text})=>{
    try{
    const roomId =getSecretRoomId(userId,targetUserId);
    console.log(firstName + " "+text );
    //check if the userId and tergetUseriD are friends




    //save messages to the database
  
      let chat = await  Chat.findOne({
  
          participants:{$all:[userId,targetUserId]},
      });
      if(!chat){
          chat = new Chat({
              participants:[userId,targetUserId],
              messages:[],//start the new message
          });
      }
      //pushing the chat into the database
      chat.messages.push({
          senderId:userId,
          text,
      });
      await chat.save();
    io.to(roomId).emit("messageRecieved",{firstName,text});
  }catch(err){
      console.log(err);
  }

  });
  socket.on("disconnect",()=>{
            
  })

});

    



  

         
         
            

      
        

     
     



 }
 module.exports = intializeSocket;