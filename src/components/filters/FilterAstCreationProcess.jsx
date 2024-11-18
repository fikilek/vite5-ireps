import { useContext } from "react";

import "@/components/filters/FilterAstCreationProcess.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";

const FilterAstCreationProcess = () => {
	const { filtersContext, setFiltersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`, filtersContext);

	const { astCreation } = filtersContext?.filterCondition;
	// console.log(`astCreation`, astCreation);

	const selected = astCreation ? false : true;

	const handleChange = (e) => {
		// console.log(`e.currentTarget.value`, e.currentTarget.value);
		setFiltersContext({
			...filtersContext,
			filterCondition: {
				...filtersContext.filterCondition,
				astCreation: e.currentTarget.value,
			},
		});
	};

	return (
		<div className="filter-ast-creation-process">
			<select className="fga-select" onChange={handleChange}>
				<option selected={selected} value="">
					Select Filter
				</option>
				<option value="audit">Audits</option>
				<option value="installation">Installations</option>
			</select>
		</div>
	);
};

export default FilterAstCreationProcess;
