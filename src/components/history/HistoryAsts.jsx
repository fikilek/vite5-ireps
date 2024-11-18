// npm libraries
import { useContext } from "react";

// css
import "@/components/history/HistoryAsts.css";

// context
import { AstsContext } from "@/contexts/AstsContext.jsx";

// components
import TableHistory from '@/components/tables/TableHistory.jsx'

const HistoryAsts = (props) => {
	const { ast } = props;

  // extract history 
  const {astHistory} = ast

	const { astsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);

	const { astsTableFields } = astsContext;
	return (
		<div className="history=asts">
			<TableHistory rowData={astHistory} colDefs={astsTableFields} />
		</div>
	);
};

export default HistoryAsts;
