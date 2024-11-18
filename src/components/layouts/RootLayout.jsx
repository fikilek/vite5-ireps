import "@/components/layouts/Layout.css";

import SignedInLayout from "@/components/layouts/SignedInLayout";
import SignedOutLayout from "@/components/layouts/SignedOutLayout";
import useAuthContext from "@/hooks/useAuthContext.jsx";

const RootLayout = () => {
	const { user, isAuthReady } = useAuthContext() || {};
	// console.log("user", user);
	// console.log("isAuthReady", isAuthReady);
	return (
		<div className="root-layout">
			{isAuthReady && (user ? <SignedInLayout /> : <SignedOutLayout />)}
		</div>
	);
};

export default RootLayout;
