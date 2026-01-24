import React, { useEffect, useRef, useState } from 'react';
import '../../styles/reels.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { BsSave } from "react-icons/bs";
import ReelCard from '../../components/ReelCard';

const Saved = () => {
  const [videos, setVideos] = useState([]);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/food/saved", { withCredentials: true })
      .then((res) => {
        const savedFoods = res.data.savedFoods || [];
        const foods = savedFoods.map(s => (s.food ? s.food : s));
        setVideos(foods);
        const savedMap = {};
        foods.forEach(f => { if (f._id) savedMap[f._id] = true; });
        setSaved(savedMap);
      })
      .catch(err => console.log("Saved API Error:", err));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reels = container.querySelectorAll('.reel');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector('video');
        if (!video) return;
        if (entry.intersectionRatio > 0.6) video.play().catch(() => { });
        else video.pause();
      });
    }, { threshold: 0.6 });
    reels.forEach(r => obs.observe(r));
    return () => obs.disconnect();
  }, [videos]);

  const getCount = (val) => {
    if (Array.isArray(val)) return val.length;
    if (typeof val === 'number') return val;
    return 0;
  };

  async function likeVideo(item) {
    try {
      const response = await axios.post("http://localhost:3000/api/food/like", { foodId: item._id }, { withCredentials: true });
      if (response.data.like) {
        setVideos(prev => prev.map(v => v._id === item._id ? { ...v, likeCount: (v.likeCount ?? 0) + 1 } : v));
        setLiked(prev => ({ ...prev, [item._id]: true }));
      } else {
        setVideos(prev => prev.map(v => v._id === item._id ? { ...v, likeCount: Math.max(0, (v.likeCount ?? 1) - 1) } : v));
        setLiked(prev => ({ ...prev, [item._id]: false }));
      }
    } catch (err) {
      console.log("Like error:", err);
    }
  }

  async function saveVideo(item) {
    try {
      const response = await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true });
      if (response.data.save) {
        setVideos(prev => prev.map(v => v._id === item._id ? { ...v, savesCount: (v.savesCount ?? 0) + 1 } : v));
        setSaved(prev => ({ ...prev, [item._id]: true }));
      } else {
        setVideos(prev => prev.filter(v => v._id !== item._id));
        setSaved(prev => ({ ...prev, [item._id]: false }));
      }
    } catch (err) {
      console.log("Save error:", err);
    }
  }

  if (!videos || videos.length === 0) {
    return (
      <div style={{ height: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>No saved videos yet</h2>
        <Link to="/" style={{ marginTop: 12, color: '#ff2e63', textDecoration: 'none' }}>Browse Reels</Link>
        <div className="bottom-nav" style={{ position: 'fixed', bottom: 12, left: '50%', transform: 'translateX(-50%)', width: '90%' }}>
          <Link to="/" className="nav-item"><FaHome /></Link>
          <Link to="/saved" className="nav-item"><BsSave /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="reels-container" ref={containerRef}>
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

      <div className="bottom-nav">
        <Link to="/" className="nav-item"><FaHome /></Link>
        <Link to="/saved" className="nav-item"><BsSave /></Link>
      </div>
    </div>
  );
};

export default Saved;