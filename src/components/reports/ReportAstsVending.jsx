// npm libraries
import { useContext } from "react";

import "@/components/reports/ReportAstsVending.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";

import ReportHeading from "@/components/reports/ReportHeading";

const ReportAstsVending = () => {
	const { filtersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`, filtersContext);

	return (
		<div className={`report-asts-vending`}>
			<ReportHeading title="Asts - Vending Stats" />
			<p>ReportAstsVending</p>
		</div>
	);
};

export default ReportAstsVending;
