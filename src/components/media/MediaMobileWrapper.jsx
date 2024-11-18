import { useContext } from "react";

import "@/components/media/MediaMobileWrapper.css";

import { MediaContext } from "@/contexts/MediaContext";
import MediaMobileAsts from "@/components/media/MediaMobileAsts";
import MediaMobileErfs from "@/components/media/MediaMobileErfs";

const MediaMobileWrapper = props => {
	// console.log(`props`, props);
	const { irepsKeyItem, trnId } = props.data;
	const { mediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);
	// console.log(`data`, data);
	// console.log(`irepsKeyItem`, irepsKeyItem);
	// console.log(`displayMode`, displayMode);

	const mediaMobileOpened = mediaData.isMediaOpened
		? "showMediaMobile"
		: "hideMediaMobile";
	return (
		<div className={`media-mobile-wrapper ${mediaMobileOpened} `}>
			{(irepsKeyItem === "trns" || irepsKeyItem === "asts") && (
				<MediaMobileAsts data={props.data} trnId={trnId} />
			)}
			{irepsKeyItem === "erfs" && (
				<MediaMobileErfs data={props.data} trnId={trnId} />
			)}
		</div>
	);
};

export default MediaMobileWrapper;
