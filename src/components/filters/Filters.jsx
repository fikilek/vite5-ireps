import { useState } from "react";

// css
import "@/components/filters/Filters.css";

// context

// components
import FiltersHeader from "@/components/filters/FiltersHeader";
import FiltersBody from "@/components/filters/FiltersBody";

const Filters = (props) => {
	const { irepsKeyItem } = props;
	const [active, setActive] = useState("reportFilters");
	return (
		<div className="filters">
			<FiltersHeader
				active={active}
				setActive={setActive}
				irepsKeyItem={irepsKeyItem}
			/>
			<FiltersBody
				active={active}
				setActive={setActive}
				irepsKeyItem={irepsKeyItem}
			/>
		</div>
	);
};

export default Filters;
