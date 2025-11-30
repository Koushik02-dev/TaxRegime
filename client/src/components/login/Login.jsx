// src/components/login/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style.css';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/login', formData, {
        withCredentials: true // Important to send cookies
      });

      console.log('Login response:', response); // Log the response to check its structure

      if (response?.data?.success) {
        toast.success('Logged In successfully');

        // Ensure the user data exists in the response
        const user = response?.data?.user;
        console.log(user);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          window.dispatchEvent(new Event('storage')); // Dispatch a storage event
        } else {
          console.error('No user data in response');
        }

        setFormData({
          userId: '',
          password: ''
        });

        navigate("/home");
      } else {
        toast.error('Login failed');
      }

    } catch (error) {
      toast.error(error?.response?.data?.msg);

    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={handleSubmit}>
          <h4 className='mb-3'>Login</h4>
          <p><b>Please enter your userid and password of RFID system</b></p>

          <input type="text" className='mt-2' placeholder="userID" name='userId' value={formData.userId} onChange={handleChange} />

          <input type="password" placeholder="password" className='mt-2' name="password" value={formData.password} onChange={handleChange} />

          <div className='checkbox-container'>
            <input type='checkbox' id='keep-logged-in' required />
            <label htmlFor="keep-logged-in">Keep me logged in</label>
          </div>

          <button type="submit">Login</button>

          <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
