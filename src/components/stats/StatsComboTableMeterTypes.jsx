// npm libraries
// import { useContext } from "react";

import "@/components/stats/StatsComboTableMeterTypes.css";

// contexts
// import { FiltersContext } from "@/contexts/FiltersContext";
// import { AstsStatsContext } from "@/contexts/AstsStatsContext";
import { capitalizeInitialsString } from "@/utils/utils";

// components
import TableComboData from "@/components/tables/TableComboData";

const StatsComboTableMeterTypes = (props) => {
	// Get asts anomalies from the astsStatsContext
	const { stats, tableRef } = props;
	// console.log(`stats`, stats);

	let columnDefinitions = [
		{
			field: "meterTypeName",
			headerName: "Meter Type",
			width: "110",
			// flex: 3,
		},
	];

	let meterTypeData = [];

	stats?.forEach((meterType) => {
		// console.log(`meterType`, meterType);

		let users = {};
		meterType?.stats?.forEach((user) => {
			const result = columnDefinitions.some(
				(fw) => fw?.valueGetterParam?.uid === user.uid
			);

			users[user.uid] = {
				user: user,
			};

			if (!result) {
				columnDefinitions.push({
					field: `users.${user.uid}.user.quantity`,
					headerName: capitalizeInitialsString(user.displayName),
					width: "58",
					// flex: 1,
					headerTooltip: user.displayName,
					valueGetter: (params) => {
						// console.log(`params`, params);
						const value = params.data?.users[user?.uid]?.user?.quantity;
						return value ? value : 0;
					},
					valueGetterParam: {
						uid: user.uid,
					},
				});
			}
		});

		meterTypeData.push({
			meterTypeName: meterType.meterTypeName,
			total: meterType.total,
			users,
		});
		// console.log(`userData`, userData);
		// });
	});

	// console.log(`anomalyData`, anomalyData);
	// console.log(`columnDefinitions`, columnDefinitions);

	columnDefinitions.push({
		field: "total",
		headerName: "Total",
		width: "100",
		// flex: 2,
		cellRenderer: (params) => {
			// console.log(`params.value`, params.value);
			return params.value ? params.value : 0;
		},
	});

	// console.log(`meterTypeData`, meterTypeData);
	// console.log(`columnDefinitions`, columnDefinitions);

	return (
		<div className="stats-combo-table-meter-type">
			<TableComboData
				rowData={meterTypeData}
				colDefs={columnDefinitions}
				tableRef={tableRef}
			/>
		</div>
	);
};

export default StatsComboTableMeterTypes;
