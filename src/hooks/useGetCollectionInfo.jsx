import { useReducer } from "react";
import { db } from "@/firebaseConfig/fbConfig";
import {
	collection,
	getCountFromServer,
	query,
	where,
} from "firebase/firestore";

const initData = {
	data: [],
	error: null,
	isPending: null,
	success: null,
};

const colReducer = (state, action) => {
	// console.log(`state`, state);
	// console.log(`action`, action);
	switch (action.type) {
		default:
			return state;
		case "IS_PENDING":
			// console.log(`action.type`, action.type);
			return {
				data: [],
				isPending: true,
				success: false,
				error: "",
			};
		case "SUCCESS":
			return {
				data: action.payload,
				error: false,
				isPending: false,
				success: true,
			};
		case "ERROR":
			return {
				data: [],
				isPending: false,
				success: false,
				error: action.payoad,
			};
	}
};

const useGetCollectionInfo = col => {
	// console.log(`col`, col);
	// console.log(`_query`, _query);

	// const { erfsContext, setErfsContext } = useContext(ErfsContext);
	// // console.log(`erfsContext`, erfsContext);

	const [state, dispatch] = useReducer(colReducer, initData);
	// console.log(`state`, state);

	// useEffect(() => {
	// 	if (state.data.length > 0) {
	// 		setErfsContext({
	// 			...erfsContext,
	// 			erfs: state.data,
	// 		});
	// 	}
	// }, [state, state.data, setErfsContext]);

	let colRef = collection(db, col);

	// const getCollectionInfo = _query => {
	// 	// console.log(`..._query`, ..._query);
	// 	let newQuery;

	// 	if (_query) {
	// 		newQuery = query(
	// 			colRef,
	// 			orderBy("metadata.updatedAtDatetime", "desc"),
	// 			where(..._query),
	// 			limit(500)
	// 		);
	// 	} else {
	// 		newQuery = query(colRef, orderBy("metadata.updatedAtDatetime", "desc"));
	// 	}

	// 	dispatch({ type: "IS_PENDING" });

	// 	onSnapshot(
	// 		newQuery,
	// 		snapShot => {
	// 			const results = [];
	// 			console.log(`snapShot`, snapShot);
	// 			snapShot.docs.forEach(doc => {
	// 				results.push({ id: doc.id, ...doc.data() });
	// 			});
	// 			dispatch({ type: "SUCCESS", payload: results });
	// 			if (results?.length > 0) {
	// 				// setErfsContext({
	// 				// 	...erfsContext,
	// 				// 	erfs: results,
	// 				// });
	// 			}
	// 		},
	// 		error => {
	// 			console.log(`firestore err`, error.message);
	// 			dispatch({ type: "ERROR", payload: error.message });
	// 		}
	// 	);
	// };

	const getCollectionCount = async _query => {
		// console.log(`..._query`, ..._query);
		let newQuery;

		if (_query) {
			newQuery = query(colRef, where(..._query));
		} else {
			newQuery = query(colRef);
		}

		dispatch({ type: "IS_PENDING" });

		getCountFromServer(newQuery)
			.then(snapshot => {
				const count = snapshot.data().count;
				console.log(`count`, count);
				dispatch({ type: "SUCCESS", payload: count });
			})
			.catch(error => {
				console.log(`firestore err`, error.message);
				dispatch({ type: "ERROR", payload: error.message });
			});
	};

	return { state, getCollectionCount };
};

export default useGetCollectionInfo;
