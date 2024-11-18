import "@/components/meterTimeline/MeterTimelineMedia.css";

import { capitalizeFirstLetter } from "@/utils/utils";

const MeterTimelineMedia = (props) => {
	// console.log(`props`, props);
	const { media } = props;
	return (
		<div className="meter-timeline-media">
			<p>Media: <span>{capitalizeFirstLetter(media?.mediaCategory)}</span></p>
			<img src={media?.url} alt="media www" width={100} />
		</div>
	);
};

export default MeterTimelineMedia;
