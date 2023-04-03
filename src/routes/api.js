const express=require('express')
const Controller = require("../controllers/UsersController")
const AuthverifyMiddleware=require('../middleware/authVerifyMiddleware')

//Router object
const router=express.Router()




//routing
// register router
router.post('/register',Controller.registerController)
//login router
router.post('/login',Controller.loginController)

//profile update
router.put('/profile-update',AuthverifyMiddleware,Controller.profileUpdateController)


module.exports=router;
