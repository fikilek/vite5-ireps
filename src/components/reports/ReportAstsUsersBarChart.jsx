import { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";

import "@/components/reports/ReportAstsUsersBarChart.css";

const ReportAstsUsersBarChart = (props) => {
	const { data } = props;
	// console.log(`data`, data);

	const [chartOptions, setChartOptions] = useState({
		// Data: Data to be displayed in the chart
		data: data,
		// Series: Defines which chart type and data to use
		series: [
			{
				type: "bar",
				xKey: "displayName",
				yKey: "quantity",
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
		<div className="report-asts-users-barchart">
			<AgCharts options={chartOptions} />
		</div>
	);
};

export default ReportAstsUsersBarChart;
