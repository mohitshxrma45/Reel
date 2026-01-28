// src/pages/foodPartner/Profile.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiSun, FiMoon } from "react-icons/fi";

const Profile = ({ isDark, toggleTheme }) => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems || []);
      })
      .catch((err) => console.log("Fetch Error:", err));
  }, [id]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <p className="text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 shadow-md z-20"
        aria-label="Toggle theme"
      >
        {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/50 border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex gap-6 mb-8">
            <div className="relative w-24 h-24">
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover shadow-lg"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-linear-to-br from-orange-400 to-red-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {profile.name?.[0]?.toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {profile.name}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2 mb-3">
                📍 {profile.address}
              </p>
              <div className="flex gap-4 text-sm">
                <div className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg font-semibold">
                  {profile.totalMeals || 0} Meals
                </div>
                <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-semibold">
                  {profile.customersServed || 0} Customers
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-200 dark:border-slate-700 my-6" />

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Featured Dishes
          </h2>

          {videos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">No dishes listed yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((v) => (
                <div
                  key={v._id}
                  className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 aspect-9/16"
                >
                  <video
                    src={v.video}
                    loop
                    muted
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <button className="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-lg font-semibold hover:bg-white/30 transition-colors">
                      {v.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
