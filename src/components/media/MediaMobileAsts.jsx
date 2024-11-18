import { Suspense, lazy, useContext, useEffect, useMemo } from "react";

import "@/components/media/MediaMobileAsts.css";

import useCollection from "@/hooks/useCollection.jsx";

// import MediaBody from "@/components/media/MediaBody";
import { MediaContext } from "@/contexts/MediaContext";
// import MediaAction from "@/components/media/MediaAction";
import MediaMobileHeader from "@/components/media/MediaMobileHeader";
import MediaMobileBody from "@/components/media/MediaMobileBody";
import MediaMobileFooter from "@/components/media/MediaMobileFooter";
import { loader } from "@/utils/utils";
import { where } from "firebase/firestore";

const MediaAction = lazy(() => import("@/components/media/MediaAction"));

const MediaMobileAsts = props => {
	// console.log(`props`, props);
	// props will bring in  ast data from the asts table
	const { data, displayMode, irepsKeyItem, trnId } = props?.data;
	// console.log(`data`, data)
	// const { displayMode, irepsKeyItem } = props;
	// console.log(`displayMode`, displayMode)
	// console.log(`irepsKeyItem`, irepsKeyItem)

	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);

	const constraints = useMemo(
		() => where("metadata.astId", "==", data?.astData?.astId),
		[data?.astData?.astId]
	);
	// console.log(`constraints`, constraints);

	const { data: astMediaInfo } = useCollection("mediaAsts", [constraints]);
	// console.log(`astMediaInfo`, astMediaInfo);

	// MediaMobileAsts data
	useEffect(() => {
		if (data) {
			setMediaData({
				...mediaData,
				data: astMediaInfo,
				trnId,
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
	}, [astMediaInfo]);

	// ast data
	useEffect(() => {
		if (data) {
			setMediaData({
				...mediaData,
				ast: data,
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
		<div className={`media-mobile-asts`}>
			<MediaMobileHeader displayMode={displayMode} irepsKeyItem={irepsKeyItem} />
			<MediaMobileBody irepsKeyItem={irepsKeyItem} />
			<MediaMobileFooter />
			{/* <MediaAction data={props.data} /> */}

			<Suspense fallback={loader}>
				<MediaAction data={props.data} />
			</Suspense>
		</div>
	);
};

export default MediaMobileAsts;
