import "@/components/tables/TableBtnAddServiceProvider.css";
import "@/components/tables/Table.css";

import { useServiceProviders } from "@/hooks/useServiceProviders.jsx";
import useModal from "@/hooks/useModal.jsx";

const TableBtnAddServiceProvider = () => {
	const { openModal } = useModal();
	const { newFormData } = useServiceProviders();
	const newServiceProvider = e => {
		openModal({
			modalName: "serviceProvider",
			payload: {data: newFormData} ,
		});
	};
	return (
		<div className="table-btn-add-service-provider">
			<button onClick={newServiceProvider}>Add Service Provider</button>
		</div>
	);
};

export default TableBtnAddServiceProvider;
