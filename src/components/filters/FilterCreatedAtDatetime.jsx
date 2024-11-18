// npm
import { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// css
import "@/components/filters/FilterCreatedAtDatetime.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";

const FilterCreatedAtDatetime = () => {
	const { filtersContext, setFiltersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`,filtersContext)

	const [startDate, endDate] = filtersContext.createdAtDatetimeRange;
	// console.log(`startDate`,startDate)
	// console.log(`endDate`, endDate);

	const handleChange = (update) => {
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
			createdAtDatetimeRange: update,
			updatedAtDatetimeRange: [null, null],
			filterCondition: {
				...filtersContext.filterCondition,
				createdAtDatetime: update,
			},
		});
	};

	return (
		<div className="filter-created-at-datetime">
			<DatePicker
				selectsRange={true}
				startDate={startDate}
				endDate={endDate}
				onChange={handleChange}
				isClearable={true}
				// maxDate={new Date() + 1}
				placeholderText="Select Filter"
			/>
		</div>
	);
};

export default FilterCreatedAtDatetime;
