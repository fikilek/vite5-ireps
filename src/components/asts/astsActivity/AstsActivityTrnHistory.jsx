// css
import "@/components/asts/astsActivity/AstsActivityTrnHistory.css";

// components
import IwTrnsOnAst from  "@/components/irepsInfoWindow/IwTrnsOnAst";

const AstsActivityTrnHistory = (props) => {
	console.log(`props`, props);

	const { ast } = props;
	return (
		<div className="ast-activity-trns">
			<IwTrnsOnAst data={{data:ast}} />
		</div>
	);
};

export default AstsActivityTrnHistory;
