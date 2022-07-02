import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes'
import {Provider, useSelector} from 'react-redux' 
import {store} from './app/store'
ReactDOM.render(
  <Provider store={store}>
  <Routes/>
  </Provider>
,
  document.getElementById('root')
);