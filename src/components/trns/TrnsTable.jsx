// css
import "@/components/trns/TrnsTable.css";

// hooks

// contexts

// components
import TableTrns from "@/components/tables/TableTrns";
// import { TrnsContext } from "@/contexts/TrnsContext";

const TrnsTable = (props) => {
	// console.log(`props`, props);

	const { trns, trnsTableFields, tableRef } = props;
	// console.log(`trnsTableFields`, trnsTableFields);

	const colDefs = trnsTableFields?.["all"]?.["all"];

	return (
		<div className="trns-table table">
			<TableTrns rowData={trns} colDefs={colDefs} tableRef={tableRef} />
		</div>
	);
};

export default TrnsTable;
