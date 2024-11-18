import { useContext } from "react";

import "@/components/media/MediaFilters.css";

import MediaFilter from "@/components/media/MediaFilter";
import { MediaContext } from "@/contexts/MediaContext";

const MediaFilters = () => {
	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);

	const totalMedia = mediaData.data.length;

	return (
		<div className="media-filters">
			<p className="title">Total Media {totalMedia}</p>
			<div className="filters">
				<MediaFilter filterTitle={"Erf"} />
				<MediaFilter filterTitle={"Asts"} />
			</div>
		</div>
	);
};

export default MediaFilters;
