import "@/components/media/MediaMainDisplayHeader.css";

import HeaderGeneric from "@/components/header/HeaderGeneric3";

const MediaMainDisplayHeader = props => {
	const { hl1, hl2, hl3, hr1, hr2, hr3 } = props;
	return (
		<div className="main-display-header">
			<HeaderGeneric hl1={hl1} hl2={hl2} hl3={hl3} hr1={hr1} hr2={hr2} hr3={hr3} />
		</div>
	);
};

export default MediaMainDisplayHeader;
