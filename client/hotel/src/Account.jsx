import './x.css'
import Navbar from './Navbar'
import { useState,useEffect} from 'react';
import Axios  from 'axios';
import Modal from 'react-modal'
import {useSelector} from 'react-redux'
function Account()
{
    const [pic,setpic]=useState("");
    const [password,setpassword]=useState("");
    const [modalISOpen,setModalISOpen]=useState(false)
    const [flag,setflag]=useState(false)
  
    const changehandler=(event)=>{
        // console.log(password)
        // event.preventDefault();
        // Axios.post('http://localhost:3000/update',{
        //        Name:name,
        //        Password:password
        // }).then((response)=>{
        //     alert("Updated successfully");
        // }).catch((error)=>{
        //     console.log("Error")
        // })
    }
    const passhandler=(event)=>{
        event.preventDefault()
        setpassword(event.target.value)
    }
    const [Rooms,setRoom]=useState([
        {
          username:"",
          Roomname:"",
          source:"",
        }])


        const img = useSelector(state=>state.Hotel.User.User.img)
        const Name=useSelector(state=>state.Hotel.User.User.Name)
        const Email=useSelector(state=>state.Hotel.User.User.Email)
        const RoomsInfo=useSelector(state=>state.Hotel.Room.Room)
        console.log(RoomsInfo)
    return(
        <>
        <Navbar/>
            <form class= "Block">
	        <img style={{height:"300px",width:"200px"}} src={img} alt="Avatar"></img>
			<br></br>
            <div className='lab' style={{marginTop:'30px'}}>
			<b><label>Username</label></b>
			<br></br>
            <label>{Name}</label>	
			<br></br>
			<b><label>Email</label></b>
			<br></br>
            </div>
            <label>{Email}</label>
			<br></br><br></br><br></br>
			<button  class="btn-dark" onClick={(event)=>{
                event.preventDefault()
            return(
            setModalISOpen(true))
            }}>My Orders</button>
            <button className="btn-dark" onClick={changehandler}>Change password</button>
            <input className='input' type="password" onChange={passhandler} ></input>
			<br></br>
	       </form>
    <Modal class="modal" isOpen={modalISOpen} style={{
    overlay: {
      position: 'fixed',
      left: '260px',
      backgroundColor: 'transparent',
      width:"700px",
      outline:"no",
      height:'500px'
    },
    content: {
      position: 'absolute',

    }
  }}>
<ul class="list-group">
  {RoomsInfo.map((object)=>{
        return(
  <li class="list-group-item " style={{display:'flex',justifyContent:'space-between'}}>
  <img  className='image2' src={object.source} alt=""></img>
  <p>{object.type}</p>
  <p>{object.price}</p>
  </li>
        )
    })
  }
</ul>
  <button className='closing' style={{marginTop:'20px'}} onClick={()=>setModalISOpen(false)}>Close</button>
  </Modal>
    </>
    )
}

export default Account