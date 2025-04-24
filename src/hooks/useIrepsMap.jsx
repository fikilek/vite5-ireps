// library imports
import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { Timestamp } from "firebase/firestore";
import { nanoid } from "nanoid";

// contexts
import { ErfsContext } from "@/contexts/ErfsContext.jsx";

// hooks
import useUserCadastral from "@/hooks/useUserCadastral.jsx";
import useAuthContext from "@/hooks/useAuthContext.jsx";
import { useFirestore } from "@/hooks/useFirestore.jsx";

// components
// import ValidationError from "@/App.jsx";

function removeLeadingZerosRegex(str) {
	return str?.replace(/^0+(?=\d)/, "");
}

const useIrepsMap = () => {
	// console.log(`useIrepsMap`);
	const { state } = useUserCadastral();
	// console.log(`state`, state);

	const { addDocument } = useFirestore("erfs");

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { erfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext);

	// const { lmBoundary, lmWardBoundaries } = state;
	// console.log(`lmBoundary`, lmBoundary);

	const { lmBoundary, lmWardBoundaries } = useMemo(() => state, [state]);

	// const handleFeatureClick = (event) => {
	// 	console.log("event", event);
	// 	// Perform actions based on the clicked feature
	// 	const lat = event.latLng.lat();
	// 	// console.log("lat", lat);

	// 	const lng = event.latLng.lng();
	// 	// console.log("lng", lng);

	// 	// check if there is a selected ward. If not, return
	// 	// const { ward } = erfsContext;
	// 	// console.log(`ward`, ward);

	// 	// Get user data from user context
	// 	const { displayName, uid } = user;
	// 	// console.log(`displayName`, displayName);
	// 	// console.log(`uid`, uid);

	// 	// step X: get user workbase
	// 	// const {workbase} = user?.claims;
	// 	// console.log(`workbase`, workbase);

	// 	// Check if the gps point is inside an erf.

	// 	// Create a fake erf
	// 	const newErf = {
	// 		address: {
	// 			country: "South Africa",
	// 			dm: "Sekhukhune",
	// 			gps: { latitude: lat, longitude: lng },
	// 			lmMetro: "Ephraim Mogale LM",
	// 			province: "LP",
	// 			suburbTownship: "Marble Hall",
	// 			town: "Marble Hall",
	// 			ward: "7",
	// 		},
	// 		erfNo: "TT99",
	// 		metadata: {
	// 			createdAtDatetime: Timestamp.now(),
	// 			createdByUid: uid,
	// 			createdByUser: displayName,
	// 			updatedAtDatetime: Timestamp.now(),
	// 			updatedByUid: uid,
	// 			updatedByUser: displayName,
	// 		},
	// 		prclKey: `PRCLKEY11111`,
	// 	};
	// 	console.log(`newErf`, newErf);

	// 	// step X: get erf data based on the workbase

	// 	// step x: create erf data

	// 	// create erf object

	// 	// write erf object to erfs collection in firestore
	// 	// add clonedErf to erfs
	// 	// addDocument(newErf);
	// };

	const handleFeatureClick = useCallback(
		(event) => {
			console.log("event", event);
			// Perform actions based on the clicked feature
			const lat = event.latLng.lat();
			// console.log("lat", lat);

			const lng = event.latLng.lng();
			// console.log("lng", lng);

			// check if there is a selected ward. If not, return
			// const { ward } = erfsContext;
			// console.log(`ward`, ward);

			// Get user data from user context
			const { displayName, uid } = user;
			// console.log(`displayName`, displayName);
			// console.log(`uid`, uid);

			// step X: get user workbase
			// const {workbase} = user?.claims;
			// console.log(`workbase`, workbase);

			// Check if the gps point is inside an erf.

			// Generate random erfNo and prclKey using nanoid
			const randomId = nanoid().toUpperCase();
			console.log(`randomId`, randomId);

			// Create a fake erf
			const newErf = {
				address: {
					country: "South Africa",
					dm: "Sekhukhune",
					gps: { latitude: lat, longitude: lng },
					lmMetro: "Ephraim Mogale LM",
					province: "LP",
					suburbTownship: "Marble Hall",
					town: "Marble Hall",
					ward: "7",
				},
				erfNo: `FE-${randomId.slice(0, 5)}`,
				metadata: {
					createdAtDatetime: Timestamp.now(),
					createdByUid: uid,
					createdByUser: displayName,
					updatedAtDatetime: Timestamp.now(),
					updatedByUid: uid,
					updatedByUser: displayName,
				},
				prclKey: randomId,
			};
			console.log(`newErf`, newErf);

			// step X: get erf data based on the workbase

			// step x: create erf data

			// create erf object

			// write erf object to erfs collection in firestore
			// add clonedErf to erfs
			addDocument(newErf);
		},

		[user]
	);

	// This method displays lm boundary. Pass it the boundary polygon geojson file
	const displayLmBoundary = async (map) => {
		// console.log(`displayLmBoundary`);
		// console.log(`map`, map);
		// console.log(`lmBoundary`, lmBoundary);
		// console.log(`center`, center);

		if (lmBoundary) {
			try {
				map?.data?.loadGeoJson(lmBoundary);
				// console.log(`map.data`, map.data);
				map?.data?.addListener("dblclick", handleFeatureClick);

				await map.data?.setStyle((feature) => {
					// console.log(`feature`, feature);

					return {
						fillOpacity: 0,
						strokeWeight: 1,
						strokeColor: "blue",
					};
				});

				const response = await fetch(lmBoundary);

				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}

				const data = await response.json();
				// console.log(`data`, data);

				let myBounds = new window.google.maps.LatLngBounds();
				await data.features[0].geometry.coordinates[0][0].forEach((latLng) => {
					myBounds.extend({ lat: latLng[1], lng: latLng[0] });
				});
				// console.log(`myBounds`, myBounds);

				await map.fitBounds(myBounds);
			} catch (error) {
				console.error(error.message);
			}
		}
	};

	const fitWardBoundary = async (map, wBoundary, wardNo) => {
		// console.log(`fitWardBoundary map`, map);
		// console.log(`wardNo`, wardNo);
		// console.log(`wBoundary`, wBoundary);

		try {
			const response = await fetch(wBoundary);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const data = await response.json();
			// console.log(`data`, data);

			let myBounds = new window.google.maps.LatLngBounds();
			await data.features[0].geometry.coordinates[0][0].forEach((latLng) => {
				myBounds.extend({ lat: latLng[1], lng: latLng[0] });
			});

			await map?.fitBounds(myBounds);

			await map.data?.setStyle((feature) => {
				// console.log(`feature`, feature);

				let wn = null;
				const wn_WardNo = feature.getProperty("WardNo");
				if (wn_WardNo) {
					// console.log(`wn_WardNo`, wn_WardNo);
					wn = Number(wn_WardNo);
				}

				const wn_ADM4_EN = feature.getProperty("ADM4_EN");
				// console.log(`wn_ADM4_EN`, wn_ADM4_EN);
				if (wn_ADM4_EN) {
					// console.log(`wn_ADM4_EN`, wn_ADM4_EN);
					wn = Number(removeLeadingZerosRegex(wn_ADM4_EN));
				}
				//
				let strokeWeight = 1;
				let color = "blue";

				if (wardNo === wn && wardNo && wn) {
					// console.log(`selected wardNo:`, wardNo);
					// console.log(`selected wn:`, wn);
					strokeWeight = 3;
					color = "red";
					return {
						fillOpacity: 0,
						strokeWeight: strokeWeight,
						strokeColor: color,
					};
				} else {
					return {
						fillOpacity: 0,
						strokeWeight: strokeWeight,
						strokeColor: color,
					};
				}
			});
		} catch (error) {
			console.error(error.message);
		}
	};

	// This method displays all ward boundaries but not use fitBounds
	const displayLMWardBoundaries = async (map) => {
		// console.log(`displayLMWardBoundaries`);
		// console.log(`lmWardBoundaries`, lmWardBoundaries);
		// console.log(`map`, map);

		// await map.data.setStyle({
		// 	fillOpacity: 0,
		// 	strokeWeight: 1,
		// 	strokeColor: "blue",
		// });
		lmWardBoundaries &&
			lmWardBoundaries.map((wardBoundary) => {
				// console.log(`wardBoundary`, wardBoundary);
				map?.data?.loadGeoJson(wardBoundary.wardBoundary, wardBoundary);
				// map?.data?.loadGeoJson(wardBoundary.erfBoundary);
				// await map.data?.setStyle((feature) => {
				// 	console.log(`feature`, feature);

				// 	return {
				// 		fillOpacity: 0,
				// 		strokeWeight: 1,
				// 		strokeColor: "red",
				// 	};
				// });
			});
	};

	return {
		displayLmBoundary,
		displayLMWardBoundaries,
		fitWardBoundary,
		state,
	};
};

export default useIrepsMap;
