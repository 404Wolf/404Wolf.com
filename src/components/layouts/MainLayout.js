import Link from "next/link";

const MainLayout = ({ children, header }) => {
    return (
        <div className="p-[4.5%] bg-gradient-to-tr from-[#16697a] to-[#1d4480]">
            {header && <Link href="/"> 
                <div className="absolute bg-gray-700 text-white rounded-full py-[10px] px-4 w-[28rem] scale-110 -translate-y-[2rem] -translate-x-[1rem] text-4xl font-bold z-50">
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