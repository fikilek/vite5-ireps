// css
import "@/components/asts/astsActivity/AstsActivityComments.css";

// components
import ComingSoon from "@/components/roadmap/ComingSoon";

const AstsActivityComments = (props) => {
	console.log(`props`, props);

	const { ast } = props;
	return (
		<div className="ast-activity-trns">
			<ComingSoon
				title="Meter Comments"
				content="This display all text comments recorded for the meter."
			/>
		</div>
	);
};

export default AstsActivityComments;
