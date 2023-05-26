const Users=require('../Models/Users')
module.exports={
    Login:async (req,res)=>{
        try{
            const user=await Users.findOne({Name:req.query.name,Password:req.query.password}).exec()
            const token=await user.generateAuthToken()
            if(user.length<1){
                throw Error("In valid information")
            }
            res.status(201).send({Type:user.type,Limit:user.limit,_id:user._id,Name:user.Name,Email:user.Email,Token:token,img:user.ImageSource})
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
    }
}