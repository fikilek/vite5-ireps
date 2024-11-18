import { useContext } from "react";

// css
import "@/components/erfs/ErfsTable.css";

// contexts
import { ErfsContext } from "@/contexts/ErfsContext";

// components
import TableErfs from "@/components/tables/TableErfs";

const ErfsTable = () => {
	const { erfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext);
	return (
		<div className="erfs-table">
			<TableErfs rowData={erfsContext.erfs} colDefs={erfsContext.erfsTableFields} />
		</div>
	);
};

export default ErfsTable;
