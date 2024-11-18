// npm
import { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// css
import "@/components/filters/FilterUpdatedAtDatetime.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";

const FilterUpdatedAtDatetime = () => {
	const { filtersContext, setFiltersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`,filtersContext)

	const [startDate, endDate] = filtersContext.updatedAtDatetimeRange;
	// console.log(`startDate`,startDate)
	// console.log(`endDate`,endDate)

	const handleChange = (update) => {
		// console.log(`update`, update);

		console.log(`update BEFORE`, update);

		const endDate = update?.[1];
		if (endDate) {
			const newEndDate =
				new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1)) +
				1;

			update[1] = new Date(newEndDate);
		}
		console.log(`update AFTER`, update);

		setFiltersContext({
			...filtersContext,
			updatedAtDatetimeRange: update,
			createdAtDatetimeRange: [null, null],
			filterCondition: {
				...filtersContext.filterCondition,
				updatedAtDatetime: update,
			},
		});
	};

	return (
		<div className="filter-updated-at-datetime">
			<DatePicker
				selectsRange={true}
				startDate={startDate}
				endDate={endDate}
				onChange={handleChange}
				isClearable={true}
				// maxDate={new Date()}
				placeholderText="Select Filter"
			/>
		</div>
	);
};

export default FilterUpdatedAtDatetime;
