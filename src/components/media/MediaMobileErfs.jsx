import { Suspense, lazy, useContext, useEffect, useMemo } from "react";

import "@/components/media/MediaMobileErfs.css";

import useCollection from "@/hooks/useCollection.jsx";

import { MediaContext } from "@/contexts/MediaContext.jsx";

// import MediaBody from "@/components/media/MediaBody";
import MediaMobileHeader from "@/components/media/MediaMobileHeader";
import MediaMobileBody from "@/components/media/MediaMobileBody";
import MediaMobileFooter from "@/components/media/MediaMobileFooter";
import { loader } from "@/utils/utils";
import { where } from "firebase/firestore";

// import MediaAction from "./MediaAction";
const MediaAction = lazy(() => import("@/components/media/MediaAction"));

const MediaMobileErfs = props => {
	// console.log(`props`, props)
	const { data, displayMode, irepsKeyItem } = props.data;
	// console.log(`data`, data)
	// console.log(`displayMode`, displayMode)
	// console.log(`irepsKeyItem`, irepsKeyItem)

	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData)

	const constraints = useMemo(
		() => where("metadata.erfId", "==", data?.id),
		[data?.id]
	);
	// console.log(`constraints`, constraints)

	const { data: erfMediaInfo } = useCollection("mediaErfs", [constraints]);
	// console.log(`erfMediaInfo`, erfMediaInfo);

	// MediaMobileErfs data
	useEffect(() => {
		if (data) {
			setMediaData({
				...mediaData,
				data: erfMediaInfo,
			});
		}
		return () =>
			setMediaData({
				data: [], //media data (erf media or ast media)
				isMediaOpened: false,
				ml1: "",
				activeMediaAction: null,
				erfData: [],
				ast: [],
				displayPosition: 0,
			});
	}, [erfMediaInfo, data]);

	// Erf data
	useEffect(() => {
		if (data) {
			setMediaData({
				...mediaData,
				erfData: data,
			});
		}
		return () =>
			setMediaData({
				data: [], //media data (erf media or ast media)
				isMediaOpened: false,
				ml1: "",
				activeMediaAction: null,
				erfData: [],
				ast: [],
				displayPosition: 0,
			});
	}, [data]);

	return (
		<div className="media-mobile-erfs">
			<MediaMobileHeader displayMode={displayMode} irepsKeyItem={irepsKeyItem} />
			<MediaMobileBody irepsKeyItem={irepsKeyItem} />
			<MediaMobileFooter />
			<Suspense fallback={loader}>
				<MediaAction data={props.data} />
			</Suspense>
		</div>
	);
};

export default MediaMobileErfs;
