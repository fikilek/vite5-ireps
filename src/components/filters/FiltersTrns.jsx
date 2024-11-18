import { useState } from "react";

// css
import "@/components/filters/FiltersTrns.css";

// hooks
import useGetTrnsReport from "@/hooks/useGetTrnsReport";

// context

// components
import FiltersHeader from "@/components/filters/FiltersHeader";
import FilterItem from "@/components/filters/FilterItem";
import FiltersControlBtns from "@/components/filters/FiltersControlBtns";
import FilterReportTypeBtn from "@/components/filters/FilterReportTypeBtn";
import FilterCreatedAtDatetime from "@/components/filters/FilterCreatedAtDatetime";
import FilterUpdatedAtDatetime from "@/components/filters/FilterUpdatedAtDatetime";
import FilterTrnType from "@/components/filters/FilterTrnType";
import FilterTrnAccess from "@/components/filters/FilterTrnAccess";

const FiltersTrns = (props) => {
	const { irepsKeyItem } = props;
	const [active, setActive] = useState("reportFilters");

	const { getTrns } = useGetTrnsReport("trns");

	return (
		<div className="filters-trns">
			<FiltersHeader
				active={active}
				setActive={setActive}
				irepsKeyItem={irepsKeyItem}
			/>
			<div className="filters-body">
				{active === "reportFilters" ? (
					<div className="filter-data-filter">
						<div className="filter-items">
							<FilterItem
								title="CreatedAtDatetime"
								name="dateRange"
								value="created"
							>
								<FilterCreatedAtDatetime />
							</FilterItem>
							<FilterItem
								title="UpdatedAtDatetime"
								name="dateRange"
								value="updated"
							>
								<FilterUpdatedAtDatetime />
							</FilterItem>
							<FilterItem
								title="TrnType (audit, tid, etc)"
								name="trnType"
								value="trnType"
							>
								<FilterTrnType />
							</FilterItem>

							<FilterItem
								title="Access/No Access "
								name="trnAccess"
								value="trnAccess"
							>
								<FilterTrnAccess />
							</FilterItem>
						</div>
						<FiltersControlBtns getData={getTrns} />
					</div>
				) : (
					""
				)}
				{active === "reportStats" ? (
					<div className="filter-reports">
						<div className="filter-report-body">
							<FilterReportTypeBtn title="Trn Types Stats" name="trnTypes" />
							<FilterReportTypeBtn
								title="Trn Types Per Users Stats"
								name="trnTypesPerUser"
							/>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default FiltersTrns;
