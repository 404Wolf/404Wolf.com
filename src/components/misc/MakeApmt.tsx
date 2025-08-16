import Modal from "./Modal";
import useAbout from "../about/useAbout";

interface MakeApmtProps {
	open: boolean;
	setOpen: (openness: boolean) => void;
}

const MakeApmt = ({ open, setOpen }: MakeApmtProps) => {
	const { booking } = useAbout();

	return (
		<>
			<Modal open={open} setOpen={setOpen} positioning="right-0 top-0">
				<div className="bg-white h-[80vh] md:h-[80vh] w-[90vw] md:w-[70vw] rounded-2xl p-4 drop-shadow-4xl-c">
					<iframe
						src={booking}
						style={{ border: 0 }}
						className="w-full h-full"
					></iframe>
				</div>
			</Modal>
		</>
	);
};

export default MakeApmt;
