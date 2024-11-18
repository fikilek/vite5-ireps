import { useContext } from "react";

// css
import "@/components/media/MediaActionHeader.css";

// contexts
import { MediaContext } from "@/contexts/MediaContext";

// components
import HeaderGeneric from "@/components/header/HeaderGeneric";

const MediaActionHeader = props => {
	// console.log(`props`, props);
	const { hl1 } = props;
	const { mediaData, setMediaData } = useContext(MediaContext);
	const handleClick = e => {
		setMediaData({
			...mediaData,
			activeMediaAction: null,
		});
	};

	return (
		<div className="media-action-header">
			<HeaderGeneric hl1={hl1}>
				{/* mah - media action header */}
				<button className="mah-btn" onClick={handleClick}>
					X
				</button>
			</HeaderGeneric>
		</div>
	);
};

export default MediaActionHeader;
