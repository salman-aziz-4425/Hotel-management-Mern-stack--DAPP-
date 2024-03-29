import {useState} from "react";
import Axios from 'axios'
import './App.css'
import {useNavigate} from 'react-router'
import Navbar from "./Navbar";
import {storingInfo} from './features/userInfo/userSlice'
import {useDispatch} from 'react-redux'

function Login() {
const dispatch=new useDispatch()
let navigate=useNavigate();
const [name, setname] = useState("")
const [password, setpassword] = useState("")
const NamechangeHandler=(event)=>{
  event.preventDefault()
  setname(event.target.value)
}

const PasschangeHandler=(event)=>{
  event.preventDefault()
  setpassword(event.target.value)
}

const Getdata = (event) => {
  event.preventDefault()
  console.log("hello")
  Axios.get("http://localhost:3001/Login?name="+name+"&"+"password="+password).then((result)=>{
    console.log(result)
  if(result.status==201){
      dispatch(storingInfo({
        _id:result.data._id,
        Name:result.data.Name,
        Email:result.data.Email,
        Token:result.data.Token,
        img:result.data.img,
        limit:result.data.Limit,
        type:result.data.Type,
        rooms:result.data.rooms
      }))
      alert("loged in")
      navigate('/Home')
     }
  })
};

  return (
    <>
    <Navbar></Navbar>
    <div className="container">
    <div className="row">
    <img className="image" src="https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="img" height="300"></img>
  </div>
    <form onSubmit={Getdata}>
    <h1>Login</h1>
  <div Name="row">
    <div Name="col-sm">
     <label className="Names">Username</label>
     <input className="input-box" type="text" onChange={NamechangeHandler}></input>
    </div>
    <div Name="col-sm">
    <label className="Names">password</label>
     <input className="input-box"  type="password" onChange={PasschangeHandler}></input>
    </div>
  </div>
  <div Name="col-sm">
  <button Name="button" type="Submit" style={{borderRadius:"20px",marginTop:"20px"}}>Submit</button>
  </div>
  <div Name="col-sm">
  <button className="button"  onClick={()=>{
    navigate('./Registeration')
  }} style={{borderRadius:"20px",marginTop:"20px"}}>Register</button>
  </div>
  </form>
</div>
</>
  );
}

export default Login;
