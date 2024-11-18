import { useReducer } from "react";
import {
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, functions } from "@/firebaseConfig/fbConfig";
import useAuthContext from "@/hooks/useAuthContext";
import { httpsCallable } from "firebase/functions";

const initSignin = {
	error: null,
	isPending: null,
	success: null,
};

const signinReducer = (state, action) => {
	switch (action.type) {
		case "IS_PENDING":
			// console.log(`IS_PENDING action: `, action);
			return {
				error: "",
				isPending: true,
				success: false,
			};
		case "SUCCESS":
			// console.log(`SUCCESS: `, action);
			return {
				error: "",
				isPending: false,
				success: true,
			};
		case "ERROR":
			// console.log(`ERROR: `, action);
			return {
				error: action.payload,
				isPending: false,
				success: false,
			};
		default:
			return state;
	}
};

export const useSignin = () => {
	const { dispatch } = useAuthContext();
	const [signinState, signinDispatch] = useReducer(signinReducer, initSignin);
	// console.log(`signinState`, signinState)

	const signin = async userCredentials => {
		const { email, password } = userCredentials;
		try {
			signinDispatch({ type: "IS_PENDING" });
			const result = await signInWithEmailAndPassword(auth, email, password);

			if (!result) {
				console.log("User signin failed");
				throw new Error("User signin failed");
			}

			const { user } = result;

			const idToken = await auth.currentUser.getIdTokenResult(true);

			dispatch({
				type: "SIGNIN",
				payload: {
					...user,
					claims: idToken.claims.roles,
				},
			});
			signinDispatch({ type: "SUCCESS" });
		} catch (err) {
			console.log(`Signin Error`, err.message);
			signinDispatch({ type: "ERROR", payload: err.message });
		}
	};

	const passwordReset = async userCredentials => {
		console.log(`userCredentials`, userCredentials)
		
		const { email } = userCredentials;

		try {
			signinDispatch({ type: "IS_PENDING" });
			await sendPasswordResetEmail(auth, email);
			signinDispatch({ type: "SUCCESS" });
		} catch (err) {
			console.log(`Password Reset  Error: `, err.message);
			signinDispatch({ type: "ERROR", payload: err.message });
		}
	};

	return { signin, passwordReset, signinState };
};
