"use client";

import React, { useMemo } from "react";

import { getAuthUser } from "@/lib/api";

import CreatePost from "./CreatePost";
import FeedItem from "./FeedItem";
import FeedItemSkeleton from "./FeedItemSkeleton";
import useFeedList from "./_hooks/useFeedList";

const PostCard = () => {
  const { feeds, isLoading, error, refetch } = useFeedList();
  const currentUser = getAuthUser();

  const visibleFeeds = useMemo(() => {
    const filtered = feeds.filter(
      (post) => post.privacy !== "private" || post.user_id === currentUser?.id
    );

    return [...filtered].sort((a, b) => {
      const timeA = Number.isFinite(Date.parse(a?.created_at))
        ? Date.parse(a.created_at)
        : 0;
      const timeB = Number.isFinite(Date.parse(b?.created_at))
        ? Date.parse(b.created_at)
        : 0;

      return timeB - timeA;
    });
  }, [feeds, currentUser?.id]);

  return (
    <>
      <CreatePost onPostCreated={refetch} />

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
