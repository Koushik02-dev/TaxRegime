import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './style.css'; // Ensure your custom CSS styles are applied

const Header = ({ isOpen, toggleSidebar }) => {
    return (
        <>
            <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <h2 style={{
                    color: "white",
                    cursor: "pointer",
                    textAlign: "center",
                }}>Tax Regime</h2>

                <hr style={{
                    color: "white"
                }} />

                <ul className="sidebar-menu">
                    <li className="sidebar-item">
                        <Link to="/login" onClick={toggleSidebar}>Home</Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/change-password" onClick={toggleSidebar}>Change Password</Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/admin" onClick={toggleSidebar}>Admin</Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/taxForm" onClick={toggleSidebar}>Tax Regime</Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/taxForm" onClick={toggleSidebar}>My Tax Regime</Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/report" onClick={toggleSidebar}>Report</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Header;
