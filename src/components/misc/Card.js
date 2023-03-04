const Card = ( {title, children} ) => {
    return (
        <div>
            <div className="relative">
                <div className="mx-auto -translate-y-[2.4rem] bg-gray-700 text-white text-lg py-1 px-2 rounded-full w-32">
                    <h2 className="text-center text-2xl text-bold indent-0">
                        { title }
                    </h2>
                </div>
                <div className="-translate-y-5">
                    { children }
                </div>
            </div>
        </div>
    );
}
 
export default Card;