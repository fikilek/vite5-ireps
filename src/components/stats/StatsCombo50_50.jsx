import "@/components/stats/StatsCombo50_50.css";

import StatsCard from "@/components/stats/StatsCard";

const StatsCombo50_50 = (props) => {
	const { children } = props;

	return <div className="stats-combo-50-50">{children}</div>;
};

export default StatsCombo50_50;
