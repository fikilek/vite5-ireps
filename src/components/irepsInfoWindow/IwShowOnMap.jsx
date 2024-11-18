import "@/components/irepsInfoWindow/IwShowOnMap.css";

import MapIrepsMap from "@/components/maps/MapIrepsMap";
import MapErfOnMap from "@/components/maps/MapErfOnMap";
import IrepsInfoWindow from "@/components/irepsInfoWindow/IrepsInfoWindow";
import { MapWardCadastralMarkers } from "@/components/maps/MapWardCadastralMarkers";
import MapMeterOnMap from "@/components/maps/MapMeterOnMap";
import MapWardErfsBoundaries from "@/components/maps/MapWardErfsBoundaries";

const IwShowOnMap = (props) => {
	// console.log(`props`, props);
	const { label, lmMetro, ward, ast, erf } = props;

	return (
		<IrepsInfoWindow
			hl1={
				<span>
					Showing <span className="text-emphasis2">{label}</span> on Map
				</span>
			}
			hr1={<p></p>}
		>
			<MapIrepsMap>
				<MapWardErfsBoundaries lmMetro={lmMetro} ward={ward} />
				{/* <MapWardCadastralMarkers lmMetro={lmMetro} ward={ward} /> */}
				{ast && <MapMeterOnMap ast={ast} />}
				{erf && <MapErfOnMap erf={erf} />}
				
			</MapIrepsMap>
		</IrepsInfoWindow>
	);
};

export default IwShowOnMap;
