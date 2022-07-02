import { createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
const initialState = {
  User:{
    Name:"",
    Email:"",
    Token:"",
    img:""
  }
}

export const UserSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    storingInfo: (state,action) => {
      state.User=action.payload 
      console.log(state.User)
    },
    deleteInfo:(state,action)=>{
      state.User={
        Name:"",
        Email:"",
        Token:"",
        img:""
      }
      localStorage.removeItem('persist:root')
      storage.removeItem('persist:root')
    }
  },
})

// Action creators are generated for each case reducer function
export const {storingInfo,deleteInfo} = UserSlice.actions

export default UserSlice.reducer