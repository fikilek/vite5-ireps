import { AgCharts } from "ag-charts-react";

import "@/components/stats/StatsComboPieChart.css";

const StatsComboPieChart = (props) => {
	console.log(`props`, props);

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
		<div className="stats-combo-pie-chart">
			<AgCharts options={options} />;
		</div>
	);
};

export default StatsComboPieChart;
