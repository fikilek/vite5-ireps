import { useMemo, useRef } from "react";
import useAuthContext from "@/hooks/useAuthContext";

import "@/components/tables/Table.css";
import "@/components/tables/TableAsts.css";
import { TableCustomNoRowsOverlay } from "@/components/tables/TableCustomNoRowsOverlay";

// ag grid
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const TableAsts = (props) => {
	// console.log(`props`, props);
	const { rowData, colDefs, tableRef } = props;
	// console.log(`rowData`, rowData);

	const gridApiRef = useRef();

	const { user } = useAuthContext();
	// console.log(`user`, user);

	// const { fieldworker, guest } = user?.claims;

	const email = user?.email;
	// console.log(`email`, email);

	const displayName = user?.displayName;
	// console.log(`displayName`, displayName);

	// const sliced = rowData.slice(0, 15);
	// console.log(`sliced`, sliced);

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

	const getRowId = (params) => {
		// console.log(`params`, params);
		return params.data.id;
	};

	const onGridReady = async (params) => {
		// console.log(`params`, params);
		gridApiRef.current = params.api; // <= assigned gridApi value on Grid ready
		// console.log(`gridApiRef.current`, gridApiRef.current);
	};

	const onFirstDataRendered = () => {
		// const filterModel = gridApiRef.current.getFilterModel("metadata.updatedByUser");
		// console.log(`filterModel`, filterModel);

		if (
			!(
				email === "fikilekentane@gmail.com" ||
				email === "zamo@rsteutilities.com" ||
				email === "sbu@isandisoipe.co.za"
			)
		) {
			gridApiRef.current.setColumnFilterModel("metadata.createdByUser", {
				filterType: "text",
				type: "contains",
				filter: displayName,
			});
		}

		// const Model = gridApiRef.current.getFilterModel("metadata.updatedByUser");
		// console.log(`Model before`, Model);

		gridApiRef.current.onFilterChanged();
		// console.log(`Model after`, Model);
	};

	const rowClassRules = {
		"row-disabled": (params) => {
			// console.log(`params?.data?.disabled`, params?.data?.disabled);
			return params?.data?.disabled;
		},
	};

	return (
		<div className="ag-theme-quartz table table-asts">
			<AgGridReact
				rowData={rowData}
				columnDefs={colDefs}
				defaultColDef={defaultColDef}
				pagination={true}
				noRowsOverlayComponent={TableCustomNoRowsOverlay}
				getRowId={getRowId}
				reactiveCustomComponents
				onGridReady={onGridReady}
				onFirstDataRendered={onFirstDataRendered}
				ref={tableRef}
				rowClassRules={rowClassRules}
			/>
		</div>
	);
};

export default TableAsts;
