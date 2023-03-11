import Link from "next/link";
import BasicContacts from "../header/BasicContacts";

const MainLayout = ({ children, header, type=true }) => {
    return (
        <div>
            {header && <Link href="/"> 
                <div className="hidden md:block absolute bg-gray-700 text-white rounded-full py-[6px] px-4 w-[23.6rem] scale-110 -translate-y-[1.4rem] -translate-x-[.3rem] text-lg text-4xl font-bold z-50 text-3xl font-bold">
                    { type && <Greeter/> || header }
                </div>
            </Link>}

            <div className="hidden sm:block absolute top-[11.5rem] right-[-11.5rem] lg:top-0 lg:right-0 rotate-90 lg:rotate-0 z-50 rounded-xl">
                <BasicContacts/>
            </div>

            <div className={"bg-slate-500 p-5 rounded-3xl  drop-shadow-4xl-c"}>
                { children }
            </div>
        </div>
    );
}
 
export default MainLayout;