// nom libraries

// css
import "@/components/asts/AstsMain.css";

// components
import AstsTable from "@/components/asts/AstsTable";
import ReportAstsUsers from "@/components/reports/ReportAstsUsers";
import ReportAstsAnomalies from "@/components/reports/ReportAstsAnomalies";
// import ReportAstsVending from "@/components/reports/ReportAstsVending";
import ReportAstsMeterType from "@/components/reports/ReportAstsMeterType";
import Report from "@/components/reports/Report";

const AstsMain = ({ asts, astsTableFields }) => {
	return (
		<div className="asts-main">
			<AstsTable asts={asts} astsTableFields={astsTableFields} />
			<Report reportName="users">
				<ReportAstsUsers />
			</Report>
			<Report reportName="anomalies">
				<ReportAstsAnomalies />
			</Report>
			{/* <Report reportName="vending">
				<ReportAstsVending />
			</Report> */}
			<Report reportName="meterType">
				<ReportAstsMeterType />
			</Report>
		</div>
	);
};

export default AstsMain;
