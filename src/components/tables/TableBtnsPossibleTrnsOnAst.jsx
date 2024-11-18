
// css
import "@/components/tables/TableBtnsPossibleTrnsOnAst.css";

// hooks
import useModal from "@/hooks/useModal.jsx";
import { useTrns } from "@/hooks/useTrns.jsx";

// components
import TableModalBtn from "@/components/tables/TableModalBtn";

const TableBtnsPossibleTrnsOnAst = (props) => {
	// console.log(`props`, props);
	const { trns, erf } = props.data;

	const {columnName} = props
	// console.log(`columnName`, columnName);

	const {
		astNo,
		astId,
		astCatergory,
		astState,
		astManufacturer,
		astName,
		meter
	} = props?.data?.astData;
	const { phase, type } = meter;
	const { trnsNewFormData, trnsValidationSchema } = useTrns(null);
	// console.log(`trnsNewFormData`, trnsNewFormData);
	// console.log(`trnsValidationSchema`, trnsValidationSchema);
	// console.log(`columnName`, columnName);

	let tidDone = false
	let tid = null
	if(astState?.tid) {
		tid = astState?.tid.toLowerCase().replace(/ /g, "").toLowerCase()
		if(tid === 'krn2') {
			tidDone = true
		}
	}
	// console.log(`tidDone`, tidDone)


	const { openModal } = useModal();

	const handleTrnsOnAst = (e) => {
		openModal({
			modalName: "iwTrnsOnAst",
			payload: { data: props?.data, width: "4rem" },
		});
	};

	return (
		// possible-trns-on-ast -ptoa
		<div className="table-btns-possible-trns-on-ast">
			<div>
				<button
					title="Transaction on ast"
					className="trns-on-ast-btn table-btn"
					onClick={handleTrnsOnAst}
				>
					{trns?.length}
				</button>
			</div>

			{/* Meter tid */}
			<TableModalBtn
				data={{
					modalName: "meter-tid",
					data: {
						...trnsNewFormData["meter"]["tid"],
						astData: {
							astNo,
							astId,
							astCatergory,
							astState
						},
						erf,
					},
					validationSchema: trnsValidationSchema["meter"]["tid"],
					infoName: "",
					irepsKeyItem: "trns",
					width: "3rem",
					displayMode: "modal",
					title: "TID transaction",
					columnName
				}}
			>
				{
					tidDone ? 'KRN2' : 'Tid'
				}
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
			<TableModalBtn
				data={{
					modalName: "meter-decommission",
					data: {
						...trnsNewFormData["meter"]["decommission"],

						astData: {
							astNo,
							astId,
							astCatergory,
							astState: 'stores'
						},
					},
					validationSchema: trnsValidationSchema["meter"]["decommission"],
					infoName: "",
					irepsKeyItem: "trns",
					width: "3rem",
					displayMode: "modal",
					title: "Meter Decommissioning",
				}}
			>
				Decom
			</TableModalBtn>

			{/* Meter disconnection */}
			<TableModalBtn
				data={{
					modalName: "meter-disconnection",
					data: {
						...trnsNewFormData["meter"]["disconnection"],
						astData: {
							astNo,
							astId,
							astCatergory,
							astState: 'stores'
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
			</TableModalBtn>

			{/* Meter reconnection */}
			<TableModalBtn
				data={{
					modalName: "meter-reconnection",
					data: {
						...trnsNewFormData["meter"]["reconnection"],
						astData: {
							astNo,
							astId,
							astCatergory,
							astState: 'stores'
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
			</TableModalBtn>
		</div>
	);
};

export default TableBtnsPossibleTrnsOnAst;
