// npm libraries
import { useContext, lazy } from "react";

// css
import "@/pages/asts/Asts.css";

// hooks
import { useAsts } from "@/hooks/useAsts.jsx";
import { useErfs } from "@/hooks/useErfs.jsx";

// contexts
import { AstsContext } from "@/contexts/AstsContext";

// components
const AstsHeader = lazy(() => import("@/components/asts/AstsHeader"));
const AstsMain = lazy(() => import("@/components/asts/AstsMain"));
const Filters = lazy(() => import("@/components/filters/Filters"));

const Asts = () => {
	useErfs();

	const { astsTableFields, error } = useAsts();

	const { astsContext, setAstsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);

	const { asts, filterBtn } = astsContext;
	// console.log(`asts`, asts);

	return (
		<div className="asts">
			<AstsHeader
				phLl="Asts"
				context={astsContext}
				setContext={setAstsContext}
			/>
			<div className="asts-body">
				{filterBtn ? (
					<>
						<Filters />
						<AstsMain asts={asts} astsTableFields={astsTableFields} />
					</>
				) : (
					<AstsMain asts={asts} astsTableFields={astsTableFields} />
				)}
			</div>
		</div>
	);
};

export default Asts;
