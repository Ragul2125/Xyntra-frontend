import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import AmbulanceMap from './Ambulance_map.jsx'
import HospList from './HospList.jsx'
const Ambulance = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/map' element={<AmbulanceMap/>}/>
      <Route path='/hospital-list' element={<HospList/>}/>
    </Routes>
  )
}

export default Ambulance
