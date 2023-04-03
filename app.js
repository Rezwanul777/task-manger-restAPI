const express=require('express')
const router=require('./src/routes/api')
const bodyParser =require('body-parser');

// Database Lib Import
const mongoose =require('mongoose');


// app implementation
const app=express()

//Security Middleware imports

const helmet=require('helmet')
//const xss=require('xss-clean')
const rateLimit=require('express-rate-limit')
const mongoSanitize =require('express-mongo-sanitize');
const hpp=require('hpp')
const cors=require('cors')

// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
//app.use(xss())
app.use(hpp())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}))


// Database Connection
let URI="mongodb://127.0.0.1:27017/TaskManager"
let OPTIONS={autoIndex:true}
mongoose.set('strictQuery', false);
mongoose.connect(URI, OPTIONS,(error)=>{
  
    console.log("Database Connected")
    console.log(error);
})

//routing implement
app.use('/api/v1',router)

// Undefined Route Implement
app.use("*",(req,res)=>{
   res.status(404).json({status:"fail",data:"Not Found"})
})

module.exports=app






