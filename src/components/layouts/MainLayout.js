const MainLayout = ({ children, header }) => {
    return (
        <div className="p-[4.5%] bg-gradient-to-tr from-[#16697a] to-[#1d4480]">
            {header && <div className="absolute bg-gray-700 text-white rounded-full py-[10px] px-4 w-[28rem] scale-110 -translate-y-[2rem] -translate-x-[1rem]">
                { header }
            </div>}
            <div className={"bg-slate-500 p-5 rounded-3xl"}>
                { children }
            </div>
        </div>
    );
}
 
export default MainLayout;