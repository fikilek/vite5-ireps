// library imports
// import { useState, useEffect } from "react";

// hooks
import useUserCadastral from "@/hooks/useUserCadastral.jsx";

// components
import ValidationError from "@/App.jsx";

function removeLeadingZerosRegex(str) {
	return str?.replace(/^0+(?=\d)/, "");
}

const useIrepsMap = () => {
	// console.log(`useIrepsMap`);
	const { state } = useUserCadastral();
	// console.log(`state`, state);

	const { lmBoundary, lmWardBoundaries } = state;
	// console.log(`lmBoundary`, lmBoundary);

	// This method displays lm boundary. Pass it the boundary polygon geojson file
	const displayLmBoundary = async (map) => {
		// console.log(`displayLmBoundary`);
		// console.log(`map`, map);
		// console.log(`lmBoundary`, lmBoundary);
		// console.log(`center`, center);

		if (lmBoundary) {
			try {
				map?.data?.loadGeoJson(lmBoundary);

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
