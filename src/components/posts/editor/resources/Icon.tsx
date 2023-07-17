import Image from "next/image";

const ResourceIcon = ({ icon, alt }: { icon: string; alt: string }) => {
    return (
        <div className="bg-gray-500 z-50 rounded-full drop-shadow-xl hover:brightness-90 hover:scale-110 transition-all duration-50 ease-in-out">
            <div className="h-6 w-6">
                <Image src={`/icons/${icon}.svg`} className="p-[2px]" alt={alt} fill />
            </div>
        </div>
    );
};

export default ResourceIcon;
