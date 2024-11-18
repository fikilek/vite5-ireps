import { useContext, useEffect, useMemo, useRef, useState } from "react";
// import { ChangeEventValue } from 'google-map-react'
import GoogleMapReact from "google-map-react";
// import CircularMarker from './CircularMarker'
import useSupercluster from "use-supercluster";
// import ClusterMarker from './ClusterMarker'

import "./MapPropertiesMap.css";
import { ErfsMapContext } from "@/contexts/ErfsMapContext";
import MapLmBoundary from "./MapLmBoundary";
import MapLmWardBoundaries from "./MapLmWardBoundaries";

const MarkerF = ({ children }) => children;
// 	{
// 		type: "Feature",
// 		properties: {
// 			erfNo: 1,
// 			cluster: false,
// 		},
// 		geometry: {
// 			type: "Point",
// 			coordinates: [-81.920188, 28.9222195],
// 		},
// 	},
// 	{
// 		type: "Feature",
// 		properties: {
// 			erfNo: 2,
// 			cluster: false,
// 		},
// 		geometry: {
// 			type: "Point",
// 			coordinates: [-81.9345818, 28.9165904],
// 		},
// 	},
// 	{
// 		type: "Feature",
// 		properties: {
// 			erfNo: 3,
// 			cluster: false,
// 		},
// 		geometry: {
// 			type: "Point",
// 			coordinates: [-81.9390729, 28.91481],
// 		},
// 	},
// 	{
// 		type: "Feature",
// 		properties: {
// 			erfNo: 4,
// 			cluster: false,
// 		},
// 		geometry: {
// 			type: "Point",
// 			coordinates: [-81.9094848, 28.9071616],
// 		},
// 	},
// 	{
// 		type: "Feature",
// 		properties: {
// 			erfNo: 5,
// 			cluster: false,
// 		},
// 		geometry: {
// 			type: "Point",
// 			coordinates: [-81.938306, 28.937118],
// 		},
// 	},
// ];

const MapPropertiesMap = () => {
	console.log(`MapPropertiesMap`)

	const mapRef = useRef();
  
	const [ervens, setErvens] = useState([]);
	// console.log(`ervens`, ervens);

	const { erfsMapContext } = useContext(ErfsMapContext);
	// console.log(`erfsMapContext`, erfsMapContext);

	const { erfs } = erfsMapContext;
	// console.log(`erfs`, erfs);

	const [zoom, setZoom] = useState(12);
	const [bounds, setBounds] = useState([]);

  
	const points = useMemo(() => {
    const _erfs = ervens.slice(0, 1500).map((erf) => {
      // console.log(`erf`, erf);
			const lat = Number(erf?.address?.gps?.latitude);
			// console.log(`lat`, lat);
			const lng = Number(erf?.address?.gps?.longitude);
			// console.log(`lng`, lng);
			return {
        type: "Feature",
				properties: {
          erf,
					cluster: false,
				},
				geometry: {
          type: "Point",
					coordinates: [lng, lat],
				},
			};
		});
		// console.log(`_erfs`, _erfs);
		return _erfs;
	}, [ervens]);
  // console.log(`points`, points);

	const { clusters, supercluster } = useSupercluster({
		points,
		bounds,
		zoom,
		options: { radius: 75, maxZoom: 20 },
	});
	// console.log(`clusters`, clusters);
	// console.log(`supercluster`, supercluster);

	const onMapChange = (params) => {
		const { bounds, zoom } = params;
		setZoom(zoom);
		setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
	};

	var options = {
		panControl: true,
		zoomControl: true,
		mapTypeControl: true,
		scaleControl: true,
		streetViewControl: true,
		overviewMapControl: true,
		rotateControl: true,
		fullscreenControl: false,
	};

	useEffect(() => {
		setErvens(erfs);
	}, [erfs]);

	return (
		<div className="map-properties-map">
			<GoogleMapReact
				bootstrapURLKeys={{
					key: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
				}}
				defaultCenter={{ lat: -26.135604364944857, lng: 28.688087871069888 }}
				zoom={12}
				yesIWantToUseGoogleMapApiInternals
				onChange={onMapChange}
				options={options}
				onGoogleApiLoaded={({ map }) => {
					mapRef.current = map;
				}}
			>
				{clusters.map((cluster) => {
					console.log(`cluster`, cluster);

					const [longitude, latitude] = cluster.geometry.coordinates;
					const {
						cluster: isCluster,
						point_count: pointCount,
						erf,
						crimeId,
					} = cluster.properties;

					if (isCluster) {
						return (
							<MarkerF
								key={`cluster-${cluster.id}`}
								lat={latitude}
								lng={longitude}
							>
								<div
									className="cluster-Marker"
									style={{
										width: `${10 + (pointCount / points.length) * 20}px`,
										height: `${10 + (pointCount / points.length) * 20}px`,
									}}
									// onClick={() => {}}
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
							</MarkerF>
						);
					}

					return (
						<MarkerF key={crimeId} lat={latitude} lng={longitude}>
							<button className="erf-no-btn">
								<span className="erf-no">{erf.erfNo}</span>
							</button>
						</MarkerF>
					);
				})}
				{/* <MapLmBoundary mapRef={mapRef} /> */}
				{/* <MapLmWardBoundaries mapRef={mapRef} /> */}
			</GoogleMapReact>
		</div>
	);
};

export default MapPropertiesMap;
