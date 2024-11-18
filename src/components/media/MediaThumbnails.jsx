import { useContext } from "react";
import { IconContext } from "react-icons";
import { toast } from "react-toastify";

import "@/components/media/MediaThumbnails.css";

import { MediaContext } from "@/contexts/MediaContext.jsx";

import { irepsDictionary, irepsIcons } from "@/utils/utils";

const MediaThumbnails = props => {
	// console.log(`props`, props)
	// const { data: erfData } = props;
	// console.log(`erfData`, erfData);

	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);

	const handleClick = e => {
		// console.log(`e.currentTarget.id`, e.currentTarget.id);
		setMediaData({
			...mediaData,
			displayPosition: e.currentTarget.id,
		});
	};

	return (
		<div className="media-thumbnails">
			{mediaData.data &&
				mediaData.data.map((media, index) => {
					// console.log(`media?.metadata?.mediaType`, media?.metadata?.mediaType);
					switch (media?.metadata?.mediaType) {
						default:
							toast.error(`media type not known`, {
								position: "top-right",
							});
							return (
								<div key={media.id}>
									<p>Error : media type not known</p>
								</div>
							);
						case "image/jpeg":
						case "image/png":
							return (
								<div className="image" key={media.id}>
									<p className="media-cat">
										{irepsDictionary.get(media.metadata.mediaCategory)}
									</p>
									<img
										onClick={handleClick}
										id={index}
										width={"120rem"}
										height={"120rem"}
										src={media.url}
										alt={media.metadata.mediaCategory}
										className="media-image-btn m-btn"
									/>
								</div>
							);
						case "video/webm":
							// return  <audio controls src={media.url}  ></audio>
							return (
								<button
									onClick={handleClick}
									id={index}
									key={media.id}
									width={"120rem"}
									height={"120rem"}
									className="media-video-btn m-btn"
								>
									<IconContext.Provider
										value={{
											color: "blue",
											className: "global-class-name",
											fontSize: "4rem",
										}}
									>
										{irepsIcons.ICON_VIDEO_PLAYBACK1}
									</IconContext.Provider>
								</button>
							);
						case "audio/webm":
							// return <video controls src={media.url} ></video>
							return (
								<button
									onClick={handleClick}
									id={index}
									key={media.id}
									width={"120rem"}
									height={"120rem"}
									className="media-audio-btn m-btn"
								>
									<IconContext.Provider
										value={{
											color: "blue",
											className: "global-class-name",
											fontSize: "4rem",
										}}
									>
										{irepsIcons.ICON_AUDIO_PLAYBACK1}
									</IconContext.Provider>
								</button>
							);
					}
				})}
		</div>
	);
};

export default MediaThumbnails;
