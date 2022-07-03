const express=require('express')
const Rooms=require('../Models/Rooms')
const Users=require('../Models/Users')
const jwt=require('jsonwebtoken')
const fs=require('fs')
const app=express()
const routers=express.Router()
const multer=require('multer')

routers.post('/Rooms',async (req,res)=>{
    const task=new Rooms({
        ...req.body,
    })
    try{
        await task.save()
        console.log(task)
        res.status(201).send(task)
    }catch(e)
    {
        res.send(e)
    }
})
var pagesPerCount=6
routers.get('/Rooms',async (req,res)=>{
    const typeFlag=req.query.typeFlag

    try{
        if(typeFlag=='True'){
            var count=await Rooms.estimatedDocumentCount()
            var room=await Rooms.find({price:{$lte:parseInt(req.query.Price)}}).limit(pagesPerCount).skip(((req.query.Page-1)*pagesPerCount))
            room.sort((a,b)=>a.price-b.price);
        }
        else{
            var room=await Rooms.find({type:req.query.type}).limit(pagesPerCount).skip(((req.query.Page-1)*pagesPerCount))
        }
        if((count/pagesPerCount)%2==0){
            res.status(201).send({
                room,
                pagesCount:parseInt(count/pagesPerCount),
               })
        }
        else{
            res.status(201).send({
                room,
                pagesCount:parseInt(count/pagesPerCount)+1
               })
        }
    }catch(e)
    {
        res.send(e)
    }
})

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'/Users/applea1989/Desktop/Salman/Project/server/Mongodb/routers/uploads')
    },
    filename:(re,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({storage:storage})

routers.post('/create',upload.single('UserImage'),async (req,res)=>{
    // const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    const User=new Users({
        Name:req.body.Name,
        Email:req.body.Email,
        Password:req.body.Password,
        ImageSource:{
            data:fs.readFileSync("/Users/applea1989/Desktop/Salman/Project/server/Mongodb/routers/uploads/"+req.file.filename)
        }
    })

    try{
        await User.save()
        console.log('Registered')
        res.status(201)
    }catch(e){
        res.send(e)
        console.log("error")
    }
})
//singleData.img.data.data
routers.get('/Login',async (req,res)=>{
    try{
        const user=await Users.findOne({Name:req.query.name,Password:req.query.password}).exec()
        const token=await user.generateAuthToken()
        if(user.length<1){
            throw Error("In valid information")
        }
        res.status(201).send({Name:user.Name,Email:user.Email,Token:token,img:user.ImageSource})
    }catch(e){
        res.status(400).send(e)
    }
})

routers.patch('./updatePassword',(req,res)=>{})

module.exports=routers