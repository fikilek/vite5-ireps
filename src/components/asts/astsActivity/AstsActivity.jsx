// npm libraries
import { useState } from "react";

// css
import "@/components/asts/astsActivity/AstsActivity.css";

// components
import AstsActivityHeader from "@/components/asts/astsActivity/AstsActivityHeader";
import AstsActivityBody from "@/components/asts/astsActivity/AstsActivityBody";

const AstsActivity = (props) => {
	// console.log(`props`, props);

	const { data: ast } = props?.data;
	// console.log(`ast`, ast);

	const [activeTab, setActiveTab] = useState("possibleTrns");
	// console.log(`activeTab`, activeTab);

	return (
		<div className="asts-activity">
			<AstsActivityBody activeTab={activeTab} ast={ast} />
			<AstsActivityHeader
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				ast={ast}
			/>
		</div>
	);
};

export default AstsActivity;
