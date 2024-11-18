import "@/components/media/MediaBody.css";

import MediaMainDisplay from "@/components/media/MediaMainDisplay";
import MediaOnMap from "@/components/media/MediaOnMap";

const MediaBody = () => {
	return (
		<div className="media-body">
			<MediaMainDisplay />
			{/* <MediaMainDisplayMobile /> */}
			<MediaOnMap />
		</div>
	);
};

export default MediaBody;
