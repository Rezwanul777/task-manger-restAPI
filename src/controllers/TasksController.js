const TaskModel = require("../models/TaskModel");

// create task
exports.createTaskController=(req,res)=>{
   let reqBody=req.body;
    reqBody.email=req.headers['email']

   TaskModel.create(reqBody,(error,data)=>{
      if(error){
         res.status(400).json({status:"fail",data:error});
      }else{
         res.status(200).json({status:"success",data:data});
      }
   })
}

// delete task

exports.deleteTaskController=(req,res)=>{
   let id=req.params.id
   let Query={_id:id};

   TaskModel.remove(Query,(error,data)=>{
      if(error){
         res.status(400).json({status:"fail",data:error});
      }else{
         res.status(200).json({status:"success",data:data});
      }
   })
}

//update task by status

exports.updateTaskController=(req,res)=>{
   let id=req.params.id;
   
   let Query={_id:id};
   let status=req.params.status
   let reqBody={status:status};

   TaskModel.updateOne(Query,reqBody,(error,data)=>{
      if(error){
         res.status(400).json({status:"fail",data:error});
      }else{
         res.status(200).json({status:"success",data:data});
      }
   })
}

//list task by status 

exports.listTaskByStatus=(req,res)=>{
   let status= req.params.status;
   let email=req.headers['email'];
   TaskModel.aggregate([
       {$match:{status:status,email:email}},
       {$project:{
               _id:1,title:1,description:1, status:1,
               createdDate:{
                   $dateToString:{
                       date:"$createdDate",
                       format:"%d-%m-%Y"
                   }
               }
           }}
   ], (err,data)=>{
       if(err){
           res.status(400).json({status:"fail",data:err})
       }
       else{
           res.status(200).json({status:"success",data:data})
       }
   })
}