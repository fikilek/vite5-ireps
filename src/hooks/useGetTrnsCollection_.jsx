import { useState, useEffect, useContext } from "react";
import {
	collection,
	onSnapshot,
	orderBy,
	where,
	query,
} from "firebase/firestore";

// hooks
import useAuthContext from "@/hooks/useAuthContext";
import { useFirestore_ } from "@/hooks/useFirestore_";
import { useTrnsStats } from "@/hooks/useTrnsStats.jsx";

// contexts
import { TrnsContext } from "@/contexts/TrnsContext";
import { TrnsStatsContext } from "@/contexts/TrnsStatsContext";

// components
import { db } from "@/firebaseConfig/fbConfig";

const useGetTrnsCollection_ = (fbCollection) => {
	// console.log(`fbCollection`, fbCollection);

	const { trnsContext, setTrnsContext } = useContext(TrnsContext);

	const { setTrnsStatsContext } = useContext(TrnsStatsContext);
	// console.log(`trnsStatsContext`, trnsStatsContext);

	const [trns, setTrns] = useState([]);
	// console.log(`trns`, trns);

	const [error, setError] = useState("");
	// console.log(`error`, error);

	const { getDocument } = useFirestore_("users");

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { getTrnTypesStats, getTrnTypePerUserStats } = useTrnsStats();

	const { uid } = user;
	// console.log(`uid`, uid);

	useEffect(() => {
		getDocument(uid).then((userData) => {
			// console.log(`userData`, userData);

			const { workbase } = userData?.doc;
			// console.log(`workbase`, workbase);

			const constraints = where("erf.address.lmMetro", "==", workbase);
			// console.log(`constraints`, constraints);

			if (!constraints) return;
			const q = query(
				collection(db, fbCollection),
				constraints,
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

					// console.log(`results`, results);
					// results.splice(90);

					setTrns(results);

					// trns per user stats
					const statsTrnType = getTrnTypesStats(results);

					// audits pre-paid and conventional
					const trnTypePerUserStats = getTrnTypePerUserStats(results);

					setTrnsContext({
						...trnsContext,
						trns: results,
						newTrnsData: true,
					});

					setTrnsStatsContext((prev) => {
						return {
							...prev,
							statsTrnType,
							trnTypePerUserStats,
						};
					});
				},
				(err) => {
					console.log(`firestore err`, err.message);
					setError(err.message);
				}
			);

			setError("");
		});
	}, []);

	return { trns, error };
};

export default useGetTrnsCollection_;
