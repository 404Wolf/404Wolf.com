const BasicContact = ({ children, url }) => {
    return (
        <a href={ url } className="text-[10px] bg-mid-blue-300 sm:bg-slate-350/[27%] backdrop-blur-xl drop-shadow-2xl-c text-white font-bold sm:font-normal sm:text-slate-200/[35%] rounded-xl py-1 px-2 whitespace-nowrap grow text-center">
            { children }
        </a>
    );
}
 
export default BasicContact;