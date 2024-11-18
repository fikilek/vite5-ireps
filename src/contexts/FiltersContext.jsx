import { createContext, useState } from "react";

// Create context:
export const FiltersContext = createContext();

const initSettings = {
	newTrnsData: false,
	filtersActive: false,
	activeTab: "table",
	activeArea: "",
	createdAtDatetimeRange: [null, null],
	updatedAtDatetimeRange: [null, null],
	// dateRange: "",
	activeReport: "",
	filterCondition: {
		createdAtDatetime: [],
		updatedAtDatetime: [],
		astCreation: "",
		astMeterType: "",
		astState: "",
		geographicArea: "",
		trnType: "",
		trnAccess: "",
	},
};

export const FiltersContextProvider = (props) => {
	const [filtersContext, setFiltersContext] = useState(initSettings);
	// console.log(`filtersContext`, filtersContext);
	return (
		<FiltersContext.Provider value={{ filtersContext, setFiltersContext }}>
			{props.children}
		</FiltersContext.Provider>
	);
};
