const Rooms=require('../Models/Rooms')
var pagesPerCount=6
module.exports={
    getRooms:async (req,res)=>{
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
    },
    getData:async (req,res)=>{

    }
}