// src/pages/general/Saved.jsx
import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { FiHome, FiBookmark, FiLogOut, FiSun, FiMoon } from "react-icons/fi"
import ReelCard from "../../components/ReelCard"

const Saved = ({ isDark, toggleTheme }) => {
  const [videos, setVideos] = useState([])
  const [liked, setLiked] = useState({})
  const [saved, setSaved] = useState({})
  const containerRef = useRef(null)

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/saved", { withCredentials: true })
      .then((res) => {
        const savedFoods = res.data.savedFoods || []
        const foods = savedFoods.map(s => (s.food ? s.food : s))
        setVideos(foods)
        const savedMap = {}
        foods.forEach(f => { if (f._id) savedMap[f._id] = true })
        setSaved(savedMap)
      })
      .catch(err => console.log("Saved API Error:", err))
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const reels = container.querySelectorAll("section")
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video")
        if (!video) return
        if (entry.intersectionRatio > 0.6) video.play().catch(() => { })
        else video.pause()
      })
    }, { threshold: 0.6 })
    reels.forEach(r => obs.observe(r))
    return () => obs.disconnect()
  }, [videos])

  const getCount = (val) => {
    if (Array.isArray(val)) return val.length
    if (typeof val === "number") return val
    return 0
  }

  async function likeVideo(item) {
    try {
      const response = await axios.post("http://localhost:3000/api/food/like", { foodId: item._id }, { withCredentials: true })
      if (response.data.like) {
        setVideos(prev => prev.map(v => v._id === item._id ? { ...v, likeCount: (v.likeCount ?? 0) + 1 } : v))
        setLiked(prev => ({ ...prev, [item._id]: true }))
      } else {
        setVideos(prev => prev.map(v => v._id === item._id ? { ...v, likeCount: Math.max(0, (v.likeCount ?? 1) - 1) } : v))
        setLiked(prev => ({ ...prev, [item._id]: false }))
      }
    } catch (err) {
      console.log("Like error:", err)
    }
  }

  async function saveVideo(item) {
    try {
      const response = await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
      if (response.data.save) {
        setVideos(prev => prev.map(v => v._id === item._id ? { ...v, savesCount: (v.savesCount ?? 0) + 1 } : v))
        setSaved(prev => ({ ...prev, [item._id]: true }))
      } else {
        setVideos(prev => prev.filter(v => v._id !== item._id))
        setSaved(prev => ({ ...prev, [item._id]: false }))
      }
    } catch (err) {
      console.log("Save error:", err)
    }
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white relative">
        <button
          onClick={toggleTheme}
          className="fixed top-6 right-6 p-2 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors duration-200 shadow-lg z-30"
        >
          {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        <h2 className="text-2xl font-bold mb-4">No saved videos yet</h2>
        <Link to="/" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
          Browse Reels
        </Link>

        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-4 bg-black/50 backdrop-blur-xl rounded-full p-3 border border-white/10">
          <Link
            to="/home"
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 text-white hover:scale-110 transition-all duration-200"
          >
            <FiHome size={20} />
          </Link>
          <Link
            to="/saved"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:scale-110 transition-all duration-200"
          >
            <FiBookmark size={20} />
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('theme')
              window.location.href = '/'
            }}
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-red-500/20 text-red-400 hover:text-red-300 hover:scale-110 transition-all duration-200"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen bg-black overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-2 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors duration-200 shadow-lg z-30"
      >
        {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      {videos.map((item) => (
        <ReelCard
          key={item._id}
          item={item}
          liked={liked}
          saved={saved}
          onLike={likeVideo}
          onSave={saveVideo}
          getCount={getCount}
        />
      ))}

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-4 bg-black/50 backdrop-blur-xl rounded-full p-3 border border-white/10">
        <Link
          to="/home"
          className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 text-white hover:scale-110 transition-all duration-200"
        >
          <FiHome size={20} />
        </Link>
        <Link
          to="/saved"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:scale-110 transition-all duration-200"
        >
          <FiBookmark size={20} />
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem('theme')
            window.location.href = '/'
          }}
          className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-red-500/20 text-red-400 hover:text-red-300 hover:scale-110 transition-all duration-200"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </div>
  )
}

export default Saved