import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import {createStore} from 'redux';
import reducer from "./reducers";

const store = createStore(reducer);

// const store = new Store({
//     portName: 'NOT_ANKI' // communication port name
//   });

console.log(store)
ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,  
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
