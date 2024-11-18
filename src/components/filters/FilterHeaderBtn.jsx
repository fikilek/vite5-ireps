// css
import "@/components/filters/FilterHeaderBtn.css";
import { irepsDictionary } from "@/utils/utils";

const FilterHeaderBtn = props => {
	const { label, active, setActive } = props;
	const handleClick = e => {
		setActive(e.currentTarget.id);
	};

	const activeWindow = label === active ? "active" : "";

	return (
		<div className="filter-header-btn">
			<button
				id={label}
				onClick={handleClick}
				className={`${activeWindow} filter-btn`}
		>
				{irepsDictionary.get(label)}
			</button>
		</div>
	);
};

export default FilterHeaderBtn;
