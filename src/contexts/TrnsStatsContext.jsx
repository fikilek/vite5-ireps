import { createContext, useState } from "react";

// Create context:
export const TrnsStatsContext = createContext();

const initSettings = {};

export const TrnsStatsContextProvider = (props) => {
	const [trnsStatsContext, setTrnsStatsContext] = useState(initSettings);
	// console.log(`trnsStatsContext`, trnsStatsContext);

	return (
		<TrnsStatsContext.Provider
			value={{ trnsStatsContext, setTrnsStatsContext }}
		>
			{props.children}
		</TrnsStatsContext.Provider>
	);
};
