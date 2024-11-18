import { useState, useEffect } from "react";
import {
	collection,
	onSnapshot,
	orderBy,
	where,
	query,
} from "firebase/firestore";

// hooks

// components
import { db } from "@/firebaseConfig/fbConfig";

const useGetStoresAstsCollection = (fbCollection) => {
	// console.log(`fbCollection`, fbCollection);
	// console.log(`_constraints`, _constraints);

	const [asts, setAsts] = useState([]);
	// console.log(`asts`, asts);

	const [error, setError] = useState("");
	// console.log(`error`, error);

	useEffect(() => {
	
			const q = query(
				collection(db, fbCollection),
				where("astData.astState.state", "==", "stores"),
				orderBy("metadata.updatedAtDatetime", "desc")
			);

			setError("");

			const unsubscribe= onSnapshot(
				q,
				(snapShot) => {
					const results = [];
					snapShot.docs.forEach((doc) => {
						results.push({ id: doc.id, ...doc.data() });
					});
					setAsts(results);
				},
				(err) => {
					console.log(`firestore err`, err.message);
					setError(err.message);
				}
			);

			setError("");

			return unsubscribe

	}, []);

	return { asts, error };
};

export default useGetStoresAstsCollection;
