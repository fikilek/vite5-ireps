// npm library
import { useMemo } from "react";

// css
import "@/components/maps/rgm/RgmErfMarkers.css";
import RgmErfMarker from "./RgmErfMarker";
import { MarkerClusterer, MarkerF } from "@react-google-maps/api";

const RgmErfMarkers = (props) => {
	console.log(`props`, props);

	const erfs = useMemo(() => props?.erfs?.slice(0, 100), [props?.erfs]);
	// console.log(`erfs`, erfs);

	return (
		<>
			{/* {erfs &&
				erfs?.map((erf) => {
					return <RgmErfMarker key={erf.if} erf={erf} />;
				})} */}
			{erfs && (
				<MarkerClusterer>
					{(clusterer) =>
						erfs.map((erf) => {

							return (
								<MarkerF
									key={erf.id}
									position={{
										lat: erf?.address?.gps?.latitude,
										lng: erf?.address?.gps?.longitude,
									}}
									clusterer={clusterer}
									// onClick={() => {
									// 	fetchDirections(house);
									// }}
								/>
							);
						})
					}
				</MarkerClusterer>
			)}
		</>
	);
};

export default RgmErfMarkers;
