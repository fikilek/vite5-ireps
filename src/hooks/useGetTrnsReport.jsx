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
import { useTrnsStats } from "@/hooks/useTrnsStats.jsx";

// contexts
import { TrnsContext } from "@/contexts/TrnsContext";
import { TrnsStatsContext } from "@/contexts/TrnsStatsContext";

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

const useGetTrnsReport = (fbCollection) => {
	// console.log(`fbCollection`, fbCollection);
	// console.log(`constraints_`, constraints_);

	const { trnsContext, setTrnsContext } = useContext(TrnsContext);
	// console.log(`trnsContext`, trnsContext);

	const { trnsStatsContext, setTrnsStatsContext } =
		useContext(TrnsStatsContext);
	// console.log(`trnsStatsContext`, trnsStatsContext);

	const [workbase, setWorkbase] = useState([]);
	// console.log(`workbase`, workbase);

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

			setWorkbase(workbase);

			setError("");
		});
	}, []);

	const getTrns = (constraints) => {
		console.log(`constraints`, constraints);

		let constraints_ = where("erf.address.lmMetro", "==", workbase);

		if (constraints) {
			constraints_ = [constraints_, ...constraints];
		} else {
			constraints_ = [
				or(constraints_, where("astData.trnstate.state", "==", "stores")),
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
				// console.log(`results`, results);

				// users stats
				const statsTrnType = getTrnTypesStats(results);

				// audits pre-paid and conventional
				const trnTypePerUserStats = getTrnTypePerUserStats(results);

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

				setTrnsContext({
					...trnsContext,
					trns: results,
					statsCreatedAtDatetimeByUser: updatedStats,
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
	};

	return { error, getTrns };
};

export default useGetTrnsReport;
