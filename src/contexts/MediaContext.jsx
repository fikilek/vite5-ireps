import { createContext, useState } from "react";

// Create context:
// UserContext: to query the context state
export const MediaContext = createContext();

const intiValue = {
	data: [], //media data (erf media or ast media)
	isMediaOpened: false,
	ml1: "",
	activeMediaAction: null,
	erfData: [],
	ast: [],
	trn: [],
	displayPosition: 0,
	mediaCat: null,
};

const MediaContextProvider = props => {
	// console.log(`props`, props);
	const [mediaData, setMediaData] = useState(intiValue);
	// console.log(`mediaData`, mediaData);
	return (
		<MediaContext.Provider value={{ mediaData, setMediaData }}>
			{props.children}
		</MediaContext.Provider>
	);
};

export default MediaContextProvider;
