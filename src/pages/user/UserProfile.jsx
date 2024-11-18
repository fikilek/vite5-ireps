import UserData from "@/pages/user/UserData";
import UserProfileHeader from "@/pages/user/UserProfileHeader";
import UserStats from "@/pages/user/UserStats";

const UserProfile = () => {
	return (
		<div className="user-profile">
			<UserProfileHeader />
			<div className="user-section">
				<UserData />
				<UserStats />
			</div>
		</div>
	);
};

export default UserProfile;
