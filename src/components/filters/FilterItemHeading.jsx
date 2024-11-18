// npm libraries
import { useContext } from "react";

// css
import "@/components/filters/FilterItemHeading.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";

const FilterItemHeading = (props) => {
	const { title, name, value } = props;
	// console.log(`name`, name);

	const { filtersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`, filtersContext);

	const { dateRange } = filtersContext;

	// check if the filter condition is set
	const { filterCondition } = filtersContext;
	// console.log(`filterCondition`, filterCondition);

	const filterSet = filterCondition[name];
	// console.log(`filterSet`, filterSet);

	const highText = filterSet ? "text-emphasis" : "";

	return (
		<div className="filter-item-heading">
			<p className={`fih-title ${highText} `}>{title}</p>
		</div>
	);
};

export default FilterItemHeading;
