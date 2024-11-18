import "@/components/reports/ReportAstsUsersTable.css";

import TableAstsUsers from "@/components/tables/TableAstsUsers";

const ReportAstsUsersTable = (props) => {
	// console.log(`props`, props);

	const { data } = props;

	const tableFields = [
		{
			field: "uid",
			headerName: "System Id",
			hide: true,
		},
		{
			field: "displayName",
			headerName: "User Name",
			flex: 0.4,
		},
		{
			field: "quantity",
			headerName: "Quantities",
			flex: 0.3,
		},
		{
			field: "percentage",
			headerName: "%",
			flex: 0.3,
		},
	];
	return (
		<div className="report-asts-users-table">
			<TableAstsUsers rowData={data} colDefs={tableFields} />
		</div>
	);
};

export default ReportAstsUsersTable;
