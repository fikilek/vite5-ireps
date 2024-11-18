import {
	APIProvider,
	ControlPosition,
	Map,
	MapControl,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

import "@/components/maps/MapIrepsCenteredMap.css";

import MapCenterMap from "@/components/maps/MapCenterMap";
import MapUserLocationOnMap from "@/components/maps/MapUserLocationOnMap";

const MapIrepsCenteredMap = props => {
	// console.log(`props`, props);
	const { center } = props;

	const [mapCenter, setMapCenter] = useState({});

	useEffect(() => {
		setMapCenter(center);
	}, [center]);

	const [mapCentered, setMapCentered] = useState(false);
	// console.log(`map: ${mapCentered ? "Centered" : "NOT Centered"} `);

	const onCenterChanged = e => {
		// console.log(`map position has changed`);
		setMapCentered(false);
	};

	const onBoundsChanged = e => {
		// console.log(`bondaries changed e: `, e)
		const bounds = e.map.getBounds();
		// console.log(`bounds`, bounds)
	};

	return (
		<div className="map-ireps-map">
			{Object.keys(mapCenter).length && (
				<APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
					<Map
						defaultZoom={15}
						defaultCenter={mapCenter}
						gestureHandling={"greedy"}
						disableDefaultUI={false}
						mapId={import.meta.env.VITE_APP_GOOGLE_MAP_ID}
						onCenterChanged={onCenterChanged}
						onBoundsChanged={onBoundsChanged}
					>
						<MapControl position={ControlPosition.RIGHT_BOTTOM}>
							<MapCenterMap
								mapCentered={mapCentered}
								setMapCentered={setMapCentered}
							/>
						</MapControl>
						<MapUserLocationOnMap />
						{props.children}
					</Map>
				</APIProvider>
			)}
		</div>
	);
};

export default MapIrepsCenteredMap;
