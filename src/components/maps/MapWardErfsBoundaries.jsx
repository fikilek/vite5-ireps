import { useEffect } from "react";

// hooks
import useIrepsMap from "@/hooks/useIrepsMap";
import { useMap } from "@vis.gl/react-google-maps";

// Display all ward boundaries in workbase(municipality) and erfs of the props ward
const MapWardErfsBoundaries = () => {
	// console.log(`props`, props);

	const map = useMap();
	// console.log(`map`, map);

	const { displayLMWardBoundaries, state } = useIrepsMap();
	// console.log(`displayLMWardBoundaries`, displayLMWardBoundaries)

	const { lmWardBoundaries } = state;

	useEffect(() => {

		if (!map) return;

		displayLMWardBoundaries(map);

	}, [map, lmWardBoundaries]);

	return <div className="map-boundaries"></div>;
};

export default MapWardErfsBoundaries;
