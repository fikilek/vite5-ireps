import { useEffect, useState } from "react";

import useAuthContext from "@/hooks/useAuthContext";
import { useFirestore } from "./useFirestore";

export const useUser = (uid) => {
	// console.log(`uid`, uid);

	// get user details from firestore on snapshot
	const { getDocument, response } = useFirestore("users");
	// console.log(`response`, response);

	// const [workbase, setWorkbase] = useState(null);
	// console.log(`workbase`, workbase);

	// const userUid = useMemo(()=>uid, [uid])
	// console.log(`userUid`, userUid);

	const [initials, setInitials] = useState("");
	const [userFromUsers, setUserFromUsers] = useState({});
	// console.log(`userFromUsers`, userFromUsers);

	const { user } = useAuthContext() || {};
	const { displayName } = user;

	// useEffect(() => {
	// 	if (response.success) {
	// 		// console.log(`response`, response);
	// 		const { workbase } = response?.document;
	// 		// console.log(`workbase`, workbase)
	// 		setWorkbase(workbase);
	// 	}
	// }, [response.success]);

	useEffect(() => {
		if (uid) getDocument(uid);
	}, [uid]);

	useEffect(() => {
		if (response.success) {
			const userDoc = response.document;
			// console.log(`userDoc`, userDoc);
			setUserFromUsers(userDoc);
		}
	}, [response.success]);

	useEffect(() => {
		if (displayName) {
			const firstLetterSurname = displayName
				.split(" ")[0]
				.slice(0, 1)
				.toUpperCase();
			const firstLetterName = displayName
				.split(" ")[1]
				.slice(0, 1)
				.toUpperCase();
			setInitials(`${firstLetterSurname}${firstLetterName}`);
		}
	}, [displayName]);

	return { initials, userFromUsers, workbase: userFromUsers.workbase };
};
