// npm libraries
import { useContext, useRef } from "react";

import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { CsvExportModule } from "@ag-grid-community/csv-export";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
ModuleRegistry.registerModules([CsvExportModule]);

import "@/components/reports/ReportAstsMeterType.css";

// contexts
import { AstsStatsContext } from "@/contexts/AstsStatsContext";

import ReportHeading from "@/components/reports/ReportHeading";
import StatsCombo from "@/components/stats/StatsCombo";
import StatsComboTableMeterTypes from "@/components/stats/StatsComboTableMeterTypes";
import StatsComboBarChartMeterType from "@/components/stats/StatsComboBarChartMeterType";
import StatsComboPieChart from "@/components/stats/StatsComboPieChart";
import StatsCard from "@/components/stats/StatsCard";

import { capitalizeInitialsString } from "@/utils/utils";

const ReportAstsMeterType = () => {
	const { astsStatsContext } = useContext(AstsStatsContext);
	// console.log(`astsStatsContext`, astsStatsContext);

	const tableRef = useRef();

	const { meterTypePerUserStats, anomaliesStats } = astsStatsContext;
	// console.log(`meterTypePerUserStats`, meterTypePerUserStats);
	// console.log(`anomaliesStats`, anomaliesStats);

	const barChartSeries = [];
	let userData = [];
	meterTypePerUserStats?.forEach((item) => {
		// console.log(`item`, item);

		let data = {
			meterTypeName: item.meterTypeName,
		};

		item?.stats?.forEach((user) => {
			// console.log(`user`, user);
			// if the user exist already, dont add
			const result = barChartSeries.some((fw) => fw.uid === user.uid);
			if (!result) {
				const seriesBar = {
					type: "bar",
					xKey: "meterTypeName",
					yKey: user.uid,
					yName: capitalizeInitialsString(user.displayName),
					uid: user.uid,
				};
				barChartSeries.push(seriesBar);
			}
			data = { ...data, [user.uid]: user.quantity };
		});
		// console.log(`data`, data);
		userData.push(data);
	});
	// console.log(`barChartSeries`, barChartSeries);
	// console.log(`userData`, userData);

	const statsData = {
		userData,
		barChartSeries,
	};

	const statsName = "Meter Type Summary";

	const handleClick = (e) => {
		// console.log(`export btn clicked`, e.target.value);
		// console.log(`tableRef`, tableRef);
		tableRef.current?.api?.exportDataAsCsv();
	};

	const headerDataGeneric = {
		hl1: "hl1",
		hl2: "",
		hr1: " ",
		hr2: (
			<>
				<button onClick={handleClick} className="stats-btn stats-btn-export">
					Export
				</button>{" "}
				<button className="stats-btn stats-btn-pdf">Pdf</button>
			</>
		),
	};

	return (
		<div className={`report-asts-meter-type`}>
			{/* <ReportHeading
				title="Meters Type Per User Stats"
				stats={meterTypePerUserStats}
			/> */}

			<div className="ramt-body">
				<StatsCombo statsName="Meter Type Summary">
					<StatsCard
						statsName={`${statsName}`}
						stats={statsData}
						headerData={headerDataGeneric}
					>
						<StatsComboTableMeterTypes
							stats={meterTypePerUserStats}
							tableRef={tableRef}
						/>
					</StatsCard>

					<StatsCard
						statsName={`${statsName} Bar Chart`}
						stats={statsData}
						headerData={headerDataGeneric}
					>
						<StatsComboBarChartMeterType stats={statsData} />
					</StatsCard>

					{/* <StatsCard
						statsName={`${statsName} Pie Chart`}
						stats={statsData}
						headerData={headerDataGeneric}
					>
						<StatsComboPieChart stats={statsData} />
					</StatsCard> */}
				</StatsCombo>
			</div>
		</div>
	);
};

export default ReportAstsMeterType;
