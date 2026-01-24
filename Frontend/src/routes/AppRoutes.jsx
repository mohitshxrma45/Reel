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



const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ChooseRegister />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<PartnerRegister />} />
                <Route path="/food-partner/login" element={<PartnerLogin />} />
                <Route path="/home" element={<Home />} />
                <Route path='/createFood' element={<CreateFood />} />
                <Route path="food-partner/:id" element={<Profile />} />
                <Route path="/saved" element={<Saved />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes