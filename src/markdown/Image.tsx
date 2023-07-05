import NextImage from "next/image";

interface ImageProps {
    alt: string;
    src: string;
    title: string;
    nextImgSize?: [number, number];
    resourceMap?: { [key: string]: string };
}

const Image = ({
    alt,
    src,
    title,
    nextImgSize = [350, 350],
    resourceMap = {},
}: ImageProps) => {
    return (
        <NextImage
            alt={alt}
            src={resourceMap[src]}
            title={title}
            width={nextImgSize[0]}
            height={nextImgSize[1]}
        />
    );
};

export default Image;
