import { Prisma, PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const postsWithResources = Prisma.validator<Prisma.PostArgs>()({
  include: { resources: true },
});
type PostsWithResources = Prisma.PostGetPayload<typeof postsWithResources>;

const prisma = new PrismaClient();
const s3 = {
  client: new S3Client({ region: "us-east-2" }),
  bucket: "wolf-mermelstein-personal-website",
  region: "us-east-2",
};
const config = {
  overwriteS3Files: true,
};

function getPosts(type: string) {
  return JSON.parse(readFileSync(`./posts/${type}s/posts.json`, "utf-8")).map(
    (postId: string) =>
      JSON.parse(readFileSync(`./posts/${type}s/${postId}/post.json`, "utf-8")),
  );
}

(async () => {
  const posts = getPosts("blog");

  for (const post of posts) {
    // Log that the post is being processed.
    console.log(`Processing post ${post.id}...`);

    for (const resource of post.resources) {
      // Log that the resource is being processed.
      console.log(`Processing resource ${resource.title}...`);
      console.log(resource);

      // First check to see if the resource is already in the s3. If a fetch for the
      // resource does not result in a 200 status code, it's not in the bucket yet.
      const uploaded = (await fetch(resource.url)).status == 200;
      if (!uploaded || config.overwriteS3Files) {
        const data =
          resource.type === "markdown"
            ? readFileSync(`./posts/${post.type}s/${post.id}/post.md`, "utf-8")
            : readFileSync(
                `./posts/${post.type}s/${post.id}/resources/${resource.filename}`,
              );
        const mimetype =
          resource.type === "markdown" ? "text/plain" : undefined;

        // Add the resource to the S3 bucket
        const request = new PutObjectCommand({
          Body: data,
          Bucket: s3.bucket,
          Key: resource.filename,
          ContentType: mimetype,
        });

        // Make sure that the request to upload the resource resulted in the
        // resource successfully being uploaded.
        if ((await s3.client.send(request)).$metadata.httpStatusCode !== 200)
          throw new Error(
            `Resource ${resource.name} was unable to be uploaded.`,
          );

        // Log that the upload was successful
        console.log("Successfully uploaded resource.");
      } else {
        console.log("Resource was already found in bucket.");
      }

      // Add the resource to the database.
      try {
        await prisma.resource.create({ data: resource });
        console.log("Added resource to database.");
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError)
          console.log("Resource already found in database.");
      }
    }

    try {
      const postData = post;
      delete postData.resources;
      await prisma.post.create({ data: post });
      console.log("Added post to database.");
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        console.log("Post already found in database.");
      else throw error;
    }
  }

  const uploadFile = async (filename: string) => {
    const file = readFileSync(`./extended-about.md`, "utf-8");
    const fileUploadRequest = new PutObjectCommand({
      Body: file,
      Bucket: s3.bucket,
      Key: process.env.NEXT_PUBLIC_EXTENDED_ABOUT_OBJECT_NAME!,
      ContentType: "text/plain",
    });

    if (
      (await s3.client.send(fileUploadRequest)).$metadata.httpStatusCode !== 200
    )
      throw new Error("File was unable to be uploaded.");
    else console.log("Successfully uploaded file.");
  };

  // Upload the basic about markdown.
  await uploadFile(process.env.NEXT_PUBLIC_BASIC_ABOUT_OBJECT_NAME!);

  // Upload the extended about markdown.
  await uploadFile(process.env.NEXT_PUBLIC_EXTENDED_ABOUT_OBJECT_NAME!);

  // Upload the resume.
  await uploadFile(process.env.NEXT_PUBLIC_RESUME_OBJECT_NAME!);
})();
