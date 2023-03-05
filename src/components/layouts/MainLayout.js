import Link from "next/link";
import Typewriter from "typewriter-effect";
import BasicContacts from "../header/BasicContacts";
import InlineButton from "../misc/InlineButton";

const MainLayout = ({ children, header, type=true }) => {
    let headerTyper = null;

    if (type) {
        headerTyper = (
            <Typewriter 
                onInit={(typewriter) => {typewriter.typeString(header).start()}}
                options={{delay: 70, wrapperClassName: "text-4xl font-bold", cursor: ""}}
                skipAddStyles={ true }
            />
        );
    }

    return (
        <div className="px-[6.5%] p-[4.5%] lg:px-[6%] xl:px-[8%] bg-gradient-to-tr from-[#16697a] to-[#1d4480]">
            {header && 
            <Link href="/"> 
                <div className="absolute bg-gray-700 text-white rounded-full py-[6px] px-4 w-[15rem] md:w-[28rem] scale-110 md:-translate-y-[1.4rem] md:-translate-x-[.3rem] text-lg md:text-4xl font-bold z-50">
                    { type && headerTyper || header }
                </div>
            </Link>
            }

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