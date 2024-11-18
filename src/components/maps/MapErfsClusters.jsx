import { useContext, useEffect, useMemo, useState } from "react";
import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";

import "@/components/maps/MapErfsClusters.css";

import { ErfsMapContext } from "@/contexts/ErfsMapContext";
import useSupercluster from "use-supercluster";

const Marker = ({ children }) => children;

const MapErfsClusters = () => {
	const { map } = useMap();

	const [zoom, setZoom] = useState(12);
	const [bounds, setBounds] = useState([]);

	const [ervens, setErvens] = useState([]);
	// console.log(`ervens`, ervens);

	const { erfsMapContext } = useContext(ErfsMapContext);
	// console.log(`erfsMapContext`, erfsMapContext);

	const erfs = useMemo(() => erfsMapContext?.erfs, [erfsMapContext?.erfs]);

	useEffect(() => {
		setErvens(erfs.slice(0, 50));
	}, [erfs]);

	const points = useMemo(() => {
		const _erfs = ervens.slice(0, 5).map((erf) => {
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

	const { clusters } = useSupercluster({
		points,
		bounds,
		zoom,
		options: { radius: 75, maxZoom: 20 },
	});
	console.log(`clusters`, clusters);
	// console.log(`supercluster`, supercluster);

	return (
		<div className="map-erfs-markers">
			{clusters.map((cluster) => {
				console.log(`cluster`, cluster);

				const [longitude, latitude] = cluster.geometry.coordinates;
				const point = {
					lat: latitude,
					lng: longitude,
				};
				const {
					cluster: isCluster,
					point_count: pointCount,
					erf,
				} = cluster.properties;

				if (isCluster) {
					return (
						<Marker
							key={`cluster-${cluster.id}`}
							lat={latitude}
							lng={longitude}
						>
							<div
								className="cluster-marker"
								style={{
									width: `${10 + (pointCount / points.length) * 20}px`,
									height: `${10 + (pointCount / points.length) * 20}px`,
								}}
								onClick={() => {}}
							>
								{pointCount}
							</div>
						</Marker>
					);
				}

				return (
					<AdvancedMarker position={point} key={erf.id}>
						<Pin background={"#22ccff"} borderColor={"#1e89a1"} scale={1}>
							{/* <span className="erf">{erf.erfNo}</span> */}
						</Pin>
					</AdvancedMarker>
				);
			})}

			{
			// erfs &&
			// 	erfs.map((erf) => {
			// 		const point = {
			// 			lat: erf.address.gps.latitude,
			// 			lng: erf.address.gps.longitude,
			// 		};

			// 		return (
			// 			<AdvancedMarker position={point} key={erf.id}>
			// 				<Pin background={"#22ccff"} borderColor={"#1e89a1"} scale={1}>
			// 					{/* <span className="erf">{erf.erfNo}</span> */}
			// 				</Pin>
			// 			</AdvancedMarker>
			// 		);
			// 	})
				}
		</div>
	);
};

export default MapErfsClusters;
