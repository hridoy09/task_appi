"use client";

import React from "react";

import { getAuthUser } from "@/lib/api";

import CreatePost from "./CreatePost";
import FeedItem from "./FeedItem";
import FeedItemSkeleton from "./FeedItemSkeleton";
import useFeedList from "./_hooks/useFeedList";

const PostCard = () => {
  const { feeds, isLoading, error } = useFeedList();
  const currentUser = getAuthUser();

  const visibleFeeds = feeds.filter(
    (post) => post.privacy !== "private" || post.user_id === currentUser?.id
  );

  return (
    <>
      <CreatePost />

      {isLoading ? (
        <>
          <FeedItemSkeleton />
          <FeedItemSkeleton />
          <FeedItemSkeleton />
        </>
      ) : null}

      {error ? (
        <div className="alert alert-danger _mar_b16" role="alert">
          {error}
        </div>
      ) : null}

      {visibleFeeds.map((post) => {
        const likeKey = [
          post?.is_like ?? 0,
          post?.likes_count ?? 0,
          post?.like_users?.length ?? post?.liked_by_users?.length ?? 0,
        ].join("-");

        return <FeedItem key={`${post.id}-${likeKey}`} post={post} />;
      })}

    </>
  );
};

export default PostCard;
