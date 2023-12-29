import s3 from "@/utils/aws";
import type {NextApiRequest, NextApiResponse} from "next";
import {auth, unauthorized} from "@/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!(await auth(req, res)))
        return;
    const objectName = req.headers.object as string;

    if (!objectName) {
        res.status(400).json({
            status: "Error",
            message: "Missing object name.",
        });
        return;
    }

    switch (req.method) {
        case "GET": {
            const encoding = req.headers.encoding as string;

            const resource = await s3.getResource(objectName, encoding || "utf-8");
            if (!resource) {
                res.status(404).json({
                    status: "Error",
                    message: "Resource not found.",
                });
                return;
            }

            res.status(200).json({
                status: "Success",
                data: resource,
            });
            return;
        }
        case "POST": {
            const dataType = req.body["dataType"] as "b64" | "str";
            const data = req.body.data;
            const mimeType = (req.body.mimeType || "application/octet-stream") as string;

            if (!dataType || !data) {
                res.status(400).json({
                    status: "Error",
                    message: "Missing required field.",
                });
                return;
            }

            if (dataType === "str") await s3.addResource(objectName, data, "str", "text/plain");
            else await s3.addResource(objectName, data, "b64", mimeType);

            res.status(200).json({
                status: "Success",
            });
        }
    }
}
