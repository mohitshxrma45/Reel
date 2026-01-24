import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth.css';

const ChooseRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Register</h1>
          <div className="auth-sub">Choose how you want to join the platform</div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
          <Link to="/user/register" className="auth-submit">
            👤 Register as User
          </Link>
          <Link to="/food-partner/register" className="auth-submit" style={{ background: 'linear-gradient(180deg, var(--accent-600), var(--accent-700))', opacity: 0.95 }}>
            🍽️ Register as Food Partner
          </Link>
        </div>
        
        <div className="auth-alt-action">
          Already have an account? <Link to="/user/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;