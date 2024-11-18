// css
import "@/components/tables/TableBtnsPossibleTrnsOnErf.css";

// hooks
import { useTrns } from "@/hooks/useTrns";

// components
import TableModalBtn from "@/components/tables/TableModalBtn";
import { memo } from "react";

const TableBtnsPossibleTrnsOnErf = (props) => {
	// console.log(`props`, props);
	const { erfNo, id: erfId, address, propertyType } = props.data;

	const { trnsNewFormData, trnsValidationSchema } = useTrns(null);
	// console.log(`trnsNewFormData`, trnsNewFormData);
	// console.log(`auditTrnValidationSchema`, trnsValidationSchema);

	return (
		// possible-trns-on-ast -ptoe
		<div className="table-btns-possible-trns-on-erf">
			{/* Meter audit */}
			<TableModalBtn
				data={{
					modalName: "meter-audit",
					data: {
						...trnsNewFormData["meter"]["audit"],
						erf: {
							erfNo,
							erfId,
							address,
							propertyType,
						},
					},
					validationSchema: trnsValidationSchema["meter"]["audit"],
					infoName: "",
					irepsKeyItem: "trns",
					width: "4rem",
					displayMode: "modal",
				}}
			>
				Audit{" "}
			</TableModalBtn>
			{/* Meter Installation */}
			<TableModalBtn
				data={{
					modalName: "meter-installation",
					data: {
						...trnsNewFormData["meter"]["installation"],
						erf: {
							erfNo,
							erfId,
							address,
							propertyType,
						},
					},
					validationSchema: trnsValidationSchema["meter"]["installation"],
					infoName: "",
					irepsKeyItem: "trns",
					// width: "4rem",
					displayMode: "modal",
				}}
			>
				Installation
			</TableModalBtn>
			{/* Meter Inspection */}
			{/* <TableModalBtn
				data={{
					modalName: "meter-inspection",
					data: {
						...trnsNewFormData["meter"]["inspection"],
						erf: {
							erfNo,
							erfId,
							address,
						},
					},
					validationSchema: trnsValidationSchema["meter"]["inspection"],
					infoName: "",
					irepsKeyItem: "trns",
					// width: "4rem",
					displayMode: "modal",
				}}
			>
				Inspection
			</TableModalBtn> */}
		</div>
	);
};

export default TableBtnsPossibleTrnsOnErf;
