const Navbar = () => {
    const buttonStyle = "bg-black text-white text-xl px-4 py-2 rounded-xl w-30 duration-150 hover:scale-110"

    return (
        <navbar className="flex justify-start text-center gap-5">
            <button className={ buttonStyle }>About Me</button>
            <button className={ buttonStyle }>Contacts</button>
            <button className={ buttonStyle }>Resume</button>
        </navbar>
    );
}
 
export default Navbar;