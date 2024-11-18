import { useEffect, useState } from "react";

import "@/components/irepsInfoWindow/ShowAstOnMap.css";

import IwShowOnMap from "@/components/irepsInfoWindow/IwShowOnMap";

const ShowAstOnMap = (props) => {
	// console.log(`props`, props);

	const { astNo } = props.data.data?.astData;
	// console.log(`astNo`, astNo);

	const { gps } = props.data.data?.location;
	// console.log(`gps`, gps);

	const { lmMetro, ward } = props.data.data?.erf?.address;
	// console.log(`lmMetro`, lmMetro)
	// console.log(`ward`, ward)

	const ast = props?.data?.data;
	// console.log(`ast`, ast)

	const [gpsPoint, setGpsPoint] = useState({});
	// console.log(`gpsPoint`, gpsPoint);

	useEffect(() => {
		// console.log(`document changed`, document);
		setGpsPoint({
			point: {
				lat: Number(gps?.lat),
				lng: Number(gps?.lng),
			},
			label: astNo,
		});
	}, [astNo, gps?.lat, gps?.lng]);

	return (
		<div className="show-on-map">
			{gpsPoint?.point?.lat && (
				<IwShowOnMap
					lat={gpsPoint?.point?.lat}
					lng={gpsPoint?.point?.lng}
					label={gpsPoint?.label}
					ward={ward}
					lmMetro={lmMetro}
					ast={ast}
				/>
			)}
		</div>
	);
};

export default ShowAstOnMap;
