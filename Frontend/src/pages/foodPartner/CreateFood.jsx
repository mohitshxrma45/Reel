import React, { useState, useRef, useEffect } from 'react'
import '../../styles/createfood.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'; 

const CreateFood = () => {
  const [videoFile, setVideoFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)


  const navigate = useNavigate();

  useEffect(() => {
    if (!videoFile) { setPreview(null); return }
    const url = URL.createObjectURL(videoFile)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [videoFile])

  // Toggle body class to allow scrolling on this page when a preview exists
  useEffect(() => {
    if (preview) document.body.classList.add('cf-scroll-enabled')
    else document.body.classList.remove('cf-scroll-enabled')
    return () => { document.body.classList.remove('cf-scroll-enabled') }
  }, [preview])

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
      try { videoRef.current.pause(); videoRef.current.load() } catch (e) { }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
   


    const formData = new FormData()

    formData.append('video', videoFile)
    formData.append('name', title)
    formData.append('description', description)

   const response = await axios.post('http://localhost:3000/api/food', formData, {
      withCredentials: true,

    })

    console.log('Food created:', response.data)
    navigate('/');
  }

  return (
    <div className="create-food-page">
      <div className="create-food-card">
        <div className="cf-header">
          <div className="cf-title">Create Food</div>
        </div>

        <form className="cf-form" onSubmit={handleSubmit}>
          <div className="cf-field">
            <label htmlFor="video">Video</label>
            <div className="cf-video-wrap">
              {preview ? (
                <>
                  <video
                    ref={videoRef}
                    className="cf-video"
                    src={preview}
                    onEnded={() => setIsPlaying(false)}
                  />

                  <div className="cf-video-overlay">
                    <button type="button" aria-label="Play" className="cf-play-btn" onClick={togglePlay}>
                      {isPlaying ? (
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 3v18l15-9z" /></svg>
                      )}
                    </button>
                  </div>

                  <div className="cf-video-actions">
                    <button type="button" title="Remove" className="icon-btn" onClick={handleRemove}>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M10 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" /></svg>
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ color: 'var(--muted)', padding: 10 }}>No preview — choose a video</div>
              )}
            </div>

            <div className="cf-upload">
              <label htmlFor="video" className="cf-upload-label">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 3v4l3-2v10" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="8.5" cy="12.5" r="2.2" />
                </svg>
                <div className="cf-upload-text">{videoFile ? 'Change video' : 'Upload video'}</div>
                <div className="cf-upload-hint">MP4, MOV — max recommended 50MB</div>
              </label>
              <input
                id="video"
                className="cf-file"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                aria-label="Upload video"
              />

              {videoFile && (
                <div className="cf-filename">Selected: {videoFile.name}</div>
              )}
            </div>
          </div>

          <div className="cf-field">
            <label htmlFor="title">Food Name</label>
            <input
              id="title"
              className="cf-input"
              type="text"
              placeholder="Food name or short title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="cf-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="cf-textarea"
              placeholder="Write a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="cf-actions">
            <button type="submit" className="cf-btn primary">Create</button>
            <button type="button" className="cf-btn ghost" onClick={() => { setVideoFile(null); setPreview(null); setTitle(''); setDescription('') }}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFood