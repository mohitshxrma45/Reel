import React from 'react'
import "../../styles/auth.css";

import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const UserRegister = () => {

    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const password = e.target.password.value;



      const response = await axios.post("http://localhost:3000/api/auth/user/register", {
            name,
            email,
            password,
            phone,
            address
        },{
            withCredentials: true
        })

        console.log(response.data);

        navigate("/home")

        

    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Create your account</h1>
                    <div className="auth-sub">Register as a user to start ordering</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Full name</label>
                        <input type="text" name="name" placeholder="Jane Doe" />
                    </div>

                    <div>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="you@email.com" />
                    </div>

                    <div>
                        <label>Phone</label>
                        <input type="text" name="phone" placeholder="+91 555 555 5555" />
                    </div>

                    <div>
                        <label>Address</label>
                        <input type="text" name="address" placeholder="Street, City, State" />
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="••••••••" />
                    </div>

                    <div className="actions">
                        <button className="btn" type="submit">Create account</button>
                    </div>

                    <div className="meta">Already have an account? <a className="link" href="/user/login">Sign in</a></div>
                    <div className="switch-links">
                        <a className="link" href="/food-partner/register">Register as food partner</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserRegister
