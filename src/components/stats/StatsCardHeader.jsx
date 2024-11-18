import "@/components/stats/StatsCardHeader.css";

import HeaderGeneric4 from "@/components/header/HeaderGeneric4";

const StatsCardHeader = (props) => {
	// console.log(`props`, props);
	const { statsName, headerData } = props;
	const { hl1, hl2, hr1, hr2 } = headerData;
	return (
		<div className="stats-card-header">
			<HeaderGeneric4 hl1={statsName} hl2={hl2} hr1={hr1} hr2={hr2} />
		</div>
	);
};

export default StatsCardHeader;
