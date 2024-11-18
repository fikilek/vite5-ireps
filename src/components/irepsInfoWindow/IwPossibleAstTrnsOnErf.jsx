import "@/components/irepsInfoWindow/IwPossibleAstTrnsOnErf.css";

import IrepsInfoWindow from "@/components/irepsInfoWindow/IrepsInfoWindow";
import PossibleAstTrnsOnErf from "@/components/irepsInfoWindow/PossibleAstTrnsOnErf";

const IwPossibleAstTrnsOnErf = props => {
	// console.log(`props`, props);
	const { data } = props;
	return (
		<IrepsInfoWindow
			hl1={"Possible Ast Trns"}
			hr1={
				<>
					Erf No:<span className="text-emphasis2">{props.data.erfNo}</span>
				</>
			}
			windowWidth="20rem"
			windowHeight="20rem"
			headerType="headerType1"
		>
			<PossibleAstTrnsOnErf data={data} />
		</IrepsInfoWindow>
	);
};

export default IwPossibleAstTrnsOnErf;
