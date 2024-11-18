import "@/pages/user/UserEmailVerified.css";

import { IconContext } from "react-icons";
import { TiTick } from "react-icons/ti";

const FormUserEmailVerified = props => {
	const { verified } = props;
	return (
		<div className="user-email-verified">
			{verified ? (
				<IconContext.Provider
					value={{
						color: "green",
						size: "1rem",
						className: "ue-verified",
						title: "Verified",
					}}
				>
					<TiTick />
				</IconContext.Provider>
			) : (
				<p>X</p>
			)}

			{/* <span>Verified</span> */}
		</div>
	);
};

export default FormUserEmailVerified;
