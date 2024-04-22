import Item from '../../atom/Item/Item'
import './style.scss'

const Category = ({items}) => {
  return (
    <div className='category'>
      {items.map((item, index) => (
        <Item 
        key={index} 
        label={item.charAt(0).toUpperCase() + item.slice(1)} 
        image={`${item}.svg`} />
      ))}
    </div>
  )
}

export default Category