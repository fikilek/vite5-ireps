// npm library
import * as XLSX from "xlsx/xlsx.mjs";

// css
import "@/components/asts/AstsHeader.css";

// hooks
import { useUser } from "@/hooks/useUser";
import { useAsts } from "@/hooks/useAsts";

// contexts

// components
import PageTitle from "@/pages/PageTitle";
import FilterBtn from "@/components/filters/FilterBtn";
import useAuthContext from "@/hooks/useAuthContext";

const AstsHeader = (props) => {
	const { phLl, context, setContext, tableRef } = props;

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { userFromUsers } = useUser(user.uid);
	// console.log(`userFromUsers`, userFromUsers);

	const { createExportRowData } = useAsts();

	const onPrint = () => {
		// console.log(`e`, e);
		// console.log(`tableRef.current`, tableRef.current);

		const { rowData } = tableRef?.current?.props;
		// console.log(`rowData`, rowData);

		const exportRowData = createExportRowData(rowData);
		// console.log(`exportRowData`, exportRowData);

		// tableRef.current.api.exportDataAsCsv();

		// Extract Data (create a workbook object from the table)
		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.json_to_sheet(exportRowData);
		// console.log(`ws`, ws);

		// // get and array from ws
		// const wsArray = Object.entries(ws);
		// console.log(`wsArray`, wsArray);

		// for (const property in ws) {
		// 	console.log(`Property BEFORE : `, property);
		// 	const after = property.replace(/[^A-Za-z]/g, "");
		// 	console.log(`Property AFTER : `, after);

		// 	ws[`${property}`].l = {
		// 		Target: "https://sheetjs.com",
		// 		// Tooltip: "Find us @ SheetJS.com!",
		// 	};

		// 	console.log(ws[property]);
		// }

		// for (let i = 1; i < wsArray.length + 1; i++) {
		// 	console.log(`Row :`, i);

		// 	console.log(`rowData[${i}]`, rowData[i]);
		// 	ws[
		// 		XLSX.utils.encode_cell({
		// 			c: 1,
		// 			r: i,
		// 		})
		// 	].l = { Target: "https://google.com" };
		// }

		// Process Data (add a new row)
		XLSX.utils.book_append_sheet(wb, ws, "meters");

		// Package and Release Data (`writeFile` tries to write and save an XLSB file)
		XLSX.writeFile(wb, "Report.xlsx");
	};

	return (
		<div className="asts-header">
			<div className="ph ph-left">
				<div className="phLl">
					<FilterBtn context={context} setContext={setContext} />
					<PageTitle title={phLl} />
					<PageTitle title={userFromUsers.workbase} />
				</div>
				<div className="phLr"></div>
			</div>

			<div className="ph ph-right">
				<div className="phRl"></div>
				<div className="phRr">
					<button onClick={onPrint}>Export</button>
				</div>
			</div>
		</div>
	);
};

export default AstsHeader;
