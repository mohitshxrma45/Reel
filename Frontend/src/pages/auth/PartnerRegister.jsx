// src/pages/auth/PartnerRegister.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiEye, FiEyeOff, FiSun, FiMoon, FiNavigation } from 'react-icons/fi'
import LocationMap from '../../components/LocationMap'

const PartnerRegister = ({ isDark, toggleTheme }) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Location state
  const [location, setLocation] = useState({ latitude: null, longitude: null })
  const [locationError, setLocationError] = useState('')
  const [isLocating, setIsLocating] = useState(false)
  const [mapVisible, setMapVisible] = useState(false)

  // Get current location using browser geolocation API
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      return
    }

    setIsLocating(true)
    setLocationError('')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        setMapVisible(true)
        setIsLocating(false)
      },
      (error) => {
        setLocationError(getLocationErrorMessage(error.code))
        setIsLocating(false)
        // Show map anyway with default location
        setMapVisible(true)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

  const getLocationErrorMessage = (code) => {
    switch (code) {
      case 1: return 'Location permission denied. Please enable location access.'
      case 2: return 'Location information unavailable. Please try again.'
      case 3: return 'Location request timed out. Please try again.'
      default: return 'Unable to get your location.'
    }
  }

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const name = e.target.name.value
      const email = e.target.email.value
      const phone = e.target.phone.value
      const address = e.target.address.value
      const password = e.target.password.value
      const link = e.target.link.value

      const response = await axios.post("/api/auth/food-partner/register", {
        name,
        email,
        phone,
        address,
        password,
        link,
        latitude: location.latitude,
        longitude: location.longitude
      }, {
        withCredentials: true
      })

      console.log(response.data)
      navigate("/createFood")
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 py-8">
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 shadow-md"
        aria-label="Toggle theme"
      >
        {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/50 border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-2xl p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-linear-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-2">
              Partner signup
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Create a food-partner account to manage listings</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Business name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Tasty Kitchen"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="contact@biz.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Phone</label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type="text"
                  name="phone"
                  placeholder="+91 555 555 5555"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Address</label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type="text"
                  name="address"
                  placeholder="Street, City, State"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Restaurant Link</label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type="url"
                  name="link"
                  placeholder="https://your-restaurant.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Location Section */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Restaurant Location
              </label>
              
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={isLocating}
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 disabled:opacity-50"
              >
                <FiNavigation size={18} />
                {isLocating ? 'Getting location...' : 'Get Current Location'}
              </button>

              {locationError && (
                <p className="mt-2 text-xs text-red-500">{locationError}</p>
              )}

              {location.latitude && location.longitude && (
                <p className="mt-2 text-xs text-green-600 dark:text-green-400">
                  ✓ Location captured: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </p>
              )}

              {/* Map Toggle */}
              {mapVisible && (
                <div className="mt-3">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                    Drag marker to adjust exact location:
                  </p>
                  <LocationMap
                    latitude={location.latitude}
                    longitude={location.longitude}
                    onLocationChange={handleLocationChange}
                    height="250px"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3 bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <div className="text-center">
              Already registered?{' '}
              <a href="/food-partner/login" className="font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors">
                Sign in
              </a>
            </div>
            <div className="flex gap-1 justify-center">
              <span>Or register as</span>
              <a href="/user/register" className="font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors">
                User
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerRegister