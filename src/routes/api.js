const express=require('express')
const Controller = require("../controllers/UsersController")
const TaskController=require("../controllers/TasksController")
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

//create task
router.post('/create-task',AuthverifyMiddleware,TaskController.createTaskController)

// delete task
router.delete('/delete-task/:id',AuthverifyMiddleware,TaskController.deleteTaskController)

// update task by status
router.put('/update-task/:id/:status',AuthverifyMiddleware,TaskController.updateTaskController)

// list task by status
router.get('/task-status/:status',AuthverifyMiddleware,TaskController.listTaskByStatus)

module.exports=router;
