import { Post, PrismaClient } from "@prisma/client";
import RSS from "rss";

const prisma = new PrismaClient();

export async function createRSSFeed() {
  const blogs = (
    await prisma.post.findMany({ where: { type: "blog" } })
  ).filter(
    (post: Post) =>
      !post.tags.includes("hidden") &&
      !(post.title && post.title.includes("Recurse Checkin"))
  );
  const feed = new RSS({
    title: "Wolf Mermelstein's Blog",
    description:
      "A space for eclectic rants on tooling, tinkering, fullstack, and, Nix, and more; a trove of many adventures.",
    feed_url: "https://404wolf.com/rss.xml",
    site_url: "https://404wolf.com",
    image_url: "https://404wolf.com/images/profileMe.jpg",
    managingEditor: "Wolf Mermelstein",
    webMaster: "Wolf Mermelstein",
    copyright: `${new Date().getFullYear()} Wolf Mermelstein`,
    language: "en",
    categories: ["Technology", "Programming", "Computer Science"],
    pubDate: new Date().toUTCString(),
    ttl: 60
  });

  blogs.forEach(post => {
    feed.item({
      title: post.title || "Untitled",
      description: post.description || "",
      url: `https://404wolf.com/posts/${post.type}/${post.id}`,
      guid: post.id,
      categories: post.tags,
      author: "Wolf Mermelstein",
      date: post.date ? new Date(post.date) : post.createdAt,
      enclosure: post.covers.length > 0 ? { url: post.covers[0] } : undefined
      // custom_elements: [{ "content:encoded": post.markdown }]
    });
  });

  return feed.xml({ indent: true });
}
