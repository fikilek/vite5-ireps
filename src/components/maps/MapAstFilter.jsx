// npm libraries
import { useContext, useMemo } from "react";
import Select from "react-select";

// css
import "@/components/maps/MapAstFilter.css";

// hooks
import { useMap, MapControl, ControlPosition } from "@vis.gl/react-google-maps";

// contexts
import { AstsContext } from "@/contexts/AstsContext";

// images
import meter14 from "@/images/meter14.jpg";

const MapAstFilter = (props) => {
	// console.log(`MapAstFilter`)
	const { asts } = props;
	// console.log(`asts`, asts)

	const map = useMap();
	// console.log(`map`, map);

	// const { astsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);

	// const {asts} = astsContext
	// const asts = useMemo(() => {
	// 	return astsContext?.asts;
	// }, [assests]);
	// console.log(`asts`, asts);

	const options =
		asts &&
		asts?.map((ast) => {
			return {
				value: ast?.astData?.astNo,
				label: ast?.astData?.astNo,
				data: ast,
			};
		});
	// console.log(`options`, options);

	const setSelectedOption = (selection) => {
		// console.log(`selection`, selection);
		if (!map) return;
		if (!selection) return;
		map.panTo({
			lat: Number(selection.data?.location?.gps?.lat),
			lng: Number(selection.data?.location?.gps?.lng),
		});
		map.setZoom(20);
	};

	const clearValue = (e) => {
		// console.log(`clearing selected value`, e);
		return null;
	};

	const customStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: "lightgray",
			padding: "0.11rem",
			// border: "1px solid black",
			// boxShadow: "0 2px 4px rgba(0,0,0,.2)",
		}),
		option: (provided, state) => ({
			...provided,
			borderBottom: "1px dotted pink",
			color: state.isSelected ? "white" : "black",
			backgroundColor: state.isSelected ? "hotpink" : "white",
		}),
	};

	return (
		<MapControl
			position={ControlPosition.TOP_LEFT}
			style={{ margin: "1.6rem" }}
		>
			<div className="map-ast-filter">
				<img src={meter14} alt="electricity meter" />
				<Select
					defaultValue={"Meter No"}
					options={options}
					isClearable={true}
					onChange={setSelectedOption}
					clearValue={clearValue}
					styles={customStyles}
				/>
			</div>
		</MapControl>
	);
};

export default MapAstFilter;
