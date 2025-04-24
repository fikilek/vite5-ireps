import {
	APIProvider,
	ControlPosition,
	Map,
	MapControl,
} from "@vis.gl/react-google-maps";
import { useState } from "react";

import "@/components/maps/MapIrepsMap.css";

import MapCenterMap from "@/components/maps/MapCenterMap";
import MapUserLocationOnMap from "@/components/maps/MapUserLocationOnMap";

const MapIrepsMap = ({ children }) => {
	// console.log(`MapIrepsMap`);

	const [mapCentered, setMapCentered] = useState(false);
	// console.log(`map: ${mapCentered ? "Centered" : "NOT Centered"} `);

	const defaultCenter = {
		lat: -26.541960658447646,
		lng: 28.338629116440828,
	};

	const onCenterChanged = (e) => {
		console.log(`map position has changed`);
		setMapCentered(false);
	};

	const onDblclick = (e) => {
		console.log(`map double click`);
	};

	const handleDblClick = (event) => {
		const { detail } = event;
		console.log(`detail`, detail);
		// console.log("Double click event at:", latLng.lat(), latLng.lng());
		// Perform actions based on the double click event
	};

	const onBoundsChanged = (e) => {
		// console.log(`boundaries changed e: `, e);
		const bounds = e.map.getBounds();
		// console.log(`bounds`, bounds);
	};

	const onZoomChanged = (e) => {
		// console.log(`zoom changed e: `, e);
		const zoom = e.map.getZoom();
		console.log(`zoom`, zoom);
	};

	const onMouseover = (e) => {
		// console.log(`mouseover e: `, e);
		const latLng = e.latLng;
		// console.log(`latLng`, latLng);
	};

	return (
		<div className="map-ireps-map">
			<APIProvider
				// version="beta"
				apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}
				// onLoad={"iREPS map has loaded"}
				// onLoad={() => console.log("Maps API has loaded.")}
				// onError={() => console.log("There was an error on iREPS Map")}
			>
				<Map
					// defaultZoom={15}
					// defaultCenter={defaultCenter}
					// gestureHandling={"greedy"}
					// disableDefaultUI={false}
					mapId={import.meta.env.VITE_APP_GOOGLE_MAP_ID}
					// onCenterChanged={onCenterChanged}
					// onBoundsChanged={onBoundsChanged}
					// onZoomChanged={onZoomChanged}
					// onDblclick={onDblclick}
					// onClick={handleDblClick}
					// onMouseover={onMouseover}
					// TODO: introduce a defaultBounds prop. This should get bounds from the active workbase of the user.
					// defaultBounds={}
					// reuseMaps={true}
				>
					<MapControl position={ControlPosition.RIGHT_BOTTOM}>
						<MapCenterMap
							mapCentered={mapCentered}
							setMapCentered={setMapCentered}
						/>
					</MapControl>
					<MapUserLocationOnMap />
					{children}
				</Map>
				{/* <MapDrawingExample /> */}
			</APIProvider>
		</div>
	);
};

export default MapIrepsMap;
