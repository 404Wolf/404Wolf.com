import Link from "next/Link";

const MainLayout = ({ children, header }) => {
    return (
        <div className="p-[4.5%] lg:px-[6%] xl:px-[8%] bg-gradient-to-tr from-[#16697a] to-[#1d4480]">
            {header && <Link href="/"> 
                <div className="hidden md:block absolute bg-gray-700 text-white rounded-full py-[6px] px-4 w-[28rem] scale-110 -translate-y-[1.4rem] -translate-x-[.3rem] text-4xl font-bold z-50">
                    { header }
                </div> 
            </Link>}
            <div className={"bg-slate-500 p-5 rounded-3xl  drop-shadow-4xl-c"}>
                { children }
            </div>
        </div>
    );
}
 
export default MainLayout;