// npm libraries
import { useCallback } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

// css
import '@/components/maps/ErfMarker.css'

/**
 * Wrapper Component for an AdvancedMarker for a single erf.
 */
export const ErfMarker = (props) => {
	const { erf, onClick, setMarkerRef } = props;

	const handleClick = useCallback(() => onClick(erf), [onClick, erf]);
	const ref = useCallback(
		(marker) => setMarkerRef(marker, erf.id),
		[setMarkerRef, erf.id]
	);
	const { asts } = erf;
	const astTotal = asts?.length || "";

	return (
		<AdvancedMarker
			position={{
				lat: erf?.address?.gps?.latitude,
				lng: erf?.address?.gps?.longitude,
			}}
			ref={ref}
			onClick={handleClick}
		>
			{/* <span className="marker-clustering-erf">🌳</span> */}
			{astTotal && <button className="erf-asts">{astTotal}</button>}
			<button className="erf-no-btn">
				<span className="erf-no">{erf.erfNo}</span>
			</button>
		</AdvancedMarker>
	);
};
