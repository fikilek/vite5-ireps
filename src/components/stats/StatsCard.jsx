import "@/components/stats/StatsCard.css";

import StatsCardHeader from "@/components/stats/StatsCardHeader";

const StatsCard = (props) => {
	// console.log(`props`, props);
	const { statsName, children, stats, headerData } = props;
	// console.log(`headerData`, headerData);
	return (
		<div className="stats-card">
			<StatsCardHeader
				statsName={statsName}
				stats={stats}
				headerData={headerData}
			/>
			{children}
		</div>
	);
};

export default StatsCard;
