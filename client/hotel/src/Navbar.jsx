import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './App.css'
function Navbar(){
  const Token=useSelector(state=>state.Hotel.User.User.Token)
    return(
<>
<nav className="navbar navbar-expand-lg navbar-light">
  <NavLink className="navbar-brand" to="/" style={{border:"2px solid black",color:"brown",marginLeft:"3%"}}><b>SSF</b></NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div  id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to="/Home" style={{color:"black"}}><b>Home</b></NavLink>
      </li>
      <li NaclassName="nav-item">
        <NavLink className="nav-link" to={("/Rooms")} style={{color:"black"}}><b>Rooms</b></NavLink>
      </li>
      <li NaclassName="nav-item">
        <NavLink className="nav-link" to={("/Account")} style={{color:"black"}}><b>Account</b></NavLink>
      </li>
      <li NaclassName="nav-item">
        <NavLink className="nav-link" to={Token==''?("/Login"):("/Logout")} style={{color:"black"}}>{Token==''?<b>Login</b>:<b>Logout</b>}</NavLink>
      </li>
    </ul>
  </div>
</nav>
</>
    )
 }

 export default Navbar