// npm imports
import {
	APIProvider,
	ControlPosition,
	Map,
	MapControl,
} from "@vis.gl/react-google-maps";

// css
import "@/pages/map/MapTest.css";

// hooks
import { useAstsMap } from "@/hooks/useAstsMap.jsx";
import { useErfs } from "@/hooks/useErfs.jsx";

// components
import MapTestWard from "@/pages/map/MapTestWard.jsx";

const MapTest = () => {
	// console.log(`Map is running`)

	useErfs();
	const { asts, astsTableFields, error } = useAstsMap();
	// console.log(`asts`, asts);
	// console.log(`astsTableFields`, astsTableFields);
	// console.log(`error`, error);

	const defaultCenter = {
		lat: -26.541960658447646,
		lng: 28.338629116440828,
	};

	return (
		<div className="map-test">
			<APIProvider
				// version="beta"
				apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}
				// onLoad={"iREPS map has loaded"}
				onLoad={() => console.log("Maps API has loaded.")}
				onError={() => console.log("There was an error on iREPS Map")}
			>
				<Map
					defaultZoom={13}
					defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
					gestureHandling={"greedy"}
					disableDefaultUI={false}
					mapId={import.meta.env.VITE_APP_GOOGLE_MAP_ID}
					// onCenterChanged={onCenterChanged}
					// onBoundsChanged={onBoundsChanged}
					// TODO: introduce a defaultBounds prop. This should get bounds from the active workbase of the user.
					// defaultBounds={}
				>
					<MapTestWard />
				</Map>
			</APIProvider>
		</div>
	);
};

export default MapTest;
