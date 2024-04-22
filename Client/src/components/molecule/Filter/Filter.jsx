import Item from '../../atom/Item/Item';
import './filter.scss';

const Filter = ({ items }) => {
  return (
    <div className='filter'>
      {items.map((item, index) => (
        <Item 
        key={index} 
        label={item.charAt(0).toUpperCase() + item.slice(1)} 
        image={`${item}.svg`} />
      ))}
    </div>
  );
};

export default Filter;
