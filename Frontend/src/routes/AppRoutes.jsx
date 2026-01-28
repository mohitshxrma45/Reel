// src/routes/AppRoutes.jsx
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import PartnerRegister from '../pages/auth/PartnerRegister'
import PartnerLogin from '../pages/auth/PartnerLogin'
import Home from '../pages/general/Home'
import CreateFood from '../pages/foodPartner/CreateFood'
import Profile from '../pages/foodPartner/Profile'
import Saved from '../pages/general/Saved'
import ChooseRegister from '../pages/auth/ChooseRegister'

const AppRoutes = ({ isDark, toggleTheme }) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ChooseRegister isDark={isDark} toggleTheme={toggleTheme} />} />
                <Route path="/user/register" element={<UserRegister isDark={isDark} toggleTheme={toggleTheme} />} />
                <Route path="/user/login" element={<UserLogin isDark={isDark} toggleTheme={toggleTheme} />} />
                <Route path="/food-partner/register" element={<PartnerRegister isDark={isDark} toggleTheme={toggleTheme} />} />
                <Route path="/food-partner/login" element={<PartnerLogin isDark={isDark} toggleTheme={toggleTheme} />} />
                <Route path="/home" element={<Home isDark={isDark} toggleTheme={toggleTheme} />} />
                <Route path='/createFood' element={<CreateFood isDark={isDark} toggleTheme={toggleTheme} />} />
                <Route path="food-partner/:id" element={<Profile isDark={isDark} toggleTheme={toggleTheme} />} />
                <Route path="/saved" element={<Saved isDark={isDark} toggleTheme={toggleTheme} />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes