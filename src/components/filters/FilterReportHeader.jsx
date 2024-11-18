import '@/components/filters/FilterReportHeader.css'

import { capitalizeFirstLetter } from "@/utils/utils";

const FilterReportHeader = (props) => {
  const {title} = props
  return (
    <div className='filter-report-header'>
      <p>{capitalizeFirstLetter(title)} At Datetime</p>
    </div>
  )
}

export default FilterReportHeader