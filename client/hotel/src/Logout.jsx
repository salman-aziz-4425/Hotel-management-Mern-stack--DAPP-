import Home from './Home'
import {deleteInfo} from './features/userInfo/userSlice'
import {useDispatch} from 'react-redux'
import {deleteRoom} from './features/roomSlice/roomSlice'
function Logout()
{
    console.log("hello")
    const dispatch=useDispatch()
    dispatch(deleteRoom())
    dispatch(deleteInfo())
    return(
      <Home/>
    )
}
export default Logout