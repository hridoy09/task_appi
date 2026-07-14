import React from "react";

import StoryCard from "@/components/feed/StoryCard";
import PostCard from "@/components/feed/PostCard";

export default function Page() {
  return (
    <>
      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <div className="_layout_middle_wrap">
          <div className="_layout_middle_inner">
            <StoryCard />
            <PostCard />
          </div>
        </div>
      </div>
    </>
  );
}
