// npm libraries
import { useContext, useMemo } from "react";

// css
import "@/components/map/MapMain.css";

// contexts
import { ErfsContext } from "@/contexts/ErfsContext";

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
	const { asts, astsTableFields } = props;

	const { erfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext);

	const { ward } = useMemo(() => erfsContext, [erfsContext]);
	// console.log(`ward`, ward);

	return (
		<div className="map-main">
			<MapIrepsMap>
				<MapLmBoundary />
				<MapLmWardBoundaries />
				<ClusteredAstMarkers asts={asts} astsTableFields={astsTableFields} />
				<ClusteredErfMarkers />

				{ward ? (
					<>
						<MapAstFilter asts={asts} astsTableFields={astsTableFields} />
						<MapErfFilter />
					</>
				) : (
					""
				)}
			</MapIrepsMap>
		</div>
	);
};

export default MapMain;
