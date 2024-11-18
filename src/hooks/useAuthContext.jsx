import { useContext } from "react";

import { AuthContext } from "@/contexts/AuthContextProvider";

const useAuthContext = () => {
	const context = useContext(AuthContext);
	// console.log(`context`, context);

	if (!context) {
		throw Error("AuthContext not provided");
	}
	return context;
};

export default useAuthContext;
