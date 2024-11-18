// npm libraries

// contexts
import { getRandomColor } from "@/utils/utils";

export const useAstsStats = () => {
	// const { astsStatsContext, setAstsStatsContext } =
	// 	useContext(AstsStatsContext);
	// console.log(`astsStatsContext`, astsStatsContext);

	// const { astsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);

	const getAstsUsersStats = (asts) => {
		// get all asts from astsContext
		// const { asts } = astsContext;

		// Get stats of who created each ast using uid as the key
		const stats = {};
		asts?.forEach((ast) => {
			stats[ast.metadata.createdByUid] =
				1 + (stats[ast.metadata.createdByUid] || 0);
		});
		// console.log(`stats`, stats);

		// Update the stats to include other properties including displayName, percentage and random color
		// for each user. Random  color will be used in charts.
		const statsAstsUsers = [];
		for (const uid in stats) {
			// console.log(`${uid}: ${object[property]}`);
			const matchingAst = asts?.find((ast) => {
				return ast?.metadata?.createdByUid === uid;
			});

			const percentage = ((stats[uid] / asts?.length) * 100).toFixed(2);

			statsAstsUsers.push({
				uid: uid,
				displayName: matchingAst?.metadata?.createdByUser,
				quantity: stats[uid],
				percentage: percentage,
				fillColor: getRandomColor(),
			});
		}

		return {
			stats: statsAstsUsers,
			total: asts?.length,
		};
	};

	const getMeterTypePerUserStats = (asts) => {
		// Iterate over asts and find total for each user per meter type (pre-paid or conventional)
		/**************************************************************
		pre-paid
		***************************************************************/
		const allAstsPrePaid = asts.filter((ast) => {
			return ast.astData.meter.type === "pre-paid";
		});
		// console.log(`allAstsPrePaid`, allAstsPrePaid);

		// Count quantity for each user in the asts pre-paid
		const prepaidPerUserStats = {};
		allAstsPrePaid?.forEach((ast) => {
			prepaidPerUserStats[ast.metadata.createdByUid] =
				1 + (prepaidPerUserStats[ast.metadata.createdByUid] || 0);
		});
		// console.log(`prepaidPerUserStats`, prepaidPerUserStats);

		const prepaidStats = [];
		for (const uid in prepaidPerUserStats) {
			// console.log(`${uid}: ${prepaidPerUserStats[uid]}`);

			const matchingAst = allAstsPrePaid?.find((ast) => {
				return ast?.metadata?.createdByUid === uid;
			});

			const percentage = (
				(prepaidPerUserStats[uid] / allAstsPrePaid?.length) *
				100
			).toFixed(2);

			prepaidStats.push({
				uid: uid,
				displayName: matchingAst?.metadata?.createdByUser,
				quantity: prepaidPerUserStats[uid],
				percentage: percentage,
				fillColor: getRandomColor(),
			});
		}
		// console.log(`prepaidStats`, prepaidStats);

		/**************************************************************
		conventional
		*************************************************************/

		const allAstsConventional = asts.filter((ast) => {
			return ast.astData.meter.type === "conventional";
		});
		// console.log(`allAstsConventional`, allAstsConventional);

		// Count quantity for each user in the asts conventional
		const conventionalPerUserStats = {};
		allAstsConventional?.forEach((ast) => {
			conventionalPerUserStats[ast.metadata.createdByUid] =
				1 + (conventionalPerUserStats[ast.metadata.createdByUid] || 0);
		});
		// console.log(
		// 	`conventionalPerUserStats`,
		// 	conventionalPerUserStats
		// );

		const conventionalStats = [];
		for (const uid in conventionalPerUserStats) {
			// console.log(`${uid}: ${object[property]}`);
			const matchingAst = allAstsConventional?.find((ast) => {
				return ast?.metadata?.createdByUid === uid;
			});

			const percentage = (
				(conventionalPerUserStats[uid] / allAstsConventional?.length) *
				100
			).toFixed(2);

			conventionalStats.push({
				uid: uid,
				displayName: matchingAst?.metadata?.createdByUser,
				quantity: conventionalPerUserStats[uid],
				percentage: percentage,
				fillColor: getRandomColor(),
			});
		}
		// console.log(`conventionalStats`, conventionalStats);

		return [
			{
				meterTypeName: "pre-paid",
				stats: prepaidStats,
				total: allAstsPrePaid?.length,
			},
			{
				meterTypeName: "conventional",
				stats: conventionalStats,
				total: allAstsConventional.length,
			},
		];
	};

	const getAnomalyPerUserStats = (asts) => {
		// Iterate through the array of asts and accumulate a total for each anomaly
		const anomalyStats = {};
		asts?.forEach((ast) => {
			anomalyStats[ast?.anomalies?.anomaly] =
				1 + (anomalyStats[ast?.anomalies?.anomaly] || 0);
		});
		// console.log(`anomalyStats`, anomalyStats);

		// Step 3: Iterate through anomalyStats and create user stats and anomaly explanation stats
		const anomalyEntries = Object.entries(anomalyStats);
		// console.log(`anomalyEntries`, anomalyEntries);

		let anomaliesStats = [];
		anomalyEntries?.forEach((anomaly) => {
			// console.log(`anomaly`, anomaly);

			const anomalyName = anomaly[0];
			// console.log(`anomalyName`, anomalyName);

			const anomalyStats = anomaly[1];
			// console.log(`anomalyStats`, anomalyStats);

			// extract asts that match each anomalyName and create an array
			const anomalyNameArray = asts?.filter((ast) => {
				return ast?.anomalies?.anomaly === anomalyName;
			});
			// console.log(`--------------------------------------------`);
			// console.log(`anomalyName`, anomalyName);
			// console.log(`anomalyNameArray`, anomalyNameArray);

			// get anomaly explanation and stats for each
			const anomalyDetailStatsObj = {};
			anomalyNameArray?.forEach((ast) => {
				anomalyDetailStatsObj[ast?.anomalies?.anomalyDetail] =
					1 + (anomalyDetailStatsObj[ast?.anomalies?.anomalyDetail] || 0);
			});
			// console.log(`anomalyDetailStatsObj`, anomalyDetailStatsObj);

			const anomalyDetailStatsArray = [];
			for (const anomalyDetail in anomalyDetailStatsObj) {
				// console.log(`${uid}: ${object[property]}`);
				const anomalyDArray = asts?.filter((ast) => {
					return ast?.anomalies?.anomalyDetail === anomalyDetail;
				});
				// console.log(`anomalyDetail`, anomalyDetail);
				// console.log(`anomalyDArray`, anomalyDArray);

				const userStats = {};
				anomalyDArray?.forEach((ast) => {
					userStats[ast.metadata.createdByUid] =
						1 + (userStats[ast.metadata.createdByUid] || 0);
				});
				// console.log(`userStats`, userStats);

				const updatedUserStats = [];
				for (const uid in userStats) {
					// console.log(`${uid}: ${object[property]}`);
					const matchingAst = anomalyDArray?.find((ast) => {
						return ast?.metadata?.createdByUid === uid;
					});

					const percentage = ((userStats[uid] / asts?.length) * 100).toFixed(2);

					updatedUserStats.push({
						uid: uid,
						displayName: matchingAst?.metadata?.createdByUser,
						quantity: userStats[uid],
						percentage: percentage,
						fillColor: getRandomColor(),
					});
				}

				anomalyDetailStatsArray.push({
					anomalyDetailName: anomalyDetail,
					anomalyDetailStats: anomalyDArray.length,
					updatedUserStats,
				});
			}
			// console.log(`anomalyDetailStatsArray`, anomalyDetailStatsArray);

			anomaliesStats.push({
				anomalyName,
				anomalyStats,
				anomalyDetailStatsArray,
			});
		});
		// console.log(`anomaliesStats`, anomaliesStats);

		return {
			stats: anomaliesStats,
			total: asts.length,
		};
	};

	return {
		getAstsUsersStats,
		getMeterTypePerUserStats,
		getAnomalyPerUserStats,
	};
};
