import { useState, useEffect } from "react";
import {
	collection,
	limit,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";

// hooks

// components
import { db } from "@/firebaseConfig/fbConfig";

const useCollection = (fbCollection, _constraints) => {
	// console.log(`fbCollection`, fbCollection);
	// console.log(`_constraints`, _constraints);

	const [data, setData] = useState([]);
	const [error, setError] = useState("");
	const [isPending, setIsPending] = useState(null);
	const [success, setSuccess] = useState(null);

	let colRef = collection(db, fbCollection);
	
	useEffect(() => {
		// console.log(`testing array equality`);

		let newQuery;
		if (_constraints && _constraints.length > 0) {

			newQuery = query(
				colRef,
				..._constraints,
				orderBy("metadata.updatedAtDatetime", "desc"),
				limit(100)
			);
		} else {
			newQuery = query(
				colRef,
				orderBy("metadata.updatedAtDatetime", "desc"),
				limit(100)
			);
		}
		// console.log(`newQuery`, newQuery);

		setIsPending(true);
		setSuccess(false);
		setError("");

		const unsubscribe = onSnapshot(
			newQuery,
			snapShot => {
				const results = [];
				snapShot.docs.forEach(doc => {
					results.push({ id: doc.id, ...doc.data() });
				});
				setData(results);
			},
			err => {
				console.log(`firestore err`, err.message);
				setIsPending(false);
				setError(err.message);
			}
		);

		setIsPending(false);
		setSuccess(true);
		setError("");

		return unsubscribe;
	}, []);

	const getData = () => {
		return { data, error, isPending, success };
	};

	return { data, error, isPending, success, getData };
};

export default useCollection;


