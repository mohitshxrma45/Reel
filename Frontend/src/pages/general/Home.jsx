// src/pages/general/Home.jsx
import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { FiHome, FiBookmark, FiLogOut, FiSun, FiMoon, FiNavigation } from "react-icons/fi"
import ReelCard from "../../components/ReelCard"

const Home = ({ isDark, toggleTheme }) => {
  const [videos, setVideos] = useState([])
  const [liked, setLiked] = useState({})
  const [saved, setSaved] = useState({})
  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState('')
  const [isLocating, setIsLocating] = useState(false)
  const containerRef = useRef(null)

  const getCount = (val) => {
    if (Array.isArray(val)) return val.length
    if (typeof val === 'number') return val
    return 0
  }

  // Get user location on mount
  useEffect(() => {
    getUserLocation()
  }, [])

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported')
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        setIsLocating(false)
      },
      (error) => {
        setLocationError('Location unavailable - distance not shown')
        setIsLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  // Fetch videos with partner location data
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/with-partners", { withCredentials: true })
      .then((res) => setVideos(res.data.foodItems))
      .catch((err) => console.log("API Error:", err))
  }, [])

  // Intersection Observer for auto-play
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reels = container.querySelectorAll("section")

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector("video")
          if (!video) return

          if (entry.intersectionRatio > 0.6) {
            video.play().catch(() => { })
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.6 }
    )

    reels.forEach((r) => obs.observe(r))
    return () => obs.disconnect()
  }, [videos])

  // Handle view increment
  const handleView = async (foodId) => {
    try {
      await axios.put(`http://localhost:3000/api/food/${foodId}/view`, {}, {
        withCredentials: true
      })
      // Update local view count
      setVideos(prev => 
        prev.map(v => 
          v._id === foodId ? { ...v, views: (v.views || 0) + 1 } : v
        )
      )
    } catch (err) {
      console.log("View increment error:", err)
    }
  }

  async function likeVideo(item) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      )

      if (response.data.like) {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: (v.likeCount ?? 0) + 1 } : v
          )
        )
        setLiked((prev) => ({ ...prev, [item._id]: true }))
      } else {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: Math.max(0, (v.likeCount ?? 1) - 1) } : v
          )
        )
        setLiked((prev) => ({ ...prev, [item._id]: false }))
      }
    } catch (err) {
      console.log("Like error:", err)
    }
  }

  async function saveVideo(item) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      )

      if (response.data.save) {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, savesCount: (v.savesCount ?? 0) + 1 } : v
          )
        )
        setSaved((prev) => ({ ...prev, [item._id]: true }))
      } else {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) } : v
          )
        )
        setSaved((prev) => ({ ...prev, [item._id]: false }))
      }
    } catch (err) {
      console.log("Save error:", err)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/user/logout", { withCredentials: true })
      window.location.href = "/"
    } catch (err) {
      console.log("Logout error:", err)
    }
  }

  return (
    <div className="h-screen w-full bg-black">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gradient from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          
          {isLocating && (
            <span className="text-xs text-slate-400">Getting location...</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={getUserLocation}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            title="Update location"
          >
            <FiNavigation className="text-white" size={18} />
          </button>
          
        </div>
      </div>

      {/* Video Feed */}
      <div ref={containerRef} className="h-full overflow-y-scroll snap-y snap-mandatory">
        {videos.length === 0 ? (
          <div className="h-screen flex items-center justify-center">
            <p className="text-slate-400">No videos available</p>
          </div>
        ) : (
          videos.map((item) => (
            <ReelCard
              key={item._id}
              item={item}
              liked={liked}
              saved={saved}
              onLike={likeVideo}
              onSave={saveVideo}
              getCount={getCount}
              userLocation={userLocation}
              onView={handleView}
            />
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 py-3 bg-gradient from-black/80 to-transparent">
        <Link to="/home" className="flex flex-col items-center gap-1">
          <FiHome className="text-white" size={24} />
          <span className="text-xs text-white">Home</span>
        </Link>
        <Link to="/saved" className="flex flex-col items-center gap-1">
          <FiBookmark className="text-white" size={24} />
          <span className="text-xs text-white">Saved</span>
        </Link>
        <button onClick={handleLogout} className="flex flex-col items-center gap-1">
          <FiLogOut className="text-white" size={24} />
          <span className="text-xs text-white">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Home