// css
import "@/components/trns/TrnsHeader.css";

// hooks
import useAuthContext from "@/hooks/useAuthContext";
import { useUser } from "@/hooks/useUser";

// components
import PageTitle from "@/pages/PageTitle";
import FilterBtn from "@/components/filters/FilterBtn";

const TrnsHeader = (props) => {
	// console.log(`props`, props);
	const { phLl, phL2, phl3, trnsContext, setTrnsContext } = props;
	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { userFromUsers } = useUser(user.uid);
	// console.log(`userFromUsers`, userFromUsers);
	return (
		<div className="trns-header">
			<div className="ph ph-left">
				<div className="phLl">
					<FilterBtn context={trnsContext} setContext={setTrnsContext} />
					<PageTitle title={phLl} />
					{/* <PageTitle title={phL2} /> */}
					<PageTitle title={userFromUsers.workbase} />
				</div>
				<div className="phLr"></div>
			</div>

			<div className="ph ph-right">
				<div className="phRl"></div>
				<div className="phRr">
					{/* <button className="trnsTable" id="table">
						Table
					</button> */}
				</div>
			</div>
		</div>
	);
};

export default TrnsHeader;
