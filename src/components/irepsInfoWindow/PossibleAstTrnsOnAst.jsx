import "@/components/irepsInfoWindow/PossibleAstTrnsOnAst.css";

import useModal from "@/hooks/useModal.jsx";
import { useTrns } from "@/hooks/useTrns.jsx";

const PossibleAstTrnsOnAst = props => {
	// console.log(`props`, props);
	const { erfNo, erfId, address } = props.data;

	const { openModal } = useModal();

	const { trnsNewFormData, trnsValidationSchema } = useTrns(null);

	const handleClick = e => {
		// console.log(`open form `, e.target.id);
		const astCat = e.target.id.split("-")[0];
		const trnType = e.target.id.split("-")[1];
		openModal({
			modalName: e.target.id,
			payload: {
				data: {
					...trnsNewFormData[astCat][trnType],
					erf: {
						erfNo,
						erfId,
						address,
					},
				},
				validationSchema: trnsValidationSchema[astCat][trnType],
			},
		});
	};

	return (
		<div className="possible-ast-trns-on-ast">
			{/* tid */}
			<div className="patoa tid">
				<div className="patoa-header">
					<p className="para-header">TID Rollover</p>
				</div>
				<div className="patoa-body">
					<button
						id="meter-tid"
						// onClick={handleClick}
						className="meter-tid-btn"
					>
						TID Rollover
					</button>
				</div>
			</div>

			{/* removal / decommissioning */}
			<div className="patoa removal">
				<div className="patoa-header">
					<p className="para-header">Decommissioning</p>
				</div>
				<div className="patoa-body">
					<button
						id="meter-removal"
						// onClick={handleClick}
						className="meter-removal-btn"
					>
						Removal
					</button>
				</div>
			</div>

			{/* credit control - meter disconnection */}
			<div className="patoa disconnection">
				<div className="patoa-header">
					<p className="para-header">Disconnection</p>
				</div>
				<div className="patoa-body">
					<button
						id="meter-disconnection"
						// onClick={handleClick}
						className="meter-disconnection-btn"
					>
						Disconnection
					</button>
				</div>
			</div>

			{/* credit control - meter reconnection */}
			<div className="patoa reconnection">
				<div className="patoa-header">
					<p className="para-header">Reconnection</p>
				</div>
				<div className="patoa-body">
					<button
						id="meter-reconnection"
						// onClick={handleClick}
						className="meter-reconnection-btn"
					>
						Reconnection
					</button>
				</div>
			</div>
		</div>
	);
};

export default PossibleAstTrnsOnAst;
