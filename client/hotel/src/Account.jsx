import "./x.css";
import Navbar from "./Navbar";
import { useState,useEffect} from "react";
import Modal from "react-modal";
import { useSelector,useDispatch } from "react-redux";
import  {updateRoom} from './features/roomSlice/roomSlice'
function Account() {
  const [modalISOpen, setModalISOpen] = useState(false);
  const img = useSelector((state) => state.Hotel.User.User.img);
  const Name = useSelector((state) => state.Hotel.User.User.Name);
  const Email = useSelector((state) => state.Hotel.User.User.Email);
  const RoomsInfo = useSelector((state) => state.Hotel.Room.Room);
  const dispatch=useDispatch()
  useEffect(() => {
  }, [RoomsInfo])

const DeleteRoomHandler=(id)=>{
dispatch(updateRoom(RoomsInfo.filter((object)=>{
  return object.id!==id
})))
}
  return (
    <>
      <Navbar />
      <form class="Block">
        <img
          style={{ height: "300px", width: "200px" }}
          src={img}
          alt="Avatar"
        ></img>
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
            return setModalISOpen(true);
          }}
        >
          My Orders
        </button>
      </form>
      <Modal
        class="modal"
        isOpen={modalISOpen}
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
        <ul class="list-group">
          {RoomsInfo.map((object) => {
            return (
              <li
                class="list-group-item "
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <img className="image2" src={object.source} alt=""></img>
                <p>{object.type}</p>
                <p>{object.price}</p>
                <button style={{height:"50px",borderRadius:"20px"}} onClick={()=>{DeleteRoomHandler(object.id)}}>Delete</button>
              </li>
            );
          })}
        </ul>
        <button
          className="closing"
          style={{ marginTop: "20px" }}
          onClick={() => setModalISOpen(false)}
        >
          Close
        </button>
      </Modal>
    </>
  );
}

export default Account;
