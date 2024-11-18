import { useEffect, useMemo, useReducer } from "react";
import { createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/firebaseConfig/fbConfig";

const authReducer = (state, action) => {
	switch (action.type) {
		case "SIGNIN":
			// console.log(`SIGNIN action.payload`, action.payload);
			return { ...state, user: action.payload };
		case "SIGNOUT":
			return {
				...state,
				user: null,
			};
		case "AUTH_IS_READY":
			// console.log(`AUTH_IS_READY action.payload`, action.payload);
			return {
				...state,
				user: action.payload,
				isAuthReady: true,
			};
		default:
			return state;
	}
};

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		isAuthReady: false,
	});
	// console.log(`state`, state);

	// const st = useMemo(()=>{
	// 	return state
	// },[])

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			// console.log(`user`, user);

			if (auth.currentUser) {
				// get user workbase

				auth.currentUser?.getIdTokenResult(true).then((userIdToken) => {
					// console.log(`userIdToken`, userIdToken);
					dispatch({
						type: "AUTH_IS_READY",
						payload: {
							...auth.currentUser,
							claims: userIdToken.claims.roles,
						},
					});
				});
			} else {
				dispatch({
					type: "AUTH_IS_READY",
					payload: null,
				});
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
