import {useContext, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";

// css
import "@/components/mapsGoogleMapReact/GmrMainMap.css"

// conggtexts
import { GmrContext } from "@/contexts/GmrContext";

const GmrMainMap = (props) => {

	const {children} = props

	const { gmrContext, setGmrContext } = useContext(GmrContext);
	// console.log(`bmrContext`,bmrpContext);

	const mapRef = useRef();

	const onMapChange = (params) => {
		const { bounds, zoom } = params;
		setGmrContext({
			...gmrContext,
			zoom,
		bounds: [bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]
		});
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

	return (
		<div className="gmr-main-map">
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
				{children}
			</GoogleMapReact>
		</div>
	);
};

export default GmrMainMap;
