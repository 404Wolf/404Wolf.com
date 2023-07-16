import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = {
    client: new S3Client({ region: "us-east-2" }),
    bucket: "wolf-mermelstein-personal-website",
    region: "us-east-2",
};

export function resourceUrl(key: string) {
    return `https://${s3.bucket}.s3.${s3.region}.amazonaws.com/${key}`;
}

export async function addResource(
    filename: string,
    data: string,
    type: "b64" | "str",
    mimetype: string
) {
    // Create a request to upload the file to S3
    const request = new PutObjectCommand({
        Bucket: "wolf-mermelstein-personal-website",
        Key: filename,
        Body: type === "b64" ? Buffer.from(data, "base64") : data,
        ContentType: mimetype,
    });

    // Send the request and return whether it was successful
    const response = await s3.client.send(request);

    return response.$metadata.httpStatusCode === 200;
}

export async function checkResource(filename: string) {
    // Check if the resource exists by making a fetch for it
    const objectUrl = resourceUrl(filename);
    return (await fetch(objectUrl)).status == 200;
}

export async function removeResource(filename: string) {
    // Create a request to delete the resource from the S3 bucket
    const request = new DeleteObjectCommand({
        Bucket: s3.bucket,
        Key: filename,
    });

    // Send the request and return whether it was successful
    return (await s3.client.send(request)).$metadata.httpStatusCode === 204;
}

export async function getResource(filename: string, encoding: string) {
    // Create a request to fetch the resource
    const request = new GetObjectCommand({
        Bucket: s3.bucket,
        Key: filename
    })
    const data = await s3.client.send(request)
    return data.Body?.transformToString(encoding)
}