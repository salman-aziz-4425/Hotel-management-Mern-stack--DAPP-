const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
   Name:{
      type:String,
      required:true,
      unique:true,

   },
   Email:{
      type:String,
      require:true
   },
   Password:{
      type:String,
      required:true,
   },
   ImageSource:{
      data:Buffer,
   }
},
{
   timestamps:true
})


userSchema.methods.generateAuthToken=function (){
   const Users=this;
   const token=jwt.sign({_id:Users._id.toString()},'Thisismyapp')
   return token
}

const User=mongoose.model("User",userSchema)

module.exports=User