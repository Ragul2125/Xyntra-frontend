import React from 'react'
import './Client.css'
import profile from "../assets/profile.svg"
import location from "../assets/location.svg"
import add from "../assets/add-square.svg"
import SosBtn from "./SosBtn.jsx"
const Sos = () => {
  return (
    <div className='sos-main-pg'>
      <header>
        <div className="profile">
            <img src={profile} alt="profile" />
            <h3>John</h3>
        </div>
        <div className="loc">
            <p>See Location</p>
             <img src={location} alt="" />
        </div>
      </header>
      <div className="sos-div">
        <div className="sos-div-header">
            <h1>Emergency help</h1>
            <h1>needed ?</h1>
            <div className="dis">
                <p>Tap the button below for immediate assistance </p>
            </div>
        </div>
        <div className="sos-btn">
            <SosBtn/>
        </div>
        <div className="sos-manual-part">
            <h2>Not sure what to do?</h2>
            <p>Enter the symptoms Manually</p>
        </div>
      </div>
      <div className="manual-div">
        <div className="manual-div-input">
            <input type="text" placeholder='Enter your Symptoms'/>
            <img src={add} alt="add" />
        </div>
        <div className="sugestion">
            <table>
                <tr>
                    <td>
                        <p>Dizziness</p>
                    </td>
                    <td>
                        <p>Difficult in breathing</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Dizziness</p>
                    </td>
                    <td>
                        <p>Difficult in breathing</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Dizziness</p>
                    </td>
                    <td>
                        <p>Difficult in breathing</p>
                    </td>
                </tr>
            </table>
        </div>

      </div>
    </div>
  )
}

export default Sos
