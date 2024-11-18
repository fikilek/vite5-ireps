// css
import "@/components/buttons/BtnPageHeaderBtn.css";

// other
import { capitalizeFirstLetter } from "@/utils/utils";

// hooks
import { useContext } from "react";

// contexts
import { ErfsContext } from "@/contexts/ErfsContext";

const BtnPageHeaderBtn = (props) => {
	const { handleClick, tabName } = props;
	const { erfsContext } = useContext(ErfsContext);

	return (
		<div className="btn-pageheader-btn">
			<button
				className={erfsContext.activeTab === tabName ? "active" : null}
				id={tabName.trim()}
				onClick={handleClick}
			>
				{capitalizeFirstLetter(tabName)}
			</button>
		</div>
	);
};

export default BtnPageHeaderBtn;
