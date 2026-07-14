"use client";

import React, { useState } from "react";

import { getAuthUser, getMediaUrl, postApi } from "@/lib/api";
import { formatTimeAgo } from "@/lib/time";

function HeartIcon({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill={filled ? "#ff4d6d" : "none"}
      stroke={filled ? "#ff4d6d" : "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 4.6c-1.5-1.8-4.1-2-5.9-.5L12 6.8 9.1 4.1c-1.8-1.5-4.4-1.3-5.9.5-1.8 2.1-1.6 5.2.4 7.1L12 20.3l8.4-8.6c2-1.9 2.2-5 .4-7.1Z" />
    </svg>
  );
}

function getInitialLikeState(post) {
  const isLiked = Boolean(post?.is_like);
  const likeCount = Number(post?.likes_count) || 0;
  return { isLiked, likeCount };
}

function getLikeUsers(post) {
  return post?.like_users || post?.liked_by_users || [];
}

const FeedItem = ({ post }) => {
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isLikePopupOpen, setIsLikePopupOpen] = useState(false);
  const initialLikeState = getInitialLikeState(post);
  const [isLiked, setIsLiked] = useState(initialLikeState.isLiked);
  const [likeCount, setLikeCount] = useState(initialLikeState.likeCount);
  const [likeUsers, setLikeUsers] = useState(() => getLikeUsers(post));
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const currentUser = getAuthUser();

  async function handleLikeToggle() {
    if (!post?.id || isLikeLoading) return;

    const previousLiked = isLiked;
    const previousCount = likeCount;
    const previousLikeUsers = likeUsers;
    const nextLiked = !isLiked;
    const nextCount = Math.max(0, likeCount + (nextLiked ? 1 : -1));
    const currentLikeUser = currentUser
      ? {
          id: currentUser.id,
          name: currentUser.name,
          image: currentUser.image,
        }
      : null;

    setIsLiked(nextLiked);
    setLikeCount(nextCount);

    if (currentLikeUser) {
      setLikeUsers((users) =>
        nextLiked
          ? users.some((user) => user.id === currentLikeUser.id)
            ? users
            : [currentLikeUser, ...users]
          : users.filter((user) => user.id !== currentLikeUser.id)
      );
    }

    setIsLikeLoading(true);

    try {
      await postApi(nextLiked ? "FEEDS_LIKE" : "FEEDS_UNLIKE", undefined, {
        params: post.id,
      });
    } catch (error) {
      setIsLiked(previousLiked);
      setLikeCount(previousCount);
      setLikeUsers(previousLikeUsers);
      console.error(error);
    } finally {
      setIsLikeLoading(false);
    }
  }

  const displayedLikeUsers = likeUsers.slice(0, 5);
  const totalLikeCount = likeUsers.length > 0 ? likeUsers.length : likeCount;

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <img
                src={getMediaUrl(post?.user?.image)}
                alt=""
                className="_post_img"
              />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">
                {post.user?.name}
              </h4>
              <p className="_feed_inner_timeline_post_box_para">
                {formatTimeAgo(post.created_at)} . <span>{post.privacy}</span>
              </p>
            </div>
          </div>
          <div className="_feed_inner_timeline_post_box_dropdown">
            <div className="_feed_timeline_post_dropdown">
              <button
                type="button"
                className="_feed_timeline_post_dropdown_link"
                aria-expanded={isTimelineOpen}
                onClick={() => setIsTimelineOpen((value) => !value)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="17"
                  fill="none"
                  viewBox="0 0 4 17"
                >
                  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                </svg>
              </button>
            </div>

            <div
              className={`_feed_timeline_dropdown _timeline_dropdown${isTimelineOpen ? " show" : ""}`}
            >
              <ul className="_feed_timeline_dropdown_list">
                <li className="_feed_timeline_dropdown_item">
                  <a href="#0" className="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="#1890FF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"
                        />
                      </svg>
                    </span>
                    Save Post
                  </a>
                </li>
                <li className="_feed_timeline_dropdown_item">
                  <a href="#0" className="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="#1890FF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5"
                        />
                      </svg>
                    </span>
                    Hide
                  </a>
                </li>
                <li className="_feed_timeline_dropdown_item">
                  <a href="#0" className="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="#1890FF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M8.25 3H3a1.5 1.5 0 00-1.5 1.5V15A1.5 1.5 0 003 16.5h10.5A1.5 1.5 0 0015 15V9.75"
                        />
                        <path
                          stroke="#1890FF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M13.875 1.875a1.591 1.591 0 112.25 2.25L9 11.25 6 12l.75-3 7.125-7.125z"
                        />
                      </svg>
                    </span>
                    Edit Post
                  </a>
                </li>
                <li className="_feed_timeline_dropdown_item">
                  <a href="#0" className="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="#1890FF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5"
                        />
                      </svg>
                    </span>
                    Delete Post
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {post.body ? (
          <h4 className="_feed_inner_timeline_post_title">{post.body}</h4>
        ) : null}

        {post.type === "event" && post.event_date ? (
          <p className="_feed_inner_timeline_post_box_para">
            Event date: {new Date(post.event_date).toLocaleDateString()}
          </p>
        ) : null}

        {post.link ? (
          <p className="_feed_inner_timeline_post_box_para">
            <a href={post.link} target="_blank" rel="noreferrer">
              {post.link}
            </a>
          </p>
        ) : null}

        {post.media_type === "image" && post.media_path ? (
          <div className="_feed_inner_timeline_image">
            <img
              src={getMediaUrl(post.media_path)}
              alt=""
              className="_time_img"
            />
          </div>
        ) : null}
      </div>

      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <button
          type="button"
          className="_feed_inner_timeline_total_reacts_image"
          onClick={() => setIsLikePopupOpen(true)}
          aria-label={`Show ${totalLikeCount} users who liked this post`}
        >
          {displayedLikeUsers.map((user, index) => (
            <img
              key={`${user?.id || index}-${index}`}
              src={getMediaUrl(user?.image) || "/assets/images/Avatar.png"}
              alt={user?.name || "User"}
              className={
                index === 0
                  ? "_react_img1"
                  : index < 3
                    ? "_react_img"
                    : "_react_img _rect_img_mbl_none"
              }
            />
          ))}
          <p className="_feed_inner_timeline_total_reacts_para">{totalLikeCount}</p>
        </button>

        <div className="_feed_inner_timeline_total_reacts_txt">
          <p className="_feed_inner_timeline_total_reacts_para1">
            <span>{post.comments_count} </span>
            Comment
          </p>
          <p className="_feed_inner_timeline_total_reacts_para2">
            <span>{post.shares_count} </span>
            Share
          </p>
        </div>
      </div>

      {isLikePopupOpen ? (
        <div
          className="_like_popup_overlay"
          onClick={() => setIsLikePopupOpen(false)}
          role="presentation"
        >
          <div
            className="_like_popup_card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Users who liked this post"
          >
            <div className="d-flex align-items-center justify-content-between _mar_b16">
              <h4 className="_like_popup_title">Likes</h4>
              <button
                type="button"
                className="_like_popup_close"
                onClick={() => setIsLikePopupOpen(false)}
                aria-label="Close likes popup"
              >
                x
              </button>
            </div>

            <div className="_like_popup_list">
              {likeUsers.map((user) => (
                <div key={user.id} className="_like_popup_user">
                  <img
                    src={getMediaUrl(user.image) || "/assets/images/Avatar.png"}
                    alt={user.name}
                    className="_like_popup_user_img"
                  />
                  <div className="_like_popup_user_txt">
                    <h5>{user.name}</h5>
                  </div>
                </div>
              ))}

              {!likeUsers.length ? (
                <p className="_like_popup_empty">No likes yet.</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <div className="_feed_inner_timeline_reaction">
        <button
          type="button"
          className="_feed_inner_timeline_reaction_emoji _feed_reaction"
          onClick={handleLikeToggle}
          disabled={isLikeLoading}
          aria-pressed={isLiked}
          aria-label={isLiked ? "Unlike post" : "Like post"}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <HeartIcon filled={isLiked} />
              {isLiked ? "Unlike" : "Like"}
            </span>
          </span>
        </button>

        <button type="button" className="_feed_inner_timeline_reaction_comment _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg
                className="_reaction_svg"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="#000"
                  d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"
                />
                <path
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.938 9.313h7.125M10.5 14.063h3.563"
                />
              </svg>
              Comment
            </span>
          </span>
        </button>

        <button type="button" className="_feed_inner_timeline_reaction_share _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg
                className="_reaction_svg"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="21"
                fill="none"
                viewBox="0 0 24 21"
              >
                <path
                  stroke="#000"
                  strokeLinejoin="round"
                  d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"
                />
              </svg>
              Share
            </span>
          </span>
        </button>
      </div>

      <div className="_feed_inner_timeline_cooment_area">
        <div className="_feed_inner_comment_box">
          <form className="_feed_inner_comment_box_form">
            <div className="_feed_inner_comment_box_content">
              <div className="_feed_inner_comment_box_content_image">
                <img
                  src="/assets/images/comment_img.png"
                  alt=""
                  className="_comment_img"
                />
              </div>
              <div className="_feed_inner_comment_box_content_txt">
                <textarea
                  className="form-control _comment_textarea"
                  placeholder="Write a comment"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        ._feed_inner_timeline_total_reacts_image {
          background: transparent;
          border: 0;
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 0;
        }

        ._like_popup_overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          z-index: 9999;
        }

        ._like_popup_card {
          width: min(100%, 420px);
          max-height: min(70vh, 560px);
          overflow: hidden;
          border-radius: 18px;
          background: #fff;
          box-shadow: 0 24px 80px rgba(15, 23, 42, 0.22);
          padding: 18px;
        }

        ._like_popup_title {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: #111827;
        }

        ._like_popup_close {
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 999px;
          background: #f3f4f6;
          color: #111827;
          font-size: 22px;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        ._like_popup_list {
          display: grid;
          gap: 12px;
          overflow: auto;
          max-height: calc(70vh - 70px);
          padding-right: 4px;
        }

        ._like_popup_user {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 14px;
          background: #f9fafb;
        }

        ._like_popup_user_img {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          object-fit: cover;
          flex: 0 0 auto;
        }

        ._like_popup_user_txt h5 {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          color: #111827;
        }

        ._like_popup_empty {
          margin: 0;
          color: #6b7280;
          text-align: center;
          padding: 24px 0;
        }
      `}</style>
    </div>
  );
};

export default FeedItem;
