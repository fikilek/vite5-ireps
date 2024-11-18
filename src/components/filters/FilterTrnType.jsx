import { useContext } from "react";

import "@/components/filters/FilterTrnType.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";
import { TrnsContext } from "@/contexts/TrnsContext";

const FilterTrnType = () => {
	const { filtersContext, setFiltersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`, filtersContext);

	const { trnsContext, setTrnsContext } = useContext(TrnsContext);
	// console.log(`trnsContext`, trnsContext);

	const { trnType } = filtersContext?.filterCondition;
	// console.log(`trnType`, trnType);

	const selected = trnType ? false : true;

	const handleChange = (e) => {
		// console.log(`e.currentTarget.value`, e.currentTarget.value);

		setFiltersContext({
			...filtersContext,
			filterCondition: {
				...filtersContext.filterCondition,
				trnType: e.currentTarget.value,
			},
		});
	};

	return (
		<div className="filter-trn-type">
			<select className="ftt-select" onChange={handleChange}>
				<option selected={selected} value="">
					Select Filter
				</option>
				<option value="audit">Audits</option>
				<option value="tid">Tid</option>
				<option value="installation">Installations</option>
				<option value="inspection">Inspections</option>
				<option value="disconnection">Disconnections</option>
				<option value="reconnection">Reconnections</option>
				<option value="decommissioning">Decommissioning</option>
			</select>
		</div>
	);
};

export default FilterTrnType;
