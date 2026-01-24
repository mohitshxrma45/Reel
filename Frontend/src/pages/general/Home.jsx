import React, { useEffect, useRef, useState } from "react";
import "../../styles/reels.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BsSave } from "react-icons/bs";
import ReelCard from "../../components/ReelCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const containerRef = useRef(null);

  const getCount = (val) => {
    if (Array.isArray(val)) return val.length;
    if (typeof val === "number") return val;
    return 0;
  };

  // 🔥 Fetch all videos
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((res) => setVideos(res.data.foodItems))
      .catch((err) => console.log("API Error:", err));
  }, []);

  // 🎥 Auto play / pause on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reels = container.querySelectorAll(".reel");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector("video");
          if (!video) return;

          if (entry.intersectionRatio > 0.6) {
            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    reels.forEach((r) => obs.observe(r));
    return () => obs.disconnect();
  }, [videos]);

  // ❤️ Like API
  async function likeVideo(item) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      );

      if (response.data.like) {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: (v.likeCount ?? 0) + 1 } : v
          )
        );
        setLiked((prev) => ({ ...prev, [item._id]: true }));
      } else {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: Math.max(0, (v.likeCount ?? 1) - 1) } : v
          )
        );
        setLiked((prev) => ({ ...prev, [item._id]: false }));
      }
    } catch (err) {
      console.log("Like error:", err);
    }
  }

  // 🔖 Save API
  async function saveVideo(item) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      );

      if (response.data.save) {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, savesCount: (v.savesCount ?? 0) + 1 } : v
          )
        );
        setSaved((prev) => ({ ...prev, [item._id]: true }));
      } else {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) } : v
          )
        );
        setSaved((prev) => ({ ...prev, [item._id]: false }));
      }
    } catch (err) {
      console.log("Save error:", err);
    }
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

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <Link to="/" className="nav-item active">
          <FaHome />
        </Link>
        <Link to="/saved" className="nav-item">
          <BsSave />
        </Link>
      </div>
    </div>
  );
};

export default Home;