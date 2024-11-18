import "@/components/irepsInfoWindow/ServiceProviderData.css";

import IrepsInfoWindow from "@/components/irepsInfoWindow/IrepsInfoWindow";
import TableServiceProviderData from "@/components/tables/TableServiceProviderData";

const ServiceProviderData = props => {
	console.log(`props`, props);
	const { data } = props;
	const { infoName } = data;
	const displayData = data.data[infoName];
	// console.log(`displayData`, displayData);
	const colDefs = [
		{ field: "name", headerName: "Name" },
		{ field: "email", headerName: "email", flex: 1 },
		{ field: "phone", headerName: "phone" },
		{ field: "address", headerName: "address", flex: 1 },
	];
	return (
		<IrepsInfoWindow infoName={infoName}>
			<div className="service-provider-data">
				<TableServiceProviderData rowData={displayData} colDefs={colDefs} />
			</div>
		</IrepsInfoWindow>
	);
};

export default ServiceProviderData;
