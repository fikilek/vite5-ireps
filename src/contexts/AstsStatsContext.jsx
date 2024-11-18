import { createContext, useState } from "react";

// Create context:
export const AstsStatsContext = createContext();

const initSettings = {};

export const AstsStatsContextProvider = (props) => {
	const [astsStatsContext, setAstsStatsContext] = useState(initSettings);
	// console.log(`astsStatsContext`, astsStatsContext);

	return (
		<AstsStatsContext.Provider
			value={{ astsStatsContext, setAstsStatsContext }}
		>
			{props.children}
		</AstsStatsContext.Provider>
	);
};
