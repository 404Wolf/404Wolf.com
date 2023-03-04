const Navbar = () => {
    const buttonStyle = "bg-slate-700 text-white text-lg md:text-xl px-3 md:px-4 py-2 rounded-xl w-48 sm:w-32 xl:w-48 duration-150 hover:scale-110"

    return (
        <navbar className="flex flex-col sm:flex-row justify-start text-center gap-3 sm:gap-5">
            <button className={ buttonStyle }>About Me</button>
            <button className={ buttonStyle }>Contacts</button>
            <button className={ buttonStyle }>Resume</button>
        </navbar>
    );
}
 
export default Navbar;