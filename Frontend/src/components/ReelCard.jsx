// src/components/ReelCard.jsx
import React from "react"
import { Link } from "react-router-dom"
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa"

const ReelCard = ({ item, liked, saved, onLike, onSave, getCount }) => {
  return (
    <section className="relative h-screen w-full snap-start flex items-center justify-center bg-black overflow-hidden">
      <video
        className="w-full h-full object-cover"
        src={item.video}
        muted
        loop
        playsInline
      />

      <div className="absolute top-4 left-4 z-20 backdrop-blur-md bg-black/40 rounded-full px-4 py-2">
        <h3 className="text-white font-semibold text-sm truncate max-w-xs">{item.name}</h3>
      </div>

      <div className="absolute right-4 bottom-1/3 z-20 flex flex-col gap-4">
        <button
          onClick={() => onLike(item)}
          className="flex flex-col items-center gap-1 backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-2xl p-2 transition-all duration-200 transform hover:scale-110 active:scale-95"
        >
          {liked[item._id] ? (
            <FaHeart className="text-red-500" size={20} />
          ) : (
            <FaRegHeart className="text-white" size={20} />
          )}
          <span className="text-white text-xs font-semibold">{item.likeCount ?? 0}</span>
        </button>

        <button
          onClick={() => onSave(item)}
          className="flex flex-col items-center gap-1 backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-2xl p-2 transition-all duration-200 transform hover:scale-110 active:scale-95"
        >
          {saved[item._id] ? (
            <FaBookmark className="text-cyan-400" size={20} />
          ) : (
            <FaRegBookmark className="text-white" size={20} />
          )}
          <span className="text-white text-xs font-semibold">{item.savesCount ?? 0}</span>
        </button>
      </div>

      <div className="absolute bottom-24 left-4 z-20 max-w-xs">
        <div className="backdrop-blur-md bg-black/40 rounded-2xl p-3 mb-3">
          <p className="text-white text-sm line-clamp-2">{item.description}</p>
        </div>
        <Link
          to={"/food-partner/" + item.FoodPartner}
          className="inline-block px-6 py-2 bg-linear-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-full text-sm transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Visit Store
        </Link>
      </div>
    </section>
  )
}

export default ReelCard