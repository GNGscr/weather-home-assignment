import type { UnitsProps } from "../types/UnitsTypes";

const Units = ({ units, handleChange, isHeader }: UnitsProps) => {

  const setStyleByKeyValue = (key: string, value: string) => units === key ? value : 'none';

  return (
    <div className="action-wrapper">
        <div className={!isHeader ? 'units-title' : ''}>Units</div>
        <div className="action-children">
            <span
              className="action-child"
              style={{
                textDecoration: setStyleByKeyValue('metric', 'underline'),
                fontWeight: !isHeader && setStyleByKeyValue('metric', 'bold') || 'normal',
              }}
              onClick={() => handleChange('units', 'metric')}>
                °C
            </span>
            <div className='seperator' />
            <span
              className="action-child"
              style={{
                textDecoration: setStyleByKeyValue('imperial', 'underline'),
                fontWeight: !isHeader && setStyleByKeyValue('imperial', 'bold') || 'normal',
              }}
              onClick={() => handleChange('units', 'imperial')}>
                °F
            </span>
        </div>
  </div>
  )
}

export default Units;