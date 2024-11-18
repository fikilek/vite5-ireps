// npm libraries
import { useContext } from "react";

// css
import "@/components/history/HistoryErfs.css";

// context
import { ErfsContext } from "@/contexts/ErfsContext.jsx";

// components
import TableHistory from '@/components/tables/TableHistory.jsx'

const HistoryErfs = (props) => {
	const { erf } = props;

  // extract history 
  const {erfHistory} = erf

	const { erfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext);

	const { erfsTableFields } = erfsContext;
	return (
		<div className="history=erfs">
			<TableHistory rowData={erfHistory} colDefs={erfsTableFields} />
		</div>
	);
};

export default HistoryErfs;
