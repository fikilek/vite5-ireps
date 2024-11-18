import { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";

import "@/components/reports/ReportAstsUsersPieChart.css";

const ReportAstsUsersPieChart = (props) => {
	const { data } = props;

	const [chartOptions, setChartOptions] = useState({
		// Data: Data to be displayed in the chart
		data: data,
		// Series: Defines which chart type and data to use
		// series: [{ type: 'pie', xKey: 'month', yKey: 'iceCreamSales' }],
		series: [
			{
				type: "pie",
				angleKey: "quantity",
				legendItemKey: "displayName",
				itemStyler: (params) => {
					// console.log(`params`, params);
					return { fill: params.datum.fillColor };
				},
			},
		],
		title: {
			text: "Meters Created Per Fieldworker",
		},
	});

	useEffect(() => {
		setChartOptions({
			...chartOptions,
			data,
		});
	}, [data]);

	return (
		<div className="report-asts-users-piechart">
			<AgCharts options={chartOptions} />
		</div>
	);
};

export default ReportAstsUsersPieChart;
