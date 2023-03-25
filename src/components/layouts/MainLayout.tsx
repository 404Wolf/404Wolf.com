import Link from "next/link";
import BasicContacts from "../header/BasicContacts";

interface MainLayoutProps {
    children: React.ReactNode;
    header?: string | JSX.Element;
    headerWidth?: string;
}

const MainLayout = ({ children, header, headerWidth="w-fit" }: MainLayoutProps) => {
    return (
        <div className="pt-6 sm:pt-8">
            {header && 
                <div>
                    <Link href="/"> 
                        <div className={ `absolute bg-gray-700 text-white rounded-3xl sm:rounded-full py-2 sm:py-[6px] px-4 ${headerWidth} scale-[120%] lg:scale-[130%] translate-x-2 sm:translate-x-[1rem] -translate-y-8 sm:-translate-y-[2.5rem] lg:-translate-y-[1.2rem] text-[1rem] sm:text-[25px] font-bold z-50` }>
                            { header }
                        </div>
                    </Link>
                </div>
            }
            
            <div className="hidden sm:block absolute sm:fixed sm:top-[7.7rem] -sm:right-[8rem] md:-right-[7.7rem] sm:rotate-90">
                <BasicContacts/>
            </div>

            <div className="bg-slate-500 p-6 rounded-3xl drop-shadow-4xl-c">
                { children }
            </div>
        </div>
    ); 
}
 
export default MainLayout;
