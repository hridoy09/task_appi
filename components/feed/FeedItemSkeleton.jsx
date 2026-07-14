"use client";

import React from "react";

const FeedItemSkeleton = () => {
  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="d-flex align-items-center gap-2 _mar_b16">
          <div
            className="skeleton-block rounded-circle"
            style={{ width: 48, height: 48, flexShrink: 0 }}
          />
          <div className="flex-grow-1">
            <div
              className="skeleton-block rounded mb-2"
              style={{ width: "40%", height: 14 }}
            />
            <div
              className="skeleton-block rounded"
              style={{ width: "25%", height: 10 }}
            />
          </div>
        </div>

        <div
          className="skeleton-block rounded mb-2"
          style={{ width: "90%", height: 14 }}
        />
        <div
          className="skeleton-block rounded _mar_b16"
          style={{ width: "60%", height: 14 }}
        />

        <div
          className="skeleton-block rounded"
          style={{ width: "100%", height: 220 }}
        />
      </div>

      <style jsx>{`
        .skeleton-block {
          background: linear-gradient(90deg, #e8e8e8 25%, #f2f2f2 37%, #e8e8e8 63%);
          background-size: 400% 100%;
          animation: skeleton-shimmer 1.4s ease infinite;
        }
        @keyframes skeleton-shimmer {
          0% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default FeedItemSkeleton;
