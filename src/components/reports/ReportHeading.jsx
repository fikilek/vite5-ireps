// npm
import { useContext } from "react";
import { format } from "date-fns";
import { cloneDeep } from "lodash";

// css
import "@/components/reports/ReportHeading.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";
import { AstsContext } from "@/contexts/AstsContext";

import { constants } from "@/utils/utils";

const ReportHeading = (props) => {
	// console.log(`props`, props);

	const stats = props?.stats;
	// console.log(`stats`, stats);

	const total = stats?.total;
	// console.log(`total`, total);

	const { filtersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`, filtersContext);

	const { createdAtDatetimeRange, updatedAtDatetimeRange, filterCondition } =
		filtersContext;

	const { astsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);

	const createdAt =
		createdAtDatetimeRange[0] == null ||
		createdAtDatetimeRange[0] == undefined ||
		createdAtDatetimeRange[1] == null ||
		createdAtDatetimeRange[1] == undefined
			? false
			: true;

	// console.log(`createdAt`, createdAt);

	const updatedAt =
		updatedAtDatetimeRange[0] == null ||
		updatedAtDatetimeRange[0] == undefined ||
		updatedAtDatetimeRange[1] == null ||
		updatedAtDatetimeRange[1] == undefined
			? false
			: true;
	// console.log(`updatedAt`, updatedAt);

	let range = [];
	let rangeLabel = "";
	if (createdAt || updatedAt) {
		// There is filtering. Use date range from filters
		if (createdAt) {
			range = createdAtDatetimeRange;
			rangeLabel = "Created At Datetime";
		}
		if (updatedAt) {
			range = updatedAtDatetimeRange;
			rangeLabel = "Updated At Datetime";
		}
	} else {
		// There is no filtering. Get date range from astsContext.asts

		// console.log(`range`, range);
		rangeLabel = "Entire Range (CreatedAtDatetime)";
		// Get asts array from astsContext
		const asts = astsContext?.asts;
		// console.log(`asts`, asts);

		if (!asts) return;

		// asts?.map((ast) => {
		// 	const dt = ast?.metadata?.createdAtDatetime;
		// 	console.log(`dt`, dt);
		// 	console.log(`dt`, format(dt?.toDate(), constants?.dateFormat0));
		// });

		const dA = asts?.[0]?.metadata?.createdAtDatetime;
		// console.log(`dA`, dA);
		// const testDateA = format(dA?.toDate(), constants?.dateFormat0);
		// console.log(`testDateA`, testDateA);

		// const dB = asts?.[asts.length - 1]?.metadata?.createdAtDatetime;
		// const testDateB = format(dB?.toDate(), constants?.dateFormat0);
		// console.log(`testDateA`, testDateB);

		// if (!asts) return;

		// clone asts first
		const astsClone = cloneDeep(asts);
		// console.log(`astsClone`, astsClone);

		// Sort by createdAtDatetime
		astsClone?.sort((a, b) => {
			// console.log(`a.metadata.createdAtDatetime`, a.metadata.createdAtDatetime);
			// console.log(`b.metadata.createdAtDatetime`, b.metadata.createdAtDatetime);
			// Turn your strings into dates, and then subtract them
			// to get a value that is either negative, positive, or zero.
			const dateA = a.metadata?.createdAtDatetime?.toMillis();
			const dateB = b.metadata?.createdAtDatetime?.toMillis();
			return dateA - dateB;
		});
		// console.log(`astsClone`, asts);

		// astsClone?.sort((a, b) => {
		// 	// console.log(`a.metadata.createdAtDatetime`, a.metadata.createdAtDatetime);
		// 	// console.log(`b.metadata.createdAtDatetime`, b.metadata.createdAtDatetime);
		// 	// Turn your strings into dates, and then subtract them
		// 	// to get a value that is either negative, positive, or zero.
		// 	const dateA = a.metadata?.updatedAtDatetime?.toDate();
		// 	const dateB = b.metadata?.updatedAtDatetime?.toDate();
		// 	return dateA - dateB;
		// });

		// Get first element in the asts array and extract createdAtDatetime and assign to date1
		const dateA = astsClone?.[0]?.metadata?.createdAtDatetime;
		// const testDateA = format(dateA.toDate(), constants.dateFormat0);
		// console.log(`testDateA`, testDateA);
		// console.log(`dateA`, dateA);

		// Get last element in the asts array and extract createdAtDatetime and assign to date2
		const dateB =
			astsClone?.[astsClone?.length - 1]?.metadata?.createdAtDatetime;
		// console.log(`dateB`, dateB);

		// const testDateB = format(dateB.toDate(), constants.dateFormat0);
		// console.log(`testDateB`, testDateB);

		// Assign date1 and date2 to the range
		range = [dateA?.toDate(), dateB?.toDate()];
		// console.log(`range`, range);
	}

	const date1 = range?.[0];
	// console.log(`date1`, date1);
	const date2 = range?.[1];
	// console.log(`date2`, date2);

	const d1 = format(new Date(date1 || 0), constants.dateFormat3);
	// console.log(`d1`, d1);

	const d2 = format(new Date(date2 || 0), constants.dateFormat3);
	// console.log(`d2`, d2);

	const { astCreation } = filterCondition;

	let astCreator = "Audits&Installations";
	if (astCreation === "audit") {
		astCreator = "Only Audits";
	}
	if (astCreation === "installation") {
		astCreator = "Only Installations";
	}

	const { title } = props;
	return (
		<div className="report-heading">
			<div className="rh rh-left">
				<p className="rhl rh-element rhll">{title}</p>
				<p className="rhr rh-element rhlr"></p>
			</div>
			<div className="rh rh-right">
				<p className="rhr rh-element rhrl"></p>
				<p className="rhr rh-element rhrr">Total: {total}</p>
			</div>
		</div>
	);
};

export default ReportHeading;
