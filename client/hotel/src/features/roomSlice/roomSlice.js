import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Room:[]
}

export const BookedRoomSlice = createSlice({
  name: 'bookedRoom',
  initialState,
  reducers: {
    bookedRoom: (state,action) => {
      state.Room.push(action.payload)
      state.Room=[...new Set(state.Room)]
    },
    deleteRoom:(state,action)=>{
        state.Room=[]
    }
  },
})

// Action creators are generated for each case reducer function
export const {bookedRoom,deleteRoom} =BookedRoomSlice.actions

export default BookedRoomSlice.reducer