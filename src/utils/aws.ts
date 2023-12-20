import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
    CopyObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = {
    client: new S3Client({ region: "us-east-2" }),
    bucket: process.env.AWS_BUCKET_NAME,
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
        Bucket: s3.bucket,
        Key: filename,
        Body: type === "b64" ? Buffer.from(data, "base64") : data,
        ContentType: mimetype,
        ContentEncoding: type === "b64" ? "base64" : undefined,
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
        Key: filename,
    });
    const data = await s3.client.send(request);
    return data.Body?.transformToString(encoding);
}

export async function renameResource(oldName: string, newName: string) {
    // Create a request to fetch the resource
    const request = new CopyObjectCommand({
        Bucket: s3.bucket,
        CopySource: oldName,
        Key: newName,
    });
    await s3.client.send(request);
    await removeResource(oldName);
}

export async function getResourceDownloadLink(filename: string) {
    const command = new GetObjectCommand({
        Bucket: s3.bucket,
        Key: filename,
        ResponseContentType: "application/octet-stream",
        ResponseContentDisposition: "attachment",
    });
    const url = await getSignedUrl(s3.client, command, { expiresIn: 3600 });
    return url;
}

export async function uploadFileLink(filename: string) {
    const command = new PutObjectCommand({
        Bucket: s3.bucket,
        Key: filename,
    });
    return await getSignedUrl(s3.client, command, { expiresIn: 60 });
}
