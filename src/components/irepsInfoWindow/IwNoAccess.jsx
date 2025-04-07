// css
import "@/components/irepsInfoWindow/IwNoAccess.css";

// hooks
import useModal from "@/hooks/useModal.jsx";

// component
import TableNoAccess from "@/components/tables/TableNoAccess";
import TableDate from "@/components/tables/TableDate";
import IrepsInfoWindow from "./IrepsInfoWindow";
import { irepsConstants } from "@/utils/utils";
// import TableModalBtn from "@/components/tables/TableModalBtn";

const IwNoAccess = (props) => {
	// console.log(`props`, props);

	const { trns, erfNo } = props.data.data;
	// console.log(`trns`, trns);

	const noAccessTableFields = [
		// {
		// 	field: "astCat",
		// 	headerName: "Ast Category",
		// 	width: 100,
		// },
		{
			field: "updatedByUser",
			headerName: "Updated By",
			// width: 150,
			flex: 0.2,
		},
		{
			field: "updatedAtDatetime",
			headerName: "Updated At Datetime",
			cellRenderer: (params) => {
				console.log(`params`, params);
				const newDate = params?.data?.updatedAtDatetime?.toDate();
				return (
					<TableDate
						date={newDate}
						dateFormat={irepsConstants.IC_DATE_FORMAT1}
					/>
				);
			},
			valueGetter: (params) => {
				return params.data.updatedAtDatetime;
			},
			// width: 180,
			flex: 0.3,
		},
		{
			field: "trnType",
			headerName: "Trn Type",
			// width: 150,
			flex: 0.2,
		},
		{
			field: "noAccessReason",
			headerName: "No Access Reason",
			// width: 150,
			flex: 0.2,
		},
	];

	return (
		<div className="iw-no-access">
			<IrepsInfoWindow
				hl1={"No Access"}
				hr1={<span>Erf No: {erfNo}</span>}
				windowWidth="40rem"
				windowHeight="35rem"
				headerType="headerType3"
			>
				<TableNoAccess rowData={trns} colDefs={noAccessTableFields} />
			</IrepsInfoWindow>
		</div>
	);
};

export default IwNoAccess;
