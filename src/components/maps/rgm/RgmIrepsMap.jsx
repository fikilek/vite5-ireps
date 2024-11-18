/*
Base map for maps in ireps
*/

// npm libraries
import {
	GoogleMap,
	InfoWindow,
	MarkerClustererF,
	MarkerF,
	useJsApiLoader,
} from "@react-google-maps/api";

// css
import "@/components/maps/rgm/RgmIrepsMap.css";
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

// hooks

// contexts// context
import { ErfsContext } from "@/contexts/ErfsContext";

// components
import erf_icon3 from "@/images/erf_icon3.jpg";
import FormErf from "@/components/forms/formErf/FormErf";

const containerStyle = {
	width: "100%",
	height: "100%",
};

const RgmIrepsMap = () => {
	// console.log(`props`, props);

	const { erfsContext } = useContext(ErfsContext);


	const erfs = useMemo(() => {
		return erfsContext?.selectedErf
			? erfsContext?.selectedErf
			: erfsContext?.erfs;
	}, [erfsContext]);
	// console.log(`erfs`, erfs);

	const mapRef = useRef(null);
	// const markerRef = useRef(null);

	const [selectedErf, setSelectedErf] = useState(null);
	// console.log(`selectedErf`, selectedErf);

	const mpofanaCityCenter = useMemo(() => {
		return {
			lat: -29.207686353523933,
			lng: 29.996715841161038,
		};
	}, []);

	const options = useMemo(() => {
		{
			clickableIcons: false;
		}
	}, []);

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_REACT_API_KEY,
	});

	// const [map, setMap] = useState(null);

	// const onUnmount = useCallback((map) => {
	// 	setMap(null);
	// }, []);

	useEffect(() => {
		// console.log(`mapRef.current`, mapRef.current);
		// console.log(`props?.erfsContext?.selectedErf`, props?.erfsContext?.selectedErf);
		if (erfsContext?.selectedErf) {
			mapRef.current.panTo({
				lat: erfsContext?.selectedErf[0]?.address?.gps?.latitude,
				lng: erfsContext?.selectedErf[0]?.address?.gps?.longitude,
			});
			mapRef.current.setZoom(18)
		}
	}, [erfsContext?.selectedErf]);

	const onLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	if (!isLoaded) return <p>Loading....</p>;

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={mpofanaCityCenter}
			zoom={10}
			options={options}
			onLoad={onLoad}
			// onUnmount={onUnmount}
		>
			{/* <RgmErfMarkers erfs={props.erfs} /> */}
			{erfs && (
				<MarkerClustererF>
					{(clusterer) => (
						<div>
							{
							
							
							erfs.map((erf) => {
								// console.log(`clusterer`, clusterer);
								return (
									<MarkerF
										key={erf.id}
										// ref={markerRef}
										position={{
											lat: erf?.address?.gps?.latitude,
											lng: erf?.address?.gps?.longitude,
										}}
										label={`${erf.erfNo} [${
											erf?.asts?.length ? [erf?.asts?.length] : 0
										}]`}
										clusterer={clusterer}
										// icon={{
										// 	path:
										// 		"M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
										// 	fillColor: "yellow",
										// 	fillOpacity: 0.9,
										// 	scale: 2,
										// 	strokeColor: "gold",
										// 	strokeWeight: 2,
										// }}
										icon={{
											url: erf_icon3,
											// scaleSize: new window.google.maps.Size(50.3),
										}}
										// icon={"https://web.archive.org/web/20230701011019/https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
										onClick={() => {
											setSelectedErf(erf);
										}}
									>
										<button>{erf.erfNo}</button>
									</MarkerF>
								);
							})
							
							
							}


							
						</div>
					)}
				</MarkerClustererF>
			)}
			{selectedErf && (
				<InfoWindow
					position={{
						lat: selectedErf.address.gps.latitude,
						lng: selectedErf.address.gps.longitude,
					}}
					onCloseClick={() => setSelectedErf(null)}
				>
					<div>
						<FormErf
							data={{
								data: selectedErf,
							}}
						/>
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
	);
};

export default RgmIrepsMap
