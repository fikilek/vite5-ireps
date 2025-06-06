// npm library
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { InfoWindow, useMap } from "@vis.gl/react-google-maps";

// css
import "@/components/maps/ClusteredErfMarkers.css";

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
	const { erfsContext, setErfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext);

	const { erfs: landParcels, ward } = useMemo(() => erfsContext, [erfsContext]);
	// console.log(`landParcels`, landParcels);
	// console.log(`ward`, ward);

	const erfs =
		landParcels &&
		landParcels?.filter((erf) => Number(erf?.address?.ward) === Number(ward));
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
		// console.log(`ClusteredErfMarkers Mounting `);
		return () => {
			// console.log(`ClusteredErfMarkers unmounting `);
			setErfsContext({
				...erfsContext,
				ward: null,
			});
		};
	}, []);

	useEffect(() => {
		if (!clusterer) return;

		try {
			clusterer?.clearMarkers();
			clusterer?.addMarkers(Object?.values(markers));
		} catch (error) {
			console.log(`Error in ClusteredErfMarkers: `, error.message);
		}
	}, [clusterer, markers]);

	// this callback will effectively get passed as ref to the markers to keep
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
		<div className="clustered-erf-markers">
			{erfs.map((erf, index) => {
				// console.log(`index `,index)
				return (
					<ErfMarker
						key={erf.id}
						erf={erf}
						// onClick={(erf) => setSelectedErfKey(erf.id)}
						setMarkerRef={setMarkerRef}
					/>
				);
			})}

			{selectedErfKey && (
				<InfoWindow
					anchor={markers[selectedErfKey]}
					// onCloseClick={() => setSelectedErfKey(null)}
					// zIndex={100000}
					disableAutoPan={true}
					headerDisabled={true}
					// disableAutoPan={true}
					// style={{
					// 	zIndex: 100000,
					// }}
					maxWidth={"100vw"}
				>
					<div className="iw-erf-form">
						<FormErf
							data={{
								data: selectedErf,
							}}
						/>
					</div>
				</InfoWindow>
			)}
		</div>
	);
};
