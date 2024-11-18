// npm libraries
// import { useContext } from "react";

import "@/components/stats/StatsComboTableTrnPerUser.css";

// contexts
// import { FiltersContext } from "@/contexts/FiltersContext";
// import { AstsStatsContext } from "@/contexts/AstsStatsContext";
import { capitalizeInitialsString } from "@/utils/utils";

// components
import TableComboData from "@/components/tables/TableComboData";

const StatsComboTableTrnPerUser = (props) => {
	// Get asts anomalies from the astsStatsContext
	const { stats, tableRef } = props;
	// console.log(`stats`, stats);

	let columnDefinitions = [
		{
			field: "trnType",
			headerName: "Trn Type Name",
			width: "200",
			// flex: 0.3,
		},
	];

	stats?.stats?.forEach((item) => {
		// console.log(`item`, item);

		const { usersObj } = item;
		// console.log(`usersObj`, usersObj);

		for (const uid in usersObj) {
			const result = columnDefinitions.some(
				(fw) => fw?.valueGetterParam?.uid === uid
			);
			if (!result) {
				columnDefinitions.push({
					field: `userObj.${uid}.quantity`,
					headerName: capitalizeInitialsString(usersObj[uid].displayName),
					width: "60",
					headerTooltip: usersObj[uid].displayName,
					// flex: 0.1,
					valueGetter: (params) => {
						const value = params.data?.usersObj[uid]?.quantity;
						return value ? value : 0;
					},
					valueGetterParam: {
						uid: uid,
					},
				});
			}
		}
	});

	columnDefinitions.push({
		field: "total",
		headerName: "Total",
		width: "100",
		// flex: 0.1,
		cellRenderer: (params) => {
			// console.log(`params.value`, params.value);
			return params.value ? params.value : 0;
		},
	});

	// console.log(`stats`, stats);
	// console.log(`columnDefinitions`, columnDefinitions);

	return (
		<div className="stats-combo-table-trn-per-user">
			<TableComboData
				rowData={stats?.stats}
				colDefs={columnDefinitions}
				tableRef={tableRef}
			/>
		</div>
	);
};

export default StatsComboTableTrnPerUser;
