import "@/components/asts/astsActivity/AstsActivityHeader.css";

const AstsActivityHeader = (props) => {
	const { activeTab, setActiveTab } = props;

	const handleClick = (e) => {
		setActiveTab(e.target.id);
	};

	return (
		<div className="asts-activity-header">
			<div className="aah aah-left">
				<button
					id="possibleTrns"
					onClick={handleClick}
					className={`aah-btn possible-trns ${
						activeTab === "possibleTrns" ? "active" : ""
					} `}
				>
					Possible Trns
				</button>
				<button
					id="meterhistory"
					onClick={handleClick}
					className={`aah-btn meter-history ${
						activeTab === "meterhistory" ? "active" : ""
					}`}
				>
					Meter History
				</button>
				<button
					id="trnHistory"
					onClick={handleClick}
					className={`aah-btn trn-history ${
						activeTab === "trnHistory" ? "active" : ""
					}`}
				>
					Trn History
				</button>
			</div>
			<div className="aah aah-right ">
				<button
					id="timeline"
					onClick={handleClick}
					className={`aah-btn timeline ${
						activeTab === "timeline" ? "active" : ""
					}`}
				>
					Timeline
				</button>
				<button
					id="comments"
					onClick={handleClick}
					className={`aah-btn comments ${
						activeTab === "comments" ? "active" : ""
					}`}
				>
					Comments
				</button>
				<button
					id="media"
					onClick={handleClick}
					className={`aah-btn media ${
						activeTab === "media" ? "active" : ""
					}`}
				>
					Media
				</button>
			</div>
		</div>
	);
};

export default AstsActivityHeader;
