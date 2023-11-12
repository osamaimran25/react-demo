import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './components/Signup/SignupHtml';
import Login from './components/Login/LoginHTML';
import SearchProductView from './components/SearchProduct/SearchProductHTML';
import ProtectedRoute from './PrivateRoute';
import Home from './components/Home/Home';
const App: React.FC = () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5Njk5NTcwLCJpYXQiOjE2OTk2OTU5NzAsImp0aSI6IjIxZjVjNGNhYWIxZDQzNzhhNjllNWNhMGRjZWE2ZGE3IiwidXNlcl9pZCI6Mn0.Cxzha7052MwX3Px3uWpaVhogKKDI27Bo0RQ6gPsZmhw";
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />

          {/* Use ProtectedRoute for the protected route */}
          <Route
            path="/search"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          >
            {/* Define the nested route */}
            <Route index element={<SearchProductView />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
