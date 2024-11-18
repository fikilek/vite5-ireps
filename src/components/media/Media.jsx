import { useContext, useEffect } from "react";

// css
import "@/components/media/Media.css";

// custom hooks
import useCollection from "@/hooks/useCollection.jsx";

// contexts
import { MediaContext } from "@/contexts/MediaContext.jsx";

// components
import MediaBody from "@/components/media/MediaBody";
import MediaFooter from "@/components/media/MediaFooter";
import MediaAction from "@/components/media/MediaAction";
import { where } from "firebase/firestore";

const Media = props => {
	// console.log(`props`, props)
	const { data } = props;

	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData)
	
	const constraints = useMemo(() => where("metadata.erfId", "==", data.id), [data.id]);  
	// console.log(`constraints`, constraints)

	const {
		data: mediaInfo,
		error,
		isPending,
		success,
	} = useCollection("media", [constraints] );
	// console.log(`mediaInfo`, mediaInfo);

	// Media data
	useEffect(() => {
		if (data) {
			setMediaData({
				...mediaData,
				data: mediaInfo,
			});
		}
	}, [mediaInfo]);

	// Erf data
	useEffect(() => {
		if (data) {
			setMediaData({
				...mediaData,
				erfData: data,
			});
		}
	}, [data]);

	return (
		<div className="media">
			<MediaBody data={data} />
			<MediaFooter data={data} />
			<MediaAction data={data} />
		</div>
	);
};

export default Media;
