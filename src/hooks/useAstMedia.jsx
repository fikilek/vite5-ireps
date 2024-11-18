// npm libraries
import {useContext, useMemo, useEffect} from 'react'
import { where } from "firebase/firestore";

// contexts
import { MediaContext } from "@/contexts/MediaContext";

// hooks
import useCollection from "@/hooks/useCollection.jsx";

// components

export const useAstMedia = (props) => {
	console.log(`props`, props)

	const {astId} = props
	// console.log(`astId`, astId)

	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);

	const constraints = useMemo(
		() => where("metadata.astId", "==", astId), [astId]
	);
	// console.log(`constraints`, constraints);

	const { data: astMediaInfo } = useCollection("mediaAsts", [constraints]);
	// console.log(`astMediaInfo`, astMediaInfo);

	// MediaMobileAsts data
	useEffect(() => {
		if (astMediaInfo) {
			setMediaData({
				...mediaData,
				data: astMediaInfo,
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

	return
};
