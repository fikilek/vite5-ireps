import { useContext, useEffect, useMemo, useState } from "react";
import useSupercluster from "use-supercluster";

// css
import "./GmrErfs.css";

// contexts
import { ErfsMapContext } from "@/contexts/ErfsMapContext";
import { GmrContext } from "@/contexts/GmrContext";

const Marker = ({ children }) => children;
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

const GmrErfs = () => {

	const { gmrContext } = useContext(GmrContext);
	// console.log(`erfsMapContext`, erfsMapContext);

	const [ervens, setErvens] = useState([]);
	// console.log(`ervens`, ervens);

	const { erfsMapContext } = useContext(ErfsMapContext);
	console.log(`erfsMapContext`, erfsMapContext);

	const { erfs } = erfsMapContext;
	console.log(`erfs`, erfs);

	useEffect(() => {
		setErvens(erfs);
	}, [erfs]);

	const points = useMemo(() => {
		const _erfs = ervens.slice(0, 500).map((erf) => {
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
		bounds: gmrContext.bounds,
		zoom: gmrContext.zoom ,
		options: { radius: 75, maxZoom: 20 },
	});
	// console.log(`clusters`, clusters);
	
	return (
		<div className="map-properties-map">
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
					<Marker key={crimeId} lat={latitude} lng={longitude}>
						<button className="erf-no-btn">
							<span className="erf-no">{erf.erfNo}</span>
						</button>
					</Marker>
				);
			})}
		</div>
	);
};

export default GmrErfs;
