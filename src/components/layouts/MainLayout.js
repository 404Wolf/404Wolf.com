const MainLayout = ({ children, header }) => {
    return (
        <div className="p-12 bg-gradient-to-tr from-[#16697a] to-[#1d4480]">
            {header && <div className="md:absolute md:bg-gray-700 md:text-white md:rounded-full md:py-[10px] md:px-4 md:w-[28rem] md:scale-110 md:-translate-y-[2rem] md:-translate-x-[1rem] border-slate-900">
                { header }
            </div>}
            <div className={"bg-slate-500 p-5 rounded-3xl flex flex-col"}>
                { children }
            </div>
        </div>
    );
}
 
export default MainLayout;