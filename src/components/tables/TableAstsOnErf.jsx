import { useMemo } from "react";

import "@/components/tables/Table.css";
import "@/components/tables/TableAstsOnErf.css";

import { TableCustomNoRowsOverlay } from "@/components/tables/TableCustomNoRowsOverlay";

// ag grid
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const TableAstsOnErf = props => {
	// console.log(`TableAstsOnErf props`, props);
	const { rowData, colDefs } = props;

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			floatingFilter: true,
			suppressMovable: true,
			flex: 1,
		}),
		[]
	);

	const getRowId = params => {
		// console.log(`params`, params);
		return params.data.id;
	};

	return (
		<div className="ag-theme-quartz table table-erfs">
			<AgGridReact
				rowData={rowData}
				columnDefs={colDefs}
				defaultColDef={defaultColDef}
				pagination={true}
				noRowsOverlayComponent={TableCustomNoRowsOverlay}
				getRowId={getRowId}
				reactiveCustomComponents
			/>
		</div>
	);
};

export default TableAstsOnErf;
