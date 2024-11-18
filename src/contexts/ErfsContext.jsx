import { createContext, useState } from "react";

// contexts
export const ErfsContext = createContext();

const initSettings = {
	filterBtn: false,
	activeTab: "table",
	activeArea: "",
	erfs: [],
};

export const ErfsContextProvider = props => {
	const [erfsContext, setErfsContext] = useState(initSettings);
	// console.log(`erfsContext`, erfsContext);

	return (
		<ErfsContext.Provider value={{ erfsContext, setErfsContext }}>
			{props.children}
		</ErfsContext.Provider>
	);
};
