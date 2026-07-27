import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authService } from '../api/authService';
import authHeroImage from '../assets/ArchiVerse.svg'; 
import '../components/AuthForms.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = location.state?.message || '';

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username or Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const redirectByRole = (role) => {
    switch (role?.toLowerCase()) {
      case 'client': navigate('/client-dashboard'); break;
      case 'architect': navigate('/architect-dashboard'); break;
      case 'administrator':
      case 'admin': navigate('/admin-dashboard'); break;
      default: navigate('/'); break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(formData);
      const user = response.user || authService.getCurrentUser();
      if (user?.role) redirectByRole(user.role);
      else setServerError('Login succeeded, but user role is missing.');
    } catch (err) {
      const msg = err.response?.data?.detail || err.response?.data?.message || 'Invalid username or password.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-layout">
      {/* Left Side: Hero Section */}
      <div className="auth-hero-section">
        <div className="hero-content">
          <img src={authHeroImage} alt="ArchiVerse Logo" className="hero-logo" />
          <h1>Welcome Back to ArchiVerse</h1>
          <p>Access your dashboard, active consultations, and architectural projects.</p>
        </div>
      </div>

      {/* Right Side: Form Section */}
      <div className="auth-form-section">
        <div className="form-wrapper">
          <h2>Sign In to ArchiVerse</h2>
          <p className="subtext">Enter your credentials to access your account</p>

          {successMessage && <div className="success-banner">{successMessage}</div>}
          {serverError && <div className="error-banner">{serverError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="username">Username or Email</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account yet? <Link to="/register">Create one here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
