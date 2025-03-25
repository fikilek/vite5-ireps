import { NavLink, Outlet } from "react-router-dom";

import "@/components/layouts/Layout.css";

import useAuthContext from "@/hooks/useAuthContext.jsx";
import { useUser } from "@/hooks/useUser";

const SignedInLayout = () => {
	const { initials } = useUser();
	const { user } = useAuthContext();
	// console.log(`user`, user);
	const email = user?.email;

	let authorised = null;
	let isFikile = false;
	// let workbase = "";
	if (user.claims) {
		// authorised =
		// 	user?.claims["supervisor"] ||
		// 	user?.claims["manager"] ||
		// 	user?.claims["superuser"];
		// workbase = user?.claims?.workbase;
		isFikile = email === "fikilekentane@gmail.com" ? true : false;
	}

	return (
		<div className="layout signed-in-layout">
			<div className="navigation">
				<nav className="left-nav">
					<NavLink to="/">HOME</NavLink>
					<NavLink to="/erfs">ERFS</NavLink>
					<NavLink to="/trns/all">TRNS</NavLink>
					<NavLink to="/asts">ASTS</NavLink>
					<NavLink to="/map">MAP</NavLink>
				</nav>
				<nav className="right-nav">
					{/* {workbase} */}
					{user && isFikile && <NavLink to="/admin">ADMIN</NavLink>}
					{/* <NavLink to="/admin">ADMIN</NavLink> */}
					<NavLink to="/user">{initials}</NavLink>
				</nav>
			</div>
			<div className="outlet">
				<Outlet />
			</div>
		</div>
	);
};

export default SignedInLayout;
