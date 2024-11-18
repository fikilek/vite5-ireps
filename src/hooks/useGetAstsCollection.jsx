import { useState, useEffect, useContext } from "react";
import {
	collection,
	onSnapshot,
	orderBy,
	where,
	query,
	or,
} from "firebase/firestore";

// hooks
import useAuthContext from "@/hooks/useAuthContext";
import { useFirestore_ } from "@/hooks/useFirestore_";
import { useAstsStats } from "@/hooks/useAstsStats.jsx";

// contexts
import { AstsContext } from "@/contexts/AstsContext";
import { AstsStatsContext } from "@/contexts/AstsStatsContext";

// components
import { db } from "@/firebaseConfig/fbConfig";

const useGetAstsCollection = (fbCollection) => {
	// console.log(`fbCollection`, fbCollection);

	const { astsContext, setAstsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);

	const { astsStatsContext, setAstsStatsContext } =
		useContext(AstsStatsContext);
	// console.log(`astsStatsContext`, astsStatsContext);

	const [asts, setAsts] = useState([]);
	// console.log(`asts`, asts);

	const [error, setError] = useState("");
	// console.log(`error`, error);

	const { getDocument } = useFirestore_("users");

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const {
		getAstsUsersStats,
		getMeterTypePerUserStats,
		getAnomalyPerUserStats,
	} = useAstsStats();

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
				or(constraints, where("astData.astState.state", "==", "stores")),
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

					setAsts(results);

					// asts per user stats
					const statsAstsUsers = getAstsUsersStats(results);

					// audits pre-paid and conventional
					const meterTypePerUserStats = getMeterTypePerUserStats(results);

					// anomaly per user stats
					const anomalyPerUserStats = getAnomalyPerUserStats(results);

					setAstsContext({
						...astsContext,
						asts: results,
						// statsCreatedAtDatetimeByUser: updatedStats,
						// anomaliesStats,
						// auditsPrepaidStats,
						// auditsConventionalStats,
					});

					setAstsStatsContext((prev) => {
						return {
							...prev,
							statsAstsUsers,
							meterTypePerUserStats,
							anomalyPerUserStats,
							// statsCreatedAtDatetimeByUser: updatedStats,
							// anomaliesStats,
							// auditsPrepaidStats,
							// auditsConventionalStats,
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

	return { asts, error };
};

export default useGetAstsCollection;
