import "@/components/meterTimeline/MeterTimelineVending.css";

const MeterTimelineVending = (props) => {
	// console.log(`props`, props)
	const { vendingData } = props;
	return (
		<div className="meter-timeline-trn">
			<p>Vending</p>
			<p className="amount">R{vendingData?.amount?.toFixed(2)}</p>
			<p>{vendingData?.meterOwner}</p>
		</div>
	);
};

export default MeterTimelineVending;
