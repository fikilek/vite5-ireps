import {
	useMap,
	AdvancedMarker,
	InfoWindow,
	Marker,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import {
	useEffect,
	useState,
	useRef,
	useContext,
	useMemo,
	useCallback,
} from "react";

// css
import "@/components/maps/MapMarkers.css";

// import { trees } from "../../data/tree";
// import { ErfsMapContext } from "@/contexts/ErfsMapContext";
import { ErfsContext } from "@/contexts/ErfsContext";

export const MapMarkers = () => {
	// const { erfsMapContext } = useContext(ErfsMapContext);
	// // console.log(`erfsMapContext`, erfsMapContext);

	const { erfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext)

	const erfs = useMemo(() => erfsContext?.erfs, [erfsContext?.erfs]);
	// console.log(`erfs`, erfs);
	
	// ----------------------
	
	// const [selectedErfKey, setSelectedErfKey] = useState(null);
	// console.log(`selectedErfKey`, selectedErfKey);
	
	// const selectedErf = useMemo(
	// 	() =>
	// 		erfs && selectedErfKey
	// 	? (erfs.find((erf) => erf.id === selectedErfKey))
	// 	: null,
	// 	[erfs, selectedErfKey]
	// );
	// console.log(`selectedErf`, selectedErf);

	// --------------------------

	const map = useMap();
	const [markers, setMarkers] = useState({});
	const clusterer = useRef(null);

	useEffect(() => {
		if (!map) return;
		if (!clusterer.current) {
			clusterer.current = new MarkerClusterer({ map: map, maxZoom: 10 });
		}
	}, [map]);

	useEffect(() => {
		clusterer.current?.clearMarkers();
		clusterer.current?.addMarkers(Object.values(markers));
		// console.log(`clusterer.current`, clusterer.current);
	}, [markers]);

	const setMarkerRef = (marker, key) => {
		if (marker && markers[key]) return;
		if (!marker) return;

		setMarkers((prev) => {
			if (marker) {
				return { ...prev, [key]: marker };
			} else {
				const newMarkers = { ...prev };
				delete newMarkers[key];
				return newMarkers;
			}
		});
	};

	// const handleInfoWindowClose = useCallback(() => {
	// 	setSelectedErfKey(null);
	// }, []);

	// const handleMarkerClick = useCallback((id) => {
	// 	console.log(`id`, id)
  //   setSelectedErfKey(id);
  // }, []);

	return (
		<>
			{erfs &&
				erfs.map((erf) => {
					const { asts } = erf;
					const astTotal = asts?.length || "";
					return (
						<AdvancedMarker
							position={{
								lat: erf?.address?.gps?.latitude,
								lng: erf?.address?.gps?.longitude,
							}}
							key={erf.id}
							ref={(marker) => {
								// console.log(`marker`, marker)
								setMarkerRef(marker, erf.id);
							}}
							// onClick={()=> handleMarkerClick(erf.id) }
						>
							{astTotal && <button className="erf-asts">{astTotal}</button>}
							<button className="erf-no-btn">
								<span className="erf-no">{erf.erfNo}</span>
							</button>

							{/* {selectedErfKey && (
								<InfoWindow
									anchor={markers[erf.id]}
									onCloseClick={handleInfoWindowClose}
								>
									{selectedErf?.erfNo}
								</InfoWindow>
							)} */}
						</AdvancedMarker>
					);
				})}
		</>
	);
};
