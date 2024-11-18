import "@/components/tables/Table.css";
import "@/components/tables/TableComboData.css";

// ag grid
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { CsvExportModule } from "@ag-grid-community/csv-export";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
ModuleRegistry.registerModules([CsvExportModule]);

const TableComboData = (props) => {
	// console.log(`props`, props)
	const { rowData, colDefs, tableRef } = props;

	return (
		<div className="ag-theme-quartz table table-combo-data">
			<AgGridReact
				ref={tableRef}
				rowData={rowData}
				columnDefs={colDefs}
				domLayout={"autoHeight"}
			/>
		</div>
	);
};

export default TableComboData;
