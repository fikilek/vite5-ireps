import "@/components/irepsInfoWindow/IwErfOnMap.css";

import IwShowOnMap from "@/components/irepsInfoWindow/IwShowOnMap";
import MapMeterOnMap from "@/components/maps/MapMeterOnMap";


const IwErfOnMap = (props) => {
	// console.log(`props`, props);
	const { address, erfNo } = props?.data.data;
	const { lmMetro, ward } = address;
	const gpsPoint = {
		lat: address.gps.latitude,
		lng: address.gps.longitude,
	};
	// const {lat, }
	return (
		<IwShowOnMap
			lat={gpsPoint?.lat}
			lng={gpsPoint?.lng}
			label={erfNo}
			ward={ward}
			lmMetro={lmMetro}
			erf={ props?.data.data}
		/>
		// <MapMeterOnMap ast={props?.data.data} />
	);
};

export default IwErfOnMap;

