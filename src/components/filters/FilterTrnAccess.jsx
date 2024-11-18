import { useContext } from "react";

import "@/components/filters/FilterTrnAccess.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";
import { TrnsContext } from "@/contexts/TrnsContext";

const FilterTrnAccess = () => {
	const { filtersContext, setFiltersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`, filtersContext);

	const { trnsContext, setTrnsContext } = useContext(TrnsContext);
	// console.log(`trnsContext`, trnsContext);

	const { trnAccess } = filtersContext?.filterCondition;
	// console.log(`trnAccess`, trnAccess);

	const selected = trnAccess ? false : true;

	const handleChange = (e) => {
		// console.log(`e.currentTarget.value`, e.currentTarget.value);

		setFiltersContext({
			...filtersContext,
			filterCondition: {
				...filtersContext.filterCondition,
				trnAccess: e.currentTarget.value,
			},
		});
	};

	return (
		<div className="filter-trn-access">
			<select className="fta-select" onChange={handleChange}>
				<option selected={selected} value="">
					Select Filter
				</option>
				<option value="yes">Yes</option>
				<option value="no">No</option>
			</select>
		</div>
	);
};

export default FilterTrnAccess;
