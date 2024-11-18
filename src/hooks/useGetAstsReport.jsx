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

function getRandomColor() {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

const useGetAstsReport = (fbCollection) => {
	// console.log(`fbCollection`, fbCollection);
	// console.log(`constraints_`, constraints_);

	const { astsContext, setAstsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);

	const { astsStatsContext, setAstsStatsContext } =
		useContext(AstsStatsContext);
	// console.log(`astsStatsContext`, astsStatsContext);

	const [workbase, setWorkbase] = useState([]);
	// console.log(`workbase`, workbase);

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

			setWorkbase(workbase);

			setError("");
		});
	}, []);

	const getAsts = (constraints) => {
		let constraints_ = where("erf.address.lmMetro", "==", workbase);

		if (constraints) {
			constraints_ = [constraints_, ...constraints];
		} else {
			constraints_ = [
				or(constraints_, where("astData.astState.state", "==", "stores")),
			];
		}

		// console.log(`constraints_`, constraints_);

		const q = query(
			collection(db, fbCollection),
			...constraints_,
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

				// results.splice(10);

				// users stats
				const statsAstsUsers = getAstsUsersStats(results);

				// audits pre-paid and conventional
				const meterTypePerUserStats = getMeterTypePerUserStats(results);

				// anomaly per user stats
				const anomalyPerUserStats = getAnomalyPerUserStats(results);

				const stats = {};
				results?.forEach((ast) => {
					stats[ast.metadata.createdByUid] =
						1 + (stats[ast.metadata.createdByUid] || 0);
				});

				const updatedStats = [];
				for (const uid in stats) {
					// console.log(`${uid}: ${object[property]}`);
					const matchingAst = results.find((ast) => {
						return ast?.metadata?.createdByUid === uid;
					});

					const percentage = ((stats[uid] / results?.length) * 100).toFixed(2);

					updatedStats.push({
						uid: uid,
						displayName: matchingAst?.metadata?.createdByUser,
						quantity: stats[uid],
						percentage: percentage,
						fillColor: getRandomColor(),
					});
				}

				setAstsContext({
					...astsContext,
					asts: results,
					statsCreatedAtDatetimeByUser: updatedStats,
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

				// console.log(`results`, results);
				// setAstsContext((prev) => ({ ...prev, asts: results }));
			},
			(err) => {
				console.log(`firestore err`, err.message);
				setError(err.message);
			}
		);
	};

	return { error, getAsts };
};

export default useGetAstsReport;
