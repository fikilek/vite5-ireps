// npm libraries
import { useContext } from "react";

import "@/components/reports/Report.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";

const Report = (props) => {
	// console.log(`props`, props);
	const { children, reportName } = props;

	const { filtersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`, filtersContext)

	const { activeReport } = filtersContext;
	// console.log(`activeReport`, activeReport);

	const showHide = activeReport === reportName ? "show" : "hide";
	return <div className={`report ${showHide}  `}>{children}</div>;
};

export default Report;
