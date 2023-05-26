import React from 'react'
import Modal from "react-modal";
export default function Modals(props) {
    console.log(props.res)
  return (
    <Modal
    class="modal"
    isOpen={props.modalISOpen}
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
      {props?.res?.map((object) => {
        return (
          <li
            class="list-group-item "
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <img className="image2" src={object.source} alt=""></img>
            <p>{object.type}</p>
            <p>{object.price}</p>
            <button style={{height:"50px",borderRadius:"20px"}} onClick={()=>{props.DeleteRoomHandler(object.id)}}>Delete</button>
          </li>
        );
      })}
    </ul>
    <div style={{display:"flex",justifyContent:"space-between"}}>
    <p  style={{ marginTop: "20px" ,fontWeight:"bold",color:"gray"}}>Total Payment:{props.sum}</p>
    <button
      className="button" 
      style={{ marginTop: "20px",borderRadius:"20px" }}
      onClick={props.insertOnwers}
    >
      Pay
    </button>
    <button
      className="closing"
      style={{ marginTop: "20px" ,borderRadius:"20px" }}
      onClick={() => props.setModalISOpen(false)}
    >
      Close
    </button>
    </div>
  </Modal>
  )
}
