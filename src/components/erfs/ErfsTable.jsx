import { useContext } from "react";

// css
import "@/components/erfs/ErfsTable.css";

// contexts
import { ErfsContext } from "@/contexts/ErfsContext";

// components
import TableErfs from "@/components/tables/TableErfs";

const ErfsTable = (props) => {
	const { tableRef } = props;
	const { erfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext);
	return (
		<div className="erfs-table">
			<TableErfs
				rowData={erfsContext.erfs}
				colDefs={erfsContext.erfsTableFields}
				tableRef={tableRef}
			/>
		</div>
	);
};

export default ErfsTable;
