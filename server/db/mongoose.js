const mongoose=require('mongoose');


module.exports=mongoose.connect('mongodb+srv://Salman:salman999@cluster0.1tlao.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("Connnected")
}).catch(()=>{
    console.log("Errors")
})