// npm libraries
// import { useContext } from "react";

import "@/components/stats/StatsComboTableTrnTypes.css";

// contexts
// import { FiltersContext } from "@/contexts/FiltersContext";
// import { AstsStatsContext } from "@/contexts/AstsStatsContext";
import { capitalizeInitialsString } from "@/utils/utils";

// components
import TableComboData from "@/components/tables/TableComboData";

const StatsComboTableTrnTypes = (props) => {
	// Get trn types from the astsStatsContext
	const { stats, tableRef } = props;
	// console.log(`stats`, stats);

	let columnDefinitions = [
		{
			field: "trntype",
			// width: "150",
			headerName: "Trn Type",
			flex: 4,
		},
		{
			field: "quantity",
			// width: "150",
			// headerName: "",
			flex: 3,
		},
		{
			field: "percentage",
			// width: "150",
			// headerName: "",
			flex: 3,
			valueFormatter: (params) => `${params.value}%`,
		},
	];

	return (
		<div className="stats-combo-table-trn-type">
			<TableComboData
				rowData={stats}
				colDefs={columnDefinitions}
				tableRef={tableRef}
			/>
		</div>
	);
};

export default StatsComboTableTrnTypes;
