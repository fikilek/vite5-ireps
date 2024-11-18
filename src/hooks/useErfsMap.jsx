import { limit,  where } from "firebase/firestore";
// import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";

// hooks
import useAuthContext from "@/hooks/useAuthContext";
import { useFirestore } from "@/hooks/useFirestore";
import useGetCollection from "@/hooks/useGetCollection";

//contexts
import { ErfsMapContext } from "../contexts/ErfsMapContext";

// components

export const useErfsMap = () => {
	const { user } = useAuthContext();
	// console.log(`user`, user)

	// const { workbase } = useUser(uid);
	const [workbase, setWorkbase] = useState(null);
	// console.log(`workbase`, workbase);
	
	const { erfsMapContext, setErfsMapContext } = useContext(ErfsMapContext);
	// console.log(`erfsMapContext`, erfsMapContext);

	const [constraints, setConstraints] = useState([]);
	// console.log(`constraints`, constraints);

	const { state, getCollection } = useGetCollection("erfs");
	// console.log(`state`, state);

	getCollection(constraints);

	// get user details from firestore on snapshot
	const { getDocument, response } = useFirestore("users");
	// console.log(`response`, response);

	useEffect(() => {
		setErfsMapContext({
			...erfsMapContext,
			erfs: state.data,
		});
	}, [state]);

	useEffect(() => {
		// console.log(`workbase changed:`, workbase)
		if (workbase) {
			setConstraints((prev) => {
				return [...prev, where("address.lmMetro", "==", workbase?.trim()), limit(10000)];
			});
		}

		return () => setConstraints([]);
	}, [workbase]);

	useEffect(() => {
		if (user?.uid) {
			getDocument(user?.uid);
		}
	}, [user?.uid]);

	useEffect(() => {
		if (response.success) {
			// console.log(`response`, response);
			const { workbase } = response?.document;
			// console.log(`workbase`, workbase)
			setWorkbase(workbase);
		}
	}, [response.success]);

	return {};
};
