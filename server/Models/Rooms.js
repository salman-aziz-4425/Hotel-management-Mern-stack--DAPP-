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
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

},{
    timestamps:true
})

const Rooms =mongoose.model('rooms',taskSchema)

module.exports=Rooms