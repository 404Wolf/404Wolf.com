import Link from "next/link";
import BasicContacts from "../header/BasicContacts";
import Greeter from "../header/Greeter";

const MainLayout = ({ children, header, headerWidth="w-full sm:w-fit", type=true }) => {
    return (
        <div>
            <div className="bg-slate-500 p-5 sm:p-0 rounded-3xl mb-5 sm:mb-3 sm:bg-transparent">
                <div className="bg-slate-300 sm:bg-transparent p-5 sm:p-0 rounded-2xl">
                    {header && <Link href="/"> 
                        <div className={ `sm:absolute bg-gray-700 text-white rounded-3xl sm:rounded-full py-2 sm:py-[6px] px-4 mx-auto mb-1 sm:mb-4 sm:my-0 sm:mx-0 ${headerWidth} sm:scale-[120%] sm:-translate-y-[1.35rem] text-[4.2vw] xs:text-[4.5vw] sm:text-[25px] text-center sm:text-left font-bold z-50` }>
                            { type && header || <Greeter/> }
                        </div>
                    </Link>}
                    
                    <div className="sm:absolute sm:top-[10rem] sm:right-[-8rem] md:right-[-7.7rem] lg:top-0 lg:right-2 sm:rotate-90 lg:rotate-0 z-50 -mb-4 sm:mb-1">
                        <BasicContacts/>
                    </div>
                </div>
            </div>

            <div className="bg-slate-500 p-5 rounded-3xl drop-shadow-4xl-c">
                { children }
            </div>
        </div>
    ); 
}
 
export default MainLayout;