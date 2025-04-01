// css
import "@/components/filters/FiltersBody.css";

// components
import FilterReport from "@/components/filters/FilterReport";
import FilterDataFilter from "@/components/filters/FilterDataFilter";
import FilterColumns from "@/components/filters/FilterColumns";

const FiltersBody = (props) => {
	const { active, irepsKeyItem } = props;
	return (
		<div className="filters-body">
			{active === "reportFilters" ? (
				<FilterDataFilter irepsKeyItem={irepsKeyItem} />
			) : (
				""
			)}
			{active === "reportStats" ? (
				<FilterReport irepsKeyItem={irepsKeyItem} />
			) : (
				""
			)}{" "}
			{active === "columnFilters" ? (
				<FilterColumns irepsKeyItem={irepsKeyItem} />
			) : (
				""
			)}
		</div>
	);
};

export default FiltersBody;
