    const  adminAuth = (req,res,next)=>{
        console.log("only admin can authenticate this");
        const token = "xyz";
        const isAuthroized = token==="xyz";
        if(!isAuthroized){
            res.status(401).send("unauthorrized");
        }
        else{
            next();
        }
    };
    module.exports={adminAuth};