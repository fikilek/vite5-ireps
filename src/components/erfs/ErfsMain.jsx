import { useContext } from "react";

// css
import "@/components/erfs/ErfsMain.css";

// context
import { ErfsContext } from "@/contexts/ErfsContext";

// components
import ErfsTable from "@/components/erfs/ErfsTable";
// import RgmErfsMap from "@/components/maps/rgm/RgmErfsMap";
// import ErfsMap from "./ErfsMap";

const ErfsMain = () => {
	const { erfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext);

	// const isThereErfs = erfsContext.erfs.length
	// console.log(`isThereErfs`, isThereErfs)

	return (
		<div className="erfs-main">
			{erfsContext.activeTab === "table" && <ErfsTable />}
			{/* {erfsContext.activeTab === "map" && <ErfsMap />} */}
		</div>
	);
};

export default ErfsMain;
