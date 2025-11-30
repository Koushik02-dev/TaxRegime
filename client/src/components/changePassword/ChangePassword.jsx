import { useState } from 'react';
import axios from 'axios';
import { FaLock } from 'react-icons/fa';
import './style.css'; // Import your custom styles
import { toast } from 'react-hot-toast'; // Import toast for notifications
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(confirmNewPassword !== newPassword){
      toast.error("New password and confirm new password do not match !");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/change-password', { oldPassword, newPassword }, {
        withCredentials: true
      });

      console.log("response.data", response?.data);
      console.log("response.data.error", response?.data?.error);

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setOldPassword('');
        setNewPassword('');
        navigate("/home");
      } else {
        toast.error('Password change failed');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="change-password-container">
      <h3 style={{ textAlign: "center" }}>Change Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label htmlFor="oldPassw ord">Old Password</label>
          <div className="input-icon">
            <FaLock />
            <input
              type="password"
              id="oldPassword"
              name='oldPassword'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <div className="input-icon">
            <FaLock />
            <input
              type="password"
              id="newPassword"
              name='newPassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">Confirm New Password</label>
          <div className="input-icon">
            <FaLock />
            <input
              type="password"
              id="confirmNewPassword"
              name='confirmNewPassword'
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
