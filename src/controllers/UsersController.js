const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

// registration 

exports.registerController=(req,res)=>{
   let reqBody = req.body;
   UserModel.create(reqBody,(error,data)=>{
      if(error){
         res.status(404).json({status:"registration failed",data:error});
      }else{
         res.status(200).json({status:"registration success",data:data});
      }
   })
}  

// login controller
exports.loginController=(req,res)=>{
   let reqBody = req.body;
   UserModel.aggregate([
      { $match:  reqBody },
      { $project: { _id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1 } }
   ],(error,data)=>{
      if(error){
         res.status(404).json({status:"login failed",data:error});
      }else{
        if(data.length > 0){
         let Payload={ expiresIn: "7d",data:data[0]['email'] }
         let token = jwt.sign(Payload, 'SecretKey123456789')
         res.status(200).json({status:"login success",data:data[0],token:token});
      }else{
         res.status(401).json({status:"unauthorized"})
      }
   }
   })
}

// profile-update controller

exports.profileUpdateController=(req,res)=>{
   let reqBody = req.body;
   let email=req.headers['email']
   UserModel.updateOne({ email: email},reqBody,(error,data)=>{
      if(error){
         res.status(404).json({status:"profile update failed",data:error});
      }else{
         res.status(200).json({status:"profile update success",data:data});
      }
      })
} 
