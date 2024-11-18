// css
import "@/components/asts/astsActivity/AstsActivityBody.css";

// components
import AstsActivityTrns from "@/components/asts/astsActivity/AstsActivityTrns";
import AstsActivityMeterHistory from "@/components/asts/astsActivity/AstsActivityMeterHistory";
import AstsActivityTrnHistory from "@/components/asts/astsActivity/AstsActivityTrnHistory";
import AstsActivityMedia from "@/components/asts/astsActivity/AstsActivityMedia";
import AstsActivityTimeline from "@/components/asts/astsActivity/AstsActivityTimeline";
import AstsActivityComments from "@/components/asts/astsActivity/AstsActivityComments";

const AstsActivityBody = (props) => {
	// console.log(`props`, props);
	const { activeTab, ast } = props;
	// console.log(`activeTab`, activeTab);

	return (
		<div className="asts-activity-body">
			{activeTab === "possibleTrns" && <AstsActivityTrns ast={ast} />}
			{activeTab === "meterhistory" && <AstsActivityMeterHistory ast={ast} />}
			{activeTab === "trnHistory" && <AstsActivityTrnHistory ast={ast} />}
			{activeTab === "media" && <AstsActivityMedia ast={ast} />}
			{activeTab === "timeline" && <AstsActivityTimeline ast={ast} />}
			{activeTab === "comments" && <AstsActivityComments ast={ast} />}
		</div>
	);
};

export default AstsActivityBody;
