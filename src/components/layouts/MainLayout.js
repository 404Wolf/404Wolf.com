import Link from "next/link";
import BasicContacts from "../header/BasicContacts";
import Greeter from "../header/Greeter";

const MainLayout = ({ children, header, type=true }) => {
    return (
        <div>
            <div className="bg-slate-500 p-5 md:p-0 rounded-3xl mb-4 md:bg-transparent">
                {header && <Link href="/"> 
                    <div className="md:absolute bg-gray-700 text-white rounded-3xl md:rounded-full py-2 md:py-[6px] px-4 mx-auto mb-1 md:mb-4 md:my-0 md:mx-0 md:w-[20rem] md:scale-[120%] md:-translate-y-[1.35rem] text-[22px] sm:text-[25px] text-center md:text-left font-bold z-50">
                        { type && <Greeter/> || header }
                    </div>
                </Link>}
                
                <div className="md:absolute md:top-[10rem] md:right-[-10rem] lg:top-0 lg:right-0 md:rotate-90 lg:rotate-0 z-50 -mb-4 md:mb-1">
                    <BasicContacts/>
                </div>
            </div>

            <div className="bg-slate-500 p-5 rounded-3xl drop-shadow-4xl-c">
                { children }
            </div>
        </div>
    ); 
}
 
export default MainLayout;