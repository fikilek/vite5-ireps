// npm library

// css
import "@/components/asts/AstsHeader.css";

// hooks
import { useUser } from "@/hooks/useUser";

// contexts

// components
import PageTitle from "@/pages/PageTitle";
import FilterBtn from "@/components/filters/FilterBtn";
import useAuthContext from "@/hooks/useAuthContext";

const AstsHeader = (props) => {
	const { phLl, context, setContext } = props;

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { userFromUsers } = useUser(user.uid);
	// console.log(`userFromUsers`, userFromUsers);

	return (
		<div className="asts-header">
			<div className="ph ph-left">
				<div className="phLl">
					<FilterBtn context={context} setContext={setContext} />
					<PageTitle title={phLl} />
					<PageTitle title={userFromUsers.workbase} />
				</div>
				<div className="phLr"></div>
			</div>

			<div className="ph ph-right">
				<div className="phRl"></div>
				<div className="phRr">

				</div>
			</div>
		</div>
	);
};

export default AstsHeader;
