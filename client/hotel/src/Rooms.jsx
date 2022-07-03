 
 import Navbar from './Navbar'
 import Card from './Card'
import Axios from 'axios';
import { useState,useEffect } from 'react'
import {Provider} from 'react-redux' 
import {store} from './app/store'
import './Card.css'
 function Rooms(){
const [state, setstate] = useState(0);
const [type,settype]=useState("");
const [Price, setPrice] = useState(0);
const [Rooms,setRoom]=useState([
])
const [typeFlag,settypeFlag]=useState("")
const [Pages,setpagesCount]=useState(1)
const [boolean,setBooleam]=useState(false);
const [pageCount,setpageCount]=useState(0)
useEffect(() => {
    Getdata()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[type, Price,Pages])
const Getdata = () => {
  var Url=''
  if(typeFlag=='True'){
      Url=`http://localhost:3000/Rooms?Price=${Price}&typeFlag=True&Page=${Pages}`
  }
  else{
    Url=`http://localhost:3000/Rooms?type=${type}&typeFlag=FalsePage=${Pages}`
  }
Axios.get(Url).then((result) => {
  setRoom(result)
  setpageCount(result.data.pagesCount)
  if(result.data.room.length>0){
    setBooleam(true)
  }
}).catch(()=>{
});
};
const inputHandler=(event)=>{
setPrice(event.target.value)
setstate(event.target.value)
settypeFlag("True")

}
const typeHandler=(event)=>{
  settype(event.target.value)
  settypeFlag("False")

}
const nextPageHandler=()=>{
  setpagesCount(Pages+1)
}
const previousPageHandler=()=>{
  if(Pages==1){return Pages}
  setpagesCount(Pages-1)
}
    return(
<>
<Provider store={store}>
    <Navbar />
    </Provider>
<h2 style={{marginTop:"20px",marginLeft:"500px"}}>Search Rooms</h2>
<b><hr size="5" width="100px" style={{marginTop:"20px",marginLeft:"550px",color:"#654321"}}></hr></b>
<div className="row" style={{width:"1200px"}}>
  <div className="col" style={{marginLeft:"300px"}}>
  <label className="form-check-label">
  <label for="sel1">Room types:</label>
  <select className="form-control" id="sel1" onChange={typeHandler}>
      <option ></option>
    <option>Economic</option>
    <option >Buissness</option>
    <option >Delux</option>
  </select>
  </label>
  </div>
  <div className="col" style={{marginLeft:"70px"}}>
  <p>Price Range:${state}</p>
  <input type="range" className="form-range" min="0" max="600"  onChange={inputHandler} style={{width:"100px",marginTop:"-10px",marginleft:"600px"}}></input>
</div>
</div>
{boolean===true?<div>
  <div className="container-fluid">
  {
Rooms.data.room.map((object)=>{
  return(
    <Provider store={store}>
 <Card id={object._id} type={object.type} Price={object.price} source={object.source}/>
    </Provider>
  )
  
})
}
</div>
<footer style={{"padding":"30px",display:"flex",justifyContent:"space-evenly"}}>
<button disabled={Pages===1}  onClick={previousPageHandler}>Previous</button>
<button disabled={Pages===pageCount}  onClick={nextPageHandler}>Next</button>
</footer>
    </div>:<p></p>
 }
</>
)
 }

export default Rooms;