import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import csvToJson from "convert-csv-to-json";
import './MapErfsClusterMap.css'
// import "./MapErfsClusterMap.css";
// import ratandab from "../../../../data/cadastral/lesedi/ratandab.geojson";
// import lesediObedNkosiA from "../../../../data/cadastral/lesedi/ObedNkosi/lesediObedNkosiA.geojson";
// import lesediObedNkosiB from "../../../../data/cadastral/lesedi/ObedNkosi/lesediObedNkosiB.geojson";
// import lesediObedNkosiC from "../../../../data/cadastral/lesedi/ObedNkosi/lesediObedNkosiC.geojson";
// import useModal from "@/hooks/useModal";
import { ErfsMapContext } from "@/contexts/ErfsMapContext";
import { useMap } from "@vis.gl/react-google-maps";
// import useGeoLocation from "../../../../hooks/useGeolocation";
// import { AreaTreeContext } from "../../../../contexts/AreaTreeContext";

const Marker = ({ children }) => children;

// const areaCenter = {
// 	"Obed Nkosi A": { lat: -26.541960658447646, lng: 28.338629116440828 },
// 	"Obed Nkosi B": { lat: -26.52888160075503, lng: 28.3352936276032 },
// 	"Obed Nkosi C": { lat: -26.532998883501552, lng: 28.345134598723572 },
// };
let erfs = [
	{
		geometry: { type: "Point", coordinates: [51.042419, -113.397727] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.042686, -113.397614] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.042611, -113.397767] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.042849, -113.39826] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.043484, -113.396595] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.043247, -113.395846] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.043266, -113.395568] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.043353, -113.395342] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.043704, -113.394671] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.043811, -113.393873] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.043629, -113.394354] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.0435, -113.394573] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.043531, -113.394751] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.043327, -113.395088] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.043133, -113.39569] },
		properties: {},
		type: "Feature",
	},
	{
		geometry: { type: "Point", coordinates: [51.042978, -113.396032] },
		properties: {},
		type: "Feature",
	},
];

export function MapErfsClusterMap() {
	// console.log(`props`, props);

	// const map = useMap();

	const { erfsMapContext } = useContext(ErfsMapContext);
	// console.log(`erfsMapContext`, erfsMapContext);

	const {erfs} = erfsMapContext
	// console.log(`erfs`, erfs);

	const [bounds, setBounds] = useState([]);
	// console.log(`bounds`, bounds);
	const [zoom, setZoom] = useState(10);
	// console.log(`zoom`, zoom)

	// const { area } = useContext(AreaTreeContext);
	// console.log(`area`, area);

	// const mapRef = useRef();
	// console.log(`mapRef`, mapRef);

	// const { openModal } = useModal();

	// const [erfs, setErfs] = useState(props.rowData);
	// console.log(`erfs`, erfs);

	// useEffect(() => {
	// 	setErfs(props.rowData);
	// }, [props.rowData]);

	// get user location
	// const { setGeolocation, userGps } = useGeoLocation();
	// console.log(`userGps`, userGps);

	// setGeolocation();

	// const points = erfs?.map((erf) => {
	// 	// console.log(`erf`, erf);
	// 	const lat = Number(erf?.geometry?.coordinates[0]);
	// 	// console.log(`lat`, lat);
	// 	const lng = Number(erf?.geometry?.coordinates[1]);
	// 	// console.log(`lng`, lng);

	// 	return {
	// 		type: "Feature",
	// 		// properties: { cluster: false, erfId: erf.id, erf: erf },
	// 		properties: { cluster: false },
	// 		geometry: {
	// 			type: "Point",
	// 			// coordinates: [lat  , lng],
	// 			coordinates: [parseFloat(lat), parseFloat(lng)],
	// 		},
	// 	};
	// });
	// console.log(`points`, points);

	const data = useMemo(() => {


		const _erfs = erfs.slice(0, 50).map((erf) => {

			// console.log(`erf`, erf);
			const lat = Number(erf?.geometry?.coordinates[0]);
			// console.log(`lat`, lat);
			const lng = Number(erf?.geometry?.coordinates[1]);
			// console.log(`lng`, lng);
			return {

		
			type: "Feature",
			properties: {
				cluster: false,
				// listing: {
				// 	id: 39692,
				// 	address: {
				// 		latitude: 28.937118,
				// 		longitude: -81.938306,
				// 	},
				// },
			},
			geometry: {
				type: "Point",
				coordinates: [parseFloat(lng), parseFloat(lat)],
			},
		

				// type: "Feature",
				// properties: {
				// 	cluster: false,
				// 	category: "erfs",
				// 	// wellId: elem.osm_id
				// },
				// geometry: {
				// 	type: "Point",
				// 	coordinates: [parseFloat(lng), parseFloat(lat)],
				// },




			};
		});
		console.log(`_erfs`, _erfs);
		return _erfs;
	}, []);

	// console.log(`######################################################`);
	// console.log(`bounds`, bounds);
	// console.log(`zoom`, zoom);
	console.log(`data`, data);

	const result = useSupercluster({
		points: data,
		bounds,
		zoom,
		options: { radius: 75, maxZoom: 20 },
	});
	console.log(`result`, result);

	const { clusters, supercluster } = result;
	console.log(`clusters`, clusters);
	console.log(`supercluster`, supercluster);

	// erf search/filter *************************************************

	// const [selectedErf, setSelectedErf] = useState("");
	// console.log(`selectedErf`, selectedErf);
	// const [erfSearch, setErfSearch] = useState("");
	// console.log(`erfSearch`, erfSearch);
	// const [filteredErfs, setFilteredErfs] = useState("");
	// console.log(`filteredErfs`, filteredErfs);

	// useEffect(() => {
	// 	// console.log(`erfs`, erfs);
	// 	const filteredErfs = erfs?.filter(erf => erf.erfNo.includes(erfSearch));
	// 	// console.log(`filteredErfs`, filteredErfs);
	// 	setFilteredErfs(filteredErfs);
	// }, [erfSearch]);

	// console.log(`erfSearch.length`, erfSearch.length);
	// const hideShow = erfSearch?.length > 0 ? "show-erfs" : "hide-erfs";

	// useEffect(() => {
	// 	if (selectedErf) {
	// 		const lat = selectedErf?.address?.gps?.latitude;
	// 		const lng = selectedErf?.address?.gps?.longitude;
	// 		// console.log(`mapRef.current`, mapRef.current);
	// 		// console.log(`zoom`, zoom);
	// 		mapRef.current?.panTo({ lat, lng });
	// 		mapRef.current?.setZoom(20);
	// 	}
	// }, [selectedErf]);

	// const selectErf = erf => {
	// 	// console.log(`erf`, erf);
	// 	setSelectedErf(erf);
	// };

	// const onMapLoad = (mapObjects) => {
	// 	// console.log(`myMapObjects`, mapObjects);
	// 	// const { map, maps } = mapObjects;
	// 	// console.log(`mapRef`, mapRef);
	// 	// mapRef.current = map;
	// 	// console.log(`mapRef`, mapRef);

	// 	// const fileSelected = selectedArea[area.name];
	// 	// console.log(`fileSelected`, fileSelected);

	// 	// mapRef.current?.data?.loadGeoJson(fileSelected);

	// 	mapRef.current?.data?.setStyle({
	// 		fillOpacity: 0.0,
	// 	});
	// 	// mapRef.data.addListener("click", handleErfClick);
	// };

	// useEffect(() => {
	// 	// console.log(`area`, area);
	// 	// console.log(`mapRef.current?.data`, mapRef.current?.data);
	// 	// console.log(`mapRef.current`, mapRef.current);
	// 	// const fileSelected = selectedArea[area.name];
	// 	// console.log(`fileSelected`, fileSelected);
	// 	mapRef.current?.data?.forEach(function (feature) {
	// 		// console.log(`feature`, feature);
	// 		mapRef.current?.data.remove(feature);
	// 	});

	// 	if (area?.name === "Obed Nkosi A") {
	// 		mapRef.current?.data?.loadGeoJson(lesediObedNkosiA);
	// 	}
	// 	if (area?.name === "Obed Nkosi B") {
	// 		mapRef.current?.data?.loadGeoJson(lesediObedNkosiB);
	// 	}
	// 	if (area?.name === "Obed Nkosi C") {
	// 		mapRef.current?.data?.loadGeoJson(lesediObedNkosiC);
	// 	}
	// 	if (area?.name === "Obed Mthombeni Nkosi") {
	// 		mapRef.current?.data?.loadGeoJson(lesediObedNkosiA);
	// 		mapRef.current?.data?.loadGeoJson(lesediObedNkosiB);
	// 		mapRef.current?.data?.loadGeoJson(lesediObedNkosiC);
	// 	}
	// }, [area]);

	// this will fire everytime there is a click on the marker
	// const handleMarkerClick = (id, lat, lng) => {
	// 	mapRef.current?.panTo({ lat, lng });

	// 	// get erf data using erf id
	// 	const erf = erfs.find(erf => erf.id === id);
	// 	// console.log(`erf`, erf);

	// 	if (erf) {
	// 		openModal({
	// 			modalName: "tabsErfMapInfoWrapper",
	// 			payload: erf,
	// 		});
	// 	}
	// };

	// map options
	var options = {
		// panControl: true,
		// zoomControl: true,
		mapTypeControl: true,
		// scaleControl: true,
		// streetViewControl: true,
		overviewMapControl: true,
		rotateControl: true,
		fullscreenControl: false,
	};

	return (
		<div className="map-erfs-cluster-map">
			{/* <div className="search-box">
				<input
					className="erf-search"
					type="text"
					placeholder=" enter erf no"
					onChange={e => setErfSearch(e.target.value)}
					value={erfSearch}
				/>
				<div className={`search-dropdown ${hideShow} `}>
					{filteredErfs &&
						filteredErfs?.map(erf => {
							// console.log(`erf`, erf);
							const erfNo = erf?.erfNo;
							const unitName = erf.propertyType?.unitName
								? `| ${erf.propertyType?.unitName}`
								: "";
							const unitNo = erf.propertyType?.unitNo
								? `| ${erf.propertyType?.unitNo}`
								: "";
							return (
								<p key={erf.id} onClick={() => selectErf(erf)}>
									{`${erfNo} ${unitName} ${unitNo} `}
								</p>
							);
						})}
				</div>
			</div> */}
			<GoogleMapReact
				bootstrapURLKeys={{ key: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY }}
				defaultCenter={{ lat: -26.135604364944857, lng: 28.688087871069888 }}
				// center={areaCenter[area.name]}
				defaultZoom={16}
				yesIWantToUseGoogleMapApiInternals
				// onGoogleApiLoaded={onMapLoad}
				onChange={(args) => {
					// console.log(`args`, args);
					const { zoom, bounds } = args;
					setZoom(zoom);
					setBounds([
						bounds.nw.lng,
						bounds.se.lat,
						bounds.se.lng,
						bounds.nw.lat,
					]);
				}}
				options={options}
			>
				{/* {clusters.map((cluster) => {
					console.log(`cluster?.properties?.erf`, cluster?.properties?.erf);

					const anomaly = false;

					const [longitude, latitude] = cluster.geometry.coordinates;
					const { cluster: isCluster, point_count: pointCount } =
						cluster.properties;
					const erfNo = cluster?.properties?.erf?.erfNo;
					const id = cluster?.properties?.erf?.id;
					const hasAsts =
						cluster?.properties?.erf?.asts?.length > 0 ? "has-asts" : "";

					if (cluster?.properties?.erf?.asts?.length > 0) {
						// console.log(`erf with asts`, cluster?.properties?.erf);
					}
					const hasAnomaly = anomaly ? "has-anomaly" : "";

					if (isCluster) {
						return (
							<Marker key={`${cluster.id}`} lat={latitude} lng={longitude}>
								<div
									className="cluster-marker"
									style={{
										width: `${10 + (pointCount / points.length) * 20}px`,
										height: `${10 + (pointCount / points.length) * 20}px`,
										backgroundColor: "#ff66ff",
									}}
									onClick={() => {
										const expansionZoom = Math.min(
											supercluster.getClusterExpansionZoom(cluster.id),
											20
										);
										mapRef.current.setZoom(expansionZoom);
										mapRef.current.panTo({ lat: latitude, lng: longitude });
									}}
								>
									{pointCount}
								</div>
							</Marker>
						);
					}

					return (
						<Marker
							key={`${cluster.properties.erfId}`}
							lat={latitude}
							lng={longitude}
						>
							<button
								className={`erf-marker`}
								// onClick={() => handleMarkerClick(id, latitude, longitude)}
							>
								<span className={`erf-no ${hasAsts} ${hasAnomaly}`}>
									{erfNo}
								</span>
							</button>
						</Marker>
					);
				})} */}
				{/* <Marker
					position={{ lat: userGps.coordinates.lat, lng: userGps.coordinates.lng }}
				>
					<div className="userGpsPosition"></div>
				</Marker> */}
			</GoogleMapReact>
		</div>
	);
}
