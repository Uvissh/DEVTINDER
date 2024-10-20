 const express = require("express");
 const app = express();//new application of express
 app.listen(7777,()=>{
    console.log("server is successfully running in the port");
    
 });
app.get("/user",(req,res)=>{
  res.send({firstName:"vishal",
    LastName:"Bhateria"
  })
  console.log(req.query);
})
app.get("/a/",(req,res)=>{
  res.send("this is the regex");
})

app.post("/user",(req,res)=>{
  res.send("succesfully  save  the data");
})
app.get("/user1",(req,res)=>{
  res.send("the data");
})
app.get("/user/:userId/:password/:age",(req,res)=>{
  res.send("this is the dynamic data");
  console.log(req.query);
  
  

})
app.get("/ab?c",(req,res)=>{
  res.send("this the  complex1")
})
app.get("/ab+c",(req,res)=>{
  res.send("this the  complex2")
})
app.get("/ab*c",(req,res)=>{
  res.send("this the  complex3 we add in between")
})
app.get("/*fly$",(req,res)=>{
  res.send("starts from everything but end with fly ");
})
app.get("/a(bd)?h",(req,res)=>{
  res.send("this the  optional")
})
  // app.use("/learn",(req,res)=>{
  //   res.send("iam learning the nodejs from akhasy saini")

  // })
  //place the wild card routing in  the end
  // app.use("/",(req,res)=>{
  //   res.send("hello iam vishal");

  // });
