import "@/components/media/MediaFooter.css";

import MediaFilters from "@/components/media/MediaFilters";
import MediaThumbnails from "@/components/media/MediaThumbnails";

const MediaFooter = props => {
	const { data } = props;
	return (
		<div className="media-footer">
			<MediaFilters />
			<MediaThumbnails data={data} />
		</div>
	);
};

export default MediaFooter;
