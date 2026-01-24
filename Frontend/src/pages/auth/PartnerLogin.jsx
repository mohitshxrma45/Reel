import React from 'react'
import "../../styles/auth.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const PartnerLogin = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post("http://localhost:3000/api/auth/food-partner/login", {
            email,
            password
        }, {
            withCredentials: true
        })

        console.log(response.data);

        navigate("/createFood")
    }



    return (
        <div className="auth-container wide">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Partner sign in</h1>
                    <div className="auth-sub">Access your food-partner dashboard</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="contact@biz.com" />
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="••••••••" />
                    </div>

                    <div className="actions">
                        <button className="btn" type="submit">Sign in</button>
                    </div>

                    <div className="meta">Need an account? <a className="link" href="/food-partner/register">Register</a></div>
                </form>
            </div>
        </div>
    )
}

export default PartnerLogin
