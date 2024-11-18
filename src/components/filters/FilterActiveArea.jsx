// css
import "@/components/filters/FilterActiveArea.css";
import useAuthContext from "@/hooks/useAuthContext";
import { useUser } from "@/hooks/useUser";

const FilterActiveArea = () => {

	const { user } = useAuthContext();
	// console.log(`user`, user);
	
	const { userFromUsers } = useUser(user.uid);
	// console.log(`userFromUsers`, userFromUsers);

	return (
		<div className="filter-workbase">
			<p className="workbase">
				User Workbase:{" "}
				<span className="text-emphasis2">{userFromUsers.workbase}</span>{" "}
			</p>
		</div>
	);
};

export default FilterActiveArea;
