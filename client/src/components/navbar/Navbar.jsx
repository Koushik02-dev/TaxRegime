import { useEffect, useState } from 'react';
import { HiBars3CenterLeft } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import Header from '../sidebar/SideBar';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const updateUserData = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    updateUserData();

    window.addEventListener('storage', updateUserData);

    return () => {
      window.removeEventListener('storage', updateUserData);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/users/logout", {}, { withCredentials: true });

      if (response?.data?.success) {
        toast.success("Logged out successfully")

        // Clear local storage and state
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
      }

    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand">
            <HiBars3CenterLeft
              className="icon-dark-cyan"
              style={{ fontSize: "35px", cursor: "pointer" }}
              onClick={toggleSidebar}
            />
            <a className="navbar-brand heading" href="#" style={{ marginLeft: '10px' }}>Tax Regime</a>
          </div>
          <div className="ml-auto">
            {user ? (
              <>
                <span className="navbar-text mr-3" style={{
                  marginRight: "10px",
                  color: "white"
                }}>Welcome, {user.userName}</span>
                <button className="btn" onClick={handleLogout} style={{
                  marginRight: '10px',
                  color: "red",
                  fontWeight: "bold",
                  padding: "6px 20px",
                  border: "2px solid red"
                }}> Logout</button>
              </>
            ) : (
              <Link to="/login" style={{ textDecoration: "none", color: "white" }}>Login</Link>
            )}
          </div>
        </div>
      </nav>
      <Header isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;
