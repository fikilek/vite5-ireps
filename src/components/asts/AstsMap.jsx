// npm libraries
// import { useContext } from "react";

// css
import "@/components/asts/AstsMap.css";

// components
import MapIrepsMap from "@/components/maps/MapIrepsMap";

// import { MapMarkers } from "../maps/MapMarkers";
import MapLmWardBoundaries from "@/components/maps/MapLmWardBoundaries";
import MapAstFilter from "@/components/maps/MapAstFilter";
import MapErfFilter from "@/components/maps/MapErfFilter";
import MapLmBoundary from "@/components/maps/MapLmBoundary";
import { ClusteredAstMarkers } from "@/components/maps/ClusteredAstMarkers";
import { ClusteredErfMarkers } from "@/components/maps/ClusteredErfMarkers";

// AstsMap go to firebase asts collection and fetch asts on the workbase. These are then displayed using clustering
const AstsMap = () => {

	return (
		<div className="asts-map">
			<MapIrepsMap>
				<MapLmWardBoundaries />
				<MapLmBoundary center={"center"} />
				<ClusteredErfMarkers />
				<ClusteredAstMarkers />
				<MapAstFilter />
				<MapErfFilter />
			</MapIrepsMap>
		</div>
	);
};

export default AstsMap;
