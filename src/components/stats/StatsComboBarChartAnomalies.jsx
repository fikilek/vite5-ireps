import { AgCharts } from "ag-charts-react";

import "@/components/stats/StatsComboBarChartAnomalies.css";

const StatsComboBarChartAnomalies = (props) => {
	// console.log(`props`, props);

	// get stats from props
	const { userData, barChartSeries } = props?.stats;

	const options = {
		title: {
			text: "Meter Type Per User",
		},
		subtitle: {
			text: "Pre-paid/Conventional",
		},
		data: userData,
		series: barChartSeries,
	};

	return (
		<div className="stats-combo-bar-chart">
			<AgCharts options={options} />
		</div>
	);
};

export default StatsComboBarChartAnomalies;
