// npm libraries
import { useMemo } from "react";
import {
	AdvancedMarker,
	InfoWindow,
	Pin,
	useAdvancedMarkerRef,
	useMap,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";

import "@/components/maps/MapErfOnMap.css";
import "@/components/maps/ErfMarker.css";

import FormErf from "@/components/forms/formErf/FormErf";

const MapErfOnMap = (props) => {
	// console.log(`props`, props);

	const { erf } = props;
	const map = useMap();

	const gpsPoint = useMemo(() => {
		return {
			lat: erf?.address?.gps?.latitude,
			lng: erf?.address?.gps?.longitude,
		};
	}, [erf]);

	const asts = erf?.asts;
	const astTotal = asts?.length || "";

	const [markerRef, marker] = useAdvancedMarkerRef();

	const [infoWindowShown, setInfoWindowShown] = useState(false);

	// clicking the marker will toggle the infowindow
	const handleMarkerClick = useCallback(() => setInfoWindowShown(true), []);

	useEffect(() => {
		if (!map) return;
		// console.log(`map`, map);
		map.panTo(gpsPoint);
		map.setZoom(19);
	}, [map, gpsPoint]);

	return (
		<div className="map-marker-on-map">
			<AdvancedMarker
				ref={markerRef}
				position={gpsPoint}
				// onClick={handleMarkerClick}
				zIndex={1000}
			>
				{astTotal && <button className="erf-asts">{astTotal}</button>}
				<button className="erf-no-btn">
					<span className="erf-no">{erf.erfNo}</span>
				</button>

				{infoWindowShown && (
					<InfoWindow
						anchor={marker}
						onClose={() => setInfoWindowShown(false)}
						onCloseClick={() => setInfoWindowShown(false)}
					>
						<div>
							<FormErf
								data={{
									data: erf,
								}}
							/>
						</div>
					</InfoWindow>
				)}
			</AdvancedMarker>
		</div>
	);
};

export default MapErfOnMap;
