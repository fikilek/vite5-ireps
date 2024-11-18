// npm libraries
import { useContext } from "react";

// css
import "@/components/history/HistoryTrns.css";

// context
import { TrnsContext } from "@/contexts/TrnsContext.jsx";

// components
import TableHistory from '@/components/tables/TableHistory.jsx'

const HistoryTrns = (props) => {
	// console.log(`props`, props)
	
	const { trn, trnType } = props;
	
  // extract history 
  const {trnHistory} = trn
	// console.log(`trnHistory`, trnHistory)

	const { trnsContext } = useContext(TrnsContext);
	// console.log(`trnsContext`, trnsContext);
	
	const { trnsTableFields } = trnsContext;
	// console.log(`trnsTableFields`, trnsTableFields);

	return (
		<div className="history=trns">
			<TableHistory rowData={trnHistory} colDefs={trnsTableFields['meter'][trnType]} />
		</div>
	);
};

export default HistoryTrns;
