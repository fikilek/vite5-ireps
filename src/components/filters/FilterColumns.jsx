import { useContext } from "react";

// css
import "@/components/filters/FilterColumns.css";

// contexts
import { AstsContext } from "@/contexts/AstsContext";

// hooks
import { useAsts } from "@/hooks/useAsts.jsx";

// components

const FilterReport = () => {
	// const { astsContext, setAstsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);

	// const astsTableFields = astsContext?.astsTableFields;

	const handleChange = (value) => {
		console.log(`value`, value);
	};

	return (
		<div className="filter-columns">
			<label className="fc-select-all">
				<span>Select all</span>
				<input name="All" type="radio" />
			</label>

			{/* <div className="fc-field-names">
				{astsTableFields &&
					astsTableFields?.map((field) => {
						return (
							<div key={field.headerName}>
								<Checkbox
									label={field.headerName}
									value={"value"}
									onChange={() => handleChange(field.headerName)}
								/>
							</div>
						);
					})}
			</div> */}
		</div>
	);
};

export default FilterReport;

const Checkbox = ({ label, value, onChange }) => {
	return (
		<div className="checkbox">
			<label className={"checkbox-label"}>
				<span>{label}</span>
				<input type="checkbox" checked={value} onChange={onChange} />
			</label>
		</div>
	);
};
