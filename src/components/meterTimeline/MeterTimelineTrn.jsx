import { capitalizeFirstLetter } from "@/utils/utils";

import "@/components/meterTimeline/MeterTimelineTrn.css";

const MeterTimelineTrn = (props) => {
	// console.log(`props`, props)
	const { trn } = props;
	return (
		<div className="meter-timeline-trn">
			<p>Transaction (Trn)</p>
			<p className="trn-type">{capitalizeFirstLetter(trn?.trnType)}</p>
			<p>{trn?.updatedByUser}</p>
		</div>
	);
};

export default MeterTimelineTrn;
