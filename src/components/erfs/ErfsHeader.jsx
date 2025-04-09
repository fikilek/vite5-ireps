// import { useCallback, useContext } from "react";
import * as XLSX from "xlsx/xlsx.mjs";

// css
import "@/components/erfs/ErfsHeader.css";

// hooks
import { useUser } from "@/hooks/useUser";
import { useErfs } from "@/hooks/useErfs";
import useAuthContext from "@/hooks/useAuthContext";

// components
// import { ErfsContext } from "@/contexts/ErfsContext";
import PageTitle from "@/pages/PageTitle";
// import FilterBtn from "@/components/filters/FilterBtn";
// import BtnPageHeaderBtn from "@/components/buttons/BtnPageHeaderBtn";

const ErfsHeader = (props) => {
	// props
	const { phLl, tableRef } = props;

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { createExportRowData } = useErfs();

	const { userFromUsers } = useUser(user?.uid);
	// console.log(`userFromUsers`, userFromUsers);

	// context
	// const { setErfsContext } = useContext(ErfsContext);

	// handle event - active tab
	// const handleActiveTab = useCallback(
	// 	(e) => {
	// 		// console.log(`e.target.id`, e.target.id);
	// 		setErfsContext((prev) => {
	// 			return {
	// 				...prev,
	// 				activeTab: e.target.id,
	// 			};
	// 		});
	// 	},
	// 	[setErfsContext]
	// );

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

		// Process Data (add a new row)
		XLSX.utils.book_append_sheet(wb, ws, "erfs");

		// Package and Release Data (`writeFile` tries to write and save an XLSB file)
		XLSX.writeFile(wb, "Report.xlsx");
	};

	return (
		<div className="erfs-header">
			<div className="ph ph-left">
				<div className="phLl">
					{/* <FilterBtn /> */}
					<PageTitle title={phLl} />
					<PageTitle title={userFromUsers.workbase} />
				</div>
			</div>

			<div className="ph ph-right">
				<div className="phRl"></div>
				<div className="phRr">
					<button onClick={onPrint}>Export</button>
					{/* <BtnPageHeaderBtn
						handleClick={handleActiveTab}
						tabName="table"
					/> */}
					{/* <BtnPageHeaderBtn
						handleClick={handleActiveTab}
						tabName="split"
					/> */}
					{/* <BtnPageHeaderBtn
						handleClick={handleActiveTab}
						tabName="map"
					/> */}
				</div>
			</div>
		</div>
	);
};

export default ErfsHeader;
