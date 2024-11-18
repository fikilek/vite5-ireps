import { format } from "date-fns";

const TableDate = (props) => {
	const { date, dateFormat } = props;
	// console.log(`props`, props);
	if (!date || !dateFormat || date == "Invalid Date") return;
	return (
		<div className="table-date">
			<p>{format(date, dateFormat)}</p>
		</div>
	);
};

export default TableDate;
