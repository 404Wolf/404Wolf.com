interface FakeResourceProps {
    placeholderId: string | null;
    children?: React.ReactNode;
}

const FakeResource = ({ placeholderId = null, children }: FakeResourceProps) => {
    return (
        <div className="relative">
            {placeholderId && (
                <div className="bg-gray-500 text-sm text-white flex my-2 py-px px-2 w-fit mx-auto rounded-full absolute -top-4 -left-4 focus:outline-none scale-90">
                    #{placeholderId}
                </div>
            )}
            <div className="bg-gray-400 rounded-xl h-36 overflow-clip">{children}</div>
        </div>
    );
};

export default FakeResource;
