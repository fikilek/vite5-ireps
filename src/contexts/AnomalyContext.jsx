import { createContext, useState } from "react";
// Create context:
export const AnomalyContext = createContext();

const initSettings = {
	anomalyDetail: {
		"Meter Faulty": [
			{ key: "choose", value: "choose" },
			{ key: "Meter Display Blank", value: "Meter Display Blank" },
			{ key: "Negative Credit Units", value: "Negative Credit Units" },
			{ key: "Meter Wheel Not Moving", value: "Meter Wheel Not Moving" },
			{
				key: "Meter Wheel Running In Reverse Mode",
				value: "Meter Wheel Running In Reverse Mode",
			},
		],
		"Meter Ok": [
			{ key: "choose", value: "choose" },
			{ key: "Operationally Ok", value: "Operationally Ok" },
		],
		"Meter Damaged": [
			{ key: "choose", value: "choose" },
			{ key: "Meter Number Not Clear", value: "Meter Number Not Clear" },
			{ key: "Meter Burnt", value: "Meter Burnt" },
			{
				key: "Meter Button(s) Not Working",
				value: "Meter Button(s) Not Working",
			},
		],
		"Meter Illegally Connected": [
			{ key: "choose", value: "choose" },
			{ key: "Meter Bridged", value: "Meter Bridged" },
		],
		"Meter Missing": [
			{ key: "choose", value: "choose" },
			{
				key: "Straight Connection",
				value: "Straight Connection",
			},
			{
				key: "No Power Supply To Property",
				value: "No Power Supply To Property",
			},
		],
	},
	anomaly: "",
};

export const AnomalyContextProvider = (props) => {
	const [anomalyContext, setAnomalyContext] = useState(initSettings);
	// console.log(`anomalyContext`, anomalyContext);
	return (
		<AnomalyContext.Provider value={{ anomalyContext, setAnomalyContext }}>
			{props.children}
		</AnomalyContext.Provider>
	);
};
