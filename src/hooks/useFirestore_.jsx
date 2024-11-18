import { useEffect, useReducer, useState } from "react";
import {
	updateDoc,
	doc,
	Timestamp,
	onSnapshot,
	collection,
	addDoc,
	deleteDoc,
	setDoc,
	getDoc,
	// deleteDoc,
} from "firebase/firestore";

// contexts
import useAuthContext from "@/hooks/useAuthContext";

// import cloneDeep from "lodash.clonedeep";
import { db } from "@/firebaseConfig/fbConfig";

export const useFirestore_ = (fbCollection) => {
	// console.log(`useFirestore fbCollection:`, fbCollection);

	const { user } = useAuthContext();
	// console.log(`user`, user);

	// const ref = collection(db, fbCollection);

	// const addDocument = async (doc) => {
	// 	dispatch({ type: "IS_PENDING" });
	// 	try {
	// 		const addedDocument = await addDoc(ref, {
	// 			...doc,
	// 			metadata: {
	// 				...doc.metadata,
	// 				updatedAtDatetime: Timestamp.now(),
	// 				updatedByUser: user.displayName,
	// 				updatedByUid: user.uid,
	// 			},
	// 			updateHistory: true,
	// 		});
	// 		// console.log(`addedDocument`, addedDocument);
	// 		dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: addedDocument });
	// 	} catch (err) {
	// 		dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
	// 	}
	// };

	// const deleteDocument = async (id) => {
	// 	// console.log(`Delete doc`, id);

	// 	dispatch({ type: "IS_PENDING" });
	// 	const docToDeleteRef = doc(db, fbCollection, id);
	// 	try {
	// 		deleteDoc(docToDeleteRef).then((result) => {
	// 			dispatchIfNotCancelled({ type: "DELETED_DOCUMENT", payload: id });
	// 		});
	// 	} catch (err) {
	// 		console.log(`ERROR deleting doc [${id}]: `, err.message);
	// 		dispatchIfNotCancelled({
	// 			type: "ERROR",
	// 			payload: err.message,
	// 		});
	// 	}
	// };

	const updateDocument = async (document, id) => {
		// console.log(`updateDocument`, document);
		// console.log(`updateDocument`, id);

		document = {
			...document,
			"metadata.updatedAtDatetime": Timestamp.now(),
			"metadata.updatedByUser": user.displayName,
			"metadata.updatedByUid": user.uid,
			updateHistory: true,
		};

		const docToUpdateRef = doc(db, fbCollection, id);

		try {
			await updateDoc(docToUpdateRef, document);
			return { success: true };
		} catch (error) {
			console.log(`ERROR: `, error.message);
			return { success: false, msg: error.message };
		}
	};

	const getDocument = async (id) => {
		// console.log(`getDocument id:`, id);

		const docRef = doc(db, fbCollection, id);

		const docSnap = await getDoc(docRef);

		try {
			if (docSnap.exists()) {
				// console.log("Document data:", docSnap.data());
				return { success: true, doc: { id: docSnap.id, ...docSnap.data() } };
			} else {
				// docSnap.data() will be undefined in this case
				// console.log("No such document!");
				return { success: false, msg: "Document does not exist" };
			}
		} catch (error) {
			console.log("No such document!");
			return { success: false, msg: error.message };
		}
	};

	// const setDocument = async (document, id) => {
	// 	// console.log(`updateDocument`, document);
	// 	// console.log(`id`, id);

	// 	document = {
	// 		...document,
	// 		metadata: {
	// 			...document.metadata,
	// 			updatedAtDatetime: Timestamp.now(),
	// 			updatedByUser: user.displayName,
	// 			updatedByUid: user.uid,
	// 		},
	// 		updateHistory: true,
	// 	};

	// 	dispatch({ type: "IS_PENDING" });
	// 	const docToUpdateRef = doc(db, fbCollection, id);
	// 	// console.log(`docToUpdateRef` ,docToUpdateRef)
	// 	try {
	// 		setDoc(docToUpdateRef, document).then((result) => {
	// 			// console.log(`result` ,result)
	// 			dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT" });
	// 		});
	// 	} catch (err) {
	// 		console.log(`ERROR: `, err.message);
	// 		dispatchIfNotCancelled({
	// 			type: "ERROR",
	// 			payload: err.message,
	// 		});
	// 	}
	// };

	// const removeMedia = async (imageRef) => {
	// 	// step : extract irepsKeyItem ('erfs' or 'asts'). this comes from the path
	// 	const collectionName = "";

	// 	// step : extract erf 'id' if its erfs or ast 'id' if its ast
	// 	const docId = "";

	// 	// step : get reference to the document
	// 	const docRef = doc(db, collectionName, docId);

	// 	// step : extract media url using imageReg

	// 	// step : get the document from erfs or asts using id

	// 	// step : extract media array from the doc

	// 	// step : locate array index from media that matches the url

	// 	// step : use the index to remove/delete item using arrayRemove
	// };

	// useEffect(() => {
	// 	// console.log(`running cleanup`);
	// 	setIsCancelled(false);
	// 	return () => {
	// 		setIsCancelled(true);
	// 	};
	// }, []);

	return {
		// response,
		// addDocument,
		// deleteDocument,
		updateDocument,
		getDocument,
		// setDocument,
		// removeMedia,
	};
};
