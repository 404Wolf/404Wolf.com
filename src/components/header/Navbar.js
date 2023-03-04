const Navbar = () => {
    const buttonStyle = "bg-black text-white px-3 py-1 rounded-xl w-24"

    return (
        <navbar className="flex justify-start text-center gap-5">
            <button className={ buttonStyle }>About Me</button>
            <button className={ buttonStyle }>Contacts</button>
            <button className={ buttonStyle }>Resume</button>
        </navbar>
    );
}
 
export default Navbar;