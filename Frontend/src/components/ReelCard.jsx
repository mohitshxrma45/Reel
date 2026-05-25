// src/components/ReelCard.jsx
import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaEye, FaMapMarkerAlt } from "react-icons/fa"
import { calculateDistance, formatDistance, formatFoodCost } from "../utils/distance"

const ReelCard = ({ 
  item, 
  liked, 
  saved, 
  onLike, 
  onSave, 
  getCount,
  userLocation,
  onView 
}) => {
  const videoRef = useRef(null)
  const hasViewed = useRef(false)
  const [partnerLocation, setPartnerLocation] = useState(null)
  const [distance, setDistance] = useState(null)
  const [partnerName, setPartnerName] = useState('')
  const [partnerId, setPartnerId] = useState('')

  useEffect(() => {
    if (item.FoodPartner) {
      const partner = typeof item.FoodPartner === 'object' ? item.FoodPartner : null
      if (partner) {
        setPartnerName(partner.name || '')
        setPartnerId(partner._id || partner.toString())
        if (partner.location && partner.location.coordinates) {
          const [longitude, latitude] = partner.location.coordinates
          setPartnerLocation({ latitude, longitude })
        }
      } else {
        // If it's a string (ObjectId)
        setPartnerId(item.FoodPartner.toString())
      }
    }
  }, [item.FoodPartner])

  useEffect(() => {
    if (userLocation && partnerLocation) {
      const dist = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        partnerLocation.latitude,
        partnerLocation.longitude
      )
      setDistance(dist)
    }
  }, [userLocation, partnerLocation])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.7 && !hasViewed.current) {
            hasViewed.current = true
            if (onView) {
              onView(item._id)
            }
          }
        })
      },
      { threshold: 0.7 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [item._id, onView])

  return (
    <section className="relative h-screen w-full snap-start flex items-center justify-center bg-black overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={item.video}
        muted
        loop
        playsInline
      />

      {/* Partner Name - Top Left */}
      <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <div className="w-6 h-6 rounded-full bg-gradient-to-red from-orange-500 to-red-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {partnerName ? partnerName.charAt(0).toUpperCase() : '?'}
            </span>
          </div>
          <span className="text-white text-sm font-medium">
            {partnerName || 'Food Partner'}
          </span>
        </div>
      </div>

      {/* Distance - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        {distance !== null ? (
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <FaMapMarkerAlt size={12} className="text-orange-400" />
            <span className="text-white text-sm font-medium">
              {formatDistance(distance)}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <FaMapMarkerAlt size={12} className="text-slate-400" />
            <span className="text-slate-300 text-sm">Nearby</span>
          </div>
        )}
      </div>

      {/* Right Side - Like, Save, Visit Store */}
      <div className="absolute right-3 bottom-32 z-20 flex flex-col items-center gap-5">
        {/* Like */}
        <button onClick={() => onLike(item)} className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
            {liked[item._id] ? (
              <FaHeart className="text-red-500" size={24} />
            ) : (
              <FaRegHeart className="text-white" size={24} />
            )}
          </div>
          <span className="text-white text-xs font-medium">{item.likeCount ?? 0}</span>
        </button>

        {/* Save */}
        <button onClick={() => onSave(item)} className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
            {saved[item._id] ? (
              <FaBookmark className="text-cyan-400" size={24} />
            ) : (
              <FaRegBookmark className="text-white" size={24} />
            )}
          </div>
          <span className="text-white text-xs font-medium">{item.savesCount ?? 0}</span>
        </button>

        {/* Visit Store - BELOW Like/Save */}
        <Link
          to={"/food-partner/" + partnerId}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
            <span className="text-white text-lg">→</span>
          </div>
          <span className="text-white text-xs font-medium">Store</span>
        </Link>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-8 left-4 right-16 z-20">
        {/* Food Name & Price & Views */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h3 className="text-white font-bold text-xl drop-shadow-lg">{item.name}</h3>
            <span className="bg-orange-500 text-white font-bold px-3 py-1 rounded-full">
              {formatFoodCost(item.foodCost)}
            </span>
          </div>
          <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            <FaEye size={12} className="text-slate-300" />
            <span className="text-white text-xs">{item.views || 0}</span>
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-white/90 text-sm mb-3 line-clamp-2">{item.description}</p>
        )}
      </div>

      {/* Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-tranparent from-black/60 to-transparent pointer-events-none" />
    </section>
  )
}

export default ReelCard