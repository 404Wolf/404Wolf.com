import { Post, PrismaClient } from "@prisma/client";
import RSS from "rss";

const prisma = new PrismaClient();

export async function createRSSFeed() {
  const blogs = (
    await prisma.post.findMany({
      where: { type: "blog" },
      include: { resources: true }
    })
  ).filter(
    (post: Post) =>
      !post.tags.includes("hidden") &&
      !(post.title && post.title.includes("Recurse Checkin"))
  );

  const feed = new RSS({
    title: "Wolf Mermelstein's Blog",
    description:
      "A space for eclectic rants on tooling, tinkering, fullstack, Nix, and more; a trove of many adventures.",
    feed_url: "https://404wolf.com/rss.xml",
    site_url: "https://404wolf.com",
    image_url: "https://404wolf.com/images/profileMe.jpg",
    managingEditor: "wolfmermelstein@gmail.com (Wolf Mermelstein)",
    webMaster: "wolfmermelstein@gmail.com (Wolf Mermelstein)",
    copyright: `${new Date().getFullYear()} Wolf Mermelstein`,
    language: "en",
    categories: [
      "Technology",
      "Programming",
      "Computer Science",
      "Nix",
      "Coding"
    ],
    pubDate: new Date().toUTCString(),
    ttl: 60
  });

  blogs.forEach(post => {
    const postImageID = post.covers[0];
    const postResources: any = {};
    post.resources.forEach(resource => (postResources[resource.id] = resource));
    const postFilename = postResources[postImageID]?.filename;
    const resourceType = postFilename
      ? "image/" + postFilename.split(".").pop()
      : undefined;

    feed.item({
      title: post.title || "Untitled",
      description: post.description || "",
      url: `https://404wolf.com/posts/${post.type}/${post.id}`,
      guid: post.id,
      categories: post.tags,
      author: "Wolf Mermelstein",
      date: post.date
        ? new Date(post.date).toUTCString()
        : new Date(post.createdAt).toUTCString(),
      enclosure:
        post.covers.length > 0 && postFilename
          ? {
              url: `https://404wolf.com/resources/${postImageID}`,
              type: resourceType
            }
          : undefined
      // custom_elements: [{ "content:encoded": post.markdown }]
    });
  });

  return feed.xml({ indent: true });
}
