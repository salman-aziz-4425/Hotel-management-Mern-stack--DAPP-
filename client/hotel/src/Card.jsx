import {useState} from 'react'
import './home.css'
import Modal from 'react-modal'
import {useDispatch,useSelector} from 'react-redux'
import {bookedRoom} from './features/roomSlice/roomSlice'
function Card(props)
{
  const dispatch=new useDispatch()
  const RoomsInfo = useSelector((state) => state.Hotel.Room.Room);
  const SubmitBooking=()=>{
    const index=RoomsInfo.findIndex((rooms)=>rooms.id==props.id)
    if(index!=-1){
      setbook("You have already added this into your list")
      return
    }
    console.log(index)
    if(RoomsInfo.length>3){
      setbook("Your rooms limit is crossed")
    }
    dispatch(bookedRoom({
      id:props.id,
      type:props.type,
      price:props.Price,
      source:props.source
    }))
    setbook("Booked")
}
  const [modalISOpen,setModalISOpen]=useState(false)
  const [book,setbook]=useState("")
  const headingStyle = {
    backgroundImage: "linear-gradient(to right, gray, red)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textFillColor: "transparent",
    fontWeight: "extrabold",
  };
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
      <Modal
  class="modal"
  isOpen={modalISOpen}
  style={{
    overlay: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'transparent',
      width: '700px',
      height: '500px',
      zIndex: 1000,
    },
  }}
>

<div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: -1,
    }}
  >
    {/* <Slider {...settings}>
      <div>
        <img src={image1} alt="" />
      </div>
      <div>
        <img src={image2} alt="" />
      </div>
      <div>
        <img src={image3} alt="" />
      </div>
    </Slider> */}
  </div>
  <div>
    <h1 style={headingStyle}>{props.type}</h1>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <img className="image2" src={props.source} alt="" />
    </div>
    <h3 style={headingStyle}>{book}</h3>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20%' }}>
      <button
        className="Booking"
        style={{ display: 'block', borderRadius: '20px' }}
        onClick={SubmitBooking}
      >
        Book
      </button>
      <button
        className="closing"
        style={{ display: 'block', borderRadius: '20px' }}
        onClick={() => setModalISOpen(false)}
      >
        Close
      </button>
    </div>
  </div>
</Modal>
</>
    )
}

export default Card