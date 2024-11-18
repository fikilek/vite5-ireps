// css
import "@/components/erfs/ErfsMap.css";

// contexts
// import { ErfsContext } from "@/contexts/ErfsContext";

// components
import MapIrepsMap from "@/components/maps/MapIrepsMap";
// import { MapMarkers } from "../maps/MapMarkers";
import MapLmWardBoundaries from "@/components/maps/MapLmWardBoundaries";
import MapLmBoundary from "@/components/maps/MapLmBoundary";
import { ClusteredErfMarkers } from "../maps/ClusteredErfMarkers";
import { ClusteredAstMarkers } from "@/components/maps/ClusteredAstMarkers";

import MapAstFilter from "@/components/maps/MapAstFilter";
import MapErfFilter from "@/components/maps/MapErfFilter";
// import { useContext } from "react";
// import { useContext } from "react";

// ErfsMap go to firebase erfs collection and fetch erfs on the workbase. These are then displayed using clustering
const ErfsMap = () => {
	// console.log(`ErfsMap props`, props);

	// const {erfs} = props

	// const { erfsContext } = useContext(erfsContext);
	// console.log(`erfsContext`, erfsContext)

	return (
		<div className="erfs-map">
			<MapIrepsMap>
				<MapLmWardBoundaries />
				<MapLmBoundary center={'center'} />
				<ClusteredAstMarkers />
				{/* <MapMarkers /> */}
				<ClusteredErfMarkers />
				<MapAstFilter />
				<MapErfFilter />
			</MapIrepsMap>
		</div>
	);
};

export default ErfsMap;
