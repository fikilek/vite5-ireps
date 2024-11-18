import { createContext, useState } from "react";

// contexts
export const GmrContext = createContext();

const initSettings = {
	zoom: null,
	bounds: null,
};

export const GmrContextProvider = props => {
	const [gmrContext, setGmrContext] = useState(initSettings);
	// console.log(`gmrContext`, gmrContext);

	return (
		<GmrContext.Provider value={{ gmrContext, setGmrContext }}>
			{props.children}
		</GmrContext.Provider>
	);
};
