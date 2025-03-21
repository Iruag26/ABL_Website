import React from 'react';
import AdNavbar from '../../Components/AdminC/AdNavbar';
import './css/aHomepage.css';

const aHomepage = () => {
  return (
    <div>
      <AdNavbar />
      <div className='admin-homepage'>
        <h1>You are logged in as Admin</h1>

      </div>
    </div>
  )
}

export default aHomepage