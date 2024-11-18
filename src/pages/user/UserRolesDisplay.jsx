// css
import "@/pages/user/UserRolesDisplay.css";

// components
import UserRoleDisplay from "@/pages/user/UserRoleDisplay";

const UserRolesDispaly = props => {
	// console.log(`props`, props);
	const { roles } = props;

	return (
		<div className="user-roles-display">
			{roles &&
				Object.entries(roles).map(role => {
					if (role[1] === true || role[1] === false ) { 
						return <UserRoleDisplay key={role} role={role} /> 
					} else {
						return null
					}
				})}
		</div>
	);
};

export default UserRolesDispaly;
