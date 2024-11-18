// npm libraries
// import { useContext } from "react";

import "@/components/stats/StatsComboTableAnomalies.css";

// contexts
// import { FiltersContext } from "@/contexts/FiltersContext";
// import { AstsStatsContext } from "@/contexts/AstsStatsContext";
import { capitalizeInitialsString } from "@/utils/utils";

// components
import TableComboData from "@/components/tables/TableComboData";

const StatsComboTableAnomalies = (props) => {
	// Get asts anomalies from the astsStatsContext
	const { stats, tableRef } = props;
	// console.log(`stats`, stats);

	let columnDefinitions = [
		{
			field: "anomalyName",
			headerName: "Anomaly - Anomaly Detail",
			width: "220",
			// flex: 0.3,
		},
	];
	let anomalyData = [];
	stats?.forEach((anomaly) => {
		// console.log(`anomaly`, anomaly);

		const adsa = anomaly.anomalyDetailStatsArray;
		// console.log(`adsa`, adsa);

		adsa?.forEach((item) => {
			// console.log(`users`, users);
			const users = item.updatedUserStats;
			// console.log(`item`, item);

			const anomalyFieldName = `${anomaly.anomalyName}-${item.anomalyDetailName}`;
			// console.log(`anomalyFieldName`, anomalyFieldName);

			let userObj = {};
			users?.forEach((user) => {
				// console.log(`user`, user);
				userObj[user.uid] = {
					user: user,
				};

				const result = columnDefinitions.some(
					(fw) => fw?.valueGetterParam?.uid === user.uid
				);
				if (!result) {
					columnDefinitions.push({
						field: `userObj.${user.uid}.user.quantity`,
						headerName: capitalizeInitialsString(user.displayName),
						width: "58",
						headerTooltip: user.displayName,
						// flex: 0.1,
						valueGetter: (params) => {
							const value = params.data?.userObj[user?.uid]?.user?.quantity;
							return value ? value : 0;
						},
						valueGetterParam: {
							uid: user.uid,
						},
					});
				}
			});
			// console.log(`userObj`, userObj);

			anomalyData.push({
				anomalyName: anomalyFieldName,
				anomalyDetailStats: item.anomalyDetailStats,
				userObj,
			});

			// console.log(`userData`, userData);
		});
	});
	// console.log(`anomalyData`, anomalyData);
	// console.log(`columnDefinitions`, columnDefinitions);

	columnDefinitions.push({
		field: "anomalyDetailStats",
		headerName: "Total",
		width: "100",
		// flex: 0.1,
		cellRenderer: (params) => {
			// console.log(`params.value`, params.value);
			return params.value ? params.value : 0;
		},
	});

	return (
		<div className="stats-combo-table-anomalies">
			<TableComboData
				rowData={anomalyData}
				colDefs={columnDefinitions}
				tableRef={tableRef}
			/>
		</div>
	);
};

export default StatsComboTableAnomalies;
