import Tile from "../misc/Tile";
import { useState } from "react";

const BasicAbout = ({ fixedTitleWidth="" }: { fixedTitleWidth?: string }) => {
    const [ aboutMe, setAboutMe ] = useState("");

    return (
        <Tile title="About" fixedTitleWidth={fixedTitleWidth}>
            <div className="pt-2 sm:pt-1 text-left indent-10 markdown">
                <p className="mb-1">
                    I've always been an impulsive tinkerer. An eager explorer and fervent maker. So, naturally, I'm a highly project based person—from my 3D printed avocado journey to a massive hydroponic basic farm embarkment to a Minecraft username autoclaiming business. While I was originally interested in art, and loved dumping ideas into the endless canvas of graphic design, 3D modeling, and crafty projects, code's been my true, inevitable passion.
                </p>

                <p className="mb-1">
                    Being able to apply my ingenuity, creativity, and curiosity into a virtually limitless realm has been endlessly enticing. With code, there's really no end to discovery, and there never will be. So while one day I may be scouring the intricacies of QT, another I may be self-teaching React to build a portfolio website. But, while code's provided countless enticing chances for complex problem-solving and conscientious strategizing, it's the truly infinite opportunities for interdisciplinary collaboration and meaningful exploration that excite me most.
                </p>

                <p>
                    This website is designed to be a space to showcase my various eclectic journeys, with pages presenting some of my favorite projects with detailed descriptions, and eclectic blogs to document my far-ranging adventures. The site's still a work in progress, but I'll be working on updating it regularly. If you're interested in any of my work, or just want to chat, feel free to reach out to any of the above contacts!
                </p>
            </div>
        </Tile>
    );
}
 
export default BasicAbout;
