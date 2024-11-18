// npm libraries
import { useContext, useRef } from "react";

import "@/components/reports/ReportTrnTypesPerUser.css";

// contexts
import { TrnsStatsContext } from "@/contexts/TrnsStatsContext";

import ReportHeadingTrn from "@/components/reports/ReportHeadingTrn";
import StatsCombo from "@/components/stats/StatsCombo";
import StatsComboTableTrnPerUser from "@/components/stats/StatsComboTableTrnPerUser";
// import StatsComboBarChartAnomalies from "@/components/stats/StatsComboBarChartAnomalies";
// import StatsComboPieChart from "@/components/stats/StatsComboPieChart";
import StatsCard from "@/components/stats/StatsCard";

import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { CsvExportModule } from "@ag-grid-community/csv-export";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
ModuleRegistry.registerModules([CsvExportModule]);

const ReportTrnTypesPerUser = () => {
	const { trnsStatsContext } = useContext(TrnsStatsContext);
	// console.log(`trnsStatsContext`, trnsStatsContext);

	const tableRef = useRef();

	const { trnTypePerUserStats } = trnsStatsContext;
	// console.log(`trnTypePerUserStats`, trnTypePerUserStats);

	const handleClick = (e) => {
		// console.log(`export btn clicked`, e.target.value);
		// console.log(`tableRef`, tableRef);
		tableRef.current.api.exportDataAsCsv();
	};

	const statsName = "Trn Type Per User";
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
		<div className={`report-trn-types-per-user`}>
			<ReportHeadingTrn
				title="Trn Type Per User Stats"
				stats={trnTypePerUserStats}
			/>

			{/* display main anomalies data */}
			<div className="rttpu-body">
				<StatsCombo statsName={statsName}>
					<StatsCard
						statsName={statsName}
						stats={trnTypePerUserStats}
						headerData={headerDataGeneric}
					>
						<StatsComboTableTrnPerUser
							stats={trnTypePerUserStats}
							tableRef={tableRef}
						/>
					</StatsCard>

					{/* <StatsCard
						statsName={`${statsName} Bar Chart`}
						stats={trnTypePerUserStats}
						headerData={headerDataGeneric}
					>
						<StatsComboBarChartAnomalies stats={trnTypePerUserStats} />
					</StatsCard> */}
				</StatsCombo>
			</div>
		</div>
	);
};

export default ReportTrnTypesPerUser;
