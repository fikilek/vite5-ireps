// css
import "@/components/asts/AstsTable.css";

// components
import TableAsts from "@/components/tables/TableAsts";

const AstsTable = ({ asts, astsTableFields, tableRef }) => {
	// console.log(`asts`, asts);
	// console.log(`astsTableFields`, astsTableFields);

	return (
		<div className="asts-table table">
			<TableAsts rowData={asts} colDefs={astsTableFields} tableRef={tableRef} />
		</div>
	);
};

export default AstsTable;
