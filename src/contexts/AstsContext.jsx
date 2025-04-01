import { useEffect } from "react";

import { createContext, useState } from "react";

// Create context:
export const AstsContext = createContext();

//hooks
import { useAsts } from "@/hooks/useAsts.jsx";

const initSettings = {
	filterBtn: false,
	activeTab: "table",
	activeArea: "",
	asts: null,
	astsColumns: [],
};

export const AstsContextProvider = (props) => {
	const [astsContext, setAstsContext] = useState(initSettings);
	// console.log(`astsContext`, astsContext);

	return (
		<AstsContext.Provider value={{ astsContext, setAstsContext }}>
			{props.children}
		</AstsContext.Provider>
	);
};
