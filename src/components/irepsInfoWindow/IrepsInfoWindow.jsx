import "@/components/irepsInfoWindow/IrepsInfoWindow.css";

import FormCloseBtn from "@/components/forms/formBtns/FormCloseBtn";
import HeaderGeneric from "@/components/header/HeaderGeneric";

const IrepsInfoWindow = props => {
	// console.log(`props`, props)
	const { hl1, hl2, hl3, hr1, hr2, hr3, windowWidth, windowHeight } = props;

	return (
		<div
			className="iw-wrapper"
			// style={{ width: windowWidth, height: windowHeight }}
		>
			<div
				className="iw-container"
				// style={{ width: windowWidth, height: windowHeight }}
			>
				<HeaderGeneric hl1={hl1} hl2={hl2} hl3={hl3} hr1={hr1} hr2={hr2} hr3={hr3}>
					<FormCloseBtn />
				</HeaderGeneric>
				{props.children}
			</div>
		</div>
	);
};

export default IrepsInfoWindow;
