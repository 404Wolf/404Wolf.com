import AboutData from "@/components/about/AboutData";
import fs from "fs";
import path from "path";

export function getAboutData() {
    const aboutPath = path.join(process.cwd(), "public", "about.json");
    const aboutData = fs.readFileSync(aboutPath, "utf8");
    return JSON.parse(aboutData) as AboutData;
}

