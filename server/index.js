const express=require('express')
require('./db/mongoose')
const roomRouters=require('./routers/Routes')
const cors=require('cors')
const app=express()

//modification in urls



app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(roomRouters)


app.listen(3001,()=>{
   console.log('Server is running')
}) 
