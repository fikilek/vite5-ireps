import { useContext, useEffect, useState } from "react";

import "@/components/media/MediaMobileHeader.css";

import { MediaContext } from "@/contexts/MediaContext.jsx";

import HeaderLabel from "@/components/header/HeaderLabel";
import MediaActionBtns from "@/components/media/MediaActionBtns";
import FormCloseBtn from "@/components/forms/formBtns/FormCloseBtn";

const MediaMobileHeader = props => {
	// console.log(`props`, props)
	const { displayMode, irepsKeyItem } = props;
	// console.log(`displayMode`, displayMode)
	// console.log(`irepsKeyItem`, irepsKeyItem)
	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);
	const [label, setLabel] = useState("");
	const [entityNo, setEntityNo] = useState("");

	// const erfNo = mediaData?.erfData?.erfNo;
	// const astNo = mediaData?.ast?.astData?.astNo;
	useEffect(() => {
		if (mediaData?.erfData?.erfNo) {
			setEntityNo(mediaData?.erfData?.erfNo);
			setLabel("Erf:");
		}
		if (mediaData?.ast?.astData?.astNo) {
			setEntityNo(mediaData?.ast?.astData?.astNo);
			setLabel("Ast:");
		}
	}, [mediaData?.erfData?.erfNo, mediaData?.ast?.astData?.astNo]);

	const closeMediaMobile = e => {
		setMediaData({
			...mediaData,
			isMediaOpened: false,
		});
	};

	return (
		<div className="media-mobile-header">
			<div className="header">
				<div className="hl">
					<HeaderLabel labelName={label} label={entityNo || "Null"} />
				</div>
				<div className="hr">
					{((displayMode === "modal" && irepsKeyItem === "erfs") ||
						(displayMode === "modal" && irepsKeyItem === "trns") ||
						(displayMode === "modal" && irepsKeyItem === "asts")) && (
						<>
							<FormCloseBtn />
						</>
					)}

					{((displayMode === "popup" && irepsKeyItem === "trns") ||
						(displayMode === "popup" && irepsKeyItem === "erfs")) && (
						<>
							<MediaActionBtns />
							<button className="btn-close-form" onClick={closeMediaMobile}>
								X
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default MediaMobileHeader;
