
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './slices/userSlice';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import ServiceListing from './pages/ServiceListing';
import Login from './pages/login';
import Signup from './pages/signup';
import { jwtDecode } from 'jwt-decode';
import DefaultPage from './pages/DefaultPage';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUserInfo(jwtDecode(token)));
    }
  }, [dispatch]);

  return (
    <div className="main-container">
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServiceListing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<DefaultPage />} />
        </Routes>
      </div>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default App;


