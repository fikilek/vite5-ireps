import Select from "react-select";

// css
import "@/components/filters/FilterSelector.css";

const FilterSelector = (props) => {
	const { selectedErf, setSelectedErf, options } = props;
	// console.log(`props`, props)

	const setSelectedOption = (e) => {
		console.log(`e`, e);
		if (e?.value) {
			setSelectedErf([e.value]);
		} else {
			setSelectedErf(null);
		}
	};

	const clearValue = (e) => {
		console.log(`clearing selected value`, e);
		return null;
	};

	return (
		<div className="filter-selector">
			<p>Erf No</p>
			<Select
				defaultValue={selectedErf}
				options={options}
				isClearable={true}
				onChange={setSelectedOption}
				clearValue={clearValue}
			/>
		</div>
	);
};

export default FilterSelector;
