import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDownloadURL, ref } from "firebase/storage";

import "@/components/media/MediaMobileBody.css";

import { useFirestoreMedia } from "@/hooks/useFirestoreMedia.jsx";
import { storage } from "@/firebaseConfig/fbConfig";
import useStorage from "@/hooks/useStorage.jsx";
import { useFirestore } from "@/hooks/useFirestore.jsx";

import { irepsIcons } from "@/utils/utils";
import MediaMBBtn from "@/components/media/MediaMBBtn";
import MediaMBMedia from "@/components/media/MediaMBMedia";
import MediaMBMap from "@/components/media/MediaMBMap";
import { MediaContext } from "@/contexts/MediaContext";

const MediaMobileBody = props => {
	const { irepsKeyItem } = props;
	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);

	const [activeWindow, setActiveWindow] = useState("image");
	// console.log(`activeWindow`, activeWindow);

	const selectWindow = selected => {
		setActiveWindow(selected);
	};

	// Delete file - step 0
	const { deleteDocument: delErfMedia, response: responseErfs } =
		useFirestore("mediaErfs");
	const { deleteDocument: delAstMedia, response: responseAsts } =
		useFirestore("mediaAsts");

	const { removeMedia } = useFirestoreMedia();

	// Delete file - step 1
	const { deleteFile, success } = useStorage();

	// Delete file - step 2
	const selectedMedia = mediaData?.data[mediaData?.displayPosition];
	// console.log(`selectedMedia`, selectedMedia);

	// Delete file - step 3
	const handleDelete = async e => {
		// console.log(`e`, e);
		// console.log(`image to delete [${e}]`);
		const id = e;

		// get image ref from url
		try {
			// console.log(`storage`, storage);

			let imageRef = ref(storage, selectedMedia.url);
			// console.log(`imageRef`, imageRef);

			// step : extract media url using imageReg
			const url = await getDownloadURL(imageRef);
			// console.log(`url`, url);

			// delete file from storage
			await deleteFile(imageRef, selectedMedia.id);
			// console.log(`file deleted from useStorage`);

			// delete document in media collection
			if (irepsKeyItem === "erfs") {
				await delErfMedia(id);
			}
			if (irepsKeyItem === "asts" || irepsKeyItem === "trns") {
				await delAstMedia(id);
			}

			// console.log(`doc deleted from collection`);

			// delete/remove file in erf or ast (depending where its located)
			await removeMedia(imageRef, url);
			// console.log(`media ref removed from erfs or asts`);

			setMediaData({
				...mediaData,
				displayPosition: 0,
			});
		} catch (error) {
			console.log(`Error deleting image ${error}`);
			toast.error(`Error deleting image ${error}`, {
				position: "top-right",
			});
		}
	};
	// Delete file - step 3
	useEffect(() => {
		if (responseErfs.error) {
			toast.error(responseErfs.error, {
				position: "top-right",
			});
		}
		if (responseErfs.document && success) {
			toast.success(`Doc ${responseErfs.document} succesfully delete`, {
				position: "bottom-left",
			});
		}
	}, [responseErfs, success]);

	useEffect(() => {
		if (responseAsts.error) {
			toast.error(responseAsts.error, {
				position: "top-right",
			});
		}
		if (responseAsts.document && success) {
			toast.success(`Doc ${responseAsts.document} succesfully delete`, {
				position: "bottom-left",
			});
		}
	}, [responseAsts, success]);

	return (
		<div className="media-mobile-body">
			<div className="mmb-main">
				{activeWindow === "image" && <MediaMBMedia />}
				{activeWindow === "map" && <MediaMBMap />}
			</div>
			<div className="mmb-btns">
				{selectedMedia && activeWindow !== "map" && (
					<MediaMBBtn
						id={selectedMedia?.id}
						selectWindow={handleDelete}
						mmbIcon={irepsIcons.ICON_DELETE}
						color={""}
						label={selectedMedia?.id}
						title={"DELETE Image"}
					/>
				)}

				{selectedMedia && activeWindow !== "image" && (
					<MediaMBBtn
						id={"images"}
						selectWindow={selectWindow}
						mmbIcon={irepsIcons.ICON_IMAGE1}
						color={""}
						label={"image"}
						title={"VIEW Image"}
					/>
				)}
				{selectedMedia && (
					<MediaMBBtn
						id={"map"}
						selectWindow={selectWindow}
						mmbIcon={irepsIcons.ICON_MAP}
						color={""}
						label={"map"}
						title={"VIEW Image Location On The Map "}
					/>
				)}
			</div>
		</div>
	);
};

export default MediaMobileBody;
