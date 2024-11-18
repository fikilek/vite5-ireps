// css
import "@/pages/map/Map.css";

// hooks
import { useAstsMap } from "@/hooks/useAstsMap.jsx";
import { useErfs } from "@/hooks/useErfs.jsx";

// components
import MapMain from "@/components/map/MapMain";
import MapHeader from "@/components/map/MapHeader";

const Map = () => {
	// console.log(`Map is running`)
	useErfs();
	const { asts, astsTableFields, error } = useAstsMap();
	// console.log(`asts`, asts);
	// console.log(`astsTableFields`, astsTableFields);
	// console.log(`error`, error);

	return (
		<div className="map">
			<MapHeader phLl="Map" />
			<div className="map-body">
				<MapMain asts={asts} astsTableFields={astsTableFields} />
			</div>
		</div>
	);
};

export default Map;
