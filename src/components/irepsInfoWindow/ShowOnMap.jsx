import { useEffect, useState } from "react";

import "@/components/irepsInfoWindow/ShowOnMap.css";

import IwShowOnMap from "@/components/irepsInfoWindow/IwShowOnMap";
import { useDocument } from "@/hooks/useDocument";

const ShowOnMap = props => {
	// console.log(`props`, props);

	const { erfId, address } = props.data.data.erf;
	// console.log(`erfId`, erfId);
	const { erf } = props.data.data;

	const {lmMetro, ward} = address

	const [gpsPoint, setGpsPoint] = useState({});
	// console.log(`gpsPoint`, gpsPoint);

	const { error, document } = useDocument("erfs", erfId);
	// console.log(`document`, document);
	// console.log(`error`, error);

	useEffect(() => {
		// console.log(`document changed`, document);
		setGpsPoint({
			point: {
				lat: document?.address?.gps?.latitude,
				lng: document?.address?.gps?.longitude,
			},
			label: document?.erfNo,
		});
	}, [document]);

	return (
		<div className="show-on-map">
			{gpsPoint?.point?.lat && (
				<IwShowOnMap
					lat={gpsPoint?.point?.lat}
					lng={gpsPoint?.point?.lng}
					label={gpsPoint?.label}
					ward={ward}
					lmMetro={lmMetro}
					erf={erf}
				/>
			)}
		</div>
	);
};

export default ShowOnMap;
