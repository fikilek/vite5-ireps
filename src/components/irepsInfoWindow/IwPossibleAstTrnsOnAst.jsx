import "@/components/irepsInfoWindow/IwPossibleAstTrnsOnAst.css";

import IrepsInfoWindow from "@/components/irepsInfoWindow/IrepsInfoWindow";
import PossibleAstTrnsOnAst from "@/components/irepsInfoWindow/PossibleAstTrnsOnAst";

const IwPossibleAstTrnsOnAst = props => {
	console.log(`props`, props);
	const { data } = props;
	const { astNo } = data;
	console.log(`astNo`, astNo);
	return (
		<IrepsInfoWindow
			hl1={"Possible Ast Trns"}
			hr1={
				<>
					Ast No:<span className="text-emphasis2">{astNo}</span>
				</>
			}
			windowWidth="25rem"
			windowHeight="25rem"
			headerType="headerType1"
		>
			<PossibleAstTrnsOnAst data={data} />
		</IrepsInfoWindow>
	);
};

export default IwPossibleAstTrnsOnAst;
