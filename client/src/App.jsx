import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={Join}/>
      <Route path="/chat" Component={Chat}/>
    </Routes>
    </BrowserRouter>
  )
}
