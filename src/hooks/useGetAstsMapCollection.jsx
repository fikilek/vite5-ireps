import { useState, useEffect } from "react";
import {
	collection,
	onSnapshot,
	orderBy,
	where,
	query,
} from "firebase/firestore";

// hooks
import useAuthContext from "@/hooks/useAuthContext";
import { useFirestore_ } from "./useFirestore_";

// components
import { db } from "@/firebaseConfig/fbConfig";

const useGetAstsMapCollection = (fbCollection) => {
	// console.log(`fbCollection`, fbCollection);
	// console.log(`_constraints`, _constraints);

	const [asts, setAsts] = useState([]);
	// console.log(`asts`, asts);

	const [error, setError] = useState("");
	// console.log(`error`, error);

	const { getDocument } = useFirestore_("users");

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { uid } = user;
	// console.log(`uid`, uid);

	useEffect(() => {
		getDocument(uid).then((userData) => {
			// console.log(`userData`, userData);

			const { workbase } = userData?.doc;
			// console.log(`workbase`, workbase);

			const q = query(
				collection(db, fbCollection),
				where("erf.address.lmMetro", "==", workbase),
				orderBy("metadata.updatedAtDatetime", "desc")
			);

			setError("");

			onSnapshot(
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
		});
	}, []);

	return { asts, error };
};

export default useGetAstsMapCollection;
