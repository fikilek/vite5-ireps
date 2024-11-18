
// npm library
import {MarkerF} from '@react-google-maps/api'

//  css
import "@/components/maps/rgm/RgmErfMarker.css";


const RgmErfMarker = (props) => {
	console.log(`props`, props);
	const { erf, clusterer } = props;

	// const {latitude, longitude, openInfoWindow, markerId, markerData} = props
	// const {erfNo, asts} = markerData
	// const handleClick = e => {
	//   openInfoWindow(markerId, latitude, longitude)
	// }
	return (
		// <div className="gmr-erf-marker">
		<MarkerF
			position={{
				lat: erf?.address?.gps?.latitude,
				lng: erf?.address?.gps?.longitude,
			}}
			clusterer={clusterer}
		>
			{/* <GmrErf erfNo={erfNo} openInfoWindow={openInfoWindow} /> */}
			{/* <GmrAstsOnErfs erf={props.erf} /> */}
		</MarkerF>
		// </div>
	);
};

export default RgmErfMarker;
