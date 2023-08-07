import React from 'react'
import ReactDOM from 'react-dom/client'
import SamuraiJSApp from './App';
import './index.css'

// setInterval(() => {
//     store.dispatch({type: 'FAKE'})
// }, 1000)

// let rerenderEntireTree = (state) => {
ReactDOM.createRoot(document.getElementById('root')).render(
    <SamuraiJSApp />
)
// }

// rerenderEntireTree(store.getState());

// store.subscribe(() => {
//     let state = store.getState()
//     rerenderEntireTree(state);
// });