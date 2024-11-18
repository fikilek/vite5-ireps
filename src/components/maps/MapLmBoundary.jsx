import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

// hooks
import useIrepsMap from "@/hooks/useIrepsMap";

const MapLmBoundary = (props) => {
	// console.log(`props`, props)

	const { center } = props;

	// get map object
	const map = useMap();
	// const map = mapRef.current;
	// console.log(`map`, map);

	const { displayLmBoundary, state } = useIrepsMap();
	// console.log(`displayLmBoundary`, displayLmBoundary);

	const { lmBoundary } = state;

	// Display lm boundary
	useEffect(() => {

		if (!map) return;

		displayLmBoundary(map, center);

	}, [lmBoundary]);

	return <div className="map-boundaries"></div>;
};

export default MapLmBoundary;
