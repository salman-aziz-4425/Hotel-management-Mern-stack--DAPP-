import {useState} from 'react'
import './home.css'
import Modal from 'react-modal'
import {useDispatch} from 'react-redux'
import {bookedRoom} from './features/roomSlice/roomSlice'
function Card(props)
{
  const dispatch=new useDispatch()
  const SubmitBooking=()=>{
    dispatch(bookedRoom({
      id:props.id,
      type:props.type,
      price:props.Price,
      source:props.source
    }))
    alert("Booked")
}
  const [modalISOpen,setModalISOpen]=useState(false)
    return(
  <>
    <div className="card" style={{backgroundImage:`url(${props.source})`}}>
       <div className='card-Price'>
       <p>${props.Price}</p>
       </div>
        <div className="card-content">
        <h2 className="card-title" >{props.type}</h2>
          <p className="card-body">{props.price}</p>
          <button className="buttons" onClick={()=>setModalISOpen(true)}>Description</button>
        </div>
      </div>
  <Modal class="modal" isOpen={modalISOpen} style={{
    overlay: {
      top:100,
      position: 'fixed',
      left: '260px',
      backgroundColor: 'transparent',
      width:"700px",
      outline:"no",
      height:"500px",
    },
  }}>
  <h2>{props.type}</h2>
  <img className="image2" src={props.source}  alt=""></img>
  <button className='Booking' style={{display:"block"}} onClick={SubmitBooking}>Book</button>
  <button className='closing' onClick={()=>setModalISOpen(false)}>Close</button>
  </Modal>
</>
    )
}

export default Card