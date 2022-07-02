import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Registeration from './Registeration';
import Login from './Login'
import Home from './Home'
import Rooms from './Rooms'
import Logout from './Logout'
import Account from './Account'
import {Provider, useSelector} from 'react-redux' 
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
export default function Routers() {
    const Token=useSelector(state=>state.Hotel.User.User.Token)
  return (
    <Router>
    <Routes>
    <Route  path="/Login" element={
        Token==''?
    <Provider store={store}>
       <Login/>
    </Provider>:<Home/>}></Route>
        <Route path="/Login/Registeration" element={<Registeration/>}></Route>
        <Route exact path="/" element={<Home/>}></Route>
        <Route path="/Rooms" element={Token!=''?<Rooms/>:<Home/>}></Route>
        <Route path="/Logout" element={
        <Provider store={store}>
            <Logout/>
            </Provider>}></Route>
        <Route path="/Account" element={
            Token!=''?
          <Provider store={store}>
              <Account/>
          </Provider>:<Home/>
    }></Route>
    </Routes>
    </Router>
  )
}
