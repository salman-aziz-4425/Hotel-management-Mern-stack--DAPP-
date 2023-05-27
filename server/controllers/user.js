const Users=require('../Models/Users')
const mail=require('../utils/mail')
module.exports={
    Login:async (req,res)=>{
        try{
            const user=await Users.findOne({Name:req.query.name,Password:req.query.password}).populate('ownedRooms')
            const token=await user.generateAuthToken()
            if(user.length<1){
                throw Error("In valid information")
            }
            console.log(user)
            res.status(201).send({Type:user.type,Limit:user.limit,_id:user._id,Name:user.Name,Email:user.Email,Token:token,img:user.ImageSource,rooms:user.ownedRooms})
        }catch(e){
            res.status(400).send(e)
        }
    },
    create:async (req,res)=>{
        const User=new Users({
            Name:req.body.Name,
            Email:req.body.Email,
            Password:req.body.Password,
            limit:req.body.limit,
            type:req.body.type,
            ownedRooms:[],
            ImageSource:"http://localhost:3001/uploads/"+req.file.filename
        })
    
        try{
            await User.save()
            console.log('Registered')
            res.status(201)
        }catch(e){
            res.send(e)
            console.log("error")
        }
    },
    getUsers:async(req,res)=>{
        try{
            const user=await Users.findOne({_id:req.query.id})
            res.status(200).send(user)
        }catch{
            res.status(500)
        }
    },
    giveRooms:async(req,res)=>{
        try{
            console.log(req.body)
           const User= await Users.findOne({_id:req.body.userId})
           console.log(User)
           const newstate=User.ownedRooms.concat(req.body.room)
           User.ownedRooms=newstate
           console.log(newstate)
           await mail(User.Email)
           await User.save()
           res.status(200).send()
        }catch{
            res.status(500).send()
        }
    },
    checkeoutRooms:async(req,res)=>{
        try{
            console.log(req.query)
           const User= await Users.findOne({_id:req.query.userId})
           console.log(User)
           const newstate=User.ownedRooms.filter((room)=>{
            return room._id!=req.query.roomId
           })
           User.ownedRooms=newstate
           console.log(newstate)
           await User.save()
            res.status(200).send()
        }catch{
            res.status(500).send()
        }
    }
}