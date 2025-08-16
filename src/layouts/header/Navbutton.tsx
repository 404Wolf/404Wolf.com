interface NavbuttonProps {
	onClick?: () => void;
	children: React.ReactNode;
}

const Navbutton = ({ children, onClick }: NavbuttonProps) => {
	return (
		<div>
			<button
				onClick={onClick}
				className="bg-gradient-to-tr from-mid-blue-300 to-mid-blue-200 drop-shadow-lg text-white text-md sm:text-lg md:text-xl px-1 md:px-4 py-1 rounded-xl w-full duration-150 hover:brightness-90 hover:-translate-y-2"
			>
				{children}
			</button>
		</div>
	);
};

export default Navbutton;
