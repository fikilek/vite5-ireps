import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useAuthContext from "@/hooks/useAuthContext.jsx";

const getUserClaims = rolesObj => {
	const claimsArray = [];
	for (const role in rolesObj) {
		if (rolesObj[role]) {
			claimsArray.push(role);
		}
	}
	return claimsArray;
};

const RequireAuth = ({ children, allowedRoles }) => {
	const { user, isAuthReady } = useAuthContext();

	const location = useLocation();

	const userRoles = user?.claims;

	const userClaimsArray = getUserClaims(userRoles);

	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthReady) {
			if (!user) {
				return navigate("/signin", {
					state: { from: location, msg: "Not Signedin" },
					replace: true,
				});
			}
			if (allowedRoles) {
				const allowed = userClaimsArray?.find(role => allowedRoles?.includes(role));
				if (!allowed) {
					navigate("/unauthorised", {
						state: { msg: "Not Authorised to view page" },
					});
				}
			}
		}
	}, [isAuthReady, user, location, userClaimsArray, allowedRoles, navigate]);
	return <>{children}</>;
};

// TODO: See if only one signin page can be used. At the moment, its a modal and a page. Only one should be used

export default RequireAuth;
