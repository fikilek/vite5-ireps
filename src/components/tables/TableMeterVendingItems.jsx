import { useMemo } from "react";

import "@/components/tables/Table.css";
import "@/components/tables/TableMeterVendingItems.css";

import { TableCustomNoRowsOverlay } from "@/components/tables/TableCustomNoRowsOverlay";

// ag grid
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const TableMeterVendingItems = props => {
	// console.log(` TableMeterVendingItems`, props);
	const { rowData, colDefs } = props;

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			floatingFilter: true,
			suppressMovable: true,
			// flex: 1,
		}),
		[]
	);

	return (
		<div className="ag-theme-quartz table table-trns-on-ast">
			<AgGridReact
				rowData={rowData}
				columnDefs={colDefs}
				defaultColDef={defaultColDef}
				pagination={true}
				noRowsOverlayComponent={TableCustomNoRowsOverlay}
				reactiveCustomComponents
				domLayout={"autoHeight"}
			/>
		</div>
	);
};

export default TableMeterVendingItems;
