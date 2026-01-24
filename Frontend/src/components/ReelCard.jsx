import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaCommentDots } from "react-icons/fa";

const ReelCard = ({ item, liked, saved, onLike, onSave, getCount }) => {
  return (
    <section className="reel">
      {/* Video */}
      <video
        className="reel-video"
        src={item.video}
        muted
        loop
        playsInline
      />

      {/* Top Name */}
      <div className="reel-top">
        <h3>{item.name}</h3>
      </div>


      {/* Right Actions */}
      <div className="reel-actions">
        {/* Like */}
        <div className="icon-box" onClick={() => onLike(item)}>
          {liked[item._id] ? <FaHeart className="icon liked" /> : <FaRegHeart className="icon" />}
          <span className="count">{item.likeCount ?? 0}</span>
        </div>

        {/* Save */}
        <div className="icon-box" onClick={() => onSave(item)}>
          {saved[item._id] ? <FaBookmark className="icon saved" /> : <FaRegBookmark className="icon" />}
          <span className="count">{item.savesCount ?? 0}</span>
        </div>

        {/* Comment */}
        {/* <div className="icon-box">
          <FaCommentDots className="icon" />
          <span className="count">{getCount(item.comments)}</span>
        </div> */}
      </div>

      {/* Description */}
      <div className="reel-info">
        <div className="reel-desc-box">
          <p>{item.description}</p>

          <Link
            to={"/food-partner/" + item.FoodPartner}
            className="visit-store-btn"
          >
            Visit Store
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReelCard;