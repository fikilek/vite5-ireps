import { useContext } from "react";

import "@/components/filters/FilterGeographicArea.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";

const FilterGeographicArea = () => {
	const { filtersContext, setFiltersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`, filtersContext);

	const { geographicArea } = filtersContext?.filterCondition;
	// console.log(`geographicArea`, astCreation);

	const selected = geographicArea ? false : true;

	const handleChange = (e) => {
		console.log(`e.currentTarget.value`, e.currentTarget.value);
		setFiltersContext({
			...filtersContext,
			filterCondition: {
				...filtersContext.filterCondition,
				geographicArea: e.currentTarget.value,
			},
		});
	};

	return (
		<div className="filter-geographic-area">
			<select className="fga-select" onChange={handleChange}>
				<option selected={selected} value="">
					Select Filter
				</option>
				<option value="Ward1">Ward 1</option>
				<option value="Ward2">Ward 2</option>
				<option value="Ward3">Ward 3</option>
				<option value="Ward4">Ward 4</option>
				<option value="Custom Area 1">Custom Area 1</option>
				<option value="Custom Area 2">Custom Area 2</option>
				<option value="Custom Area 3">Custom Area 3</option>
				<option value="Custom Area 4">Custom Area 4</option>
			</select>
		</div>
	);
};

export default FilterGeographicArea;
