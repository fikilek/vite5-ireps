import '@/components/roadmap/ComingSoon.css'

const ComingSoon = (props) => {
  const {title, content} = props
  return (
    <div className='coming-soon'>
      <h2 className='title'>{title}</h2>
      <h3>Coming Soon</h3>
      <p className='content'>{content}</p>
    </div>
  )
}

export default ComingSoon