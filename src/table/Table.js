
import './Table.scss';


function Table(props) {

  const format = (num) => {
    return num.toLocaleString();
  };

return (
    <div>
      <div className="container">
        <div className="header-wrapper">
            {props.headers && props.headers.map(header => 
              <strong className="header">{header}</strong>
            )}
            {props.rows && props.rows.map((row) => (
              props.headers.map(headerName => (
                <div className="row" key={`${row['#']}-${headerName}`}>{typeof row[headerName] === 'number' ? format(row[headerName]) : row[headerName]}</div>
              ))
            ))}
        </div>
      </div>
    </div>
  );
}

export default Table;