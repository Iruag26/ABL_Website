import React from 'react'
import MNavbar from '../../Components/MentorC/MNavbar'
import './css/mHomepage.css'
const mHomepage = () => {
  return (
    <div>
      <MNavbar />
      <div className='mentor-homepage'>
        <h1>You are logged in as Mentor</h1>

      </div>

    </div>
  )
}

export default mHomepage