// css
import "@/components/asts/astsActivity/AstsActivityTimeline.css";

const AstsActivityTimeline = (props) => {
	console.log(`props`, props);

	const { ast } = props;
	return <div className="ast-activity-trns">Meter Timeline</div>;
};

export default AstsActivityTimeline;
