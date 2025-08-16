import BasicPostCardGrid from "@/components/posts/BasicPostCardGrid";
import MainLayout from "@/layouts/MainLayout";
import Greeter from "@/layouts/header/Greeter";
import Tile from "@/components/misc/Tiles/Tile";
import InlineButton from "@/components/misc/InlineButton";
import EditorArea from "@/components/editor/Editor";
import s3 from "@/utils/aws";
import HoverImageChange from "@/components/displays/HoverImageChange";
import { BasicPostData } from "@/components/posts/BasicPostCard";
import { PrismaClient } from "@prisma/client";
import { getAboutData } from "@/app/api/about/worker";
import { CSSProperties } from "react";
import Script from "next/script";

const prisma = new PrismaClient();

async function getFeaturedPosts() {
	return (
		await prisma.post.findMany({
			where: {
				tags: {
					has: "featured",
				},
			},
			include: {
				resources: true,
			},
		})
	).map(
		(post) =>
			({
				coverUrls: post.resources
					.filter((resource) => post.covers.includes(resource.id))
					.map((resource) => resource.url),
				coverAlts: post.resources
					.filter((resource) => post.covers.includes(resource.id))
					.map((resource) => resource.description),
				path: `/posts/${post.type}/${post.id}`,
				type: post.type,
				tags: post.tags,
				date: post.date!,
				title: post.title,
			}) as BasicPostData,
	);
}

async function getLastDatabaseUpdate() {
	const latestEditedPost = await prisma.post.findFirst({
		orderBy: {
			editedAt: "desc",
		},
		select: {
			editedAt: true,
		},
	});

	return latestEditedPost?.editedAt ?? new Date(0);
}

export default async function Home() {
	const basicAbout = (
		await s3.getResource(
			process.env.NEXT_PUBLIC_BASIC_ABOUT_OBJECT_NAME!,
			"utf-8",
		)
	)?.toString();
	const about = getAboutData();

	const featuredPosts = await getFeaturedPosts();

	const profileImageMe = "/resources/profileMeAlt.webp";
	const profileImageDog = "/resources/profileDog.webp";

	const headerChildren = (
		<div>
			<div className="hidden xs:block xs:h-32 xs:w-32 md:h-30 md:w-30 relative float-right ml-1 sm:ml-2">
				<HoverImageChange
					imageSrc1={profileImageMe}
					imageSrc2={profileImageDog}
				/>
			</div>

			<div className="markdown">
				<p className="mb-2">
					I'm a <InlineButton externalTo="https://case.edu">CWRU</InlineButton>{" "}
					student with a passion for developer tooling, coding and hacking, a
					love of strategy board games, and overall enjoyer of creating,
					designing, engineering, geeking, making, and figuring things out.
				</p>
				<p>
					Information, projects, contacts, my resume, and more can be found on
					this website. If you have any questions, feel free to{" "}
					<InlineButton externalTo={`mailto:${about.email}`}>
						email
					</InlineButton>
					!
				</p>
			</div>
		</div>
	);

	const heightStyle = {
		maxHeight: "600px",
		overflowY: "auto",
		overflowX: "clip",
	} as CSSProperties;

	return (
		<div>
			<div className="hidden lg:block origin-bottom-left fixed bottom-1 left-1 scale-50">
				<div className="rc-scout">
					<Script
						async
						defer
						src="https://www.recurse-scout.com/loader.js?t=1a9819584f6b47bb6e25db8483543a8f"
					/>
				</div>
			</div>

			<MainLayout title={<Greeter />} headerChildren={headerChildren}>
				<div className="flex flex-col gap-7">
					<div className="flex flex-col min-[520px]:flex-row gap-7 sm:gap-6">
						<div className="sm:basis-[30%] overflow-visible">
							<Tile title="Featured" className="overflow-visible">
								<div className="overflow-visible z-50" style={heightStyle}>
									<BasicPostCardGrid
										onlyFeatured
										posts={featuredPosts}
										showTags={["ongoing"]}
										gridConfig="grid-cols-2 min-[520px]:grid-cols-1"
									/>
								</div>
							</Tile>
						</div>

						<div className="basis-[75%]">
							<div>
								<Tile title="About">
									<div style={heightStyle}>
										<EditorArea
											addContents={false}
											startingText={basicAbout || "Loading..."}
											objectName={
												process.env.NEXT_PUBLIC_BASIC_ABOUT_OBJECT_NAME!
											}
										/>
									</div>
								</Tile>
							</div>

							<div className="hidden sm:block absolute bottom-0 -left-10 rotate-[20deg] bg-slate-300/30 px-2 py-[2px] rounded-xl">
								<p className="text-xs">
									Updated @{" "}
									{(await getLastDatabaseUpdate()).toLocaleDateString("en-US", {
										month: "numeric",
										day: "numeric",
										year: "numeric",
									})}
								</p>
							</div>
						</div>
					</div>
				</div>
			</MainLayout>
		</div>
	);
}
