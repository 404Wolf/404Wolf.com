"use client";

import BasicPostCard, { BasicPostData } from "@/components/posts/BasicPostCard";

interface BasicPostCardGridProps {
  posts: (BasicPostData | null)[];
  onlyFeatured?: boolean;
  tags?: string[];
  minAmount?: number;
  gridConfig?: string;
  showTags?: string[];
}

const BasicPostCardGrid = ({
  posts,
  minAmount,
  onlyFeatured,
  showTags,
  tags = [],
  gridConfig = "grid grid-cols-2",
}: BasicPostCardGridProps) => {
  if (onlyFeatured) {
    posts = posts.filter((post) => post && post.tags.includes("featured"));
  }

  if (minAmount) {
    // Fill projects up with dummy projects to make the grid look nice
    // We want a minimum of 20 projects
    while (posts.length < minAmount) {
      posts.push(null);
    }
  }

  return (
    <div
      className={`pt-3 sm:pt-2 grid ${gridConfig} justify-between items-center gap-1 sm:gap-2`}
    >
      {posts.map((post, index) => {
        if (post === null) {
          return <BasicPostCard key={index} />;
        } else {
          return (
            <BasicPostCard
              post={post}
              key={index}
              tags={[
                ...post.tags.filter((tag) => showTags?.includes(tag)),
                ...tags,
              ]}
            />
          );
        }
      })}
    </div>
  );
};

export default BasicPostCardGrid;
