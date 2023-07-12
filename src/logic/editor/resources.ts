import { Post, Resource } from "@/logic/editor/types";
import {
    addResource as uploadResource,
    checkResource,
    resourceUrl,
    removeResource,
} from "@/logic/aws";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addResource(post: Post, resource: Resource) {
    try {
        // Check if the resource already exists
        const resourceExists = await checkResource(resource.filename);

        // If the resource does not exist, proceed to add the resource to the database
        if (!resourceExists) {
            // Create a new resource in the database
            await prisma.resource.create({
                data: {
                    id: resource.ref,
                    title: resource.title,
                    filename: resource.filename,
                    url: resourceUrl(resource.filename),
                    type: resource.type,
                    description: resource.description,
                    post: {
                        connect: {
                            id: post.id,
                        },
                    },
                },
            });

            // Upload the file associated with the resource
            await uploadResource(resource.filename, resource.data);
        } else {
            // If the resource already exists, throw a specific error
            throw new Error(`Resource ${resource.filename} already exists.`);
        }
    } catch (error) {
        // General error handling: if any part of the process fails, throw a generic error
        if (error instanceof Error) {
            throw new Error(`Failed to add resource: ${error.message}`);
        } else {
            throw new Error("An unknown error occurred while adding the resource.");
        }
    }
}

export async function deleteResource(resource: Resource) {
    try {
        // Attempt to delete the resource from the S3 bucket
        const deleteSuccess = await removeResource(resource.filename);

        // If the deletion from the bucket was successful, proceed to delete the resource from the database
        if (deleteSuccess) {
            await prisma.resource.delete({
                where: {
                    id: resource.ref,
                },
            });
        } else {
            // If deletion from S3 bucket fails, throw a specific error
            throw new Error(`Failed to delete resource ${resource.filename} from S3`);
        }
    } catch (error) {
        // General error handling: if any part of the process fails, throw a generic error
        if (error instanceof Error) {
            throw new Error(`Failed to delete resource: ${error.message}`);
        } else {
            throw new Error("An unknown error occurred while deleting the resource.");
        }
    }
}
