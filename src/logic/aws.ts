import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = {
    client: new S3Client({ region: "us-east-2" }),
    bucket: "wolf-mermelstein-personal-website",
    region: "us-east-2",
};

export function resourceUrl(key: string) {
    return `https://${s3.bucket}.s3.${s3.region}.amazonaws.com/${key}`;
}

export async function addResource(filename: string, data: string | File) {
    // Add the resource to the S3 bucket
    const request = new PutObjectCommand({
        Body: data,
        Bucket: s3.bucket,
        Key: filename,
    });

    // Return successful-ness
    return (await s3.client.send(request)).$metadata.httpStatusCode === 200;
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
