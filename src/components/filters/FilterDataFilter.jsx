// css
import "@/components/filters/FilterDataFilter.css";

// contexts
// import { FiltersContext } from "@/contexts/FiltersContext";

// hooks
import useGetAstsReport from "@/hooks/useGetAstsReport";

// components
import FiltersControlBtns from "@/components/filters/FiltersControlBtns";
import FilterItem from "@/components/filters/FilterItem";
import FilterCreatedAtDatetime from "@/components/filters/FilterCreatedAtDatetime";
import FilterUpdatedAtDatetime from "@/components/filters/FilterUpdatedAtDatetime";
import FilterGeographicArea from "@/components/filters/FilterGeographicArea";
import FilterAstCreationProcess from "@/components/filters/FilterAstCreationProcess";
import FilterAstState from "@/components/filters/FilterAstState";
import FilterMeterType from "@/components/filters/FilterMeterType";

const FilterDataFilter = () => {
	// console.log(`props`, props);

	const { getAsts } = useGetAstsReport("asts");

	return (
		<div className="filter-data-filter">
			<div className="filter-items">
				<FilterItem
					title="Filter-CreatedAtDatetime"
					name="dateRange"
					value="created"
				>
					<FilterCreatedAtDatetime />
				</FilterItem>

				<FilterItem
					title="Filter-UpdatedAtDatetime"
					name="dateRange"
					value="updated"
				>
					<FilterUpdatedAtDatetime />
				</FilterItem>

				<FilterItem
					title="Filter-Ast Creation"
					name="astCreation"
					value="astCreation"
				>
					<FilterAstCreationProcess />
				</FilterItem>

				<FilterItem
					title="Filter-Meter Type"
					name="astMeterType"
					value="astMeterType"
				>
					<FilterMeterType />
				</FilterItem>

				<FilterItem title="Filter-Ast State" name="astState" value="astState">
					<FilterAstState />
				</FilterItem>

				<FilterItem
					title="Filter-Geographic Area"
					name="geographicArea"
					value="geographicArea"
				>
					<FilterGeographicArea />
				</FilterItem>
			</div>
			<FiltersControlBtns getData={getAsts} />
		</div>
	);
};

export default FilterDataFilter;
