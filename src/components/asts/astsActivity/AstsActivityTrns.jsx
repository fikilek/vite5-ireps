// css
import "@/components/asts/astsActivity/AstsActivityTrns.css";

// hooks
import useModal from "@/hooks/useModal.jsx";
import { useTrns } from "@/hooks/useTrns.jsx";

// components
import AstsActivityNameHeader from "@/components/asts/astsActivity/AstsActivityNameHeader";
import TableModalBtn from "@/components/tables/TableModalBtn";

const AstsActivityTrns = (props) => {
	// console.log(`props`, props);

	const { trnsNewFormData, trnsValidationSchema } = useTrns(null);

	const { ast } = props;

	const { trns, erf, astData } = ast;

	const {
		astNo,
		astId,
		astCatergory,
		astState,
		astManufacturer,
		astName,
		meter,
	} = astData;

	const { phase, type } = meter;

	return (
		<div className="ast-activity-trns">
			<AstsActivityNameHeader />
			<div className="trn-btns">
				<div className='btns-'>
					{/* tid */}
					<TableModalBtn
						data={{
							modalName: "meter-tid",
							data: {
								...trnsNewFormData["meter"]["tid"],
								astData: {
									astNo,
									astId,
									astCatergory,
								},
								erf,
							},
							validationSchema: trnsValidationSchema["meter"]["tid"],
							infoName: "",
							irepsKeyItem: "trns",
							width: "3rem",
							displayMode: "modal",
							title: "TID transaction",
						}}
					>
						Tid
					</TableModalBtn>
					{/* Meter inspection */}
					<TableModalBtn
						data={{
							modalName: "meter-inspection",
							data: {
								...trnsNewFormData["meter"]["inspection"],
								astData: {
									astNo, // for meters this is a meter no
									// astCatergory: "meter", // [ 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
									astState, // ['stores', 'field', 'service', 'etc']
									astManufacturer,
									astName,
									astCatergory,
									astId,
									meter: {
										...trnsNewFormData["meter"]["inspection"].astData?.meter,
										phase: phase,
										type: type,
									},
								},
								erf,
							},
							validationSchema: trnsValidationSchema["meter"]["inspection"],
							infoName: "",
							irepsKeyItem: "trns",
							width: "3rem",
							displayMode: "modal",
							title: "Meter Inspection",
						}}
					>
						Insp
					</TableModalBtn>
					{/* Meter removal / decommission */}
					{/* <TableModalBtn
						data={{
							modalName: "meter-decommission",
							data: {
								...trnsNewFormData["meter"]["decommission"],

								astData: {
									astNo,
									astId,
									astCatergory,
								},
							},
							validationSchema: trnsValidationSchema["meter"]["decommission"],
							infoName: "",
							irepsKeyItem: "trns",
							width: "3rem",
							displayMode: "modal",
							title: "Meter decomissioning",
						}}
					>
						Decom
					</TableModalBtn> */}

					{/* Meter disconnection */}
					{/* <TableModalBtn
						data={{
							modalName: "meter-disconnection",
							data: {
								...trnsNewFormData["meter"]["disconnection"],
								astData: {
									astNo,
									astId,
									astCatergory,
								},
							},
							validationSchema: trnsValidationSchema["meter"]["disconnection"],
							infoName: "",
							irepsKeyItem: "trns",
							width: "3rem",
							displayMode: "modal",
							title: "Meter Disconnection",
						}}
					>
						Dscn
					</TableModalBtn> */}

					{/* Meter reconnection */}
					{/* <TableModalBtn
						data={{
							modalName: "meter-reconnection",
							data: {
								...trnsNewFormData["meter"]["reconnection"],
								astData: {
									astNo,
									astId,
									astCatergory,
								},
							},
							validationSchema: trnsValidationSchema["meter"]["reconnection"],
							infoName: "",
							irepsKeyItem: "trns",
							width: "3rem",
							displayMode: "modal",
							title: "Meter Reconnection",
						}}
					>
						Recn
					</TableModalBtn> */}
				</div>
				<div className='info'>
						<p>Click the desired button to launch the transaction </p>
				</div>
			</div>
		</div>
	);
};

export default AstsActivityTrns;
