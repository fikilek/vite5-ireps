// npm libraries

// css
import "@/components/map/MapMain.css";

// contexts

// components
import MapIrepsMap from "@/components/maps/MapIrepsMap";
import MapLmWardBoundaries from "@/components/maps/MapLmWardBoundaries";
import MapLmBoundary from "@/components/maps/MapLmBoundary";
import { ClusteredErfMarkers } from "../maps/ClusteredErfMarkers";
import { ClusteredAstMarkers } from "@/components/maps/ClusteredAstMarkers";
import MapAstFilter from "@/components/maps/MapAstFilter";
import MapErfFilter from "@/components/maps/MapErfFilter";

const MapMain = (props) => {
	// console.log(`ErfsMap props`, props);
	const {asts, astsTableFields} = props

	return (
		<div className="map-main">
			<MapIrepsMap>
				<MapLmWardBoundaries />
				<MapLmBoundary center={"center"} />
				<ClusteredAstMarkers asts={asts} astsTableFields={astsTableFields} />
				<ClusteredErfMarkers />
				<MapAstFilter asts={asts} astsTableFields={astsTableFields} />
				<MapErfFilter />
			</MapIrepsMap>
		</div>
	);
};

export default MapMain;
