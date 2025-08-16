import { PostData } from "@/components/posts/ExtendedPostCard";
import { PrismaClient } from "@prisma/client";
import Body from "./Body";
import MainLayout from "@/layouts/MainLayout";
import { toTitleCase } from "@/utils/misc";
import postMetadata from "@/metadata/posts.json";
const prisma = new PrismaClient();

async function getPosts(type: string): Promise<PostData[]> {
	const posts = await prisma.post.findMany({
		where: { type: type.slice(0, -1) },
		include: { resources: true },
	});

	return posts
		.map((post) => {
			const cover = post.resources.filter((resource) =>
				post.covers.includes(resource.id),
			)[(Math.random() * post.covers.length) | 0];
			return {
				coverUrl: cover?.url || null,
				coverAlt: cover?.description || null,
				id: post.id,
				title: post.title || "",
				description: post.description || "",
				date: post.date || "",
				tags: post.tags,
				createdAt: post.createdAt,
				editedAt: post.editedAt,
			};
		})
		.sort(
			(post1: PostData, post2: PostData) =>
				new Date(post2.createdAt).getTime() -
				new Date(post1.createdAt).getTime(),
		);
}

const PostsIndexLayout = async ({
	params: { type },
}: {
	params: { type: string };
}) => {
	const posts = await getPosts(type);

	const typeDescriptions: { [key: string]: string } = postMetadata.descriptions;
	const typeDescription = postMetadata.descriptions.hasOwnProperty(type)
		? typeDescriptions[type]
		: `List of all ${type}s...`;

	return (
		<MainLayout
			title={toTitleCase(type)}
			headerChildren={<div className="markdown">{typeDescription}</div>}
		>
			<div className="-mt-3">
				<Body typeDescription={typeDescription} posts={posts} type={type} />
			</div>
		</MainLayout>
	);
};

export default PostsIndexLayout;
