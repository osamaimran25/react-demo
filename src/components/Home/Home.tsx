// src/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to My App</h1>
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-primary mx-2"
          onClick={handleLoginClick}
        >
          Login
        </button>
        <button
          className="btn btn-success mx-2"
          onClick={handleSignupClick}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Home;
