import '@/components/btns/BtnTab.css'

const BtnTab = (props) => {
  const {activeTab, setActiveTab, tabName} = props
  const handleClick = e => {
    // console.log(`e.currentTarget.id`, e.currentTarget.id)
    setActiveTab(e.currentTarget.id)
  }
  const active = tabName === activeTab ? 'active-tab' : ''
  return (
    <div className='btn-tab'>
      <button id={tabName} onClick={handleClick} className={`tab-btn ${active}`}>{tabName}</button>
    </div>
  )
}

export default BtnTab