import { useContext, useRef } from "react";

// css
import "@/pages/trns/Trns.css";

// contexts
import { TrnsContext } from "@/contexts/TrnsContext";

// hooks
import { useTrns } from "@/hooks/useTrns";

import FiltersTrns from "@/components/filters/FiltersTrns";
import TrnsHeader from "@/components/trns/TrnsHeader";
import TrnsMain from "@/components/trns/TrnsMain";

const Trns = (props) => {
	const { trnType, astCat } = props;
	// console.log(`props`, props)

	const tableRef = useRef();

	const { trnsTableFields } = useTrns();
	// console.log(`trnsTableFields`, trnsTableFields);

	const { trnsContext, setTrnsContext } = useContext(TrnsContext);
	// console.log(`trnsContext`, trnsContext);

	const { trns, filterBtn } = trnsContext;
	// console.log(`trns`, trns);

	return (
		<div className="trns">
			<TrnsHeader
				phLl="Trns"
				phL2={astCat}
				phL3={trnType}
				trnsContext={trnsContext}
				setTrnsContext={setTrnsContext}
				tableRef={tableRef}
			/>
			<div className="trns-body">
				{filterBtn ? (
					<>
						<FiltersTrns />
						<TrnsMain
							trns={trns}
							trnsTableFields={trnsTableFields}
							tableRef={tableRef}
						/>
					</>
				) : (
					<TrnsMain
						trns={trns}
						trnsTableFields={trnsTableFields}
						tableRef={tableRef}
					/>
				)}
			</div>
		</div>
	);
};

export default Trns;
