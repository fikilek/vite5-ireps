import { useMap, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useEffect, useState, useRef, useContext, useMemo } from "react";

// css
import "@/components/maps/MapWardCadastralMarkers.css";
import { limit, where } from "firebase/firestore";

// hooks
import useGetCollection from "@/hooks/useGetCollection";

// import { trees } from "../../data/tree";
// import { ErfsMapContext } from "@/contexts/ErfsMapContext";
// import { ErfsContext } from "@/contexts/ErfsContext";

export const MapWardCadastralMarkers = (props) => {
	// console.log(`props`, props)
	const { lmMetro, ward } = props;

	// -------------------------------------------------------------

	// const { workbase } = useUser(uid);
	// const [workbase, setWorkbase] = useState(null);
	// console.log(`workbase`, workbase);

	const [erfs, setErfs] = useState([]);
	// console.log(`erfsMapContext`, erfsMapContext);

	const [constraints, setConstraints] = useState([]);
	// console.log(`constraints`, constraints);

	const { state, getCollection } = useGetCollection("erfs");
	// console.log(`state`, state);

	getCollection(constraints);

	// get user details from firestore on snapshot
	// const { getDocument, response } = useFirestore("users");
	// console.log(`response`, response);

	useEffect(() => {
		setErfs(state.data);
	}, [state]);

	useEffect(() => {
		// console.log(`workbase changed:`, workbase)
		if (lmMetro) {
			setConstraints((prev) => {
				return [
					...prev,
					where("address.lmMetro", "==", lmMetro?.trim()),
					limit(10000),
					where("address.ward", "==", ward?.trim()),
				];
			});
		}

		return () => setConstraints([]);
	}, [lmMetro, ward]);

	// --------------------------------------------------------------

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

	return (
		<>
			{erfs &&
				erfs.map((erf) => {
					const { asts } = erf;
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
						>
							{/* <span style={{ fontSize: "2rem" }}>🌳</span> */}
							{asts?.length && (
								<>
									<button className="erf-asts">
										{asts?.length}
										<InfoWindow>info window.</InfoWindow>
									</button>
								</>
							)}
							<button className="erf-no-btn">
								<span className="erf-no">{erf.erfNo}</span>
							</button>
							
						</AdvancedMarker>
					);
				})}
		</>
	);
};
