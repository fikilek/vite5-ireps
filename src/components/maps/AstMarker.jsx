// npm libraries
import { useCallback } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

// css
import "@/components/maps/AstMarker.css";

/**
 * Wrapper Component for an AdvancedMarker for a single ast.
 */
export const AstMarker = (props) => {
	const { ast, onClick, setMarkerRef } = props;

	const { lat, lng } = ast?.location?.gps;

	const handleClick = useCallback(() => onClick(ast), [onClick, ast]);

	const ref = useCallback(
		(marker) => {
			if (setMarkerRef) {
				return setMarkerRef(marker, ast.id);
			}
		},
		[setMarkerRef, ast.id]
	);
	const { trns } = ast;
	const totalTrns = trns?.length || "";

	return (
		<AdvancedMarker
			position={{
				lat: Number(lat),
				lng: Number(lng),
			}}
			ref={ref}
			onClick={handleClick}
		>
			{/* <span className="marker-clustering-ast">🌳</span> */}
			{totalTrns && <button className="ast-asts">{totalTrns}</button>}
			<button className="ast-no-btn">
				<span className="ast-no">{ast?.astData?.astNo}</span>
			</button>
		</AdvancedMarker>
	);
};
