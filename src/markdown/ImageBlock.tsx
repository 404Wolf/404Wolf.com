"use client";

import Image from "@/markdown/Image";
import {useWindowWidth} from "@react-hook/window-size";
import {Carousel} from "react-responsive-carousel";

export interface ImageBlockProps {
    alts: string;
    srcs: string;
    titles: string;
    properties?: string;
    resourceMap?: { [key: string]: string };
}

interface Image {
    alt: string;
    src: string;
    title: string;
    properties: { [key: string]: string | number };
}

const ImageBlock = ({
                        alts,
                        srcs,
                        titles,
                        properties = "",
                        resourceMap = {},
                    }: ImageBlockProps) => {
    const screenWidth = useWindowWidth();

    const images: Image[] = alts.split(";").map((alt, index) => {
        const formattedProperties: { [key: string]: string | number } = {};
        if (properties)
            properties
                .split(";")
                [index].split(",")
                .forEach((property) => {
                    const [name, value] = property.split("=");
                    formattedProperties[name] = value;
                });

        return {
            alt: alt,
            src: srcs.split(";")[index],
            title: titles.split(";")[index],
            properties: formattedProperties,
        };
    });

    const imageElements = images.map((image, index) => (
        <Image
            alt={image.alt}
            key={index}
            src={image.src}
            title={image.title}
            label={image.alt}
            stylize={false}
            resourceMap={resourceMap}
        />
    ));

    return images.length == 2 ? (
        <div
            children={imageElements.map((element) => (
                <div className="w-full sm:w-[35%]">{element}</div>
            ))}
            className="clear-both flex gap-3 sm:gap-14 w-full justify-between sm:justify-center items-center my-4"
        />
    ) : (
        <Carousel
            children={imageElements.map((element, index) => <div key={index} className="p-2">{element}</div>)}
            centerMode={true}
            centerSlidePercentage={screenWidth < 600 ? 47 : 30}
            swipeable={true}
            emulateTouch={true}
            useKeyboardArrows={true}
            showThumbs={false}
            showStatus={false}
            stopOnHover={true}
            showArrows={false}
        />
    );
};

export default ImageBlock;
