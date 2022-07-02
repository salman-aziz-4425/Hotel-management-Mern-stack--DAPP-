import React,{useState} from 'react'
import './home.css'
import Modal from 'react-modal'
import Axios from 'axios'
import {useDispatch} from 'react-redux'
import {bookedRoom} from './features/roomSlice/roomSlice'
function Card(props)
{
  const dispatch=new useDispatch()
  const SubmitBooking=()=>{
    console.log(props.type)
    dispatch(bookedRoom({
      type:props.type,
      price:props.Price,
      source:props.source
    }))
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
      position: 'fixed',
      left: '260px',
      backgroundColor: 'transparent',
      width:"700px",
      outline:"no"
    },
    content: {
      position: 'absolute',

    }
  }}>
  <h2>{props.type}</h2>
  <img className="image2" src={props.source} alt=""></img>
  <b><p>Description</p></b>
  <p>{}</p>
  <button className='Booking' onClick={SubmitBooking}>Book</button>
  <button className='closing' onClick={()=>setModalISOpen(false)}>Close</button>
  </Modal>
</>
    )
}

export default Card