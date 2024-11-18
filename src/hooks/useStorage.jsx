import { useEffect, useState } from "react";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes,
	uploadString,
} from "firebase/storage";
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore";

import { storage } from "@/firebaseConfig/fbConfig";
import { useFirestore } from "@/hooks/useFirestore";

const useStorage = props => {
	// console.log(`props`, props);

	const [progress] = useState(null);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);
	const [success, setSuccess] = useState(null);

	const { addDocument: addDocToMediaErfs, response: responseMediaErfs } =
		useFirestore("mediaErfs");
	const { addDocument: addDocToMediaAsts, response: responseMediaAsts } =
		useFirestore("mediaAsts");

	useEffect(() => {
		if (responseMediaErfs.success || responseMediaAsts.success) {
			toast.success(`Media succesfully uploade onto iREPS`, {
				position: "bottom-left",
			});
		}
		if (responseMediaErfs.error || responseMediaAsts.success) {
			// console.log(`response.error`, response.error);
			toast.error(`Media Failed to uploade onto iREPS`, {
				position: "top-right",
			});
		}
	}, [responseMediaErfs, responseMediaAsts]);

	const uploadFile = async (file, irepsKeyItem, id, imgMetadata, mediaType) => {
		// console.log(`file`, file);
		// console.log(`irepsKeyItem`, irepsKeyItem);
		// console.log(`id`, id);
		// console.log(`imgMetadata`, imgMetadata);
		// console.log(`mediaType`, mediaType);

		if (
			!(mediaType === "image" || mediaType === "video" || mediaType === "audio")
		) {
			console.log(`Not a valid media type`, mediaType);
			return;
		}

		let filePath = null;
		if (irepsKeyItem === "erfs") {
			filePath = `${irepsKeyItem}/${id}_${props?.data?.erfNo}/${imgMetadata?.mediaCategory}_${imgMetadata?.createdAtDatetime}`;
		}
		if (irepsKeyItem === "asts") {
			filePath = `${irepsKeyItem}/${id}_${props?.data?.astData?.astNo}/${imgMetadata?.mediaCategory}_${imgMetadata?.createdAtDatetime}`;
		}
		// console.log(`filePath`,filePath)

		const fileStorageRef = ref(storage, filePath);

		let metadata = {
			customMetadata: {
				mediaType: imgMetadata.mediaType,
				mediaCategory: imgMetadata.mediaCategory,
				// erfId: imgMetadata.erfId,
				// erfNo: imgMetadata.erfNo,

				lat: imgMetadata.createdAtLocation.lat,
				lng: imgMetadata.createdAtLocation.lng,
			},
			contentType: imgMetadata.mediaType,
			type: imgMetadata.mediaType,
		};

		if (irepsKeyItem === "erfs") {
			metadata = {
				...metadata,
				customMetadata: {
					...metadata.customMetadata,
					erfId: imgMetadata.erfId,
					erfNo: imgMetadata.erfNo,
				},
			};
		}
		if (irepsKeyItem === "asts" || irepsKeyItem === "trns") {
			metadata = {
				...metadata,
				customMetadata: {
					...metadata.customMetadata,
					astId: imgMetadata.astId,
					astNo: imgMetadata.astNo,
					trnId: imgMetadata.trnId,
				},
			};
		}

		// Upload file and metadata to the object 'images/mountains.jpg'
		const storageRef = ref(storage, fileStorageRef);

		let snapshot;
		if (mediaType === "audio" || mediaType === "video") {
			snapshot = await uploadBytes(storageRef, file, metadata);
		}

		if (mediaType === "image") {
			snapshot = await uploadString(storageRef, file, "data_url", metadata);
		}
		// console.log(`snapshot`, snapshot)

		const downloadURL = await getDownloadURL(snapshot.ref);
		// console.log("File available at", downloadURL);
		setUrl(downloadURL);

		if (irepsKeyItem === "erfs") {
			addDocToMediaErfs({
				url: downloadURL,
				metadata: {
					...metadata.customMetadata,
					createdByUser: imgMetadata.createdByUser,
					createdByUid: imgMetadata.createdByUid,
					createdAtDatetime: Timestamp.now(),
				},
			});
		}
		if (irepsKeyItem === "trns" || irepsKeyItem === "asts") {
			addDocToMediaAsts({
				url: downloadURL,
				metadata: {
					...metadata.customMetadata,
					createdByUser: imgMetadata.createdByUser,
					createdByUid: imgMetadata.createdByUid,
					createdAtDatetime: Timestamp.now(),
				},
			});
		}
	};

	const deleteFile = async (fileRef, id) => {
		// console.log(`fileRef`, fileRef);
		// 	console.log(`id`, id);

		// 	// Delete the file
		deleteObject(fileRef)
			.then(() => {
				// console.log(`File ${id} deleted successfully`);
				setSuccess(true);
			})
			.catch(error => {
				console.log(`Error deleting file ${id} : ${error.message}`);
				setError(`Error deleting file ${id} : ${error.message}`);
			});
	};

	return { uploadFile, progress, error, url, deleteFile, success };
};

export default useStorage;
