import "@/components/media/MediaMobileFooter.css";

import MediaMobileFilters from "@/components/media/MediaMobileFilters";
import MediaThumbnails from "@/components/media/MediaThumbnails";

const MediaMobileFooter = () => {
	return (
		<div className="media-mobile-footer">
			<MediaMobileFilters />
			<MediaThumbnails />
		</div>
	);
};

export default MediaMobileFooter;
