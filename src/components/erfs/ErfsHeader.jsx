import { useCallback, useContext } from "react";

// css
import "@/components/erfs/ErfsHeader.css";

// hooks
import { useUser } from "@/hooks/useUser";
import useAuthContext from "@/hooks/useAuthContext";

// components
import { ErfsContext } from "@/contexts/ErfsContext";
import PageTitle from "@/pages/PageTitle";
// import FilterBtn from "@/components/filters/FilterBtn";
import BtnPageHeaderBtn from "@/components/buttons/BtnPageHeaderBtn";

const ErfsHeader = (props) => {
	// props
	const { phLl } = props;

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { userFromUsers } = useUser(user?.uid);
	// console.log(`userFromUsers`, userFromUsers);

	// context
	const { setErfsContext } = useContext(ErfsContext);

	// handle event - active tab
	const handleActiveTab = useCallback(
		(e) => {
			// console.log(`e.target.id`, e.target.id);
			setErfsContext((prev) => {
				return {
					...prev,
					activeTab: e.target.id,
				};
			});
		},
		[setErfsContext]
	);

	return (
		<div className="erfs-header">
			<div className="ph ph-left">
				<div className="phLl">
					{/* <FilterBtn /> */}
					<PageTitle title={phLl} />
					<PageTitle title={userFromUsers.workbase} />
				</div>
			</div>

			<div className="ph ph-right">
				<div className="phRl"></div>
				<div className="phRr">
					{/* <BtnPageHeaderBtn
						handleClick={handleActiveTab}
						tabName="table"
					/> */}
					{/* <BtnPageHeaderBtn
						handleClick={handleActiveTab}
						tabName="split"
					/> */}
					{/* <BtnPageHeaderBtn
						handleClick={handleActiveTab}
						tabName="map"
					/> */}
				</div>
			</div>
		</div>
	);
};

export default ErfsHeader;
