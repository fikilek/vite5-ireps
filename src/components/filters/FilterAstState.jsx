import { useContext } from "react";

import "@/components/filters/FilterAstState.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";

const FilterAstState = () => {
	const { filtersContext, setFiltersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`, filtersContext);

	const { astState } = filtersContext?.filterCondition;
	// console.log(`astState`, astState);

	const selected = astState ? false : true;

	const handleChange = (e) => {
		// console.log(`e.currentTarget.value`, e.currentTarget.value);
		setFiltersContext({
			...filtersContext,
			filterCondition: {
				...filtersContext.filterCondition,
				astState: e.currentTarget.value,
			},
		});
	};
	return (
		<div className="filter-ast-state">
			<select className="fas-select" onChange={handleChange}>
				<option selected={selected} value="">
					Select Filter
				</option>
				<option value="stores">Stores</option>
				<option value="checkedOutPending">Checked Out Pending</option>
				<option value="checkedOut">Checked Out</option>
				<option value="field">Field</option>
				<option value="service">Service</option>
				<option value="disconnected">Disconnected</option>
				<option value="decommissioned">Decommissioned</option>
			</select>
		</div>
	);
};

export default FilterAstState;
