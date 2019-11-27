import React, { useState } from 'react'
import './App.css'
import MainContent from './components/MainContent'

const firebase = require('./util/config-firebase')
const registerStateListener = async handler => firebase.auth().onAuthStateChanged(handler)

function App() {

  const [authState, setAuthState] = useState()

  registerStateListener(setAuthState)

  return (
    <div className="App">
      <MainContent authState={authState}/>
    </div>
  );
}

export default App
