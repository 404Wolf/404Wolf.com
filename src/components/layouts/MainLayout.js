import Link from "next/link";
import BasicContacts from "../header/BasicContacts";

const MainLayout = ({ children, header, headerWidth="w-fit" }) => {
    return (
        <div className="pt-6">
            {header && 
                <div>
                    <Link href="/"> 
                        <div className={ `absolute bg-gray-700 text-white rounded-3xl sm:rounded-full py-2 sm:py-[6px] px-4 ${headerWidth} scale-[120%] translate-x-2 sm:translate-x-[.2rem] -translate-y-7 sm:-translate-y-[2.5rem] text-[1rem] sm:text-[25px] text-center sm:text-left font-bold z-50` }>
                            { header }
                        </div>
                    </Link>
                </div>
            }
            
            <div className="absolute sm:fixed sm:top-[7.9rem] sm:right-[-8rem] md:right-[-7.7rem] sm:rotate-90">
                <BasicContacts/>
            </div>

            <div className="bg-slate-500 p-6 rounded-3xl drop-shadow-4xl-c">
                { children }
            </div>
        </div>
    ); 
}
 
export default MainLayout;