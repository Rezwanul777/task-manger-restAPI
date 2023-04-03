const mongoose=require('mongoose');

const DataSchema=mongoose.Schema({
   email:{type:String,unique:true},
   firstName:{type:String},
   lastName:{type:String},
   password:{type:String},
   mobile:{type:String},
   photo:{type:String},
   createdAt:{type:Date,default:new Date()},
},{versionKey:false})

const UserModel=mongoose.model('users',DataSchema)

module.exports=UserModel;