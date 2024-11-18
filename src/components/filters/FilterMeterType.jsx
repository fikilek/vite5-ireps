import { useContext } from "react";

import "@/components/filters/FilterMeterType.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";

const MeterType = () => {
	const { filtersContext, setFiltersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`, filtersContext);

	const { astMeterType } = filtersContext?.filterCondition;
	// console.log(`meterType`, meterType);

	const selected = astMeterType ? false : true;

	const handleChange = (e) => {
		// console.log(`e.currentTarget.value`, e.currentTarget.value);
		setFiltersContext({
			...filtersContext,
			filterCondition: {
				...filtersContext.filterCondition,
				astMeterType: e.currentTarget.value,
			},
		});
	};

	return (
		<div className="meter-type">
			<select className="mt-select" onChange={handleChange}>
				<option selected={selected} value="">
					Select Filter
				</option>
				<option value="pre-paid">Pre-paid</option>
				<option value="conventional">Conventional</option>
			</select>
		</div>
	);
};

export default MeterType;
