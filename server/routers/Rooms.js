const express=require('express')
const routers=express.Router()
const multer=require('multer')
const userController=require('../controllers/user')
const roomsController=require('../controllers/rooms')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'/Users/macbook/Desktop/Projects/Hotel-management-Mern-stack-/server/uploads')
    },
    filename:(re,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({storage:storage})
routers.get('/Rooms',roomsController.getRooms)
routers.post('/create',upload.single('UserImage'),userController.create)
routers.get('/Login',userController.Login)
routers.get('/getUser',userController.getUsers)
routers.put('/assignRooms',userController.Login)
module.exports=routers