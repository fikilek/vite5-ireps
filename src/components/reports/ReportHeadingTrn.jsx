// npm
// import { useContext } from "react";
// import { format } from "date-fns";
// import { cloneDeep } from "lodash";

// css
import "@/components/reports/ReportHeadingTrn.css";

// contexts
// import { FiltersContext } from "@/contexts/FiltersContext";
// import { AstsContext } from "@/contexts/AstsContext";

// import { constants } from "@/utils/utils";

const ReportHeadingTrn = (props) => {
	// console.log(`props`, props);

	const total = props?.stats?.total;

	const { title } = props;

	const rhll = title;
	const rhlr = " ";
	const rhrl = " ";
	const rhrr = `Total: ${total}`;
	return (
		<div className="report-heading">
			<div className="rh rh-left">
				<p className="rhl rh-element rhll">{rhll}</p>
				<p className="rhl rh-element rhlr">{rhlr}</p>
			</div>
			<div className="rh rh-right">
				<p className="rhr rh-element rhrl">{rhrl} </p>
				<p className="rhr rh-element rhrr">{rhrr}</p>
			</div>
		</div>
	);
};

export default ReportHeadingTrn;
