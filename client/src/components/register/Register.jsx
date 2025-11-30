import { useState } from 'react';
import axios from 'axios';
import './style.css'; // Ensure this file contains your styling
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
    email: '',
    contactNo: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/register', formData, {
        withCredentials: true // Important to send cookies
      });
      console.log(response?.data);
      if (response?.data?.success) {
        toast.success('User registered successfully');

        // Save user data to localStorage
        const user = response?.data?.user;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          window.dispatchEvent(new Event('storage')); // Dispatch a storage event
        }

        setFormData({
          userId: '',
          userName: '',
          email: '',
          contactNo: '',
          password: '',
          confirmPassword: ''
        });

        navigate("/home");
      }

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <div className="container-fluid register-form">
      <div className="head">
        <h5 className="new-user mt-2">New User</h5>
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>User Details</legend>
          <div className="container">
            {/* Form fields */}
            <div className="row">
              <div className="col">
                <label htmlFor="userId"><b>User ID (Personnel No.):</b></label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="userName"><b>User Name:</b></label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="email"><b>E-mail:</b></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="contactNo"><b>Contact No.: </b></label>
                <input
                  type="text"
                  id="contactNo"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="password"><b>Password: </b></label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="confirmPassword"><b>Confirm Password:</b></label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </fieldset>
        <button type="submit" className="btn btn-primary mt-3">Create User</button>
      </form>
    </div>
  );
};

export default Register;
