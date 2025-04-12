import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sos from './Sos'
import SosActivation from './SosActivation'
import SosActivated from './SosActivated'

const Client = () => {
  return (
    <Routes>
      <Route path='/' element={<Sos/>}/>
      <Route path='/sos' element={<Sos/>}/>
      <Route path='/sos-activation' element={<SosActivation/>}/>
      <Route path='/sos-activated' element={<SosActivated/>}/>
    </Routes>
  )
}

export default Client
