import "./x.css";
import Navbar from "./Navbar";
import { useState,useEffect} from "react";
import Modals from "./Components/model";
import { useSelector,useDispatch } from "react-redux";
import  {updateRoom} from './features/roomSlice/roomSlice'
import { createPayment,getPermissions,checkoutRooms,approvePayment } from "./utils/smartContract";
import Modal from "react-modal";
import axios from "axios";
function Account() {
  const [modalISOpen, setModalISOpen] = useState(false);
  const userId = useSelector((state) => state.Hotel.User.User._id);
  const Name = useSelector((state) => state.Hotel.User.User.Name);
  const Email = useSelector((state) => state.Hotel.User.User.Email);
  const img= useSelector((state) => state.Hotel.User.User.img);
  const Type= useSelector((state) => state.Hotel.User.User.type);
  const [done,setDone]=useState(false)
const RoomsInfo = useSelector((state) => state.Hotel.Room.Room);
const [modalISOpen2, setModalISOpen2] = useState(false);
  const [bookedrooms,setbookedrooms]=useState([])
  const [final,setFinal]=useState([])
  let res=[]
   let bookedId=[]
     RoomsInfo.forEach(el => {
      const index = res.findIndex(obj => {
         return obj['id'] === el.id;
      });
      if(index === -1){
         res.push({
            "id": el.id,
            "type":el.type,
            "source":el.source,
            "price":el.price,
            "count": 1
         })
      }
      else{
         res[index]["count"]++;
      };
   });
   RoomsInfo.forEach(el => {
    const index = bookedId.findIndex(obj => {
       return obj['id'] === el.id;
    });
    if(index === -1){
      bookedId.push({
          "id": el.id,
       })
    }
    else{
      bookedId[index]["count"]++;
    };
 });
  let TotalPrice=0
  res.map((room)=>{
    TotalPrice+=room.price
  })
  const dispatch=useDispatch()
  useEffect(async()=>{
    if(Type=="Manager"){
       const allDetails=[]
       const array=await getPermissions()
       console.log(array)
       Promise.all(
        await array.map(async(user)=>{
          if(user.status==false){
            const users=await axios.get("http://localhost:3001/getUser?id="+user.onwerID)
            console.log(users)
            allDetails.push({
              reciptID:user.reciptID.toNumber(),
              Email:users.data.Email,
              TotalPayment:user.payment.toNumber(),
              rooms:user.roomsID
            })
          }
         })
       ).then(()=>{
        console.log(allDetails)
        setFinal(allDetails)
       })
      
    }
  },[])
  useEffect(async()=>{
    if(final.length>0){
      setbookedrooms(final)
      setDone(true);
    }
   },[final])
  useEffect(()=>{
    console.log("hello2")
    console.log(final)
console.log(bookedrooms)
  },[done])
  useEffect(() => {

  }, [RoomsInfo])
  const headingStyle = {
    backgroundImage: "linear-gradient(to right, gray, red)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textFillColor: "transparent",
    fontWeight: "extrabold",
  };
const DeleteRoomHandler=(id)=>{
dispatch(updateRoom(RoomsInfo.filter((object)=>{
  return object.id!==id
})))
}
const insertOnwers=async(event)=>{
  event.preventDefault()
  const flattenedArray = bookedId.reduce((result, obj) => {
    return [...result, obj.id];
  }, []);

  try{
     if(await createPayment(userId,TotalPrice,flattenedArray)){
       alert("Payment Request done")
     }
     else{
      alert("Payment already pending or rooms are booked")
     }
  }catch{
    alert("Transaction error")
  }
 
}
const approveRequest=async(ID,perindex)=>{
  if(await approvePayment(perindex)){
    alert("Permission Accepted")
    setFinal(final.filter((index)=>{
      return index!=perindex
    }))
    
  }
  else{
    alert("Accepted by one person other one remaining")
  }
}
const rejectRequest=async(object,perindex)=>{
  if(await checkoutRooms(object.reciptID,object.rooms)){
    alert("Permission Rejected")
    setFinal(final.filter((index)=>{
      return index!=perindex
    }))
    
  }
  else{
    alert("Something went wrong")
  }
}
  return (
    <>
      <Navbar />
      <form class="Block">
         <h3 style={headingStyle}>Your Information</h3>
         <br></br>
         <img
          style={{ height: "300px", width: "300px",objectFit:'cover' }}
          src={img}
          alt="Avatar"
       />
        <br></br>
        <div className="lab" style={{ marginTop: "30px" }}>

          <b>
            <label>Username</label>
          </b>
          <br></br>
          <label>{Name}</label>
          <br></br>
          <b>
            <label>Email</label>
          </b>
          <br></br>
        </div>
        <label>{Email}</label>
        <br></br>
        <button
          class="btn-dark"
          onClick={(event) => {
            event.preventDefault();
            setModalISOpen(true);
          }}
        >
          My Orders
        </button>
        {
          (Type==="Manager"||Type==="ThirdParty")&&<button
          class="btn-dark"
          onClick={(event) => {
            event.preventDefault()
            setModalISOpen2(true)
          }}
        >
        Permissions
        </button>
        }
       
      </form>
      <Modals modalISOpen={modalISOpen} setModalISOpen={setModalISOpen} res={res} DeleteRoomHandler={DeleteRoomHandler} insertOnwers={insertOnwers} sum={TotalPrice}/>
      <Modal
    class="modal"
    isOpen={modalISOpen2}
    style={{
      overlay: {
        top:100,
        position: "fixed",
        left: "28%",
        backgroundColor: "transparent",
        width: "700px",
        outline: "no",
        height: "500px",
        transform:"scale(1)",
        transition:"transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946)",
        opacity:"0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946)",

      },
      content: {
        position: "absolute",
      }
    }}
  >
    <h1>Permissions</h1>
    <ul class="list-group">

      {final?.map((object,index) => {
        return (
          
          <li
            class="list-group-item "
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <p>{object.Email}</p>
            <p>${object.TotalPayment}</p>
            <button style={{height:"50px",borderRadius:"20px"}} onClick={(e)=>approveRequest(object.reciptID,index)}>Accept</button>
            <button style={{height:"50px",borderRadius:"20px"}} onClick={(e)=>rejectRequest(object,index)}>Reject</button>
          </li>
      
        );
      })}
    </ul>
    <div style={{display:"flex",justifyContent:"space-between"}}>
    <button
      className="closing"
      style={{ marginTop: "20px" ,borderRadius:"20px" }}
      onClick={() =>setModalISOpen2(false)}
    >
      Close
    </button>
    </div>
  </Modal>
    </>
  );
}

export default Account;
