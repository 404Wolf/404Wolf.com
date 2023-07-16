interface ResourceFieldProps {
    name: string;
    startValue: string;
    setValue: (newValue: any) => void;
    tall?: boolean;
    height?: number | string;
}

const ResourceField = ({
    name,
    startValue,
    setValue,
    tall = false,
    height = "auto",
}: ResourceFieldProps) => {
    return (
        <div className="relative">
            <div className="-top-2 -right-2 px-1 rounded-tl-xl rounded-bl-xl text-xs absolute bg-gray-700 rounded-xl text-white">
                {name}
            </div>
            {tall ? (
                <textarea
                    onChange={(e) => setValue(e.target.value)}
                    defaultValue={startValue}
                    className="focus:outline-none bg-gray-200 w-full rounded-xl border-white min-h-[100px] border-2 pl-1"
                />
            ) : (
                <input
                    style={{ height: height }}
                    className="focus:outline-none bg-gray-200 w-max rounded-xl border-white border-2 pl-1"
                    defaultValue={startValue}
                    onChange={(e) => setValue(e.target.value)}
                />
            )}
        </div>
    );
};

export default ResourceField;
