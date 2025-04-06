// npm libraries
import { useCallback, useState, useEffect } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

// css
import "@/components/maps/ErfMarker.css";

/**
 * Wrapper Component for an AdvancedMarker for a single erf.
 */
export const ErfMarker = (props) => {
	const { erf, onClick, setMarkerRef } = props;
	// console.log(`erf`, erf);

	const [noAccess, setNoAccess] = useState(null);

	// check if erf has a NP ACCESS
	useEffect(() => {
		if (erf?.trns?.length) {
			// console.log(`erf ${erf?.erfNo} has NO ACCESS`);
			setNoAccess(erf?.trns?.length);
		}
	}, []);

	const handleClick = useCallback(() => onClick(erf), [onClick, erf]);
	const ref = useCallback(
		(marker) => setMarkerRef(marker, erf.id),
		[setMarkerRef, erf?.id]
	);
	const { asts } = erf;
	const astTotal = asts?.length || "";

	return (
		<div className="erf-marker">
			<AdvancedMarker
				position={{
					lat: erf?.address?.gps?.latitude,
					lng: erf?.address?.gps?.longitude,
				}}
				ref={ref}
				// onClick={handleClick}
			>
				{noAccess && <button className="erf-no-access">{noAccess}</button>}
				{astTotal && <button className="erf-asts">{astTotal}</button>}
				<button className="erf-no-btn">
					<span className="erf-no">{erf?.erfNo}</span>
				</button>
			</AdvancedMarker>
		</div>
	);
};
