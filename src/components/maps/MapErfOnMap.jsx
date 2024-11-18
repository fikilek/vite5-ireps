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

import FormErf from "@/components/forms/formErf/FormErf";

const MapErfOnMap = (props) => {
	const { label, erf } = props;
	const map = useMap();

	const gpsPoint = useMemo(() => {
		return {
			lat: erf?.address?.gps?.latitude,
			lng: erf?.address?.gps?.longitude,
		};
	}, [erf]);

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
				onClick={handleMarkerClick}
				zIndex={1000}
			>
				<Pin background={"#22ccff"} borderColor={"#1e89a1"} scale={2}>
					{/* children are rendered as 'glyph' of pin */}
					<span className="erf">{erf.erfNo}</span>
				</Pin>

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
