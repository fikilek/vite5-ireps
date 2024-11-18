import { format } from "date-fns";
import { CiFaceSmile } from "react-icons/ci";

// css
import "@/pages/user/UserDetail.css";

// components
import UserDataEditBtn from "@/pages/user/UserDataEditBtn";
import UserDataField from "@/pages/user/UserDataField";
import UserPhoto from "@/pages/user/UserPhoto";
import UserAuthField from "@/pages/user/UserAuthField";
import UserRoles from "@/pages/user/UserRoles";
import { constants } from "@/utils/utils";

const UserDetail = props => {
	// console.log(`props`, props);
	return (
		<div className="user-detail">
			<div className="editable">
				<div className="editable-fields">
					<UserDataField
						fieldKey={"Surname"}
						fieldValue={props?.userDetailData?.surname}
					/>
					<UserDataField
						fieldKey={"Name"}
						fieldValue={props?.userDetailData?.name}
					/>
					<UserDataField
						fieldKey={"NickName"}
						fieldValue={props?.userDetailData?.nickName}
					/>
					<UserDataField
						fieldKey={"Company"}
						fieldValue={props?.userDetailData?.companyName}
					/>
				</div>
				<div className="edit-btn">
					<UserDataEditBtn
						formData={{
							surname: props?.userDetailData?.surname,
							name: props?.userDetailData?.name,
							nickName: props?.userDetailData?.nickName,
							companyName: props?.userDetailData?.companyName,
							workbase: props?.userDetailData?.workbase,
						}}
					/>
				</div>
			</div>
			<div className="auth-fields">
				<UserAuthField
					fieldKey={"Workbase"}
					fieldValue={props?.userDetailData?.workbase}
					// verified={props?.userDetailData?.emailVerified}
				/>
				<UserAuthField
					fieldKey={"Email"}
					fieldValue={props?.userDetailData?.email}
					verified={props?.userDetailData?.emailVerified}
				/>
				<UserAuthField
					fieldKey={"Phone No"}
					fieldValue={props?.userDetailData?.phoneNumber}
					verified={CiFaceSmile}
				/>
			</div>

			<div className="non-editable">
				<div className="ne">
					<UserDataField
						fieldKey={"Created At"}
						fieldValue={
							props.userDetailData.creationTime &&
							format(
								new Date(props?.userDetailData?.creationTime),
								constants.dateFormat1
							)
						}
					/>
					<UserDataField
						fieldKey={"Last signon"}
						fieldValue={
							props?.userDetailData?.lastSignInTime &&
							format(
								new Date(props?.userDetailData?.lastSignInTime),
								constants.dateFormat1
							)
						}
					/>
					<UserRoles roles={props?.userDetailData?.roles} />
				</div>

				<UserPhoto />
			</div>
		</div>
	);
};

export default UserDetail;
