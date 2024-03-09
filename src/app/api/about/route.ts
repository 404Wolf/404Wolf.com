import AboutData from "@/components/about/AboutData";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export function getAboutData() {
    const aboutPath = path.join(process.cwd(), "public", "about.json");
    const aboutData = fs.readFileSync(aboutPath, "utf8");
    return JSON.parse(aboutData) as AboutData;
}

export function GET(req: NextApiRequest) {
    return NextResponse.json(getAboutData());
}
