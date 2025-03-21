import React from 'react';
import './css/Topbar.css';
import logo from '../assets/fcritlogo.png';
const Topbar = () => {
    return (
        <div className="topbar">
            <a className="navbar-brand" href="#">
                <img src={logo} alt="Logo" className="img" />
            </a>
            <div className='ag'>
                <div className="ag1">
                    AGNEL CHARITIES'
                </div>
                <div className="ag2">
                    FR. C. RODRIGUES INSTITUTE OF TECHNOLOGY
                </div>
                <div className="ag3">
                    Agnel Technical Education Complex Sector 9-A, Vashi, Navi Mumbai, Maharashtra, India PIN - 400703
                </div>
            </div>
        </div>
    );
};
export default Topbar;
