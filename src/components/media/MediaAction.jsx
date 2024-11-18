import { useContext } from "react";

// css
import "@/components/media/MediaAction.css";

// custom hooks
import { MediaContext } from "@/contexts/MediaContext.jsx";

// components
import MediaActionCamera from "@/components/media/MediaActionCamera";
import MediaActionVoice from "@/components/media/MediaActionVoice";
import MediaActionVideo from "@/components/media/MediaActionVideo";
import MediaActionGallery from "@/components/media/MediaActionGallery";

const MediaAction = props => {
	// console.log(`props`, props)
	const { mediaData } = useContext(MediaContext);

	return (
		<div
			className={`media-action ${
				mediaData.activeMediaAction ? "showMediaAction" : "hideMediaAction"
			}  `}
		>
			{mediaData.activeMediaAction === "camera" && (
				<MediaActionCamera data={props.data} />
			)}
			{mediaData.activeMediaAction === "voice" && (
				<MediaActionVoice data={props.data} />
			)}
			{mediaData.activeMediaAction === "video" && (
				<MediaActionVideo data={props.data} />
			)}
			{mediaData.activeMediaAction === "gallery" && (
				<MediaActionGallery data={props.data} />
			)}
		</div>
	);
};

export default MediaAction;
