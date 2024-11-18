import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "@/firebaseConfig/fbConfig";
import useAuthContext from "@/hooks/useAuthContext";

export const useSignout = () => {
	const [error, setError] = useState(null);

	const { dispatch } = useAuthContext();

	const navigate = useNavigate();

	const signout = async () => {
		try {
			await signOut(auth);

			dispatch({ type: "SIGNOUT" });

			navigate("/");
		} catch (err) {
			setError(err.message);

			console.log(`signout err`, err.message);
		}
	};

	return { signout, error };
};
