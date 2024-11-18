
// css
import '@/components/asts/astsActivity/AstsActivityNameHeader.css'

const AstsActivityNameHeader = (props) => {
  const {activeTab} = props
  return (
    <div className='asts-activity-name-header'>
      {activeTab}
    </div>
  )
}

export default AstsActivityNameHeader