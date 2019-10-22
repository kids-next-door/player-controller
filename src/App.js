import React, { useState } from 'react'
import './App.css'
import MainContent from './components/MainContent'
import { registerStateListener } from '../src/util/firebaseAuth'

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
