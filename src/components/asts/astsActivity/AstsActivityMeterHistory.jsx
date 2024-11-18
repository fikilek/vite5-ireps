// css
import "@/components/asts/astsActivity/AstsActivityMeterHistory.css";

// components
import ComingSoon from "@/components/roadmap/ComingSoon"

const AstsActivityMeterHistory = (props) => {
	// console.log(`props`, props);

	const { ast } = props;
	return <div className="ast-activity-trns">
		<ComingSoon title="Meter History" content="This display all activity that iREPS recorded 
		on a meter from when meter life started on to the end thus allowing lifetime tracking of an asset. 
		This will include installation or audit, inspection, tid, disconnection, reconnection, decommissioning and disposal." />
	</div>;
};

export default AstsActivityMeterHistory;
