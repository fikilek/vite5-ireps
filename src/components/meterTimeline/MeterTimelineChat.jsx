import "@/components/meterTimeline/MeterTimelineChat.css";

const MeterTimelineChat = (props) => {
	// console.log(`props`, props)
	const { chat } = props;
	return (
		<div className="meter-timeline-trn">
			<p>Meter Chat</p>
			<p>{chat?.trnType}</p>
			<p className="chat-content">{chat?.chatContent}</p>
			<p>{chat?.updatedByUser}</p>
		</div>
	);
};

export default MeterTimelineChat;
