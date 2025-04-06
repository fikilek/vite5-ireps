// npm library
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { InfoWindow, useMap } from "@vis.gl/react-google-maps";

// context
import { AstsContext } from "@/contexts/AstsContext";
import { ErfsContext } from "@/contexts/ErfsContext";

// components
import { AstMarker } from "@/components/maps/AstMarker";
import AstsActivity from "@/components/asts/astsActivity/AstsActivity";

/**
 * The ClusteredAstMarkers component is responsible for integrating the
 * markers with the markerclusterer.
 */
export const ClusteredAstMarkers = (props) => {
	const { asts: meters } = props;
	// console.log(`meters`, meters);

	// const { astsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext)

	const { erfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext);

	const { ward } = useMemo(() => erfsContext, [erfsContext]);
	// console.log(`landParcels`, landParcels);
	// console.log(`ward`, ward);

	const asts = meters?.filter(
		(erf) => Number(erf?.erf?.address?.ward) === Number(ward)
	);
	// console.log(`asts`, asts);

	// const asts = useMemo(() => astsContext?.asts, [astsContext?.asts]);

	const [markers, setMarkers] = useState({});
	const [selectedAstKey, setSelectedAstKey] = useState(null);
	// console.log(`selectedAstKey`, selectedAstKey)

	const selectedAst = useMemo(
		() =>
			asts && selectedAstKey
				? asts.find((ast) => ast.id === selectedAstKey)
				: null,
		[asts, selectedAstKey]
	);
	// console.log(`selectedAst`, selectedAst);

	// create the markerClusterer once the map is available and update it when
	// the markers are changed
	const map = useMap();
	const clusterer = useMemo(() => {
		if (!map) return null;

		return new MarkerClusterer({ map, zoom: 10 });
	}, [map]);

	useEffect(() => {
		if (!clusterer) return;

		try {
			clusterer.clearMarkers();
			clusterer.addMarkers(Object.values(markers));
		} catch (error) {
			console.log(`Error in ClusteredAstMarkers: `, error.message);
		}
	}, [clusterer, markers]);

	// this callback will effectively get passsed as ref to the markers to keep
	// tracks of markers currently on the map
	const setMarkerRef = useCallback((marker, key) => {
		setMarkers((markers) => {
			if ((marker && markers[key]) || (!marker && !markers[key]))
				return markers;

			if (marker) {
				return { ...markers, [key]: marker };
			} else {
				const { [key]: _, ...newMarkers } = markers;
				// console.log(`newMarkers`, newMarkers);
				return newMarkers;
			}
		});
	}, []);

	return (
		<>
			{asts?.map((ast, index) => {
				// console.log('index' , index)
				return (
					<AstMarker
						key={ast.id}
						ast={ast}
						// onClick={(ast) => setSelectedAstKey(ast?.id)}
						setMarkerRef={setMarkerRef}
					/>
				);
			})}

			{selectedAstKey && (
				<InfoWindow
					anchor={markers[selectedAstKey]}
					// onCloseClick={() => setSelectedAstKey(null)}
					onClose={() => setSelectedAstKey(null)}
					headerContent={`Meter No: ${selectedAst?.astData?.astNo}`}
					headerDisabled={true}
				>
					<div>
						<AstsActivity
							data={{
								data: selectedAst,
							}}
						/>
					</div>
				</InfoWindow>
			)}
		</>
	);
};
