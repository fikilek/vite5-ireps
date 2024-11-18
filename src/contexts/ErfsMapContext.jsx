import { createContext, useState } from "react";

// contexts
export const ErfsMapContext = createContext();

const initSettings = {
	erfs: [],
};

export const ErfsMapContextProvider = props => {
	const [erfsMapContext, setErfsMapContext] = useState(initSettings);
	// console.log(`erfsMapContext`, erfsMapContext);

	return (
		<ErfsMapContext.Provider value={{ erfsMapContext, setErfsMapContext }}>
			{props.children}
		</ErfsMapContext.Provider>
	);
};
