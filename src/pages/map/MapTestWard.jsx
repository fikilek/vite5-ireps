import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useMap, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { db } from "@/firebaseConfig/fbConfig";
import {
	collection,
	limit,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

// cadastral
import za_kzn_umgungundlovu_mpofana_w1 from "@/maps/za/za_kzn_umgungundlovu_mpofana_w1.geojson";
// console.log(`za_kzn_umgungundlovu_mpofana_w1`, za_kzn_umgungundlovu_mpofana_w1);

// import za_kzn_umgungundlovu_mpofana_w1_cadastral from "@/maps/za/za_kzn_umgungundlovu_mpofana_w1_cadastral.geojson";
// console.log(
// 	`za_kzn_umgungundlovu_mpofana_w1_cadastral`,
// 	za_kzn_umgungundlovu_mpofana_w1_cadastral
// );

const MapTestWard = () => {
	const [erfs, setErfs] = useState();
	// console.log(`erfs`, erfs);

	const map = useMap();
	// console.log(`map`, map);

	let colRef = collection(db, "erfs");
	// console.log(`colRef`, colRef);

	const newQuery = useMemo(
		() =>
			query(
				colRef,
				where("address.lmMetro", "==", "Mpofana LM"),
				where("address.ward", "==", "1"),
				orderBy("metadata.updatedAtDatetime", "desc")
				// limit(50)
			),
		[colRef]
	);

	// console.log(`newQuery`, newQuery);

	useEffect(() => {
		onSnapshot(
			newQuery,
			(snapShot) => {
				// console.log(`snapShot`, snapShot);
				const results = [];
				snapShot.docs.forEach((doc) => {
					results.push({ id: doc.id, ...doc.data() });
				});
				// console.log(`results`, results);
				setErfs(results);
			},
			(err) => {
				console.log(`firestore err`, err.message);
			}
		);
	}, []);

	map?.data?.loadGeoJson(
		za_kzn_umgungundlovu_mpofana_w1,
		za_kzn_umgungundlovu_mpofana_w1
	);

	// map?.data?.loadGeoJson(
	// 	za_kzn_umgungundlovu_mpofana_w1_cadastral,
	// 	za_kzn_umgungundlovu_mpofana_w1_cadastral
	// );

	map.data?.setStyle((feature) => {
		// console.log(`feature`, feature);

		return {
			fillOpacity: 0,
			strokeWeight: 0.1,
			strokeColor: "blue",
		};
	});

	useEffect(() => {
		getWardBoundary().then((data) => {
			// console.log(`data`, data);

			let myBounds = new window.google.maps.LatLngBounds();
			data.features[0].geometry.coordinates[0][0].forEach((latLng) => {
				myBounds.extend({ lat: latLng[1], lng: latLng[0] });
			});

			map?.fitBounds(myBounds);
		});
	}, [map]);

	return (
		<div>
			<ErfMarkers erfs={erfs} />
		</div>
	);
};

export default MapTestWard;

const getWardBoundary = async () => {
	const response = await fetch(za_kzn_umgungundlovu_mpofana_w1);
	// console.log(`response`, response);
	const data = await response.json();
	// console.log(`data`, data);
	return data;
};

const ErfMarkers = (props) => {
	const { erfs } = props;

	const map = useMap();
	const [markers, setMarkers] = useState({});
	const clusterer = useRef(null);

	// Initialize MarkerClusterer, if the map has changed
	useEffect(() => {
		if (!map) return;
		if (!clusterer.current) {
			clusterer.current = new MarkerClusterer({ map: map });
		}
	}, [map]);

	// Update markers, if the markers array has changed
	useEffect(() => {
		clusterer.current?.clearMarkers();
		clusterer.current?.addMarkers(Object.values(markers));
	}, [markers]);

	const setMarkerRef = (marker, key) => {
		if (marker && markers[key]) return;
		if (!marker && !markers[key]) return;

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
			{erfs?.map((erf) => (
				<AdvancedMarker
					key={erf.id}
					position={{
						lat: erf?.address?.gps?.latitude,
						lng: erf?.address?.gps?.longitude,
					}}
					ref={(marker) => setMarkerRef(marker, erf.id)}
				>
					<Pin
						background={"#FBBC04"}
						glyphColor={"#000"}
						borderColor={"#000"}
					/>
				</AdvancedMarker>
			))}
		</>
	);
};
