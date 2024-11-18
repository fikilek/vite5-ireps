import { useMemo } from "react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { AgGridReact } from "@ag-grid-community/react";

// css
import "@/components/tables/Table.css";
import "@/components/tables/TableErfs.css";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// components
import { TableCustomNoRowsOverlay } from "@/components/tables/TableCustomNoRowsOverlay";

const TableErfs = props => {
	const { rowData, colDefs } = props;

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			floatingFilter: true,
			suppressMovable: true,
		}),
		[]
	);

	const getRowId = params => {
		// console.log(`params`, params);
		return params.data.id;
	};

	// const rowClassRules = {
	// 	"row-disabled": params => {
	// 		// console.log(`params?.data?.disabled`, params?.data?.disabled);
	// 		return params?.data?.disabled;
	// 	},
	// };

	return (
		<div className="ag-theme-quartz table table-erfs">
			<AgGridReact
				rowData={rowData}
				columnDefs={colDefs}
				defaultColDef={defaultColDef}
				pagination={true}
				noRowsOverlayComponent={TableCustomNoRowsOverlay}
				getRowId={getRowId}
				// rowClassRules={rowClassRules}
				reactiveCustomComponents
			/>
		</div>
	);
};

export default TableErfs;
