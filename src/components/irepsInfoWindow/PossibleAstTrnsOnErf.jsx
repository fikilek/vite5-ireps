import "@/components/irepsInfoWindow/PossibleAstTrnsOnErf.css";

import useModal from "@/hooks/useModal.jsx";
import { useTrns } from "@/hooks/useTrns.jsx";

const PossibleAstTrnsOnErf = props => {
	// console.log(`props`, props);
	const { erfNo, erfId, address } = props.data;

	const { openModal } = useModal();

	const { trnsNewFormData, trnsValidationSchema } = useTrns(null);
	// console.log(`trnsNewFormData`, trnsNewFormData);

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
		<div className="possible-ast-trns-on-erf">
			<div className="patoe installations">
				<div className="patoe-header">
					<p className="para-header">Installations</p>
				</div>
				<div className="patoe-body">
					<button
						id="meter-installation"
						onClick={handleClick}
						className="meter-installation-btn"
					>
						Meter Inst
					</button>
				</div>
			</div>

			<div className="patoe audits">
				<div className="patoe-header">
					<p className="para-header">Audits</p>
				</div>
				<div className="patoe-body">
					<button id="meter-audit" onClick={handleClick} className="meter-audit-btn">
						Meter Audit
					</button>
				</div>
			</div>

			<div className="patoe inspections">
				<div className="patoe-header">
					<p className="para-header">Inspections</p>
				</div>
				<div className="patoe-body">
					<button className="all-inspection-btn">Ast Inspection</button>
				</div>
			</div>
		</div>
	);
};

export default PossibleAstTrnsOnErf;
