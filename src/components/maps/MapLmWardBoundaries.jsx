// npm libraries
import { useEffect, useContext } from "react";

// css
import "@/components/maps/MapLmWardBoundaries.css";

// hooks
import useIrepsMap from "@/hooks/useIrepsMap";
import { useMap, MapControl, ControlPosition } from "@vis.gl/react-google-maps";

// context
import { ErfsContext } from "@/contexts/ErfsContext";

const MapLmWardBoundaries = () => {
	// console.log(`MapLmWardBoundaries`);

	const { erfsContext, setErfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext);

	const map = useMap();
	// console.log(`map`, map);

	// const maps = useMapsLibrary('maps');
	// console.log(`maps`, maps);

	const {
		displayLMWardBoundaries,
		state,
		fitWardBoundary,
		displayLmBoundary,
		// setSelectedWardBoundaries,
	} = useIrepsMap();
	// console.log(`displayLMWardBoundaries`, displayLMWardBoundaries)
	// console.log(`state`, state);

	const { lmWardBoundaries, lmBoundary } = state;
	// console.log(`lmWardBoundaries`, lmWardBoundaries);

	useEffect(() => {
		if (!map) return;

		displayLMWardBoundaries(map);
		// return map.data.forEach((feature) => map.data.remove(feature));
	}, [displayLMWardBoundaries, map]);

	const handleChange = (e) => {
		// console.log(`e.currentTarget.value`, e.currentTarget.value);
		const selectedWard = e.currentTarget?.value;
		// console.log(`selectedWard`, selectedWard);

		try {
			// filter in only the selected ward
			const selection = lmWardBoundaries?.find((wardBoundary) => {
				// console.log(`wardBoundary.ward`, wardBoundary.ward)
				// console.log(`selectedWard`, selectedWard)

				return Number(wardBoundary?.ward) === Number(selectedWard);
			});
			// console.log(`selection`, selection);

			map.data.forEach((feature) => {
				// console.log(`feature`, feature);
				map.data.remove(feature);
			});

			if (selectedWard === "All Wards") {
				displayLmBoundary(map);
				fitWardBoundary(map, lmBoundary);
				setErfsContext({
					...erfsContext,
					ward: null,
				});
			} else {
				fitWardBoundary(map, selection?.wardBoundary, selection?.ward);
				setErfsContext({
					...erfsContext,
					ward: Number(selection?.ward),
				});
				map?.data?.loadGeoJson(selection?.erfBoundary);
			}
		} catch (error) {
			console.log(`Error in MapLmWardBoundaries : `, error.message);
		}
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
						lmWardBoundaries?.map((option) => {
							// console.log(`option`, option);
							return (
								<option key={option?.ward} value={option?.ward}>
									{option?.ward}
								</option>
							);
						})}
				</select>
			</div>
		</MapControl>
	);
};

export default MapLmWardBoundaries;
