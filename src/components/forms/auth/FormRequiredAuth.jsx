import { useLocation, Navigate } from "react-router-dom";

// other components
import useAuthContext from "@/hooks/useAuthContext.jsx";

export const RequireAuth = ({ children }) => {
	let { user } = useAuthContext();
	let location = useLocation();

	if (!user) {
		return <Navigate to="/" state={{ from: location }} replace />;
	} else {
		return children;
	}
};
