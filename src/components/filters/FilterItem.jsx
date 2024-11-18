// css
import '@/components/filters/FilterItem.css'

// components
import FilterItemHeading from '@/components/filters/FilterItemHeading'

const FilterItem = (props) => {
  const {children, title, name, value} = props
  return (
    <div className='filter-item'>
      <FilterItemHeading  title={title} name={name} value={value} />
      {children}
    </div>
  )
}

export default FilterItem