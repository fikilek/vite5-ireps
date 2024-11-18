import {
	EmailAuthProvider,
	createUserWithEmailAndPassword,
	reauthenticateWithCredential,
	sendEmailVerification,
	updateEmail,
	updateProfile,
} from "firebase/auth";
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useReducer } from "react";

import { auth, db, functions } from "@/firebaseConfig/fbConfig";
import useAuthContext from "@/hooks/useAuthContext";
import { httpsCallable } from "firebase/functions";

const initSignup = {
	error: null,
	isPending: null,
	success: null,
	otpSent: false,
	otpSentConformation: null,
	user: null,
};

const signupReducer = (state, action) => {
	switch (action.type) {
		case "IS_PENDING":
			// console.log(`IS_PENDING action: `, action);
			return {
				...state,
				error: "",
				isPending: true,
				success: false,
			};
		case "OTP_SENT":
			// console.log(`OTP_SENT: `, action);
			return {
				...state,
				otpSent: true,
				otpSentConformation: action.payload,
			};
		case "SUCCESS":
			// console.log(`SUCCESS: `, action);
			return {
				...state,
				error: "",
				isPending: false,
				success: true,
			};
		case "ERROR":
			// console.log(`ERROR: `, action);
			return {
				...state,
				error: action.payload,
				isPending: false,
				success: false,
			};
		case "SAVE_USER":
			// console.log(`ERROR: `, action);
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};

export const useSignup = () => {
	const [signupState, signupDispatch] = useReducer(signupReducer, initSignup);
	// console.log(`signupState`, signupState);
	const { user, dispatch } = useAuthContext();
	// console.log(`user`, user);

	const signup = async (userCredentials) => {
		// console.log(`userCredentials`, userCredentials);
		const {
			surname,
			name,
			password,
			email,
			phoneNumber,
			// nickName,
			// companyName,
			// spId,
			workbase,
		} = userCredentials;
		try {
			signupDispatch({ type: "IS_PENDING" });
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (!result) {
				throw new Error("User signup failed");
			}
			// console.log(`result`, result);

			const { user } = result;
			// console.log(`user`, user);

			const idToken = await auth.currentUser.getIdTokenResult(true);
			// console.log(`idToken`, idToken);

			// send emil verification
			await sendEmailVerification(user);

			// update displayName details at firebase auth user. Use first letter of surname and name as dispalyName
			await updateProfile(auth.currentUser, {
				displayName: `${name} ${surname}`,
			});

			// update claims with workbase using onCall cloud function
			const updateUserWorkbase = await httpsCallable(
				functions,
				"updateUserWorkbase"
			);
			// console.log(`updateUserWorkbase`, updateUserWorkbase);

			// console.log(`workbase`, workbase);
			const wbResult = await updateUserWorkbase({
				roles: {
					workbase,
				},
			});
			// console.log(`wbResult`, wbResult);

			dispatch({
				type: "SIGNIN",
				payload: {
					...user,
					claims: idToken.claims.roles,
				},
			});

			// TODO:create user profile in firestore using UID as the unique identifier
			const docRef = doc(db, "users", user.uid);
			const datetime = Timestamp.now();
			await setDoc(docRef, {
				surname,
				name,
				email,
				phoneNumber,
				workbase,
				// nickName,
				// companyName,
				// spId,
				metadata: {
					createdByName: `${surname} ${name}`,
					createdByUid: user.uid,
					createdAtDatetime: datetime,
					updatedByName: `${surname} ${name}`,
					updatedByUid: user.uid,
					updatedAtDatetime: datetime,
				},
			});

			signupDispatch({ type: "SUCCESS" });
		} catch (error) {
			signupDispatch({ type: "ERROR", payload: error.message });
			console.log(`signup err`, error.message);
		}
	};

	const updateUser = async (userCredentials) => {
		// console.log(`userCredentials`, userCredentials);
		const { surname, name, nickName, companyName, workbase } = userCredentials;
		try {
			signupDispatch({ type: "IS_PENDING" });
			// update dispalyName details at firebase auth user. Use first letter of surname and name as dispalyName
			await updateProfile(auth.currentUser, {
				displayName: `${name} ${surname}`,
			});

			// TODO:create user profile in firestore using UID as the unique identifier
			const docRef = doc(db, "users", user.uid);
			const datetime = Timestamp.now();
			await updateDoc(docRef, {
				"metadata.updatedByName": `${surname} ${name}`,
				"metadata.updatedByUid": user.uid,
				"metadata.updatedAtDatetime": datetime,
				nickName,
				name,
				surname,
				companyName,
				workbase,
			});

			dispatch({
				type: "SIGNIN",
				payload: user,
			});
			signupDispatch({ type: "SUCCESS" });
		} catch (error) {
			signupDispatch({ type: "ERROR", payload: error.message });
			console.log(`updateUser err`, error.message);
		}
	};

	const updateUserEmail = async (userCredentials) => {
		// console.log(`userCredentials`, userCredentials);
		const { newEmail, password } = userCredentials;
		try {
			signupDispatch({ type: "IS_PENDING" });
			const credential = EmailAuthProvider.credential(
				auth.currentUser.email,
				password
			);
			// console.log(`credential`, credential);

			const userCredential = await reauthenticateWithCredential(
				auth.currentUser,
				credential
			);
			// console.log(`userCredential`, userCredential);

			const idToken = await auth.currentUser.getIdTokenResult(true);
			// console.log(`idToken`, idToken);

			const emailUpdateResult = await updateEmail(auth.currentUser, newEmail);
			// console.log(`emailUpdateResult`, emailUpdateResult);

			// // send emil verification
			const sendEmailResult = await sendEmailVerification(auth.currentUser);
			// console.log(`sendEmailResult`, sendEmailResult);

			const docRef = doc(db, "users", user.uid);
			const datetime = Timestamp.now();
			await updateDoc(docRef, {
				"metadata.updatedByName": user.displayName,
				"metadata.updatedByUid": user.uid,
				"metadata.updatedAtDatetime": datetime,
				email: newEmail,
			});

			dispatch({
				type: "SIGNIN",
				payload: {
					...user,
					claims: idToken.claims.roles,
				},
			});
			signupDispatch({ type: "SUCCESS" });
		} catch (error) {
			signupDispatch({ type: "ERROR", payload: error.message });
			console.log(`signup err`, error.message);
		}
	};

	const updateUserWorkbase = async (userCredentials) => {
		// console.log(`userCredentials`, userCredentials);
		const { newWorkbase: workbase, password } = userCredentials;
		try {
			signupDispatch({ type: "IS_PENDING" });
			const credential = EmailAuthProvider.credential(
				auth.currentUser.email,
				password
			);
			// console.log(`credential`, credential);

			const userCredential = await reauthenticateWithCredential(
				auth.currentUser,
				credential
			);
			// console.log(`userCredential`, userCredential);

			const idToken = await auth.currentUser.getIdTokenResult(true);
			// console.log(`idToken`, idToken);

			// update claims with workbase using onCall cloud function
			// console.log(`workbase`, workbase)
			const updateUserWorkbase = httpsCallable(functions, "updateUserWorkbase");
			const wbResult = await updateUserWorkbase({
				roles: {
					workbase,
				},
			});
			// console.log(`wbResult`, wbResult);

			const docRef = doc(db, "users", user.uid);
			const datetime = Timestamp.now();
			await updateDoc(docRef, {
				"metadata.updatedByName": user.displayName,
				"metadata.updatedByUid": user.uid,
				"metadata.updatedAtDatetime": datetime,
				workbase: workbase,
			});

			dispatch({
				type: "SIGNIN",
				payload: {
					...user,
					claims: idToken.claims.roles,
				},
			});
			signupDispatch({ type: "SUCCESS" });
		} catch (error) {
			signupDispatch({ type: "ERROR", payload: error.message });
			console.log(`signup err`, error.message);
		}
	};

	const updateUserObject = async (userData, uid) => {
		// console.log(`userData`, userData);
		// console.log(`uid`, uid);

		// const { workbases } = userCredentials;

		try {
			signupDispatch({ type: "IS_PENDING" });
			// update dispalyName details at firebase auth user. Use first letter of surname and name as dispalyName
			// await updateProfile(auth.currentUser, {
			// 	displayName: `${name} ${surname}`,
			// });

			// TODO:create user profile in firestore using UID as the unique identifier
			const docRef = doc(db, "users", uid);
			const datetime = Timestamp.now();
			await updateDoc(docRef, {
				"metadata.updatedByName": `${user.displayName}`,
				"metadata.updatedByUid": user.uid,
				"metadata.updatedAtDatetime": datetime,
				workbases: userData.workbases,
			});

			signupDispatch({ type: "SUCCESS" });
		} catch (error) {
			signupDispatch({ type: "ERROR", payload: error.message });
			console.log(`updateUser err`, error.message);
		}
	};

	return {
		signup,
		updateUser,
		updateUserEmail,
		updateUserWorkbase,
		signupState,
		updateUserObject,
	};
};

// const signupWithPhoneNumber = async userCredentials => {
// 	console.log(`userCredentials`, userCredentials);
// 	const { phoneNumber } = userCredentials;

// 	try {
// 		let recaptcha = null;

// 		recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
// 			size: "invisible",
// 			callback: response => {
// 				console.log(`reCAPTCHA solved - response`, response);
// 			},
// 		});
// 		console.log(`recaptcha`, recaptcha);
// 		signupDispatch({ type: "SAVE_USER", payload: auth.currentUser });
// 		const confirmationResult = await signInWithPhoneNumber(
// 			auth,
// 			phoneNumber,
// 			recaptcha
// 		);
// 		console.log(`confirmationResult`, confirmationResult);
// 		signupDispatch({ type: "OTP_SENT", payload: confirmationResult });
// 	} catch (error) {
// 		signupDispatch({ type: "ERROR", payload: error.message });
// 		console.log(`Error in signupWithPhoneNumber :`, error.message);
// 	}
// };

// const signupWithPhoneOtp = async otp => {
// 	console.log(`otp`, otp);
// 	console.log(`signupState`, signupState);
// 	console.log(`auth`, auth);

// 	const credentialPassword = EmailAuthProvider.credential(
// 		"siya@gmail.com",
// 		"fkpass123"
// 	);
// 	console.log(`credentialPassword`, credentialPassword);

// 	const result = await signupState.otpSentConformation.confirm(otp.otp);
// 	console.log(`User signed in successfully. - result: `, result);

// 	const { verificationId } = signupState.otpSentConformation;

// 	const credentialPhone = PhoneAuthProvider.credential(verificationId, otp);
// 	console.log(`credentialPhone`, credentialPhone);
// 	console.log(`auth.currentUser`, auth.currentUser);
// 	console.log(`password.user`, signupState.user);

// 	// delete phone auth
// 	const res = await auth.currentUser.delete();
// 	console.log(`res`, res);

// 	// link the accounts
// 	console.log(`signupState`, signupState);
// 	const linkResult = await linkWithCredential(
// 		signupState.user,
// 		credentialPhone
// 	);
// 	console.log(`linkResult`, linkResult);

// signin with password credential
// const signinRes = await auth.signInWithCredential(credentialPassword);
// console.log(`signinRes`, signinRes);

// const result_ = await signInWithEmailAndPassword(
// 	auth,
// 	"zuko@gmail.com",
// 	"fkpass123"
// );
// const { user } = result_;
// console.log(`user`, user);

// const idToken = await auth.currentUser.getIdTokenResult(true);
// console.log(`idToken`, idToken);

// dispatch({
// 	type: "SIGNIN",
// 	payload: {
// 		...user,
// 		claims: idToken.claims.roles,
// 	},
// });

// linkWithCredential(auth.currentUser, credential)
// 	.then(async usercred => {
// 		const user_ = usercred.user;
// 		console.log("Account linking success", user_);
// 	})
// 	.catch(error => {
// 		console.log("Account linking error", error);
// 	});

// const idToken = await auth.currentUser.getIdTokenResult(true);
// console.log(`idToken`, idToken);
// dispatch({
// 	type: "SIGNIN",
// 	payload: {
// 		...user,
// 		claims: idToken.claims.roles,
// 	},
// });
// TODO:update user profile in firestore using UID as the unique identifier
// const docRef = doc(db, "users", user.uid);
// const datetime = Timestamp.now();
// await setDoc(docRef, {
// 	metadata: {
// 		updateByByName: `${user?.surname} ${user?.name}`,
// 		updateByByUid: user.uid,
// 		updateByAtDatetime: datetime,
// 	},
// 	phoneNumber: user.phoneNumber,
// 	// });
// 	signupDispatch({ type: "SUCCESS" });
// })
// .catch(error => {
// 	signupDispatch({ type: "ERROR", payload: error.message });
// 	console.log(
// 		`Error with OTP. User couldn't sign in (bad verification code?) : `,
// 		error.message
// 	);
// });
// };
