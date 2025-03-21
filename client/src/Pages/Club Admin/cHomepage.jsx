import React from 'react'
import CAdNavbar from '../../Components/CAdminC/CAdNavbar'
import "./css/cHomepage.css"
const cHomepage = () => {
  return (
    <div>
      <CAdNavbar />
      <div className='cadmin-homepage'>

        <h1>You are logged in as Club Admin</h1>
      </div>

    </div>
  )
}

export default cHomepage