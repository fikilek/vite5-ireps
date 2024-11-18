import "@/pages/user/UserAuthField.css";

import useModal from "@/hooks/useModal.jsx";

import useAuthContext from "@/hooks/useAuthContext.jsx";

import UserDataField from "@/pages/user/UserDataField";
import UserEmailVerified from "@/pages/user/UserEmailVerified";

const UserAuthField = props => {
	// console.log(`props`, props);
	const { fieldKey, fieldValue, verified } = props;
	const { user } = useAuthContext();

	const { openModal } = useModal();

	let btnToShow = null;
	let modalToOpen = null;

	if (fieldKey === "Email") {
		btnToShow = <UserEmailVerified verified={user?.emailVerified} />;
		modalToOpen = "editUserEmail";
	}
	if (fieldKey === "Phone No") {
		btnToShow = "Verify";
		modalToOpen = "editUserPhoneNumber";
	}
	if (fieldKey === "Workbase") {
		btnToShow = "Verify";
		modalToOpen = "editUserWorkbase";
	}

	const handleClick = e => {
		openModal({
			modalName: modalToOpen,
			payload: fieldValue,
		});
	};

	return (
		<div className="user-auth-field">
			<UserDataField fieldKey={fieldKey} fieldValue={fieldValue} />
			<div className="user-auth-field-btn">
				<button onClick={handleClick}>Edit/Verify</button>
			</div>
			<div className="user-auth-field-btn">
				{
					<button className={`${verified === true ? "verified" : "not-verified"}`}>
						{btnToShow}
					</button>
				}
			</div>
		</div>
	);
};

export default UserAuthField;
