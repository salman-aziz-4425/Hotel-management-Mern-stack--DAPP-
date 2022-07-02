const express=require('express')
require('../Mongodb/src/db/mongoose')
const roomRouters=require('./routers/Rooms')
const cors=require('cors')
const app=express()

//modification in urls



app.use(cors())
app.use(express.json())
app.use(roomRouters)


app.listen(3000,()=>{
   console.log('Server is running')
}) 
