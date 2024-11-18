// npm library
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { InfoWindow, useMap } from "@vis.gl/react-google-maps";

// context
import { ErfsContext } from "@/contexts/ErfsContext";

// components
import { ErfMarker } from "@/components/maps/ErfMarker";
import FormErf from "@/components/forms/formErf/FormErf";

/**
 * The ClusterederfMarkers component is responsible for integrating the
 * markers with the markerclusterer.
 */
export const ClusteredErfMarkers = () => {
	const { erfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext)

	const erfs = useMemo(() => erfsContext?.erfs, [erfsContext?.erfs]);
	// console.log(`erfs`, erfs);

	const [markers, setMarkers] = useState({});
	const [selectedErfKey, setSelectedErfKey] = useState(null);
	// console.log(`selectedErfKey`, selectedErfKey)

	const selectedErf = useMemo(
		() =>
			erfs && selectedErfKey
				? erfs.find((erf) => erf.id === selectedErfKey)
				: null,
		[erfs, selectedErfKey]
	);
	// console.log(`selectedErf`, selectedErf);

	// create the markerClusterer once the map is available and update it when
	// the markers are changed
	const map = useMap();
	const clusterer = useMemo(() => {
		if (!map) return null;

		return new MarkerClusterer({ map, zoom: 10 });
	}, [map]);

	useEffect(() => {
		if (!clusterer) return;

		clusterer.clearMarkers();
		clusterer.addMarkers(Object.values(markers));
	}, [clusterer, markers]);

	// this callback will effectively get passed as ref to the markers to keep
	// tracks of markers currently on the map
	const setMarkerRef = useCallback(
		(marker, key) => {
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
		},
		[map]
	);

	return (
		<>
			{erfs.map((erf, index) => {
				// console.log(`index `,index)
				return (
					<ErfMarker
						key={erf.id}
						erf={erf}
						onClick={(erf) => setSelectedErfKey(erf.id)}
						setMarkerRef={setMarkerRef}
					/>
				);
			})}

			{selectedErfKey && (
				<InfoWindow
					anchor={markers[selectedErfKey]}
					onCloseClick={() => setSelectedErfKey(null)}
				>
					<div>
						<FormErf
							data={{
								data: selectedErf,
							}}
						/>
					</div>
				</InfoWindow>
			)}
		</>
	);
};
