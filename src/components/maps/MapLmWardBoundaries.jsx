// npm libraries
import { useEffect } from "react";

// css
import "@/components/maps/MapLmWardBoundaries.css";

// hooks
import useIrepsMap from "@/hooks/useIrepsMap";
import {
	useMap,
	MapControl,
	ControlPosition,
	useMapsLibrary,
} from "@vis.gl/react-google-maps";

const MapLmWardBoundaries = () => {
	// console.log(`MapLmWardBoundaries`)

	const map = useMap();
	// console.log(`map`, map);

	// const maps = useMapsLibrary('maps');
	// console.log(`maps`, maps);

	const {
		displayLMWardBoundaries,
		state,
		fitWardBoundary,
		// setSelectedWardBoundaries,
	} = useIrepsMap();
	// console.log(`displayLMWardBoundaries`, displayLMWardBoundaries)
	// console.log(`state`, state);
	
	const { lmWardBoundaries, lmBoundary } = state;
	// console.log(`lmWardBoundaries`, lmWardBoundaries);

	useEffect(() => {
		if (!map) return;

		displayLMWardBoundaries(map);
	}, [map, lmWardBoundaries]);

	const handleChange =  (e) => {
		// console.log(`e.currentTarget.value`, e.currentTarget.value);
		const selectedWard = e.currentTarget.value;
		// console.log(`selectedWard`, selectedWard);

		// filter in only the selected ward
		const selection = lmWardBoundaries.find( (wardBoundary) => {

			// console.log(`wardBoundary.ward`, wardBoundary.ward)
			// console.log(`selectedWard`, selectedWard)

			return Number(wardBoundary.ward)  === Number(selectedWard) ;
		});
		// console.log(`selection`, selection);

		if (selectedWard === "All Wards") {
			fitWardBoundary(map, lmBoundary);
		} else {
			fitWardBoundary(map, selection.wardBoundary, selection.ward);
		}

		// setSelectedWardBoundaries(selection);
	};

	return (
		<MapControl
			position={ControlPosition.TOP_LEFT}
			style={{ margin: "1.6rem" }}
		>
			<div className="map-lm-ward-boundaries">
				<select
					onChange={handleChange}
					// value={selectedWard}
					className="map-control-select"
				>
					<option key={"All Wards"} value={"All Wards"}>
						{"All Wards"}
					</option>
					{lmWardBoundaries &&
						lmWardBoundaries.map((option) => {
							// console.log(`option`, option)
							return (
								<option key={option.ward} value={option.ward}>
									{option.ward}
								</option>
							);
						})}
				</select>
			</div>
		</MapControl>
	);
};

export default MapLmWardBoundaries;
