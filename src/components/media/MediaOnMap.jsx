import { useContext, useEffect, useState } from "react";

import "@/components/media/MediaOnMap.css";

import MapMediaCreationLocation from "@/components/maps/MapMediaCreationLocation";
import MediaMainDisplayHeader from "@/components/media/MediaMainDisplayHeader";
import { MediaContext } from "@/contexts/MediaContext";
import { irepsDictionary } from "@/utils/utils";
import MapIrepsMap from "@/components/maps/MapIrepsMap";

const MediaOnMap = () => {
	const { mediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);
	const [mapState, setMapState] = useState(null);
	// console.log(`mapState`, mapState);

	const metadata = mediaData?.data[mediaData?.displayPosition]?.metadata;
	// console.log(`metadata`, metadata);

	useEffect(() => {
		setMapState(metadata);
	}, [metadata]);
	const mediaCatergory = mapState?.mediaCategory;
	// console.log(`mediaCatergory`, mediaCatergory);
	const mediaCat =
		mediaCatergory === "" || mediaCatergory === undefined
			? ""
			: `${irepsDictionary.get(mediaCatergory)}`;

	const creationGps = `(${mapState?.lat.toFixed(6)} / ${mapState?.lng.toFixed(
		6
	)})`;
	// console.log(`creationGps`, creationGps);

	const createdAtGps =
		mapState?.lat === "" || mapState?.lat === undefined ? "" : creationGps;

	return (
		<div className="media-on-map">
			<MediaMainDisplayHeader
				hl1={mediaCat}
				hl2={""}
				hl3={""}
				hr1={""}
				hr2={""}
				hr3={createdAtGps}
			/>

			<div className="map-container">
				{mapState ? (
					<MapIrepsMap>
						<MapMediaCreationLocation />
					</MapIrepsMap>
				) : (
					<p>No Map</p>
				)}
			</div>
		</div>
	);
};

export default MediaOnMap;
