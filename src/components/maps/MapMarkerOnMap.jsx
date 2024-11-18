import {
	AdvancedMarker,
	InfoWindow,
	Pin,
	useAdvancedMarkerRef,
	useMap,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";

import "@/components/maps/MapMarkerOnMap.css";

const MapMarkerOnMap = (props) => {
	const { gpsPoint, label } = props;
	const map = useMap();

	// ----------------------------------

	const [markerRef, marker] = useAdvancedMarkerRef();
	const [infoWindowShown, setInfoWindowShown] = useState(false);

	// clicking the marker will toggle the infowindow
	const handleMarkerClick = useCallback(
		() => setInfoWindowShown((isShown) => !isShown),
		[]
	);

	// if the maps api closes the infowindow, we have to synchronize our state
	const handleClose = useCallback(() => setInfoWindowShown(false), []);

	// -------------------------------------------

	useEffect(() => {
		if (!map) return;
		// console.log(`map`, map);
		map.panTo(gpsPoint);
		map.setZoom(19);
	}, [map, gpsPoint]);
	
	return (
		<div className="map-marker-on-map">
			<AdvancedMarker ref={markerRef} position={gpsPoint} onClick={handleMarkerClick}>
				<Pin background={"#22ccff"} borderColor={"#1e89a1"} scale={3}>
					{/* children are rendered as 'glyph' of pin */}
					<span className="erf">{label}</span>
				</Pin>

				{infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <h2>InfoWindow content!</h2>
          <p>Some arbitrary html to be rendered into the InfoWindow.</p>
        </InfoWindow>
      )}
			</AdvancedMarker>
		</div>
	);
};

export default MapMarkerOnMap;
