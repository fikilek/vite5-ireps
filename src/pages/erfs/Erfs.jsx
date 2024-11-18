
// css
import "@/pages/erfs/Erfs.css";

// hooks
import { useErfs } from "@/hooks/useErfs.jsx";
import { useAsts } from "@/hooks/useAsts.jsx";

// components
import ErfsMain from "@/components/erfs/ErfsMain";
import ErfsHeader from "@/components/erfs/ErfsHeader";

const Erfs = () => {
	useErfs()
	useAsts()
	return (
		<div className="erfs">
			<ErfsHeader phLl="Erfs" />
			<div className="erfs-body">
				<ErfsMain />
			</div>
		</div>
	);
};

export default Erfs;
