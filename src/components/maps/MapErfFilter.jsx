// npm libraries
import { useContext, useMemo } from "react";
import Select from "react-select";

// css
import "@/components/maps/MapErfFilter.css";

// hooks
import { useMap, MapControl, ControlPosition } from "@vis.gl/react-google-maps";

// contexts
import { ErfsContext } from "@/contexts/ErfsContext";

// images
// import house1 from "@/images/house1.png";

const MapErfFilter = () => {
	// console.log(`MapErfFilter`)

	const map = useMap();
	// console.log(`map`, map);

	const { erfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext);

	const { erfs: landParcels, ward } = useMemo(() => erfsContext, [erfsContext]);
	// console.log(`landParcels`, landParcels);
	// console.log(`ward`, ward);

	const erfs =
		landParcels &&
		landParcels?.filter((erf) => Number(erf?.address?.ward) === Number(ward));
	// console.log(`erfs`, erfs);

	// const {erfs} = erfsContext
	// const erfs = useMemo(() => {
	// 	return erfsContext?.erfs;
	// }, [erfsContext]);
	// console.log(`erfs`, erfs);

	const options =
		erfs &&
		erfs.map((erf) => {
			return {
				value: erf.erfNo,
				label: erf.erfNo,
				data: erf,
			};
		});
	// console.log(`options`, options);

	const setSelectedOption = (selection) => {
		// console.log(`selection`, selection);
		if (!map) return;
		if (!selection) return;
		map.panTo({
			lat: Number(selection.data?.address?.gps?.latitude),
			lng: Number(selection.data?.address?.gps?.longitude),
		});
		map.setZoom(20);
	};

	const clearValue = (e) => {
		console.log(`clearing selected value`, e);
		return null;
	};

	const customStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: "lightgray",
			padding: "0.15rem",
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
			position={ControlPosition.LEFT_TOP}
			style={{ margin: "1.6rem" }}
		>
			<div className="map-erf-filter">
				<div className="mef">
					{/* <img src={house1} alt="erf" /> */}
					<h2>Erf</h2>
				</div>
				<Select
					defaultValue={"Erf No"}
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

export default MapErfFilter;
