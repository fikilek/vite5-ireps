// css
import "@/components/filters/FilterReport.css";

// contexts

// components
import FilterReportTypeBtn from "@/components/filters/FilterReportTypeBtn";

const FilterReport = () => {
	return (
		<div className="filter-reports">
			<div className="filter-report-body">
				<FilterReportTypeBtn title="Meters Per User Stats" name="users" />
				<FilterReportTypeBtn
					title="Meters Type Per User Stats"
					name="meterType"
				/>
				{/* <FilterReportTypeBtn
					title="Meter Phase Per Users Report"
					name="meterPhase"
				/> */}
				<FilterReportTypeBtn
					title="Meters Anomalies Per User Stats"
					name="anomalies"
				/>
				{/* <FilterReportTypeBtn title="Meters Vending Stats" name="vending" /> */}
			</div>
		</div>
	);
};

export default FilterReport;
