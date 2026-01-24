import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideo(response.data.foodPartner.foodItems || []);
      })
      .catch((err) => console.log("Fetch Error:", err));
  }, [id]);

  return (
    <div className="profile-shell">
      <div className="profile-card">

        {/* ===== TOP ===== */}
        <header className="profile-top">
         
         
          <img className="avatar" src="https://plus.unsplash.com/premium_photo-1767883339990-1a3e9676a9c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2QlMjBwZXJzb258ZW58MHx8MHx8fDA%3D" alt="" />
         


          <div className="meta">
            <div className="chip name">{profile?.name}</div>
            <div className="chip address">{profile?.address}</div>
          </div>
        </header>

        {/* ===== STATS ===== */}
        <section className="profile-stats">
          <div className="stat">
            <div className="label">Total Meals</div>
            <div className="value">{profile?.totalMeals || 0}</div>
          </div>
          <div className="stat">
            <div className="label">Customers Served</div>
            <div className="value">{profile?.customersServed || 0}</div>
          </div>
        </section>

        <hr className="divider" />

        {/* ===== VIDEOS GRID ===== */}
        <section className="videos-grid">
          {video.map((v) => (
            <div key={v._id} className="video-tile">
              <video
                src={v.video}
                loop
                muted
                autoPlay
                playsInline
                className="food-video"
              />
            </div>
          ))}
        </section>
      </div>

      {/* ===== CSS ===== */}
      <style>{`
        .profile-shell {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: #000;
        }

        .profile-card {
          width: 100%;
          max-width: 420px;
          height: 90vh;
          background: rgba(255,255,255,0.03);
          border-radius: 14px;
          padding: 16px;
          color: #fff;
          display: flex;
          flex-direction: column;
          font-family: system-ui;
        }

        .profile-top {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 12px;
        }

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0a5, #063);
          object-fit: cover;
          overflow: hidden;
          border: 3px solid #00ff88;

        }

        .chip {
          padding: 6px 10px;
          border-radius: 8px;
          background: rgba(0,0,0,0.6);
          font-weight: 600;
        }

        .chip.name {
          font-size: 18px;
          color: #fff;
        }

        .chip.address {
          font-size: 14px;
          color: #ccc;
        }

        .profile-stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 10px;
        }

        .stat .label {
          font-size: 12px;
          opacity: 0.7;
        }

        .stat .value {
          font-size: 18px;
          font-weight: 700;
        }

        .divider {
          border: none;
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin-bottom: 10px;
        }

        /* === GRID === */
        .videos-grid {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          padding-right: 4px;
        }

        .video-tile {
          width: 100%;
          .video-tile {
  aspect-ratio: 9 / 16;   /* 🔥 Reel ratio */
}

          border-radius: 8px;
          overflow: hidden;
          background: rgba(255,255,255,0.05);
        }

        .food-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Scrollbar hidden horizontal */
        .videos-grid::--webkit-scrollbar-horizontal {
          display: none;
        }

        /* Responsive card width only */
        @media (min-width: 768px) {
          .profile-card {
            max-width: 700px;
          }
        }

        @media (min-width: 1024px) {
          .profile-card {
            max-width: 900px;
            height: 85vh;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
