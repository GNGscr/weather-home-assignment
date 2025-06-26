import type { SortProps } from "../types/Sort";

const Sort = ({ sortBy, handleChange, isHeader }: SortProps) => {

  const setStyleByKeyValue = (key: string, value: string) => sortBy === key ? value : 'none';

  return (
    <div className='action-wrapper'>
    <div className="title">Sort by</div>
    <div className="action-children">
      <span
        className="action-child"
        style={{
          textDecoration: setStyleByKeyValue('name', 'underline'),
          fontWeight: !isHeader && setStyleByKeyValue('name', 'bold') || 'normal'
        }}
        onClick={() => handleChange('sort', 'name')}>
          Name
      </span>

      <div className='seperator' />

      <span
        className="action-child"
        style={{
          textDecoration: setStyleByKeyValue('distance', 'underline'),
          fontWeight: !isHeader && setStyleByKeyValue('distance', 'bold') || 'normal'
        }}
        onClick={() => handleChange('sort', 'distance')}>
          Distance
      </span>
    </div>

  </div>
  )
}

export default Sort;