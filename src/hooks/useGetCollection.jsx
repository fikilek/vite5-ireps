import { useEffect, useReducer } from "react";
import { db } from "@/firebaseConfig/fbConfig";
import {
	collection,
	limit,
	onSnapshot,
	orderBy,
	query,
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
				error: null,
			};
		case "SUCCESS":
			// console.log(`action.type`, action.type);
			return {
				data: action.payload,
				isPending: false,
				success: true,
				error: false,
			};
		case "ERROR":
			// console.log(`action.type`, action.type);
			return {
				data: [],
				isPending: false,
				success: false,
				error: action.payoad,
			};
	}
};

const useGetCollection = col => {
	// console.log(`col`, col);
	// console.log(`_query`, _query);

	const [state, dispatch] = useReducer(colReducer, initData);
	// console.log(`state`, state);

	let colRef = collection(db, col);

	const getCollection = constraints => {
		// console.log(`constraints`, constraints);
		

		useEffect(()=>{

			if(!constraints?.length) return
			let newQuery;
			if (constraints) {
	
				newQuery = query(
					colRef,
					...constraints,
					orderBy("metadata.updatedAtDatetime", "desc"),
					// limit(100)
				);
			} else {
				newQuery = query(
					colRef,
					orderBy("metadata.updatedAtDatetime", "desc"),
					limit(100)
				);
			}
			// console.log(`newQuery`, newQuery);
	
			const unsubscribe = onSnapshot(
				newQuery,
				snapShot => {
					const results = [];
					snapShot.docs.forEach(doc => {
						results.push({ id: doc.id, ...doc.data() });
					});
					// console.log(`results`, results)
					dispatch({type: "SUCCESS", payload: results})
				},
				err => {
					console.log(`firestore err`, err.message);
					dispatch({type: "ERROR", payload: err.message})
				}
			);

		}, [constraints])



	};

	return { state, getCollection };
};

export default useGetCollection;
