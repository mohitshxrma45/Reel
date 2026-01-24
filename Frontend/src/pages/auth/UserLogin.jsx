import React from 'react'
import "../../styles/auth.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const UserLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/user/login", {
      email,
      password

    }, {
      withCredentials: true
    })
    console.log(response.data);

    navigate("/home");




  }

  return (
    <div className="auth-container wide">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome back</h1>
          <div className="auth-sub">Sign in to your user account</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input type="email" name='email' placeholder="you@email.com" />
          </div>

          <div>
            <label>Password</label>
            <input type="password" name='password' placeholder="••••••••" />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Sign in</button>
          </div>

          <div className="meta">Don't have an account? <a className="link" href="/user/register">Create one</a></div>
        </form>
      </div>
    </div>
  )
}

export default UserLogin
