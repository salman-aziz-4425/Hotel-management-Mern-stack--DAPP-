import { useState } from "react";
import Axios from 'axios'
import './App.css'
import Navbar from './Navbar'


function Registeration() {
const [name, setname] = useState("")
const [email, setEmail] = useState("")
const [password, setpassword] = useState("")
const [image,setImage]=useState("")

const NamechangeHandler=(event)=>{
  event.preventDefault()
  setname(event.target.value)
}
const EmailchangeHandler=(event)=>{
  event.preventDefault()
  setEmail(event.target.value)
}
const PasschangeHandler=(event)=>{
  event.preventDefault()
  setpassword(event.target.value)
}
const ImgchangeHandler=(event)=>{
  event.preventDefault()
  console.log(event.target.files[0])
  setImage(event.target.files[0])
}
const Adddata = (event) => {
  event.preventDefault()
  var UserData=new FormData()
  UserData.append('Name',name)
  UserData.append('Email',email)
  UserData.append('Password',password)
  UserData.append('UserImage',image)
  Axios.post("http://localhost:3000/create",UserData).then(() => {
    alert("submitted")
  });
};

  return (
    <>
      <Navbar></Navbar>
    <div class="container">
    <div class="row">
    <img class="image" src="https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="img" height="300"></img>
  </div>
    <form onSubmit={Adddata}>
    <h1>Registeration Form</h1>
  <div class="row">
    <div class="col-sm">
     <label className="Names">Username</label>
     <input className="input-box" type="text" onChange={NamechangeHandler}></input>
    </div>
    <div class="col-sm">
    <label className="Names">Email</label>
     <input className="input-box"  type="text" onChange={EmailchangeHandler}></input>
    </div>
    <div class="col-sm">
    <label className="Names">password</label>
     <input className="input-box"  type="password" onChange={PasschangeHandler}></input>
    </div>
  </div>
  <div class="col-sm">
    <label className="Names">upload image</label>
     <input className="input-box"  type="file" onChange={ImgchangeHandler}></input>
    </div>
  <div class="col-sm">
  <button class="button" type="Submit" style={{borderRadius:"20px"}}>Submit</button>
  </div>
  </form>
</div>
</>
  );
}

export default Registeration;
