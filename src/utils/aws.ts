import {
	CopyObjectCommand,
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = {
	client: new S3Client({
		region: "us-east-2",
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
		},
	}),
	bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
	region: "us-east-2",

	resourceUrl: (key: string) =>
		`https://${s3.bucket}.s3.${s3.region}.amazonaws.com/${key}`,

	addResource: async (
		filename: string,
		data: string,
		type: "b64" | "str",
		mimetype: string,
	) => {
		console.info(`Adding resource ${filename} to S3 bucket ${s3.bucket}.`);
		console.debug(`Resource data: ${data}`);
		console.debug(`Resource type: ${type}`);
		console.debug(`Resource mimetype: ${mimetype}`);

		// Create a request to upload the file to S3
		const request = new PutObjectCommand({
			Bucket: s3.bucket,
			Key: filename,
			Body: type === "b64" ? Buffer.from(data, "base64") : data,
			ContentType: mimetype,
			ContentEncoding: type === "b64" ? "base64" : undefined,
		});

		// Send the request and return whether it was successful
		const response = await s3.client.send(request);
		console.debug(`Response: ${response}`);

		return response.$metadata.httpStatusCode === 200;
	},

	checkResource: async (filename: string) => {
		console.info(
			`Checking if resource ${filename} exists in S3 bucket ${s3.bucket}.`,
		);

		// Check if the resource exists by making a fetch for it
		const objectUrl = s3.resourceUrl(filename);
		return (await fetch(objectUrl)).status == 200;
	},

	removeResource: async (filename: string) => {
		console.info(`Removing resource ${filename} from S3 bucket ${s3.bucket}.`);

		// Create a request to delete the resource from the S3 bucket
		const request = new DeleteObjectCommand({
			Bucket: s3.bucket,
			Key: filename,
		});

		// Send the request and return whether it was successful
		return (await s3.client.send(request)).$metadata.httpStatusCode === 204;
	},

	getResource: async (filename: string, encoding: string) => {
		console.info(`Fetching resource ${filename} from S3 bucket ${s3.bucket}.`);

		// Create a request to fetch the resource
		const request = new GetObjectCommand({
			Bucket: s3.bucket,
			Key: filename,
		});

		const data = await s3.client.send(request);

		if (encoding !== null && encoding !== undefined)
			return await data.Body?.transformToString(encoding);
		else return data.Body;
	},

	renameResource: async (oldName: string, newName: string) => {
		// Create a request to fetch the resource
		const request = new CopyObjectCommand({
			Bucket: s3.bucket,
			CopySource: oldName,
			Key: newName,
		});
		await s3.client.send(request);
		await s3.removeResource(oldName);
	},

	getResourceDownloadLink: async (filename: string) => {
		const command = new GetObjectCommand({
			Bucket: s3.bucket,
			Key: filename,
			ResponseContentType: "application/octet-stream",
			ResponseContentDisposition: "attachment",
		});
		const url = await getSignedUrl(s3.client, command, { expiresIn: 3600 });
		return url;
	},

	uploadFileLink: async (filename: string) => {
		const command = new PutObjectCommand({
			Bucket: s3.bucket,
			Key: filename,
		});
		return await getSignedUrl(s3.client, command, { expiresIn: 60 });
	},
};

if (s3.bucket === undefined || s3.client === undefined)
	throw Error("S3 client was not set up correctly");

export default s3;
