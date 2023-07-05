import Image from "./Image";

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

    return (
        <div className="flex gap-3">
            {images.map((image) => (
                <Image
                    alt={image.alt}
                    src={image.src}
                    title={image.title}
                    resourceMap={resourceMap}
                />
            ))}
        </div>
    );
};

export default ImageBlock;
