import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaxForm from './components/form/Form';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar'; // Import Navbar component
import Report from './components/report/Report';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import ChangePassword from './components/changePassword/ChangePassword';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar will be displayed on all pages */}
      <Toaster position="top-center" reverseOrder={false} /> {/* Configure Toaster */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/taxForm" element={<TaxForm />} />
        <Route path="/report" element={<Report />} />
        <Route path="/change-password" element={<ChangePassword />} />
        
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
