import Link from "next/link";
import BasicContacts from "../header/BasicContacts";
import Greeter from "../header/Greeter";

const MainLayout = ({ children, header, type=true }) => {
    return (
        <div>
            {header && <Link href="/"> 
                <div className="md:absolute bg-gray-700 text-white rounded-full py-2 md:py-[6px] px-4 mx-auto mb-1 md:mb-4 md:my-0 md:mx-0 md:w-[19.5rem] md:scale-110 md:-translate-y-[1.4rem] md:-translate-x-[.3rem] text-2xl max-[690px]:text-3xl text-center md:text-left font-bold z-50">
                    { type && <Greeter/> || header }
                </div>
            </Link>}

            <div className="md:absolute md:top-[10rem] md:right-[-10rem] lg:top-0 lg:right-0 md:rotate-90 lg:rotate-0 z-50 mb-1">
                <BasicContacts/>
            </div>

            <div className={"bg-slate-500 p-5 rounded-3xl drop-shadow-4xl-c"}>
                { children }
            </div>
        </div>
    ); 
}
 
export default MainLayout;