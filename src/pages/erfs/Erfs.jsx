// npm libraries
import { useRef } from "react";

// css
import "@/pages/erfs/Erfs.css";

// hooks
import { useErfs } from "@/hooks/useErfs.jsx";
import { useAsts } from "@/hooks/useAsts.jsx";

// components
import ErfsMain from "@/components/erfs/ErfsMain";
import ErfsHeader from "@/components/erfs/ErfsHeader";

const Erfs = () => {
	const tableRef = useRef();
	useErfs();
	useAsts();

	return (
		<div className="erfs">
			<ErfsHeader phLl="Erfs" tableRef={tableRef} />
			<div className="erfs-body">
				<ErfsMain tableRef={tableRef} />
			</div>
		</div>
	);
};

export default Erfs;
