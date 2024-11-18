import "@/components/stats/StatsCombo.css";

// import StatsCard from "@/components/stats/StatsCard";

const StatsCombo = (props) => {
	const { children } = props;

	return <div className="stats-combo">{children}</div>;
};

export default StatsCombo;
