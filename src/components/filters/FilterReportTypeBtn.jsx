// npm libraries
import { useContext } from "react";

import "@/components/filters/FilterReportTypeBtn.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";

const FilterReportTypeBtn = (props) => {
	const { title, name } = props;
	// console.log(`name`, name);

	const { filtersContext, setFiltersContext } = useContext(FiltersContext);
	// console.log(`filtersContext.activeReport`, filtersContext.activeReport);

	const active = filtersContext.activeReport === name ? "active" : "";

	const handleClick = (e) => {
		// console.log(`e.target.id`, e.target.id);
		const reportName = e.target.id;
		setFiltersContext({
			...filtersContext,
			activeReport:
				filtersContext.activeReport === reportName ? "" : reportName,
		});
	};
	return (
		<div className="filter-report-type-btn">
			<button className={`frt-btn ${active}`} onClick={handleClick} id={name}>
				{title}
			</button>
		</div>
	);
};

export default FilterReportTypeBtn;
