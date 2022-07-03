import Navbar from "./Navbar";
import "./home.css";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {Provider} from 'react-redux' 
import {store} from './app/store'
function Home() {
  return (
    <>
    <Provider store={store}>
    <Navbar />
    </Provider>
      <div className="Container">
        <p>Welcome!</p>
      </div>
      <div className="Body">
        <b>
          <h1
            style={{
              paddingTop: "50px",
              "font-family": "Montserrat,sans-serif",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Featured Rooms
          </h1>
        </b>
        <div className="Container-fluid">
        <div className="card" style={{backgroundImage:"url(https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500)"}}>
        <div className="card-Price">
          <p>$100</p>
        </div>
        <div className="card-content">
        <h2 className="card-title">Economic</h2>
          <p className="card-body"></p>
        </div>
      </div>
      <div className="card" style={{backgroundImage:"url(https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)"}}>
       <div className="card-Price">
          <p>$300</p>
        </div>
        <div className="card-content">
        <h2 className="card-title">Buisness</h2>
          <p className="card-body"></p>
        </div>
      </div>
      <div className="card" style={{backgroundImage:"url(https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500)"}}>
       <div className="card-Price">
          <p>$600</p>
        </div>
        <div className="card-content">
        <h2 className="card-title">Delux</h2>
          <p className="card-body"></p>
        </div>
      </div>
      </div>
      </div>
      <h1
            style={{
              paddingTop: "50px",
              "font-family": "Montserrat,sans-serif",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
          </h1>
      <div className="container-fluid2" >
     
      </div>
      <div className="icons">

      </div>
      <MDBFooter className="font-small pt-4 mt-4"  style={{
              color:'white',
              paddingTop: "50px",
              "font-family": "Montserrat,sans-serif",
              fontSize: "10px",
              fontWeight: "bold",
              backgroundColor:"grey",
            }}>
      <MDBContainer fluid className="text-center text-md-right">
        <MDBRow>
          <MDBCol md="6" style={{float:'left'}}>
            <h5 className="title" style={{}}>  Hotel Management system</h5>
          </MDBCol>
          <MDBCol md="6" >
            <h5 className="title">Links</h5>
            <ul style={{display:"inline-flex"}}>
              <li className="list-unstyled"  style={{margin:"10px"}}>
                <a href="#!"><img src="https://cdn-icons-png.flaticon.com/512/145/145802.png" alt="" style={{height:"40px"}}></img></a>
              </li>
              <li className="list-unstyled">
              <li className="list-unstyled"  style={{margin:"10px"}}>
                <a href="#!"><img src="https://cdn-icons.flaticon.com/png/128/2504/premium/2504957.png?token=exp=1642283898~hmac=e6079330948b6c3074ce10ca0cab9dc6" alt="" style={{height:"40px"}}></img></a>
              </li>
              </li>
              <li className="list-unstyled">
              <li className="list-unstyled"  style={{margin:"10px"}}>
                <a href="#!"><img src="https://cdn-icons-png.flaticon.com/128/174/174883.png" alt="" style={{height:"40px"}}></img></a>
              </li>
              </li>
              <li className="list-unstyled">
              <li className="list-unstyled"  style={{margin:"10px"}}>
                <a href="#!"><img src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png" alt="" style={{height:"40px"}}></img></a>
              </li>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()}
          </MDBContainer>
          <p style={{paddingLeft:"6px"}}>Powered by SalmanAziz </p>
      </div>
    </MDBFooter>
    </>
  );
}

export default Home;
