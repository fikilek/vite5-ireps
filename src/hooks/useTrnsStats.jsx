// contexts
import { getRandomColor } from "@/utils/utils";

export const useTrnsStats = () => {
	const getTrnTypesStats = (trns) => {
		// get all trns from trnsContext
		// const { trns } = trnsContext;

		// Get stats of each trn type
		const stats = {};
		trns?.forEach((trn) => {
			stats[trn.metadata.trnType] = 1 + (stats[trn.metadata.trnType] || 0);
		});
		// console.log(`stats`, stats);

		// Update the stats to include other properties including percentage and random color
		// for each trn type. Random  color will be used in charts.
		const statsTrnType = [];
		for (const trntype in stats) {
			// console.log(`${trntype}: ${object[property]}`);

			const percentage = ((stats[trntype] / trns?.length) * 100).toFixed(2);

			statsTrnType.push({
				trntype: trntype,
				// displayName: matchingTrn?.metadata?.createdByUser,
				quantity: stats[trntype],
				percentage: percentage,
				fillColor: getRandomColor(),
			});
		}

		return {
			stats: statsTrnType,
			total: trns?.length,
		};
	};

	const getTrnTypePerUserStats = (trns) => {
		// Iterate over trns and find total per user for each trn type

		// Get stats of each trn type
		const stats = {};
		trns?.forEach((trn) => {
			stats[trn.metadata.trnType] = 1 + (stats[trn.metadata.trnType] || 0);
		});
		// console.log(`stats`, stats);

		// Group each trn type together
		const trnTypes = [];
		for (const trnType in stats) {
			// console.log(`stats`, trnType);

			const trnsGroupedPerTrnType = trns.filter((trn) => {
				return trn.metadata.trnType === trnType;
			});
			trnTypes.push({
				trnType: trnType,
				trns: trnsGroupedPerTrnType,
				total: trnsGroupedPerTrnType?.length,
			});
		}
		// console.log(`trnTypes`, trnTypes);

		// Iterate through trnTypes and count how many users in each trnTpe

		const trnTypeUsers = [];
		trnTypes?.forEach((trnType) => {
			// console.log(`trnType`, trnType);
			const userStats = {};
			trnType.trns?.forEach((trn) => {
				userStats[trn.metadata.createdByUid] =
					1 + (userStats[trn.metadata.createdByUid] || 0);
			});
			trnTypeUsers.push({
				...trnType,
				users: userStats,
			});
		});
		// console.log(`trnTypeUsers`, trnTypeUsers);

		const trnTypeUserStats = [];

		trnTypeUsers?.forEach((trnType) => {
			// console.log(`trnType`, trnType);

			const { users, total } = trnType;

			let usersObj = {};
			for (const uid in users) {
				// console.log(`${uid}: ${users[uid]}`);

				const matchingTrn = trns?.find((trn) => {
					return trn?.metadata?.createdByUid === uid;
				});

				const percentage = ((users[uid] / total) * 100).toFixed(2);

				usersObj[uid] = {
					uid: uid,
					displayName: matchingTrn?.metadata?.createdByUser,
					quantity: users[uid],
					percentage: percentage,
					fillColor: getRandomColor(),
				};
			}
			// console.log(`usersObj`, usersObj);
			trnType = {
				...trnType,
				usersObj,
			};
			trnTypeUserStats.push(trnType);
		});

		// console.log(`trnTypeUserStats`, trnTypeUserStats);

		return {
			stats: trnTypeUserStats,
			total: trns?.length,
		};
	};

	return {
		getTrnTypesStats,
		getTrnTypePerUserStats,
	};
};
