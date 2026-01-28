// src/pages/foodPartner/CreateFood.jsx
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FiUpload, FiPlay, FiPause, FiX, FiSun, FiMoon } from 'react-icons/fi'

const CreateFood = ({ isDark, toggleTheme }) => {
  const [videoFile, setVideoFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const videoRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!videoFile) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(videoFile)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [videoFile])

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0]
    if (f) setVideoFile(f)
  }

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setIsPlaying(true)
    } else {
      v.pause()
      setIsPlaying(false)
    }
  }

  const handleRemove = () => {
    setVideoFile(null)
    setPreview(null)
    setIsPlaying(false)
    if (videoRef.current) {
      try {
        videoRef.current.pause()
        videoRef.current.load()
      } catch (e) { }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('video', videoFile)
      formData.append('name', title)
      formData.append('description', description)

      const response = await axios.post('https://reel-1-ump1.onrender.com/api/food', formData, {
        withCredentials: true,
      })

      console.log('Food created:', response.data)
      navigate('/home')
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to create food. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-orange-50 to-amber-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8 px-4">
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 shadow-md z-20"
        aria-label="Toggle theme"
      >
        {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/50 border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold bg-linear-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-2">
            Create Food Listing
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Share your delicious dishes with customers</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Video Preview</label>

              {preview ? (
                <div className="relative bg-black rounded-xl overflow-hidden mb-3 group">
                  <video
                    ref={videoRef}
                    className="w-full max-h-96 object-contain"
                    src={preview}
                    onEnded={() => setIsPlaying(false)}
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white transition-all duration-200 transform hover:scale-110"
                    >
                      {isPlaying ? <FiPause size={28} /> : <FiPlay size={28} />}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemove}
                    className="absolute top-3 right-3 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <FiX size={20} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 backdrop-blur-md bg-black/50 rounded-lg px-3 py-2">
                    <p className="text-white text-xs truncate">{videoFile.name}</p>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full px-6 py-12 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-200 group">
                  <div className="flex flex-col items-center justify-center">
                    <FiUpload className="text-slate-400 dark:text-slate-500 group-hover:text-orange-500 transition-colors mb-3" size={32} />
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Upload video</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">MP4, MOV — max 50MB</p>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Food Name</label>
              <input
                type="text"
                placeholder="e.g., Spicy Biryani"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description</label>
              <textarea
                placeholder="Describe your dish, ingredients, taste..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all duration-200 resize-none h-32"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || !videoFile}
                className="flex-1 py-3 bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Listing'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setVideoFile(null)
                  setPreview(null)
                  setTitle('')
                  setDescription('')
                }}
                className="px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold rounded-xl transition-all duration-200"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateFood