// nom libraries

// css
import "@/components/trns/TrnsMain.css";

// components
import TrnsTable from "@/components/trns/TrnsTable";
import ReportTrnTypes from "@/components/reports/ReportTrnTypes";
import ReportTrnTypesPerUser from "@/components/reports/ReportTrnTypesPerUser";
import Report from "@/components/reports/Report";

const TrnsMain = ({ trns, trnsTableFields }) => {
	return (
		<div className="trns-main">
			<TrnsTable trns={trns} trnsTableFields={trnsTableFields} />
			<Report reportName="trnTypes">
				<ReportTrnTypes />
			</Report>
			<Report reportName="trnTypesPerUser">
				<ReportTrnTypesPerUser />
			</Report>
		</div>
	);
};

export default TrnsMain;
