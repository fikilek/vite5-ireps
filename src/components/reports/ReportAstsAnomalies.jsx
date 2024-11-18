// npm libraries
import { useContext, useRef } from "react";

import "@/components/reports/ReportAstsAnomalies.css";

// contexts
import { AstsStatsContext } from "@/contexts/AstsStatsContext";

import ReportHeading from "@/components/reports/ReportHeading";
import StatsCombo from "@/components/stats/StatsCombo";
import StatsComboTableAnomalies from "@/components/stats/StatsComboTableAnomalies";
import StatsComboBarChartAnomalies from "@/components/stats/StatsComboBarChartAnomalies";
import StatsComboPieChart from "@/components/stats/StatsComboPieChart";
import StatsCard from "@/components/stats/StatsCard";

import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { CsvExportModule } from "@ag-grid-community/csv-export";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
ModuleRegistry.registerModules([CsvExportModule]);

const ReportAnomalies = () => {
	const { astsStatsContext } = useContext(AstsStatsContext);
	// console.log(`astsStatsContext`, astsStatsContext);

	const tableRef = useRef();

	const { anomalyPerUserStats } = astsStatsContext;
	// console.log(`anomalyPerUserStats`, anomalyPerUserStats);

	const handleClick = (e) => {
		// console.log(`export btn clicked`, e.target.value);
		// console.log(`tableRef`, tableRef);
		tableRef.current.api.exportDataAsCsv();
	};

	const statsName = "Anomaly Summary";
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
		<div className={`report-asts-anomalies`}>
			<ReportHeading
				title="Meters Anomalies Per User Stats"
				stats={anomalyPerUserStats}
			/>

			{/* display main anomalies data */}
			<div className="raa-body">
				<StatsCombo statsName="Anomaly Summary">
					<StatsCard
						statsName={statsName}
						stats={anomalyPerUserStats}
						headerData={headerDataGeneric}
					>
						<StatsComboTableAnomalies
							stats={anomalyPerUserStats?.stats}
							tableRef={tableRef}
						/>
					</StatsCard>

					{/* <StatsCard
						statsName={`${statsName} Bar Chart`}
						stats={anomalyPerUserStats}
						headerData={headerDataGeneric}
					>
						<StatsComboBarChartAnomalies stats={anomalyPerUserStats} />
					</StatsCard> */}

					{/* <StatsCard
						statsName={`${statsName} Pie Chart`}
						stats={anomalyPerUserStats}
						headerData={headerDataGeneric}
					>
						<StatsComboPieChart stats={anomalyPerUserStats} />
					</StatsCard> */}
				</StatsCombo>
			</div>
		</div>
	);
};

export default ReportAnomalies;
