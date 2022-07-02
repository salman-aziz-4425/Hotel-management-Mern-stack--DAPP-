const mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    type:{
        type:String,

    },
    price:{
        type:Number,
    },
    source:{
        type:String,
    },

},{
    timestamps:true
})

const Rooms =mongoose.model('rooms',taskSchema)

module.exports=Rooms