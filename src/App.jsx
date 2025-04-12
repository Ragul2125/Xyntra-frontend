import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from "./Login/Login.jsx"
import Signup from './Login/Signup.jsx'
import Client from './client/Client-layout.jsx'
import Hospital from './Hosp/Hospital-layout.jsx'
import Ambulance from './Ambulance/Ambulance-layout.jsx'
import Loading from "./Login/Loading.jsx"
import GetStarted from './Login/GetStarted.jsx'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Loading/>}/>
          <Route path='/loading' element={<Loading/>}/>
          <Route path='/getStarted' element={<GetStarted/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/client/*' element={<Client/>}/>
          <Route path='/ambulance/*' element={<Ambulance/>}/>
          <Route path='/hospital/*' element={<Hospital/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
