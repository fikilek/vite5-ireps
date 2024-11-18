import { IconContext } from "react-icons";
import { MdOutlineClose } from "react-icons/md";

import "@/components/irepsInfoWindow/WindowCloseBtn.css";

const WindowCloseBtn = props => {
	const { handleClose, color } = props;
	const clr = color ? color : '#f2f'
	return (
		<div className="window-close-btn">
			<button onClick={handleClose} className="close-btn">
				<IconContext.Provider value={{ color: clr }}>
					<MdOutlineClose />
				</IconContext.Provider>
			</button>
		</div>
	);
};

export default WindowCloseBtn;
