// library imports
// import { useState, useEffect } from "react";

// hooks
import useUserCadastral from "@/hooks/useUserCadastral.jsx";

function removeLeadingZerosRegex(str) {
	return str.replace(/^0+(?=\d)/, '');
}

const useIrepsMap = () => {
	// console.log(`useIrepsMap`);
	const { state } = useUserCadastral();
	// console.log(`state`, state);

	const { lmBoundary, lmWardBoundaries } = state;
	// console.log(`lmBoundary`, lmBoundary);

	// selected ward boundaries
	// const [selectedWardBoundaries, setSelectedWardBoundaries] = useState("all");
	// console.log(`selectedWardBoundaries`, selectedWardBoundaries);

	// useEffect(() => {
	// 	setSelectedWardBoundaries(lmWardBoundaries);
	// 	return ()=>setSelectedWardBoundaries(null)
	// }, [lmWardBoundaries]);

	const showBoundaries = (name, isSelected, map) => {
		if (!name) return;

		switch (name) {
			// Country
			case "South Africa":
				// map?.data?.loadGeoJson(za);
				displayMap(map, za, isSelected);
				break;

			// Province
			case "GP":
				displayMap(map, za_gp, isSelected);
				break;
			case "NW":
				displayMap(map, za_nw, isSelected);
				break;
			case "MP":
				displayMap(map, za_mp, isSelected);
				break;
			case "EC":
				displayMap(map, za_ec, isSelected);
				break;
			case "WC":
				displayMap(map, za_wc, isSelected);
				break;
			case "NC":
				displayMap(map, za_nc, isSelected);
				break;
			case "LP":
				displayMap(map, za_lp, isSelected);
				break;
			case "KZN":
				displayMap(map, za_kzn, isSelected);
				break;
			case "FS":
				displayMap(map, za_fs, isSelected);
				break;

			// District Municipalities
			case "Zululand":
				displayMap(map, za_kzn_zululand, isSelected);
				break;
			case "Gert Sibande":
				displayMap(map, za_mp_gert_sibande, isSelected);
				break;
			case "Nkangala":
				displayMap(map, za_mp_nkangala, isSelected);
				break;
			case "Sedibeng":
				displayMap(map, za_gp_sedibeng, isSelected);
				break;

			// Metros
			case "Cape Town":
				displayMap(map, za_wc_cape_town, isSelected);
				break;
			case "Ethekwini":
				displayMap(map, za_kzn_ethekwini, isSelected);
				break;
			case "Tshwane":
				displayMap(map, za_gp_tshwane, isSelected);
				break;
			case "Johhanesburg":
				displayMap(map, za_gp_coj, isSelected);
				break;
			case "Ekurhuleni":
				displayMap(map, za_gp_ekurhuleni, isSelected);
				break;
			case "Mangaung":
				displayMap(map, za_fs_mangaung, isSelected);
				break;
			case "Bufallo City":
				displayMap(map, za_ec_bufallo_city, isSelected);
				break;
			case "Nelson Mandela":
				displayMap(map, za_ec_nelson_mandela, isSelected);
				break;

			// Local Municipalities

			// Mpumalanga - Nkangala
			case "Victor Khanye":
				displayMap(map, za_mp_nkangala_vk, isSelected);
				// displayMap(map, za_mp_nkangala_vk_w1, isSelected);
				// displayMap(map, za_mp_nkangala_vk_w2, isSelected);
				// displayMap(map, za_mp_nkangala_vk_w3, isSelected);

				break;
			// Gauteng - Sedibeng - Lesedi
			case "Lesedi":
				displayMap(map, za_gp_sedibeng_lesedi, isSelected);
				break;
			// KZN - Zululand - eDumbe
			case "eDumbe":
				displayMap(map, za_kzn_zululand_edumbe, isSelected);
				break;
			// KZN - Uthungulu - Nkandla
			case "Nkandla":
				displayMap(map, za_kzn_uthungulu_nkandla, isSelected);
				break;

			// Wards

			// Gauteng - Sedibeng - Lesedi
			case "Lesedi Wards":
				isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi);

				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w1);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w2);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w3);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w4);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w5);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w6);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w7);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w8);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w9);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w10);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w11);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w12);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w13);

				break;

			case "Lesedi W1":
				// console.log(`Lesedi W1`, za_gp_sedidbeng_lesedi_w1);
				displayMap(
					map,
					za_gp_sedidbeng_lesedi_w1,
					isSelected,
					za_gp_sedidbeng_lesedi_w1_cadastral
				);
				break;

			case "Lesedi W2":
				displayMap(map, za_gp_sedidbeng_lesedi_w2, isSelected);

				// isSelected && map?.data?.loadGeoJson(za_gp_sedidbeng_lesedi_w2);

				// map.setCenter({ lat: -26.55582, lng: 28.315242 });
				// map.setZoom(15.5);
				break;
			case "Lesedi W3":
				displayMap(map, za_gp_sedidbeng_lesedi_w3, isSelected);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedidbeng_lesedi_w3);
				break;
			case "Lesedi W4":
				displayMap(map, za_gp_sedidbeng_lesedi_w4, isSelected);
				break;
			case "Lesedi W5":
				displayMap(map, za_gp_sedidbeng_lesedi_w5, isSelected);
				break;
			case "Lesedi W6":
				displayMap(map, za_gp_sedidbeng_lesedi_w6, isSelected);
				break;
			case "Lesedi W7":
				displayMap(map, za_gp_sedidbeng_lesedi_w7, isSelected);
				break;
			case "Lesedi W8":
				displayMap(map, za_gp_sedidbeng_lesedi_w8, isSelected);
				break;
			case "Lesedi W9":
				displayMap(map, za_gp_sedidbeng_lesedi_w9, isSelected);
				break;
			case "Lesedi W10":
				displayMap(map, za_gp_sedidbeng_lesedi_w10, isSelected);
				break;
			case "Lesedi W11":
				displayMap(map, za_gp_sedidbeng_lesedi_w11, isSelected);
				break;
			case "Lesedi W12":
				displayMap(map, za_gp_sedidbeng_lesedi_w12, isSelected);
				break;
			case "Lesedi W13":
				displayMap(map, za_gp_sedidbeng_lesedi_w13, isSelected);
				break;

			// Mpumalanga - Nkangala - Victor Khanye

			case "Victor Khanye Wards":
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w1);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w2);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w3);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w4);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w5);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w6);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w7);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w8);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w9);

				// const drawBrondary = async () => {
				// 	const jsonData = await fetch(za_mp_nkangala_vk);
				// 	const data = await jsonData.json();
				// 	let myBounds = new window.google.maps.LatLngBounds();
				// 	data.features[0].geometry.coordinates[0][0].forEach((latLng) => {
				// 		myBounds.extend({ lat: latLng[1], lng: latLng[0] });
				// 	});
				// 	map.fitBounds(myBounds);
				// };
				// drawBrondary();
				break;

			case "Victor Khanye W1":
				displayMap(
					map,
					za_mp_nkangala_vk_w1,
					isSelected,
					za_mp_nkangala_vk_w1_cadastral
				);
				break;
			case "Victor Khanye W2":
				displayMap(map, za_mp_nkangala_vk_w2, isSelected);
				break;
			case "Victor Khanye W3":
				displayMap(map, za_mp_nkangala_vk_w3, isSelected);
				break;
			case "Victor Khanye W4":
				displayMap(map, za_mp_nkangala_vk_w4, isSelected);
				break;
			case "Victor Khanye W5":
				displayMap(map, za_mp_nkangala_vk_w5, isSelected);
				break;
			case "Victor Khanye W6":
				displayMap(map, za_mp_nkangala_vk_w6, isSelected);
				break;
			case "Victor Khanye W7":
				displayMap(map, za_mp_nkangala_vk_w7, isSelected);
				break;
			case "Victor Khanye W8":
				displayMap(map, za_mp_nkangala_vk_w8, isSelected);
				break;
			case "Victor Khanye W9":
				displayMap(map, za_mp_nkangala_vk_w9, isSelected);
				break;

			// Towns

			// Wards

			// Areaa

			default:
				break;
		}

		// if (name === "Obed Nkosi" && isSelected) {
		// 	map.data?.loadGeoJson(za_gp_sed_lsd_obn_A);
		// 	map.data?.loadGeoJson(za_gp_sed_lsd_obn_B);
		// 	map.data?.loadGeoJson(za_gp_sed_lsd_obn_C);
		// 	// console.log(`mapRef.data`, map.data);
		// 	return;
		// }

		// if (name === "Obed Nkosi A" && isSelected) {
		// 	map.data?.loadGeoJson(za_gp_sed_lsd_obn_A);
		// 	// console.log(`mapRef.data`, map.data);
		// 	const bounds = map.data?.map?.getBounds();
		// 	console.log(`bounds`, bounds);
		// }
		// if (name === "Obed Nkosi B" && isSelected) {
		// 	map.data?.loadGeoJson(za_gp_sed_lsd_obn_B);
		// 	// console.log(`mapRef.data`, map.data);
		// 	const bounds = map.data?.map?.getBounds();
		// 	console.log(`bounds`, bounds);
		// }
		// if (name === "Obed Nkosi C" && isSelected) {
		// 	map.data?.loadGeoJson(za_gp_sed_lsd_obn_C);
		// 	// console.log(`mapRef.data`, map.data);
		// 	const bounds = map.data?.map?.getBounds();
		// 	console.log(`bounds`, bounds);
		// }
	};

	const displayMap = async (map, boundaryFile, selected, cadastralFile) => {
		// console.log(`map`, map);

		selected && map?.data?.loadGeoJson(boundaryFile);

		const jsonData = await fetch(boundaryFile);

		const data = await jsonData.json();

		let myBounds = new window.google.maps.LatLngBounds();
		data.features[0].geometry.coordinates[0][0].forEach((latLng) => {
			myBounds.extend({ lat: latLng[1], lng: latLng[0] });
		});

		map.fitBounds(myBounds);

		selected && map?.data?.loadGeoJson(cadastralFile);

		// map.data.setStyle({
		// 	fillColor: "green",
		// 	fillOpacity: 0.1,
		// 	strokeWeight: 1,
		// 	// title: "qqqqqq",
		// });
	};

	// This method displays lm boundary. Pass it the boundary polygon geojson file
	const displayLmBoundary = async (map, center) => {
		// console.log(`displayLmBoundary`);
		// console.log(`map`, map);
		// console.log(`lmBoundary`, lmBoundary);

		map?.data?.loadGeoJson(lmBoundary);

		if (center) {
			const jsonData = await fetch(lmBoundary);
			const data = await jsonData.json();

			let myBounds = new window.google.maps.LatLngBounds();
			await data.features[0].geometry.coordinates[0][0].forEach((latLng) => {
				myBounds.extend({ lat: latLng[1], lng: latLng[0] });
			});

			await map.fitBounds(myBounds);
		}
	};

	const fitWardBoundary = async (map, wBoundary, wardNo) => {
		// console.log(`fitWardBoundary map`, map);
		// console.log(`wardNo`, wardNo);
		// console.log(`wBoundary`, wBoundary);

		const jsonData = await fetch(wBoundary);
		const data = await jsonData.json();
		// console.log(`data`, data);

		let myBounds = new window.google.maps.LatLngBounds();
		await data.features[0].geometry.coordinates[0][0].forEach((latLng) => {
			myBounds.extend({ lat: latLng[1], lng: latLng[0] });
		});

		await map.fitBounds(myBounds);

		await map.data.setStyle((feature) => {
			// console.log(`feature`, feature);

			let wn = null;
			const wn_WardNo = feature.getProperty("WardNo");
			if (wn_WardNo) {
				// console.log(`wn_WardNo`, wn_WardNo);
				wn = wn_WardNo;
			}

			const wn_ADM4_EN = feature.getProperty("ADM4_EN");
			if (wn_ADM4_EN) {
				// console.log(`wn_ADM4_EN`, wn_ADM4_EN);
				wn = Number(removeLeadingZerosRegex(wn_ADM4_EN)) 
			}
// 
			let strokeWeight = 1;
			let color = "blue";

			if (wardNo === wn && wardNo && wn) {
				// console.log(`selected wardNo:`, wardNo);
				// console.log(`selected wn:`, wn);
				strokeWeight = 3;
				color = "red";
			}

			return {
				fillOpacity: 0,
				strokeWeight: strokeWeight,
				strokeColor: color,
			};
		});
	};

	// This method displays lm boundary. Pass it the bondary polygon geojson file

	// const displayWardBoundary = async (map, boundary) => {
	// 	// console.log(`map`, map);
	// 	console.log(`boundary`, boundary);

	// 	// const { lmBoundary} = boundary;

	// 	map?.data?.loadGeoJson(lmBoundary);

	// 	await map.data.setStyle({
	// 		fillOpacity: 0,
	// 		strokeWeight: 1,
	// 		strokeColor: "blue",
	// 	});
	// };

	// This method displays all ward boundaries.
	// Both map to draw on and array of ward boundaries are passed as method arguments.
	// const displayWardBoundary = (map) => {
	// 	// console.log(`wardBoundaries`, wardBoundaries);
	// 	lmWardBoundaries.wardBoundary &&
	// 		lmWardBoundaries.wardBoundary.map((wardBoundary) => {
	// 			// console.log(`wardBoundary`, wardBoundary)
	// 			displayLmBoundary(map, wardBoundary);
	// 		});
	// };

	// This method displays all ward boundaries but not use fitBounds
	const displayLMWardBoundaries = async (map) => {
		// console.log(`lmWardBoundaries`, lmWardBoundaries);
		await map.data.setStyle({
			fillOpacity: 0,
			strokeWeight: 1,
			strokeColor: "blue",
		});
		lmWardBoundaries &&
			lmWardBoundaries.map((wardBoundary) => {
				// console.log(`wardBoundary`, wardBoundary)
				map?.data?.loadGeoJson(wardBoundary.wardBoundary, wardBoundary);
				map?.data?.loadGeoJson(wardBoundary.erfBoundary);
			});

	};

	return {
		showBoundaries,
		displayLmBoundary,
		displayLMWardBoundaries,
		// selectedWardBoundaries,
		// setSelectedWardBoundaries,
		fitWardBoundary,
		state,
	};
};

export default useIrepsMap;
