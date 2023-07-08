import { ReactElement } from "react-markdown/lib/react-markdown";
import Image from "@/markdown/Image";
import { Carousel } from "react-responsive-carousel";

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
        <div className="w-full sm:w-[35%]">
            <Image
                alt={image.alt}
                key={index}
                src={image.src}
                title={image.title}
                label={image.alt}
                stylize={false}
                resourceMap={resourceMap}
            />
        </div>
    ));

    return images.length == 2 ? (
        <div
            children={imageElements}
            className="flex gap-3 sm:gap-14 w-full justify-between sm:justify-center items-center my-4"
        />
    ) : (
        <Carousel children={imageElements} />
    );
};

export default ImageBlock;
