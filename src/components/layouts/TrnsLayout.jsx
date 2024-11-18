import { NavLink, Outlet } from "react-router-dom";

import "@/components/layouts/Layout.css";

const TrnsLayout = () => {
	// const { user } = useAuthContext();
	// console.log(`user`, user)

	// let authorisedSystemTables = null;
	// if (user.claims) {
	// 	authorisedSystemTables = user?.claims["superuser"];
	// }

	// let authorisedServiceProviders = null;
	// if (user.claims) {
	// 	authorisedServiceProviders =
	// 		user?.claims["supervisor"] ||
	// 		user?.claims["manager"] ||
	// 		user?.claims["superuser"];
	// }

	return (
		<div className="sidebar-main-layout">
			{/* <nav className="sidebar-main-nav">
				<NavLink to="audits">Audits </NavLink>
				<NavLink to="tid">Tid </NavLink>
				<NavLink to="installations">Installations</NavLink>
				<NavLink to="inspections">Inspections</NavLink>
				<NavLink to="decomissionings">Decomissionings</NavLink>
				<NavLink to="disconnections">Disconnections</NavLink>
				<NavLink to="reconnections">Reconnections</NavLink>
			</nav> */}
			<Outlet />
		</div>
	);
};

export default TrnsLayout;
