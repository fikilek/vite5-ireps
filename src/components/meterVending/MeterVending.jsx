import "@/components/meterVending/MeterVending.css";

import MeterVendingHeader from "@/components/meterVending/MeterVendingHeader";
import TableMeterVendingItems from "@/components/tables/TableMeterVendingItems";
import TableDate from "@/components/tables/TableDate";
import { irepsConstants } from "@/utils/utils";

const MeterVending = (props) => {
	// console.log(`props`, props);
	const { vendingData } = props;

	vendingData?.sort(
		(a, b) =>
			b?.updatedAtDatetime?.toMillis() - a?.updatedAtDatetime?.toMillis()
	);

	const vendingTableFields = [
		{
			field: "id",
			headerName: "id",
			// width: 150,
			flex: 0.2,
			hide: true,
		},
		{
			field: "updatedAtDatetime",
			headerName: "Purchase Date",
			cellRenderer: (params) => {
				// console.log(`params`, params);
				const newDate = params.value.toDate();
				return (
					<TableDate
						date={newDate}
						dateFormat={irepsConstants.IC_DATE_FORMAT1}
					/>
				);
			},
			valueGetter: (params) => {
				// console.log(`params`, params);
				return params.data.updatedAtDatetime;
			},
			// width: 190,
			flex: 0.3,
		},
		{
			field: "meterOwner",
			headerName: "Meter Owner",
			// width: 150,
			flex: 0.4,
		},
		{
			field: "amount",
			headerName: "Amount (R)",
			// width: 150,
			flex: 0.3,
      valueFormatter: params => {
        // console.log(`params`, params);
        return `R ${params.value.toFixed(2)}` 
      }
		},
	];

	return (
		<div className="meter-vending">
			<MeterVendingHeader />

			<TableMeterVendingItems
				rowData={vendingData}
				colDefs={vendingTableFields}
			/>
		</div>
	);
};

export default MeterVending;
