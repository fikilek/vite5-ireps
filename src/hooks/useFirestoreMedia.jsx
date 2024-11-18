import { useEffect, useReducer, useState } from "react";
import {
	Timestamp,
	arrayRemove,
	doc,
	getDoc,
	updateDoc,
} from "firebase/firestore";

import { db } from "@/firebaseConfig/fbConfig";
import useAuthContext from "@/hooks/useAuthContext";

const initData = {
	document: null,
	error: null,
	isPending: null,
	success: null,
};

const firestoreReducer = (state, action) => {
	// console.log(`firestoreReducer action`, action);
	switch (action.type) {
		case "IS_PENDING":
			// console.log(`IS_PENDING`, action.payload);
			return {
				document: null,
				error: null,
				isPending: true,
				success: false,
			};
		case "ADD_DOCUMENT":
			// console.log(`ADD_DOCUMENT`, action.payload);
			return {
				document: action.payload,
				error: null,
				isPending: false,
				success: true,
			};
		case "UPDATED_DOCUMENT":
			// console.log(`UPDATED_DOCUMENT`, action.payload);
			return {
				document: action.payload,
				error: null,
				isPending: false,
				success: true,
			};
		case "ERROR":
			console.log(`ERROR`, action.payload);
			return {
				document: null,
				error: action.payload,
				isPending: false,
				success: false,
			};
		case "DELETED_DOCUMENT":
			// console.log(`UPDATED_DOCUMENT`, action.payload);
			return {
				document: action.payload,
				error: null,
				isPending: false,
				success: true,
			};
		default:
			console.log(
				`DEFAULT - Error adding/updating firestore doc - action.payload`,
				action.payload
			);
			throw new Error(`Error adding/updating firestore doc`);
	}
};

export const useFirestoreMedia = () => {
	// console.log(`useFirestore fbCollection:`, fbCollection);

	const { user } = useAuthContext();

	const [response, dispatch] = useReducer(firestoreReducer, initData);
	// console.log(`response`, response);

	const [isCancelled, setIsCancelled] = useState(false);
	// console.log(`isCancelled`, isCancelled);

	const dispatchIfNotCancelled = action => {
		// console.log(`action`, action);
		// console.log(`isCancelled`, isCancelled);
		if (!isCancelled) {
			dispatch(action);
		}
	};

	const removeMedia = async (imageRef, url) => {
		// step : get media path string from imageReg and split  it up into an array
		const imagePathArray = imageRef.fullPath.split("/");
		// console.log(`imagePathArray`, imagePathArray);

		// step : extract irepsKeyItem ('erfs' or 'asts'). this comes from the path
		const collectionName = imagePathArray[0];
		// console.log(`collectionName`, collectionName);

		// step : extract erf 'id' if its erfs or ast 'id' if its ast
		const docId = imagePathArray[1].split("_")[0];
		// console.log(`docId`, docId);

		// step : get reference to the document
		const docRef = doc(db, collectionName, docId);
		// console.log(`docRef`, docRef);

		// step : get the data using refererence
		const docSnap = await getDoc(docRef);
		// console.log(`docSnap`, docSnap);

		if (docSnap.exists()) {
			// console.log("document does exist");

			const docData = docSnap.data();
			// console.log("docData", docData);

			// step : get the doc from using the refererence
			const { media } = docData;
			// console.log(`media`, media);

			// step : locate array index from media that matches the url
			const removeMedia = media.find(item => item.url === url);
			// console.log(`removeMedia`, removeMedia);

			// step : use the index to remove/delete item using arrayRemove
			const removeResult = await updateDoc(docRef, {
				media: arrayRemove(removeMedia),
				"metadata.updatedAtDatetime": Timestamp.now(),
				"metadata.updatedByUser": user.displayName,
				"metadata.updatedByUid": user.uid,
			});
			// console.log(`removeResult`, removeResult);
		} else {
			// docSnap.data() will be undefined in this case
			// console.log("No such document!");
		}
	};

	useEffect(() => {
		// console.log(`running cleanup`);
		setIsCancelled(false);
		return () => {
			setIsCancelled(true);
		};
	}, []);

	return {
		response,
		removeMedia,
	};
};
