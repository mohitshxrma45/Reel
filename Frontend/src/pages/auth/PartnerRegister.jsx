import React from 'react'
import "../../styles/auth.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const PartnerRegister = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const password = e.target.password.value;

        const response = await axios.post("http://localhost:3000/api/auth/food-partner/register", {
            name,
            email,
            phone,
            address,
            password
        }, {
            withCredentials: true
        })

        console.log(response.data);

        navigate("/createFood")
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Partner sign up</h1>
                    <div className="auth-sub">Create a food-partner account to manage listings</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Business name</label>
                        <input type="text" name='name' placeholder="Tasty Kitchen" />
                    </div>

                    <div>
                        <label>Email</label>
                        <input type="email" name='email' placeholder="contact@biz.com" />
                    </div>

                    <div>
                        <label>Phone</label>
                        <input type="text" name='phone' placeholder="+91 555 555 5555" />
                    </div>

                    <div>
                        <label>Address</label>
                        <input type="text" name='address' placeholder="Street, City, State" />
                    </div>

                    <div>
                        <label>Passwords</label>
                        <input type="password" name='password' placeholder="••••••••" />
                    </div>

                    <div className="actions">
                        <button className="btn" type="submit">Create account</button>
                    </div>

                    <div className="meta">Already registered? <a className="link" href="/food-partner/login">Sign in</a></div>
                    <div className="switch-links">
                        <a className="link" href="/user/register">Register as normal user</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PartnerRegister
