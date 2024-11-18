// npm libraries
import { useEffect, useState, useCallback, useMemo } from "react";
import {
	useMap,
	useAdvancedMarkerRef,
	AdvancedMarker,
	InfoWindow,
} from "@vis.gl/react-google-maps";

// css
import "@/components/maps/MapMeterOnMap.css";

// components
import AstsActivity from "@/components/asts/astsActivity/AstsActivity";

const MapMeterOnMap = (props) => {
	// console.log(`props`, props);

	const { ast } = props;

	const map = useMap();

	const meterGps = useMemo(() => {
		return {
			lat: Number(ast?.location?.gps?.lat),
			lng: Number(ast?.location?.gps?.lng),
		};
	}, [ast]);

	// `markerRef` and `marker` are needed to establish the connection between
	// the marker and infowindow (if you're using the Marker component, you
	// can use the `useMarkerRef` hook instead).
	const [markerRef, marker] = useAdvancedMarkerRef();

	const [infoWindowShown, setInfoWindowShown] = useState(false);

	useEffect(() => {
		if (!map) return;
		// console.log(`map`, map);
		map.panTo(meterGps);
		map.setZoom(19);
		return () => setInfoWindowShown(false);
	}, [map, meterGps]);

	// clicking the marker will open the infowindow
	const handleOpen = useCallback(() => setInfoWindowShown(true), []);

	const { trns } = ast;
	const totalTrns = trns?.length || "";

	return (
		<div className="map-meter-on-map">
			<AdvancedMarker ref={markerRef} position={meterGps} onClick={handleOpen}>
				{totalTrns && <button className="ast-asts">{totalTrns}</button>}
				<button className="ast-no-btn">
					<span className="ast-no">{ast?.astData?.astNo}</span>
				</button>
			</AdvancedMarker>

			{infoWindowShown && (
				<InfoWindow
					anchor={marker}
					onClose={() => setInfoWindowShown(false)}
					onCloseClick={() => setInfoWindowShown(false)}
				>
					<div>
						<AstsActivity
							data={{
								data: ast,
							}}
						/>
					</div>
				</InfoWindow>
			)}
		</div>
	);
};

export default MapMeterOnMap;
